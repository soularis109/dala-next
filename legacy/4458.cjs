var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  C: function () {
    return s;
  }
});
var r = require("./3662.cjs");
var i = require("./8304.cjs");
class s extends i.w {
  constructor(t, e, n, i, s) {
    super();
    this.scene = t;
    this.camera = e;
    this.overrideMaterial = n;
    this.clearColor = i;
    this.clearAlpha = s !== undefined ? s : 0;
    this.clear = true;
    this.clearDepth = false;
    this.needsSwap = false;
    this._oldClearColor = new r.I();
  }
  render(t, e, n) {
    const r = t.autoClear;
    let i;
    let s;
    t.autoClear = false;
    if (this.overrideMaterial !== undefined) {
      s = this.scene.overrideMaterial;
      this.scene.overrideMaterial = this.overrideMaterial;
    }
    if (this.clearColor) {
      t.getClearColor(this._oldClearColor);
      i = t.getClearAlpha();
      t.setClearColor(this.clearColor, this.clearAlpha);
    }
    if (this.clearDepth) {
      t.clearDepth();
    }
    t.setRenderTarget(this.renderToScreen ? null : n);
    if (this.clear) {
      t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil);
    }
    t.render(this.scene, this.camera);
    if (this.clearColor) {
      t.setClearColor(this._oldClearColor, i);
    }
    if (this.overrideMaterial !== undefined) {
      this.scene.overrideMaterial = s;
    }
    t.autoClear = r;
  }
}