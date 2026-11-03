var i;
var r;
var o;
var s = require("./7293.cjs");
var a = require("./9518.cjs");
var l = require("./8880.cjs");
var u = require("./6656.cjs");
var c = require("./5112.cjs");
var h = require("./1913.cjs");
var d = c("iterator");
var f = false;
if ([].keys) {
  if ("next" in (o = [].keys())) {
    if ((r = a(a(o))) !== Object.prototype) {
      i = r;
    }
  } else {
    f = true;
  }
}
var m = i == null || s(function () {
  var e = {};
  return i[d].call(e) !== e;
});
if (m) {
  i = {};
}
if ((!h || !!m) && !u(i, d)) {
  l(i, d, function () {
    return this;
  });
}
module.exports = {
  IteratorPrototype: i,
  BUGGY_SAFARI_ITERATORS: f
};