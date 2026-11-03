var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  o: function () {
    return I;
  }
});
var r = require("./9046.cjs");
var i = require("./140.cjs");
const s = function (t, e, n = 2) {
  const r = e && e.length;
  const i = r ? e[0] * n : t.length;
  let s = a(t, 0, i, n, true);
  const c = [];
  if (!s || s.next === s.prev) {
    return c;
  }
  let u;
  let h;
  let d;
  let m;
  let g;
  let _;
  let x;
  if (r) {
    s = function (t, e, n, r) {
      const i = [];
      let s;
      let l;
      let c;
      let u;
      let h;
      s = 0;
      l = e.length;
      for (; s < l; s++) {
        c = e[s] * r;
        u = s < l - 1 ? e[s + 1] * r : t.length;
        h = a(t, c, u, r, false);
        if (h === h.next) {
          h.steiner = true;
        }
        i.push(v(h));
      }
      i.sort(f);
      s = 0;
      for (; s < i.length; s++) {
        p(i[s], n);
        n = o(n, n.next);
      }
      return n;
    }(t, e, s, n);
  }
  if (t.length > n * 80) {
    u = d = t[0];
    h = m = t[1];
    for (let e = n; e < i; e += n) {
      g = t[e];
      _ = t[e + 1];
      if (g < u) {
        u = g;
      }
      if (_ < h) {
        h = _;
      }
      if (g > d) {
        d = g;
      }
      if (_ > m) {
        m = _;
      }
    }
    x = Math.max(d - u, m - h);
    x = x !== 0 ? 1 / x : 0;
  }
  l(s, c, n, u, h, x);
  return c;
};
function a(t, e, n, r, i) {
  let s;
  let a;
  if (i === function (t, e, n, r) {
    let i = 0;
    for (let s = e, a = n - r; s < n; s += r) {
      i += (t[a] - t[s]) * (t[s + 1] + t[a + 1]);
      a = s;
    }
    return i;
  }(t, e, n, r) > 0) {
    for (s = e; s < n; s += r) {
      a = A(s, t[s], t[s + 1], a);
    }
  } else {
    for (s = n - r; s >= e; s -= r) {
      a = A(s, t[s], t[s + 1], a);
    }
  }
  if (a && b(a, a.next)) {
    R(a);
    a = a.next;
  }
  return a;
}
function o(t, e) {
  if (!t) {
    return t;
  }
  e ||= t;
  let n;
  let r = t;
  do {
    n = false;
    if (r.steiner || !b(r, r.next) && y(r.prev, r, r.next) !== 0) {
      r = r.next;
    } else {
      R(r);
      r = e = r.prev;
      if (r === r.next) {
        break;
      }
      n = true;
    }
  } while (n || r !== e);
  return e;
}
function l(t, e, n, r, i, s, a) {
  if (!t) {
    return;
  }
  if (!a && s) {
    (function (t, e, n, r) {
      let i = t;
      do {
        if (i.z === null) {
          i.z = g(i.x, i.y, e, n, r);
        }
        i.prevZ = i.prev;
        i.nextZ = i.next;
        i = i.next;
      } while (i !== t);
      i.prevZ.nextZ = null;
      i.prevZ = null;
      (function (t) {
        let e;
        let n;
        let r;
        let i;
        let s;
        let a;
        let o;
        let l;
        let c = 1;
        do {
          n = t;
          t = null;
          s = null;
          a = 0;
          while (n) {
            a++;
            r = n;
            o = 0;
            e = 0;
            for (; e < c && (o++, r = r.nextZ, r); e++);
            for (l = c; o > 0 || l > 0 && r;) {
              if (o !== 0 && (l === 0 || !r || n.z <= r.z)) {
                i = n;
                n = n.nextZ;
                o--;
              } else {
                i = r;
                r = r.nextZ;
                l--;
              }
              if (s) {
                s.nextZ = i;
              } else {
                t = i;
              }
              i.prevZ = s;
              s = i;
            }
            n = r;
          }
          s.nextZ = null;
          c *= 2;
        } while (a > 1);
      })(i);
    })(t, r, i, s);
  }
  let f;
  let p;
  let m = t;
  while (t.prev !== t.next) {
    f = t.prev;
    p = t.next;
    if (s ? u(t, r, i, s) : c(t)) {
      e.push(f.i / n);
      e.push(t.i / n);
      e.push(p.i / n);
      R(t);
      t = p.next;
      m = p.next;
    } else if ((t = p) === m) {
      if (a) {
        if (a === 1) {
          l(t = h(o(t), e, n), e, n, r, i, s, 2);
        } else if (a === 2) {
          d(t, e, n, r, i, s);
        }
      } else {
        l(o(t), e, n, r, i, s, 1);
      }
      break;
    }
  }
}
function c(t) {
  const e = t.prev;
  const n = t;
  const r = t.next;
  if (y(e, n, r) >= 0) {
    return false;
  }
  let i = t.next.next;
  while (i !== t.prev) {
    if (_(e.x, e.y, n.x, n.y, r.x, r.y, i.x, i.y) && y(i.prev, i, i.next) >= 0) {
      return false;
    }
    i = i.next;
  }
  return true;
}
function u(t, e, n, r) {
  const i = t.prev;
  const s = t;
  const a = t.next;
  if (y(i, s, a) >= 0) {
    return false;
  }
  const o = i.x < s.x ? i.x < a.x ? i.x : a.x : s.x < a.x ? s.x : a.x;
  const l = i.y < s.y ? i.y < a.y ? i.y : a.y : s.y < a.y ? s.y : a.y;
  const c = i.x > s.x ? i.x > a.x ? i.x : a.x : s.x > a.x ? s.x : a.x;
  const u = i.y > s.y ? i.y > a.y ? i.y : a.y : s.y > a.y ? s.y : a.y;
  const h = g(o, l, e, n, r);
  const d = g(c, u, e, n, r);
  let f = t.prevZ;
  let p = t.nextZ;
  while (f && f.z >= h && p && p.z <= d) {
    if (f !== t.prev && f !== t.next && _(i.x, i.y, s.x, s.y, a.x, a.y, f.x, f.y) && y(f.prev, f, f.next) >= 0) {
      return false;
    }
    f = f.prevZ;
    if (p !== t.prev && p !== t.next && _(i.x, i.y, s.x, s.y, a.x, a.y, p.x, p.y) && y(p.prev, p, p.next) >= 0) {
      return false;
    }
    p = p.nextZ;
  }
  while (f && f.z >= h) {
    if (f !== t.prev && f !== t.next && _(i.x, i.y, s.x, s.y, a.x, a.y, f.x, f.y) && y(f.prev, f, f.next) >= 0) {
      return false;
    }
    f = f.prevZ;
  }
  while (p && p.z <= d) {
    if (p !== t.prev && p !== t.next && _(i.x, i.y, s.x, s.y, a.x, a.y, p.x, p.y) && y(p.prev, p, p.next) >= 0) {
      return false;
    }
    p = p.nextZ;
  }
  return true;
}
function h(t, e, n) {
  let r = t;
  do {
    const i = r.prev;
    const s = r.next.next;
    if (!b(i, s) && w(i, r, r.next, s) && S(i, s) && S(s, i)) {
      e.push(i.i / n);
      e.push(r.i / n);
      e.push(s.i / n);
      R(r);
      R(r.next);
      r = t = s;
    }
    r = r.next;
  } while (r !== t);
  return o(r);
}
function d(t, e, n, r, i, s) {
  let a = t;
  do {
    let t = a.next.next;
    while (t !== a.prev) {
      if (a.i !== t.i && x(a, t)) {
        let c = E(a, t);
        a = o(a, a.next);
        c = o(c, c.next);
        l(a, e, n, r, i, s);
        l(c, e, n, r, i, s);
        return;
      }
      t = t.next;
    }
    a = a.next;
  } while (a !== t);
}
function f(t, e) {
  return t.x - e.x;
}
function p(t, e) {
  if (e = function (t, e) {
    let n = e;
    const r = t.x;
    const i = t.y;
    let s;
    let a = -Infinity;
    do {
      if (i <= n.y && i >= n.next.y && n.next.y !== n.y) {
        const t = n.x + (i - n.y) * (n.next.x - n.x) / (n.next.y - n.y);
        if (t <= r && t > a) {
          a = t;
          if (t === r) {
            if (i === n.y) {
              return n;
            }
            if (i === n.next.y) {
              return n.next;
            }
          }
          s = n.x < n.next.x ? n : n.next;
        }
      }
      n = n.next;
    } while (n !== e);
    if (!s) {
      return null;
    }
    if (r === a) {
      return s;
    }
    const o = s;
    const l = s.x;
    const c = s.y;
    let u;
    let h = Infinity;
    n = s;
    do {
      if (r >= n.x && n.x >= l && r !== n.x && _(i < c ? r : a, i, l, c, i < c ? a : r, i, n.x, n.y)) {
        u = Math.abs(i - n.y) / (r - n.x);
        if (S(n, t) && (u < h || u === h && (n.x > s.x || n.x === s.x && m(s, n)))) {
          s = n;
          h = u;
        }
      }
      n = n.next;
    } while (n !== o);
    return s;
  }(t, e)) {
    const n = E(e, t);
    o(e, e.next);
    o(n, n.next);
  }
}
function m(t, e) {
  return y(t.prev, t, e.prev) < 0 && y(e.next, t, t.next) < 0;
}
function g(t, e, n, r, i) {
  return (t = ((t = ((t = ((t = ((t = (t - n) * 32767 * i) | t << 8) & 16711935) | t << 4) & 252645135) | t << 2) & 858993459) | t << 1) & 1431655765) | (e = ((e = ((e = ((e = ((e = (e - r) * 32767 * i) | e << 8) & 16711935) | e << 4) & 252645135) | e << 2) & 858993459) | e << 1) & 1431655765) << 1;
}
function v(t) {
  let e = t;
  let n = t;
  do {
    if (e.x < n.x || e.x === n.x && e.y < n.y) {
      n = e;
    }
    e = e.next;
  } while (e !== t);
  return n;
}
function _(t, e, n, r, i, s, a, o) {
  return (i - a) * (e - o) - (t - a) * (s - o) >= 0 && (t - a) * (r - o) - (n - a) * (e - o) >= 0 && (n - a) * (s - o) - (i - a) * (r - o) >= 0;
}
function x(t, e) {
  return t.next.i !== e.i && t.prev.i !== e.i && !function (t, e) {
    let n = t;
    do {
      if (n.i !== t.i && n.next.i !== t.i && n.i !== e.i && n.next.i !== e.i && w(n, n.next, t, e)) {
        return true;
      }
      n = n.next;
    } while (n !== t);
    return false;
  }(t, e) && (S(t, e) && S(e, t) && function (t, e) {
    let n = t;
    let r = false;
    const i = (t.x + e.x) / 2;
    const s = (t.y + e.y) / 2;
    do {
      if (n.y > s != n.next.y > s && n.next.y !== n.y && i < (n.next.x - n.x) * (s - n.y) / (n.next.y - n.y) + n.x) {
        r = !r;
      }
      n = n.next;
    } while (n !== t);
    return r;
  }(t, e) && (y(t.prev, t, e.prev) || y(t, e.prev, e)) || b(t, e) && y(t.prev, t, t.next) > 0 && y(e.prev, e, e.next) > 0);
}
function y(t, e, n) {
  return (e.y - t.y) * (n.x - e.x) - (e.x - t.x) * (n.y - e.y);
}
function b(t, e) {
  return t.x === e.x && t.y === e.y;
}
function w(t, e, n, r) {
  const i = T(y(t, e, n));
  const s = T(y(t, e, r));
  const a = T(y(n, r, t));
  const o = T(y(n, r, e));
  return i !== s && a !== o || i === 0 && !!M(t, n, e) || s === 0 && !!M(t, r, e) || a === 0 && !!M(n, t, r) || o === 0 && !!M(n, e, r);
}
function M(t, e, n) {
  return e.x <= Math.max(t.x, n.x) && e.x >= Math.min(t.x, n.x) && e.y <= Math.max(t.y, n.y) && e.y >= Math.min(t.y, n.y);
}
function T(t) {
  if (t > 0) {
    return 1;
  } else if (t < 0) {
    return -1;
  } else {
    return 0;
  }
}
function S(t, e) {
  if (y(t.prev, t, t.next) < 0) {
    return y(t, e, t.next) >= 0 && y(t, t.prev, e) >= 0;
  } else {
    return y(t, e, t.prev) < 0 || y(t, t.next, e) < 0;
  }
}
function E(t, e) {
  const n = new L(t.i, t.x, t.y);
  const r = new L(e.i, e.x, e.y);
  const i = t.next;
  const s = e.prev;
  t.next = e;
  e.prev = t;
  n.next = i;
  i.prev = n;
  r.next = n;
  n.prev = r;
  s.next = r;
  r.prev = s;
  return r;
}
function A(t, e, n, r) {
  const i = new L(t, e, n);
  if (r) {
    i.next = r.next;
    i.prev = r;
    r.next.prev = i;
    r.next = i;
  } else {
    i.prev = i;
    i.next = i;
  }
  return i;
}
function R(t) {
  t.next.prev = t.prev;
  t.prev.next = t.next;
  if (t.prevZ) {
    t.prevZ.nextZ = t.nextZ;
  }
  if (t.nextZ) {
    t.nextZ.prevZ = t.prevZ;
  }
}
function L(t, e, n) {
  this.i = t;
  this.x = e;
  this.y = n;
  this.prev = null;
  this.next = null;
  this.z = null;
  this.prevZ = null;
  this.nextZ = null;
  this.steiner = false;
}
class P {
  static area(t) {
    const e = t.length;
    let n = 0;
    for (let r = e - 1, i = 0; i < e; r = i++) {
      n += t[r].x * t[i].y - t[i].x * t[r].y;
    }
    return n * 0.5;
  }
  static isClockWise(t) {
    return P.area(t) < 0;
  }
  static triangulateShape(t, e) {
    const n = [];
    const r = [];
    const i = [];
    C(t);
    D(n, t);
    let a = t.length;
    e.forEach(C);
    for (let t = 0; t < e.length; t++) {
      r.push(a);
      a += e[t].length;
      D(n, e[t]);
    }
    const o = s(n, r);
    for (let t = 0; t < o.length; t += 3) {
      i.push(o.slice(t, t + 3));
    }
    return i;
  }
}
function C(t) {
  const e = t.length;
  if (e > 2 && t[e - 1].equals(t[0])) {
    t.pop();
  }
}
function D(t, e) {
  for (let n = 0; n < e.length; n++) {
    t.push(e[n].x);
    t.push(e[n].y);
  }
}
class I extends r.u {
  constructor(t, e = 12) {
    super();
    this.type = "ShapeGeometry";
    this.parameters = {
      shapes: t,
      curveSegments: e
    };
    const n = [];
    const r = [];
    const s = [];
    const a = [];
    let o = 0;
    let l = 0;
    if (Array.isArray(t) === false) {
      c(t);
    } else {
      for (let e = 0; e < t.length; e++) {
        c(t[e]);
        this.addGroup(o, l, e);
        o += l;
        l = 0;
      }
    }
    function c(t) {
      const i = r.length / 3;
      const o = t.extractPoints(e);
      let c = o.shape;
      const u = o.holes;
      if (P.isClockWise(c) === false) {
        c = c.reverse();
      }
      for (let t = 0, e = u.length; t < e; t++) {
        const e = u[t];
        if (P.isClockWise(e) === true) {
          u[t] = e.reverse();
        }
      }
      const h = P.triangulateShape(c, u);
      for (let t = 0, e = u.length; t < e; t++) {
        const e = u[t];
        c = c.concat(e);
      }
      for (let t = 0, e = c.length; t < e; t++) {
        const e = c[t];
        r.push(e.x, e.y, 0);
        s.push(0, 0, 1);
        a.push(e.x, e.y);
      }
      for (let t = 0, e = h.length; t < e; t++) {
        const e = h[t];
        const r = e[0] + i;
        const s = e[1] + i;
        const a = e[2] + i;
        n.push(r, s, a);
        l += 3;
      }
    }
    this.setIndex(n);
    this.setAttribute("position", new i.a$(r, 3));
    this.setAttribute("normal", new i.a$(s, 3));
    this.setAttribute("uv", new i.a$(a, 2));
  }
  toJSON() {
    const t = super.toJSON();
    return function (t, e) {
      e.shapes = [];
      if (Array.isArray(t)) {
        for (let n = 0, r = t.length; n < r; n++) {
          const r = t[n];
          e.shapes.push(r.uuid);
        }
      } else {
        e.shapes.push(t.uuid);
      }
      return e;
    }(this.parameters.shapes, t);
  }
  static fromJSON(t, e) {
    const n = [];
    for (let r = 0, i = t.shapes.length; r < i; r++) {
      const i = e[t.shapes[r]];
      n.push(i);
    }
    return new I(n, t.curveSegments);
  }
}