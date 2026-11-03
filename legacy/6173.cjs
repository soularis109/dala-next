var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  v: function () {
    return a;
  }
});
var r = require("./4164.cjs");
var i = require("./1661.cjs");
var s = require("./3662.cjs");
class a extends r.F {
  constructor(t) {
    super();
    this.type = "MeshBasicMaterial";
    this.color = new s.I(16777215);
    this.map = null;
    this.lightMap = null;
    this.lightMapIntensity = 1;
    this.aoMap = null;
    this.aoMapIntensity = 1;
    this.specularMap = null;
    this.alphaMap = null;
    this.envMap = null;
    this.combine = i.Ns1;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;
    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.wireframeLinecap = "round";
    this.wireframeLinejoin = "round";
    this.setValues(t);
  }
  copy(t) {
    super.copy(t);
    this.color.copy(t.color);
    this.map = t.map;
    this.lightMap = t.lightMap;
    this.lightMapIntensity = t.lightMapIntensity;
    this.aoMap = t.aoMap;
    this.aoMapIntensity = t.aoMapIntensity;
    this.specularMap = t.specularMap;
    this.alphaMap = t.alphaMap;
    this.envMap = t.envMap;
    this.combine = t.combine;
    this.reflectivity = t.reflectivity;
    this.refractionRatio = t.refractionRatio;
    this.wireframe = t.wireframe;
    this.wireframeLinewidth = t.wireframeLinewidth;
    this.wireframeLinecap = t.wireframeLinecap;
    this.wireframeLinejoin = t.wireframeLinejoin;
    return this;
  }
}
a.prototype.isMeshBasicMaterial = true;