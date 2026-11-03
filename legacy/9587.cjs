var i = require("./111.cjs");
var r = require("./7674.cjs");
module.exports = function (e, t, n) {
  var o;
  var s;
  if (r && typeof (o = t.constructor) == "function" && o !== n && i(s = o.prototype) && s !== n.prototype) {
    r(e, s);
  }
  return e;
};