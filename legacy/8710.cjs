var i = require("./9958.cjs");
var r = require("./1340.cjs");
var o = require("./4488.cjs");
function s(e) {
  return function (t, n) {
    var s;
    var a;
    var l = r(o(t));
    var u = i(n);
    var c = l.length;
    if (u < 0 || u >= c) {
      if (e) {
        return "";
      } else {
        return undefined;
      }
    } else if ((s = l.charCodeAt(u)) < 55296 || s > 56319 || u + 1 === c || (a = l.charCodeAt(u + 1)) < 56320 || a > 57343) {
      if (e) {
        return l.charAt(u);
      } else {
        return s;
      }
    } else if (e) {
      return l.slice(u, u + 2);
    } else {
      return a - 56320 + (s - 55296 << 10) + 65536;
    }
  };
}
module.exports = {
  codeAt: s(false),
  charAt: s(true)
};