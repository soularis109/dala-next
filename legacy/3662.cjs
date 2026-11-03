var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  I: function () {
    return u;
  }
});
var r = require("./2043.cjs");
const i = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
const s = {
  h: 0,
  s: 0,
  l: 0
};
const a = {
  h: 0,
  s: 0,
  l: 0
};
function o(t, e, n) {
  if (n < 0) {
    n += 1;
  }
  if (n > 1) {
    n -= 1;
  }
  if (n < 1 / 6) {
    return t + (e - t) * 6 * n;
  } else if (n < 0.5) {
    return e;
  } else if (n < 2 / 3) {
    return t + (e - t) * 6 * (2 / 3 - n);
  } else {
    return t;
  }
}
function l(t) {
  if (t < 0.04045) {
    return t * 0.0773993808;
  } else {
    return Math.pow(t * 0.9478672986 + 0.0521327014, 2.4);
  }
}
function c(t) {
  if (t < 0.0031308) {
    return t * 12.92;
  } else {
    return Math.pow(t, 0.41666) * 1.055 - 0.055;
  }
}
class u {
  constructor(t, e, n) {
    if (e === undefined && n === undefined) {
      return this.set(t);
    } else {
      return this.setRGB(t, e, n);
    }
  }
  set(t) {
    if (t && t.isColor) {
      this.copy(t);
    } else if (typeof t == "number") {
      this.setHex(t);
    } else if (typeof t == "string") {
      this.setStyle(t);
    }
    return this;
  }
  setScalar(t) {
    this.r = t;
    this.g = t;
    this.b = t;
    return this;
  }
  setHex(t) {
    t = Math.floor(t);
    this.r = (t >> 16 & 255) / 255;
    this.g = (t >> 8 & 255) / 255;
    this.b = (t & 255) / 255;
    return this;
  }
  setRGB(t, e, n) {
    this.r = t;
    this.g = e;
    this.b = n;
    return this;
  }
  setHSL(t, e, n) {
    t = r.kz(t, 1);
    e = r.uZ(e, 0, 1);
    n = r.uZ(n, 0, 1);
    if (e === 0) {
      this.r = this.g = this.b = n;
    } else {
      const r = n <= 0.5 ? n * (1 + e) : n + e - n * e;
      const i = n * 2 - r;
      this.r = o(i, r, t + 1 / 3);
      this.g = o(i, r, t);
      this.b = o(i, r, t - 1 / 3);
    }
    return this;
  }
  setStyle(t) {
    function e(e) {
      if (e !== undefined && parseFloat(e) < 1) {
        console.warn("THREE.Color: Alpha component of " + t + " will be ignored.");
      }
    }
    let n;
    if (n = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(t)) {
      let t;
      const r = n[1];
      const i = n[2];
      switch (r) {
        case "rgb":
        case "rgba":
          if (t = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(i)) {
            this.r = Math.min(255, parseInt(t[1], 10)) / 255;
            this.g = Math.min(255, parseInt(t[2], 10)) / 255;
            this.b = Math.min(255, parseInt(t[3], 10)) / 255;
            e(t[4]);
            return this;
          }
          if (t = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(i)) {
            this.r = Math.min(100, parseInt(t[1], 10)) / 100;
            this.g = Math.min(100, parseInt(t[2], 10)) / 100;
            this.b = Math.min(100, parseInt(t[3], 10)) / 100;
            e(t[4]);
            return this;
          }
          break;
        case "hsl":
        case "hsla":
          if (t = /^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(i)) {
            const n = parseFloat(t[1]) / 360;
            const r = parseInt(t[2], 10) / 100;
            const i = parseInt(t[3], 10) / 100;
            e(t[4]);
            return this.setHSL(n, r, i);
          }
      }
    } else if (n = /^\#([A-Fa-f\d]+)$/.exec(t)) {
      const t = n[1];
      const e = t.length;
      if (e === 3) {
        this.r = parseInt(t.charAt(0) + t.charAt(0), 16) / 255;
        this.g = parseInt(t.charAt(1) + t.charAt(1), 16) / 255;
        this.b = parseInt(t.charAt(2) + t.charAt(2), 16) / 255;
        return this;
      }
      if (e === 6) {
        this.r = parseInt(t.charAt(0) + t.charAt(1), 16) / 255;
        this.g = parseInt(t.charAt(2) + t.charAt(3), 16) / 255;
        this.b = parseInt(t.charAt(4) + t.charAt(5), 16) / 255;
        return this;
      }
    }
    if (t && t.length > 0) {
      return this.setColorName(t);
    } else {
      return this;
    }
  }
  setColorName(t) {
    const e = i[t.toLowerCase()];
    if (e !== undefined) {
      this.setHex(e);
    } else {
      console.warn("THREE.Color: Unknown color " + t);
    }
    return this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(t) {
    this.r = t.r;
    this.g = t.g;
    this.b = t.b;
    return this;
  }
  copyGammaToLinear(t, e = 2) {
    this.r = Math.pow(t.r, e);
    this.g = Math.pow(t.g, e);
    this.b = Math.pow(t.b, e);
    return this;
  }
  copyLinearToGamma(t, e = 2) {
    const n = e > 0 ? 1 / e : 1;
    this.r = Math.pow(t.r, n);
    this.g = Math.pow(t.g, n);
    this.b = Math.pow(t.b, n);
    return this;
  }
  convertGammaToLinear(t) {
    this.copyGammaToLinear(this, t);
    return this;
  }
  convertLinearToGamma(t) {
    this.copyLinearToGamma(this, t);
    return this;
  }
  copySRGBToLinear(t) {
    this.r = l(t.r);
    this.g = l(t.g);
    this.b = l(t.b);
    return this;
  }
  copyLinearToSRGB(t) {
    this.r = c(t.r);
    this.g = c(t.g);
    this.b = c(t.b);
    return this;
  }
  convertSRGBToLinear() {
    this.copySRGBToLinear(this);
    return this;
  }
  convertLinearToSRGB() {
    this.copyLinearToSRGB(this);
    return this;
  }
  getHex() {
    return this.r * 255 << 16 ^ this.g * 255 << 8 ^ this.b * 255 << 0;
  }
  getHexString() {
    return ("000000" + this.getHex().toString(16)).slice(-6);
  }
  getHSL(t) {
    const e = this.r;
    const n = this.g;
    const r = this.b;
    const i = Math.max(e, n, r);
    const s = Math.min(e, n, r);
    let a;
    let o;
    const l = (s + i) / 2;
    if (s === i) {
      a = 0;
      o = 0;
    } else {
      const t = i - s;
      o = l <= 0.5 ? t / (i + s) : t / (2 - i - s);
      switch (i) {
        case e:
          a = (n - r) / t + (n < r ? 6 : 0);
          break;
        case n:
          a = (r - e) / t + 2;
          break;
        case r:
          a = (e - n) / t + 4;
      }
      a /= 6;
    }
    t.h = a;
    t.s = o;
    t.l = l;
    return t;
  }
  getStyle() {
    return "rgb(" + (this.r * 255 | 0) + "," + (this.g * 255 | 0) + "," + (this.b * 255 | 0) + ")";
  }
  offsetHSL(t, e, n) {
    this.getHSL(s);
    s.h += t;
    s.s += e;
    s.l += n;
    this.setHSL(s.h, s.s, s.l);
    return this;
  }
  add(t) {
    this.r += t.r;
    this.g += t.g;
    this.b += t.b;
    return this;
  }
  addColors(t, e) {
    this.r = t.r + e.r;
    this.g = t.g + e.g;
    this.b = t.b + e.b;
    return this;
  }
  addScalar(t) {
    this.r += t;
    this.g += t;
    this.b += t;
    return this;
  }
  sub(t) {
    this.r = Math.max(0, this.r - t.r);
    this.g = Math.max(0, this.g - t.g);
    this.b = Math.max(0, this.b - t.b);
    return this;
  }
  multiply(t) {
    this.r *= t.r;
    this.g *= t.g;
    this.b *= t.b;
    return this;
  }
  multiplyScalar(t) {
    this.r *= t;
    this.g *= t;
    this.b *= t;
    return this;
  }
  lerp(t, e) {
    this.r += (t.r - this.r) * e;
    this.g += (t.g - this.g) * e;
    this.b += (t.b - this.b) * e;
    return this;
  }
  lerpColors(t, e, n) {
    this.r = t.r + (e.r - t.r) * n;
    this.g = t.g + (e.g - t.g) * n;
    this.b = t.b + (e.b - t.b) * n;
    return this;
  }
  lerpHSL(t, e) {
    this.getHSL(s);
    t.getHSL(a);
    const n = r.t7(s.h, a.h, e);
    const i = r.t7(s.s, a.s, e);
    const o = r.t7(s.l, a.l, e);
    this.setHSL(n, i, o);
    return this;
  }
  equals(t) {
    return t.r === this.r && t.g === this.g && t.b === this.b;
  }
  fromArray(t, e = 0) {
    this.r = t[e];
    this.g = t[e + 1];
    this.b = t[e + 2];
    return this;
  }
  toArray(t = [], e = 0) {
    t[e] = this.r;
    t[e + 1] = this.g;
    t[e + 2] = this.b;
    return t;
  }
  fromBufferAttribute(t, e) {
    this.r = t.getX(e);
    this.g = t.getY(e);
    this.b = t.getZ(e);
    if (t.normalized === true) {
      this.r /= 255;
      this.g /= 255;
      this.b /= 255;
    }
    return this;
  }
  toJSON() {
    return this.getHex();
  }
}
u.NAMES = i;
u.prototype.isColor = true;
u.prototype.r = 1;
u.prototype.g = 1;
u.prototype.b = 1;