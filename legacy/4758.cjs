var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  l: function () {
    return i;
  }
});
var r = require("./140.cjs");
class i extends r.Tl {
  constructor(t, e, n, r = 1) {
    if (typeof n == "number") {
      r = n;
      n = false;
      console.error("THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.");
    }
    super(t, e, n);
    this.meshPerAttribute = r;
  }
  copy(t) {
    super.copy(t);
    this.meshPerAttribute = t.meshPerAttribute;
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.meshPerAttribute = this.meshPerAttribute;
    t.isInstancedBufferAttribute = true;
    return t;
  }
}
i.prototype.isInstancedBufferAttribute = true;