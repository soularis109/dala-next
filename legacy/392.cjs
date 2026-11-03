var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
function r(t) {
  if (t.length === 0) {
    return -Infinity;
  }
  let e = t[0];
  for (let n = 1, r = t.length; n < r; ++n) {
    if (t[n] > e) {
      e = t[n];
    }
  }
  return e;
}
__d(exports, {
  uH: function () {
    return r;
  }
});
Int8Array;
Uint8Array;
Uint8ClampedArray;
Int16Array;
Uint16Array;
Int32Array;
Uint32Array;
Float32Array;
Float64Array;