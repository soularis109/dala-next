var i = require("./5005.cjs");
var r = require("./8006.cjs");
var o = require("./5181.cjs");
var s = require("./9670.cjs");
module.exports = i("Reflect", "ownKeys") || function (e) {
  var t = r.f(s(e));
  var n = o.f;
  if (n) {
    return t.concat(n(e));
  } else {
    return t;
  }
};