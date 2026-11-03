var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  L: function () {
    return r;
  }
});
class r {
  constructor(t = 0, e = 0, n = 0, r = 1) {
    this.x = t;
    this.y = e;
    this.z = n;
    this.w = r;
  }
  get width() {
    return this.z;
  }
  set width(t) {
    this.z = t;
  }
  get height() {
    return this.w;
  }
  set height(t) {
    this.w = t;
  }
  set(t, e, n, r) {
    this.x = t;
    this.y = e;
    this.z = n;
    this.w = r;
    return this;
  }
  setScalar(t) {
    this.x = t;
    this.y = t;
    this.z = t;
    this.w = t;
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
  setW(t) {
    this.w = t;
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
      case 3:
        this.w = e;
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
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(t) {
    this.x = t.x;
    this.y = t.y;
    this.z = t.z;
    this.w = t.w !== undefined ? t.w : 1;
    return this;
  }
  add(t, e) {
    if (e !== undefined) {
      console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.");
      return this.addVectors(t, e);
    } else {
      this.x += t.x;
      this.y += t.y;
      this.z += t.z;
      this.w += t.w;
      return this;
    }
  }
  addScalar(t) {
    this.x += t;
    this.y += t;
    this.z += t;
    this.w += t;
    return this;
  }
  addVectors(t, e) {
    this.x = t.x + e.x;
    this.y = t.y + e.y;
    this.z = t.z + e.z;
    this.w = t.w + e.w;
    return this;
  }
  addScaledVector(t, e) {
    this.x += t.x * e;
    this.y += t.y * e;
    this.z += t.z * e;
    this.w += t.w * e;
    return this;
  }
  sub(t, e) {
    if (e !== undefined) {
      console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.");
      return this.subVectors(t, e);
    } else {
      this.x -= t.x;
      this.y -= t.y;
      this.z -= t.z;
      this.w -= t.w;
      return this;
    }
  }
  subScalar(t) {
    this.x -= t;
    this.y -= t;
    this.z -= t;
    this.w -= t;
    return this;
  }
  subVectors(t, e) {
    this.x = t.x - e.x;
    this.y = t.y - e.y;
    this.z = t.z - e.z;
    this.w = t.w - e.w;
    return this;
  }
  multiply(t) {
    this.x *= t.x;
    this.y *= t.y;
    this.z *= t.z;
    this.w *= t.w;
    return this;
  }
  multiplyScalar(t) {
    this.x *= t;
    this.y *= t;
    this.z *= t;
    this.w *= t;
    return this;
  }
  applyMatrix4(t) {
    const e = this.x;
    const n = this.y;
    const r = this.z;
    const i = this.w;
    const s = t.elements;
    this.x = s[0] * e + s[4] * n + s[8] * r + s[12] * i;
    this.y = s[1] * e + s[5] * n + s[9] * r + s[13] * i;
    this.z = s[2] * e + s[6] * n + s[10] * r + s[14] * i;
    this.w = s[3] * e + s[7] * n + s[11] * r + s[15] * i;
    return this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  setAxisAngleFromQuaternion(t) {
    this.w = Math.acos(t.w) * 2;
    const e = Math.sqrt(1 - t.w * t.w);
    if (e < 0.0001) {
      this.x = 1;
      this.y = 0;
      this.z = 0;
    } else {
      this.x = t.x / e;
      this.y = t.y / e;
      this.z = t.z / e;
    }
    return this;
  }
  setAxisAngleFromRotationMatrix(t) {
    let e;
    let n;
    let r;
    let i;
    const s = 0.01;
    const a = 0.1;
    const o = t.elements;
    const l = o[0];
    const c = o[4];
    const u = o[8];
    const h = o[1];
    const d = o[5];
    const f = o[9];
    const p = o[2];
    const m = o[6];
    const g = o[10];
    if (Math.abs(c - h) < s && Math.abs(u - p) < s && Math.abs(f - m) < s) {
      if (Math.abs(c + h) < a && Math.abs(u + p) < a && Math.abs(f + m) < a && Math.abs(l + d + g - 3) < a) {
        this.set(1, 0, 0, 0);
        return this;
      }
      e = Math.PI;
      const t = (l + 1) / 2;
      const o = (d + 1) / 2;
      const v = (g + 1) / 2;
      const _ = (c + h) / 4;
      const x = (u + p) / 4;
      const y = (f + m) / 4;
      if (t > o && t > v) {
        if (t < s) {
          n = 0;
          r = 0.707106781;
          i = 0.707106781;
        } else {
          n = Math.sqrt(t);
          r = _ / n;
          i = x / n;
        }
      } else if (o > v) {
        if (o < s) {
          n = 0.707106781;
          r = 0;
          i = 0.707106781;
        } else {
          r = Math.sqrt(o);
          n = _ / r;
          i = y / r;
        }
      } else if (v < s) {
        n = 0.707106781;
        r = 0.707106781;
        i = 0;
      } else {
        i = Math.sqrt(v);
        n = x / i;
        r = y / i;
      }
      this.set(n, r, i, e);
      return this;
    }
    let v = Math.sqrt((m - f) * (m - f) + (u - p) * (u - p) + (h - c) * (h - c));
    if (Math.abs(v) < 0.001) {
      v = 1;
    }
    this.x = (m - f) / v;
    this.y = (u - p) / v;
    this.z = (h - c) / v;
    this.w = Math.acos((l + d + g - 1) / 2);
    return this;
  }
  min(t) {
    this.x = Math.min(this.x, t.x);
    this.y = Math.min(this.y, t.y);
    this.z = Math.min(this.z, t.z);
    this.w = Math.min(this.w, t.w);
    return this;
  }
  max(t) {
    this.x = Math.max(this.x, t.x);
    this.y = Math.max(this.y, t.y);
    this.z = Math.max(this.z, t.z);
    this.w = Math.max(this.w, t.w);
    return this;
  }
  clamp(t, e) {
    this.x = Math.max(t.x, Math.min(e.x, this.x));
    this.y = Math.max(t.y, Math.min(e.y, this.y));
    this.z = Math.max(t.z, Math.min(e.z, this.z));
    this.w = Math.max(t.w, Math.min(e.w, this.w));
    return this;
  }
  clampScalar(t, e) {
    this.x = Math.max(t, Math.min(e, this.x));
    this.y = Math.max(t, Math.min(e, this.y));
    this.z = Math.max(t, Math.min(e, this.z));
    this.w = Math.max(t, Math.min(e, this.w));
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
    this.w = Math.floor(this.w);
    return this;
  }
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    this.w = Math.ceil(this.w);
    return this;
  }
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    this.w = Math.round(this.w);
    return this;
  }
  roundToZero() {
    this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
    this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
    this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
    this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w);
    return this;
  }
  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    this.w = -this.w;
    return this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
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
    this.w += (t.w - this.w) * e;
    return this;
  }
  lerpVectors(t, e, n) {
    this.x = t.x + (e.x - t.x) * n;
    this.y = t.y + (e.y - t.y) * n;
    this.z = t.z + (e.z - t.z) * n;
    this.w = t.w + (e.w - t.w) * n;
    return this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
  }
  fromArray(t, e = 0) {
    this.x = t[e];
    this.y = t[e + 1];
    this.z = t[e + 2];
    this.w = t[e + 3];
    return this;
  }
  toArray(t = [], e = 0) {
    t[e] = this.x;
    t[e + 1] = this.y;
    t[e + 2] = this.z;
    t[e + 3] = this.w;
    return t;
  }
  fromBufferAttribute(t, e, n) {
    if (n !== undefined) {
      console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute().");
    }
    this.x = t.getX(e);
    this.y = t.getY(e);
    this.z = t.getZ(e);
    this.w = t.getW(e);
    return this;
  }
  random() {
    this.x = Math.random();
    this.y = Math.random();
    this.z = Math.random();
    this.w = Math.random();
    return this;
  }
}
r.prototype.isVector4 = true;