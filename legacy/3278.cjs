var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  d: function () {
    return o;
  }
});
var r = require("./1661.cjs");
var i = require("./5824.cjs");
var s = require("./3977.cjs");
var a = require("./6023.cjs");
class o extends a.a {
  constructor(t) {
    super(t);
  }
  load(t, e, n, a) {
    const o = new s.x();
    const l = new i.S(this.manager);
    l.setCrossOrigin(this.crossOrigin);
    l.setPath(this.path);
    l.load(t, function (n) {
      o.image = n;
      const i = t.search(/\.jpe?g($|\?)/i) > 0 || t.search(/^data\:image\/jpeg/) === 0;
      o.format = i ? r.UCm : r.wk1;
      o.needsUpdate = true;
      if (e !== undefined) {
        e(o);
      }
    }, n, a);
    return o;
  }
}