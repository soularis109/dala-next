var t = 2147483647;
var n = /[^\0-\u007E]/;
var i = /[.\u3002\uFF0E\uFF61]/g;
var r = "Overflow: input needs wider integers to process";
var o = Math.floor;
var s = String.fromCharCode;
function a(e) {
  return e + 22 + (e < 26) * 75;
}
function l(e, t, n) {
  var i = 0;
  e = n ? o(e / 700) : e >> 1;
  e += o(e / t);
  for (; e > 455; i += 36) {
    e = o(e / 35);
  }
  return o(i + e * 36 / (e + 38));
}
function u(e) {
  var n;
  var i;
  var u = [];
  var c = (e = function (e) {
    var t = [];
    for (var n = 0, i = e.length; n < i;) {
      var r = e.charCodeAt(n++);
      if (r >= 55296 && r <= 56319 && n < i) {
        var o = e.charCodeAt(n++);
        if ((o & 64512) == 56320) {
          t.push(((r & 1023) << 10) + (o & 1023) + 65536);
        } else {
          t.push(r);
          n--;
        }
      } else {
        t.push(r);
      }
    }
    return t;
  }(e)).length;
  var h = 128;
  var d = 0;
  var f = 72;
  for (n = 0; n < e.length; n++) {
    if ((i = e[n]) < 128) {
      u.push(s(i));
    }
  }
  var m = u.length;
  var p = m;
  for (m && u.push("-"); p < c;) {
    var v = t;
    for (n = 0; n < e.length; n++) {
      if ((i = e[n]) >= h && i < v) {
        v = i;
      }
    }
    var g = p + 1;
    if (v - h > o((t - d) / g)) {
      throw RangeError(r);
    }
    d += (v - h) * g;
    h = v;
    n = 0;
    for (; n < e.length; n++) {
      if ((i = e[n]) < h && ++d > t) {
        throw RangeError(r);
      }
      if (i == h) {
        var x = d;
        for (var y = 36;; y += 36) {
          var D = y <= f ? 1 : y >= f + 26 ? 26 : y - f;
          if (x < D) {
            break;
          }
          var b = x - D;
          var _ = 36 - D;
          u.push(s(a(D + b % _)));
          x = o(b / _);
        }
        u.push(s(a(x)));
        f = l(d, g, p == m);
        d = 0;
        ++p;
      }
    }
    ++d;
    ++h;
  }
  return u.join("");
}
module.exports = function (e) {
  var t;
  var r;
  var o = [];
  var s = e.toLowerCase().replace(i, ".").split(".");
  for (t = 0; t < s.length; t++) {
    r = s[t];
    o.push(n.test(r) ? "xn--" + u(r) : r);
  }
  return o.join(".");
};