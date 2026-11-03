var i = require("./7293.cjs");
var r = require("./4326.cjs");
var o = "".split;
module.exports = i(function () {
  return !Object("z").propertyIsEnumerable(0);
}) ? function (e) {
  if (r(e) == "String") {
    return o.call(e, "");
  } else {
    return Object(e);
  }
} : Object;