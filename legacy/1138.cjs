var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  F: function () {
    return r;
  }
});
class r {
  constructor(t = 0, e = 0) {
    this.x = t;
    this.y = e;
  }
  get width() {
    return this.x;
  }
  set width(t) {
    this.x = t;
  }
  get height() {
    return this.y;
  }
  set height(t) {
    this.y = t;
  }
  set(t, e) {
    this.x = t;
    this.y = e;
    return this;
  }
  setScalar(t) {
    this.x = t;
    this.y = t;
    return this;
  }
  setX(t) {
    this.x = t;
    return this;
  }
  setY(t) {
    this.y = t;
    return this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(t) {
    this.x = t.x;
    this.y = t.y;
    return this;
  }
  add(t, e) {
    if (e !== undefined) {
      console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.");
      return this.addVectors(t, e);
    } else {
      this.x += t.x;
      this.y += t.y;
      return this;
    }
  }
  addScalar(t) {
    this.x += t;
    this.y += t;
    return this;
  }
  addVectors(t, e) {
    this.x = t.x + e.x;
    this.y = t.y + e.y;
    return this;
  }
  addScaledVector(t, e) {
    this.x += t.x * e;
    this.y += t.y * e;
    return this;
  }
  sub(t, e) {
    if (e !== undefined) {
      console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.");
      return this.subVectors(t, e);
    } else {
      this.x -= t.x;
      this.y -= t.y;
      return this;
    }
  }
  subScalar(t) {
    this.x -= t;
    this.y -= t;
    return this;
  }
  subVectors(t, e) {
    this.x = t.x - e.x;
    this.y = t.y - e.y;
    return this;
  }
  multiply(t) {
    this.x *= t.x;
    this.y *= t.y;
    return this;
  }
  multiplyScalar(t) {
    this.x *= t;
    this.y *= t;
    return this;
  }
  divide(t) {
    this.x /= t.x;
    this.y /= t.y;
    return this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  applyMatrix3(t) {
    const e = this.x;
    const n = this.y;
    const r = t.elements;
    this.x = r[0] * e + r[3] * n + r[6];
    this.y = r[1] * e + r[4] * n + r[7];
    return this;
  }
  min(t) {
    this.x = Math.min(this.x, t.x);
    this.y = Math.min(this.y, t.y);
    return this;
  }
  max(t) {
    this.x = Math.max(this.x, t.x);
    this.y = Math.max(this.y, t.y);
    return this;
  }
  clamp(t, e) {
    this.x = Math.max(t.x, Math.min(e.x, this.x));
    this.y = Math.max(t.y, Math.min(e.y, this.y));
    return this;
  }
  clampScalar(t, e) {
    this.x = Math.max(t, Math.min(e, this.x));
    this.y = Math.max(t, Math.min(e, this.y));
    return this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }
  roundToZero() {
    this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
    this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
    return this;
  }
  negate() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const e = this.x - t.x;
    const n = this.y - t.y;
    return e * e + n * n;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    this.x += (t.x - this.x) * e;
    this.y += (t.y - this.y) * e;
    return this;
  }
  lerpVectors(t, e, n) {
    this.x = t.x + (e.x - t.x) * n;
    this.y = t.y + (e.y - t.y) * n;
    return this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  fromArray(t, e = 0) {
    this.x = t[e];
    this.y = t[e + 1];
    return this;
  }
  toArray(t = [], e = 0) {
    t[e] = this.x;
    t[e + 1] = this.y;
    return t;
  }
  fromBufferAttribute(t, e, n) {
    if (n !== undefined) {
      console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute().");
    }
    this.x = t.getX(e);
    this.y = t.getY(e);
    return this;
  }
  rotateAround(t, e) {
    const n = Math.cos(e);
    const r = Math.sin(e);
    const i = this.x - t.x;
    const s = this.y - t.y;
    this.x = i * n - s * r + t.x;
    this.y = i * r + s * n + t.y;
    return this;
  }
  random() {
    this.x = Math.random();
    this.y = Math.random();
    return this;
  }
}
r.prototype.isVector2 = true;