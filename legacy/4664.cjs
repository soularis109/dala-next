var i = require("./9781.cjs");
var r = require("./7293.cjs");
var o = require("./317.cjs");
module.exports = !i && !r(function () {
  return Object.defineProperty(o("div"), "a", {
    get: function () {
      return 7;
    }
  }).a != 7;
});