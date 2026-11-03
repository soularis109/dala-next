var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  c: function () {
    return a;
  }
});
var r = require("./5824.cjs");
var i = require("./3882.cjs");
var s = require("./6023.cjs");
class a extends s.a {
  constructor(t) {
    super(t);
  }
  load(t, e, n, s) {
    const a = new i.B();
    const o = new r.S(this.manager);
    o.setCrossOrigin(this.crossOrigin);
    o.setPath(this.path);
    let l = 0;
    function c(n) {
      o.load(t[n], function (t) {
        a.images[n] = t;
        l++;
        if (l === 6) {
          a.needsUpdate = true;
          if (e) {
            e(a);
          }
        }
      }, undefined, s);
    }
    for (let e = 0; e < t.length; ++e) {
      c(e);
    }
    return a;
  }
}