var n = {}.propertyIsEnumerable;
var i = Object.getOwnPropertyDescriptor;
var r = i && !n.call({
  1: 2
}, 1);
exports.f = r ? function (e) {
  var t = i(this, e);
  return !!t && t.enumerable;
} : n;