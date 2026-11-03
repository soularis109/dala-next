var i = require("./5656.cjs");
var r = require("./7466.cjs");
var o = require("./1400.cjs");
function s(e) {
  return function (t, n, s) {
    var a;
    var l = i(t);
    var u = r(l.length);
    var c = o(s, u);
    if (e && n != n) {
      while (u > c) {
        if ((a = l[c++]) != a) {
          return true;
        }
      }
    } else {
      for (; u > c; c++) {
        if ((e || c in l) && l[c] === n) {
          return e || c || 0;
        }
      }
    }
    return !e && -1;
  };
}
module.exports = {
  includes: s(true),
  indexOf: s(false)
};