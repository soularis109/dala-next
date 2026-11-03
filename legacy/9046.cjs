var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  u: function () {
    return b;
  }
});
var r = require("./6881.cjs");
var i = require("./1138.cjs");
var s = require("./1898.cjs");
var a = require("./7406.cjs");
var o = require("./140.cjs");
var l = require("./4699.cjs");
var c = require("./8478.cjs");
var u = require("./9203.cjs");
var h = require("./1273.cjs");
var d = require("./2043.cjs");
var f = require("./392.cjs");
let p = 0;
const m = new u.y();
const g = new c.T();
const v = new r.P();
const _ = new s.Z();
const x = new s.Z();
const y = new r.P();
class b extends a.p {
  constructor() {
    super();
    Object.defineProperty(this, "id", {
      value: p++
    });
    this.uuid = d.DO();
    this.name = "";
    this.type = "BufferGeometry";
    this.index = null;
    this.attributes = {};
    this.morphAttributes = {};
    this.morphTargetsRelative = false;
    this.groups = [];
    this.boundingBox = null;
    this.boundingSphere = null;
    this.drawRange = {
      start: 0,
      count: Infinity
    };
    this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    if (Array.isArray(t)) {
      this.index = new ((0, f.uH)(t) > 65535 ? o.lC : o.ql)(t, 1);
    } else {
      this.index = t;
    }
    return this;
  }
  getAttribute(t) {
    return this.attributes[t];
  }
  setAttribute(t, e) {
    this.attributes[t] = e;
    return this;
  }
  deleteAttribute(t) {
    delete this.attributes[t];
    return this;
  }
  hasAttribute(t) {
    return this.attributes[t] !== undefined;
  }
  addGroup(t, e, n = 0) {
    this.groups.push({
      start: t,
      count: e,
      materialIndex: n
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(t, e) {
    this.drawRange.start = t;
    this.drawRange.count = e;
  }
  applyMatrix4(t) {
    const e = this.attributes.position;
    if (e !== undefined) {
      e.applyMatrix4(t);
      e.needsUpdate = true;
    }
    const n = this.attributes.normal;
    if (n !== undefined) {
      const e = new h.V().getNormalMatrix(t);
      n.applyNormalMatrix(e);
      n.needsUpdate = true;
    }
    const r = this.attributes.tangent;
    if (r !== undefined) {
      r.transformDirection(t);
      r.needsUpdate = true;
    }
    if (this.boundingBox !== null) {
      this.computeBoundingBox();
    }
    if (this.boundingSphere !== null) {
      this.computeBoundingSphere();
    }
    return this;
  }
  applyQuaternion(t) {
    m.makeRotationFromQuaternion(t);
    this.applyMatrix4(m);
    return this;
  }
  rotateX(t) {
    m.makeRotationX(t);
    this.applyMatrix4(m);
    return this;
  }
  rotateY(t) {
    m.makeRotationY(t);
    this.applyMatrix4(m);
    return this;
  }
  rotateZ(t) {
    m.makeRotationZ(t);
    this.applyMatrix4(m);
    return this;
  }
  translate(t, e, n) {
    m.makeTranslation(t, e, n);
    this.applyMatrix4(m);
    return this;
  }
  scale(t, e, n) {
    m.makeScale(t, e, n);
    this.applyMatrix4(m);
    return this;
  }
  lookAt(t) {
    g.lookAt(t);
    g.updateMatrix();
    this.applyMatrix4(g.matrix);
    return this;
  }
  center() {
    this.computeBoundingBox();
    this.boundingBox.getCenter(v).negate();
    this.translate(v.x, v.y, v.z);
    return this;
  }
  setFromPoints(t) {
    const e = [];
    for (let n = 0, r = t.length; n < r; n++) {
      const r = t[n];
      e.push(r.x, r.y, r.z || 0);
    }
    this.setAttribute("position", new o.a$(e, 3));
    return this;
  }
  computeBoundingBox() {
    if (this.boundingBox === null) {
      this.boundingBox = new s.Z();
    }
    const t = this.attributes.position;
    const e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set \"mesh.frustumCulled\" to \"false\".", this);
      this.boundingBox.set(new r.P(-Infinity, -Infinity, -Infinity), new r.P(Infinity, Infinity, Infinity));
      return;
    }
    if (t !== undefined) {
      this.boundingBox.setFromBufferAttribute(t);
      if (e) {
        for (let t = 0, n = e.length; t < n; t++) {
          const n = e[t];
          _.setFromBufferAttribute(n);
          if (this.morphTargetsRelative) {
            y.addVectors(this.boundingBox.min, _.min);
            this.boundingBox.expandByPoint(y);
            y.addVectors(this.boundingBox.max, _.max);
            this.boundingBox.expandByPoint(y);
          } else {
            this.boundingBox.expandByPoint(_.min);
            this.boundingBox.expandByPoint(_.max);
          }
        }
      }
    } else {
      this.boundingBox.makeEmpty();
    }
    if (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The \"position\" attribute is likely to have NaN values.", this);
    }
  }
  computeBoundingSphere() {
    if (this.boundingSphere === null) {
      this.boundingSphere = new l.a();
    }
    const t = this.attributes.position;
    const e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set \"mesh.frustumCulled\" to \"false\".", this);
      this.boundingSphere.set(new r.P(), Infinity);
      return;
    }
    if (t) {
      const n = this.boundingSphere.center;
      _.setFromBufferAttribute(t);
      if (e) {
        for (let t = 0, n = e.length; t < n; t++) {
          const n = e[t];
          x.setFromBufferAttribute(n);
          if (this.morphTargetsRelative) {
            y.addVectors(_.min, x.min);
            _.expandByPoint(y);
            y.addVectors(_.max, x.max);
            _.expandByPoint(y);
          } else {
            _.expandByPoint(x.min);
            _.expandByPoint(x.max);
          }
        }
      }
      _.getCenter(n);
      let r = 0;
      for (let e = 0, i = t.count; e < i; e++) {
        y.fromBufferAttribute(t, e);
        r = Math.max(r, n.distanceToSquared(y));
      }
      if (e) {
        for (let i = 0, s = e.length; i < s; i++) {
          const s = e[i];
          const a = this.morphTargetsRelative;
          for (let e = 0, i = s.count; e < i; e++) {
            y.fromBufferAttribute(s, e);
            if (a) {
              v.fromBufferAttribute(t, e);
              y.add(v);
            }
            r = Math.max(r, n.distanceToSquared(y));
          }
        }
      }
      this.boundingSphere.radius = Math.sqrt(r);
      if (isNaN(this.boundingSphere.radius)) {
        console.error("THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The \"position\" attribute is likely to have NaN values.", this);
      }
    }
  }
  computeTangents() {
    const t = this.index;
    const e = this.attributes;
    if (t === null || e.position === undefined || e.normal === undefined || e.uv === undefined) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = t.array;
    const s = e.position.array;
    const a = e.normal.array;
    const l = e.uv.array;
    const c = s.length / 3;
    if (e.tangent === undefined) {
      this.setAttribute("tangent", new o.Tl(new Float32Array(c * 4), 4));
    }
    const u = e.tangent.array;
    const h = [];
    const d = [];
    for (let t = 0; t < c; t++) {
      h[t] = new r.P();
      d[t] = new r.P();
    }
    const f = new r.P();
    const p = new r.P();
    const m = new r.P();
    const g = new i.F();
    const v = new i.F();
    const _ = new i.F();
    const x = new r.P();
    const y = new r.P();
    function b(t, e, n) {
      f.fromArray(s, t * 3);
      p.fromArray(s, e * 3);
      m.fromArray(s, n * 3);
      g.fromArray(l, t * 2);
      v.fromArray(l, e * 2);
      _.fromArray(l, n * 2);
      p.sub(f);
      m.sub(f);
      v.sub(g);
      _.sub(g);
      const r = 1 / (v.x * _.y - _.x * v.y);
      if (isFinite(r)) {
        x.copy(p).multiplyScalar(_.y).addScaledVector(m, -v.y).multiplyScalar(r);
        y.copy(m).multiplyScalar(v.x).addScaledVector(p, -_.x).multiplyScalar(r);
        h[t].add(x);
        h[e].add(x);
        h[n].add(x);
        d[t].add(y);
        d[e].add(y);
        d[n].add(y);
      }
    }
    let w = this.groups;
    if (w.length === 0) {
      w = [{
        start: 0,
        count: n.length
      }];
    }
    for (let t = 0, e = w.length; t < e; ++t) {
      const e = w[t];
      const r = e.start;
      for (let t = r, i = r + e.count; t < i; t += 3) {
        b(n[t + 0], n[t + 1], n[t + 2]);
      }
    }
    const M = new r.P();
    const T = new r.P();
    const S = new r.P();
    const E = new r.P();
    function A(t) {
      S.fromArray(a, t * 3);
      E.copy(S);
      const e = h[t];
      M.copy(e);
      M.sub(S.multiplyScalar(S.dot(e))).normalize();
      T.crossVectors(E, e);
      const n = T.dot(d[t]) < 0 ? -1 : 1;
      u[t * 4] = M.x;
      u[t * 4 + 1] = M.y;
      u[t * 4 + 2] = M.z;
      u[t * 4 + 3] = n;
    }
    for (let t = 0, e = w.length; t < e; ++t) {
      const e = w[t];
      const r = e.start;
      for (let t = r, i = r + e.count; t < i; t += 3) {
        A(n[t + 0]);
        A(n[t + 1]);
        A(n[t + 2]);
      }
    }
  }
  computeVertexNormals() {
    const t = this.index;
    const e = this.getAttribute("position");
    if (e !== undefined) {
      let n = this.getAttribute("normal");
      if (n === undefined) {
        n = new o.Tl(new Float32Array(e.count * 3), 3);
        this.setAttribute("normal", n);
      } else {
        for (let t = 0, e = n.count; t < e; t++) {
          n.setXYZ(t, 0, 0, 0);
        }
      }
      const i = new r.P();
      const s = new r.P();
      const a = new r.P();
      const l = new r.P();
      const c = new r.P();
      const u = new r.P();
      const h = new r.P();
      const d = new r.P();
      if (t) {
        for (let r = 0, o = t.count; r < o; r += 3) {
          const o = t.getX(r + 0);
          const f = t.getX(r + 1);
          const p = t.getX(r + 2);
          i.fromBufferAttribute(e, o);
          s.fromBufferAttribute(e, f);
          a.fromBufferAttribute(e, p);
          h.subVectors(a, s);
          d.subVectors(i, s);
          h.cross(d);
          l.fromBufferAttribute(n, o);
          c.fromBufferAttribute(n, f);
          u.fromBufferAttribute(n, p);
          l.add(h);
          c.add(h);
          u.add(h);
          n.setXYZ(o, l.x, l.y, l.z);
          n.setXYZ(f, c.x, c.y, c.z);
          n.setXYZ(p, u.x, u.y, u.z);
        }
      } else {
        for (let t = 0, r = e.count; t < r; t += 3) {
          i.fromBufferAttribute(e, t + 0);
          s.fromBufferAttribute(e, t + 1);
          a.fromBufferAttribute(e, t + 2);
          h.subVectors(a, s);
          d.subVectors(i, s);
          h.cross(d);
          n.setXYZ(t + 0, h.x, h.y, h.z);
          n.setXYZ(t + 1, h.x, h.y, h.z);
          n.setXYZ(t + 2, h.x, h.y, h.z);
        }
      }
      this.normalizeNormals();
      n.needsUpdate = true;
    }
  }
  merge(t, e) {
    if (!t || !t.isBufferGeometry) {
      console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", t);
      return;
    }
    if (e === undefined) {
      e = 0;
      console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge.");
    }
    const n = this.attributes;
    for (const r in n) {
      if (t.attributes[r] === undefined) {
        continue;
      }
      const i = n[r].array;
      const s = t.attributes[r];
      const a = s.array;
      const o = s.itemSize * e;
      const l = Math.min(a.length, i.length - o);
      for (let t = 0, e = o; t < l; t++, e++) {
        i[e] = a[t];
      }
    }
    return this;
  }
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let e = 0, n = t.count; e < n; e++) {
      y.fromBufferAttribute(t, e);
      y.normalize();
      t.setXYZ(e, y.x, y.y, y.z);
    }
  }
  toNonIndexed() {
    function t(t, e) {
      const n = t.array;
      const r = t.itemSize;
      const i = t.normalized;
      const s = new n.constructor(e.length * r);
      let a = 0;
      let l = 0;
      for (let i = 0, o = e.length; i < o; i++) {
        a = t.isInterleavedBufferAttribute ? e[i] * t.data.stride + t.offset : e[i] * r;
        for (let t = 0; t < r; t++) {
          s[l++] = n[a++];
        }
      }
      return new o.Tl(s, r, i);
    }
    if (this.index === null) {
      console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.");
      return this;
    }
    const e = new b();
    const n = this.index.array;
    const r = this.attributes;
    for (const i in r) {
      const s = t(r[i], n);
      e.setAttribute(i, s);
    }
    const i = this.morphAttributes;
    for (const r in i) {
      const s = [];
      const a = i[r];
      for (let e = 0, r = a.length; e < r; e++) {
        const r = t(a[e], n);
        s.push(r);
      }
      e.morphAttributes[r] = s;
    }
    e.morphTargetsRelative = this.morphTargetsRelative;
    const s = this.groups;
    for (let t = 0, n = s.length; t < n; t++) {
      const n = s[t];
      e.addGroup(n.start, n.count, n.materialIndex);
    }
    return e;
  }
  toJSON() {
    const t = {
      metadata: {
        version: 4.5,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    t.uuid = this.uuid;
    t.type = this.type;
    if (this.name !== "") {
      t.name = this.name;
    }
    if (Object.keys(this.userData).length > 0) {
      t.userData = this.userData;
    }
    if (this.parameters !== undefined) {
      const e = this.parameters;
      for (const n in e) {
        if (e[n] !== undefined) {
          t[n] = e[n];
        }
      }
      return t;
    }
    t.data = {
      attributes: {}
    };
    const e = this.index;
    if (e !== null) {
      t.data.index = {
        type: e.array.constructor.name,
        array: Array.prototype.slice.call(e.array)
      };
    }
    const n = this.attributes;
    for (const e in n) {
      const r = n[e];
      t.data.attributes[e] = r.toJSON(t.data);
    }
    const r = {};
    let i = false;
    for (const e in this.morphAttributes) {
      const n = this.morphAttributes[e];
      const s = [];
      for (let e = 0, r = n.length; e < r; e++) {
        const r = n[e];
        s.push(r.toJSON(t.data));
      }
      if (s.length > 0) {
        r[e] = s;
        i = true;
      }
    }
    if (i) {
      t.data.morphAttributes = r;
      t.data.morphTargetsRelative = this.morphTargetsRelative;
    }
    const s = this.groups;
    if (s.length > 0) {
      t.data.groups = JSON.parse(JSON.stringify(s));
    }
    const a = this.boundingSphere;
    if (a !== null) {
      t.data.boundingSphere = {
        center: a.center.toArray(),
        radius: a.radius
      };
    }
    return t;
  }
  clone() {
    return new b().copy(this);
  }
  copy(t) {
    this.index = null;
    this.attributes = {};
    this.morphAttributes = {};
    this.groups = [];
    this.boundingBox = null;
    this.boundingSphere = null;
    const e = {};
    this.name = t.name;
    const n = t.index;
    if (n !== null) {
      this.setIndex(n.clone(e));
    }
    const r = t.attributes;
    for (const t in r) {
      const n = r[t];
      this.setAttribute(t, n.clone(e));
    }
    const i = t.morphAttributes;
    for (const t in i) {
      const n = [];
      const r = i[t];
      for (let t = 0, i = r.length; t < i; t++) {
        n.push(r[t].clone(e));
      }
      this.morphAttributes[t] = n;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const s = t.groups;
    for (let t = 0, e = s.length; t < e; t++) {
      const e = s[t];
      this.addGroup(e.start, e.count, e.materialIndex);
    }
    const a = t.boundingBox;
    if (a !== null) {
      this.boundingBox = a.clone();
    }
    const o = t.boundingSphere;
    if (o !== null) {
      this.boundingSphere = o.clone();
    }
    this.drawRange.start = t.drawRange.start;
    this.drawRange.count = t.drawRange.count;
    this.userData = t.userData;
    return this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
}
b.prototype.isBufferGeometry = true;