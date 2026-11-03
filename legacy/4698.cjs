var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  i: function () {
    return l;
  }
});
var r = require("./6881.cjs");
var i = require("./4699.cjs");
var s = require("./1158.cjs");
const a = new i.a();
const o = new r.P();
class l {
  constructor(t = new s.J(), e = new s.J(), n = new s.J(), r = new s.J(), i = new s.J(), a = new s.J()) {
    this.planes = [t, e, n, r, i, a];
  }
  set(t, e, n, r, i, s) {
    const a = this.planes;
    a[0].copy(t);
    a[1].copy(e);
    a[2].copy(n);
    a[3].copy(r);
    a[4].copy(i);
    a[5].copy(s);
    return this;
  }
  copy(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) {
      e[n].copy(t.planes[n]);
    }
    return this;
  }
  setFromProjectionMatrix(t) {
    const e = this.planes;
    const n = t.elements;
    const r = n[0];
    const i = n[1];
    const s = n[2];
    const a = n[3];
    const o = n[4];
    const l = n[5];
    const c = n[6];
    const u = n[7];
    const h = n[8];
    const d = n[9];
    const f = n[10];
    const p = n[11];
    const m = n[12];
    const g = n[13];
    const v = n[14];
    const _ = n[15];
    e[0].setComponents(a - r, u - o, p - h, _ - m).normalize();
    e[1].setComponents(a + r, u + o, p + h, _ + m).normalize();
    e[2].setComponents(a + i, u + l, p + d, _ + g).normalize();
    e[3].setComponents(a - i, u - l, p - d, _ - g).normalize();
    e[4].setComponents(a - s, u - c, p - f, _ - v).normalize();
    e[5].setComponents(a + s, u + c, p + f, _ + v).normalize();
    return this;
  }
  intersectsObject(t) {
    const e = t.geometry;
    if (e.boundingSphere === null) {
      e.computeBoundingSphere();
    }
    a.copy(e.boundingSphere).applyMatrix4(t.matrixWorld);
    return this.intersectsSphere(a);
  }
  intersectsSprite(t) {
    a.center.set(0, 0, 0);
    a.radius = 0.7071067811865476;
    a.applyMatrix4(t.matrixWorld);
    return this.intersectsSphere(a);
  }
  intersectsSphere(t) {
    const e = this.planes;
    const n = t.center;
    const r = -t.radius;
    for (let t = 0; t < 6; t++) {
      if (e[t].distanceToPoint(n) < r) {
        return false;
      }
    }
    return true;
  }
  intersectsBox(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) {
      const r = e[n];
      o.x = r.normal.x > 0 ? t.max.x : t.min.x;
      o.y = r.normal.y > 0 ? t.max.y : t.min.y;
      o.z = r.normal.z > 0 ? t.max.z : t.min.z;
      if (r.distanceToPoint(o) < 0) {
        return false;
      }
    }
    return true;
  }
  containsPoint(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) {
      if (e[n].distanceToPoint(t) < 0) {
        return false;
      }
    }
    return true;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}