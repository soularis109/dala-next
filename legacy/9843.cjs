var i = require("./2109.cjs");
var r = require("./7854.cjs");
var o = require("./9781.cjs");
var s = require("./3832.cjs");
var a = require("./260.cjs");
var l = require("./3331.cjs");
var u = require("./5787.cjs");
var c = require("./9114.cjs");
var h = require("./8880.cjs");
var d = require("./8730.cjs");
var f = require("./7466.cjs");
var m = require("./7067.cjs");
var p = require("./4590.cjs");
var v = require("./4948.cjs");
var g = require("./6656.cjs");
var x = require("./648.cjs");
var y = require("./111.cjs");
var D = require("./2190.cjs");
var b = require("./30.cjs");
var _ = require("./7674.cjs");
var w = require("./8006.cjs").f;
var S = require("./7321.cjs");
var E = require("./2092.cjs").forEach;
var P = require("./6340.cjs");
var C = require("./3070.cjs");
var T = require("./1236.cjs");
var F = require("./9909.cjs");
var A = require("./9587.cjs");
var M = F.get;
var O = F.set;
var L = C.f;
var I = T.f;
var R = Math.round;
var k = r.RangeError;
var z = l.ArrayBuffer;
var U = l.DataView;
var j = a.NATIVE_ARRAY_BUFFER_VIEWS;
var B = a.TYPED_ARRAY_CONSTRUCTOR;
var N = a.TYPED_ARRAY_TAG;
var V = a.TypedArray;
var G = a.TypedArrayPrototype;
var W = a.aTypedArrayConstructor;
var H = a.isTypedArray;
var q = "BYTES_PER_ELEMENT";
var Y = "Wrong length";
function Z(e, t) {
  for (var n = 0, i = t.length, r = new (W(e))(i); i > n;) {
    r[n] = t[n++];
  }
  return r;
}
function $(e, t) {
  L(e, t, {
    get: function () {
      return M(this)[t];
    }
  });
}
function X(e) {
  var t;
  return e instanceof z || (t = x(e)) == "ArrayBuffer" || t == "SharedArrayBuffer";
}
function K(e, t) {
  return H(e) && !D(t) && t in e && d(+t) && t >= 0;
}
function Q(e, t) {
  t = v(t);
  if (K(e, t)) {
    return c(2, e[t]);
  } else {
    return I(e, t);
  }
}
function J(e, t, n) {
  t = v(t);
  if (!K(e, t) || !y(n) || !g(n, "value") || g(n, "get") || g(n, "set") || n.configurable || g(n, "writable") && !n.writable || g(n, "enumerable") && !n.enumerable) {
    return L(e, t, n);
  } else {
    e[t] = n.value;
    return e;
  }
}
if (o) {
  if (!j) {
    T.f = Q;
    C.f = J;
    $(G, "buffer");
    $(G, "byteOffset");
    $(G, "byteLength");
    $(G, "length");
  }
  i({
    target: "Object",
    stat: true,
    forced: !j
  }, {
    getOwnPropertyDescriptor: Q,
    defineProperty: J
  });
  module.exports = function (e, t, n) {
    var o = e.match(/\d+$/)[0] / 8;
    var a = e + (n ? "Clamped" : "") + "Array";
    var l = "get" + e;
    var c = "set" + e;
    var d = r[a];
    var v = d;
    var g = v && v.prototype;
    var x = {};
    function D(e, t) {
      L(e, t, {
        get: function () {
          return function (e, t) {
            var n = M(e);
            return n.view[l](t * o + n.byteOffset, true);
          }(this, t);
        },
        set: function (e) {
          return function (e, t, i) {
            var r = M(e);
            if (n) {
              i = (i = R(i)) < 0 ? 0 : i > 255 ? 255 : i & 255;
            }
            r.view[c](t * o + r.byteOffset, i, true);
          }(this, t, e);
        },
        enumerable: true
      });
    }
    if (j) {
      if (s) {
        v = t(function (e, t, n, i) {
          u(e, v, a);
          return A(y(t) ? X(t) ? i !== undefined ? new d(t, p(n, o), i) : n !== undefined ? new d(t, p(n, o)) : new d(t) : H(t) ? Z(v, t) : S.call(v, t) : new d(m(t)), e, v);
        });
        if (_) {
          _(v, V);
        }
        E(w(d), function (e) {
          if (!(e in v)) {
            h(v, e, d[e]);
          }
        });
        v.prototype = g;
      }
    } else {
      v = t(function (e, t, n, i) {
        u(e, v, a);
        var r;
        var s;
        var l;
        var c = 0;
        var h = 0;
        if (y(t)) {
          if (!X(t)) {
            if (H(t)) {
              return Z(v, t);
            } else {
              return S.call(v, t);
            }
          }
          r = t;
          h = p(n, o);
          var d = t.byteLength;
          if (i === undefined) {
            if (d % o) {
              throw k(Y);
            }
            if ((s = d - h) < 0) {
              throw k(Y);
            }
          } else if ((s = f(i) * o) + h > d) {
            throw k(Y);
          }
          l = s / o;
        } else {
          l = m(t);
          r = new z(s = l * o);
        }
        for (O(e, {
          buffer: r,
          byteOffset: h,
          byteLength: s,
          length: l,
          view: new U(r)
        }); c < l;) {
          D(e, c++);
        }
      });
      if (_) {
        _(v, V);
      }
      g = v.prototype = b(G);
    }
    if (g.constructor !== v) {
      h(g, "constructor", v);
    }
    h(g, B, v);
    if (N) {
      h(g, N, a);
    }
    x[a] = v;
    i({
      global: true,
      forced: v != d,
      sham: !j
    }, x);
    if (!(q in v)) {
      h(v, q, o);
    }
    if (!(q in g)) {
      h(g, q, o);
    }
    P(a);
  };
} else {
  module.exports = function () {};
}