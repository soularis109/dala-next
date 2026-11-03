var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  V: function () {
    return r;
  }
});
class r {
  constructor() {
    this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    if (arguments.length > 0) {
      console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.");
    }
  }
  set(t, e, n, r, i, s, a, o, l) {
    const c = this.elements;
    c[0] = t;
    c[1] = r;
    c[2] = a;
    c[3] = e;
    c[4] = i;
    c[5] = o;
    c[6] = n;
    c[7] = s;
    c[8] = l;
    return this;
  }
  identity() {
    this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
    return this;
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
    return this;
  }
  extractBasis(t, e, n) {
    t.setFromMatrix3Column(this, 0);
    e.setFromMatrix3Column(this, 1);
    n.setFromMatrix3Column(this, 2);
    return this;
  }
  setFromMatrix4(t) {
    const e = t.elements;
    this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]);
    return this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements;
    const r = e.elements;
    const i = this.elements;
    const s = n[0];
    const a = n[3];
    const o = n[6];
    const l = n[1];
    const c = n[4];
    const u = n[7];
    const h = n[2];
    const d = n[5];
    const f = n[8];
    const p = r[0];
    const m = r[3];
    const g = r[6];
    const v = r[1];
    const _ = r[4];
    const x = r[7];
    const y = r[2];
    const b = r[5];
    const w = r[8];
    i[0] = s * p + a * v + o * y;
    i[3] = s * m + a * _ + o * b;
    i[6] = s * g + a * x + o * w;
    i[1] = l * p + c * v + u * y;
    i[4] = l * m + c * _ + u * b;
    i[7] = l * g + c * x + u * w;
    i[2] = h * p + d * v + f * y;
    i[5] = h * m + d * _ + f * b;
    i[8] = h * g + d * x + f * w;
    return this;
  }
  multiplyScalar(t) {
    const e = this.elements;
    e[0] *= t;
    e[3] *= t;
    e[6] *= t;
    e[1] *= t;
    e[4] *= t;
    e[7] *= t;
    e[2] *= t;
    e[5] *= t;
    e[8] *= t;
    return this;
  }
  determinant() {
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
    return e * s * c - e * a * l - n * i * c + n * a * o + r * i * l - r * s * o;
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
    const u = c * s - a * l;
    const h = a * o - c * i;
    const d = l * i - s * o;
    const f = e * u + n * h + r * d;
    if (f === 0) {
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    const p = 1 / f;
    t[0] = u * p;
    t[1] = (r * l - c * n) * p;
    t[2] = (a * n - r * s) * p;
    t[3] = h * p;
    t[4] = (c * e - r * o) * p;
    t[5] = (r * i - a * e) * p;
    t[6] = d * p;
    t[7] = (n * o - l * e) * p;
    t[8] = (s * e - n * i) * p;
    return this;
  }
  transpose() {
    let t;
    const e = this.elements;
    t = e[1];
    e[1] = e[3];
    e[3] = t;
    t = e[2];
    e[2] = e[6];
    e[6] = t;
    t = e[5];
    e[5] = e[7];
    e[7] = t;
    return this;
  }
  getNormalMatrix(t) {
    return this.setFromMatrix4(t).invert().transpose();
  }
  transposeIntoArray(t) {
    const e = this.elements;
    t[0] = e[0];
    t[1] = e[3];
    t[2] = e[6];
    t[3] = e[1];
    t[4] = e[4];
    t[5] = e[7];
    t[6] = e[2];
    t[7] = e[5];
    t[8] = e[8];
    return this;
  }
  setUvTransform(t, e, n, r, i, s, a) {
    const o = Math.cos(i);
    const l = Math.sin(i);
    this.set(n * o, n * l, -n * (o * s + l * a) + s + t, -r * l, r * o, -r * (-l * s + o * a) + a + e, 0, 0, 1);
    return this;
  }
  scale(t, e) {
    const n = this.elements;
    n[0] *= t;
    n[3] *= t;
    n[6] *= t;
    n[1] *= e;
    n[4] *= e;
    n[7] *= e;
    return this;
  }
  rotate(t) {
    const e = Math.cos(t);
    const n = Math.sin(t);
    const r = this.elements;
    const i = r[0];
    const s = r[3];
    const a = r[6];
    const o = r[1];
    const l = r[4];
    const c = r[7];
    r[0] = e * i + n * o;
    r[3] = e * s + n * l;
    r[6] = e * a + n * c;
    r[1] = -n * i + e * o;
    r[4] = -n * s + e * l;
    r[7] = -n * a + e * c;
    return this;
  }
  translate(t, e) {
    const n = this.elements;
    n[0] += t * n[2];
    n[3] += t * n[5];
    n[6] += t * n[8];
    n[1] += e * n[2];
    n[4] += e * n[5];
    n[7] += e * n[8];
    return this;
  }
  equals(t) {
    const e = this.elements;
    const n = t.elements;
    for (let t = 0; t < 9; t++) {
      if (e[t] !== n[t]) {
        return false;
      }
    }
    return true;
  }
  fromArray(t, e = 0) {
    for (let n = 0; n < 9; n++) {
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
    return t;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
r.prototype.isMatrix3 = true;