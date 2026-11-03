var i = require("./111.cjs");
module.exports = function (e) {
  if (!i(e)) {
    throw TypeError(String(e) + " is not an object");
  }
  return e;
};