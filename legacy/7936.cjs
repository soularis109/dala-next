var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  S: function () {
    return u;
  }
});
var r = require("./4758.cjs");
var i = require("./6454.cjs");
var s = require("./9203.cjs");
const a = new s.y();
const o = new s.y();
const l = [];
const c = new i.K();
class u extends i.K {
  constructor(t, e, n) {
    super(t, e);
    this.instanceMatrix = new r.l(new Float32Array(n * 16), 16);
    this.instanceColor = null;
    this.count = n;
    this.frustumCulled = false;
  }
  copy(t) {
    super.copy(t);
    this.instanceMatrix.copy(t.instanceMatrix);
    if (t.instanceColor !== null) {
      this.instanceColor = t.instanceColor.clone();
    }
    this.count = t.count;
    return this;
  }
  getColorAt(t, e) {
    e.fromArray(this.instanceColor.array, t * 3);
  }
  getMatrixAt(t, e) {
    e.fromArray(this.instanceMatrix.array, t * 16);
  }
  raycast(t, e) {
    const n = this.matrixWorld;
    const r = this.count;
    c.geometry = this.geometry;
    c.material = this.material;
    if (c.material !== undefined) {
      for (let i = 0; i < r; i++) {
        this.getMatrixAt(i, a);
        o.multiplyMatrices(n, a);
        c.matrixWorld = o;
        c.raycast(t, l);
        for (let t = 0, n = l.length; t < n; t++) {
          const n = l[t];
          n.instanceId = i;
          n.object = this;
          e.push(n);
        }
        l.length = 0;
      }
    }
  }
  setColorAt(t, e) {
    if (this.instanceColor === null) {
      this.instanceColor = new r.l(new Float32Array(this.instanceMatrix.count * 3), 3);
    }
    e.toArray(this.instanceColor.array, t * 3);
  }
  setMatrixAt(t, e) {
    e.toArray(this.instanceMatrix.array, t * 16);
  }
  updateMorphTargets() {}
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
}
u.prototype.isInstancedMesh = true;