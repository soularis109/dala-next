var i = require("./7293.cjs");
var r = /#|\.prototype\./;
function o(e, t) {
  var n = a[s(e)];
  return n == u || n != l && (typeof t == "function" ? i(t) : !!t);
}
var s = o.normalize = function (e) {
  return String(e).replace(r, ".").toLowerCase();
};
var a = o.data = {};
var l = o.NATIVE = "N";
var u = o.POLYFILL = "P";
module.exports = o;