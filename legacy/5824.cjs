var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  S: function () {
    return s;
  }
});
var r = require("./2626.cjs");
var i = require("./6023.cjs");
class s extends i.a {
  constructor(t) {
    super(t);
  }
  load(t, e, n, i) {
    if (this.path !== undefined) {
      t = this.path + t;
    }
    t = this.manager.resolveURL(t);
    const s = this;
    const a = r.C.get(t);
    if (a !== undefined) {
      s.manager.itemStart(t);
      setTimeout(function () {
        if (e) {
          e(a);
        }
        s.manager.itemEnd(t);
      }, 0);
      return a;
    }
    const o = document.createElementNS("http://www.w3.org/1999/xhtml", "img");
    function l() {
      o.removeEventListener("load", l, false);
      o.removeEventListener("error", c, false);
      r.C.add(t, this);
      if (e) {
        e(this);
      }
      s.manager.itemEnd(t);
    }
    function c(e) {
      o.removeEventListener("load", l, false);
      o.removeEventListener("error", c, false);
      if (i) {
        i(e);
      }
      s.manager.itemError(t);
      s.manager.itemEnd(t);
    }
    o.addEventListener("load", l, false);
    o.addEventListener("error", c, false);
    if (t.substr(0, 5) !== "data:" && this.crossOrigin !== undefined) {
      o.crossOrigin = this.crossOrigin;
    }
    s.manager.itemStart(t);
    o.src = t;
    return o;
  }
}