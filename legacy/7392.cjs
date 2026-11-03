var i;
var r;
var o = require("./7854.cjs");
var s = require("./8113.cjs");
var a = o.process;
var l = o.Deno;
var u = a && a.versions || l && l.version;
var c = u && u.v8;
if (c) {
  r = (i = c.split("."))[0] < 4 ? 1 : i[0] + i[1];
} else if (s && (!(i = s.match(/Edge\/(\d+)/)) || i[1] >= 74) && (i = s.match(/Chrome\/(\d+)/))) {
  r = i[1];
}
module.exports = r && +r;