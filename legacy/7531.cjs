var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  T: function () {
    return a;
  }
});
var r = require("./4595.cjs");
var i = require("./6682.cjs");
var s = require("./8304.cjs");
class a extends s.w {
  constructor(t, e) {
    super();
    this.textureID = e !== undefined ? e : "tDiffuse";
    if (t instanceof r.j) {
      this.uniforms = t.uniforms;
      this.material = t;
    } else if (t) {
      this.uniforms = i.rD.clone(t.uniforms);
      this.material = new r.j({
        defines: Object.assign({}, t.defines),
        uniforms: this.uniforms,
        vertexShader: t.vertexShader,
        fragmentShader: t.fragmentShader
      });
    }
    this.fsQuad = new s.T(this.material);
  }
  render(t, e, n) {
    if (this.uniforms[this.textureID]) {
      this.uniforms[this.textureID].value = n.texture;
    }
    this.fsQuad.material = this.material;
    if (this.renderToScreen) {
      t.setRenderTarget(null);
      this.fsQuad.render(t);
    } else {
      t.setRenderTarget(e);
      if (this.clear) {
        t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil);
      }
      this.fsQuad.render(t);
    }
  }
}