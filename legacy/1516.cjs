var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  T: function () {
    return d;
  }
});
var r = require("./9046.cjs");
var i = require("./140.cjs");
var s = require("./2043.cjs");
var a = require("./8121.cjs");
var o = require("./6881.cjs");
const l = new o.P();
const c = new o.P();
const u = new o.P();
const h = new a.C();
class d extends r.u {
  constructor(t, e) {
    super();
    this.type = "EdgesGeometry";
    this.parameters = {
      thresholdAngle: e
    };
    e = e !== undefined ? e : 1;
    if (t.isGeometry === true) {
      console.error("THREE.EdgesGeometry no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");
      return;
    }
    const n = Math.pow(10, 4);
    const r = Math.cos(s.qW * e);
    const a = t.getIndex();
    const o = t.getAttribute("position");
    const d = a ? a.count : o.count;
    const f = [0, 0, 0];
    const p = ["a", "b", "c"];
    const m = new Array(3);
    const g = {};
    const v = [];
    for (let t = 0; t < d; t += 3) {
      if (a) {
        f[0] = a.getX(t);
        f[1] = a.getX(t + 1);
        f[2] = a.getX(t + 2);
      } else {
        f[0] = t;
        f[1] = t + 1;
        f[2] = t + 2;
      }
      const {
        a: e,
        b: i,
        c: s
      } = h;
      e.fromBufferAttribute(o, f[0]);
      i.fromBufferAttribute(o, f[1]);
      s.fromBufferAttribute(o, f[2]);
      h.getNormal(u);
      m[0] = `${Math.round(e.x * n)},${Math.round(e.y * n)},${Math.round(e.z * n)}`;
      m[1] = `${Math.round(i.x * n)},${Math.round(i.y * n)},${Math.round(i.z * n)}`;
      m[2] = `${Math.round(s.x * n)},${Math.round(s.y * n)},${Math.round(s.z * n)}`;
      if (m[0] !== m[1] && m[1] !== m[2] && m[2] !== m[0]) {
        for (let t = 0; t < 3; t++) {
          const e = (t + 1) % 3;
          const n = m[t];
          const i = m[e];
          const s = h[p[t]];
          const a = h[p[e]];
          const o = `${n}_${i}`;
          const l = `${i}_${n}`;
          if (l in g && g[l]) {
            if (u.dot(g[l].normal) <= r) {
              v.push(s.x, s.y, s.z);
              v.push(a.x, a.y, a.z);
            }
            g[l] = null;
          } else if (!(o in g)) {
            g[o] = {
              index0: f[t],
              index1: f[e],
              normal: u.clone()
            };
          }
        }
      }
    }
    for (const t in g) {
      if (g[t]) {
        const {
          index0: e,
          index1: n
        } = g[t];
        l.fromBufferAttribute(o, e);
        c.fromBufferAttribute(o, n);
        v.push(l.x, l.y, l.z);
        v.push(c.x, c.y, c.z);
      }
    }
    this.setAttribute("position", new i.a$(v, 3));
  }
}