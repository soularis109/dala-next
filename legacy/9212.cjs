var i = require("./9670.cjs");
module.exports = function (e, t, n) {
  var r;
  var o;
  i(e);
  try {
    if ((r = e.return) === undefined) {
      if (t === "throw") {
        throw n;
      }
      return n;
    }
    r = r.call(e);
  } catch (e) {
    o = true;
    r = e;
  }
  if (t === "throw") {
    throw n;
  }
  if (o) {
    throw r;
  }
  i(r);
  return n;
};