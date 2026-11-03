var i = require("./5656.cjs");
var r = require("./1223.cjs");
var o = require("./7497.cjs");
var s = require("./9909.cjs");
var a = require("./654.cjs");
var l = "Array Iterator";
var u = s.set;
var c = s.getterFor(l);
module.exports = a(Array, "Array", function (e, t) {
  u(this, {
    type: l,
    target: i(e),
    index: 0,
    kind: t
  });
}, function () {
  var e = c(this);
  var t = e.target;
  var n = e.kind;
  var i = e.index++;
  if (!t || i >= t.length) {
    e.target = undefined;
    return {
      value: undefined,
      done: true
    };
  } else if (n == "keys") {
    return {
      value: i,
      done: false
    };
  } else if (n == "values") {
    return {
      value: t[i],
      done: false
    };
  } else {
    return {
      value: [i, t[i]],
      done: false
    };
  }
}, "values");
o.Arguments = o.Array;
r("keys");
r("values");
r("entries");