var i = require("./7908.cjs");
var r = Math.floor;
var o = "".replace;
var s = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var a = /\$([$&'`]|\d{1,2})/g;
module.exports = function (e, t, n, l, u, c) {
  var h = n + e.length;
  var d = l.length;
  var f = a;
  if (u !== undefined) {
    u = i(u);
    f = s;
  }
  return o.call(c, f, function (i, o) {
    var s;
    switch (o.charAt(0)) {
      case "$":
        return "$";
      case "&":
        return e;
      case "`":
        return t.slice(0, n);
      case "'":
        return t.slice(h);
      case "<":
        s = u[o.slice(1, -1)];
        break;
      default:
        var a = +o;
        if (a === 0) {
          return i;
        }
        if (a > d) {
          var c = r(a / 10);
          if (c === 0) {
            return i;
          } else if (c <= d) {
            if (l[c - 1] === undefined) {
              return o.charAt(1);
            } else {
              return l[c - 1] + o.charAt(1);
            }
          } else {
            return i;
          }
        }
        s = l[a - 1];
    }
    if (s === undefined) {
      return "";
    } else {
      return s;
    }
  });
};