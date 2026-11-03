var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  d: function () {
    return o;
  }
});
var r = require("./7406.cjs");
var i = require("./3977.cjs");
var s = require("./1661.cjs");
var a = require("./223.cjs");
class o extends r.p {
  constructor(t, e, n = {}) {
    super();
    this.width = t;
    this.height = e;
    this.depth = 1;
    this.scissor = new a.L(0, 0, t, e);
    this.scissorTest = false;
    this.viewport = new a.L(0, 0, t, e);
    this.texture = new i.x(undefined, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.encoding);
    this.texture.isRenderTargetTexture = true;
    this.texture.image = {
      width: t,
      height: e,
      depth: 1
    };
    this.texture.generateMipmaps = n.generateMipmaps !== undefined && n.generateMipmaps;
    this.texture.internalFormat = n.internalFormat !== undefined ? n.internalFormat : null;
    this.texture.minFilter = n.minFilter !== undefined ? n.minFilter : s.wem;
    this.depthBuffer = n.depthBuffer === undefined || n.depthBuffer;
    this.stencilBuffer = n.stencilBuffer !== undefined && n.stencilBuffer;
    this.depthTexture = n.depthTexture !== undefined ? n.depthTexture : null;
  }
  setTexture(t) {
    t.image = {
      width: this.width,
      height: this.height,
      depth: this.depth
    };
    this.texture = t;
  }
  setSize(t, e, n = 1) {
    if (this.width !== t || this.height !== e || this.depth !== n) {
      this.width = t;
      this.height = e;
      this.depth = n;
      this.texture.image.width = t;
      this.texture.image.height = e;
      this.texture.image.depth = n;
      this.dispose();
    }
    this.viewport.set(0, 0, t, e);
    this.scissor.set(0, 0, t, e);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.width = t.width;
    this.height = t.height;
    this.depth = t.depth;
    this.viewport.copy(t.viewport);
    this.texture = t.texture.clone();
    this.texture.image = {
      ...this.texture.image
    };
    this.depthBuffer = t.depthBuffer;
    this.stencilBuffer = t.stencilBuffer;
    this.depthTexture = t.depthTexture;
    return this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
}
o.prototype.isWebGLRenderTarget = true;