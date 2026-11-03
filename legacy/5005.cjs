var i = require("./7854.cjs");
function r(e) {
  if (typeof e == "function") {
    return e;
  } else {
    return undefined;
  }
}
module.exports = function (e, t) {
  if (arguments.length < 2) {
    return r(i[e]);
  } else {
    return i[e] && i[e][t];
  }
};