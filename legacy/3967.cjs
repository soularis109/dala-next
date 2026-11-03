var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  xC: function () {
    return g;
  }
});
class r {
  constructor(t = true) {
    this.autoStart = t;
    this.startTime = 0;
    this.oldTime = 0;
    this.elapsedTime = 0;
    this.running = false;
  }
  start() {
    this.startTime = i();
    this.oldTime = this.startTime;
    this.elapsedTime = 0;
    this.running = true;
  }
  stop() {
    this.getElapsedTime();
    this.running = false;
    this.autoStart = false;
  }
  getElapsedTime() {
    this.getDelta();
    return this.elapsedTime;
  }
  getDelta() {
    let t = 0;
    if (this.autoStart && !this.running) {
      this.start();
      return 0;
    }
    if (this.running) {
      const e = i();
      t = (e - this.oldTime) / 1000;
      this.oldTime = e;
      this.elapsedTime += t;
    }
    return t;
  }
}
function i() {
  return (typeof performance == "undefined" ? Date : performance).now();
}
var s = require("./1661.cjs");
var a = require("./1138.cjs");
var o = require("./4302.cjs");
var l = require("./3131.cjs");
var c = require("./9046.cjs");
var u = require("./140.cjs");
var h = require("./1154.cjs");
var d = require("./7531.cjs");
var f = require("./8304.cjs");
class p extends f.w {
  constructor(t, e) {
    super();
    this.scene = t;
    this.camera = e;
    this.clear = true;
    this.needsSwap = false;
    this.inverse = false;
  }
  render(t, e, n) {
    const r = t.getContext();
    const i = t.state;
    let s;
    let a;
    i.buffers.color.setMask(false);
    i.buffers.depth.setMask(false);
    i.buffers.color.setLocked(true);
    i.buffers.depth.setLocked(true);
    if (this.inverse) {
      s = 0;
      a = 1;
    } else {
      s = 1;
      a = 0;
    }
    i.buffers.stencil.setTest(true);
    i.buffers.stencil.setOp(r.REPLACE, r.REPLACE, r.REPLACE);
    i.buffers.stencil.setFunc(r.ALWAYS, s, 4294967295);
    i.buffers.stencil.setClear(a);
    i.buffers.stencil.setLocked(true);
    t.setRenderTarget(n);
    if (this.clear) {
      t.clear();
    }
    t.render(this.scene, this.camera);
    t.setRenderTarget(e);
    if (this.clear) {
      t.clear();
    }
    t.render(this.scene, this.camera);
    i.buffers.color.setLocked(false);
    i.buffers.depth.setLocked(false);
    i.buffers.stencil.setLocked(false);
    i.buffers.stencil.setFunc(r.EQUAL, 1, 4294967295);
    i.buffers.stencil.setOp(r.KEEP, r.KEEP, r.KEEP);
    i.buffers.stencil.setLocked(true);
  }
}
class m extends f.w {
  constructor() {
    super();
    this.needsSwap = false;
  }
  render(t) {
    t.state.buffers.stencil.setLocked(false);
    t.state.buffers.stencil.setTest(false);
  }
}
class g {
  constructor(t, e) {
    this.renderer = t;
    if (e === undefined) {
      const n = {
        minFilter: s.wem,
        magFilter: s.wem,
        format: s.wk1
      };
      const r = t.getSize(new a.F());
      this._pixelRatio = t.getPixelRatio();
      this._width = r.width;
      this._height = r.height;
      (e = new o.d(this._width * this._pixelRatio, this._height * this._pixelRatio, n)).texture.name = "EffectComposer.rt1";
    } else {
      this._pixelRatio = 1;
      this._width = e.width;
      this._height = e.height;
    }
    this.renderTarget1 = e;
    this.renderTarget2 = e.clone();
    this.renderTarget2.texture.name = "EffectComposer.rt2";
    this.writeBuffer = this.renderTarget1;
    this.readBuffer = this.renderTarget2;
    this.renderToScreen = true;
    this.passes = [];
    if (h.C === undefined) {
      console.error("THREE.EffectComposer relies on CopyShader");
    }
    if (d.T === undefined) {
      console.error("THREE.EffectComposer relies on ShaderPass");
    }
    this.copyPass = new d.T(h.C);
    this.clock = new r();
  }
  swapBuffers() {
    const t = this.readBuffer;
    this.readBuffer = this.writeBuffer;
    this.writeBuffer = t;
  }
  addPass(t) {
    this.passes.push(t);
    t.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  insertPass(t, e) {
    this.passes.splice(e, 0, t);
    t.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  removePass(t) {
    const e = this.passes.indexOf(t);
    if (e !== -1) {
      this.passes.splice(e, 1);
    }
  }
  isLastEnabledPass(t) {
    for (let e = t + 1; e < this.passes.length; e++) {
      if (this.passes[e].enabled) {
        return false;
      }
    }
    return true;
  }
  render(t = this.clock.getDelta()) {
    const e = this.renderer.getRenderTarget();
    let n = false;
    for (let e = 0, r = this.passes.length; e < r; e++) {
      const r = this.passes[e];
      if (r.enabled !== false) {
        r.renderToScreen = this.renderToScreen && this.isLastEnabledPass(e);
        r.render(this.renderer, this.writeBuffer, this.readBuffer, t, n);
        if (r.needsSwap) {
          if (n) {
            const e = this.renderer.getContext();
            const n = this.renderer.state.buffers.stencil;
            n.setFunc(e.NOTEQUAL, 1, 4294967295);
            this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, t);
            n.setFunc(e.EQUAL, 1, 4294967295);
          }
          this.swapBuffers();
        }
        if (p !== undefined) {
          if (r instanceof p) {
            n = true;
          } else if (r instanceof m) {
            n = false;
          }
        }
      }
    }
    this.renderer.setRenderTarget(e);
  }
  reset(t) {
    if (t === undefined) {
      const e = this.renderer.getSize(new a.F());
      this._pixelRatio = this.renderer.getPixelRatio();
      this._width = e.width;
      this._height = e.height;
      (t = this.renderTarget1.clone()).setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    this.renderTarget1.dispose();
    this.renderTarget2.dispose();
    this.renderTarget1 = t;
    this.renderTarget2 = t.clone();
    this.writeBuffer = this.renderTarget1;
    this.readBuffer = this.renderTarget2;
  }
  setSize(t, e) {
    this._width = t;
    this._height = e;
    const n = this._width * this._pixelRatio;
    const r = this._height * this._pixelRatio;
    this.renderTarget1.setSize(n, r);
    this.renderTarget2.setSize(n, r);
    for (let t = 0; t < this.passes.length; t++) {
      this.passes[t].setSize(n, r);
    }
  }
  setPixelRatio(t) {
    this._pixelRatio = t;
    this.setSize(this._width, this._height);
  }
}
new l.i(-1, 1, 1, -1, 0, 1);
const v = new c.u();
v.setAttribute("position", new u.a$([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3));
v.setAttribute("uv", new u.a$([0, 2, 0, 0, 2, 0], 2));