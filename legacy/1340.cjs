var i = require("./2190.cjs");
module.exports = function (e) {
  if (i(e)) {
    throw TypeError("Cannot convert a Symbol value to a string");
  }
  return String(e);
};