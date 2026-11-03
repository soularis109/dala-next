var i = require("./9781.cjs");
var r = require("./7293.cjs");
var o = require("./1956.cjs");
var s = require("./5181.cjs");
var a = require("./5296.cjs");
var l = require("./7908.cjs");
var u = require("./8361.cjs");
var c = Object.assign;
var h = Object.defineProperty;
module.exports = !c || r(function () {
  if (i && c({
    b: 1
  }, c(h({}, "a", {
    enumerable: true,
    get: function () {
      h(this, "b", {
        value: 3,
        enumerable: false
      });
    }
  }), {
    b: 2
  })).b !== 1) {
    return true;
  }
  var e = {};
  var t = {};
  var n = Symbol();
  var r = "abcdefghijklmnopqrst";
  e[n] = 7;
  r.split("").forEach(function (e) {
    t[e] = e;
  });
  return c({}, e)[n] != 7 || o(c({}, t)).join("") != r;
}) ? function (e, t) {
  var n = l(e);
  for (var r = arguments.length, c = 1, h = s.f, d = a.f; r > c;) {
    var f;
    var m = u(arguments[c++]);
    var p = h ? o(m).concat(h(m)) : o(m);
    for (var v = p.length, g = 0; v > g;) {
      f = p[g++];
      if (!i || !!d.call(m, f)) {
        n[f] = m[f];
      }
    }
  }
  return n;
} : c;