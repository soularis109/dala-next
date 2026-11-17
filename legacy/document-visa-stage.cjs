const stamp = require('./document-stamp-stage.cjs');
const phases = Object.freeze({ approach:6.1, contact:6.25, ink:6.29, pressEnd:6.35, liftEnd:6.55 });
function smooth(p,a,b){const t=Math.max(0,Math.min(1,(p-a)/(b-a)));return t*t*(3-2*t);}
function sample(p,reduced=false){
 const approach=smooth(p,phases.approach,phases.contact),press=smooth(p,phases.contact,phases.pressEnd),lift=smooth(p,phases.pressEnd,phases.liftEnd);
 return {opacity:reduced?0:approach*(1-lift),distance:.08+.85*(1-approach)+.9*lift,scale:1+.12*(1-press)+.12*lift,ink:smooth(p,phases.ink,phases.pressEnd)};
}
const types={u_visaView:'mat4',u_visaInk:'float',u_visaMark:'sampler2D'};
function patchRender(shader,{depth=false}={}){
 if(depth)return;
 shader.vertexShader='varying vec2 v_visaUv;\n'+shader.vertexShader;
 shader.vertexShader=shader.vertexShader.replace('void main() {',`void main() {
 vec2 visaPage=(texture2D(t_position,vec2(a_id.x,a_id.y+.5)).xy-.5)*8.7-vec2(.068,-.288);
 float vc=cos(-.13962634),vs=sin(-.13962634);
 v_visaUv=vec2(vc*visaPage.x+vs*visaPage.y,-vs*visaPage.x+vc*visaPage.y)/vec2(2.244,.864)+.5;
 `);
 shader.fragmentShader='varying vec2 v_visaUv;\n'+shader.fragmentShader;
 shader.fragmentShader=shader.fragmentShader.replace('outgoingLight.rgb = col.rgb * u_colorFactor;',`float visaInside=step(0.,v_visaUv.x)*step(0.,v_visaUv.y)*step(v_visaUv.x,1.)*step(v_visaUv.y,1.);
 float visaInk=smoothstep(.08,.3,texture2D(u_visaMark,v_visaUv,3.).a)*visaInside*u_visaInk;
 col=mix(col,vec3(.005),visaInk);
 outgoingLight.rgb = col.rgb * u_colorFactor;`);
}
const bodyVertex=stamp.bodyVertex
 .replace('uniform mat4 u_stampView;','uniform mat4 u_stampView;')
 .replace(/float c=cos\([^;]+;/, 'float c=cos(-.13962634),s=sin(-.13962634);')
 .replace(/vec2 p=position.xy[^;]+;/,'vec2 p=position.xy*vec2(2.244,.864)*u_stampBody.y;')
 .replace(/\+vec2\([^;]+;/,'+vec2(.068,-.288);');
module.exports={phases,sample,types,patchRender,bodyVertex};
