var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  V: function () {
    return s;
  }
});
var r = require("./9203.cjs");
var i = require("./8478.cjs");
class s extends i.T {
  constructor() {
    super();
    this.type = "Camera";
    this.matrixWorldInverse = new r.y();
    this.projectionMatrix = new r.y();
    this.projectionMatrixInverse = new r.y();
  }
  copy(t, e) {
    super.copy(t, e);
    this.matrixWorldInverse.copy(t.matrixWorldInverse);
    this.projectionMatrix.copy(t.projectionMatrix);
    this.projectionMatrixInverse.copy(t.projectionMatrixInverse);
    return this;
  }
  getWorldDirection(t) {
    this.updateWorldMatrix(true, false);
    const e = this.matrixWorld.elements;
    return t.set(-e[8], -e[9], -e[10]).normalize();
  }
  updateMatrixWorld(t) {
    super.updateMatrixWorld(t);
    this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(t, e) {
    super.updateWorldMatrix(t, e);
    this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
s.prototype.isCamera = true;