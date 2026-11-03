var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  _: function () {
    return s;
  },
  B: function () {
    return s;
  }
});
var r = require("./9046.cjs");
var i = require("./140.cjs");
class s extends r.u {
  constructor(t = 1, e = 1, n = 1, r = 1) {
    super();
    this.type = "PlaneGeometry";
    this.parameters = {
      width: t,
      height: e,
      widthSegments: n,
      heightSegments: r
    };
    const s = t / 2;
    const a = e / 2;
    const o = Math.floor(n);
    const l = Math.floor(r);
    const c = o + 1;
    const u = l + 1;
    const h = t / o;
    const d = e / l;
    const f = [];
    const p = [];
    const m = [];
    const g = [];
    for (let t = 0; t < u; t++) {
      const e = t * d - a;
      for (let n = 0; n < c; n++) {
        const r = n * h - s;
        p.push(r, -e, 0);
        m.push(0, 0, 1);
        g.push(n / o);
        g.push(1 - t / l);
      }
    }
    for (let t = 0; t < l; t++) {
      for (let e = 0; e < o; e++) {
        const n = e + c * t;
        const r = e + c * (t + 1);
        const i = e + 1 + c * (t + 1);
        const s = e + 1 + c * t;
        f.push(n, r, s);
        f.push(r, i, s);
      }
    }
    this.setIndex(f);
    this.setAttribute("position", new i.a$(p, 3));
    this.setAttribute("normal", new i.a$(m, 3));
    this.setAttribute("uv", new i.a$(g, 2));
  }
  static fromJSON(t) {
    return new s(t.width, t.height, t.widthSegments, t.heightSegments);
  }
}