var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  J: function () {
    return l;
  }
});
var r = require("./1273.cjs");
var i = require("./6881.cjs");
const s = new i.P();
const a = new i.P();
const o = new r.V();
class l {
  constructor(t = new i.P(1, 0, 0), e = 0) {
    this.normal = t;
    this.constant = e;
  }
  set(t, e) {
    this.normal.copy(t);
    this.constant = e;
    return this;
  }
  setComponents(t, e, n, r) {
    this.normal.set(t, e, n);
    this.constant = r;
    return this;
  }
  setFromNormalAndCoplanarPoint(t, e) {
    this.normal.copy(t);
    this.constant = -e.dot(this.normal);
    return this;
  }
  setFromCoplanarPoints(t, e, n) {
    const r = s.subVectors(n, e).cross(a.subVectors(t, e)).normalize();
    this.setFromNormalAndCoplanarPoint(r, t);
    return this;
  }
  copy(t) {
    this.normal.copy(t.normal);
    this.constant = t.constant;
    return this;
  }
  normalize() {
    const t = 1 / this.normal.length();
    this.normal.multiplyScalar(t);
    this.constant *= t;
    return this;
  }
  negate() {
    this.constant *= -1;
    this.normal.negate();
    return this;
  }
  distanceToPoint(t) {
    return this.normal.dot(t) + this.constant;
  }
  distanceToSphere(t) {
    return this.distanceToPoint(t.center) - t.radius;
  }
  projectPoint(t, e) {
    return e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t);
  }
  intersectLine(t, e) {
    const n = t.delta(s);
    const r = this.normal.dot(n);
    if (r === 0) {
      if (this.distanceToPoint(t.start) === 0) {
        return e.copy(t.start);
      } else {
        return null;
      }
    }
    const i = -(t.start.dot(this.normal) + this.constant) / r;
    if (i < 0 || i > 1) {
      return null;
    } else {
      return e.copy(n).multiplyScalar(i).add(t.start);
    }
  }
  intersectsLine(t) {
    const e = this.distanceToPoint(t.start);
    const n = this.distanceToPoint(t.end);
    return e < 0 && n > 0 || n < 0 && e > 0;
  }
  intersectsBox(t) {
    return t.intersectsPlane(this);
  }
  intersectsSphere(t) {
    return t.intersectsPlane(this);
  }
  coplanarPoint(t) {
    return t.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(t, e) {
    const n = e || o.getNormalMatrix(t);
    const r = this.coplanarPoint(s).applyMatrix4(t);
    const i = this.normal.applyMatrix3(n).normalize();
    this.constant = -r.dot(i);
    return this;
  }
  translate(t) {
    this.constant -= t.dot(this.normal);
    return this;
  }
  equals(t) {
    return t.normal.equals(this.normal) && t.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
l.prototype.isPlane = true;