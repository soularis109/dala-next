var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  P: function () {
    return s;
  }
});
var r = require("./2043.cjs");
var i = require("./7092.cjs");
class s {
  constructor(t = 0, e = 0, n = 0) {
    this.x = t;
    this.y = e;
    this.z = n;
  }
  set(t, e, n = this.z) {
    this.x = t;
    this.y = e;
    this.z = n;
    return this;
  }
  setScalar(t) {
    this.x = t;
    this.y = t;
    this.z = t;
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
  setZ(t) {
    this.z = t;
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
      case 2:
        this.z = e;
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
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(t) {
    this.x = t.x;
    this.y = t.y;
    this.z = t.z;
    return this;
  }
  add(t, e) {
    if (e !== undefined) {
      console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.");
      return this.addVectors(t, e);
    } else {
      this.x += t.x;
      this.y += t.y;
      this.z += t.z;
      return this;
    }
  }
  addScalar(t) {
    this.x += t;
    this.y += t;
    this.z += t;
    return this;
  }
  addVectors(t, e) {
    this.x = t.x + e.x;
    this.y = t.y + e.y;
    this.z = t.z + e.z;
    return this;
  }
  addScaledVector(t, e) {
    this.x += t.x * e;
    this.y += t.y * e;
    this.z += t.z * e;
    return this;
  }
  sub(t, e) {
    if (e !== undefined) {
      console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.");
      return this.subVectors(t, e);
    } else {
      this.x -= t.x;
      this.y -= t.y;
      this.z -= t.z;
      return this;
    }
  }
  subScalar(t) {
    this.x -= t;
    this.y -= t;
    this.z -= t;
    return this;
  }
  subVectors(t, e) {
    this.x = t.x - e.x;
    this.y = t.y - e.y;
    this.z = t.z - e.z;
    return this;
  }
  multiply(t, e) {
    if (e !== undefined) {
      console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.");
      return this.multiplyVectors(t, e);
    } else {
      this.x *= t.x;
      this.y *= t.y;
      this.z *= t.z;
      return this;
    }
  }
  multiplyScalar(t) {
    this.x *= t;
    this.y *= t;
    this.z *= t;
    return this;
  }
  multiplyVectors(t, e) {
    this.x = t.x * e.x;
    this.y = t.y * e.y;
    this.z = t.z * e.z;
    return this;
  }
  applyEuler(t) {
    if (!t || !t.isEuler) {
      console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.");
    }
    return this.applyQuaternion(o.setFromEuler(t));
  }
  applyAxisAngle(t, e) {
    return this.applyQuaternion(o.setFromAxisAngle(t, e));
  }
  applyMatrix3(t) {
    const e = this.x;
    const n = this.y;
    const r = this.z;
    const i = t.elements;
    this.x = i[0] * e + i[3] * n + i[6] * r;
    this.y = i[1] * e + i[4] * n + i[7] * r;
    this.z = i[2] * e + i[5] * n + i[8] * r;
    return this;
  }
  applyNormalMatrix(t) {
    return this.applyMatrix3(t).normalize();
  }
  applyMatrix4(t) {
    const e = this.x;
    const n = this.y;
    const r = this.z;
    const i = t.elements;
    const s = 1 / (i[3] * e + i[7] * n + i[11] * r + i[15]);
    this.x = (i[0] * e + i[4] * n + i[8] * r + i[12]) * s;
    this.y = (i[1] * e + i[5] * n + i[9] * r + i[13]) * s;
    this.z = (i[2] * e + i[6] * n + i[10] * r + i[14]) * s;
    return this;
  }
  applyQuaternion(t) {
    const e = this.x;
    const n = this.y;
    const r = this.z;
    const i = t.x;
    const s = t.y;
    const a = t.z;
    const o = t.w;
    const l = o * e + s * r - a * n;
    const c = o * n + a * e - i * r;
    const u = o * r + i * n - s * e;
    const h = -i * e - s * n - a * r;
    this.x = l * o + h * -i + c * -a - u * -s;
    this.y = c * o + h * -s + u * -i - l * -a;
    this.z = u * o + h * -a + l * -s - c * -i;
    return this;
  }
  project(t) {
    return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
  }
  unproject(t) {
    return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
  }
  transformDirection(t) {
    const e = this.x;
    const n = this.y;
    const r = this.z;
    const i = t.elements;
    this.x = i[0] * e + i[4] * n + i[8] * r;
    this.y = i[1] * e + i[5] * n + i[9] * r;
    this.z = i[2] * e + i[6] * n + i[10] * r;
    return this.normalize();
  }
  divide(t) {
    this.x /= t.x;
    this.y /= t.y;
    this.z /= t.z;
    return this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  min(t) {
    this.x = Math.min(this.x, t.x);
    this.y = Math.min(this.y, t.y);
    this.z = Math.min(this.z, t.z);
    return this;
  }
  max(t) {
    this.x = Math.max(this.x, t.x);
    this.y = Math.max(this.y, t.y);
    this.z = Math.max(this.z, t.z);
    return this;
  }
  clamp(t, e) {
    this.x = Math.max(t.x, Math.min(e.x, this.x));
    this.y = Math.max(t.y, Math.min(e.y, this.y));
    this.z = Math.max(t.z, Math.min(e.z, this.z));
    return this;
  }
  clampScalar(t, e) {
    this.x = Math.max(t, Math.min(e, this.x));
    this.y = Math.max(t, Math.min(e, this.y));
    this.z = Math.max(t, Math.min(e, this.z));
    return this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    return this;
  }
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    return this;
  }
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    return this;
  }
  roundToZero() {
    this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
    this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
    this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
    return this;
  }
  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    this.x += (t.x - this.x) * e;
    this.y += (t.y - this.y) * e;
    this.z += (t.z - this.z) * e;
    return this;
  }
  lerpVectors(t, e, n) {
    this.x = t.x + (e.x - t.x) * n;
    this.y = t.y + (e.y - t.y) * n;
    this.z = t.z + (e.z - t.z) * n;
    return this;
  }
  cross(t, e) {
    if (e !== undefined) {
      console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.");
      return this.crossVectors(t, e);
    } else {
      return this.crossVectors(this, t);
    }
  }
  crossVectors(t, e) {
    const n = t.x;
    const r = t.y;
    const i = t.z;
    const s = e.x;
    const a = e.y;
    const o = e.z;
    this.x = r * o - i * a;
    this.y = i * s - n * o;
    this.z = n * a - r * s;
    return this;
  }
  projectOnVector(t) {
    const e = t.lengthSq();
    if (e === 0) {
      return this.set(0, 0, 0);
    }
    const n = t.dot(this) / e;
    return this.copy(t).multiplyScalar(n);
  }
  projectOnPlane(t) {
    a.copy(this).projectOnVector(t);
    return this.sub(a);
  }
  reflect(t) {
    return this.sub(a.copy(t).multiplyScalar(this.dot(t) * 2));
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) {
      return Math.PI / 2;
    }
    const n = this.dot(t) / e;
    return Math.acos(r.uZ(n, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const e = this.x - t.x;
    const n = this.y - t.y;
    const r = this.z - t.z;
    return e * e + n * n + r * r;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
  }
  setFromSpherical(t) {
    return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
  }
  setFromSphericalCoords(t, e, n) {
    const r = Math.sin(e) * t;
    this.x = r * Math.sin(n);
    this.y = Math.cos(e) * t;
    this.z = r * Math.cos(n);
    return this;
  }
  setFromCylindrical(t) {
    return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
  }
  setFromCylindricalCoords(t, e, n) {
    this.x = t * Math.sin(e);
    this.y = n;
    this.z = t * Math.cos(e);
    return this;
  }
  setFromMatrixPosition(t) {
    const e = t.elements;
    this.x = e[12];
    this.y = e[13];
    this.z = e[14];
    return this;
  }
  setFromMatrixScale(t) {
    const e = this.setFromMatrixColumn(t, 0).length();
    const n = this.setFromMatrixColumn(t, 1).length();
    const r = this.setFromMatrixColumn(t, 2).length();
    this.x = e;
    this.y = n;
    this.z = r;
    return this;
  }
  setFromMatrixColumn(t, e) {
    return this.fromArray(t.elements, e * 4);
  }
  setFromMatrix3Column(t, e) {
    return this.fromArray(t.elements, e * 3);
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z;
  }
  fromArray(t, e = 0) {
    this.x = t[e];
    this.y = t[e + 1];
    this.z = t[e + 2];
    return this;
  }
  toArray(t = [], e = 0) {
    t[e] = this.x;
    t[e + 1] = this.y;
    t[e + 2] = this.z;
    return t;
  }
  fromBufferAttribute(t, e, n) {
    if (n !== undefined) {
      console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute().");
    }
    this.x = t.getX(e);
    this.y = t.getY(e);
    this.z = t.getZ(e);
    return this;
  }
  random() {
    this.x = Math.random();
    this.y = Math.random();
    this.z = Math.random();
    return this;
  }
}
s.prototype.isVector3 = true;
const a = new s();
const o = new i._();