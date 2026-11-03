var i = require("./1913.cjs");
var r = require("./5465.cjs");
(module.exports = function (e, t) {
  return r[e] ||= t !== undefined ? t : {};
})("versions", []).push({
  version: "3.17.2",
  mode: i ? "pure" : "global",
  copyright: "© 2021 Denis Pushkarev (zloirock.ru)"
});