var i = require("./5112.cjs")("iterator");
var r = false;
try {
  var o = 0;
  var s = {
    next: function () {
      return {
        done: !!o++
      };
    },
    return: function () {
      r = true;
    }
  };
  s[i] = function () {
    return this;
  };
  Array.from(s, function () {
    throw 2;
  });
} catch (e) {}
module.exports = function (e, t) {
  if (!t && !r) {
    return false;
  }
  var n = false;
  try {
    var o = {
      [i]: function () {
        return {
          next: function () {
            return {
              done: n = true
            };
          }
        };
      }
    };
    e(o);
  } catch (e) {}
  return n;
};