var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  c: function () {
    return s;
  }
});
var r = require("./1929.cjs");
var i = require("./2043.cjs");
class s extends r.V {
  constructor(t = 50, e = 1, n = 0.1, r = 2000) {
    super();
    this.type = "PerspectiveCamera";
    this.fov = t;
    this.zoom = 1;
    this.near = n;
    this.far = r;
    this.focus = 10;
    this.aspect = e;
    this.view = null;
    this.filmGauge = 35;
    this.filmOffset = 0;
    this.updateProjectionMatrix();
  }
  copy(t, e) {
    super.copy(t, e);
    this.fov = t.fov;
    this.zoom = t.zoom;
    this.near = t.near;
    this.far = t.far;
    this.focus = t.focus;
    this.aspect = t.aspect;
    this.view = t.view === null ? null : Object.assign({}, t.view);
    this.filmGauge = t.filmGauge;
    this.filmOffset = t.filmOffset;
    return this;
  }
  setFocalLength(t) {
    const e = this.getFilmHeight() * 0.5 / t;
    this.fov = i.I3 * 2 * Math.atan(e);
    this.updateProjectionMatrix();
  }
  getFocalLength() {
    const t = Math.tan(i.qW * 0.5 * this.fov);
    return this.getFilmHeight() * 0.5 / t;
  }
  getEffectiveFOV() {
    return i.I3 * 2 * Math.atan(Math.tan(i.qW * 0.5 * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  setViewOffset(t, e, n, r, i, s) {
    this.aspect = t / e;
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
    const t = this.near;
    let e = t * Math.tan(i.qW * 0.5 * this.fov) / this.zoom;
    let n = e * 2;
    let r = this.aspect * n;
    let s = r * -0.5;
    const a = this.view;
    if (this.view !== null && this.view.enabled) {
      const t = a.fullWidth;
      const i = a.fullHeight;
      s += a.offsetX * r / t;
      e -= a.offsetY * n / i;
      r *= a.width / t;
      n *= a.height / i;
    }
    const o = this.filmOffset;
    if (o !== 0) {
      s += t * o / this.getFilmWidth();
    }
    this.projectionMatrix.makePerspective(s, s + r, e, e - n, t, this.far);
    this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    e.object.fov = this.fov;
    e.object.zoom = this.zoom;
    e.object.near = this.near;
    e.object.far = this.far;
    e.object.focus = this.focus;
    e.object.aspect = this.aspect;
    if (this.view !== null) {
      e.object.view = Object.assign({}, this.view);
    }
    e.object.filmGauge = this.filmGauge;
    e.object.filmOffset = this.filmOffset;
    return e;
  }
}
s.prototype.isPerspectiveCamera = true;