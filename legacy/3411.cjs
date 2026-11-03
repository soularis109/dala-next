var i = require("./9670.cjs");
var r = require("./9212.cjs");
module.exports = function (e, t, n, o) {
  try {
    if (o) {
      return t(i(n)[0], n[1]);
    } else {
      return t(n);
    }
  } catch (t) {
    r(e, "throw", t);
  }
};