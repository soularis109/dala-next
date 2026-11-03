var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  x: function () {
    return i;
  }
});
var r = require("./8478.cjs");
class i extends r.T {
  constructor() {
    super();
    this.type = "Scene";
    this.background = null;
    this.environment = null;
    this.fog = null;
    this.overrideMaterial = null;
    this.autoUpdate = true;
    if (typeof __THREE_DEVTOOLS__ != "undefined") {
      __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
        detail: this
      }));
    }
  }
  copy(t, e) {
    super.copy(t, e);
    if (t.background !== null) {
      this.background = t.background.clone();
    }
    if (t.environment !== null) {
      this.environment = t.environment.clone();
    }
    if (t.fog !== null) {
      this.fog = t.fog.clone();
    }
    if (t.overrideMaterial !== null) {
      this.overrideMaterial = t.overrideMaterial.clone();
    }
    this.autoUpdate = t.autoUpdate;
    this.matrixAutoUpdate = t.matrixAutoUpdate;
    return this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    if (this.fog !== null) {
      e.object.fog = this.fog.toJSON();
    }
    return e;
  }
}
i.prototype.isScene = true;