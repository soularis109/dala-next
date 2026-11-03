var i = require("./7854.cjs");
var r = require("./9781.cjs");
var o = require("./4019.cjs");
var s = require("./8880.cjs");
var a = require("./2248.cjs");
var l = require("./7293.cjs");
var u = require("./5787.cjs");
var c = require("./9958.cjs");
var h = require("./7466.cjs");
var d = require("./7067.cjs");
var f = require("./1179.cjs");
var m = require("./9518.cjs");
var p = require("./7674.cjs");
var v = require("./8006.cjs").f;
var g = require("./3070.cjs").f;
var x = require("./1285.cjs");
var y = require("./8003.cjs");
var D = require("./9909.cjs");
var b = D.get;
var _ = D.set;
var w = "ArrayBuffer";
var S = "DataView";
var E = "Wrong index";
var P = i.ArrayBuffer;
var C = P;
var T = i.DataView;
var F = T && T.prototype;
var A = Object.prototype;
var M = i.RangeError;
var O = f.pack;
var L = f.unpack;
function I(e) {
  return [e & 255];
}
function R(e) {
  return [e & 255, e >> 8 & 255];
}
function k(e) {
  return [e & 255, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255];
}
function z(e) {
  return e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0];
}
function U(e) {
  return O(e, 23, 4);
}
function j(e) {
  return O(e, 52, 8);
}
function B(e, t) {
  g(e.prototype, t, {
    get: function () {
      return b(this)[t];
    }
  });
}
function N(e, t, n, i) {
  var r = d(n);
  var o = b(e);
  if (r + t > o.byteLength) {
    throw M(E);
  }
  var s = b(o.buffer).bytes;
  var a = r + o.byteOffset;
  var l = s.slice(a, a + t);
  if (i) {
    return l;
  } else {
    return l.reverse();
  }
}
function V(e, t, n, i, r, o) {
  var s = d(n);
  var a = b(e);
  if (s + t > a.byteLength) {
    throw M(E);
  }
  var l = b(a.buffer).bytes;
  var u = s + a.byteOffset;
  var c = i(+r);
  for (var h = 0; h < t; h++) {
    l[u + h] = c[o ? h : t - h - 1];
  }
}
if (o) {
  if (!l(function () {
    P(1);
  }) || !l(function () {
    new P(-1);
  }) || l(function () {
    new P();
    new P(1.5);
    new P(NaN);
    return P.name != w;
  })) {
    var G;
    var W = (C = function (e) {
      u(this, C);
      return new P(d(e));
    }).prototype = P.prototype;
    for (var H = v(P), q = 0; H.length > q;) {
      if (!((G = H[q++]) in C)) {
        s(C, G, P[G]);
      }
    }
    W.constructor = C;
  }
  if (p && m(F) !== A) {
    p(F, A);
  }
  var Y = new T(new C(2));
  var Z = F.setInt8;
  Y.setInt8(0, 2147483648);
  Y.setInt8(1, 2147483649);
  if (!!Y.getInt8(0) || !Y.getInt8(1)) {
    a(F, {
      setInt8: function (e, t) {
        Z.call(this, e, t << 24 >> 24);
      },
      setUint8: function (e, t) {
        Z.call(this, e, t << 24 >> 24);
      }
    }, {
      unsafe: true
    });
  }
} else {
  C = function (e) {
    u(this, C, w);
    var t = d(e);
    _(this, {
      bytes: x.call(new Array(t), 0),
      byteLength: t
    });
    if (!r) {
      this.byteLength = t;
    }
  };
  T = function (e, t, n) {
    u(this, T, S);
    u(e, C, S);
    var i = b(e).byteLength;
    var o = c(t);
    if (o < 0 || o > i) {
      throw M("Wrong offset");
    }
    if (o + (n = n === undefined ? i - o : h(n)) > i) {
      throw M("Wrong length");
    }
    _(this, {
      buffer: e,
      byteLength: n,
      byteOffset: o
    });
    if (!r) {
      this.buffer = e;
      this.byteLength = n;
      this.byteOffset = o;
    }
  };
  if (r) {
    B(C, "byteLength");
    B(T, "buffer");
    B(T, "byteLength");
    B(T, "byteOffset");
  }
  a(T.prototype, {
    getInt8: function (e) {
      return N(this, 1, e)[0] << 24 >> 24;
    },
    getUint8: function (e) {
      return N(this, 1, e)[0];
    },
    getInt16: function (e) {
      var t = N(this, 2, e, arguments.length > 1 ? arguments[1] : undefined);
      return (t[1] << 8 | t[0]) << 16 >> 16;
    },
    getUint16: function (e) {
      var t = N(this, 2, e, arguments.length > 1 ? arguments[1] : undefined);
      return t[1] << 8 | t[0];
    },
    getInt32: function (e) {
      return z(N(this, 4, e, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function (e) {
      return z(N(this, 4, e, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function (e) {
      return L(N(this, 4, e, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function (e) {
      return L(N(this, 8, e, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function (e, t) {
      V(this, 1, e, I, t);
    },
    setUint8: function (e, t) {
      V(this, 1, e, I, t);
    },
    setInt16: function (e, t) {
      V(this, 2, e, R, t, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function (e, t) {
      V(this, 2, e, R, t, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function (e, t) {
      V(this, 4, e, k, t, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function (e, t) {
      V(this, 4, e, k, t, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function (e, t) {
      V(this, 4, e, U, t, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function (e, t) {
      V(this, 8, e, j, t, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
}
y(C, w);
y(T, S);
module.exports = {
  ArrayBuffer: C,
  DataView: T
};