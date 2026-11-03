var i;
var r;
var o;
var s = require("./4019.cjs");
var a = require("./9781.cjs");
var l = require("./7854.cjs");
var u = require("./111.cjs");
var c = require("./6656.cjs");
var h = require("./648.cjs");
var d = require("./8880.cjs");
var f = require("./1320.cjs");
var m = require("./3070.cjs").f;
var p = require("./9518.cjs");
var v = require("./7674.cjs");
var g = require("./5112.cjs");
var x = require("./9711.cjs");
var y = l.Int8Array;
var D = y && y.prototype;
var b = l.Uint8ClampedArray;
var _ = b && b.prototype;
var w = y && p(y);
var S = D && p(D);
var E = Object.prototype;
var P = E.isPrototypeOf;
var C = g("toStringTag");
var T = x("TYPED_ARRAY_TAG");
var F = x("TYPED_ARRAY_CONSTRUCTOR");
var A = s && !!v && h(l.opera) !== "Opera";
var M = false;
var O = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};
var L = {
  BigInt64Array: 8,
  BigUint64Array: 8
};
function I(e) {
  if (!u(e)) {
    return false;
  }
  var t = h(e);
  return c(O, t) || c(L, t);
}
for (i in O) {
  if (o = (r = l[i]) && r.prototype) {
    d(o, F, r);
  } else {
    A = false;
  }
}
for (i in L) {
  if (o = (r = l[i]) && r.prototype) {
    d(o, F, r);
  }
}
if ((!A || typeof w != "function" || w === Function.prototype) && (w = function () {
  throw TypeError("Incorrect invocation");
}, A)) {
  for (i in O) {
    if (l[i]) {
      v(l[i], w);
    }
  }
}
if ((!A || !S || S === E) && (S = w.prototype, A)) {
  for (i in O) {
    if (l[i]) {
      v(l[i].prototype, S);
    }
  }
}
if (A && p(_) !== S) {
  v(_, S);
}
if (a && !c(S, C)) {
  M = true;
  m(S, C, {
    get: function () {
      if (u(this)) {
        return this[T];
      } else {
        return undefined;
      }
    }
  });
  for (i in O) {
    if (l[i]) {
      d(l[i], T, i);
    }
  }
}
module.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: A,
  TYPED_ARRAY_CONSTRUCTOR: F,
  TYPED_ARRAY_TAG: M && T,
  aTypedArray: function (e) {
    if (I(e)) {
      return e;
    }
    throw TypeError("Target is not a typed array");
  },
  aTypedArrayConstructor: function (e) {
    if (v && !P.call(w, e)) {
      throw TypeError("Target is not a typed array constructor");
    }
    return e;
  },
  exportTypedArrayMethod: function (e, t, n) {
    if (a) {
      if (n) {
        for (var i in O) {
          var r = l[i];
          if (r && c(r.prototype, e)) {
            try {
              delete r.prototype[e];
            } catch (e) {}
          }
        }
      }
      if (!S[e] || !!n) {
        f(S, e, n ? t : A && D[e] || t);
      }
    }
  },
  exportTypedArrayStaticMethod: function (e, t, n) {
    var i;
    var r;
    if (a) {
      if (v) {
        if (n) {
          for (i in O) {
            if ((r = l[i]) && c(r, e)) {
              try {
                delete r[e];
              } catch (e) {}
            }
          }
        }
        if (w[e] && !n) {
          return;
        }
        try {
          return f(w, e, n ? t : A && w[e] || t);
        } catch (e) {}
      }
      for (i in O) {
        if (!!(r = l[i]) && (!r[e] || !!n)) {
          f(r, e, t);
        }
      }
    }
  },
  isView: function (e) {
    if (!u(e)) {
      return false;
    }
    var t = h(e);
    return t === "DataView" || c(O, t) || c(L, t);
  },
  isTypedArray: I,
  TypedArray: w,
  TypedArrayPrototype: S
};