var i = require("./9958.cjs");
var r = require("./7466.cjs");
module.exports = function (e) {
  if (e === undefined) {
    return 0;
  }
  var t = i(e);
  var n = r(t);
  if (t !== n) {
    throw RangeError("Wrong length or index");
  }
  return n;
};