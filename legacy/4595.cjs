var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  j: function () {
    return s;
  }
});
var r = require("./4164.cjs");
var i = require("./6682.cjs");
class s extends r.F {
  constructor(t) {
    super();
    this.type = "ShaderMaterial";
    this.defines = {};
    this.uniforms = {};
    this.vertexShader = "\nvoid main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n";
    this.fragmentShader = "\nvoid main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}\n";
    this.linewidth = 1;
    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.fog = false;
    this.lights = false;
    this.clipping = false;
    this.extensions = {
      derivatives: false,
      fragDepth: false,
      drawBuffers: false,
      shaderTextureLOD: false
    };
    this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv2: [0, 0]
    };
    this.index0AttributeName = undefined;
    this.uniformsNeedUpdate = false;
    this.glslVersion = null;
    if (t !== undefined) {
      if (t.attributes !== undefined) {
        console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead.");
      }
      this.setValues(t);
    }
  }
  copy(t) {
    super.copy(t);
    this.fragmentShader = t.fragmentShader;
    this.vertexShader = t.vertexShader;
    this.uniforms = (0, i.dw)(t.uniforms);
    this.defines = Object.assign({}, t.defines);
    this.wireframe = t.wireframe;
    this.wireframeLinewidth = t.wireframeLinewidth;
    this.lights = t.lights;
    this.clipping = t.clipping;
    this.extensions = Object.assign({}, t.extensions);
    this.glslVersion = t.glslVersion;
    return this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    e.glslVersion = this.glslVersion;
    e.uniforms = {};
    for (const n in this.uniforms) {
      const r = this.uniforms[n].value;
      if (r && r.isTexture) {
        e.uniforms[n] = {
          type: "t",
          value: r.toJSON(t).uuid
        };
      } else if (r && r.isColor) {
        e.uniforms[n] = {
          type: "c",
          value: r.getHex()
        };
      } else if (r && r.isVector2) {
        e.uniforms[n] = {
          type: "v2",
          value: r.toArray()
        };
      } else if (r && r.isVector3) {
        e.uniforms[n] = {
          type: "v3",
          value: r.toArray()
        };
      } else if (r && r.isVector4) {
        e.uniforms[n] = {
          type: "v4",
          value: r.toArray()
        };
      } else if (r && r.isMatrix3) {
        e.uniforms[n] = {
          type: "m3",
          value: r.toArray()
        };
      } else if (r && r.isMatrix4) {
        e.uniforms[n] = {
          type: "m4",
          value: r.toArray()
        };
      } else {
        e.uniforms[n] = {
          value: r
        };
      }
    }
    if (Object.keys(this.defines).length > 0) {
      e.defines = this.defines;
    }
    e.vertexShader = this.vertexShader;
    e.fragmentShader = this.fragmentShader;
    const n = {};
    for (const t in this.extensions) {
      if (this.extensions[t] === true) {
        n[t] = true;
      }
    }
    if (Object.keys(n).length > 0) {
      e.extensions = n;
    }
    return e;
  }
}
s.prototype.isShaderMaterial = true;