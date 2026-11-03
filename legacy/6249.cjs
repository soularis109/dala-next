var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  b: function () {
    return L;
  }
});
var r = {};
__d(r, {
  ArcCurve: function () {
    return u;
  },
  CatmullRomCurve3: function () {
    return g;
  },
  CubicBezierCurve: function () {
    return y;
  },
  CubicBezierCurve3: function () {
    return b;
  },
  EllipseCurve: function () {
    return c;
  },
  LineCurve: function () {
    return w;
  },
  LineCurve3: function () {
    return M;
  },
  QuadraticBezierCurve: function () {
    return T;
  },
  QuadraticBezierCurve3: function () {
    return S;
  },
  SplineCurve: function () {
    return E;
  }
});
var i = require("./1138.cjs");
var s = require("./2043.cjs");
var a = require("./6881.cjs");
var o = require("./9203.cjs");
class l {
  constructor() {
    this.type = "Curve";
    this.arcLengthDivisions = 200;
  }
  getPoint() {
    console.warn("THREE.Curve: .getPoint() not implemented.");
    return null;
  }
  getPointAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getPoint(n, e);
  }
  getPoints(t = 5) {
    const e = [];
    for (let n = 0; n <= t; n++) {
      e.push(this.getPoint(n / t));
    }
    return e;
  }
  getSpacedPoints(t = 5) {
    const e = [];
    for (let n = 0; n <= t; n++) {
      e.push(this.getPointAt(n / t));
    }
    return e;
  }
  getLength() {
    const t = this.getLengths();
    return t[t.length - 1];
  }
  getLengths(t = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === t + 1 && !this.needsUpdate) {
      return this.cacheArcLengths;
    }
    this.needsUpdate = false;
    const e = [];
    let n;
    let r = this.getPoint(0);
    let i = 0;
    e.push(0);
    for (let s = 1; s <= t; s++) {
      n = this.getPoint(s / t);
      i += n.distanceTo(r);
      e.push(i);
      r = n;
    }
    this.cacheArcLengths = e;
    return e;
  }
  updateArcLengths() {
    this.needsUpdate = true;
    this.getLengths();
  }
  getUtoTmapping(t, e) {
    const n = this.getLengths();
    let r = 0;
    const i = n.length;
    let s;
    s = e || t * n[i - 1];
    let a;
    let o = 0;
    let l = i - 1;
    while (o <= l) {
      r = Math.floor(o + (l - o) / 2);
      a = n[r] - s;
      if (a < 0) {
        o = r + 1;
      } else {
        if (!(a > 0)) {
          l = r;
          break;
        }
        l = r - 1;
      }
    }
    r = l;
    if (n[r] === s) {
      return r / (i - 1);
    }
    const c = n[r];
    return (r + (s - c) / (n[r + 1] - c)) / (i - 1);
  }
  getTangent(t, e) {
    const n = 0.0001;
    let r = t - n;
    let s = t + n;
    if (r < 0) {
      r = 0;
    }
    if (s > 1) {
      s = 1;
    }
    const o = this.getPoint(r);
    const l = this.getPoint(s);
    const c = e || (o.isVector2 ? new i.F() : new a.P());
    c.copy(l).sub(o).normalize();
    return c;
  }
  getTangentAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getTangent(n, e);
  }
  computeFrenetFrames(t, e) {
    const n = new a.P();
    const r = [];
    const i = [];
    const l = [];
    const c = new a.P();
    const u = new o.y();
    for (let e = 0; e <= t; e++) {
      const n = e / t;
      r[e] = this.getTangentAt(n, new a.P());
      r[e].normalize();
    }
    i[0] = new a.P();
    l[0] = new a.P();
    let h = Number.MAX_VALUE;
    const d = Math.abs(r[0].x);
    const f = Math.abs(r[0].y);
    const p = Math.abs(r[0].z);
    if (d <= h) {
      h = d;
      n.set(1, 0, 0);
    }
    if (f <= h) {
      h = f;
      n.set(0, 1, 0);
    }
    if (p <= h) {
      n.set(0, 0, 1);
    }
    c.crossVectors(r[0], n).normalize();
    i[0].crossVectors(r[0], c);
    l[0].crossVectors(r[0], i[0]);
    for (let e = 1; e <= t; e++) {
      i[e] = i[e - 1].clone();
      l[e] = l[e - 1].clone();
      c.crossVectors(r[e - 1], r[e]);
      if (c.length() > Number.EPSILON) {
        c.normalize();
        const t = Math.acos(s.uZ(r[e - 1].dot(r[e]), -1, 1));
        i[e].applyMatrix4(u.makeRotationAxis(c, t));
      }
      l[e].crossVectors(r[e], i[e]);
    }
    if (e === true) {
      let e = Math.acos(s.uZ(i[0].dot(i[t]), -1, 1));
      e /= t;
      if (r[0].dot(c.crossVectors(i[0], i[t])) > 0) {
        e = -e;
      }
      for (let n = 1; n <= t; n++) {
        i[n].applyMatrix4(u.makeRotationAxis(r[n], e * n));
        l[n].crossVectors(r[n], i[n]);
      }
    }
    return {
      tangents: r,
      normals: i,
      binormals: l
    };
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.arcLengthDivisions = t.arcLengthDivisions;
    return this;
  }
  toJSON() {
    const t = {
      metadata: {
        version: 4.5,
        type: "Curve",
        generator: "Curve.toJSON"
      }
    };
    t.arcLengthDivisions = this.arcLengthDivisions;
    t.type = this.type;
    return t;
  }
  fromJSON(t) {
    this.arcLengthDivisions = t.arcLengthDivisions;
    return this;
  }
}
class c extends l {
  constructor(t = 0, e = 0, n = 1, r = 1, i = 0, s = Math.PI * 2, a = false, o = 0) {
    super();
    this.type = "EllipseCurve";
    this.aX = t;
    this.aY = e;
    this.xRadius = n;
    this.yRadius = r;
    this.aStartAngle = i;
    this.aEndAngle = s;
    this.aClockwise = a;
    this.aRotation = o;
  }
  getPoint(t, e) {
    const n = e || new i.F();
    const r = Math.PI * 2;
    let s = this.aEndAngle - this.aStartAngle;
    const a = Math.abs(s) < Number.EPSILON;
    while (s < 0) {
      s += r;
    }
    while (s > r) {
      s -= r;
    }
    if (s < Number.EPSILON) {
      s = a ? 0 : r;
    }
    if (this.aClockwise === true && !a) {
      if (s === r) {
        s = -r;
      } else {
        s -= r;
      }
    }
    const o = this.aStartAngle + t * s;
    let l = this.aX + this.xRadius * Math.cos(o);
    let c = this.aY + this.yRadius * Math.sin(o);
    if (this.aRotation !== 0) {
      const t = Math.cos(this.aRotation);
      const e = Math.sin(this.aRotation);
      const n = l - this.aX;
      const r = c - this.aY;
      l = n * t - r * e + this.aX;
      c = n * e + r * t + this.aY;
    }
    return n.set(l, c);
  }
  copy(t) {
    super.copy(t);
    this.aX = t.aX;
    this.aY = t.aY;
    this.xRadius = t.xRadius;
    this.yRadius = t.yRadius;
    this.aStartAngle = t.aStartAngle;
    this.aEndAngle = t.aEndAngle;
    this.aClockwise = t.aClockwise;
    this.aRotation = t.aRotation;
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.aX = this.aX;
    t.aY = this.aY;
    t.xRadius = this.xRadius;
    t.yRadius = this.yRadius;
    t.aStartAngle = this.aStartAngle;
    t.aEndAngle = this.aEndAngle;
    t.aClockwise = this.aClockwise;
    t.aRotation = this.aRotation;
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t);
    this.aX = t.aX;
    this.aY = t.aY;
    this.xRadius = t.xRadius;
    this.yRadius = t.yRadius;
    this.aStartAngle = t.aStartAngle;
    this.aEndAngle = t.aEndAngle;
    this.aClockwise = t.aClockwise;
    this.aRotation = t.aRotation;
    return this;
  }
}
c.prototype.isEllipseCurve = true;
class u extends c {
  constructor(t, e, n, r, i, s) {
    super(t, e, n, n, r, i, s);
    this.type = "ArcCurve";
  }
}
function h() {
  let t = 0;
  let e = 0;
  let n = 0;
  let r = 0;
  function i(i, s, a, o) {
    t = i;
    e = a;
    n = i * -3 + s * 3 - a * 2 - o;
    r = i * 2 - s * 2 + a + o;
  }
  return {
    initCatmullRom: function (t, e, n, r, s) {
      i(e, n, s * (n - t), s * (r - e));
    },
    initNonuniformCatmullRom: function (t, e, n, r, s, a, o) {
      let l = (e - t) / s - (n - t) / (s + a) + (n - e) / a;
      let c = (n - e) / a - (r - e) / (a + o) + (r - n) / o;
      l *= a;
      c *= a;
      i(e, n, l, c);
    },
    calc: function (i) {
      const s = i * i;
      return t + e * i + n * s + r * (s * i);
    }
  };
}
u.prototype.isArcCurve = true;
const d = new a.P();
const f = new h();
const p = new h();
const m = new h();
class g extends l {
  constructor(t = [], e = false, n = "centripetal", r = 0.5) {
    super();
    this.type = "CatmullRomCurve3";
    this.points = t;
    this.closed = e;
    this.curveType = n;
    this.tension = r;
  }
  getPoint(t, e = new a.P()) {
    const n = e;
    const r = this.points;
    const i = r.length;
    const s = (i - (this.closed ? 0 : 1)) * t;
    let o;
    let l;
    let c = Math.floor(s);
    let u = s - c;
    if (this.closed) {
      c += c > 0 ? 0 : (Math.floor(Math.abs(c) / i) + 1) * i;
    } else if (u === 0 && c === i - 1) {
      c = i - 2;
      u = 1;
    }
    if (this.closed || c > 0) {
      o = r[(c - 1) % i];
    } else {
      d.subVectors(r[0], r[1]).add(r[0]);
      o = d;
    }
    const h = r[c % i];
    const g = r[(c + 1) % i];
    if (this.closed || c + 2 < i) {
      l = r[(c + 2) % i];
    } else {
      d.subVectors(r[i - 1], r[i - 2]).add(r[i - 1]);
      l = d;
    }
    if (this.curveType === "centripetal" || this.curveType === "chordal") {
      const t = this.curveType === "chordal" ? 0.5 : 0.25;
      let e = Math.pow(o.distanceToSquared(h), t);
      let n = Math.pow(h.distanceToSquared(g), t);
      let r = Math.pow(g.distanceToSquared(l), t);
      if (n < 0.0001) {
        n = 1;
      }
      if (e < 0.0001) {
        e = n;
      }
      if (r < 0.0001) {
        r = n;
      }
      f.initNonuniformCatmullRom(o.x, h.x, g.x, l.x, e, n, r);
      p.initNonuniformCatmullRom(o.y, h.y, g.y, l.y, e, n, r);
      m.initNonuniformCatmullRom(o.z, h.z, g.z, l.z, e, n, r);
    } else if (this.curveType === "catmullrom") {
      f.initCatmullRom(o.x, h.x, g.x, l.x, this.tension);
      p.initCatmullRom(o.y, h.y, g.y, l.y, this.tension);
      m.initCatmullRom(o.z, h.z, g.z, l.z, this.tension);
    }
    n.set(f.calc(u), p.calc(u), m.calc(u));
    return n;
  }
  copy(t) {
    super.copy(t);
    this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const n = t.points[e];
      this.points.push(n.clone());
    }
    this.closed = t.closed;
    this.curveType = t.curveType;
    this.tension = t.tension;
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let e = 0, n = this.points.length; e < n; e++) {
      const n = this.points[e];
      t.points.push(n.toArray());
    }
    t.closed = this.closed;
    t.curveType = this.curveType;
    t.tension = this.tension;
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t);
    this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const n = t.points[e];
      this.points.push(new a.P().fromArray(n));
    }
    this.closed = t.closed;
    this.curveType = t.curveType;
    this.tension = t.tension;
    return this;
  }
}
function v(t, e, n, r, i) {
  const s = (r - e) * 0.5;
  const a = (i - n) * 0.5;
  const o = t * t;
  return (n * 2 - r * 2 + s + a) * (t * o) + (n * -3 + r * 3 - s * 2 - a) * o + s * t + n;
}
function _(t, e, n, r) {
  return function (t, e) {
    const n = 1 - t;
    return n * n * e;
  }(t, e) + function (t, e) {
    return (1 - t) * 2 * t * e;
  }(t, n) + function (t, e) {
    return t * t * e;
  }(t, r);
}
function x(t, e, n, r, i) {
  return function (t, e) {
    const n = 1 - t;
    return n * n * n * e;
  }(t, e) + function (t, e) {
    const n = 1 - t;
    return n * 3 * n * t * e;
  }(t, n) + function (t, e) {
    return (1 - t) * 3 * t * t * e;
  }(t, r) + function (t, e) {
    return t * t * t * e;
  }(t, i);
}
g.prototype.isCatmullRomCurve3 = true;
class y extends l {
  constructor(t = new i.F(), e = new i.F(), n = new i.F(), r = new i.F()) {
    super();
    this.type = "CubicBezierCurve";
    this.v0 = t;
    this.v1 = e;
    this.v2 = n;
    this.v3 = r;
  }
  getPoint(t, e = new i.F()) {
    const n = e;
    const r = this.v0;
    const s = this.v1;
    const a = this.v2;
    const o = this.v3;
    n.set(x(t, r.x, s.x, a.x, o.x), x(t, r.y, s.y, a.y, o.y));
    return n;
  }
  copy(t) {
    super.copy(t);
    this.v0.copy(t.v0);
    this.v1.copy(t.v1);
    this.v2.copy(t.v2);
    this.v3.copy(t.v3);
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.v0 = this.v0.toArray();
    t.v1 = this.v1.toArray();
    t.v2 = this.v2.toArray();
    t.v3 = this.v3.toArray();
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t);
    this.v0.fromArray(t.v0);
    this.v1.fromArray(t.v1);
    this.v2.fromArray(t.v2);
    this.v3.fromArray(t.v3);
    return this;
  }
}
y.prototype.isCubicBezierCurve = true;
class b extends l {
  constructor(t = new a.P(), e = new a.P(), n = new a.P(), r = new a.P()) {
    super();
    this.type = "CubicBezierCurve3";
    this.v0 = t;
    this.v1 = e;
    this.v2 = n;
    this.v3 = r;
  }
  getPoint(t, e = new a.P()) {
    const n = e;
    const r = this.v0;
    const i = this.v1;
    const s = this.v2;
    const o = this.v3;
    n.set(x(t, r.x, i.x, s.x, o.x), x(t, r.y, i.y, s.y, o.y), x(t, r.z, i.z, s.z, o.z));
    return n;
  }
  copy(t) {
    super.copy(t);
    this.v0.copy(t.v0);
    this.v1.copy(t.v1);
    this.v2.copy(t.v2);
    this.v3.copy(t.v3);
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.v0 = this.v0.toArray();
    t.v1 = this.v1.toArray();
    t.v2 = this.v2.toArray();
    t.v3 = this.v3.toArray();
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t);
    this.v0.fromArray(t.v0);
    this.v1.fromArray(t.v1);
    this.v2.fromArray(t.v2);
    this.v3.fromArray(t.v3);
    return this;
  }
}
b.prototype.isCubicBezierCurve3 = true;
class w extends l {
  constructor(t = new i.F(), e = new i.F()) {
    super();
    this.type = "LineCurve";
    this.v1 = t;
    this.v2 = e;
  }
  getPoint(t, e = new i.F()) {
    const n = e;
    if (t === 1) {
      n.copy(this.v2);
    } else {
      n.copy(this.v2).sub(this.v1);
      n.multiplyScalar(t).add(this.v1);
    }
    return n;
  }
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  getTangent(t, e) {
    const n = e || new i.F();
    n.copy(this.v2).sub(this.v1).normalize();
    return n;
  }
  copy(t) {
    super.copy(t);
    this.v1.copy(t.v1);
    this.v2.copy(t.v2);
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.v1 = this.v1.toArray();
    t.v2 = this.v2.toArray();
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t);
    this.v1.fromArray(t.v1);
    this.v2.fromArray(t.v2);
    return this;
  }
}
w.prototype.isLineCurve = true;
class M extends l {
  constructor(t = new a.P(), e = new a.P()) {
    super();
    this.type = "LineCurve3";
    this.isLineCurve3 = true;
    this.v1 = t;
    this.v2 = e;
  }
  getPoint(t, e = new a.P()) {
    const n = e;
    if (t === 1) {
      n.copy(this.v2);
    } else {
      n.copy(this.v2).sub(this.v1);
      n.multiplyScalar(t).add(this.v1);
    }
    return n;
  }
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  copy(t) {
    super.copy(t);
    this.v1.copy(t.v1);
    this.v2.copy(t.v2);
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.v1 = this.v1.toArray();
    t.v2 = this.v2.toArray();
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t);
    this.v1.fromArray(t.v1);
    this.v2.fromArray(t.v2);
    return this;
  }
}
class T extends l {
  constructor(t = new i.F(), e = new i.F(), n = new i.F()) {
    super();
    this.type = "QuadraticBezierCurve";
    this.v0 = t;
    this.v1 = e;
    this.v2 = n;
  }
  getPoint(t, e = new i.F()) {
    const n = e;
    const r = this.v0;
    const s = this.v1;
    const a = this.v2;
    n.set(_(t, r.x, s.x, a.x), _(t, r.y, s.y, a.y));
    return n;
  }
  copy(t) {
    super.copy(t);
    this.v0.copy(t.v0);
    this.v1.copy(t.v1);
    this.v2.copy(t.v2);
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.v0 = this.v0.toArray();
    t.v1 = this.v1.toArray();
    t.v2 = this.v2.toArray();
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t);
    this.v0.fromArray(t.v0);
    this.v1.fromArray(t.v1);
    this.v2.fromArray(t.v2);
    return this;
  }
}
T.prototype.isQuadraticBezierCurve = true;
class S extends l {
  constructor(t = new a.P(), e = new a.P(), n = new a.P()) {
    super();
    this.type = "QuadraticBezierCurve3";
    this.v0 = t;
    this.v1 = e;
    this.v2 = n;
  }
  getPoint(t, e = new a.P()) {
    const n = e;
    const r = this.v0;
    const i = this.v1;
    const s = this.v2;
    n.set(_(t, r.x, i.x, s.x), _(t, r.y, i.y, s.y), _(t, r.z, i.z, s.z));
    return n;
  }
  copy(t) {
    super.copy(t);
    this.v0.copy(t.v0);
    this.v1.copy(t.v1);
    this.v2.copy(t.v2);
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.v0 = this.v0.toArray();
    t.v1 = this.v1.toArray();
    t.v2 = this.v2.toArray();
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t);
    this.v0.fromArray(t.v0);
    this.v1.fromArray(t.v1);
    this.v2.fromArray(t.v2);
    return this;
  }
}
S.prototype.isQuadraticBezierCurve3 = true;
class E extends l {
  constructor(t = []) {
    super();
    this.type = "SplineCurve";
    this.points = t;
  }
  getPoint(t, e = new i.F()) {
    const n = e;
    const r = this.points;
    const s = (r.length - 1) * t;
    const a = Math.floor(s);
    const o = s - a;
    const l = r[a === 0 ? a : a - 1];
    const c = r[a];
    const u = r[a > r.length - 2 ? r.length - 1 : a + 1];
    const h = r[a > r.length - 3 ? r.length - 1 : a + 2];
    n.set(v(o, l.x, c.x, u.x, h.x), v(o, l.y, c.y, u.y, h.y));
    return n;
  }
  copy(t) {
    super.copy(t);
    this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const n = t.points[e];
      this.points.push(n.clone());
    }
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let e = 0, n = this.points.length; e < n; e++) {
      const n = this.points[e];
      t.points.push(n.toArray());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t);
    this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const n = t.points[e];
      this.points.push(new i.F().fromArray(n));
    }
    return this;
  }
}
E.prototype.isSplineCurve = true;
class A extends l {
  constructor() {
    super();
    this.type = "CurvePath";
    this.curves = [];
    this.autoClose = false;
  }
  add(t) {
    this.curves.push(t);
  }
  closePath() {
    const t = this.curves[0].getPoint(0);
    const e = this.curves[this.curves.length - 1].getPoint(1);
    if (!t.equals(e)) {
      this.curves.push(new w(e, t));
    }
  }
  getPoint(t) {
    const e = t * this.getLength();
    const n = this.getCurveLengths();
    let r = 0;
    while (r < n.length) {
      if (n[r] >= e) {
        const t = n[r] - e;
        const i = this.curves[r];
        const s = i.getLength();
        const a = s === 0 ? 0 : 1 - t / s;
        return i.getPointAt(a);
      }
      r++;
    }
    return null;
  }
  getLength() {
    const t = this.getCurveLengths();
    return t[t.length - 1];
  }
  updateArcLengths() {
    this.needsUpdate = true;
    this.cacheLengths = null;
    this.getCurveLengths();
  }
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length) {
      return this.cacheLengths;
    }
    const t = [];
    let e = 0;
    for (let n = 0, r = this.curves.length; n < r; n++) {
      e += this.curves[n].getLength();
      t.push(e);
    }
    this.cacheLengths = t;
    return t;
  }
  getSpacedPoints(t = 40) {
    const e = [];
    for (let n = 0; n <= t; n++) {
      e.push(this.getPoint(n / t));
    }
    if (this.autoClose) {
      e.push(e[0]);
    }
    return e;
  }
  getPoints(t = 12) {
    const e = [];
    let n;
    for (let r = 0, i = this.curves; r < i.length; r++) {
      const s = i[r];
      const a = s && s.isEllipseCurve ? t * 2 : s && (s.isLineCurve || s.isLineCurve3) ? 1 : s && s.isSplineCurve ? t * s.points.length : t;
      const o = s.getPoints(a);
      for (let t = 0; t < o.length; t++) {
        const r = o[t];
        if (!n || !n.equals(r)) {
          e.push(r);
          n = r;
        }
      }
    }
    if (this.autoClose && e.length > 1 && !e[e.length - 1].equals(e[0])) {
      e.push(e[0]);
    }
    return e;
  }
  copy(t) {
    super.copy(t);
    this.curves = [];
    for (let e = 0, n = t.curves.length; e < n; e++) {
      const n = t.curves[e];
      this.curves.push(n.clone());
    }
    this.autoClose = t.autoClose;
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.autoClose = this.autoClose;
    t.curves = [];
    for (let e = 0, n = this.curves.length; e < n; e++) {
      const n = this.curves[e];
      t.curves.push(n.toJSON());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t);
    this.autoClose = t.autoClose;
    this.curves = [];
    for (let e = 0, n = t.curves.length; e < n; e++) {
      const n = t.curves[e];
      this.curves.push(new r[n.type]().fromJSON(n));
    }
    return this;
  }
}
class R extends A {
  constructor(t) {
    super();
    this.type = "Path";
    this.currentPoint = new i.F();
    if (t) {
      this.setFromPoints(t);
    }
  }
  setFromPoints(t) {
    this.moveTo(t[0].x, t[0].y);
    for (let e = 1, n = t.length; e < n; e++) {
      this.lineTo(t[e].x, t[e].y);
    }
    return this;
  }
  moveTo(t, e) {
    this.currentPoint.set(t, e);
    return this;
  }
  lineTo(t, e) {
    const n = new w(this.currentPoint.clone(), new i.F(t, e));
    this.curves.push(n);
    this.currentPoint.set(t, e);
    return this;
  }
  quadraticCurveTo(t, e, n, r) {
    const s = new T(this.currentPoint.clone(), new i.F(t, e), new i.F(n, r));
    this.curves.push(s);
    this.currentPoint.set(n, r);
    return this;
  }
  bezierCurveTo(t, e, n, r, s, a) {
    const o = new y(this.currentPoint.clone(), new i.F(t, e), new i.F(n, r), new i.F(s, a));
    this.curves.push(o);
    this.currentPoint.set(s, a);
    return this;
  }
  splineThru(t) {
    const e = [this.currentPoint.clone()].concat(t);
    const n = new E(e);
    this.curves.push(n);
    this.currentPoint.copy(t[t.length - 1]);
    return this;
  }
  arc(t, e, n, r, i, s) {
    const a = this.currentPoint.x;
    const o = this.currentPoint.y;
    this.absarc(t + a, e + o, n, r, i, s);
    return this;
  }
  absarc(t, e, n, r, i, s) {
    this.absellipse(t, e, n, n, r, i, s);
    return this;
  }
  ellipse(t, e, n, r, i, s, a, o) {
    const l = this.currentPoint.x;
    const c = this.currentPoint.y;
    this.absellipse(t + l, e + c, n, r, i, s, a, o);
    return this;
  }
  absellipse(t, e, n, r, i, s, a, o) {
    const l = new c(t, e, n, r, i, s, a, o);
    if (this.curves.length > 0) {
      const t = l.getPoint(0);
      if (!t.equals(this.currentPoint)) {
        this.lineTo(t.x, t.y);
      }
    }
    this.curves.push(l);
    const u = l.getPoint(1);
    this.currentPoint.copy(u);
    return this;
  }
  copy(t) {
    super.copy(t);
    this.currentPoint.copy(t.currentPoint);
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.currentPoint = this.currentPoint.toArray();
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t);
    this.currentPoint.fromArray(t.currentPoint);
    return this;
  }
}
class L extends R {
  constructor(t) {
    super(t);
    this.uuid = s.DO();
    this.type = "Shape";
    this.holes = [];
  }
  getPointsHoles(t) {
    const e = [];
    for (let n = 0, r = this.holes.length; n < r; n++) {
      e[n] = this.holes[n].getPoints(t);
    }
    return e;
  }
  extractPoints(t) {
    return {
      shape: this.getPoints(t),
      holes: this.getPointsHoles(t)
    };
  }
  copy(t) {
    super.copy(t);
    this.holes = [];
    for (let e = 0, n = t.holes.length; e < n; e++) {
      const n = t.holes[e];
      this.holes.push(n.clone());
    }
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.uuid = this.uuid;
    t.holes = [];
    for (let e = 0, n = this.holes.length; e < n; e++) {
      const n = this.holes[e];
      t.holes.push(n.toJSON());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t);
    this.uuid = t.uuid;
    this.holes = [];
    for (let e = 0, n = t.holes.length; e < n; e++) {
      const n = t.holes[e];
      this.holes.push(new R().fromJSON(n));
    }
    return this;
  }
}