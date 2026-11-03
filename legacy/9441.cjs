var i = require("./7293.cjs");
var r = require("./7854.cjs").RegExp;
module.exports = i(function () {
  var e = r(".", "s");
  return !e.dotAll || !e.exec("\n") || e.flags !== "s";
});