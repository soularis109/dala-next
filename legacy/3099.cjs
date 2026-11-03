module.exports = function (e) {
  if (typeof e != "function") {
    throw TypeError(String(e) + " is not a function");
  }
  return e;
};