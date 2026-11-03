var i = require("./7854.cjs");
var r = require("./111.cjs");
var o = i.document;
var s = r(o) && r(o.createElement);
module.exports = function (e) {
  if (s) {
    return o.createElement(e);
  } else {
    return {};
  }
};