var i = require("./9670.cjs");
var r = require("./3099.cjs");
var o = require("./5112.cjs")("species");
module.exports = function (e, t) {
  var n;
  var s = i(e).constructor;
  if (s === undefined || (n = i(s)[o]) == null) {
    return t;
  } else {
    return r(n);
  }
};