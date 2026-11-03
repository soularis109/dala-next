var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  x: function () {
    return u;
  }
});
var r = require("./7406.cjs");
var i = require("./1661.cjs");
var s = require("./2043.cjs");
var a = require("./1138.cjs");
var o = require("./1273.cjs");
let l;
let c = 0;
class u extends r.p {
  constructor(t = u.DEFAULT_IMAGE, e = u.DEFAULT_MAPPING, n = i.uWy, r = i.uWy, l = i.wem, h = i.D1R, d = i.wk1, f = i.ywz, p = 1, m = i.rnI) {
    super();
    Object.defineProperty(this, "id", {
      value: c++
    });
    this.uuid = s.DO();
    this.name = "";
    this.image = t;
    this.mipmaps = [];
    this.mapping = e;
    this.wrapS = n;
    this.wrapT = r;
    this.magFilter = l;
    this.minFilter = h;
    this.anisotropy = p;
    this.format = d;
    this.internalFormat = null;
    this.type = f;
    this.offset = new a.F(0, 0);
    this.repeat = new a.F(1, 1);
    this.center = new a.F(0, 0);
    this.rotation = 0;
    this.matrixAutoUpdate = true;
    this.matrix = new o.V();
    this.generateMipmaps = true;
    this.premultiplyAlpha = false;
    this.flipY = true;
    this.unpackAlignment = 4;
    this.encoding = m;
    this.version = 0;
    this.onUpdate = null;
    this.isRenderTargetTexture = false;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.name = t.name;
    this.image = t.image;
    this.mipmaps = t.mipmaps.slice(0);
    this.mapping = t.mapping;
    this.wrapS = t.wrapS;
    this.wrapT = t.wrapT;
    this.magFilter = t.magFilter;
    this.minFilter = t.minFilter;
    this.anisotropy = t.anisotropy;
    this.format = t.format;
    this.internalFormat = t.internalFormat;
    this.type = t.type;
    this.offset.copy(t.offset);
    this.repeat.copy(t.repeat);
    this.center.copy(t.center);
    this.rotation = t.rotation;
    this.matrixAutoUpdate = t.matrixAutoUpdate;
    this.matrix.copy(t.matrix);
    this.generateMipmaps = t.generateMipmaps;
    this.premultiplyAlpha = t.premultiplyAlpha;
    this.flipY = t.flipY;
    this.unpackAlignment = t.unpackAlignment;
    this.encoding = t.encoding;
    return this;
  }
  toJSON(t) {
    const e = t === undefined || typeof t == "string";
    if (!e && t.textures[this.uuid] !== undefined) {
      return t.textures[this.uuid];
    }
    const n = {
      metadata: {
        version: 4.5,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      mapping: this.mapping,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      type: this.type,
      encoding: this.encoding,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    if (this.image !== undefined) {
      const r = this.image;
      if (r.uuid === undefined) {
        r.uuid = s.DO();
      }
      if (!e && t.images[r.uuid] === undefined) {
        let e;
        if (Array.isArray(r)) {
          e = [];
          for (let t = 0, n = r.length; t < n; t++) {
            if (r[t].isDataTexture) {
              e.push(h(r[t].image));
            } else {
              e.push(h(r[t]));
            }
          }
        } else {
          e = h(r);
        }
        t.images[r.uuid] = {
          uuid: r.uuid,
          url: e
        };
      }
      n.image = r.uuid;
    }
    if (!e) {
      t.textures[this.uuid] = n;
    }
    return n;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
  transformUv(t) {
    if (this.mapping !== i.xfE) {
      return t;
    }
    t.applyMatrix3(this.matrix);
    if (t.x < 0 || t.x > 1) {
      switch (this.wrapS) {
        case i.rpg:
          t.x = t.x - Math.floor(t.x);
          break;
        case i.uWy:
          t.x = t.x < 0 ? 0 : 1;
          break;
        case i.OoA:
          if (Math.abs(Math.floor(t.x) % 2) === 1) {
            t.x = Math.ceil(t.x) - t.x;
          } else {
            t.x = t.x - Math.floor(t.x);
          }
      }
    }
    if (t.y < 0 || t.y > 1) {
      switch (this.wrapT) {
        case i.rpg:
          t.y = t.y - Math.floor(t.y);
          break;
        case i.uWy:
          t.y = t.y < 0 ? 0 : 1;
          break;
        case i.OoA:
          if (Math.abs(Math.floor(t.y) % 2) === 1) {
            t.y = Math.ceil(t.y) - t.y;
          } else {
            t.y = t.y - Math.floor(t.y);
          }
      }
    }
    if (this.flipY) {
      t.y = 1 - t.y;
    }
    return t;
  }
  set needsUpdate(t) {
    if (t === true) {
      this.version++;
    }
  }
}
function h(t) {
  if (typeof HTMLImageElement != "undefined" && t instanceof HTMLImageElement || typeof HTMLCanvasElement != "undefined" && t instanceof HTMLCanvasElement || typeof ImageBitmap != "undefined" && t instanceof ImageBitmap) {
    return class {
      static getDataURL(t) {
        if (/^data:/i.test(t.src)) {
          return t.src;
        }
        if (typeof HTMLCanvasElement == "undefined") {
          return t.src;
        }
        let e;
        if (t instanceof HTMLCanvasElement) {
          e = t;
        } else {
          if (l === undefined) {
            l = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
          }
          l.width = t.width;
          l.height = t.height;
          const n = l.getContext("2d");
          if (t instanceof ImageData) {
            n.putImageData(t, 0, 0);
          } else {
            n.drawImage(t, 0, 0, t.width, t.height);
          }
          e = l;
        }
        if (e.width > 2048 || e.height > 2048) {
          console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", t);
          return e.toDataURL("image/jpeg", 0.6);
        } else {
          return e.toDataURL("image/png");
        }
      }
    }.getDataURL(t);
  } else if (t.data) {
    return {
      data: Array.prototype.slice.call(t.data),
      width: t.width,
      height: t.height,
      type: t.data.constructor.name
    };
  } else {
    console.warn("THREE.Texture: Unable to serialize Texture.");
    return {};
  }
}
u.DEFAULT_IMAGE = undefined;
u.DEFAULT_MAPPING = i.xfE;
u.prototype.isTexture = true;