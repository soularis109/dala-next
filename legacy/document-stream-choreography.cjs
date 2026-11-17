const stampStage = require('./document-stamp-stage.cjs');
const visaStage = require('./document-visa-stage.cjs');
// The streams return directly to the same document, now on the left.
const phases = Object.freeze({ releaseStart: .7, releaseEnd: 1.6, releaseStagger: .25, gatherStart: 1.4, gatherEnd: 3, exitStart: stampStage.phases.assembleStart, exitEnd: stampStage.phases.assembleEnd });
const STREAM_PERSPECTIVE_RATIO = 1.5;
// Keep the moving path and its fitted envelope in sync.
const STREAM_CROSS_SECTION = .072;
const STREAM_PAPER_SCALE = .46;
// The fully visible portion lies between the 8% fades at either end.
const STREAM_DEPTH_SPAN = 20 * (STREAM_PERSPECTIVE_RATIO - 1) / (STREAM_PERSPECTIVE_RATIO + 1) / .84;
const DESKTOP_FAR_DEPTH = 18;
const DESKTOP_NEAR_DEPTH = 6;
const DESKTOP_DEPTH_CENTER = (DESKTOP_FAR_DEPTH + DESKTOP_NEAR_DEPTH) * .5;
const DESKTOP_DEPTH_SPAN = (DESKTOP_FAR_DEPTH - DESKTOP_NEAR_DEPTH) / .84;
function fitLargeStreams({ width, height, worldHeight, projectionX, projectionY, top, bottom, radius }) {
  // Anchor the fully visible ends at 52% and 110% of the viewport. The near
  // end deliberately extends beyond the right edge and never shrinks the width.
  const leftWorld = .04 * DESKTOP_FAR_DEPTH / projectionX;
  const rightWorld = 1.2 * DESKTOP_NEAR_DEPTH / projectionX;
  const x = (leftWorld + rightWorld) * .5;
  const pathWidth = (rightWorld - leftWorld) / .84;
  const upper = 1 - (top + 3) / height * 2;
  const lower = 1 - (bottom - 3) / height * 2;
  const points = [];
  for (let step = 0; step <= 512; step++) {
    const phase = step / 512;
    const taper = .7 + .3 * smooth(phase, .08, .92);
    for (let lane = 0; lane < 5; lane++) for (const jy of [-.5, .5]) for (const jz of [-.45, .45]) {
      const depth = DESKTOP_DEPTH_CENTER - (phase - .5) * DESKTOP_DEPTH_SPAN - jz;
      const screenX = (1 + projectionX * (x + (phase - .5) * pathWidth) / depth) * width * .5;
      if (screenX < -3 || screenX > width + 3) continue;
      points.push({ depth, y: ((lane - 2) * .105 + Math.sin(phase * Math.PI * 2 + lane * .85) * .027 + jy * STREAM_CROSS_SECTION) * worldHeight * taper });
    }
  }
  function interval(scale) {
    let minY = -Infinity, maxY = Infinity;
    for (const { y, depth } of points) {
      minY = Math.max(minY, lower * depth / projectionY - scale * y + radius * (1 + Math.abs(lower / projectionY)));
      maxY = Math.min(maxY, upper * depth / projectionY - scale * y - radius * (1 + Math.abs(upper / projectionY)));
      if (minY > maxY) return null;
    }
    return { minY, maxY };
  }
  let low = 0, high = 1;
  while (high < 8 && interval(high)) high *= 2;
  for (let step = 0; step < 30; step++) {
    const mid = (low + high) * .5;
    if (interval(mid)) low = mid; else high = mid;
  }
  const bounds = interval(low);
  const preferredY = (.5 - (top + bottom) * .5 / height) * worldHeight;
  return { x, y: bounds ? Math.max(bounds.minY, Math.min(bounds.maxY, preferredY)) : preferredY,
    width: pathWidth, scale: low, paperScale: STREAM_PAPER_SCALE, depthCenter: DESKTOP_DEPTH_CENTER,
    depthSpan: DESKTOP_DEPTH_SPAN, convergence: .7, large: 1 };
}
function fitStreamPerspective({ width, height, worldWidth, worldHeight, projectionX, projectionY, top, bottom, radius }) {
  if (width >= 1024) return fitLargeStreams({ width, height, worldHeight, projectionX, projectionY, top, bottom, radius });
  const columns = width >= 1024;
  const leftPx = columns ? width * .5 + 24 : 24;
  const rightPx = width - 24;
  const left = (leftPx + 3) / width * 2 - 1;
  const right = (rightPx - 3) / width * 2 - 1;
  const upper = 1 - (top + 3) / height * 2;
  const lower = 1 - (bottom - 3) / height * 2;
  const baseWidth = worldWidth * (columns ? .42 : .86);
  const points = [];
  // Fit the whole moving envelope, not just the current positions of the cards.
  for (let step = 0; step <= 256; step++) {
    const phase = step / 256;
    for (let lane = 0; lane < 5; lane++) for (const jitterY of [-.5, .5]) for (const jitterZ of [-.45, .45]) {
      points.push({ x: (phase - .5) * baseWidth,
        y: ((lane - 2) * .105 + Math.sin(phase * Math.PI * 2 + lane * .85) * .027 + jitterY * STREAM_CROSS_SECTION) * worldHeight,
        depth: 10 - (phase - .5) * STREAM_DEPTH_SPAN - jitterZ });
    }
  }
  function interval(scale) {
    let minX = -Infinity, maxX = Infinity, minY = -Infinity, maxY = Infinity;
    for (const { x, y, depth } of points) {
      minX = Math.max(minX, left * depth / projectionX - scale * x + scale * radius * (1 + Math.abs(left / projectionX)));
      maxX = Math.min(maxX, right * depth / projectionX - scale * x - scale * radius * (1 + Math.abs(right / projectionX)));
      minY = Math.max(minY, lower * depth / projectionY - scale * y + scale * radius * (1 + Math.abs(lower / projectionY)));
      maxY = Math.min(maxY, upper * depth / projectionY - scale * y - scale * radius * (1 + Math.abs(upper / projectionY)));
      if (minX > maxX || minY > maxY) return null;
    }
    return { minX, maxX, minY, maxY };
  }
  let low = 0, high = 1;
  for (let step = 0; step < 30; step++) {
    const mid = (low + high) * .5;
    if (interval(mid)) low = mid; else high = mid;
  }
  const bounds = interval(low);
  const preferredY = (.5 - (top + bottom) * .5 / height) * worldHeight;
  return { x: (bounds.minX + bounds.maxX) * .5,
    y: Math.max(bounds.minY, Math.min(bounds.maxY, preferredY)), width: baseWidth * low, scale: low,
    paperScale: STREAM_PAPER_SCALE * low, depthCenter: 10, depthSpan: STREAM_DEPTH_SPAN, convergence: 1, large: 0 };
}
function smooth(value, start, end) {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
}
function stages(progress) {
  return [smooth(progress, phases.releaseStart, phases.releaseEnd), smooth(progress, phases.gatherStart, phases.gatherEnd), smooth(progress, phases.exitStart, phases.exitEnd)];
}
function flightTiming(seed) {
  return [phases.releaseStart + phases.releaseStagger * seed[3],
    phases.gatherStart + (phases.gatherEnd - phases.gatherStart) * seed[2]];
}
function flightProgress(progress, seed) {
  const [start, end] = flightTiming(seed);
  return Math.max(0, Math.min(1, (progress - start) / (end - start)));
}
function createSeeds() {
  const data = new Float32Array(100 * 100 * 4);
  let seed = 0x51ea2026;
  for (let i = 0; i < data.length; i++) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    data[i] = (seed + .5) / 4294967296;
  }
  return data;
}
const types = { ...stampStage.types, ...visaStage.types, u_streamSeeds: 'sampler2D', u_streamStages: 'vec3', u_streamView: 'mat4', u_streamInverse: 'mat4', u_streamViewport: 'vec2', u_streamFrame: 'vec3', u_streamProgress: 'float', u_streamClock: 'float', u_streamPaperScale: 'float', u_streamPathScale: 'float', u_streamDepthSpan: 'float', u_streamDepthCenter: 'float', u_streamConvergence: 'float', u_streamLarge: 'float' };
const declarations = Object.entries(types).map(([key,type]) => `uniform ${type} ${key};`).join('\n');
const functions = stampStage.glsl + `
float streamFlight(vec4 seed) {
  float start = ${phases.releaseStart.toFixed(4)} + ${phases.releaseStagger.toFixed(4)} * seed.w;
  float arrival = ${phases.gatherStart.toFixed(4)} + ${(phases.gatherEnd-phases.gatherStart).toFixed(4)} * seed.z;
  return clamp((u_streamProgress-start)/(arrival-start), 0.0, 1.0);
}
float streamGather(vec4 seed) {
  // Cards settle and start following the moving lanes during the final approach.
  return smoothstep(.75, 1.0, streamFlight(seed));
}
vec3 streamPath(vec4 seed, float phase) {
  float lane = floor(seed.x * 5.0);
  float x = (phase - .5) * u_streamFrame.y;
  float y = (lane-2.0)*u_streamViewport.y*.105
    + sin(phase*6.28318530718+lane*.85)*u_streamViewport.y*.027
    + (seed.z-.5)*u_streamViewport.y*${STREAM_CROSS_SECTION.toFixed(4)};
  float taper = mix(u_streamConvergence, 1.0, smoothstep(.08, .92, phase));
  return vec3(u_streamFrame.x + x, u_streamFrame.z + y * u_streamPathScale * taper, -u_streamDepthCenter + (seed.w-.5)*.9 + (phase-.5)*u_streamDepthSpan);
}
vec3 streamTarget(vec3 documentPoint, vec3 stampPoint, vec4 seed) {
  vec3 documentView = (u_streamView * vec4(documentPoint, 1.0)).xyz;
  vec3 stampView = (u_stampView * vec4(stampPoint, 1.0)).xyz;
  vec3 destination = streamPath(seed, seed.y);
  float flight = streamFlight(seed);
  float t = flight * flight * (3.0 - 2.0 * flight);
  float angle = fract(seed.x*17.31 + seed.w*7.7) * 6.28318530718;
  vec3 burst = vec3(cos(angle)*u_streamViewport.x*.17,
    sin(angle)*u_streamViewport.y*.18, (seed.y-.5)*3.4);
  vec3 control1 = documentView + burst;
  float lead = min(u_streamFrame.y*.18, u_streamViewport.x*.18);
  vec3 control2 = destination - vec3(lead, 0.0, 0.0) + burst*.18;
  // One continuous individual arc: no intermediate cloud target or hold.
  float remaining = 1.0-t;
  vec3 target = remaining*remaining*remaining*documentView
    + 3.0*remaining*remaining*t*control1
    + 3.0*remaining*t*t*control2 + t*t*t*destination;
  float exit = streamExit(seed);
  float left = 1.0-exit;
  vec3 normal = normalize(u_stampView[2].xyz);
  // A rightward departure bends back into the page, then lands along its normal.
  vec3 exitControl1 = mix(destination+vec3(lead,0.0,0.0),stampView+normal*.9,exit);
  vec3 exitControl2 = stampView+normal*.45;
  vec3 returning = left*left*left*destination + 3.0*left*left*exit*exitControl1
    + 3.0*left*exit*exit*exitControl2 + exit*exit*exit*stampView;
  target = mix(target,returning,step(${phases.exitStart.toFixed(4)},u_streamProgress));
  return (u_streamInverse * vec4(target, 1.0)).xyz;
}
`;
function patchSimulation(source, { initial = false } = {}) {
  const anchor = initial
    ? 'pos = mix(pos, pos4, max(0., u_progress - 2.));'
    : 'pos = mix(pos, pos * tParams3.x, min(1., max(0., u_explode * (1. + d3 * (u_length - 1.)) - d3 * tParams2.w)));';
  if (source.split(anchor).length !== 2) throw new Error('Stream simulation anchor changed');
  return source.replace('precision highp float;', `precision highp float;\n${declarations}\n${functions}`).replace(anchor, `${anchor}
    if (u_streamStages.x > 0.0 && u_streamStages.z < 1.0) {
      vec4 seed = texture2D(u_streamSeeds, vUv);
      vec3 documentPoint = (texture2D(t_position, vUv * .5).xyz - .5) * 2.0 * radius * u_documentFormationScale;
      pos = streamTarget(documentPoint, pos3 * (4.35/radius), seed);
    } else if (u_streamProgress >= ${phases.exitEnd.toFixed(4)} && u_streamProgress < 5.0) {
      vec3 page = (texture2D(t_position,vec2(vUv.x*.5,vUv.y*.5+.5)).xyz-.5)*8.7;
      pos = mix(stampPageLocal(page),pos,smoothstep(4.5,5.0,u_streamProgress));
    }
    // A flat page also needs depth in the following native scatter/cloud.
    float scatterVolume = smoothstep(4.5,5.0,u_streamProgress)*(1.0-smoothstep(5.7,u_stampLogoEnd,u_streamProgress));
    if (scatterVolume > 0.0) {
      vec4 seed = texture2D(u_streamSeeds,vUv);
      pos += (u_streamInverse*vec4(0.0,0.0,(seed.w-.5)*8.0*scatterVolume,0.0)).xyz;
    }
    if (u_streamProgress >= 5.7) {
      vec3 page = (texture2D(t_position,vec2(vUv.x*.5+.5,vUv.y*.5+.5)).xyz-.5)*8.7;
      vec3 target = (u_streamInverse*u_visaView*vec4(page,1.0)).xyz;
      pos = mix(pos,target,smoothstep(5.7,u_stampLogoEnd,u_streamProgress));
    }`);
}
function patchRender(shader, { depth = false } = {}) {
  // Uniforms are supplied through the engine's existing material interfaces.
  shader.vertexShader = 'varying vec2 v_streamAppearance;\nvarying vec2 v_streamDepthAdjust;\n' + shader.vertexShader.replace('void main() {', functions + '\nvoid main() {');
  const anchor = 'mvPosition = modViewMatrix * mvPosition;';
  if (shader.vertexShader.split(anchor).length !== 2) throw new Error('Stream render anchor changed');
  shader.vertexShader = shader.vertexShader.replace('scale += dist * 0.75 * abs( u_explode - 1.);', `scale += dist * 0.75 * abs( u_explode - 1.);
vec4 streamSeed = texture2D(u_streamSeeds, a_id * 2.0);
float gathered = streamGather(streamSeed);
float exit = streamExit(streamSeed);
// Match the stream paper size during flight so large flying cards do not hide early arrivals.
float flightAppearance = smoothstep(.05, .6, streamFlight(streamSeed)) * (1.0-step(${phases.exitEnd.toFixed(4)},u_streamProgress));
float targetPaperScale = mix(u_streamPaperScale,(90.0/255.0)*u_scale*u_stampParticleScale,exit);
scale = mix(scale, targetPaperScale, flightAppearance);`).replace(anchor, `${anchor}
vec3 streamCenter = (modViewMatrix * vec4(pos, 1.0)).xyz;
vec3 vertexOffset = mvPosition.xyz - streamCenter;
float roll = (streamSeed.z-.5)*.32;
vec3 facingPaper = vec3(transformed.x*cos(roll)-transformed.y*sin(roll), transformed.x*sin(roll)+transformed.y*cos(roll), transformed.z);
mat3 stampAxes = mat3(normalize(u_stampView[0].xyz),normalize(u_stampView[1].xyz),normalize(u_stampView[2].xyz));
vec3 paper = mix(facingPaper,stampAxes*transformed,exit)*.1*scale;
float streamGeometry = gathered*(1.0-step(${phases.exitEnd.toFixed(4)},u_streamProgress));
mvPosition.xyz = streamCenter + mix(vertexOffset, paper, streamGeometry);
float phase = fract(streamSeed.y + u_streamClock * (0.9+floor(streamSeed.x*5.0)*.05) / 16.0);
// Idle travel is a render offset, never a discontinuous spring target at the wrap.
// This is the source/control-point coefficient of the exit curve above.
// Keep time-dependent wrapping out of the spring simulation.
float remaining = 1.0-exit;
float flowWeight = gathered*remaining*remaining*remaining*(1.0+3.0*exit);
mvPosition.xyz += (streamPath(streamSeed, phase)-streamPath(streamSeed, streamSeed.y)) * flowWeight;
// Preserve the established opacity/blur range for the extended desktop depth:
// real distances 6..18 map to effect distances 8..12. Projection remains physical.
float flightDepthWeight = smoothstep(0.0, .25, streamFlight(streamSeed)) * (1.0-exit);
v_streamDepthAdjust = vec2(6.0 - mvPosition.z / 3.0, flightDepthWeight * u_streamLarge);
float edge = smoothstep(0.0,.08,phase) * (1.0-smoothstep(.92,1.0,phase));
// Fade loop seams before the idle displacement becomes visible during arrival.
float streamOpacity = mix(1.0,edge,smoothstep(0.0,.005,gathered));
streamOpacity = mix(streamOpacity,1.0,smoothstep(.95,1.0,exit));
v_streamAppearance = vec2(gathered*(1.0-step(${phases.exitEnd.toFixed(4)},u_streamProgress)),streamOpacity);
`);
  shader.fragmentShader = 'varying vec2 v_streamAppearance;\nvarying vec2 v_streamDepthAdjust;\n' + shader.fragmentShader;
  if (!depth) {
    shader.fragmentShader = shader.fragmentShader.replace('outgoingLight.rgb = col.rgb * u_colorFactor;', 'col = mix(col, vec3(.65), v_streamAppearance.x);\noutgoingLight.rgb = col.rgb * u_colorFactor;');
    shader.fragmentShader = shader.fragmentShader.replace('smoothstep(-4.5, 4., v_pos.z)', 'smoothstep(-4.5, 4., mix(v_pos.z, 10.0-v_streamDepthAdjust.x, v_streamDepthAdjust.y))');
  } else {
    shader.fragmentShader = shader.fragmentShader.replace('smoothstep( u_near, u_far, vViewZDepth )', 'smoothstep( u_near, u_far, mix(vViewZDepth, v_streamDepthAdjust.x, v_streamDepthAdjust.y) )');
  }
  const end = shader.fragmentShader.lastIndexOf('}');
  shader.fragmentShader = shader.fragmentShader.slice(0,end) + '\nif (v_streamAppearance.y < .04) discard;\ngl_FragColor.a *= v_streamAppearance.y;\n' + shader.fragmentShader.slice(end);
}
module.exports = { phases, stages, flightTiming, flightProgress, createSeeds, types, STREAM_PERSPECTIVE_RATIO, STREAM_CROSS_SECTION, STREAM_PAPER_SCALE, STREAM_DEPTH_SPAN, fitStreamPerspective, patchSimulation, patchRender };
