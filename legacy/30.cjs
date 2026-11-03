var i;
var r = require("./9670.cjs");
var o = require("./6048.cjs");
var s = require("./748.cjs");
var a = require("./3501.cjs");
var l = require("./490.cjs");
var u = require("./317.cjs");
var c = require("./6200.cjs");
var h = c("IE_PROTO");
function d() {}
function f(e) {
  return "<script>" + e + "</script>";
}
function m(e) {
  e.write(f(""));
  e.close();
  var t = e.parentWindow.Object;
  e = null;
  return t;
}
function p() {
  try {
    i = new ActiveXObject("htmlfile");
  } catch (e) {}
  var e;
  var t;
  p = typeof document != "undefined" ? document.domain && i ? m(i) : ((t = u("iframe")).style.display = "none", l.appendChild(t), t.src = String("javascript:"), (e = t.contentWindow.document).open(), e.write(f("document.F=Object")), e.close(), e.F) : m(i);
  for (var n = s.length; n--;) {
    delete p.prototype[s[n]];
  }
  return p();
}
a[h] = true;
module.exports = Object.create || function (e, t) {
  var n;
  if (e !== null) {
    d.prototype = r(e);
    n = new d();
    d.prototype = null;
    n[h] = e;
  } else {
    n = p();
  }
  if (t === undefined) {
    return n;
  } else {
    return o(n, t);
  }
};