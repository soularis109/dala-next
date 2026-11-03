var i = require("./111.cjs");
var r = require("./2190.cjs");
var o = require("./2140.cjs");
var s = require("./5112.cjs")("toPrimitive");
module.exports = function (e, t) {
  if (!i(e) || r(e)) {
    return e;
  }
  var n;
  var a = e[s];
  if (a !== undefined) {
    if (t === undefined) {
      t = "default";
    }
    n = a.call(e, t);
    if (!i(n) || r(n)) {
      return n;
    }
    throw TypeError("Can't convert object to primitive value");
  }
  if (t === undefined) {
    t = "number";
  }
  return o(e, t);
};