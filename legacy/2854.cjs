var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  _: function () {
    return l;
  }
});
var r = require("./6023.cjs");
var i = require("./5092.cjs");
var s = require("./9046.cjs");
var a = require("./140.cjs");
const o = new WeakMap();
class l extends r.a {
  constructor(t) {
    super(t);
    this.decoderPath = "";
    this.decoderConfig = {};
    this.decoderBinary = null;
    this.decoderPending = null;
    this.workerLimit = 4;
    this.workerPool = [];
    this.workerNextTaskID = 1;
    this.workerSourceURL = "";
    this.defaultAttributeIDs = {
      position: "POSITION",
      normal: "NORMAL",
      color: "COLOR",
      uv: "TEX_COORD"
    };
    this.defaultAttributeTypes = {
      position: "Float32Array",
      normal: "Float32Array",
      color: "Float32Array",
      uv: "Float32Array"
    };
  }
  setDecoderPath(t) {
    this.decoderPath = t;
    return this;
  }
  setDecoderConfig(t) {
    this.decoderConfig = t;
    return this;
  }
  setWorkerLimit(t) {
    this.workerLimit = t;
    return this;
  }
  load(t, e, n, r) {
    const s = new i.h(this.manager);
    s.setPath(this.path);
    s.setResponseType("arraybuffer");
    s.setRequestHeader(this.requestHeader);
    s.setWithCredentials(this.withCredentials);
    s.load(t, t => {
      const n = {
        attributeIDs: this.defaultAttributeIDs,
        attributeTypes: this.defaultAttributeTypes,
        useUniqueIDs: false
      };
      this.decodeGeometry(t, n).then(e).catch(r);
    }, n, r);
  }
  decodeDracoFile(t, e, n, r) {
    const i = {
      attributeIDs: n || this.defaultAttributeIDs,
      attributeTypes: r || this.defaultAttributeTypes,
      useUniqueIDs: !!n
    };
    this.decodeGeometry(t, i).then(e);
  }
  decodeGeometry(t, e) {
    for (const t in e.attributeTypes) {
      const n = e.attributeTypes[t];
      if (n.BYTES_PER_ELEMENT !== undefined) {
        e.attributeTypes[t] = n.name;
      }
    }
    const n = JSON.stringify(e);
    if (o.has(t)) {
      const e = o.get(t);
      if (e.key === n) {
        return e.promise;
      }
      if (t.byteLength === 0) {
        throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.");
      }
    }
    let r;
    const i = this.workerNextTaskID++;
    const s = t.byteLength;
    const a = this._getWorker(i, s).then(n => {
      r = n;
      return new Promise((n, s) => {
        r._callbacks[i] = {
          resolve: n,
          reject: s
        };
        r.postMessage({
          type: "decode",
          id: i,
          taskConfig: e,
          buffer: t
        }, [t]);
      });
    }).then(t => this._createGeometry(t.geometry));
    a.catch(() => true).then(() => {
      if (r && i) {
        this._releaseTask(r, i);
      }
    });
    o.set(t, {
      key: n,
      promise: a
    });
    return a;
  }
  _createGeometry(t) {
    const e = new s.u();
    if (t.index) {
      e.setIndex(new a.Tl(t.index.array, 1));
    }
    for (let n = 0; n < t.attributes.length; n++) {
      const r = t.attributes[n];
      const i = r.name;
      const s = r.array;
      const o = r.itemSize;
      e.setAttribute(i, new a.Tl(s, o));
    }
    return e;
  }
  _loadLibrary(t, e) {
    const n = new i.h(this.manager);
    n.setPath(this.decoderPath);
    n.setResponseType(e);
    n.setWithCredentials(this.withCredentials);
    return new Promise((e, r) => {
      n.load(t, e, undefined, r);
    });
  }
  preload() {
    this._initDecoder();
    return this;
  }
  _initDecoder() {
    if (this.decoderPending) {
      return this.decoderPending;
    }
    const t = typeof WebAssembly != "object" || this.decoderConfig.type === "js";
    const e = [];
    if (t) {
      e.push(this._loadLibrary("draco_decoder.js", "text"));
    } else {
      e.push(this._loadLibrary("draco_wasm_wrapper.js", "text"));
      e.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"));
    }
    this.decoderPending = Promise.all(e).then(e => {
      const n = e[0];
      if (!t) {
        this.decoderConfig.wasmBinary = e[1];
      }
      const r = c.toString();
      const i = ["/* draco decoder */", n, "", "/* worker */", r.substring(r.indexOf("{") + 1, r.lastIndexOf("}"))].join("\n");
      this.workerSourceURL = URL.createObjectURL(new Blob([i]));
    });
    return this.decoderPending;
  }
  _getWorker(t, e) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const t = new Worker(this.workerSourceURL);
        t._callbacks = {};
        t._taskCosts = {};
        t._taskLoad = 0;
        t.postMessage({
          type: "init",
          decoderConfig: this.decoderConfig
        });
        t.onmessage = function (e) {
          const n = e.data;
          switch (n.type) {
            case "decode":
              t._callbacks[n.id].resolve(n);
              break;
            case "error":
              t._callbacks[n.id].reject(n);
              break;
            default:
              console.error("THREE.DRACOLoader: Unexpected message, \"" + n.type + "\"");
          }
        };
        this.workerPool.push(t);
      } else {
        this.workerPool.sort(function (t, e) {
          if (t._taskLoad > e._taskLoad) {
            return -1;
          } else {
            return 1;
          }
        });
      }
      const n = this.workerPool[this.workerPool.length - 1];
      n._taskCosts[t] = e;
      n._taskLoad += e;
      return n;
    });
  }
  _releaseTask(t, e) {
    t._taskLoad -= t._taskCosts[e];
    delete t._callbacks[e];
    delete t._taskCosts[e];
  }
  debug() {
    console.log("Task load: ", this.workerPool.map(t => t._taskLoad));
  }
  dispose() {
    for (let t = 0; t < this.workerPool.length; ++t) {
      this.workerPool[t].terminate();
    }
    this.workerPool.length = 0;
    return this;
  }
}
function c() {
  let t;
  let e;
  function n(t, e, n, r, i, s) {
    const a = s.num_components();
    const o = n.num_points() * a;
    const l = o * i.BYTES_PER_ELEMENT;
    const c = function (t, e) {
      switch (e) {
        case Float32Array:
          return t.DT_FLOAT32;
        case Int8Array:
          return t.DT_INT8;
        case Int16Array:
          return t.DT_INT16;
        case Int32Array:
          return t.DT_INT32;
        case Uint8Array:
          return t.DT_UINT8;
        case Uint16Array:
          return t.DT_UINT16;
        case Uint32Array:
          return t.DT_UINT32;
      }
    }(t, i);
    const u = t._malloc(l);
    e.GetAttributeDataArrayForAllPoints(n, s, c, l, u);
    const h = new i(t.HEAPF32.buffer, u, o).slice();
    t._free(u);
    return {
      name: r,
      array: h,
      itemSize: a
    };
  }
  onmessage = function (r) {
    const i = r.data;
    switch (i.type) {
      case "init":
        t = i.decoderConfig;
        e = new Promise(function (e) {
          t.onModuleLoaded = function (t) {
            e({
              draco: t
            });
          };
          DracoDecoderModule(t);
        });
        break;
      case "decode":
        const r = i.buffer;
        const s = i.taskConfig;
        e.then(t => {
          const e = t.draco;
          const a = new e.Decoder();
          const o = new e.DecoderBuffer();
          o.Init(new Int8Array(r), r.byteLength);
          try {
            const t = function (t, e, r, i) {
              const s = i.attributeIDs;
              const a = i.attributeTypes;
              let o;
              let l;
              const c = e.GetEncodedGeometryType(r);
              if (c === t.TRIANGULAR_MESH) {
                o = new t.Mesh();
                l = e.DecodeBufferToMesh(r, o);
              } else {
                if (c !== t.POINT_CLOUD) {
                  throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
                }
                o = new t.PointCloud();
                l = e.DecodeBufferToPointCloud(r, o);
              }
              if (!l.ok() || o.ptr === 0) {
                throw new Error("THREE.DRACOLoader: Decoding failed: " + l.error_msg());
              }
              const u = {
                index: null,
                attributes: []
              };
              for (const r in s) {
                const l = self[a[r]];
                let c;
                let h;
                if (i.useUniqueIDs) {
                  h = s[r];
                  c = e.GetAttributeByUniqueId(o, h);
                } else {
                  h = e.GetAttributeId(o, t[s[r]]);
                  if (h === -1) {
                    continue;
                  }
                  c = e.GetAttribute(o, h);
                }
                u.attributes.push(n(t, e, o, r, l, c));
              }
              if (c === t.TRIANGULAR_MESH) {
                u.index = function (t, e, n) {
                  const r = n.num_faces() * 3;
                  const i = r * 4;
                  const s = t._malloc(i);
                  e.GetTrianglesUInt32Array(n, i, s);
                  const a = new Uint32Array(t.HEAPF32.buffer, s, r).slice();
                  t._free(s);
                  return {
                    array: a,
                    itemSize: 1
                  };
                }(t, e, o);
              }
              t.destroy(o);
              return u;
            }(e, a, o, s);
            const r = t.attributes.map(t => t.array.buffer);
            if (t.index) {
              r.push(t.index.array.buffer);
            }
            self.postMessage({
              type: "decode",
              id: i.id,
              geometry: t
            }, r);
          } catch (t) {
            console.error(t);
            self.postMessage({
              type: "error",
              id: i.id,
              error: t.message
            });
          } finally {
            e.destroy(o);
            e.destroy(a);
          }
        });
    }
  };
}