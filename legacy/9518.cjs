var i = require("./6656.cjs");
var r = require("./7908.cjs");
var o = require("./6200.cjs");
var s = require("./8544.cjs");
var a = o("IE_PROTO");
var l = Object.prototype;
module.exports = s ? Object.getPrototypeOf : function (e) {
  e = r(e);
  if (i(e, a)) {
    return e[a];
  } else if (typeof e.constructor == "function" && e instanceof e.constructor) {
    return e.constructor.prototype;
  } else if (e instanceof Object) {
    return l;
  } else {
    return null;
  }
};