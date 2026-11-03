var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  T: function () {
    return E;
  }
});
var r = require("./7092.cjs");
var i = require("./6881.cjs");
var s = require("./9203.cjs");
var a = require("./7406.cjs");
var o = require("./2043.cjs");
const l = new s.y();
const c = new r._();
class u {
  constructor(t = 0, e = 0, n = 0, r = u.DefaultOrder) {
    this._x = t;
    this._y = e;
    this._z = n;
    this._order = r;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t;
    this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t;
    this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t;
    this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(t) {
    this._order = t;
    this._onChangeCallback();
  }
  set(t, e, n, r = this._order) {
    this._x = t;
    this._y = e;
    this._z = n;
    this._order = r;
    this._onChangeCallback();
    return this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(t) {
    this._x = t._x;
    this._y = t._y;
    this._z = t._z;
    this._order = t._order;
    this._onChangeCallback();
    return this;
  }
  setFromRotationMatrix(t, e = this._order, n = true) {
    const r = t.elements;
    const i = r[0];
    const s = r[4];
    const a = r[8];
    const l = r[1];
    const c = r[5];
    const u = r[9];
    const h = r[2];
    const d = r[6];
    const f = r[10];
    switch (e) {
      case "XYZ":
        this._y = Math.asin((0, o.uZ)(a, -1, 1));
        if (Math.abs(a) < 0.9999999) {
          this._x = Math.atan2(-u, f);
          this._z = Math.atan2(-s, i);
        } else {
          this._x = Math.atan2(d, c);
          this._z = 0;
        }
        break;
      case "YXZ":
        this._x = Math.asin(-(0, o.uZ)(u, -1, 1));
        if (Math.abs(u) < 0.9999999) {
          this._y = Math.atan2(a, f);
          this._z = Math.atan2(l, c);
        } else {
          this._y = Math.atan2(-h, i);
          this._z = 0;
        }
        break;
      case "ZXY":
        this._x = Math.asin((0, o.uZ)(d, -1, 1));
        if (Math.abs(d) < 0.9999999) {
          this._y = Math.atan2(-h, f);
          this._z = Math.atan2(-s, c);
        } else {
          this._y = 0;
          this._z = Math.atan2(l, i);
        }
        break;
      case "ZYX":
        this._y = Math.asin(-(0, o.uZ)(h, -1, 1));
        if (Math.abs(h) < 0.9999999) {
          this._x = Math.atan2(d, f);
          this._z = Math.atan2(l, i);
        } else {
          this._x = 0;
          this._z = Math.atan2(-s, c);
        }
        break;
      case "YZX":
        this._z = Math.asin((0, o.uZ)(l, -1, 1));
        if (Math.abs(l) < 0.9999999) {
          this._x = Math.atan2(-u, c);
          this._y = Math.atan2(-h, i);
        } else {
          this._x = 0;
          this._y = Math.atan2(a, f);
        }
        break;
      case "XZY":
        this._z = Math.asin(-(0, o.uZ)(s, -1, 1));
        if (Math.abs(s) < 0.9999999) {
          this._x = Math.atan2(d, c);
          this._y = Math.atan2(a, i);
        } else {
          this._x = Math.atan2(-u, f);
          this._y = 0;
        }
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e);
    }
    this._order = e;
    if (n === true) {
      this._onChangeCallback();
    }
    return this;
  }
  setFromQuaternion(t, e, n) {
    l.makeRotationFromQuaternion(t);
    return this.setFromRotationMatrix(l, e, n);
  }
  setFromVector3(t, e = this._order) {
    return this.set(t.x, t.y, t.z, e);
  }
  reorder(t) {
    c.setFromEuler(this);
    return this.setFromQuaternion(c, t);
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
  }
  fromArray(t) {
    this._x = t[0];
    this._y = t[1];
    this._z = t[2];
    if (t[3] !== undefined) {
      this._order = t[3];
    }
    this._onChangeCallback();
    return this;
  }
  toArray(t = [], e = 0) {
    t[e] = this._x;
    t[e + 1] = this._y;
    t[e + 2] = this._z;
    t[e + 3] = this._order;
    return t;
  }
  toVector3(t) {
    if (t) {
      return t.set(this._x, this._y, this._z);
    } else {
      return new i.P(this._x, this._y, this._z);
    }
  }
  _onChange(t) {
    this._onChangeCallback = t;
    return this;
  }
  _onChangeCallback() {}
}
u.prototype.isEuler = true;
u.DefaultOrder = "XYZ";
u.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"];
class h {
  constructor() {
    this.mask = 1;
  }
  set(t) {
    this.mask = 1 << t | 0;
  }
  enable(t) {
    this.mask |= 1 << t | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(t) {
    this.mask ^= 1 << t | 0;
  }
  disable(t) {
    this.mask &= ~(1 << t | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(t) {
    return (this.mask & t.mask) != 0;
  }
}
var d = require("./1273.cjs");
let f = 0;
const p = new i.P();
const m = new r._();
const g = new s.y();
const v = new i.P();
const _ = new i.P();
const x = new i.P();
const y = new r._();
const b = new i.P(1, 0, 0);
const w = new i.P(0, 1, 0);
const M = new i.P(0, 0, 1);
const T = {
  type: "added"
};
const S = {
  type: "removed"
};
class E extends a.p {
  constructor() {
    super();
    Object.defineProperty(this, "id", {
      value: f++
    });
    this.uuid = o.DO();
    this.name = "";
    this.type = "Object3D";
    this.parent = null;
    this.children = [];
    this.up = E.DefaultUp.clone();
    const t = new i.P();
    const e = new u();
    const n = new r._();
    const a = new i.P(1, 1, 1);
    e._onChange(function () {
      n.setFromEuler(e, false);
    });
    n._onChange(function () {
      e.setFromQuaternion(n, undefined, false);
    });
    Object.defineProperties(this, {
      position: {
        configurable: true,
        enumerable: true,
        value: t
      },
      rotation: {
        configurable: true,
        enumerable: true,
        value: e
      },
      quaternion: {
        configurable: true,
        enumerable: true,
        value: n
      },
      scale: {
        configurable: true,
        enumerable: true,
        value: a
      },
      modelViewMatrix: {
        value: new s.y()
      },
      normalMatrix: {
        value: new d.V()
      }
    });
    this.matrix = new s.y();
    this.matrixWorld = new s.y();
    this.matrixAutoUpdate = E.DefaultMatrixAutoUpdate;
    this.matrixWorldNeedsUpdate = false;
    this.layers = new h();
    this.visible = true;
    this.castShadow = false;
    this.receiveShadow = false;
    this.frustumCulled = true;
    this.renderOrder = 0;
    this.animations = [];
    this.userData = {};
  }
  onBeforeRender() {}
  onAfterRender() {}
  applyMatrix4(t) {
    if (this.matrixAutoUpdate) {
      this.updateMatrix();
    }
    this.matrix.premultiply(t);
    this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(t) {
    this.quaternion.premultiply(t);
    return this;
  }
  setRotationFromAxisAngle(t, e) {
    this.quaternion.setFromAxisAngle(t, e);
  }
  setRotationFromEuler(t) {
    this.quaternion.setFromEuler(t, true);
  }
  setRotationFromMatrix(t) {
    this.quaternion.setFromRotationMatrix(t);
  }
  setRotationFromQuaternion(t) {
    this.quaternion.copy(t);
  }
  rotateOnAxis(t, e) {
    m.setFromAxisAngle(t, e);
    this.quaternion.multiply(m);
    return this;
  }
  rotateOnWorldAxis(t, e) {
    m.setFromAxisAngle(t, e);
    this.quaternion.premultiply(m);
    return this;
  }
  rotateX(t) {
    return this.rotateOnAxis(b, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(w, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(M, t);
  }
  translateOnAxis(t, e) {
    p.copy(t).applyQuaternion(this.quaternion);
    this.position.add(p.multiplyScalar(e));
    return this;
  }
  translateX(t) {
    return this.translateOnAxis(b, t);
  }
  translateY(t) {
    return this.translateOnAxis(w, t);
  }
  translateZ(t) {
    return this.translateOnAxis(M, t);
  }
  localToWorld(t) {
    return t.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(t) {
    return t.applyMatrix4(g.copy(this.matrixWorld).invert());
  }
  lookAt(t, e, n) {
    if (t.isVector3) {
      v.copy(t);
    } else {
      v.set(t, e, n);
    }
    const r = this.parent;
    this.updateWorldMatrix(true, false);
    _.setFromMatrixPosition(this.matrixWorld);
    if (this.isCamera || this.isLight) {
      g.lookAt(_, v, this.up);
    } else {
      g.lookAt(v, _, this.up);
    }
    this.quaternion.setFromRotationMatrix(g);
    if (r) {
      g.extractRotation(r.matrixWorld);
      m.setFromRotationMatrix(g);
      this.quaternion.premultiply(m.invert());
    }
  }
  add(t) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++) {
        this.add(arguments[t]);
      }
      return this;
    }
    if (t === this) {
      console.error("THREE.Object3D.add: object can't be added as a child of itself.", t);
      return this;
    } else {
      if (t && t.isObject3D) {
        if (t.parent !== null) {
          t.parent.remove(t);
        }
        t.parent = this;
        this.children.push(t);
        t.dispatchEvent(T);
      } else {
        console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t);
      }
      return this;
    }
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++) {
        this.remove(arguments[t]);
      }
      return this;
    }
    const e = this.children.indexOf(t);
    if (e !== -1) {
      t.parent = null;
      this.children.splice(e, 1);
      t.dispatchEvent(S);
    }
    return this;
  }
  removeFromParent() {
    const t = this.parent;
    if (t !== null) {
      t.remove(this);
    }
    return this;
  }
  clear() {
    for (let t = 0; t < this.children.length; t++) {
      const e = this.children[t];
      e.parent = null;
      e.dispatchEvent(S);
    }
    this.children.length = 0;
    return this;
  }
  attach(t) {
    this.updateWorldMatrix(true, false);
    g.copy(this.matrixWorld).invert();
    if (t.parent !== null) {
      t.parent.updateWorldMatrix(true, false);
      g.multiply(t.parent.matrixWorld);
    }
    t.applyMatrix4(g);
    this.add(t);
    t.updateWorldMatrix(false, true);
    return this;
  }
  getObjectById(t) {
    return this.getObjectByProperty("id", t);
  }
  getObjectByName(t) {
    return this.getObjectByProperty("name", t);
  }
  getObjectByProperty(t, e) {
    if (this[t] === e) {
      return this;
    }
    for (let n = 0, r = this.children.length; n < r; n++) {
      const r = this.children[n].getObjectByProperty(t, e);
      if (r !== undefined) {
        return r;
      }
    }
  }
  getWorldPosition(t) {
    this.updateWorldMatrix(true, false);
    return t.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(t) {
    this.updateWorldMatrix(true, false);
    this.matrixWorld.decompose(_, t, x);
    return t;
  }
  getWorldScale(t) {
    this.updateWorldMatrix(true, false);
    this.matrixWorld.decompose(_, y, t);
    return t;
  }
  getWorldDirection(t) {
    this.updateWorldMatrix(true, false);
    const e = this.matrixWorld.elements;
    return t.set(e[8], e[9], e[10]).normalize();
  }
  raycast() {}
  traverse(t) {
    t(this);
    const e = this.children;
    for (let n = 0, r = e.length; n < r; n++) {
      e[n].traverse(t);
    }
  }
  traverseVisible(t) {
    if (this.visible === false) {
      return;
    }
    t(this);
    const e = this.children;
    for (let n = 0, r = e.length; n < r; n++) {
      e[n].traverseVisible(t);
    }
  }
  traverseAncestors(t) {
    const e = this.parent;
    if (e !== null) {
      t(e);
      e.traverseAncestors(t);
    }
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    this.matrixWorldNeedsUpdate = true;
  }
  updateMatrixWorld(t) {
    if (this.matrixAutoUpdate) {
      this.updateMatrix();
    }
    if (this.matrixWorldNeedsUpdate || t) {
      if (this.parent === null) {
        this.matrixWorld.copy(this.matrix);
      } else {
        this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
      }
      this.matrixWorldNeedsUpdate = false;
      t = true;
    }
    const e = this.children;
    for (let n = 0, r = e.length; n < r; n++) {
      e[n].updateMatrixWorld(t);
    }
  }
  updateWorldMatrix(t, e) {
    const n = this.parent;
    if (t === true && n !== null) {
      n.updateWorldMatrix(true, false);
    }
    if (this.matrixAutoUpdate) {
      this.updateMatrix();
    }
    if (this.parent === null) {
      this.matrixWorld.copy(this.matrix);
    } else {
      this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
    }
    if (e === true) {
      const t = this.children;
      for (let e = 0, n = t.length; e < n; e++) {
        t[e].updateWorldMatrix(false, true);
      }
    }
  }
  toJSON(t) {
    const e = t === undefined || typeof t == "string";
    const n = {};
    if (e) {
      t = {
        geometries: {},
        materials: {},
        textures: {},
        images: {},
        shapes: {},
        skeletons: {},
        animations: {}
      };
      n.metadata = {
        version: 4.5,
        type: "Object",
        generator: "Object3D.toJSON"
      };
    }
    const r = {};
    function i(e, n) {
      if (e[n.uuid] === undefined) {
        e[n.uuid] = n.toJSON(t);
      }
      return n.uuid;
    }
    r.uuid = this.uuid;
    r.type = this.type;
    if (this.name !== "") {
      r.name = this.name;
    }
    if (this.castShadow === true) {
      r.castShadow = true;
    }
    if (this.receiveShadow === true) {
      r.receiveShadow = true;
    }
    if (this.visible === false) {
      r.visible = false;
    }
    if (this.frustumCulled === false) {
      r.frustumCulled = false;
    }
    if (this.renderOrder !== 0) {
      r.renderOrder = this.renderOrder;
    }
    if (JSON.stringify(this.userData) !== "{}") {
      r.userData = this.userData;
    }
    r.layers = this.layers.mask;
    r.matrix = this.matrix.toArray();
    if (this.matrixAutoUpdate === false) {
      r.matrixAutoUpdate = false;
    }
    if (this.isInstancedMesh) {
      r.type = "InstancedMesh";
      r.count = this.count;
      r.instanceMatrix = this.instanceMatrix.toJSON();
      if (this.instanceColor !== null) {
        r.instanceColor = this.instanceColor.toJSON();
      }
    }
    if (this.isScene) {
      if (this.background) {
        if (this.background.isColor) {
          r.background = this.background.toJSON();
        } else if (this.background.isTexture) {
          r.background = this.background.toJSON(t).uuid;
        }
      }
      if (this.environment && this.environment.isTexture) {
        r.environment = this.environment.toJSON(t).uuid;
      }
    } else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = i(t.geometries, this.geometry);
      const e = this.geometry.parameters;
      if (e !== undefined && e.shapes !== undefined) {
        const n = e.shapes;
        if (Array.isArray(n)) {
          for (let e = 0, r = n.length; e < r; e++) {
            const r = n[e];
            i(t.shapes, r);
          }
        } else {
          i(t.shapes, n);
        }
      }
    }
    if (this.isSkinnedMesh) {
      r.bindMode = this.bindMode;
      r.bindMatrix = this.bindMatrix.toArray();
      if (this.skeleton !== undefined) {
        i(t.skeletons, this.skeleton);
        r.skeleton = this.skeleton.uuid;
      }
    }
    if (this.material !== undefined) {
      if (Array.isArray(this.material)) {
        const e = [];
        for (let n = 0, r = this.material.length; n < r; n++) {
          e.push(i(t.materials, this.material[n]));
        }
        r.material = e;
      } else {
        r.material = i(t.materials, this.material);
      }
    }
    if (this.children.length > 0) {
      r.children = [];
      for (let e = 0; e < this.children.length; e++) {
        r.children.push(this.children[e].toJSON(t).object);
      }
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let e = 0; e < this.animations.length; e++) {
        const n = this.animations[e];
        r.animations.push(i(t.animations, n));
      }
    }
    if (e) {
      const e = s(t.geometries);
      const r = s(t.materials);
      const i = s(t.textures);
      const a = s(t.images);
      const o = s(t.shapes);
      const l = s(t.skeletons);
      const c = s(t.animations);
      if (e.length > 0) {
        n.geometries = e;
      }
      if (r.length > 0) {
        n.materials = r;
      }
      if (i.length > 0) {
        n.textures = i;
      }
      if (a.length > 0) {
        n.images = a;
      }
      if (o.length > 0) {
        n.shapes = o;
      }
      if (l.length > 0) {
        n.skeletons = l;
      }
      if (c.length > 0) {
        n.animations = c;
      }
    }
    n.object = r;
    return n;
    function s(t) {
      const e = [];
      for (const n in t) {
        const r = t[n];
        delete r.metadata;
        e.push(r);
      }
      return e;
    }
  }
  clone(t) {
    return new this.constructor().copy(this, t);
  }
  copy(t, e = true) {
    this.name = t.name;
    this.up.copy(t.up);
    this.position.copy(t.position);
    this.rotation.order = t.rotation.order;
    this.quaternion.copy(t.quaternion);
    this.scale.copy(t.scale);
    this.matrix.copy(t.matrix);
    this.matrixWorld.copy(t.matrixWorld);
    this.matrixAutoUpdate = t.matrixAutoUpdate;
    this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate;
    this.layers.mask = t.layers.mask;
    this.visible = t.visible;
    this.castShadow = t.castShadow;
    this.receiveShadow = t.receiveShadow;
    this.frustumCulled = t.frustumCulled;
    this.renderOrder = t.renderOrder;
    this.userData = JSON.parse(JSON.stringify(t.userData));
    if (e === true) {
      for (let e = 0; e < t.children.length; e++) {
        const n = t.children[e];
        this.add(n.clone());
      }
    }
    return this;
  }
}
E.DefaultUp = new i.P(0, 1, 0);
E.DefaultMatrixAutoUpdate = true;
E.prototype.isObject3D = true;