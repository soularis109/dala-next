var i = require("./111.cjs");
module.exports = function (e) {
  if (!i(e) && e !== null) {
    throw TypeError("Can't set " + String(e) + " as a prototype");
  }
  return e;
};