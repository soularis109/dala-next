var i = require("./7854.cjs");
var r = require("./7293.cjs");
var o = require("./7072.cjs");
var s = require("./260.cjs").NATIVE_ARRAY_BUFFER_VIEWS;
var a = i.ArrayBuffer;
var l = i.Int8Array;
module.exports = !s || !r(function () {
  l(1);
}) || !r(function () {
  new l(-1);
}) || !o(function (e) {
  new l();
  new l(null);
  new l(1.5);
  new l(e);
}, true) || r(function () {
  return new l(new a(2), 1, undefined).length !== 1;
});