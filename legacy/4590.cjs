var i = require("./3002.cjs");
module.exports = function (e, t) {
  var n = i(e);
  if (n % t) {
    throw RangeError("Wrong offset");
  }
  return n;
};