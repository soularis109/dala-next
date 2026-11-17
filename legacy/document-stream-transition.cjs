// Keep the first scatter's destination fixed while individual sheets resolve
// into bank 2. Scaling an already interpolated target makes sheets collapse
// toward the old page before they can join the streams.
const firstStreamTargetGLSL = `
vec3 firstStreamTarget(vec3 page, vec3 stream, float scatterScale,
    float scatter, float resolve) {
  vec3 cloud = page * mix(1.0, scatterScale, scatter);
  return mix(cloud, stream, resolve);
}
`;

function firstStreamTarget(page, stream, scatterScale, scatter, resolve) {
  const scale = 1 + (scatterScale - 1) * scatter;
  return page.map((value, axis) => value * scale * (1 - resolve) + stream[axis] * resolve);
}

function patchFirstStreamTarget(source) {
  const anchor = 'pos = mix(pos, pos * tParams3.x, min(1., max(0., u_explode * (1. + d3 * (u_length - 1.)) - d3 * tParams2.w)));';
  if (source.split(anchor).length !== 2) throw new Error('First stream target shader anchor changed');
  return source.replace('precision highp float;', 'precision highp float;\nuniform float u_firstFormScatter;\n' + firstStreamTargetGLSL).replace(anchor, `${anchor}
    // Stop at bank 2 so the following native stream scatter stays active.
    if (u_progress >= 1.0 && u_progress < 2.0) {
      float firstScatter = clamp(u_firstFormScatter * (1.0 + d3 * (u_length - 1.0)) - d3 * tParams2.w, 0.0, 1.0);
      pos = firstStreamTarget(pos2, pos3, tParams3.x, firstScatter, streamResolve);
    }`);
}

module.exports = { firstStreamTarget, patchFirstStreamTarget };
