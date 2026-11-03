var i = require("./7593.cjs");
var r = require("./2190.cjs");
module.exports = function (e) {
  var t = i(e, "string");
  if (r(t)) {
    return t;
  } else {
    return String(t);
  }
};