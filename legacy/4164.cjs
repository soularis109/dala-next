var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  F: function () {
    return o;
  }
});
var r = require("./7406.cjs");
var i = require("./1661.cjs");
var s = require("./2043.cjs");
let a = 0;
class o extends r.p {
  constructor() {
    super();
    Object.defineProperty(this, "id", {
      value: a++
    });
    this.uuid = s.DO();
    this.name = "";
    this.type = "Material";
    this.fog = true;
    this.blending = i.bdR;
    this.side = i.Wl3;
    this.vertexColors = false;
    this.opacity = 1;
    this.format = i.wk1;
    this.transparent = false;
    this.blendSrc = i.k74;
    this.blendDst = i.LgZ;
    this.blendEquation = i.bGH;
    this.blendSrcAlpha = null;
    this.blendDstAlpha = null;
    this.blendEquationAlpha = null;
    this.depthFunc = i.vCF;
    this.depthTest = true;
    this.depthWrite = true;
    this.stencilWriteMask = 255;
    this.stencilFunc = i.cum;
    this.stencilRef = 0;
    this.stencilFuncMask = 255;
    this.stencilFail = i.x5V;
    this.stencilZFail = i.x5V;
    this.stencilZPass = i.x5V;
    this.stencilWrite = false;
    this.clippingPlanes = null;
    this.clipIntersection = false;
    this.clipShadows = false;
    this.shadowSide = null;
    this.colorWrite = true;
    this.precision = null;
    this.polygonOffset = false;
    this.polygonOffsetFactor = 0;
    this.polygonOffsetUnits = 0;
    this.dithering = false;
    this.alphaToCoverage = false;
    this.premultipliedAlpha = false;
    this.visible = true;
    this.toneMapped = true;
    this.userData = {};
    this.version = 0;
    this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(t) {
    if (this._alphaTest > 0 != t > 0) {
      this.version++;
    }
    this._alphaTest = t;
  }
  onBuild() {}
  onBeforeCompile() {}
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(t) {
    if (t !== undefined) {
      for (const e in t) {
        const n = t[e];
        if (n === undefined) {
          console.warn("THREE.Material: '" + e + "' parameter is undefined.");
          continue;
        }
        if (e === "shading") {
          console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead.");
          this.flatShading = n === i.esl;
          continue;
        }
        const r = this[e];
        if (r !== undefined) {
          if (r && r.isColor) {
            r.set(n);
          } else if (r && r.isVector3 && n && n.isVector3) {
            r.copy(n);
          } else {
            this[e] = n;
          }
        } else {
          console.warn("THREE." + this.type + ": '" + e + "' is not a property of this material.");
        }
      }
    }
  }
  toJSON(t) {
    const e = t === undefined || typeof t == "string";
    if (e) {
      t = {
        textures: {},
        images: {}
      };
    }
    const n = {
      metadata: {
        version: 4.5,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    function r(t) {
      const e = [];
      for (const n in t) {
        const r = t[n];
        delete r.metadata;
        e.push(r);
      }
      return e;
    }
    n.uuid = this.uuid;
    n.type = this.type;
    if (this.name !== "") {
      n.name = this.name;
    }
    if (this.color && this.color.isColor) {
      n.color = this.color.getHex();
    }
    if (this.roughness !== undefined) {
      n.roughness = this.roughness;
    }
    if (this.metalness !== undefined) {
      n.metalness = this.metalness;
    }
    if (this.sheenTint && this.sheenTint.isColor) {
      n.sheenTint = this.sheenTint.getHex();
    }
    if (this.emissive && this.emissive.isColor) {
      n.emissive = this.emissive.getHex();
    }
    if (this.emissiveIntensity && this.emissiveIntensity !== 1) {
      n.emissiveIntensity = this.emissiveIntensity;
    }
    if (this.specular && this.specular.isColor) {
      n.specular = this.specular.getHex();
    }
    if (this.specularIntensity !== undefined) {
      n.specularIntensity = this.specularIntensity;
    }
    if (this.specularTint && this.specularTint.isColor) {
      n.specularTint = this.specularTint.getHex();
    }
    if (this.shininess !== undefined) {
      n.shininess = this.shininess;
    }
    if (this.clearcoat !== undefined) {
      n.clearcoat = this.clearcoat;
    }
    if (this.clearcoatRoughness !== undefined) {
      n.clearcoatRoughness = this.clearcoatRoughness;
    }
    if (this.clearcoatMap && this.clearcoatMap.isTexture) {
      n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid;
    }
    if (this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture) {
      n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid;
    }
    if (this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture) {
      n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid;
      n.clearcoatNormalScale = this.clearcoatNormalScale.toArray();
    }
    if (this.map && this.map.isTexture) {
      n.map = this.map.toJSON(t).uuid;
    }
    if (this.matcap && this.matcap.isTexture) {
      n.matcap = this.matcap.toJSON(t).uuid;
    }
    if (this.alphaMap && this.alphaMap.isTexture) {
      n.alphaMap = this.alphaMap.toJSON(t).uuid;
    }
    if (this.lightMap && this.lightMap.isTexture) {
      n.lightMap = this.lightMap.toJSON(t).uuid;
      n.lightMapIntensity = this.lightMapIntensity;
    }
    if (this.aoMap && this.aoMap.isTexture) {
      n.aoMap = this.aoMap.toJSON(t).uuid;
      n.aoMapIntensity = this.aoMapIntensity;
    }
    if (this.bumpMap && this.bumpMap.isTexture) {
      n.bumpMap = this.bumpMap.toJSON(t).uuid;
      n.bumpScale = this.bumpScale;
    }
    if (this.normalMap && this.normalMap.isTexture) {
      n.normalMap = this.normalMap.toJSON(t).uuid;
      n.normalMapType = this.normalMapType;
      n.normalScale = this.normalScale.toArray();
    }
    if (this.displacementMap && this.displacementMap.isTexture) {
      n.displacementMap = this.displacementMap.toJSON(t).uuid;
      n.displacementScale = this.displacementScale;
      n.displacementBias = this.displacementBias;
    }
    if (this.roughnessMap && this.roughnessMap.isTexture) {
      n.roughnessMap = this.roughnessMap.toJSON(t).uuid;
    }
    if (this.metalnessMap && this.metalnessMap.isTexture) {
      n.metalnessMap = this.metalnessMap.toJSON(t).uuid;
    }
    if (this.emissiveMap && this.emissiveMap.isTexture) {
      n.emissiveMap = this.emissiveMap.toJSON(t).uuid;
    }
    if (this.specularMap && this.specularMap.isTexture) {
      n.specularMap = this.specularMap.toJSON(t).uuid;
    }
    if (this.specularIntensityMap && this.specularIntensityMap.isTexture) {
      n.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid;
    }
    if (this.specularTintMap && this.specularTintMap.isTexture) {
      n.specularTintMap = this.specularTintMap.toJSON(t).uuid;
    }
    if (this.envMap && this.envMap.isTexture) {
      n.envMap = this.envMap.toJSON(t).uuid;
      if (this.combine !== undefined) {
        n.combine = this.combine;
      }
    }
    if (this.envMapIntensity !== undefined) {
      n.envMapIntensity = this.envMapIntensity;
    }
    if (this.reflectivity !== undefined) {
      n.reflectivity = this.reflectivity;
    }
    if (this.refractionRatio !== undefined) {
      n.refractionRatio = this.refractionRatio;
    }
    if (this.gradientMap && this.gradientMap.isTexture) {
      n.gradientMap = this.gradientMap.toJSON(t).uuid;
    }
    if (this.transmission !== undefined) {
      n.transmission = this.transmission;
    }
    if (this.transmissionMap && this.transmissionMap.isTexture) {
      n.transmissionMap = this.transmissionMap.toJSON(t).uuid;
    }
    if (this.thickness !== undefined) {
      n.thickness = this.thickness;
    }
    if (this.thicknessMap && this.thicknessMap.isTexture) {
      n.thicknessMap = this.thicknessMap.toJSON(t).uuid;
    }
    if (this.attenuationDistance !== undefined) {
      n.attenuationDistance = this.attenuationDistance;
    }
    if (this.attenuationTint !== undefined) {
      n.attenuationTint = this.attenuationTint.getHex();
    }
    if (this.size !== undefined) {
      n.size = this.size;
    }
    if (this.shadowSide !== null) {
      n.shadowSide = this.shadowSide;
    }
    if (this.sizeAttenuation !== undefined) {
      n.sizeAttenuation = this.sizeAttenuation;
    }
    if (this.blending !== i.bdR) {
      n.blending = this.blending;
    }
    if (this.side !== i.Wl3) {
      n.side = this.side;
    }
    if (this.vertexColors) {
      n.vertexColors = true;
    }
    if (this.opacity < 1) {
      n.opacity = this.opacity;
    }
    if (this.format !== i.wk1) {
      n.format = this.format;
    }
    if (this.transparent === true) {
      n.transparent = this.transparent;
    }
    n.depthFunc = this.depthFunc;
    n.depthTest = this.depthTest;
    n.depthWrite = this.depthWrite;
    n.colorWrite = this.colorWrite;
    n.stencilWrite = this.stencilWrite;
    n.stencilWriteMask = this.stencilWriteMask;
    n.stencilFunc = this.stencilFunc;
    n.stencilRef = this.stencilRef;
    n.stencilFuncMask = this.stencilFuncMask;
    n.stencilFail = this.stencilFail;
    n.stencilZFail = this.stencilZFail;
    n.stencilZPass = this.stencilZPass;
    if (this.rotation && this.rotation !== 0) {
      n.rotation = this.rotation;
    }
    if (this.polygonOffset === true) {
      n.polygonOffset = true;
    }
    if (this.polygonOffsetFactor !== 0) {
      n.polygonOffsetFactor = this.polygonOffsetFactor;
    }
    if (this.polygonOffsetUnits !== 0) {
      n.polygonOffsetUnits = this.polygonOffsetUnits;
    }
    if (this.linewidth && this.linewidth !== 1) {
      n.linewidth = this.linewidth;
    }
    if (this.dashSize !== undefined) {
      n.dashSize = this.dashSize;
    }
    if (this.gapSize !== undefined) {
      n.gapSize = this.gapSize;
    }
    if (this.scale !== undefined) {
      n.scale = this.scale;
    }
    if (this.dithering === true) {
      n.dithering = true;
    }
    if (this.alphaTest > 0) {
      n.alphaTest = this.alphaTest;
    }
    if (this.alphaToCoverage === true) {
      n.alphaToCoverage = this.alphaToCoverage;
    }
    if (this.premultipliedAlpha === true) {
      n.premultipliedAlpha = this.premultipliedAlpha;
    }
    if (this.wireframe === true) {
      n.wireframe = this.wireframe;
    }
    if (this.wireframeLinewidth > 1) {
      n.wireframeLinewidth = this.wireframeLinewidth;
    }
    if (this.wireframeLinecap !== "round") {
      n.wireframeLinecap = this.wireframeLinecap;
    }
    if (this.wireframeLinejoin !== "round") {
      n.wireframeLinejoin = this.wireframeLinejoin;
    }
    if (this.flatShading === true) {
      n.flatShading = this.flatShading;
    }
    if (this.visible === false) {
      n.visible = false;
    }
    if (this.toneMapped === false) {
      n.toneMapped = false;
    }
    if (JSON.stringify(this.userData) !== "{}") {
      n.userData = this.userData;
    }
    if (e) {
      const e = r(t.textures);
      const i = r(t.images);
      if (e.length > 0) {
        n.textures = e;
      }
      if (i.length > 0) {
        n.images = i;
      }
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.name = t.name;
    this.fog = t.fog;
    this.blending = t.blending;
    this.side = t.side;
    this.vertexColors = t.vertexColors;
    this.opacity = t.opacity;
    this.format = t.format;
    this.transparent = t.transparent;
    this.blendSrc = t.blendSrc;
    this.blendDst = t.blendDst;
    this.blendEquation = t.blendEquation;
    this.blendSrcAlpha = t.blendSrcAlpha;
    this.blendDstAlpha = t.blendDstAlpha;
    this.blendEquationAlpha = t.blendEquationAlpha;
    this.depthFunc = t.depthFunc;
    this.depthTest = t.depthTest;
    this.depthWrite = t.depthWrite;
    this.stencilWriteMask = t.stencilWriteMask;
    this.stencilFunc = t.stencilFunc;
    this.stencilRef = t.stencilRef;
    this.stencilFuncMask = t.stencilFuncMask;
    this.stencilFail = t.stencilFail;
    this.stencilZFail = t.stencilZFail;
    this.stencilZPass = t.stencilZPass;
    this.stencilWrite = t.stencilWrite;
    const e = t.clippingPlanes;
    let n = null;
    if (e !== null) {
      const t = e.length;
      n = new Array(t);
      for (let r = 0; r !== t; ++r) {
        n[r] = e[r].clone();
      }
    }
    this.clippingPlanes = n;
    this.clipIntersection = t.clipIntersection;
    this.clipShadows = t.clipShadows;
    this.shadowSide = t.shadowSide;
    this.colorWrite = t.colorWrite;
    this.precision = t.precision;
    this.polygonOffset = t.polygonOffset;
    this.polygonOffsetFactor = t.polygonOffsetFactor;
    this.polygonOffsetUnits = t.polygonOffsetUnits;
    this.dithering = t.dithering;
    this.alphaTest = t.alphaTest;
    this.alphaToCoverage = t.alphaToCoverage;
    this.premultipliedAlpha = t.premultipliedAlpha;
    this.visible = t.visible;
    this.toneMapped = t.toneMapped;
    this.userData = JSON.parse(JSON.stringify(t.userData));
    return this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
  set needsUpdate(t) {
    if (t === true) {
      this.version++;
    }
  }
}
o.prototype.isMaterial = true;