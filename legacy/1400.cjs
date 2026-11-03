var i = require("./9958.cjs");
var r = Math.max;
var o = Math.min;
module.exports = function (e, t) {
  var n = i(e);
  if (n < 0) {
    return r(n + t, 0);
  } else {
    return o(n, t);
  }
};