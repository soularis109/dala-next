var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
function r(t) {
  const e = {};
  for (const n in t) {
    e[n] = {};
    for (const r in t[n]) {
      const i = t[n][r];
      if (i && (i.isColor || i.isMatrix3 || i.isMatrix4 || i.isVector2 || i.isVector3 || i.isVector4 || i.isTexture || i.isQuaternion)) {
        e[n][r] = i.clone();
      } else if (Array.isArray(i)) {
        e[n][r] = i.slice();
      } else {
        e[n][r] = i;
      }
    }
  }
  return e;
}
function i(t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const i = r(t[n]);
    for (const t in i) {
      e[t] = i[t];
    }
  }
  return e;
}
__d(exports, {
  dw: function () {
    return r;
  },
  Rh: function () {
    return i;
  },
  rD: function () {
    return s;
  }
});
const s = {
  clone: r,
  merge: i
};