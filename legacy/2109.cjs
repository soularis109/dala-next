var i = require("./7854.cjs");
var r = require("./1236.cjs").f;
var o = require("./8880.cjs");
var s = require("./1320.cjs");
var a = require("./3505.cjs");
var l = require("./9920.cjs");
var u = require("./4705.cjs");
module.exports = function (e, t) {
  var n;
  var c;
  var h;
  var d;
  var f;
  var m = e.target;
  var p = e.global;
  var v = e.stat;
  if (n = p ? i : v ? i[m] || a(m, {}) : (i[m] || {}).prototype) {
    for (c in t) {
      d = t[c];
      h = e.noTargetGet ? (f = r(n, c)) && f.value : n[c];
      if (!u(p ? c : m + (v ? "." : "#") + c, e.forced) && h !== undefined) {
        if (typeof d == typeof h) {
          continue;
        }
        l(d, h);
      }
      if (e.sham || h && h.sham) {
        o(d, "sham", true);
      }
      s(n, c, d, e);
    }
  }
};