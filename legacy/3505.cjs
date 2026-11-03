var i = require("./7854.cjs");
module.exports = function (e, t) {
  try {
    Object.defineProperty(i, e, {
      value: t,
      configurable: true,
      writable: true
    });
  } catch (n) {
    i[e] = t;
  }
  return t;
};