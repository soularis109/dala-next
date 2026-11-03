var i = require("./5112.cjs");
var r = require("./30.cjs");
var o = require("./3070.cjs");
var s = i("unscopables");
var a = Array.prototype;
if (a[s] == null) {
  o.f(a, s, {
    configurable: true,
    value: r(null)
  });
}
module.exports = function (e) {
  a[s][e] = true;
};