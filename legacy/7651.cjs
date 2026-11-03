var i = require("./4326.cjs");
var r = require("./2261.cjs");
module.exports = function (e, t) {
  var n = e.exec;
  if (typeof n == "function") {
    var o = n.call(e, t);
    if (typeof o != "object") {
      throw TypeError("RegExp exec method returned something other than an Object or null");
    }
    return o;
  }
  if (i(e) !== "RegExp") {
    throw TypeError("RegExp#exec called on incompatible receiver");
  }
  return r.call(e, t);
};