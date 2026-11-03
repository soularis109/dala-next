var i = require("./9974.cjs");
var r = require("./7908.cjs");
var o = require("./3411.cjs");
var s = require("./7659.cjs");
var a = require("./7466.cjs");
var l = require("./6135.cjs");
var u = require("./8554.cjs");
var c = require("./1246.cjs");
module.exports = function (e) {
  var t;
  var n;
  var h;
  var d;
  var f;
  var m;
  var p = r(e);
  var v = typeof this == "function" ? this : Array;
  var g = arguments.length;
  var x = g > 1 ? arguments[1] : undefined;
  var y = x !== undefined;
  var D = c(p);
  var b = 0;
  if (y) {
    x = i(x, g > 2 ? arguments[2] : undefined, 2);
  }
  if (D == null || v == Array && s(D)) {
    for (n = new v(t = a(p.length)); t > b; b++) {
      m = y ? x(p[b], b) : p[b];
      l(n, b, m);
    }
  } else {
    f = (d = u(p, D)).next;
    n = new v();
    for (; !(h = f.call(d)).done; b++) {
      m = y ? o(d, x, [h.value, b], true) : h.value;
      l(n, b, m);
    }
  }
  n.length = b;
  return n;
};