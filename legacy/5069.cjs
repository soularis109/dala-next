var i = require("./2109.cjs");
var r = require("./3157.cjs");
var o = [].reverse;
var s = [1, 2];
i({
  target: "Array",
  proto: true,
  forced: String(s) === String(s.reverse())
}, {
  reverse: function () {
    if (r(this)) {
      this.length = this.length;
    }
    return o.call(this);
  }
});