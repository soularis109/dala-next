var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  a: function () {
    return i;
  }
});
const r = new class {
  constructor(t, e, n) {
    const r = this;
    let i;
    let s = false;
    let a = 0;
    let o = 0;
    const l = [];
    this.onStart = undefined;
    this.onLoad = t;
    this.onProgress = e;
    this.onError = n;
    this.itemStart = function (t) {
      o++;
      if (s === false && r.onStart !== undefined) {
        r.onStart(t, a, o);
      }
      s = true;
    };
    this.itemEnd = function (t) {
      a++;
      if (r.onProgress !== undefined) {
        r.onProgress(t, a, o);
      }
      if (a === o) {
        s = false;
        if (r.onLoad !== undefined) {
          r.onLoad();
        }
      }
    };
    this.itemError = function (t) {
      if (r.onError !== undefined) {
        r.onError(t);
      }
    };
    this.resolveURL = function (t) {
      if (i) {
        return i(t);
      } else {
        return t;
      }
    };
    this.setURLModifier = function (t) {
      i = t;
      return this;
    };
    this.addHandler = function (t, e) {
      l.push(t, e);
      return this;
    };
    this.removeHandler = function (t) {
      const e = l.indexOf(t);
      if (e !== -1) {
        l.splice(e, 2);
      }
      return this;
    };
    this.getHandler = function (t) {
      for (let e = 0, n = l.length; e < n; e += 2) {
        const n = l[e];
        const r = l[e + 1];
        if (n.global) {
          n.lastIndex = 0;
        }
        if (n.test(t)) {
          return r;
        }
      }
      return null;
    };
  }
}();
class i {
  constructor(t) {
    this.manager = t !== undefined ? t : r;
    this.crossOrigin = "anonymous";
    this.withCredentials = false;
    this.path = "";
    this.resourcePath = "";
    this.requestHeader = {};
  }
  load() {}
  loadAsync(t, e) {
    const n = this;
    return new Promise(function (r, i) {
      n.load(t, r, e, i);
    });
  }
  parse() {}
  setCrossOrigin(t) {
    this.crossOrigin = t;
    return this;
  }
  setWithCredentials(t) {
    this.withCredentials = t;
    return this;
  }
  setPath(t) {
    this.path = t;
    return this;
  }
  setResourcePath(t) {
    this.resourcePath = t;
    return this;
  }
  setRequestHeader(t) {
    this.requestHeader = t;
    return this;
  }
}