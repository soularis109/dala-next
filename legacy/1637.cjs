require("./6992.cjs");
var i = require("./2109.cjs");
var r = require("./5005.cjs");
var o = require("./590.cjs");
var s = require("./1320.cjs");
var a = require("./2248.cjs");
var l = require("./8003.cjs");
var u = require("./4994.cjs");
var c = require("./9909.cjs");
var h = require("./5787.cjs");
var d = require("./6656.cjs");
var f = require("./9974.cjs");
var m = require("./648.cjs");
var p = require("./9670.cjs");
var v = require("./111.cjs");
var g = require("./1340.cjs");
var x = require("./30.cjs");
var y = require("./9114.cjs");
var D = require("./8554.cjs");
var b = require("./1246.cjs");
var _ = require("./5112.cjs");
var w = r("fetch");
var S = r("Request");
var E = S && S.prototype;
var P = r("Headers");
var C = _("iterator");
var T = "URLSearchParams";
var F = "URLSearchParamsIterator";
var A = c.set;
var M = c.getterFor(T);
var O = c.getterFor(F);
var L = /\+/g;
var I = Array(4);
function R(e) {
  return I[e - 1] ||= RegExp("((?:%[\\da-f]{2}){" + e + "})", "gi");
}
function k(e) {
  try {
    return decodeURIComponent(e);
  } catch (t) {
    return e;
  }
}
function z(e) {
  var t = e.replace(L, " ");
  var n = 4;
  try {
    return decodeURIComponent(t);
  } catch (e) {
    while (n) {
      t = t.replace(R(n--), k);
    }
    return t;
  }
}
var U = /[!'()~]|%20/g;
var j = {
  "!": "%21",
  "'": "%27",
  "(": "%28",
  ")": "%29",
  "~": "%7E",
  "%20": "+"
};
function B(e) {
  return j[e];
}
function N(e) {
  return encodeURIComponent(e).replace(U, B);
}
function V(e, t) {
  if (t) {
    var n;
    for (var i, r = t.split("&"), o = 0; o < r.length;) {
      if ((n = r[o++]).length) {
        i = n.split("=");
        e.push({
          key: z(i.shift()),
          value: z(i.join("="))
        });
      }
    }
  }
}
function G(e) {
  this.entries.length = 0;
  V(this.entries, e);
}
function W(e, t) {
  if (e < t) {
    throw TypeError("Not enough arguments");
  }
}
var H = u(function (e, t) {
  A(this, {
    type: F,
    iterator: D(M(e).entries),
    kind: t
  });
}, "Iterator", function () {
  var e = O(this);
  var t = e.kind;
  var n = e.iterator.next();
  var i = n.value;
  if (!n.done) {
    n.value = t === "keys" ? i.key : t === "values" ? i.value : [i.key, i.value];
  }
  return n;
});
function q() {
  h(this, q, T);
  var e;
  var t;
  var n;
  var i;
  var r;
  var o;
  var s;
  var a;
  var l;
  var u = arguments.length > 0 ? arguments[0] : undefined;
  var c = this;
  var f = [];
  A(c, {
    type: T,
    entries: f,
    updateURL: function () {},
    updateSearchParams: G
  });
  if (u !== undefined) {
    if (v(u)) {
      if (typeof (e = b(u)) == "function") {
        for (n = (t = D(u, e)).next; !(i = n.call(t)).done;) {
          if ((s = (o = (r = D(p(i.value))).next).call(r)).done || (a = o.call(r)).done || !o.call(r).done) {
            throw TypeError("Expected sequence with length 2");
          }
          f.push({
            key: g(s.value),
            value: g(a.value)
          });
        }
      } else {
        for (l in u) {
          if (d(u, l)) {
            f.push({
              key: l,
              value: g(u[l])
            });
          }
        }
      }
    } else {
      V(f, typeof u == "string" ? u.charAt(0) === "?" ? u.slice(1) : u : g(u));
    }
  }
}
var Y = q.prototype;
a(Y, {
  append: function (e, t) {
    W(arguments.length, 2);
    var n = M(this);
    n.entries.push({
      key: g(e),
      value: g(t)
    });
    n.updateURL();
  },
  delete: function (e) {
    W(arguments.length, 1);
    var t = M(this);
    for (var n = t.entries, i = g(e), r = 0; r < n.length;) {
      if (n[r].key === i) {
        n.splice(r, 1);
      } else {
        r++;
      }
    }
    t.updateURL();
  },
  get: function (e) {
    W(arguments.length, 1);
    for (var t = M(this).entries, n = g(e), i = 0; i < t.length; i++) {
      if (t[i].key === n) {
        return t[i].value;
      }
    }
    return null;
  },
  getAll: function (e) {
    W(arguments.length, 1);
    for (var t = M(this).entries, n = g(e), i = [], r = 0; r < t.length; r++) {
      if (t[r].key === n) {
        i.push(t[r].value);
      }
    }
    return i;
  },
  has: function (e) {
    W(arguments.length, 1);
    for (var t = M(this).entries, n = g(e), i = 0; i < t.length;) {
      if (t[i++].key === n) {
        return true;
      }
    }
    return false;
  },
  set: function (e, t) {
    W(arguments.length, 1);
    var n;
    var i = M(this);
    for (var r = i.entries, o = false, s = g(e), a = g(t), l = 0; l < r.length; l++) {
      if ((n = r[l]).key === s) {
        if (o) {
          r.splice(l--, 1);
        } else {
          o = true;
          n.value = a;
        }
      }
    }
    if (!o) {
      r.push({
        key: s,
        value: a
      });
    }
    i.updateURL();
  },
  sort: function () {
    var e;
    var t;
    var n;
    var i = M(this);
    var r = i.entries;
    var o = r.slice();
    r.length = 0;
    n = 0;
    for (; n < o.length; n++) {
      e = o[n];
      t = 0;
      for (; t < n; t++) {
        if (r[t].key > e.key) {
          r.splice(t, 0, e);
          break;
        }
      }
      if (t === n) {
        r.push(e);
      }
    }
    i.updateURL();
  },
  forEach: function (e) {
    var t;
    for (var n = M(this).entries, i = f(e, arguments.length > 1 ? arguments[1] : undefined, 3), r = 0; r < n.length;) {
      i((t = n[r++]).value, t.key, this);
    }
  },
  keys: function () {
    return new H(this, "keys");
  },
  values: function () {
    return new H(this, "values");
  },
  entries: function () {
    return new H(this, "entries");
  }
}, {
  enumerable: true
});
s(Y, C, Y.entries);
s(Y, "toString", function () {
  var e;
  for (var t = M(this).entries, n = [], i = 0; i < t.length;) {
    e = t[i++];
    n.push(N(e.key) + "=" + N(e.value));
  }
  return n.join("&");
}, {
  enumerable: true
});
l(q, T);
i({
  global: true,
  forced: !o
}, {
  URLSearchParams: q
});
if (!o && typeof P == "function") {
  function Z(e) {
    if (v(e)) {
      var t;
      var n = e.body;
      if (m(n) === T) {
        if (!(t = e.headers ? new P(e.headers) : new P()).has("content-type")) {
          t.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
        }
        return x(e, {
          body: y(0, String(n)),
          headers: y(0, t)
        });
      }
    }
    return e;
  }
  if (typeof w == "function") {
    i({
      global: true,
      enumerable: true,
      forced: true
    }, {
      fetch: function (e) {
        return w(e, arguments.length > 1 ? Z(arguments[1]) : {});
      }
    });
  }
  if (typeof S == "function") {
    function $(e) {
      h(this, $, "Request");
      return new S(e, arguments.length > 1 ? Z(arguments[1]) : {});
    }
    E.constructor = $;
    $.prototype = E;
    i({
      global: true,
      forced: true
    }, {
      Request: $
    });
  }
}
module.exports = {
  URLSearchParams: q,
  getState: M
};