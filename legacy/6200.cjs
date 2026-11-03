var i = require("./2309.cjs");
var r = require("./9711.cjs");
var o = i("keys");
module.exports = function (e) {
  return o[e] ||= r(e);
};