var i = require("./9958.cjs");
var r = Math.min;
module.exports = function (e) {
  if (e > 0) {
    return r(i(e), 9007199254740991);
  } else {
    return 0;
  }
};