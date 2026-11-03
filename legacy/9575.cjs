var i = require("./2109.cjs");
var r = require("./7293.cjs");
var o = require("./3331.cjs");
var s = require("./9670.cjs");
var a = require("./1400.cjs");
var l = require("./7466.cjs");
var u = require("./6707.cjs");
var c = o.ArrayBuffer;
var h = o.DataView;
var d = c.prototype.slice;
i({
  target: "ArrayBuffer",
  proto: true,
  unsafe: true,
  forced: r(function () {
    return !new c(2).slice(1, undefined).byteLength;
  })
}, {
  slice: function (e, t) {
    if (d !== undefined && t === undefined) {
      return d.call(s(this), e);
    }
    var n = s(this).byteLength;
    for (var i = a(e, n), r = a(t === undefined ? n : t, n), o = new (u(this, c))(l(r - i)), f = new h(this), m = new h(o), p = 0; i < r;) {
      m.setUint8(p++, f.getUint8(i++));
    }
    return o;
  }
});