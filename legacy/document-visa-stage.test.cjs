const {test}=require('node:test');const assert=require('node:assert/strict');
const {sample,bodyVertex}=require('./document-visa-stage.cjs');
const {fitDocument}=require('./document-stamp-stage.cjs');
test('visa ink follows contact and survives removal of the body',()=>{
 assert.equal(sample(6.25).ink,0);assert.ok(sample(6.32).ink>0&&sample(6.32).ink<1);
 assert.equal(sample(6.6).ink,1);assert.equal(sample(6.6).opacity,0);
 assert.equal(sample(6.32,true).opacity,0);assert.equal(sample(6.32,true).ink,sample(6.32).ink);
 const before=sample(6.32);sample(7);assert.deepEqual(sample(6.32),before);assert.equal(sample(5.9).ink,0);
 assert.ok(bodyVertex.includes('vec2(2.244,.864)'));assert.ok(bodyVertex.includes('vec2(.068,-.288)'));
});
test('final page fits centrally on desktop and phone',()=>{
 for(const [width,height] of [[1440,900],[390,844],[375,667]]){
 const py=1/Math.tan(50*Math.PI/360),px=py/(width/height);
 const l=fitDocument({width,height,projectionX:px,projectionY:py,top:100,bottom:height-130,maxScale:1.8,radius:.06,center:true});
 assert.equal(l.x,0);assert.equal(l.startX,0);assert.ok(l.scale>0);
 for(const x of [-1.7,1.7])for(const y of [-2.4,2.4]){
 const sx=(1+px*x*l.scale/10)*width/2,sy=(1-py*(y*l.scale+l.y)/10)*height/2;
 assert.ok(sx>=24&&sx<=width-24);assert.ok(sy>=100&&sy<=height-130);
 }
 }
});
