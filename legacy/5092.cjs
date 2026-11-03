var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  h: function () {
    return a;
  }
});
var r = require("./2626.cjs");
var i = require("./6023.cjs");
const s = {};
class a extends i.a {
  constructor(t) {
    super(t);
  }
  load(t = "", e, n, i) {
    if (this.path !== undefined) {
      t = this.path + t;
    }
    t = this.manager.resolveURL(t);
    const a = this;
    const o = r.C.get(t);
    if (o !== undefined) {
      a.manager.itemStart(t);
      setTimeout(function () {
        if (e) {
          e(o);
        }
        a.manager.itemEnd(t);
      }, 0);
      return o;
    }
    if (s[t] !== undefined) {
      s[t].push({
        onLoad: e,
        onProgress: n,
        onError: i
      });
      return;
    }
    const l = t.match(/^data:(.*?)(;base64)?,(.*)$/);
    let c;
    if (l) {
      const n = l[1];
      const r = !!l[2];
      let s = l[3];
      s = decodeURIComponent(s);
      if (r) {
        s = atob(s);
      }
      try {
        let r;
        const i = (this.responseType || "").toLowerCase();
        switch (i) {
          case "arraybuffer":
          case "blob":
            const t = new Uint8Array(s.length);
            for (let e = 0; e < s.length; e++) {
              t[e] = s.charCodeAt(e);
            }
            r = i === "blob" ? new Blob([t.buffer], {
              type: n
            }) : t.buffer;
            break;
          case "document":
            const e = new DOMParser();
            r = e.parseFromString(s, n);
            break;
          case "json":
            r = JSON.parse(s);
            break;
          default:
            r = s;
        }
        setTimeout(function () {
          if (e) {
            e(r);
          }
          a.manager.itemEnd(t);
        }, 0);
      } catch (e) {
        setTimeout(function () {
          if (i) {
            i(e);
          }
          a.manager.itemError(t);
          a.manager.itemEnd(t);
        }, 0);
      }
    } else {
      s[t] = [];
      s[t].push({
        onLoad: e,
        onProgress: n,
        onError: i
      });
      c = new XMLHttpRequest();
      c.open("GET", t, true);
      c.addEventListener("load", function (e) {
        const n = this.response;
        const i = s[t];
        delete s[t];
        if (this.status === 200 || this.status === 0) {
          if (this.status === 0) {
            console.warn("THREE.FileLoader: HTTP Status 0 received.");
          }
          r.C.add(t, n);
          for (let t = 0, e = i.length; t < e; t++) {
            const e = i[t];
            if (e.onLoad) {
              e.onLoad(n);
            }
          }
          a.manager.itemEnd(t);
        } else {
          for (let t = 0, n = i.length; t < n; t++) {
            const n = i[t];
            if (n.onError) {
              n.onError(e);
            }
          }
          a.manager.itemError(t);
          a.manager.itemEnd(t);
        }
      }, false);
      c.addEventListener("progress", function (e) {
        const n = s[t];
        for (let t = 0, r = n.length; t < r; t++) {
          const r = n[t];
          if (r.onProgress) {
            r.onProgress(e);
          }
        }
      }, false);
      c.addEventListener("error", function (e) {
        const n = s[t];
        delete s[t];
        for (let t = 0, r = n.length; t < r; t++) {
          const r = n[t];
          if (r.onError) {
            r.onError(e);
          }
        }
        a.manager.itemError(t);
        a.manager.itemEnd(t);
      }, false);
      c.addEventListener("abort", function (e) {
        const n = s[t];
        delete s[t];
        for (let t = 0, r = n.length; t < r; t++) {
          const r = n[t];
          if (r.onError) {
            r.onError(e);
          }
        }
        a.manager.itemError(t);
        a.manager.itemEnd(t);
      }, false);
      if (this.responseType !== undefined) {
        c.responseType = this.responseType;
      }
      if (this.withCredentials !== undefined) {
        c.withCredentials = this.withCredentials;
      }
      if (c.overrideMimeType) {
        c.overrideMimeType(this.mimeType !== undefined ? this.mimeType : "text/plain");
      }
      for (const t in this.requestHeader) {
        c.setRequestHeader(t, this.requestHeader[t]);
      }
      c.send(null);
    }
    a.manager.itemStart(t);
    return c;
  }
  setResponseType(t) {
    this.responseType = t;
    return this;
  }
  setMimeType(t) {
    this.mimeType = t;
    return this;
  }
}