var i = require("./1320.cjs");
module.exports = function (e, t, n) {
  for (var r in t) {
    i(e, r, t[r], n);
  }
  return e;
};