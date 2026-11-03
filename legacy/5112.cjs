var i = require("./7854.cjs");
var r = require("./2309.cjs");
var o = require("./6656.cjs");
var s = require("./9711.cjs");
var a = require("./133.cjs");
var l = require("./3307.cjs");
var u = r("wks");
var c = i.Symbol;
var h = l ? c : c && c.withoutSetter || s;
module.exports = function (e) {
  if (!o(u, e) || !a && typeof u[e] != "string") {
    if (a && o(c, e)) {
      u[e] = c[e];
    } else {
      u[e] = h("Symbol." + e);
    }
  }
  return u[e];
};