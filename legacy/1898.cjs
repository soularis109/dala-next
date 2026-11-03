var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  Z: function () {
    return i;
  }
});
var r = require("./6881.cjs");
class i {
  constructor(t = new r.P(Infinity, Infinity, Infinity), e = new r.P(-Infinity, -Infinity, -Infinity)) {
    this.min = t;
    this.max = e;
  }
  set(t, e) {
    this.min.copy(t);
    this.max.copy(e);
    return this;
  }
  setFromArray(t) {
    let e = Infinity;
    let n = Infinity;
    let r = Infinity;
    let i = -Infinity;
    let s = -Infinity;
    let a = -Infinity;
    for (let o = 0, l = t.length; o < l; o += 3) {
      const l = t[o];
      const c = t[o + 1];
      const u = t[o + 2];
      if (l < e) {
        e = l;
      }
      if (c < n) {
        n = c;
      }
      if (u < r) {
        r = u;
      }
      if (l > i) {
        i = l;
      }
      if (c > s) {
        s = c;
      }
      if (u > a) {
        a = u;
      }
    }
    this.min.set(e, n, r);
    this.max.set(i, s, a);
    return this;
  }
  setFromBufferAttribute(t) {
    let e = Infinity;
    let n = Infinity;
    let r = Infinity;
    let i = -Infinity;
    let s = -Infinity;
    let a = -Infinity;
    for (let o = 0, l = t.count; o < l; o++) {
      const l = t.getX(o);
      const c = t.getY(o);
      const u = t.getZ(o);
      if (l < e) {
        e = l;
      }
      if (c < n) {
        n = c;
      }
      if (u < r) {
        r = u;
      }
      if (l > i) {
        i = l;
      }
      if (c > s) {
        s = c;
      }
      if (u > a) {
        a = u;
      }
    }
    this.min.set(e, n, r);
    this.max.set(i, s, a);
    return this;
  }
  setFromPoints(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e++) {
      this.expandByPoint(t[e]);
    }
    return this;
  }
  setFromCenterAndSize(t, e) {
    const n = a.copy(e).multiplyScalar(0.5);
    this.min.copy(t).sub(n);
    this.max.copy(t).add(n);
    return this;
  }
  setFromObject(t) {
    this.makeEmpty();
    return this.expandByObject(t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.min.copy(t.min);
    this.max.copy(t.max);
    return this;
  }
  makeEmpty() {
    this.min.x = this.min.y = this.min.z = Infinity;
    this.max.x = this.max.y = this.max.z = -Infinity;
    return this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(t) {
    if (this.isEmpty()) {
      return t.set(0, 0, 0);
    } else {
      return t.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
  }
  getSize(t) {
    if (this.isEmpty()) {
      return t.set(0, 0, 0);
    } else {
      return t.subVectors(this.max, this.min);
    }
  }
  expandByPoint(t) {
    this.min.min(t);
    this.max.max(t);
    return this;
  }
  expandByVector(t) {
    this.min.sub(t);
    this.max.add(t);
    return this;
  }
  expandByScalar(t) {
    this.min.addScalar(-t);
    this.max.addScalar(t);
    return this;
  }
  expandByObject(t) {
    t.updateWorldMatrix(false, false);
    const e = t.geometry;
    if (e !== undefined) {
      if (e.boundingBox === null) {
        e.computeBoundingBox();
      }
      o.copy(e.boundingBox);
      o.applyMatrix4(t.matrixWorld);
      this.union(o);
    }
    const n = t.children;
    for (let t = 0, e = n.length; t < e; t++) {
      this.expandByObject(n[t]);
    }
    return this;
  }
  containsPoint(t) {
    return !(t.x < this.min.x) && !(t.x > this.max.x) && !(t.y < this.min.y) && !(t.y > this.max.y) && !(t.z < this.min.z) && !(t.z > this.max.z);
  }
  containsBox(t) {
    return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z;
  }
  getParameter(t, e) {
    return e.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y), (t.z - this.min.z) / (this.max.z - this.min.z));
  }
  intersectsBox(t) {
    return !(t.max.x < this.min.x) && !(t.min.x > this.max.x) && !(t.max.y < this.min.y) && !(t.min.y > this.max.y) && !(t.max.z < this.min.z) && !(t.min.z > this.max.z);
  }
  intersectsSphere(t) {
    this.clampPoint(t.center, a);
    return a.distanceToSquared(t.center) <= t.radius * t.radius;
  }
  intersectsPlane(t) {
    let e;
    let n;
    if (t.normal.x > 0) {
      e = t.normal.x * this.min.x;
      n = t.normal.x * this.max.x;
    } else {
      e = t.normal.x * this.max.x;
      n = t.normal.x * this.min.x;
    }
    if (t.normal.y > 0) {
      e += t.normal.y * this.min.y;
      n += t.normal.y * this.max.y;
    } else {
      e += t.normal.y * this.max.y;
      n += t.normal.y * this.min.y;
    }
    if (t.normal.z > 0) {
      e += t.normal.z * this.min.z;
      n += t.normal.z * this.max.z;
    } else {
      e += t.normal.z * this.max.z;
      n += t.normal.z * this.min.z;
    }
    return e <= -t.constant && n >= -t.constant;
  }
  intersectsTriangle(t) {
    if (this.isEmpty()) {
      return false;
    }
    this.getCenter(p);
    m.subVectors(this.max, p);
    l.subVectors(t.a, p);
    c.subVectors(t.b, p);
    u.subVectors(t.c, p);
    h.subVectors(c, l);
    d.subVectors(u, c);
    f.subVectors(l, u);
    let e = [0, -h.z, h.y, 0, -d.z, d.y, 0, -f.z, f.y, h.z, 0, -h.x, d.z, 0, -d.x, f.z, 0, -f.x, -h.y, h.x, 0, -d.y, d.x, 0, -f.y, f.x, 0];
    return !!_(e, l, c, u, m) && (e = [1, 0, 0, 0, 1, 0, 0, 0, 1], !!_(e, l, c, u, m) && (g.crossVectors(h, d), e = [g.x, g.y, g.z], _(e, l, c, u, m)));
  }
  clampPoint(t, e) {
    return e.copy(t).clamp(this.min, this.max);
  }
  distanceToPoint(t) {
    return a.copy(t).clamp(this.min, this.max).sub(t).length();
  }
  getBoundingSphere(t) {
    this.getCenter(t.center);
    t.radius = this.getSize(a).length() * 0.5;
    return t;
  }
  intersect(t) {
    this.min.max(t.min);
    this.max.min(t.max);
    if (this.isEmpty()) {
      this.makeEmpty();
    }
    return this;
  }
  union(t) {
    this.min.min(t.min);
    this.max.max(t.max);
    return this;
  }
  applyMatrix4(t) {
    if (!this.isEmpty()) {
      s[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t);
      s[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t);
      s[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t);
      s[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t);
      s[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t);
      s[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t);
      s[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t);
      s[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t);
      this.setFromPoints(s);
    }
    return this;
  }
  translate(t) {
    this.min.add(t);
    this.max.add(t);
    return this;
  }
  equals(t) {
    return t.min.equals(this.min) && t.max.equals(this.max);
  }
}
i.prototype.isBox3 = true;
const s = [new r.P(), new r.P(), new r.P(), new r.P(), new r.P(), new r.P(), new r.P(), new r.P()];
const a = new r.P();
const o = new i();
const l = new r.P();
const c = new r.P();
const u = new r.P();
const h = new r.P();
const d = new r.P();
const f = new r.P();
const p = new r.P();
const m = new r.P();
const g = new r.P();
const v = new r.P();
function _(t, e, n, r, i) {
  for (let s = 0, a = t.length - 3; s <= a; s += 3) {
    v.fromArray(t, s);
    const a = i.x * Math.abs(v.x) + i.y * Math.abs(v.y) + i.z * Math.abs(v.z);
    const o = e.dot(v);
    const l = n.dot(v);
    const c = r.dot(v);
    if (Math.max(-Math.max(o, l, c), Math.min(o, l, c)) > a) {
      return false;
    }
  }
  return true;
}