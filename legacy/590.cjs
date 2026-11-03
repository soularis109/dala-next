var i = require("./7293.cjs");
var r = require("./5112.cjs");
var o = require("./1913.cjs");
var s = r("iterator");
module.exports = !i(function () {
  var e = new URL("b?a=1&b=2&c=3", "http://a");
  var t = e.searchParams;
  var n = "";
  e.pathname = "c%20d";
  t.forEach(function (e, i) {
    t.delete("b");
    n += i + e;
  });
  return o && !e.toJSON || !t.sort || e.href !== "http://a/c%20d?a=1&c=3" || t.get("c") !== "3" || String(new URLSearchParams("?a=1")) !== "a=1" || !t[s] || new URL("https://a@b").username !== "a" || new URLSearchParams(new URLSearchParams("a=b")).get("a") !== "b" || new URL("http://тест").host !== "xn--e1aybc" || new URL("http://a#б").hash !== "#%D0%B1" || n !== "a1c3" || new URL("http://x", undefined).host !== "x";
});