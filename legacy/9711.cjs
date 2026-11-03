var t = 0;
var n = Math.random();
module.exports = function (e) {
  return "Symbol(" + String(e === undefined ? "" : e) + ")_" + (++t + n).toString(36);
};