var i = require("./7854.cjs");
var r = require("./2788.cjs");
var o = i.WeakMap;
module.exports = typeof o == "function" && /native code/.test(r(o));