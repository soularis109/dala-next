var i = require("./2109.cjs");
var r = require("./2261.cjs");
i({
  target: "RegExp",
  proto: true,
  forced: /./.exec !== r
}, {
  exec: r
});