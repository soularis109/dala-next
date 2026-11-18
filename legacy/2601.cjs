require("./3948.cjs");
require("./285.cjs");
var i = require("./1138.cjs");
var r = require("./7542.cjs");
var o = r;
const s = window.navigator.userAgent;
const a = o(s);
const l = s.match(/(iPad)/) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
var u = {
  html: document.documentElement,
  body: document.body,
  window: {
    w: window.innerWidth,
    h: window.innerHeight,
    dpr: window.devicePixelRatio
  },
  mq: {
    smMax: window.matchMedia("(max-width: 767px)"),
    xs: window.matchMedia("(min-width: 415px)"),
    sm: window.matchMedia("(min-width: 768px)"),
    md: window.matchMedia("(min-width: 1024px)"),
    lg: window.matchMedia("(min-width: 1366px)"),
    xlg: window.matchMedia("(min-width: 1921px)"),
    "4k": window.matchMedia("(min-width: 3840px)")
  },
  pointer: {
    default: new i.F(),
    gl: new i.F(),
    glNormalized: new i.F(),
    isDragging: false
  },
  components: {},
  keys: {
    UP: 38,
    DOWN: 40,
    ENTER: 13,
    ESC: 27,
    HOME: 36,
    END: 35
  },
  cookieNoticeAccepted: false,
  sectionName: "home",
  sectionIndex: 0,
  sectionProgress: 0,
  isTablet: l,
  isMobile: a.features.mobile && !l,
  isDesktop: !a.features.mobile && !l,
  ASS: null,
  AssetLoader: null,
  enableLogs: new URLSearchParams(window.location.search).has("logs")
};
function c() {
  if (!(this instanceof c)) {
    return new c();
  }
  this.size = 0;
  this.uid = 0;
  this.selectors = [];
  this.selectorObjects = {};
  this.indexes = Object.create(this.indexes);
  this.activeIndexes = [];
}
var h = window.document.documentElement;
var d = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector;
c.prototype.matchesSelector = function (e, t) {
  return d.call(e, t);
};
c.prototype.querySelectorAll = function (e, t) {
  return t.querySelectorAll(e);
};
c.prototype.indexes = [];
var f = /^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
c.prototype.indexes.push({
  name: "ID",
  selector: function (e) {
    var t;
    if (t = e.match(f)) {
      return t[0].slice(1);
    }
  },
  element: function (e) {
    if (e.id) {
      return [e.id];
    }
  }
});
var m = /^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
c.prototype.indexes.push({
  name: "CLASS",
  selector: function (e) {
    var t;
    if (t = e.match(m)) {
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
var p;
var v = /^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
c.prototype.indexes.push({
  name: "TAG",
  selector: function (e) {
    var t;
    if (t = e.match(v)) {
      return t[0].toUpperCase();
    }
  },
  element: function (e) {
    return [e.nodeName.toUpperCase()];
  }
});
c.prototype.indexes.default = {
  name: "UNIVERSAL",
  selector: function () {
    return true;
  },
  element: function () {
    return [true];
  }
};
p = typeof window.Map == "function" ? window.Map : function () {
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
var g = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;
function x(e, t) {
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
    g.exec("");
    if ((r = g.exec(u)) && (u = r[3], r[2] || !u)) {
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
function y(e, t) {
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
function D(e, t) {
  return e.id - t.id;
}
c.prototype.logDefaultIndexUsed = function () {};
c.prototype.add = function (e, t) {
  var n;
  var i;
  var r;
  var o;
  var s;
  var a;
  var l;
  var u;
  var c = this.activeIndexes;
  var h = this.selectors;
  var d = this.selectorObjects;
  if (typeof e == "string") {
    d[(n = {
      id: this.uid++,
      selector: e,
      data: t
    }).id] = n;
    l = x(this.indexes, e);
    i = 0;
    for (; i < l.length; i++) {
      o = (u = l[i]).key;
      if (!(s = y(c, r = u.index))) {
        (s = Object.create(r)).map = new p();
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
    h.push(e);
  }
};
c.prototype.remove = function (e, t) {
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
    var m = arguments.length === 1;
    n = x(this.indexes, e);
    r = 0;
    for (; r < n.length; r++) {
      i = n[r];
      o = c.length;
      while (o--) {
        a = c[o];
        if (i.index.isPrototypeOf(a)) {
          if (l = a.map.get(i.key)) {
            for (s = l.length; s--;) {
              if ((u = l[s]).selector === e && (!!m || u.data === t)) {
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
c.prototype.queryAll = function (e) {
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
  return c.sort(D);
};
c.prototype.matches = function (e) {
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
  return m.sort(D);
};
const b = {};
const _ = {};
const w = ["mouseenter", "mouseleave", "pointerenter", "pointerleave"];
function S(e) {
  if (_[e] === undefined) {
    _[e] = [];
  }
}
function E(e) {
  if (typeof e == "string") {
    return document.querySelectorAll(e);
  } else {
    return e;
  }
}
function P(e) {
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
  }(b[e.type], e.target);
  if (t.length) {
    for (let n = 0; n < t.length; n++) {
      for (let i = 0; i < t[n].stack.length; i++) {
        if (w.indexOf(e.type) !== -1) {
          C(e, t[n].delegatedTarget);
          if (e.target === t[n].delegatedTarget) {
            t[n].stack[i].data(e);
          }
        } else {
          C(e, t[n].delegatedTarget);
          t[n].stack[i].data(e);
        }
      }
    }
  }
}
function C(e, t) {
  Object.defineProperty(e, "currentTarget", {
    configurable: true,
    enumerable: true,
    get: () => t
  });
}
function T(e) {
  return JSON.parse(JSON.stringify(e));
}
var F = new class {
  bindAll(e, t = Object.getOwnPropertyNames(Object.getPrototypeOf(e))) {
    for (let n = 0; n < t.length; n++) {
      e[t[n]] = e[t[n]].bind(e);
    }
  }
  on(e, t, n, i) {
    const r = e.split(" ");
    for (let e = 0; e < r.length; e++) {
      if (typeof t != "function" || n !== undefined) {
        if (t.nodeType && t.nodeType === 1 || t === window || t === document) {
          t.addEventListener(r[e], n, i);
        } else {
          t = E(t);
          for (let o = 0; o < t.length; o++) {
            t[o].addEventListener(r[e], n, i);
          }
        }
      } else {
        S(r[e]);
        _[r[e]].push(t);
      }
    }
  }
  delegate(e, t, n) {
    const i = e.split(" ");
    for (let e = 0; e < i.length; e++) {
      let r = b[i[e]];
      if (r === undefined) {
        r = new c();
        b[i[e]] = r;
        if (w.indexOf(i[e]) !== -1) {
          document.addEventListener(i[e], P, true);
        } else {
          document.addEventListener(i[e], P);
        }
      }
      r.add(t, n);
    }
  }
  off(e, t, n, i) {
    const r = e.split(" ");
    for (let e = 0; e < r.length; e++) {
      if (t === undefined) {
        _[r[e]] = [];
        continue;
      }
      if (typeof t == "function") {
        S(r[e]);
        for (let n = 0; n < _[r[e]].length; n++) {
          if (_[r[e]][n] === t) {
            _[r[e]].splice(n, 1);
          }
        }
        continue;
      }
      const o = b[r[e]];
      if (o === undefined || (o.remove(t, n), o.size !== 0)) {
        if (t.removeEventListener === undefined) {
          t = E(t);
          for (let o = 0; o < t.length; o++) {
            t[o].removeEventListener(r[e], n, i);
          }
        } else {
          t.removeEventListener(r[e], n, i);
        }
      } else {
        delete b[r[e]];
        if (w.indexOf(r[e]) !== -1) {
          document.removeEventListener(r[e], P, true);
        } else {
          document.removeEventListener(r[e], P);
        }
      }
    }
  }
  emit(e, ...t) {
    (function (e, t) {
      if (_[e]) {
        for (let n = 0; n < _[e].length; n++) {
          _[e][n](...t);
        }
      }
    })(e, t);
  }
  debugDelegated() {
    return T(b);
  }
  debugBus() {
    return T(_);
  }
}();
var A = require("./2642.cjs");
function M(e, t, n) {
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
class O {
  static detectTouchDevice() {
    if ("ontouchstart" in document.documentElement) {
      u.isTouch = true;
      u.html.classList.add("is-touch");
    }
  }
  static enableMousemove() {
    if (O.enabled.mousemove === undefined) {
      O.enabled.mousemove = true;
      F.on("mousemove touchmove", window, O.handleMousemove, {
        passive: true
      });
    }
  }
  static enableResize(e = false) {
    if (O.enabled.resize === undefined) {
      O.enabled.resize = true;
      if (e) {
        F.on("resize", window, function (e, t) {
          let n = null;
          return function () {
            clearTimeout(n);
            const i = arguments;
            const r = this;
            n = setTimeout(function () {
              e.apply(r, i);
            }, t);
          };
        }(e => O.handleResize(e), e));
      } else {
        F.on("resize", window, O.handleResize);
      }
    }
  }
  static enableRAF(e = false) {
    if (O.enabled.raf === undefined) {
      O.enabled.raf = true;
      if (e) {
        O.currentRafId = null;
        A.ZP.ticker.add(O.handleRaf);
      } else {
        O.currentRafId = window.requestAnimationFrame(O.handleRaf);
      }
    }
  }
  static enableDrag() {
    if (O.enabled.drag === undefined) {
      O.enabled.drag = true;
      F.on("mousedown touchstart", window, O.handleMousedown);
      F.on("mouseup touchend", window, O.handleMouseup);
    }
  }
  static handleMousemove(e) {
    u.pointer.default.x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    u.pointer.default.y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    u.pointer.gl.set(u.pointer.default.x - u.window.w / 2, -u.pointer.default.y + u.window.h / 2);
    u.pointer.glNormalized.set(u.pointer.default.x / u.window.w * 2 - 1, -u.pointer.default.y / u.window.h * 2 + 1);
    if (e.changedTouches) {
      F.emit(O.TOUCHMOVE, e);
    } else {
      F.emit(O.MOUSEMOVE, e);
    }
    if (u.pointer.isDragging) {
      const t = {
        deltaX: u.pointer.default.x - O.dragInfo.px,
        deltaY: u.pointer.default.y - O.dragInfo.py,
        startX: O.dragInfo.x,
        startY: O.dragInfo.y
      };
      F.emit(e.changedTouches ? O.TOUCHDRAG : O.MOUSEDRAG, e, t);
      O.dragInfo.px = u.pointer.default.x;
      O.dragInfo.py = u.pointer.default.y;
    }
  }
  static handleMousedown(e) {
    O.handleMousemove(e);
    u.pointer.isDragging = true;
    O.dragInfo.x = O.dragInfo.px = u.pointer.default.x;
    O.dragInfo.y = O.dragInfo.py = u.pointer.default.y;
    F.emit(O.POINTERDOWN, e);
  }
  static handleMouseup(e) {
    u.pointer.isDragging = false;
    O.handleMousemove(e);
    O.dragInfo = {
      x: 0,
      y: 0,
      px: 0,
      py: 0
    };
    F.emit(O.POINTERUP, e);
  }
  static handleResize(e) {
    u.window.w = window.innerWidth;
    u.window.h = window.innerHeight;
    u.html.style.setProperty("--vh", `${u.window.h * 0.01}px`);
    F.emit(O.RESIZE, e);
  }
  static handleRaf(e) {
    O.previousTime = O.currentTime;
    O.currentTime = e;
    O.deltaTime = O.currentTime - O.previousTime;
    F.emit(O.RAF, e);
    if (O.currentRafId !== null) {
      O.currentRafId = window.requestAnimationFrame(O.handleRaf);
    }
  }
}
M(O, "MOUSEMOVE", "global:mousemove");
M(O, "TOUCHMOVE", "global:touchmove");
M(O, "MOUSEDRAG", "global:mousedrag");
M(O, "TOUCHDRAG", "global:touchdrag");
M(O, "POINTERMOVE", `${O.MOUSEMOVE} ${O.TOUCHMOVE}`);
M(O, "POINTERDRAG", `${O.TOUCHDRAG} ${O.MOUSEDRAG}`);
M(O, "POINTERDOWN", "global:pointerdown");
M(O, "POINTERUP", "global:pointerup");
M(O, "RAF", "global:raf");
M(O, "RESIZE", "global:resize");
M(O, "currentRafId", null);
M(O, "currentTime", null);
M(O, "previousTime", null);
M(O, "deltaTime", null);
M(O, "enabled", {});
M(O, "dragInfo", {
  x: 0,
  y: 0,
  px: 0,
  py: 0
});
class L {
  constructor() {
    var e;
    var t;
    var n;
    n = e => {
      let t = 0;
      const n = this.callbacks.length;
      for (; t < n; t++) {
        this.callbacks[t].cb(e);
      }
    };
    if ((t = "fire") in (e = this)) {
      Object.defineProperty(e, t, {
        value: n,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      e[t] = n;
    }
    this.callbacks = [];
    F.on("global:raf", this.fire);
  }
  add(e, t) {
    this.callbacks.push({
      index: t,
      cb: e
    });
    this.callbacks.sort(this.sort);
  }
  remove(e) {
    for (let t = 0; t < this.callbacks.length; t++) {
      if (this.callbacks[t].cb === e) {
        this.callbacks.splice(t, 1);
      }
    }
  }
  sort(e, t) {
    if (e.index > t.index) {
      return 1;
    } else {
      return -1;
    }
  }
}
var I = require("./4212.cjs");
var R = I;
function k(e, t, n) {
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
class z {
  static withScrollTrigger(e, t) {
    this.scrollTrigger = e;
    this.gsap ||= t;
    if (this.gsap) {
      this.gsap.registerPlugin(e);
    }
    return this;
  }
  static useGsapRaf(e) {
    this.params.disableRaf = true;
    this.usesGsapRaf = true;
    this.gsap ||= e;
    return this;
  }
  static config(e) {
    Object.assign(this.params, e);
    return this;
  }
  static create() {
    if (this.params.disableResize === undefined && (O.enabled.resize || this.scrollTrigger)) {
      this.params.disableResize = true;
    }
    const e = new R(this.params);
    if (this.usesGsapRaf) {
      this.gsap.ticker.add(e.update);
    }
    if (this.params.disableResize === true && O.enabled.resize && !this.scrollTrigger) {
      F.on(O.RESIZE, () => {
        e.resize({
          width: u.window.w,
          height: u.window.h
        });
      });
    }
    if (this.scrollTrigger) {
      this.configureScrollTrigger(e);
    }
    return e;
  }
  static configureScrollTrigger(e) {
    this.scrollTrigger.addEventListener("refresh", () => {
      e.resize({
        width: u.window.w,
        height: u.window.h
      });
    });
    this.scrollTrigger.defaults({
      scroller: e.containerElement
    });
    this.scrollTrigger.scrollerProxy(e.containerElement, {
      scrollTop(t) {
        if (arguments.length) {
          return e.scrollTo(t);
        } else {
          return e.currentPos;
        }
      },
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: u.window.w,
        height: u.window.h
      })
    });
  }
}
k(z, "params", {});
k(z, "gsap", null);
k(z, "usesGsapRaf", false);
k(z, "scrollTrigger", null);
var U = require("./7082.cjs");
require("./5306.cjs");
require("./5069.cjs");
var j = /([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;
function B(e) {
  var t = e.nodeType;
  var n = "";
  if (t === 1 || t === 9 || t === 11) {
    if (typeof e.textContent == "string") {
      return e.textContent;
    }
    for (e = e.firstChild; e; e = e.nextSibling) {
      n += B(e);
    }
  } else if (t === 3 || t === 4) {
    return e.nodeValue;
  }
  return n;
}
var N;
var V;
var G;
var W = /(?:\r|\n|\t\t)/g;
var H = /(?:\s\s+)/g;
function q(e) {
  return V.getComputedStyle(e);
}
var Y = Array.isArray;
var Z = [].slice;
function $(e, t) {
  var n;
  if (Y(e)) {
    return e;
  } else if ((n = typeof e) == "string" && !t && e) {
    return Z.call(N.querySelectorAll(e), 0);
  } else if (e && n === "object" && "length" in e) {
    return Z.call(e, 0);
  } else if (e) {
    return [e];
  } else {
    return [];
  }
}
function X(e) {
  return e.position === "absolute" || e.absolute === true;
}
function K(e, t) {
  var n;
  for (var i = t.length; --i > -1;) {
    n = t[i];
    if (e.substr(0, n.length) === n) {
      return n.length;
    }
  }
}
function Q(e = "", t) {
  var n = ~e.indexOf("++");
  var i = 1;
  if (n) {
    e = e.split("++").join("");
  }
  return function () {
    return "<" + t + " style='position:relative;display:inline-block;'" + (e ? " class='" + e + (n ? i++ : "") + "'>" : ">");
  };
}
var J = function e(t, n, i) {
  var r = t.nodeType;
  if (r === 1 || r === 9 || r === 11) {
    for (t = t.firstChild; t; t = t.nextSibling) {
      e(t, n, i);
    }
  } else if (r === 3 || r === 4) {
    t.nodeValue = t.nodeValue.split(n).join(i);
  }
};
function ee(e, t) {
  for (var n = t.length; --n > -1;) {
    e.push(t[n]);
  }
}
function te(e, t, n) {
  var i;
  for (; e && e !== t;) {
    if (i = e._next || e.nextSibling) {
      return i.textContent.charAt(0) === n;
    }
    e = e.parentNode || e._parent;
  }
}
var ne = function e(t) {
  var n;
  var i;
  var r = $(t.childNodes);
  var o = r.length;
  for (n = 0; n < o; n++) {
    if ((i = r[n])._isSplit) {
      e(i);
    } else {
      if (n && i.previousSibling.nodeType === 3) {
        i.previousSibling.nodeValue += i.nodeType === 3 ? i.nodeValue : i.firstChild.nodeValue;
      } else if (i.nodeType !== 3) {
        t.insertBefore(i.firstChild, i);
      }
      t.removeChild(i);
    }
  }
};
function ie(e, t) {
  return parseFloat(t[e]) || 0;
}
function re(e, t, n, i, r, o, s) {
  var a;
  var l;
  var u;
  var c;
  var h;
  var d;
  var f;
  var m;
  var p;
  var v;
  var g;
  var x;
  var y = q(e);
  var D = ie("paddingLeft", y);
  var b = -999;
  var _ = ie("borderBottomWidth", y) + ie("borderTopWidth", y);
  var w = ie("borderLeftWidth", y) + ie("borderRightWidth", y);
  var S = ie("paddingTop", y) + ie("paddingBottom", y);
  var E = ie("paddingLeft", y) + ie("paddingRight", y);
  var P = ie("fontSize", y) * 0.2;
  var C = y.textAlign;
  var T = [];
  var F = [];
  var A = [];
  var M = t.wordDelimiter || " ";
  var O = t.tag ? t.tag : t.span ? "span" : "div";
  var L = t.type || t.split || "chars,words,lines";
  var I = r && ~L.indexOf("lines") ? [] : null;
  var R = ~L.indexOf("words");
  var k = ~L.indexOf("chars");
  var z = X(t);
  var U = t.linesClass;
  var j = ~(U || "").indexOf("++");
  var B = [];
  if (j) {
    U = U.split("++").join("");
  }
  u = (l = e.getElementsByTagName("*")).length;
  h = [];
  a = 0;
  for (; a < u; a++) {
    h[a] = l[a];
  }
  if (I || z) {
    for (a = 0; a < u; a++) {
      if ((d = (c = h[a]).parentNode === e) || z || k && !R) {
        x = c.offsetTop;
        if (I && d && Math.abs(x - b) > P && (c.nodeName !== "BR" || a === 0)) {
          f = [];
          I.push(f);
          b = x;
        }
        if (z) {
          c._x = c.offsetLeft;
          c._y = x;
          c._w = c.offsetWidth;
          c._h = c.offsetHeight;
        }
        if (I) {
          if (c._isSplit && d || !k && d || R && d || !R && c.parentNode.parentNode === e && !c.parentNode._isSplit) {
            f.push(c);
            c._x -= D;
            if (te(c, e, M)) {
              c._wordEnd = true;
            }
          }
          if (c.nodeName === "BR" && (c.nextSibling && c.nextSibling.nodeName === "BR" || a === 0)) {
            I.push([]);
          }
        }
      }
    }
  }
  for (a = 0; a < u; a++) {
    d = (c = h[a]).parentNode === e;
    if (c.nodeName !== "BR") {
      if (z) {
        p = c.style;
        if (!R && !d) {
          c._x += c.parentNode._x;
          c._y += c.parentNode._y;
        }
        p.left = c._x + "px";
        p.top = c._y + "px";
        p.position = "absolute";
        p.display = "block";
        p.width = c._w + 1 + "px";
        p.height = c._h + "px";
      }
      if (!R && k) {
        if (c._isSplit) {
          c._next = c.nextSibling;
          c.parentNode.appendChild(c);
        } else if (c.parentNode._isSplit) {
          c._parent = c.parentNode;
          if (!c.previousSibling && c.firstChild) {
            c.firstChild._isFirst = true;
          }
          if (c.nextSibling && c.nextSibling.textContent === " " && !c.nextSibling.nextSibling) {
            B.push(c.nextSibling);
          }
          c._next = c.nextSibling && c.nextSibling._isFirst ? null : c.nextSibling;
          c.parentNode.removeChild(c);
          h.splice(a--, 1);
          u--;
        } else if (!d) {
          x = !c.nextSibling && te(c.parentNode, e, M);
          if (c.parentNode._parent) {
            c.parentNode._parent.appendChild(c);
          }
          if (x) {
            c.parentNode.appendChild(N.createTextNode(" "));
          }
          if (O === "span") {
            c.style.display = "inline";
          }
          T.push(c);
        }
      } else if (c.parentNode._isSplit && !c._isSplit && c.innerHTML !== "") {
        F.push(c);
      } else if (k && !c._isSplit) {
        if (O === "span") {
          c.style.display = "inline";
        }
        T.push(c);
      }
    } else if (I || z) {
      if (c.parentNode) {
        c.parentNode.removeChild(c);
      }
      h.splice(a--, 1);
      u--;
    } else if (!R) {
      e.appendChild(c);
    }
  }
  for (a = B.length; --a > -1;) {
    B[a].parentNode.removeChild(B[a]);
  }
  if (I) {
    if (z) {
      v = N.createElement(O);
      e.appendChild(v);
      g = v.offsetWidth + "px";
      x = v.offsetParent === e ? 0 : e.offsetLeft;
      e.removeChild(v);
    }
    p = e.style.cssText;
    e.style.cssText = "display:none;";
    while (e.firstChild) {
      e.removeChild(e.firstChild);
    }
    m = M === " " && (!z || !R && !k);
    a = 0;
    for (; a < I.length; a++) {
      f = I[a];
      (v = N.createElement(O)).style.cssText = "display:block;text-align:" + C + ";position:" + (z ? "absolute;" : "relative;");
      if (U) {
        v.className = U + (j ? a + 1 : "");
      }
      A.push(v);
      u = f.length;
      l = 0;
      for (; l < u; l++) {
        if (f[l].nodeName !== "BR") {
          c = f[l];
          v.appendChild(c);
          if (m && c._wordEnd) {
            v.appendChild(N.createTextNode(" "));
          }
          if (z) {
            if (l === 0) {
              v.style.top = c._y + "px";
              v.style.left = D + x + "px";
            }
            c.style.top = "0px";
            if (x) {
              c.style.left = c._x - x + "px";
            }
          }
        }
      }
      if (u === 0) {
        v.innerHTML = "&nbsp;";
      } else if (!R && !k) {
        ne(v);
        J(v, String.fromCharCode(160), " ");
      }
      if (z) {
        v.style.width = g;
        v.style.height = c._h + "px";
      }
      e.appendChild(v);
    }
    e.style.cssText = p;
  }
  if (z) {
    if (s > e.clientHeight) {
      e.style.height = s - S + "px";
      if (e.clientHeight < s) {
        e.style.height = s + _ + "px";
      }
    }
    if (o > e.clientWidth) {
      e.style.width = o - E + "px";
      if (e.clientWidth < o) {
        e.style.width = o + w + "px";
      }
    }
  }
  ee(n, T);
  if (R) {
    ee(i, F);
  }
  ee(r, A);
}
function oe(e, t, n, i) {
  var r;
  var o;
  var s;
  var a;
  var l;
  var u;
  var c;
  var h;
  var d = t.tag ? t.tag : t.span ? "span" : "div";
  var f = ~(t.type || t.split || "chars,words,lines").indexOf("chars");
  var m = X(t);
  var p = t.wordDelimiter || " ";
  var v = p !== " " ? "" : m ? "&#173; " : " ";
  var g = "</" + d + ">";
  var x = 1;
  var y = t.specialChars ? typeof t.specialChars == "function" ? t.specialChars : K : null;
  var D = N.createElement("div");
  var b = e.parentNode;
  b.insertBefore(D, e);
  D.textContent = e.nodeValue;
  b.removeChild(e);
  c = (r = B(e = D)).indexOf("<") !== -1;
  if (t.reduceWhiteSpace !== false) {
    r = r.replace(H, " ").replace(W, "");
  }
  if (c) {
    r = r.split("<").join("{{LT}}");
  }
  l = r.length;
  o = (r.charAt(0) === " " ? v : "") + n();
  s = 0;
  for (; s < l; s++) {
    u = r.charAt(s);
    if (y && (h = y(r.substr(s), t.specialChars))) {
      u = r.substr(s, h || 1);
      o += f && u !== " " ? i() + u + "</" + d + ">" : u;
      s += h - 1;
    } else if (u === p && r.charAt(s - 1) !== p && s) {
      o += x ? g : "";
      x = 0;
      while (r.charAt(s + 1) === p) {
        o += v;
        s++;
      }
      if (s === l - 1) {
        o += v;
      } else if (r.charAt(s + 1) !== ")") {
        o += v + n();
        x = 1;
      }
    } else if (u === "{" && r.substr(s, 6) === "{{LT}}") {
      o += f ? i() + "{{LT}}</" + d + ">" : "{{LT}}";
      s += 5;
    } else if (u.charCodeAt(0) >= 55296 && u.charCodeAt(0) <= 56319 || r.charCodeAt(s + 1) >= 65024 && r.charCodeAt(s + 1) <= 65039) {
      a = ((r.substr(s, 12).split(j) || [])[1] || "").length || 2;
      o += f && u !== " " ? i() + r.substr(s, a) + "</" + d + ">" : r.substr(s, a);
      s += a - 1;
    } else {
      o += f && u !== " " ? i() + u + "</" + d + ">" : u;
    }
  }
  e.outerHTML = o + (x ? g : "");
  if (c) {
    J(b, "{{LT}}", "<");
  }
}
var se = function e(t, n, i, r) {
  var o;
  var s;
  var a = $(t.childNodes);
  var l = a.length;
  var u = X(n);
  if (t.nodeType !== 3 || l > 1) {
    n.absolute = false;
    o = 0;
    for (; o < l; o++) {
      if ((s = a[o]).nodeType !== 3 || /\S+/.test(s.nodeValue)) {
        if (u && s.nodeType !== 3 && q(s).display === "inline") {
          s.style.display = "inline-block";
          s.style.position = "relative";
        }
        s._isSplit = true;
        e(s, n, i, r);
      }
    }
    n.absolute = u;
    t._isSplit = true;
    return;
  }
  oe(t, n, i, r);
};
var ae = function () {
  function e(e, t) {
    if (!G) {
      N = document;
      V = window;
      G = 1;
    }
    this.elements = $(e);
    this.chars = [];
    this.words = [];
    this.lines = [];
    this._originals = [];
    this.vars = t || {};
    this.split(t);
  }
  var t = e.prototype;
  t.split = function (e) {
    if (this.isSplit) {
      this.revert();
    }
    this.vars = e = e || this.vars;
    this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
    var t;
    var n;
    var i;
    for (var r = this.elements.length, o = e.tag ? e.tag : e.span ? "span" : "div", s = Q(e.wordsClass, o), a = Q(e.charsClass, o); --r > -1;) {
      i = this.elements[r];
      this._originals[r] = i.innerHTML;
      t = i.clientHeight;
      n = i.clientWidth;
      se(i, e, s, a);
      re(i, e, this.chars, this.words, this.lines, n, t);
    }
    this.chars.reverse();
    this.words.reverse();
    this.lines.reverse();
    this.isSplit = true;
    return this;
  };
  t.revert = function () {
    var e = this._originals;
    if (!e) {
      throw "revert() call wasn't scoped properly.";
    }
    this.elements.forEach(function (t, n) {
      return t.innerHTML = e[n];
    });
    this.chars = [];
    this.words = [];
    this.lines = [];
    this.isSplit = false;
    return this;
  };
  e.create = function (t, n) {
    return new e(t, n);
  };
  return e;
}();
ae.version = "3.0.0";
var le = ae;
function ue(e, t = document) {
  const n = t.querySelectorAll(e);
  return Array.prototype.slice.call(n);
}
function ce(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    if (t) {
      i = i.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      });
    }
    n.push.apply(n, i);
  }
  return n;
}
function he(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] ?? {};
    if (t % 2) {
      ce(Object(n), true).forEach(function (t) {
        de(e, t, n[t]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(e, Object.getOwnPropertyDescriptors(n));
    } else {
      ce(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
  }
  return e;
}
function de(e, t, n) {
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
function fe(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    if (t) {
      i = i.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      });
    }
    n.push.apply(n, i);
  }
  return n;
}
function me(e, t, n) {
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
var pe = {
  splitCharsWipeUpIn: {
    name: "splitCharsWipeUpIn",
    extendTimeline: true,
    effect: (e, t) => {
      const n = [];
      const i = [];
      if (t.children) {
        for (let r = 0; r < e.length; r++) {
          const o = new le(e[r].querySelectorAll(t.children), {
            type: "lines",
            linesClass: "split-line js-split-line"
          });
          n.push(o);
          i.push(o.lines);
        }
        delete t.children;
      } else {
        const t = new le(e, {
          type: "lines",
          linesClass: "split-line js-split-line"
        });
        n.push(t);
        i.push(t.lines);
      }
      const r = [];
      for (let e = 0; e < i.length; e++) {
        for (let t = 0; t < i[e].length; t++) {
          const n = i[e][t].innerHTML;
          const o = document.createElement("div");
          o.innerHTML = n;
          i[e][t].style.overflow = "hidden";
          i[e][t].innerHTML = "";
          i[e][t].appendChild(o);
          r.push(o);
        }
      }
      const o = [];
      const s = [];
      const a = [];
      for (let e = 0; e < i[0].length; e++) {
        const t = new le(i[e], {
          type: "chars",
          charsClass: "js-chars"
        });
        n.push(t);
        o.push(t.chars);
        const r = ue(".js-chars", i[0][e]);
        let a;
        a = e > 0 ? r.length + s[e - 1] : r.length;
        s.push(a);
      }
      t.duration = t.duration || 1.5;
      t.delay = t.delay || 0;
      for (let e = 0; e < o[0].length; e++) {
        const n = e + 1;
        const i = s.reduce(function (e, t) {
          if (e >= n) {
            return e;
          } else {
            return t;
          }
        });
        const r = s.indexOf(i) * 0.035 + e * 0.025 + t.delay;
        a.push(r);
      }
      return A.ZP.from(o[0], he(he({}, t), {}, {
        stagger: function (e) {
          return a[e];
        }
      }));
    },
    defaults: {
      y: "100%",
      ease: "expo.out"
    }
  },
  splitTextRotateIn: {
    name: "splitTextRotateIn",
    extendTimeline: true,
    effect: (e, t) => {
      const n = [];
      const i = [];
      if (t.children) {
        for (let r = 0; r < e.length; r++) {
          const o = new le(e[r].querySelectorAll(t.children), {
            type: "lines"
          });
          n.push(o);
          i.push(o.lines);
        }
        delete t.children;
      } else {
        const t = new le(e, {
          type: "lines"
        });
        n.push(t);
        i.push(t.lines);
      }
      const r = [];
      for (let e = 0; e < i.length; e++) {
        for (let t = 0; t < i[e].length; t++) {
          const n = i[e][t].innerHTML;
          const o = document.createElement("div");
          o.innerHTML = n;
          i[e][t].style.overflow = "hidden";
          i[e][t].innerHTML = "";
          i[e][t].appendChild(o);
          r.push(o);
        }
      }
      const o = A.ZP.from(r, function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t] ?? {};
          if (t % 2) {
            fe(Object(n), true).forEach(function (t) {
              me(e, t, n[t]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(e, Object.getOwnPropertyDescriptors(n));
          } else {
            fe(Object(n)).forEach(function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
            });
          }
        }
        return e;
      }({
        rotate: t.rotation
      }, t));
      o._onResize = () => {
        for (let e = 0; e < n.length; e++) {
          n[e].revert();
        }
      };
      return o;
    },
    defaults: {
      duration: 1.5,
      y: "120%",
      transformOrigin: "0 0",
      stagger: {
        each: 0.1,
        ease: "power1.in"
      },
      ease: "power3.out"
    },
    resize: true
  }
};
function ve(e) {
  return Function("\"use strict\";return (" + e + ")")();
}
var ge = require("./2043.cjs");
function xe(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    if (t) {
      i = i.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      });
    }
    n.push.apply(n, i);
  }
  return n;
}
function ye(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] ?? {};
    if (t % 2) {
      xe(Object(n), true).forEach(function (t) {
        De(e, t, n[t]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(e, Object.getOwnPropertyDescriptors(n));
    } else {
      xe(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
  }
  return e;
}
function De(e, t, n) {
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
class be {
  constructor() {
    De(this, "onResize", () => {
      for (let e = 0; e < this.resizeTweens.length; e++) {
        const t = this.resizeTweens[e].tween.progress();
        if (this.resizeTweens[e].tween.scrollTrigger) {
          this.resizeTweens[e].tween.scrollTrigger.kill();
        }
        this.resizeTweens[e].tween.kill();
        if (this.resizeTweens[e].tween._onResize) {
          this.resizeTweens[e].tween._onResize();
        }
        if (t === 0) {
          this.resizeTweens[e].tween = A.ZP.effects[this.resizeTweens[e].preset](this.resizeTweens[e].tweenEl, ye({}, this.resizeTweens[e].from));
        }
      }
    });
    this.fromAttr = "animate-from";
    this.toAttr = "animate-to";
    this.mqAttr = "animate-mq";
    this.els = [];
    this.resizeTweens = [];
    this.mirrorGlProps = {
      x: "position.x",
      y: "position.y",
      z: "position.z",
      rotationX: "rotation.x",
      rotationY: "rotation.y",
      rotationZ: "rotation.z"
    };
    F.on(O.RESIZE, this.onResize);
    this.registerGsapPlugins();
    this.registerGsapEffects();
  }
  build() {
    const e = document.querySelectorAll(`[${this.fromAttr}], [${this.toAttr}]`);
    const t = e.length;
    for (let n = 0; n < t; n++) {
      if (e[n].attributes[this.mqAttr] && e[n].attributes[this.mqAttr].value !== "" && !u.mq[e[n].attributes[this.mqAttr].value].matches) {
        continue;
      }
      if (e[n].attributes[this.fromAttr] && e[n].attributes[this.fromAttr].value === "" && e[n].attributes[this.toAttr] && e[n].attributes[this.toAttr].value === "") {
        continue;
      }
      let t = {
        uniforms: {}
      };
      const i = {
        ease: "none",
        duration: 1.5,
        scrollTrigger: {
          trigger: e[n],
          horizontal: u.ASS.isHorizontal,
          once: true
        }
      };
      const r = e[n].getBoundingClientRect();
      let o;
      let s = e[n];
      let a = false;
      let l = false;
      if (e[n].attributes[this.fromAttr] && (a = ve(`{${e[n].attributes[this.fromAttr].value}}`), e[n].hasAttribute("dom2webgl"))) {
        const e = this.parseGlPropsFrom(a, t, r);
        a = e.from;
        t = e.glProps;
      }
      if (e[n].attributes[this.toAttr]) {
        l = ye(ye({}, i), ve(`{${e[n].attributes[this.toAttr].value}}`));
        if (e[n].hasAttribute("dom2webgl")) {
          l = this.parseGlPropsTo(l, r);
        }
      }
      if (l.stagger || a.stagger) {
        s = e[n].children;
      }
      i.scrollTrigger = Object.assign(i.scrollTrigger, a.scrollTrigger);
      delete a.scrollTrigger;
      if (!s.length && s.hasAttribute("dom2webgl")) {
        s._glProps ||= t;
        if (i.scrollTrigger.pin) {
          this.updateGlPropsPinPos(i, s);
          i.scrollTrigger.onUpdate = () => {
            this.updateGlPropsPinPos(i, s);
          };
        }
      }
      if (a && a.preset) {
        const e = a.preset;
        delete a.preset;
        if (pe[e].defaults.scrollTrigger) {
          i.scrollTrigger = Object.assign(i.scrollTrigger, pe[e].defaults.scrollTrigger);
        }
        a.scrollTrigger = i.scrollTrigger;
        const t = ye({}, a);
        o = A.ZP.effects[e](s, a);
        if (pe[e].resize) {
          this.resizeTweens.push({
            tween: o,
            preset: e,
            tweenEl: s,
            from: t
          });
        }
      } else if (a && l) {
        l = Object.assign(i, l);
        o = A.ZP.fromTo(s, a, l);
      } else if (!l && a) {
        a = Object.assign(i, a);
        o = A.ZP.from(s, a);
      } else {
        l = Object.assign(i, l);
        o = A.ZP.to(s, l);
      }
      if (o.scrollTrigger) {
        o.scrollTrigger.disable();
      }
      o.pause();
      this.els.push({
        el: e[n],
        tween: o
      });
    }
  }
  enable() {
    for (let e = 0; e < this.els.length; e++) {
      if (this.els[e].tween.scrollTrigger) {
        this.els[e].tween.scrollTrigger.enable();
        if (this.els[e].tween.scrollTrigger && this.els[e].tween.scrollTrigger.isActive && !this.els[e].tween.scrollTrigger.vars.scrub) {
          this.els[e].tween.restart(true);
        }
      }
    }
  }
  parseGlPropsFrom(e, t, n) {
    e.glProps = {};
    if (Object.prototype.hasOwnProperty.call(e, "uniforms")) {
      e.glProps.uniforms = ye({}, e.uniforms);
      t.uniforms = ye({}, e.uniforms);
      delete e.uniforms;
    }
    for (const i in e) {
      if (Object.prototype.hasOwnProperty.call(this.mirrorGlProps, i)) {
        const r = this.parseMirroredValue(i, e[i], n);
        e.glProps[this.mirrorGlProps[i]] = r;
        t[this.mirrorGlProps[i]] = r;
      }
    }
    return {
      from: e,
      glProps: t
    };
  }
  parseGlPropsTo(e, t) {
    e.glProps = {};
    if (Object.prototype.hasOwnProperty.call(e, "uniforms")) {
      e.glProps.uniforms = ye({}, e.uniforms);
      delete e.uniforms;
    }
    for (const n in e) {
      if (Object.prototype.hasOwnProperty.call(this.mirrorGlProps, n)) {
        const i = this.parseMirroredValue(n, e[n], t);
        e.glProps[this.mirrorGlProps[n]] = i;
      }
    }
    return e;
  }
  parseMirroredValue(e, t, n) {
    if (typeof t == "string" && t.includes("%")) {
      t = (e === "x" ? n.width : n.height) * parseFloat(t) * 0.01;
    }
    if (e.includes("rotation")) {
      t = ge.Id(t);
    }
    return t;
  }
  updateGlPropsPinPos(e, t) {
    if (e.scrollTrigger.horizontal) {
      t._glProps["position.x"] = A.ZP.getProperty(t, "x");
    } else {
      t._glProps["position.y"] = A.ZP.getProperty(t, "y");
    }
  }
  registerGsapEffects() {
    for (const e in pe) {
      A.ZP.registerEffect(pe[e]);
    }
  }
  registerGsapPlugins() {
    A.ZP.registerPlugin(U.Z);
    A.ZP.registerPlugin({
      name: "glProps",
      init(e, t) {
        for (const n in t) {
          if (typeof t[n] != "object") {
            this.add(e._glProps, n, e._glProps[n], t[n]);
          } else {
            for (const i in t[n]) {
              this.add(e._glProps[n], i, e._glProps[n][i], t[n][i]);
              this._props.push(i);
            }
          }
        }
      }
    });
  }
  destroy() {
    for (let e = 0; e < this.els.length; e++) {
      if (this.els[e].tween.scrollTrigger) {
        this.els[e].tween.scrollTrigger.kill(false);
      }
      if (this.els[e].tween) {
        this.els[e].tween.kill();
      }
    }
    this.els = [];
    this.resizeTweens = [];
  }
}
var _e = require("./3360.cjs");
var we = require("./9398.cjs");
var Se = require("./2854.cjs");
var Ee = require("./5643.cjs");
var Pe = require("./3278.cjs");
function Ce(e, t, n) {
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
class Te {
  constructor(e = "AssetsProgress") {
    Ce(this, "load", ({
      element: e = document.body,
      progress: t = true
    } = {}) => {
      if (e) {
        this.element = e;
        this.addFonts();
        this.addMedia();
      }
      let n = 0;
      if (t) {
        for (let e = 0; e < this.promisesToLoad.length; e++) {
          this.promisesToLoad[e].then(() => {
            n++;
            this.progressCallback(n * 100 / this.promisesToLoad.length);
          });
        }
      }
      this.loaded = new Promise(e => {
        Promise.all(this.promisesToLoad).then(() => {
          this.reset();
          e();
        });
      });
      return this.loaded;
    });
    Ce(this, "progressCallback", e => {
      F.emit(this.progressEventName, {
        percent: Math.ceil(e)
      });
    });
    Ce(this, "add", e => {
      this.promisesToLoad.push(e);
      return e;
    });
    Ce(this, "addMedia", () => {
      const e = this.element.querySelectorAll("img:not([loading=\"lazy\"])");
      for (let t = 0; t < e.length; t++) {
        this.addImage(e[t]);
      }
      const t = this.element.querySelectorAll("video:not([lazy])");
      for (let e = 0; e < t.length; e++) {
        this.add(new Promise(n => {
          t[e].crossOrigin = "";
          t[e].addEventListener("canplaythrough", function i() {
            t[e].removeEventListener("canplaythrough", i);
            t[e].addEventListener("timeupdate", function i() {
              t[e].removeEventListener("timeupdate", i);
              t[e].pause();
              n();
            });
          });
          t[e].addEventListener("error", n);
          if (t[e].src === "" && t[e].dataset.src) {
            t[e].src = t[e].dataset.src;
          }
          t[e].load();
          t[e].play();
        }));
      }
    });
    Ce(this, "addFonts", () => {
      if (document.fonts) {
        this.add(document.fonts.ready);
      }
      if (!this.fontsLoaded && window.Typekit) {
        this.add(new Promise(e => {
          window.Typekit.load({
            active: () => {
              this.fontsLoaded = true;
              e();
            }
          });
        }));
      }
    });
    Ce(this, "loadJson", e => {
      this.jsons[e] ||= this.add(new Promise((t, n) => {
        fetch(e, {
          headers: {
            "Content-Type": "application/json"
          }
        }).then(n => {
          if (!n.ok) {
            throw new Error("Network response was not ok for request: ", e);
          }
          t(n.json());
        }, n);
      }));
      return this.jsons[e];
    });
    Ce(this, "loadGltf", e => {
      this.gltfs[e] ||= this.add(new Promise((t, n) => {
        u.TaskScheduler.enqueueTask(() => {
          this.gltfLoader.load(e, e => {
            t(e);
          }, undefined, n);
        });
      }));
      return this.gltfs[e];
    });
    Ce(this, "loadTexture", e => {
      this.textures[e] ||= this.add(new Promise((t, n) => {
        this.textureLoader.load(e, e => {
          u.TaskScheduler.enqueueTask(() => {
            t(u.Gl.generateTexture(e));
          });
        }, undefined, n);
      }));
      return this.textures[e];
    });
    Ce(this, "reset", () => {
      this.promisesToLoad = [];
    });
    this.promisesToLoad = [];
    this.fontsLoaded = false;
    this.loaded = false;
    this.progressEventName = e;
    this.jsons = {};
    this.gltfs = {};
    this.textures = {};
    this.ktxTextures = {};
    this.textureLoader = new Pe.d();
    this.ktxLoader = new Ee.a();
    this.ktxLoader.setTranscoderPath(`${u.assetsUrl}basis/`);
    this.exrLoader = new _e.I();
    this.gltfLoader = new we.E();
    this.dracoLoader = new Se._();
    this.dracoLoader.setDecoderPath(`${u.assetsUrl}draco/`);
    this.gltfLoader.setDRACOLoader(this.dracoLoader);
  }
  addImage(e) {
    return this.add(new Promise(t => {
      if (e.complete && e.naturalWidth !== 0) {
        t(e);
      } else {
        e.addEventListener("load", () => {
          t(e);
        });
        e.addEventListener("error", () => {
          t(e);
        });
      }
    }));
  }
  loadKtxTexture(e) {
    this.ktxTextures[e] ||= this.add(new Promise((t, n) => {
      this.ktxLoader.load(e, e => {
        u.TaskScheduler.enqueueTask(() => {
          t(u.Gl.generateTexture(e));
        });
      }, undefined, n);
    }));
    return this.ktxTextures[e];
  }
}
require("./6337.cjs");
function Fe(e, t, n) {
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
class Ae extends IntersectionObserver {
  constructor(e = {}, t, n) {
    super((...e) => this.handler(...e), e);
    Fe(this, "handler", (e, t) => {
      for (let t = 0; t < e.length; t++) {
        for (let n = 0; n < this.els.length; n++) {
          if (this.els[n].el === e[t].target) {
            this.els[n].bcr = e[t].boundingClientRect;
            if (this.eventName) {
              F.emit(this.eventName, this.els[n]);
            }
            if (e[t].isIntersecting) {
              if (this.els[n].enter) {
                this.els[n].enter(this.els[n].el, this.els[n].params || null);
              }
              this.visibleEls[n] = this.els[n];
            } else {
              if (this.els[n].leave) {
                this.els[n].leave(this.els[n].el, this.els[n].params || null);
              }
              this.visibleEls[n] = false;
            }
          }
        }
      }
      if (this.fireFirstObservation) {
        this.firstObservationFired = true;
        F.emit("firstObservation", this.els);
      }
    });
    Fe(this, "reset", () => {
      this.disconnect();
      this.els = [];
      this.visibleEls = [];
      this.firstObservationFired = false;
    });
    this.eventName = t;
    this.fireFirstObservation = n;
    this.firstObservationFired = false;
    this.els = [];
    this.visibleEls = [];
  }
}
var Me = require("./2250.cjs");
var Oe = require("./3977.cjs");
var Le = require("./1661.cjs");
var Ie = require("./6454.cjs");
var Re = require("./8478.cjs");
var ke = require("./4164.cjs");
class ze {
  constructor() {
    var e;
    var t;
    var n;
    n = e => {
      if (!e || this.resources.has(e)) {
        return e;
      }
      if (Array.isArray(e)) {
        e.forEach(e => this.track(e));
        return e;
      }
      if (e.dispose || e instanceof Re.T) {
        this.resources.add(e);
      }
      if (e instanceof Re.T) {
        this.track(e.geometry);
        this.track(e.material);
        this.track(e.children);
      } else if (e instanceof ke.F) {
        for (const t of Object.values(e)) {
          if (t instanceof Oe.x) {
            this.track(t);
          }
        }
        if (e.uniforms) {
          for (const t of Object.values(e.uniforms)) {
            if (t) {
              const e = t.value;
              if (e instanceof Oe.x || Array.isArray(e)) {
                this.track(e);
              }
            }
          }
        }
      }
      return e;
    };
    if ((t = "track") in (e = this)) {
      Object.defineProperty(e, t, {
        value: n,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      e[t] = n;
    }
    this.resources = new Set();
  }
  untrack(e) {
    if (!e || !this.resources.has(e)) {
      return e;
    }
    if (Array.isArray(e)) {
      e.forEach(e => this.untrack(e));
      return e;
    }
    this.resources.delete(e);
    if (e instanceof Re.T) {
      this.untrack(e.geometry);
      this.untrack(e.material);
      this.untrack(e.children);
    } else if (e instanceof ke.F) {
      for (const t of Object.values(e)) {
        if (t instanceof Oe.x) {
          this.untrack(t);
        }
      }
      if (e.uniforms) {
        for (const t of Object.values(e.uniforms)) {
          if (t) {
            const e = t.value;
            if (e instanceof Oe.x || Array.isArray(e)) {
              this.untrack(e);
            }
          }
        }
      }
    }
  }
  dispose() {
    for (const e of this.resources) {
      if (e instanceof Re.T && e.parent) {
        e.parent.remove(e);
      }
      if (e.dispose) {
        e.dispose();
      }
    }
    this.resources.clear();
  }
}
var Ue = require("./5553.cjs");
var je = require("./5317.cjs");
var Be = require("./6173.cjs");
function Ne(e, t, n) {
  const i = (t, n) => {
    if (t !== "style") {
      if (t !== "classList") {
        e.setAttribute(t, n === true ? t : n);
      } else {
        Ve(e, n);
      }
    } else {
      Object.assign(e.style, n);
    }
  };
  if (typeof t == "object") {
    for (const n in t) {
      if (t[n] !== false) {
        i(n, t[n]);
      } else {
        e.removeAttribute(n);
      }
    }
  } else {
    if (n === undefined) {
      return e.getAttribute(t);
    }
    if (n === false) {
      e.removeAttribute(t);
      return;
    }
    i(t, n);
  }
}
function Ve(e, t) {
  if (Array.isArray(t)) {
    e.classList.add(...t);
  } else if (typeof t != "string") {
    if (t.add) {
      Ve(e, t.add);
    }
    if (t.remove) {
      (function (e, t) {
        if (Array.isArray(t)) {
          e.classList.remove(...t);
          return;
        }
        if (typeof t == "string") {
          e.classList.remove(...t.split(" "));
        }
      })(e, t.remove);
    }
  } else {
    e.classList.add(...t.split(" "));
  }
}
var Ge = require("./2010.cjs");
var We = require("./1898.cjs");
var He = require("./6881.cjs");
function qe(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    if (t) {
      i = i.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      });
    }
    n.push.apply(n, i);
  }
  return n;
}
function Ye(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] ?? {};
    if (t % 2) {
      qe(Object(n), true).forEach(function (t) {
        Ze(e, t, n[t]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(e, Object.getOwnPropertyDescriptors(n));
    } else {
      qe(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
  }
  return e;
}
function Ze(e, t, n) {
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
class $e extends Ge.Z {
  constructor(e) {
    super();
    this.options = Ye({
      name: "",
      domEl: null,
      targetScene: null,
      assetType: null
    }, e);
    if (this.options.item) {
      this.item = this.options.item;
      this.add(this.item);
    }
    this.name = this.options.name;
    this.domEl = this.options.domEl;
    this.domEl._webGLItem = this;
    this.assetType = this.options.assetType;
    this.pbbox = new We.Z();
    this.bbox = new We.Z();
    this.pixelScale = new i.F();
    this.offsetPosition = new He.P();
    this.originalPosition = new He.P();
    this.originalRotation = new He.P();
    this.visible = false;
    this.animateProps = false;
  }
  calcPixelScale() {
    this.bbox.setFromObject(this.item);
    this.pixelScale.set(-this.bbox.min.x + this.bbox.max.x, -this.bbox.min.y + this.bbox.max.y);
  }
  syncDomSize() {
    this.widthPx = this.domEl.clientWidth;
    this.heightPx = this.domEl.clientHeight;
    this.item.scale.set(this.widthPx, this.heightPx, 1);
    if (this.assetType === "image") {
      if (this.item.material.uniforms.u_size) {
        this.item.material.uniforms.u_size.value = [this.widthPx, this.heightPx];
      }
      if (this.item.material.uniforms.u_imageSize) {
        this.item.material.uniforms.u_imageSize.value = [this.domEl.naturalWidth, this.domEl.naturalHeight];
      }
    }
  }
  build() {
    if (this.assetType === "image") {
      this.item.material.uniforms.u_texture.value.needsUpdate = true;
      u.WebGL.renderer.initTexture(this.item.material.uniforms.u_texture.value);
    }
  }
  mapAnimateProps() {
    if (this.domEl._glProps) {
      this.animateProps = Ye({}, this.domEl._glProps);
      for (const e in this.animateProps) {
        this.animateProps[e] = {};
        if (e === "uniforms") {
          for (const t in this.domEl._glProps.uniforms) {
            this.animateProps[e][t] = {};
            this.animateProps[e][t].target = this.item.material.uniforms[t];
            this.animateProps[e][t].property = "value";
          }
        } else {
          const t = e.split(".");
          this.animateProps[e].target = t.length > 1 ? this.item[t[0]] : this.item;
          this.animateProps[e].property = t[1] || t[0];
        }
      }
    }
  }
  animate(e, t) {
    const n = u.Dom2Webgl.axis;
    this.position[n] = u.Dom2Webgl.operations[u.Dom2Webgl.operator](this.originalPosition[n], e);
    if (this.animateProps) {
      for (const t in this.animateProps) {
        if (t !== "uniforms") {
          if (t === "position." + n) {
            this.position[n] = u.Dom2Webgl.operations[u.Dom2Webgl.operator](this.originalPosition[n], e, this.domEl._glProps[t]);
          } else {
            this.animateProps[t].target[this.animateProps[t].property] = this.domEl._glProps[t];
          }
        } else {
          for (const e in this.animateProps[t]) {
            this.animateProps[t][e].target[this.animateProps[t][e].property] = this.domEl._glProps[t][e];
          }
        }
      }
    }
  }
  onAfterPositionSync() {}
  enter() {}
  leave() {}
  destroy() {
    this.domEl._webGLItem = null;
  }
}
var Xe = require("./4595.cjs");
var Ke = require("./3662.cjs");
var Qe = require("./1516.cjs");
var Je = require("./5920.cjs");
var et = require("./5785.cjs");
var tt = require("./6249.cjs");
var nt = require("./8069.cjs");
function it(e, t = document) {
  return t.querySelector(e);
}
var rt = e => Math.cos(e * (Math.PI / 2)) * -1 + 1;
var ot = e => (Math.cos(Math.PI * e) - 1) * -0.5;
var st = {
  Pyramid: class extends $e {
    constructor(e) {
      var t;
      var n;
      var i;
      super(e);
      i = () => {
        if (this.entered) {
          return;
        }
        this.entered = true;
        const e = ge.Qy(2, 2.5);
        Ue.ZP.timeline({
          onComplete: () => {
            this.enterComplete = true;
          }
        }).to(this.animPos, {
          x: 0,
          y: 0,
          z: 0,
          scalar: 0,
          duration: e,
          delay: 0.2,
          ease: je.tQ.easeOut.config(0.8, 1.2)
        }).call(() => {
          this.textTl.play();
        }, null, e * 0.8);
      };
      if ((n = "enter") in (t = this)) {
        Object.defineProperty(t, n, {
          value: i,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        t[n] = i;
      }
      this.options = e;
      this.color = Ne(this.domEl, "material-color");
      this.assets = {
        textures: {}
      };
      this.dom = {
        text: this.domEl.nextElementSibling
      };
      this.speed = parseInt(Ne(this.domEl, "parallax-speed"));
      this.parallax = 200;
    }
    build() {
      const e = [-1, 1];
      this.randFlipA = e[ge.rO(0, 1)];
      this.randFlipB = e[ge.rO(0, 1)];
      this.material = new Be.v({
        color: Number(this.color)
      });
      this.item = u.WebGL.assets.models.piramed_thinner.scene.children[0].clone();
      this.item.material = this.material;
      this.item.rotation.set(ge.Qy(ge.Id(0), ge.Id(45)), ge.Qy(ge.Id(0), ge.Id(45)), ge.Qy(ge.Id(0), ge.Id(45)));
      this.animPos = {
        x: Ne(this.domEl, "start-x"),
        y: 3000,
        z: -10000,
        scalar: 1
      };
      this.rotationSpeed = {
        x: ge.Qy(0.0005, 0.0015),
        y: ge.Qy(0.0005, 0.0015),
        z: ge.Qy(0.0005, 0.0015)
      };
      this.textTl = Ue.ZP.timeline({
        immediateRender: true,
        paused: true
      }).splitTextRotateIn(this.dom.text, {
        duration: 1,
        children: "div"
      }, 0);
      this.add(this.item);
    }
    syncDomSize() {
      super.syncDomSize();
      this.item.scale.setScalar(Math.min(this.widthPx / this.pixelScale.x, this.heightPx / this.pixelScale.y));
    }
    animate(e, t) {
      super.animate(e, t);
      const n = ge.ZZ(ge.uZ(u.sectionProgress, 5.2, 6.5), 5.2, 6.5, 0, 1);
      const i = -this.speed * this.parallax * n;
      if (this.item) {
        this.item.rotation.x += this.rotationSpeed.x + this.animPos.scalar * 0.04;
        this.item.rotation.y += this.rotationSpeed.y + this.animPos.scalar * 0.04;
        this.item.rotation.z += this.rotationSpeed.z + this.animPos.scalar * 0.04;
        if (this.enterComplete) {
          this.item.position.y = i;
          this.dom.text.style.transform = `translateY(${this.speed * this.parallax * n}px)`;
        } else {
          this.item.position.x = this.animPos.x + Math.cos((this.animPos.scalar - 1) * -1 * 2 * this.animPos.scalar + 1000) * 1200 * this.animPos.scalar;
          this.item.position.y = i + this.animPos.y + Math.sin((this.animPos.scalar - 1) * -1 * 2 * this.animPos.scalar + 1000) * 1000 * this.animPos.scalar;
          this.item.position.z = this.animPos.z;
          this.dom.text.style.transform = `translateY(${this.speed * this.parallax * n}px)`;
        }
      }
    }
    dispose() {
      super.dispose();
    }
  },
  SearchBar: class extends $e {
    constructor(e) {
      super(e);
      this.options = e;
      this.dom = {
        startBar: it(".js-search-bar-start"),
        endBar: it(".js-search-bar-end"),
        section: it(".js-search-bar-section"),
        startHead: it(".js-search-bar-start-head"),
        endHead: it(".js-search-bar-end-head"),
        endCta: it(".js-search-bar-end-cta")
      };
      this.startMin = 4.9;
      this.startMax = 5.2;
      this.endMin = 9.6;
      this.endMax = 10;
      this.isFullScreenSize = false;
      this.assets = {
        textures: {}
      };
    }
    build() {
      this.widthPx = this.domEl.clientWidth;
      this.heightPx = this.domEl.clientHeight;
      this.item = new Ie.K(this.roundedRect(-this.widthPx / this.heightPx * 0.5, -0.5, this.widthPx / this.heightPx, 1, 0.2), new Xe.j({
        uniforms: {
          uResolution: {
            value: new i.F(u.window.w * u.window.dpr, u.window.h * u.window.dpr)
          },
          uBlurScale: {
            value: 0.7
          },
          uNoiseScale: {
            value: 0.001
          },
          uTime: {
            value: 0
          },
          uPosA: {
            value: {
              x: -0.5,
              y: -0.5
            }
          },
          uColorA: {
            value: new Ke.I(272673)
          },
          uScaleA: {
            value: 0.5
          },
          uPosB: {
            value: {
              x: 0.5,
              y: 0.5
            }
          },
          uColorB: {
            value: new Ke.I(1313075)
          },
          uScaleB: {
            value: 0.5
          },
          uNoiseTexture: {
            value: u.WebGL.assets.textures.noise
          },
          uAlpha: {
            value: 0
          },
          uCoordScale: {
            value: 1
          }
        },
        vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main () {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\n}",
        fragmentShader: "//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute(vec3 x) {\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nfloat snoise(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289(i); // Avoid truncation effects in permutation\n  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\n#ifndef PI\n#define PI 3.141592653589793\n#endif\n\nfloat sineInOut(float t) {\n  return -0.5 * (cos(PI * t) - 1.0);\n}\n\n#ifndef PI\n#define PI 3.141592653589793\n#endif\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\n\nuniform float uTime;\nuniform sampler2D uNoiseTexture;\nuniform float uBlurScale;\nuniform float uNoiseScale;\nuniform vec2 uPosA;\nuniform vec3 uColorA;\nuniform float uScaleA;\nuniform vec2 uPosB;\nuniform vec3 uColorB;\nuniform float uScaleB;\nuniform float uAlpha;\nuniform float uCoordScale;\n\nfloat circle(vec2 circle_pos, vec2 coord, float rad, float blur) {\n    float dist = distance(circle_pos, coord);\n    return smoothstep(rad + blur, rad - blur, dist);\n}\n\nvoid main() {\n    vec2 uv = vUv;\n    vec2 coord = vUv * uCoordScale;\n    // coord.y *= 1.5;\n    // coord.y -= 0.25;\n    vec4 noiseColor = texture2D(uNoiseTexture, (uv * uNoiseScale) + (uTime * 0.01));\n    vec4 finalColor;\n\n    float noiseA = noiseColor.r;\n    float noiseB = noiseColor.b;\n\n    vec2 posA = uPosA;\n    posA.x *= (noiseA * 0.1) + 1.0;\n    posA.y *= (noiseB * 0.1) + 1.0;\n\n    float mixAmountA = circle(posA, coord, uScaleA * noiseA, uBlurScale);\n    vec4 spotColorA = vec4(uColorA, 1.0);\n    vec4 bgColorA = vec4( vec3( 0.0 ), mixAmountA );\n    finalColor += mix(bgColorA, spotColorA, mixAmountA);\n\n    vec2 posB = uPosB;\n    posB.x *= noiseB;\n    posB.y *= noiseA;\n\n    float mixAmountB = circle(posB, coord, uScaleB * noiseB, uBlurScale);\n    vec4 spotColorB = vec4(uColorB, 1.0);\n    vec4 bgColorB = vec4( vec3( 0.0 ), mixAmountB );\n\n    finalColor += mix(bgColorB, spotColorB, mixAmountB);\n\n    finalColor *= uAlpha;\n\n\tgl_FragColor = finalColor;\n}"
      }));
      this.edges = new Qe.T(this.item.geometry);
      this.outline = new Je.e(this.edges, new et.n({
        color: 16777215
      }));
      this.item.add(this.outline);
      this.add(this.item);
      this.dom.endHead.style.transform = `translateY(-${u.window.h}%)`;
      this.dom.endHead.style.opacity = 0;
      this.dom.endCta.style.transform = `translateY(${u.window.h}%)`;
      this.dom.endCta.style.opacity = 0;
    }
    syncDomSize() {
      this.widthPx = this.domEl.clientWidth;
      this.heightPx = this.domEl.clientHeight;
      this.screenToHeightRatio = u.window.h / this.heightPx * 1.1;
      this.scaleBase = this.heightPx / this.pixelScale.y;
      this.maxScreenScalar = this.scaleBase * (this.screenToHeightRatio + 1);
      this.item.scale.set(this.heightPx / this.pixelScale.y, this.heightPx / this.pixelScale.y, 1);
      this.sectionHeight = this.dom.section.getBoundingClientRect().height;
      this.startBarTop = this.dom.startBar.getBoundingClientRect().top - u.ASS.currentPos;
      this.endBarTop = this.dom.endBar.getBoundingClientRect().top - u.ASS.currentPos;
      this.endBarScrollOffset = this.startBarTop - this.endBarTop;
    }
    roundedRect(e, t, n, i, r) {
      const o = new tt.b();
      o.moveTo(e, t + r);
      o.lineTo(e, t + i - r);
      o.quadraticCurveTo(e, t + i, e + r, t + i);
      o.lineTo(e + n - r, t + i);
      o.quadraticCurveTo(e + n, t + i, e + n, t + i - r);
      o.lineTo(e + n, t + r);
      o.quadraticCurveTo(e + n, t, e + n - r, t);
      o.lineTo(e + r, t);
      o.quadraticCurveTo(e, t, e, t + r);
      return new nt.o(o);
    }
    round(e) {
      return Number(Math.round(e + "e4") + "e-4");
    }
    animate(e, t) {
      if (!this.item) {
        return;
      }
      this.item.material.uniforms.uTime.value = t;
      const n = u.sectionProgress >= this.startMin;
      const i = u.sectionProgress >= this.endMax;
      const r = this.round(rt(ge.ZZ(ge.uZ(u.sectionProgress, this.startMin, this.startMax), this.startMin, this.startMax, 0, 1)));
      if (r < 1) {
        this.isFullScreenSize = false;
        this.item.material.uniforms.uCoordScale.value = r * (this.heightPx / u.window.w + 1);
        this.item.material.uniforms.uAlpha.value = ge.uZ(r, 0, 1);
        const n = this.screenToHeightRatio * r + 1;
        const i = this.scaleBase * n;
        this.item.scale.set(i, i, 1);
        const o = ge.ZZ(1 - r, 0.1, 1, 0, 1);
        const s = this.sectionHeight * ((this.startMax - this.startMin) * 0.5) * r;
        this.dom.startHead.style.transform = `translateY(-${s}%) scale(${n})`;
        this.dom.startHead.style.opacity = o;
        super.animate(e + s, t);
        return;
      }
      const o = this.round(ot(ge.ZZ(ge.uZ(u.sectionProgress, this.endMin, this.endMax), this.endMin, this.endMax, 1, 0)));
      if (o < 1) {
        this.isFullScreenSize = false;
        this.item.material.uniforms.uCoordScale.value = o * (this.heightPx / u.window.w + 1);
        this.item.material.uniforms.uAlpha.value = ge.uZ(o, 0, 1);
        const n = this.screenToHeightRatio * o + 1;
        const i = this.scaleBase * n;
        this.item.scale.set(i, i, 1);
        const r = ge.ZZ(1 - o, 0.5, 1, 0, 1);
        const s = this.sectionHeight * -0.5 * o;
        this.dom.endHead.style.transform = `translateY(${s}%) scale(${n})`;
        this.dom.endHead.style.opacity = `${r}`;
        this.dom.endHead.style.backdropFilter = `blur(${o * 20}px)`;
        this.dom.endCta.style.transform = `translateY(${s}%) scale(${n})`;
        this.dom.endCta.style.opacity = `${r}`;
        this.dom.endCta.style.backdropFilter = `blur(${o * 20}px)`;
        super.animate(e - this.endBarScrollOffset + s, t);
        return;
      }
      if (!!n && !i && !this.isFullScreenSize) {
        this.item.scale.set(this.maxScreenScalar, this.maxScreenScalar, 1);
        this.isFullScreenSize = true;
      }
    }
    dispose() {
      super.dispose();
    }
  }
};
var at = require("./4078.cjs");
const lt = new at.B();
const ut = new Xe.j({
  uniforms: {
    u_texture: {
      value: null
    }
  },
  vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main () {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\n}",
  fragmentShader: "precision highp float;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\n\nuniform sampler2D u_texture;\n\nvoid main() {\n    vec2 uv = vUv;\n    vec4 texColor = texture2D(u_texture, uv);\n\tgl_FragColor = texColor;\n}"
});
function ct(e, t, n) {
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
class ht {
  constructor() {
    ct(this, "onRaf", e => {
      this.currentPos = -u.ASS.currentPos;
      this.animateDomEls(e);
    });
    ct(this, "onElIntersect", e => {
      if (!this.firstObservation && e.updateSize) {
        e.updateSize = false;
        this.updateDom2Webgl(e);
      }
    });
    ct(this, "onFirstObservation", e => {
      if (this.firstObservation) {
        this.firstObservation = false;
        for (let t = 0; t < e.length; t++) {
          this.webGLItems[e[t].params.webglEl].mapAnimateProps();
          this.webGLItems[e[t].params.webglEl].visible = true;
          this.updateDom2Webgl(e[t]);
          e[t].updateSize = false;
        }
      }
    });
    ct(this, "onResize", () => {
      for (let e = 0; e < u.Dom2WebglObserver.els.length; e++) {
        u.Dom2WebglObserver.unobserve(u.Dom2WebglObserver.els[e].el);
        this.webGLItems[u.Dom2WebglObserver.els[e].params.webglEl].syncDomSize();
        u.Dom2WebglObserver.observe(u.Dom2WebglObserver.els[e].el);
      }
      this.firstObservation = true;
      u.Dom2WebglObserver.firstObservationFired = true;
      this.updateAxis();
    });
    this.selector = "dom2webgl";
    this.updateAxis();
    this.resourceTracker = new ze();
    this.components = st;
    F.on("global:resize", this.onResize);
    F.on("dom2webgl", this.onElIntersect);
    F.on("firstObservation", this.onFirstObservation);
    u.RAFCollection.add(this.onRaf, 3);
  }
  build() {
    this.els = [];
    const e = document.querySelectorAll(`[${this.selector}]`);
    this.visibleEls = u.Dom2WebglObserver.visibleEls;
    this.webGLItems = {};
    this.componentIds = {};
    this.firstObservation = true;
    const t = e.length;
    for (let n = 0; n < t; n++) {
      if (e[n].offsetParent === null && e[n].offsetWidth === 0 && e[n].offsetHeight === 0) {
        continue;
      }
      let t;
      const i = e[n].attributes[this.selector].value;
      const r = {
        el: e[n],
        updateSize: true,
        params: {}
      };
      if (e[n] instanceof HTMLImageElement || e[n] instanceof HTMLVideoElement) {
        t = this.addImage(e[n]);
      } else {
        if (!i.includes("c:")) {
          continue;
        }
        {
          const e = i.substring(2);
          if (!this.components[e]) {
            continue;
          }
          t = this.addComponent(e, i, r);
        }
      }
      r.params.webglEl = t;
      this.els.push(e[n]);
      if (this.webGLItems[t].enter) {
        r.enter = this.webGLItems[t].enter;
      }
      if (this.webGLItems[t].leave) {
        r.leave = this.webGLItems[t].leave;
      }
      u.Dom2WebglObserver.els.push(r);
    }
  }
  addComponent(e, t, n) {
    const i = t + this.componentIdGen(e);
    this.webGLItems[i] = new this.components[e]({
      name: i,
      domEl: n.el,
      assetType: "component",
      elObj: n
    });
    this.resourceTracker.track(this.webGLItems[i]);
    return i;
  }
  componentIdGen(e) {
    this.componentIds[e] ||= 0;
    return this.componentIds[e]++;
  }
  addImage(e) {
    const t = e.attributes.dom2webgl.value;
    const n = e instanceof HTMLVideoElement ? new Me.f(e) : new Oe.x(e);
    n.generateMipmaps = false;
    n.minFilter = n.magFilter = Le.wem;
    const i = ut.clone();
    i.uniforms.u_texture.value = n;
    const r = new Ie.K(lt, i);
    this.webGLItems[t] = new $e({
      item: r,
      name: t,
      domEl: e,
      assetType: "image"
    });
    this.resourceTracker.track(this.webGLItems[t]);
    return t;
  }
  enable() {
    for (const e in this.webGLItems) {
      u.Dom2WebglObserver.observe(this.webGLItems[e].domEl);
      if (this.webGLItems[e].build) {
        this.webGLItems[e].build();
      }
      this.webGLItems[e].calcPixelScale();
      this.webGLItems[e].syncDomSize();
      if (this.webGLItems[e].options.scene) {
        this.webGLItems[e].options.scene.add(this.webGLItems[e]);
        this.webGLItems[e].frustumCulled = false;
      } else {
        u.WebGL.scene.add(this.webGLItems[e]);
      }
    }
  }
  animateDomEls(e) {
    for (const t in this.webGLItems) {
      this.webGLItems[t].animate(this.currentPos, e);
    }
  }
  updateDom2Webgl(e) {
    const t = e.el._glProps && e.el._glProps["position.x"] ? parseFloat(e.el._glProps["position.x"]) : 0;
    const n = e.el._glProps && e.el._glProps["position.y"] ? parseFloat(e.el._glProps["position.y"]) : 0;
    const i = -u.window.w / 2 + (e.bcr.x + e.bcr.width / 2) - t - (u.ASS.isHorizontal ? this.currentPos : 0) + this.webGLItems[e.params.webglEl].offsetPosition.x;
    const r = u.window.h / 2 - e.bcr.y - e.bcr.height / 2 + n + (u.ASS.isHorizontal ? 0 : this.currentPos) + this.webGLItems[e.params.webglEl].offsetPosition.y;
    this.webGLItems[e.params.webglEl].position.x = i;
    this.webGLItems[e.params.webglEl].position.y = r;
    this.webGLItems[e.params.webglEl].originalPosition.copy(this.webGLItems[e.params.webglEl].position.clone());
    this.webGLItems[e.params.webglEl].onAfterPositionSync();
  }
  updateAxis() {
    [this.operator, this.axis] = u.isHorizontalScroll ? ["+", "x"] : ["-", "y"];
    this.operations = {
      "+": (e, t, n) => e + t + (n || 0),
      "-": (e, t, n) => e - t - (n || 0)
    };
  }
  reset() {
    this.resourceTracker.dispose();
    for (const e in this.webGLItems) {
      this.webGLItems[e].destroy();
    }
  }
}
require("./1817.cjs");
let dt;
function ft(e, t, n) {
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
dt = Symbol.iterator;
class mt {
  constructor(e) {
    ft(this, "components", []);
    ft(this, "args", []);
    ft(this, "negationSelector", null);
    if (e.selector === undefined) {
      throw new Error(`The component "${e.name}" does not implement the selector property, or it is not available statically`);
    }
    this.Component = e;
  }
  init(e = document) {
    const t = ue(this.Component.selector, e);
    this.components = [];
    for (let e = 0; e < t.length; e++) {
      if (this.negationSelector === null || t[e].matches(this.negationSelector) === false) {
        this.components.push(new this.Component(t[e], ...this.args));
      }
    }
    return this;
  }
  with(...e) {
    this.args = [...e];
    return this;
  }
  not(e) {
    this.negationSelector = e;
    return this;
  }
  make(e, ...t) {
    const n = new this.Component(e, ...t);
    this.components.push(n);
    return n;
  }
  get(e = null) {
    if (e !== null && this.components[e]) {
      return this.components[e];
    } else {
      return this.components;
    }
  }
  forEach(e) {
    for (let t = 0; t < this.components.length; t++) {
      e(this.components[t]);
    }
    return this;
  }
  callAll(e, ...t) {
    for (let n = 0; n < this.components.length; n++) {
      this.components[n][e](...t);
    }
    return this;
  }
  destroy() {
    this.callAll("destroy");
    return this;
  }
  [dt]() {
    return this.components.values();
  }
}
class pt {
  static init() {
    if (document.location.hash) {
      pt.focus(document.getElementById(window.location.hash.replace("#", "")), true);
    }
    F.on("hashchange", window, () => {
      pt.focus(document.getElementById(window.location.hash.replace("#", "")), true);
    });
  }
  static isFocusable(e) {
    Element.prototype.matches ||= Element.prototype.msMatchesSelector;
    return e.matches("input:not([disabled]), a, button, textarea, select, iframe, object, [tabindex]");
  }
  static focusTrapElement(e) {
    const t = e.parentNode;
    const n = document.createElement("div");
    n.setAttribute("data-focus-trap", "pre");
    n.setAttribute("tabindex", "0");
    const i = document.createElement("div");
    i.setAttribute("data-focus-trap", "post");
    i.setAttribute("tabindex", "0");
    F.on("focus", i, () => this.focusFirstChild(e));
    F.on("focus", n, () => this.focusLastChild(e));
    t.insertBefore(n, e);
    t.insertBefore(i, e.nextSibling);
  }
  static focusFirstChild(e) {
    for (let t = 0; t < e.children.length; t++) {
      const n = e.children[t];
      if (pt.focus(n) || pt.focusFirstChild(n)) {
        return true;
      }
    }
    return false;
  }
  static focusLastChild(e) {
    for (let t = e.children.length - 1; t >= 0; t--) {
      const n = e.children[t];
      if (pt.focus(n) || pt.focusLastChild(n)) {
        return true;
      }
    }
    return false;
  }
  static focus(e, t = false) {
    if (e == null) {
      return false;
    }
    if (t === true && pt.isFocusable(e) === false) {
      e.setAttribute("tabindex", "-1");
      F.on("blur", e, pt.removeTabIndex);
      F.on("focusout", e, pt.removeTabIndex);
    }
    try {
      e.focus();
    } catch (e) {}
    return document.activeElement === e;
  }
  static removeTabIndex() {
    this.removeAttribute("tabindex");
    F.off("blur", this, pt.removeTabIndex);
    F.off("focusout", this, pt.removeTabIndex);
  }
}
var vt;
var gt;
var xt;
var yt = pt;
function Dt(e, t, n) {
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
class bt {
  constructor(e) {
    Dt(this, "el", null);
    this.el = e;
  }
  destroy() {}
}
Dt(bt, "selector", null);
class _t extends bt {
  constructor(e) {
    super(e);
    console.log(`Constructed ${this.name}`, this.el);
  }
  destroy() {}
}
function wt(e, t, n) {
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
xt = ".js-example-selector";
if ((gt = "selector") in (vt = _t)) {
  Object.defineProperty(vt, gt, {
    value: xt,
    enumerable: true,
    configurable: true,
    writable: true
  });
} else {
  vt[gt] = xt;
}
class St extends bt {
  constructor(e) {
    super(e);
    wt(this, "onScroll", e => {
      if (e > 1) {
        this.isCompact = true;
        this.shrink();
        return;
      }
      this.isCompact = false;
      this.grow();
    });
    wt(this, "revealLogoText", () => {
      if (!this.isCompact || this.isHiding) {
        return;
      }
      Ue.ZP.timeline({
        onStart: () => {
          this.isAnimating = true;
        },
        onComplete: () => {
          this.isAnimating = false;
        }
      }).fromTo(this.dom.logoText, {
        y: this.logoTextTranslateValue
      }, {
        y: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.05
      }, 0);
    });
    wt(this, "hideLogoText", () => {
      if (!this.isCompact || this.isRevealing) {
        return;
      }
      Ue.ZP.timeline({
        onStart: () => {
          this.isAnimating = true;
        },
        onComplete: () => {
          this.isAnimating = false;
        }
      }).to(this.dom.logoText, {
        y: -this.logoTextTranslateValue,
        duration: 1,
        ease: "expo.out",
        stagger: 0.05
      }, 0).set(this.dom.logoText, {
        y: this.logoTextTranslateValue
      }, ">");
    });
    wt(this, "onRaf", () => {});
    wt(this, "onResize", () => {
      this.logoTextTranslateValue = Math.ceil(this.dom.logoTextGroup.getBoundingClientRect().height) + 5;
      this.removeEvents();
      this.addEvents();
      if (u.mq.sm.matches) {
        this.shrink();
        this.isCompact = true;
      } else {
        this.grow();
        this.isCompact = false;
      }
    });
    this.dom = {
      el: this.el,
      inner: it(".js-header-inner", this.el),
      background: it(".js-header-bg", this.el),
      logo: it(".js-header-logo", this.el),
      logoText: ue(".js-header-logo-text", this.el),
      logoTextGroup: it(".js-header-logo-text-group", this.el)
    };
    this.logoTextTranslateValue = Math.ceil(this.dom.logoTextGroup.getBoundingClientRect().height) + 10;
    this.isRevealing = false;
    this.isHiding = false;
    this.logoAnimating = false;
    this.logoHidden = false;
    this.addEvents();
  }
  addEvents() {
    F.on(O.RESIZE, this.onResize);
    u.ASS.on("scroll", this.onScroll);
    F.on("mouseenter", this.dom.logo, this.revealLogoText);
    F.on("mouseleave", this.dom.logo, this.hideLogoText);
  }
  removeEvents() {
    F.off(O.RESIZE, this.onResize);
    u.ASS.off("scroll", this.onScroll);
    F.off("mouseenter", this.dom.logo, this.revealLogoText);
    F.off("mouseleave", this.dom.logo, this.hideLogoText);
  }
  shrink() {
    var e;
    if (!this.logoAnimating && !this.logoHidden) {
      this.logoAnimating = true;
      this.logoHidden = true;
      if ((e = this.growTl) !== null && e !== undefined) {
        e.kill();
      }
      this.shrinkTl = Ue.ZP.timeline().to(this.dom.background, {
        scaleY: 1,
        duration: 1,
        ease: "expo.out"
      }, 0).to(this.dom.inner, {
        y: 0,
        duration: 1,
        ease: "expo.out"
      }, 0).to(this.dom.logoText, {
        y: -this.logoTextTranslateValue,
        duration: 1,
        ease: "expo.out",
        stagger: 0.05,
        onComplete: () => {
          this.logoAnimating = false;
        }
      }, 0).set(this.dom.logoText, {
        y: this.logoTextTranslateValue + 10
      }, ">");
    }
  }
  grow() {
    var e;
    if (this.logoHidden) {
      this.logoAnimating = true;
      this.logoHidden = false;
      if ((e = this.shrinkTl) !== null && e !== undefined) {
        e.kill();
      }
      this.growTl = Ue.ZP.timeline({}).to(this.dom.inner, {
        y: u.mq.sm.matches ? "1rem" : 0,
        duration: 1,
        ease: "expo.out"
      }, 0).to(this.dom.background, {
        scaleY: 0,
        duration: 1,
        ease: "expo.out"
      }, 0).to(this.dom.logoText, {
        y: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.05,
        onComplete: () => {
          this.logoAnimating = false;
        }
      }, 0);
    }
  }
  destroy() {
    this.removeEvents();
  }
}
function Et(e, t, n) {
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
wt(St, "selector", ".js-header");
wt(St, "isCompact", false);
class Pt extends bt {
  constructor(e) {
    super(e);
    Et(this, "onMousenterNavLink", e => {
      if (!u.isTouch) {
        if (e.currentTarget.classList.contains("js-nav-link")) {
          this.targetLink = e.currentTarget;
        }
        if (!Ne(this.targetLink, "anchor-link") || Ne(this.targetLink, "anchor-link") !== this.activeSection) {
          this.targetLinkChars = ue(".js-nav-link-chars", this.targetLink);
          this.hoverItemIndex = this.dom.links.indexOf(this.targetLink);
          this.hoverTl = this.itemHoverTimelines[this.hoverItemIndex];
          if (!this.hoverTl.isActive()) {
            this.hoverTl.restart();
          }
        }
      }
    });
    Et(this, "onMouseleaveNavLink", e => {
      this.targetLink = null;
      this.hoverTl = null;
      this.clickTl = null;
      this.targetLinkChars = null;
    });
    Et(this, "onPointerDown", e => {
      if (u.isTouch && e.currentTarget.classList.contains("js-nav-link")) {
        this.targetLink = e.currentTarget;
      }
      const t = Ne(this.targetLink, "anchor-link");
      if (t !== this.activeSection && it(`[anchor-target="${t}"]`) !== null) {
        this.clickItemIndex = this.dom.links.indexOf(this.targetLink);
        this.clickTl = this.itemClickTimelines[this.clickItemIndex];
        if (!this.clickTl.isActive()) {
          this.clickTl.restart();
        }
      }
    });
    Et(this, "navigateTo", e => {
      e.preventDefault();
      const t = Ne(e.currentTarget, "anchor-link");
      const n = it(`[anchor-target="${t}"]`);
      if (!n) {
        if (t) {
          window.location = e.currentTarget.href || e.target.href || "/";
        }
        return;
      }
      const i = u.ASS.controller.ease;
      u.ASS.controller.ease = 1;
      if (!u.mq.sm.matches) {
        this.close();
      }
      Ue.ZP.timeline().set(this.dom.spinnerSVG, {
        scale: 0,
        rotation: 0
      }).set(this.dom.mask, {
        pointerEvents: "auto"
      }).to(this.dom.mask, {
        duration: 0.5,
        ease: "expo.in"
      }, 0).to(this.dom.maskBg, {
        autoAlpha: 1,
        duration: 0.5,
        ease: "expo.in"
      }, 0).to(this.dom.spinnerSVG, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: "expo.in"
      }, 0.2).to(this.dom.spinnerSVG, {
        rotate: 90,
        repeat: 2,
        duration: 1,
        ease: "quad.inOut"
      }, 0.2).call(() => {
        u.ASS.scrollTo(n.getBoundingClientRect().top + u.ASS.currentPos);
      }, null, 1).to(this.dom.spinnerSVG, {
        autoAlpha: 0,
        scale: 0,
        duration: 0.5,
        ease: "expo.in"
      }, 2).to(this.dom.mask, {
        duration: 0.5,
        ease: "expo.out"
      }, 2.3).to(this.dom.maskBg, {
        autoAlpha: 0,
        duration: 0.5,
        ease: "expo.out"
      }, 2.3).set(this.dom.mask, {
        pointerEvents: "none"
      }).call(() => {
        u.ASS.controller.ease = i;
      });
    });
    Et(this, "updateActiveItem", () => {
      if (this.activeSection !== u.sectionName) {
        this.activeSection = u.sectionName;
        this.items.forEach(e => {
          e.el.classList[e.name === u.sectionName ? "add" : "remove"]("isActive");
        });
      }
    });
    Et(this, "toggle", () => {
      if (this.isMobileOpen) {
        this.close();
      } else {
        this.open();
      }
    });
    Et(this, "splitNavItemChars", () => {
      this.dom.items.forEach(e => {
        this.split = new le(it(".js-nav-link", e), {
          type: "chars",
          charsClass: "nav__link__chars js-nav-link-chars pointer-events-none"
        });
      });
    });
    Et(this, "onRaf", () => {});
    Et(this, "onResize", () => {
      this.removeEvents();
      this.addEvents();
      if (u.mq.sm.matches || this.isMobileOpen) {
        Ue.ZP.set(this.dom.headerItems, {
          autoAlpha: 1
        });
        this.dom.list.style.pointerEvents = "auto";
      } else {
        Ue.ZP.set(this.dom.headerItems, {
          autoAlpha: 0
        });
        this.dom.list.style.pointerEvents = "none";
      }
    });
    const t = it(".js-nav-toggle");
    this.dom = {
      el: this.el,
      toggle: t,
      crossIcon: it(".js-nav-toggle-cross", t),
      burgerIcon: it(".js-nav-toggle-burger", t),
      background: it(".js-nav-bg", this.el),
      list: it(".js-nav-list", this.el),
      items: ue(".js-nav-item"),
      headerItems: ue(".js-nav-item", this.el),
      links: ue(".js-nav-link"),
      mask: it(".js-nav-transition-mask"),
      maskBg: it(".js-nav-transition-mask-bg"),
      anchorLinks: ue("[anchor-link]")
    };
    this.dom.spinner = it(".js-nav-transition-mask-spinner", this.dom.mask);
    this.dom.spinnerSVG = it(".js-nav-transition-mask-spinner-svg", this.dom.mask);
    this.activeSection = null;
    this.items = [];
    this.dom.items.forEach(e => {
      this.items.push({
        el: e,
        name: Ne(e, "section-name")
      });
    });
    this.itemHoverTimelines = [];
    this.itemClickTimelines = [];
    this.addEvents();
    this.splitNavItemChars();
    this.buildHoverTimelines();
    this.buildClickTimelines();
  }
  addEvents() {
    F.on(O.RESIZE, this.onResize);
    F.on("click", this.dom.toggle, this.toggle);
    F.on("section:enter", this.updateActiveItem);
    F.on("click", this.dom.anchorLinks, this.navigateTo);
    F.on("mouseenter", this.dom.links, this.onMousenterNavLink);
    F.on("mouseleave", this.dom.links, this.onMouseleaveNavLink);
    F.on("mousedown touchstart", this.dom.links, this.onPointerDown);
  }
  buildHoverTimelines() {
    this.dom.links.forEach(e => {
      const t = ue(".js-nav-link-chars", e);
      const n = Ue.ZP.timeline({
        paused: true
      }).fromTo(t, {
        yPercent: 0,
        ease: "power1.out"
      }, {
        yPercent: -15,
        duration: 0.25,
        ease: "power1.out",
        stagger: {
          each: 0.035,
          yoyo: true,
          repeat: 1
        }
      }, 0);
      this.itemHoverTimelines.push(n);
    });
  }
  buildClickTimelines() {
    this.dom.links.forEach(e => {
      const t = ue(".js-nav-link-chars", e);
      const n = Ue.ZP.timeline({
        paused: true
      }).set(t, {
        textShadow: "0 1.68rem",
        ease: "none"
      }, 0).to(t, {
        yPercent: -100,
        duration: 0.5,
        ease: "power1.out",
        stagger: 0.035
      }, 0).set(t, {
        yPercent: 0,
        textShadow: "none",
        ease: "none"
      });
      this.itemClickTimelines.push(n);
    });
  }
  removeEvents() {
    F.off(O.RESIZE, this.onResize);
    F.off("click", this.dom.toggle, this.toggle);
    F.off("section:enter", this.updateActiveItem);
    F.off("click", this.dom.anchorLinks, this.navigateTo);
    F.off("mouseenter", this.dom.links, this.onMousenterNavLink);
    F.off("mouseleave", this.dom.links, this.onMouseleaveNavLink);
    F.off("mousedown touchstart", this.dom.links, this.onPointerDown);
  }
  open() {
    var e;
    this.isMobileOpen = true;
    this.dom.crossIcon.style.display = "block";
    this.dom.burgerIcon.style.display = "none";
    this.dom.list.style.pointerEvents = "auto";
    if ((e = this.closeTl) !== null && e !== undefined) {
      e.kill();
    }
    this.showTl = Ue.ZP.timeline().to(this.dom.background, {
      scaleY: 1,
      duration: 1,
      ease: "expo.out"
    }, 0).to(this.dom.headerItems, {
      autoAlpha: 1,
      duration: 1,
      ease: "expo.out",
      stagger: {
        amount: 0.17,
        from: "start"
      }
    }, 0.2);
  }
  close() {
    var e;
    this.isMobileOpen = false;
    this.dom.crossIcon.style.display = "none";
    this.dom.burgerIcon.style.display = "block";
    this.dom.list.style.pointerEvents = "none";
    if ((e = this.showTl) !== null && e !== undefined) {
      e.kill();
    }
    this.closeTl = Ue.ZP.timeline().to(this.dom.headerItems, {
      autoAlpha: 0,
      duration: 1,
      ease: "expo.out",
      stagger: {
        amount: 0.17,
        from: "end"
      }
    }, 0).to(this.dom.background, {
      scaleY: 0,
      duration: 1,
      ease: "expo.out"
    }, 0.2);
  }
  destroy() {
    this.removeEvents();
  }
}
Et(Pt, "selector", ".js-nav");
Et(Pt, "isMobileOpen", false);
var Ct = require("./3460.cjs");
var Tt = require("./66.cjs");
var Ft = require("./1051.cjs");
var At = require("./7365.cjs");
var Mt = require("./2114.cjs");
var Ot = {
  images: [],
  textures: [{
    id: "cone_scale",
    url: "/images/hero-document-scales.png"
  }, {
    id: "cone_color",
    url: "/images/hero-document-colors.png"
  }, {
    id: "cone_position_exr",
    url: "/images/hero-document-positions.exr"
  }, {
    id: "sprite",
    url: "/images/dof-2k-10.jpg"
  }, {
    id: "noise",
    url: "/images/gradient-noise.jpg"
  }, {
    id: "grain",
    url: "/images/noise.jpg"
  }],
  sounds: [],
  videos: [],
  models: [{
    id: "piramed_thinner",
    url: "/models/py-lod7.glb"
  }, {
    id: "piramed",
    url: "/models/document-particle.glb"
  }, {
    id: "piramed_back",
    url: "/models/py-lod1.glb"
  }, {
    id: "piramed_medium",
    url: "/models/py-lod2.glb"
  }, {
    id: "piramed_front",
    url: "/models/py-lod3.glb"
  }],
  jsons: [],
  fontTextures: [],
  fonts: []
};
require("./9575.cjs");
require("./4197.cjs");
require("./3824.cjs");
var Lt = require("./7936.cjs");
var It = require("./9203.cjs");
var Rt = require("./7092.cjs");
var kt = require("./4758.cjs");
function zt(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
function Ut(e, t, n, i, r) {
  return (e - t) / (n - t) * (r - i) + i;
}
class jt extends Be.v {
  constructor(e = {
    customUniforms: [],
    onBeforeCompile: e => {}
  }) {
    super(e);
    this._customUniforms = e.customUniforms;
    this.onBeforeCompile = e.onBeforeCompile;
    this._setup();
  }
  get customUniforms() {
    return this._customUniforms;
  }
  _setup() {}
}
class Bt extends Xe.j {
  constructor({
    customUniforms: e = {},
    near: t = 0.1,
    far: n = 13,
    transparent: i = false,
    onBeforeCompile: r = e => {}
  } = {}) {
    let o = "#define GLSLIFY 1\nvarying vec2 vUv;\nvarying float vViewZDepth;\n\nvoid main() {\n  #include <begin_vertex>\n  #include <project_vertex>\n  vViewZDepth = - mvPosition.z;\n  vUv = uv;\n}";
    let s = "#define GLSLIFY 1\nvarying float vViewZDepth;\nvarying vec2 vUv;\n\nvoid main() {\n  float color = 1.0 - smoothstep( u_near, u_far, vViewZDepth );\n  gl_FragColor = vec4( vec3( color ), 1.0 );\n}";
    e.u_near = {
      type: "float",
      value: t
    };
    e.u_far = {
      type: "float",
      value: n
    };
    const a = {};
    Object.keys(e).forEach(t => {
      a[`${t}`] = e[t];
      o = `uniform ${e[t].type} ${t};
${o}`;
      s = `uniform ${e[t].type} ${t};
${s}`;
    });
    super({
      transparent: i,
      uniforms: a,
      vertexShader: o,
      fragmentShader: s
    });
    this._customUniforms = e;
    this.onBeforeCompile = r;
    this._setup();
  }
  get customUniforms() {
    return this._customUniforms;
  }
  _setup() {}
}
function Nt(e, t) {
  const n = e.fov * Math.PI / 180;
  const i = Math.tan(n / 2) * 2 * Math.abs(t);
  return {
    width: i * e.aspect,
    height: i
  };
}
var Vt = "#define GLSLIFY 1\nmat4 rotationMatrix(vec3 axis, float angle)\n{\n    axis = normalize(axis);\n    float s = sin(angle);\n    float c = cos(angle);\n    float oc = 1.0 - c;\n    \n    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,\n                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,\n                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,\n                0.0,                                0.0,                                0.0,                                1.0);\n}\n";
var Gt = "#define GLSLIFY 1\nmat4 rotMat = rotationMatrix(vec3(a_angle.x, a_angle.y, a_angle.z), mod(a_angle.w * u_time * 0.15, 3.1416 * 2.));\nvec4 mvPosition = vec4( transformed, 1.0 );\n\nv_color = a_color;\n\n#ifdef USE_INSTANCING\n  mat4 instanceMat = instanceMatrix;\n\n  float zFactor = map(instanceMat[3][2], 0., 9., 0.5, 0.2);\n\n  instanceMat[3][0] = instanceMat[3][0] * u_resolution.x * zFactor - u_mouse.x * a_param.x + sin(u_time * a_param.w * 0.5) * a_param.y * 0.15;\n  instanceMat[3][1] = instanceMat[3][1] * u_resolution.y * zFactor - u_mouse.y * a_param.x + cos(u_time * a_param.w * 0.5) * a_param.z * 0.15;\n  instanceMat[3][2] = instanceMat[3][2];\n\n  instanceMat[0][0] = instanceMat[0][0] * u_scale;\n  instanceMat[1][1] = instanceMat[1][1] * u_scale;\n  instanceMat[2][2] = instanceMat[2][2] * u_scale;\n\n  instanceMat *= rotMat;\n\n\tmvPosition = instanceMat * mvPosition;\n#endif\n\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;";
var Wt = "#define GLSLIFY 1\nfloat map(float value, float min1, float max1, float min2, float max2) {\n  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);\n}\n";
class Ht extends Re.T {
  constructor() {
    super();
    this._params = {
      basePosition: new He.P()
    };
    this._mouseTg = {
      x: 0,
      y: 0
    };
    this._easing = 0.1;
    this._nb = 250;
    this._loaded = false;
  }
  _setupGeometry() {
    u.WebGL.assets.models.piramed.scene.traverse(e => {
      if (e.type === "Mesh") {
        this._geometry = e.geometry.clone();
      }
    });
  }
  _setupMaterial() {
    this._material = new jt({
      color: new Ke.I("white"),
      vertexColors: true,
      transparent: true,
      customUniforms: [{
        id: "u_time",
        type: "float",
        value: 0
      }, {
        id: "u_scale",
        type: "float",
        value: 1
      }, {
        id: "u_resolution",
        type: "vec2",
        value: new i.F()
      }, {
        id: "u_mouse",
        type: "vec2",
        value: new i.F()
      }],
      onBeforeCompile: function (e) {
        for (let t = 0; t < this._customUniforms.length; t++) {
          const n = this._customUniforms[t];
          e.uniforms[n.id] = n;
          e.vertexShader = `uniform ${n.type} ${n.id};
${e.vertexShader}`;
          e.fragmentShader = `uniform ${n.type} ${n.id};
${e.fragmentShader}`;
        }
        e.vertexShader = Vt + e.vertexShader;
        e.vertexShader = Wt + e.vertexShader;
        e.vertexShader = "attribute vec4 a_param;\n" + e.vertexShader;
        e.vertexShader = "attribute vec4 a_angle;\n" + e.vertexShader;
        e.vertexShader = "attribute vec4 a_color;\n" + e.vertexShader;
        e.vertexShader = "varying vec4 v_color;\n" + e.vertexShader;
        e.vertexShader = e.vertexShader.replace("#include <project_vertex>", Gt);
        e.vertexShader = e.vertexShader.replace("#include <worldpos_vertex>", "#define GLSLIFY 1\n#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION )\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMat * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif");
        e.fragmentShader = "varying vec4 v_color;\n" + e.fragmentShader;
        e.fragmentShader = e.fragmentShader.replace("#include <output_fragment>", "#define GLSLIFY 1\nvec3 col = v_color.rgb;\n\n#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n// https://github.com/mrdoob/three.js/pull/22425\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= transmissionAlpha + 0.1;\n#endif\noutgoingLight.rgb = col.rgb;\ndiffuseColor.a *= v_color.a;\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );");
      }
    });
  }
  _setupMesh() {
    this._mesh = new Lt.S(this._geometry, this._material, this._nb);
    const e = new It.y();
    const t = new He.P();
    const n = new Rt._();
    const r = new He.P();
    const o = new Float32Array(this._nb * 4);
    const s = new Float32Array(this._nb * 4);
    const a = new Float32Array(this._nb * 4);
    const l = [{
      r: 93,
      g: 57,
      b: 154
    }, {
      r: 186,
      g: 136,
      b: 43
    }, {
      r: 40,
      g: 116,
      b: 100
    }, {
      r: 164,
      g: 148,
      b: 175
    }];
    for (let i = 0; i < this._nb; i++) {
      const c = Math.random() * 2 - 1;
      const h = Math.random() * 2 - 1;
      const d = Math.random() * 9;
      const f = u.mq.sm.matches ? 0.075 : 0.05;
      t.set(c, h, d);
      r.set(f, f, f);
      e.compose(t, n, r);
      this._mesh.setMatrixAt(i, e);
      e.identity();
      o[i * 4] = l[i % 4].r / 255;
      o[i * 4 + 1] = l[i % 4].g / 255;
      o[i * 4 + 2] = l[i % 4].b / 255;
      o[i * 4 + 3] = Math.random();
      s[i * 4] = Math.random() * 2 - 1;
      s[i * 4 + 1] = Math.random() * 2 - 1;
      s[i * 4 + 2] = Math.random() * 2 - 1;
      s[i * 4 + 3] = Math.random() * 2 - Math.PI * 1;
      a[i * 4] = Math.random();
      a[i * 4 + 1] = Math.random();
      a[i * 4 + 2] = Math.random();
      a[i * 4 + 3] = Math.random();
    }
    this._geometry.setAttribute("a_param", new kt.l(a, 4));
    this._geometry.setAttribute("a_color", new kt.l(o, 4));
    this._geometry.setAttribute("a_angle", new kt.l(s, 4));
    this._depthMaterial = new Bt({
      transparent: true,
      customUniforms: {
        u_time: {
          type: "float",
          value: 0
        },
        u_scale: {
          type: "float",
          value: 1
        },
        u_resolution: {
          type: "vec2",
          value: new i.F()
        },
        u_mouse: {
          type: "vec2",
          value: new i.F()
        }
      },
      onBeforeCompile: function (e) {
        e.vertexShader = Vt + e.vertexShader;
        e.vertexShader = Wt + e.vertexShader;
        e.vertexShader = "attribute vec4 a_param;\n" + e.vertexShader;
        e.vertexShader = "attribute vec4 a_angle;\n" + e.vertexShader;
        e.vertexShader = "attribute vec4 a_color;\n" + e.vertexShader;
        e.vertexShader = "varying vec4 v_color;\n" + e.vertexShader;
        e.vertexShader = e.vertexShader.replace("#include <project_vertex>", Gt);
      }
    });
    this._mesh.customDepthMaterial = this._depthMaterial;
    this.add(this._mesh);
  }
  onMousemove(e) {
    this._mouseTg.x = e.x;
    this._mouseTg.y = e.y;
  }
  onAssetsLoaded() {
    this._loaded = true;
    this._setupGeometry();
    this._setupMaterial();
    this._setupMesh();
  }
  resize({
    camera: e
  }) {
    if (this._loaded) {
      this._pSize = Nt(e, 9.9);
      this._material.customUniforms[2].value.set(this._pSize.width, this._pSize.height);
      this._depthMaterial.customUniforms.u_resolution.value.set(this._pSize.width, this._pSize.height);
    }
  }
  update(e) {
    if (this._loaded) {
      this._material.customUniforms[0].value = e;
      this._depthMaterial.customUniforms.u_time.value = e;
      this._updateMouse();
      if (u.mq.sm.matches) {
        this._updatePosition();
      }
    }
  }
  _updateMouse() {
    this._material.customUniforms[3].value.x += (this._mouseTg.x * 0.25 - this._material.customUniforms[3].value.x) * this._easing;
    this._material.customUniforms[3].value.y += (this._mouseTg.y * 0.25 - this._material.customUniforms[3].value.y) * this._easing;
    this._depthMaterial.customUniforms.u_mouse.value.x += (this._mouseTg.x * 0.25 - this._depthMaterial.customUniforms.u_mouse.value.x) * this._easing;
    this._depthMaterial.customUniforms.u_mouse.value.y += (this._mouseTg.y * 0.25 - this._depthMaterial.customUniforms.u_mouse.value.y) * this._easing;
  }
  _updatePosition() {
    const e = u.sectionProgress;
    const t = zt(Ut(e, 0, 1, 2, -5), -5, 1) + zt(Ut(e, 1.25, 1.5, 0, 5), 0, 5) - zt(Ut(e, 2.7, 3, 0, 5), 0, 5) + zt(Ut(e, 3.3, 3.5, 0, 5), 0, 9) - zt(Ut(e, 4.5, 5, 0, 5), 0, 4);
    this._params.basePosition.x = t * 0.25;
    this.position.x += (this._params.basePosition.x - this.position.x) * this._easing;
  }
}
require("./2472.cjs");
var qt = require("./3993.cjs");
var Yt = require("./8549.cjs");
var Zt = require("./4302.cjs");
class $t {
  constructor({
    width: e = 256,
    height: t = 256,
    format: n = Le.wk1,
    type: i = Le.VzW,
    minFilter: r = Le.TyD,
    magFilter: o = Le.TyD,
    depthBuffer: s = false,
    stencilBuffer: a = false,
    generateMipmaps: l = false,
    material: u,
    debug: c = false
  }) {
    this.simulation = u;
    const h = {
      wrapS: Le.uWy,
      wrapT: Le.uWy,
      minFilter: r,
      magFilter: o,
      format: n,
      type: i,
      stencilBuffer: a,
      depthBuffer: s,
      generateMipmaps: l
    };
    this._read = new Zt.d(e, t, h);
    this._write = new Zt.d(e, t, h);
    if (c) {
      this.debug();
    }
  }
  swap() {
    const e = this._read;
    this._read = this._write;
    this._write = e;
  }
  setSize(e, t) {
    this._read.setSize(e, t);
    this._write.setSize(e, t);
  }
  debug() {
    this.debug1 = new Ie.K(new at.B(4, 4), new Be.v({
      map: this._read.texture
    }));
    this.debug1.renderOrder = 1;
    this.debug2 = new Ie.K(new at.B(1.4, 1.4), new Be.v({
      map: this._write.texture
    }));
    this.debug2.renderOrder = 2;
    this.debug1.position.set(0, 2.5, 1);
    this.debug2.position.set(0, 0, 0);
    u.WebGL.add(this.debug1);
  }
  get read() {
    return this._read;
  }
  get write() {
    return this._write;
  }
}
var Xt = require("./9046.cjs");
var Kt = require("./140.cjs");
var Qt = require("./3131.cjs");
class Jt extends Re.T {
  constructor({
    positions: e = new Float32Array([-0.5, -0.5, 1.5, -0.5, -0.5, 1.5]),
    uvs: t = new Float32Array([0, 0, 2, 0, 0, 2]),
    material: n = new Yt.F({
      uniforms: {
        t_diffuse: {
          value: null
        }
      },
      vertexShader: "precision highp float;\n#define GLSLIFY 1\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 modelViewMatrix;\n\nattribute lowp vec2 position;\nattribute lowp vec2 uv;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n  vUv = uv;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0., 1.);\n}\n",
      fragmentShader: "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D t_diffuse;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n  vec4 texture = texture2D(t_diffuse, vUv);\n\n  vec3 color = texture.rgb;\n  float alpha = texture.a;\n\n  gl_FragColor = vec4(color, alpha);\n}\n"
    }),
    texture: i = null,
    scene: r = false
  } = {}) {
    super();
    this._geometry = new Xt.u();
    this._geometry.setAttribute("position", new Kt.Tl(e, 2));
    this._geometry.setAttribute("uv", new Kt.Tl(t, 2));
    if (i) {
      n.uniforms.t_diffuse = {
        value: i
      };
      n.uniforms.t_diffuse.value.needsUpdate = true;
    }
    this._material = n;
    this._mesh = new Ie.K(this._geometry, this._material);
    this.add(this._mesh);
    if (r) {
      this._camera = this.addOrthographicCamera({
        width: 1,
        height: 1,
        near: 0,
        far: 1
      });
      this._scene = this.addScene();
      this._scene.add(this);
    }
  }
  addOrthographicCamera({
    width: e = window.innerWidth,
    height: t = window.innerHeight,
    near: n = 0,
    far: i = 100
  } = {}) {
    return new Qt.i(e / -2, e / 2, t / 2, t / -2, n, i);
  }
  addScene({
    scene: e = new At.x()
  } = {}) {
    return e;
  }
  get geometry() {
    return this._geometry;
  }
  get material() {
    return this._material;
  }
  set material(e) {
    this._material = e;
    this._mesh.material = this._material;
  }
  get customDepthMaterial() {
    return this._mesh.customDepthMaterial;
  }
  set customDepthMaterial(e) {
    this._mesh.customDepthMaterial = e;
  }
  get scene() {
    return this._scene;
  }
  get camera() {
    return this._camera;
  }
}
var en = "#define GLSLIFY 1\nmat4 rotationMatrix(vec3 axis, float angle)\n{\n    axis = normalize(axis);\n    float s = sin(angle);\n    float c = cos(angle);\n    float oc = 1.0 - c;\n    \n    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,\n                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,\n                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,\n                0.0,                                0.0,                                0.0,                                1.0);\n}\n\nmat3 calcLookAtMatrix(vec3 origin, vec3 target, float roll) {\n  vec3 rr = vec3(sin(roll), cos(roll), 0.0);\n  vec3 ww = normalize(target - origin);\n  vec3 uu = normalize(cross(ww, rr));\n  vec3 vv = normalize(cross(uu, ww));\n\n  return mat3(uu, vv, ww);\n}\n";
var tn = "#define GLSLIFY 1\n// mat4 rotMat = rotationMatrix(vec3(0., 0., a_angle.z), a_angle.w);\nvec4 mvPosition = vec4( transformed, 1.0 );\n\n// Stream squares are turned randomly (+-30 deg) in the screen plane; the document sheet (u_progress 0) stays flat.\nfloat rotA = (fract(sin(dot(a_id, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 1.047 * smoothstep(0.5, 1., u_progress);\nmvPosition.xy = mat2(cos(rotA), sin(rotA), -sin(rotA), cos(rotA)) * mvPosition.xy;\n\n// // Show Animation -----\n// float d = 0.00005;\n// float showVal = min(1., max(0., (u_show * (1. + d * (u_length - 1.))) - d * a_order));\n// showVal = qinticInOut(showVal);\n// float radius = mix(u_factor + a_random.x * 3., u_factor, showVal) + u_explode * a_random.y;\n\nvec3 pos = texture2D(t_position, a_id).xyz;\nvec3 basePos = pos;\n\n// pos.x = (pos.x - 0.5) * 2. * radius;\n// pos.y = (pos.y - 0.5) * 2. * radius;\n// pos.z = (pos.z - 0.5) * 2. * radius;\n\n// vec3 pos2 = texture2D(t_position, vec2(a_id.x + 0.5, a_id.y)).xyz;\n// pos2.x = (pos2.x - 0.5) * 2. * radius;\n// pos2.y = (pos2.y - 0.5) * 2. * radius;\n// pos2.z = (pos2.z - 0.5) * 2. * radius;\n\n// vec3 pos3 = texture2D(t_position, vec2(a_id.x, a_id.y + 0.5)).xyz;\n// pos3.x = (pos3.x - 0.5) * 2. * radius;\n// pos3.y = (pos3.y - 0.5) * 2. * radius;\n// pos3.z = (pos3.z - 0.5) * 2. * radius;\n\n// vec3 pos4 = texture2D(t_position, vec2(a_id.x + 0.5, a_id.y + 0.5)).xyz;\n// pos4.x = (pos4.x - 0.5) * 2. * radius;\n// pos4.y = (pos4.y - 0.5) * 2. * radius;\n// pos4.z = (pos4.z - 0.5) * 2. * radius;\n\n// pos = mix(pos, pos2, u_progress);\n// pos = mix(pos, pos3, max(0., u_progress - 1.));\n// pos = mix(pos, pos4, max(0., u_progress - 2.));\n\npos = texture2D(t_simulation, vec2(a_id.x * 2., a_id.y * 2.)).xyz;\n// vec3 basePos = pos;\n\n// Mouse Animation -----\nvec4 mPos = vec4(pos, 1.);\nmPos *= rotationMatrix(vec3(1., 0., 0.), u_rotation.x * -1.);\nmPos *= rotationMatrix(vec3(0., 1., 0.), u_rotation.y * -1.);\nmPos *= rotationMatrix(vec3(0., 0., 1.), u_rotation.z * -1.);\nmPos.y -= 1.;\nmPos.x += u_offset.x;\nmPos.y += u_offset.y;\nvec2 resolution = mix(\n  u_resolution - u_resolution * 0.5,\n  u_resolution2 - u_resolution2 * 0.5,\n  min(1., max(0., u_progress2))\n);\nvec2 m = u_mouse * vec2(1., 1.);\nfloat dist = smoothstep( 1.25 + abs(max(u_delta.x, u_delta.y)), 0., distance(mPos.xy, m * resolution)); \npos.x += dist * sin(u_time * a_random.y) * (a_random.z*0.35 + u_delta.x) * abs( u_explode - 1.);\npos.y += dist * cos(u_time * a_random.y) * (a_random.z* 0.35 + u_delta.y) * abs( u_explode - 1.);\n\n// pos.x += m.x * 0.05;\n// pos.y += m.y * 0.05;\n\n// Offset Position -----\n// pos += u_offset;\n\n// Mouse Animation -----\n// vec4 fake_frag_coord  = mvPosition * vec4(pos, 1.);\n// fake_frag_coord.xyz /= fake_frag_coord.w;\n// fake_frag_coord.w = 1.0 / fake_frag_coord.w;\n// fake_frag_coord.xyz *= vec3 (0.5) + vec3 (0.5);\n// fake_frag_coord.xy  *= u_resolution.xy * 0.5; \n// fake_frag_coord.xy  *= vec2(-1., 1.); \n\n// // Mouse Animation -----\n// vec4 mPos = vec4(pos.xy, 1., 1.);\n// mPos.y -= 1.;\n// mPos.xy += u_offset.xy;\n// // mPos *= rotationMatrix(vec3(1., 0., 0.), u_rotation.x);\n// // mPos *= rotationMatrix(vec3(0., 1., 0.), u_rotation.y);\n// // mPos *= rotationMatrix(vec3(0., 0., 1.), u_rotation.z);\n// vec4 tFluid = texture2D( t_fluid, (mPos.xy + u_resolution * 0.5) / u_resolution );\n// // pos.x += tFluid.r * 0.025;\n// // pos.x -= tFluid.b * 0.025;\n// pos.z -= tFluid.r * 0.01;\n\n// vec2 resolution = u_resolution * 0.5;\n// vec2 m = resolution * u_mouse * vec2(1., 1.);\n// float dist = smoothstep(2., 0., distance(pos.xy + u_offset.xy, m));\n// pos *= max(1., 1. + dist * 0.1 + dist * abs(sin(basePos.y * 120. + u_time * 0.5)) * 0.1);\n\nfloat n = snoise(pos * u_amplitude);\n// float n2 = snoise(pos * u_amplitude2 + u_time * 0.2);\nmat4 rotMat = rotationMatrix(vec3(1., 0., 1.), n);\n// mat4 rotMat2 = rotationMatrix(vec3(0., 1., 0.), mod(u_time * a_random.x * 2., 3.1416 * 2.));\nmat4 rotMat2 = rotationMatrix(vec3(0., 1., 1.), mod(n + u_time, 3.1416 * 2.));\n\nfloat scale = texture2D(t_scale, a_id).x * u_scale;\nfloat scale2 = texture2D(t_scale, vec2(a_id.x + 0.5, a_id.y)).x * u_scale;\nfloat scale3 = texture2D(t_scale, vec2(a_id.x, a_id.y + 0.5)).x * u_scale;\nfloat scale4 = texture2D(t_scale, vec2(a_id.x + 0.5, a_id.y + 0.5)).x * u_scale;\nscale = mix(scale, scale2, u_progress);\nscale = mix(scale, scale3, max(0., u_progress - 1.));\nscale = mix(scale, scale4, max(0., u_progress - 2.));\n\nscale += dist * 0.75 * abs( u_explode - 1.);\n\n#ifdef USE_INSTANCING\n  mat4 instanceMat = instanceMatrix;\n\n  instanceMat[3][0] = instanceMat[3][0] + pos.x;\n  instanceMat[3][1] = instanceMat[3][1] + pos.y;\n  instanceMat[3][2] = instanceMat[3][2] + pos.z;\n\n  mat4 rotMat3 = mat4(calcLookAtMatrix(vec3(instanceMat[3][0] + u_offset.x, instanceMat[3][1] + u_offset.y, instanceMat[3][2]), cameraPosition, 0.));\n\n  // instanceMat[0][0] = instanceMat[0][0] * smoothstep(0., 1., scale);\n  // instanceMat[1][1] = instanceMat[1][1] * smoothstep(0., 1., scale);\n  // instanceMat[2][2] = instanceMat[2][2] * smoothstep(0., 1., scale);\n\n  instanceMat[0][0] = instanceMat[0][0] * scale;\n  instanceMat[1][1] = instanceMat[1][1] * scale;\n  instanceMat[2][2] = instanceMat[2][2] * scale;\n\n  // instanceMat *= rotMat;\n  // documents stay flat and parallel to the screen (no per-particle rotation)\n\n\tmvPosition = instanceMat * mvPosition;\n  // mvPosition.xyz += u_offset;\n#endif\n\n// Offset Position -----\nmat4 modViewMatrix = modelViewMatrix;\nmodViewMatrix[3][0] += u_offset.x;\nmodViewMatrix[3][1] += u_offset.y;\nmodViewMatrix *= rotationMatrix(vec3(1., 0., 0.), u_rotation.x);\nmodViewMatrix *= rotationMatrix(vec3(0., 1., 0.), u_rotation.y);\nmodViewMatrix *= rotationMatrix(vec3(0., 0., 1.), u_rotation.z);\n\nmvPosition = modViewMatrix * mvPosition;\n\n// mat4 testMatrix = modelMatrix;\n// testMatrix[3][0] += u_offset.x;\n// testMatrix *= rotationMatrix(vec3(0., 1., 0.), u_rotation);\n\n// mvPosition2 = testMatrix * mvPosition2;\n\nv_pos = mvPosition.xyz;\nv_pos.z += 10.;\n\n// // Mouse Animation -----\n// vec2 resolution = u_resolution * 0.5;\n// vec2 m = u_mouse * vec2(1., 1.);\n// // float dist = smoothstep(.1, 0., distance(mvPosition.xy / resolution, m));\n// float dist = step(distance(mvPosition.xy / resolution, m), .1);\n// mvPosition.x += dist * sin(u_time * a_random.y) * a_random.z;\n// mvPosition.y += dist * cos(u_time * a_random.y) * a_random.z;\n// // mvPosition.z += dist * cos(u_time * a_random.y) * a_random.z;\n// // mvPosition.z += dist * abs(sin(basePos.y * 120. + u_time * 0.5)) * 1.5;\n\n// vec4 tFluid = texture2D( t_fluid, (mvPosition.xy + vec2(1.) ) * 0.5);\n// mvPosition.x += tFluid.r * 0.01;\n// mvPosition.x -= tFluid.b * 0.01;\n// pos.y += tFluid.g * 0.01;\n// mvPosition.z += tFluid.r * 0.05;\n\ngl_Position = projectionMatrix * mvPosition;\n\nv_id = a_id;\nv_hover = dist;";
var nn = "#define GLSLIFY 1\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex \n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : stegu\n//     Lastmod : 20201014 (stegu)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//               https://github.com/stegu/webgl-noise\n// \n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+10.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v)\n  { \n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i); \n  vec4 p = permute( permute( permute( \n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), \n                                dot(p2,x2), dot(p3,x3) ) );\n  }";
var rn = "#define GLSLIFY 1\nfloat qinticOut(float t) {\n  // return 1.0 - (pow(t - 1.0, 5.0));\n  return 1.0 - pow(1.0 - t , 5.0);\n  // return 1.0 - ((t - 1.0)*(t - 1.0)*(t - 1.0)*(t - 1.0)*(t - 1.0));\n}\n";
var on = "#define GLSLIFY 1\nfloat qinticInOut(float x)\n{\n  //  x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;\n  float inValue = 16.0 * x * x * x * x * x;\n  float outValue = 1.0 - pow(-2.0 * x + 2.0, 5.0) / 2.0;\n  return step(inValue , 0.5) * inValue + step(0.5,outValue) * outValue;\n}\n";
var sn = "precision highp float;\n#define GLSLIFY 1\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 modelViewMatrix;\n\nattribute lowp vec2 position;\nattribute highp vec2 uv;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n  vUv = uv;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0., 1.);\n}\n";
class an extends Re.T {
  constructor({
    fluid: e = null
  } = {}) {
    super();
    this._nb = u.isMobile ? 7000 : 10000;
    this._loaded = false;
    this.objectVisible = true;
    this.active = false;
    this._hasRendered = false;
    this._posRT = null;
    this._easing = 0.1;
    this._factor = u.isMobile ? 2.5 : 4.35;
    this._scale = u.isMobile ? 1.2 : 1.55;
    this._m = {
      x: 0,
      y: 0
    };
    this._mTg = {
      x: 0,
      y: 0
    };
    this._mPr = {
      x: 0,
      y: 0
    };
    this._mDelta = {
      x: 0,
      y: 0
    };
    this.royYEnd = u.isMobile ? 5.8 : 6;
    this._params = {
      pr: 0,
      baseRotation: new He.P(0, Math.PI * -0.25, 0),
      basePosition: new He.P()
    };
    this._position1 = new He.P(0, -1.19, 0);
    this.position.copy(this._position1);
    this._fluid = e;
  }
  _setupFBO() {
    const e = new Uint8Array(40000);
    u.WebGL.renderer.readRenderTargetPixels(this._posRT, 0, 0, 100, 100, e);
    const t = new Uint8Array(40000);
    u.WebGL.renderer.readRenderTargetPixels(this._posRT, 100, 0, 100, 100, t);
    const n = new Uint8Array(40000);
    u.WebGL.renderer.readRenderTargetPixels(this._posRT, 0, 100, 100, 100, n);
    const r = new Uint8Array(40000);
    u.WebGL.renderer.readRenderTargetPixels(this._posRT, 100, 100, 100, 100, r);
    const o = new Uint8Array(40000);
    u.WebGL.renderer.readRenderTargetPixels(this._posRT, 0, 0, 100, 100, o);
    const s = [];
    const a = [];
    const l = [];
    const c = [];
    const h = [];
    {
      let t = 0;
      for (let n = 0; n < e.length; n += 4) {
        s.push({
          x: e[n],
          y: e[n + 1],
          z: e[n + 2],
          index: t,
          order: null
        });
        t++;
      }
      s.sort((e, t) => t.y - e.y);
      for (let e = 0; e < s.length; e++) {
        s[e].order = e;
      }
      s.sort((e, t) => e.index - t.index);
    }
    {
      let e = 0;
      for (let n = 0; n < t.length; n += 4) {
        a.push({
          x: t[n],
          index: e,
          order: null
        });
        e++;
      }
      a.sort((e, t) => e.x - t.x);
      for (let e = 0; e < a.length; e++) {
        a[e].order = e;
      }
      a.sort((e, t) => e.index - t.index);
    }
    {
      let e = 0;
      for (let t = 0; t < n.length; t += 4) {
        l.push({
          x: n[t],
          index: e,
          order: null
        });
        e++;
      }
      l.sort((e, t) => t.x - e.x);
      for (let e = 0; e < l.length; e++) {
        l[e].order = e;
      }
      l.sort((e, t) => e.index - t.index);
    }
    {
      let e = 0;
      for (let t = 0; t < r.length; t += 4) {
        c.push({
          y: r[t + 1],
          index: e,
          order: null
        });
        e++;
      }
      c.sort((e, t) => t.y - e.y);
      for (let e = 0; e < c.length; e++) {
        c[e].order = e;
      }
      c.sort((e, t) => e.index - t.index);
    }
    {
      let e = 0;
      for (let t = 0; t < o.length; t += 4) {
        h.push({
          y: o[t + 1],
          index: e,
          order: null
        });
        e++;
      }
      h.sort((e, t) => e.y - t.y);
      for (let e = 0; e < h.length; e++) {
        h[e].order = e;
      }
      h.sort((e, t) => e.index - t.index);
    }
    const d = 100;
    const f = 100;
    const m = new Float32Array(40000);
    this._tParams = new qt.I(m, d, f, Le.wk1, Le.VzW, Le.xfE, Le.rpg, Le.rpg, Le.TyD, Le.TyD, 0);
    this._tParams.generateMipmaps = false;
    const p = new Float32Array(40000);
    this._tParams2 = new qt.I(p, d, f, Le.wk1, Le.VzW, Le.xfE, Le.rpg, Le.rpg, Le.TyD, Le.TyD, 0);
    this._tParams2.generateMipmaps = false;
    const v = new Float32Array(40000);
    this._tParams3 = new qt.I(v, d, f, Le.wk1, Le.VzW, Le.xfE, Le.rpg, Le.rpg, Le.TyD, Le.TyD, 0);
    this._tParams3.generateMipmaps = false;
    for (let e = 0; e < this._nb; e++) {
      this._tParams.image.data[e * 4] = e % 2 == 0 ? Math.random() : Math.random() * -1;
      this._tParams.image.data[e * 4 + 1] = Math.floor(e / 100) / 200 + 0.0025;
      this._tParams.image.data[e * 4 + 2] = s[e].order;
      this._tParams.image.data[e * 4 + 3] = Math.random() * 0.0002 - 0.0001;
      this._tParams2.image.data[e * 4] = a[e].order;
      this._tParams2.image.data[e * 4 + 1] = l[e].order;
      this._tParams2.image.data[e * 4 + 2] = c[e].order;
      this._tParams2.image.data[e * 4 + 3] = h[e].order;
      this._tParams3.image.data[e * 4] = 1 + Math.random() * 5;
      this._tParams3.image.data[e * 4 + 1] = Math.random() * 2 - 1;
      this._tParams3.image.data[e * 4 + 2] = Ut(s[e].x, 0, 256, -1, 1);
      this._tParams3.image.data[e * 4 + 3] = 0;
    }
    this._tParams.needsUpdate = true;
    this._tParams2.needsUpdate = true;
    this._tParams3.needsUpdate = true;
    this._fboPos = new $t({
      width: 200,
      height: 200,
      type: u.isDesktop ? Le.VzW : Le.cLu
    });
    this._fboSpring = new $t({
      width: 200,
      height: 200,
      type: u.isDesktop ? Le.VzW : Le.cLu
    });
    this._simulationPos = new Jt({
      material: new Yt.F({
        uniforms: {
          t_position: {
            value: null
          },
          t_velocity: {
            value: null
          },
          t_params: {
            value: this._tParams
          },
          t_params2: {
            value: this._tParams2
          },
          t_pos: {
            value: null
          },
          t_oPos: {
            value: null
          },
          u_show: {
            value: 0
          },
          u_length: {
            value: this._nb
          },
          u_explode: {
            value: 0
          },
          u_factor: {
            value: this._factor
          },
          u_progress: {
            value: 0
          },
          u_rendered: {
            value: 0
          }
        },
        vertexShader: sn,
        fragmentShader: "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D t_position;\nuniform sampler2D t_oPos;\nuniform sampler2D t_velocity;\nuniform sampler2D t_params;\nuniform sampler2D t_params2;\n\nuniform float u_factor;\nuniform float u_length;\nuniform float u_show;\nuniform float u_explode;\nuniform float u_progress;\nuniform float u_time;\nuniform float u_rendered;\n\nvarying vec2 vUv;\n\nfloat qinticInOut(float x)\n{\n  //  x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;\n  float inValue = 16.0 * x * x * x * x * x;\n  float outValue = 1.0 - pow(-2.0 * x + 2.0, 5.0) / 2.0;\n  return step(inValue , 0.5) * inValue + step(0.5,outValue) * outValue;\n}\n\nvoid main() {\n  vec4 tOpos = texture2D(t_oPos, vUv);\n  vec3 pos = tOpos.xyz;\n\n  if (u_rendered > 0.) {\n    vec4 tVelocity = texture2D(t_velocity, vUv);\n    pos += tVelocity.xyz;\n\n  } else {\n    vec4 tParams = texture2D(t_params, vUv);\n    vec4 tParams2 = texture2D(t_params2, vUv);\n\n    // Show Animation -----\n    float d = 0.00005;\n    float d2 = 0.0005;\n    float showVal = min(1., max(0., (u_show * (1. + d * (u_length - 1.))) - d * tParams.z));\n    showVal = qinticInOut(showVal);\n    // float radius = mix(u_factor + tParams.x * 3., u_factor, showVal) + u_explode * tParams.y;\n    float radius = mix(u_factor + tParams.x * 3., u_factor, showVal) + min(1., max(0., (u_explode * (u_length - 1.)) - d2 * tParams2.w));\n\n    pos = texture2D(t_position, vec2(vUv.x * 0.5, vUv.y * 0.5)).xyz;\n    vec3 basePos = pos;\n\n    pos.x = (pos.x - 0.5) * 2. * radius;\n    pos.y = (pos.y - 0.5) * 2. * radius;\n    pos.z = (pos.z - 0.5) * 2. * radius;\n\n    vec3 pos2 = texture2D(t_position, vec2(vUv.x * 0.5 + 0.5, vUv.y * 0.5)).xyz;\n    pos2.x = (pos2.x - 0.5) * 2. * radius;\n    pos2.y = (pos2.y - 0.5) * 2. * radius;\n    pos2.z = (pos2.z - 0.5) * 2. * radius;\n\n    vec3 pos3 = texture2D(t_position, vec2(vUv.x * 0.5, vUv.y * 0.5 + 0.5)).xyz;\n    pos3.x = (pos3.x - 0.5) * 2. * radius;\n    pos3.y = (pos3.y - 0.5) * 2. * radius;\n    pos3.z = (pos3.z - 0.5) * 2. * radius;\n\n    vec3 pos4 = texture2D(t_position, vec2(vUv.x * 0.5 + 0.5, vUv.y * 0.5 + 0.5)).xyz;\n    pos4.x = (pos4.x - 0.5) * 2. * radius;\n    pos4.y = (pos4.y - 0.5) * 2. * radius;\n    pos4.z = (pos4.z - 0.5) * 2. * radius;\n\n    pos = mix(pos, pos2, u_progress);\n    pos = mix(pos, pos3, max(0., u_progress - 1.));\n    pos = mix(pos, pos4, max(0., u_progress - 2.));\n  }\n\n  gl_FragColor = vec4(pos, 1.);\n}\n"
      }),
      scene: true
    });
    this._simulationPos.material.uniforms.t_position.value = u.WebGL.assets.textures.cone_position_exr;
    this._simulationPos.material.uniforms.t_position.value.minFilter = this._simulationPos.material.uniforms.t_position.value.magFilter = Le.TyD;
    this._simulationPos.material.uniforms.t_position.value.flipY = true;
    this._simulationPos.material.uniforms.t_position.value.needsUpdate = true;
    this._simulationPos.material.needsUpdate = true;
    this._simulationSpring = new Jt({
      material: new Yt.F({
        uniforms: {
          t_position: {
            value: null
          },
          t_oTarget: {
            value: null
          },
          t_params: {
            value: this._tParams
          },
          t_params2: {
            value: this._tParams2
          },
          t_params3: {
            value: this._tParams3
          },
          t_velocity: {
            value: null
          },
          t_oVelocity: {
            value: null
          },
          u_show: {
            value: 0
          },
          u_length: {
            value: this._nb
          },
          u_explode: {
            value: 0
          },
          u_factor: {
            value: this._factor
          },
          u_progress: {
            value: 0
          },
          u_spring: {
            value: 0.006
          },
          u_friction: {
            value: 0.892
          },
          u_resolution: {
            value: new i.F()
          },
          u_rendered: {
            value: 0
          },
          u_sway: {
            value: new i.F()
          }
        },
        vertexShader: sn,
        fragmentShader: "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D t_oTarget;\nuniform sampler2D t_position;\nuniform sampler2D t_oVelocity;\nuniform sampler2D t_params;\nuniform sampler2D t_params2;\nuniform sampler2D t_params3;\n\nuniform vec2 u_resolution;\nuniform float u_factor;\nuniform float u_length;\nuniform float u_show;\nuniform float u_explode;\nuniform float u_progress;\nuniform float u_time;\nuniform float u_spring;\nuniform float u_friction;\nuniform float u_rendered;\nuniform float u_delay;\nuniform vec2 u_sway;\n\nvarying vec2 vUv;\n\nfloat qinticInOut(float x)\n{\n  //  x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;\n  float inValue = 16.0 * x * x * x * x * x;\n  float outValue = 1.0 - pow(-2.0 * x + 2.0, 5.0) / 2.0;\n  return step(inValue , 0.5) * inValue + step(0.5,outValue) * outValue;\n}\n\nvoid main() {\n  float vx = 0.;\n  float vy = 0.;\n  float vz = 0.;\n  float tp = 0.;\n\n  if (u_rendered > 0.) {\n    vec4 tParams = texture2D(t_params, vUv);\n    vec4 tParams2 = texture2D(t_params2, vUv);\n    vec4 tParams3 = texture2D(t_params3, vUv);\n\n    // Show Animation -----\n    float d = 0.00005;\n    float d3 = 0.00015;\n    float showVal = min(1., max(0., (u_show * (1. + d * (u_length - 1.))) - d * tParams.z));\n    showVal = qinticInOut(showVal);\n    // float radius = mix(u_factor + tParams.x * 3., u_factor, showVal) + u_explode * tParams.y;\n    // float radius = mix(u_factor + tParams.x * 3., u_factor, showVal) + min(1., max(0., u_explode * (1. + d3 * (u_length - 1.)) - d3 * tParams2.w)) * 6.;\n    float radius = mix(u_factor + tParams.x * 3., u_factor, showVal);\n\n    vec3 pos = texture2D(t_position, vec2(vUv.x * 0.5, vUv.y * 0.5)).xyz;\n    vec3 basePos = pos;\n\n    pos.x = (pos.x - 0.5) * 2. * radius;\n    pos.y = (pos.y - 0.5) * 2. * radius;\n    pos.z = (pos.z - 0.5) * 2. * radius;\n\n    vec3 pos2 = texture2D(t_position, vec2(vUv.x * 0.5 + 0.5, vUv.y * 0.5)).xyz;\n    pos2.x = (pos2.x - 0.5) * 2. * radius;\n    pos2.y = (pos2.y - 0.5) * 2. * radius;\n    pos2.z = (pos2.z - 0.5) * 2. * radius;\n\n    vec3 pos3 = texture2D(t_position, vec2(vUv.x * 0.5, vUv.y * 0.5 + 0.5)).xyz;\n    pos3.x = (pos3.x - 0.5) * 2. * radius;\n    pos3.y = (pos3.y - 0.5) * 2. * radius;\n    pos3.z = (pos3.z - 0.5) * 2. * radius;\n\n    vec3 pos4 = texture2D(t_position, vec2(vUv.x * 0.5 + 0.5, vUv.y * 0.5 + 0.5)).xyz;\n    pos4.x = (pos4.x - 0.5) * 2. * radius;\n    pos4.y = (pos4.y - 0.5) * 2. * radius;\n    pos4.z = (pos4.z - 0.5) * 2. * radius;\n\n    // vec3 pos5 = tParams3.xyz;\n    // pos5.xy *= u_resolution * 2.;\n\n    // vec3 pos5 = tParams3.xyz;\n    // pos5.xyz *= vec3(u_resolution * 2., u_resolution.x * 2.);\n\n    float d2 = 0.0005;\n    float d4 = u_delay; // 0.000025 for mobile and 0.0005 for dekstop\n    pos = mix(pos, pos2, min(1., max(0., ((u_progress * (1. + d4 * (u_length - 1.))) - d4 * tParams2.x))));\n    pos = mix(pos, pos3, min(1., max(0., ((max(0., u_progress - 1.) * (1. + d2 * (u_length - 1.))) - d2 * tParams2.y))));\n    pos = mix(pos, pos4, min(1., max(0., ((max(0., u_progress - 2.) * (1. + d4 * (u_length - 1.))) - d4 * tParams2.z))));\n    pos = mix(pos, pos * tParams3.x, min(1., max(0., u_explode * (1. + d3 * (u_length - 1.)) - d3 * tParams2.w)));\n\n    vec4 tOtarget = texture2D(t_oTarget, vUv);\n    vec4 tOVelocity = texture2D(t_oVelocity, vUv);\n\n    float spring = u_spring + tParams.w;\n    float friction = u_friction;\n\n    // Scroll sway while exploded (p 1.1-2.7): every particle drifts left/right by its own amount (parallax).\n    pos.xy += u_sway * (0.55 + 0.9 * tParams.x) * u_explode;\n\n    float dx = pos.x - tOtarget.x;\n    float dy = pos.y - tOtarget.y;\n    float dz = pos.z - tOtarget.z;\n\n    float ax = dx * spring;\n    float ay = dy * spring;\n    float az = dz * spring;\n\n    float wasTp = tOVelocity.w;\n    vx = tOVelocity.x * (1. - wasTp) + ax;\n    vy = tOVelocity.y * (1. - wasTp) + ay;\n    vz = tOVelocity.z * (1. - wasTp) + az;\n\n    vx *= friction;\n    vy *= friction;\n    vz *= friction;\n\n  }\n\n  gl_FragColor = vec4(vec3(vx, vy, vz), tp);\n}\n"
      }),
      scene: true
    });
    this._simulationSpring.material.uniforms.t_position.value = u.WebGL.assets.textures.cone_position_exr;
    this._simulationSpring.material.uniforms.t_position.value.minFilter = this._simulationSpring.material.uniforms.t_position.value.magFilter = Le.TyD;
    this._simulationSpring.material.uniforms.t_position.value.flipY = true;
    this._simulationSpring.material.uniforms.t_position.value.needsUpdate = true;
    this._simulationSpring.material.needsUpdate = true;
  }
  _setupGeometry() {
    u.WebGL.assets.models.piramed.scene.traverse(e => {
      if (e.type === "Mesh") {
        this._geometry = e.geometry.clone();
      }
    });
  }
  _setupMaterial() {
    this._material = new jt({
      transparent: true,
      customUniforms: [{
        id: "t_position",
        type: "sampler2D",
        value: null
      }, {
        id: "t_scale",
        type: "sampler2D",
        value: null
      }, {
        id: "t_color",
        type: "sampler2D",
        value: null
      }, {
        id: "u_factor",
        type: "float",
        value: this._factor
      }, {
        id: "u_time",
        type: "float",
        value: 0
      }, {
        id: "u_scale",
        type: "float",
        value: this._scale
      }, {
        id: "u_amplitude",
        type: "float",
        value: 0.619
      }, {
        id: "u_colorFactor",
        type: "float",
        value: 1
      }, {
        id: "u_show",
        type: "float",
        value: 0
      }, {
        id: "u_length",
        type: "float",
        value: this._nb
      }, {
        id: "u_mouse",
        type: "vec2",
        value: new i.F(0, 0)
      }, {
        id: "u_resolution",
        type: "vec2",
        value: new i.F(u.window.w, u.window.h)
      }, {
        id: "u_offset",
        type: "vec3",
        value: new He.P(0, 0, 0)
      }, {
        id: "u_explode",
        type: "float",
        value: 0
      }, {
        id: "u_progress",
        type: "float",
        value: 0
      }, {
        id: "u_rotation",
        type: "vec3",
        value: new He.P()
      }, {
        id: "u_amplitude2",
        type: "float",
        value: 0.5
      }, {
        id: "t_simulation",
        type: "sampler2D",
        value: null
      }, {
        id: "t_fluid",
        type: "sampler2D",
        value: this._fluid ? this._fluid.density.read.texture : null
      }, {
        id: "u_resolution2",
        type: "vec2",
        value: new i.F()
      }, {
        id: "u_progress2",
        type: "float",
        value: 0
      }, {
        id: "u_delta",
        type: "vec2",
        value: new i.F()
      }, {
        id: "u_delay",
        type: "vec2",
        value: u.isMobile ? 0.000025 : 0.0005
      }, {
        id: "u_mobileRotation",
        type: "float",
        value: Math.PI * 1
      }],
      onBeforeCompile: function (e) {
        for (let t = 0; t < this._customUniforms.length; t++) {
          const n = this._customUniforms[t];
          e.uniforms[n.id] = n;
          e.vertexShader = `uniform ${n.type} ${n.id};
${e.vertexShader}`;
          e.fragmentShader = `uniform ${n.type} ${n.id};
${e.fragmentShader}`;
        }
        e.vertexShader = nn + e.vertexShader;
        e.vertexShader = on + e.vertexShader;
        e.vertexShader = en + e.vertexShader;
        e.vertexShader = rn + e.vertexShader;
        e.vertexShader = "attribute vec4 a_random;\n" + e.vertexShader;
        e.vertexShader = "attribute vec4 a_angle;\n" + e.vertexShader;
        e.vertexShader = "attribute vec2 a_id;\n" + e.vertexShader;
        e.vertexShader = "varying vec2 v_id;\n" + e.vertexShader;
        e.vertexShader = "varying vec3 v_pos;\n" + e.vertexShader;
        e.vertexShader = "varying float v_hover;\n" + e.vertexShader;
        e.vertexShader = "attribute float a_order;\n" + e.vertexShader;
        e.vertexShader = "attribute float a_index;\n" + e.vertexShader;
        e.vertexShader = e.vertexShader.replace("#include <project_vertex>", tn);
        e.vertexShader = e.vertexShader.replace("#include <worldpos_vertex>", "#define GLSLIFY 1\n#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION )\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMat * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif");
        e.fragmentShader = "varying vec3 v_pos;\n" + e.fragmentShader;
        e.fragmentShader = "varying vec2 v_id;\n" + e.fragmentShader;
        e.fragmentShader = "varying float v_hover;\n" + e.fragmentShader;
        e.fragmentShader = e.fragmentShader.replace("#include <output_fragment>", "#define GLSLIFY 1\nvec3 col = texture2D(t_color, v_id).xyz;\nvec3 col2 = texture2D(t_color, vec2(v_id.x + 0.5, v_id.y)).xyz;\nvec3 col3 = texture2D(t_color, vec2(v_id.x, v_id.y + 0.5)).xyz;\nvec3 col4 = texture2D(t_color, vec2(v_id.x + 0.5, v_id.y + 0.5)).xyz;\ncol = mix(col, col2, u_progress);\ncol = mix(col, col3, max(0., u_progress - 1.));\ncol = mix(col, col4, max(0., u_progress - 2.));\n// col += v_hover * 0.5;\ncol = mix(col, vec3(0.45), max(0., v_hover - u_explode) * abs( u_explode - 1.));\n\n#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n// https://github.com/mrdoob/three.js/pull/22425\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= transmissionAlpha + 0.1;\n#endif\noutgoingLight.rgb = col.rgb * u_colorFactor;\n// outgoingLight.rgb = vec3(smoothstep(-7., 5., v_pos.z));\n// outgoingLight.rgb = vec3(step(1., v_pos.y / (u_resolution.y * 0.5)));\n// outgoingLight.rgb = vec3(v_pos.x / (u_resolution.x * 0.5));\n// outgoingLight.rgb = vec3(v_pos.y / (u_resolution.y * 0.5));\n// float alpha = diffuseColor.a * mix(smoothstep(-8., 5., v_pos.z), 1., u_explode);\nfloat edgeFade = mix(1., smoothstep(-1.6, -1.2, v_pos.x / (u_resolution.x * 0.5)), smoothstep(0.5, 1., u_progress) * (1. - smoothstep(2.2, 2.8, u_progress)));\nfloat alpha = diffuseColor.a * smoothstep(-4.5, 4., v_pos.z) * edgeFade;\ngl_FragColor = vec4( outgoingLight, alpha );");
      }
    });
    this._material.customUniforms[0].value = u.WebGL.assets.textures.cone_position_exr;
    this._material.customUniforms[1].value = u.WebGL.assets.textures.cone_scale;
    this._material.customUniforms[2].value = u.WebGL.assets.textures.cone_color;
    this._material.customUniforms[0].value.minFilter = this._material.customUniforms[0].value.magFilter = Le.TyD;
    this._material.customUniforms[0].value.flipY = true;
    this._material.customUniforms[0].value.needsUpdate = true;
    this._material.customUniforms[1].value.minFilter = this._material.customUniforms[0].value.magFilter = Le.TyD;
    this._material.customUniforms[1].value.flipY = false;
    this._material.customUniforms[1].value.needsUpdate = true;
    this._material.customUniforms[2].value.minFilter = this._material.customUniforms[0].value.magFilter = Le.TyD;
    this._material.customUniforms[2].value.flipY = false;
    this._material.customUniforms[2].value.needsUpdate = true;
    this._material.needsUpdate = true;
  }
  _setupMesh() {
    this._mesh = new Lt.S(this._geometry, this._material, this._nb);
    const e = new It.y();
    const t = new He.P();
    const n = new Rt._();
    const r = new He.P();
    const o = new Float32Array(this._nb * 4);
    const s = new Float32Array(this._nb * 4);
    const a = new Float32Array(this._nb * 2);
    const l = new Float32Array(this._nb);
    const c = new Float32Array(this._nb);
    let h = 0;
    for (let i = 0; i < this._nb; i++) {
      const d = 0;
      const f = 0;
      const m = 0;
      const p = 0.1;
      t.set(d, f, m);
      r.set(p, p, p);
      e.compose(t, n, r);
      this._mesh.setMatrixAt(i, e);
      e.identity();
      a[i * 2] = i % 100 / 200 + 0.0025;
      a[i * 2 + 1] = Math.floor(h / 100) / 200 + 0.0025;
      s[i * 4] = Math.random();
      s[i * 4 + 1] = Math.random();
      s[i * 4 + 2] = Math.random();
      s[i * 4 + 3] = Math.random();
      l[i] = i;
      c[i] = 0;
      o[i * 4] = i % 2 == 0 ? Math.random() : Math.random() * -1;
      o[i * 4 + 1] = Math.random() * 0.8 + 0.2;
      o[i * 4 + 2] = u.isMobile ? Math.random() * 0.5 : Math.random() * 0.5 + 0.5;
      o[i * 4 + 3] = 0;
      h++;
    }
    this._geometry.setAttribute("a_index", new kt.l(l, 1));
    this._geometry.setAttribute("a_order", new kt.l(c, 1));
    this._geometry.setAttribute("a_id", new kt.l(a, 2));
    this._geometry.setAttribute("a_angle", new kt.l(s, 4));
    this._geometry.setAttribute("a_random", new kt.l(o, 4));
    this._depthMaterial = new Bt({
      transparent: true,
      customUniforms: {
        t_position: {
          type: "sampler2D",
          value: this._material.customUniforms[0].value
        },
        t_scale: {
          type: "sampler2D",
          value: this._material.customUniforms[1].value
        },
        t_color: {
          type: "sampler2D",
          value: this._material.customUniforms[2].value
        },
        u_factor: {
          type: "float",
          value: this._factor
        },
        u_time: {
          type: "float",
          value: 0
        },
        u_scale: {
          type: "float",
          value: this._scale
        },
        u_amplitude: {
          type: "float",
          value: 0.619
        },
        u_colorFactor: {
          type: "float",
          value: 1
        },
        u_show: {
          type: "float",
          value: 0
        },
        u_length: {
          type: "float",
          value: this._nb
        },
        u_mouse: {
          type: "vec2",
          value: new i.F(0, 0)
        },
        u_resolution: {
          type: "vec2",
          value: new i.F(u.window.w, u.window.h)
        },
        u_offset: {
          type: "vec3",
          value: new He.P(0, 0, 0)
        },
        u_explode: {
          type: "float",
          value: 0
        },
        u_progress: {
          type: "float",
          value: 0
        },
        u_rotation: {
          type: "vec3",
          value: new He.P()
        },
        u_amplitude2: {
          type: "float",
          value: 0.5
        },
        t_simulation: {
          type: "sampler2D",
          value: null
        },
        t_fluid: {
          type: "sampler2D",
          value: this._fluid ? this._fluid.density.read.texture : null
        },
        u_resolution2: {
          type: "vec2",
          value: new i.F()
        },
        u_progress2: {
          type: "float",
          value: 0
        },
        u_delta: {
          type: "vec2",
          value: new i.F()
        },
        u_mobileRotation: {
          type: "float",
          value: u.isDesktop ? Math.PI * 1 : 0
        }
      },
      onBeforeCompile: function (e) {
        e.vertexShader = nn + e.vertexShader;
        e.vertexShader = on + e.vertexShader;
        e.vertexShader = en + e.vertexShader;
        e.vertexShader = rn + e.vertexShader;
        e.vertexShader = "attribute vec4 a_random;\n" + e.vertexShader;
        e.vertexShader = "attribute vec4 a_angle;\n" + e.vertexShader;
        e.vertexShader = "attribute vec2 a_id;\n" + e.vertexShader;
        e.vertexShader = "varying vec2 v_id;\n" + e.vertexShader;
        e.vertexShader = "varying vec3 v_pos;\n" + e.vertexShader;
        e.vertexShader = "varying float v_hover;\n" + e.vertexShader;
        e.vertexShader = "attribute float a_order;\n" + e.vertexShader;
        e.vertexShader = "attribute float a_index;\n" + e.vertexShader;
        e.vertexShader = e.vertexShader.replace("#include <project_vertex>", tn);
      }
    });
    this._mesh.customDepthMaterial = this._depthMaterial;
    this.add(this._mesh);
    // Lets DOM overlays (the stamp) stay glued to the document: maps a point given in the simulation space of the
    // particles (p - 0.5) * 2 * radius to a CSS pixel, with the same matrices as the vertex shader (tn):
    // modelView with u_offset added, times Rx * Ry * Rz of u_rotation, times the projection of the particle camera.
    window.__dalaProject = (px, py, pz) => {
      const cam = u.WebGL && u.WebGL.particleCamera;
      if (!cam || !this._mesh) return null;
      const mul = (a, b) => {
        const o = new Array(16);
        for (let c = 0; c < 4; c++) {
          for (let r = 0; r < 4; r++) {
            let s = 0;
            for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
            o[c * 4 + r] = s;
          }
        }
        return o;
      };
      const rot = (ax, ay, az, ang) => {
        const l = Math.hypot(ax, ay, az);
        ax /= l; ay /= l; az /= l;
        const s = Math.sin(ang);
        const c = Math.cos(ang);
        const oc = 1 - c;
        return [oc * ax * ax + c, oc * ax * ay - az * s, oc * az * ax + ay * s, 0,
                oc * ax * ay + az * s, oc * ay * ay + c, oc * ay * az - ax * s, 0,
                oc * az * ax - ay * s, oc * ay * az + ax * s, oc * az * az + c, 0,
                0, 0, 0, 1];
      };
      const off = this._material.customUniforms[12].value;
      const ang = this._material.customUniforms[15].value;
      const mv = Array.from(this._mesh.modelViewMatrix.elements);
      mv[12] += off.x;
      mv[13] += off.y;
      const m = mul(mul(mul(mv, rot(1, 0, 0, ang.x)), rot(0, 1, 0, ang.y)), rot(0, 0, 1, ang.z));
      const v = [px, py, pz, 1];
      const view = [0, 0, 0, 0];
      for (let r = 0; r < 4; r++) view[r] = m[r] * v[0] + m[4 + r] * v[1] + m[8 + r] * v[2] + m[12 + r] * v[3];
      const pe = cam.projectionMatrix.elements;
      const clip = [0, 0, 0, 0];
      for (let r = 0; r < 4; r++) clip[r] = pe[r] * view[0] + pe[4 + r] * view[1] + pe[8 + r] * view[2] + pe[12 + r] * view[3];
      if (!(clip[3] > 0)) return null;
      return [(clip[0] / clip[3] * 0.5 + 0.5) * window.innerWidth, (1 - (clip[1] / clip[3] * 0.5 + 0.5)) * window.innerHeight];
    };
  }
  activate({
    delay: e = 0
  } = {}) {
    if (!this.active) {
      const t = 3;
      A.p8.killTweensOf(this._simulationPos.material.uniforms.u_show);
      A.p8.to(this._simulationPos.material.uniforms.u_show, {
        value: 1,
        duration: t,
        ease: "Power0.easeNone",
        delay: e
      });
      A.p8.killTweensOf(this._simulationSpring.material.uniforms.u_show);
      A.p8.to(this._simulationSpring.material.uniforms.u_show, {
        value: 1,
        duration: t,
        ease: "Power0.easeNone",
        delay: e
      });
      A.p8.killTweensOf(this._material.customUniforms[8]);
      A.p8.to(this._material.customUniforms[8], {
        value: 1,
        duration: t,
        ease: "Power0.easeNone",
        delay: e
      });
      A.p8.killTweensOf(this._depthMaterial.customUniforms.u_show);
      A.p8.to(this._depthMaterial.customUniforms.u_show, {
        value: 1,
        duration: t,
        ease: "Power0.easeNone",
        delay: e
      });
      A.p8.killTweensOf(this._params.baseRotation);
      A.p8.to(this._params.baseRotation, {
        y: 0,
        duration: t,
        ease: "Power2.easeOut",
        delay: e
      });
      this.active = true;
    }
  }
  deactivate({
    delay: e = 0
  } = {}) {
    if (this.active) {
      A.p8.killTweensOf(this._material.customUniforms[8]);
      A.p8.to(this._material.customUniforms[8], {
        value: 3,
        duration: 3,
        ease: "Power0.easeNone",
        delay: e
      });
      A.p8.killTweensOf(this._depthMaterial.customUniforms.u_show);
      A.p8.to(this._depthMaterial.customUniforms.u_show, {
        value: 3,
        duration: 3,
        ease: "Power0.easeNone",
        delay: e
      });
      this.active = false;
    }
  }
  setProgess(e) {}
  onMousedown(e) {
    this._mTg = e;
    this._mPr.x = this._mTg.x;
    this._mPr.y = this._mTg.y;
    this._mDelta.x = 0;
    this._mDelta.y = 0;
  }
  onMousemove(e) {
    this._mTg = e;
    if (u.isMobile) {
      this._mDelta.x = zt((this._mTg.x - this._mPr.x) * 50, -0.1, 0.1);
      this._mDelta.y = zt((this._mTg.y - this._mPr.y) * 50, -0.1, 0.1);
    } else {
      this._mDelta.x = zt((this._mTg.x - this._mPr.x) * 50, -2, 2);
      this._mDelta.y = zt((this._mTg.y - this._mPr.y) * 50, -2, 2);
    }
    this._mPr.x = this._mTg.x;
    this._mPr.y = this._mTg.y;
  }
  onMouseleave() {
    this._mDelta.x = 0;
    this._mDelta.y = 0;
  }
  onAssetsLoaded({
    renderTarget: e
  } = {}) {
    this._posRT = e;
    this._setupFBO();
    this._setupGeometry();
    this._setupMaterial();
    this._setupMesh();
    this._loaded = true;
  }
  resize({
    camera: e
  } = {}) {
    if (this._material) {
      this._pSize = Nt(e, 10);
      this._pSize2 = Nt(e, 6.5);
      this._material.customUniforms[11].value.x = this._pSize.width;
      this._material.customUniforms[11].value.y = this._pSize.height;
      this._depthMaterial.customUniforms.u_resolution.value.x = this._pSize.width;
      this._depthMaterial.customUniforms.u_resolution.value.y = this._pSize.height;
      this._simulationSpring.material.uniforms.u_resolution.value.set(this._pSize.width, this._pSize.height);
      this._material.customUniforms[19].value.x = this._pSize2.width;
      this._material.customUniforms[19].value.y = this._pSize2.height;
      this._depthMaterial.customUniforms.u_resolution2.value.x = this._pSize2.width;
      this._depthMaterial.customUniforms.u_resolution2.value.y = this._pSize2.height;
    }
  }
  update(e) {
    if (this._loaded) {
      this._material.customUniforms[4].value = e;
      this._depthMaterial.customUniforms.u_time.value = e;
      this._material.customUniforms[18].value = this._fluid ? this._fluid.density.read.texture : null;
      this._depthMaterial.customUniforms.t_fluid.value = this._fluid ? this._fluid.density.read.texture : null;
      this._updateRotation();
      this._updateMouse();
      if (u.isMobile) {
        this._updateMobilePosition();
      } else {
        this._updatePosition();
      }
      this._updateFBO();
    }
  }
  _updateFBO() {
    if (this._hasRendered) {
      this._simulationSpring.material.uniforms.t_oTarget.value = this._fboPos.read.texture;
      u.WebGL.renderer.setRenderTarget(this._fboSpring.write);
      u.WebGL.renderer.render(this._simulationSpring.scene, this._simulationSpring.camera);
      this._fboSpring.swap();
      this._simulationSpring.material.uniforms.t_oVelocity.value = this._fboSpring.read.texture;
      this._simulationSpring.material.uniforms.t_velocity.value = this._fboSpring.write.texture;
      this._simulationPos.material.uniforms.t_velocity.value = this._fboSpring.write.texture;
      u.WebGL.renderer.setRenderTarget(this._fboPos.write);
      u.WebGL.renderer.render(this._simulationPos.scene, this._simulationPos.camera);
      this._fboPos.swap();
      this._simulationPos.material.uniforms.t_oPos.value = this._fboPos.read.texture;
      this._simulationPos.material.uniforms.t_pos.value = this._fboPos.write.texture;
      this._material.customUniforms[17].value = this._fboPos.write.texture;
      this._depthMaterial.customUniforms.t_simulation.value = this._fboPos.write.texture;
    } else {
      u.WebGL.renderer.setRenderTarget(this._fboPos.write);
      u.WebGL.renderer.render(this._simulationPos.scene, this._simulationPos.camera);
      this._fboPos.swap();
      this._simulationPos.material.uniforms.t_oPos.value = this._fboPos.read.texture;
      this._simulationPos.material.uniforms.t_pos.value = this._fboPos.write.texture;
      this._material.customUniforms[17].value = this._fboPos.write.texture;
      this._depthMaterial.customUniforms.t_simulation.value = this._fboPos.write.texture;
      u.WebGL.renderer.setRenderTarget(this._fboSpring.write);
      u.WebGL.renderer.render(this._simulationSpring.scene, this._simulationSpring.camera);
      this._fboSpring.swap();
      this._simulationSpring.material.uniforms.t_oVelocity.value = this._fboSpring.read.texture;
      this._simulationSpring.material.uniforms.t_velocity.value = this._fboSpring.write.texture;
      this._simulationPos.material.uniforms.u_rendered.value = 1;
      this._simulationSpring.material.uniforms.u_rendered.value = 1;
      this._hasRendered = true;
    }
  }
  _updateRotation() {
    const e = u.sectionProgress;
    const t = zt(Ut(e, 0, 1, 0, -Math.PI * 0.2), -Math.PI * 0.2, 0) + zt(Ut(e, 2.7, 3, 0, Math.PI * 0.2), 0, Math.PI * 0.2) + zt(Ut(e, 4.5, 5, 0, Math.PI * 0.25), 0, Math.PI * 0.25) - zt(Ut(e, 4.5, 5, 0, Math.PI * 1.25), 0, Math.PI * 1.25) + zt(Ut(e, 5.7, this.royYEnd, 0, Math.PI), 0, Math.PI);
    const n = zt(Ut(e, 2.7, 3, 0, 0), 0, 0) + 0;
    this._material.customUniforms[15].value.x += (0 - this._material.customUniforms[15].value.x) * (this._easing * 0.75);
    this._material.customUniforms[15].value.y += (t - this._material.customUniforms[15].value.y) * (this._easing * 0.75);
    this._material.customUniforms[15].value.z += (n - this._material.customUniforms[15].value.z) * (this._easing * 0.75);
    this._depthMaterial.customUniforms.u_rotation.value.x += (0 - this._depthMaterial.customUniforms.u_rotation.value.x) * (this._easing * 0.75);
    this._depthMaterial.customUniforms.u_rotation.value.y += (t - this._depthMaterial.customUniforms.u_rotation.value.y) * (this._easing * 0.75);
    this._depthMaterial.customUniforms.u_rotation.value.z += (n - this._depthMaterial.customUniforms.u_rotation.value.z) * (this._easing * 0.75);
    this.rotation.y = this._params.baseRotation.y;
  }
  _updateMouse() {
    this._mDelta.x += (0 - this._mDelta.x) * this._easing;
    this._mDelta.y += (0 - this._mDelta.y) * this._easing;
    this._material.customUniforms[10].value.x += (this._mTg.x - this._material.customUniforms[10].value.x) * (this._easing * 0.75);
    this._material.customUniforms[10].value.y += (this._mTg.y - this._material.customUniforms[10].value.y) * (this._easing * 0.75);
    this._depthMaterial.customUniforms.u_mouse.value.x += (this._mTg.x - this._depthMaterial.customUniforms.u_mouse.value.x) * (this._easing * 0.75);
    this._depthMaterial.customUniforms.u_mouse.value.y += (this._mTg.y - this._depthMaterial.customUniforms.u_mouse.value.y) * (this._easing * 0.75);
    this._material.customUniforms[21].value.x += (this._mDelta.x - this._material.customUniforms[21].value.x) * (this._easing * 0.75);
    this._material.customUniforms[21].value.y += (this._mDelta.y - this._material.customUniforms[21].value.y) * (this._easing * 0.75);
    this._depthMaterial.customUniforms.u_delta.value.x += (this._mDelta.x - this._depthMaterial.customUniforms.u_delta.value.x) * (this._easing * 0.75);
    this._depthMaterial.customUniforms.u_delta.value.y += (this._mDelta.y - this._depthMaterial.customUniforms.u_delta.value.y) * (this._easing * 0.75);
  }
  _updateSway(e, t) {
    // Drift direction per block while exploded: Introduction -> right, manifesto pair 1 -> left, pair 2 -> right.
    // Eased between blocks; faded out before the streams form (p 2.7) so the baked stream layout stays exact.
    const n = (a, b, c) => {
      const d = Math.min(1, Math.max(0, (c - a) / (b - a)));
      return d * d * (3 - 2 * d);
    };
    const i = t ? 1.5 : 1.1;
    const env = n(i, i + 0.3, e) * (1 - n(2.45, 2.7, e));
    const dir = 1 - 2 * n(1.9, 2.1, e) + 2 * n(2.25, 2.45, e);
    const x = (t ? 0.5 : 1.2) * env * dir;
    const y = (t ? 0.1 : 0.25) * env * -dir;
    const sw = this._simulationSpring.material.uniforms.u_sway.value;
    sw.x += (x - sw.x) * this._easing;
    sw.y += (y - sw.y) * this._easing;
  }
  _updatePosition() {
    const e = u.sectionProgress;
    this._updateSway(e, false);
    const t = zt(Ut(e, 0, 1, 3, -3), -3, 3) + zt(Ut(e, 1.25, 1.5, 0.905, 3.5), 0.905, 3.5) - zt(Ut(e, 2.8, 3, 0.905, 3), 0.905, 3) + zt(Ut(e, 4.5, 5, 0.905, 6), 0.905, 6) - zt(Ut(e, 4.5, 5, 0.905, 5), 0.905, 4);
    this._params.basePosition.x = t + this._material.customUniforms[10].value.x * 0;
    const n = zt(Ut(e, 2.7, 3, 0, 0.5), 0, 0.5) - zt(Ut(e, 4.5, 5, 0, 0.5), 0, 0.5) + zt(Ut(e, 5.7, 6, 0, 1.75), 0, 1.75);
    this._params.basePosition.y = n + this._material.customUniforms[10].value.y * 0;
    const i = zt(Ut(e, 1.1, 2.2, 0, 1), 0, 1) - zt(Ut(e, 2.8, 3, 0, 1), 0, 1) + zt(Ut(e, 4.5, 5, 0, 1), 0, 1) - zt(Ut(e, 5.7, 6, 0, 1), 0, 1);
    this._material.customUniforms[13].value += (i - this._material.customUniforms[13].value) * this._easing;
    this._simulationPos.material.uniforms.u_explode.value += (i - this._simulationPos.material.uniforms.u_explode.value) * this._easing;
    this._simulationSpring.material.uniforms.u_explode.value += (i - this._simulationSpring.material.uniforms.u_explode.value) * this._easing;
    const r = this._factor + zt(Ut(e, 4.5, 5, 0, 0.3), 0, 0.3) - zt(Ut(e, 5.7, 6, 0, 1), 0, 1);
    this._material.customUniforms[3].value += (r - this._material.customUniforms[3].value) * this._easing;
    this._simulationPos.material.uniforms.u_factor.value += (r - this._simulationPos.material.uniforms.u_factor.value) * this._easing;
    this._simulationSpring.material.uniforms.u_factor.value += (r - this._simulationPos.material.uniforms.u_factor.value) * this._easing;
    const o = zt(Ut(e, 2.7, 3, 0, 1), 0, 1) + zt(Ut(e, 3.3, 3.5, 0, 1), 0, 1) + zt(Ut(e, 5.7, 6, 0, 1), 0, 1);
    this._material.customUniforms[14].value += (o - this._material.customUniforms[14].value) * this._easing;
    this._simulationPos.material.uniforms.u_progress.value += (o - this._simulationPos.material.uniforms.u_progress.value) * this._easing;
    this._simulationSpring.material.uniforms.u_progress.value += (o - this._simulationSpring.material.uniforms.u_progress.value) * this._easing;
    const s = zt(Ut(e, 0, 1, 0, 1), 0, 1) - zt(Ut(e, 2.7, 3, 0, 1), 0, 1) + zt(Ut(e, 3, 3.5, 0, 1), 0, 1) - zt(Ut(e, 5.5, 5.5, 0, 1), 0, 1);
    this._material.customUniforms[20].value += (s - this._material.customUniforms[20].value) * this._easing;
    this._depthMaterial.customUniforms.u_progress2.value += (s - this._depthMaterial.customUniforms.u_progress2.value) * this._easing;
    this._material.customUniforms[12].value.x += (this._params.basePosition.x - this._material.customUniforms[12].value.x) * this._easing;
    this._material.customUniforms[12].value.y += (this._params.basePosition.y - this._material.customUniforms[12].value.y) * this._easing;
    this._depthMaterial.customUniforms.u_offset.value.x += (this._params.basePosition.x - this._depthMaterial.customUniforms.u_offset.value.x) * this._easing;
    this._depthMaterial.customUniforms.u_offset.value.y += (this._params.basePosition.y - this._depthMaterial.customUniforms.u_offset.value.y) * this._easing;
  }
  _updateMobilePosition() {
    const e = u.sectionProgress;
    this._updateSway(e, true);
    const t = zt(Ut(e, 0, 1, 1.5, 0), 0, 1.5) + zt(Ut(e, 1.25, 1.5, 0, 0), 0, 0) - zt(Ut(e, 2.8, 3, 0, 0), 0, 0) + zt(Ut(e, 3.3, 3.5, 0, 0), 0, 0) - zt(Ut(e, 4.5, 5, 0, 0), 0, 0);
    this._params.basePosition.x = t + this._material.customUniforms[10].value.x * 0.052;
    this._params.basePosition.y = 2 + this._material.customUniforms[10].value.y * 0;
    const n = zt(Ut(e, 1.4, 1.7, 0, 1), 0, 1) - zt(Ut(e, 2.7, 3, 0, 1), 0, 1) + zt(Ut(e, 4.5, 5, 0, 1), 0, 1) - zt(Ut(e, 5.7, 5.8, 0, 1), 0, 1);
    this._material.customUniforms[13].value += (n - this._material.customUniforms[13].value) * this._easing;
    this._simulationPos.material.uniforms.u_explode.value += (n - this._simulationPos.material.uniforms.u_explode.value) * this._easing;
    this._simulationSpring.material.uniforms.u_explode.value += (n - this._simulationSpring.material.uniforms.u_explode.value) * this._easing;
    const i = zt(Ut(e, 2.7, 3, 0, 1), 0, 1) + zt(Ut(e, 3.3, 3.5, 0, 1), 0, 1) + zt(Ut(e, 5.7, 5.8, 0, 1), 0, 1);
    this._material.customUniforms[14].value += (i - this._material.customUniforms[14].value) * this._easing;
    this._simulationPos.material.uniforms.u_progress.value += (i - this._simulationPos.material.uniforms.u_progress.value) * this._easing;
    this._simulationSpring.material.uniforms.u_progress.value += (i - this._simulationSpring.material.uniforms.u_progress.value) * this._easing;
    this._material.customUniforms[12].value.x += (this._params.basePosition.x - this._material.customUniforms[12].value.x) * this._easing;
    this._material.customUniforms[12].value.y += (this._params.basePosition.y - this._material.customUniforms[12].value.y) * this._easing;
    this._depthMaterial.customUniforms.u_offset.value.x += (this._params.basePosition.x - this._depthMaterial.customUniforms.u_offset.value.x) * this._easing;
    this._depthMaterial.customUniforms.u_offset.value.y += (this._params.basePosition.y - this._depthMaterial.customUniforms.u_offset.value.y) * this._easing;
  }
}
var ln = require("./3967.cjs");
var un = require("./4458.cjs");
var cn = require("./6682.cjs");
var hn = require("./8304.cjs");
const dn = {
  defines: {
    RINGS: 4,
    SAMPLES: 6
  },
  uniforms: {
    textureWidth: {
      value: 1
    },
    textureHeight: {
      value: 1
    },
    focalDepth: {
      value: 1.2
    },
    focalLength: {
      value: 35
    },
    fstop: {
      value: 0.9
    },
    tColor: {
      value: null
    },
    tDepth: {
      value: null
    },
    maxblur: {
      value: 1
    },
    showFocus: {
      value: 0
    },
    manualdof: {
      value: 0
    },
    vignetting: {
      value: 0
    },
    depthblur: {
      value: 0
    },
    threshold: {
      value: 0.5
    },
    gain: {
      value: 2
    },
    bias: {
      value: 0.5
    },
    fringe: {
      value: 0.7
    },
    znear: {
      value: 0.1
    },
    zfar: {
      value: 100
    },
    noise: {
      value: 1
    },
    dithering: {
      value: 0.0001
    },
    pentagon: {
      value: 0
    },
    shaderFocus: {
      value: 0
    },
    focusCoords: {
      value: new i.F()
    }
  },
  vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main() {\n\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n}",
  fragmentShader: "#define GLSLIFY 1\n#include <common>\n\nvarying vec2 vUv;\n\nuniform sampler2D tColor;\nuniform sampler2D tDepth;\nuniform float textureWidth;\nuniform float textureHeight;\n\nuniform float focalDepth;  //focal distance value in meters, but you may use autofocus option below\nuniform float focalLength; //focal length in mm\nuniform float fstop; //f-stop value\nuniform bool showFocus; //show debug focus point and focal range (red = focal point, green = focal range)\n\n/*\nmake sure that these two values are the same for your camera, otherwise distances will be wrong.\n*/\n\nuniform float znear; // camera clipping start\nuniform float zfar; // camera clipping end\n\n//------------------------------------------\n//user variables\n\nconst int samples = SAMPLES; //samples on the first ring\nconst int rings = RINGS; //ring count\n\nconst int maxringsamples = rings * samples;\n\nuniform bool manualdof; // manual dof calculation\nfloat ndofstart = 1.0; // near dof blur start\nfloat ndofdist = 2.0; // near dof blur falloff distance\nfloat fdofstart = 1.0; // far dof blur start\nfloat fdofdist = 3.0; // far dof blur falloff distance\n\nfloat CoC = 0.03; //circle of confusion size in mm (35mm film = 0.03mm)\n\nuniform bool vignetting; // use optical lens vignetting\n\nfloat vignout = 1.3; // vignetting outer border\nfloat vignin = 0.0; // vignetting inner border\nfloat vignfade = 22.0; // f-stops till vignete fades\n\nuniform bool shaderFocus;\n// disable if you use external focalDepth value\n\nuniform vec2 focusCoords;\n// autofocus point on screen (0.0,0.0 - left lower corner, 1.0,1.0 - upper right)\n// if center of screen use vec2(0.5, 0.5);\n\nuniform float maxblur;\n//clamp value of max blur (0.0 = no blur, 1.0 default)\n\nuniform float threshold; // highlight threshold;\nuniform float gain; // highlight gain;\n\nuniform float bias; // bokeh edge bias\nuniform float fringe; // bokeh chromatic aberration / fringing\n\nuniform bool noise; //use noise instead of pattern for sample dithering\n\nuniform float dithering;\n\nuniform bool depthblur; // blur the depth buffer\nfloat dbsize = 1.25; // depth blur size\n\n/*\nnext part is experimental\nnot looking good with small sample and ring count\nlooks okay starting from samples = 4, rings = 4\n*/\n\nuniform bool pentagon; //use pentagon as bokeh shape?\nfloat feather = 0.4; //pentagon shape feather\n\n//------------------------------------------\n\nfloat penta(vec2 coords) {\n  //pentagonal shape\n  float scale = float(rings) - 1.3;\n  vec4  HS0 = vec4( 1.0,         0.0,         0.0,  1.0);\n  vec4  HS1 = vec4( 0.309016994, 0.951056516, 0.0,  1.0);\n  vec4  HS2 = vec4(-0.809016994, 0.587785252, 0.0,  1.0);\n  vec4  HS3 = vec4(-0.809016994,-0.587785252, 0.0,  1.0);\n  vec4  HS4 = vec4( 0.309016994,-0.951056516, 0.0,  1.0);\n  vec4  HS5 = vec4( 0.0        ,0.0         , 1.0,  1.0);\n\n  vec4  one = vec4( 1.0 );\n\n  vec4 P = vec4((coords),vec2(scale, scale));\n\n  vec4 dist = vec4(0.0);\n  float inorout = -4.0;\n\n  dist.x = dot( P, HS0 );\n  dist.y = dot( P, HS1 );\n  dist.z = dot( P, HS2 );\n  dist.w = dot( P, HS3 );\n\n  dist = smoothstep( -feather, feather, dist );\n\n  inorout += dot( dist, one );\n\n  dist.x = dot( P, HS4 );\n  dist.y = HS5.w - abs( P.z );\n\n  dist = smoothstep( -feather, feather, dist );\n  inorout += dist.x;\n\n  return clamp( inorout, 0.0, 1.0 );\n}\n\nfloat bdepth(vec2 coords) {\n  // Depth buffer blur\n  float d = 0.0;\n  float kernel[9];\n  vec2 offset[9];\n\n  vec2 wh = vec2(1.0/textureWidth,1.0/textureHeight) * dbsize;\n\n  offset[0] = vec2(-wh.x,-wh.y);\n  offset[1] = vec2( 0.0, -wh.y);\n  offset[2] = vec2( wh.x -wh.y);\n\n  offset[3] = vec2(-wh.x,  0.0);\n  offset[4] = vec2( 0.0,   0.0);\n  offset[5] = vec2( wh.x,  0.0);\n\n  offset[6] = vec2(-wh.x, wh.y);\n  offset[7] = vec2( 0.0,  wh.y);\n  offset[8] = vec2( wh.x, wh.y);\n\n  kernel[0] = 1.0/16.0;   kernel[1] = 2.0/16.0;   kernel[2] = 1.0/16.0;\n  kernel[3] = 2.0/16.0;   kernel[4] = 4.0/16.0;   kernel[5] = 2.0/16.0;\n  kernel[6] = 1.0/16.0;   kernel[7] = 2.0/16.0;   kernel[8] = 1.0/16.0;\n\n  for( int i=0; i<9; i++ ) {\n    float tmp = texture2D(tDepth, coords + offset[i]).r;\n    d += tmp * kernel[i];\n  }\n\n  return d;\n}\n\nvec3 color(vec2 coords,float blur) {\n  //processing the sample\n\n  vec3 col = vec3(0.0);\n  vec2 texel = vec2(1.0/textureWidth,1.0/textureHeight);\n\n  col.r = texture2D(tColor,coords + vec2(0.0,1.0)*texel*fringe*blur).r;\n  col.g = texture2D(tColor,coords + vec2(-0.866,-0.5)*texel*fringe*blur).g;\n  col.b = texture2D(tColor,coords + vec2(0.866,-0.5)*texel*fringe*blur).b;\n\n  vec3 lumcoeff = vec3(0.299,0.587,0.114);\n  float lum = dot(col.rgb, lumcoeff);\n  float thresh = max((lum-threshold)*gain, 0.0);\n  return col+mix(vec3(0.0),col,thresh*blur);\n}\n\nvec3 debugFocus(vec3 col, float blur, float depth) {\n  float edge = 0.002*depth; //distance based edge smoothing\n  float m = clamp(smoothstep(0.0,edge,blur),0.0,1.0);\n  float e = clamp(smoothstep(1.0-edge,1.0,blur),0.0,1.0);\n\n  col = mix(col,vec3(1.0,0.5,0.0),(1.0-m)*0.6);\n  col = mix(col,vec3(0.0,0.5,1.0),((1.0-e)-(1.0-m))*0.2);\n\n  return col;\n}\n\nfloat linearize(float depth) {\n  return -zfar * znear / (depth * (zfar - znear) - zfar);\n}\n\nfloat vignette() {\n  float dist = distance(vUv.xy, vec2(0.5,0.5));\n  dist = smoothstep(vignout+(fstop/vignfade), vignin+(fstop/vignfade), dist);\n  return clamp(dist,0.0,1.0);\n}\n\nfloat gather(float i, float j, int ringsamples, inout vec3 col, float w, float h, float blur) {\n  float rings2 = float(rings);\n  float step = PI*2.0 / float(ringsamples);\n  float pw = cos(j*step)*i;\n  float ph = sin(j*step)*i;\n  float p = 1.0;\n  if (pentagon) {\n    p = penta(vec2(pw,ph));\n  }\n  col += color(vUv.xy + vec2(pw*w,ph*h), blur) * mix(1.0, i/rings2, bias) * p;\n  return 1.0 * mix(1.0, i /rings2, bias) * p;\n}\n\nvoid main() {\n  //scene depth calculation\n\n  float depth = linearize(texture2D(tDepth,vUv.xy).x);\n\n  // Blur depth?\n  if ( depthblur ) {\n    depth = linearize(bdepth(vUv.xy));\n  }\n\n  //focal plane calculation\n\n  float fDepth = focalDepth;\n\n  if (shaderFocus) {\n\n    fDepth = linearize(texture2D(tDepth,focusCoords).x);\n\n  }\n\n  // dof blur factor calculation\n\n  float blur = 0.0;\n\n  if (manualdof) {\n    float a = depth-fDepth; // Focal plane\n    float b = (a-fdofstart)/fdofdist; // Far DoF\n    float c = (-a-ndofstart)/ndofdist; // Near Dof\n    blur = (a>0.0) ? b : c;\n  } else {\n    float f = focalLength; // focal length in mm\n    float d = fDepth*1000.0; // focal plane in mm\n    float o = depth*1000.0; // depth in mm\n\n    float a = (o*f)/(o-f);\n    float b = (d*f)/(d-f);\n    float c = (d-f)/(d*fstop*CoC);\n\n    blur = abs(a-b)*c;\n  }\n\n  blur = clamp(blur,0.0,1.0);\n\n  // calculation of pattern for dithering\n\n  vec2 noise = vec2(rand(vUv.xy), rand( vUv.xy + vec2( 0.4, 0.6 ) ) )*dithering*blur;\n\n  // getting blur x and y step factor\n\n  float w = (1.0/textureWidth)*blur*maxblur+noise.x;\n  float h = (1.0/textureHeight)*blur*maxblur+noise.y;\n\n  // calculation of final color\n\n  vec3 col = vec3(0.0);\n\n  if(blur < 0.05) {\n    //some optimization thingy\n    col = texture2D(tColor, vUv.xy).rgb;\n  } else {\n    col = texture2D(tColor, vUv.xy).rgb;\n    float s = 1.0;\n    int ringsamples;\n\n    for (int i = 1; i <= rings; i++) {\n      /*unboxstart*/\n      ringsamples = i * samples;\n\n      for (int j = 0 ; j < maxringsamples ; j++) {\n        if (j >= ringsamples) break;\n        s += gather(float(i), float(j), ringsamples, col, w, h, blur);\n      }\n      /*unboxend*/\n    }\n\n    col /= s; //divide by sample count\n  }\n\n  if (showFocus) {\n    col = debugFocus(col, blur, depth);\n  }\n\n  if (vignetting) {\n    col *= vignette();\n  }\n\n  gl_FragColor.rgb = col;\n  gl_FragColor.a = 1.0;\n}"
};
class fn extends hn.w {
  constructor(e, t, {
    focalDepth: n = 1,
    focalLength: r = 35,
    fstop: o = 0.9,
    maxblur: s = 1,
    showFocus: a = 0,
    manualdof: l = 0,
    vignetting: u = 0,
    depthblur: c = 0,
    threshold: h = 0.5,
    gain: d = 2,
    bias: f = 0.5,
    fringe: m = 0.7,
    znear: p = 0.1,
    zfar: v = 100,
    noise: g = 1,
    dithering: x = 0.0001,
    pentagon: y = 0,
    shaderFocus: D = 0,
    focusCoords: b = new i.F(),
    width: _ = window.innerWidth,
    height: w = window.innerHeight
  } = {}) {
    super();
    this.scene = e;
    this.camera = t;
    this.renderTargetDepth = new Zt.d(_, w, {
      minFilter: Le.wem,
      magFilter: Le.wem
    });
    this.renderTargetDepth.texture.name = "BokehPass.depth";
    this.materialDepth = new Mt.l();
    this.materialDepth.depthPacking = Le.mSO;
    this.materialDepth.blending = Le.jFi;
    if (dn === undefined) {
      console.error("BokehPass relies on BokehShader");
    }
    const S = dn;
    const E = cn.rD.clone(S.uniforms);
    E.tDepth.value = this.renderTargetDepth.texture;
    E.textureWidth.value = _;
    E.textureHeight.value = w;
    E.focalDepth.value = n;
    E.focalLength.value = r;
    E.fstop.value = o;
    E.maxblur.value = s;
    E.showFocus.value = a;
    E.manualdof.value = l;
    E.vignetting.value = u;
    E.depthblur.value = c;
    E.threshold.value = h;
    E.gain.value = d;
    E.bias.value = f;
    E.fringe.value = m;
    E.znear.value = p;
    E.zfar.value = v;
    E.noise.value = g;
    E.dithering.value = x;
    E.pentagon.value = y;
    E.shaderFocus.value = D;
    E.focusCoords.value = b;
    this.materialBokeh = new Xe.j({
      defines: Object.assign({}, S.defines),
      uniforms: E,
      vertexShader: S.vertexShader,
      fragmentShader: S.fragmentShader
    });
    this.uniforms = E;
    this.needsSwap = true;
    this.fsQuad = new hn.T(this.materialBokeh);
    this._oldClearColor = new Ke.I();
  }
  setSize(e, t) {
    this.uniforms.textureWidth.value = e;
    this.uniforms.textureHeight.value = t;
  }
  render(e, t, n) {
    this.scene.traverse(e => {
      if (e.type === "Mesh") {
        if (e.customDepthMaterial !== undefined) {
          e._material = e.material;
          e.material = e.customDepthMaterial;
        } else {
          e._material = e.material;
          e.material = this.materialDepth;
        }
      }
    });
    e.getClearColor(this._oldClearColor);
    const i = e.getClearAlpha();
    const r = e.autoClear;
    e.autoClear = false;
    e.setClearColor(0);
    e.setClearAlpha(1);
    e.setRenderTarget(this.renderTargetDepth);
    e.clear();
    e.render(this.scene, this.camera);
    this.uniforms.tColor.value = n.texture;
    this.uniforms.znear.value = this.camera.near;
    this.uniforms.zfar.value = this.camera.far;
    if (this.renderToScreen) {
      e.setRenderTarget(null);
      this.fsQuad.render(e);
    } else {
      e.setRenderTarget(t);
      e.clear();
      this.fsQuad.render(e);
    }
    this.scene.traverse(e => {
      if (e.type === "Mesh") {
        e.material = e._material;
        e._material = null;
      }
    });
    e.setClearColor(this._oldClearColor);
    e.setClearAlpha(i);
    e.autoClear = r;
  }
}
var mn = require("./5484.cjs");
var pn = require("./1264.cjs");
var vn = require("./7531.cjs");
class gn {
  constructor({
    scene: e,
    camera: t,
    scene2: n,
    camera2: r,
    renderer: o,
    texture: s
  } = {}) {
    this._scene = e;
    this._camera = t;
    this._scene2 = n;
    this._camera2 = r;
    this._renderer = o;
    this._renderScene = new un.C(e, t);
    this._renderScene2 = new un.C(n, r);
    this._renderScene2.clear = false;
    this._renderScene2.clearDepth = true;
    this._bloomPass = new mn.m(new i.F(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    this._bloomPass.threshold = Number(0.159);
    this._bloomPass.strength = Number(0.4);
    this._bloomPass.radius = Number(1);
    this._bokehApertureF = 0.00001;
    this._bokehPass = new fn(e, t, {
      focalDepth: 0.125,
      focalLength: 27,
      fstop: 2509,
      maxblur: 10,
      gain: 0,
      bias: 0,
      rings: 4,
      samples: 6,
      znear: t.near,
      zfar: t.far,
      width: u.window.w,
      height: u.window.h
    });
    this._vignettePass = new vn.T(pn.E);
    this._vignettePass.uniforms.offset.value = 0.3;
    this._vignettePass.uniforms.darkness.value = 4;
    this._renderer.toneMappingExposure = Math.pow(1, 5);
    this._composer = new ln.xC(o);
    this._composer.addPass(this._renderScene);
    this._composer.addPass(this._renderScene2);
    this._composer.addPass(this._bloomPass);
    if (u.isDesktop) {
      this._composer.addPass(this._bokehPass);
    }
    this._composer.addPass(this._vignettePass);
  }
  resize(e, t) {
    this._composer.setSize(e, t);
  }
  update({
    delta: e
  } = {}) {
    this._renderScene2.clear = false;
    this._renderScene2.clearDepth = true;
    this._composer.render({
      delta: e
    });
  }
}
class xn {
  constructor({
    width: e = 256,
    height: t = 256,
    format: n = Le.wk1,
    type: i = Le.ywz,
    minFilter: r = Le.wem,
    magFilter: o = Le.wem,
    depthBuffer: s = true,
    generateMipmaps: a = false,
    stencilBuffer: l = false,
    stageID: u = `fbo-${Math.random()}`,
    debug: c = false
  } = {}) {
    const h = {
      wrapS: Le.uWy,
      wrapT: Le.uWy,
      minFilter: r,
      magFilter: o,
      format: n,
      type: i,
      stencilBuffer: l,
      depthBuffer: s,
      generateMipmaps: a
    };
    this._fbo = new Zt.d(e, t, h);
    if (c) {
      this.debug();
    }
  }
  setSize(e, t) {
    this._fbo.setSize(e, t);
  }
  dispose() {
    this._fbo.dispose();
  }
  get renderTarget() {
    return this._fbo;
  }
  get texture() {
    return this._fbo.texture;
  }
}
class yn extends Re.T {
  constructor() {
    super();
    this.objectVisible = true;
    this._setupMesh();
  }
  _setupMesh() {
    this._mesh = new Jt({
      material: new Yt.F({
        uniforms: {
          t_noise: {
            value: null
          },
          u_show: {
            value: 0
          },
          u_alpha: {
            value: u.window.dpr >= 2 ? 0.138 : 0.149
          },
          u_bright: {
            value: u.window.dpr >= 2 ? 0.185 : 0.252
          },
          u_scale: {
            value: u.window.dpr >= 2 ? 1.072 : 1.366
          },
          u_time: {
            value: 0
          }
        },
        transparent: true,
        vertexShader: "precision highp float;\n#define GLSLIFY 1\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 modelViewMatrix;\n\nattribute lowp vec2 position;\nattribute lowp vec2 uv;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n  vUv = uv;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0., 1.);\n}\n",
        fragmentShader: "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D t_noise;\n\nuniform float u_show;\nuniform float u_bright;\nuniform float u_alpha;\nuniform float u_scale;\nuniform float u_time;\n\nvarying vec2 vUv;\n\nfloat random (vec2 st) {\n    return fract(sin(dot(st.xy,\n                         vec2(12.9898,78.233)))*\n        43758.5453123);\n}\n\nfloat pattern() {\n  float s = sin( 0.5 ), c = cos( 0.5 );\n  vec2 center = vec2(random(vUv + u_time));\n  vec2 tex = vUv * vec2(4096, 4096) * u_scale - center;\n  vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y );\n  return ( sin( point.x ) * sin( point.y ) ) * 4.0;\n}\n\nvoid main() {\n  // vec4 tNoise = texture2D(t_noise, vUv * u_scale);\n\n  // // vec3 color = vec3(0.);\n  // // float dist = distance(vec2(0.5), vUv) * 2.;\n  // // float alpha = smoothstep(u_show - 0.1, u_show + 0.1, dist);\n\n  // // gl_FragColor = vec4(color, alpha);\n\n  // vec4 black = vec4(0., 0., 0., 1.);\n  // vec4 grain = vec4(tNoise.rgb * u_bright, u_alpha);\n  // float dist = distance(vec2(0.5), vUv) * 2.;\n  // vec4 color = mix(grain, black, smoothstep(u_show - 0.1, u_show + 0.1, dist));\n\n  // gl_FragColor = vec4(color, alpha);\n\n  float dist = distance(vec2(0.5), vUv) * 2.;\n\n  vec4 black = vec4(0., 0., 0., 1.);\n  float rand = random(gl_FragCoord.xy * 0.01 * u_scale + u_time * 0.01);\n  // float distVignette = smoothstep(0.5, 0.9, dist);\n  // vec4 grain = mix(vec4(rand, rand, rand, u_alpha), vec4(0., 0., 0., 1.), distVignette);\n  // vec4 grain = vec4(rand, rand, rand, u_alpha);\n  float pat = pattern();\n  vec4 grain = vec4(pat, pat, pat, u_alpha);\n  grain.rgb *= u_bright;\n\n  vec4 color = mix(grain, black, smoothstep(u_show - 0.1, u_show + 0.1, dist));\n\n  gl_FragColor = color;\n}\n"
      })
    });
    this._depthMaterial = new Be.v({
      opacity: 0,
      transparent: true
    });
    this._mesh.customDepthMaterial = this._depthMaterial;
    this.add(this._mesh);
  }
  show({
    delay: e = 0
  } = {}) {
    if (!this.objectVisible) {
      A.p8.killTweensOf(this._mesh.material.uniforms.u_show);
      A.p8.to(this._mesh.material.uniforms.u_show, {
        duration: 2,
        value: 0,
        ease: "Power2.easeInOut",
        delay: e,
        onComplete: () => {
          this.objectVisible = true;
          this.visible = true;
        }
      });
    }
  }
  hide({
    delay: e = 0
  } = {}) {
    if (this.objectVisible) {
      A.p8.killTweensOf(this._mesh.material.uniforms.u_show);
      A.p8.to(this._mesh.material.uniforms.u_show, {
        duration: 2,
        value: 1,
        ease: "Power2.easeInOut",
        delay: e,
        onComplete: () => {
          this.objectVisible = false;
        }
      });
    }
  }
  onAssetsLoaded() {
    this._mesh.material.uniforms.t_noise.value = u.WebGL.assets.textures.grain;
    this._mesh.material.uniforms.t_noise.value.needsUpdate = true;
    this._mesh.material.needsUpdate = true;
  }
  resize() {}
  update(e) {
    this._mesh.material.uniforms.u_time.value = e;
  }
}
function Dn(e, t, n) {
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
class bn {
  constructor() {
    Dn(this, "onResize", () => {
      this.resize();
    });
    Dn(this, "onRaf", e => {
      this.globalUniforms.uTime.value = e;
      this._updateCamera();
      this._layer.update(e);
      this._cones.update(e);
      this._frontCones.update(e);
      this._composer.update({
        delta: O.deltaTime
      });
    });
    this.dom = {
      canvas: document.getElementById("canvas")
    };
    this.textureLoader = new Pe.d();
    this.cubeTextureLoader = new Ct.c();
    this._m = {
      x: 0,
      y: 0
    };
    this.setup();
    this.loadGlobalAssets();
    this.addEvents();
    this.particleSceneTest();
  }
  setup() {
    let e = 1;
    e = u.isMobile ? 2 : 1;
    this.renderer = new Tt.C({
      alpha: false,
      antialias: false,
      canvas: this.dom.canvas,
      powerPreference: "high-performance",
      stencil: false
    });
    this.renderer.setPixelRatio(e);
    this.renderer.setSize(u.window.w, u.window.h);
    const t = Math.atan(u.window.h / 2 / 2000) * 2 * 180 / Math.PI;
    this.camera = new Ft.c(t, u.window.w / u.window.h, 1, 10000);
    this.camera.position.set(0, 0, 2000);
    this.camera.aspect = u.window.w / u.window.h;
    this.camera.updateProjectionMatrix();
    this.scene = new At.x();
    this.particleCamera = new Ft.c(50, u.window.w / u.window.h, 0.1, 30);
    this.particleCamera.position.set(0, 0, 10);
    this.particleCamera.aspect = u.window.w / u.window.h;
    this.particleCamera.setFocalLength(35);
    this.particleCamera.updateProjectionMatrix();
    this.particleScene = new At.x();
    this.materialDepth = new Mt.l();
    this.materialDepth.depthPacking = Le.mSO;
    this.materialDepth.blending = Le.jFi;
    u.AssetLoader.ktxLoader.detectSupport(this.renderer);
    this._fboMain = new xn({
      width: window.innerWidth,
      height: window.innerHeight
    });
    this._composer = new gn({
      scene: this.particleScene,
      camera: this.particleCamera,
      scene2: this.scene,
      camera2: this.camera,
      renderer: this.renderer,
      texture: this._fboMain.texture
    });
    this.globalUniforms = {
      uTime: {
        value: 0
      },
      uResolution: {
        value: new i.F(u.window.w * this.renderer.getPixelRatio(), u.window.h * this.renderer.getPixelRatio())
      }
    };
  }
  particleSceneTest() {
    this._fbo = new xn({
      width: 200,
      height: 200,
      minFilter: Le.TyD,
      magFilter: Le.TyD,
      depthBuffer: false
    });
    this._layer = new yn({
      texture: this._fboMain.texture
    });
    this._layer.position.set(0, 0, 9.6);
    this.particleScene.add(this._layer);
    this._cones = new an();
    this.particleScene.add(this._cones);
    this._frontCones = new Ht();
    this._frontCones.position.set(0, 0, 0.1);
    this.particleScene.add(this._frontCones);
    this.resize();
  }
  loadGlobalAssets() {
    this.assets = {
      models: {},
      textures: {},
      cubeTextures: {}
    };
    const e = Ot.textures.length + Ot.models.length;
    let t = 0;
    for (let n = 0; n < Ot.textures.length; n++) {
      const i = Ot.textures[n];
      u.AssetLoader.add(new Promise(n => {
        if (i.url.split(".").pop() === "png" || i.url.split(".").pop() === "jpg") {
          this.textureLoader.load(i.url, r => {
            this.renderer.initTexture(r);
            this.assets.textures[`${i.id}`] = r;
            t++;
            if (e === t) {
              this.onAssetsLoaded();
            }
            n();
          });
        } else if (i.url.split(".").pop() === "exr") {
          u.AssetLoader.exrLoader.load(i.url, (r, o) => {
            this.renderer.initTexture(r);
            this.assets.textures[`${i.id}`] = r;
            t++;
            if (e === t) {
              this.onAssetsLoaded();
            }
            n();
          });
        }
      }));
    }
    for (let n = 0; n < Ot.models.length; n++) {
      const i = Ot.models[n];
      u.AssetLoader.add(new Promise(n => {
        u.AssetLoader.gltfLoader.load(i.url, r => {
          this.assets.models[`${i.id}`] = r;
          t++;
          if (e === t) {
            this.onAssetsLoaded();
          }
          n();
        });
      }));
    }
  }
  addEvents() {
    F.on(O.RESIZE, this.onResize);
    F.on(O.POINTERDOWN, this.onMousedown.bind(this));
    F.on(O.POINTERMOVE, this.onMousemove.bind(this));
    u.RAFCollection.add(this.onRaf, 99);
  }
  resize() {
    const e = u.window.w;
    const t = u.window.h;
    this.renderer.setSize(e, t);
    this.camera.fov = Math.atan(u.window.h / 2 / this.camera.position.z) * 2 * 180 / Math.PI;
    this.camera.aspect = e / t;
    this.camera.updateProjectionMatrix();
    this.particleCamera.fov = 50;
    this.particleCamera.aspect = e / t;
    this.particleCamera.updateProjectionMatrix();
    this.globalUniforms.uResolution.value.set(u.window.w * this.renderer.getPixelRatio(), u.window.h * this.renderer.getPixelRatio());
    this._layer.resize();
    this._cones.resize({
      camera: this.particleCamera
    });
    this._composer.resize(e, t);
    this._frontCones.resize({
      camera: this.particleCamera
    });
  }
  onMousedown(e) {
    const t = e.changedTouches ? e.targetTouches[0] : e;
    if (t !== undefined && t.clientX !== undefined) {
      this._m.x = (t.clientX / window.innerWidth - 0.5) * 2;
      this._m.y = (t.clientY / window.innerHeight - 0.5) * -2;
      this._cones.onMousedown(this._m);
    }
  }
  onMousemove(e) {
    const t = e.changedTouches ? e.targetTouches[0] : e;
    if (t !== undefined && t.clientX !== undefined) {
      this._m.x = (t.clientX / window.innerWidth - 0.5) * 2;
      this._m.y = (t.clientY / window.innerHeight - 0.5) * -2;
      this._cones.onMousemove(this._m);
      this._frontCones.onMousemove(this._m);
    }
  }
  onMouseleave() {
    this._cones.onMouseleave();
  }
  onAssetsLoaded() {
    u.WebGL.assets.textures.cone_position_exr.minFilter = u.WebGL.assets.textures.cone_position_exr.magFilter = Le.TyD;
    u.WebGL.assets.textures.cone_position_exr.flipY = true;
    u.WebGL.assets.textures.cone_position_exr.needsUpdate = true;
    this._bigTriangle = new Jt({
      texture: u.WebGL.assets.textures.cone_position_exr,
      scene: true
    });
    this.renderer.setRenderTarget(this._fbo.renderTarget);
    this.renderer.render(this._bigTriangle.scene, this._bigTriangle.camera);
    this._cones.onAssetsLoaded({
      renderTarget: this._fbo.renderTarget
    });
    this._frontCones.onAssetsLoaded();
    this._layer.onAssetsLoaded();
    this.resize();
  }
  onEnterSite() {
    this._layer.hide({
      delay: 0
    });
    this._cones.activate({
      delay: 0
    });
  }
  _updateCamera() {
    const e = this._m.x * -0.075;
    const t = this._m.y * 0.05;
    this.particleCamera.rotation.y += (e - this.particleCamera.rotation.y) * 0.1;
    this.particleCamera.rotation.x += (t - this.particleCamera.rotation.x) * 0.1;
  }
}
function _n(e, t, n) {
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
class wn extends bt {
  constructor(e, t) {
    super(e);
    _n(this, "onResize", () => {
      this.bcr = this.el.getBoundingClientRect();
      this.bcrTop = this.bcr.top + u.ASS.currentPos;
    });
    _n(this, "onRaf", () => {
      if (u.sectionIndex === this.id) {
        u.sectionProgress = u.sectionIndex + Math.abs((u.ASS.currentPos - this.bcrTop) / this.bcr.height);
        window.__dalaProgress = u.sectionProgress;
      }
    });
    _n(this, "enter", () => {
      this.entered ||= true;
      u.sectionIndex = this.id;
      u.sectionName = this.name;
      this.addEvents();
      F.emit("section:enter");
    });
    _n(this, "leave", () => {
      if (this.entered) {
        this.entered = true;
        this.removeEvents();
      }
    });
    _n(this, "destroy", () => {
      this.removeEvents();
    });
    this.id = t;
    this.name = Ne(this.el, "section-name");
    this.bcr = this.el.getBoundingClientRect();
    this.onResize();
    this.observe();
  }
  observe() {
    u.sectionObserver.observe(this.el);
    this.elObj = {
      el: this.el,
      enter: this.enter,
      leave: this.leave,
      destroy: this.destroy,
      bcr: this.bcr
    };
    u.sectionObserver.els.push(this.elObj);
  }
  addEvents() {
    F.on(O.RAF, this.onRaf);
    F.on(O.RESIZE, this.onResize);
  }
  removeEvents() {
    F.off(O.RAF, this.onRaf);
    F.off(O.RESIZE, this.onResize);
  }
  ease(e) {
    if (e === 0) {
      return 0;
    } else if (e === 1) {
      return 1;
    } else if (e < 0.5) {
      return Math.pow(2, e * 20 - 10) / 2;
    } else {
      return (2 - Math.pow(2, e * -20 + 10)) / 2;
    }
  }
}
_n(wn, "selector", ".js-section");
class Sn {
  constructor() {
    (function (e, t, n) {
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
    })(this, "onResize", () => {
      for (let e = 0; e < u.sectionObserver.els.length; e++) {
        u.sectionObserver.unobserve(u.sectionObserver.els[e].el);
        u.sectionObserver.els[e].destroy();
      }
      u.sectionObserver.els = [];
      this.build();
    });
    this.build();
    this.addEvents();
  }
  build() {
    this.sections = ue(".js-section");
    this.components = [];
    this.sections.forEach((e, t) => {
      this.components.push(new wn(e, t));
    });
    Object.assign(u.components, {
      sections: this.components
    });
  }
  addEvents() {
    F.on(O.RESIZE, this.onResize);
  }
}
function En(e, t, n) {
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
class Pn extends bt {
  constructor(e) {
    super(e);
    En(this, "previous", () => {
      if (this.allowAnimation) {
        if (u.isTouch) {
          Ue.ZP.timeline({
            yoyo: true,
            repeat: 1
          }).fromTo(this.dom.prevBtnBg, {
            scale: 1
          }, {
            scale: 1.1,
            ease: "expo.inOut",
            duration: 0.6
          }, 0).fromTo(this.dom.prevBtnHover, {
            scale: 0
          }, {
            scale: 1.1,
            ease: "expo.inOut",
            duration: 0.6
          }, 0);
        }
        this.allowAnimation = false;
        this.activeIndex--;
        if (this.activeIndex === -this.itemCount) {
          this.activeIndex = 0;
          this.setActiveSlide(this.itemCount + this.centerIndexOffset + 1, true);
          Ue.ZP.set(this.dom.slideContainer, {
            x: this.translateBase - this.translateIncriment * (this.activeIndex + 1)
          });
        }
        this.previousTl = Ue.ZP.timeline().to(this.dom.slideContainer, {
          x: this.translateBase - this.translateIncriment * this.activeIndex
        });
        this.setActiveSlide(this.activeIndex + (this.itemCount + this.centerIndexOffset));
      }
    });
    En(this, "next", () => {
      if (this.allowAnimation) {
        if (u.isTouch) {
          Ue.ZP.timeline({
            yoyo: true,
            repeat: 1
          }).fromTo(this.dom.nextBtnBg, {
            scale: 1
          }, {
            scale: 1.1,
            ease: "expo.inOut",
            duration: 0.6
          }, 0).fromTo(this.dom.nextBtnHover, {
            scale: 0
          }, {
            scale: 1.1,
            ease: "expo.inOut",
            duration: 0.6
          }, 0);
        }
        this.allowAnimation = false;
        this.activeIndex++;
        if (this.activeIndex === this.itemCount) {
          this.activeIndex = 0;
          this.setActiveSlide(this.itemCount + this.centerIndexOffset - 1, true);
          Ue.ZP.set(this.dom.slideContainer, {
            x: this.translateBase - this.translateIncriment * (this.activeIndex - 1)
          });
        }
        this.previousTl = Ue.ZP.timeline().to(this.dom.slideContainer, {
          x: this.translateBase - this.translateIncriment * this.activeIndex
        });
        this.setActiveSlide(this.activeIndex + (this.itemCount + this.centerIndexOffset));
      }
    });
    En(this, "onResize", () => {
      this.reset();
    });
    this.dom = {
      slideContainer: it(".js-slides", this.el),
      slides: ue(".js-slide", this.el),
      prevBtn: it(".js-slider-prev"),
      prevBtnHover: it(".js-slider-prev-hover", this.el),
      nextBtn: it(".js-slider-next"),
      nextBtnHover: it(".js-slider-next-hover", this.el),
      contentEls: ue(".js-slide-content")
    };
    this.itemCount = 3;
    this.activeIndex = 0;
    this.allowAnimation = true;
    this.contentTimelines = {};
    this.reset();
    this.addEvents();
  }
  addEvents() {
    F.on("click", this.dom.prevBtn, this.previous);
    F.on("click", this.dom.nextBtn, this.next);
    F.on(O.RESIZE, this.onResize);
  }
  reset() {
    this.slides = [];
    this.content = {};
    this.dom.contentEls.forEach(e => {
      this.content[Ne(e, "slide-id")] = e;
    });
    this.dom.slides.forEach(e => {
      const t = Ne(e, "slide-id");
      const n = this.content[t];
      const i = this.contentTimelines[t] ? this.contentTimelines[t] : this.buildContentTimelines(n);
      this.slides.push({
        slide: e,
        image: it(".js-slide-image", e),
        content: {
          el: n,
          inTl: i.inTl,
          outTl: i.outTl
        }
      });
    });
    this.itemBcr = this.slides[0].slide.getBoundingClientRect();
    this.imageBcr = this.slides[0].image.getBoundingClientRect();
    this.centerIndexOffset = u.mq.md.matches ? 2 : 1;
    this.centerPositionOffset = u.mq.md.matches ? this.imageBcr.width * 0.5 : u.window.w * 0.18;
    this.translateIncriment = this.itemBcr.width;
    this.translateBase = -(this.translateIncriment * this.itemCount + this.centerPositionOffset);
    this.dom.slideContainer.style.transform = `translateX(${this.translateBase}px)`;
    this.setActiveSlide(this.itemCount + this.centerIndexOffset);
    this.activeIndex = 0;
    if (u.isTouch) {
      this.dom.prevBtn.classList.remove("hover-enabled");
      this.dom.nextBtn.classList.remove("hover-enabled");
    } else {
      this.dom.prevBtn.classList.add("hover-enabled");
      this.dom.nextBtn.classList.add("hover-enabled");
    }
  }
  setActiveSlide(e, t = false) {
    var n;
    var i;
    const r = this.slides[e];
    const o = t ? "set" : "to";
    if ((n = this.activeContentInTl) !== null && n !== undefined) {
      n.kill();
    }
    if ((i = this.activeContentOuTl) !== null && i !== undefined) {
      i.kill();
    }
    this.setActiveTl = Ue.ZP.timeline();
    if (this.activeSlide) {
      this.setActiveTl[o](this.activeSlide.image, {
        scale: 1,
        filter: "grayscale(1) brightness(0.1)",
        duration: 0.5,
        ease: "quad.out"
      }, 0)[o](this.activeSlide.slide, {
        autoAlpha: 0.9,
        duration: 0.5,
        ease: "quad.out"
      }, 0);
      if (!t) {
        this.activeContentInTl.outTl = this.activeSlide.content.outTl;
        this.activeSlide.content.outTl.progress(0);
        this.activeSlide.content.outTl.paused(false);
        this.setActiveTl.add(this.activeSlide.content.outTl, 0);
      }
    }
    this.activeSlide = r;
    this.setActiveTl[o](r.slide, {
      autoAlpha: 1,
      duration: 0.5,
      ease: "quad.out"
    }, 0).call(() => {
      this.allowAnimation = true;
    }, null, 0.5)[o](r.image, {
      scale: 1.2,
      filter: "grayscale(0) brightness(1)",
      duration: 0.5,
      ease: "quad.out"
    }, 0);
    if (!t) {
      this.activeContentInTl = r.content.inTl;
      r.content.inTl.progress(0);
      r.content.inTl.paused(false);
      this.setActiveTl.add(r.content.inTl, 0.2);
    }
  }
  buildContentTimelines(e) {
    const t = it(".js-role", e);
    const n = it(".js-name", e);
    const i = ue(".js-social-icon", e);
    const r = Ue.ZP.timeline({
      immediateRender: true,
      paused: true
    }).splitCharsWipeUpIn(t, {
      duration: 0.7
    }, 0).splitCharsWipeUpIn(n, {
      duration: 0.7
    }, 0.5);
    const o = [];
    r.getChildren().forEach(e => {
      o.push(e.targets());
    });
    r.set(e.parentElement, {
      pointerEvents: "auto"
    }, 0).to(i, {
      scale: 1,
      duration: 0.7,
      stagger: 0.2,
      ease: "expo.out"
    }, 1);
    const s = {
      inTl: r,
      outTl: Ue.ZP.timeline({
        immediateRender: true,
        paused: true
      }).set(e.parentElement, {
        pointerEvents: "none"
      }).to(o, {
        y: "-110%",
        ease: "expo.out",
        duration: 0.7
      }, 0).to(i, {
        scale: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "expo.out"
      }, 0)
    };
    this.contentTimelines[Ne(e, "slide-id")] = s;
    return s;
  }
}
function Cn(e, t, n) {
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
En(Pn, "selector", ".js-slider");
class Tn {
  constructor() {
    Cn(this, "onCriticalAnimationEnd", () => {
      this.criticalAnimationEnded = true;
      if (this.currentProgress === 100) {
        this.expeditedOutTl.play();
      } else {
        this.dom.progress.style.visibility = "visible";
        this.dom.progress.style.opacity = 1;
        this.counterIsVisible = true;
      }
    });
    Cn(this, "onAssetsProgress", ({
      percent: e
    }) => {
      this.currentProgress = e;
      let t = 0;
      if (this.slowProgressInterval) {
        clearInterval(this.slowProgressInterval);
      }
      this.slowProgressInterval = setInterval(() => {
        if (t >= 3 || this.currentProgress === 100) {
          clearInterval(this.slowProgressInterval);
        } else {
          this.currentProgress += 1;
          this.updateProgressCounter();
          t++;
        }
      }, 250);
      if (this.currentProgress === 100 && this.criticalAnimationEnded) {
        clearInterval(this.slowProgressInterval);
        this.standardOutTl.play();
      }
      if (this.counterIsVisible) {
        this.updateProgressCounter();
      }
    });
    Cn(this, "enterSite", () => {
      this.revealed = new Promise(e => {
        this.revealedResolve = e;
      });
      if (this.skip || window.location.pathname !== "/") {
        this.revealedResolve();
      }
      return this.revealed;
    });
    const e = document.querySelector(".js-site-loader");
    this.dom = {
      el: e,
      spinner: it(".js-site-loader-spinner", e),
      spinnerSVG: it(".js-site-loader-spinner-svg", e),
      progress: it(".js-site-loader-progress", e),
      progressDigits: ue(".js-site-loader-progress-digit", e),
      loadingText: it(".js-site-loader-loading-text", e),
      completedText: it(".js-site-loader-completed-text span", e),
      heading: ue(".js-site-loader-heading-text", e),
      ellipsis: ue(".js-site-loader-ellipses-wrapper", e),
      text: ue(".js-site-loader-text span", e)
    };
    this.skip = new URLSearchParams(window.location.search).has("skiploader");
    if (this.skip || window.location.pathname !== "/") {
      A.ZP.set(this.dom.el, {
        autoAlpha: 0,
        pointerEvents: "none"
      });
    } else {
      this.build();
    }
    this.currentProgress = 0;
  }
  build() {
    this.buildTimelines();
    this.addEvents();
  }
  addEvents() {
    F.on("AssetsProgress", this.onAssetsProgress);
    if (getComputedStyle(this.dom.loadingText).getPropertyValue("transform") === "matrix(1, 0, 0, 1, 0, 0)") {
      this.onCriticalAnimationEnd();
    } else {
      this.dom.heading[0].addEventListener("animationend", this.onCriticalAnimationEnd);
    }
  }
  updateProgressCounter() {
    const e = Array.from(this.currentProgress.toString()).map(Number).reverse();
    this.dom.progressDigits[2].textContent = e[0];
    this.dom.progressDigits[1].textContent = e[1];
    this.dom.progressDigits[0].textContent = e[2];
  }
  buildTimelines() {
    this.expeditedOutTl = A.ZP.timeline({
      paused: true,
      immediateRender: true,
      delay: 0.5,
      onStart: () => {
        this.dom.heading[0].removeEventListener("animationend", this.onCriticalAnimationEnd);
        F.off("AssetsProgress", this.onAssetsProgress);
        this.dom.el.classList.add("loaded");
      },
      onComplete: () => {
        this.expeditedOutTl.kill();
        this.standardOutTl.kill();
      }
    }).to(this.dom.loadingText, {
      yPercent: -110,
      rotate: 5,
      ease: "expo.out",
      duration: 2
    }, 0).set(this.dom.ellipsis, {
      autoAlpha: 0
    }, 0).to(this.dom.heading, {
      yPercent: -120,
      rotate: 2,
      ease: "expo.out",
      duration: 2,
      stagger: 0.1
    }, 0).set(this.dom.spinnerSVG, {
      transform: "scale(1)",
      animationName: "scaleDown",
      animationFillMode: "forwards",
      animationDirection: "normal",
      animationDuration: "0.4s",
      animationDelay: "0"
    }, 0).to(this.dom.completedText, {
      y: 0,
      rotate: 0,
      duration: 0.5,
      ease: "power1.out"
    }, 0).to(this.dom.el, {
      autoAlpha: 0,
      ease: "none",
      duration: 0.5
    }, 0.5).call(() => {
      this.revealedResolve();
      F.emit("siteloader:hide");
    }, null, "<");
    this.standardOutTl = A.ZP.timeline({
      paused: true,
      immediateRender: true,
      onStart: () => {
        this.dom.heading[0].removeEventListener("animationend", this.onCriticalAnimationEnd);
        F.off("AssetsProgress", this.onAssetsProgress);
        this.dom.el.classList.add("loaded");
      },
      onComplete: () => {
        this.expeditedOutTl.kill();
        this.standardOutTl.kill();
      }
    }).to(this.dom.loadingText, {
      yPercent: -110,
      rotate: 5,
      ease: "expo.out",
      duration: 2
    }, 0).set(this.dom.ellipsis, {
      autoAlpha: 0
    }, 0).to(this.dom.heading, {
      yPercent: -120,
      rotate: 2,
      ease: "expo.out",
      duration: 2,
      stagger: 0.15
    }, 0).set(this.dom.spinnerSVG, {
      transform: "scale(1)",
      animationName: "scaleDown",
      animationFillMode: "forwards",
      animationDirection: "normal",
      animationDuration: "0.4s",
      animationDelay: "0"
    }, 0).to(this.dom.progress, {
      autoAlpha: 0,
      duration: 0.5,
      ease: "power1.out"
    }, 0.2).to(this.dom.completedText, {
      y: 0,
      rotate: 0,
      duration: 0.5,
      ease: "power1.out"
    }, 0.2).to(this.dom.el, {
      autoAlpha: 0,
      ease: "none",
      duration: 0.5
    }, 1).call(() => {
      this.revealedResolve();
      F.emit("siteloader:hide");
    }, null, "<");
  }
}
function Fn(e, t, n) {
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
class An extends bt {
  constructor(e) {
    super(e);
    Fn(this, "hostname", null);
    Fn(this, "includeSubDomains", false);
    Fn(this, "toggleBtn", null);
    Fn(this, "onClick", () => {
      const e = new Date();
      e.setMonth(e.getMonth() + 1);
      let t = `cookie_notice_accepted=true;expires=${e.toUTCString()};path=/`;
      if (this.includeSubDomains === true) {
        t += `;domain=${this.hostname}`;
      }
      document.cookie = t;
      this.updateStore();
      this.hide();
    });
    if (this.hostname === null) {
      this.hostname = window.location.hostname;
    }
    this.toggleBtn = it(".js-cookie-notice-toggle", this.el);
    this.updateStore();
    if (u.cookieNoticeAccepted === false) {
      F.on("click", this.toggleBtn, this.onClick);
      this.show();
    } else {
      this.hide();
    }
  }
  hide() {
    this.el.classList.remove("is-open");
    this.el.style.display = "none";
  }
  show() {
    this.el.classList.add("is-open");
    this.el.classList.remove("d-none");
  }
  updateStore() {
    u.cookieNoticeAccepted = document.cookie.split(";").some(e => e.includes("cookie_notice_accepted=true"));
    if (u.cookieNoticeAccepted === true) {
      F.emit("cookienotice:accepted");
    }
  }
}
Fn(An, "selector", ".js-cookie-notice");
history.scrollRestoration = "manual";
if (!u.enableLogs) {
  console.warn = () => {};
  console.error = () => {};
}
F.on("DOMContentLoaded", window, function () {
  O.detectTouchDevice();
  O.enableMousemove();
  O.enableRAF(true);
  O.enableResize();
  O.enableDrag();
  u.html.style.setProperty("--vh", `${u.window.h * 0.01}px`);
  u.RAFCollection = new L();
  u.ASS = z.config({
    scrollbarStyles: false,
    disableRaf: true,
    touchScrollType: "scrollTop"
  }).withScrollTrigger(U.Z, A.ZP).create();
  u.RAFCollection.add(u.ASS.update, 0);
  u.ScrollAnimations = new be();
  u.AssetLoader = new Te();
  u.WebGL = new bn();
  if (u.mq.sm.matches) {
    u.Dom2WebglObserver = new Ae({
      rootMargin: "0% 0% 0% 0%"
    }, "dom2webgl", true);
    u.Dom2Webgl = new ht();
  }
  u.sectionObserver = new Ae({
    rootMargin: "0% 0% -99.999% 0%"
  }, false, false);
  u.SiteLoader = new Tn();
  u.components = Object.assign(u.components, {
    examples: new mt(_t).init(),
    headers: new mt(St).init(),
    sliders: new mt(Pn).init(),
    navigations: new mt(Pt).init(),
    cookieNotice: new mt(An).init()
  });
  u.sectionManager = new Sn();
  u.AssetLoader.load().then(() => {
    if (u.mq.sm.matches) {
      u.Dom2Webgl.enable();
    }
    u.ScrollAnimations.build();
    u.SiteLoader.enterSite().then(() => {
      u.ScrollAnimations.enable();
      u.ASS.enable();
      u.ASS.controller.ease = 0.075;
      u.WebGL.onEnterSite();
      setTimeout(() => {
        (function () {
          const e = window;
          const t = e.Intercom;
          if (typeof t == "function") {
            t("reattach_activator");
            t("update", e.intercomSettings);
          } else {
            const t = document;
            function n() {
              n.c(arguments);
            }
            n.q = [];
            n.c = function (e) {
              n.q.push(e);
            };
            e.Intercom = n;
            const i = function () {
              const e = t.createElement("script");
              e.type = "text/javascript";
              e.async = true;
              e.src = "https://widget.intercom.io/widget/ee6u4z7r";
              const n = t.getElementsByTagName("script")[0];
              n.parentNode.insertBefore(e, n);
            };
            if (document.readyState === "complete") {
              i();
            } else if (e.attachEvent) {
              e.attachEvent("onload", i);
            } else {
              e.addEventListener("load", i, false);
            }
          }
        })();
        window.Intercom("boot", {
          app_id: "ee6u4z7r"
        });
      }, 1200);
      document.querySelectorAll("img[loading=\"lazy\"]").forEach(e => e.removeAttribute("loading"));
    });
  });
  if (u.mq.sm.matches) {
    u.Dom2Webgl.build();
  }
  yt.init();
});