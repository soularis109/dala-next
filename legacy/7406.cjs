var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  p: function () {
    return r;
  }
});
class r {
  addEventListener(t, e) {
    if (this._listeners === undefined) {
      this._listeners = {};
    }
    const n = this._listeners;
    if (n[t] === undefined) {
      n[t] = [];
    }
    if (n[t].indexOf(e) === -1) {
      n[t].push(e);
    }
  }
  hasEventListener(t, e) {
    if (this._listeners === undefined) {
      return false;
    }
    const n = this._listeners;
    return n[t] !== undefined && n[t].indexOf(e) !== -1;
  }
  removeEventListener(t, e) {
    if (this._listeners === undefined) {
      return;
    }
    const n = this._listeners[t];
    if (n !== undefined) {
      const t = n.indexOf(e);
      if (t !== -1) {
        n.splice(t, 1);
      }
    }
  }
  dispatchEvent(t) {
    if (this._listeners === undefined) {
      return;
    }
    const e = this._listeners[t.type];
    if (e !== undefined) {
      t.target = this;
      const n = e.slice(0);
      for (let e = 0, r = n.length; e < r; e++) {
        n[e].call(this, t);
      }
      t.target = null;
    }
  }
}