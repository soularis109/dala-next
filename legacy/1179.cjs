var t = Math.abs;
var n = Math.pow;
var i = Math.floor;
var r = Math.log;
var o = Math.LN2;
module.exports = {
  pack: function (e, s, a) {
    var l;
    var u;
    var c;
    var h = new Array(a);
    var d = a * 8 - s - 1;
    var f = (1 << d) - 1;
    var m = f >> 1;
    var p = s === 23 ? n(2, -24) - n(2, -77) : 0;
    var v = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    var g = 0;
    for ((e = t(e)) != e || e === Infinity ? (u = e != e ? 1 : 0, l = f) : (l = i(r(e) / o), e * (c = n(2, -l)) < 1 && (l--, c *= 2), (e += l + m >= 1 ? p / c : p * n(2, 1 - m)) * c >= 2 && (l++, c /= 2), l + m >= f ? (u = 0, l = f) : l + m >= 1 ? (u = (e * c - 1) * n(2, s), l += m) : (u = e * n(2, m - 1) * n(2, s), l = 0)); s >= 8; s -= 8) {
      h[g++] = u & 255;
      u /= 256;
    }
    l = l << s | u;
    d += s;
    for (; d > 0; d -= 8) {
      h[g++] = l & 255;
      l /= 256;
    }
    h[--g] |= v * 128;
    return h;
  },
  unpack: function (e, t) {
    var i;
    var r = e.length;
    var o = r * 8 - t - 1;
    var s = (1 << o) - 1;
    var a = s >> 1;
    var l = o - 7;
    var u = r - 1;
    var c = e[u--];
    var h = c & 127;
    for (c >>= 7; l > 0; l -= 8) {
      h = h * 256 + e[u];
      u--;
    }
    i = h & (1 << -l) - 1;
    h >>= -l;
    l += t;
    for (; l > 0; l -= 8) {
      i = i * 256 + e[u];
      u--;
    }
    if (h === 0) {
      h = 1 - a;
    } else {
      if (h === s) {
        if (i) {
          return NaN;
        } else if (c) {
          return -Infinity;
        } else {
          return Infinity;
        }
      }
      i += n(2, t);
      h -= a;
    }
    return (c ? -1 : 1) * i * n(2, h - t);
  }
};