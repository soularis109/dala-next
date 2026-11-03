var i = require("./5465.cjs");
var r = Function.toString;
if (typeof i.inspectSource != "function") {
  i.inspectSource = function (e) {
    return r.call(e);
  };
}
module.exports = i.inspectSource;