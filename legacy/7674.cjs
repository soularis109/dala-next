var i = require("./9670.cjs");
var r = require("./6077.cjs");
module.exports = Object.setPrototypeOf || ("__proto__" in {} ? function () {
  var e;
  var t = false;
  var n = {};
  try {
    (e = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(n, []);
    t = n instanceof Array;
  } catch (e) {}
  return function (n, o) {
    i(n);
    r(o);
    if (t) {
      e.call(n, o);
    } else {
      n.__proto__ = o;
    }
    return n;
  };
}() : undefined);