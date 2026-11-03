var i = require("./9974.cjs");
var r = require("./8361.cjs");
var o = require("./7908.cjs");
var s = require("./7466.cjs");
var a = require("./5417.cjs");
var l = [].push;
function u(e) {
  var t = e == 1;
  var n = e == 2;
  var u = e == 3;
  var c = e == 4;
  var h = e == 6;
  var d = e == 7;
  var f = e == 5 || h;
  return function (m, p, v, g) {
    var x;
    var y;
    var D = o(m);
    var b = r(D);
    var _ = i(p, v, 3);
    for (var w = s(b.length), S = 0, E = g || a, P = t ? E(m, w) : n || d ? E(m, 0) : undefined; w > S; S++) {
      if ((f || S in b) && (y = _(x = b[S], S, D), e)) {
        if (t) {
          P[S] = y;
        } else if (y) {
          switch (e) {
            case 3:
              return true;
            case 5:
              return x;
            case 6:
              return S;
            case 2:
              l.call(P, x);
          }
        } else {
          switch (e) {
            case 4:
              return false;
            case 7:
              l.call(P, x);
          }
        }
      }
    }
    if (h) {
      return -1;
    } else if (u || c) {
      return c;
    } else {
      return P;
    }
  };
}
module.exports = {
  forEach: u(0),
  map: u(1),
  filter: u(2),
  some: u(3),
  every: u(4),
  find: u(5),
  findIndex: u(6),
  filterReject: u(7)
};