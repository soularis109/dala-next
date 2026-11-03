var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  E: function () {
    return Wt;
  }
});
class r {
  static decodeText(t) {
    if (typeof TextDecoder != "undefined") {
      return new TextDecoder().decode(t);
    }
    let e = "";
    for (let n = 0, r = t.length; n < r; n++) {
      e += String.fromCharCode(t[n]);
    }
    try {
      return decodeURIComponent(escape(e));
    } catch (t) {
      return e;
    }
  }
  static extractUrlBase(t) {
    const e = t.lastIndexOf("/");
    if (e === -1) {
      return "./";
    } else {
      return t.substr(0, e + 1);
    }
  }
}
var i = require("./8478.cjs");
var s = require("./3662.cjs");
class a extends i.T {
  constructor(t, e = 1) {
    super();
    this.type = "Light";
    this.color = new s.I(t);
    this.intensity = e;
  }
  dispose() {}
  copy(t) {
    super.copy(t);
    this.color.copy(t.color);
    this.intensity = t.intensity;
    return this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    e.object.color = this.color.getHex();
    e.object.intensity = this.intensity;
    if (this.groundColor !== undefined) {
      e.object.groundColor = this.groundColor.getHex();
    }
    if (this.distance !== undefined) {
      e.object.distance = this.distance;
    }
    if (this.angle !== undefined) {
      e.object.angle = this.angle;
    }
    if (this.decay !== undefined) {
      e.object.decay = this.decay;
    }
    if (this.penumbra !== undefined) {
      e.object.penumbra = this.penumbra;
    }
    if (this.shadow !== undefined) {
      e.object.shadow = this.shadow.toJSON();
    }
    return e;
  }
}
a.prototype.isLight = true;
var o = require("./9203.cjs");
var l = require("./1138.cjs");
var c = require("./6881.cjs");
var u = require("./223.cjs");
var h = require("./4698.cjs");
const d = new o.y();
const f = new c.P();
const p = new c.P();
class m {
  constructor(t) {
    this.camera = t;
    this.bias = 0;
    this.normalBias = 0;
    this.radius = 1;
    this.blurSamples = 8;
    this.mapSize = new l.F(512, 512);
    this.map = null;
    this.mapPass = null;
    this.matrix = new o.y();
    this.autoUpdate = true;
    this.needsUpdate = false;
    this._frustum = new h.i();
    this._frameExtents = new l.F(1, 1);
    this._viewportCount = 1;
    this._viewports = [new u.L(0, 0, 1, 1)];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(t) {
    const e = this.camera;
    const n = this.matrix;
    f.setFromMatrixPosition(t.matrixWorld);
    e.position.copy(f);
    p.setFromMatrixPosition(t.target.matrixWorld);
    e.lookAt(p);
    e.updateMatrixWorld();
    d.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse);
    this._frustum.setFromProjectionMatrix(d);
    n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
    n.multiply(e.projectionMatrix);
    n.multiply(e.matrixWorldInverse);
  }
  getViewport(t) {
    return this._viewports[t];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    if (this.map) {
      this.map.dispose();
    }
    if (this.mapPass) {
      this.mapPass.dispose();
    }
  }
  copy(t) {
    this.camera = t.camera.clone();
    this.bias = t.bias;
    this.radius = t.radius;
    this.mapSize.copy(t.mapSize);
    return this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const t = {};
    if (this.bias !== 0) {
      t.bias = this.bias;
    }
    if (this.normalBias !== 0) {
      t.normalBias = this.normalBias;
    }
    if (this.radius !== 1) {
      t.radius = this.radius;
    }
    if (this.mapSize.x !== 512 || this.mapSize.y !== 512) {
      t.mapSize = this.mapSize.toArray();
    }
    t.camera = this.camera.toJSON(false).object;
    delete t.camera.matrix;
    return t;
  }
}
var g = require("./3131.cjs");
class v extends m {
  constructor() {
    super(new g.i(-5, 5, 5, -5, 0.5, 500));
  }
}
v.prototype.isDirectionalLightShadow = true;
class _ extends a {
  constructor(t, e) {
    super(t, e);
    this.type = "DirectionalLight";
    this.position.copy(i.T.DefaultUp);
    this.updateMatrix();
    this.target = new i.T();
    this.shadow = new v();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t) {
    super.copy(t);
    this.target = t.target.clone();
    this.shadow = t.shadow.clone();
    return this;
  }
}
_.prototype.isDirectionalLight = true;
var x = require("./1051.cjs");
const y = new o.y();
const b = new c.P();
const w = new c.P();
class M extends m {
  constructor() {
    super(new x.c(90, 1, 0.5, 500));
    this._frameExtents = new l.F(4, 2);
    this._viewportCount = 6;
    this._viewports = [new u.L(2, 1, 1, 1), new u.L(0, 1, 1, 1), new u.L(3, 1, 1, 1), new u.L(1, 1, 1, 1), new u.L(3, 0, 1, 1), new u.L(1, 0, 1, 1)];
    this._cubeDirections = [new c.P(1, 0, 0), new c.P(-1, 0, 0), new c.P(0, 0, 1), new c.P(0, 0, -1), new c.P(0, 1, 0), new c.P(0, -1, 0)];
    this._cubeUps = [new c.P(0, 1, 0), new c.P(0, 1, 0), new c.P(0, 1, 0), new c.P(0, 1, 0), new c.P(0, 0, 1), new c.P(0, 0, -1)];
  }
  updateMatrices(t, e = 0) {
    const n = this.camera;
    const r = this.matrix;
    const i = t.distance || n.far;
    if (i !== n.far) {
      n.far = i;
      n.updateProjectionMatrix();
    }
    b.setFromMatrixPosition(t.matrixWorld);
    n.position.copy(b);
    w.copy(n.position);
    w.add(this._cubeDirections[e]);
    n.up.copy(this._cubeUps[e]);
    n.lookAt(w);
    n.updateMatrixWorld();
    r.makeTranslation(-b.x, -b.y, -b.z);
    y.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse);
    this._frustum.setFromProjectionMatrix(y);
  }
}
M.prototype.isPointLightShadow = true;
class T extends a {
  constructor(t, e, n = 0, r = 1) {
    super(t, e);
    this.type = "PointLight";
    this.distance = n;
    this.decay = r;
    this.shadow = new M();
  }
  get power() {
    return this.intensity * 4 * Math.PI;
  }
  set power(t) {
    this.intensity = t / (Math.PI * 4);
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t) {
    super.copy(t);
    this.distance = t.distance;
    this.decay = t.decay;
    this.shadow = t.shadow.clone();
    return this;
  }
}
T.prototype.isPointLight = true;
var S = require("./2043.cjs");
class E extends m {
  constructor() {
    super(new x.c(50, 1, 0.5, 500));
    this.focus = 1;
  }
  updateMatrices(t) {
    const e = this.camera;
    const n = S.I3 * 2 * t.angle * this.focus;
    const r = this.mapSize.width / this.mapSize.height;
    const i = t.distance || e.far;
    if (n !== e.fov || r !== e.aspect || i !== e.far) {
      e.fov = n;
      e.aspect = r;
      e.far = i;
      e.updateProjectionMatrix();
    }
    super.updateMatrices(t);
  }
  copy(t) {
    super.copy(t);
    this.focus = t.focus;
    return this;
  }
}
E.prototype.isSpotLightShadow = true;
class A extends a {
  constructor(t, e, n = 0, r = Math.PI / 3, s = 0, a = 1) {
    super(t, e);
    this.type = "SpotLight";
    this.position.copy(i.T.DefaultUp);
    this.updateMatrix();
    this.target = new i.T();
    this.distance = n;
    this.angle = r;
    this.penumbra = s;
    this.decay = a;
    this.shadow = new E();
  }
  get power() {
    return this.intensity * Math.PI;
  }
  set power(t) {
    this.intensity = t / Math.PI;
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t) {
    super.copy(t);
    this.distance = t.distance;
    this.angle = t.angle;
    this.penumbra = t.penumbra;
    this.decay = t.decay;
    this.target = t.target.clone();
    this.shadow = t.shadow.clone();
    return this;
  }
}
A.prototype.isSpotLight = true;
var R = require("./1661.cjs");
var L = require("./4164.cjs");
class P extends L.F {
  constructor(t) {
    super();
    this.defines = {
      STANDARD: ""
    };
    this.type = "MeshStandardMaterial";
    this.color = new s.I(16777215);
    this.roughness = 1;
    this.metalness = 0;
    this.map = null;
    this.lightMap = null;
    this.lightMapIntensity = 1;
    this.aoMap = null;
    this.aoMapIntensity = 1;
    this.emissive = new s.I(0);
    this.emissiveIntensity = 1;
    this.emissiveMap = null;
    this.bumpMap = null;
    this.bumpScale = 1;
    this.normalMap = null;
    this.normalMapType = R.IOt;
    this.normalScale = new l.F(1, 1);
    this.displacementMap = null;
    this.displacementScale = 1;
    this.displacementBias = 0;
    this.roughnessMap = null;
    this.metalnessMap = null;
    this.alphaMap = null;
    this.envMap = null;
    this.envMapIntensity = 1;
    this.refractionRatio = 0.98;
    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.wireframeLinecap = "round";
    this.wireframeLinejoin = "round";
    this.flatShading = false;
    this.setValues(t);
  }
  copy(t) {
    super.copy(t);
    this.defines = {
      STANDARD: ""
    };
    this.color.copy(t.color);
    this.roughness = t.roughness;
    this.metalness = t.metalness;
    this.map = t.map;
    this.lightMap = t.lightMap;
    this.lightMapIntensity = t.lightMapIntensity;
    this.aoMap = t.aoMap;
    this.aoMapIntensity = t.aoMapIntensity;
    this.emissive.copy(t.emissive);
    this.emissiveMap = t.emissiveMap;
    this.emissiveIntensity = t.emissiveIntensity;
    this.bumpMap = t.bumpMap;
    this.bumpScale = t.bumpScale;
    this.normalMap = t.normalMap;
    this.normalMapType = t.normalMapType;
    this.normalScale.copy(t.normalScale);
    this.displacementMap = t.displacementMap;
    this.displacementScale = t.displacementScale;
    this.displacementBias = t.displacementBias;
    this.roughnessMap = t.roughnessMap;
    this.metalnessMap = t.metalnessMap;
    this.alphaMap = t.alphaMap;
    this.envMap = t.envMap;
    this.envMapIntensity = t.envMapIntensity;
    this.refractionRatio = t.refractionRatio;
    this.wireframe = t.wireframe;
    this.wireframeLinewidth = t.wireframeLinewidth;
    this.wireframeLinecap = t.wireframeLinecap;
    this.wireframeLinejoin = t.wireframeLinejoin;
    this.flatShading = t.flatShading;
    return this;
  }
}
P.prototype.isMeshStandardMaterial = true;
class C extends P {
  constructor(t) {
    super();
    this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    };
    this.type = "MeshPhysicalMaterial";
    this.clearcoatMap = null;
    this.clearcoatRoughness = 0;
    this.clearcoatRoughnessMap = null;
    this.clearcoatNormalScale = new l.F(1, 1);
    this.clearcoatNormalMap = null;
    this.ior = 1.5;
    Object.defineProperty(this, "reflectivity", {
      get: function () {
        return S.uZ((this.ior - 1) * 2.5 / (this.ior + 1), 0, 1);
      },
      set: function (t) {
        this.ior = (1 + t * 0.4) / (1 - t * 0.4);
      }
    });
    this.sheenTint = new s.I(0);
    this.transmission = 0;
    this.transmissionMap = null;
    this.thickness = 0.01;
    this.thicknessMap = null;
    this.attenuationDistance = 0;
    this.attenuationTint = new s.I(1, 1, 1);
    this.specularIntensity = 1;
    this.specularIntensityMap = null;
    this.specularTint = new s.I(1, 1, 1);
    this.specularTintMap = null;
    this._clearcoat = 0;
    this._transmission = 0;
    this.setValues(t);
  }
  get clearcoat() {
    return this._clearcoat;
  }
  set clearcoat(t) {
    if (this._clearcoat > 0 != t > 0) {
      this.version++;
    }
    this._clearcoat = t;
  }
  get transmission() {
    return this._transmission;
  }
  set transmission(t) {
    if (this._transmission > 0 != t > 0) {
      this.version++;
    }
    this._transmission = t;
  }
  copy(t) {
    super.copy(t);
    this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    };
    this.clearcoat = t.clearcoat;
    this.clearcoatMap = t.clearcoatMap;
    this.clearcoatRoughness = t.clearcoatRoughness;
    this.clearcoatRoughnessMap = t.clearcoatRoughnessMap;
    this.clearcoatNormalMap = t.clearcoatNormalMap;
    this.clearcoatNormalScale.copy(t.clearcoatNormalScale);
    this.ior = t.ior;
    this.sheenTint.copy(t.sheenTint);
    this.transmission = t.transmission;
    this.transmissionMap = t.transmissionMap;
    this.thickness = t.thickness;
    this.thicknessMap = t.thicknessMap;
    this.attenuationDistance = t.attenuationDistance;
    this.attenuationTint.copy(t.attenuationTint);
    this.specularIntensity = t.specularIntensity;
    this.specularIntensityMap = t.specularIntensityMap;
    this.specularTint.copy(t.specularTint);
    this.specularTintMap = t.specularTintMap;
    return this;
  }
}
C.prototype.isMeshPhysicalMaterial = true;
class D {
  constructor(t, e, n, r) {
    this.parameterPositions = t;
    this._cachedIndex = 0;
    this.resultBuffer = r !== undefined ? r : new e.constructor(n);
    this.sampleValues = e;
    this.valueSize = n;
    this.settings = null;
    this.DefaultSettings_ = {};
  }
  evaluate(t) {
    const e = this.parameterPositions;
    let n = this._cachedIndex;
    let r = e[n];
    let i = e[n - 1];
    t: {
      e: {
        let s;
        n: {
          r: if (!(t < r)) {
            for (let s = n + 2;;) {
              if (r === undefined) {
                if (t < i) {
                  break r;
                }
                n = e.length;
                this._cachedIndex = n;
                return this.afterEnd_(n - 1, t, i);
              }
              if (n === s) {
                break;
              }
              i = r;
              r = e[++n];
              if (t < r) {
                break e;
              }
            }
            s = e.length;
            break n;
          }
          if (t >= i) {
            break t;
          }
          {
            const a = e[1];
            if (t < a) {
              n = 2;
              i = a;
            }
            for (let s = n - 2;;) {
              if (i === undefined) {
                this._cachedIndex = 0;
                return this.beforeStart_(0, t, r);
              }
              if (n === s) {
                break;
              }
              r = i;
              i = e[--n - 1];
              if (t >= i) {
                break e;
              }
            }
            s = n;
            n = 0;
          }
        }
        while (n < s) {
          const r = n + s >>> 1;
          if (t < e[r]) {
            s = r;
          } else {
            n = r + 1;
          }
        }
        r = e[n];
        i = e[n - 1];
        if (i === undefined) {
          this._cachedIndex = 0;
          return this.beforeStart_(0, t, r);
        }
        if (r === undefined) {
          n = e.length;
          this._cachedIndex = n;
          return this.afterEnd_(n - 1, i, t);
        }
      }
      this._cachedIndex = n;
      this.intervalChanged_(n, i, r);
    }
    return this.interpolate_(n, i, t, r);
  }
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  copySampleValue_(t) {
    const e = this.resultBuffer;
    const n = this.sampleValues;
    const r = this.valueSize;
    const i = t * r;
    for (let t = 0; t !== r; ++t) {
      e[t] = n[i + t];
    }
    return e;
  }
  interpolate_() {
    throw new Error("call to abstract method");
  }
  intervalChanged_() {}
}
D.prototype.beforeStart_ = D.prototype.copySampleValue_;
D.prototype.afterEnd_ = D.prototype.copySampleValue_;
var I = require("./2626.cjs");
var N = require("./6023.cjs");
class F extends N.a {
  constructor(t) {
    super(t);
    if (typeof createImageBitmap == "undefined") {
      console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported.");
    }
    if (typeof fetch == "undefined") {
      console.warn("THREE.ImageBitmapLoader: fetch() not supported.");
    }
    this.options = {
      premultiplyAlpha: "none"
    };
  }
  setOptions(t) {
    this.options = t;
    return this;
  }
  load(t = "", e, n, r) {
    if (this.path !== undefined) {
      t = this.path + t;
    }
    t = this.manager.resolveURL(t);
    const i = this;
    const s = I.C.get(t);
    if (s !== undefined) {
      i.manager.itemStart(t);
      setTimeout(function () {
        if (e) {
          e(s);
        }
        i.manager.itemEnd(t);
      }, 0);
      return s;
    }
    const a = {
      credentials: this.crossOrigin === "anonymous" ? "same-origin" : "include",
      headers: this.requestHeader
    };
    fetch(t, a).then(function (t) {
      return t.blob();
    }).then(function (t) {
      return createImageBitmap(t, Object.assign(i.options, {
        colorSpaceConversion: "none"
      }));
    }).then(function (n) {
      I.C.add(t, n);
      if (e) {
        e(n);
      }
      i.manager.itemEnd(t);
    }).catch(function (e) {
      if (r) {
        r(e);
      }
      i.manager.itemError(t);
      i.manager.itemEnd(t);
    });
    i.manager.itemStart(t);
  }
}
F.prototype.isImageBitmapLoader = true;
class O {
  constructor(t, e) {
    this.array = t;
    this.stride = e;
    this.count = t !== undefined ? t.length / e : 0;
    this.usage = R.W2J;
    this.updateRange = {
      offset: 0,
      count: -1
    };
    this.version = 0;
    this.uuid = S.DO();
  }
  onUploadCallback() {}
  set needsUpdate(t) {
    if (t === true) {
      this.version++;
    }
  }
  setUsage(t) {
    this.usage = t;
    return this;
  }
  copy(t) {
    this.array = new t.array.constructor(t.array);
    this.count = t.count;
    this.stride = t.stride;
    this.usage = t.usage;
    return this;
  }
  copyAt(t, e, n) {
    t *= this.stride;
    n *= e.stride;
    for (let r = 0, i = this.stride; r < i; r++) {
      this.array[t + r] = e.array[n + r];
    }
    return this;
  }
  set(t, e = 0) {
    this.array.set(t, e);
    return this;
  }
  clone(t) {
    if (t.arrayBuffers === undefined) {
      t.arrayBuffers = {};
    }
    if (this.array.buffer._uuid === undefined) {
      this.array.buffer._uuid = S.DO();
    }
    if (t.arrayBuffers[this.array.buffer._uuid] === undefined) {
      t.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer;
    }
    const e = new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]);
    const n = new this.constructor(e, this.stride);
    n.setUsage(this.usage);
    return n;
  }
  onUpload(t) {
    this.onUploadCallback = t;
    return this;
  }
  toJSON(t) {
    if (t.arrayBuffers === undefined) {
      t.arrayBuffers = {};
    }
    if (this.array.buffer._uuid === undefined) {
      this.array.buffer._uuid = S.DO();
    }
    if (t.arrayBuffers[this.array.buffer._uuid] === undefined) {
      t.arrayBuffers[this.array.buffer._uuid] = Array.prototype.slice.call(new Uint32Array(this.array.buffer));
    }
    return {
      uuid: this.uuid,
      buffer: this.array.buffer._uuid,
      type: this.array.constructor.name,
      stride: this.stride
    };
  }
}
O.prototype.isInterleavedBuffer = true;
var U = require("./140.cjs");
const B = new c.P();
class z {
  constructor(t, e, n, r = false) {
    this.name = "";
    this.data = t;
    this.itemSize = e;
    this.offset = n;
    this.normalized = r === true;
  }
  get count() {
    return this.data.count;
  }
  get array() {
    return this.data.array;
  }
  set needsUpdate(t) {
    this.data.needsUpdate = t;
  }
  applyMatrix4(t) {
    for (let e = 0, n = this.data.count; e < n; e++) {
      B.x = this.getX(e);
      B.y = this.getY(e);
      B.z = this.getZ(e);
      B.applyMatrix4(t);
      this.setXYZ(e, B.x, B.y, B.z);
    }
    return this;
  }
  applyNormalMatrix(t) {
    for (let e = 0, n = this.count; e < n; e++) {
      B.x = this.getX(e);
      B.y = this.getY(e);
      B.z = this.getZ(e);
      B.applyNormalMatrix(t);
      this.setXYZ(e, B.x, B.y, B.z);
    }
    return this;
  }
  transformDirection(t) {
    for (let e = 0, n = this.count; e < n; e++) {
      B.x = this.getX(e);
      B.y = this.getY(e);
      B.z = this.getZ(e);
      B.transformDirection(t);
      this.setXYZ(e, B.x, B.y, B.z);
    }
    return this;
  }
  setX(t, e) {
    this.data.array[t * this.data.stride + this.offset] = e;
    return this;
  }
  setY(t, e) {
    this.data.array[t * this.data.stride + this.offset + 1] = e;
    return this;
  }
  setZ(t, e) {
    this.data.array[t * this.data.stride + this.offset + 2] = e;
    return this;
  }
  setW(t, e) {
    this.data.array[t * this.data.stride + this.offset + 3] = e;
    return this;
  }
  getX(t) {
    return this.data.array[t * this.data.stride + this.offset];
  }
  getY(t) {
    return this.data.array[t * this.data.stride + this.offset + 1];
  }
  getZ(t) {
    return this.data.array[t * this.data.stride + this.offset + 2];
  }
  getW(t) {
    return this.data.array[t * this.data.stride + this.offset + 3];
  }
  setXY(t, e, n) {
    t = t * this.data.stride + this.offset;
    this.data.array[t + 0] = e;
    this.data.array[t + 1] = n;
    return this;
  }
  setXYZ(t, e, n, r) {
    t = t * this.data.stride + this.offset;
    this.data.array[t + 0] = e;
    this.data.array[t + 1] = n;
    this.data.array[t + 2] = r;
    return this;
  }
  setXYZW(t, e, n, r, i) {
    t = t * this.data.stride + this.offset;
    this.data.array[t + 0] = e;
    this.data.array[t + 1] = n;
    this.data.array[t + 2] = r;
    this.data.array[t + 3] = i;
    return this;
  }
  clone(t) {
    if (t === undefined) {
      console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interlaved buffer attribute will deinterleave buffer data.");
      const t = [];
      for (let e = 0; e < this.count; e++) {
        const n = e * this.data.stride + this.offset;
        for (let e = 0; e < this.itemSize; e++) {
          t.push(this.data.array[n + e]);
        }
      }
      return new U.Tl(new this.array.constructor(t), this.itemSize, this.normalized);
    }
    if (t.interleavedBuffers === undefined) {
      t.interleavedBuffers = {};
    }
    if (t.interleavedBuffers[this.data.uuid] === undefined) {
      t.interleavedBuffers[this.data.uuid] = this.data.clone(t);
    }
    return new z(t.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
  }
  toJSON(t) {
    if (t === undefined) {
      console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interlaved buffer attribute will deinterleave buffer data.");
      const t = [];
      for (let e = 0; e < this.count; e++) {
        const n = e * this.data.stride + this.offset;
        for (let e = 0; e < this.itemSize; e++) {
          t.push(this.data.array[n + e]);
        }
      }
      return {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: t,
        normalized: this.normalized
      };
    }
    if (t.interleavedBuffers === undefined) {
      t.interleavedBuffers = {};
    }
    if (t.interleavedBuffers[this.data.uuid] === undefined) {
      t.interleavedBuffers[this.data.uuid] = this.data.toJSON(t);
    }
    return {
      isInterleavedBufferAttribute: true,
      itemSize: this.itemSize,
      data: this.data.uuid,
      offset: this.offset,
      normalized: this.normalized
    };
  }
}
z.prototype.isInterleavedBufferAttribute = true;
class k extends L.F {
  constructor(t) {
    super();
    this.type = "PointsMaterial";
    this.color = new s.I(16777215);
    this.map = null;
    this.alphaMap = null;
    this.size = 1;
    this.sizeAttenuation = true;
    this.setValues(t);
  }
  copy(t) {
    super.copy(t);
    this.color.copy(t.color);
    this.map = t.map;
    this.alphaMap = t.alphaMap;
    this.size = t.size;
    this.sizeAttenuation = t.sizeAttenuation;
    return this;
  }
}
k.prototype.isPointsMaterial = true;
const G = "\\[\\]\\.:\\/";
const H = new RegExp("[\\[\\]\\.:\\/]", "g");
const V = "[^\\[\\]\\.:\\/]";
const W = "[^" + G.replace("\\.", "") + "]";
const X = /((?:WC+[\/:])*)/.source.replace("WC", V);
const j = /(WCOD+)?/.source.replace("WCOD", W);
const q = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", V);
const Y = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", V);
const Z = new RegExp("^" + X + j + q + Y + "$");
const K = ["material", "materials", "bones"];
class J {
  constructor(t, e, n) {
    this.path = e;
    this.parsedPath = n || J.parseTrackName(e);
    this.node = J.findNode(t, this.parsedPath.nodeName) || t;
    this.rootNode = t;
    this.getValue = this._getValue_unbound;
    this.setValue = this._setValue_unbound;
  }
  static create(t, e, n) {
    if (t && t.isAnimationObjectGroup) {
      return new J.Composite(t, e, n);
    } else {
      return new J(t, e, n);
    }
  }
  static sanitizeNodeName(t) {
    return t.replace(/\s/g, "_").replace(H, "");
  }
  static parseTrackName(t) {
    const e = Z.exec(t);
    if (!e) {
      throw new Error("PropertyBinding: Cannot parse trackName: " + t);
    }
    const n = {
      nodeName: e[2],
      objectName: e[3],
      objectIndex: e[4],
      propertyName: e[5],
      propertyIndex: e[6]
    };
    const r = n.nodeName && n.nodeName.lastIndexOf(".");
    if (r !== undefined && r !== -1) {
      const t = n.nodeName.substring(r + 1);
      if (K.indexOf(t) !== -1) {
        n.nodeName = n.nodeName.substring(0, r);
        n.objectName = t;
      }
    }
    if (n.propertyName === null || n.propertyName.length === 0) {
      throw new Error("PropertyBinding: can not parse propertyName from trackName: " + t);
    }
    return n;
  }
  static findNode(t, e) {
    if (!e || e === "" || e === "." || e === -1 || e === t.name || e === t.uuid) {
      return t;
    }
    if (t.skeleton) {
      const n = t.skeleton.getBoneByName(e);
      if (n !== undefined) {
        return n;
      }
    }
    if (t.children) {
      const n = function (t) {
        for (let r = 0; r < t.length; r++) {
          const i = t[r];
          if (i.name === e || i.uuid === e) {
            return i;
          }
          const s = n(i.children);
          if (s) {
            return s;
          }
        }
        return null;
      };
      const r = n(t.children);
      if (r) {
        return r;
      }
    }
    return null;
  }
  _getValue_unavailable() {}
  _setValue_unavailable() {}
  _getValue_direct(t, e) {
    t[e] = this.targetObject[this.propertyName];
  }
  _getValue_array(t, e) {
    const n = this.resolvedProperty;
    for (let r = 0, i = n.length; r !== i; ++r) {
      t[e++] = n[r];
    }
  }
  _getValue_arrayElement(t, e) {
    t[e] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray(t, e) {
    this.resolvedProperty.toArray(t, e);
  }
  _setValue_direct(t, e) {
    this.targetObject[this.propertyName] = t[e];
  }
  _setValue_direct_setNeedsUpdate(t, e) {
    this.targetObject[this.propertyName] = t[e];
    this.targetObject.needsUpdate = true;
  }
  _setValue_direct_setMatrixWorldNeedsUpdate(t, e) {
    this.targetObject[this.propertyName] = t[e];
    this.targetObject.matrixWorldNeedsUpdate = true;
  }
  _setValue_array(t, e) {
    const n = this.resolvedProperty;
    for (let r = 0, i = n.length; r !== i; ++r) {
      n[r] = t[e++];
    }
  }
  _setValue_array_setNeedsUpdate(t, e) {
    const n = this.resolvedProperty;
    for (let r = 0, i = n.length; r !== i; ++r) {
      n[r] = t[e++];
    }
    this.targetObject.needsUpdate = true;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(t, e) {
    const n = this.resolvedProperty;
    for (let r = 0, i = n.length; r !== i; ++r) {
      n[r] = t[e++];
    }
    this.targetObject.matrixWorldNeedsUpdate = true;
  }
  _setValue_arrayElement(t, e) {
    this.resolvedProperty[this.propertyIndex] = t[e];
  }
  _setValue_arrayElement_setNeedsUpdate(t, e) {
    this.resolvedProperty[this.propertyIndex] = t[e];
    this.targetObject.needsUpdate = true;
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate(t, e) {
    this.resolvedProperty[this.propertyIndex] = t[e];
    this.targetObject.matrixWorldNeedsUpdate = true;
  }
  _setValue_fromArray(t, e) {
    this.resolvedProperty.fromArray(t, e);
  }
  _setValue_fromArray_setNeedsUpdate(t, e) {
    this.resolvedProperty.fromArray(t, e);
    this.targetObject.needsUpdate = true;
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate(t, e) {
    this.resolvedProperty.fromArray(t, e);
    this.targetObject.matrixWorldNeedsUpdate = true;
  }
  _getValue_unbound(t, e) {
    this.bind();
    this.getValue(t, e);
  }
  _setValue_unbound(t, e) {
    this.bind();
    this.setValue(t, e);
  }
  bind() {
    let t = this.node;
    const e = this.parsedPath;
    const n = e.objectName;
    const r = e.propertyName;
    let i = e.propertyIndex;
    if (!t) {
      t = J.findNode(this.rootNode, e.nodeName) || this.rootNode;
      this.node = t;
    }
    this.getValue = this._getValue_unavailable;
    this.setValue = this._setValue_unavailable;
    if (!t) {
      console.error("THREE.PropertyBinding: Trying to update node for track: " + this.path + " but it wasn't found.");
      return;
    }
    if (n) {
      let r = e.objectIndex;
      switch (n) {
        case "materials":
          if (!t.material) {
            console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!t.material.materials) {
            console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
            return;
          }
          t = t.material.materials;
          break;
        case "bones":
          if (!t.skeleton) {
            console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
            return;
          }
          t = t.skeleton.bones;
          for (let e = 0; e < t.length; e++) {
            if (t[e].name === r) {
              r = e;
              break;
            }
          }
          break;
        default:
          if (t[n] === undefined) {
            console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
            return;
          }
          t = t[n];
      }
      if (r !== undefined) {
        if (t[r] === undefined) {
          console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
          return;
        }
        t = t[r];
      }
    }
    const s = t[r];
    if (s === undefined) {
      const n = e.nodeName;
      console.error("THREE.PropertyBinding: Trying to update property for track: " + n + "." + r + " but it wasn't found.", t);
      return;
    }
    let a = this.Versioning.None;
    this.targetObject = t;
    if (t.needsUpdate !== undefined) {
      a = this.Versioning.NeedsUpdate;
    } else if (t.matrixWorldNeedsUpdate !== undefined) {
      a = this.Versioning.MatrixWorldNeedsUpdate;
    }
    let o = this.BindingType.Direct;
    if (i !== undefined) {
      if (r === "morphTargetInfluences") {
        if (!t.geometry) {
          console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
          return;
        }
        if (!t.geometry.isBufferGeometry) {
          console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences on THREE.Geometry. Use THREE.BufferGeometry instead.", this);
          return;
        }
        if (!t.geometry.morphAttributes) {
          console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
          return;
        }
        if (t.morphTargetDictionary[i] !== undefined) {
          i = t.morphTargetDictionary[i];
        }
      }
      o = this.BindingType.ArrayElement;
      this.resolvedProperty = s;
      this.propertyIndex = i;
    } else if (s.fromArray !== undefined && s.toArray !== undefined) {
      o = this.BindingType.HasFromToArray;
      this.resolvedProperty = s;
    } else if (Array.isArray(s)) {
      o = this.BindingType.EntireArray;
      this.resolvedProperty = s;
    } else {
      this.propertyName = r;
    }
    this.getValue = this.GetterByBindingType[o];
    this.setValue = this.SetterByBindingTypeAndVersioning[o][a];
  }
  unbind() {
    this.node = null;
    this.getValue = this._getValue_unbound;
    this.setValue = this._setValue_unbound;
  }
}
J.Composite = class {
  constructor(t, e, n) {
    const r = n || J.parseTrackName(e);
    this._targetGroup = t;
    this._bindings = t.subscribe_(e, r);
  }
  getValue(t, e) {
    this.bind();
    const n = this._targetGroup.nCachedObjects_;
    const r = this._bindings[n];
    if (r !== undefined) {
      r.getValue(t, e);
    }
  }
  setValue(t, e) {
    const n = this._bindings;
    for (let r = this._targetGroup.nCachedObjects_, i = n.length; r !== i; ++r) {
      n[r].setValue(t, e);
    }
  }
  bind() {
    const t = this._bindings;
    for (let e = this._targetGroup.nCachedObjects_, n = t.length; e !== n; ++e) {
      t[e].bind();
    }
  }
  unbind() {
    const t = this._bindings;
    for (let e = this._targetGroup.nCachedObjects_, n = t.length; e !== n; ++e) {
      t[e].unbind();
    }
  }
};
J.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
};
J.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
};
J.prototype.GetterByBindingType = [J.prototype._getValue_direct, J.prototype._getValue_array, J.prototype._getValue_arrayElement, J.prototype._getValue_toArray];
J.prototype.SetterByBindingTypeAndVersioning = [[J.prototype._setValue_direct, J.prototype._setValue_direct_setNeedsUpdate, J.prototype._setValue_direct_setMatrixWorldNeedsUpdate], [J.prototype._setValue_array, J.prototype._setValue_array_setNeedsUpdate, J.prototype._setValue_array_setMatrixWorldNeedsUpdate], [J.prototype._setValue_arrayElement, J.prototype._setValue_arrayElement_setNeedsUpdate, J.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate], [J.prototype._setValue_fromArray, J.prototype._setValue_fromArray_setNeedsUpdate, J.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];
var Q = require("./6454.cjs");
const $ = new c.P();
const tt = new u.L();
const et = new u.L();
const nt = new c.P();
const rt = new o.y();
class it extends Q.K {
  constructor(t, e) {
    super(t, e);
    this.type = "SkinnedMesh";
    this.bindMode = "attached";
    this.bindMatrix = new o.y();
    this.bindMatrixInverse = new o.y();
  }
  copy(t) {
    super.copy(t);
    this.bindMode = t.bindMode;
    this.bindMatrix.copy(t.bindMatrix);
    this.bindMatrixInverse.copy(t.bindMatrixInverse);
    this.skeleton = t.skeleton;
    return this;
  }
  bind(t, e) {
    this.skeleton = t;
    if (e === undefined) {
      this.updateMatrixWorld(true);
      this.skeleton.calculateInverses();
      e = this.matrixWorld;
    }
    this.bindMatrix.copy(e);
    this.bindMatrixInverse.copy(e).invert();
  }
  pose() {
    this.skeleton.pose();
  }
  normalizeSkinWeights() {
    const t = new u.L();
    const e = this.geometry.attributes.skinWeight;
    for (let n = 0, r = e.count; n < r; n++) {
      t.x = e.getX(n);
      t.y = e.getY(n);
      t.z = e.getZ(n);
      t.w = e.getW(n);
      const r = 1 / t.manhattanLength();
      if (r !== Infinity) {
        t.multiplyScalar(r);
      } else {
        t.set(1, 0, 0, 0);
      }
      e.setXYZW(n, t.x, t.y, t.z, t.w);
    }
  }
  updateMatrixWorld(t) {
    super.updateMatrixWorld(t);
    if (this.bindMode === "attached") {
      this.bindMatrixInverse.copy(this.matrixWorld).invert();
    } else if (this.bindMode === "detached") {
      this.bindMatrixInverse.copy(this.bindMatrix).invert();
    } else {
      console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode);
    }
  }
  boneTransform(t, e) {
    const n = this.skeleton;
    const r = this.geometry;
    tt.fromBufferAttribute(r.attributes.skinIndex, t);
    et.fromBufferAttribute(r.attributes.skinWeight, t);
    $.fromBufferAttribute(r.attributes.position, t).applyMatrix4(this.bindMatrix);
    e.set(0, 0, 0);
    for (let t = 0; t < 4; t++) {
      const r = et.getComponent(t);
      if (r !== 0) {
        const i = tt.getComponent(t);
        rt.multiplyMatrices(n.bones[i].matrixWorld, n.boneInverses[i]);
        e.addScaledVector(nt.copy($).applyMatrix4(rt), r);
      }
    }
    return e.applyMatrix4(this.bindMatrixInverse);
  }
}
it.prototype.isSkinnedMesh = true;
var st = require("./1301.cjs");
class at extends st.x {
  constructor(t, e) {
    super(t, e);
    this.type = "LineLoop";
  }
}
at.prototype.isLineLoop = true;
var ot = require("./4699.cjs");
var lt = require("./7540.cjs");
var ct = require("./9046.cjs");
const ut = new o.y();
const ht = new lt.z();
const dt = new ot.a();
const ft = new c.P();
class pt extends i.T {
  constructor(t = new ct.u(), e = new k()) {
    super();
    this.type = "Points";
    this.geometry = t;
    this.material = e;
    this.updateMorphTargets();
  }
  copy(t) {
    super.copy(t);
    this.material = t.material;
    this.geometry = t.geometry;
    return this;
  }
  raycast(t, e) {
    const n = this.geometry;
    const r = this.matrixWorld;
    const i = t.params.Points.threshold;
    const s = n.drawRange;
    if (n.boundingSphere === null) {
      n.computeBoundingSphere();
    }
    dt.copy(n.boundingSphere);
    dt.applyMatrix4(r);
    dt.radius += i;
    if (t.ray.intersectsSphere(dt) === false) {
      return;
    }
    ut.copy(r).invert();
    ht.copy(t.ray).applyMatrix4(ut);
    const a = i / ((this.scale.x + this.scale.y + this.scale.z) / 3);
    const o = a * a;
    if (n.isBufferGeometry) {
      const i = n.index;
      const a = n.attributes.position;
      if (i !== null) {
        for (let n = Math.max(0, s.start), l = Math.min(i.count, s.start + s.count); n < l; n++) {
          const s = i.getX(n);
          ft.fromBufferAttribute(a, s);
          mt(ft, s, o, r, t, e, this);
        }
      } else {
        for (let n = Math.max(0, s.start), i = Math.min(a.count, s.start + s.count); n < i; n++) {
          ft.fromBufferAttribute(a, n);
          mt(ft, n, o, r, t, e, this);
        }
      }
    } else {
      console.error("THREE.Points.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");
    }
  }
  updateMorphTargets() {
    const t = this.geometry;
    if (t.isBufferGeometry) {
      const e = t.morphAttributes;
      const n = Object.keys(e);
      if (n.length > 0) {
        const t = e[n[0]];
        if (t !== undefined) {
          this.morphTargetInfluences = [];
          this.morphTargetDictionary = {};
          for (let e = 0, n = t.length; e < n; e++) {
            const n = t[e].name || String(e);
            this.morphTargetInfluences.push(0);
            this.morphTargetDictionary[n] = e;
          }
        }
      }
    } else {
      const e = t.morphTargets;
      if (e !== undefined && e.length > 0) {
        console.error("THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.");
      }
    }
  }
}
function mt(t, e, n, r, i, s, a) {
  const o = ht.distanceSqToPoint(t);
  if (o < n) {
    const n = new c.P();
    ht.closestPointToPoint(t, n);
    n.applyMatrix4(r);
    const l = i.ray.origin.distanceTo(n);
    if (l < i.near || l > i.far) {
      return;
    }
    s.push({
      distance: l,
      distanceToRay: Math.sqrt(o),
      point: n,
      index: e,
      face: null,
      object: a
    });
  }
}
pt.prototype.isPoints = true;
class gt extends D {
  constructor(t, e, n, r) {
    super(t, e, n, r);
    this._weightPrev = -0;
    this._offsetPrev = -0;
    this._weightNext = -0;
    this._offsetNext = -0;
    this.DefaultSettings_ = {
      endingStart: R.Pnf,
      endingEnd: R.Pnf
    };
  }
  intervalChanged_(t, e, n) {
    const r = this.parameterPositions;
    let i = t - 2;
    let s = t + 1;
    let a = r[i];
    let o = r[s];
    if (a === undefined) {
      switch (this.getSettings_().endingStart) {
        case R._lf:
          i = t;
          a = e * 2 - n;
          break;
        case R._sL:
          i = r.length - 2;
          a = e + r[i] - r[i + 1];
          break;
        default:
          i = t;
          a = n;
      }
    }
    if (o === undefined) {
      switch (this.getSettings_().endingEnd) {
        case R._lf:
          s = t;
          o = n * 2 - e;
          break;
        case R._sL:
          s = 1;
          o = n + r[1] - r[0];
          break;
        default:
          s = t - 1;
          o = e;
      }
    }
    const l = (n - e) * 0.5;
    const c = this.valueSize;
    this._weightPrev = l / (e - a);
    this._weightNext = l / (o - n);
    this._offsetPrev = i * c;
    this._offsetNext = s * c;
  }
  interpolate_(t, e, n, r) {
    const i = this.resultBuffer;
    const s = this.sampleValues;
    const a = this.valueSize;
    const o = t * a;
    const l = o - a;
    const c = this._offsetPrev;
    const u = this._offsetNext;
    const h = this._weightPrev;
    const d = this._weightNext;
    const f = (n - e) / (r - e);
    const p = f * f;
    const m = p * f;
    const g = -h * m + h * 2 * p - h * f;
    const v = (1 + h) * m + (-1.5 - h * 2) * p + (-0.5 + h) * f + 1;
    const _ = (-1 - d) * m + (1.5 + d) * p + f * 0.5;
    const x = d * m - d * p;
    for (let t = 0; t !== a; ++t) {
      i[t] = g * s[c + t] + v * s[l + t] + _ * s[o + t] + x * s[u + t];
    }
    return i;
  }
}
class vt extends D {
  constructor(t, e, n, r) {
    super(t, e, n, r);
  }
  interpolate_(t, e, n, r) {
    const i = this.resultBuffer;
    const s = this.sampleValues;
    const a = this.valueSize;
    const o = t * a;
    const l = o - a;
    const c = (n - e) / (r - e);
    const u = 1 - c;
    for (let t = 0; t !== a; ++t) {
      i[t] = s[l + t] * u + s[o + t] * c;
    }
    return i;
  }
}
class _t extends D {
  constructor(t, e, n, r) {
    super(t, e, n, r);
  }
  interpolate_(t) {
    return this.copySampleValue_(t - 1);
  }
}
var xt = require("./7092.cjs");
const yt = {
  arraySlice: function (t, e, n) {
    if (yt.isTypedArray(t)) {
      return new t.constructor(t.subarray(e, n !== undefined ? n : t.length));
    } else {
      return t.slice(e, n);
    }
  },
  convertArray: function (t, e, n) {
    if (!t || !n && t.constructor === e) {
      return t;
    } else if (typeof e.BYTES_PER_ELEMENT == "number") {
      return new e(t);
    } else {
      return Array.prototype.slice.call(t);
    }
  },
  isTypedArray: function (t) {
    return ArrayBuffer.isView(t) && !(t instanceof DataView);
  },
  getKeyframeOrder: function (t) {
    const e = t.length;
    const n = new Array(e);
    for (let t = 0; t !== e; ++t) {
      n[t] = t;
    }
    n.sort(function (e, n) {
      return t[e] - t[n];
    });
    return n;
  },
  sortedArray: function (t, e, n) {
    const r = t.length;
    const i = new t.constructor(r);
    for (let s = 0, a = 0; a !== r; ++s) {
      const r = n[s] * e;
      for (let n = 0; n !== e; ++n) {
        i[a++] = t[r + n];
      }
    }
    return i;
  },
  flattenJSON: function (t, e, n, r) {
    let i = 1;
    let s = t[0];
    while (s !== undefined && s[r] === undefined) {
      s = t[i++];
    }
    if (s === undefined) {
      return;
    }
    let a = s[r];
    if (a !== undefined) {
      if (Array.isArray(a)) {
        do {
          a = s[r];
          if (a !== undefined) {
            e.push(s.time);
            n.push.apply(n, a);
          }
          s = t[i++];
        } while (s !== undefined);
      } else if (a.toArray !== undefined) {
        do {
          a = s[r];
          if (a !== undefined) {
            e.push(s.time);
            a.toArray(n, n.length);
          }
          s = t[i++];
        } while (s !== undefined);
      } else {
        do {
          a = s[r];
          if (a !== undefined) {
            e.push(s.time);
            n.push(a);
          }
          s = t[i++];
        } while (s !== undefined);
      }
    }
  },
  subclip: function (t, e, n, r, i = 30) {
    const s = t.clone();
    s.name = e;
    const a = [];
    for (let t = 0; t < s.tracks.length; ++t) {
      const e = s.tracks[t];
      const o = e.getValueSize();
      const l = [];
      const c = [];
      for (let t = 0; t < e.times.length; ++t) {
        const s = e.times[t] * i;
        if (!(s < n) && !(s >= r)) {
          l.push(e.times[t]);
          for (let n = 0; n < o; ++n) {
            c.push(e.values[t * o + n]);
          }
        }
      }
      if (l.length !== 0) {
        e.times = yt.convertArray(l, e.times.constructor);
        e.values = yt.convertArray(c, e.values.constructor);
        a.push(e);
      }
    }
    s.tracks = a;
    let o = Infinity;
    for (let t = 0; t < s.tracks.length; ++t) {
      if (o > s.tracks[t].times[0]) {
        o = s.tracks[t].times[0];
      }
    }
    for (let t = 0; t < s.tracks.length; ++t) {
      s.tracks[t].shift(o * -1);
    }
    s.resetDuration();
    return s;
  },
  makeClipAdditive: function (t, e = 0, n = t, r = 30) {
    if (r <= 0) {
      r = 30;
    }
    const i = n.tracks.length;
    const s = e / r;
    for (let e = 0; e < i; ++e) {
      const r = n.tracks[e];
      const i = r.ValueTypeName;
      if (i === "bool" || i === "string") {
        continue;
      }
      const a = t.tracks.find(function (t) {
        return t.name === r.name && t.ValueTypeName === i;
      });
      if (a === undefined) {
        continue;
      }
      let o = 0;
      const l = r.getValueSize();
      if (r.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline) {
        o = l / 3;
      }
      let c = 0;
      const u = a.getValueSize();
      if (a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline) {
        c = u / 3;
      }
      const h = r.times.length - 1;
      let d;
      if (s <= r.times[0]) {
        const t = o;
        const e = l - o;
        d = yt.arraySlice(r.values, t, e);
      } else if (s >= r.times[h]) {
        const t = h * l + o;
        const e = t + l - o;
        d = yt.arraySlice(r.values, t, e);
      } else {
        const t = r.createInterpolant();
        const e = o;
        const n = l - o;
        t.evaluate(s);
        d = yt.arraySlice(t.resultBuffer, e, n);
      }
      if (i === "quaternion") {
        new xt._().fromArray(d).normalize().conjugate().toArray(d);
      }
      const f = a.times.length;
      for (let t = 0; t < f; ++t) {
        const e = t * u + c;
        if (i === "quaternion") {
          xt._.multiplyQuaternionsFlat(a.values, e, d, 0, a.values, e);
        } else {
          const t = u - c * 2;
          for (let n = 0; n < t; ++n) {
            a.values[e + n] -= d[n];
          }
        }
      }
    }
    t.blendMode = R.gSk;
    return t;
  }
};
class bt {
  constructor(t, e, n, r) {
    if (t === undefined) {
      throw new Error("THREE.KeyframeTrack: track name is undefined");
    }
    if (e === undefined || e.length === 0) {
      throw new Error("THREE.KeyframeTrack: no keyframes in track named " + t);
    }
    this.name = t;
    this.times = yt.convertArray(e, this.TimeBufferType);
    this.values = yt.convertArray(n, this.ValueBufferType);
    this.setInterpolation(r || this.DefaultInterpolation);
  }
  static toJSON(t) {
    const e = t.constructor;
    let n;
    if (e.toJSON !== this.toJSON) {
      n = e.toJSON(t);
    } else {
      n = {
        name: t.name,
        times: yt.convertArray(t.times, Array),
        values: yt.convertArray(t.values, Array)
      };
      const e = t.getInterpolation();
      if (e !== t.DefaultInterpolation) {
        n.interpolation = e;
      }
    }
    n.type = t.ValueTypeName;
    return n;
  }
  InterpolantFactoryMethodDiscrete(t) {
    return new _t(this.times, this.values, this.getValueSize(), t);
  }
  InterpolantFactoryMethodLinear(t) {
    return new vt(this.times, this.values, this.getValueSize(), t);
  }
  InterpolantFactoryMethodSmooth(t) {
    return new gt(this.times, this.values, this.getValueSize(), t);
  }
  setInterpolation(t) {
    let e;
    switch (t) {
      case R.Syv:
        e = this.InterpolantFactoryMethodDiscrete;
        break;
      case R.NMF:
        e = this.InterpolantFactoryMethodLinear;
        break;
      case R.pIN:
        e = this.InterpolantFactoryMethodSmooth;
    }
    if (e === undefined) {
      const e = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
      if (this.createInterpolant === undefined) {
        if (t === this.DefaultInterpolation) {
          throw new Error(e);
        }
        this.setInterpolation(this.DefaultInterpolation);
      }
      console.warn("THREE.KeyframeTrack:", e);
      return this;
    }
    this.createInterpolant = e;
    return this;
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return R.Syv;
      case this.InterpolantFactoryMethodLinear:
        return R.NMF;
      case this.InterpolantFactoryMethodSmooth:
        return R.pIN;
    }
  }
  getValueSize() {
    return this.values.length / this.times.length;
  }
  shift(t) {
    if (t !== 0) {
      const e = this.times;
      for (let n = 0, r = e.length; n !== r; ++n) {
        e[n] += t;
      }
    }
    return this;
  }
  scale(t) {
    if (t !== 1) {
      const e = this.times;
      for (let n = 0, r = e.length; n !== r; ++n) {
        e[n] *= t;
      }
    }
    return this;
  }
  trim(t, e) {
    const n = this.times;
    const r = n.length;
    let i = 0;
    let s = r - 1;
    while (i !== r && n[i] < t) {
      ++i;
    }
    while (s !== -1 && n[s] > e) {
      --s;
    }
    ++s;
    if (i !== 0 || s !== r) {
      if (i >= s) {
        s = Math.max(s, 1);
        i = s - 1;
      }
      const t = this.getValueSize();
      this.times = yt.arraySlice(n, i, s);
      this.values = yt.arraySlice(this.values, i * t, s * t);
    }
    return this;
  }
  validate() {
    let t = true;
    const e = this.getValueSize();
    if (e - Math.floor(e) != 0) {
      console.error("THREE.KeyframeTrack: Invalid value size in track.", this);
      t = false;
    }
    const n = this.times;
    const r = this.values;
    const i = n.length;
    if (i === 0) {
      console.error("THREE.KeyframeTrack: Track is empty.", this);
      t = false;
    }
    let s = null;
    for (let e = 0; e !== i; e++) {
      const r = n[e];
      if (typeof r == "number" && isNaN(r)) {
        console.error("THREE.KeyframeTrack: Time is not a valid number.", this, e, r);
        t = false;
        break;
      }
      if (s !== null && s > r) {
        console.error("THREE.KeyframeTrack: Out of order keys.", this, e, r, s);
        t = false;
        break;
      }
      s = r;
    }
    if (r !== undefined && yt.isTypedArray(r)) {
      for (let e = 0, n = r.length; e !== n; ++e) {
        const n = r[e];
        if (isNaN(n)) {
          console.error("THREE.KeyframeTrack: Value is not a valid number.", this, e, n);
          t = false;
          break;
        }
      }
    }
    return t;
  }
  optimize() {
    const t = yt.arraySlice(this.times);
    const e = yt.arraySlice(this.values);
    const n = this.getValueSize();
    const r = this.getInterpolation() === R.pIN;
    const i = t.length - 1;
    let s = 1;
    for (let a = 1; a < i; ++a) {
      let i = false;
      const o = t[a];
      if (o !== t[a + 1] && (a !== 1 || o !== t[0])) {
        if (r) {
          i = true;
        } else {
          const t = a * n;
          const r = t - n;
          const s = t + n;
          for (let a = 0; a !== n; ++a) {
            const n = e[t + a];
            if (n !== e[r + a] || n !== e[s + a]) {
              i = true;
              break;
            }
          }
        }
      }
      if (i) {
        if (a !== s) {
          t[s] = t[a];
          const r = a * n;
          const i = s * n;
          for (let t = 0; t !== n; ++t) {
            e[i + t] = e[r + t];
          }
        }
        ++s;
      }
    }
    if (i > 0) {
      t[s] = t[i];
      for (let t = i * n, r = s * n, a = 0; a !== n; ++a) {
        e[r + a] = e[t + a];
      }
      ++s;
    }
    if (s !== t.length) {
      this.times = yt.arraySlice(t, 0, s);
      this.values = yt.arraySlice(e, 0, s * n);
    } else {
      this.times = t;
      this.values = e;
    }
    return this;
  }
  clone() {
    const t = yt.arraySlice(this.times, 0);
    const e = yt.arraySlice(this.values, 0);
    const n = new (0, this.constructor)(this.name, t, e);
    n.createInterpolant = this.createInterpolant;
    return n;
  }
}
bt.prototype.TimeBufferType = Float32Array;
bt.prototype.ValueBufferType = Float32Array;
bt.prototype.DefaultInterpolation = R.NMF;
class wt extends bt {}
wt.prototype.ValueTypeName = "number";
class Mt extends D {
  constructor(t, e, n, r) {
    super(t, e, n, r);
  }
  interpolate_(t, e, n, r) {
    const i = this.resultBuffer;
    const s = this.sampleValues;
    const a = this.valueSize;
    const o = (n - e) / (r - e);
    let l = t * a;
    for (let t = l + a; l !== t; l += 4) {
      xt._.slerpFlat(i, 0, s, l - a, s, l, o);
    }
    return i;
  }
}
class Tt extends bt {
  InterpolantFactoryMethodLinear(t) {
    return new Mt(this.times, this.values, this.getValueSize(), t);
  }
}
Tt.prototype.ValueTypeName = "quaternion";
Tt.prototype.DefaultInterpolation = R.NMF;
Tt.prototype.InterpolantFactoryMethodSmooth = undefined;
class St extends bt {}
St.prototype.ValueTypeName = "vector";
class Et extends bt {}
Et.prototype.ValueTypeName = "bool";
Et.prototype.ValueBufferType = Array;
Et.prototype.DefaultInterpolation = R.Syv;
Et.prototype.InterpolantFactoryMethodLinear = undefined;
Et.prototype.InterpolantFactoryMethodSmooth = undefined;
class At extends bt {}
At.prototype.ValueTypeName = "color";
class Rt extends bt {}
Rt.prototype.ValueTypeName = "string";
Rt.prototype.ValueBufferType = Array;
Rt.prototype.DefaultInterpolation = R.Syv;
Rt.prototype.InterpolantFactoryMethodLinear = undefined;
Rt.prototype.InterpolantFactoryMethodSmooth = undefined;
class Lt {
  constructor(t, e = -1, n, r = R.IFH) {
    this.name = t;
    this.tracks = n;
    this.duration = e;
    this.blendMode = r;
    this.uuid = S.DO();
    if (this.duration < 0) {
      this.resetDuration();
    }
  }
  static parse(t) {
    const e = [];
    const n = t.tracks;
    const r = 1 / (t.fps || 1);
    for (let t = 0, i = n.length; t !== i; ++t) {
      e.push(Pt(n[t]).scale(r));
    }
    const i = new this(t.name, t.duration, e, t.blendMode);
    i.uuid = t.uuid;
    return i;
  }
  static toJSON(t) {
    const e = [];
    const n = t.tracks;
    const r = {
      name: t.name,
      duration: t.duration,
      tracks: e,
      uuid: t.uuid,
      blendMode: t.blendMode
    };
    for (let t = 0, r = n.length; t !== r; ++t) {
      e.push(bt.toJSON(n[t]));
    }
    return r;
  }
  static CreateFromMorphTargetSequence(t, e, n, r) {
    const i = e.length;
    const s = [];
    for (let t = 0; t < i; t++) {
      let a = [];
      let o = [];
      a.push((t + i - 1) % i, t, (t + 1) % i);
      o.push(0, 1, 0);
      const l = yt.getKeyframeOrder(a);
      a = yt.sortedArray(a, 1, l);
      o = yt.sortedArray(o, 1, l);
      if (!r && a[0] === 0) {
        a.push(i);
        o.push(o[0]);
      }
      s.push(new wt(".morphTargetInfluences[" + e[t].name + "]", a, o).scale(1 / n));
    }
    return new this(t, -1, s);
  }
  static findByName(t, e) {
    let n = t;
    if (!Array.isArray(t)) {
      const e = t;
      n = e.geometry && e.geometry.animations || e.animations;
    }
    for (let t = 0; t < n.length; t++) {
      if (n[t].name === e) {
        return n[t];
      }
    }
    return null;
  }
  static CreateClipsFromMorphTargetSequences(t, e, n) {
    const r = {};
    const i = /^([\w-]*?)([\d]+)$/;
    for (let e = 0, n = t.length; e < n; e++) {
      const n = t[e];
      const s = n.name.match(i);
      if (s && s.length > 1) {
        const t = s[1];
        let e = r[t];
        if (!e) {
          r[t] = e = [];
        }
        e.push(n);
      }
    }
    const s = [];
    for (const t in r) {
      s.push(this.CreateFromMorphTargetSequence(t, r[t], e, n));
    }
    return s;
  }
  static parseAnimation(t, e) {
    if (!t) {
      console.error("THREE.AnimationClip: No animation in JSONLoader data.");
      return null;
    }
    const n = function (t, e, n, r, i) {
      if (n.length !== 0) {
        const s = [];
        const a = [];
        yt.flattenJSON(n, s, a, r);
        if (s.length !== 0) {
          i.push(new t(e, s, a));
        }
      }
    };
    const r = [];
    const i = t.name || "default";
    const s = t.fps || 30;
    const a = t.blendMode;
    let o = t.length || -1;
    const l = t.hierarchy || [];
    for (let t = 0; t < l.length; t++) {
      const i = l[t].keys;
      if (i && i.length !== 0) {
        if (i[0].morphTargets) {
          const t = {};
          let e;
          for (e = 0; e < i.length; e++) {
            if (i[e].morphTargets) {
              for (let n = 0; n < i[e].morphTargets.length; n++) {
                t[i[e].morphTargets[n]] = -1;
              }
            }
          }
          for (const n in t) {
            const t = [];
            const s = [];
            for (let r = 0; r !== i[e].morphTargets.length; ++r) {
              const r = i[e];
              t.push(r.time);
              s.push(r.morphTarget === n ? 1 : 0);
            }
            r.push(new wt(".morphTargetInfluence[" + n + "]", t, s));
          }
          o = t.length * (s || 1);
        } else {
          const s = ".bones[" + e[t].name + "]";
          n(St, s + ".position", i, "pos", r);
          n(Tt, s + ".quaternion", i, "rot", r);
          n(St, s + ".scale", i, "scl", r);
        }
      }
    }
    if (r.length === 0) {
      return null;
    }
    return new this(i, o, r, a);
  }
  resetDuration() {
    let t = 0;
    for (let e = 0, n = this.tracks.length; e !== n; ++e) {
      const n = this.tracks[e];
      t = Math.max(t, n.times[n.times.length - 1]);
    }
    this.duration = t;
    return this;
  }
  trim() {
    for (let t = 0; t < this.tracks.length; t++) {
      this.tracks[t].trim(0, this.duration);
    }
    return this;
  }
  validate() {
    let t = true;
    for (let e = 0; e < this.tracks.length; e++) {
      t = t && this.tracks[e].validate();
    }
    return t;
  }
  optimize() {
    for (let t = 0; t < this.tracks.length; t++) {
      this.tracks[t].optimize();
    }
    return this;
  }
  clone() {
    const t = [];
    for (let e = 0; e < this.tracks.length; e++) {
      t.push(this.tracks[e].clone());
    }
    return new this.constructor(this.name, this.duration, t, this.blendMode);
  }
  toJSON() {
    return this.constructor.toJSON(this);
  }
}
function Pt(t) {
  if (t.type === undefined) {
    throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
  }
  const e = function (t) {
    switch (t.toLowerCase()) {
      case "scalar":
      case "double":
      case "float":
      case "number":
      case "integer":
        return wt;
      case "vector":
      case "vector2":
      case "vector3":
      case "vector4":
        return St;
      case "color":
        return At;
      case "quaternion":
        return Tt;
      case "bool":
      case "boolean":
        return Et;
      case "string":
        return Rt;
    }
    throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + t);
  }(t.type);
  if (t.times === undefined) {
    const e = [];
    const n = [];
    yt.flattenJSON(t.keys, e, n, "value");
    t.times = e;
    t.values = n;
  }
  if (e.parse !== undefined) {
    return e.parse(t);
  } else {
    return new e(t.name, t.times, t.values, t.interpolation);
  }
}
class Ct extends i.T {
  constructor() {
    super();
    this.type = "Bone";
  }
}
Ct.prototype.isBone = true;
var Dt = require("./3993.cjs");
const It = new o.y();
const Nt = new o.y();
class Ft {
  constructor(t = [], e = []) {
    this.uuid = S.DO();
    this.bones = t.slice(0);
    this.boneInverses = e;
    this.boneMatrices = null;
    this.boneTexture = null;
    this.boneTextureSize = 0;
    this.frame = -1;
    this.init();
  }
  init() {
    const t = this.bones;
    const e = this.boneInverses;
    this.boneMatrices = new Float32Array(t.length * 16);
    if (e.length === 0) {
      this.calculateInverses();
    } else if (t.length !== e.length) {
      console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones.");
      this.boneInverses = [];
      for (let t = 0, e = this.bones.length; t < e; t++) {
        this.boneInverses.push(new o.y());
      }
    }
  }
  calculateInverses() {
    this.boneInverses.length = 0;
    for (let t = 0, e = this.bones.length; t < e; t++) {
      const e = new o.y();
      if (this.bones[t]) {
        e.copy(this.bones[t].matrixWorld).invert();
      }
      this.boneInverses.push(e);
    }
  }
  pose() {
    for (let t = 0, e = this.bones.length; t < e; t++) {
      const e = this.bones[t];
      if (e) {
        e.matrixWorld.copy(this.boneInverses[t]).invert();
      }
    }
    for (let t = 0, e = this.bones.length; t < e; t++) {
      const e = this.bones[t];
      if (e) {
        if (e.parent && e.parent.isBone) {
          e.matrix.copy(e.parent.matrixWorld).invert();
          e.matrix.multiply(e.matrixWorld);
        } else {
          e.matrix.copy(e.matrixWorld);
        }
        e.matrix.decompose(e.position, e.quaternion, e.scale);
      }
    }
  }
  update() {
    const t = this.bones;
    const e = this.boneInverses;
    const n = this.boneMatrices;
    const r = this.boneTexture;
    for (let r = 0, i = t.length; r < i; r++) {
      const i = t[r] ? t[r].matrixWorld : Nt;
      It.multiplyMatrices(i, e[r]);
      It.toArray(n, r * 16);
    }
    if (r !== null) {
      r.needsUpdate = true;
    }
  }
  clone() {
    return new Ft(this.bones, this.boneInverses);
  }
  computeBoneTexture() {
    let t = Math.sqrt(this.bones.length * 4);
    t = S.h3(t);
    t = Math.max(t, 4);
    const e = new Float32Array(t * t * 4);
    e.set(this.boneMatrices);
    const n = new Dt.I(e, t, t, R.wk1, R.VzW);
    this.boneMatrices = e;
    this.boneTexture = n;
    this.boneTextureSize = t;
    return this;
  }
  getBoneByName(t) {
    for (let e = 0, n = this.bones.length; e < n; e++) {
      const n = this.bones[e];
      if (n.name === t) {
        return n;
      }
    }
  }
  dispose() {
    if (this.boneTexture !== null) {
      this.boneTexture.dispose();
      this.boneTexture = null;
    }
  }
  fromJSON(t, e) {
    this.uuid = t.uuid;
    for (let n = 0, r = t.bones.length; n < r; n++) {
      const r = t.bones[n];
      let i = e[r];
      if (i === undefined) {
        console.warn("THREE.Skeleton: No bone found with UUID:", r);
        i = new Ct();
      }
      this.bones.push(i);
      this.boneInverses.push(new o.y().fromArray(t.boneInverses[n]));
    }
    this.init();
    return this;
  }
  toJSON() {
    const t = {
      metadata: {
        version: 4.5,
        type: "Skeleton",
        generator: "Skeleton.toJSON"
      },
      bones: [],
      boneInverses: []
    };
    t.uuid = this.uuid;
    const e = this.bones;
    const n = this.boneInverses;
    for (let r = 0, i = e.length; r < i; r++) {
      const i = e[r];
      t.bones.push(i.uuid);
      const s = n[r];
      t.boneInverses.push(s.toArray());
    }
    return t;
  }
}
var Ot = require("./5092.cjs");
var Ut = require("./6173.cjs");
var Bt = require("./3278.cjs");
var zt = require("./3977.cjs");
var kt = require("./5785.cjs");
var Gt = require("./5920.cjs");
var Ht = require("./2010.cjs");
var Vt = require("./1898.cjs");
class Wt extends N.a {
  constructor(t) {
    super(t);
    this.dracoLoader = null;
    this.ktx2Loader = null;
    this.meshoptDecoder = null;
    this.pluginCallbacks = [];
    this.register(function (t) {
      return new Zt(t);
    });
    this.register(function (t) {
      return new te(t);
    });
    this.register(function (t) {
      return new ee(t);
    });
    this.register(function (t) {
      return new Kt(t);
    });
    this.register(function (t) {
      return new Jt(t);
    });
    this.register(function (t) {
      return new Qt(t);
    });
    this.register(function (t) {
      return new $t(t);
    });
    this.register(function (t) {
      return new qt(t);
    });
    this.register(function (t) {
      return new ne(t);
    });
  }
  load(t, e, n, i) {
    const s = this;
    let a;
    a = this.resourcePath !== "" ? this.resourcePath : this.path !== "" ? this.path : r.extractUrlBase(t);
    this.manager.itemStart(t);
    const o = function (e) {
      if (i) {
        i(e);
      } else {
        console.error(e);
      }
      s.manager.itemError(t);
      s.manager.itemEnd(t);
    };
    const l = new Ot.h(this.manager);
    l.setPath(this.path);
    l.setResponseType("arraybuffer");
    l.setRequestHeader(this.requestHeader);
    l.setWithCredentials(this.withCredentials);
    l.load(t, function (n) {
      try {
        s.parse(n, a, function (n) {
          e(n);
          s.manager.itemEnd(t);
        }, o);
      } catch (t) {
        o(t);
      }
    }, n, o);
  }
  setDRACOLoader(t) {
    this.dracoLoader = t;
    return this;
  }
  setDDSLoader() {
    throw new Error("THREE.GLTFLoader: \"MSFT_texture_dds\" no longer supported. Please update to \"KHR_texture_basisu\".");
  }
  setKTX2Loader(t) {
    this.ktx2Loader = t;
    return this;
  }
  setMeshoptDecoder(t) {
    this.meshoptDecoder = t;
    return this;
  }
  register(t) {
    if (this.pluginCallbacks.indexOf(t) === -1) {
      this.pluginCallbacks.push(t);
    }
    return this;
  }
  unregister(t) {
    if (this.pluginCallbacks.indexOf(t) !== -1) {
      this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t), 1);
    }
    return this;
  }
  parse(t, e, n, i) {
    let s;
    const a = {};
    const o = {};
    if (typeof t == "string") {
      s = t;
    } else if (r.decodeText(new Uint8Array(t, 0, 4)) === re) {
      try {
        a[jt.KHR_BINARY_GLTF] = new ae(t);
      } catch (t) {
        if (i) {
          i(t);
        }
        return;
      }
      s = a[jt.KHR_BINARY_GLTF].content;
    } else {
      s = r.decodeText(new Uint8Array(t));
    }
    const l = JSON.parse(s);
    if (l.asset === undefined || l.asset.version[0] < 2) {
      if (i) {
        i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      }
      return;
    }
    const c = new ze(l, {
      path: e || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    c.fileLoader.setRequestHeader(this.requestHeader);
    for (let t = 0; t < this.pluginCallbacks.length; t++) {
      const e = this.pluginCallbacks[t](c);
      o[e.name] = e;
      a[e.name] = true;
    }
    if (l.extensionsUsed) {
      for (let t = 0; t < l.extensionsUsed.length; ++t) {
        const e = l.extensionsUsed[t];
        const n = l.extensionsRequired || [];
        switch (e) {
          case jt.KHR_MATERIALS_UNLIT:
            a[e] = new Yt();
            break;
          case jt.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
            a[e] = new ue();
            break;
          case jt.KHR_DRACO_MESH_COMPRESSION:
            a[e] = new oe(l, this.dracoLoader);
            break;
          case jt.KHR_TEXTURE_TRANSFORM:
            a[e] = new le();
            break;
          case jt.KHR_MESH_QUANTIZATION:
            a[e] = new he();
            break;
          default:
            if (n.indexOf(e) >= 0 && o[e] === undefined) {
              console.warn("THREE.GLTFLoader: Unknown extension \"" + e + "\".");
            }
        }
      }
    }
    c.setExtensions(a);
    c.setPlugins(o);
    c.parse(n, i);
  }
}
function Xt() {
  let t = {};
  return {
    get: function (e) {
      return t[e];
    },
    add: function (e, n) {
      t[e] = n;
    },
    remove: function (e) {
      delete t[e];
    },
    removeAll: function () {
      t = {};
    }
  };
}
const jt = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: "KHR_materials_pbrSpecularGlossiness",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression"
};
class qt {
  constructor(t) {
    this.parser = t;
    this.name = jt.KHR_LIGHTS_PUNCTUAL;
    this.cache = {
      refs: {},
      uses: {}
    };
  }
  _markDefs() {
    const t = this.parser;
    const e = this.parser.json.nodes || [];
    for (let n = 0, r = e.length; n < r; n++) {
      const r = e[n];
      if (r.extensions && r.extensions[this.name] && r.extensions[this.name].light !== undefined) {
        t._addNodeRef(this.cache, r.extensions[this.name].light);
      }
    }
  }
  _loadLight(t) {
    const e = this.parser;
    const n = "light:" + t;
    let r = e.cache.get(n);
    if (r) {
      return r;
    }
    const i = e.json;
    const a = ((i.extensions && i.extensions[this.name] || {}).lights || [])[t];
    let o;
    const l = new s.I(16777215);
    if (a.color !== undefined) {
      l.fromArray(a.color);
    }
    const c = a.range !== undefined ? a.range : 0;
    switch (a.type) {
      case "directional":
        o = new _(l);
        o.target.position.set(0, 0, -1);
        o.add(o.target);
        break;
      case "point":
        o = new T(l);
        o.distance = c;
        break;
      case "spot":
        o = new A(l);
        o.distance = c;
        a.spot = a.spot || {};
        a.spot.innerConeAngle = a.spot.innerConeAngle !== undefined ? a.spot.innerConeAngle : 0;
        a.spot.outerConeAngle = a.spot.outerConeAngle !== undefined ? a.spot.outerConeAngle : Math.PI / 4;
        o.angle = a.spot.outerConeAngle;
        o.penumbra = 1 - a.spot.innerConeAngle / a.spot.outerConeAngle;
        o.target.position.set(0, 0, -1);
        o.add(o.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + a.type);
    }
    o.position.set(0, 0, 0);
    o.decay = 2;
    if (a.intensity !== undefined) {
      o.intensity = a.intensity;
    }
    o.name = e.createUniqueName(a.name || "light_" + t);
    r = Promise.resolve(o);
    e.cache.add(n, r);
    return r;
  }
  createNodeAttachment(t) {
    const e = this;
    const n = this.parser;
    const r = n.json.nodes[t];
    const i = (r.extensions && r.extensions[this.name] || {}).light;
    if (i === undefined) {
      return null;
    } else {
      return this._loadLight(i).then(function (t) {
        return n._getNodeRef(e.cache, i, t);
      });
    }
  }
}
class Yt {
  constructor() {
    this.name = jt.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return Ut.v;
  }
  extendParams(t, e, n) {
    const r = [];
    t.color = new s.I(1, 1, 1);
    t.opacity = 1;
    const i = e.pbrMetallicRoughness;
    if (i) {
      if (Array.isArray(i.baseColorFactor)) {
        const e = i.baseColorFactor;
        t.color.fromArray(e);
        t.opacity = e[3];
      }
      if (i.baseColorTexture !== undefined) {
        r.push(n.assignTexture(t, "map", i.baseColorTexture));
      }
    }
    return Promise.all(r);
  }
}
class Zt {
  constructor(t) {
    this.parser = t;
    this.name = jt.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(t) {
    const e = this.parser.json.materials[t];
    if (e.extensions && e.extensions[this.name]) {
      return C;
    } else {
      return null;
    }
  }
  extendMaterialParams(t, e) {
    const n = this.parser;
    const r = n.json.materials[t];
    if (!r.extensions || !r.extensions[this.name]) {
      return Promise.resolve();
    }
    const i = [];
    const s = r.extensions[this.name];
    if (s.clearcoatFactor !== undefined) {
      e.clearcoat = s.clearcoatFactor;
    }
    if (s.clearcoatTexture !== undefined) {
      i.push(n.assignTexture(e, "clearcoatMap", s.clearcoatTexture));
    }
    if (s.clearcoatRoughnessFactor !== undefined) {
      e.clearcoatRoughness = s.clearcoatRoughnessFactor;
    }
    if (s.clearcoatRoughnessTexture !== undefined) {
      i.push(n.assignTexture(e, "clearcoatRoughnessMap", s.clearcoatRoughnessTexture));
    }
    if (s.clearcoatNormalTexture !== undefined && (i.push(n.assignTexture(e, "clearcoatNormalMap", s.clearcoatNormalTexture)), s.clearcoatNormalTexture.scale !== undefined)) {
      const t = s.clearcoatNormalTexture.scale;
      e.clearcoatNormalScale = new l.F(t, -t);
    }
    return Promise.all(i);
  }
}
class Kt {
  constructor(t) {
    this.parser = t;
    this.name = jt.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(t) {
    const e = this.parser.json.materials[t];
    if (e.extensions && e.extensions[this.name]) {
      return C;
    } else {
      return null;
    }
  }
  extendMaterialParams(t, e) {
    const n = this.parser;
    const r = n.json.materials[t];
    if (!r.extensions || !r.extensions[this.name]) {
      return Promise.resolve();
    }
    const i = [];
    const s = r.extensions[this.name];
    if (s.transmissionFactor !== undefined) {
      e.transmission = s.transmissionFactor;
    }
    if (s.transmissionTexture !== undefined) {
      i.push(n.assignTexture(e, "transmissionMap", s.transmissionTexture));
    }
    return Promise.all(i);
  }
}
class Jt {
  constructor(t) {
    this.parser = t;
    this.name = jt.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(t) {
    const e = this.parser.json.materials[t];
    if (e.extensions && e.extensions[this.name]) {
      return C;
    } else {
      return null;
    }
  }
  extendMaterialParams(t, e) {
    const n = this.parser;
    const r = n.json.materials[t];
    if (!r.extensions || !r.extensions[this.name]) {
      return Promise.resolve();
    }
    const i = [];
    const a = r.extensions[this.name];
    e.thickness = a.thicknessFactor !== undefined ? a.thicknessFactor : 0;
    if (a.thicknessTexture !== undefined) {
      i.push(n.assignTexture(e, "thicknessMap", a.thicknessTexture));
    }
    e.attenuationDistance = a.attenuationDistance || 0;
    const o = a.attenuationColor || [1, 1, 1];
    e.attenuationTint = new s.I(o[0], o[1], o[2]);
    return Promise.all(i);
  }
}
class Qt {
  constructor(t) {
    this.parser = t;
    this.name = jt.KHR_MATERIALS_IOR;
  }
  getMaterialType(t) {
    const e = this.parser.json.materials[t];
    if (e.extensions && e.extensions[this.name]) {
      return C;
    } else {
      return null;
    }
  }
  extendMaterialParams(t, e) {
    const n = this.parser.json.materials[t];
    if (!n.extensions || !n.extensions[this.name]) {
      return Promise.resolve();
    }
    const r = n.extensions[this.name];
    e.ior = r.ior !== undefined ? r.ior : 1.5;
    return Promise.resolve();
  }
}
class $t {
  constructor(t) {
    this.parser = t;
    this.name = jt.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(t) {
    const e = this.parser.json.materials[t];
    if (e.extensions && e.extensions[this.name]) {
      return C;
    } else {
      return null;
    }
  }
  extendMaterialParams(t, e) {
    const n = this.parser;
    const r = n.json.materials[t];
    if (!r.extensions || !r.extensions[this.name]) {
      return Promise.resolve();
    }
    const i = [];
    const a = r.extensions[this.name];
    e.specularIntensity = a.specularFactor !== undefined ? a.specularFactor : 1;
    if (a.specularTexture !== undefined) {
      i.push(n.assignTexture(e, "specularIntensityMap", a.specularTexture));
    }
    const o = a.specularColorFactor || [1, 1, 1];
    e.specularTint = new s.I(o[0], o[1], o[2]);
    if (a.specularColorTexture !== undefined) {
      i.push(n.assignTexture(e, "specularTintMap", a.specularColorTexture).then(function (t) {
        t.encoding = R.knz;
      }));
    }
    return Promise.all(i);
  }
}
class te {
  constructor(t) {
    this.parser = t;
    this.name = jt.KHR_TEXTURE_BASISU;
  }
  loadTexture(t) {
    const e = this.parser;
    const n = e.json;
    const r = n.textures[t];
    if (!r.extensions || !r.extensions[this.name]) {
      return null;
    }
    const i = r.extensions[this.name];
    const s = n.images[i.source];
    const a = e.options.ktx2Loader;
    if (!a) {
      if (n.extensionsRequired && n.extensionsRequired.indexOf(this.name) >= 0) {
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      }
      return null;
    }
    return e.loadTextureImage(t, s, a);
  }
}
class ee {
  constructor(t) {
    this.parser = t;
    this.name = jt.EXT_TEXTURE_WEBP;
    this.isSupported = null;
  }
  loadTexture(t) {
    const e = this.name;
    const n = this.parser;
    const r = n.json;
    const i = r.textures[t];
    if (!i.extensions || !i.extensions[e]) {
      return null;
    }
    const s = i.extensions[e];
    const a = r.images[s.source];
    let o = n.textureLoader;
    if (a.uri) {
      const t = n.options.manager.getHandler(a.uri);
      if (t !== null) {
        o = t;
      }
    }
    return this.detectSupport().then(function (i) {
      if (i) {
        return n.loadTextureImage(t, a, o);
      }
      if (r.extensionsRequired && r.extensionsRequired.indexOf(e) >= 0) {
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      }
      return n.loadTexture(t);
    });
  }
  detectSupport() {
    this.isSupported ||= new Promise(function (t) {
      const e = new Image();
      e.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
      e.onload = e.onerror = function () {
        t(e.height === 1);
      };
    });
    return this.isSupported;
  }
}
class ne {
  constructor(t) {
    this.name = jt.EXT_MESHOPT_COMPRESSION;
    this.parser = t;
  }
  loadBufferView(t) {
    const e = this.parser.json;
    const n = e.bufferViews[t];
    if (n.extensions && n.extensions[this.name]) {
      const t = n.extensions[this.name];
      const r = this.parser.getDependency("buffer", t.buffer);
      const i = this.parser.options.meshoptDecoder;
      if (!i || !i.supported) {
        if (e.extensionsRequired && e.extensionsRequired.indexOf(this.name) >= 0) {
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        }
        return null;
      }
      return Promise.all([r, i.ready]).then(function (e) {
        const n = t.byteOffset || 0;
        const r = t.byteLength || 0;
        const s = t.count;
        const a = t.byteStride;
        const o = new ArrayBuffer(s * a);
        const l = new Uint8Array(e[0], n, r);
        i.decodeGltfBuffer(new Uint8Array(o), s, a, l, t.mode, t.filter);
        return o;
      });
    }
    return null;
  }
}
const re = "glTF";
const ie = 1313821514;
const se = 5130562;
class ae {
  constructor(t) {
    this.name = jt.KHR_BINARY_GLTF;
    this.content = null;
    this.body = null;
    const e = new DataView(t, 0, 12);
    this.header = {
      magic: r.decodeText(new Uint8Array(t.slice(0, 4))),
      version: e.getUint32(4, true),
      length: e.getUint32(8, true)
    };
    if (this.header.magic !== re) {
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    }
    if (this.header.version < 2) {
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    }
    const n = this.header.length - 12;
    const i = new DataView(t, 12);
    let s = 0;
    while (s < n) {
      const e = i.getUint32(s, true);
      s += 4;
      const n = i.getUint32(s, true);
      s += 4;
      if (n === ie) {
        const n = new Uint8Array(t, 12 + s, e);
        this.content = r.decodeText(n);
      } else if (n === se) {
        const n = 12 + s;
        this.body = t.slice(n, n + e);
      }
      s += e;
    }
    if (this.content === null) {
      throw new Error("THREE.GLTFLoader: JSON content not found.");
    }
  }
}
class oe {
  constructor(t, e) {
    if (!e) {
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    }
    this.name = jt.KHR_DRACO_MESH_COMPRESSION;
    this.json = t;
    this.dracoLoader = e;
    this.dracoLoader.preload();
  }
  decodePrimitive(t, e) {
    const n = this.json;
    const r = this.dracoLoader;
    const i = t.extensions[this.name].bufferView;
    const s = t.extensions[this.name].attributes;
    const a = {};
    const o = {};
    const l = {};
    for (const t in s) {
      const e = Ee[t] || t.toLowerCase();
      a[e] = s[t];
    }
    for (const e in t.attributes) {
      const r = Ee[e] || e.toLowerCase();
      if (s[e] !== undefined) {
        const i = n.accessors[t.attributes[e]];
        const s = we[i.componentType];
        l[r] = s;
        o[r] = i.normalized === true;
      }
    }
    return e.getDependency("bufferView", i).then(function (t) {
      return new Promise(function (e) {
        r.decodeDracoFile(t, function (t) {
          for (const e in t.attributes) {
            const n = t.attributes[e];
            const r = o[e];
            if (r !== undefined) {
              n.normalized = r;
            }
          }
          e(t);
        }, a, l);
      });
    });
  }
}
class le {
  constructor() {
    this.name = jt.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(t, e) {
    if (e.texCoord !== undefined) {
      console.warn("THREE.GLTFLoader: Custom UV sets in \"" + this.name + "\" extension not yet supported.");
    }
    if (e.offset !== undefined || e.rotation !== undefined || e.scale !== undefined) {
      t = t.clone();
      if (e.offset !== undefined) {
        t.offset.fromArray(e.offset);
      }
      if (e.rotation !== undefined) {
        t.rotation = e.rotation;
      }
      if (e.scale !== undefined) {
        t.repeat.fromArray(e.scale);
      }
      t.needsUpdate = true;
    }
    return t;
  }
}
class ce extends P {
  constructor(t) {
    super();
    this.isGLTFSpecularGlossinessMaterial = true;
    const e = ["#ifdef USE_SPECULARMAP", "\tuniform sampler2D specularMap;", "#endif"].join("\n");
    const n = ["#ifdef USE_GLOSSINESSMAP", "\tuniform sampler2D glossinessMap;", "#endif"].join("\n");
    const r = ["vec3 specularFactor = specular;", "#ifdef USE_SPECULARMAP", "\tvec4 texelSpecular = texture2D( specularMap, vUv );", "\ttexelSpecular = sRGBToLinear( texelSpecular );", "\t// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture", "\tspecularFactor *= texelSpecular.rgb;", "#endif"].join("\n");
    const i = ["float glossinessFactor = glossiness;", "#ifdef USE_GLOSSINESSMAP", "\tvec4 texelGlossiness = texture2D( glossinessMap, vUv );", "\t// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture", "\tglossinessFactor *= texelGlossiness.a;", "#endif"].join("\n");
    const a = ["PhysicalMaterial material;", "material.diffuseColor = diffuseColor.rgb * ( 1. - max( specularFactor.r, max( specularFactor.g, specularFactor.b ) ) );", "vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );", "float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );", "material.roughness = max( 1.0 - glossinessFactor, 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.", "material.roughness += geometryRoughness;", "material.roughness = min( material.roughness, 1.0 );", "material.specularColor = specularFactor;"].join("\n");
    const o = {
      specular: {
        value: new s.I().setHex(16777215)
      },
      glossiness: {
        value: 1
      },
      specularMap: {
        value: null
      },
      glossinessMap: {
        value: null
      }
    };
    this._extraUniforms = o;
    this.onBeforeCompile = function (t) {
      for (const e in o) {
        t.uniforms[e] = o[e];
      }
      t.fragmentShader = t.fragmentShader.replace("uniform float roughness;", "uniform vec3 specular;").replace("uniform float metalness;", "uniform float glossiness;").replace("#include <roughnessmap_pars_fragment>", e).replace("#include <metalnessmap_pars_fragment>", n).replace("#include <roughnessmap_fragment>", r).replace("#include <metalnessmap_fragment>", i).replace("#include <lights_physical_fragment>", a);
    };
    Object.defineProperties(this, {
      specular: {
        get: function () {
          return o.specular.value;
        },
        set: function (t) {
          o.specular.value = t;
        }
      },
      specularMap: {
        get: function () {
          return o.specularMap.value;
        },
        set: function (t) {
          o.specularMap.value = t;
          if (t) {
            this.defines.USE_SPECULARMAP = "";
          } else {
            delete this.defines.USE_SPECULARMAP;
          }
        }
      },
      glossiness: {
        get: function () {
          return o.glossiness.value;
        },
        set: function (t) {
          o.glossiness.value = t;
        }
      },
      glossinessMap: {
        get: function () {
          return o.glossinessMap.value;
        },
        set: function (t) {
          o.glossinessMap.value = t;
          if (t) {
            this.defines.USE_GLOSSINESSMAP = "";
            this.defines.USE_UV = "";
          } else {
            delete this.defines.USE_GLOSSINESSMAP;
            delete this.defines.USE_UV;
          }
        }
      }
    });
    delete this.metalness;
    delete this.roughness;
    delete this.metalnessMap;
    delete this.roughnessMap;
    this.setValues(t);
  }
  copy(t) {
    super.copy(t);
    this.specularMap = t.specularMap;
    this.specular.copy(t.specular);
    this.glossinessMap = t.glossinessMap;
    this.glossiness = t.glossiness;
    delete this.metalness;
    delete this.roughness;
    delete this.metalnessMap;
    delete this.roughnessMap;
    return this;
  }
}
class ue {
  constructor() {
    this.name = jt.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS;
    this.specularGlossinessParams = ["color", "map", "lightMap", "lightMapIntensity", "aoMap", "aoMapIntensity", "emissive", "emissiveIntensity", "emissiveMap", "bumpMap", "bumpScale", "normalMap", "normalMapType", "displacementMap", "displacementScale", "displacementBias", "specularMap", "specular", "glossinessMap", "glossiness", "alphaMap", "envMap", "envMapIntensity", "refractionRatio"];
  }
  getMaterialType() {
    return ce;
  }
  extendParams(t, e, n) {
    const r = e.extensions[this.name];
    t.color = new s.I(1, 1, 1);
    t.opacity = 1;
    const i = [];
    if (Array.isArray(r.diffuseFactor)) {
      const e = r.diffuseFactor;
      t.color.fromArray(e);
      t.opacity = e[3];
    }
    if (r.diffuseTexture !== undefined) {
      i.push(n.assignTexture(t, "map", r.diffuseTexture));
    }
    t.emissive = new s.I(0, 0, 0);
    t.glossiness = r.glossinessFactor !== undefined ? r.glossinessFactor : 1;
    t.specular = new s.I(1, 1, 1);
    if (Array.isArray(r.specularFactor)) {
      t.specular.fromArray(r.specularFactor);
    }
    if (r.specularGlossinessTexture !== undefined) {
      const e = r.specularGlossinessTexture;
      i.push(n.assignTexture(t, "glossinessMap", e));
      i.push(n.assignTexture(t, "specularMap", e));
    }
    return Promise.all(i);
  }
  createMaterial(t) {
    const e = new ce(t);
    e.fog = true;
    e.color = t.color;
    e.map = t.map === undefined ? null : t.map;
    e.lightMap = null;
    e.lightMapIntensity = 1;
    e.aoMap = t.aoMap === undefined ? null : t.aoMap;
    e.aoMapIntensity = 1;
    e.emissive = t.emissive;
    e.emissiveIntensity = 1;
    e.emissiveMap = t.emissiveMap === undefined ? null : t.emissiveMap;
    e.bumpMap = t.bumpMap === undefined ? null : t.bumpMap;
    e.bumpScale = 1;
    e.normalMap = t.normalMap === undefined ? null : t.normalMap;
    e.normalMapType = R.IOt;
    if (t.normalScale) {
      e.normalScale = t.normalScale;
    }
    e.displacementMap = null;
    e.displacementScale = 1;
    e.displacementBias = 0;
    e.specularMap = t.specularMap === undefined ? null : t.specularMap;
    e.specular = t.specular;
    e.glossinessMap = t.glossinessMap === undefined ? null : t.glossinessMap;
    e.glossiness = t.glossiness;
    e.alphaMap = null;
    e.envMap = t.envMap === undefined ? null : t.envMap;
    e.envMapIntensity = 1;
    e.refractionRatio = 0.98;
    return e;
  }
}
class he {
  constructor() {
    this.name = jt.KHR_MESH_QUANTIZATION;
  }
}
class de extends D {
  constructor(t, e, n, r) {
    super(t, e, n, r);
  }
  copySampleValue_(t) {
    const e = this.resultBuffer;
    const n = this.sampleValues;
    const r = this.valueSize;
    const i = t * r * 3 + r;
    for (let t = 0; t !== r; t++) {
      e[t] = n[i + t];
    }
    return e;
  }
}
de.prototype.beforeStart_ = de.prototype.copySampleValue_;
de.prototype.afterEnd_ = de.prototype.copySampleValue_;
de.prototype.interpolate_ = function (t, e, n, r) {
  const i = this.resultBuffer;
  const s = this.sampleValues;
  const a = this.valueSize;
  const o = a * 2;
  const l = a * 3;
  const c = r - e;
  const u = (n - e) / c;
  const h = u * u;
  const d = h * u;
  const f = t * l;
  const p = f - l;
  const m = d * -2 + h * 3;
  const g = d - h;
  const v = 1 - m;
  const _ = g - h + u;
  for (let t = 0; t !== a; t++) {
    const e = s[p + t + a];
    const n = s[p + t + o] * c;
    const r = s[f + t + a];
    const l = s[f + t] * c;
    i[t] = v * e + _ * n + m * r + g * l;
  }
  return i;
};
const fe = new xt._();
class pe extends de {
  interpolate_(t, e, n, r) {
    const i = super.interpolate_(t, e, n, r);
    fe.fromArray(i).normalize().toArray(i);
    return i;
  }
}
const me = 0;
const ge = 1;
const ve = 2;
const _e = 3;
const xe = 4;
const ye = 5;
const be = 6;
const we = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
const Me = {
  9728: R.TyD,
  9729: R.wem,
  9984: R.YLQ,
  9985: R.qyh,
  9986: R.aH4,
  9987: R.D1R
};
const Te = {
  33071: R.uWy,
  33648: R.OoA,
  10497: R.rpg
};
const Se = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
const Ee = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv2",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
};
const Ae = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
};
const Re = {
  CUBICSPLINE: undefined,
  LINEAR: R.NMF,
  STEP: R.Syv
};
const Le = "OPAQUE";
const Pe = "MASK";
const Ce = "BLEND";
function De(t, e) {
  if (typeof t != "string" || t === "") {
    return "";
  } else {
    if (/^https?:\/\//i.test(e) && /^\//.test(t)) {
      e = e.replace(/(^https?:\/\/[^\/]+).*/i, "$1");
    }
    if (/^(https?:)?\/\//i.test(t) || /^data:.*,.*$/i.test(t) || /^blob:.*$/i.test(t)) {
      return t;
    } else {
      return e + t;
    }
  }
}
function Ie(t, e, n) {
  for (const r in n.extensions) {
    if (t[r] === undefined) {
      e.userData.gltfExtensions = e.userData.gltfExtensions || {};
      e.userData.gltfExtensions[r] = n.extensions[r];
    }
  }
}
function Ne(t, e) {
  if (e.extras !== undefined) {
    if (typeof e.extras == "object") {
      Object.assign(t.userData, e.extras);
    } else {
      console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras);
    }
  }
}
function Fe(t, e) {
  t.updateMorphTargets();
  if (e.weights !== undefined) {
    for (let n = 0, r = e.weights.length; n < r; n++) {
      t.morphTargetInfluences[n] = e.weights[n];
    }
  }
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const n = e.extras.targetNames;
    if (t.morphTargetInfluences.length === n.length) {
      t.morphTargetDictionary = {};
      for (let e = 0, r = n.length; e < r; e++) {
        t.morphTargetDictionary[n[e]] = e;
      }
    } else {
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
    }
  }
}
function Oe(t) {
  const e = t.extensions && t.extensions[jt.KHR_DRACO_MESH_COMPRESSION];
  let n;
  n = e ? "draco:" + e.bufferView + ":" + e.indices + ":" + Ue(e.attributes) : t.indices + ":" + Ue(t.attributes) + ":" + t.mode;
  return n;
}
function Ue(t) {
  let e = "";
  const n = Object.keys(t).sort();
  for (let r = 0, i = n.length; r < i; r++) {
    e += n[r] + ":" + t[n[r]] + ";";
  }
  return e;
}
function Be(t) {
  switch (t) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
class ze {
  constructor(t = {}, e = {}) {
    this.json = t;
    this.extensions = {};
    this.plugins = {};
    this.options = e;
    this.cache = new Xt();
    this.associations = new Map();
    this.primitiveCache = {};
    this.meshCache = {
      refs: {},
      uses: {}
    };
    this.cameraCache = {
      refs: {},
      uses: {}
    };
    this.lightCache = {
      refs: {},
      uses: {}
    };
    this.textureCache = {};
    this.nodeNamesUsed = {};
    if (typeof createImageBitmap != "undefined" && /Firefox/.test(navigator.userAgent) === false) {
      this.textureLoader = new F(this.options.manager);
    } else {
      this.textureLoader = new Bt.d(this.options.manager);
    }
    this.textureLoader.setCrossOrigin(this.options.crossOrigin);
    this.textureLoader.setRequestHeader(this.options.requestHeader);
    this.fileLoader = new Ot.h(this.options.manager);
    this.fileLoader.setResponseType("arraybuffer");
    if (this.options.crossOrigin === "use-credentials") {
      this.fileLoader.setWithCredentials(true);
    }
  }
  setExtensions(t) {
    this.extensions = t;
  }
  setPlugins(t) {
    this.plugins = t;
  }
  parse(t, e) {
    const n = this;
    const r = this.json;
    const i = this.extensions;
    this.cache.removeAll();
    this._invokeAll(function (t) {
      return t._markDefs && t._markDefs();
    });
    Promise.all(this._invokeAll(function (t) {
      return t.beforeRoot && t.beforeRoot();
    })).then(function () {
      return Promise.all([n.getDependencies("scene"), n.getDependencies("animation"), n.getDependencies("camera")]);
    }).then(function (e) {
      const s = {
        scene: e[0][r.scene || 0],
        scenes: e[0],
        animations: e[1],
        cameras: e[2],
        asset: r.asset,
        parser: n,
        userData: {}
      };
      Ie(i, s, r);
      Ne(s, r);
      Promise.all(n._invokeAll(function (t) {
        return t.afterRoot && t.afterRoot(s);
      })).then(function () {
        t(s);
      });
    }).catch(e);
  }
  _markDefs() {
    const t = this.json.nodes || [];
    const e = this.json.skins || [];
    const n = this.json.meshes || [];
    for (let n = 0, r = e.length; n < r; n++) {
      const r = e[n].joints;
      for (let e = 0, n = r.length; e < n; e++) {
        t[r[e]].isBone = true;
      }
    }
    for (let e = 0, r = t.length; e < r; e++) {
      const r = t[e];
      if (r.mesh !== undefined) {
        this._addNodeRef(this.meshCache, r.mesh);
        if (r.skin !== undefined) {
          n[r.mesh].isSkinnedMesh = true;
        }
      }
      if (r.camera !== undefined) {
        this._addNodeRef(this.cameraCache, r.camera);
      }
    }
  }
  _addNodeRef(t, e) {
    if (e !== undefined) {
      if (t.refs[e] === undefined) {
        t.refs[e] = t.uses[e] = 0;
      }
      t.refs[e]++;
    }
  }
  _getNodeRef(t, e, n) {
    if (t.refs[e] <= 1) {
      return n;
    }
    const r = n.clone();
    r.name += "_instance_" + t.uses[e]++;
    return r;
  }
  _invokeOne(t) {
    const e = Object.values(this.plugins);
    e.push(this);
    for (let n = 0; n < e.length; n++) {
      const r = t(e[n]);
      if (r) {
        return r;
      }
    }
    return null;
  }
  _invokeAll(t) {
    const e = Object.values(this.plugins);
    e.unshift(this);
    const n = [];
    for (let r = 0; r < e.length; r++) {
      const i = t(e[r]);
      if (i) {
        n.push(i);
      }
    }
    return n;
  }
  getDependency(t, e) {
    const n = t + ":" + e;
    let r = this.cache.get(n);
    if (!r) {
      switch (t) {
        case "scene":
          r = this.loadScene(e);
          break;
        case "node":
          r = this.loadNode(e);
          break;
        case "mesh":
          r = this._invokeOne(function (t) {
            return t.loadMesh && t.loadMesh(e);
          });
          break;
        case "accessor":
          r = this.loadAccessor(e);
          break;
        case "bufferView":
          r = this._invokeOne(function (t) {
            return t.loadBufferView && t.loadBufferView(e);
          });
          break;
        case "buffer":
          r = this.loadBuffer(e);
          break;
        case "material":
          r = this._invokeOne(function (t) {
            return t.loadMaterial && t.loadMaterial(e);
          });
          break;
        case "texture":
          r = this._invokeOne(function (t) {
            return t.loadTexture && t.loadTexture(e);
          });
          break;
        case "skin":
          r = this.loadSkin(e);
          break;
        case "animation":
          r = this.loadAnimation(e);
          break;
        case "camera":
          r = this.loadCamera(e);
          break;
        default:
          throw new Error("Unknown type: " + t);
      }
      this.cache.add(n, r);
    }
    return r;
  }
  getDependencies(t) {
    let e = this.cache.get(t);
    if (!e) {
      const n = this;
      const r = this.json[t + (t === "mesh" ? "es" : "s")] || [];
      e = Promise.all(r.map(function (e, r) {
        return n.getDependency(t, r);
      }));
      this.cache.add(t, e);
    }
    return e;
  }
  loadBuffer(t) {
    const e = this.json.buffers[t];
    const n = this.fileLoader;
    if (e.type && e.type !== "arraybuffer") {
      throw new Error("THREE.GLTFLoader: " + e.type + " buffer type is not supported.");
    }
    if (e.uri === undefined && t === 0) {
      return Promise.resolve(this.extensions[jt.KHR_BINARY_GLTF].body);
    }
    const r = this.options;
    return new Promise(function (t, i) {
      n.load(De(e.uri, r.path), t, undefined, function () {
        i(new Error("THREE.GLTFLoader: Failed to load buffer \"" + e.uri + "\"."));
      });
    });
  }
  loadBufferView(t) {
    const e = this.json.bufferViews[t];
    return this.getDependency("buffer", e.buffer).then(function (t) {
      const n = e.byteLength || 0;
      const r = e.byteOffset || 0;
      return t.slice(r, r + n);
    });
  }
  loadAccessor(t) {
    const e = this;
    const n = this.json;
    const r = this.json.accessors[t];
    if (r.bufferView === undefined && r.sparse === undefined) {
      return Promise.resolve(null);
    }
    const i = [];
    if (r.bufferView !== undefined) {
      i.push(this.getDependency("bufferView", r.bufferView));
    } else {
      i.push(null);
    }
    if (r.sparse !== undefined) {
      i.push(this.getDependency("bufferView", r.sparse.indices.bufferView));
      i.push(this.getDependency("bufferView", r.sparse.values.bufferView));
    }
    return Promise.all(i).then(function (t) {
      const i = t[0];
      const s = Se[r.type];
      const a = we[r.componentType];
      const o = a.BYTES_PER_ELEMENT;
      const l = o * s;
      const c = r.byteOffset || 0;
      const u = r.bufferView !== undefined ? n.bufferViews[r.bufferView].byteStride : undefined;
      const h = r.normalized === true;
      let d;
      let f;
      if (u && u !== l) {
        const t = Math.floor(c / u);
        const n = "InterleavedBuffer:" + r.bufferView + ":" + r.componentType + ":" + t + ":" + r.count;
        let l = e.cache.get(n);
        if (!l) {
          d = new a(i, t * u, r.count * u / o);
          l = new O(d, u / o);
          e.cache.add(n, l);
        }
        f = new z(l, s, c % u / o, h);
      } else {
        d = i === null ? new a(r.count * s) : new a(i, c, r.count * s);
        f = new U.Tl(d, s, h);
      }
      if (r.sparse !== undefined) {
        const e = Se.SCALAR;
        const n = we[r.sparse.indices.componentType];
        const o = r.sparse.indices.byteOffset || 0;
        const l = r.sparse.values.byteOffset || 0;
        const c = new n(t[1], o, r.sparse.count * e);
        const u = new a(t[2], l, r.sparse.count * s);
        if (i !== null) {
          f = new U.Tl(f.array.slice(), f.itemSize, f.normalized);
        }
        for (let t = 0, e = c.length; t < e; t++) {
          const e = c[t];
          f.setX(e, u[t * s]);
          if (s >= 2) {
            f.setY(e, u[t * s + 1]);
          }
          if (s >= 3) {
            f.setZ(e, u[t * s + 2]);
          }
          if (s >= 4) {
            f.setW(e, u[t * s + 3]);
          }
          if (s >= 5) {
            throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
          }
        }
      }
      return f;
    });
  }
  loadTexture(t) {
    const e = this.json;
    const n = this.options;
    const r = e.textures[t];
    const i = e.images[r.source];
    let s = this.textureLoader;
    if (i.uri) {
      const t = n.manager.getHandler(i.uri);
      if (t !== null) {
        s = t;
      }
    }
    return this.loadTextureImage(t, i, s);
  }
  loadTextureImage(t, e, n) {
    const r = this;
    const i = this.json;
    const s = this.options;
    const a = i.textures[t];
    const o = (e.uri || e.bufferView) + ":" + a.sampler;
    if (this.textureCache[o]) {
      return this.textureCache[o];
    }
    const l = self.URL || self.webkitURL;
    let c = e.uri || "";
    let u = false;
    let h = true;
    const d = c.search(/\.jpe?g($|\?)/i) > 0 || c.search(/^data\:image\/jpeg/) === 0;
    if (e.mimeType === "image/jpeg" || d) {
      h = false;
    }
    if (e.bufferView !== undefined) {
      c = r.getDependency("bufferView", e.bufferView).then(function (t) {
        if (e.mimeType === "image/png") {
          const e = new DataView(t, 25, 1).getUint8(0, false);
          h = e === 6 || e === 4 || e === 3;
        }
        u = true;
        const n = new Blob([t], {
          type: e.mimeType
        });
        c = l.createObjectURL(n);
        return c;
      });
    } else if (e.uri === undefined) {
      throw new Error("THREE.GLTFLoader: Image " + t + " is missing URI and bufferView");
    }
    const f = Promise.resolve(c).then(function (t) {
      return new Promise(function (e, r) {
        let i = e;
        if (n.isImageBitmapLoader === true) {
          i = function (t) {
            const n = new zt.x(t);
            n.needsUpdate = true;
            e(n);
          };
        }
        n.load(De(t, s.path), i, undefined, r);
      });
    }).then(function (e) {
      if (u === true) {
        l.revokeObjectURL(c);
      }
      e.flipY = false;
      if (a.name) {
        e.name = a.name;
      }
      if (!h) {
        e.format = R.UCm;
      }
      const n = (i.samplers || {})[a.sampler] || {};
      e.magFilter = Me[n.magFilter] || R.wem;
      e.minFilter = Me[n.minFilter] || R.D1R;
      e.wrapS = Te[n.wrapS] || R.rpg;
      e.wrapT = Te[n.wrapT] || R.rpg;
      r.associations.set(e, {
        type: "textures",
        index: t
      });
      return e;
    }).catch(function () {
      console.error("THREE.GLTFLoader: Couldn't load texture", c);
      return null;
    });
    this.textureCache[o] = f;
    return f;
  }
  assignTexture(t, e, n) {
    const r = this;
    return this.getDependency("texture", n.index).then(function (i) {
      if (n.texCoord !== undefined && n.texCoord != 0 && (e !== "aoMap" || n.texCoord != 1)) {
        console.warn("THREE.GLTFLoader: Custom UV set " + n.texCoord + " for texture " + e + " not yet supported.");
      }
      if (r.extensions[jt.KHR_TEXTURE_TRANSFORM]) {
        const t = n.extensions !== undefined ? n.extensions[jt.KHR_TEXTURE_TRANSFORM] : undefined;
        if (t) {
          const e = r.associations.get(i);
          i = r.extensions[jt.KHR_TEXTURE_TRANSFORM].extendTexture(i, t);
          r.associations.set(i, e);
        }
      }
      t[e] = i;
      return i;
    });
  }
  assignFinalMaterial(t) {
    const e = t.geometry;
    let n = t.material;
    const r = e.attributes.tangent !== undefined;
    const i = e.attributes.color !== undefined;
    const s = e.attributes.normal === undefined;
    if (t.isPoints) {
      const t = "PointsMaterial:" + n.uuid;
      let e = this.cache.get(t);
      if (!e) {
        e = new k();
        L.F.prototype.copy.call(e, n);
        e.color.copy(n.color);
        e.map = n.map;
        e.sizeAttenuation = false;
        this.cache.add(t, e);
      }
      n = e;
    } else if (t.isLine) {
      const t = "LineBasicMaterial:" + n.uuid;
      let e = this.cache.get(t);
      if (!e) {
        e = new kt.n();
        L.F.prototype.copy.call(e, n);
        e.color.copy(n.color);
        this.cache.add(t, e);
      }
      n = e;
    }
    if (r || i || s) {
      let t = "ClonedMaterial:" + n.uuid + ":";
      if (n.isGLTFSpecularGlossinessMaterial) {
        t += "specular-glossiness:";
      }
      if (r) {
        t += "vertex-tangents:";
      }
      if (i) {
        t += "vertex-colors:";
      }
      if (s) {
        t += "flat-shading:";
      }
      let e = this.cache.get(t);
      if (!e) {
        e = n.clone();
        if (i) {
          e.vertexColors = true;
        }
        if (s) {
          e.flatShading = true;
        }
        if (r) {
          if (e.normalScale) {
            e.normalScale.y *= -1;
          }
          if (e.clearcoatNormalScale) {
            e.clearcoatNormalScale.y *= -1;
          }
        }
        this.cache.add(t, e);
        this.associations.set(e, this.associations.get(n));
      }
      n = e;
    }
    if (n.aoMap && e.attributes.uv2 === undefined && e.attributes.uv !== undefined) {
      e.setAttribute("uv2", e.attributes.uv);
    }
    t.material = n;
  }
  getMaterialType() {
    return P;
  }
  loadMaterial(t) {
    const e = this;
    const n = this.json;
    const r = this.extensions;
    const i = n.materials[t];
    let a;
    const o = {};
    const c = i.extensions || {};
    const u = [];
    if (c[jt.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
      const t = r[jt.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
      a = t.getMaterialType();
      u.push(t.extendParams(o, i, e));
    } else if (c[jt.KHR_MATERIALS_UNLIT]) {
      const t = r[jt.KHR_MATERIALS_UNLIT];
      a = t.getMaterialType();
      u.push(t.extendParams(o, i, e));
    } else {
      const n = i.pbrMetallicRoughness || {};
      o.color = new s.I(1, 1, 1);
      o.opacity = 1;
      if (Array.isArray(n.baseColorFactor)) {
        const t = n.baseColorFactor;
        o.color.fromArray(t);
        o.opacity = t[3];
      }
      if (n.baseColorTexture !== undefined) {
        u.push(e.assignTexture(o, "map", n.baseColorTexture));
      }
      o.metalness = n.metallicFactor !== undefined ? n.metallicFactor : 1;
      o.roughness = n.roughnessFactor !== undefined ? n.roughnessFactor : 1;
      if (n.metallicRoughnessTexture !== undefined) {
        u.push(e.assignTexture(o, "metalnessMap", n.metallicRoughnessTexture));
        u.push(e.assignTexture(o, "roughnessMap", n.metallicRoughnessTexture));
      }
      a = this._invokeOne(function (e) {
        return e.getMaterialType && e.getMaterialType(t);
      });
      u.push(Promise.all(this._invokeAll(function (e) {
        return e.extendMaterialParams && e.extendMaterialParams(t, o);
      })));
    }
    if (i.doubleSided === true) {
      o.side = R.ehD;
    }
    const h = i.alphaMode || Le;
    if (h === Ce) {
      o.transparent = true;
      o.depthWrite = false;
    } else {
      o.format = R.UCm;
      o.transparent = false;
      if (h === Pe) {
        o.alphaTest = i.alphaCutoff !== undefined ? i.alphaCutoff : 0.5;
      }
    }
    if (i.normalTexture !== undefined && a !== Ut.v) {
      u.push(e.assignTexture(o, "normalMap", i.normalTexture));
      o.normalScale = new l.F(1, -1);
      if (i.normalTexture.scale !== undefined) {
        o.normalScale.set(i.normalTexture.scale, -i.normalTexture.scale);
      }
    }
    if (i.occlusionTexture !== undefined && a !== Ut.v) {
      u.push(e.assignTexture(o, "aoMap", i.occlusionTexture));
      if (i.occlusionTexture.strength !== undefined) {
        o.aoMapIntensity = i.occlusionTexture.strength;
      }
    }
    if (i.emissiveFactor !== undefined && a !== Ut.v) {
      o.emissive = new s.I().fromArray(i.emissiveFactor);
    }
    if (i.emissiveTexture !== undefined && a !== Ut.v) {
      u.push(e.assignTexture(o, "emissiveMap", i.emissiveTexture));
    }
    return Promise.all(u).then(function () {
      let n;
      n = a === ce ? r[jt.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(o) : new a(o);
      if (i.name) {
        n.name = i.name;
      }
      if (n.map) {
        n.map.encoding = R.knz;
      }
      if (n.emissiveMap) {
        n.emissiveMap.encoding = R.knz;
      }
      Ne(n, i);
      e.associations.set(n, {
        type: "materials",
        index: t
      });
      if (i.extensions) {
        Ie(r, n, i);
      }
      return n;
    });
  }
  createUniqueName(t) {
    const e = J.sanitizeNodeName(t || "");
    let n = e;
    for (let t = 1; this.nodeNamesUsed[n]; ++t) {
      n = e + "_" + t;
    }
    this.nodeNamesUsed[n] = true;
    return n;
  }
  loadGeometries(t) {
    const e = this;
    const n = this.extensions;
    const r = this.primitiveCache;
    function i(t) {
      return n[jt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(t, e).then(function (n) {
        return Ge(n, t, e);
      });
    }
    const s = [];
    for (let n = 0, a = t.length; n < a; n++) {
      const a = t[n];
      const o = Oe(a);
      const l = r[o];
      if (l) {
        s.push(l.promise);
      } else {
        let t;
        t = a.extensions && a.extensions[jt.KHR_DRACO_MESH_COMPRESSION] ? i(a) : Ge(new ct.u(), a, e);
        r[o] = {
          primitive: a,
          promise: t
        };
        s.push(t);
      }
    }
    return Promise.all(s);
  }
  loadMesh(t) {
    const e = this;
    const n = this.json;
    const r = this.extensions;
    const i = n.meshes[t];
    const s = i.primitives;
    const a = [];
    for (let t = 0, e = s.length; t < e; t++) {
      const e = s[t].material === undefined ? ((o = this.cache).DefaultMaterial === undefined && (o.DefaultMaterial = new P({
        color: 16777215,
        emissive: 0,
        metalness: 1,
        roughness: 1,
        transparent: false,
        depthTest: true,
        side: R.Wl3
      })), o.DefaultMaterial) : this.getDependency("material", s[t].material);
      a.push(e);
    }
    var o;
    a.push(e.loadGeometries(s));
    return Promise.all(a).then(function (n) {
      const a = n.slice(0, n.length - 1);
      const o = n[n.length - 1];
      const l = [];
      for (let n = 0, c = o.length; n < c; n++) {
        const c = o[n];
        const u = s[n];
        let h;
        const d = a[n];
        if (u.mode === xe || u.mode === ye || u.mode === be || u.mode === undefined) {
          h = i.isSkinnedMesh === true ? new it(c, d) : new Q.K(c, d);
          if (h.isSkinnedMesh === true && !h.geometry.attributes.skinWeight.normalized) {
            h.normalizeSkinWeights();
          }
          if (u.mode === ye) {
            h.geometry = He(h.geometry, R.UlW);
          } else if (u.mode === be) {
            h.geometry = He(h.geometry, R.z$h);
          }
        } else if (u.mode === ge) {
          h = new Gt.e(c, d);
        } else if (u.mode === _e) {
          h = new st.x(c, d);
        } else if (u.mode === ve) {
          h = new at(c, d);
        } else {
          if (u.mode !== me) {
            throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + u.mode);
          }
          h = new pt(c, d);
        }
        if (Object.keys(h.geometry.morphAttributes).length > 0) {
          Fe(h, i);
        }
        h.name = e.createUniqueName(i.name || "mesh_" + t);
        Ne(h, i);
        if (u.extensions) {
          Ie(r, h, u);
        }
        e.assignFinalMaterial(h);
        l.push(h);
      }
      if (l.length === 1) {
        return l[0];
      }
      const c = new Ht.Z();
      for (let t = 0, e = l.length; t < e; t++) {
        c.add(l[t]);
      }
      return c;
    });
  }
  loadCamera(t) {
    let e;
    const n = this.json.cameras[t];
    const r = n[n.type];
    if (r) {
      if (n.type === "perspective") {
        e = new x.c(S.ZY(r.yfov), r.aspectRatio || 1, r.znear || 1, r.zfar || 2000000);
      } else if (n.type === "orthographic") {
        e = new g.i(-r.xmag, r.xmag, r.ymag, -r.ymag, r.znear, r.zfar);
      }
      if (n.name) {
        e.name = this.createUniqueName(n.name);
      }
      Ne(e, n);
      return Promise.resolve(e);
    }
    console.warn("THREE.GLTFLoader: Missing camera parameters.");
  }
  loadSkin(t) {
    const e = this.json.skins[t];
    const n = {
      joints: e.joints
    };
    if (e.inverseBindMatrices === undefined) {
      return Promise.resolve(n);
    } else {
      return this.getDependency("accessor", e.inverseBindMatrices).then(function (t) {
        n.inverseBindMatrices = t;
        return n;
      });
    }
  }
  loadAnimation(t) {
    const e = this.json.animations[t];
    const n = [];
    const r = [];
    const i = [];
    const s = [];
    const a = [];
    for (let t = 0, o = e.channels.length; t < o; t++) {
      const o = e.channels[t];
      const l = e.samplers[o.sampler];
      const c = o.target;
      const u = c.node !== undefined ? c.node : c.id;
      const h = e.parameters !== undefined ? e.parameters[l.input] : l.input;
      const d = e.parameters !== undefined ? e.parameters[l.output] : l.output;
      n.push(this.getDependency("node", u));
      r.push(this.getDependency("accessor", h));
      i.push(this.getDependency("accessor", d));
      s.push(l);
      a.push(c);
    }
    return Promise.all([Promise.all(n), Promise.all(r), Promise.all(i), Promise.all(s), Promise.all(a)]).then(function (n) {
      const r = n[0];
      const i = n[1];
      const s = n[2];
      const a = n[3];
      const o = n[4];
      const l = [];
      for (let t = 0, e = r.length; t < e; t++) {
        const e = r[t];
        const n = i[t];
        const c = s[t];
        const u = a[t];
        const h = o[t];
        if (e === undefined) {
          continue;
        }
        let d;
        e.updateMatrix();
        e.matrixAutoUpdate = true;
        switch (Ae[h.path]) {
          case Ae.weights:
            d = wt;
            break;
          case Ae.rotation:
            d = Tt;
            break;
          case Ae.position:
          case Ae.scale:
          default:
            d = St;
        }
        const f = e.name ? e.name : e.uuid;
        const p = u.interpolation !== undefined ? Re[u.interpolation] : R.NMF;
        const m = [];
        if (Ae[h.path] === Ae.weights) {
          e.traverse(function (t) {
            if (t.isMesh === true && t.morphTargetInfluences) {
              m.push(t.name ? t.name : t.uuid);
            }
          });
        } else {
          m.push(f);
        }
        let g = c.array;
        if (c.normalized) {
          const t = Be(g.constructor);
          const e = new Float32Array(g.length);
          for (let n = 0, r = g.length; n < r; n++) {
            e[n] = g[n] * t;
          }
          g = e;
        }
        for (let t = 0, e = m.length; t < e; t++) {
          const e = new d(m[t] + "." + Ae[h.path], n.array, g, p);
          if (u.interpolation === "CUBICSPLINE") {
            e.createInterpolant = function (t) {
              return new (this instanceof Tt ? pe : de)(this.times, this.values, this.getValueSize() / 3, t);
            };
            e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true;
          }
          l.push(e);
        }
      }
      const c = e.name ? e.name : "animation_" + t;
      return new Lt(c, undefined, l);
    });
  }
  createNodeMesh(t) {
    const e = this.json;
    const n = this;
    const r = e.nodes[t];
    if (r.mesh === undefined) {
      return null;
    } else {
      return n.getDependency("mesh", r.mesh).then(function (t) {
        const e = n._getNodeRef(n.meshCache, r.mesh, t);
        if (r.weights !== undefined) {
          e.traverse(function (t) {
            if (t.isMesh) {
              for (let e = 0, n = r.weights.length; e < n; e++) {
                t.morphTargetInfluences[e] = r.weights[e];
              }
            }
          });
        }
        return e;
      });
    }
  }
  loadNode(t) {
    const e = this.json;
    const n = this.extensions;
    const r = this;
    const s = e.nodes[t];
    const a = s.name ? r.createUniqueName(s.name) : "";
    return function () {
      const e = [];
      const n = r._invokeOne(function (e) {
        return e.createNodeMesh && e.createNodeMesh(t);
      });
      if (n) {
        e.push(n);
      }
      if (s.camera !== undefined) {
        e.push(r.getDependency("camera", s.camera).then(function (t) {
          return r._getNodeRef(r.cameraCache, s.camera, t);
        }));
      }
      r._invokeAll(function (e) {
        return e.createNodeAttachment && e.createNodeAttachment(t);
      }).forEach(function (t) {
        e.push(t);
      });
      return Promise.all(e);
    }().then(function (e) {
      let l;
      l = s.isBone === true ? new Ct() : e.length > 1 ? new Ht.Z() : e.length === 1 ? e[0] : new i.T();
      if (l !== e[0]) {
        for (let t = 0, n = e.length; t < n; t++) {
          l.add(e[t]);
        }
      }
      if (s.name) {
        l.userData.name = s.name;
        l.name = a;
      }
      Ne(l, s);
      if (s.extensions) {
        Ie(n, l, s);
      }
      if (s.matrix !== undefined) {
        const t = new o.y();
        t.fromArray(s.matrix);
        l.applyMatrix4(t);
      } else {
        if (s.translation !== undefined) {
          l.position.fromArray(s.translation);
        }
        if (s.rotation !== undefined) {
          l.quaternion.fromArray(s.rotation);
        }
        if (s.scale !== undefined) {
          l.scale.fromArray(s.scale);
        }
      }
      r.associations.set(l, {
        type: "nodes",
        index: t
      });
      return l;
    });
  }
  loadScene(t) {
    const e = this.json;
    const n = this.extensions;
    const r = this.json.scenes[t];
    const i = this;
    const s = new Ht.Z();
    if (r.name) {
      s.name = i.createUniqueName(r.name);
    }
    Ne(s, r);
    if (r.extensions) {
      Ie(n, s, r);
    }
    const a = r.nodes || [];
    const o = [];
    for (let t = 0, n = a.length; t < n; t++) {
      o.push(ke(a[t], s, e, i));
    }
    return Promise.all(o).then(function () {
      return s;
    });
  }
}
function ke(t, e, n, r) {
  const i = n.nodes[t];
  return r.getDependency("node", t).then(function (t) {
    if (i.skin === undefined) {
      return t;
    }
    let e;
    return r.getDependency("skin", i.skin).then(function (t) {
      e = t;
      const n = [];
      for (let t = 0, i = e.joints.length; t < i; t++) {
        n.push(r.getDependency("node", e.joints[t]));
      }
      return Promise.all(n);
    }).then(function (n) {
      t.traverse(function (t) {
        if (!t.isMesh) {
          return;
        }
        const r = [];
        const i = [];
        for (let t = 0, s = n.length; t < s; t++) {
          const s = n[t];
          if (s) {
            r.push(s);
            const n = new o.y();
            if (e.inverseBindMatrices !== undefined) {
              n.fromArray(e.inverseBindMatrices.array, t * 16);
            }
            i.push(n);
          } else {
            console.warn("THREE.GLTFLoader: Joint \"%s\" could not be found.", e.joints[t]);
          }
        }
        t.bind(new Ft(r, i), t.matrixWorld);
      });
      return t;
    });
  }).then(function (t) {
    e.add(t);
    const s = [];
    if (i.children) {
      const e = i.children;
      for (let i = 0, a = e.length; i < a; i++) {
        const a = e[i];
        s.push(ke(a, t, n, r));
      }
    }
    return Promise.all(s);
  });
}
function Ge(t, e, n) {
  const r = e.attributes;
  const i = [];
  function s(e, r) {
    return n.getDependency("accessor", e).then(function (e) {
      t.setAttribute(r, e);
    });
  }
  for (const e in r) {
    const n = Ee[e] || e.toLowerCase();
    if (!(n in t.attributes)) {
      i.push(s(r[e], n));
    }
  }
  if (e.indices !== undefined && !t.index) {
    const r = n.getDependency("accessor", e.indices).then(function (e) {
      t.setIndex(e);
    });
    i.push(r);
  }
  Ne(t, e);
  (function (t, e, n) {
    const r = e.attributes;
    const i = new Vt.Z();
    if (r.POSITION === undefined) {
      return;
    }
    {
      const t = n.json.accessors[r.POSITION];
      const e = t.min;
      const s = t.max;
      if (e === undefined || s === undefined) {
        console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
        return;
      }
      i.set(new c.P(e[0], e[1], e[2]), new c.P(s[0], s[1], s[2]));
      if (t.normalized) {
        const e = Be(we[t.componentType]);
        i.min.multiplyScalar(e);
        i.max.multiplyScalar(e);
      }
    }
    const s = e.targets;
    if (s !== undefined) {
      const t = new c.P();
      const e = new c.P();
      for (let r = 0, i = s.length; r < i; r++) {
        const i = s[r];
        if (i.POSITION !== undefined) {
          const r = n.json.accessors[i.POSITION];
          const s = r.min;
          const a = r.max;
          if (s !== undefined && a !== undefined) {
            e.setX(Math.max(Math.abs(s[0]), Math.abs(a[0])));
            e.setY(Math.max(Math.abs(s[1]), Math.abs(a[1])));
            e.setZ(Math.max(Math.abs(s[2]), Math.abs(a[2])));
            if (r.normalized) {
              const t = Be(we[r.componentType]);
              e.multiplyScalar(t);
            }
            t.max(e);
          } else {
            console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
          }
        }
      }
      i.expandByVector(t);
    }
    t.boundingBox = i;
    const a = new ot.a();
    i.getCenter(a.center);
    a.radius = i.min.distanceTo(i.max) / 2;
    t.boundingSphere = a;
  })(t, e, n);
  return Promise.all(i).then(function () {
    if (e.targets !== undefined) {
      return function (t, e, n) {
        let r = false;
        let i = false;
        for (let t = 0, n = e.length; t < n; t++) {
          const n = e[t];
          if (n.POSITION !== undefined) {
            r = true;
          }
          if (n.NORMAL !== undefined) {
            i = true;
          }
          if (r && i) {
            break;
          }
        }
        if (!r && !i) {
          return Promise.resolve(t);
        }
        const s = [];
        const a = [];
        for (let o = 0, l = e.length; o < l; o++) {
          const l = e[o];
          if (r) {
            const e = l.POSITION !== undefined ? n.getDependency("accessor", l.POSITION) : t.attributes.position;
            s.push(e);
          }
          if (i) {
            const e = l.NORMAL !== undefined ? n.getDependency("accessor", l.NORMAL) : t.attributes.normal;
            a.push(e);
          }
        }
        return Promise.all([Promise.all(s), Promise.all(a)]).then(function (e) {
          const n = e[0];
          const s = e[1];
          if (r) {
            t.morphAttributes.position = n;
          }
          if (i) {
            t.morphAttributes.normal = s;
          }
          t.morphTargetsRelative = true;
          return t;
        });
      }(t, e.targets, n);
    } else {
      return t;
    }
  });
}
function He(t, e) {
  let n = t.getIndex();
  if (n === null) {
    const e = [];
    const r = t.getAttribute("position");
    if (r === undefined) {
      console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.");
      return t;
    }
    for (let t = 0; t < r.count; t++) {
      e.push(t);
    }
    t.setIndex(e);
    n = t.getIndex();
  }
  const r = n.count - 2;
  const i = [];
  if (e === R.z$h) {
    for (let t = 1; t <= r; t++) {
      i.push(n.getX(0));
      i.push(n.getX(t));
      i.push(n.getX(t + 1));
    }
  } else {
    for (let t = 0; t < r; t++) {
      if (t % 2 == 0) {
        i.push(n.getX(t));
        i.push(n.getX(t + 1));
        i.push(n.getX(t + 2));
      } else {
        i.push(n.getX(t + 2));
        i.push(n.getX(t + 1));
        i.push(n.getX(t));
      }
    }
  }
  if (i.length / 3 !== r) {
    console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
  }
  const s = t.clone();
  s.setIndex(i);
  return s;
}