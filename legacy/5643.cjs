var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  a: function () {
    return u;
  }
});
var r = require("./3977.cjs");
class i extends r.x {
  constructor(t, e, n, r, i, s, a, o, l, c, u, h) {
    super(null, s, a, o, l, c, r, i, u, h);
    this.image = {
      width: e,
      height: n
    };
    this.mipmaps = t;
    this.flipY = false;
    this.generateMipmaps = false;
  }
}
i.prototype.isCompressedTexture = true;
var s = require("./6023.cjs");
var a = require("./5092.cjs");
var o = require("./1661.cjs");
class l {
  constructor(t = 4) {
    this.pool = t;
    this.queue = [];
    this.workers = [];
    this.workersResolve = [];
    this.workerStatus = 0;
  }
  _initWorker(t) {
    if (!this.workers[t]) {
      const e = this.workerCreator();
      e.addEventListener("message", this._onMessage.bind(this, t));
      this.workers[t] = e;
    }
  }
  _getIdleWorker() {
    for (let t = 0; t < this.pool; t++) {
      if (!(this.workerStatus & 1 << t)) {
        return t;
      }
    }
    return -1;
  }
  _onMessage(t, e) {
    const n = this.workersResolve[t];
    if (n) {
      n(e);
    }
    if (this.queue.length) {
      const {
        resolve: e,
        msg: n,
        transfer: r
      } = this.queue.shift();
      this.workersResolve[t] = e;
      this.workers[t].postMessage(n, r);
    } else {
      this.workerStatus ^= 1 << t;
    }
  }
  setWorkerCreator(t) {
    this.workerCreator = t;
  }
  setWorkerLimit(t) {
    this.pool = t;
  }
  postMessage(t, e) {
    return new Promise(n => {
      const r = this._getIdleWorker();
      if (r !== -1) {
        this._initWorker(r);
        this.workerStatus |= 1 << r;
        this.workersResolve[r] = n;
        this.workers[r].postMessage(t, e);
      } else {
        this.queue.push({
          resolve: n,
          msg: t,
          transfer: e
        });
      }
    });
  }
  dispose() {
    this.workers.forEach(t => t.terminate());
    this.workersResolve.length = 0;
    this.workers.length = 0;
    this.queue.length = 0;
    this.workerStatus = 0;
  }
}
const c = new WeakMap();
class u extends s.a {
  constructor(t) {
    super(t);
    this.transcoderPath = "";
    this.transcoderBinary = null;
    this.transcoderPending = null;
    this.workerPool = new l();
    this.workerSourceURL = "";
    this.workerConfig = null;
    if (typeof MSC_TRANSCODER != "undefined") {
      console.warn("THREE.KTX2Loader: Please update to latest \"basis_transcoder\". \"msc_basis_transcoder\" is no longer supported in three.js r125+.");
    }
  }
  setTranscoderPath(t) {
    this.transcoderPath = t;
    return this;
  }
  setWorkerLimit(t) {
    this.workerPool.setWorkerLimit(t);
    return this;
  }
  detectSupport(t) {
    this.workerConfig = {
      astcSupported: t.extensions.has("WEBGL_compressed_texture_astc"),
      etc1Supported: t.extensions.has("WEBGL_compressed_texture_etc1"),
      etc2Supported: t.extensions.has("WEBGL_compressed_texture_etc"),
      dxtSupported: t.extensions.has("WEBGL_compressed_texture_s3tc"),
      bptcSupported: t.extensions.has("EXT_texture_compression_bptc"),
      pvrtcSupported: t.extensions.has("WEBGL_compressed_texture_pvrtc") || t.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")
    };
    return this;
  }
  dispose() {
    this.workerPool.dispose();
    if (this.workerSourceURL) {
      URL.revokeObjectURL(this.workerSourceURL);
    }
    return this;
  }
  init() {
    if (!this.transcoderPending) {
      const t = new a.h(this.manager);
      t.setPath(this.transcoderPath);
      t.setWithCredentials(this.withCredentials);
      const e = t.loadAsync("basis_transcoder.js");
      const n = new a.h(this.manager);
      n.setPath(this.transcoderPath);
      n.setResponseType("arraybuffer");
      n.setWithCredentials(this.withCredentials);
      const r = n.loadAsync("basis_transcoder.wasm");
      this.transcoderPending = Promise.all([e, r]).then(([t, e]) => {
        const n = u.BasisWorker.toString();
        const r = ["/* constants */", "let _EngineFormat = " + JSON.stringify(u.EngineFormat), "let _TranscoderFormat = " + JSON.stringify(u.TranscoderFormat), "let _BasisFormat = " + JSON.stringify(u.BasisFormat), "/* basis_transcoder.js */", t, "/* worker */", n.substring(n.indexOf("{") + 1, n.lastIndexOf("}"))].join("\n");
        this.workerSourceURL = URL.createObjectURL(new Blob([r]));
        this.transcoderBinary = e;
        this.workerPool.setWorkerCreator(() => {
          const t = new Worker(this.workerSourceURL);
          const e = this.transcoderBinary.slice(0);
          t.postMessage({
            type: "init",
            config: this.workerConfig,
            transcoderBinary: e
          }, [e]);
          return t;
        });
      });
    }
    return this.transcoderPending;
  }
  load(t, e, n, r) {
    const s = new a.h(this.manager);
    s.setResponseType("arraybuffer");
    s.setWithCredentials(this.withCredentials);
    const o = new i();
    s.load(t, t => {
      if (c.has(t)) {
        return c.get(t).promise.then(e).catch(r);
      }
      this._createTexture([t]).then(function (t) {
        o.copy(t);
        o.needsUpdate = true;
        if (e) {
          e(o);
        }
      }).catch(r);
    }, n, r);
    return o;
  }
  createTextureFrom(t) {
    const {
      mipmaps: e,
      width: n,
      height: r,
      format: s,
      type: a,
      error: l,
      dfdTransferFn: c,
      dfdFlags: u
    } = t;
    if (a === "error") {
      return Promise.reject(l);
    }
    const h = new i(e, n, r, s, o.ywz);
    h.minFilter = e.length === 1 ? o.wem : o.D1R;
    h.magFilter = o.wem;
    h.generateMipmaps = false;
    h.needsUpdate = true;
    h.encoding = c === 2 ? o.knz : o.rnI;
    h.premultiplyAlpha = !!(u & 1);
    return h;
  }
  _createTexture(t, e = {}) {
    const n = e;
    const r = this.init().then(() => this.workerPool.postMessage({
      type: "transcode",
      buffers: t,
      taskConfig: n
    }, t)).then(t => this.createTextureFrom(t.data));
    c.set(t[0], {
      promise: r
    });
    return r;
  }
  dispose() {
    URL.revokeObjectURL(this.workerSourceURL);
    this.workerPool.dispose();
    return this;
  }
}
u.BasisFormat = {
  ETC1S: 0,
  UASTC_4x4: 1
};
u.TranscoderFormat = {
  ETC1: 0,
  ETC2: 1,
  BC1: 2,
  BC3: 3,
  BC4: 4,
  BC5: 5,
  BC7_M6_OPAQUE_ONLY: 6,
  BC7_M5: 7,
  PVRTC1_4_RGB: 8,
  PVRTC1_4_RGBA: 9,
  ASTC_4x4: 10,
  ATC_RGB: 11,
  ATC_RGBA_INTERPOLATED_ALPHA: 12,
  RGBA32: 13,
  RGB565: 14,
  BGR565: 15,
  RGBA4444: 16
};
u.EngineFormat = {
  RGBAFormat: o.wk1,
  RGBA_ASTC_4x4_Format: o.ptH,
  RGBA_BPTC_Format: o.bsb,
  RGBA_ETC2_EAC_Format: o.ekQ,
  RGBA_PVRTC_4BPPV1_Format: o.eaV,
  RGBA_S3TC_DXT5_Format: o.ILR,
  RGB_ETC1_Format: o.fto,
  RGB_ETC2_Format: o.l0P,
  RGB_PVRTC_4BPPV1_Format: o._AM,
  RGB_S3TC_DXT1_Format: o.wuA
};
u.BasisWorker = function () {
  let t;
  let e;
  let n;
  const r = _EngineFormat;
  const i = _TranscoderFormat;
  const s = _BasisFormat;
  self.addEventListener("message", function (a) {
    const u = a.data;
    switch (u.type) {
      case "init":
        t = u.config;
        h = u.transcoderBinary;
        e = new Promise(t => {
          n = {
            wasmBinary: h,
            onRuntimeInitialized: t
          };
          BASIS(n);
        }).then(() => {
          n.initializeBasis();
          if (n.KTX2File === undefined) {
            console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.");
          }
        });
        break;
      case "transcode":
        e.then(() => {
          try {
            const {
              width: e,
              height: a,
              hasAlpha: h,
              mipmaps: d,
              format: f,
              dfdTransferFn: p,
              dfdFlags: m
            } = function (e) {
              const a = new n.KTX2File(new Uint8Array(e));
              function u() {
                a.close();
                a.delete();
              }
              if (!a.isValid()) {
                u();
                throw new Error("THREE.KTX2Loader:\tInvalid or unsupported .ktx2 file");
              }
              const h = a.isUASTC() ? s.UASTC_4x4 : s.ETC1S;
              const d = a.getWidth();
              const f = a.getHeight();
              const p = a.getLevels();
              const m = a.getHasAlpha();
              const g = a.getDFDTransferFunc();
              const v = a.getDFDFlags();
              const {
                transcoderFormat: _,
                engineFormat: x
              } = function (e, n, a, u) {
                let h;
                let d;
                const f = e === s.ETC1S ? o : l;
                for (let r = 0; r < f.length; r++) {
                  const i = f[r];
                  if (t[i.if] && i.basisFormat.includes(e) && (!i.needsPowerOfTwo || c(n) && c(a))) {
                    h = i.transcoderFormat[u ? 1 : 0];
                    d = i.engineFormat[u ? 1 : 0];
                    return {
                      transcoderFormat: h,
                      engineFormat: d
                    };
                  }
                }
                console.warn("THREE.KTX2Loader: No suitable compressed texture format found. Decoding to RGBA32.");
                h = i.RGBA32;
                d = r.RGBAFormat;
                return {
                  transcoderFormat: h,
                  engineFormat: d
                };
              }(h, d, f, m);
              if (!d || !f || !p) {
                u();
                throw new Error("THREE.KTX2Loader:\tInvalid texture");
              }
              if (!a.startTranscoding()) {
                u();
                throw new Error("THREE.KTX2Loader: .startTranscoding failed");
              }
              const y = [];
              for (let t = 0; t < p; t++) {
                const e = a.getImageLevelInfo(t, 0, 0);
                const n = e.origWidth;
                const r = e.origHeight;
                const i = new Uint8Array(a.getImageTranscodedSizeInBytes(t, 0, 0, _));
                if (!a.transcodeImage(i, t, 0, 0, _, 0, -1, -1)) {
                  u();
                  throw new Error("THREE.KTX2Loader: .transcodeImage failed.");
                }
                y.push({
                  data: i,
                  width: n,
                  height: r
                });
              }
              u();
              return {
                width: d,
                height: f,
                hasAlpha: m,
                mipmaps: y,
                format: x,
                dfdTransferFn: g,
                dfdFlags: v
              };
            }(u.buffers[0]);
            const g = [];
            for (let t = 0; t < d.length; ++t) {
              g.push(d[t].data.buffer);
            }
            self.postMessage({
              type: "transcode",
              id: u.id,
              width: e,
              height: a,
              hasAlpha: h,
              mipmaps: d,
              format: f,
              dfdTransferFn: p,
              dfdFlags: m
            }, g);
          } catch (t) {
            console.error(t);
            self.postMessage({
              type: "error",
              id: u.id,
              error: t.message
            });
          }
        });
    }
    var h;
  });
  const a = [{
    if: "astcSupported",
    basisFormat: [s.UASTC_4x4],
    transcoderFormat: [i.ASTC_4x4, i.ASTC_4x4],
    engineFormat: [r.RGBA_ASTC_4x4_Format, r.RGBA_ASTC_4x4_Format],
    priorityETC1S: Infinity,
    priorityUASTC: 1,
    needsPowerOfTwo: false
  }, {
    if: "bptcSupported",
    basisFormat: [s.ETC1S, s.UASTC_4x4],
    transcoderFormat: [i.BC7_M5, i.BC7_M5],
    engineFormat: [r.RGBA_BPTC_Format, r.RGBA_BPTC_Format],
    priorityETC1S: 3,
    priorityUASTC: 2,
    needsPowerOfTwo: false
  }, {
    if: "dxtSupported",
    basisFormat: [s.ETC1S, s.UASTC_4x4],
    transcoderFormat: [i.BC1, i.BC3],
    engineFormat: [r.RGB_S3TC_DXT1_Format, r.RGBA_S3TC_DXT5_Format],
    priorityETC1S: 4,
    priorityUASTC: 5,
    needsPowerOfTwo: false
  }, {
    if: "etc2Supported",
    basisFormat: [s.ETC1S, s.UASTC_4x4],
    transcoderFormat: [i.ETC1, i.ETC2],
    engineFormat: [r.RGB_ETC2_Format, r.RGBA_ETC2_EAC_Format],
    priorityETC1S: 1,
    priorityUASTC: 3,
    needsPowerOfTwo: false
  }, {
    if: "etc1Supported",
    basisFormat: [s.ETC1S, s.UASTC_4x4],
    transcoderFormat: [i.ETC1, i.ETC1],
    engineFormat: [r.RGB_ETC1_Format, r.RGB_ETC1_Format],
    priorityETC1S: 2,
    priorityUASTC: 4,
    needsPowerOfTwo: false
  }, {
    if: "pvrtcSupported",
    basisFormat: [s.ETC1S, s.UASTC_4x4],
    transcoderFormat: [i.PVRTC1_4_RGB, i.PVRTC1_4_RGBA],
    engineFormat: [r.RGB_PVRTC_4BPPV1_Format, r.RGBA_PVRTC_4BPPV1_Format],
    priorityETC1S: 5,
    priorityUASTC: 6,
    needsPowerOfTwo: true
  }];
  const o = a.sort(function (t, e) {
    return t.priorityETC1S - e.priorityETC1S;
  });
  const l = a.sort(function (t, e) {
    return t.priorityUASTC - e.priorityUASTC;
  });
  function c(t) {
    return t <= 2 || (t & t - 1) == 0 && t !== 0;
  }
};