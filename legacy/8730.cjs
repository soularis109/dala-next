var i = require("./111.cjs");
var r = Math.floor;
module.exports = function (e) {
  return !i(e) && isFinite(e) && r(e) === e;
};