var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  x: function () {
    return g;
  }
});
var r = require("./4699.cjs");
var i = require("./7540.cjs");
var s = require("./9203.cjs");
var a = require("./8478.cjs");
var o = require("./6881.cjs");
var l = require("./5785.cjs");
var c = require("./9046.cjs");
var u = require("./140.cjs");
const h = new o.P();
const d = new o.P();
const f = new s.y();
const p = new i.z();
const m = new r.a();
class g extends a.T {
  constructor(t = new c.u(), e = new l.n()) {
    super();
    this.type = "Line";
    this.geometry = t;
    this.material = e;
    this.updateMorphTargets();
  }
  copy(t) {
    super.copy(t);
    this.material = t.material;
    this.geometry = t.geometry;
    return this;
  }
  computeLineDistances() {
    const t = this.geometry;
    if (t.isBufferGeometry) {
      if (t.index === null) {
        const e = t.attributes.position;
        const n = [0];
        for (let t = 1, r = e.count; t < r; t++) {
          h.fromBufferAttribute(e, t - 1);
          d.fromBufferAttribute(e, t);
          n[t] = n[t - 1];
          n[t] += h.distanceTo(d);
        }
        t.setAttribute("lineDistance", new u.a$(n, 1));
      } else {
        console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
      }
    } else if (t.isGeometry) {
      console.error("THREE.Line.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");
    }
    return this;
  }
  raycast(t, e) {
    const n = this.geometry;
    const r = this.matrixWorld;
    const i = t.params.Line.threshold;
    const s = n.drawRange;
    if (n.boundingSphere === null) {
      n.computeBoundingSphere();
    }
    m.copy(n.boundingSphere);
    m.applyMatrix4(r);
    m.radius += i;
    if (t.ray.intersectsSphere(m) === false) {
      return;
    }
    f.copy(r).invert();
    p.copy(t.ray).applyMatrix4(f);
    const a = i / ((this.scale.x + this.scale.y + this.scale.z) / 3);
    const l = a * a;
    const c = new o.P();
    const u = new o.P();
    const h = new o.P();
    const d = new o.P();
    const g = this.isLineSegments ? 2 : 1;
    if (n.isBufferGeometry) {
      const r = n.index;
      const i = n.attributes.position;
      if (r !== null) {
        for (let n = Math.max(0, s.start), a = Math.min(r.count, s.start + s.count) - 1; n < a; n += g) {
          const s = r.getX(n);
          const a = r.getX(n + 1);
          c.fromBufferAttribute(i, s);
          u.fromBufferAttribute(i, a);
          if (p.distanceSqToSegment(c, u, d, h) > l) {
            continue;
          }
          d.applyMatrix4(this.matrixWorld);
          const o = t.ray.origin.distanceTo(d);
          if (!(o < t.near) && !(o > t.far)) {
            e.push({
              distance: o,
              point: h.clone().applyMatrix4(this.matrixWorld),
              index: n,
              face: null,
              faceIndex: null,
              object: this
            });
          }
        }
      } else {
        for (let n = Math.max(0, s.start), r = Math.min(i.count, s.start + s.count) - 1; n < r; n += g) {
          c.fromBufferAttribute(i, n);
          u.fromBufferAttribute(i, n + 1);
          if (p.distanceSqToSegment(c, u, d, h) > l) {
            continue;
          }
          d.applyMatrix4(this.matrixWorld);
          const r = t.ray.origin.distanceTo(d);
          if (!(r < t.near) && !(r > t.far)) {
            e.push({
              distance: r,
              point: h.clone().applyMatrix4(this.matrixWorld),
              index: n,
              face: null,
              faceIndex: null,
              object: this
            });
          }
        }
      }
    } else if (n.isGeometry) {
      console.error("THREE.Line.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");
    }
  }
  updateMorphTargets() {
    const t = this.geometry;
    if (t.isBufferGeometry) {
      const e = t.morphAttributes;
      const n = Object.keys(e);
      if (n.length > 0) {
        const t = e[n[0]];
        if (t !== undefined) {
          this.morphTargetInfluences = [];
          this.morphTargetDictionary = {};
          for (let e = 0, n = t.length; e < n; e++) {
            const n = t[e].name || String(e);
            this.morphTargetInfluences.push(0);
            this.morphTargetDictionary[n] = e;
          }
        }
      }
    } else {
      const e = t.morphTargets;
      if (e !== undefined && e.length > 0) {
        console.error("THREE.Line.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.");
      }
    }
  }
}
g.prototype.isLine = true;