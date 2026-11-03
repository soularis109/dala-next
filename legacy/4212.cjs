var t;
self;
t = function () {
  return (() => {
    var e = {
      4672: e => {
        const t = {
          html: document.documentElement,
          body: document.body,
          window: {
            w: window.innerWidth,
            h: window.innerHeight
          }
        };
        e.exports = t;
      },
      5336: e => {
        e.exports = function (e, t) {
          let n = null;
          return function () {
            clearTimeout(n);
            const i = arguments;
            const r = this;
            n = setTimeout(function () {
              e.apply(r, i);
            }, t);
          };
        };
      },
      6077: (e, t, n) => {
        var i = n(111);
        e.exports = function (e) {
          if (!i(e) && e !== null) {
            throw TypeError("Can't set " + String(e) + " as a prototype");
          }
          return e;
        };
      },
      1223: (e, t, n) => {
        var i = n(5112);
        var r = n(30);
        var o = n(3070);
        var s = i("unscopables");
        var a = Array.prototype;
        if (a[s] == null) {
          o.f(a, s, {
            configurable: true,
            value: r(null)
          });
        }
        e.exports = function (e) {
          a[s][e] = true;
        };
      },
      9670: (e, t, n) => {
        var i = n(111);
        e.exports = function (e) {
          if (!i(e)) {
            throw TypeError(String(e) + " is not an object");
          }
          return e;
        };
      },
      1318: (e, t, n) => {
        var i = n(5656);
        var r = n(7466);
        var o = n(1400);
        function s(e) {
          return function (t, n, s) {
            var a;
            var l = i(t);
            var u = r(l.length);
            var c = o(s, u);
            if (e && n != n) {
              while (u > c) {
                if ((a = l[c++]) != a) {
                  return true;
                }
              }
            } else {
              for (; u > c; c++) {
                if ((e || c in l) && l[c] === n) {
                  return e || c || 0;
                }
              }
            }
            return !e && -1;
          };
        }
        e.exports = {
          includes: s(true),
          indexOf: s(false)
        };
      },
      4326: e => {
        var t = {}.toString;
        e.exports = function (e) {
          return t.call(e).slice(8, -1);
        };
      },
      9920: (e, t, n) => {
        var i = n(6656);
        var r = n(3887);
        var o = n(1236);
        var s = n(3070);
        e.exports = function (e, t) {
          for (var n = r(t), a = s.f, l = o.f, u = 0; u < n.length; u++) {
            var c = n[u];
            if (!i(e, c)) {
              a(e, c, l(t, c));
            }
          }
        };
      },
      8544: (e, t, n) => {
        var i = n(7293);
        e.exports = !i(function () {
          function e() {}
          e.prototype.constructor = null;
          return Object.getPrototypeOf(new e()) !== e.prototype;
        });
      },
      4994: (e, t, n) => {
        "use strict";

        var i = n(3383).IteratorPrototype;
        var r = n(30);
        var o = n(9114);
        var s = n(8003);
        var a = n(7497);
        function l() {
          return this;
        }
        e.exports = function (e, t, n) {
          var u = t + " Iterator";
          e.prototype = r(i, {
            next: o(1, n)
          });
          s(e, u, false, true);
          a[u] = l;
          return e;
        };
      },
      8880: (e, t, n) => {
        var i = n(9781);
        var r = n(3070);
        var o = n(9114);
        e.exports = i ? function (e, t, n) {
          return r.f(e, t, o(1, n));
        } : function (e, t, n) {
          e[t] = n;
          return e;
        };
      },
      9114: e => {
        e.exports = function (e, t) {
          return {
            enumerable: !(e & 1),
            configurable: !(e & 2),
            writable: !(e & 4),
            value: t
          };
        };
      },
      654: (e, t, n) => {
        "use strict";

        var i = n(2109);
        var r = n(4994);
        var o = n(9518);
        var s = n(7674);
        var a = n(8003);
        var l = n(8880);
        var u = n(1320);
        var c = n(5112);
        var h = n(1913);
        var d = n(7497);
        var f = n(3383);
        var m = f.IteratorPrototype;
        var p = f.BUGGY_SAFARI_ITERATORS;
        var v = c("iterator");
        var g = "keys";
        var x = "values";
        var y = "entries";
        function D() {
          return this;
        }
        e.exports = function (e, t, n, c, f, b, _) {
          r(n, t, c);
          var w;
          var S;
          var E;
          function P(e) {
            if (e === f && M) {
              return M;
            }
            if (!p && e in F) {
              return F[e];
            }
            switch (e) {
              case g:
              case x:
              case y:
                return function () {
                  return new n(this, e);
                };
            }
            return function () {
              return new n(this);
            };
          }
          var C = t + " Iterator";
          var T = false;
          var F = e.prototype;
          var A = F[v] || F["@@iterator"] || f && F[f];
          var M = !p && A || P(f);
          var O = t == "Array" && F.entries || A;
          if (O) {
            w = o(O.call(new e()));
            if (m !== Object.prototype && w.next) {
              if (!h && o(w) !== m) {
                if (s) {
                  s(w, m);
                } else if (typeof w[v] != "function") {
                  l(w, v, D);
                }
              }
              a(w, C, true, true);
              if (h) {
                d[C] = D;
              }
            }
          }
          if (f == x && A && A.name !== x) {
            T = true;
            M = function () {
              return A.call(this);
            };
          }
          if ((!h || !!_) && F[v] !== M) {
            l(F, v, M);
          }
          d[t] = M;
          if (f) {
            S = {
              values: P(x),
              keys: b ? M : P(g),
              entries: P(y)
            };
            if (_) {
              for (E in S) {
                if (p || T || !(E in F)) {
                  u(F, E, S[E]);
                }
              }
            } else {
              i({
                target: t,
                proto: true,
                forced: p || T
              }, S);
            }
          }
          return S;
        };
      },
      9781: (e, t, n) => {
        var i = n(7293);
        e.exports = !i(function () {
          return Object.defineProperty({}, 1, {
            get: function () {
              return 7;
            }
          })[1] != 7;
        });
      },
      317: (e, t, n) => {
        var i = n(7854);
        var r = n(111);
        var o = i.document;
        var s = r(o) && r(o.createElement);
        e.exports = function (e) {
          if (s) {
            return o.createElement(e);
          } else {
            return {};
          }
        };
      },
      8324: e => {
        e.exports = {
          CSSRuleList: 0,
          CSSStyleDeclaration: 0,
          CSSValueList: 0,
          ClientRectList: 0,
          DOMRectList: 0,
          DOMStringList: 0,
          DOMTokenList: 1,
          DataTransferItemList: 0,
          FileList: 0,
          HTMLAllCollection: 0,
          HTMLCollection: 0,
          HTMLFormElement: 0,
          HTMLSelectElement: 0,
          MediaList: 0,
          MimeTypeArray: 0,
          NamedNodeMap: 0,
          NodeList: 1,
          PaintRequestList: 0,
          Plugin: 0,
          PluginArray: 0,
          SVGLengthList: 0,
          SVGNumberList: 0,
          SVGPathSegList: 0,
          SVGPointList: 0,
          SVGStringList: 0,
          SVGTransformList: 0,
          SourceBufferList: 0,
          StyleSheetList: 0,
          TextTrackCueList: 0,
          TextTrackList: 0,
          TouchList: 0
        };
      },
      5268: (e, t, n) => {
        var i = n(4326);
        var r = n(7854);
        e.exports = i(r.process) == "process";
      },
      8113: (e, t, n) => {
        var i = n(5005);
        e.exports = i("navigator", "userAgent") || "";
      },
      7392: (e, t, n) => {
        var i;
        var r;
        var o = n(7854);
        var s = n(8113);
        var a = o.process;
        var l = a && a.versions;
        var u = l && l.v8;
        if (u) {
          r = (i = u.split("."))[0] + i[1];
        } else if (s && (!(i = s.match(/Edge\/(\d+)/)) || i[1] >= 74) && (i = s.match(/Chrome\/(\d+)/))) {
          r = i[1];
        }
        e.exports = r && +r;
      },
      748: e => {
        e.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
      },
      2109: (e, t, n) => {
        var i = n(7854);
        var r = n(1236).f;
        var o = n(8880);
        var s = n(1320);
        var a = n(3505);
        var l = n(9920);
        var u = n(4705);
        e.exports = function (e, t) {
          var n;
          var c;
          var h;
          var d;
          var f;
          var m = e.target;
          var p = e.global;
          var v = e.stat;
          if (n = p ? i : v ? i[m] || a(m, {}) : (i[m] || {}).prototype) {
            for (c in t) {
              d = t[c];
              h = e.noTargetGet ? (f = r(n, c)) && f.value : n[c];
              if (!u(p ? c : m + (v ? "." : "#") + c, e.forced) && h !== undefined) {
                if (typeof d == typeof h) {
                  continue;
                }
                l(d, h);
              }
              if (e.sham || h && h.sham) {
                o(d, "sham", true);
              }
              s(n, c, d, e);
            }
          }
        };
      },
      7293: e => {
        e.exports = function (e) {
          try {
            return !!e();
          } catch (e) {
            return true;
          }
        };
      },
      5005: (e, t, n) => {
        var i = n(857);
        var r = n(7854);
        function o(e) {
          if (typeof e == "function") {
            return e;
          } else {
            return undefined;
          }
        }
        e.exports = function (e, t) {
          if (arguments.length < 2) {
            return o(i[e]) || o(r[e]);
          } else {
            return i[e] && i[e][t] || r[e] && r[e][t];
          }
        };
      },
      7854: (e, t, n) => {
        function i(e) {
          return e && e.Math == Math && e;
        }
        e.exports = i(typeof globalThis == "object" && globalThis) || i(typeof window == "object" && window) || i(typeof self == "object" && self) || i(typeof n.g == "object" && n.g) || function () {
          return this;
        }() || Function("return this")();
      },
      6656: (e, t, n) => {
        var i = n(7908);
        var r = {}.hasOwnProperty;
        e.exports = function (e, t) {
          return r.call(i(e), t);
        };
      },
      3501: e => {
        e.exports = {};
      },
      490: (e, t, n) => {
        var i = n(5005);
        e.exports = i("document", "documentElement");
      },
      4664: (e, t, n) => {
        var i = n(9781);
        var r = n(7293);
        var o = n(317);
        e.exports = !i && !r(function () {
          return Object.defineProperty(o("div"), "a", {
            get: function () {
              return 7;
            }
          }).a != 7;
        });
      },
      8361: (e, t, n) => {
        var i = n(7293);
        var r = n(4326);
        var o = "".split;
        e.exports = i(function () {
          return !Object("z").propertyIsEnumerable(0);
        }) ? function (e) {
          if (r(e) == "String") {
            return o.call(e, "");
          } else {
            return Object(e);
          }
        } : Object;
      },
      2788: (e, t, n) => {
        var i = n(5465);
        var r = Function.toString;
        if (typeof i.inspectSource != "function") {
          i.inspectSource = function (e) {
            return r.call(e);
          };
        }
        e.exports = i.inspectSource;
      },
      9909: (e, t, n) => {
        var i;
        var r;
        var o;
        var s = n(8536);
        var a = n(7854);
        var l = n(111);
        var u = n(8880);
        var c = n(6656);
        var h = n(5465);
        var d = n(6200);
        var f = n(3501);
        var m = "Object already initialized";
        var p = a.WeakMap;
        if (s) {
          var v = h.state ||= new p();
          var g = v.get;
          var x = v.has;
          var y = v.set;
          i = function (e, t) {
            if (x.call(v, e)) {
              throw new TypeError(m);
            }
            t.facade = e;
            y.call(v, e, t);
            return t;
          };
          r = function (e) {
            return g.call(v, e) || {};
          };
          o = function (e) {
            return x.call(v, e);
          };
        } else {
          var D = d("state");
          f[D] = true;
          i = function (e, t) {
            if (c(e, D)) {
              throw new TypeError(m);
            }
            t.facade = e;
            u(e, D, t);
            return t;
          };
          r = function (e) {
            if (c(e, D)) {
              return e[D];
            } else {
              return {};
            }
          };
          o = function (e) {
            return c(e, D);
          };
        }
        e.exports = {
          set: i,
          get: r,
          has: o,
          enforce: function (e) {
            if (o(e)) {
              return r(e);
            } else {
              return i(e, {});
            }
          },
          getterFor: function (e) {
            return function (t) {
              var n;
              if (!l(t) || (n = r(t)).type !== e) {
                throw TypeError("Incompatible receiver, " + e + " required");
              }
              return n;
            };
          }
        };
      },
      4705: (e, t, n) => {
        var i = n(7293);
        var r = /#|\.prototype\./;
        function o(e, t) {
          var n = a[s(e)];
          return n == u || n != l && (typeof t == "function" ? i(t) : !!t);
        }
        var s = o.normalize = function (e) {
          return String(e).replace(r, ".").toLowerCase();
        };
        var a = o.data = {};
        var l = o.NATIVE = "N";
        var u = o.POLYFILL = "P";
        e.exports = o;
      },
      111: e => {
        e.exports = function (e) {
          if (typeof e == "object") {
            return e !== null;
          } else {
            return typeof e == "function";
          }
        };
      },
      1913: e => {
        e.exports = false;
      },
      3383: (e, t, n) => {
        "use strict";

        var i;
        var r;
        var o;
        var s = n(7293);
        var a = n(9518);
        var l = n(8880);
        var u = n(6656);
        var c = n(5112);
        var h = n(1913);
        var d = c("iterator");
        var f = false;
        if ([].keys) {
          if ("next" in (o = [].keys())) {
            if ((r = a(a(o))) !== Object.prototype) {
              i = r;
            }
          } else {
            f = true;
          }
        }
        var m = i == null || s(function () {
          var e = {};
          return i[d].call(e) !== e;
        });
        if (m) {
          i = {};
        }
        if ((!h || !!m) && !u(i, d)) {
          l(i, d, function () {
            return this;
          });
        }
        e.exports = {
          IteratorPrototype: i,
          BUGGY_SAFARI_ITERATORS: f
        };
      },
      7497: e => {
        e.exports = {};
      },
      133: (e, t, n) => {
        var i = n(5268);
        var r = n(7392);
        var o = n(7293);
        e.exports = !!Object.getOwnPropertySymbols && !o(function () {
          return !Symbol.sham && (i ? r === 38 : r > 37 && r < 41);
        });
      },
      8536: (e, t, n) => {
        var i = n(7854);
        var r = n(2788);
        var o = i.WeakMap;
        e.exports = typeof o == "function" && /native code/.test(r(o));
      },
      30: (e, t, n) => {
        var i;
        var r = n(9670);
        var o = n(6048);
        var s = n(748);
        var a = n(3501);
        var l = n(490);
        var u = n(317);
        var c = n(6200);
        var h = c("IE_PROTO");
        function d() {}
        function f(e) {
          return "<script>" + e + "</script>";
        }
        function m() {
          try {
            i = document.domain && new ActiveXObject("htmlfile");
          } catch (e) {}
          var e;
          var t;
          m = i ? function (e) {
            e.write(f(""));
            e.close();
            var t = e.parentWindow.Object;
            e = null;
            return t;
          }(i) : ((t = u("iframe")).style.display = "none", l.appendChild(t), t.src = String("javascript:"), (e = t.contentWindow.document).open(), e.write(f("document.F=Object")), e.close(), e.F);
          for (var n = s.length; n--;) {
            delete m.prototype[s[n]];
          }
          return m();
        }
        a[h] = true;
        e.exports = Object.create || function (e, t) {
          var n;
          if (e !== null) {
            d.prototype = r(e);
            n = new d();
            d.prototype = null;
            n[h] = e;
          } else {
            n = m();
          }
          if (t === undefined) {
            return n;
          } else {
            return o(n, t);
          }
        };
      },
      6048: (e, t, n) => {
        var i = n(9781);
        var r = n(3070);
        var o = n(9670);
        var s = n(1956);
        e.exports = i ? Object.defineProperties : function (e, t) {
          o(e);
          var n;
          var i = s(t);
          for (var a = i.length, l = 0; a > l;) {
            r.f(e, n = i[l++], t[n]);
          }
          return e;
        };
      },
      3070: (e, t, n) => {
        var i = n(9781);
        var r = n(4664);
        var o = n(9670);
        var s = n(7593);
        var a = Object.defineProperty;
        t.f = i ? a : function (e, t, n) {
          o(e);
          t = s(t, true);
          o(n);
          if (r) {
            try {
              return a(e, t, n);
            } catch (e) {}
          }
          if ("get" in n || "set" in n) {
            throw TypeError("Accessors not supported");
          }
          if ("value" in n) {
            e[t] = n.value;
          }
          return e;
        };
      },
      1236: (e, t, n) => {
        var i = n(9781);
        var r = n(5296);
        var o = n(9114);
        var s = n(5656);
        var a = n(7593);
        var l = n(6656);
        var u = n(4664);
        var c = Object.getOwnPropertyDescriptor;
        t.f = i ? c : function (e, t) {
          e = s(e);
          t = a(t, true);
          if (u) {
            try {
              return c(e, t);
            } catch (e) {}
          }
          if (l(e, t)) {
            return o(!r.f.call(e, t), e[t]);
          }
        };
      },
      8006: (e, t, n) => {
        var i = n(6324);
        var r = n(748).concat("length", "prototype");
        t.f = Object.getOwnPropertyNames || function (e) {
          return i(e, r);
        };
      },
      5181: (e, t) => {
        t.f = Object.getOwnPropertySymbols;
      },
      9518: (e, t, n) => {
        var i = n(6656);
        var r = n(7908);
        var o = n(6200);
        var s = n(8544);
        var a = o("IE_PROTO");
        var l = Object.prototype;
        e.exports = s ? Object.getPrototypeOf : function (e) {
          e = r(e);
          if (i(e, a)) {
            return e[a];
          } else if (typeof e.constructor == "function" && e instanceof e.constructor) {
            return e.constructor.prototype;
          } else if (e instanceof Object) {
            return l;
          } else {
            return null;
          }
        };
      },
      6324: (e, t, n) => {
        var i = n(6656);
        var r = n(5656);
        var o = n(1318).indexOf;
        var s = n(3501);
        e.exports = function (e, t) {
          var n;
          var a = r(e);
          var l = 0;
          var u = [];
          for (n in a) {
            if (!i(s, n) && i(a, n)) {
              u.push(n);
            }
          }
          while (t.length > l) {
            if (i(a, n = t[l++])) {
              if (!~o(u, n)) {
                u.push(n);
              }
            }
          }
          return u;
        };
      },
      1956: (e, t, n) => {
        var i = n(6324);
        var r = n(748);
        e.exports = Object.keys || function (e) {
          return i(e, r);
        };
      },
      5296: (e, t) => {
        "use strict";

        var n = {}.propertyIsEnumerable;
        var i = Object.getOwnPropertyDescriptor;
        var r = i && !n.call({
          1: 2
        }, 1);
        t.f = r ? function (e) {
          var t = i(this, e);
          return !!t && t.enumerable;
        } : n;
      },
      7674: (e, t, n) => {
        var i = n(9670);
        var r = n(6077);
        e.exports = Object.setPrototypeOf || ("__proto__" in {} ? function () {
          var e;
          var t = false;
          var n = {};
          try {
            (e = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(n, []);
            t = n instanceof Array;
          } catch (e) {}
          return function (n, o) {
            i(n);
            r(o);
            if (t) {
              e.call(n, o);
            } else {
              n.__proto__ = o;
            }
            return n;
          };
        }() : undefined);
      },
      3887: (e, t, n) => {
        var i = n(5005);
        var r = n(8006);
        var o = n(5181);
        var s = n(9670);
        e.exports = i("Reflect", "ownKeys") || function (e) {
          var t = r.f(s(e));
          var n = o.f;
          if (n) {
            return t.concat(n(e));
          } else {
            return t;
          }
        };
      },
      857: (e, t, n) => {
        var i = n(7854);
        e.exports = i;
      },
      1320: (e, t, n) => {
        var i = n(7854);
        var r = n(8880);
        var o = n(6656);
        var s = n(3505);
        var a = n(2788);
        var l = n(9909);
        var u = l.get;
        var c = l.enforce;
        var h = String(String).split("String");
        (e.exports = function (e, t, n, a) {
          var u = !!a && !!a.unsafe;
          var d = !!a && !!a.enumerable;
          var f = !!a && !!a.noTargetGet;
          if (typeof n == "function") {
            if (typeof t == "string" && !o(n, "name")) {
              r(n, "name", t);
            }
            c(n).source ||= h.join(typeof t == "string" ? t : "");
          }
          if (e !== i) {
            if (u) {
              if (!f && e[t]) {
                d = true;
              }
            } else {
              delete e[t];
            }
            if (d) {
              e[t] = n;
            } else {
              r(e, t, n);
            }
          } else if (d) {
            e[t] = n;
          } else {
            s(t, n);
          }
        })(Function.prototype, "toString", function () {
          return typeof this == "function" && u(this).source || a(this);
        });
      },
      4488: e => {
        e.exports = function (e) {
          if (e == null) {
            throw TypeError("Can't call method on " + e);
          }
          return e;
        };
      },
      3505: (e, t, n) => {
        var i = n(7854);
        var r = n(8880);
        e.exports = function (e, t) {
          try {
            r(i, e, t);
          } catch (n) {
            i[e] = t;
          }
          return t;
        };
      },
      8003: (e, t, n) => {
        var i = n(3070).f;
        var r = n(6656);
        var o = n(5112)("toStringTag");
        e.exports = function (e, t, n) {
          if (e && !r(e = n ? e : e.prototype, o)) {
            i(e, o, {
              configurable: true,
              value: t
            });
          }
        };
      },
      6200: (e, t, n) => {
        var i = n(2309);
        var r = n(9711);
        var o = i("keys");
        e.exports = function (e) {
          return o[e] ||= r(e);
        };
      },
      5465: (e, t, n) => {
        var i = n(7854);
        var r = n(3505);
        var o = "__core-js_shared__";
        var s = i[o] || r(o, {});
        e.exports = s;
      },
      2309: (e, t, n) => {
        var i = n(1913);
        var r = n(5465);
        (e.exports = function (e, t) {
          return r[e] ||= t !== undefined ? t : {};
        })("versions", []).push({
          version: "3.11.1",
          mode: i ? "pure" : "global",
          copyright: "© 2021 Denis Pushkarev (zloirock.ru)"
        });
      },
      1400: (e, t, n) => {
        var i = n(9958);
        var r = Math.max;
        var o = Math.min;
        e.exports = function (e, t) {
          var n = i(e);
          if (n < 0) {
            return r(n + t, 0);
          } else {
            return o(n, t);
          }
        };
      },
      5656: (e, t, n) => {
        var i = n(8361);
        var r = n(4488);
        e.exports = function (e) {
          return i(r(e));
        };
      },
      9958: e => {
        var t = Math.ceil;
        var n = Math.floor;
        e.exports = function (e) {
          if (isNaN(e = +e)) {
            return 0;
          } else {
            return (e > 0 ? n : t)(e);
          }
        };
      },
      7466: (e, t, n) => {
        var i = n(9958);
        var r = Math.min;
        e.exports = function (e) {
          if (e > 0) {
            return r(i(e), 9007199254740991);
          } else {
            return 0;
          }
        };
      },
      7908: (e, t, n) => {
        var i = n(4488);
        e.exports = function (e) {
          return Object(i(e));
        };
      },
      7593: (e, t, n) => {
        var i = n(111);
        e.exports = function (e, t) {
          if (!i(e)) {
            return e;
          }
          var n;
          var r;
          if (t && typeof (n = e.toString) == "function" && !i(r = n.call(e))) {
            return r;
          }
          if (typeof (n = e.valueOf) == "function" && !i(r = n.call(e))) {
            return r;
          }
          if (!t && typeof (n = e.toString) == "function" && !i(r = n.call(e))) {
            return r;
          }
          throw TypeError("Can't convert object to primitive value");
        };
      },
      9711: e => {
        var t = 0;
        var n = Math.random();
        e.exports = function (e) {
          return "Symbol(" + String(e === undefined ? "" : e) + ")_" + (++t + n).toString(36);
        };
      },
      3307: (e, t, n) => {
        var i = n(133);
        e.exports = i && !Symbol.sham && typeof Symbol.iterator == "symbol";
      },
      5112: (e, t, n) => {
        var i = n(7854);
        var r = n(2309);
        var o = n(6656);
        var s = n(9711);
        var a = n(133);
        var l = n(3307);
        var u = r("wks");
        var c = i.Symbol;
        var h = l ? c : c && c.withoutSetter || s;
        e.exports = function (e) {
          if (!o(u, e) || !a && typeof u[e] != "string") {
            if (a && o(c, e)) {
              u[e] = c[e];
            } else {
              u[e] = h("Symbol." + e);
            }
          }
          return u[e];
        };
      },
      6992: (e, t, n) => {
        "use strict";

        var i = n(5656);
        var r = n(1223);
        var o = n(7497);
        var s = n(9909);
        var a = n(654);
        var l = "Array Iterator";
        var u = s.set;
        var c = s.getterFor(l);
        e.exports = a(Array, "Array", function (e, t) {
          u(this, {
            type: l,
            target: i(e),
            index: 0,
            kind: t
          });
        }, function () {
          var e = c(this);
          var t = e.target;
          var n = e.kind;
          var i = e.index++;
          if (!t || i >= t.length) {
            e.target = undefined;
            return {
              value: undefined,
              done: true
            };
          } else if (n == "keys") {
            return {
              value: i,
              done: false
            };
          } else if (n == "values") {
            return {
              value: t[i],
              done: false
            };
          } else {
            return {
              value: [i, t[i]],
              done: false
            };
          }
        }, "values");
        o.Arguments = o.Array;
        r("keys");
        r("values");
        r("entries");
      },
      3948: (e, t, n) => {
        var i = n(7854);
        var r = n(8324);
        var o = n(6992);
        var s = n(8880);
        var a = n(5112);
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
      }
    };
    var t = {};
    function n(i) {
      var r = t[i];
      if (r !== undefined) {
        return r.exports;
      }
      var o = t[i] = {
        exports: {}
      };
      e[i](o, o.exports, n);
      return o.exports;
    }
    n.n = e => {
      var t = e && e.__esModule ? () => e.default : () => e;
      n.d(t, {
        a: t
      });
      return t;
    };
    n.d = (e, t) => {
      for (var i in t) {
        if (n.o(t, i) && !n.o(e, i)) {
          Object.defineProperty(e, i, {
            enumerable: true,
            get: t[i]
          });
        }
      }
    };
    n.g = function () {
      if (typeof globalThis == "object") {
        return globalThis;
      }
      try {
        return this || new Function("return this")();
      } catch (e) {
        if (typeof window == "object") {
          return window;
        }
      }
    }();
    n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
    var i = {};
    (() => {
      "use strict";

      n.d(i, {
        default: () => L
      });
      var e = n(5336);
      var t = n.n(e);
      var r = n(4672);
      var o = n.n(r);
      function s() {
        if (!(this instanceof s)) {
          return new s();
        }
        this.size = 0;
        this.uid = 0;
        this.selectors = [];
        this.selectorObjects = {};
        this.indexes = Object.create(this.indexes);
        this.activeIndexes = [];
      }
      var a = window.document.documentElement;
      var l = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector;
      s.prototype.matchesSelector = function (e, t) {
        return l.call(e, t);
      };
      s.prototype.querySelectorAll = function (e, t) {
        return t.querySelectorAll(e);
      };
      s.prototype.indexes = [];
      var u = /^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
      s.prototype.indexes.push({
        name: "ID",
        selector: function (e) {
          var t;
          if (t = e.match(u)) {
            return t[0].slice(1);
          }
        },
        element: function (e) {
          if (e.id) {
            return [e.id];
          }
        }
      });
      var c = /^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
      s.prototype.indexes.push({
        name: "CLASS",
        selector: function (e) {
          var t;
          if (t = e.match(c)) {
            return t[0].slice(1);
          }
        },
        element: function (e) {
          var t = e.className;
          if (t) {
            if (typeof t == "string") {
              return t.split(/\s/);
            }
            if (typeof t == "object" && "baseVal" in t) {
              return t.baseVal.split(/\s/);
            }
          }
        }
      });
      var h;
      var d = /^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
      s.prototype.indexes.push({
        name: "TAG",
        selector: function (e) {
          var t;
          if (t = e.match(d)) {
            return t[0].toUpperCase();
          }
        },
        element: function (e) {
          return [e.nodeName.toUpperCase()];
        }
      });
      s.prototype.indexes.default = {
        name: "UNIVERSAL",
        selector: function () {
          return true;
        },
        element: function () {
          return [true];
        }
      };
      h = typeof window.Map == "function" ? window.Map : function () {
        function e() {
          this.map = {};
        }
        e.prototype.get = function (e) {
          return this.map[e + " "];
        };
        e.prototype.set = function (e, t) {
          this.map[e + " "] = t;
        };
        return e;
      }();
      var f = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;
      function m(e, t) {
        var n;
        var i;
        var r;
        var o;
        var s;
        var a;
        var l = (e = e.slice(0).concat(e.default)).length;
        var u = t;
        var c = [];
        do {
          f.exec("");
          if ((r = f.exec(u)) && (u = r[3], r[2] || !u)) {
            for (n = 0; n < l; n++) {
              if (s = (a = e[n]).selector(r[1])) {
                i = c.length;
                o = false;
                while (i--) {
                  if (c[i].index === a && c[i].key === s) {
                    o = true;
                    break;
                  }
                }
                if (!o) {
                  c.push({
                    index: a,
                    key: s
                  });
                }
                break;
              }
            }
          }
        } while (r);
        return c;
      }
      function p(e, t) {
        var n;
        var i;
        var r;
        n = 0;
        i = e.length;
        for (; n < i; n++) {
          r = e[n];
          if (t.isPrototypeOf(r)) {
            return r;
          }
        }
      }
      function v(e, t) {
        return e.id - t.id;
      }
      s.prototype.logDefaultIndexUsed = function () {};
      s.prototype.add = function (e, t) {
        var n;
        var i;
        var r;
        var o;
        var s;
        var a;
        var l;
        var u;
        var c = this.activeIndexes;
        var d = this.selectors;
        var f = this.selectorObjects;
        if (typeof e == "string") {
          f[(n = {
            id: this.uid++,
            selector: e,
            data: t
          }).id] = n;
          l = m(this.indexes, e);
          i = 0;
          for (; i < l.length; i++) {
            o = (u = l[i]).key;
            if (!(s = p(c, r = u.index))) {
              (s = Object.create(r)).map = new h();
              c.push(s);
            }
            if (r === this.indexes.default) {
              this.logDefaultIndexUsed(n);
            }
            if (!(a = s.map.get(o))) {
              a = [];
              s.map.set(o, a);
            }
            a.push(n);
          }
          this.size++;
          d.push(e);
        }
      };
      s.prototype.remove = function (e, t) {
        if (typeof e == "string") {
          var n;
          var i;
          var r;
          var o;
          var s;
          var a;
          var l;
          var u;
          var c = this.activeIndexes;
          var h = this.selectors = [];
          var d = this.selectorObjects;
          var f = {};
          var p = arguments.length === 1;
          n = m(this.indexes, e);
          r = 0;
          for (; r < n.length; r++) {
            i = n[r];
            o = c.length;
            while (o--) {
              a = c[o];
              if (i.index.isPrototypeOf(a)) {
                if (l = a.map.get(i.key)) {
                  for (s = l.length; s--;) {
                    if ((u = l[s]).selector === e && (!!p || u.data === t)) {
                      l.splice(s, 1);
                      f[u.id] = true;
                    }
                  }
                }
                break;
              }
            }
          }
          for (r in f) {
            delete d[r];
            this.size--;
          }
          for (r in d) {
            h.push(d[r].selector);
          }
        }
      };
      s.prototype.queryAll = function (e) {
        if (!this.selectors.length) {
          return [];
        }
        var t;
        var n;
        var i;
        var r;
        var o;
        var s;
        var a;
        var l;
        var u = {};
        var c = [];
        var h = this.querySelectorAll(this.selectors.join(", "), e);
        t = 0;
        i = h.length;
        for (; t < i; t++) {
          o = h[t];
          n = 0;
          r = (s = this.matches(o)).length;
          for (; n < r; n++) {
            if (u[(l = s[n]).id]) {
              a = u[l.id];
            } else {
              a = {
                id: l.id,
                selector: l.selector,
                data: l.data,
                elements: []
              };
              u[l.id] = a;
              c.push(a);
            }
            a.elements.push(o);
          }
        }
        return c.sort(v);
      };
      s.prototype.matches = function (e) {
        if (!e) {
          return [];
        }
        var t;
        var n;
        var i;
        var r;
        var o;
        var s;
        var a;
        var l;
        var u;
        var c;
        var h;
        var d = this.activeIndexes;
        var f = {};
        var m = [];
        t = 0;
        r = d.length;
        for (; t < r; t++) {
          if (l = (a = d[t]).element(e)) {
            n = 0;
            o = l.length;
            for (; n < o; n++) {
              if (u = a.map.get(l[n])) {
                i = 0;
                s = u.length;
                for (; i < s; i++) {
                  if (!f[h = (c = u[i]).id] && this.matchesSelector(e, c.selector)) {
                    f[h] = true;
                    m.push(c);
                  }
                }
              }
            }
          }
        }
        return m.sort(v);
      };
      const g = {};
      const x = {};
      const y = ["mouseenter", "mouseleave"];
      function D(e) {
        if (x[e] === undefined) {
          x[e] = [];
        }
      }
      function b(e) {
        if (typeof e == "string") {
          return document.querySelectorAll(e);
        } else {
          return e;
        }
      }
      function _(e) {
        let t = function (e, t) {
          const n = [];
          let i = t;
          do {
            if (i.nodeType !== 1) {
              break;
            }
            const t = e.matches(i);
            if (t.length) {
              n.push({
                delegatedTarget: i,
                stack: t
              });
            }
          } while (i = i.parentElement);
          return n;
        }(g[e.type], e.target);
        if (t.length) {
          for (let n = 0; n < t.length; n++) {
            for (let i = 0; i < t[n].stack.length; i++) {
              if (y.indexOf(e.type) !== -1) {
                w(e, t[n].delegatedTarget);
                if (e.target === t[n].delegatedTarget) {
                  t[n].stack[i].data(e);
                }
              } else {
                w(e, t[n].delegatedTarget);
                t[n].stack[i].data(e);
              }
            }
          }
        }
      }
      function w(e, t) {
        Object.defineProperty(e, "currentTarget", {
          configurable: true,
          enumerable: true,
          get: () => t
        });
      }
      function S(e) {
        return JSON.parse(JSON.stringify(e));
      }
      const E = new class {
        bindAll(e, t = Object.getOwnPropertyNames(Object.getPrototypeOf(e))) {
          for (let n = 0; n < t.length; n++) {
            e[t[n]] = e[t[n]].bind(e);
          }
        }
        on(e, t, n, i) {
          if (typeof t == "function" && n === undefined) {
            D(e);
            x[e].push(t);
            return;
          }
          const r = e.split(" ");
          for (let e = 0; e < r.length; e++) {
            if (t.nodeType && t.nodeType === 1 || t === window || t === document) {
              t.addEventListener(r[e], n, i);
            } else {
              t = b(t);
              for (let o = 0; o < t.length; o++) {
                t[o].addEventListener(r[e], n, i);
              }
            }
          }
        }
        delegate(e, t, n) {
          const i = e.split(" ");
          for (let e = 0; e < i.length; e++) {
            let r = g[i[e]];
            if (r === undefined) {
              r = new s();
              g[i[e]] = r;
              if (y.indexOf(i[e]) !== -1) {
                document.addEventListener(i[e], _, true);
              } else {
                document.addEventListener(i[e], _);
              }
            }
            r.add(t, n);
          }
        }
        off(e, t, n, i) {
          if (t === undefined) {
            x[e] = [];
            return;
          }
          if (typeof t == "function") {
            D(e);
            for (let n = 0; n < x[e].length; n++) {
              if (x[e][n] === t) {
                x[e].splice(n, 1);
              }
            }
            return;
          }
          const r = e.split(" ");
          for (let e = 0; e < r.length; e++) {
            const o = g[r[e]];
            if (o === undefined || (o.remove(t, n), o.size !== 0)) {
              if (t.removeEventListener === undefined) {
                t = b(t);
                for (let o = 0; o < t.length; o++) {
                  t[o].removeEventListener(r[e], n, i);
                }
              } else {
                t.removeEventListener(r[e], n, i);
              }
            } else {
              delete g[r[e]];
              document.removeEventListener(r[e], _);
            }
          }
        }
        emit(e, ...t) {
          (function (e, t) {
            if (x[e]) {
              for (let n = 0; n < x[e].length; n++) {
                x[e][n](...t);
              }
            }
          })(e, t);
        }
        debugDelegated() {
          return S(g);
        }
        debugBus() {
          return S(x);
        }
      }();
      function P(e, t, n) {
        if (t in e) {
          Object.defineProperty(e, t, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          e[t] = n;
        }
        return e;
      }
      class C {
        constructor(e = {}) {
          P(this, "onRaf", () => {
            E.emit(C.INTERNALRAF);
            if (!this.options.disableRaf) {
              requestAnimationFrame(this.onRaf);
            }
          });
          this.options = e;
          this.addEvents();
        }
        addEvents() {
          if (!this.options.disableRaf) {
            requestAnimationFrame(this.onRaf);
          }
          if (!this.options.disableResize) {
            E.on("resize", window, t()(() => {
              this.onResize();
            }, 150));
          }
          this.onScroll();
          if ("ontouchstart" in document.documentElement) {
            o().isTouch = true;
            this.detectMouse();
          }
        }
        onScroll() {
          E.on("wheel", window, e => {
            E.emit(C.WHEEL, {
              event: e
            });
          }, {
            passive: false
          });
          E.on("scroll", window, e => {
            E.emit(C.INTERNALSCROLL, {
              event: e
            });
          }, {
            passive: true
          });
        }
        onResize({
          width: e,
          height: t
        } = {}) {
          o().window.w = e || window.innerWidth;
          o().window.h = t || window.innerHeight;
          E.emit(C.RESIZE);
        }
        detectMouse() {
          window.addEventListener("mousemove", function e(t) {
            if (Math.abs(t.movementX) > 0 || Math.abs(t.movementY) > 0) {
              o().isTouch = false;
              E.emit(C.MOUSEDETECTED);
              window.removeEventListener("mousemove", e);
            }
          });
        }
      }
      function T(e, t, n) {
        if (t in e) {
          Object.defineProperty(e, t, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          e[t] = n;
        }
        return e;
      }
      P(C, "INTERNALRAF", "raf:internal");
      P(C, "EXTERNALRAF", "raf:external");
      P(C, "WHEEL", "wheel");
      P(C, "INTERNALSCROLL", "scroll:internal");
      P(C, "EXTERNALSCROLL", "scroll:external");
      P(C, "RESIZE", "resize");
      P(C, "MOUSEDETECTED", "mouseDetected");
      P(C, "SCROLLEND", "scrollEnd");
      n(3948);
      class F {
        constructor(e) {
          T(this, "onMouseMove", e => {
            if (this.mouseDown) {
              this.mousePos = e.clientY;
              this.position -= this.prevMousePos - this.mousePos;
              this.position = Math.min(Math.max(this.position, 0), this.maxY);
              this.prevMousePos = this.mousePos;
              this.controller.targetPos = this.position / this.maxY * this.controller.maxScroll;
              this.controller.clamp();
              this.controller.syncScroll = true;
              this.transform();
              E.emit(C.EXTERNALSCROLL, -this.controller.targetPos);
            }
          });
          T(this, "onMouseDown", e => {
            this.mousePos = this.prevMousePos = e.clientY;
            this.mouseDown = true;
            o().body.style.userSelect = "none";
            this.el.classList.add("active");
          });
          T(this, "onMouseUp", () => {
            this.mouseDown = false;
            o().body.style.removeProperty("user-select");
            this.el.classList.remove("active");
          });
          this.controller = e;
          this.addHTML();
          this.el = document.querySelector(this.controller.options.scrollbarEl);
          this.handle = document.querySelector(this.controller.options.scrollbarHandleEl);
          this.position = 0;
          this.mousePos = 0;
          this.prevMousePos = 0;
          this.addStyles();
          this.addEvents();
        }
        transform() {
          let e;
          if (this.mouseDown) {
            e = this.position;
          } else {
            e = -this.controller.targetPos / -this.controller.maxScroll * (o().window.h - this.handleHeight);
            this.position = e;
          }
          this.handle.style.transform = `translate3d(0, ${e}px, 0)`;
        }
        show() {
          this.el.classList.add("show");
        }
        hide() {
          this.el.classList.remove("show");
        }
        addEvents() {
          E.on("mousedown", this.handle, this.onMouseDown);
          E.on("mousemove", window, this.onMouseMove);
          E.on("mouseup", window, this.onMouseUp);
        }
        onResize() {
          this.scale = (-this.controller.maxScroll + o().window.h) / o().window.h;
          if (this.scale <= 1) {
            this.handle.style.height = 0;
          } else {
            this.trueSize = o().window.h / this.scale;
            this.handleHeight = Math.max(this.trueSize, 40);
            this.handle.style.height = `${this.handleHeight}px`;
            this.maxY = o().window.h - this.handleHeight;
          }
        }
        addHTML() {
          if (document.querySelector(this.controller.options.scrollbarEl)) {
            return;
          }
          const e = document.createElement("div");
          e.classList.add(this.controller.options.scrollbarEl.substring(1));
          e.innerHTML = `<div class="${this.controller.options.scrollbarHandleEl.substring(1)}"><div></div></div>`;
          document.body.appendChild(e);
        }
        addStyles() {
          if (!this.controller.options.disableNativeScrollbar && !this.controller.options.scrollbarStyles) {
            return;
          }
          let e = "";
          if (this.controller.options.disableNativeScrollbar) {
            e += "html{scrollbar-width:none;}body{-ms-overflow-style:none;}body::-webkit-scrollbar{width:0;height:0;}";
          }
          if (this.controller.options.scrollbarStyles) {
            e += `${this.controller.options.scrollbarEl} {position:fixed;top:0;right:0;width:20px;height:100%;z-index:900;}.is-touch ${this.controller.options.scrollbarEl} {display:none;}${this.controller.options.scrollbarEl} > div {padding:6px 0;width:10px;height:0;margin:0 auto;visibility:hidden;}${this.controller.options.scrollbarEl} > div > div {width:100%;height:100%;border-radius:10px;opacity:0.3;background-color:#000;}${this.controller.options.scrollbarEl} > div > div:hover {opacity:0.9;}${this.controller.options.scrollbarEl}:hover > div, ${this.controller.options.scrollbarEl}.show > div, ${this.controller.options.scrollbarEl}.active > div {visibility:visible;}${this.controller.options.scrollbarEl}.active > div > div {opacity:0.9;}`;
          }
          const t = document.createElement("style");
          if (t.styleSheet) {
            t.styleSheet.cssText = e;
          } else {
            t.appendChild(document.createTextNode(e));
          }
          document.getElementsByTagName("head")[0].appendChild(t);
        }
        destroy() {
          E.off("mousedown", this.handle, this.onMouseDown);
          E.off("mousemove", window, this.onMouseMove);
          E.off("mouseup", window, this.onMouseUp);
        }
      }
      function A(e, t, n) {
        if (t in e) {
          Object.defineProperty(e, t, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          e[t] = n;
        }
        return e;
      }
      class M {
        constructor(e = {}) {
          A(this, "onScroll", ({
            event: e
          }) => {
            if (!this.scrolling) {
              if (this.options.customScrollbar) {
                this.scrollbar.show();
              }
              this.toggleIframes();
              this.scrolling = true;
            }
            if (o().isTouch || e.type !== "wheel") {
              if (this.preventResizeScroll) {
                this.preventResizeScroll = false;
                return;
              }
              if (o().isTouch && this.options.touchScrollType === "scrollTop") {
                this.targetPos = this.horizontalScroll ? -this.containerElement.scrollLeft : -this.containerElement.scrollTop;
              } else {
                this.targetPos = -window.scrollY;
              }
              if (o().isTouch && this.options.touchScrollType !== "transform") {
                this.currentPos = this.targetPos;
              }
            } else {
              e.preventDefault();
              this.syncScroll = true;
              this.targetPos += e.deltaY * -1;
            }
            this.clamp();
            if (this.options.customScrollbar) {
              this.scrollbar.transform();
            }
            E.emit(C.EXTERNALSCROLL, -this.targetPos);
          });
          A(this, "onRAF", () => {
            if (this.testFps && this.options.limitLerpRate) {
              this.time = performance.now() * 0.001;
              this.delta = Math.min((this.time - this.startTime) * 60, 1);
              this.startTime = this.time;
            }
            if (!this.render) {
              return;
            }
            if (Math.abs(this.targetPos - this.currentPos) < 0.5) {
              this.currentPos = this.targetPos;
              if (this.scrolling && !this.syncScroll) {
                this.scrolling = false;
                if (this.options.customScrollbar) {
                  this.scrollbar.hide();
                }
                this.toggleIframes(true);
                E.emit(C.SCROLLEND, -this.targetPos);
              }
              if (this.syncScroll) {
                window.scrollTo(0, -this.targetPos);
                this.syncScroll = false;
              }
            } else {
              this.currentPos += (this.targetPos - this.currentPos) * this.ease * this.delta;
            }
            const e = this.horizontalScroll ? this.currentPos : 0;
            const t = this.horizontalScroll ? 0 : this.currentPos;
            this.applyTransform(e, t);
            E.emit(C.EXTERNALRAF, {
              targetPos: -this.targetPos,
              currentPos: -this.currentPos
            });
          });
          A(this, "onResize", () => {
            if (this.scrollElementsLength > 1) {
              const e = this.scrollElements[this.scrollElementsLength - 1];
              const t = window.getComputedStyle(e);
              const n = parseFloat(this.horizontalScroll ? t.marginRight : t.marginBottom);
              const i = e.getBoundingClientRect();
              const r = this.horizontalScroll ? i.right : i.bottom;
              this.scrollLength = r + n - this.currentPos;
            } else {
              this.scrollLength = this.horizontalScroll ? this.scrollElements[0].scrollWidth : this.scrollElements[0].scrollHeight;
            }
            const e = this.horizontalScroll ? o().window.w : o().window.h;
            this.maxScroll = this.scrollLength > e ? -(this.scrollLength - e) : 0;
            this.clamp();
            if (!this.firstResize) {
              this.preventResizeScroll = true;
            }
            o().body.style.height = this.scrollLength + "px";
            if (this.options.customScrollbar) {
              this.scrollbar.onResize();
            }
            this.firstResize = false;
          });
          A(this, "toggleFixedContainer", () => {
            this.containerElement.style.position = "static";
            const e = this.currentPos;
            this.applyTransform(0, 0);
            requestAnimationFrame(() => {
              this.containerElement.style.position = "fixed";
              const t = this.horizontalScroll ? e : 0;
              const n = this.horizontalScroll ? 0 : e;
              this.applyTransform(t, n);
            });
          });
          this.options = e;
          this.targetPos = this.currentPos = this.prevScrollPos = this.maxScroll = 0;
          this.enabled = false;
          this.render = false;
          this.scrolling = false;
          this.syncScroll = false;
          this.horizontalScroll = false;
          this.firstResize = true;
          this.preventResizeScroll = false;
          this.ease = o().isTouch ? this.options.touchEase : this.options.ease;
          this.originalScrollbarSetting = this.options.customScrollbar;
          this.testFps = true;
          this.delta = 1;
          this.time = this.startTime = performance.now();
          this.setElements();
          if (o().isTouch) {
            this.options.customScrollbar = false;
            if (this.options.touchScrollType === "transform") {
              this.setupSmoothScroll();
            } else if (this.options.touchScrollType === "scrollTop") {
              document.documentElement.classList.add("asscroll-touch");
              this.addTouchStyles();
              E.on("scroll", this.containerElement, e => {
                E.emit(C.INTERNALSCROLL, {
                  event: e
                });
              }, {
                passive: true
              });
            }
          } else {
            this.setupSmoothScroll();
          }
          this.addEvents();
        }
        setElements() {
          this.containerElement = typeof this.options.containerElement == "string" ? document.querySelector(this.options.containerElement) : this.options.containerElement;
          if (this.containerElement === null) {
            console.error("ASScroll: could not find container element");
          }
          this.containerElement.setAttribute("asscroll-container", "");
          this.scrollElements = typeof this.options.scrollElements == "string" ? document.querySelectorAll(this.options.scrollElements) : this.options.scrollElements;
          if (this.scrollElements.length) {
            this.scrollElements = [...this.scrollElements];
          }
          this.scrollElements = this.scrollElements.length ? this.scrollElements : [this.containerElement.firstElementChild];
          this.scrollElementsLength = this.scrollElements.length;
          this.scrollElements.forEach(e => e.setAttribute("asscroll", ""));
        }
        setupSmoothScroll() {
          Object.assign(this.containerElement.style, {
            position: "fixed",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            contain: "content"
          });
          if (this.options.customScrollbar) {
            this.scrollbar = new F(this);
          }
          E.on(C.INTERNALRAF, this.onRAF);
          E.on(C.RESIZE, this.onResize);
          if (this.options.limitLerpRate) {
            setTimeout(() => {
              this.testFps = false;
              this.delta = Math.round(this.delta * 10) * 0.1;
            }, 2000);
          }
        }
        applyTransform(e, t) {
          for (let n = 0; n < this.scrollElementsLength; n++) {
            this.scrollElements[n].style.transform = `translate3d(${e}px, ${t}px, 0px)`;
          }
        }
        enable({
          newScrollElements: e = false,
          reset: t = false,
          restore: n = false,
          horizontalScroll: i = false
        } = {}) {
          if (!this.enabled) {
            this.enabled = true;
            this.render = true;
            this.horizontalScroll = i;
            if (e) {
              this.scrollElements = e.length ? [...e] : [e];
              this.scrollElementsLength = this.scrollElements.length;
              this.scrollElements.forEach(e => e.setAttribute("asscroll", ""));
            }
            this.iframes = this.containerElement.querySelectorAll("iframe");
            if (o().isTouch && this.options.touchScrollType !== "transform") {
              o().body.style.removeProperty("height");
              this.maxScroll = -this.containerElement.scrollHeight;
              if (t) {
                this.targetPos = this.currentPos = 0;
                this.scrollTo(0, false);
              }
            } else {
              this.firstResize = true;
              if (t) {
                this.targetPos = this.currentPos = 0;
                this.applyTransform(0, 0);
              }
              this.onResize();
            }
            if (n) {
              this.scrollTo(this.prevScrollPos, false);
            }
            E.on(C.WHEEL, this.onScroll);
            E.on(C.INTERNALSCROLL, this.onScroll);
          }
        }
        disable({
          inputOnly: e = false
        } = {}) {
          if (this.enabled) {
            this.enabled = false;
            if (!e) {
              this.render = false;
            }
            E.off(C.WHEEL, this.onScroll);
            E.off(C.INTERNALSCROLL, this.onScroll);
            this.prevScrollPos = this.targetPos;
            o().body.style.height = "0px";
          }
        }
        clamp() {
          this.targetPos = Math.max(Math.min(this.targetPos, 0), this.maxScroll);
        }
        scrollTo(e, t = true) {
          this.targetPos = e;
          if (o().isTouch && this.options.touchScrollType !== "transform") {
            if (this.horizontalScroll) {
              this.containerElement.scrollTo(-this.targetPos, 0);
            } else {
              this.containerElement.scrollTo(0, -this.targetPos);
            }
          }
          this.clamp();
          this.syncScroll = true;
          if (t) {
            E.emit(C.EXTERNALSCROLL, -this.targetPos);
          }
        }
        toggleIframes(e) {
          for (let t = 0; t < this.iframes.length; t++) {
            this.iframes[t].style.pointerEvents = e ? "auto" : "none";
          }
        }
        blockScrollEvent(e) {
          e.stopPropagation();
        }
        addEvents() {
          E.on(C.MOUSEDETECTED, () => {
            if (this.options.touchScrollType !== "transform") {
              this.options.customScrollbar = this.originalScrollbarSetting;
              this.ease = this.options.ease;
              this.setupSmoothScroll();
              this.onResize();
            }
          });
          if (!o().isTouch) {
            E.on("mouseleave", document, () => {
              window.scrollTo(0, -this.targetPos);
            });
            E.on("keydown", window, e => {
              if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "PageUp" || e.key === "PageDown" || e.key === "Home" || e.key === "End" || e.key === "Tab") {
                window.scrollTo(0, -this.targetPos);
              }
              if (e.key === "Tab") {
                this.toggleFixedContainer();
              }
            });
            E.delegate("click", "a[href^=\"#\"]", this.toggleFixedContainer);
            E.delegate("wheel", this.options.blockScrollClass, this.blockScrollEvent);
          }
        }
        addTouchStyles() {
          const e = ".asscroll-touch [asscroll-container] {position:absolute;top:0;left:0;right:0;bottom:-0.1px;overflow-y: auto;} .asscroll-touch [asscroll] {margin-bottom:0.1px;}";
          const t = document.createElement("style");
          if (t.styleSheet) {
            t.styleSheet.cssText = e;
          } else {
            t.appendChild(document.createTextNode(e));
          }
          document.getElementsByTagName("head")[0].appendChild(t);
        }
      }
      function O(e, t, n) {
        if (t in e) {
          Object.defineProperty(e, t, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          e[t] = n;
        }
        return e;
      }
      const L = class {
        constructor(e = {}) {
          O(this, "update", () => {
            this.events.onRaf();
          });
          O(this, "resize", e => {
            this.events.onResize(e);
          });
          const {
            containerElement: t = "[asscroll-container]",
            scrollElements: n = "[asscroll]",
            ease: i = 0.075,
            touchEase: r = 1,
            touchScrollType: o = "none",
            scrollbarEl: s = ".asscrollbar",
            scrollbarHandleEl: a = ".asscrollbar__handle",
            customScrollbar: l = true,
            scrollbarStyles: u = true,
            disableNativeScrollbar: c = true,
            disableRaf: h = false,
            disableResize: d = false,
            limitLerpRate: f = true,
            blockScrollClass: m = ".asscroll-block"
          } = e;
          this.events = new C({
            disableRaf: h,
            disableResize: d
          });
          this.controller = new M({
            containerElement: t,
            scrollElements: n,
            ease: i,
            touchEase: r,
            customScrollbar: l,
            scrollbarEl: s,
            scrollbarHandleEl: a,
            scrollbarStyles: u,
            disableNativeScrollbar: c,
            touchScrollType: o,
            limitLerpRate: f,
            blockScrollClass: m
          });
        }
        enable(e) {
          if (e !== undefined && typeof e != "object") {
            console.warn("ASScroll: Please pass an object with your parameters. Since 2.0");
          }
          this.controller.enable(e);
        }
        disable(e) {
          if (e !== undefined && typeof e != "object") {
            console.warn("ASScroll: Please pass an object with your parameters. Since 2.0");
          }
          this.controller.disable(e);
        }
        on(e, t) {
          if (typeof t == "function") {
            if (e !== "scroll") {
              if (e !== "update") {
                if (e !== "scrollEnd") {
                  console.warn(`ASScroll: "${e}" is not a valid event`);
                } else {
                  E.on(C.SCROLLEND, t);
                }
              } else {
                E.on(C.EXTERNALRAF, t);
              }
            } else {
              E.on(C.EXTERNALSCROLL, t);
            }
          } else {
            console.error("ASScroll: Function not provided as second parameter");
          }
        }
        off(e, t) {
          if (typeof t == "function") {
            if (e !== "scroll") {
              if (e !== "update") {
                if (e !== "scrollEnd") {
                  console.warn(`ASScroll: "${e}" is not a valid event`);
                } else {
                  E.off(C.SCROLLEND, t);
                }
              } else {
                E.off(C.EXTERNALRAF, t);
              }
            } else {
              E.off(C.EXTERNALSCROLL, t);
            }
          } else {
            console.error("ASScroll: Function not provided as second parameter");
          }
        }
        scrollTo(e, t = true) {
          this.controller.scrollTo(-e, t);
        }
        get targetPos() {
          return -this.controller.targetPos;
        }
        get currentPos() {
          return -this.controller.currentPos;
        }
        set currentPos(e) {
          this.controller.targetPos = this.controller.currentPos = -e;
        }
        get maxScroll() {
          return -this.controller.maxScroll;
        }
        get containerElement() {
          return this.controller.containerElement;
        }
        get scrollElements() {
          return this.controller.scrollElements;
        }
        get isHorizontal() {
          return this.controller.horizontalScroll;
        }
        get scrollPos() {}
        get smoothScrollPos() {}
        onRaf() {}
        onResize() {}
      };
    })();
    return i = i.default;
  })();
};
module.exports = t();