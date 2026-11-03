var i = require("./7392.cjs");
var r = require("./7293.cjs");
module.exports = !!Object.getOwnPropertySymbols && !r(function () {
  var e = Symbol();
  return !String(e) || !(Object(e) instanceof Symbol) || !Symbol.sham && i && i < 41;
});