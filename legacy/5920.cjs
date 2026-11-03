var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  e: function () {
    return l;
  }
});
var r = require("./1301.cjs");
var i = require("./6881.cjs");
var s = require("./140.cjs");
const a = new i.P();
const o = new i.P();
class l extends r.x {
  constructor(t, e) {
    super(t, e);
    this.type = "LineSegments";
  }
  computeLineDistances() {
    const t = this.geometry;
    if (t.isBufferGeometry) {
      if (t.index === null) {
        const e = t.attributes.position;
        const n = [];
        for (let t = 0, r = e.count; t < r; t += 2) {
          a.fromBufferAttribute(e, t);
          o.fromBufferAttribute(e, t + 1);
          n[t] = t === 0 ? 0 : n[t - 1];
          n[t + 1] = n[t] + a.distanceTo(o);
        }
        t.setAttribute("lineDistance", new s.a$(n, 1));
      } else {
        console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
      }
    } else if (t.isGeometry) {
      console.error("THREE.LineSegments.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");
    }
    return this;
  }
}
l.prototype.isLineSegments = true;