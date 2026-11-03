var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  C: function () {
    return p;
  }
});
var r = require("./6881.cjs");
const i = new r.P();
const s = new r.P();
const a = new r.P();
const o = new r.P();
const l = new r.P();
const c = new r.P();
const u = new r.P();
const h = new r.P();
const d = new r.P();
const f = new r.P();
class p {
  constructor(t = new r.P(), e = new r.P(), n = new r.P()) {
    this.a = t;
    this.b = e;
    this.c = n;
  }
  static getNormal(t, e, n, r) {
    r.subVectors(n, e);
    i.subVectors(t, e);
    r.cross(i);
    const s = r.lengthSq();
    if (s > 0) {
      return r.multiplyScalar(1 / Math.sqrt(s));
    } else {
      return r.set(0, 0, 0);
    }
  }
  static getBarycoord(t, e, n, r, o) {
    i.subVectors(r, e);
    s.subVectors(n, e);
    a.subVectors(t, e);
    const l = i.dot(i);
    const c = i.dot(s);
    const u = i.dot(a);
    const h = s.dot(s);
    const d = s.dot(a);
    const f = l * h - c * c;
    if (f === 0) {
      return o.set(-2, -1, -1);
    }
    const p = 1 / f;
    const m = (h * u - c * d) * p;
    const g = (l * d - c * u) * p;
    return o.set(1 - m - g, g, m);
  }
  static containsPoint(t, e, n, r) {
    this.getBarycoord(t, e, n, r, o);
    return o.x >= 0 && o.y >= 0 && o.x + o.y <= 1;
  }
  static getUV(t, e, n, r, i, s, a, l) {
    this.getBarycoord(t, e, n, r, o);
    l.set(0, 0);
    l.addScaledVector(i, o.x);
    l.addScaledVector(s, o.y);
    l.addScaledVector(a, o.z);
    return l;
  }
  static isFrontFacing(t, e, n, r) {
    i.subVectors(n, e);
    s.subVectors(t, e);
    return i.cross(s).dot(r) < 0;
  }
  set(t, e, n) {
    this.a.copy(t);
    this.b.copy(e);
    this.c.copy(n);
    return this;
  }
  setFromPointsAndIndices(t, e, n, r) {
    this.a.copy(t[e]);
    this.b.copy(t[n]);
    this.c.copy(t[r]);
    return this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.a.copy(t.a);
    this.b.copy(t.b);
    this.c.copy(t.c);
    return this;
  }
  getArea() {
    i.subVectors(this.c, this.b);
    s.subVectors(this.a, this.b);
    return i.cross(s).length() * 0.5;
  }
  getMidpoint(t) {
    return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(t) {
    return p.getNormal(this.a, this.b, this.c, t);
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(t, e) {
    return p.getBarycoord(t, this.a, this.b, this.c, e);
  }
  getUV(t, e, n, r, i) {
    return p.getUV(t, this.a, this.b, this.c, e, n, r, i);
  }
  containsPoint(t) {
    return p.containsPoint(t, this.a, this.b, this.c);
  }
  isFrontFacing(t) {
    return p.isFrontFacing(this.a, this.b, this.c, t);
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  closestPointToPoint(t, e) {
    const n = this.a;
    const r = this.b;
    const i = this.c;
    let s;
    let a;
    l.subVectors(r, n);
    c.subVectors(i, n);
    h.subVectors(t, n);
    const o = l.dot(h);
    const p = c.dot(h);
    if (o <= 0 && p <= 0) {
      return e.copy(n);
    }
    d.subVectors(t, r);
    const m = l.dot(d);
    const g = c.dot(d);
    if (m >= 0 && g <= m) {
      return e.copy(r);
    }
    const v = o * g - m * p;
    if (v <= 0 && o >= 0 && m <= 0) {
      s = o / (o - m);
      return e.copy(n).addScaledVector(l, s);
    }
    f.subVectors(t, i);
    const _ = l.dot(f);
    const x = c.dot(f);
    if (x >= 0 && _ <= x) {
      return e.copy(i);
    }
    const y = _ * p - o * x;
    if (y <= 0 && p >= 0 && x <= 0) {
      a = p / (p - x);
      return e.copy(n).addScaledVector(c, a);
    }
    const b = m * x - _ * g;
    if (b <= 0 && g - m >= 0 && _ - x >= 0) {
      u.subVectors(i, r);
      a = (g - m) / (g - m + (_ - x));
      return e.copy(r).addScaledVector(u, a);
    }
    const w = 1 / (b + y + v);
    s = y * w;
    a = v * w;
    return e.copy(n).addScaledVector(l, s).addScaledVector(c, a);
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}