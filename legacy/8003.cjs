var i = require("./3070.cjs").f;
var r = require("./6656.cjs");
var o = require("./5112.cjs")("toStringTag");
module.exports = function (e, t, n) {
  if (e && !r(e = n ? e : e.prototype, o)) {
    i(e, o, {
      configurable: true,
      value: t
    });
  }
};