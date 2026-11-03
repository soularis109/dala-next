var i = require("./7007.cjs");
var r = require("./7293.cjs");
var o = require("./9670.cjs");
var s = require("./9958.cjs");
var a = require("./7466.cjs");
var l = require("./1340.cjs");
var u = require("./4488.cjs");
var c = require("./1530.cjs");
var h = require("./647.cjs");
var d = require("./7651.cjs");
var f = require("./5112.cjs")("replace");
var m = Math.max;
var p = Math.min;
var v = "a".replace(/./, "$0") === "$0";
var g = !!/./[f] && /./[f]("a", "$0") === "";
i("replace", function (e, t, n) {
  var i = g ? "$" : "$0";
  return [function (e, n) {
    var i = u(this);
    var r = e == null ? undefined : e[f];
    if (r !== undefined) {
      return r.call(e, i, n);
    } else {
      return t.call(l(i), e, n);
    }
  }, function (e, r) {
    var u = o(this);
    var f = l(e);
    if (typeof r == "string" && r.indexOf(i) === -1 && r.indexOf("$<") === -1) {
      var v = n(t, u, f, r);
      if (v.done) {
        return v.value;
      }
    }
    var g = typeof r == "function";
    if (!g) {
      r = l(r);
    }
    var x = u.global;
    if (x) {
      var y = u.unicode;
      u.lastIndex = 0;
    }
    var D = [];
    for (;;) {
      var b = d(u, f);
      if (b === null) {
        break;
      }
      D.push(b);
      if (!x) {
        break;
      }
      if (l(b[0]) === "") {
        u.lastIndex = c(f, a(u.lastIndex), y);
      }
    }
    var _;
    var w = "";
    var S = 0;
    for (var E = 0; E < D.length; E++) {
      b = D[E];
      var P = l(b[0]);
      var C = m(p(s(b.index), f.length), 0);
      var T = [];
      for (var F = 1; F < b.length; F++) {
        T.push((_ = b[F]) === undefined ? _ : String(_));
      }
      var A = b.groups;
      if (g) {
        var M = [P].concat(T, C, f);
        if (A !== undefined) {
          M.push(A);
        }
        var O = l(r.apply(undefined, M));
      } else {
        O = h(P, f, C, T, A, r);
      }
      if (C >= S) {
        w += f.slice(S, C) + O;
        S = C + P.length;
      }
    }
    return w + f.slice(S);
  }];
}, !!r(function () {
  var e = /./;
  e.exec = function () {
    var e = [];
    e.groups = {
      a: "7"
    };
    return e;
  };
  return "".replace(e, "$<a>") !== "7";
}) || !v || g);