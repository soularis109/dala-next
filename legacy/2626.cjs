var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  C: function () {
    return r;
  }
});
const r = {
  enabled: false,
  files: {},
  add: function (t, e) {
    if (this.enabled !== false) {
      this.files[t] = e;
    }
  },
  get: function (t) {
    if (this.enabled !== false) {
      return this.files[t];
    }
  },
  remove: function (t) {
    delete this.files[t];
  },
  clear: function () {
    this.files = {};
  }
};