// First-cloud physics only. Screen offsets are CSS pixels; time is seconds.
const HERO_INTRO_DURATION = 4.6;
const HERO_MAGNET_SCALE = 1.8;
const HERO_REPEL_SPEED = 650;
const HERO_ATTRACT_SPEED = 300;

// The original first 3.85s reach show=0.7. Only the final 1.65s become 0.75s.
// Normalized timing lets the tuner's duration scale the whole curve consistently.
function heroIntroEase(progress) {
  const t = Math.max(0, Math.min(1, progress));
  const join = 3.85 / HERO_INTRO_DURATION;
  if (t <= join) return t * HERO_INTRO_DURATION / 5.5;
  const x = (t - join) / (1 - join);
  const tangent = .75 / (5.5 * .3);
  const tail = (tangent - 2) * x * x * x + (3 - 2 * tangent) * x * x + tangent * x;
  return .7 + .3 * tail;
}

const hash = n => { const x = Math.sin(n) * 43758.5453; return x - Math.floor(x); };
function quaternion(x, y, z) {
  const a=Math.cos(x/2), b=Math.sin(x/2), c=Math.cos(y/2), d=Math.sin(y/2), e=Math.cos(z/2), f=Math.sin(z/2);
  return [b*c*e+a*d*f, a*d*e-b*c*f, a*c*f+b*d*e, a*c*e-b*d*f];
}
function multiplyQuaternion(a,b) {
  return [a[3]*b[0]+a[0]*b[3]+a[1]*b[2]-a[2]*b[1],
    a[3]*b[1]-a[0]*b[2]+a[1]*b[3]+a[2]*b[0],
    a[3]*b[2]+a[0]*b[1]-a[1]*b[0]+a[2]*b[3],
    a[3]*b[3]-a[0]*b[0]-a[1]*b[1]-a[2]*b[2]];
}
function axisQuaternion(axis, angle) {
  const length=Math.hypot(...axis)||1,s=Math.sin(angle/2)/length;
  return [axis[0]*s,axis[1]*s,axis[2]*s,Math.cos(angle/2)];
}
// Pick the projected paper face, including its current tilt, with a small edge tolerance.
function hitPaper(p, point, padding) {
  const x=point.x-p.x,y=point.y-p.y,c=p.corners;
  if(!c)return Math.abs(x)<=p.hw+padding && Math.abs(y)<=p.hh+padding;
  let inside=false,nearest=Infinity;
  for(let i=0,j=3;i<4;j=i++) {
    const a=c[i],b=c[j];
    if((a[1]>y)!==(b[1]>y) && x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])inside=!inside;
    const dx=b[0]-a[0],dy=b[1]-a[1];
    const t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/Math.max(.00001,dx*dx+dy*dy)));
    nearest=Math.min(nearest,Math.hypot(x-a[0]-t*dx,y-a[1]-t*dy));
  }
  return inside || nearest<=padding;
}
class HeroMotion {
  constructor(papers) {
    this.papers=papers;
    for(const p of papers) Object.assign(p,{ox:0,oy:0,vx:0,vy:0,spin:0,sv:0,held:0,cooldown:0});
    this.resetInput();
  }
  resetInput() {
    this.anchor=null; this.previous=null; this.candidate=null; this.selected=null;
    this.lastMotionAt=null; this.capturedAt=null; this.motionSequence=null;
    this.sample=null; this.hasSpeed=false; this.cursorSpeed=0; this.mode="attract"; this.moving=false;
  }
  step(now, dt, pointer, viewport, interactive=true) {
    dt=Math.min(.05,Math.max(0,dt));
    let moved=false, segment=null;
    if(!pointer?.inside || !interactive) this.resetInput();
    else {
      const time=Number.isFinite(pointer.motionTime)?pointer.motionTime:now;
      if(!this.anchor) {
        this.anchor={x:pointer.x,y:pointer.y}; this.lastMotionAt=now;
        this.sample={x:pointer.x,y:pointer.y,time,travel:pointer.travel};
        this.motionSequence=pointer.motion;
      } else {
        const fresh=pointer.motion===undefined || pointer.motion!==this.motionSequence;
        const distance=Math.hypot(pointer.x-this.sample.x,pointer.y-this.sample.y);
        moved=fresh && Math.hypot(pointer.x-this.anchor.x,pointer.y-this.anchor.y)>3;
        if(fresh && distance>0) {
          // Use event time even across slow frames: a gentle approach must not become a flick.
          const elapsed=Math.max(.001,time-this.sample.time);
          const travel=Number.isFinite(pointer.travel)&&Number.isFinite(this.sample.travel)
            ? Math.max(distance,pointer.travel-this.sample.travel):distance;
          const rawSpeed=travel/elapsed;
          this.cursorSpeed+=(Math.min(rawSpeed,10000)-this.cursorSpeed)*(1-Math.exp(-elapsed/.04));
          this.hasSpeed=true;
          if(moved && rawSpeed>=HERO_REPEL_SPEED) this.mode="repel";
          else if(this.cursorSpeed<=HERO_ATTRACT_SPEED) this.mode="attract";
          if(moved) {
            this.lastMotionAt=now;
            if(this.mode==="repel") {
              segment=[this.anchor.x,this.anchor.y,pointer.x,pointer.y];
              this.candidate=null; this.selected=null; this.capturedAt=null;
            }
            this.anchor={x:pointer.x,y:pointer.y};
          }
          this.sample={x:pointer.x,y:pointer.y,time,travel:pointer.travel};
        } else if(now-this.lastMotionAt>.04) {
          this.cursorSpeed*=Math.exp(-dt/.04);
        }
        this.motionSequence=pointer.motion;
      }
      if(now-this.lastMotionAt>=.15) {this.mode="attract";this.cursorSpeed=0;}
    }
    this.moving=this.mode==="repel";
    for(const p of this.papers) {
      p.x=p.bx+p.ox; p.y=p.by+p.oy;
      if(segment && p.visible && now>=p.cooldown) {
        const dx=segment[2]-segment[0],dy=segment[3]-segment[1];
        const t=Math.max(0,Math.min(1,((p.x-segment[0])*dx+(p.y-segment[1])*dy)/Math.max(1,dx*dx+dy*dy)));
        const ax=p.x-segment[0]-dx*t,ay=p.y-segment[1]-dy*t,dist=Math.hypot(ax,ay);
        if(dist<45) {
          const angle=Math.atan2(ay,ax)+(hash(p.id*17.371+1.3)-.5)*.6;
          const speed=(360+160*hash(p.id*29.113+4.7))*Math.pow(1-dist/45,.7);
          p.vx+=Math.cos(angle)*speed; p.vy+=Math.sin(angle)*speed;
          const length=Math.hypot(p.vx,p.vy); if(length>640){p.vx*=640/length;p.vy*=640/length;}
          p.touched=true; p.sv=(hash(p.id+71)-.5)*2; p.cooldown=now+.12;
        }
      }
    }
    if(pointer?.inside && interactive && this.mode==="attract"
      && (this.hasSpeed || now-this.lastMotionAt>=.15)) {
      // Capture a nearby sheet once; inertia or floating must not restart a dwell.
      if(this.selected && !this.selected.visible) this.selected=null;
      if(!this.selected) {
        const nearby=this.papers.filter(p=>p.visible && Math.hypot(p.x-pointer.x,p.y-pointer.y)<=100);
        const direct=nearby.filter(p=>hitPaper(p,pointer,3)).sort((a,b)=>b.depth-a.depth);
        this.selected=direct[0] || nearby.sort((a,b)=>Math.hypot(a.x-pointer.x,a.y-pointer.y)-Math.hypot(b.x-pointer.x,b.y-pointer.y) || b.depth-a.depth)[0] || null;
        if(this.selected) this.capturedAt=now;
      }
      this.candidate=this.selected;
    }
    for(const p of this.papers) {
      const damping=this.moving?5:30;
      const decay=Math.exp(-damping*dt), integral=(1-decay)/damping;
      p.ox+=p.vx*integral; p.oy+=p.vy*integral; p.vx*=decay;p.vy*=decay;
      p.spin+=p.sv*integral;p.sv*=decay;
      // A broad container, never a spring to the original spot.
      if(p.touched && p.bx+p.ox < -80) p.vx+=(-80-p.bx-p.ox)*dt*8;
      if(p.touched && p.bx+p.ox > viewport.w+80) p.vx+=(viewport.w+80-p.bx-p.ox)*dt*8;
      if(p.touched && p.by+p.oy < -80) p.vy+=(-80-p.by-p.oy)*dt*8;
      if(p.touched && p.by+p.oy > viewport.h+80) p.vy+=(viewport.h+80-p.by-p.oy)*dt*8;
      const speed=Math.hypot(p.vx,p.vy);
      if(speed>640){p.vx*=640/speed;p.vy*=640/speed;}
      const target=this.selected===p?1:0;
      p.held+=(target-p.held)*(1-Math.exp(-dt*20));
      if(target) {
        p.touched=true;
        const blend=(1-Math.exp(-dt*18))*Math.min(1,(now-this.capturedAt)/.2);
        p.ox+=(pointer.x-p.bx-p.ox)*blend;p.oy+=(pointer.y-p.by-p.oy)*blend;
        p.vx*=Math.exp(-dt*20);p.vy*=Math.exp(-dt*20);
      }
      p.x=p.bx+p.ox;p.y=p.by+p.oy;
    }
    return moved;
  }
}
module.exports={HeroMotion,hash,quaternion,multiplyQuaternion,axisQuaternion,heroIntroEase,HERO_INTRO_DURATION,HERO_MAGNET_SCALE,HERO_REPEL_SPEED,HERO_ATTRACT_SPEED};
