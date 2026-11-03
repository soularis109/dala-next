var i = require("./9781.cjs");
var r = require("./3070.cjs");
var o = require("./9114.cjs");
module.exports = i ? function (e, t, n) {
  return r.f(e, t, o(1, n));
} : function (e, t, n) {
  e[t] = n;
  return e;
};