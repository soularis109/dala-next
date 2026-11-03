var i = require("./7908.cjs");
var r = require("./7466.cjs");
var o = require("./8554.cjs");
var s = require("./1246.cjs");
var a = require("./7659.cjs");
var l = require("./9974.cjs");
var u = require("./260.cjs").aTypedArrayConstructor;
module.exports = function (e) {
  var t;
  var n;
  var c;
  var h;
  var d;
  var f;
  var m = i(e);
  var p = arguments.length;
  var v = p > 1 ? arguments[1] : undefined;
  var g = v !== undefined;
  var x = s(m);
  if (x != null && !a(x)) {
    f = (d = o(m, x)).next;
    m = [];
    while (!(h = f.call(d)).done) {
      m.push(h.value);
    }
  }
  if (g && p > 2) {
    v = l(v, arguments[2], 2);
  }
  n = r(m.length);
  c = new (u(this))(n);
  t = 0;
  for (; n > t; t++) {
    c[t] = g ? v(m[t], t) : m[t];
  }
  return c;
};