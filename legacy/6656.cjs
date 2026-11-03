var i = require("./7908.cjs");
var r = {}.hasOwnProperty;
module.exports = Object.hasOwn || function (e, t) {
  return r.call(i(e), t);
};