var i = require("./7293.cjs");
module.exports = !i(function () {
  return Object.defineProperty({}, 1, {
    get: function () {
      return 7;
    }
  })[1] != 7;
});