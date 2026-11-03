var i = require("./4326.cjs");
module.exports = Array.isArray || function (e) {
  return i(e) == "Array";
};