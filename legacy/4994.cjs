var i = require("./3383.cjs").IteratorPrototype;
var r = require("./30.cjs");
var o = require("./9114.cjs");
var s = require("./8003.cjs");
var a = require("./7497.cjs");
function l() {
  return this;
}
module.exports = function (e, t, n) {
  var u = t + " Iterator";
  e.prototype = r(i, {
    next: o(1, n)
  });
  s(e, u, false, true);
  a[u] = l;
  return e;
};