var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  l: function () {
    return s;
  }
});
var r = require("./4164.cjs");
var i = require("./1661.cjs");
class s extends r.F {
  constructor(t) {
    super();
    this.type = "MeshDepthMaterial";
    this.depthPacking = i.z81;
    this.map = null;
    this.alphaMap = null;
    this.displacementMap = null;
    this.displacementScale = 1;
    this.displacementBias = 0;
    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.fog = false;
    this.setValues(t);
  }
  copy(t) {
    super.copy(t);
    this.depthPacking = t.depthPacking;
    this.map = t.map;
    this.alphaMap = t.alphaMap;
    this.displacementMap = t.displacementMap;
    this.displacementScale = t.displacementScale;
    this.displacementBias = t.displacementBias;
    this.wireframe = t.wireframe;
    this.wireframeLinewidth = t.wireframeLinewidth;
    return this;
  }
}
s.prototype.isMeshDepthMaterial = true;