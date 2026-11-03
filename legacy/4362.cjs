var t = Math.floor;
function n(e, o) {
  var s = e.length;
  var a = t(s / 2);
  if (s < 8) {
    return i(e, o);
  } else {
    return r(n(e.slice(0, a), o), n(e.slice(a), o), o);
  }
}
function i(e, t) {
  var n;
  var i;
  for (var r = e.length, o = 1; o < r;) {
    i = o;
    n = e[o];
    while (i && t(e[i - 1], n) > 0) {
      e[i] = e[--i];
    }
    if (i !== o++) {
      e[i] = n;
    }
  }
  return e;
}
function r(e, t, n) {
  for (var i = e.length, r = t.length, o = 0, s = 0, a = []; o < i || s < r;) {
    if (o < i && s < r) {
      a.push(n(e[o], t[s]) <= 0 ? e[o++] : t[s++]);
    } else {
      a.push(o < i ? e[o++] : t[s++]);
    }
  }
  return a;
}
module.exports = n;