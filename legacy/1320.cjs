var i = require("./7854.cjs");
var r = require("./8880.cjs");
var o = require("./6656.cjs");
var s = require("./3505.cjs");
var a = require("./2788.cjs");
var l = require("./9909.cjs");
var u = l.get;
var c = l.enforce;
var h = String(String).split("String");
(module.exports = function (e, t, n, a) {
  var u = !!a && !!a.unsafe;
  var d = !!a && !!a.enumerable;
  var f = !!a && !!a.noTargetGet;
  if (typeof n == "function") {
    if (typeof t == "string" && !o(n, "name")) {
      r(n, "name", t);
    }
    c(n).source ||= h.join(typeof t == "string" ? t : "");
  }
  if (e !== i) {
    if (u) {
      if (!f && e[t]) {
        d = true;
      }
    } else {
      delete e[t];
    }
    if (d) {
      e[t] = n;
    } else {
      r(e, t, n);
    }
  } else if (d) {
    e[t] = n;
  } else {
    s(t, n);
  }
})(Function.prototype, "toString", function () {
  return typeof this == "function" && u(this).source || a(this);
});