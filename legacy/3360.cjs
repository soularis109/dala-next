var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  I: function () {
    return Ie;
  }
});
var r = {};
__d(r, {
  AsyncCompress: function () {
    return kt;
  },
  AsyncDecompress: function () {
    return ne;
  },
  AsyncDeflate: function () {
    return Dt;
  },
  AsyncGunzip: function () {
    return Wt;
  },
  AsyncGzip: function () {
    return kt;
  },
  AsyncInflate: function () {
    return Ot;
  },
  AsyncUnzipInflate: function () {
    return Le;
  },
  AsyncUnzlib: function () {
    return Qt;
  },
  AsyncZipDeflate: function () {
    return Me;
  },
  AsyncZlib: function () {
    return Yt;
  },
  Compress: function () {
    return zt;
  },
  DecodeUTF8: function () {
    return ue;
  },
  Decompress: function () {
    return ee;
  },
  Deflate: function () {
    return Ct;
  },
  EncodeUTF8: function () {
    return he;
  },
  Gunzip: function () {
    return Vt;
  },
  Gzip: function () {
    return zt;
  },
  Inflate: function () {
    return Ft;
  },
  Unzip: function () {
    return Pe;
  },
  UnzipInflate: function () {
    return Re;
  },
  UnzipPassThrough: function () {
    return Ae;
  },
  Unzlib: function () {
    return Jt;
  },
  Zip: function () {
    return Te;
  },
  ZipDeflate: function () {
    return we;
  },
  ZipPassThrough: function () {
    return be;
  },
  Zlib: function () {
    return qt;
  },
  compress: function () {
    return Gt;
  },
  compressSync: function () {
    return Ht;
  },
  decompress: function () {
    return re;
  },
  decompressSync: function () {
    return ie;
  },
  deflate: function () {
    return It;
  },
  deflateSync: function () {
    return Nt;
  },
  gunzip: function () {
    return Xt;
  },
  gunzipSync: function () {
    return jt;
  },
  gzip: function () {
    return Gt;
  },
  gzipSync: function () {
    return Ht;
  },
  inflate: function () {
    return Ut;
  },
  inflateSync: function () {
    return Bt;
  },
  strFromU8: function () {
    return fe;
  },
  strToU8: function () {
    return de;
  },
  unzip: function () {
    return Ce;
  },
  unzipSync: function () {
    return De;
  },
  unzlib: function () {
    return $t;
  },
  unzlibSync: function () {
    return te;
  },
  zip: function () {
    return Se;
  },
  zipSync: function () {
    return Ee;
  },
  zlib: function () {
    return Zt;
  },
  zlibSync: function () {
    return Kt;
  }
});
var i = require("./1661.cjs");
var s = require("./5092.cjs");
var a = require("./3993.cjs");
var o = require("./6023.cjs");
class l extends o.a {
  constructor(t) {
    super(t);
  }
  load(t, e, n, r) {
    const o = this;
    const l = new a.I();
    const c = new s.h(this.manager);
    c.setResponseType("arraybuffer");
    c.setRequestHeader(this.requestHeader);
    c.setPath(this.path);
    c.setWithCredentials(o.withCredentials);
    c.load(t, function (t) {
      const n = o.parse(t);
      if (n) {
        if (n.image !== undefined) {
          l.image = n.image;
        } else if (n.data !== undefined) {
          l.image.width = n.width;
          l.image.height = n.height;
          l.image.data = n.data;
        }
        l.wrapS = n.wrapS !== undefined ? n.wrapS : i.uWy;
        l.wrapT = n.wrapT !== undefined ? n.wrapT : i.uWy;
        l.magFilter = n.magFilter !== undefined ? n.magFilter : i.wem;
        l.minFilter = n.minFilter !== undefined ? n.minFilter : i.wem;
        l.anisotropy = n.anisotropy !== undefined ? n.anisotropy : 1;
        if (n.encoding !== undefined) {
          l.encoding = n.encoding;
        }
        if (n.flipY !== undefined) {
          l.flipY = n.flipY;
        }
        if (n.format !== undefined) {
          l.format = n.format;
        }
        if (n.type !== undefined) {
          l.type = n.type;
        }
        if (n.mipmaps !== undefined) {
          l.mipmaps = n.mipmaps;
          l.minFilter = i.D1R;
        }
        if (n.mipmapCount === 1) {
          l.minFilter = i.wem;
        }
        if (n.generateMipmaps !== undefined) {
          l.generateMipmaps = n.generateMipmaps;
        }
        l.needsUpdate = true;
        if (e) {
          e(l, n);
        }
      }
    }, n, r);
    return l;
  }
}
const c = new Float32Array(1);
const u = new Int32Array(c.buffer);
class h {
  static toHalfFloat(t) {
    c[0] = t;
    const e = u[0];
    let n = e >> 16 & 32768;
    let r = e >> 12 & 2047;
    const i = e >> 23 & 255;
    if (i < 103) {
      return n;
    } else if (i > 142) {
      n |= 31744;
      n |= (i == 255 ? 0 : 1) && e & 8388607;
      return n;
    } else if (i < 113) {
      r |= 2048;
      n |= (r >> 114 - i) + (r >> 113 - i & 1);
      return n;
    } else {
      n |= i - 112 << 10 | r >> 1;
      n += r & 1;
      return n;
    }
  }
}
var d = {};
function f(t) {
  return URL.createObjectURL(new Blob([t], {
    type: "text/javascript"
  }));
}
function p(t) {
  return new Worker(t);
}
try {
  URL.revokeObjectURL(f(""));
} catch (t) {
  f = function (t) {
    return "data:application/javascript;charset=UTF-8," + encodeURI(t);
  };
  p = function (t) {
    return new Worker(t, {
      type: "module"
    });
  };
}
var m = Uint8Array;
var g = Uint16Array;
var v = Uint32Array;
var _ = new m([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
var x = new m([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]);
var y = new m([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
function b(t, e) {
  var n = new g(31);
  for (var r = 0; r < 31; ++r) {
    n[r] = e += 1 << t[r - 1];
  }
  var i = new v(n[30]);
  for (r = 1; r < 30; ++r) {
    for (var s = n[r]; s < n[r + 1]; ++s) {
      i[s] = s - n[r] << 5 | r;
    }
  }
  return [n, i];
}
var w = b(_, 2);
var M = w[0];
var T = w[1];
M[28] = 258;
T[258] = 28;
var S = b(x, 0);
var E = S[0];
var A = S[1];
var R = new g(32768);
for (var L = 0; L < 32768; ++L) {
  var P = (L & 43690) >>> 1 | (L & 21845) << 1;
  P = ((P = (P & 52428) >>> 2 | (P & 13107) << 2) & 61680) >>> 4 | (P & 3855) << 4;
  R[L] = ((P & 65280) >>> 8 | (P & 255) << 8) >>> 1;
}
function C(t, e, n) {
  for (var r = t.length, i = 0, s = new g(e); i < r; ++i) {
    ++s[t[i] - 1];
  }
  var a;
  var o = new g(e);
  for (i = 0; i < e; ++i) {
    o[i] = o[i - 1] + s[i - 1] << 1;
  }
  if (n) {
    a = new g(1 << e);
    var l = 15 - e;
    for (i = 0; i < r; ++i) {
      if (t[i]) {
        var c = i << 4 | t[i];
        var u = e - t[i];
        for (var h = o[t[i] - 1]++ << u, d = h | (1 << u) - 1; h <= d; ++h) {
          a[R[h] >>> l] = c;
        }
      }
    }
  } else {
    a = new g(r);
    i = 0;
    for (; i < r; ++i) {
      if (t[i]) {
        a[i] = R[o[t[i] - 1]++] >>> 15 - t[i];
      }
    }
  }
  return a;
}
var D = new m(288);
for (L = 0; L < 144; ++L) {
  D[L] = 8;
}
for (L = 144; L < 256; ++L) {
  D[L] = 9;
}
for (L = 256; L < 280; ++L) {
  D[L] = 7;
}
for (L = 280; L < 288; ++L) {
  D[L] = 8;
}
var I = new m(32);
for (L = 0; L < 32; ++L) {
  I[L] = 5;
}
var N = C(D, 9, 0);
var F = C(D, 9, 1);
var O = C(I, 5, 0);
var U = C(I, 5, 1);
function B(t) {
  var e = t[0];
  for (var n = 1; n < t.length; ++n) {
    if (t[n] > e) {
      e = t[n];
    }
  }
  return e;
}
function z(t, e, n) {
  var r = e / 8 | 0;
  return (t[r] | t[r + 1] << 8) >> (e & 7) & n;
}
function k(t, e) {
  var n = e / 8 | 0;
  return (t[n] | t[n + 1] << 8 | t[n + 2] << 16) >> (e & 7);
}
function G(t) {
  return (t / 8 | 0) + (t & 7 && 1);
}
function H(t, e, n) {
  if (e == null || e < 0) {
    e = 0;
  }
  if (n == null || n > t.length) {
    n = t.length;
  }
  var r = new (t instanceof g ? g : t instanceof v ? v : m)(n - e);
  r.set(t.subarray(e, n));
  return r;
}
function V(t, e, n) {
  var r = t.length;
  if (!r || n && !n.l && r < 5) {
    return e || new m(0);
  }
  var i = !e || n;
  var s = !n || n.i;
  n ||= {};
  e ||= new m(r * 3);
  function a(t) {
    var n = e.length;
    if (t > n) {
      var r = new m(Math.max(n * 2, t));
      r.set(e);
      e = r;
    }
  }
  var o = n.f || 0;
  var l = n.p || 0;
  var c = n.b || 0;
  var u = n.l;
  var h = n.d;
  var d = n.m;
  var f = n.n;
  var p = r * 8;
  do {
    if (!u) {
      n.f = o = z(t, l, 1);
      var g = z(t, l + 1, 3);
      l += 3;
      if (!g) {
        var v = t[(N = G(l) + 4) - 4] | t[N - 3] << 8;
        var b = N + v;
        if (b > r) {
          if (s) {
            throw "unexpected EOF";
          }
          break;
        }
        if (i) {
          a(c + v);
        }
        e.set(t.subarray(N, b), c);
        n.b = c += v;
        n.p = l = b * 8;
        continue;
      }
      if (g == 1) {
        u = F;
        h = U;
        d = 9;
        f = 5;
      } else {
        if (g != 2) {
          throw "invalid block type";
        }
        var w = z(t, l, 31) + 257;
        var T = z(t, l + 10, 15) + 4;
        var S = w + z(t, l + 5, 31) + 1;
        l += 14;
        var A = new m(S);
        var R = new m(19);
        for (var L = 0; L < T; ++L) {
          R[y[L]] = z(t, l + L * 3, 7);
        }
        l += T * 3;
        var P = B(R);
        var D = (1 << P) - 1;
        var I = C(R, P, 1);
        for (L = 0; L < S;) {
          var N;
          var O = I[z(t, l, D)];
          l += O & 15;
          if ((N = O >>> 4) < 16) {
            A[L++] = N;
          } else {
            var V = 0;
            var W = 0;
            for (N == 16 ? (W = 3 + z(t, l, 3), l += 2, V = A[L - 1]) : N == 17 ? (W = 3 + z(t, l, 7), l += 3) : N == 18 && (W = 11 + z(t, l, 127), l += 7); W--;) {
              A[L++] = V;
            }
          }
        }
        var X = A.subarray(0, w);
        var j = A.subarray(w);
        d = B(X);
        f = B(j);
        u = C(X, d, 1);
        h = C(j, f, 1);
      }
      if (l > p) {
        if (s) {
          throw "unexpected EOF";
        }
        break;
      }
    }
    if (i) {
      a(c + 131072);
    }
    var q = (1 << d) - 1;
    var Y = (1 << f) - 1;
    for (var Z = l;; Z = l) {
      var K = (V = u[k(t, l) & q]) >>> 4;
      if ((l += V & 15) > p) {
        if (s) {
          throw "unexpected EOF";
        }
        break;
      }
      if (!V) {
        throw "invalid length/literal";
      }
      if (K < 256) {
        e[c++] = K;
      } else {
        if (K == 256) {
          Z = l;
          u = null;
          break;
        }
        var J = K - 254;
        if (K > 264) {
          var Q = _[L = K - 257];
          J = z(t, l, (1 << Q) - 1) + M[L];
          l += Q;
        }
        var $ = h[k(t, l) & Y];
        var tt = $ >>> 4;
        if (!$) {
          throw "invalid distance";
        }
        l += $ & 15;
        j = E[tt];
        if (tt > 3) {
          Q = x[tt];
          j += k(t, l) & (1 << Q) - 1;
          l += Q;
        }
        if (l > p) {
          if (s) {
            throw "unexpected EOF";
          }
          break;
        }
        if (i) {
          a(c + 131072);
        }
        for (var et = c + J; c < et; c += 4) {
          e[c] = e[c - j];
          e[c + 1] = e[c + 1 - j];
          e[c + 2] = e[c + 2 - j];
          e[c + 3] = e[c + 3 - j];
        }
        c = et;
      }
    }
    n.l = u;
    n.p = Z;
    n.b = c;
    if (u) {
      o = 1;
      n.m = d;
      n.d = h;
      n.n = f;
    }
  } while (!o);
  if (c == e.length) {
    return e;
  } else {
    return H(e, 0, c);
  }
}
function W(t, e, n) {
  n <<= e & 7;
  var r = e / 8 | 0;
  t[r] |= n;
  t[r + 1] |= n >>> 8;
}
function X(t, e, n) {
  n <<= e & 7;
  var r = e / 8 | 0;
  t[r] |= n;
  t[r + 1] |= n >>> 8;
  t[r + 2] |= n >>> 16;
}
function j(t, e) {
  var n = [];
  for (var r = 0; r < t.length; ++r) {
    if (t[r]) {
      n.push({
        s: r,
        f: t[r]
      });
    }
  }
  var i = n.length;
  var s = n.slice();
  if (!i) {
    return [$, 0];
  }
  if (i == 1) {
    var a = new m(n[0].s + 1);
    a[n[0].s] = 1;
    return [a, 1];
  }
  n.sort(function (t, e) {
    return t.f - e.f;
  });
  n.push({
    s: -1,
    f: 25001
  });
  var o = n[0];
  var l = n[1];
  var c = 0;
  var u = 1;
  var h = 2;
  for (n[0] = {
    s: -1,
    f: o.f + l.f,
    l: o,
    r: l
  }; u != i - 1;) {
    o = n[n[c].f < n[h].f ? c++ : h++];
    l = n[c != u && n[c].f < n[h].f ? c++ : h++];
    n[u++] = {
      s: -1,
      f: o.f + l.f,
      l: o,
      r: l
    };
  }
  var d = s[0].s;
  for (r = 1; r < i; ++r) {
    if (s[r].s > d) {
      d = s[r].s;
    }
  }
  var f = new g(d + 1);
  var p = q(n[u - 1], f, 0);
  if (p > e) {
    r = 0;
    var v = 0;
    var _ = p - e;
    var x = 1 << _;
    for (s.sort(function (t, e) {
      return f[e.s] - f[t.s] || t.f - e.f;
    }); r < i; ++r) {
      var y = s[r].s;
      if (!(f[y] > e)) {
        break;
      }
      v += x - (1 << p - f[y]);
      f[y] = e;
    }
    for (v >>>= _; v > 0;) {
      var b = s[r].s;
      if (f[b] < e) {
        v -= 1 << e - f[b]++ - 1;
      } else {
        ++r;
      }
    }
    for (; r >= 0 && v; --r) {
      var w = s[r].s;
      if (f[w] == e) {
        --f[w];
        ++v;
      }
    }
    p = e;
  }
  return [new m(f), p];
}
function q(t, e, n) {
  if (t.s == -1) {
    return Math.max(q(t.l, e, n + 1), q(t.r, e, n + 1));
  } else {
    return e[t.s] = n;
  }
}
function Y(t) {
  for (var e = t.length; e && !t[--e];);
  var n = new g(++e);
  var r = 0;
  var i = t[0];
  var s = 1;
  var a = function (t) {
    n[r++] = t;
  };
  for (var o = 1; o <= e; ++o) {
    if (t[o] == i && o != e) {
      ++s;
    } else {
      if (!i && s > 2) {
        for (; s > 138; s -= 138) {
          a(32754);
        }
        if (s > 2) {
          a(s > 10 ? s - 11 << 5 | 28690 : s - 3 << 5 | 12305);
          s = 0;
        }
      } else if (s > 3) {
        a(i);
        --s;
        for (; s > 6; s -= 6) {
          a(8304);
        }
        if (s > 2) {
          a(s - 3 << 5 | 8208);
          s = 0;
        }
      }
      while (s--) {
        a(i);
      }
      s = 1;
      i = t[o];
    }
  }
  return [n.subarray(0, r), e];
}
function Z(t, e) {
  var n = 0;
  for (var r = 0; r < e.length; ++r) {
    n += t[r] * e[r];
  }
  return n;
}
function K(t, e, n) {
  var r = n.length;
  var i = G(e + 2);
  t[i] = r & 255;
  t[i + 1] = r >>> 8;
  t[i + 2] = t[i] ^ 255;
  t[i + 3] = t[i + 1] ^ 255;
  for (var s = 0; s < r; ++s) {
    t[i + s + 4] = n[s];
  }
  return (i + 4 + r) * 8;
}
function J(t, e, n, r, i, s, a, o, l, c, u) {
  W(e, u++, n);
  ++i[256];
  var h = j(i, 15);
  var d = h[0];
  var f = h[1];
  var p = j(s, 15);
  var m = p[0];
  var v = p[1];
  var b = Y(d);
  for (var w = b[0], M = b[1], T = Y(m), S = T[0], E = T[1], A = new g(19), R = 0; R < w.length; ++R) {
    A[w[R] & 31]++;
  }
  for (R = 0; R < S.length; ++R) {
    A[S[R] & 31]++;
  }
  var L = j(A, 7);
  for (var P = L[0], F = L[1], U = 19; U > 4 && !P[y[U - 1]]; --U);
  var B;
  var z;
  var k;
  var G;
  var H = c + 5 << 3;
  var V = Z(i, D) + Z(s, I) + a;
  var q = Z(i, d) + Z(s, m) + a + 14 + U * 3 + Z(A, P) + (A[16] * 2 + A[17] * 3 + A[18] * 7);
  if (H <= V && H <= q) {
    return K(e, u, t.subarray(l, l + c));
  }
  W(e, u, 1 + (q < V));
  u += 2;
  if (q < V) {
    B = C(d, f, 0);
    z = d;
    k = C(m, v, 0);
    G = m;
    var J = C(P, F, 0);
    W(e, u, M - 257);
    W(e, u + 5, E - 1);
    W(e, u + 10, U - 4);
    u += 14;
    for (R = 0; R < U; ++R) {
      W(e, u + R * 3, P[y[R]]);
    }
    u += U * 3;
    var Q = [w, S];
    for (var $ = 0; $ < 2; ++$) {
      var tt = Q[$];
      for (R = 0; R < tt.length; ++R) {
        var et = tt[R] & 31;
        W(e, u, J[et]);
        u += P[et];
        if (et > 15) {
          W(e, u, tt[R] >>> 5 & 127);
          u += tt[R] >>> 12;
        }
      }
    }
  } else {
    B = N;
    z = D;
    k = O;
    G = I;
  }
  for (R = 0; R < o; ++R) {
    if (r[R] > 255) {
      et = r[R] >>> 18 & 31;
      X(e, u, B[et + 257]);
      u += z[et + 257];
      if (et > 7) {
        W(e, u, r[R] >>> 23 & 31);
        u += _[et];
      }
      var nt = r[R] & 31;
      X(e, u, k[nt]);
      u += G[nt];
      if (nt > 3) {
        X(e, u, r[R] >>> 5 & 8191);
        u += x[nt];
      }
    } else {
      X(e, u, B[r[R]]);
      u += z[r[R]];
    }
  }
  X(e, u, B[256]);
  return u + z[256];
}
var Q = new v([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
var $ = new m(0);
function tt(t, e, n, r, i, s) {
  var a = t.length;
  var o = new m(r + a + (1 + Math.ceil(a / 7000)) * 5 + i);
  var l = o.subarray(r, o.length - i);
  var c = 0;
  if (!e || a < 8) {
    for (var u = 0; u <= a; u += 65535) {
      var h = u + 65535;
      if (h < a) {
        c = K(l, c, t.subarray(u, h));
      } else {
        l[u] = s;
        c = K(l, c, t.subarray(u, a));
      }
    }
  } else {
    var d = Q[e - 1];
    var f = d >>> 13;
    var p = d & 8191;
    var y = (1 << n) - 1;
    var b = new g(32768);
    var w = new g(y + 1);
    var M = Math.ceil(n / 3);
    var S = M * 2;
    var E = function (e) {
      return (t[e] ^ t[e + 1] << M ^ t[e + 2] << S) & y;
    };
    var R = new v(25000);
    var L = new g(288);
    var P = new g(32);
    var C = 0;
    var D = 0;
    u = 0;
    var I = 0;
    var N = 0;
    var F = 0;
    for (; u < a; ++u) {
      var O = E(u);
      var U = u & 32767;
      var B = w[O];
      b[U] = B;
      w[O] = U;
      if (N <= u) {
        var z = a - u;
        if ((C > 7000 || I > 24576) && z > 423) {
          c = J(t, l, 0, R, L, P, D, I, F, u - F, c);
          I = C = D = 0;
          F = u;
          for (var k = 0; k < 286; ++k) {
            L[k] = 0;
          }
          for (k = 0; k < 30; ++k) {
            P[k] = 0;
          }
        }
        var V = 2;
        var W = 0;
        var X = p;
        var j = U - B & 32767;
        if (z > 2 && O == E(u - j)) {
          var q = Math.min(f, z) - 1;
          for (var Y = Math.min(32767, u), Z = Math.min(258, z); j <= Y && --X && U != B;) {
            if (t[u + V] == t[u + V - j]) {
              for (var tt = 0; tt < Z && t[u + tt] == t[u + tt - j]; ++tt);
              if (tt > V) {
                V = tt;
                W = j;
                if (tt > q) {
                  break;
                }
                var et = Math.min(j, tt - 2);
                var nt = 0;
                for (k = 0; k < et; ++k) {
                  var rt = u - j + k + 32768 & 32767;
                  var it = rt - b[rt] + 32768 & 32767;
                  if (it > nt) {
                    nt = it;
                    B = rt;
                  }
                }
              }
            }
            j += (U = B) - (B = b[U]) + 32768 & 32767;
          }
        }
        if (W) {
          R[I++] = T[V] << 18 | 268435456 | A[W];
          var st = T[V] & 31;
          var at = A[W] & 31;
          D += _[st] + x[at];
          ++L[257 + st];
          ++P[at];
          N = u + V;
          ++C;
        } else {
          R[I++] = t[u];
          ++L[t[u]];
        }
      }
    }
    c = J(t, l, s, R, L, P, D, I, F, u - F, c);
    if (!s && c & 7) {
      c = K(l, c + 1, $);
    }
  }
  return H(o, 0, r + G(c) + i);
}
var et = function () {
  var t = new v(256);
  for (var e = 0; e < 256; ++e) {
    var n = e;
    for (var r = 9; --r;) {
      n = (n & 1 && 3988292384) ^ n >>> 1;
    }
    t[e] = n;
  }
  return t;
}();
function nt() {
  var t = -1;
  return {
    p: function (e) {
      var n = t;
      for (var r = 0; r < e.length; ++r) {
        n = et[n & 255 ^ e[r]] ^ n >>> 8;
      }
      t = n;
    },
    d: function () {
      return ~t;
    }
  };
}
function rt() {
  var t = 1;
  var e = 0;
  return {
    p: function (n) {
      var r = t;
      var i = e;
      for (var s = n.length, a = 0; a != s;) {
        for (var o = Math.min(a + 2655, s); a < o; ++a) {
          i += r += n[a];
        }
        r = (r & 65535) + (r >> 16) * 15;
        i = (i & 65535) + (i >> 16) * 15;
      }
      t = r;
      e = i;
    },
    d: function () {
      return ((t %= 65521) & 255) << 24 | t >>> 8 << 16 | ((e %= 65521) & 255) << 8 | e >>> 8;
    }
  };
}
function it(t, e, n, r, i) {
  return tt(t, e.level == null ? 6 : e.level, e.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(t.length))) * 1.5) : 12 + e.mem, n, r, !i);
}
function st(t, e) {
  var n = {};
  for (var r in t) {
    n[r] = t[r];
  }
  for (var r in e) {
    n[r] = e[r];
  }
  return n;
}
function at(t, e, n) {
  for (var r = t(), i = t.toString(), s = i.slice(i.indexOf("[") + 1, i.lastIndexOf("]")).replace(/ /g, "").split(","), a = 0; a < r.length; ++a) {
    var o = r[a];
    var l = s[a];
    if (typeof o == "function") {
      e += ";" + l + "=";
      var c = o.toString();
      if (o.prototype) {
        if (c.indexOf("[native code]") != -1) {
          var u = c.indexOf(" ", 8) + 1;
          e += c.slice(u, c.indexOf("(", u));
        } else {
          e += c;
          for (var h in o.prototype) {
            e += ";" + l + ".prototype." + h + "=" + o.prototype[h].toString();
          }
        }
      } else {
        e += c;
      }
    } else {
      n[l] = o;
    }
  }
  return [e, n];
}
var ot = [];
function lt(t, e, n, r) {
  var i;
  if (!ot[n]) {
    var s = "";
    var a = {};
    for (var o = t.length - 1, l = 0; l < o; ++l) {
      s = (i = at(t[l], s, a))[0];
      a = i[1];
    }
    ot[n] = at(t[o], s, a);
  }
  var c = st({}, ot[n][1]);
  return function (t, e, n, r, i) {
    var s = p(d[e] ||= f(t));
    s.onerror = function (t) {
      return i(t.error, null);
    };
    s.onmessage = function (t) {
      return i(null, t.data);
    };
    s.postMessage(n, r);
    return s;
  }(ot[n][0] + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + e.toString() + "}", n, c, function (t) {
    var e = [];
    for (var n in t) {
      if (t[n] instanceof m || t[n] instanceof g || t[n] instanceof v) {
        e.push((t[n] = new t[n].constructor(t[n])).buffer);
      }
    }
    return e;
  }(c), r);
}
function ct() {
  return [m, g, v, _, x, y, M, E, F, U, R, C, B, z, k, G, H, V, Bt, mt, gt];
}
function ut() {
  return [m, g, v, _, x, y, T, A, N, D, O, I, R, Q, $, C, W, X, j, q, Y, Z, K, J, G, H, tt, it, Nt, mt];
}
function ht() {
  return [Tt, At, Mt, nt, et];
}
function dt() {
  return [St, Et];
}
function ft() {
  return [Rt, Mt, rt];
}
function pt() {
  return [Lt];
}
function mt(t) {
  return postMessage(t, [t.buffer]);
}
function gt(t) {
  return t && t.size && new m(t.size);
}
function vt(t, e, n, r, i, s) {
  var a = lt(n, r, i, function (t, e) {
    a.terminate();
    s(t, e);
  });
  a.postMessage([t, e], e.consume ? [t.buffer] : []);
  return function () {
    a.terminate();
  };
}
function _t(t) {
  t.ondata = function (t, e) {
    return postMessage([t, e], [t.buffer]);
  };
  return function (e) {
    return t.push(e.data[0], e.data[1]);
  };
}
function xt(t, e, n, r, i) {
  var s;
  var a = lt(t, r, i, function (t, n) {
    if (t) {
      a.terminate();
      e.ondata.call(e, t);
    } else {
      if (n[1]) {
        a.terminate();
      }
      e.ondata.call(e, t, n[0], n[1]);
    }
  });
  a.postMessage(n);
  e.push = function (t, n) {
    if (s) {
      throw "stream finished";
    }
    if (!e.ondata) {
      throw "no stream handler";
    }
    a.postMessage([t, s = n], [t.buffer]);
  };
  e.terminate = function () {
    a.terminate();
  };
}
function yt(t, e) {
  return t[e] | t[e + 1] << 8;
}
function bt(t, e) {
  return (t[e] | t[e + 1] << 8 | t[e + 2] << 16 | t[e + 3] << 24) >>> 0;
}
function wt(t, e) {
  return bt(t, e) + bt(t, e + 4) * 4294967296;
}
function Mt(t, e, n) {
  for (; n; ++e) {
    t[e] = n;
    n >>>= 8;
  }
}
function Tt(t, e) {
  var n = e.filename;
  t[0] = 31;
  t[1] = 139;
  t[2] = 8;
  t[8] = e.level < 2 ? 4 : e.level == 9 ? 2 : 0;
  t[9] = 3;
  if (e.mtime != 0) {
    Mt(t, 4, Math.floor(new Date(e.mtime || Date.now()) / 1000));
  }
  if (n) {
    t[3] = 8;
    for (var r = 0; r <= n.length; ++r) {
      t[r + 10] = n.charCodeAt(r);
    }
  }
}
function St(t) {
  if (t[0] != 31 || t[1] != 139 || t[2] != 8) {
    throw "invalid gzip data";
  }
  var e = t[3];
  var n = 10;
  if (e & 4) {
    n += t[10] | 2 + (t[11] << 8);
  }
  for (var r = (e >> 3 & 1) + (e >> 4 & 1); r > 0; r -= !t[n++]);
  return n + (e & 2);
}
function Et(t) {
  var e = t.length;
  return (t[e - 4] | t[e - 3] << 8 | t[e - 2] << 16 | t[e - 1] << 24) >>> 0;
}
function At(t) {
  return 10 + (t.filename && t.filename.length + 1 || 0);
}
function Rt(t, e) {
  var n = e.level;
  var r = n == 0 ? 0 : n < 6 ? 1 : n == 9 ? 3 : 2;
  t[0] = 120;
  t[1] = r << 6 | (r ? 32 - r * 2 : 1);
}
function Lt(t) {
  if ((t[0] & 15) != 8 || t[0] >>> 4 > 7 || (t[0] << 8 | t[1]) % 31) {
    throw "invalid zlib data";
  }
  if (t[1] & 32) {
    throw "invalid zlib data: preset dictionaries not supported";
  }
}
function Pt(t, e) {
  if (!e && typeof t == "function") {
    e = t;
    t = {};
  }
  this.ondata = e;
  return t;
}
var Ct = function () {
  function t(t, e) {
    if (!e && typeof t == "function") {
      e = t;
      t = {};
    }
    this.ondata = e;
    this.o = t || {};
  }
  t.prototype.p = function (t, e) {
    this.ondata(it(t, this.o, 0, 0, !e), e);
  };
  t.prototype.push = function (t, e) {
    if (this.d) {
      throw "stream finished";
    }
    if (!this.ondata) {
      throw "no stream handler";
    }
    this.d = e;
    this.p(t, e || false);
  };
  return t;
}();
var Dt = function () {
  return function (t, e) {
    xt([ut, function () {
      return [_t, Ct];
    }], this, Pt.call(this, t, e), function (t) {
      var e = new Ct(t.data);
      onmessage = _t(e);
    }, 6);
  };
}();
function It(t, e, n) {
  if (!n) {
    n = e;
    e = {};
  }
  if (typeof n != "function") {
    throw "no callback";
  }
  return vt(t, e, [ut], function (t) {
    return mt(Nt(t.data[0], t.data[1]));
  }, 0, n);
}
function Nt(t, e) {
  return it(t, e || {}, 0, 0);
}
var Ft = function () {
  function t(t) {
    this.s = {};
    this.p = new m(0);
    this.ondata = t;
  }
  t.prototype.e = function (t) {
    if (this.d) {
      throw "stream finished";
    }
    if (!this.ondata) {
      throw "no stream handler";
    }
    var e = this.p.length;
    var n = new m(e + t.length);
    n.set(this.p);
    n.set(t, e);
    this.p = n;
  };
  t.prototype.c = function (t) {
    this.d = this.s.i = t || false;
    var e = this.s.b;
    var n = V(this.p, this.o, this.s);
    this.ondata(H(n, e, this.s.b), this.d);
    this.o = H(n, this.s.b - 32768);
    this.s.b = this.o.length;
    this.p = H(this.p, this.s.p / 8 | 0);
    this.s.p &= 7;
  };
  t.prototype.push = function (t, e) {
    this.e(t);
    this.c(e);
  };
  return t;
}();
var Ot = function () {
  return function (t) {
    this.ondata = t;
    xt([ct, function () {
      return [_t, Ft];
    }], this, 0, function () {
      var t = new Ft();
      onmessage = _t(t);
    }, 7);
  };
}();
function Ut(t, e, n) {
  if (!n) {
    n = e;
    e = {};
  }
  if (typeof n != "function") {
    throw "no callback";
  }
  return vt(t, e, [ct], function (t) {
    return mt(Bt(t.data[0], gt(t.data[1])));
  }, 1, n);
}
function Bt(t, e) {
  return V(t, e);
}
var zt = function () {
  function t(t, e) {
    this.c = nt();
    this.l = 0;
    this.v = 1;
    Ct.call(this, t, e);
  }
  t.prototype.push = function (t, e) {
    Ct.prototype.push.call(this, t, e);
  };
  t.prototype.p = function (t, e) {
    this.c.p(t);
    this.l += t.length;
    var n = it(t, this.o, this.v && At(this.o), e && 8, !e);
    if (this.v) {
      Tt(n, this.o);
      this.v = 0;
    }
    if (e) {
      Mt(n, n.length - 8, this.c.d());
      Mt(n, n.length - 4, this.l);
    }
    this.ondata(n, e);
  };
  return t;
}();
var kt = function () {
  return function (t, e) {
    xt([ut, ht, function () {
      return [_t, Ct, zt];
    }], this, Pt.call(this, t, e), function (t) {
      var e = new zt(t.data);
      onmessage = _t(e);
    }, 8);
  };
}();
function Gt(t, e, n) {
  if (!n) {
    n = e;
    e = {};
  }
  if (typeof n != "function") {
    throw "no callback";
  }
  return vt(t, e, [ut, ht, function () {
    return [Ht];
  }], function (t) {
    return mt(Ht(t.data[0], t.data[1]));
  }, 2, n);
}
function Ht(t, e) {
  e ||= {};
  var n = nt();
  var r = t.length;
  n.p(t);
  var i = it(t, e, At(e), 8);
  var s = i.length;
  Tt(i, e);
  Mt(i, s - 8, n.d());
  Mt(i, s - 4, r);
  return i;
}
var Vt = function () {
  function t(t) {
    this.v = 1;
    Ft.call(this, t);
  }
  t.prototype.push = function (t, e) {
    Ft.prototype.e.call(this, t);
    if (this.v) {
      var n = this.p.length > 3 ? St(this.p) : 4;
      if (n >= this.p.length && !e) {
        return;
      }
      this.p = this.p.subarray(n);
      this.v = 0;
    }
    if (e) {
      if (this.p.length < 8) {
        throw "invalid gzip stream";
      }
      this.p = this.p.subarray(0, -8);
    }
    Ft.prototype.c.call(this, e);
  };
  return t;
}();
var Wt = function () {
  return function (t) {
    this.ondata = t;
    xt([ct, dt, function () {
      return [_t, Ft, Vt];
    }], this, 0, function () {
      var t = new Vt();
      onmessage = _t(t);
    }, 9);
  };
}();
function Xt(t, e, n) {
  if (!n) {
    n = e;
    e = {};
  }
  if (typeof n != "function") {
    throw "no callback";
  }
  return vt(t, e, [ct, dt, function () {
    return [jt];
  }], function (t) {
    return mt(jt(t.data[0]));
  }, 3, n);
}
function jt(t, e) {
  return V(t.subarray(St(t), -8), e || new m(Et(t)));
}
var qt = function () {
  function t(t, e) {
    this.c = rt();
    this.v = 1;
    Ct.call(this, t, e);
  }
  t.prototype.push = function (t, e) {
    Ct.prototype.push.call(this, t, e);
  };
  t.prototype.p = function (t, e) {
    this.c.p(t);
    var n = it(t, this.o, this.v && 2, e && 4, !e);
    if (this.v) {
      Rt(n, this.o);
      this.v = 0;
    }
    if (e) {
      Mt(n, n.length - 4, this.c.d());
    }
    this.ondata(n, e);
  };
  return t;
}();
var Yt = function () {
  return function (t, e) {
    xt([ut, ft, function () {
      return [_t, Ct, qt];
    }], this, Pt.call(this, t, e), function (t) {
      var e = new qt(t.data);
      onmessage = _t(e);
    }, 10);
  };
}();
function Zt(t, e, n) {
  if (!n) {
    n = e;
    e = {};
  }
  if (typeof n != "function") {
    throw "no callback";
  }
  return vt(t, e, [ut, ft, function () {
    return [Kt];
  }], function (t) {
    return mt(Kt(t.data[0], t.data[1]));
  }, 4, n);
}
function Kt(t, e) {
  e ||= {};
  var n = rt();
  n.p(t);
  var r = it(t, e, 2, 4);
  Rt(r, e);
  Mt(r, r.length - 4, n.d());
  return r;
}
var Jt = function () {
  function t(t) {
    this.v = 1;
    Ft.call(this, t);
  }
  t.prototype.push = function (t, e) {
    Ft.prototype.e.call(this, t);
    if (this.v) {
      if (this.p.length < 2 && !e) {
        return;
      }
      this.p = this.p.subarray(2);
      this.v = 0;
    }
    if (e) {
      if (this.p.length < 4) {
        throw "invalid zlib stream";
      }
      this.p = this.p.subarray(0, -4);
    }
    Ft.prototype.c.call(this, e);
  };
  return t;
}();
var Qt = function () {
  return function (t) {
    this.ondata = t;
    xt([ct, pt, function () {
      return [_t, Ft, Jt];
    }], this, 0, function () {
      var t = new Jt();
      onmessage = _t(t);
    }, 11);
  };
}();
function $t(t, e, n) {
  if (!n) {
    n = e;
    e = {};
  }
  if (typeof n != "function") {
    throw "no callback";
  }
  return vt(t, e, [ct, pt, function () {
    return [te];
  }], function (t) {
    return mt(te(t.data[0], gt(t.data[1])));
  }, 5, n);
}
function te(t, e) {
  return V((Lt(t), t.subarray(2, -4)), e);
}
var ee = function () {
  function t(t) {
    this.G = Vt;
    this.I = Ft;
    this.Z = Jt;
    this.ondata = t;
  }
  t.prototype.push = function (t, e) {
    if (!this.ondata) {
      throw "no stream handler";
    }
    if (this.s) {
      this.s.push(t, e);
    } else {
      if (this.p && this.p.length) {
        var n = new m(this.p.length + t.length);
        n.set(this.p);
        n.set(t, this.p.length);
      } else {
        this.p = t;
      }
      if (this.p.length > 2) {
        var r = this;
        function i() {
          r.ondata.apply(r, arguments);
        }
        this.s = this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8 ? new this.G(i) : (this.p[0] & 15) != 8 || this.p[0] >> 4 > 7 || (this.p[0] << 8 | this.p[1]) % 31 ? new this.I(i) : new this.Z(i);
        this.s.push(this.p, e);
        this.p = null;
      }
    }
  };
  return t;
}();
var ne = function () {
  function t(t) {
    this.G = Wt;
    this.I = Ot;
    this.Z = Qt;
    this.ondata = t;
  }
  t.prototype.push = function (t, e) {
    ee.prototype.push.call(this, t, e);
  };
  return t;
}();
function re(t, e, n) {
  if (!n) {
    n = e;
    e = {};
  }
  if (typeof n != "function") {
    throw "no callback";
  }
  if (t[0] == 31 && t[1] == 139 && t[2] == 8) {
    return Xt(t, e, n);
  } else if ((t[0] & 15) != 8 || t[0] >> 4 > 7 || (t[0] << 8 | t[1]) % 31) {
    return Ut(t, e, n);
  } else {
    return $t(t, e, n);
  }
}
function ie(t, e) {
  if (t[0] == 31 && t[1] == 139 && t[2] == 8) {
    return jt(t, e);
  } else if ((t[0] & 15) != 8 || t[0] >> 4 > 7 || (t[0] << 8 | t[1]) % 31) {
    return Bt(t, e);
  } else {
    return te(t, e);
  }
}
function se(t, e, n, r) {
  for (var i in t) {
    var s = t[i];
    var a = e + i;
    if (s instanceof m) {
      n[a] = [s, r];
    } else if (Array.isArray(s)) {
      n[a] = [s[0], st(r, s[1])];
    } else {
      se(s, a + "/", n, r);
    }
  }
}
var ae = typeof TextEncoder != "undefined" && new TextEncoder();
var oe = typeof TextDecoder != "undefined" && new TextDecoder();
var le = 0;
try {
  oe.decode($, {
    stream: true
  });
  le = 1;
} catch (t) {}
function ce(t) {
  var e = "";
  var n = 0;
  while (true) {
    var r = t[n++];
    var i = (r > 127) + (r > 223) + (r > 239);
    if (n + i > t.length) {
      return [e, H(t, n - 1)];
    }
    if (i) {
      if (i == 3) {
        r = ((r & 15) << 18 | (t[n++] & 63) << 12 | (t[n++] & 63) << 6 | t[n++] & 63) - 65536;
        e += String.fromCharCode(r >> 10 | 55296, r & 1023 | 56320);
      } else {
        e += i & 1 ? String.fromCharCode((r & 31) << 6 | t[n++] & 63) : String.fromCharCode((r & 15) << 12 | (t[n++] & 63) << 6 | t[n++] & 63);
      }
    } else {
      e += String.fromCharCode(r);
    }
  }
}
var ue = function () {
  function t(t) {
    this.ondata = t;
    if (le) {
      this.t = new TextDecoder();
    } else {
      this.p = $;
    }
  }
  t.prototype.push = function (t, e) {
    if (!this.ondata) {
      throw "no callback";
    }
    e = !!e;
    if (this.t) {
      this.ondata(this.t.decode(t, {
        stream: true
      }), e);
      if (e) {
        if (this.t.decode().length) {
          throw "invalid utf-8 data";
        }
        this.t = null;
      }
    } else {
      if (!this.p) {
        throw "stream finished";
      }
      var n = new m(this.p.length + t.length);
      n.set(this.p);
      n.set(t, this.p.length);
      var r = ce(n);
      var i = r[0];
      var s = r[1];
      if (e) {
        if (s.length) {
          throw "invalid utf-8 data";
        }
        this.p = null;
      } else {
        this.p = s;
      }
      this.ondata(i, e);
    }
  };
  return t;
}();
var he = function () {
  function t(t) {
    this.ondata = t;
  }
  t.prototype.push = function (t, e) {
    if (!this.ondata) {
      throw "no callback";
    }
    if (this.d) {
      throw "stream finished";
    }
    this.ondata(de(t), this.d = e || false);
  };
  return t;
}();
function de(t, e) {
  if (e) {
    var n = new m(t.length);
    for (var r = 0; r < t.length; ++r) {
      n[r] = t.charCodeAt(r);
    }
    return n;
  }
  if (ae) {
    return ae.encode(t);
  }
  var i = t.length;
  var s = new m(t.length + (t.length >> 1));
  var a = 0;
  function o(t) {
    s[a++] = t;
  }
  for (r = 0; r < i; ++r) {
    if (a + 5 > s.length) {
      var l = new m(a + 8 + (i - r << 1));
      l.set(s);
      s = l;
    }
    var c = t.charCodeAt(r);
    if (c < 128 || e) {
      o(c);
    } else if (c < 2048) {
      o(c >> 6 | 192);
      o(c & 63 | 128);
    } else if (c > 55295 && c < 57344) {
      o((c = 65536 + (c & 1047552) | t.charCodeAt(++r) & 1023) >> 18 | 240);
      o(c >> 12 & 63 | 128);
      o(c >> 6 & 63 | 128);
      o(c & 63 | 128);
    } else {
      o(c >> 12 | 224);
      o(c >> 6 & 63 | 128);
      o(c & 63 | 128);
    }
  }
  return H(s, 0, a);
}
function fe(t, e) {
  if (e) {
    var n = "";
    for (var r = 0; r < t.length; r += 16384) {
      n += String.fromCharCode.apply(null, t.subarray(r, r + 16384));
    }
    return n;
  }
  if (oe) {
    return oe.decode(t);
  }
  var i = ce(t);
  var s = i[0];
  if (i[1].length) {
    throw "invalid utf-8 data";
  }
  return s;
}
function pe(t) {
  if (t == 1) {
    return 3;
  } else if (t < 6) {
    return 2;
  } else if (t == 9) {
    return 1;
  } else {
    return 0;
  }
}
function me(t, e) {
  return e + 30 + yt(t, e + 26) + yt(t, e + 28);
}
function ge(t, e, n) {
  var r = yt(t, e + 28);
  var i = fe(t.subarray(e + 46, e + 46 + r), !(yt(t, e + 8) & 2048));
  var s = e + 46 + r;
  var a = bt(t, e + 20);
  var o = n && a == 4294967295 ? ve(t, s) : [a, bt(t, e + 24), bt(t, e + 42)];
  var l = o[0];
  var c = o[1];
  var u = o[2];
  return [yt(t, e + 10), l, c, i, s + yt(t, e + 30) + yt(t, e + 32), u];
}
function ve(t, e) {
  for (; yt(t, e) != 1; e += 4 + yt(t, e + 2));
  return [wt(t, e + 12), wt(t, e + 4), wt(t, e + 20)];
}
function _e(t) {
  var e = 0;
  if (t) {
    for (var n in t) {
      var r = t[n].length;
      if (r > 65535) {
        throw "extra field too long";
      }
      e += r + 4;
    }
  }
  return e;
}
function xe(t, e, n, r, i, s, a, o) {
  var l = r.length;
  var c = n.extra;
  var u = o && o.length;
  var h = _e(c);
  Mt(t, e, a != null ? 33639248 : 67324752);
  e += 4;
  if (a != null) {
    t[e++] = 20;
    t[e++] = n.os;
  }
  t[e] = 20;
  e += 2;
  t[e++] = n.flag << 1 | (s == null && 8);
  t[e++] = i && 8;
  t[e++] = n.compression & 255;
  t[e++] = n.compression >> 8;
  var d = new Date(n.mtime == null ? Date.now() : n.mtime);
  var f = d.getFullYear() - 1980;
  if (f < 0 || f > 119) {
    throw "date not in range 1980-2099";
  }
  Mt(t, e, f << 25 | d.getMonth() + 1 << 21 | d.getDate() << 16 | d.getHours() << 11 | d.getMinutes() << 5 | d.getSeconds() >>> 1);
  e += 4;
  if (s != null) {
    Mt(t, e, n.crc);
    Mt(t, e + 4, s);
    Mt(t, e + 8, n.size);
  }
  Mt(t, e + 12, l);
  Mt(t, e + 14, h);
  e += 16;
  if (a != null) {
    Mt(t, e, u);
    Mt(t, e + 6, n.attrs);
    Mt(t, e + 10, a);
    e += 14;
  }
  t.set(r, e);
  e += l;
  if (h) {
    for (var p in c) {
      var m = c[p];
      var g = m.length;
      Mt(t, e, +p);
      Mt(t, e + 2, g);
      t.set(m, e + 4);
      e += 4 + g;
    }
  }
  if (u) {
    t.set(o, e);
    e += u;
  }
  return e;
}
function ye(t, e, n, r, i) {
  Mt(t, e, 101010256);
  Mt(t, e + 8, n);
  Mt(t, e + 10, n);
  Mt(t, e + 12, r);
  Mt(t, e + 16, i);
}
var be = function () {
  function t(t) {
    this.filename = t;
    this.c = nt();
    this.size = 0;
    this.compression = 0;
  }
  t.prototype.process = function (t, e) {
    this.ondata(null, t, e);
  };
  t.prototype.push = function (t, e) {
    if (!this.ondata) {
      throw "no callback - add to ZIP archive before pushing";
    }
    this.c.p(t);
    this.size += t.length;
    if (e) {
      this.crc = this.c.d();
    }
    this.process(t, e || false);
  };
  return t;
}();
var we = function () {
  function t(t, e) {
    var n = this;
    e ||= {};
    be.call(this, t);
    this.d = new Ct(e, function (t, e) {
      n.ondata(null, t, e);
    });
    this.compression = 8;
    this.flag = pe(e.level);
  }
  t.prototype.process = function (t, e) {
    try {
      this.d.push(t, e);
    } catch (t) {
      this.ondata(t, null, e);
    }
  };
  t.prototype.push = function (t, e) {
    be.prototype.push.call(this, t, e);
  };
  return t;
}();
var Me = function () {
  function t(t, e) {
    var n = this;
    e ||= {};
    be.call(this, t);
    this.d = new Dt(e, function (t, e, r) {
      n.ondata(t, e, r);
    });
    this.compression = 8;
    this.flag = pe(e.level);
    this.terminate = this.d.terminate;
  }
  t.prototype.process = function (t, e) {
    this.d.push(t, e);
  };
  t.prototype.push = function (t, e) {
    be.prototype.push.call(this, t, e);
  };
  return t;
}();
var Te = function () {
  function t(t) {
    this.ondata = t;
    this.u = [];
    this.d = 1;
  }
  t.prototype.add = function (t) {
    var e = this;
    if (this.d & 2) {
      throw "stream finished";
    }
    var n = de(t.filename);
    var r = n.length;
    var i = t.comment;
    var s = i && de(i);
    var a = r != t.filename.length || s && i.length != s.length;
    var o = r + _e(t.extra) + 30;
    if (r > 65535) {
      throw "filename too long";
    }
    var l = new m(o);
    xe(l, 0, t, n, a);
    var c = [l];
    function u() {
      for (var t = 0, n = c; t < n.length; t++) {
        var r = n[t];
        e.ondata(null, r, false);
      }
      c = [];
    }
    var h = this.d;
    this.d = 0;
    var d = this.u.length;
    var f = st(t, {
      f: n,
      u: a,
      o: s,
      t: function () {
        if (t.terminate) {
          t.terminate();
        }
      },
      r: function () {
        u();
        if (h) {
          var t = e.u[d + 1];
          if (t) {
            t.r();
          } else {
            e.d = 1;
          }
        }
        h = 1;
      }
    });
    var p = 0;
    t.ondata = function (n, r, i) {
      if (n) {
        e.ondata(n, r, i);
        e.terminate();
      } else {
        p += r.length;
        c.push(r);
        if (i) {
          var s = new m(16);
          Mt(s, 0, 134695760);
          Mt(s, 4, t.crc);
          Mt(s, 8, p);
          Mt(s, 12, t.size);
          c.push(s);
          f.c = p;
          f.b = o + p + 16;
          f.crc = t.crc;
          f.size = t.size;
          if (h) {
            f.r();
          }
          h = 1;
        } else if (h) {
          u();
        }
      }
    };
    this.u.push(f);
  };
  t.prototype.end = function () {
    var t = this;
    if (this.d & 2) {
      if (this.d & 1) {
        throw "stream finishing";
      }
      throw "stream finished";
    }
    if (this.d) {
      this.e();
    } else {
      this.u.push({
        r: function () {
          if (t.d & 1) {
            t.u.splice(-1, 1);
            t.e();
          }
        },
        t: function () {}
      });
    }
    this.d = 3;
  };
  t.prototype.e = function () {
    var t = 0;
    var e = 0;
    var n = 0;
    for (var r = 0, i = this.u; r < i.length; r++) {
      n += 46 + (l = i[r]).f.length + _e(l.extra) + (l.o ? l.o.length : 0);
    }
    var s = new m(n + 22);
    for (var a = 0, o = this.u; a < o.length; a++) {
      var l = o[a];
      xe(s, t, l, l.f, l.u, l.c, e, l.o);
      t += 46 + l.f.length + _e(l.extra) + (l.o ? l.o.length : 0);
      e += l.b;
    }
    ye(s, t, this.u.length, n, e);
    this.ondata(null, s, true);
    this.d = 2;
  };
  t.prototype.terminate = function () {
    for (var t = 0, e = this.u; t < e.length; t++) {
      e[t].t();
    }
    this.d = 2;
  };
  return t;
}();
function Se(t, e, n) {
  if (!n) {
    n = e;
    e = {};
  }
  if (typeof n != "function") {
    throw "no callback";
  }
  var r = {};
  se(t, "", r, e);
  var i = Object.keys(r);
  var s = i.length;
  var a = 0;
  var o = 0;
  var l = s;
  var c = new Array(s);
  var u = [];
  function h() {
    for (var t = 0; t < u.length; ++t) {
      u[t]();
    }
  }
  function d() {
    var t = new m(o + 22);
    var e = a;
    var r = o - a;
    o = 0;
    for (var i = 0; i < l; ++i) {
      var s = c[i];
      try {
        var u = s.c.length;
        xe(t, o, s, s.f, s.u, u);
        var h = 30 + s.f.length + _e(s.extra);
        var d = o + h;
        t.set(s.c, d);
        xe(t, a, s, s.f, s.u, u, o, s.m);
        a += 16 + h + (s.m ? s.m.length : 0);
        o = d + u;
      } catch (t) {
        return n(t, null);
      }
    }
    ye(t, a, c.length, r, e);
    n(null, t);
  }
  if (!s) {
    d();
  }
  var f = function (t) {
    var e = i[t];
    var l = r[e];
    var f = l[0];
    var p = l[1];
    var m = nt();
    var g = f.length;
    m.p(f);
    var v = de(e);
    var _ = v.length;
    var x = p.comment;
    var y = x && de(x);
    var b = y && y.length;
    var w = _e(p.extra);
    var M = p.level == 0 ? 0 : 8;
    function T(r, i) {
      if (r) {
        h();
        n(r, null);
      } else {
        var l = i.length;
        c[t] = st(p, {
          size: g,
          crc: m.d(),
          c: i,
          f: v,
          m: y,
          u: _ != e.length || y && x.length != b,
          compression: M
        });
        a += 30 + _ + w + l;
        o += 76 + (_ + w) * 2 + (b || 0) + l;
        if (! --s) {
          d();
        }
      }
    }
    if (_ > 65535) {
      T("filename too long", null);
    }
    if (M) {
      if (g < 160000) {
        try {
          T(null, Nt(f, p));
        } catch (t) {
          T(t, null);
        }
      } else {
        u.push(It(f, p, T));
      }
    } else {
      T(null, f);
    }
  };
  for (var p = 0; p < l; ++p) {
    f(p);
  }
  return h;
}
function Ee(t, e) {
  e ||= {};
  var n = {};
  var r = [];
  se(t, "", n, e);
  var i = 0;
  var s = 0;
  for (var a in n) {
    var o = n[a];
    var l = o[0];
    var c = o[1];
    var u = c.level == 0 ? 0 : 8;
    var h = (T = de(a)).length;
    var d = c.comment;
    var f = d && de(d);
    var p = f && f.length;
    var g = _e(c.extra);
    if (h > 65535) {
      throw "filename too long";
    }
    var v = u ? Nt(l, c) : l;
    var _ = v.length;
    var x = nt();
    x.p(l);
    r.push(st(c, {
      size: l.length,
      crc: x.d(),
      c: v,
      f: T,
      m: f,
      u: h != a.length || f && d.length != p,
      o: i,
      compression: u
    }));
    i += 30 + h + g + _;
    s += 76 + (h + g) * 2 + (p || 0) + _;
  }
  var y = new m(s + 22);
  var b = i;
  var w = s - i;
  for (var M = 0; M < r.length; ++M) {
    var T = r[M];
    xe(y, T.o, T, T.f, T.u, T.c.length);
    var S = 30 + T.f.length + _e(T.extra);
    y.set(T.c, T.o + S);
    xe(y, i, T, T.f, T.u, T.c.length, T.o, T.m);
    i += 16 + S + (T.m ? T.m.length : 0);
  }
  ye(y, i, r.length, w, b);
  return y;
}
var Ae = function () {
  function t() {}
  t.prototype.push = function (t, e) {
    this.ondata(null, t, e);
  };
  t.compression = 0;
  return t;
}();
var Re = function () {
  function t() {
    var t = this;
    this.i = new Ft(function (e, n) {
      t.ondata(null, e, n);
    });
  }
  t.prototype.push = function (t, e) {
    try {
      this.i.push(t, e);
    } catch (n) {
      this.ondata(n, t, e);
    }
  };
  t.compression = 8;
  return t;
}();
var Le = function () {
  function t(t, e) {
    var n = this;
    if (e < 320000) {
      this.i = new Ft(function (t, e) {
        n.ondata(null, t, e);
      });
    } else {
      this.i = new Ot(function (t, e, r) {
        n.ondata(t, e, r);
      });
      this.terminate = this.i.terminate;
    }
  }
  t.prototype.push = function (t, e) {
    if (this.i.terminate) {
      t = H(t, 0);
    }
    this.i.push(t, e);
  };
  t.compression = 8;
  return t;
}();
var Pe = function () {
  function t(t) {
    this.onfile = t;
    this.k = [];
    this.o = {
      0: Ae
    };
    this.p = $;
  }
  t.prototype.push = function (t, e) {
    var n = this;
    if (!this.onfile) {
      throw "no callback";
    }
    if (!this.p) {
      throw "stream finished";
    }
    if (this.c > 0) {
      var r = Math.min(this.c, t.length);
      var i = t.subarray(0, r);
      this.c -= r;
      if (this.d) {
        this.d.push(i, !this.c);
      } else {
        this.k[0].push(i);
      }
      if ((t = t.subarray(r)).length) {
        return this.push(t, e);
      }
    } else {
      var s = 0;
      var a = 0;
      var o = undefined;
      var l = undefined;
      if (this.p.length) {
        if (t.length) {
          (l = new m(this.p.length + t.length)).set(this.p);
          l.set(t, this.p.length);
        } else {
          l = this.p;
        }
      } else {
        l = t;
      }
      for (var c = l.length, u = this.c, h = u && this.d, d = function () {
          var t;
          var e = bt(l, a);
          if (e == 67324752) {
            s = 1;
            o = a;
            f.d = null;
            f.c = 0;
            var r = yt(l, a + 6);
            var i = yt(l, a + 8);
            var h = r & 2048;
            var d = r & 8;
            var p = yt(l, a + 26);
            var m = yt(l, a + 28);
            if (c > a + 30 + p + m) {
              var g = [];
              f.k.unshift(g);
              s = 2;
              var v;
              var _ = bt(l, a + 18);
              var x = bt(l, a + 22);
              var y = fe(l.subarray(a + 30, a += 30 + p), !h);
              if (_ == 4294967295) {
                t = d ? [-2] : ve(l, a);
                _ = t[0];
                x = t[1];
              } else if (d) {
                _ = -1;
              }
              a += m;
              f.c = _;
              var b = {
                name: y,
                compression: i,
                start: function () {
                  if (!b.ondata) {
                    throw "no callback";
                  }
                  if (_) {
                    var t = n.o[i];
                    if (!t) {
                      throw "unknown compression type " + i;
                    }
                    (v = _ < 0 ? new t(y) : new t(y, _, x)).ondata = function (t, e, n) {
                      b.ondata(t, e, n);
                    };
                    for (var e = 0, r = g; e < r.length; e++) {
                      var s = r[e];
                      v.push(s, false);
                    }
                    if (n.k[0] == g && n.c) {
                      n.d = v;
                    } else {
                      v.push($, true);
                    }
                  } else {
                    b.ondata(null, $, true);
                  }
                },
                terminate: function () {
                  if (v && v.terminate) {
                    v.terminate();
                  }
                }
              };
              if (_ >= 0) {
                b.size = _;
                b.originalSize = x;
              }
              f.onfile(b);
            }
            return "break";
          }
          if (u) {
            if (e == 134695760) {
              o = a += 12 + (u == -2 && 8);
              s = 3;
              f.c = 0;
              return "break";
            }
            if (e == 33639248) {
              o = a -= 4;
              s = 3;
              f.c = 0;
              return "break";
            }
          }
        }, f = this; a < c - 4; ++a) {
        if (d() === "break") {
          break;
        }
      }
      this.p = $;
      if (u < 0) {
        var p = s ? l.subarray(0, o - 12 - (u == -2 && 8) - (bt(l, o - 16) == 134695760 && 4)) : l.subarray(0, a);
        if (h) {
          h.push(p, !!s);
        } else {
          this.k[+(s == 2)].push(p);
        }
      }
      if (s & 2) {
        return this.push(l.subarray(a), e);
      }
      this.p = l.subarray(a);
    }
    if (e) {
      if (this.c) {
        throw "invalid zip file";
      }
      this.p = null;
    }
  };
  t.prototype.register = function (t) {
    this.o[t.compression] = t;
  };
  return t;
}();
function Ce(t, e) {
  if (typeof e != "function") {
    throw "no callback";
  }
  var n = [];
  var r = function () {
    for (var t = 0; t < n.length; ++t) {
      n[t]();
    }
  };
  var i = {};
  for (var s = t.length - 22; bt(t, s) != 101010256; --s) {
    if (!s || t.length - s > 65558) {
      e("invalid zip file", null);
      return;
    }
  }
  var a = yt(t, s + 8);
  if (!a) {
    e(null, {});
  }
  var o = a;
  var l = bt(t, s + 16);
  var c = l == 4294967295;
  if (c) {
    s = bt(t, s - 12);
    if (bt(t, s) != 101075792) {
      e("invalid zip file", null);
      return;
    }
    o = a = bt(t, s + 32);
    l = bt(t, s + 48);
  }
  var u = function (s) {
    var o = ge(t, l, c);
    var u = o[0];
    var h = o[1];
    var d = o[2];
    var f = o[3];
    var p = o[4];
    var g = o[5];
    var v = me(t, g);
    l = p;
    function _(t, n) {
      if (t) {
        r();
        e(t, null);
      } else {
        i[f] = n;
        if (! --a) {
          e(null, i);
        }
      }
    }
    if (u) {
      if (u == 8) {
        var x = t.subarray(v, v + h);
        if (h < 320000) {
          try {
            _(null, Bt(x, new m(d)));
          } catch (t) {
            _(t, null);
          }
        } else {
          n.push(Ut(x, {
            size: d
          }, _));
        }
      } else {
        _("unknown compression type " + u, null);
      }
    } else {
      _(null, H(t, v, v + h));
    }
  };
  for (var h = 0; h < o; ++h) {
    u();
  }
  return r;
}
function De(t) {
  var e = {};
  for (var n = t.length - 22; bt(t, n) != 101010256; --n) {
    if (!n || t.length - n > 65558) {
      throw "invalid zip file";
    }
  }
  var r = yt(t, n + 8);
  if (!r) {
    return {};
  }
  var i = bt(t, n + 16);
  var s = i == 4294967295;
  if (s) {
    n = bt(t, n - 12);
    if (bt(t, n) != 101075792) {
      throw "invalid zip file";
    }
    r = bt(t, n + 32);
    i = bt(t, n + 48);
  }
  for (var a = 0; a < r; ++a) {
    var o = ge(t, i, s);
    var l = o[0];
    var c = o[1];
    var u = o[2];
    var h = o[3];
    var d = o[4];
    var f = o[5];
    var p = me(t, f);
    i = d;
    if (l) {
      if (l != 8) {
        throw "unknown compression type " + l;
      }
      e[h] = Bt(t.subarray(p, p + c), new m(u));
    } else {
      e[h] = H(t, p, p + c);
    }
  }
  return e;
}
class Ie extends l {
  constructor(t) {
    super(t);
    this.type = i.cLu;
  }
  parse(t) {
    const e = 65536;
    const n = 14;
    const s = 65537;
    const a = 16384;
    const o = Math.pow(2.7182818, 2.2);
    var l = new DataView(new ArrayBuffer(8));
    function c(t) {
      if (t === 0) {
        return [t, 0];
      }
      l.setFloat64(0, t);
      var e = l.getUint32(0) >>> 20 & 2047;
      if (e === 0) {
        l.setFloat64(0, t * Math.pow(2, 64));
        e = (l.getUint32(0) >>> 20 & 2047) - 64;
      }
      var n = e - 1022;
      return [function (t, e) {
        for (var n = Math.min(3, Math.ceil(Math.abs(e) / 1023)), r = t, i = 0; i < n; i++) {
          r *= Math.pow(2, Math.floor((e + i) / n));
        }
        return r;
      }(t, -n), n];
    }
    const u = {
      l: 0,
      c: 0,
      lc: 0
    };
    function d(t, e, n, r, i) {
      while (n < t) {
        e = e << 8 | V(r, i);
        n += 8;
      }
      n -= t;
      u.l = e >> n & (1 << t) - 1;
      u.c = e;
      u.lc = n;
    }
    const f = new Array(59);
    function p(t, e, n, r, i, a, o) {
      var l = n;
      var c = 0;
      var h = 0;
      for (; i <= a; i++) {
        if (l.value - n.value > r) {
          return false;
        }
        d(6, c, h, t, l);
        var p = u.l;
        c = u.c;
        h = u.lc;
        o[i] = p;
        if (p == 63) {
          if (l.value - n.value > r) {
            throw "Something wrong with hufUnpackEncTable";
          }
          d(8, c, h, t, l);
          var m = u.l + 6;
          c = u.c;
          h = u.lc;
          if (i + m > a + 1) {
            throw "Something wrong with hufUnpackEncTable";
          }
          while (m--) {
            o[i++] = 0;
          }
          i--;
        } else if (p >= 59) {
          if (i + (m = p - 59 + 2) > a + 1) {
            throw "Something wrong with hufUnpackEncTable";
          }
          while (m--) {
            o[i++] = 0;
          }
          i--;
        }
      }
      (function (t) {
        for (var e = 0; e <= 58; ++e) {
          f[e] = 0;
        }
        for (e = 0; e < s; ++e) {
          f[t[e]] += 1;
        }
        var n = 0;
        for (e = 58; e > 0; --e) {
          var r = n + f[e] >> 1;
          f[e] = n;
          n = r;
        }
        for (e = 0; e < s; ++e) {
          var i = t[e];
          if (i > 0) {
            t[e] = i | f[i]++ << 6;
          }
        }
      })(o);
    }
    function m(t) {
      return t & 63;
    }
    function g(t) {
      return t >> 6;
    }
    const v = {
      c: 0,
      lc: 0
    };
    function _(t, e, n, r) {
      t = t << 8 | V(n, r);
      e += 8;
      v.c = t;
      v.lc = e;
    }
    const x = {
      c: 0,
      lc: 0
    };
    function y(t, e, n, r, i, s, a, o, l, c) {
      if (t == e) {
        if (r < 8) {
          _(n, r, i, a);
          n = v.c;
          r = v.lc;
        }
        var u = n >> (r -= 8);
        u = new Uint8Array([u])[0];
        if (l.value + u > c) {
          return false;
        }
        var h = o[l.value - 1];
        for (; u-- > 0;) {
          o[l.value++] = h;
        }
      } else {
        if (!(l.value < c)) {
          return false;
        }
        o[l.value++] = t;
      }
      x.c = n;
      x.lc = r;
    }
    function b(t) {
      return t & 65535;
    }
    function w(t) {
      var e = b(t);
      if (e > 32767) {
        return e - 65536;
      } else {
        return e;
      }
    }
    const M = {
      a: 0,
      b: 0
    };
    function T(t, e) {
      var n = w(t);
      var r = w(e);
      var i = n + (r & 1) + (r >> 1);
      var s = i;
      var a = i - r;
      M.a = s;
      M.b = a;
    }
    function S(t, e) {
      var n = b(t);
      var r = b(e);
      var i = n - (r >> 1) & 65535;
      var s = r + i - 32768 & 65535;
      M.a = s;
      M.b = i;
    }
    function E(t, e, n, r, i, s, a) {
      var o;
      var l = a < 16384;
      for (var c = n > i ? i : n, u = 1; u <= c;) {
        u <<= 1;
      }
      o = u >>= 1;
      u >>= 1;
      while (u >= 1) {
        var h;
        var d;
        var f;
        var p;
        for (var m = 0, g = m + s * (i - o), v = s * u, _ = s * o, x = r * u, y = r * o; m <= g; m += _) {
          for (var b = m, w = m + r * (n - o); b <= w; b += y) {
            var E = b + x;
            var A = (R = b + v) + x;
            if (l) {
              T(t[b + e], t[R + e]);
              h = M.a;
              f = M.b;
              T(t[E + e], t[A + e]);
              d = M.a;
              p = M.b;
              T(h, d);
              t[b + e] = M.a;
              t[E + e] = M.b;
              T(f, p);
              t[R + e] = M.a;
              t[A + e] = M.b;
            } else {
              S(t[b + e], t[R + e]);
              h = M.a;
              f = M.b;
              S(t[E + e], t[A + e]);
              d = M.a;
              p = M.b;
              S(h, d);
              t[b + e] = M.a;
              t[E + e] = M.b;
              S(f, p);
              t[R + e] = M.a;
              t[A + e] = M.b;
            }
          }
          if (n & u) {
            var R = b + v;
            if (l) {
              T(t[b + e], t[R + e]);
            } else {
              S(t[b + e], t[R + e]);
            }
            h = M.a;
            t[R + e] = M.b;
            t[b + e] = h;
          }
        }
        if (i & u) {
          b = m;
          w = m + r * (n - o);
          for (; b <= w; b += y) {
            E = b + x;
            if (l) {
              T(t[b + e], t[E + e]);
            } else {
              S(t[b + e], t[E + e]);
            }
            h = M.a;
            t[E + e] = M.b;
            t[b + e] = h;
          }
        }
        o = u;
        u >>= 1;
      }
      return m;
    }
    function A(t, e, r, i, o, l) {
      var c = r.value;
      var u = H(e, r);
      var h = H(e, r);
      r.value += 4;
      var d = H(e, r);
      r.value += 4;
      if (u < 0 || u >= s || h < 0 || h >= s) {
        throw "Something wrong with HUF_ENCSIZE";
      }
      var f = new Array(s);
      var b = new Array(a);
      (function (t) {
        for (var e = 0; e < a; e++) {
          t[e] = {};
          t[e].len = 0;
          t[e].lit = 0;
          t[e].p = null;
        }
      })(b);
      p(t, 0, r, i - (r.value - c), u, h, f);
      if (d > (i - (r.value - c)) * 8) {
        throw "Something wrong with hufUncompress";
      }
      (function (t, e, r, i) {
        for (; e <= r; e++) {
          var s = g(t[e]);
          var a = m(t[e]);
          if (s >> a) {
            throw "Invalid table entry";
          }
          if (a > n) {
            if ((u = i[s >> a - n]).len) {
              throw "Invalid table entry";
            }
            u.lit++;
            if (u.p) {
              var o = u.p;
              u.p = new Array(u.lit);
              for (var l = 0; l < u.lit - 1; ++l) {
                u.p[l] = o[l];
              }
            } else {
              u.p = new Array(1);
            }
            u.p[u.lit - 1] = e;
          } else if (a) {
            var c = 0;
            for (l = 1 << n - a; l > 0; l--) {
              var u;
              if ((u = i[(s << n - a) + c]).len || u.p) {
                throw "Invalid table entry";
              }
              u.len = a;
              u.lit = e;
              c++;
            }
          }
        }
      })(f, u, h, b);
      (function (t, e, r, i, s, a, o, l, c, u) {
        var h = 0;
        var d = 0;
        var f = l;
        for (var p = Math.trunc(s.value + (a + 7) / 8); s.value < p;) {
          _(h, d, r, s);
          h = v.c;
          d = v.lc;
          while (d >= n) {
            if ((T = e[h >> d - n & 16383]).len) {
              d -= T.len;
              y(T.lit, o, h, d, r, 0, s, c, u, f);
              h = x.c;
              d = x.lc;
            } else {
              if (!T.p) {
                throw "hufDecode issues";
              }
              var b;
              for (b = 0; b < T.lit; b++) {
                for (var w = m(t[T.p[b]]); d < w && s.value < p;) {
                  _(h, d, r, s);
                  h = v.c;
                  d = v.lc;
                }
                if (d >= w && g(t[T.p[b]]) == (h >> d - w & (1 << w) - 1)) {
                  d -= w;
                  y(T.p[b], o, h, d, r, 0, s, c, u, f);
                  h = x.c;
                  d = x.lc;
                  break;
                }
              }
              if (b == T.lit) {
                throw "hufDecode issues";
              }
            }
          }
        }
        var M = 8 - a & 7;
        h >>= M;
        d -= M;
        while (d > 0) {
          var T;
          if (!(T = e[h << n - d & 16383]).len) {
            throw "hufDecode issues";
          }
          d -= T.len;
          y(T.lit, o, h, d, r, 0, s, c, u, f);
          h = x.c;
          d = x.lc;
        }
      })(f, b, t, 0, r, d, h, l, o, {
        value: 0
      });
    }
    function R(t) {
      for (var e = 1; e < t.length; e++) {
        var n = t[e - 1] + t[e] - 128;
        t[e] = n;
      }
    }
    function L(t, e) {
      for (var n = 0, r = Math.floor((t.length + 1) / 2), i = 0, s = t.length - 1; !(i > s) && !(e[i++] = t[n++], i > s);) {
        e[i++] = t[r++];
      }
    }
    function P(t) {
      for (var e = t.byteLength, n = new Array(), r = 0, i = new DataView(t); e > 0;) {
        var s = i.getInt8(r++);
        if (s < 0) {
          e -= (o = -s) + 1;
          for (var a = 0; a < o; a++) {
            n.push(i.getUint8(r++));
          }
        } else {
          var o = s;
          e -= 2;
          var l = i.getUint8(r++);
          for (a = 0; a < o + 1; a++) {
            n.push(l);
          }
        }
      }
      return n;
    }
    function C(t, e, n) {
      for (var r, i = 1; i < 64;) {
        if ((r = e[t.value]) == 65280) {
          i = 64;
        } else if (r >> 8 == 255) {
          i += r & 255;
        } else {
          n[i] = r;
          i++;
        }
        t.value++;
      }
    }
    function D(t, e) {
      e[0] = q(t[0]);
      e[1] = q(t[1]);
      e[2] = q(t[5]);
      e[3] = q(t[6]);
      e[4] = q(t[14]);
      e[5] = q(t[15]);
      e[6] = q(t[27]);
      e[7] = q(t[28]);
      e[8] = q(t[2]);
      e[9] = q(t[4]);
      e[10] = q(t[7]);
      e[11] = q(t[13]);
      e[12] = q(t[16]);
      e[13] = q(t[26]);
      e[14] = q(t[29]);
      e[15] = q(t[42]);
      e[16] = q(t[3]);
      e[17] = q(t[8]);
      e[18] = q(t[12]);
      e[19] = q(t[17]);
      e[20] = q(t[25]);
      e[21] = q(t[30]);
      e[22] = q(t[41]);
      e[23] = q(t[43]);
      e[24] = q(t[9]);
      e[25] = q(t[11]);
      e[26] = q(t[18]);
      e[27] = q(t[24]);
      e[28] = q(t[31]);
      e[29] = q(t[40]);
      e[30] = q(t[44]);
      e[31] = q(t[53]);
      e[32] = q(t[10]);
      e[33] = q(t[19]);
      e[34] = q(t[23]);
      e[35] = q(t[32]);
      e[36] = q(t[39]);
      e[37] = q(t[45]);
      e[38] = q(t[52]);
      e[39] = q(t[54]);
      e[40] = q(t[20]);
      e[41] = q(t[22]);
      e[42] = q(t[33]);
      e[43] = q(t[38]);
      e[44] = q(t[46]);
      e[45] = q(t[51]);
      e[46] = q(t[55]);
      e[47] = q(t[60]);
      e[48] = q(t[21]);
      e[49] = q(t[34]);
      e[50] = q(t[37]);
      e[51] = q(t[47]);
      e[52] = q(t[50]);
      e[53] = q(t[56]);
      e[54] = q(t[59]);
      e[55] = q(t[61]);
      e[56] = q(t[35]);
      e[57] = q(t[36]);
      e[58] = q(t[48]);
      e[59] = q(t[49]);
      e[60] = q(t[57]);
      e[61] = q(t[58]);
      e[62] = q(t[62]);
      e[63] = q(t[63]);
    }
    function I(t) {
      const e = Math.cos(0.7853975) * 0.5;
      const n = Math.cos(3.14159 / 16) * 0.5;
      const r = Math.cos(3.14159 / 8) * 0.5;
      const i = Math.cos(9.424769999999999 / 16) * 0.5;
      const s = Math.cos(0.981746875) * 0.5;
      const a = Math.cos(9.424769999999999 / 8) * 0.5;
      const o = Math.cos(1.374445625) * 0.5;
      var l = new Array(4);
      var c = new Array(4);
      var u = new Array(4);
      var h = new Array(4);
      for (var d = 0; d < 8; ++d) {
        var f = d * 8;
        l[0] = r * t[f + 2];
        l[1] = a * t[f + 2];
        l[2] = r * t[f + 6];
        l[3] = a * t[f + 6];
        c[0] = n * t[f + 1] + i * t[f + 3] + s * t[f + 5] + o * t[f + 7];
        c[1] = i * t[f + 1] - o * t[f + 3] - n * t[f + 5] - s * t[f + 7];
        c[2] = s * t[f + 1] - n * t[f + 3] + o * t[f + 5] + i * t[f + 7];
        c[3] = o * t[f + 1] - s * t[f + 3] + i * t[f + 5] - n * t[f + 7];
        u[0] = e * (t[f + 0] + t[f + 4]);
        u[3] = e * (t[f + 0] - t[f + 4]);
        u[1] = l[0] + l[3];
        u[2] = l[1] - l[2];
        h[0] = u[0] + u[1];
        h[1] = u[3] + u[2];
        h[2] = u[3] - u[2];
        h[3] = u[0] - u[1];
        t[f + 0] = h[0] + c[0];
        t[f + 1] = h[1] + c[1];
        t[f + 2] = h[2] + c[2];
        t[f + 3] = h[3] + c[3];
        t[f + 4] = h[3] - c[3];
        t[f + 5] = h[2] - c[2];
        t[f + 6] = h[1] - c[1];
        t[f + 7] = h[0] - c[0];
      }
      for (var p = 0; p < 8; ++p) {
        l[0] = r * t[16 + p];
        l[1] = a * t[16 + p];
        l[2] = r * t[48 + p];
        l[3] = a * t[48 + p];
        c[0] = n * t[8 + p] + i * t[24 + p] + s * t[40 + p] + o * t[56 + p];
        c[1] = i * t[8 + p] - o * t[24 + p] - n * t[40 + p] - s * t[56 + p];
        c[2] = s * t[8 + p] - n * t[24 + p] + o * t[40 + p] + i * t[56 + p];
        c[3] = o * t[8 + p] - s * t[24 + p] + i * t[40 + p] - n * t[56 + p];
        u[0] = e * (t[p] + t[32 + p]);
        u[3] = e * (t[p] - t[32 + p]);
        u[1] = l[0] + l[3];
        u[2] = l[1] - l[2];
        h[0] = u[0] + u[1];
        h[1] = u[3] + u[2];
        h[2] = u[3] - u[2];
        h[3] = u[0] - u[1];
        t[0 + p] = h[0] + c[0];
        t[8 + p] = h[1] + c[1];
        t[16 + p] = h[2] + c[2];
        t[24 + p] = h[3] + c[3];
        t[32 + p] = h[3] - c[3];
        t[40 + p] = h[2] - c[2];
        t[48 + p] = h[1] - c[1];
        t[56 + p] = h[0] - c[0];
      }
    }
    function N(t) {
      for (var e = 0; e < 64; ++e) {
        var n = t[0][e];
        var r = t[1][e];
        var i = t[2][e];
        t[0][e] = n + i * 1.5747;
        t[1][e] = n - r * 0.1873 - i * 0.4682;
        t[2][e] = n + r * 1.8556;
      }
    }
    function F(t, e, n) {
      for (var r = 0; r < 64; ++r) {
        e[n + r] = h.toHalfFloat(O(t[r]));
      }
    }
    function O(t) {
      if (t <= 1) {
        return Math.sign(t) * Math.pow(Math.abs(t), 2.2);
      } else {
        return Math.sign(t) * Math.pow(o, Math.abs(t) - 1);
      }
    }
    function U(t) {
      var e = t.array.slice(t.offset.value, t.offset.value + t.size);
      if (r === undefined) {
        console.error("THREE.EXRLoader: External library fflate.min.js required.");
      }
      var n = te(e);
      var i = new Uint8Array(n.length);
      R(n);
      L(n, i);
      return new DataView(i.buffer);
    }
    function B(t) {
      var e = t.viewer;
      var n = {
        value: t.offset.value
      };
      var r = new Uint8Array(t.width * t.lines * (Q.channels.length * t.type * 2));
      var i = {
        version: X(e, n),
        unknownUncompressedSize: X(e, n),
        unknownCompressedSize: X(e, n),
        acCompressedSize: X(e, n),
        dcCompressedSize: X(e, n),
        rleCompressedSize: X(e, n),
        rleUncompressedSize: X(e, n),
        rleRawSize: X(e, n),
        totalAcUncompressedCount: X(e, n),
        totalDcUncompressedCount: X(e, n),
        acCompression: X(e, n)
      };
      if (i.version < 2) {
        throw "EXRLoader.parse: " + Q.compression + " version " + i.version + " is unsupported";
      }
      var s = new Array();
      for (var a = Y(e, n) - 2; a > 0;) {
        var o = z(e.buffer, n);
        var l = W(e, n);
        var c = l >> 2 & 3;
        var u = new Int8Array([(l >> 4) - 1])[0];
        var h = W(e, n);
        s.push({
          name: o,
          index: u,
          type: h,
          compression: c
        });
        a -= o.length + 3;
      }
      var d = Q.channels;
      var f = new Array(t.channels);
      for (var p = 0; p < t.channels; ++p) {
        var m = f[p] = {};
        var g = d[p];
        m.name = g.name;
        m.compression = 0;
        m.decoded = false;
        m.type = g.pixelType;
        m.pLinear = g.pLinear;
        m.width = t.width;
        m.height = t.lines;
      }
      var v = {
        idx: new Array(3)
      };
      for (var _ = 0; _ < t.channels; ++_) {
        m = f[_];
        p = 0;
        for (; p < s.length; ++p) {
          var x = s[p];
          if (m.name == x.name) {
            m.compression = x.compression;
            if (x.index >= 0) {
              v.idx[x.index] = _;
            }
            m.offset = _;
          }
        }
      }
      if (i.acCompressedSize > 0) {
        switch (i.acCompression) {
          case 0:
            var y = new Uint16Array(i.totalAcUncompressedCount);
            A(t.array, e, n, i.acCompressedSize, y, i.totalAcUncompressedCount);
            break;
          case 1:
            var b = te(t.array.slice(n.value, n.value + i.totalAcUncompressedCount));
            y = new Uint16Array(b.buffer);
            n.value += i.totalAcUncompressedCount;
        }
      }
      if (i.dcCompressedSize > 0) {
        var w = {
          array: t.array,
          offset: n,
          size: i.dcCompressedSize
        };
        var M = new Uint16Array(U(w).buffer);
        n.value += i.dcCompressedSize;
      }
      if (i.rleRawSize > 0) {
        var T = P((b = te(t.array.slice(n.value, n.value + i.rleCompressedSize))).buffer);
        n.value += i.rleCompressedSize;
      }
      var S = 0;
      var E = new Array(f.length);
      for (p = 0; p < E.length; ++p) {
        E[p] = new Array();
      }
      for (var R = 0; R < t.lines; ++R) {
        for (var L = 0; L < f.length; ++L) {
          E[L].push(S);
          S += f[L].width * t.type * 2;
        }
      }
      (function (t, e, n, r, i, s) {
        var a = new DataView(s.buffer);
        var o = n[t.idx[0]].width;
        var l = n[t.idx[0]].height;
        var c = Math.floor(o / 8);
        var u = Math.ceil(o / 8);
        var h = Math.ceil(l / 8);
        var d = o - (u - 1) * 8;
        var f = l - (h - 1) * 8;
        var p = {
          value: 0
        };
        var m = new Array(3);
        var g = new Array(3);
        var v = new Array(3);
        var _ = new Array(3);
        var x = new Array(3);
        for (let n = 0; n < 3; ++n) {
          x[n] = e[t.idx[n]];
          m[n] = n < 1 ? 0 : m[n - 1] + u * h;
          g[n] = new Float32Array(64);
          v[n] = new Uint16Array(64);
          _[n] = new Uint16Array(u * 64);
        }
        for (let e = 0; e < h; ++e) {
          var y = 8;
          if (e == h - 1) {
            y = f;
          }
          var b = 8;
          for (let t = 0; t < u; ++t) {
            if (t == u - 1) {
              b = d;
            }
            for (let t = 0; t < 3; ++t) {
              v[t].fill(0);
              v[t][0] = i[m[t]++];
              C(p, r, v[t]);
              D(v[t], g[t]);
              I(g[t]);
            }
            N(g);
            for (let e = 0; e < 3; ++e) {
              F(g[e], _[e], t * 64);
            }
          }
          let s = 0;
          for (let r = 0; r < 3; ++r) {
            const i = n[t.idx[r]].type;
            for (let t = e * 8; t < e * 8 + y; ++t) {
              s = x[r][t];
              for (let e = 0; e < c; ++e) {
                const n = e * 64 + (t & 7) * 8;
                a.setUint16(s + i * 0, _[r][n + 0], true);
                a.setUint16(s + i * 2, _[r][n + 1], true);
                a.setUint16(s + i * 4, _[r][n + 2], true);
                a.setUint16(s + i * 6, _[r][n + 3], true);
                a.setUint16(s + i * 8, _[r][n + 4], true);
                a.setUint16(s + i * 10, _[r][n + 5], true);
                a.setUint16(s + i * 12, _[r][n + 6], true);
                a.setUint16(s + i * 14, _[r][n + 7], true);
                s += i * 16;
              }
            }
            if (c != u) {
              for (let t = e * 8; t < e * 8 + y; ++t) {
                const e = x[r][t] + c * 8 * 2 * i;
                const n = c * 64 + (t & 7) * 8;
                for (let t = 0; t < b; ++t) {
                  a.setUint16(e + t * 2 * i, _[r][n + t], true);
                }
              }
            }
          }
        }
        var w = new Uint16Array(o);
        a = new DataView(s.buffer);
        for (var M = 0; M < 3; ++M) {
          n[t.idx[M]].decoded = true;
          var T = n[t.idx[M]].type;
          if (n[M].type == 2) {
            for (var S = 0; S < l; ++S) {
              const t = x[M][S];
              for (var E = 0; E < o; ++E) {
                w[E] = a.getUint16(t + E * 2 * T, true);
              }
              for (E = 0; E < o; ++E) {
                a.setFloat32(t + E * 2 * T, q(w[E]), true);
              }
            }
          }
        }
      })(v, E, f, y, M, r);
      for (p = 0; p < f.length; ++p) {
        if (!(m = f[p]).decoded) {
          switch (m.compression) {
            case 2:
              var O = 0;
              var B = 0;
              for (R = 0; R < t.lines; ++R) {
                var k = E[p][O];
                for (var G = 0; G < m.width; ++G) {
                  for (var H = 0; H < m.type * 2; ++H) {
                    r[k++] = T[B + H * m.width * m.height];
                  }
                  B++;
                }
                O++;
              }
              break;
            case 1:
            default:
              throw "EXRLoader.parse: unsupported channel compression";
          }
        }
      }
      return new DataView(r.buffer);
    }
    function z(t, e) {
      for (var n = new Uint8Array(t), r = 0; n[e.value + r] != 0;) {
        r += 1;
      }
      var i = new TextDecoder().decode(n.slice(e.value, e.value + r));
      e.value = e.value + r + 1;
      return i;
    }
    function k(t, e) {
      var n = t.getUint32(0, true);
      e.value = e.value + 8;
      return n;
    }
    function G(t, e) {
      var n = t.getInt32(e.value, true);
      e.value = e.value + 4;
      return n;
    }
    function H(t, e) {
      var n = t.getUint32(e.value, true);
      e.value = e.value + 4;
      return n;
    }
    function V(t, e) {
      var n = t[e.value];
      e.value = e.value + 1;
      return n;
    }
    function W(t, e) {
      var n = t.getUint8(e.value);
      e.value = e.value + 1;
      return n;
    }
    function X(t, e) {
      var n = Number(t.getBigInt64(e.value, true));
      e.value += 8;
      return n;
    }
    function j(t, e) {
      var n = t.getFloat32(e.value, true);
      e.value += 4;
      return n;
    }
    function q(t) {
      var e = (t & 31744) >> 10;
      var n = t & 1023;
      return (t >> 15 ? -1 : 1) * (e ? e === 31 ? n ? NaN : Infinity : Math.pow(2, e - 15) * (1 + n / 1024) : n / 1024 * 0.00006103515625);
    }
    function Y(t, e) {
      var n = t.getUint16(e.value, true);
      e.value += 2;
      return n;
    }
    function Z(t, e, n, r, i) {
      if (r === "string" || r === "stringvector" || r === "iccProfile") {
        return function (t, e, n) {
          var r = new TextDecoder().decode(new Uint8Array(t).slice(e.value, e.value + n));
          e.value = e.value + n;
          return r;
        }(e, n, i);
      } else if (r === "chlist") {
        return function (t, e, n, r) {
          for (var i = n.value, s = []; n.value < i + r - 1;) {
            var a = z(e, n);
            var o = G(t, n);
            var l = W(t, n);
            n.value += 3;
            var c = G(t, n);
            var u = G(t, n);
            s.push({
              name: a,
              pixelType: o,
              pLinear: l,
              xSampling: c,
              ySampling: u
            });
          }
          n.value += 1;
          return s;
        }(t, e, n, i);
      } else if (r === "chromaticities") {
        return function (t, e) {
          return {
            redX: j(t, e),
            redY: j(t, e),
            greenX: j(t, e),
            greenY: j(t, e),
            blueX: j(t, e),
            blueY: j(t, e),
            whiteX: j(t, e),
            whiteY: j(t, e)
          };
        }(t, n);
      } else if (r === "compression") {
        return function (t, e) {
          return ["NO_COMPRESSION", "RLE_COMPRESSION", "ZIPS_COMPRESSION", "ZIP_COMPRESSION", "PIZ_COMPRESSION", "PXR24_COMPRESSION", "B44_COMPRESSION", "B44A_COMPRESSION", "DWAA_COMPRESSION", "DWAB_COMPRESSION"][W(t, e)];
        }(t, n);
      } else if (r === "box2i") {
        return function (t, e) {
          return {
            xMin: H(t, e),
            yMin: H(t, e),
            xMax: H(t, e),
            yMax: H(t, e)
          };
        }(t, n);
      } else if (r === "lineOrder") {
        return function (t, e) {
          return ["INCREASING_Y"][W(t, e)];
        }(t, n);
      } else if (r === "float") {
        return j(t, n);
      } else if (r === "v2f") {
        return function (t, e) {
          return [j(t, e), j(t, e)];
        }(t, n);
      } else if (r === "v3f") {
        return function (t, e) {
          return [j(t, e), j(t, e), j(t, e)];
        }(t, n);
      } else if (r === "int") {
        return G(t, n);
      } else if (r === "rational") {
        return function (t, e) {
          return [G(t, e), H(t, e)];
        }(t, n);
      } else if (r === "timecode") {
        return function (t, e) {
          return [H(t, e), H(t, e)];
        }(t, n);
      } else if (r === "preview") {
        n.value += i;
        return "skipped";
      } else {
        n.value += i;
        return;
      }
    }
    var K = new DataView(t);
    var J = new Uint8Array(t);
    var Q = {};
    K.getUint32(0, true);
    K.getUint8(4, true);
    K.getUint8(5, true);
    var $ = {
      value: 8
    };
    for (var tt = true; tt;) {
      var et = z(t, $);
      if (et == 0) {
        tt = false;
      } else {
        var nt = z(t, $);
        var rt = Z(K, t, $, nt, H(K, $));
        if (rt === undefined) {
          console.warn(`EXRLoader.parse: skipped unknown header attribute type '${nt}'.`);
        } else {
          Q[et] = rt;
        }
      }
    }
    var it;
    var st;
    var at;
    var ot;
    var lt = Q.dataWindow.yMax + 1;
    switch (Q.compression) {
      case "NO_COMPRESSION":
        st = 1;
        it = function (t) {
          return new DataView(t.array.buffer, t.offset.value, t.size);
        };
        break;
      case "RLE_COMPRESSION":
        st = 1;
        it = function (t) {
          var e = t.viewer.buffer.slice(t.offset.value, t.offset.value + t.size);
          var n = new Uint8Array(P(e));
          var r = new Uint8Array(n.length);
          R(n);
          L(n, r);
          return new DataView(r.buffer);
        };
        break;
      case "ZIPS_COMPRESSION":
        st = 1;
        it = U;
        break;
      case "ZIP_COMPRESSION":
        st = 16;
        it = U;
        break;
      case "PIZ_COMPRESSION":
        st = 32;
        it = function (t) {
          var n = t.viewer;
          var r = {
            value: t.offset.value
          };
          var i = t.width * st * (Q.channels.length * t.type);
          var s = new Uint16Array(i);
          var a = new Uint8Array(8192);
          var o = 0;
          var l = new Array(t.channels);
          for (var c = 0; c < t.channels; c++) {
            l[c] = {};
            l[c].start = o;
            l[c].end = l[c].start;
            l[c].nx = t.width;
            l[c].ny = t.lines;
            l[c].size = t.type;
            o += l[c].nx * l[c].ny * l[c].size;
          }
          var u = Y(n, r);
          var h = Y(n, r);
          if (h >= 8192) {
            throw "Something is wrong with PIZ_COMPRESSION BITMAP_SIZE";
          }
          if (u <= h) {
            for (c = 0; c < h - u + 1; c++) {
              a[c + u] = W(n, r);
            }
          }
          var d = new Uint16Array(e);
          var f = function (t, n) {
            var r = 0;
            for (var i = 0; i < e; ++i) {
              if (i == 0 || t[i >> 3] & 1 << (i & 7)) {
                n[r++] = i;
              }
            }
            var s = r - 1;
            for (; r < e;) {
              n[r++] = 0;
            }
            return s;
          }(a, d);
          var p = H(n, r);
          A(t.array, n, r, p, s, o);
          c = 0;
          for (; c < t.channels; ++c) {
            var m = l[c];
            for (var g = 0; g < l[c].size; ++g) {
              E(s, m.start + g, m.nx, m.size, m.ny, m.nx * m.size, f);
            }
          }
          (function (t, e, n) {
            for (var r = 0; r < n; ++r) {
              e[r] = t[e[r]];
            }
          })(d, s, o);
          var v = 0;
          var _ = new Uint8Array(s.buffer.byteLength);
          for (var x = 0; x < t.lines; x++) {
            for (var y = 0; y < t.channels; y++) {
              var b = (m = l[y]).nx * m.size;
              var w = new Uint8Array(s.buffer, m.end * 2, b * 2);
              _.set(w, v);
              v += b * 2;
              m.end += b;
            }
          }
          return new DataView(_.buffer);
        };
        break;
      case "PXR24_COMPRESSION":
        st = 16;
        it = function (t) {
          var e = t.array.slice(t.offset.value, t.offset.value + t.size);
          if (r === undefined) {
            console.error("THREE.EXRLoader: External library fflate.min.js required.");
          }
          var n = te(e);
          const i = t.lines * t.channels * t.width;
          const s = t.type == 1 ? new Uint16Array(i) : new Uint32Array(i);
          let a = 0;
          let o = 0;
          const l = new Array(4);
          for (let e = 0; e < t.lines; e++) {
            for (let e = 0; e < t.channels; e++) {
              let e = 0;
              switch (t.type) {
                case 1:
                  l[0] = a;
                  l[1] = l[0] + t.width;
                  a = l[1] + t.width;
                  for (let r = 0; r < t.width; ++r) {
                    e += n[l[0]++] << 8 | n[l[1]++];
                    s[o] = e;
                    o++;
                  }
                  break;
                case 2:
                  l[0] = a;
                  l[1] = l[0] + t.width;
                  l[2] = l[1] + t.width;
                  a = l[2] + t.width;
                  for (let r = 0; r < t.width; ++r) {
                    e += n[l[0]++] << 24 | n[l[1]++] << 16 | n[l[2]++] << 8;
                    s[o] = e;
                    o++;
                  }
              }
            }
          }
          return new DataView(s.buffer);
        };
        break;
      case "DWAA_COMPRESSION":
        st = 32;
        it = B;
        break;
      case "DWAB_COMPRESSION":
        st = 256;
        it = B;
        break;
      default:
        throw "EXRLoader.parse: " + Q.compression + " is unsupported";
    }
    var ct = Q.channels[0].pixelType;
    if (ct === 1) {
      switch (this.type) {
        case i.ywz:
        case i.VzW:
          ot = function (t, e) {
            return q(Y(t, e));
          };
          at = 2;
          break;
        case i.cLu:
          ot = Y;
          at = 2;
      }
    } else {
      if (ct !== 2) {
        throw "EXRLoader.parse: unsupported pixelType " + ct + " for " + Q.compression + ".";
      }
      switch (this.type) {
        case i.ywz:
        case i.VzW:
          ot = j;
          at = 4;
          break;
        case i.cLu:
          ot = function (t, e) {
            return h.toHalfFloat(j(t, e));
          };
          at = 4;
      }
    }
    for (var ut = lt / st, ht = 0; ht < ut; ht++) {
      k(K, $);
    }
    var dt = Q.dataWindow.xMax - Q.dataWindow.xMin + 1;
    var ft = Q.dataWindow.yMax - Q.dataWindow.yMin + 1;
    var pt = dt * ft * 4;
    switch (this.type) {
      case i.ywz:
      case i.VzW:
        var mt = new Float32Array(pt);
        if (Q.channels.length < 4) {
          mt.fill(1, 0, pt);
        }
        break;
      case i.cLu:
        mt = new Uint16Array(pt);
        if (Q.channels.length < 4) {
          mt.fill(15360, 0, pt);
        }
        break;
      default:
        console.error("THREE.EXRLoader: unsupported type: ", this.type);
    }
    var gt;
    var vt;
    var _t = {
      R: 0,
      G: 1,
      B: 2,
      A: 3
    };
    var xt = {
      size: 0,
      width: dt,
      lines: st,
      offset: $,
      array: J,
      viewer: K,
      type: ct,
      channels: Q.channels.length
    };
    var yt = {
      value: 0
    };
    for (var bt = 0; bt < ft / st; bt++) {
      gt = H(K, $);
      pt = H(K, $);
      xt.lines = gt + st > ft ? ft - gt : st;
      xt.offset = $;
      xt.size = pt;
      vt = it(xt);
      $.value += pt;
      for (var wt = 0; wt < st; wt++) {
        var Mt = wt + bt * st;
        if (Mt >= ft) {
          break;
        }
        for (var Tt = 0; Tt < Q.channels.length; Tt++) {
          var St = _t[Q.channels[Tt].name];
          for (var Et = 0; Et < dt; Et++) {
            var At = wt * (Q.channels.length * dt) + Tt * dt + Et;
            yt.value = At * at;
            var Rt = ot(vt, yt);
            mt[dt * 4 * (ft - 1 - Mt) + Et * 4 + St] = Rt;
          }
        }
      }
    }
    if (this.type === i.ywz) {
      let t;
      let e;
      const n = mt.length;
      const r = new Uint8Array(n);
      for (let n = 0; n < ft; ++n) {
        for (let i = 0; i < dt; ++i) {
          e = n * dt * 4 + i * 4;
          const s = mt[e];
          const a = mt[e + 1];
          const o = mt[e + 2];
          t = s > a ? s : a;
          t = o > t ? o : t;
          if (t < 1e-32) {
            r[e] = r[e + 1] = r[e + 2] = r[e + 3] = 0;
          } else {
            const n = c(t);
            t = n[0] * 256 / t;
            r[e] = s * t;
            r[e + 1] = a * t;
            r[e + 2] = o * t;
            r[e + 3] = n[1] + 128;
          }
        }
      }
      mt = r;
    }
    const Lt = this.type === i.ywz ? i.aoB : i.wk1;
    return {
      header: Q,
      width: dt,
      height: ft,
      data: mt,
      format: Lt,
      type: this.type
    };
  }
  setDataType(t) {
    this.type = t;
    return this;
  }
  load(t, e, n, r) {
    return super.load(t, function (t, n) {
      switch (t.type) {
        case i.ywz:
          t.encoding = i.KC9;
          t.minFilter = i.TyD;
          t.magFilter = i.TyD;
          t.generateMipmaps = false;
          t.flipY = false;
          break;
        case i.VzW:
        case i.cLu:
          t.encoding = i.rnI;
          t.minFilter = i.wem;
          t.magFilter = i.wem;
          t.generateMipmaps = false;
          t.flipY = false;
      }
      if (e) {
        e(t, n);
      }
    }, n, r);
  }
}