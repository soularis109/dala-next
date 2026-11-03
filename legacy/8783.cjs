var i = require("./8710.cjs").charAt;
var r = require("./1340.cjs");
var o = require("./9909.cjs");
var s = require("./654.cjs");
var a = "String Iterator";
var l = o.set;
var u = o.getterFor(a);
s(String, "String", function (e) {
  l(this, {
    type: a,
    string: r(e),
    index: 0
  });
}, function () {
  var e;
  var t = u(this);
  var n = t.string;
  var r = t.index;
  if (r >= n.length) {
    return {
      value: undefined,
      done: true
    };
  } else {
    e = i(n, r);
    t.index += e.length;
    return {
      value: e,
      done: false
    };
  }
});