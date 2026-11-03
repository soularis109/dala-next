var i;
var r;
var o = require("./1340.cjs");
var s = require("./7066.cjs");
var a = require("./2999.cjs");
var l = require("./2309.cjs");
var u = require("./30.cjs");
var c = require("./9909.cjs").get;
var h = require("./9441.cjs");
var d = require("./8173.cjs");
var f = RegExp.prototype.exec;
var m = l("native-string-replace", String.prototype.replace);
var p = f;
i = /a/;
r = /b*/g;
f.call(i, "a");
f.call(r, "a");
var v = i.lastIndex !== 0 || r.lastIndex !== 0;
var g = a.UNSUPPORTED_Y || a.BROKEN_CARET;
var x = /()??/.exec("")[1] !== undefined;
if (v || x || g || h || d) {
  p = function (e) {
    var t;
    var n;
    var i;
    var r;
    var a;
    var l;
    var h;
    var d = this;
    var y = c(d);
    var D = o(e);
    var b = y.raw;
    if (b) {
      b.lastIndex = d.lastIndex;
      t = p.call(b, D);
      d.lastIndex = b.lastIndex;
      return t;
    }
    var _ = y.groups;
    var w = g && d.sticky;
    var S = s.call(d);
    var E = d.source;
    var P = 0;
    var C = D;
    if (w) {
      if ((S = S.replace("y", "")).indexOf("g") === -1) {
        S += "g";
      }
      C = D.slice(d.lastIndex);
      if (d.lastIndex > 0 && (!d.multiline || d.multiline && D.charAt(d.lastIndex - 1) !== "\n")) {
        E = "(?: " + E + ")";
        C = " " + C;
        P++;
      }
      n = new RegExp("^(?:" + E + ")", S);
    }
    if (x) {
      n = new RegExp("^" + E + "$(?!\\s)", S);
    }
    if (v) {
      i = d.lastIndex;
    }
    r = f.call(w ? n : d, C);
    if (w) {
      if (r) {
        r.input = r.input.slice(P);
        r[0] = r[0].slice(P);
        r.index = d.lastIndex;
        d.lastIndex += r[0].length;
      } else {
        d.lastIndex = 0;
      }
    } else if (v && r) {
      d.lastIndex = d.global ? r.index + r[0].length : i;
    }
    if (x && r && r.length > 1) {
      m.call(r[0], n, function () {
        for (a = 1; a < arguments.length - 2; a++) {
          if (arguments[a] === undefined) {
            r[a] = undefined;
          }
        }
      });
    }
    if (r && _) {
      r.groups = l = u(null);
      a = 0;
      for (; a < _.length; a++) {
        l[(h = _[a])[0]] = r[h[1]];
      }
    }
    return r;
  };
}
module.exports = p;