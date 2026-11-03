var i = require("./6656.cjs");
var r = require("./3887.cjs");
var o = require("./1236.cjs");
var s = require("./3070.cjs");
module.exports = function (e, t) {
  for (var n = r(t), a = s.f, l = o.f, u = 0; u < n.length; u++) {
    var c = n[u];
    if (!i(e, c)) {
      a(e, c, l(t, c));
    }
  }
};