var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  f: function () {
    return s;
  }
});
var r = require("./1661.cjs");
var i = require("./3977.cjs");
class s extends i.x {
  constructor(t, e, n, i, s, a, o, l, c) {
    super(t, e, n, i, s, a, o, l, c);
    this.format = o !== undefined ? o : r.UCm;
    this.minFilter = a !== undefined ? a : r.wem;
    this.magFilter = s !== undefined ? s : r.wem;
    this.generateMipmaps = false;
    const u = this;
    if ("requestVideoFrameCallback" in t) {
      t.requestVideoFrameCallback(function e() {
        u.needsUpdate = true;
        t.requestVideoFrameCallback(e);
      });
    }
  }
  clone() {
    return new this.constructor(this.image).copy(this);
  }
  update() {
    const t = this.image;
    if ("requestVideoFrameCallback" in t === false && t.readyState >= t.HAVE_CURRENT_DATA) {
      this.needsUpdate = true;
    }
  }
}
s.prototype.isVideoTexture = true;