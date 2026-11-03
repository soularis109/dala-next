var i = require("./6656.cjs");
var r = require("./5656.cjs");
var o = require("./1318.cjs").indexOf;
var s = require("./3501.cjs");
module.exports = function (e, t) {
  var n;
  var a = r(e);
  var l = 0;
  var u = [];
  for (n in a) {
    if (!i(s, n) && i(a, n)) {
      u.push(n);
    }
  }
  while (t.length > l) {
    if (i(a, n = t[l++])) {
      if (!~o(u, n)) {
        u.push(n);
      }
    }
  }
  return u;
};