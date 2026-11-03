var i = require("./111.cjs");
module.exports = function (e, t) {
  var n;
  var r;
  if (t === "string" && typeof (n = e.toString) == "function" && !i(r = n.call(e))) {
    return r;
  }
  if (typeof (n = e.valueOf) == "function" && !i(r = n.call(e))) {
    return r;
  }
  if (t !== "string" && typeof (n = e.toString) == "function" && !i(r = n.call(e))) {
    return r;
  }
  throw TypeError("Can't convert object to primitive value");
};