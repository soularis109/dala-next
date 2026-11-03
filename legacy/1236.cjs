var i = require("./9781.cjs");
var r = require("./5296.cjs");
var o = require("./9114.cjs");
var s = require("./5656.cjs");
var a = require("./4948.cjs");
var l = require("./6656.cjs");
var u = require("./4664.cjs");
var c = Object.getOwnPropertyDescriptor;
exports.f = i ? c : function (e, t) {
  e = s(e);
  t = a(t);
  if (u) {
    try {
      return c(e, t);
    } catch (e) {}
  }
  if (l(e, t)) {
    return o(!r.f.call(e, t), e[t]);
  }
};