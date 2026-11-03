var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  z: function () {
    return h;
  }
});
var r = require("./6881.cjs");
const i = new r.P();
const s = new r.P();
const a = new r.P();
const o = new r.P();
const l = new r.P();
const c = new r.P();
const u = new r.P();
class h {
  constructor(t = new r.P(), e = new r.P(0, 0, -1)) {
    this.origin = t;
    this.direction = e;
  }
  set(t, e) {
    this.origin.copy(t);
    this.direction.copy(e);
    return this;
  }
  copy(t) {
    this.origin.copy(t.origin);
    this.direction.copy(t.direction);
    return this;
  }
  at(t, e) {
    return e.copy(this.direction).multiplyScalar(t).add(this.origin);
  }
  lookAt(t) {
    this.direction.copy(t).sub(this.origin).normalize();
    return this;
  }
  recast(t) {
    this.origin.copy(this.at(t, i));
    return this;
  }
  closestPointToPoint(t, e) {
    e.subVectors(t, this.origin);
    const n = e.dot(this.direction);
    if (n < 0) {
      return e.copy(this.origin);
    } else {
      return e.copy(this.direction).multiplyScalar(n).add(this.origin);
    }
  }
  distanceToPoint(t) {
    return Math.sqrt(this.distanceSqToPoint(t));
  }
  distanceSqToPoint(t) {
    const e = i.subVectors(t, this.origin).dot(this.direction);
    if (e < 0) {
      return this.origin.distanceToSquared(t);
    } else {
      i.copy(this.direction).multiplyScalar(e).add(this.origin);
      return i.distanceToSquared(t);
    }
  }
  distanceSqToSegment(t, e, n, r) {
    s.copy(t).add(e).multiplyScalar(0.5);
    a.copy(e).sub(t).normalize();
    o.copy(this.origin).sub(s);
    const i = t.distanceTo(e) * 0.5;
    const l = -this.direction.dot(a);
    const c = o.dot(this.direction);
    const u = -o.dot(a);
    const h = o.lengthSq();
    const d = Math.abs(1 - l * l);
    let f;
    let p;
    let m;
    let g;
    if (d > 0) {
      f = l * u - c;
      p = l * c - u;
      g = i * d;
      if (f >= 0) {
        if (p >= -g) {
          if (p <= g) {
            const t = 1 / d;
            f *= t;
            p *= t;
            m = f * (f + l * p + c * 2) + p * (l * f + p + u * 2) + h;
          } else {
            p = i;
            f = Math.max(0, -(l * p + c));
            m = -f * f + p * (p + u * 2) + h;
          }
        } else {
          p = -i;
          f = Math.max(0, -(l * p + c));
          m = -f * f + p * (p + u * 2) + h;
        }
      } else if (p <= -g) {
        f = Math.max(0, -(-l * i + c));
        p = f > 0 ? -i : Math.min(Math.max(-i, -u), i);
        m = -f * f + p * (p + u * 2) + h;
      } else if (p <= g) {
        f = 0;
        p = Math.min(Math.max(-i, -u), i);
        m = p * (p + u * 2) + h;
      } else {
        f = Math.max(0, -(l * i + c));
        p = f > 0 ? i : Math.min(Math.max(-i, -u), i);
        m = -f * f + p * (p + u * 2) + h;
      }
    } else {
      p = l > 0 ? -i : i;
      f = Math.max(0, -(l * p + c));
      m = -f * f + p * (p + u * 2) + h;
    }
    if (n) {
      n.copy(this.direction).multiplyScalar(f).add(this.origin);
    }
    if (r) {
      r.copy(a).multiplyScalar(p).add(s);
    }
    return m;
  }
  intersectSphere(t, e) {
    i.subVectors(t.center, this.origin);
    const n = i.dot(this.direction);
    const r = i.dot(i) - n * n;
    const s = t.radius * t.radius;
    if (r > s) {
      return null;
    }
    const a = Math.sqrt(s - r);
    const o = n - a;
    const l = n + a;
    if (o < 0 && l < 0) {
      return null;
    } else if (o < 0) {
      return this.at(l, e);
    } else {
      return this.at(o, e);
    }
  }
  intersectsSphere(t) {
    return this.distanceSqToPoint(t.center) <= t.radius * t.radius;
  }
  distanceToPlane(t) {
    const e = t.normal.dot(this.direction);
    if (e === 0) {
      if (t.distanceToPoint(this.origin) === 0) {
        return 0;
      } else {
        return null;
      }
    }
    const n = -(this.origin.dot(t.normal) + t.constant) / e;
    if (n >= 0) {
      return n;
    } else {
      return null;
    }
  }
  intersectPlane(t, e) {
    const n = this.distanceToPlane(t);
    if (n === null) {
      return null;
    } else {
      return this.at(n, e);
    }
  }
  intersectsPlane(t) {
    const e = t.distanceToPoint(this.origin);
    if (e === 0) {
      return true;
    }
    return t.normal.dot(this.direction) * e < 0;
  }
  intersectBox(t, e) {
    let n;
    let r;
    let i;
    let s;
    let a;
    let o;
    const l = 1 / this.direction.x;
    const c = 1 / this.direction.y;
    const u = 1 / this.direction.z;
    const h = this.origin;
    if (l >= 0) {
      n = (t.min.x - h.x) * l;
      r = (t.max.x - h.x) * l;
    } else {
      n = (t.max.x - h.x) * l;
      r = (t.min.x - h.x) * l;
    }
    if (c >= 0) {
      i = (t.min.y - h.y) * c;
      s = (t.max.y - h.y) * c;
    } else {
      i = (t.max.y - h.y) * c;
      s = (t.min.y - h.y) * c;
    }
    if (n > s || i > r) {
      return null;
    } else {
      if (i > n || n != n) {
        n = i;
      }
      if (s < r || r != r) {
        r = s;
      }
      if (u >= 0) {
        a = (t.min.z - h.z) * u;
        o = (t.max.z - h.z) * u;
      } else {
        a = (t.max.z - h.z) * u;
        o = (t.min.z - h.z) * u;
      }
      if (n > o || a > r) {
        return null;
      } else {
        if (a > n || n != n) {
          n = a;
        }
        if (o < r || r != r) {
          r = o;
        }
        if (r < 0) {
          return null;
        } else {
          return this.at(n >= 0 ? n : r, e);
        }
      }
    }
  }
  intersectsBox(t) {
    return this.intersectBox(t, i) !== null;
  }
  intersectTriangle(t, e, n, r, i) {
    l.subVectors(e, t);
    c.subVectors(n, t);
    u.crossVectors(l, c);
    let s;
    let a = this.direction.dot(u);
    if (a > 0) {
      if (r) {
        return null;
      }
      s = 1;
    } else {
      if (!(a < 0)) {
        return null;
      }
      s = -1;
      a = -a;
    }
    o.subVectors(this.origin, t);
    const h = s * this.direction.dot(c.crossVectors(o, c));
    if (h < 0) {
      return null;
    }
    const d = s * this.direction.dot(l.cross(o));
    if (d < 0) {
      return null;
    }
    if (h + d > a) {
      return null;
    }
    const f = -s * o.dot(u);
    if (f < 0) {
      return null;
    } else {
      return this.at(f / a, i);
    }
  }
  applyMatrix4(t) {
    this.origin.applyMatrix4(t);
    this.direction.transformDirection(t);
    return this;
  }
  equals(t) {
    return t.origin.equals(this.origin) && t.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}