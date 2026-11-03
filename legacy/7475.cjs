var i = require("./111.cjs");
var r = require("./3157.cjs");
var o = require("./5112.cjs")("species");
module.exports = function (e) {
  var t;
  if (r(e)) {
    if (typeof (t = e.constructor) != "function" || t !== Array && !r(t.prototype)) {
      if (i(t) && (t = t[o]) === null) {
        t = undefined;
      }
    } else {
      t = undefined;
    }
  }
  if (t === undefined) {
    return Array;
  } else {
    return t;
  }
};