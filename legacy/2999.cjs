var i = require("./7293.cjs");
var r = require("./7854.cjs").RegExp;
exports.UNSUPPORTED_Y = i(function () {
  var e = r("a", "y");
  e.lastIndex = 2;
  return e.exec("abcd") != null;
});
exports.BROKEN_CARET = i(function () {
  var e = r("^r", "gy");
  e.lastIndex = 2;
  return e.exec("str") != null;
});