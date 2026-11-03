var i = require("./4948.cjs");
var r = require("./3070.cjs");
var o = require("./9114.cjs");
module.exports = function (e, t, n) {
  var s = i(t);
  if (s in e) {
    r.f(e, s, o(0, n));
  } else {
    e[s] = n;
  }
};