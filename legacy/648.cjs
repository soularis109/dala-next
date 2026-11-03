var i = require("./1694.cjs");
var r = require("./4326.cjs");
var o = require("./5112.cjs")("toStringTag");
var s = r(function () {
  return arguments;
}()) == "Arguments";
module.exports = i ? r : function (e) {
  var t;
  var n;
  var i;
  if (e === undefined) {
    return "Undefined";
  } else if (e === null) {
    return "Null";
  } else if (typeof (n = function (e, t) {
    try {
      return e[t];
    } catch (e) {}
  }(t = Object(e), o)) == "string") {
    return n;
  } else if (s) {
    return r(t);
  } else if ((i = r(t)) == "Object" && typeof t.callee == "function") {
    return "Arguments";
  } else {
    return i;
  }
};