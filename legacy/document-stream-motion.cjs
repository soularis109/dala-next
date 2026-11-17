const STREAM_APPEARANCE_GAIN = 1.25;

function mulberry32(seed) {
  return function random() {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}
function streamDescriptor(random) {
  return [Math.floor(random() * 5), random(), (random() - 0.5) * 0.12, (random() - 0.5) * 0.45];
}
function streamDescriptorForId(id) { return streamDescriptor(mulberry32(0xd0c200 + id * 47)); }
function streamPosition(descriptor) {
  const [lane, start, jitterY, jitterZ] = descriptor;
  const direction = lane % 2 === 0 ? 1 : -1;
  const t = start;
  return [direction * (-4.05 + t * 8.1),
    (lane - 2) * 0.78 + Math.sin(t * Math.PI * 2 + lane * 0.85) * 0.28 + jitterY, jitterZ];
}
function streamPoint(random) { return streamPosition(streamDescriptor(random)); }

// Expand only the cross-section around the existing seeded wave axis.
function thickerStreamPosition([x, y, z], gain = STREAM_APPEARANCE_GAIN) {
  const lane = Math.max(0, Math.min(4, Math.floor(y / .78 + 2.5)));
  const direction = lane % 2 === 0 ? 1 : -1;
  const t = (direction * x + 4.05) / 8.1;
  const axisY = (lane - 2) * .78 + Math.sin(t * Math.PI * 2 + lane * .85) * .28;
  return [x, axisY + (y - axisY) * gain, z];
}


const streamMotionDecl = `
varying vec2 v_streamFx;
varying vec2 v_streamUv;
vec3 thickerStream(vec3 point) {
  float lane = clamp(floor(point.y / 0.78 + 2.5), 0.0, 4.0);
  float direction = mod(lane, 2.0) < 0.5 ? 1.0 : -1.0;
  float t = (direction * point.x + 4.05) / 8.1;
  float axisY = (lane - 2.0) * 0.78 + sin(t * 6.28318530718 + lane * 0.85) * 0.28;
  return vec3(point.x, axisY + (point.y - axisY) * ${STREAM_APPEARANCE_GAIN.toFixed(4)}, point.z);
}
`;
const streamFragmentDecl = `
varying vec2 v_streamFx;
varying vec2 v_streamUv;
uniform float u_streamPixelRatio;
float streamCoverage() {
  vec2 uv = v_streamUv - 2.0 * step(vec2(1.5), v_streamUv);
  vec2 width = max(fwidth(uv) * v_streamFx.x * u_streamPixelRatio, vec2(0.00001));
  vec2 edge = min(uv, 1.0 - uv) / width;
  float soft = v_streamFx.x > 0.001 ? clamp(min(edge.x, edge.y), 0.0, 1.0) : 1.0;
  return v_streamFx.y * soft;
}
`;
function patchStreamMotionShader(shader, { depth = false, pixelRatio = 1 } = {}) {
  shader.vertexShader = streamMotionDecl + shader.vertexShader.replace('void main() {',
    'void main() {\nv_streamFx = vec2(0.0, 1.0);\nv_streamUv = uv;');
  shader.fragmentShader = streamFragmentDecl + shader.fragmentShader;
  shader.uniforms.u_streamPixelRatio = { value: pixelRatio };
  if (!depth) {
    const atlas = 'vec4 pAtlas = texture2D(t_documentAtlas, pAtlasUv);';
    if (!shader.fragmentShader.includes(atlas)) throw new Error('Stream paper atlas anchor changed');
    shader.fragmentShader = shader.fragmentShader.replace(atlas, `${atlas}
    if (v_streamFx.x > 0.001) {
      vec2 dx = dFdx(pAtlasUv) * v_streamFx.x * u_streamPixelRatio;
      vec2 dy = dFdy(pAtlasUv) * v_streamFx.x * u_streamPixelRatio;
      vec2 lo = (pAtlasTile + vec2(0.001)) / vec2(4.0, 3.0);
      vec2 hi = (pAtlasTile + vec2(0.999)) / vec2(4.0, 3.0);
      pAtlas = (pAtlas * 4.0 + texture2D(t_documentAtlas, clamp(pAtlasUv + dx, lo, hi))
        + texture2D(t_documentAtlas, clamp(pAtlasUv - dx, lo, hi))
        + texture2D(t_documentAtlas, clamp(pAtlasUv + dy, lo, hi))
        + texture2D(t_documentAtlas, clamp(pAtlasUv - dy, lo, hi))) / 8.0;
    }`);
  }
  const end = shader.fragmentShader.lastIndexOf('}');
  shader.fragmentShader = shader.fragmentShader.slice(0, end)
    + '\nfloat coverage = streamCoverage();\nif (coverage < 0.02) discard;\n'
    + (depth ? '' : 'gl_FragColor.a *= coverage;\n') + shader.fragmentShader.slice(end);
}
module.exports = { STREAM_APPEARANCE_GAIN, thickerStreamPosition, mulberry32, streamDescriptorForId, streamPosition, streamPoint, patchStreamMotionShader };
