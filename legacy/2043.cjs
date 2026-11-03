var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  qW: function () {
    return i;
  },
  I3: function () {
    return s;
  },
  DO: function () {
    return a;
  },
  uZ: function () {
    return o;
  },
  kz: function () {
    return l;
  },
  ZZ: function () {
    return c;
  },
  t7: function () {
    return u;
  },
  rO: function () {
    return h;
  },
  Qy: function () {
    return d;
  },
  Id: function () {
    return f;
  },
  ZY: function () {
    return p;
  },
  wt: function () {
    return m;
  },
  h3: function () {
    return g;
  },
  gy: function () {
    return v;
  }
});
const r = [];
for (let t = 0; t < 256; t++) {
  r[t] = (t < 16 ? "0" : "") + t.toString(16);
}
const i = Math.PI / 180;
const s = 180 / Math.PI;
function a() {
  const t = Math.random() * 4294967295 | 0;
  const e = Math.random() * 4294967295 | 0;
  const n = Math.random() * 4294967295 | 0;
  const i = Math.random() * 4294967295 | 0;
  return (r[t & 255] + r[t >> 8 & 255] + r[t >> 16 & 255] + r[t >> 24 & 255] + "-" + r[e & 255] + r[e >> 8 & 255] + "-" + r[e >> 16 & 15 | 64] + r[e >> 24 & 255] + "-" + r[n & 63 | 128] + r[n >> 8 & 255] + "-" + r[n >> 16 & 255] + r[n >> 24 & 255] + r[i & 255] + r[i >> 8 & 255] + r[i >> 16 & 255] + r[i >> 24 & 255]).toUpperCase();
}
function o(t, e, n) {
  return Math.max(e, Math.min(n, t));
}
function l(t, e) {
  return (t % e + e) % e;
}
function c(t, e, n, r, i) {
  return r + (t - e) * (i - r) / (n - e);
}
function u(t, e, n) {
  return (1 - n) * t + n * e;
}
function h(t, e) {
  return t + Math.floor(Math.random() * (e - t + 1));
}
function d(t, e) {
  return t + Math.random() * (e - t);
}
function f(t) {
  return t * i;
}
function p(t) {
  return t * s;
}
function m(t) {
  return (t & t - 1) == 0 && t !== 0;
}
function g(t) {
  return Math.pow(2, Math.ceil(Math.log(t) / Math.LN2));
}
function v(t) {
  return Math.pow(2, Math.floor(Math.log(t) / Math.LN2));
}