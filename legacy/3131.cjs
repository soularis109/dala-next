var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  i: function () {
    return i;
  }
});
var r = require("./1929.cjs");
class i extends r.V {
  constructor(t = -1, e = 1, n = 1, r = -1, i = 0.1, s = 2000) {
    super();
    this.type = "OrthographicCamera";
    this.zoom = 1;
    this.view = null;
    this.left = t;
    this.right = e;
    this.top = n;
    this.bottom = r;
    this.near = i;
    this.far = s;
    this.updateProjectionMatrix();
  }
  copy(t, e) {
    super.copy(t, e);
    this.left = t.left;
    this.right = t.right;
    this.top = t.top;
    this.bottom = t.bottom;
    this.near = t.near;
    this.far = t.far;
    this.zoom = t.zoom;
    this.view = t.view === null ? null : Object.assign({}, t.view);
    return this;
  }
  setViewOffset(t, e, n, r, i, s) {
    if (this.view === null) {
      this.view = {
        enabled: true,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1
      };
    }
    this.view.enabled = true;
    this.view.fullWidth = t;
    this.view.fullHeight = e;
    this.view.offsetX = n;
    this.view.offsetY = r;
    this.view.width = i;
    this.view.height = s;
    this.updateProjectionMatrix();
  }
  clearViewOffset() {
    if (this.view !== null) {
      this.view.enabled = false;
    }
    this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const t = (this.right - this.left) / (this.zoom * 2);
    const e = (this.top - this.bottom) / (this.zoom * 2);
    const n = (this.right + this.left) / 2;
    const r = (this.top + this.bottom) / 2;
    let i = n - t;
    let s = n + t;
    let a = r + e;
    let o = r - e;
    if (this.view !== null && this.view.enabled) {
      const t = (this.right - this.left) / this.view.fullWidth / this.zoom;
      const e = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      i += t * this.view.offsetX;
      s = i + t * this.view.width;
      a -= e * this.view.offsetY;
      o = a - e * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(i, s, a, o, this.near, this.far);
    this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    e.object.zoom = this.zoom;
    e.object.left = this.left;
    e.object.right = this.right;
    e.object.top = this.top;
    e.object.bottom = this.bottom;
    e.object.near = this.near;
    e.object.far = this.far;
    if (this.view !== null) {
      e.object.view = Object.assign({}, this.view);
    }
    return e;
  }
}
i.prototype.isOrthographicCamera = true;