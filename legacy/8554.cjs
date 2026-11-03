var i = require("./9670.cjs");
var r = require("./1246.cjs");
module.exports = function (e, t) {
  var n = arguments.length < 2 ? r(e) : t;
  if (typeof n != "function") {
    throw TypeError(String(e) + " is not iterable");
  }
  return i(n.call(e));
};