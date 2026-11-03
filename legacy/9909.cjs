var i;
var r;
var o;
var s = require("./8536.cjs");
var a = require("./7854.cjs");
var l = require("./111.cjs");
var u = require("./8880.cjs");
var c = require("./6656.cjs");
var h = require("./5465.cjs");
var d = require("./6200.cjs");
var f = require("./3501.cjs");
var m = "Object already initialized";
var p = a.WeakMap;
if (s || h.state) {
  var v = h.state ||= new p();
  var g = v.get;
  var x = v.has;
  var y = v.set;
  i = function (e, t) {
    if (x.call(v, e)) {
      throw new TypeError(m);
    }
    t.facade = e;
    y.call(v, e, t);
    return t;
  };
  r = function (e) {
    return g.call(v, e) || {};
  };
  o = function (e) {
    return x.call(v, e);
  };
} else {
  var D = d("state");
  f[D] = true;
  i = function (e, t) {
    if (c(e, D)) {
      throw new TypeError(m);
    }
    t.facade = e;
    u(e, D, t);
    return t;
  };
  r = function (e) {
    if (c(e, D)) {
      return e[D];
    } else {
      return {};
    }
  };
  o = function (e) {
    return c(e, D);
  };
}
module.exports = {
  set: i,
  get: r,
  has: o,
  enforce: function (e) {
    if (o(e)) {
      return r(e);
    } else {
      return i(e, {});
    }
  },
  getterFor: function (e) {
    return function (t) {
      var n;
      if (!l(t) || (n = r(t)).type !== e) {
        throw TypeError("Incompatible receiver, " + e + " required");
      }
      return n;
    };
  }
};