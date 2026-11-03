var i = require("./2109.cjs");
var r = require("./4994.cjs");
var o = require("./9518.cjs");
var s = require("./7674.cjs");
var a = require("./8003.cjs");
var l = require("./8880.cjs");
var u = require("./1320.cjs");
var c = require("./5112.cjs");
var h = require("./1913.cjs");
var d = require("./7497.cjs");
var f = require("./3383.cjs");
var m = f.IteratorPrototype;
var p = f.BUGGY_SAFARI_ITERATORS;
var v = c("iterator");
var g = "keys";
var x = "values";
var y = "entries";
function D() {
  return this;
}
module.exports = function (e, t, n, c, f, b, _) {
  r(n, t, c);
  var w;
  var S;
  var E;
  function P(e) {
    if (e === f && M) {
      return M;
    }
    if (!p && e in F) {
      return F[e];
    }
    switch (e) {
      case g:
      case x:
      case y:
        return function () {
          return new n(this, e);
        };
    }
    return function () {
      return new n(this);
    };
  }
  var C = t + " Iterator";
  var T = false;
  var F = e.prototype;
  var A = F[v] || F["@@iterator"] || f && F[f];
  var M = !p && A || P(f);
  var O = t == "Array" && F.entries || A;
  if (O) {
    w = o(O.call(new e()));
    if (m !== Object.prototype && w.next) {
      if (!h && o(w) !== m) {
        if (s) {
          s(w, m);
        } else if (typeof w[v] != "function") {
          l(w, v, D);
        }
      }
      a(w, C, true, true);
      if (h) {
        d[C] = D;
      }
    }
  }
  if (f == x && A && A.name !== x) {
    T = true;
    M = function () {
      return A.call(this);
    };
  }
  if ((!h || !!_) && F[v] !== M) {
    l(F, v, M);
  }
  d[t] = M;
  if (f) {
    S = {
      values: P(x),
      keys: b ? M : P(g),
      entries: P(y)
    };
    if (_) {
      for (E in S) {
        if (p || T || !(E in F)) {
          u(F, E, S[E]);
        }
      }
    } else {
      i({
        target: t,
        proto: true,
        forced: p || T
      }, S);
    }
  }
  return S;
};