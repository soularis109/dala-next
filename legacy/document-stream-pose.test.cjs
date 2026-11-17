const { test } = require('node:test');
const assert = require('node:assert/strict');
const { streamPose, STREAM_SIZE_RATIO } = require('./document-stream-pose.cjs');

for (const [width, height, mobile] of [[1920,1080,false],[1440,900,false],[1024,768,false],[768,1024,false],[390,844,true],[320,568,true]]) {
  test(`stationary perspective fits the reserved frame at ${width}x${height}`, () => {
    const px=2.414/(width/height),py=2.414,factor=mobile?3/4.35:1;
    const input={width,height,mobile,projectionX:px,projectionY:py,factor};
    const pose=streamPose(input);
    assert.deepEqual(streamPose(input),pose);
    assert.ok(pose.scale>0&&pose.scale<=1.25);
    for (const x of [-4.4*factor,4.4*factor]) for (const y of [-2.3*factor,2.3*factor]) for (const z of [-.5*factor,.5*factor]) {
      const depth=-pose.z-pose.slope*x-pose.scale*z;
      const sx=(px*(pose.x+pose.scale*x)/depth+1)*width/2;
      const sy=(1-py*(pose.y+pose.scale*y)/depth)*height/2;
      assert.ok(sx>=(width>=1024?width/2:24)-1e-9&&sx<=width-24+1e-9, `${sx}`);
      assert.ok(sy>=24-1e-9&&sy<=height-24+1e-9, `${sy}`);
    }
    const half=4.05*factor;
    const far=-pose.z+pose.slope*half,near=-pose.z-pose.slope*half;
    assert.ok(Math.abs(far/near-STREAM_SIZE_RATIO)<1e-12);
    assert.ok(pose.z<0&&near>0);
  });
}

const { streamDescriptorForId, streamPosition, thickerStreamPosition, STREAM_APPEARANCE_GAIN } = require('./document-stream-motion.cjs');
for (const [width,height,mobile] of [[1920,1080,false],[1440,900,false],[1024,768,false],[768,1024,false],[390,844,true],[320,568,true]]) {
  test(`actual sheets use more of the frame without clipping at ${width}x${height}`, () => {
    const grid=mobile?30:40,cards=[];
    for(let row=0;row<grid;row++)for(let col=0;col<grid;col++){
      const id=Math.floor((row+.5)*100/grid)*100+Math.floor((col+.5)*100/grid);
      const [x,y,z]=streamPosition(streamDescriptorForId(id));
      cards.push({x,y,z,halfX:.025,halfY:.04,halfZ:.01});
    }
    const px=2.414/(width/height),py=2.414,factor=mobile?3/4.35:1,paperScale=2.95;
    const input={width,height,mobile,projectionX:px,projectionY:py,factor,paperScale};
    const old=streamPose(input),baseline=streamPose({...input,cards});
    const thickCards=cards.map(card=>{
      const [x,y,z]=thickerStreamPosition([card.x,card.y,card.z]);
      return {...card,x,y,z};
    });
    const thickInput={...input,cards:thickCards,paperScale:paperScale*STREAM_APPEARANCE_GAIN};
    const pose=streamPose(thickInput);
    const span = frame => {
      const xs = cards.map(card => (px * (frame.x + frame.scale * card.x * factor)
        / (-frame.z - frame.slope * card.x * factor - frame.scale * card.z * factor) + 1) * width / 2);
      return Math.max(...xs) - Math.min(...xs);
    };
    assert.ok(span(pose)>span(old)*1.04, 'the rendered width must grow, not only the scale parameter');
    assert.deepEqual(streamPose(thickInput),pose);
    for(let i=0;i<cards.length;i++){
      const card=thickCards[i],before=cards[i];
      const beforeDepth=-baseline.z-baseline.slope*before.x*factor-baseline.scale*before.z*factor;
      const afterDepth=-pose.z-pose.slope*card.x*factor-pose.scale*card.z*factor;
      const gain=STREAM_APPEARANCE_GAIN*pose.scale/baseline.scale*beforeDepth/afterDepth;
      assert.ok(gain>=1.2&&gain<=1.3, `projected paper and cross-section gain: ${gain}`);
      const rx=card.halfX*thickInput.paperScale+.015*factor,ry=card.halfY*thickInput.paperScale+.015*factor,rz=card.halfZ*thickInput.paperScale+.015*factor;
      for(const dx of [-rx,rx])for(const dy of [-ry,ry])for(const dz of [-rz,rz]){
        const d=-pose.z-pose.slope*card.x*factor-pose.scale*(card.z*factor+dz);
        const sx=(px*(pose.x+pose.scale*(card.x*factor+dx))/d+1)*width/2;
        const sy=(1-py*(pose.y+pose.scale*(card.y*factor+dy))/d)*height/2;
        assert.ok(sx>=(width>=1024?width/2:24)-1e-7&&sx<=width-24+1e-7);
        assert.ok(sy>=24-1e-7&&sy<=height-24+1e-7);
      }
    }
    const larger=streamPose({...input,cards,paperScale:paperScale*2});
    assert.ok(larger.scale<pose.scale,'bigger individual sheets must reserve more edge space');
  });
}
