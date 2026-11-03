var i = require("./2109.cjs");
var r = require("./9781.cjs");
var o = require("./7854.cjs");
var s = require("./6656.cjs");
var a = require("./111.cjs");
var l = require("./3070.cjs").f;
var u = require("./9920.cjs");
var c = o.Symbol;
if (r && typeof c == "function" && (!("description" in c.prototype) || c().description !== undefined)) {
  var h = {};
  function d() {
    var e = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var t = this instanceof d ? new c(e) : e === undefined ? c() : c(e);
    if (e === "") {
      h[t] = true;
    }
    return t;
  }
  u(d, c);
  var f = d.prototype = c.prototype;
  f.constructor = d;
  var m = f.toString;
  var p = String(c("test")) == "Symbol(test)";
  var v = /^Symbol\((.*)\)[^)]+$/;
  l(f, "description", {
    configurable: true,
    get: function () {
      var e = a(this) ? this.valueOf() : this;
      var t = m.call(e);
      if (s(h, e)) {
        return "";
      }
      var n = p ? t.slice(7, -1) : t.replace(v, "$1");
      if (n === "") {
        return undefined;
      } else {
        return n;
      }
    }
  });
  i({
    global: true,
    forced: true
  }, {
    Symbol: d
  });
}