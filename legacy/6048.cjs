var i = require("./9781.cjs");
var r = require("./3070.cjs");
var o = require("./9670.cjs");
var s = require("./1956.cjs");
module.exports = i ? Object.defineProperties : function (e, t) {
  o(e);
  var n;
  var i = s(t);
  for (var a = i.length, l = 0; a > l;) {
    r.f(e, n = i[l++], t[n]);
  }
  return e;
};