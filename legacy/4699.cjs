var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  a: function () {
    return c;
  }
});
var r = require("./1898.cjs");
var i = require("./6881.cjs");
const s = new r.Z();
const a = new i.P();
const o = new i.P();
const l = new i.P();
class c {
  constructor(t = new i.P(), e = -1) {
    this.center = t;
    this.radius = e;
  }
  set(t, e) {
    this.center.copy(t);
    this.radius = e;
    return this;
  }
  setFromPoints(t, e) {
    const n = this.center;
    if (e !== undefined) {
      n.copy(e);
    } else {
      s.setFromPoints(t).getCenter(n);
    }
    let r = 0;
    for (let e = 0, i = t.length; e < i; e++) {
      r = Math.max(r, n.distanceToSquared(t[e]));
    }
    this.radius = Math.sqrt(r);
    return this;
  }
  copy(t) {
    this.center.copy(t.center);
    this.radius = t.radius;
    return this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    this.center.set(0, 0, 0);
    this.radius = -1;
    return this;
  }
  containsPoint(t) {
    return t.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(t) {
    return t.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(t) {
    const e = this.radius + t.radius;
    return t.center.distanceToSquared(this.center) <= e * e;
  }
  intersectsBox(t) {
    return t.intersectsSphere(this);
  }
  intersectsPlane(t) {
    return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(t, e) {
    const n = this.center.distanceToSquared(t);
    e.copy(t);
    if (n > this.radius * this.radius) {
      e.sub(this.center).normalize();
      e.multiplyScalar(this.radius).add(this.center);
    }
    return e;
  }
  getBoundingBox(t) {
    if (this.isEmpty()) {
      t.makeEmpty();
      return t;
    } else {
      t.set(this.center, this.center);
      t.expandByScalar(this.radius);
      return t;
    }
  }
  applyMatrix4(t) {
    this.center.applyMatrix4(t);
    this.radius = this.radius * t.getMaxScaleOnAxis();
    return this;
  }
  translate(t) {
    this.center.add(t);
    return this;
  }
  expandByPoint(t) {
    l.subVectors(t, this.center);
    const e = l.lengthSq();
    if (e > this.radius * this.radius) {
      const t = Math.sqrt(e);
      const n = (t - this.radius) * 0.5;
      this.center.add(l.multiplyScalar(n / t));
      this.radius += n;
    }
    return this;
  }
  union(t) {
    o.subVectors(t.center, this.center).normalize().multiplyScalar(t.radius);
    this.expandByPoint(a.copy(t.center).add(o));
    this.expandByPoint(a.copy(t.center).sub(o));
    return this;
  }
  equals(t) {
    return t.center.equals(this.center) && t.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}