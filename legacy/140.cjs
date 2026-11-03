var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  a$: function () {
    return f;
  },
  lC: function () {
    return d;
  },
  ql: function () {
    return h;
  },
  Tl: function () {
    return u;
  }
});
var r = require("./223.cjs");
var i = require("./6881.cjs");
var s = require("./1138.cjs");
var a = require("./3662.cjs");
var o = require("./1661.cjs");
const l = new i.P();
const c = new s.F();
class u {
  constructor(t, e, n) {
    if (Array.isArray(t)) {
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    }
    this.name = "";
    this.array = t;
    this.itemSize = e;
    this.count = t !== undefined ? t.length / e : 0;
    this.normalized = n === true;
    this.usage = o.W2J;
    this.updateRange = {
      offset: 0,
      count: -1
    };
    this.version = 0;
  }
  onUploadCallback() {}
  set needsUpdate(t) {
    if (t === true) {
      this.version++;
    }
  }
  setUsage(t) {
    this.usage = t;
    return this;
  }
  copy(t) {
    this.name = t.name;
    this.array = new t.array.constructor(t.array);
    this.itemSize = t.itemSize;
    this.count = t.count;
    this.normalized = t.normalized;
    this.usage = t.usage;
    return this;
  }
  copyAt(t, e, n) {
    t *= this.itemSize;
    n *= e.itemSize;
    for (let r = 0, i = this.itemSize; r < i; r++) {
      this.array[t + r] = e.array[n + r];
    }
    return this;
  }
  copyArray(t) {
    this.array.set(t);
    return this;
  }
  copyColorsArray(t) {
    const e = this.array;
    let n = 0;
    for (let r = 0, i = t.length; r < i; r++) {
      let i = t[r];
      if (i === undefined) {
        console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined", r);
        i = new a.I();
      }
      e[n++] = i.r;
      e[n++] = i.g;
      e[n++] = i.b;
    }
    return this;
  }
  copyVector2sArray(t) {
    const e = this.array;
    let n = 0;
    for (let r = 0, i = t.length; r < i; r++) {
      let i = t[r];
      if (i === undefined) {
        console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", r);
        i = new s.F();
      }
      e[n++] = i.x;
      e[n++] = i.y;
    }
    return this;
  }
  copyVector3sArray(t) {
    const e = this.array;
    let n = 0;
    for (let r = 0, s = t.length; r < s; r++) {
      let s = t[r];
      if (s === undefined) {
        console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined", r);
        s = new i.P();
      }
      e[n++] = s.x;
      e[n++] = s.y;
      e[n++] = s.z;
    }
    return this;
  }
  copyVector4sArray(t) {
    const e = this.array;
    let n = 0;
    for (let i = 0, s = t.length; i < s; i++) {
      let s = t[i];
      if (s === undefined) {
        console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", i);
        s = new r.L();
      }
      e[n++] = s.x;
      e[n++] = s.y;
      e[n++] = s.z;
      e[n++] = s.w;
    }
    return this;
  }
  applyMatrix3(t) {
    if (this.itemSize === 2) {
      for (let e = 0, n = this.count; e < n; e++) {
        c.fromBufferAttribute(this, e);
        c.applyMatrix3(t);
        this.setXY(e, c.x, c.y);
      }
    } else if (this.itemSize === 3) {
      for (let e = 0, n = this.count; e < n; e++) {
        l.fromBufferAttribute(this, e);
        l.applyMatrix3(t);
        this.setXYZ(e, l.x, l.y, l.z);
      }
    }
    return this;
  }
  applyMatrix4(t) {
    for (let e = 0, n = this.count; e < n; e++) {
      l.x = this.getX(e);
      l.y = this.getY(e);
      l.z = this.getZ(e);
      l.applyMatrix4(t);
      this.setXYZ(e, l.x, l.y, l.z);
    }
    return this;
  }
  applyNormalMatrix(t) {
    for (let e = 0, n = this.count; e < n; e++) {
      l.x = this.getX(e);
      l.y = this.getY(e);
      l.z = this.getZ(e);
      l.applyNormalMatrix(t);
      this.setXYZ(e, l.x, l.y, l.z);
    }
    return this;
  }
  transformDirection(t) {
    for (let e = 0, n = this.count; e < n; e++) {
      l.x = this.getX(e);
      l.y = this.getY(e);
      l.z = this.getZ(e);
      l.transformDirection(t);
      this.setXYZ(e, l.x, l.y, l.z);
    }
    return this;
  }
  set(t, e = 0) {
    this.array.set(t, e);
    return this;
  }
  getX(t) {
    return this.array[t * this.itemSize];
  }
  setX(t, e) {
    this.array[t * this.itemSize] = e;
    return this;
  }
  getY(t) {
    return this.array[t * this.itemSize + 1];
  }
  setY(t, e) {
    this.array[t * this.itemSize + 1] = e;
    return this;
  }
  getZ(t) {
    return this.array[t * this.itemSize + 2];
  }
  setZ(t, e) {
    this.array[t * this.itemSize + 2] = e;
    return this;
  }
  getW(t) {
    return this.array[t * this.itemSize + 3];
  }
  setW(t, e) {
    this.array[t * this.itemSize + 3] = e;
    return this;
  }
  setXY(t, e, n) {
    t *= this.itemSize;
    this.array[t + 0] = e;
    this.array[t + 1] = n;
    return this;
  }
  setXYZ(t, e, n, r) {
    t *= this.itemSize;
    this.array[t + 0] = e;
    this.array[t + 1] = n;
    this.array[t + 2] = r;
    return this;
  }
  setXYZW(t, e, n, r, i) {
    t *= this.itemSize;
    this.array[t + 0] = e;
    this.array[t + 1] = n;
    this.array[t + 2] = r;
    this.array[t + 3] = i;
    return this;
  }
  onUpload(t) {
    this.onUploadCallback = t;
    return this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const t = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.prototype.slice.call(this.array),
      normalized: this.normalized
    };
    if (this.name !== "") {
      t.name = this.name;
    }
    if (this.usage !== o.W2J) {
      t.usage = this.usage;
    }
    if (this.updateRange.offset !== 0 || this.updateRange.count !== -1) {
      t.updateRange = this.updateRange;
    }
    return t;
  }
}
u.prototype.isBufferAttribute = true;
class h extends u {
  constructor(t, e, n) {
    super(new Uint16Array(t), e, n);
  }
}
class d extends u {
  constructor(t, e, n) {
    super(new Uint32Array(t), e, n);
  }
}
(class extends u {
  constructor(t, e, n) {
    super(new Uint16Array(t), e, n);
  }
}).prototype.isFloat16BufferAttribute = true;
class f extends u {
  constructor(t, e, n) {
    super(new Float32Array(t), e, n);
  }
}