var t = Math.ceil;
var n = Math.floor;
module.exports = function (e) {
  if (isNaN(e = +e)) {
    return 0;
  } else {
    return (e > 0 ? n : t)(e);
  }
};