var i = require("./7854.cjs");
var r = require("./8324.cjs");
var o = require("./6992.cjs");
var s = require("./8880.cjs");
var a = require("./5112.cjs");
var l = a("iterator");
var u = a("toStringTag");
var c = o.values;
for (var h in r) {
  var d = i[h];
  var f = d && d.prototype;
  if (f) {
    if (f[l] !== c) {
      try {
        s(f, l, c);
      } catch (e) {
        f[l] = c;
      }
    }
    if (!f[u]) {
      s(f, u, h);
    }
    if (r[h]) {
      for (var m in o) {
        if (f[m] !== o[m]) {
          try {
            s(f, m, o[m]);
          } catch (e) {
            f[m] = o[m];
          }
        }
      }
    }
  }
}