var i = require("./3099.cjs");
module.exports = function (e, t, n) {
  i(e);
  if (t === undefined) {
    return e;
  }
  switch (n) {
    case 0:
      return function () {
        return e.call(t);
      };
    case 1:
      return function (n) {
        return e.call(t, n);
      };
    case 2:
      return function (n, i) {
        return e.call(t, n, i);
      };
    case 3:
      return function (n, i, r) {
        return e.call(t, n, i, r);
      };
  }
  return function () {
    return e.apply(t, arguments);
  };
};