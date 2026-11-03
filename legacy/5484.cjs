var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  m: function () {
    return p;
  }
});
var r = require("./1138.cjs");
var i = require("./3662.cjs");
var s = require("./1661.cjs");
var a = require("./4302.cjs");
var o = require("./6682.cjs");
var l = require("./4595.cjs");
var c = require("./6881.cjs");
var u = require("./6173.cjs");
var h = require("./8304.cjs");
var d = require("./1154.cjs");
const f = {
  shaderID: "luminosityHighPass",
  uniforms: {
    tDiffuse: {
      value: null
    },
    luminosityThreshold: {
      value: 1
    },
    smoothWidth: {
      value: 1
    },
    defaultColor: {
      value: new i.I(0)
    },
    defaultOpacity: {
      value: 0
    }
  },
  vertexShader: "\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",
  fragmentShader: "\n\n\t\tuniform sampler2D tDiffuse;\n\t\tuniform vec3 defaultColor;\n\t\tuniform float defaultOpacity;\n\t\tuniform float luminosityThreshold;\n\t\tuniform float smoothWidth;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\n\n\t\t\tvec3 luma = vec3( 0.299, 0.587, 0.114 );\n\n\t\t\tfloat v = dot( texel.xyz, luma );\n\n\t\t\tvec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );\n\n\t\t\tfloat alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );\n\n\t\t\tgl_FragColor = mix( outputColor, texel, alpha );\n\n\t\t}"
};
class p extends h.w {
  constructor(t, e, n, p) {
    super();
    this.strength = e !== undefined ? e : 1;
    this.radius = n;
    this.threshold = p;
    this.resolution = t !== undefined ? new r.F(t.x, t.y) : new r.F(256, 256);
    this.clearColor = new i.I(0, 0, 0);
    const m = {
      minFilter: s.wem,
      magFilter: s.wem,
      format: s.wk1
    };
    this.renderTargetsHorizontal = [];
    this.renderTargetsVertical = [];
    this.nMips = 5;
    let g = Math.round(this.resolution.x / 2);
    let v = Math.round(this.resolution.y / 2);
    this.renderTargetBright = new a.d(g, v, m);
    this.renderTargetBright.texture.name = "UnrealBloomPass.bright";
    this.renderTargetBright.texture.generateMipmaps = false;
    for (let t = 0; t < this.nMips; t++) {
      const e = new a.d(g, v, m);
      e.texture.name = "UnrealBloomPass.h" + t;
      e.texture.generateMipmaps = false;
      this.renderTargetsHorizontal.push(e);
      const n = new a.d(g, v, m);
      n.texture.name = "UnrealBloomPass.v" + t;
      n.texture.generateMipmaps = false;
      this.renderTargetsVertical.push(n);
      g = Math.round(g / 2);
      v = Math.round(v / 2);
    }
    if (f === undefined) {
      console.error("THREE.UnrealBloomPass relies on LuminosityHighPassShader");
    }
    const _ = f;
    this.highPassUniforms = o.rD.clone(_.uniforms);
    this.highPassUniforms.luminosityThreshold.value = p;
    this.highPassUniforms.smoothWidth.value = 0.01;
    this.materialHighPassFilter = new l.j({
      uniforms: this.highPassUniforms,
      vertexShader: _.vertexShader,
      fragmentShader: _.fragmentShader,
      defines: {}
    });
    this.separableBlurMaterials = [];
    const x = [3, 5, 7, 9, 11];
    g = Math.round(this.resolution.x / 2);
    v = Math.round(this.resolution.y / 2);
    for (let t = 0; t < this.nMips; t++) {
      this.separableBlurMaterials.push(this.getSeperableBlurMaterial(x[t]));
      this.separableBlurMaterials[t].uniforms.texSize.value = new r.F(g, v);
      g = Math.round(g / 2);
      v = Math.round(v / 2);
    }
    this.compositeMaterial = this.getCompositeMaterial(this.nMips);
    this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture;
    this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture;
    this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture;
    this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture;
    this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture;
    this.compositeMaterial.uniforms.bloomStrength.value = e;
    this.compositeMaterial.uniforms.bloomRadius.value = 0.1;
    this.compositeMaterial.needsUpdate = true;
    this.compositeMaterial.uniforms.bloomFactors.value = [1, 0.8, 0.6, 0.4, 0.2];
    this.bloomTintColors = [new c.P(1, 1, 1), new c.P(1, 1, 1), new c.P(1, 1, 1), new c.P(1, 1, 1), new c.P(1, 1, 1)];
    this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors;
    if (d.C === undefined) {
      console.error("THREE.UnrealBloomPass relies on CopyShader");
    }
    const y = d.C;
    this.copyUniforms = o.rD.clone(y.uniforms);
    this.copyUniforms.opacity.value = 1;
    this.materialCopy = new l.j({
      uniforms: this.copyUniforms,
      vertexShader: y.vertexShader,
      fragmentShader: y.fragmentShader,
      blending: s.WMw,
      depthTest: false,
      depthWrite: false,
      transparent: true
    });
    this.enabled = true;
    this.needsSwap = false;
    this._oldClearColor = new i.I();
    this.oldClearAlpha = 1;
    this.basic = new u.v();
    this.fsQuad = new h.T(null);
  }
  dispose() {
    for (let t = 0; t < this.renderTargetsHorizontal.length; t++) {
      this.renderTargetsHorizontal[t].dispose();
    }
    for (let t = 0; t < this.renderTargetsVertical.length; t++) {
      this.renderTargetsVertical[t].dispose();
    }
    this.renderTargetBright.dispose();
  }
  setSize(t, e) {
    let n = Math.round(t / 2);
    let i = Math.round(e / 2);
    this.renderTargetBright.setSize(n, i);
    for (let t = 0; t < this.nMips; t++) {
      this.renderTargetsHorizontal[t].setSize(n, i);
      this.renderTargetsVertical[t].setSize(n, i);
      this.separableBlurMaterials[t].uniforms.texSize.value = new r.F(n, i);
      n = Math.round(n / 2);
      i = Math.round(i / 2);
    }
  }
  render(t, e, n, r, i) {
    t.getClearColor(this._oldClearColor);
    this.oldClearAlpha = t.getClearAlpha();
    const s = t.autoClear;
    t.autoClear = false;
    t.setClearColor(this.clearColor, 0);
    if (i) {
      t.state.buffers.stencil.setTest(false);
    }
    if (this.renderToScreen) {
      this.fsQuad.material = this.basic;
      this.basic.map = n.texture;
      t.setRenderTarget(null);
      t.clear();
      this.fsQuad.render(t);
    }
    this.highPassUniforms.tDiffuse.value = n.texture;
    this.highPassUniforms.luminosityThreshold.value = this.threshold;
    this.fsQuad.material = this.materialHighPassFilter;
    t.setRenderTarget(this.renderTargetBright);
    t.clear();
    this.fsQuad.render(t);
    let a = this.renderTargetBright;
    for (let e = 0; e < this.nMips; e++) {
      this.fsQuad.material = this.separableBlurMaterials[e];
      this.separableBlurMaterials[e].uniforms.colorTexture.value = a.texture;
      this.separableBlurMaterials[e].uniforms.direction.value = p.BlurDirectionX;
      t.setRenderTarget(this.renderTargetsHorizontal[e]);
      t.clear();
      this.fsQuad.render(t);
      this.separableBlurMaterials[e].uniforms.colorTexture.value = this.renderTargetsHorizontal[e].texture;
      this.separableBlurMaterials[e].uniforms.direction.value = p.BlurDirectionY;
      t.setRenderTarget(this.renderTargetsVertical[e]);
      t.clear();
      this.fsQuad.render(t);
      a = this.renderTargetsVertical[e];
    }
    this.fsQuad.material = this.compositeMaterial;
    this.compositeMaterial.uniforms.bloomStrength.value = this.strength;
    this.compositeMaterial.uniforms.bloomRadius.value = this.radius;
    this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors;
    t.setRenderTarget(this.renderTargetsHorizontal[0]);
    t.clear();
    this.fsQuad.render(t);
    this.fsQuad.material = this.materialCopy;
    this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture;
    if (i) {
      t.state.buffers.stencil.setTest(true);
    }
    if (this.renderToScreen) {
      t.setRenderTarget(null);
      this.fsQuad.render(t);
    } else {
      t.setRenderTarget(n);
      this.fsQuad.render(t);
    }
    t.setClearColor(this._oldClearColor, this.oldClearAlpha);
    t.autoClear = s;
  }
  getSeperableBlurMaterial(t) {
    return new l.j({
      defines: {
        KERNEL_RADIUS: t,
        SIGMA: t
      },
      uniforms: {
        colorTexture: {
          value: null
        },
        texSize: {
          value: new r.F(0.5, 0.5)
        },
        direction: {
          value: new r.F(0.5, 0.5)
        }
      },
      vertexShader: "varying vec2 vUv;\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",
      fragmentShader: "#include <common>\n\t\t\t\tvarying vec2 vUv;\n\t\t\t\tuniform sampler2D colorTexture;\n\t\t\t\tuniform vec2 texSize;\n\t\t\t\tuniform vec2 direction;\n\n\t\t\t\tfloat gaussianPdf(in float x, in float sigma) {\n\t\t\t\t\treturn 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;\n\t\t\t\t}\n\t\t\t\tvoid main() {\n\t\t\t\t\tvec2 invSize = 1.0 / texSize;\n\t\t\t\t\tfloat fSigma = float(SIGMA);\n\t\t\t\t\tfloat weightSum = gaussianPdf(0.0, fSigma);\n\t\t\t\t\tvec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;\n\t\t\t\t\tfor( int i = 1; i < KERNEL_RADIUS; i ++ ) {\n\t\t\t\t\t\tfloat x = float(i);\n\t\t\t\t\t\tfloat w = gaussianPdf(x, fSigma);\n\t\t\t\t\t\tvec2 uvOffset = direction * invSize * x;\n\t\t\t\t\t\tvec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;\n\t\t\t\t\t\tvec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;\n\t\t\t\t\t\tdiffuseSum += (sample1 + sample2) * w;\n\t\t\t\t\t\tweightSum += 2.0 * w;\n\t\t\t\t\t}\n\t\t\t\t\tgl_FragColor = vec4(diffuseSum/weightSum, 1.0);\n\t\t\t\t}"
    });
  }
  getCompositeMaterial(t) {
    return new l.j({
      defines: {
        NUM_MIPS: t
      },
      uniforms: {
        blurTexture1: {
          value: null
        },
        blurTexture2: {
          value: null
        },
        blurTexture3: {
          value: null
        },
        blurTexture4: {
          value: null
        },
        blurTexture5: {
          value: null
        },
        dirtTexture: {
          value: null
        },
        bloomStrength: {
          value: 1
        },
        bloomFactors: {
          value: null
        },
        bloomTintColors: {
          value: null
        },
        bloomRadius: {
          value: 0
        }
      },
      vertexShader: "varying vec2 vUv;\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",
      fragmentShader: "varying vec2 vUv;\n\t\t\t\tuniform sampler2D blurTexture1;\n\t\t\t\tuniform sampler2D blurTexture2;\n\t\t\t\tuniform sampler2D blurTexture3;\n\t\t\t\tuniform sampler2D blurTexture4;\n\t\t\t\tuniform sampler2D blurTexture5;\n\t\t\t\tuniform sampler2D dirtTexture;\n\t\t\t\tuniform float bloomStrength;\n\t\t\t\tuniform float bloomRadius;\n\t\t\t\tuniform float bloomFactors[NUM_MIPS];\n\t\t\t\tuniform vec3 bloomTintColors[NUM_MIPS];\n\n\t\t\t\tfloat lerpBloomFactor(const in float factor) {\n\t\t\t\t\tfloat mirrorFactor = 1.2 - factor;\n\t\t\t\t\treturn mix(factor, mirrorFactor, bloomRadius);\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tgl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );\n\t\t\t\t}"
    });
  }
}
p.BlurDirectionX = new r.F(1, 0);
p.BlurDirectionY = new r.F(0, 1);