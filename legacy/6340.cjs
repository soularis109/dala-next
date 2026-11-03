var i = require("./5005.cjs");
var r = require("./3070.cjs");
var o = require("./5112.cjs");
var s = require("./9781.cjs");
var a = o("species");
module.exports = function (e) {
  var t = i(e);
  var n = r.f;
  if (s && t && !t[a]) {
    n(t, a, {
      configurable: true,
      get: function () {
        return this;
      }
    });
  }
};