var i = require("./260.cjs");
var r = require("./7854.cjs");
var o = require("./7293.cjs");
var s = require("./3099.cjs");
var a = require("./7466.cjs");
var l = require("./4362.cjs");
var u = require("./8886.cjs");
var c = require("./256.cjs");
var h = require("./7392.cjs");
var d = require("./8008.cjs");
var f = i.aTypedArray;
var m = i.exportTypedArrayMethod;
var p = r.Uint16Array;
var v = p && p.prototype.sort;
var g = !!v && !o(function () {
  var e = new p(2);
  e.sort(null);
  e.sort({});
});
var x = !!v && !o(function () {
  if (h) {
    return h < 74;
  }
  if (u) {
    return u < 67;
  }
  if (c) {
    return true;
  }
  if (d) {
    return d < 602;
  }
  var e;
  var t;
  var n = new p(516);
  var i = Array(516);
  for (e = 0; e < 516; e++) {
    t = e % 4;
    n[e] = 515 - e;
    i[e] = e - t * 2 + 3;
  }
  n.sort(function (e, t) {
    return (e / 4 | 0) - (t / 4 | 0);
  });
  e = 0;
  for (; e < 516; e++) {
    if (n[e] !== i[e]) {
      return true;
    }
  }
});
m("sort", function (e) {
  var t = this;
  if (e !== undefined) {
    s(e);
  }
  if (x) {
    return v.call(t, e);
  }
  f(t);
  var n;
  var i = a(t.length);
  var r = Array(i);
  for (n = 0; n < i; n++) {
    r[n] = t[n];
  }
  r = l(t, function (e) {
    return function (t, n) {
      if (e !== undefined) {
        return +e(t, n) || 0;
      } else if (n != n) {
        return -1;
      } else if (t != t) {
        return 1;
      } else if (t === 0 && n === 0) {
        if (1 / t > 0 && 1 / n < 0) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return t > n;
      }
    };
  }(e));
  n = 0;
  for (; n < i; n++) {
    t[n] = r[n];
  }
  return t;
}, !x || g);