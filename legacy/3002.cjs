var i = require("./9958.cjs");
module.exports = function (e) {
  var t = i(e);
  if (t < 0) {
    throw RangeError("The argument can't be less than 0");
  }
  return t;
};