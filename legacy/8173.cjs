var i = require("./7293.cjs");
var r = require("./7854.cjs").RegExp;
module.exports = i(function () {
  var e = r("(?<a>b)", "g");
  return e.exec("b").groups.a !== "b" || "b".replace(e, "$<a>c") !== "bc";
});