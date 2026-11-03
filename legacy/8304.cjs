var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  w: function () {
    return o;
  },
  T: function () {
    return u;
  }
});
var r = require("./3131.cjs");
var i = require("./9046.cjs");
var s = require("./140.cjs");
var a = require("./6454.cjs");
class o {
  constructor() {
    this.enabled = true;
    this.needsSwap = true;
    this.clear = false;
    this.renderToScreen = false;
  }
  setSize() {}
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
}
const l = new r.i(-1, 1, 1, -1, 0, 1);
const c = new i.u();
c.setAttribute("position", new s.a$([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3));
c.setAttribute("uv", new s.a$([0, 2, 0, 0, 2, 0], 2));
class u {
  constructor(t) {
    this._mesh = new a.K(c, t);
  }
  dispose() {
    this._mesh.geometry.dispose();
  }
  render(t) {
    t.render(this._mesh, l);
  }
  get material() {
    return this._mesh.material;
  }
  set material(t) {
    this._mesh.material = t;
  }
}