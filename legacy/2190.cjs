var i = require("./5005.cjs");
var r = require("./3307.cjs");
module.exports = r ? function (e) {
  return typeof e == "symbol";
} : function (e) {
  var t = i("Symbol");
  return typeof t == "function" && Object(e) instanceof t;
};