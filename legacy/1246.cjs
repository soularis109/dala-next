var i = require("./648.cjs");
var r = require("./7497.cjs");
var o = require("./5112.cjs")("iterator");
module.exports = function (e) {
  if (e != null) {
    return e[o] || e["@@iterator"] || r[i(e)];
  }
};