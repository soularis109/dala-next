// The second page and the press are reversible functions of sectionProgress.
const phases = Object.freeze({ assembleStart: 3.3, assembleEnd: 3.85, assembleStagger: .1, moveStart: 3.55, moveEnd: 3.9,
  approachStart: 3.9, contact: 4.05, inkStart: 4.09, pressEnd: 4.15, liftEnd: 4.3,
  scatterStart: 4.5, scatterEnd: 5, logoStart: 5.7, logoEnd: 6 });
const placement = Object.freeze({ x: (.74-.5)*3.4, y: (.19-.5)*4.8, size: 3.4*.3, angle: -.2 });
// Positive yaw brings the left edge toward the viewer.
const PAGE_TURN = Math.PI/9;
function smooth(value, start, end) {
  const t = Math.max(0, Math.min(1, (value-start)/(end-start)));
  return t*t*(3-2*t);
}
function sample(progress, reducedMotion = false) {
  const move = smooth(progress, phases.moveStart, phases.moveEnd);
  const approach = smooth(progress, phases.approachStart, phases.contact);
  const press = smooth(progress, phases.contact, phases.pressEnd);
  const lift = smooth(progress, phases.pressEnd, phases.liftEnd);
  return { assemble: smooth(progress, phases.assembleStart, phases.assembleEnd), move,
    angle: PAGE_TURN*move, scatter: smooth(progress, phases.scatterStart, phases.scatterEnd),
    opacity: reducedMotion ? 0 : approach*(1-lift),
    distance: .08 + .85*(1-approach) + .9*lift,
    scale: 1 + .12*(1-press) + .12*lift,
    ink: smooth(progress, phases.inkStart, phases.pressEnd) };
}

// Fit the whole journey, including the raised body, in the existing safe band.
function fitDocument({ width, height, projectionX, projectionY, top, bottom, maxScale, radius, center = false }) {
  const desktop = width >= 1024;
  const centerY = (top+bottom)*.5;
  const y = (1-centerY/height*2)*10/projectionY;
  const endFraction = center ? .5 : desktop ? .27 : .45;
  const xFor = fraction => (fraction*2-1)*10/projectionX;
  const startX = xFor(.5), x = xFor(endFraction);
  function fits(scale) {
    let minY = Infinity, maxY = -Infinity;
    for (let step = 0; step <= 8; step++) {
      const t = step/8, angle = center ? 0 : PAGE_TURN*t;
      const cx = startX+(x-startX)*t;
      // The stamp's lifted circular body lies within this conservative box.
      for (const px of [-1.7, 1.7]) for (const py of [-2.4, 2.4]) for (const pz of [0, 1.1]) {
        const vx = cx + scale*(px*Math.cos(angle)+pz*Math.sin(angle));
        const vy = y+py*scale;
        const depth = 10-scale*(-px*Math.sin(angle)+pz*Math.cos(angle))-radius;
        const sx0 = (1+projectionX*(vx-radius)/depth)*width*.5;
        const sx1 = (1+projectionX*(vx+radius)/depth)*width*.5;
        const sy0 = (1-projectionY*(vy+radius)/depth)*height*.5;
        const sy1 = (1-projectionY*(vy-radius)/depth)*height*.5;
        if (depth <= .1 || sx0 < 24 || sx1 > width-24 || sy0 < top || sy1 > bottom) return false;
        if (!center && desktop && step === 8 && sx1 > width*.54-24) return false;
        minY = Math.min(minY,sy0); maxY = Math.max(maxY,sy1);
      }
    }
    return maxY-minY <= height*.78;
  }
  let low = 0, high = maxScale;
  for (let i=0;i<30;i++) { const mid=(low+high)*.5; if(fits(mid)) low=mid; else high=mid; }
  return { x, startX, y, scale: low };
}
const types = { u_stampView: 'mat4', u_stampInk: 'float', u_stampMark: 'sampler2D', u_stampParticleScale: 'float', u_stampLogoEnd: 'float' };
const glsl = `
float streamExit(vec4 seed) {
  float start = ${phases.assembleStart.toFixed(4)} + ${phases.assembleStagger.toFixed(4)} * seed.w;
  float t = clamp((u_streamProgress-start)/${(phases.assembleEnd-phases.assembleStart-phases.assembleStagger).toFixed(4)},0.0,1.0);
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}
float stampPageWeight(vec4 seed) {
  return max(streamExit(seed)*(1.0-smoothstep(4.5,5.0,u_streamProgress)),smoothstep(5.7,u_stampLogoEnd,u_streamProgress));
}
vec3 stampPageLocal(vec3 page) {
  return (u_streamInverse*u_stampView*vec4(page,1.0)).xyz;
}
`;
function patchRender(shader, { depth = false } = {}) {
  shader.vertexShader = shader.vertexShader.replace('pos.x += dist * sin', 'dist *= 1.0-stampPageWeight(texture2D(u_streamSeeds,a_id*2.0));\npos.x += dist * sin');
  shader.vertexShader = shader.vertexShader.replace('scale += dist * 0.75 * abs( u_explode - 1.);',
    'scale += dist * 0.75 * abs( u_explode - 1.);\nscale = mix(scale, (90.0/255.0)*u_scale*u_stampParticleScale, stampPageWeight(texture2D(u_streamSeeds,a_id*2.0)));');
  shader.vertexShader = shader.vertexShader.replace('v_pos = mvPosition.xyz;', `
// Keep the small pages in the plane of the assembled form, independently of
// the former sphere's native rotation. This also keeps the printed seal legible.
vec3 stampCenter = (modViewMatrix*vec4(pos,1.0)).xyz;
mat4 pageView = u_streamProgress >= 5.7 ? u_visaView : u_stampView;
mat3 pageAxes = mat3(normalize(pageView[0].xyz),normalize(pageView[1].xyz),normalize(pageView[2].xyz));
vec3 stampOffset = pageAxes*transformed*.1*scale;
// The stream shader owns the entire exit, including the still-moving center.
// Only hand off once every card is assembled; avoid blending the center twice.
float settledPage = stampPageWeight(streamSeed)*step(${phases.assembleEnd.toFixed(4)},u_streamProgress);
mvPosition.xyz = mix(mvPosition.xyz,stampCenter+stampOffset,settledPage);
v_pos = mvPosition.xyz;`);
  if (depth) return;
  // Read the original cell coordinate, so the ink follows its particle after scatter.
  shader.vertexShader = 'varying vec2 v_stampUv;\nvarying float v_stampBlend;\n'+shader.vertexShader;
  shader.vertexShader = shader.vertexShader.replace('void main() {', `void main() {
vec2 page = (texture2D(t_position,vec2(a_id.x,a_id.y+.5)).xy-.5)*8.7;
v_stampBlend = streamExit(texture2D(u_streamSeeds,a_id*2.0));
vec2 ink = page-vec2(${placement.x},${placement.y});
float c = cos(${placement.angle}), s = sin(${placement.angle});
v_stampUv = vec2(c*ink.x+s*ink.y,-s*ink.x+c*ink.y)/${placement.size}+.5;
`);
  shader.fragmentShader = 'varying vec2 v_stampUv;\nvarying float v_stampBlend;\n'+shader.fragmentShader;
  shader.fragmentShader = shader.fragmentShader.replace('outgoingLight.rgb = col.rgb * u_colorFactor;', `
float stampedBank = v_stampBlend;
vec3 pageColor = texture2D(t_color,vec2(v_id.x,v_id.y+.5)).rgb;
float inside = step(0.0,v_stampUv.x)*step(0.0,v_stampUv.y)*step(v_stampUv.x,1.0)*step(v_stampUv.y,1.0);
// Each page cell represents several source pixels. Filter the worn artwork
// before thresholding, rather than sampling isolated holes in its grain.
float mark = smoothstep(.08,.3,texture2D(u_stampMark,v_stampUv,3.0).a)*inside*u_stampInk;
// Near-black input becomes Navy in the scene's final palette pass.
pageColor = mix(pageColor,vec3(.005),mark);
col = mix(col,pageColor,stampedBank);
outgoingLight.rgb = col.rgb * u_colorFactor;`);
}
// A top view of the physical stamp moves along the page normal. Both passes
// use the same transform and alpha cutout (no rectangular depth silhouette).
const bodyVertex = `precision highp float;
uniform mat4 projectionMatrix;
uniform mat4 u_stampView;
uniform vec3 u_stampBody;
attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;
varying float vDepth;
void main() {
  vUv = uv;
  float c=cos(${placement.angle}), s=sin(${placement.angle});
  vec2 p=position.xy*${placement.size}*(1024.0/698.0)*u_stampBody.y;
  p=vec2(c*p.x-s*p.y,s*p.x+c*p.y)+vec2(${placement.x},${placement.y});
  vec4 view=u_stampView*vec4(p,u_stampBody.x,1.0);
  vDepth=-view.z;
  gl_Position=projectionMatrix*view;
}`;
function bodyFragment(depth = false) {
  return `precision highp float;
uniform sampler2D u_stampBodyTexture;
uniform vec3 u_stampBody;
varying vec2 vUv;
varying float vDepth;
void main() {
  vec4 body=texture2D(u_stampBodyTexture,vUv);
  float alpha=body.a*u_stampBody.z;
  if(alpha<.04) discard;
  gl_FragColor=vec4(${depth ? 'vec3(1.0-smoothstep(.1,13.0,vDepth))' : 'body.rgb'},alpha);
}`;
}
module.exports = { phases, placement, sample, fitDocument, types, glsl, patchRender, bodyVertex, bodyFragment };
