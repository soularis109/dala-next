var i = require("./9781.cjs");
var r = require("./4664.cjs");
var o = require("./9670.cjs");
var s = require("./4948.cjs");
var a = Object.defineProperty;
exports.f = i ? a : function (e, t, n) {
  o(e);
  t = s(t);
  o(n);
  if (r) {
    try {
      return a(e, t, n);
    } catch (e) {}
  }
  if ("get" in n || "set" in n) {
    throw TypeError("Accessors not supported");
  }
  if ("value" in n) {
    e[t] = n.value;
  }
  return e;
};