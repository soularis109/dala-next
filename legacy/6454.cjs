var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  K: function () {
    return P;
  }
});
var r = require("./6881.cjs");
var i = require("./1138.cjs");
var s = require("./4699.cjs");
var a = require("./7540.cjs");
var o = require("./9203.cjs");
var l = require("./8478.cjs");
var c = require("./8121.cjs");
var u = require("./1661.cjs");
var h = require("./6173.cjs");
var d = require("./9046.cjs");
const f = new o.y();
const p = new a.z();
const m = new s.a();
const g = new r.P();
const v = new r.P();
const _ = new r.P();
const x = new r.P();
const y = new r.P();
const b = new r.P();
const w = new r.P();
const M = new r.P();
const T = new r.P();
const S = new i.F();
const E = new i.F();
const A = new i.F();
const R = new r.P();
const L = new r.P();
class P extends l.T {
  constructor(t = new d.u(), e = new h.v()) {
    super();
    this.type = "Mesh";
    this.geometry = t;
    this.material = e;
    this.updateMorphTargets();
  }
  copy(t) {
    super.copy(t);
    if (t.morphTargetInfluences !== undefined) {
      this.morphTargetInfluences = t.morphTargetInfluences.slice();
    }
    if (t.morphTargetDictionary !== undefined) {
      this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary);
    }
    this.material = t.material;
    this.geometry = t.geometry;
    return this;
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
        console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");
      }
    }
  }
  raycast(t, e) {
    const n = this.geometry;
    const r = this.material;
    const i = this.matrixWorld;
    if (r === undefined) {
      return;
    }
    if (n.boundingSphere === null) {
      n.computeBoundingSphere();
    }
    m.copy(n.boundingSphere);
    m.applyMatrix4(i);
    if (t.ray.intersectsSphere(m) === false) {
      return;
    }
    f.copy(i).invert();
    p.copy(t.ray).applyMatrix4(f);
    if (n.boundingBox !== null && p.intersectsBox(n.boundingBox) === false) {
      return;
    }
    let s;
    if (n.isBufferGeometry) {
      const i = n.index;
      const a = n.attributes.position;
      const o = n.morphAttributes.position;
      const l = n.morphTargetsRelative;
      const c = n.attributes.uv;
      const u = n.attributes.uv2;
      const h = n.groups;
      const d = n.drawRange;
      if (i !== null) {
        if (Array.isArray(r)) {
          for (let n = 0, f = h.length; n < f; n++) {
            const f = h[n];
            const m = r[f.materialIndex];
            for (let n = Math.max(f.start, d.start), r = Math.min(f.start + f.count, d.start + d.count); n < r; n += 3) {
              const r = i.getX(n);
              const h = i.getX(n + 1);
              const d = i.getX(n + 2);
              s = C(this, m, t, p, a, o, l, c, u, r, h, d);
              if (s) {
                s.faceIndex = Math.floor(n / 3);
                s.face.materialIndex = f.materialIndex;
                e.push(s);
              }
            }
          }
        } else {
          for (let n = Math.max(0, d.start), h = Math.min(i.count, d.start + d.count); n < h; n += 3) {
            const h = i.getX(n);
            const d = i.getX(n + 1);
            const f = i.getX(n + 2);
            s = C(this, r, t, p, a, o, l, c, u, h, d, f);
            if (s) {
              s.faceIndex = Math.floor(n / 3);
              e.push(s);
            }
          }
        }
      } else if (a !== undefined) {
        if (Array.isArray(r)) {
          for (let n = 0, i = h.length; n < i; n++) {
            const i = h[n];
            const f = r[i.materialIndex];
            for (let n = Math.max(i.start, d.start), r = Math.min(i.start + i.count, d.start + d.count); n < r; n += 3) {
              s = C(this, f, t, p, a, o, l, c, u, n, n + 1, n + 2);
              if (s) {
                s.faceIndex = Math.floor(n / 3);
                s.face.materialIndex = i.materialIndex;
                e.push(s);
              }
            }
          }
        } else {
          for (let n = Math.max(0, d.start), i = Math.min(a.count, d.start + d.count); n < i; n += 3) {
            s = C(this, r, t, p, a, o, l, c, u, n, n + 1, n + 2);
            if (s) {
              s.faceIndex = Math.floor(n / 3);
              e.push(s);
            }
          }
        }
      }
    } else if (n.isGeometry) {
      console.error("THREE.Mesh.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");
    }
  }
}
function C(t, e, n, s, a, o, l, h, d, f, p, m) {
  g.fromBufferAttribute(a, f);
  v.fromBufferAttribute(a, p);
  _.fromBufferAttribute(a, m);
  const P = t.morphTargetInfluences;
  if (o && P) {
    w.set(0, 0, 0);
    M.set(0, 0, 0);
    T.set(0, 0, 0);
    for (let t = 0, e = o.length; t < e; t++) {
      const e = P[t];
      const n = o[t];
      if (e !== 0) {
        x.fromBufferAttribute(n, f);
        y.fromBufferAttribute(n, p);
        b.fromBufferAttribute(n, m);
        if (l) {
          w.addScaledVector(x, e);
          M.addScaledVector(y, e);
          T.addScaledVector(b, e);
        } else {
          w.addScaledVector(x.sub(g), e);
          M.addScaledVector(y.sub(v), e);
          T.addScaledVector(b.sub(_), e);
        }
      }
    }
    g.add(w);
    v.add(M);
    _.add(T);
  }
  if (t.isSkinnedMesh) {
    t.boneTransform(f, g);
    t.boneTransform(p, v);
    t.boneTransform(m, _);
  }
  const C = function (t, e, n, r, i, s, a, o) {
    let l;
    l = e.side === u._Li ? r.intersectTriangle(a, s, i, true, o) : r.intersectTriangle(i, s, a, e.side !== u.ehD, o);
    if (l === null) {
      return null;
    }
    L.copy(o);
    L.applyMatrix4(t.matrixWorld);
    const c = n.ray.origin.distanceTo(L);
    if (c < n.near || c > n.far) {
      return null;
    } else {
      return {
        distance: c,
        point: L.clone(),
        object: t
      };
    }
  }(t, e, n, s, g, v, _, R);
  if (C) {
    if (h) {
      S.fromBufferAttribute(h, f);
      E.fromBufferAttribute(h, p);
      A.fromBufferAttribute(h, m);
      C.uv = c.C.getUV(R, g, v, _, S, E, A, new i.F());
    }
    if (d) {
      S.fromBufferAttribute(d, f);
      E.fromBufferAttribute(d, p);
      A.fromBufferAttribute(d, m);
      C.uv2 = c.C.getUV(R, g, v, _, S, E, A, new i.F());
    }
    const t = {
      a: f,
      b: p,
      c: m,
      normal: new r.P(),
      materialIndex: 0
    };
    c.C.getNormal(g, v, _, t.normal);
    C.face = t;
  }
  return C;
}
P.prototype.isMesh = true;