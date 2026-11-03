(function () {
  "use strict";

  if (typeof window == "object") {
    if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
      if (!("isIntersecting" in window.IntersectionObserverEntry.prototype)) {
        Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
          get: function () {
            return this.intersectionRatio > 0;
          }
        });
      }
    } else {
      var e = function (e) {
        var t = window.document;
        for (var n = r(t); n;) {
          n = r(t = n.ownerDocument);
        }
        return t;
      }();
      var t = [];
      var n = null;
      var i = null;
      s.prototype.THROTTLE_TIMEOUT = 100;
      s.prototype.POLL_INTERVAL = null;
      s.prototype.USE_MUTATION_OBSERVER = true;
      s._setupCrossOriginUpdater = function () {
        n ||= function (e, n) {
          i = e && n ? h(e, n) : {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0
          };
          t.forEach(function (e) {
            e._checkForIntersections();
          });
        };
        return n;
      };
      s._resetCrossOriginUpdater = function () {
        n = null;
        i = null;
      };
      s.prototype.observe = function (e) {
        if (!this._observationTargets.some(function (t) {
          return t.element == e;
        })) {
          if (!e || e.nodeType != 1) {
            throw new Error("target must be an Element");
          }
          this._registerInstance();
          this._observationTargets.push({
            element: e,
            entry: null
          });
          this._monitorIntersections(e.ownerDocument);
          this._checkForIntersections();
        }
      };
      s.prototype.unobserve = function (e) {
        this._observationTargets = this._observationTargets.filter(function (t) {
          return t.element != e;
        });
        this._unmonitorIntersections(e.ownerDocument);
        if (this._observationTargets.length == 0) {
          this._unregisterInstance();
        }
      };
      s.prototype.disconnect = function () {
        this._observationTargets = [];
        this._unmonitorAllIntersections();
        this._unregisterInstance();
      };
      s.prototype.takeRecords = function () {
        var e = this._queuedEntries.slice();
        this._queuedEntries = [];
        return e;
      };
      s.prototype._initThresholds = function (e) {
        var t = e || [0];
        if (!Array.isArray(t)) {
          t = [t];
        }
        return t.sort().filter(function (e, t, n) {
          if (typeof e != "number" || isNaN(e) || e < 0 || e > 1) {
            throw new Error("threshold must be a number between 0 and 1 inclusively");
          }
          return e !== n[t - 1];
        });
      };
      s.prototype._parseRootMargin = function (e) {
        var t = (e || "0px").split(/\s+/).map(function (e) {
          var t = /^(-?\d*\.?\d+)(px|%)$/.exec(e);
          if (!t) {
            throw new Error("rootMargin must be specified in pixels or percent");
          }
          return {
            value: parseFloat(t[1]),
            unit: t[2]
          };
        });
        t[1] = t[1] || t[0];
        t[2] = t[2] || t[0];
        t[3] = t[3] || t[1];
        return t;
      };
      s.prototype._monitorIntersections = function (t) {
        var n = t.defaultView;
        if (n && this._monitoringDocuments.indexOf(t) == -1) {
          var i = this._checkForIntersections;
          var o = null;
          var s = null;
          if (this.POLL_INTERVAL) {
            o = n.setInterval(i, this.POLL_INTERVAL);
          } else {
            a(n, "resize", i, true);
            a(t, "scroll", i, true);
            if (this.USE_MUTATION_OBSERVER && "MutationObserver" in n) {
              (s = new n.MutationObserver(i)).observe(t, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
              });
            }
          }
          this._monitoringDocuments.push(t);
          this._monitoringUnsubscribes.push(function () {
            var e = t.defaultView;
            if (e) {
              if (o) {
                e.clearInterval(o);
              }
              l(e, "resize", i, true);
            }
            l(t, "scroll", i, true);
            if (s) {
              s.disconnect();
            }
          });
          var u = this.root && (this.root.ownerDocument || this.root) || e;
          if (t != u) {
            var c = r(t);
            if (c) {
              this._monitorIntersections(c.ownerDocument);
            }
          }
        }
      };
      s.prototype._unmonitorIntersections = function (t) {
        var n = this._monitoringDocuments.indexOf(t);
        if (n != -1) {
          var i = this.root && (this.root.ownerDocument || this.root) || e;
          if (!this._observationTargets.some(function (e) {
            var n = e.element.ownerDocument;
            if (n == t) {
              return true;
            }
            while (n && n != i) {
              var o = r(n);
              if ((n = o && o.ownerDocument) == t) {
                return true;
              }
            }
            return false;
          })) {
            var o = this._monitoringUnsubscribes[n];
            this._monitoringDocuments.splice(n, 1);
            this._monitoringUnsubscribes.splice(n, 1);
            o();
            if (t != i) {
              var s = r(t);
              if (s) {
                this._unmonitorIntersections(s.ownerDocument);
              }
            }
          }
        }
      };
      s.prototype._unmonitorAllIntersections = function () {
        var e = this._monitoringUnsubscribes.slice(0);
        this._monitoringDocuments.length = 0;
        this._monitoringUnsubscribes.length = 0;
        for (var t = 0; t < e.length; t++) {
          e[t]();
        }
      };
      s.prototype._checkForIntersections = function () {
        if (this.root || !n || i) {
          var e = this._rootIsInDom();
          var t = e ? this._getRootRect() : {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0
          };
          this._observationTargets.forEach(function (i) {
            var r = i.element;
            var s = u(r);
            var a = this._rootContainsTarget(r);
            var l = i.entry;
            var c = e && a && this._computeTargetAndRootIntersection(r, s, t);
            var h = null;
            if (this._rootContainsTarget(r)) {
              if (!n || !!this.root) {
                h = t;
              }
            } else {
              h = {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: 0,
                height: 0
              };
            }
            var d = i.entry = new o({
              time: window.performance && performance.now && performance.now(),
              target: r,
              boundingClientRect: s,
              rootBounds: h,
              intersectionRect: c
            });
            if (l) {
              if (e && a) {
                if (this._hasCrossedThreshold(l, d)) {
                  this._queuedEntries.push(d);
                }
              } else if (l && l.isIntersecting) {
                this._queuedEntries.push(d);
              }
            } else {
              this._queuedEntries.push(d);
            }
          }, this);
          if (this._queuedEntries.length) {
            this._callback(this.takeRecords(), this);
          }
        }
      };
      s.prototype._computeTargetAndRootIntersection = function (t, r, o) {
        if (window.getComputedStyle(t).display != "none") {
          for (var s, a, l, c, d, m, p, v, g = r, x = f(t), y = false; !y && x;) {
            var D = null;
            var b = x.nodeType == 1 ? window.getComputedStyle(x) : {};
            if (b.display == "none") {
              return null;
            }
            if (x == this.root || x.nodeType == 9) {
              y = true;
              if (x == this.root || x == e) {
                if (n && !this.root) {
                  if (!i || i.width == 0 && i.height == 0) {
                    x = null;
                    D = null;
                    g = null;
                  } else {
                    D = i;
                  }
                } else {
                  D = o;
                }
              } else {
                var _ = f(x);
                var w = _ && u(_);
                var S = _ && this._computeTargetAndRootIntersection(_, w, o);
                if (w && S) {
                  x = _;
                  D = h(w, S);
                } else {
                  x = null;
                  g = null;
                }
              }
            } else {
              var E = x.ownerDocument;
              if (x != E.body && x != E.documentElement && b.overflow != "visible") {
                D = u(x);
              }
            }
            if (D) {
              s = D;
              a = g;
              l = undefined;
              c = undefined;
              d = undefined;
              m = undefined;
              p = undefined;
              v = undefined;
              l = Math.max(s.top, a.top);
              c = Math.min(s.bottom, a.bottom);
              d = Math.max(s.left, a.left);
              m = Math.min(s.right, a.right);
              v = c - l;
              g = (p = m - d) >= 0 && v >= 0 && {
                top: l,
                bottom: c,
                left: d,
                right: m,
                width: p,
                height: v
              } || null;
            }
            if (!g) {
              break;
            }
            x = x && f(x);
          }
          return g;
        }
      };
      s.prototype._getRootRect = function () {
        var t;
        if (this.root && !m(this.root)) {
          t = u(this.root);
        } else {
          var n = m(this.root) ? this.root : e;
          var i = n.documentElement;
          var r = n.body;
          t = {
            top: 0,
            left: 0,
            right: i.clientWidth || r.clientWidth,
            width: i.clientWidth || r.clientWidth,
            bottom: i.clientHeight || r.clientHeight,
            height: i.clientHeight || r.clientHeight
          };
        }
        return this._expandRectByRootMargin(t);
      };
      s.prototype._expandRectByRootMargin = function (e) {
        var t = this._rootMarginValues.map(function (t, n) {
          if (t.unit == "px") {
            return t.value;
          } else {
            return t.value * (n % 2 ? e.width : e.height) / 100;
          }
        });
        var n = {
          top: e.top - t[0],
          right: e.right + t[1],
          bottom: e.bottom + t[2],
          left: e.left - t[3]
        };
        n.width = n.right - n.left;
        n.height = n.bottom - n.top;
        return n;
      };
      s.prototype._hasCrossedThreshold = function (e, t) {
        var n = e && e.isIntersecting ? e.intersectionRatio || 0 : -1;
        var i = t.isIntersecting ? t.intersectionRatio || 0 : -1;
        if (n !== i) {
          for (var r = 0; r < this.thresholds.length; r++) {
            var o = this.thresholds[r];
            if (o == n || o == i || o < n != o < i) {
              return true;
            }
          }
        }
      };
      s.prototype._rootIsInDom = function () {
        return !this.root || d(e, this.root);
      };
      s.prototype._rootContainsTarget = function (t) {
        var n = this.root && (this.root.ownerDocument || this.root) || e;
        return d(n, t) && (!this.root || n == t.ownerDocument);
      };
      s.prototype._registerInstance = function () {
        if (t.indexOf(this) < 0) {
          t.push(this);
        }
      };
      s.prototype._unregisterInstance = function () {
        var e = t.indexOf(this);
        if (e != -1) {
          t.splice(e, 1);
        }
      };
      window.IntersectionObserver = s;
      window.IntersectionObserverEntry = o;
    }
  }
  function r(e) {
    try {
      return e.defaultView && e.defaultView.frameElement || null;
    } catch (e) {
      return null;
    }
  }
  function o(e) {
    this.time = e.time;
    this.target = e.target;
    this.rootBounds = c(e.rootBounds);
    this.boundingClientRect = c(e.boundingClientRect);
    this.intersectionRect = c(e.intersectionRect || {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0
    });
    this.isIntersecting = !!e.intersectionRect;
    var t = this.boundingClientRect;
    var n = t.width * t.height;
    var i = this.intersectionRect;
    var r = i.width * i.height;
    this.intersectionRatio = n ? Number((r / n).toFixed(4)) : this.isIntersecting ? 1 : 0;
  }
  function s(e, t) {
    var n;
    var i;
    var r;
    var o = t || {};
    if (typeof e != "function") {
      throw new Error("callback must be a function");
    }
    if (o.root && o.root.nodeType != 1 && o.root.nodeType != 9) {
      throw new Error("root must be a Document or Element");
    }
    this._checkForIntersections = (n = this._checkForIntersections.bind(this), i = this.THROTTLE_TIMEOUT, r = null, function () {
      r ||= setTimeout(function () {
        n();
        r = null;
      }, i);
    });
    this._callback = e;
    this._observationTargets = [];
    this._queuedEntries = [];
    this._rootMarginValues = this._parseRootMargin(o.rootMargin);
    this.thresholds = this._initThresholds(o.threshold);
    this.root = o.root || null;
    this.rootMargin = this._rootMarginValues.map(function (e) {
      return e.value + e.unit;
    }).join(" ");
    this._monitoringDocuments = [];
    this._monitoringUnsubscribes = [];
  }
  function a(e, t, n, i) {
    if (typeof e.addEventListener == "function") {
      e.addEventListener(t, n, i || false);
    } else if (typeof e.attachEvent == "function") {
      e.attachEvent("on" + t, n);
    }
  }
  function l(e, t, n, i) {
    if (typeof e.removeEventListener == "function") {
      e.removeEventListener(t, n, i || false);
    } else if (typeof e.detatchEvent == "function") {
      e.detatchEvent("on" + t, n);
    }
  }
  function u(e) {
    var t;
    try {
      t = e.getBoundingClientRect();
    } catch (e) {}
    if (t) {
      if (!t.width || !t.height) {
        t = {
          top: t.top,
          right: t.right,
          bottom: t.bottom,
          left: t.left,
          width: t.right - t.left,
          height: t.bottom - t.top
        };
      }
      return t;
    } else {
      return {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 0,
        height: 0
      };
    }
  }
  function c(e) {
    if (!e || "x" in e) {
      return e;
    } else {
      return {
        top: e.top,
        y: e.top,
        bottom: e.bottom,
        left: e.left,
        x: e.left,
        right: e.right,
        width: e.width,
        height: e.height
      };
    }
  }
  function h(e, t) {
    var n = t.top - e.top;
    var i = t.left - e.left;
    return {
      top: n,
      left: i,
      height: t.height,
      width: t.width,
      bottom: n + t.height,
      right: i + t.width
    };
  }
  function d(e, t) {
    for (var n = t; n;) {
      if (n == e) {
        return true;
      }
      n = f(n);
    }
    return false;
  }
  function f(t) {
    var n = t.parentNode;
    if (t.nodeType == 9 && t != e) {
      return r(t);
    } else {
      if (n && n.assignedSlot) {
        n = n.assignedSlot.parentNode;
      }
      if (n && n.nodeType == 11 && n.host) {
        return n.host;
      } else {
        return n;
      }
    }
  }
  function m(e) {
    return e && e.nodeType === 9;
  }
})();