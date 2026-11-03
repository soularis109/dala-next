var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  I: function () {
    return s;
  }
});
var r = require("./3977.cjs");
var i = require("./1661.cjs");
class s extends r.x {
  constructor(t = null, e = 1, n = 1, r, s, a, o, l, c = i.TyD, u = i.TyD, h, d) {
    super(null, a, o, l, c, u, r, s, h, d);
    this.image = {
      data: t,
      width: e,
      height: n
    };
    this.magFilter = c;
    this.minFilter = u;
    this.generateMipmaps = false;
    this.flipY = false;
    this.unpackAlignment = 1;
    this.needsUpdate = true;
  }
}
s.prototype.isDataTexture = true;