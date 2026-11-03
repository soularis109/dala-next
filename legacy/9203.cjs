var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  y: function () {
    return i;
  }
});
var r = require("./6881.cjs");
class i {
  constructor() {
    this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    if (arguments.length > 0) {
      console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.");
    }
  }
  set(t, e, n, r, i, s, a, o, l, c, u, h, d, f, p, m) {
    const g = this.elements;
    g[0] = t;
    g[4] = e;
    g[8] = n;
    g[12] = r;
    g[1] = i;
    g[5] = s;
    g[9] = a;
    g[13] = o;
    g[2] = l;
    g[6] = c;
    g[10] = u;
    g[14] = h;
    g[3] = d;
    g[7] = f;
    g[11] = p;
    g[15] = m;
    return this;
  }
  identity() {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  }
  clone() {
    return new i().fromArray(this.elements);
  }
  copy(t) {
    const e = this.elements;
    const n = t.elements;
    e[0] = n[0];
    e[1] = n[1];
    e[2] = n[2];
    e[3] = n[3];
    e[4] = n[4];
    e[5] = n[5];
    e[6] = n[6];
    e[7] = n[7];
    e[8] = n[8];
    e[9] = n[9];
    e[10] = n[10];
    e[11] = n[11];
    e[12] = n[12];
    e[13] = n[13];
    e[14] = n[14];
    e[15] = n[15];
    return this;
  }
  copyPosition(t) {
    const e = this.elements;
    const n = t.elements;
    e[12] = n[12];
    e[13] = n[13];
    e[14] = n[14];
    return this;
  }
  setFromMatrix3(t) {
    const e = t.elements;
    this.set(e[0], e[3], e[6], 0, e[1], e[4], e[7], 0, e[2], e[5], e[8], 0, 0, 0, 0, 1);
    return this;
  }
  extractBasis(t, e, n) {
    t.setFromMatrixColumn(this, 0);
    e.setFromMatrixColumn(this, 1);
    n.setFromMatrixColumn(this, 2);
    return this;
  }
  makeBasis(t, e, n) {
    this.set(t.x, e.x, n.x, 0, t.y, e.y, n.y, 0, t.z, e.z, n.z, 0, 0, 0, 0, 1);
    return this;
  }
  extractRotation(t) {
    const e = this.elements;
    const n = t.elements;
    const r = 1 / s.setFromMatrixColumn(t, 0).length();
    const i = 1 / s.setFromMatrixColumn(t, 1).length();
    const a = 1 / s.setFromMatrixColumn(t, 2).length();
    e[0] = n[0] * r;
    e[1] = n[1] * r;
    e[2] = n[2] * r;
    e[3] = 0;
    e[4] = n[4] * i;
    e[5] = n[5] * i;
    e[6] = n[6] * i;
    e[7] = 0;
    e[8] = n[8] * a;
    e[9] = n[9] * a;
    e[10] = n[10] * a;
    e[11] = 0;
    e[12] = 0;
    e[13] = 0;
    e[14] = 0;
    e[15] = 1;
    return this;
  }
  makeRotationFromEuler(t) {
    if (!t || !t.isEuler) {
      console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
    }
    const e = this.elements;
    const n = t.x;
    const r = t.y;
    const i = t.z;
    const s = Math.cos(n);
    const a = Math.sin(n);
    const o = Math.cos(r);
    const l = Math.sin(r);
    const c = Math.cos(i);
    const u = Math.sin(i);
    if (t.order === "XYZ") {
      const t = s * c;
      const n = s * u;
      const r = a * c;
      const i = a * u;
      e[0] = o * c;
      e[4] = -o * u;
      e[8] = l;
      e[1] = n + r * l;
      e[5] = t - i * l;
      e[9] = -a * o;
      e[2] = i - t * l;
      e[6] = r + n * l;
      e[10] = s * o;
    } else if (t.order === "YXZ") {
      const t = o * c;
      const n = o * u;
      const r = l * c;
      const i = l * u;
      e[0] = t + i * a;
      e[4] = r * a - n;
      e[8] = s * l;
      e[1] = s * u;
      e[5] = s * c;
      e[9] = -a;
      e[2] = n * a - r;
      e[6] = i + t * a;
      e[10] = s * o;
    } else if (t.order === "ZXY") {
      const t = o * c;
      const n = o * u;
      const r = l * c;
      const i = l * u;
      e[0] = t - i * a;
      e[4] = -s * u;
      e[8] = r + n * a;
      e[1] = n + r * a;
      e[5] = s * c;
      e[9] = i - t * a;
      e[2] = -s * l;
      e[6] = a;
      e[10] = s * o;
    } else if (t.order === "ZYX") {
      const t = s * c;
      const n = s * u;
      const r = a * c;
      const i = a * u;
      e[0] = o * c;
      e[4] = r * l - n;
      e[8] = t * l + i;
      e[1] = o * u;
      e[5] = i * l + t;
      e[9] = n * l - r;
      e[2] = -l;
      e[6] = a * o;
      e[10] = s * o;
    } else if (t.order === "YZX") {
      const t = s * o;
      const n = s * l;
      const r = a * o;
      const i = a * l;
      e[0] = o * c;
      e[4] = i - t * u;
      e[8] = r * u + n;
      e[1] = u;
      e[5] = s * c;
      e[9] = -a * c;
      e[2] = -l * c;
      e[6] = n * u + r;
      e[10] = t - i * u;
    } else if (t.order === "XZY") {
      const t = s * o;
      const n = s * l;
      const r = a * o;
      const i = a * l;
      e[0] = o * c;
      e[4] = -u;
      e[8] = l * c;
      e[1] = t * u + i;
      e[5] = s * c;
      e[9] = n * u - r;
      e[2] = r * u - n;
      e[6] = a * c;
      e[10] = i * u + t;
    }
    e[3] = 0;
    e[7] = 0;
    e[11] = 0;
    e[12] = 0;
    e[13] = 0;
    e[14] = 0;
    e[15] = 1;
    return this;
  }
  makeRotationFromQuaternion(t) {
    return this.compose(o, t, l);
  }
  lookAt(t, e, n) {
    const r = this.elements;
    h.subVectors(t, e);
    if (h.lengthSq() === 0) {
      h.z = 1;
    }
    h.normalize();
    c.crossVectors(n, h);
    if (c.lengthSq() === 0) {
      if (Math.abs(n.z) === 1) {
        h.x += 0.0001;
      } else {
        h.z += 0.0001;
      }
      h.normalize();
      c.crossVectors(n, h);
    }
    c.normalize();
    u.crossVectors(h, c);
    r[0] = c.x;
    r[4] = u.x;
    r[8] = h.x;
    r[1] = c.y;
    r[5] = u.y;
    r[9] = h.y;
    r[2] = c.z;
    r[6] = u.z;
    r[10] = h.z;
    return this;
  }
  multiply(t, e) {
    if (e !== undefined) {
      console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.");
      return this.multiplyMatrices(t, e);
    } else {
      return this.multiplyMatrices(this, t);
    }
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements;
    const r = e.elements;
    const i = this.elements;
    const s = n[0];
    const a = n[4];
    const o = n[8];
    const l = n[12];
    const c = n[1];
    const u = n[5];
    const h = n[9];
    const d = n[13];
    const f = n[2];
    const p = n[6];
    const m = n[10];
    const g = n[14];
    const v = n[3];
    const _ = n[7];
    const x = n[11];
    const y = n[15];
    const b = r[0];
    const w = r[4];
    const M = r[8];
    const T = r[12];
    const S = r[1];
    const E = r[5];
    const A = r[9];
    const R = r[13];
    const L = r[2];
    const P = r[6];
    const C = r[10];
    const D = r[14];
    const I = r[3];
    const N = r[7];
    const F = r[11];
    const O = r[15];
    i[0] = s * b + a * S + o * L + l * I;
    i[4] = s * w + a * E + o * P + l * N;
    i[8] = s * M + a * A + o * C + l * F;
    i[12] = s * T + a * R + o * D + l * O;
    i[1] = c * b + u * S + h * L + d * I;
    i[5] = c * w + u * E + h * P + d * N;
    i[9] = c * M + u * A + h * C + d * F;
    i[13] = c * T + u * R + h * D + d * O;
    i[2] = f * b + p * S + m * L + g * I;
    i[6] = f * w + p * E + m * P + g * N;
    i[10] = f * M + p * A + m * C + g * F;
    i[14] = f * T + p * R + m * D + g * O;
    i[3] = v * b + _ * S + x * L + y * I;
    i[7] = v * w + _ * E + x * P + y * N;
    i[11] = v * M + _ * A + x * C + y * F;
    i[15] = v * T + _ * R + x * D + y * O;
    return this;
  }
  multiplyScalar(t) {
    const e = this.elements;
    e[0] *= t;
    e[4] *= t;
    e[8] *= t;
    e[12] *= t;
    e[1] *= t;
    e[5] *= t;
    e[9] *= t;
    e[13] *= t;
    e[2] *= t;
    e[6] *= t;
    e[10] *= t;
    e[14] *= t;
    e[3] *= t;
    e[7] *= t;
    e[11] *= t;
    e[15] *= t;
    return this;
  }
  determinant() {
    const t = this.elements;
    const e = t[0];
    const n = t[4];
    const r = t[8];
    const i = t[12];
    const s = t[1];
    const a = t[5];
    const o = t[9];
    const l = t[13];
    const c = t[2];
    const u = t[6];
    const h = t[10];
    const d = t[14];
    return t[3] * (+i * o * u - r * l * u - i * a * h + n * l * h + r * a * d - n * o * d) + t[7] * (+e * o * d - e * l * h + i * s * h - r * s * d + r * l * c - i * o * c) + t[11] * (+e * l * u - e * a * d - i * s * u + n * s * d + i * a * c - n * l * c) + t[15] * (-r * a * c - e * o * u + e * a * h + r * s * u - n * s * h + n * o * c);
  }
  transpose() {
    const t = this.elements;
    let e;
    e = t[1];
    t[1] = t[4];
    t[4] = e;
    e = t[2];
    t[2] = t[8];
    t[8] = e;
    e = t[6];
    t[6] = t[9];
    t[9] = e;
    e = t[3];
    t[3] = t[12];
    t[12] = e;
    e = t[7];
    t[7] = t[13];
    t[13] = e;
    e = t[11];
    t[11] = t[14];
    t[14] = e;
    return this;
  }
  setPosition(t, e, n) {
    const r = this.elements;
    if (t.isVector3) {
      r[12] = t.x;
      r[13] = t.y;
      r[14] = t.z;
    } else {
      r[12] = t;
      r[13] = e;
      r[14] = n;
    }
    return this;
  }
  invert() {
    const t = this.elements;
    const e = t[0];
    const n = t[1];
    const r = t[2];
    const i = t[3];
    const s = t[4];
    const a = t[5];
    const o = t[6];
    const l = t[7];
    const c = t[8];
    const u = t[9];
    const h = t[10];
    const d = t[11];
    const f = t[12];
    const p = t[13];
    const m = t[14];
    const g = t[15];
    const v = u * m * l - p * h * l + p * o * d - a * m * d - u * o * g + a * h * g;
    const _ = f * h * l - c * m * l - f * o * d + s * m * d + c * o * g - s * h * g;
    const x = c * p * l - f * u * l + f * a * d - s * p * d - c * a * g + s * u * g;
    const y = f * u * o - c * p * o - f * a * h + s * p * h + c * a * m - s * u * m;
    const b = e * v + n * _ + r * x + i * y;
    if (b === 0) {
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    const w = 1 / b;
    t[0] = v * w;
    t[1] = (p * h * i - u * m * i - p * r * d + n * m * d + u * r * g - n * h * g) * w;
    t[2] = (a * m * i - p * o * i + p * r * l - n * m * l - a * r * g + n * o * g) * w;
    t[3] = (u * o * i - a * h * i - u * r * l + n * h * l + a * r * d - n * o * d) * w;
    t[4] = _ * w;
    t[5] = (c * m * i - f * h * i + f * r * d - e * m * d - c * r * g + e * h * g) * w;
    t[6] = (f * o * i - s * m * i - f * r * l + e * m * l + s * r * g - e * o * g) * w;
    t[7] = (s * h * i - c * o * i + c * r * l - e * h * l - s * r * d + e * o * d) * w;
    t[8] = x * w;
    t[9] = (f * u * i - c * p * i - f * n * d + e * p * d + c * n * g - e * u * g) * w;
    t[10] = (s * p * i - f * a * i + f * n * l - e * p * l - s * n * g + e * a * g) * w;
    t[11] = (c * a * i - s * u * i - c * n * l + e * u * l + s * n * d - e * a * d) * w;
    t[12] = y * w;
    t[13] = (c * p * r - f * u * r + f * n * h - e * p * h - c * n * m + e * u * m) * w;
    t[14] = (f * a * r - s * p * r - f * n * o + e * p * o + s * n * m - e * a * m) * w;
    t[15] = (s * u * r - c * a * r + c * n * o - e * u * o - s * n * h + e * a * h) * w;
    return this;
  }
  scale(t) {
    const e = this.elements;
    const n = t.x;
    const r = t.y;
    const i = t.z;
    e[0] *= n;
    e[4] *= r;
    e[8] *= i;
    e[1] *= n;
    e[5] *= r;
    e[9] *= i;
    e[2] *= n;
    e[6] *= r;
    e[10] *= i;
    e[3] *= n;
    e[7] *= r;
    e[11] *= i;
    return this;
  }
  getMaxScaleOnAxis() {
    const t = this.elements;
    const e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2];
    const n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6];
    const r = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
    return Math.sqrt(Math.max(e, n, r));
  }
  makeTranslation(t, e, n) {
    this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, n, 0, 0, 0, 1);
    return this;
  }
  makeRotationX(t) {
    const e = Math.cos(t);
    const n = Math.sin(t);
    this.set(1, 0, 0, 0, 0, e, -n, 0, 0, n, e, 0, 0, 0, 0, 1);
    return this;
  }
  makeRotationY(t) {
    const e = Math.cos(t);
    const n = Math.sin(t);
    this.set(e, 0, n, 0, 0, 1, 0, 0, -n, 0, e, 0, 0, 0, 0, 1);
    return this;
  }
  makeRotationZ(t) {
    const e = Math.cos(t);
    const n = Math.sin(t);
    this.set(e, -n, 0, 0, n, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  }
  makeRotationAxis(t, e) {
    const n = Math.cos(e);
    const r = Math.sin(e);
    const i = 1 - n;
    const s = t.x;
    const a = t.y;
    const o = t.z;
    const l = i * s;
    const c = i * a;
    this.set(l * s + n, l * a - r * o, l * o + r * a, 0, l * a + r * o, c * a + n, c * o - r * s, 0, l * o - r * a, c * o + r * s, i * o * o + n, 0, 0, 0, 0, 1);
    return this;
  }
  makeScale(t, e, n) {
    this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, n, 0, 0, 0, 0, 1);
    return this;
  }
  makeShear(t, e, n, r, i, s) {
    this.set(1, n, i, 0, t, 1, s, 0, e, r, 1, 0, 0, 0, 0, 1);
    return this;
  }
  compose(t, e, n) {
    const r = this.elements;
    const i = e._x;
    const s = e._y;
    const a = e._z;
    const o = e._w;
    const l = i + i;
    const c = s + s;
    const u = a + a;
    const h = i * l;
    const d = i * c;
    const f = i * u;
    const p = s * c;
    const m = s * u;
    const g = a * u;
    const v = o * l;
    const _ = o * c;
    const x = o * u;
    const y = n.x;
    const b = n.y;
    const w = n.z;
    r[0] = (1 - (p + g)) * y;
    r[1] = (d + x) * y;
    r[2] = (f - _) * y;
    r[3] = 0;
    r[4] = (d - x) * b;
    r[5] = (1 - (h + g)) * b;
    r[6] = (m + v) * b;
    r[7] = 0;
    r[8] = (f + _) * w;
    r[9] = (m - v) * w;
    r[10] = (1 - (h + p)) * w;
    r[11] = 0;
    r[12] = t.x;
    r[13] = t.y;
    r[14] = t.z;
    r[15] = 1;
    return this;
  }
  decompose(t, e, n) {
    const r = this.elements;
    let i = s.set(r[0], r[1], r[2]).length();
    const o = s.set(r[4], r[5], r[6]).length();
    const l = s.set(r[8], r[9], r[10]).length();
    if (this.determinant() < 0) {
      i = -i;
    }
    t.x = r[12];
    t.y = r[13];
    t.z = r[14];
    a.copy(this);
    const c = 1 / i;
    const u = 1 / o;
    const h = 1 / l;
    a.elements[0] *= c;
    a.elements[1] *= c;
    a.elements[2] *= c;
    a.elements[4] *= u;
    a.elements[5] *= u;
    a.elements[6] *= u;
    a.elements[8] *= h;
    a.elements[9] *= h;
    a.elements[10] *= h;
    e.setFromRotationMatrix(a);
    n.x = i;
    n.y = o;
    n.z = l;
    return this;
  }
  makePerspective(t, e, n, r, i, s) {
    if (s === undefined) {
      console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
    }
    const a = this.elements;
    const o = i * 2 / (e - t);
    const l = i * 2 / (n - r);
    const c = (e + t) / (e - t);
    const u = (n + r) / (n - r);
    const h = -(s + i) / (s - i);
    const d = s * -2 * i / (s - i);
    a[0] = o;
    a[4] = 0;
    a[8] = c;
    a[12] = 0;
    a[1] = 0;
    a[5] = l;
    a[9] = u;
    a[13] = 0;
    a[2] = 0;
    a[6] = 0;
    a[10] = h;
    a[14] = d;
    a[3] = 0;
    a[7] = 0;
    a[11] = -1;
    a[15] = 0;
    return this;
  }
  makeOrthographic(t, e, n, r, i, s) {
    const a = this.elements;
    const o = 1 / (e - t);
    const l = 1 / (n - r);
    const c = 1 / (s - i);
    const u = (e + t) * o;
    const h = (n + r) * l;
    const d = (s + i) * c;
    a[0] = o * 2;
    a[4] = 0;
    a[8] = 0;
    a[12] = -u;
    a[1] = 0;
    a[5] = l * 2;
    a[9] = 0;
    a[13] = -h;
    a[2] = 0;
    a[6] = 0;
    a[10] = c * -2;
    a[14] = -d;
    a[3] = 0;
    a[7] = 0;
    a[11] = 0;
    a[15] = 1;
    return this;
  }
  equals(t) {
    const e = this.elements;
    const n = t.elements;
    for (let t = 0; t < 16; t++) {
      if (e[t] !== n[t]) {
        return false;
      }
    }
    return true;
  }
  fromArray(t, e = 0) {
    for (let n = 0; n < 16; n++) {
      this.elements[n] = t[n + e];
    }
    return this;
  }
  toArray(t = [], e = 0) {
    const n = this.elements;
    t[e] = n[0];
    t[e + 1] = n[1];
    t[e + 2] = n[2];
    t[e + 3] = n[3];
    t[e + 4] = n[4];
    t[e + 5] = n[5];
    t[e + 6] = n[6];
    t[e + 7] = n[7];
    t[e + 8] = n[8];
    t[e + 9] = n[9];
    t[e + 10] = n[10];
    t[e + 11] = n[11];
    t[e + 12] = n[12];
    t[e + 13] = n[13];
    t[e + 14] = n[14];
    t[e + 15] = n[15];
    return t;
  }
}
i.prototype.isMatrix4 = true;
const s = new r.P();
const a = new i();
const o = new r.P(0, 0, 0);
const l = new r.P(1, 1, 1);
const c = new r.P();
const u = new r.P();
const h = new r.P();