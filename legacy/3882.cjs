var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  B: function () {
    return s;
  }
});
var r = require("./3977.cjs");
var i = require("./1661.cjs");
class s extends r.x {
  constructor(t, e, n, r, s, a, o, l, c, u) {
    super(t = t !== undefined ? t : [], e = e !== undefined ? e : i.fY$, n, r, s, a, o = o !== undefined ? o : i.UCm, l, c, u);
    this.flipY = false;
  }
  get images() {
    return this.image;
  }
  set images(t) {
    this.image = t;
  }
}
s.prototype.isCubeTexture = true;