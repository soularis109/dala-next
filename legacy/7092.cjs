var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  _: function () {
    return i;
  }
});
var r = require("./2043.cjs");
class i {
  constructor(t = 0, e = 0, n = 0, r = 1) {
    this._x = t;
    this._y = e;
    this._z = n;
    this._w = r;
  }
  static slerp(t, e, n, r) {
    console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead.");
    return n.slerpQuaternions(t, e, r);
  }
  static slerpFlat(t, e, n, r, i, s, a) {
    let o = n[r + 0];
    let l = n[r + 1];
    let c = n[r + 2];
    let u = n[r + 3];
    const h = i[s + 0];
    const d = i[s + 1];
    const f = i[s + 2];
    const p = i[s + 3];
    if (a === 0) {
      t[e + 0] = o;
      t[e + 1] = l;
      t[e + 2] = c;
      t[e + 3] = u;
      return;
    }
    if (a === 1) {
      t[e + 0] = h;
      t[e + 1] = d;
      t[e + 2] = f;
      t[e + 3] = p;
      return;
    }
    if (u !== p || o !== h || l !== d || c !== f) {
      let t = 1 - a;
      const e = o * h + l * d + c * f + u * p;
      const n = e >= 0 ? 1 : -1;
      const r = 1 - e * e;
      if (r > Number.EPSILON) {
        const i = Math.sqrt(r);
        const s = Math.atan2(i, e * n);
        t = Math.sin(t * s) / i;
        a = Math.sin(a * s) / i;
      }
      const i = a * n;
      o = o * t + h * i;
      l = l * t + d * i;
      c = c * t + f * i;
      u = u * t + p * i;
      if (t === 1 - a) {
        const t = 1 / Math.sqrt(o * o + l * l + c * c + u * u);
        o *= t;
        l *= t;
        c *= t;
        u *= t;
      }
    }
    t[e] = o;
    t[e + 1] = l;
    t[e + 2] = c;
    t[e + 3] = u;
  }
  static multiplyQuaternionsFlat(t, e, n, r, i, s) {
    const a = n[r];
    const o = n[r + 1];
    const l = n[r + 2];
    const c = n[r + 3];
    const u = i[s];
    const h = i[s + 1];
    const d = i[s + 2];
    const f = i[s + 3];
    t[e] = a * f + c * u + o * d - l * h;
    t[e + 1] = o * f + c * h + l * u - a * d;
    t[e + 2] = l * f + c * d + a * h - o * u;
    t[e + 3] = c * f - a * u - o * h - l * d;
    return t;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t;
    this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t;
    this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t;
    this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(t) {
    this._w = t;
    this._onChangeCallback();
  }
  set(t, e, n, r) {
    this._x = t;
    this._y = e;
    this._z = n;
    this._w = r;
    this._onChangeCallback();
    return this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(t) {
    this._x = t.x;
    this._y = t.y;
    this._z = t.z;
    this._w = t.w;
    this._onChangeCallback();
    return this;
  }
  setFromEuler(t, e) {
    if (!t || !t.isEuler) {
      throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
    }
    const n = t._x;
    const r = t._y;
    const i = t._z;
    const s = t._order;
    const a = Math.cos;
    const o = Math.sin;
    const l = a(n / 2);
    const c = a(r / 2);
    const u = a(i / 2);
    const h = o(n / 2);
    const d = o(r / 2);
    const f = o(i / 2);
    switch (s) {
      case "XYZ":
        this._x = h * c * u + l * d * f;
        this._y = l * d * u - h * c * f;
        this._z = l * c * f + h * d * u;
        this._w = l * c * u - h * d * f;
        break;
      case "YXZ":
        this._x = h * c * u + l * d * f;
        this._y = l * d * u - h * c * f;
        this._z = l * c * f - h * d * u;
        this._w = l * c * u + h * d * f;
        break;
      case "ZXY":
        this._x = h * c * u - l * d * f;
        this._y = l * d * u + h * c * f;
        this._z = l * c * f + h * d * u;
        this._w = l * c * u - h * d * f;
        break;
      case "ZYX":
        this._x = h * c * u - l * d * f;
        this._y = l * d * u + h * c * f;
        this._z = l * c * f - h * d * u;
        this._w = l * c * u + h * d * f;
        break;
      case "YZX":
        this._x = h * c * u + l * d * f;
        this._y = l * d * u + h * c * f;
        this._z = l * c * f - h * d * u;
        this._w = l * c * u - h * d * f;
        break;
      case "XZY":
        this._x = h * c * u - l * d * f;
        this._y = l * d * u - h * c * f;
        this._z = l * c * f + h * d * u;
        this._w = l * c * u + h * d * f;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + s);
    }
    if (e !== false) {
      this._onChangeCallback();
    }
    return this;
  }
  setFromAxisAngle(t, e) {
    const n = e / 2;
    const r = Math.sin(n);
    this._x = t.x * r;
    this._y = t.y * r;
    this._z = t.z * r;
    this._w = Math.cos(n);
    this._onChangeCallback();
    return this;
  }
  setFromRotationMatrix(t) {
    const e = t.elements;
    const n = e[0];
    const r = e[4];
    const i = e[8];
    const s = e[1];
    const a = e[5];
    const o = e[9];
    const l = e[2];
    const c = e[6];
    const u = e[10];
    const h = n + a + u;
    if (h > 0) {
      const t = 0.5 / Math.sqrt(h + 1);
      this._w = 0.25 / t;
      this._x = (c - o) * t;
      this._y = (i - l) * t;
      this._z = (s - r) * t;
    } else if (n > a && n > u) {
      const t = Math.sqrt(1 + n - a - u) * 2;
      this._w = (c - o) / t;
      this._x = t * 0.25;
      this._y = (r + s) / t;
      this._z = (i + l) / t;
    } else if (a > u) {
      const t = Math.sqrt(1 + a - n - u) * 2;
      this._w = (i - l) / t;
      this._x = (r + s) / t;
      this._y = t * 0.25;
      this._z = (o + c) / t;
    } else {
      const t = Math.sqrt(1 + u - n - a) * 2;
      this._w = (s - r) / t;
      this._x = (i + l) / t;
      this._y = (o + c) / t;
      this._z = t * 0.25;
    }
    this._onChangeCallback();
    return this;
  }
  setFromUnitVectors(t, e) {
    let n = t.dot(e) + 1;
    if (n < Number.EPSILON) {
      n = 0;
      if (Math.abs(t.x) > Math.abs(t.z)) {
        this._x = -t.y;
        this._y = t.x;
        this._z = 0;
        this._w = n;
      } else {
        this._x = 0;
        this._y = -t.z;
        this._z = t.y;
        this._w = n;
      }
    } else {
      this._x = t.y * e.z - t.z * e.y;
      this._y = t.z * e.x - t.x * e.z;
      this._z = t.x * e.y - t.y * e.x;
      this._w = n;
    }
    return this.normalize();
  }
  angleTo(t) {
    return Math.acos(Math.abs(r.uZ(this.dot(t), -1, 1))) * 2;
  }
  rotateTowards(t, e) {
    const n = this.angleTo(t);
    if (n === 0) {
      return this;
    }
    const r = Math.min(1, e / n);
    this.slerp(t, r);
    return this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    this._x *= -1;
    this._y *= -1;
    this._z *= -1;
    this._onChangeCallback();
    return this;
  }
  dot(t) {
    return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let t = this.length();
    if (t === 0) {
      this._x = 0;
      this._y = 0;
      this._z = 0;
      this._w = 1;
    } else {
      t = 1 / t;
      this._x = this._x * t;
      this._y = this._y * t;
      this._z = this._z * t;
      this._w = this._w * t;
    }
    this._onChangeCallback();
    return this;
  }
  multiply(t, e) {
    if (e !== undefined) {
      console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.");
      return this.multiplyQuaternions(t, e);
    } else {
      return this.multiplyQuaternions(this, t);
    }
  }
  premultiply(t) {
    return this.multiplyQuaternions(t, this);
  }
  multiplyQuaternions(t, e) {
    const n = t._x;
    const r = t._y;
    const i = t._z;
    const s = t._w;
    const a = e._x;
    const o = e._y;
    const l = e._z;
    const c = e._w;
    this._x = n * c + s * a + r * l - i * o;
    this._y = r * c + s * o + i * a - n * l;
    this._z = i * c + s * l + n * o - r * a;
    this._w = s * c - n * a - r * o - i * l;
    this._onChangeCallback();
    return this;
  }
  slerp(t, e) {
    if (e === 0) {
      return this;
    }
    if (e === 1) {
      return this.copy(t);
    }
    const n = this._x;
    const r = this._y;
    const i = this._z;
    const s = this._w;
    let a = s * t._w + n * t._x + r * t._y + i * t._z;
    if (a < 0) {
      this._w = -t._w;
      this._x = -t._x;
      this._y = -t._y;
      this._z = -t._z;
      a = -a;
    } else {
      this.copy(t);
    }
    if (a >= 1) {
      this._w = s;
      this._x = n;
      this._y = r;
      this._z = i;
      return this;
    }
    const o = 1 - a * a;
    if (o <= Number.EPSILON) {
      const t = 1 - e;
      this._w = t * s + e * this._w;
      this._x = t * n + e * this._x;
      this._y = t * r + e * this._y;
      this._z = t * i + e * this._z;
      this.normalize();
      this._onChangeCallback();
      return this;
    }
    const l = Math.sqrt(o);
    const c = Math.atan2(l, a);
    const u = Math.sin((1 - e) * c) / l;
    const h = Math.sin(e * c) / l;
    this._w = s * u + this._w * h;
    this._x = n * u + this._x * h;
    this._y = r * u + this._y * h;
    this._z = i * u + this._z * h;
    this._onChangeCallback();
    return this;
  }
  slerpQuaternions(t, e, n) {
    this.copy(t).slerp(e, n);
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w;
  }
  fromArray(t, e = 0) {
    this._x = t[e];
    this._y = t[e + 1];
    this._z = t[e + 2];
    this._w = t[e + 3];
    this._onChangeCallback();
    return this;
  }
  toArray(t = [], e = 0) {
    t[e] = this._x;
    t[e + 1] = this._y;
    t[e + 2] = this._z;
    t[e + 3] = this._w;
    return t;
  }
  fromBufferAttribute(t, e) {
    this._x = t.getX(e);
    this._y = t.getY(e);
    this._z = t.getZ(e);
    this._w = t.getW(e);
    return this;
  }
  _onChange(t) {
    this._onChangeCallback = t;
    return this;
  }
  _onChangeCallback() {}
}
i.prototype.isQuaternion = true;