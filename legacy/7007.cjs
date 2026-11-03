require("./4916.cjs");
var i = require("./1320.cjs");
var r = require("./2261.cjs");
var o = require("./7293.cjs");
var s = require("./5112.cjs");
var a = require("./8880.cjs");
var l = s("species");
var u = RegExp.prototype;
module.exports = function (e, t, n, c) {
  var h = s(e);
  var d = !o(function () {
    var t = {
      [h]: function () {
        return 7;
      }
    };
    return ""[e](t) != 7;
  });
  var f = d && !o(function () {
    var t = false;
    var n = /a/;
    if (e === "split") {
      (n = {}).constructor = {};
      n.constructor[l] = function () {
        return n;
      };
      n.flags = "";
      n[h] = /./[h];
    }
    n.exec = function () {
      t = true;
      return null;
    };
    n[h]("");
    return !t;
  });
  if (!d || !f || n) {
    var m = /./[h];
    var p = t(h, ""[e], function (e, t, n, i, o) {
      var s = t.exec;
      if (s === r || s === u.exec) {
        if (d && !o) {
          return {
            done: true,
            value: m.call(t, n, i)
          };
        } else {
          return {
            done: true,
            value: e.call(n, t, i)
          };
        }
      } else {
        return {
          done: false
        };
      }
    });
    i(String.prototype, e, p[0]);
    i(u, h, p[1]);
  }
  if (c) {
    a(u[h], "sham", true);
  }
};