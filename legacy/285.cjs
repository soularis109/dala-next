require("./8783.cjs");
var i;
var r = require("./2109.cjs");
var o = require("./9781.cjs");
var s = require("./590.cjs");
var a = require("./7854.cjs");
var l = require("./6048.cjs");
var u = require("./1320.cjs");
var c = require("./5787.cjs");
var h = require("./6656.cjs");
var d = require("./1574.cjs");
var f = require("./8457.cjs");
var m = require("./8710.cjs").codeAt;
var p = require("./3197.cjs");
var v = require("./1340.cjs");
var g = require("./8003.cjs");
var x = require("./1637.cjs");
var y = require("./9909.cjs");
var D = a.URL;
var b = x.URLSearchParams;
var _ = x.getState;
var w = y.set;
var S = y.getterFor("URL");
var E = Math.floor;
var P = Math.pow;
var C = "Invalid scheme";
var T = "Invalid host";
var F = "Invalid port";
var A = /[A-Za-z]/;
var M = /[\d+-.A-Za-z]/;
var O = /\d/;
var L = /^0x/i;
var I = /^[0-7]+$/;
var R = /^\d+$/;
var k = /^[\dA-Fa-f]+$/;
var z = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
var U = /[\0\t\n\r #/:<>?@[\\\]^|]/;
var j = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
var B = /[\t\n\r]/g;
function N(e, t) {
  var n;
  var i;
  var r;
  if (t.charAt(0) == "[") {
    if (t.charAt(t.length - 1) != "]") {
      return T;
    }
    if (!(n = G(t.slice(1, -1)))) {
      return T;
    }
    e.host = n;
  } else if (K(e)) {
    t = p(t);
    if (z.test(t)) {
      return T;
    }
    if ((n = V(t)) === null) {
      return T;
    }
    e.host = n;
  } else {
    if (U.test(t)) {
      return T;
    }
    n = "";
    i = f(t);
    r = 0;
    for (; r < i.length; r++) {
      n += $(i[r], H);
    }
    e.host = n;
  }
}
function V(e) {
  var t;
  var n;
  var i;
  var r;
  var o;
  var s;
  var a;
  var l = e.split(".");
  if (l.length && l[l.length - 1] == "") {
    l.pop();
  }
  if ((t = l.length) > 4) {
    return e;
  }
  n = [];
  i = 0;
  for (; i < t; i++) {
    if ((r = l[i]) == "") {
      return e;
    }
    o = 10;
    if (r.length > 1 && r.charAt(0) == "0") {
      o = L.test(r) ? 16 : 8;
      r = r.slice(o == 8 ? 1 : 2);
    }
    if (r === "") {
      s = 0;
    } else {
      if (!(o == 10 ? R : o == 8 ? I : k).test(r)) {
        return e;
      }
      s = parseInt(r, o);
    }
    n.push(s);
  }
  for (i = 0; i < t; i++) {
    s = n[i];
    if (i == t - 1) {
      if (s >= P(256, 5 - t)) {
        return null;
      }
    } else if (s > 255) {
      return null;
    }
  }
  a = n.pop();
  i = 0;
  for (; i < n.length; i++) {
    a += n[i] * P(256, 3 - i);
  }
  return a;
}
function G(e) {
  var t;
  var n;
  var i;
  var r;
  var o;
  var s;
  var a;
  var l = [0, 0, 0, 0, 0, 0, 0, 0];
  var u = 0;
  var c = null;
  var h = 0;
  function d() {
    return e.charAt(h);
  }
  if (d() == ":") {
    if (e.charAt(1) != ":") {
      return;
    }
    h += 2;
    c = ++u;
  }
  while (d()) {
    if (u == 8) {
      return;
    }
    if (d() != ":") {
      for (t = n = 0; n < 4 && k.test(d());) {
        t = t * 16 + parseInt(d(), 16);
        h++;
        n++;
      }
      if (d() == ".") {
        if (n == 0) {
          return;
        }
        h -= n;
        if (u > 6) {
          return;
        }
        for (i = 0; d();) {
          r = null;
          if (i > 0) {
            if (d() != "." || !(i < 4)) {
              return;
            }
            h++;
          }
          if (!O.test(d())) {
            return;
          }
          while (O.test(d())) {
            o = parseInt(d(), 10);
            if (r === null) {
              r = o;
            } else {
              if (r == 0) {
                return;
              }
              r = r * 10 + o;
            }
            if (r > 255) {
              return;
            }
            h++;
          }
          l[u] = l[u] * 256 + r;
          if (++i == 2 || i == 4) {
            u++;
          }
        }
        if (i != 4) {
          return;
        }
        break;
      }
      if (d() == ":") {
        h++;
        if (!d()) {
          return;
        }
      } else if (d()) {
        return;
      }
      l[u++] = t;
    } else {
      if (c !== null) {
        return;
      }
      h++;
      c = ++u;
    }
  }
  if (c !== null) {
    s = u - c;
    u = 7;
    while (u != 0 && s > 0) {
      a = l[u];
      l[u--] = l[c + s - 1];
      l[c + --s] = a;
    }
  } else if (u != 8) {
    return;
  }
  return l;
}
function W(e) {
  var t;
  var n;
  var i;
  var r;
  if (typeof e == "number") {
    t = [];
    n = 0;
    for (; n < 4; n++) {
      t.unshift(e % 256);
      e = E(e / 256);
    }
    return t.join(".");
  }
  if (typeof e == "object") {
    t = "";
    i = function (e) {
      var t = null;
      var n = 1;
      var i = null;
      var r = 0;
      for (var o = 0; o < 8; o++) {
        if (e[o] !== 0) {
          if (r > n) {
            t = i;
            n = r;
          }
          i = null;
          r = 0;
        } else {
          if (i === null) {
            i = o;
          }
          ++r;
        }
      }
      if (r > n) {
        t = i;
        n = r;
      }
      return t;
    }(e);
    n = 0;
    for (; n < 8; n++) {
      if (!r || e[n] !== 0) {
        r &&= false;
        if (i === n) {
          t += n ? ":" : "::";
          r = true;
        } else {
          t += e[n].toString(16);
          if (n < 7) {
            t += ":";
          }
        }
      }
    }
    return "[" + t + "]";
  }
  return e;
}
var H = {};
var q = d({}, H, {
  " ": 1,
  "\"": 1,
  "<": 1,
  ">": 1,
  "`": 1
});
var Y = d({}, q, {
  "#": 1,
  "?": 1,
  "{": 1,
  "}": 1
});
var Z = d({}, Y, {
  "/": 1,
  ":": 1,
  ";": 1,
  "=": 1,
  "@": 1,
  "[": 1,
  "\\": 1,
  "]": 1,
  "^": 1,
  "|": 1
});
function $(e, t) {
  var n = m(e, 0);
  if (n > 32 && n < 127 && !h(t, e)) {
    return e;
  } else {
    return encodeURIComponent(e);
  }
}
var X = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};
function K(e) {
  return h(X, e.scheme);
}
function Q(e) {
  return e.username != "" || e.password != "";
}
function J(e) {
  return !e.host || e.cannotBeABaseURL || e.scheme == "file";
}
function ee(e, t) {
  var n;
  return e.length == 2 && A.test(e.charAt(0)) && ((n = e.charAt(1)) == ":" || !t && n == "|");
}
function te(e) {
  var t;
  return e.length > 1 && ee(e.slice(0, 2)) && (e.length == 2 || (t = e.charAt(2)) === "/" || t === "\\" || t === "?" || t === "#");
}
function ne(e) {
  var t = e.path;
  var n = t.length;
  if (!!n && (e.scheme != "file" || n != 1 || !ee(t[0], true))) {
    t.pop();
  }
}
function ie(e) {
  return e === "." || e.toLowerCase() === "%2e";
}
var re = {};
var oe = {};
var se = {};
var ae = {};
var le = {};
var ue = {};
var ce = {};
var he = {};
var de = {};
var fe = {};
var me = {};
var pe = {};
var ve = {};
var ge = {};
var xe = {};
var ye = {};
var De = {};
var be = {};
var _e = {};
var we = {};
var Se = {};
function Ee(e, t, n, r) {
  var o;
  var s;
  var a;
  var l;
  var u;
  var c = n || re;
  var d = 0;
  var m = "";
  var p = false;
  var v = false;
  var g = false;
  if (!n) {
    e.scheme = "";
    e.username = "";
    e.password = "";
    e.host = null;
    e.port = null;
    e.path = [];
    e.query = null;
    e.fragment = null;
    e.cannotBeABaseURL = false;
    t = t.replace(j, "");
  }
  t = t.replace(B, "");
  o = f(t);
  while (d <= o.length) {
    s = o[d];
    switch (c) {
      case re:
        if (!s || !A.test(s)) {
          if (n) {
            return C;
          }
          c = se;
          continue;
        }
        m += s.toLowerCase();
        c = oe;
        break;
      case oe:
        if (s && (M.test(s) || s == "+" || s == "-" || s == ".")) {
          m += s.toLowerCase();
        } else {
          if (s != ":") {
            if (n) {
              return C;
            }
            m = "";
            c = se;
            d = 0;
            continue;
          }
          if (n && (K(e) != h(X, m) || m == "file" && (Q(e) || e.port !== null) || e.scheme == "file" && !e.host)) {
            return;
          }
          e.scheme = m;
          if (n) {
            if (K(e) && X[e.scheme] == e.port) {
              e.port = null;
            }
            return;
          }
          m = "";
          if (e.scheme == "file") {
            c = ge;
          } else if (K(e) && r && r.scheme == e.scheme) {
            c = ae;
          } else if (K(e)) {
            c = he;
          } else if (o[d + 1] == "/") {
            c = le;
            d++;
          } else {
            e.cannotBeABaseURL = true;
            e.path.push("");
            c = _e;
          }
        }
        break;
      case se:
        if (!r || r.cannotBeABaseURL && s != "#") {
          return C;
        }
        if (r.cannotBeABaseURL && s == "#") {
          e.scheme = r.scheme;
          e.path = r.path.slice();
          e.query = r.query;
          e.fragment = "";
          e.cannotBeABaseURL = true;
          c = Se;
          break;
        }
        c = r.scheme == "file" ? ge : ue;
        continue;
      case ae:
        if (s != "/" || o[d + 1] != "/") {
          c = ue;
          continue;
        }
        c = de;
        d++;
        break;
      case le:
        if (s == "/") {
          c = fe;
          break;
        }
        c = be;
        continue;
      case ue:
        e.scheme = r.scheme;
        if (s == i) {
          e.username = r.username;
          e.password = r.password;
          e.host = r.host;
          e.port = r.port;
          e.path = r.path.slice();
          e.query = r.query;
        } else if (s == "/" || s == "\\" && K(e)) {
          c = ce;
        } else if (s == "?") {
          e.username = r.username;
          e.password = r.password;
          e.host = r.host;
          e.port = r.port;
          e.path = r.path.slice();
          e.query = "";
          c = we;
        } else {
          if (s != "#") {
            e.username = r.username;
            e.password = r.password;
            e.host = r.host;
            e.port = r.port;
            e.path = r.path.slice();
            e.path.pop();
            c = be;
            continue;
          }
          e.username = r.username;
          e.password = r.password;
          e.host = r.host;
          e.port = r.port;
          e.path = r.path.slice();
          e.query = r.query;
          e.fragment = "";
          c = Se;
        }
        break;
      case ce:
        if (!K(e) || s != "/" && s != "\\") {
          if (s != "/") {
            e.username = r.username;
            e.password = r.password;
            e.host = r.host;
            e.port = r.port;
            c = be;
            continue;
          }
          c = fe;
        } else {
          c = de;
        }
        break;
      case he:
        c = de;
        if (s != "/" || m.charAt(d + 1) != "/") {
          continue;
        }
        d++;
        break;
      case de:
        if (s != "/" && s != "\\") {
          c = fe;
          continue;
        }
        break;
      case fe:
        if (s == "@") {
          if (p) {
            m = "%40" + m;
          }
          p = true;
          a = f(m);
          for (var x = 0; x < a.length; x++) {
            var y = a[x];
            if (y != ":" || g) {
              var D = $(y, Z);
              if (g) {
                e.password += D;
              } else {
                e.username += D;
              }
            } else {
              g = true;
            }
          }
          m = "";
        } else if (s == i || s == "/" || s == "?" || s == "#" || s == "\\" && K(e)) {
          if (p && m == "") {
            return "Invalid authority";
          }
          d -= f(m).length + 1;
          m = "";
          c = me;
        } else {
          m += s;
        }
        break;
      case me:
      case pe:
        if (n && e.scheme == "file") {
          c = ye;
          continue;
        }
        if (s != ":" || v) {
          if (s == i || s == "/" || s == "?" || s == "#" || s == "\\" && K(e)) {
            if (K(e) && m == "") {
              return T;
            }
            if (n && m == "" && (Q(e) || e.port !== null)) {
              return;
            }
            if (l = N(e, m)) {
              return l;
            }
            m = "";
            c = De;
            if (n) {
              return;
            }
            continue;
          }
          if (s == "[") {
            v = true;
          } else if (s == "]") {
            v = false;
          }
          m += s;
        } else {
          if (m == "") {
            return T;
          }
          if (l = N(e, m)) {
            return l;
          }
          m = "";
          c = ve;
          if (n == pe) {
            return;
          }
        }
        break;
      case ve:
        if (!O.test(s)) {
          if (s == i || s == "/" || s == "?" || s == "#" || s == "\\" && K(e) || n) {
            if (m != "") {
              var b = parseInt(m, 10);
              if (b > 65535) {
                return F;
              }
              e.port = K(e) && b === X[e.scheme] ? null : b;
              m = "";
            }
            if (n) {
              return;
            }
            c = De;
            continue;
          }
          return F;
        }
        m += s;
        break;
      case ge:
        e.scheme = "file";
        if (s == "/" || s == "\\") {
          c = xe;
        } else {
          if (!r || r.scheme != "file") {
            c = be;
            continue;
          }
          if (s == i) {
            e.host = r.host;
            e.path = r.path.slice();
            e.query = r.query;
          } else if (s == "?") {
            e.host = r.host;
            e.path = r.path.slice();
            e.query = "";
            c = we;
          } else {
            if (s != "#") {
              if (!te(o.slice(d).join(""))) {
                e.host = r.host;
                e.path = r.path.slice();
                ne(e);
              }
              c = be;
              continue;
            }
            e.host = r.host;
            e.path = r.path.slice();
            e.query = r.query;
            e.fragment = "";
            c = Se;
          }
        }
        break;
      case xe:
        if (s == "/" || s == "\\") {
          c = ye;
          break;
        }
        if (r && r.scheme == "file" && !te(o.slice(d).join(""))) {
          if (ee(r.path[0], true)) {
            e.path.push(r.path[0]);
          } else {
            e.host = r.host;
          }
        }
        c = be;
        continue;
      case ye:
        if (s == i || s == "/" || s == "\\" || s == "?" || s == "#") {
          if (!n && ee(m)) {
            c = be;
          } else if (m == "") {
            e.host = "";
            if (n) {
              return;
            }
            c = De;
          } else {
            if (l = N(e, m)) {
              return l;
            }
            if (e.host == "localhost") {
              e.host = "";
            }
            if (n) {
              return;
            }
            m = "";
            c = De;
          }
          continue;
        }
        m += s;
        break;
      case De:
        if (K(e)) {
          c = be;
          if (s != "/" && s != "\\") {
            continue;
          }
        } else if (n || s != "?") {
          if (n || s != "#") {
            if (s != i && (c = be, s != "/")) {
              continue;
            }
          } else {
            e.fragment = "";
            c = Se;
          }
        } else {
          e.query = "";
          c = we;
        }
        break;
      case be:
        if (s == i || s == "/" || s == "\\" && K(e) || !n && (s == "?" || s == "#")) {
          if ((u = (u = m).toLowerCase()) === ".." || u === "%2e." || u === ".%2e" || u === "%2e%2e") {
            ne(e);
            if (s != "/" && (s != "\\" || !K(e))) {
              e.path.push("");
            }
          } else if (ie(m)) {
            if (s != "/" && (s != "\\" || !K(e))) {
              e.path.push("");
            }
          } else {
            if (e.scheme == "file" && !e.path.length && ee(m)) {
              e.host &&= "";
              m = m.charAt(0) + ":";
            }
            e.path.push(m);
          }
          m = "";
          if (e.scheme == "file" && (s == i || s == "?" || s == "#")) {
            while (e.path.length > 1 && e.path[0] === "") {
              e.path.shift();
            }
          }
          if (s == "?") {
            e.query = "";
            c = we;
          } else if (s == "#") {
            e.fragment = "";
            c = Se;
          }
        } else {
          m += $(s, Y);
        }
        break;
      case _e:
        if (s == "?") {
          e.query = "";
          c = we;
        } else if (s == "#") {
          e.fragment = "";
          c = Se;
        } else if (s != i) {
          e.path[0] += $(s, H);
        }
        break;
      case we:
        if (n || s != "#") {
          if (s != i) {
            if (s == "'" && K(e)) {
              e.query += "%27";
            } else {
              e.query += s == "#" ? "%23" : $(s, H);
            }
          }
        } else {
          e.fragment = "";
          c = Se;
        }
        break;
      case Se:
        if (s != i) {
          e.fragment += $(s, q);
        }
    }
    d++;
  }
}
function Pe(e) {
  var t;
  var n;
  var i = c(this, Pe, "URL");
  var r = arguments.length > 1 ? arguments[1] : undefined;
  var s = v(e);
  var a = w(i, {
    type: "URL"
  });
  if (r !== undefined) {
    if (r instanceof Pe) {
      t = S(r);
    } else if (n = Ee(t = {}, v(r))) {
      throw TypeError(n);
    }
  }
  if (n = Ee(a, s, null, t)) {
    throw TypeError(n);
  }
  var l = a.searchParams = new b();
  var u = _(l);
  u.updateSearchParams(a.query);
  u.updateURL = function () {
    a.query = String(l) || null;
  };
  if (!o) {
    i.href = Te.call(i);
    i.origin = Fe.call(i);
    i.protocol = Ae.call(i);
    i.username = Me.call(i);
    i.password = Oe.call(i);
    i.host = Le.call(i);
    i.hostname = Ie.call(i);
    i.port = Re.call(i);
    i.pathname = ke.call(i);
    i.search = ze.call(i);
    i.searchParams = Ue.call(i);
    i.hash = je.call(i);
  }
}
var Ce = Pe.prototype;
function Te() {
  var e = S(this);
  var t = e.scheme;
  var n = e.username;
  var i = e.password;
  var r = e.host;
  var o = e.port;
  var s = e.path;
  var a = e.query;
  var l = e.fragment;
  var u = t + ":";
  if (r !== null) {
    u += "//";
    if (Q(e)) {
      u += n + (i ? ":" + i : "") + "@";
    }
    u += W(r);
    if (o !== null) {
      u += ":" + o;
    }
  } else if (t == "file") {
    u += "//";
  }
  u += e.cannotBeABaseURL ? s[0] : s.length ? "/" + s.join("/") : "";
  if (a !== null) {
    u += "?" + a;
  }
  if (l !== null) {
    u += "#" + l;
  }
  return u;
}
function Fe() {
  var e = S(this);
  var t = e.scheme;
  var n = e.port;
  if (t == "blob") {
    try {
      return new Pe(t.path[0]).origin;
    } catch (e) {
      return "null";
    }
  }
  if (t != "file" && K(e)) {
    return t + "://" + W(e.host) + (n !== null ? ":" + n : "");
  } else {
    return "null";
  }
}
function Ae() {
  return S(this).scheme + ":";
}
function Me() {
  return S(this).username;
}
function Oe() {
  return S(this).password;
}
function Le() {
  var e = S(this);
  var t = e.host;
  var n = e.port;
  if (t === null) {
    return "";
  } else if (n === null) {
    return W(t);
  } else {
    return W(t) + ":" + n;
  }
}
function Ie() {
  var e = S(this).host;
  if (e === null) {
    return "";
  } else {
    return W(e);
  }
}
function Re() {
  var e = S(this).port;
  if (e === null) {
    return "";
  } else {
    return String(e);
  }
}
function ke() {
  var e = S(this);
  var t = e.path;
  if (e.cannotBeABaseURL) {
    return t[0];
  } else if (t.length) {
    return "/" + t.join("/");
  } else {
    return "";
  }
}
function ze() {
  var e = S(this).query;
  if (e) {
    return "?" + e;
  } else {
    return "";
  }
}
function Ue() {
  return S(this).searchParams;
}
function je() {
  var e = S(this).fragment;
  if (e) {
    return "#" + e;
  } else {
    return "";
  }
}
function Be(e, t) {
  return {
    get: e,
    set: t,
    configurable: true,
    enumerable: true
  };
}
if (o) {
  l(Ce, {
    href: Be(Te, function (e) {
      var t = S(this);
      var n = v(e);
      var i = Ee(t, n);
      if (i) {
        throw TypeError(i);
      }
      _(t.searchParams).updateSearchParams(t.query);
    }),
    origin: Be(Fe),
    protocol: Be(Ae, function (e) {
      var t = S(this);
      Ee(t, v(e) + ":", re);
    }),
    username: Be(Me, function (e) {
      var t = S(this);
      var n = f(v(e));
      if (!J(t)) {
        t.username = "";
        for (var i = 0; i < n.length; i++) {
          t.username += $(n[i], Z);
        }
      }
    }),
    password: Be(Oe, function (e) {
      var t = S(this);
      var n = f(v(e));
      if (!J(t)) {
        t.password = "";
        for (var i = 0; i < n.length; i++) {
          t.password += $(n[i], Z);
        }
      }
    }),
    host: Be(Le, function (e) {
      var t = S(this);
      if (!t.cannotBeABaseURL) {
        Ee(t, v(e), me);
      }
    }),
    hostname: Be(Ie, function (e) {
      var t = S(this);
      if (!t.cannotBeABaseURL) {
        Ee(t, v(e), pe);
      }
    }),
    port: Be(Re, function (e) {
      var t = S(this);
      if (!J(t)) {
        if ((e = v(e)) == "") {
          t.port = null;
        } else {
          Ee(t, e, ve);
        }
      }
    }),
    pathname: Be(ke, function (e) {
      var t = S(this);
      if (!t.cannotBeABaseURL) {
        t.path = [];
        Ee(t, v(e), De);
      }
    }),
    search: Be(ze, function (e) {
      var t = S(this);
      if ((e = v(e)) == "") {
        t.query = null;
      } else {
        if (e.charAt(0) == "?") {
          e = e.slice(1);
        }
        t.query = "";
        Ee(t, e, we);
      }
      _(t.searchParams).updateSearchParams(t.query);
    }),
    searchParams: Be(Ue),
    hash: Be(je, function (e) {
      var t = S(this);
      if ((e = v(e)) != "") {
        if (e.charAt(0) == "#") {
          e = e.slice(1);
        }
        t.fragment = "";
        Ee(t, e, Se);
      } else {
        t.fragment = null;
      }
    })
  });
}
u(Ce, "toJSON", function () {
  return Te.call(this);
}, {
  enumerable: true
});
u(Ce, "toString", function () {
  return Te.call(this);
}, {
  enumerable: true
});
if (D) {
  var Ne = D.createObjectURL;
  var Ve = D.revokeObjectURL;
  if (Ne) {
    u(Pe, "createObjectURL", function (e) {
      return Ne.apply(D, arguments);
    });
  }
  if (Ve) {
    u(Pe, "revokeObjectURL", function (e) {
      return Ve.apply(D, arguments);
    });
  }
}
g(Pe, "URL");
r({
  global: true,
  forced: !s,
  sham: !o
}, {
  URL: Pe
});