var i = require("./7908.cjs");
var r = require("./1400.cjs");
var o = require("./7466.cjs");
module.exports = function (e) {
  var t = i(this);
  var n = o(t.length);
  var s = arguments.length;
  for (var a = r(s > 1 ? arguments[1] : undefined, n), l = s > 2 ? arguments[2] : undefined, u = l === undefined ? n : r(l, n); u > a;) {
    t[a++] = e;
  }
  return t;
};