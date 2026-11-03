var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  n: function () {
    return s;
  }
});
var r = require("./4164.cjs");
var i = require("./3662.cjs");
class s extends r.F {
  constructor(t) {
    super();
    this.type = "LineBasicMaterial";
    this.color = new i.I(16777215);
    this.linewidth = 1;
    this.linecap = "round";
    this.linejoin = "round";
    this.setValues(t);
  }
  copy(t) {
    super.copy(t);
    this.color.copy(t.color);
    this.linewidth = t.linewidth;
    this.linecap = t.linecap;
    this.linejoin = t.linejoin;
    return this;
  }
}
s.prototype.isLineBasicMaterial = true;