const { documentPhases: phases } = require('./document-timeline.cjs');
const { STREAM_APPEARANCE_GAIN } = require('./document-stream-motion.cjs');
const { smooth } = require('./document-motion.cjs');

function cloudIntegration(progress) {
  return {
    bridge: smooth(progress, phases.formScatterEnd, phases.streamsAssembleStart)
      * (1 - smooth(progress, phases.streamsScatterEnd, phases.stampAssembleStart)),
    // Both boundaries already have a fully visible ambient group in the native
    // choreography. Keep it present throughout the intervening cloud/streams.
    persistent: progress >= phases.formScatterStart && progress <= phases.stampAssembleEnd
  };
}

const cloudIntegrationVertex = `
if (u_streamBridge > 0.0) {
  vec4 order = texture2D(t_documentOrder, a_id * 2.0);
  float release = clamp(u_streamRelease * (1.0 + 0.00015 * (u_length - 1.0)) - 0.00015 * order.w, 0.0, 1.0);
  float gathered = leafResolve.y;
  if (u_progress >= 2.0) gathered *= (1.0 - release) * (1.0 - leafResolve.z);
  vec3 streamTarget = (texture2D(t_position, vec2(a_id.x, a_id.y + 0.5)).xyz - 0.5)
    * 2.0 * u_factor * u_streamBankFit;
  vec3 cloudTarget = u_progress < 2.0
    ? (texture2D(t_position, vec2(a_id.x + 0.5, a_id.y)).xyz - 0.5) * 2.0 * u_factor
    : streamTarget;
  cloudTarget *= texture2D(t_documentScatter, a_id * 2.0).x;
  vec3 center = instanceMat[3].xyz;
  vec3 residual = center - mix(cloudTarget, streamTarget, gathered);
  float streamFactor = (u_factor / 4.35) * u_streamBankFit;
  vec3 thickTarget = thickerStream(streamTarget / max(streamFactor, 0.0001)) * streamFactor;
  vec3 streamView = (u_streamView * vec4(thickTarget, 1.0)).xyz;
  streamView.z += streamTarget.x * u_streamDepthSlope;
  vec3 desired = mix((u_cloudView * vec4(cloudTarget, 1.0)).xyz, streamView, gathered);
  float along = clamp(streamTarget.x / max(8.1 * (u_factor / 4.35) * u_streamBankFit, 0.0001) + 0.5, 0.0, 1.0);
  v_streamFx = vec2((1.0 - smoothstep(0.15, 0.9, along)) * gathered * u_streamBridge, 1.0);
  vec3 frameX = mix(u_cloudView[0].xyz, u_streamView[0].xyz, gathered);
  vec3 frameY = mix(u_cloudView[1].xyz, u_streamView[1].xyz, gathered);
  vec3 frameZ = mix(u_cloudView[2].xyz, u_streamView[2].xyz, gathered);
  desired += mat3(frameX, frameY, frameZ) * residual;
  // Enlarge the paper, not its center trajectory or spring displacement.
  float paperGain = mix(1.0, ${STREAM_APPEARANCE_GAIN.toFixed(4)}, gathered);
  modViewMatrix[0].xyz = mix(modViewMatrix[0].xyz, frameX * paperGain, u_streamBridge);
  modViewMatrix[1].xyz = mix(modViewMatrix[1].xyz, frameY * paperGain, u_streamBridge);
  modViewMatrix[2].xyz = mix(modViewMatrix[2].xyz, frameZ * paperGain, u_streamBridge);
  modViewMatrix[3].xyz += (desired - (modViewMatrix * vec4(center, 1.0)).xyz) * u_streamBridge;
}
`;
function freezeStreamTime(source) {
  const anchor = 'pos = texture2D(t_simulation, vec2(a_id.x * 2., a_id.y * 2.)).xyz;';
  if (source.split(anchor).length !== 2) throw new Error('Static stream clock anchor changed');
  return source.replace(/\bu_time\b/g, 'leafTime').replace(anchor, `
  vec4 clockOrder = texture2D(t_documentOrder, a_id * 2.0);
  vec3 clockResolve = documentResolve(u_progress, u_delay, u_length, clockOrder.xyz);
  float clockRelease = clamp(u_streamRelease * (1.0 + 0.00015 * (u_length - 1.0)) - 0.00015 * clockOrder.w, 0.0, 1.0);
  float clockGathered = clockResolve.y * (1.0 - clockResolve.z);
  if (u_progress >= 2.0) clockGathered *= 1.0 - clockRelease;
  float leafTime = u_time * (1.0 - clockGathered * u_streamBridge);
  ${anchor}`);
}
module.exports = { cloudIntegration, cloudIntegrationVertex, freezeStreamTime };
