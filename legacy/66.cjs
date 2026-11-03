var __d=function(e,d){for(var k in d)Object.defineProperty(e,k,{enumerable:true,get:d[k]})};
var exports=module.exports;
__d(exports, {
  C: function () {
    return xn;
  }
});
var r = require("./1661.cjs");
var i = require("./4698.cjs");
var s = require("./9203.cjs");
var a = require("./6881.cjs");
var o = require("./223.cjs");
function l() {
  let t = null;
  let e = false;
  let n = null;
  let r = null;
  function i(e, s) {
    n(e, s);
    r = t.requestAnimationFrame(i);
  }
  return {
    start: function () {
      if (e !== true && n !== null) {
        r = t.requestAnimationFrame(i);
        e = true;
      }
    },
    stop: function () {
      t.cancelAnimationFrame(r);
      e = false;
    },
    setAnimationLoop: function (t) {
      n = t;
    },
    setContext: function (e) {
      t = e;
    }
  };
}
function c(t, e) {
  const n = e.isWebGL2;
  const r = new WeakMap();
  return {
    get: function (t) {
      if (t.isInterleavedBufferAttribute) {
        t = t.data;
      }
      return r.get(t);
    },
    remove: function (e) {
      if (e.isInterleavedBufferAttribute) {
        e = e.data;
      }
      const n = r.get(e);
      if (n) {
        t.deleteBuffer(n.buffer);
        r.delete(e);
      }
    },
    update: function (e, i) {
      if (e.isGLBufferAttribute) {
        const t = r.get(e);
        if (!t || t.version < e.version) {
          r.set(e, {
            buffer: e.buffer,
            type: e.type,
            bytesPerElement: e.elementSize,
            version: e.version
          });
        }
        return;
      }
      if (e.isInterleavedBufferAttribute) {
        e = e.data;
      }
      const s = r.get(e);
      if (s === undefined) {
        r.set(e, function (e, r) {
          const i = e.array;
          const s = e.usage;
          const a = t.createBuffer();
          t.bindBuffer(r, a);
          t.bufferData(r, i, s);
          e.onUploadCallback();
          let o = t.FLOAT;
          if (i instanceof Float32Array) {
            o = t.FLOAT;
          } else if (i instanceof Float64Array) {
            console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.");
          } else if (i instanceof Uint16Array) {
            if (e.isFloat16BufferAttribute) {
              if (n) {
                o = t.HALF_FLOAT;
              } else {
                console.warn("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");
              }
            } else {
              o = t.UNSIGNED_SHORT;
            }
          } else if (i instanceof Int16Array) {
            o = t.SHORT;
          } else if (i instanceof Uint32Array) {
            o = t.UNSIGNED_INT;
          } else if (i instanceof Int32Array) {
            o = t.INT;
          } else if (i instanceof Int8Array) {
            o = t.BYTE;
          } else if (i instanceof Uint8Array || i instanceof Uint8ClampedArray) {
            o = t.UNSIGNED_BYTE;
          }
          return {
            buffer: a,
            type: o,
            bytesPerElement: i.BYTES_PER_ELEMENT,
            version: e.version
          };
        }(e, i));
      } else if (s.version < e.version) {
        (function (e, r, i) {
          const s = r.array;
          const a = r.updateRange;
          t.bindBuffer(i, e);
          if (a.count === -1) {
            t.bufferSubData(i, 0, s);
          } else {
            if (n) {
              t.bufferSubData(i, a.offset * s.BYTES_PER_ELEMENT, s, a.offset, a.count);
            } else {
              t.bufferSubData(i, a.offset * s.BYTES_PER_ELEMENT, s.subarray(a.offset, a.offset + a.count));
            }
            a.count = -1;
          }
        })(s.buffer, e, i);
        s.version = e.version;
      }
    }
  };
}
var u = require("./9046.cjs");
var h = require("./140.cjs");
class d extends u.u {
  constructor(t = 1, e = 1, n = 1, r = 1, i = 1, s = 1) {
    super();
    this.type = "BoxGeometry";
    this.parameters = {
      width: t,
      height: e,
      depth: n,
      widthSegments: r,
      heightSegments: i,
      depthSegments: s
    };
    const o = this;
    r = Math.floor(r);
    i = Math.floor(i);
    s = Math.floor(s);
    const l = [];
    const c = [];
    const u = [];
    const d = [];
    let f = 0;
    let p = 0;
    function m(t, e, n, r, i, s, h, m, g, v, _) {
      const x = s / g;
      const y = h / v;
      const b = s / 2;
      const w = h / 2;
      const M = m / 2;
      const T = g + 1;
      const S = v + 1;
      let E = 0;
      let A = 0;
      const R = new a.P();
      for (let s = 0; s < S; s++) {
        const a = s * y - w;
        for (let o = 0; o < T; o++) {
          const l = o * x - b;
          R[t] = l * r;
          R[e] = a * i;
          R[n] = M;
          c.push(R.x, R.y, R.z);
          R[t] = 0;
          R[e] = 0;
          R[n] = m > 0 ? 1 : -1;
          u.push(R.x, R.y, R.z);
          d.push(o / g);
          d.push(1 - s / v);
          E += 1;
        }
      }
      for (let t = 0; t < v; t++) {
        for (let e = 0; e < g; e++) {
          const n = f + e + T * t;
          const r = f + e + T * (t + 1);
          const i = f + (e + 1) + T * (t + 1);
          const s = f + (e + 1) + T * t;
          l.push(n, r, s);
          l.push(r, i, s);
          A += 6;
        }
      }
      o.addGroup(p, A, _);
      p += A;
      f += E;
    }
    m("z", "y", "x", -1, -1, n, e, t, s, i, 0);
    m("z", "y", "x", 1, -1, n, e, -t, s, i, 1);
    m("x", "z", "y", 1, 1, t, n, e, r, s, 2);
    m("x", "z", "y", 1, -1, t, n, -e, r, s, 3);
    m("x", "y", "z", 1, -1, t, e, n, r, i, 4);
    m("x", "y", "z", -1, -1, t, e, -n, r, i, 5);
    this.setIndex(l);
    this.setAttribute("position", new h.a$(c, 3));
    this.setAttribute("normal", new h.a$(u, 3));
    this.setAttribute("uv", new h.a$(d, 2));
  }
  static fromJSON(t) {
    return new d(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
}
var f = require("./4078.cjs");
var p = require("./4595.cjs");
var m = require("./3662.cjs");
var g = require("./6454.cjs");
const v = {
  alphamap_fragment: "\n#ifdef USE_ALPHAMAP\n\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n\n#endif\n",
  alphamap_pars_fragment: "\n#ifdef USE_ALPHAMAP\n\n\tuniform sampler2D alphaMap;\n\n#endif\n",
  alphatest_fragment: "\n#ifdef USE_ALPHATEST\n\n\tif ( diffuseColor.a < alphaTest ) discard;\n\n#endif\n",
  alphatest_pars_fragment: "\n#ifdef USE_ALPHATEST\n\tuniform float alphaTest;\n#endif\n",
  aomap_fragment: "\n#ifdef USE_AOMAP\n\n\t// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n\n\t#endif\n\n#endif\n",
  aomap_pars_fragment: "\n#ifdef USE_AOMAP\n\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n\n#endif\n",
  begin_vertex: "\nvec3 transformed = vec3( position );\n",
  beginnormal_vertex: "\nvec3 objectNormal = vec3( normal );\n\n#ifdef USE_TANGENT\n\n\tvec3 objectTangent = vec3( tangent.xyz );\n\n#endif\n",
  bsdfs: "\n\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n\n\treturn RECIPROCAL_PI * diffuseColor;\n\n} // validated\n\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n\n\t// Original approximation by Christophe Schlick '94\n\t// float fresnel = pow( 1.0 - dotVH, 5.0 );\n\n\t// Optimized variant (presented by Epic at SIGGRAPH '13)\n\t// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n\n} // validated\n\n// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2\n// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\n\tfloat a2 = pow2( alpha );\n\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\n\treturn 0.5 / max( gv + gl, EPSILON );\n\n}\n\n// Microfacet Models for Refraction through Rough Surfaces - equation (33)\n// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html\n// alpha is \"roughness squared\" in Disney’s reparameterization\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\n\tfloat a2 = pow2( alpha );\n\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0; // avoid alpha = 0 with dotNH = 1\n\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n\n}\n\n// GGX Distribution, Schlick Fresnel, GGX_SmithCorrelated Visibility\nvec3 BRDF_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {\n\n\tfloat alpha = pow2( roughness ); // UE4's roughness\n\n\tvec3 halfDir = normalize( incidentLight.direction + viewDir );\n\n\tfloat dotNL = saturate( dot( normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\n\tvec3 F = F_Schlick( f0, f90, dotVH );\n\n\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\n\tfloat D = D_GGX( alpha, dotNH );\n\n\treturn F * ( V * D );\n\n}\n\n// Rect Area Light\n\n// Real-Time Polygonal-Light Shading with Linearly Transformed Cosines\n// by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt\n// code: https://github.com/selfshadow/ltc_code/\n\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\n\tfloat dotNV = saturate( dot( N, V ) );\n\n\t// texture parameterized by sqrt( GGX alpha ) and sqrt( 1 - cos( theta ) )\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\n\treturn uv;\n\n}\n\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\n\t// Real-Time Area Lighting: a Journey from Research to Production (p.102)\n\t// An approximation of the form factor of a horizon-clipped rectangle.\n\n\tfloat l = length( f );\n\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n\n}\n\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\n\tfloat x = dot( v1, v2 );\n\n\tfloat y = abs( x );\n\n\t// rational polynomial approximation to theta / sin( theta ) / 2PI\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\n\treturn cross( v1, v2 ) * theta_sintheta;\n\n}\n\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\n\t// bail if point is on back side of plane of light\n\t// assumes ccw winding order of light vertices\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\n\t// construct orthonormal basis around N\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 ); // negated from paper; possibly due to a different handedness of world coordinate system\n\n\t// compute transform\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\n\t// transform rect\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\n\t// project rect onto sphere\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\n\t// calculate vector form factor\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\n\t// adjust for horizon clipping\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\n/*\n\t// alternate method of adjusting for horizon clipping (see referece)\n\t// refactoring required\n\tfloat len = length( vectorFormFactor );\n\tfloat z = vectorFormFactor.z / len;\n\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\n\t// tabulated horizon-clipped sphere, apparently...\n\tvec2 uv = vec2( z * 0.5 + 0.5, len );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\n\tfloat scale = texture2D( ltc_2, uv ).w;\n\n\tfloat result = len * scale;\n*/\n\n\treturn vec3( result );\n\n}\n\n// End Rect Area Light\n\n\nfloat G_BlinnPhong_Implicit( /* const in float dotNL, const in float dotNV */ ) {\n\n\t// geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)\n\treturn 0.25;\n\n}\n\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n\n}\n\nvec3 BRDF_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotVH = saturate( dot( geometry.viewDir, halfDir ) );\n\n\tvec3 F = F_Schlick( specularColor, 1.0, dotVH );\n\n\tfloat G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );\n\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\n\treturn F * ( G * D );\n\n} // validated\n\n#if defined( USE_SHEEN )\n\n// https://github.com/google/filament/blob/master/shaders/src/brdf.fs#L94\nfloat D_Charlie( float roughness, float NoH ) {\n\n\t// Estevez and Kulla 2017, \"Production Friendly Microfacet Sheen BRDF\"\n\tfloat invAlpha = 1.0 / roughness;\n\tfloat cos2h = NoH * NoH;\n\tfloat sin2h = max( 1.0 - cos2h, 0.0078125 ); // 2^(-14/2), so sin2h^2 > 0 in fp16\n\n\treturn ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n\n}\n\n// https://github.com/google/filament/blob/master/shaders/src/brdf.fs#L136\nfloat V_Neubelt( float NoV, float NoL ) {\n\n\t// Neubelt and Pettineo 2013, \"Crafting a Next-gen Material Pipeline for The Order: 1886\"\n\treturn saturate( 1.0 / ( 4.0 * ( NoL + NoV - NoL * NoV ) ) );\n\n}\n\nvec3 BRDF_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {\n\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\n\tvec3 H = normalize( V + L );\n\tfloat dotNH = saturate( dot( N, H ) );\n\n\treturn specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );\n\n}\n\n#endif\n",
  bumpmap_pars_fragment: "\n#ifdef USE_BUMPMAP\n\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\n\t// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen\n\t// http://api.unrealengine.com/attachments/Engine/Rendering/LightingAndShadows/BumpMappingWithoutTangentSpace/mm_sfgrad_bump.pdf\n\n\t// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n\tvec2 dHdxy_fwd() {\n\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\n\t\treturn vec2( dBx, dBy );\n\n\t}\n\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\n\t\t// Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988\n\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\t\t// normalized\n\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\n\t}\n\n#endif\n",
  clipping_planes_fragment: "\n#if NUM_CLIPPING_PLANES > 0\n\n\tvec4 plane;\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\n\t\tbool clipped = true;\n\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\n\t\t}\n\t\t#pragma unroll_loop_end\n\n\t\tif ( clipped ) discard;\n\n\t#endif\n\n#endif\n",
  clipping_planes_pars_fragment: "\n#if NUM_CLIPPING_PLANES > 0\n\n\tvarying vec3 vClipPosition;\n\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n\n#endif\n",
  clipping_planes_pars_vertex: "\n#if NUM_CLIPPING_PLANES > 0\n\n\tvarying vec3 vClipPosition;\n\n#endif\n",
  clipping_planes_vertex: "\n#if NUM_CLIPPING_PLANES > 0\n\n\tvClipPosition = - mvPosition.xyz;\n\n#endif\n",
  color_fragment: "\n#if defined( USE_COLOR_ALPHA )\n\n\tdiffuseColor *= vColor;\n\n#elif defined( USE_COLOR )\n\n\tdiffuseColor.rgb *= vColor;\n\n#endif\n",
  color_pars_fragment: "\n#if defined( USE_COLOR_ALPHA )\n\n\tvarying vec4 vColor;\n\n#elif defined( USE_COLOR )\n\n\tvarying vec3 vColor;\n\n#endif\n",
  color_pars_vertex: "\n#if defined( USE_COLOR_ALPHA )\n\n\tvarying vec4 vColor;\n\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\n\tvarying vec3 vColor;\n\n#endif\n",
  color_vertex: "\n#if defined( USE_COLOR_ALPHA )\n\n\tvColor = vec4( 1.0 );\n\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\n\tvColor = vec3( 1.0 );\n\n#endif\n\n#ifdef USE_COLOR\n\n\tvColor *= color;\n\n#endif\n\n#ifdef USE_INSTANCING_COLOR\n\n\tvColor.xyz *= instanceColor.xyz;\n\n#endif\n",
  common: "\n#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n\n#ifndef saturate\n// <tonemapping_pars_fragment> may have defined saturate() already\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\n\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\n\n// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.\n// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nhighp float rand( const in vec2 uv ) {\n\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\n\treturn fract( sin( sn ) * c );\n\n}\n\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\n\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\n\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\n\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef USE_CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\n\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n}\n\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\n\t// dir can be either a direction vector or a normal vector\n\t// upper-left 3x3 of matrix is assumed to be orthogonal\n\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n\n}\n\nmat3 transposeMat3( const in mat3 m ) {\n\n\tmat3 tmp;\n\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\n\treturn tmp;\n\n}\n\n// https://en.wikipedia.org/wiki/Relative_luminance\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\n\treturn dot( weights, color.rgb );\n\n}\n\nbool isPerspectiveMatrix( mat4 m ) {\n\n\treturn m[ 2 ][ 3 ] == - 1.0;\n\n}\n\nvec2 equirectUv( in vec3 dir ) {\n\n\t// dir is assumed to be unit length\n\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\n\treturn vec2( u, v );\n\n}\n",
  cube_uv_reflection_fragment: "\n#ifdef ENVMAP_TYPE_CUBE_UV\n\n\t#define cubeUV_maxMipLevel 8.0\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_maxTileSize 256.0\n\t#define cubeUV_minTileSize 16.0\n\n\t// These shader functions convert between the UV coordinates of a single face of\n\t// a cubemap, the 0-5 integer index of a cube face, and the direction vector for\n\t// sampling a textureCube (not generally normalized ).\n\n\tfloat getFace( vec3 direction ) {\n\n\t\tvec3 absDirection = abs( direction );\n\n\t\tfloat face = - 1.0;\n\n\t\tif ( absDirection.x > absDirection.z ) {\n\n\t\t\tif ( absDirection.x > absDirection.y )\n\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\n\t\t\telse\n\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\n\t\t} else {\n\n\t\t\tif ( absDirection.z > absDirection.y )\n\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\n\t\t\telse\n\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\n\t\t}\n\n\t\treturn face;\n\n\t}\n\n\t// RH coordinate system; PMREM face-indexing convention\n\tvec2 getUV( vec3 direction, float face ) {\n\n\t\tvec2 uv;\n\n\t\tif ( face == 0.0 ) {\n\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x ); // pos x\n\n\t\t} else if ( face == 1.0 ) {\n\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y ); // pos y\n\n\t\t} else if ( face == 2.0 ) {\n\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z ); // pos z\n\n\t\t} else if ( face == 3.0 ) {\n\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x ); // neg x\n\n\t\t} else if ( face == 4.0 ) {\n\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y ); // neg y\n\n\t\t} else {\n\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z ); // neg z\n\n\t\t}\n\n\t\treturn 0.5 * ( uv + 1.0 );\n\n\t}\n\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\n\t\tfloat face = getFace( direction );\n\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\n\t\tfloat faceSize = exp2( mipInt );\n\n\t\tfloat texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );\n\n\t\tvec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );\n\n\t\tvec2 f = fract( uv );\n\n\t\tuv += 0.5 - f;\n\n\t\tif ( face > 2.0 ) {\n\n\t\t\tuv.y += faceSize;\n\n\t\t\tface -= 3.0;\n\n\t\t}\n\n\t\tuv.x += face * faceSize;\n\n\t\tif ( mipInt < cubeUV_maxMipLevel ) {\n\n\t\t\tuv.y += 2.0 * cubeUV_maxTileSize;\n\n\t\t}\n\n\t\tuv.y += filterInt * 2.0 * cubeUV_minTileSize;\n\n\t\tuv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );\n\n\t\tuv *= texelSize;\n\n\t\tvec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\n\t\tuv.x += texelSize;\n\n\t\tvec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\n\t\tuv.y += texelSize;\n\n\t\tvec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\n\t\tuv.x -= texelSize;\n\n\t\tvec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\n\t\tvec3 tm = mix( tl, tr, f.x );\n\n\t\tvec3 bm = mix( bl, br, f.x );\n\n\t\treturn mix( tm, bm, f.y );\n\n\t}\n\n\t// These defines must match with PMREMGenerator\n\n\t#define r0 1.0\n\t#define v0 0.339\n\t#define m0 - 2.0\n\t#define r1 0.8\n\t#define v1 0.276\n\t#define m1 - 1.0\n\t#define r4 0.4\n\t#define v4 0.046\n\t#define m4 2.0\n\t#define r5 0.305\n\t#define v5 0.016\n\t#define m5 3.0\n\t#define r6 0.21\n\t#define v6 0.0038\n\t#define m6 4.0\n\n\tfloat roughnessToMip( float roughness ) {\n\n\t\tfloat mip = 0.0;\n\n\t\tif ( roughness >= r1 ) {\n\n\t\t\tmip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;\n\n\t\t} else if ( roughness >= r4 ) {\n\n\t\t\tmip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;\n\n\t\t} else if ( roughness >= r5 ) {\n\n\t\t\tmip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;\n\n\t\t} else if ( roughness >= r6 ) {\n\n\t\t\tmip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;\n\n\t\t} else {\n\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness ); // 1.16 = 1.79^0.25\n\t\t}\n\n\t\treturn mip;\n\n\t}\n\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\n\t\tfloat mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );\n\n\t\tfloat mipF = fract( mip );\n\n\t\tfloat mipInt = floor( mip );\n\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\n\t\tif ( mipF == 0.0 ) {\n\n\t\t\treturn vec4( color0, 1.0 );\n\n\t\t} else {\n\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\n\t\t}\n\n\t}\n\n#endif\n",
  defaultnormal_vertex: "\nvec3 transformedNormal = objectNormal;\n\n#ifdef USE_INSTANCING\n\n\t// this is in lieu of a per-instance normal-matrix\n\t// shear transforms in the instance matrix are not supported\n\n\tmat3 m = mat3( instanceMatrix );\n\n\ttransformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n\n\ttransformedNormal = m * transformedNormal;\n\n#endif\n\ntransformedNormal = normalMatrix * transformedNormal;\n\n#ifdef FLIP_SIDED\n\n\ttransformedNormal = - transformedNormal;\n\n#endif\n\n#ifdef USE_TANGENT\n\n\tvec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\n\t#ifdef FLIP_SIDED\n\n\t\ttransformedTangent = - transformedTangent;\n\n\t#endif\n\n#endif\n",
  displacementmap_pars_vertex: "\n#ifdef USE_DISPLACEMENTMAP\n\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n\n#endif\n",
  displacementmap_vertex: "\n#ifdef USE_DISPLACEMENTMAP\n\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );\n\n#endif\n",
  emissivemap_fragment: "\n#ifdef USE_EMISSIVEMAP\n\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n\n#endif\n",
  emissivemap_pars_fragment: "\n#ifdef USE_EMISSIVEMAP\n\n\tuniform sampler2D emissiveMap;\n\n#endif\n",
  encodings_fragment: "\ngl_FragColor = linearToOutputTexel( gl_FragColor );\n",
  encodings_pars_fragment: "\n// For a discussion of what this is, please read this: http://lousodrome.net/blog/light/2013/05/26/gamma-correct-and-hdr-rendering-in-a-32-bits-buffer/\n\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\n\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\n\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\n\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\n\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\n\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\n\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n\t// return vec4( value.brg, ( 3.0 + 128.0 ) / 256.0 );\n}\n\n// reference: http://iwasbeingirony.blogspot.ca/2010/06/difference-between-rgbm-and-rgbd.html\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\n\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\n\n// reference: http://iwasbeingirony.blogspot.ca/2010/06/difference-between-rgbm-and-rgbd.html\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\n\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\t// NOTE: The implementation with min causes the shader to not compile on\n\t// a common Alcatel A502DL in Chrome 78/Android 8.1. Some research suggests \n\t// that the chipset is Mediatek MT6739 w/ IMG PowerVR GE8100 GPU.\n\t// D = min( floor( D ) / 255.0, 1.0 );\n\tD = clamp( floor( D ) / 255.0, 0.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\n\n// LogLuv reference: http://graphicrants.blogspot.ca/2009/04/rgbm-color-encoding.html\n\n// M matrix, for encoding\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value ) {\n\tvec3 Xp_Y_XYZp = cLogLuvM * value.rgb;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\n\n// Inverse M matrix, for decoding\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}\n",
  envmap_fragment: "\n#ifdef USE_ENVMAP\n\n\t#ifdef ENV_WORLDPOS\n\n\t\tvec3 cameraToFrag;\n\n\t\tif ( isOrthographic ) {\n\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\n\t\t} else {\n\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\n\t\t}\n\n\t\t// Transforming Normal Vectors with the Inverse Transformation\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\n\t\t#else\n\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\n\t\t#endif\n\n\t#else\n\n\t\tvec3 reflectVec = vReflect;\n\n\t#endif\n\n\t#ifdef ENVMAP_TYPE_CUBE\n\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n\t\tenvColor = envMapTexelToLinear( envColor );\n\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\tvec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );\n\n\t#else\n\n\t\tvec4 envColor = vec4( 0.0 );\n\n\t#endif\n\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\n\t#endif\n\n#endif\n",
  envmap_common_pars_fragment: "\n#ifdef USE_ENVMAP\n\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif\n",
  envmap_pars_fragment: "\n#ifdef USE_ENVMAP\n\n\tuniform float reflectivity;\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n\t\t#define ENV_WORLDPOS\n\n\t#endif\n\n\t#ifdef ENV_WORLDPOS\n\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n\n#endif\n",
  envmap_pars_vertex: "\n#ifdef USE_ENVMAP\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )\n\n\t\t#define ENV_WORLDPOS\n\n\t#endif\n\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\n\t#else\n\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\n\t#endif\n\n#endif\n",
  envmap_physical_pars_fragment: "\n#if defined( USE_ENVMAP )\n\n\t#ifdef ENVMAP_MODE_REFRACTION\n\n\t\tuniform float refractionRatio;\n\n\t#endif\n\n\tvec3 getIBLIrradiance( const in GeometricContext geometry ) {\n\n\t\t#if defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\n\t\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\n\t\t#else\n\n\t\t\treturn vec3( 0.0 );\n\n\t\t#endif\n\n\t}\n\n\tvec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n\n\t\t#if defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\t\tvec3 reflectVec;\n\n\t\t\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\t\t\treflectVec = reflect( - viewDir, normal );\n\n\t\t\t\t// Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.\n\t\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\n\t\t\t#else\n\n\t\t\t\treflectVec = refract( - viewDir, normal, refractionRatio );\n\n\t\t\t#endif\n\n\t\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\n\t\t\treturn envMapColor.rgb * envMapIntensity;\n\n\t\t#else\n\n\t\t\treturn vec3( 0.0 );\n\n\t\t#endif\n\n\t}\n\n#endif\n",
  envmap_vertex: "\n#ifdef USE_ENVMAP\n\n\t#ifdef ENV_WORLDPOS\n\n\t\tvWorldPosition = worldPosition.xyz;\n\n\t#else\n\n\t\tvec3 cameraToVertex;\n\n\t\tif ( isOrthographic ) {\n\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\n\t\t} else {\n\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\n\t\t}\n\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\n\t\t#else\n\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\n\t\t#endif\n\n\t#endif\n\n#endif\n",
  fog_vertex: "\n#ifdef USE_FOG\n\n\tvFogDepth = - mvPosition.z;\n\n#endif\n",
  fog_pars_vertex: "\n#ifdef USE_FOG\n\n\tvarying float vFogDepth;\n\n#endif\n",
  fog_fragment: "\n#ifdef USE_FOG\n\n\t#ifdef FOG_EXP2\n\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n\n\t#else\n\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n\n\t#endif\n\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n\n#endif\n",
  fog_pars_fragment: "\n#ifdef USE_FOG\n\n\tuniform vec3 fogColor;\n\tvarying float vFogDepth;\n\n\t#ifdef FOG_EXP2\n\n\t\tuniform float fogDensity;\n\n\t#else\n\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\n\t#endif\n\n#endif\n",
  gradientmap_pars_fragment: "\n\n#ifdef USE_GRADIENTMAP\n\n\tuniform sampler2D gradientMap;\n\n#endif\n\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\n\t// dotNL will be from -1.0 to 1.0\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\n\t#ifdef USE_GRADIENTMAP\n\n\t\treturn texture2D( gradientMap, coord ).rgb;\n\n\t#else\n\n\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\n\t#endif\n\n}\n",
  lightmap_fragment: "\n#ifdef USE_LIGHTMAP\n\n\tvec4 lightMapTexel = texture2D( lightMap, vUv2 );\n\tvec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\n\t\tlightMapIrradiance *= PI;\n\n\t#endif\n\n\treflectedLight.indirectDiffuse += lightMapIrradiance;\n\n#endif\n",
  lightmap_pars_fragment: "\n#ifdef USE_LIGHTMAP\n\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n\n#endif\n",
  lights_lambert_vertex: "\nvec3 diffuse = vec3( 1.0 );\n\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );\n\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\n\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\n\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n\nvIndirectFront += getAmbientLightIrradiance( ambientLightColor );\n\nvIndirectFront += getLightProbeIrradiance( lightProbe, geometry );\n\n#ifdef DOUBLE_SIDED\n\n\tvIndirectBack += getAmbientLightIrradiance( ambientLightColor );\n\n\tvIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry );\n\n#endif\n\n#if NUM_POINT_LIGHTS > 0\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n\t\tgetPointLightInfo( pointLights[ i ], geometry, directLight );\n\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = directLight.color;\n\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvLightBack += saturate( - dotNL ) * directLightColor_Diffuse;\n\n\t\t#endif\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if NUM_SPOT_LIGHTS > 0\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n\t\tgetSpotLightInfo( spotLights[ i ], geometry, directLight );\n\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = directLight.color;\n\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvLightBack += saturate( - dotNL ) * directLightColor_Diffuse;\n\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if NUM_DIR_LIGHTS > 0\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n\t\tgetDirectionalLightInfo( directionalLights[ i ], geometry, directLight );\n\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = directLight.color;\n\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvLightBack += saturate( - dotNL ) * directLightColor_Diffuse;\n\n\t\t#endif\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if NUM_HEMI_LIGHTS > 0\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\n\t\t#endif\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n",
  lights_pars_begin: "\nuniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\n\n// get the irradiance (radiance convolved with cosine lobe) at the point 'normal' on the unit sphere\n// source: https://graphics.stanford.edu/papers/envmap/envmap.pdf\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\n\t// normal is assumed to have unit length\n\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\n\t// band 0\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\n\t// band 1\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\n\t// band 2\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\n\treturn result;\n\n}\n\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {\n\n\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\n\treturn irradiance;\n\n}\n\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\n\tvec3 irradiance = ambientLightColor;\n\n\treturn irradiance;\n\n}\n\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\n\t#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\n\t\t// based upon Frostbite 3 Moving to Physically-based Rendering\n\t\t// page 32, equation 26: E[window1]\n\t\t// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\n\t\tif ( cutoffDistance > 0.0 ) {\n\n\t\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\n\t\t}\n\n\t\treturn distanceFalloff;\n\n\t#else\n\n\t\tif ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\n\t\t\treturn pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\n\t\t}\n\n\t\treturn 1.0;\n\n\t#endif\n\n}\n\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n\n\treturn smoothstep( coneCosine, penumbraCosine, angleCosine );\n\n}\n\n#if NUM_DIR_LIGHTS > 0\n\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\n\tvoid getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {\n\n\t\tlight.color = directionalLight.color;\n\t\tlight.direction = directionalLight.direction;\n\t\tlight.visible = true;\n\n\t}\n\n#endif\n\n\n#if NUM_POINT_LIGHTS > 0\n\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\n\t// light is an out parameter as having it as a return value caused compiler errors on some devices\n\tvoid getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {\n\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\n\t\tlight.direction = normalize( lVector );\n\n\t\tfloat lightDistance = length( lVector );\n\n\t\tlight.color = pointLight.color;\n\t\tlight.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\n\t}\n\n#endif\n\n\n#if NUM_SPOT_LIGHTS > 0\n\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\n\t// light is an out parameter as having it as a return value caused compiler errors on some devices\n\tvoid getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {\n\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\n\t\tlight.direction = normalize( lVector );\n\n\t\tfloat angleCos = dot( light.direction, spotLight.direction );\n\n\t\tfloat spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\n\t\tif ( spotAttenuation > 0.0 ) {\n\n\t\t\tfloat lightDistance = length( lVector );\n\n\t\t\tlight.color = spotLight.color * spotAttenuation;\n\t\t\tlight.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\n\t\t} else {\n\n\t\t\tlight.color = vec3( 0.0 );\n\t\t\tlight.visible = false;\n\n\t\t}\n\n\t}\n\n#endif\n\n\n#if NUM_RECT_AREA_LIGHTS > 0\n\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\n\t// Pre-computed values of LinearTransformedCosine approximation of BRDF\n\t// BRDF approximation Texture is 64x64\n\tuniform sampler2D ltc_1; // RGBA Float\n\tuniform sampler2D ltc_2; // RGBA Float\n\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n\n#endif\n\n\n#if NUM_HEMI_LIGHTS > 0\n\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\n\t\treturn irradiance;\n\n\t}\n\n#endif\n",
  lights_toon_fragment: "\nToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\n",
  lights_toon_pars_fragment: "\nvarying vec3 vViewPosition;\n\nstruct ToonMaterial {\n\n\tvec3 diffuseColor;\n\n};\n\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\n\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n}\n\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n}\n\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon\n\n#define Material_LightProbeLOD( material )\t(0)\n",
  lights_phong_fragment: "\nBlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n",
  lights_phong_pars_fragment: "\nvarying vec3 vViewPosition;\n\nstruct BlinnPhongMaterial {\n\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n\n};\n\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n\treflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n\n}\n\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n}\n\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n\n#define Material_LightProbeLOD( material )\t(0)\n",
  lights_physical_fragment: "\nPhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\n\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\n\nmaterial.roughness = max( roughnessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.\nmaterial.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n\n#ifdef IOR\n\n\t#ifdef SPECULAR\n\n\t\tfloat specularIntensityFactor = specularIntensity;\n\t\tvec3 specularTintFactor = specularTint;\n\n\t\t#ifdef USE_SPECULARINTENSITYMAP\n\n\t\t\tspecularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;\n\n\t\t#endif\n\n\t\t#ifdef USE_SPECULARTINTMAP\n\n\t\t\tspecularTintFactor *= specularTintMapTexelToLinear( texture2D( specularTintMap, vUv ) ).rgb;\n\n\t\t#endif\n\n\t\tmaterial.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n\n\t#else\n\n\t\tfloat specularIntensityFactor = 1.0;\n\t\tvec3 specularTintFactor = vec3( 1.0 );\n\t\tmaterial.specularF90 = 1.0;\n\n\t#endif\n\n\tmaterial.specularColor = mix( min( pow2( ( ior - 1.0 ) / ( ior + 1.0 ) ) * specularTintFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );\n\n#else\n\n\tmaterial.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.specularF90 = 1.0;\n\n#endif\n\n#ifdef USE_CLEARCOAT\n\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\tmaterial.clearcoatF0 = vec3( 0.04 );\n\tmaterial.clearcoatF90 = 1.0;\n\n\t#ifdef USE_CLEARCOATMAP\n\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vUv ).x;\n\n\t#endif\n\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;\n\n\t#endif\n\n\tmaterial.clearcoat = saturate( material.clearcoat ); // Burley clearcoat model\n\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n\n#endif\n\n#ifdef USE_SHEEN\n\n\tmaterial.sheenTint = sheenTint;\n\n#endif\n",
  lights_physical_pars_fragment: "\nstruct PhysicalMaterial {\n\n\tvec3 diffuseColor;\n\tfloat roughness;\n\tvec3 specularColor;\n\tfloat specularF90;\n\n\t#ifdef USE_CLEARCOAT\n\t\tfloat clearcoat;\n\t\tfloat clearcoatRoughness;\n\t\tvec3 clearcoatF0;\n\t\tfloat clearcoatF90;\n\t#endif\n\n\t#ifdef USE_SHEEN\n\t\tvec3 sheenTint;\n\t#endif\n\n};\n\n// temporary\nvec3 clearcoatSpecular = vec3( 0.0 );\n\n// Analytical approximation of the DFG LUT, one half of the\n// split-sum approximation used in indirect specular lighting.\n// via 'environmentBRDF' from \"Physically Based Shading on Mobile\"\n// https://www.unrealengine.com/blog/physically-based-shading-on-mobile\nvec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\n\tvec4 r = roughness * c0 + c1;\n\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\n\tvec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;\n\n\treturn fab;\n\n}\n\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\n\treturn specularColor * fab.x + specularF90 * fab.y;\n\n}\n\n// Fdez-Agüera's \"Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting\"\n// Approximates multiscattering in order to preserve energy.\n// http://www.jcgt.org/published/0008/01/03/\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\n\tvec3 FssEss = specularColor * fab.x + specularF90 * fab.y;\n\n\tfloat Ess = fab.x + fab.y;\n\tfloat Ems = 1.0 - Ess;\n\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619; // 1/21\n\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n\n}\n\n#if NUM_RECT_AREA_LIGHTS > 0\n\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.roughness;\n\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction\n\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\n\t\t// LTC Fresnel Approximation by Stephen Hill\n\t\t// http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\n\t}\n\n#endif\n\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\n\tvec3 irradiance = dotNL * directLight.color;\n\n\t#ifdef USE_CLEARCOAT\n\n\t\tfloat dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\n\t\tvec3 ccIrradiance = dotNLcc * directLight.color;\n\n\t\tclearcoatSpecular += ccIrradiance * BRDF_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\n\t#endif\n\n\t#ifdef USE_SHEEN\n\n\t\treflectedLight.directSpecular += irradiance * BRDF_Sheen( material.roughness, directLight.direction, geometry, material.sheenTint );\n\n\t#else\n\n\t\treflectedLight.directSpecular += irradiance * BRDF_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );\n\n\t#endif\n\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n}\n\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\n\t#ifdef USE_CLEARCOAT\n\n\t\tclearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\n\t#endif\n\n\t// Both indirect specular and indirect diffuse light accumulate here\n\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\n\tcomputeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );\n\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );\n\n\treflectedLight.indirectSpecular += radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n\n}\n\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n\n// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n\n}\n",
  lights_fragment_begin: "\n/**\n * This is a template that can be used to light a material, it uses pluggable\n * RenderEquations (RE)for specific lighting scenarios.\n *\n * Instructions for use:\n * - Ensure that both RE_Direct, RE_IndirectDiffuse and RE_IndirectSpecular are defined\n * - If you have defined an RE_IndirectSpecular, you need to also provide a Material_LightProbeLOD. <---- ???\n * - Create a material parameter that is to be passed as the third parameter to your lighting functions.\n *\n * TODO:\n * - Add area light support.\n * - Add sphere light support.\n * - Add diffuse light probe (irradiance cubemap) support.\n */\n\nGeometricContext geometry;\n\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n\n#ifdef USE_CLEARCOAT\n\n\tgeometry.clearcoatNormal = clearcoatNormal;\n\n#endif\n\nIncidentLight directLight;\n\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n\t\tpointLight = pointLights[ i ];\n\n\t\tgetPointLightInfo( pointLight, geometry, directLight );\n\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\n\tSpotLight spotLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n\t\tspotLight = spotLights[ i ];\n\n\t\tgetSpotLightInfo( spotLight, geometry, directLight );\n\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n\t\tdirectionalLight = directionalLights[ i ];\n\n\t\tgetDirectionalLightInfo( directionalLight, geometry, directLight );\n\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\n\tRectAreaLight rectAreaLight;\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if defined( RE_IndirectDiffuse )\n\n\tvec3 iblIrradiance = vec3( 0.0 );\n\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry );\n\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\n\t\t}\n\t\t#pragma unroll_loop_end\n\n\t#endif\n\n#endif\n\n#if defined( RE_IndirectSpecular )\n\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n\n#endif\n",
  lights_fragment_maps: "\n#if defined( RE_IndirectDiffuse )\n\n\t#ifdef USE_LIGHTMAP\n\n\t\tvec4 lightMapTexel = texture2D( lightMap, vUv2 );\n\t\tvec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\n\t\t\tlightMapIrradiance *= PI;\n\n\t\t#endif\n\n\t\tirradiance += lightMapIrradiance;\n\n\t#endif\n\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\tiblIrradiance += getIBLIrradiance( geometry );\n\n\t#endif\n\n#endif\n\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\n\tradiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );\n\n\t#ifdef USE_CLEARCOAT\n\n\t\tclearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );\n\n\t#endif\n\n#endif\n",
  lights_fragment_end: "\n#if defined( RE_IndirectDiffuse )\n\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n\n#endif\n\n#if defined( RE_IndirectSpecular )\n\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n\n#endif\n",
  logdepthbuf_fragment: "\n#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\n\t// Doing a strict comparison with == 1.0 can cause noise artifacts\n\t// on some platforms. See issue #17623.\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n\n#endif\n",
  logdepthbuf_pars_fragment: "\n#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n\n#endif\n",
  logdepthbuf_pars_vertex: "\n#ifdef USE_LOGDEPTHBUF\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\n\t#else\n\n\t\tuniform float logDepthBufFC;\n\n\t#endif\n\n#endif\n",
  logdepthbuf_vertex: "\n#ifdef USE_LOGDEPTHBUF\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\n\t#else\n\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\n\t\t\tgl_Position.z *= gl_Position.w;\n\n\t\t}\n\n\t#endif\n\n#endif\n",
  map_fragment: "\n#ifdef USE_MAP\n\n\tvec4 texelColor = texture2D( map, vUv );\n\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n\n#endif\n",
  map_pars_fragment: "\n#ifdef USE_MAP\n\n\tuniform sampler2D map;\n\n#endif\n",
  map_particle_fragment: "\n#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\n#endif\n\n#ifdef USE_MAP\n\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n\n#endif\n\n#ifdef USE_ALPHAMAP\n\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n\n#endif\n",
  map_particle_pars_fragment: "\n#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\n\tuniform mat3 uvTransform;\n\n#endif\n\n#ifdef USE_MAP\n\n\tuniform sampler2D map;\n\n#endif\n\n#ifdef USE_ALPHAMAP\n\n\tuniform sampler2D alphaMap;\n\n#endif\n",
  metalnessmap_fragment: "\nfloat metalnessFactor = metalness;\n\n#ifdef USE_METALNESSMAP\n\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\n\t// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n\tmetalnessFactor *= texelMetalness.b;\n\n#endif\n",
  metalnessmap_pars_fragment: "\n#ifdef USE_METALNESSMAP\n\n\tuniform sampler2D metalnessMap;\n\n#endif\n",
  morphnormal_vertex: "\n#ifdef USE_MORPHNORMALS\n\n\t// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:\n\t// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)\n\t// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting\n\tobjectNormal *= morphTargetBaseInfluence;\n\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n\n#endif\n",
  morphtarget_pars_vertex: "\n#ifdef USE_MORPHTARGETS\n\n\tuniform float morphTargetBaseInfluence;\n\n\t#ifndef USE_MORPHNORMALS\n\n\t\tuniform float morphTargetInfluences[ 8 ];\n\n\t#else\n\n\t\tuniform float morphTargetInfluences[ 4 ];\n\n\t#endif\n\n#endif\n",
  morphtarget_vertex: "\n#ifdef USE_MORPHTARGETS\n\n\t// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:\n\t// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in position = sum((target - base) * influence)\n\t// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting\n\ttransformed *= morphTargetBaseInfluence;\n\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\n\t#ifndef USE_MORPHNORMALS\n\n\t\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\t\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\t\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\t\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\n\t#endif\n\n#endif\n",
  normal_fragment_begin: "\nfloat faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n\n#ifdef FLAT_SHADED\n\n\t// Workaround for Adreno GPUs not able to do dFdx( vViewPosition )\n\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n\n#else\n\n\tvec3 normal = normalize( vNormal );\n\n\t#ifdef DOUBLE_SIDED\n\n\t\tnormal = normal * faceDirection;\n\n\t#endif\n\n\t#ifdef USE_TANGENT\n\n\t\tvec3 tangent = normalize( vTangent );\n\t\tvec3 bitangent = normalize( vBitangent );\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\ttangent = tangent * faceDirection;\n\t\t\tbitangent = bitangent * faceDirection;\n\n\t\t#endif\n\n\t\t#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )\n\n\t\t\tmat3 vTBN = mat3( tangent, bitangent, normal );\n\n\t\t#endif\n\n\t#endif\n\n#endif\n\n// non perturbed normal for clearcoat among others\n\nvec3 geometryNormal = normal;\n\n",
  normal_fragment_maps: "\n\n#ifdef OBJECTSPACE_NORMALMAP\n\n\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals\n\n\t#ifdef FLIP_SIDED\n\n\t\tnormal = - normal;\n\n\t#endif\n\n\t#ifdef DOUBLE_SIDED\n\n\t\tnormal = normal * faceDirection;\n\n\t#endif\n\n\tnormal = normalize( normalMatrix * normal );\n\n#elif defined( TANGENTSPACE_NORMALMAP )\n\n\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\n\t#ifdef USE_TANGENT\n\n\t\tnormal = normalize( vTBN * mapN );\n\n\t#else\n\n\t\tnormal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );\n\n\t#endif\n\n#elif defined( USE_BUMPMAP )\n\n\tnormal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n\n#endif\n",
  normal_pars_fragment: "\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n\t#ifdef USE_TANGENT\n\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\n\t#endif\n\n#endif\n",
  normal_pars_vertex: "\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n\t#ifdef USE_TANGENT\n\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\n\t#endif\n\n#endif\n",
  normal_vertex: "\n#ifndef FLAT_SHADED // normal is computed with derivatives when FLAT_SHADED\n\n\tvNormal = normalize( transformedNormal );\n\n\t#ifdef USE_TANGENT\n\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\n\t#endif\n\n#endif\n",
  normalmap_pars_fragment: "\n#ifdef USE_NORMALMAP\n\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\n#endif\n\n#ifdef OBJECTSPACE_NORMALMAP\n\n\tuniform mat3 normalMatrix;\n\n#endif\n\n#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\n\t// Normal Mapping Without Precomputed Tangents\n\t// http://www.thetenthplanet.de/archives/1180\n\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {\n\n\t\t// Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988\n\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\n\t\tvec3 N = surf_norm; // normalized\n\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );\n\n\t\treturn normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );\n\n\t}\n\n#endif\n",
  clearcoat_normal_fragment_begin: "\n#ifdef USE_CLEARCOAT\n\n\tvec3 clearcoatNormal = geometryNormal;\n\n#endif\n",
  clearcoat_normal_fragment_maps: "\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\n\t#ifdef USE_TANGENT\n\n\t\tclearcoatNormal = normalize( vTBN * clearcoatMapN );\n\n\t#else\n\n\t\tclearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );\n\n\t#endif\n\n#endif\n",
  clearcoat_pars_fragment: "\n\n#ifdef USE_CLEARCOATMAP\n\n\tuniform sampler2D clearcoatMap;\n\n#endif\n\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\n\tuniform sampler2D clearcoatRoughnessMap;\n\n#endif\n\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n\n#endif\n",
  output_fragment: "\n#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n\n// https://github.com/mrdoob/three.js/pull/22425\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= transmissionAlpha + 0.1;\n#endif\n\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );\n",
  packing: "\nvec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\n\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\n\nconst float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)\nconst float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)\n\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\n\nconst float ShiftRight8 = 1. / 256.;\n\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8; // tidy overflow\n\treturn r * PackUpscale;\n}\n\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\n\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\n\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\n\n// NOTE: viewZ/eyeZ is < 0 when in front of the camera per OpenGL conventions\n\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\n\n// NOTE: https://twitter.com/gonnavis/status/1377183786949959682\n\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n",
  premultiplied_alpha_fragment: "\n#ifdef PREMULTIPLIED_ALPHA\n\n\t// Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.\n\tgl_FragColor.rgb *= gl_FragColor.a;\n\n#endif\n",
  project_vertex: "\nvec4 mvPosition = vec4( transformed, 1.0 );\n\n#ifdef USE_INSTANCING\n\n\tmvPosition = instanceMatrix * mvPosition;\n\n#endif\n\nmvPosition = modelViewMatrix * mvPosition;\n\ngl_Position = projectionMatrix * mvPosition;\n",
  dithering_fragment: "\n#ifdef DITHERING\n\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n\n#endif\n",
  dithering_pars_fragment: "\n#ifdef DITHERING\n\n\t// based on https://www.shadertoy.com/view/MslGR8\n\tvec3 dithering( vec3 color ) {\n\t\t//Calculate grid position\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\n\t\t//Shift the individual colors differently, thus making it even harder to see the dithering pattern\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\n\t\t//modify shift acording to grid position.\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\n\t\t//shift the color by dither_shift\n\t\treturn color + dither_shift_RGB;\n\t}\n\n#endif\n",
  roughnessmap_fragment: "\nfloat roughnessFactor = roughness;\n\n#ifdef USE_ROUGHNESSMAP\n\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\n\t// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n\troughnessFactor *= texelRoughness.g;\n\n#endif\n",
  roughnessmap_pars_fragment: "\n#ifdef USE_ROUGHNESSMAP\n\n\tuniform sampler2D roughnessMap;\n\n#endif\n",
  shadowmap_pars_fragment: "\n#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): create uniforms for area light shadows\n\n\t#endif\n\t*/\n\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\n\t}\n\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\n\t}\n\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\n\t\tfloat occlusion = 1.0;\n\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\n\t\tfloat hard_shadow = step( compare , distribution.x ); // Hard Shadow\n\n\t\tif (hard_shadow != 1.0 ) {\n\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance ); // Chebeyshevs inequality\n\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 ); // 0.3 reduces light bleed\n\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\n\t\t}\n\t\treturn occlusion;\n\n\t}\n\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\n\t\tfloat shadow = 1.0;\n\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\n\t\t// if ( something && something ) breaks ATI OpenGL shader compiler\n\t\t// if ( all( something, something ) ) using this instead\n\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\n\t\tbool frustumTest = all( frustumTestVec );\n\n\t\tif ( frustumTest ) {\n\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\n\t\t#else // no percentage-closer filtering:\n\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\n\t\t#endif\n\n\t\t}\n\n\t\treturn shadow;\n\n\t}\n\n\t// cubeToUV() maps a 3D direction vector suitable for cube texture mapping to a 2D\n\t// vector suitable for 2D texture mapping. This code uses the following layout for the\n\t// 2D texture:\n\t//\n\t// xzXZ\n\t//  y Y\n\t//\n\t// Y - Positive y direction\n\t// y - Negative y direction\n\t// X - Positive x direction\n\t// x - Negative x direction\n\t// Z - Positive z direction\n\t// z - Negative z direction\n\t//\n\t// Source and test bed:\n\t// https://gist.github.com/tschw/da10c43c467ce8afd0c4\n\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\n\t\t// Number of texels to avoid at the edge of each square\n\n\t\tvec3 absV = abs( v );\n\n\t\t// Intersect unit cube\n\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\n\t\t// Apply scale to avoid seams\n\n\t\t// two texels less per square (one texel will do for NEAREST)\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\n\t\t// Unwrap\n\n\t\t// space: -1 ... 1 range for each square\n\t\t//\n\t\t// #X##\t\tdim    := ( 4 , 2 )\n\t\t//  # #\t\tcenter := ( 1 , 1 )\n\n\t\tvec2 planar = v.xy;\n\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\n\t\tif ( absV.z >= almostOne ) {\n\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\n\t\t} else if ( absV.x >= almostOne ) {\n\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\n\t\t} else if ( absV.y >= almostOne ) {\n\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\n\t\t}\n\n\t\t// Transform to UV space\n\n\t\t// scale := 0.5 / dim\n\t\t// translate := ( center + 0.5 ) / dim\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\n\t}\n\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\n\t\t// for point lights, the uniform @vShadowCoord is re-purposed to hold\n\t\t// the vector from the light to the world-space position of the fragment.\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\n\t\t// dp = normalized distance from light to fragment position\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear ); // need to clamp?\n\t\tdp += shadowBias;\n\n\t\t// bd3D = base direction 3D\n\t\tvec3 bd3D = normalize( lightToPosition );\n\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\n\t\t#else // no percentage-closer filtering\n\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\n\t\t#endif\n\n\t}\n\n#endif\n",
  shadowmap_pars_vertex: "\n#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): uniforms for area light shadows\n\n\t#endif\n\t*/\n\n#endif\n",
  shadowmap_vertex: "\n#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0\n\n\t\t// Offsetting the position used for querying occlusion along the world normal can be used to reduce shadow acne.\n\t\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\tvec4 shadowWorldPosition;\n\n\t#endif\n\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#endif\n\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): update vAreaShadowCoord with area light info\n\n\t#endif\n\t*/\n\n#endif\n",
  shadowmask_pars_fragment: "\nfloat getShadowMask() {\n\n\tfloat shadow = 1.0;\n\n\t#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\n\tDirectionalLightShadow directionalLight;\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\n\tSpotLightShadow spotLight;\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#endif\n\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\n\tPointLightShadow pointLight;\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): update shadow for Area light\n\n\t#endif\n\t*/\n\n\t#endif\n\n\treturn shadow;\n\n}\n",
  skinbase_vertex: "\n#ifdef USE_SKINNING\n\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n#endif\n",
  skinning_pars_vertex: "\n#ifdef USE_SKINNING\n\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\n\t#ifdef BONE_TEXTURE\n\n\t\tuniform highp sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\n\t\tmat4 getBoneMatrix( const in float i ) {\n\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\n\t\t\ty = dy * ( y + 0.5 );\n\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\n\t\t\treturn bone;\n\n\t\t}\n\n\t#else\n\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\n\t\tmat4 getBoneMatrix( const in float i ) {\n\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\n\t\t}\n\n\t#endif\n\n#endif\n",
  skinning_vertex: "\n#ifdef USE_SKINNING\n\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n\n#endif\n",
  skinnormal_vertex: "\n#ifdef USE_SKINNING\n\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\n\t#ifdef USE_TANGENT\n\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\n\t#endif\n\n#endif\n",
  specularmap_fragment: "\nfloat specularStrength;\n\n#ifdef USE_SPECULARMAP\n\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n\n#else\n\n\tspecularStrength = 1.0;\n\n#endif\n",
  specularmap_pars_fragment: "\n#ifdef USE_SPECULARMAP\n\n\tuniform sampler2D specularMap;\n\n#endif\n",
  tonemapping_fragment: "\n#if defined( TONE_MAPPING )\n\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n\n#endif\n",
  tonemapping_pars_fragment: "\n#ifndef saturate\n// <common> may have defined saturate() already\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n\nuniform float toneMappingExposure;\n\n// exposure only\nvec3 LinearToneMapping( vec3 color ) {\n\n\treturn toneMappingExposure * color;\n\n}\n\n// source: https://www.cs.utah.edu/~reinhard/cdrom/\nvec3 ReinhardToneMapping( vec3 color ) {\n\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n\n}\n\n// source: http://filmicworlds.com/blog/filmic-tonemapping-operators/\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\n\t// optimized filmic operator by Jim Hejl and Richard Burgess-Dawson\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n\n}\n\n// source: https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs\nvec3 RRTAndODTFit( vec3 v ) {\n\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n\n}\n\n// this implementation of ACES is modified to accommodate a brighter viewing environment.\n// the scale factor of 1/0.6 is subjective. see discussion in #19621.\n\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\n\t// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ), // transposed from source\n\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\n\t// ODT_SAT => XYZ => D60_2_D65 => sRGB\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(  1.60475, -0.10208, -0.00327 ), // transposed from source\n\t\tvec3( -0.53108,  1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,  1.07602 )\n\t);\n\n\tcolor *= toneMappingExposure / 0.6;\n\n\tcolor = ACESInputMat * color;\n\n\t// Apply RRT and ODT\n\tcolor = RRTAndODTFit( color );\n\n\tcolor = ACESOutputMat * color;\n\n\t// Clamp to [0, 1]\n\treturn saturate( color );\n\n}\n\nvec3 CustomToneMapping( vec3 color ) { return color; }\n",
  transmission_fragment: "\n#ifdef USE_TRANSMISSION\n\n\tfloat transmissionAlpha = 1.0;\n\tfloat transmissionFactor = transmission;\n\tfloat thicknessFactor = thickness;\n\n\t#ifdef USE_TRANSMISSIONMAP\n\n\t\ttransmissionFactor *= texture2D( transmissionMap, vUv ).r;\n\n\t#endif\n\n\t#ifdef USE_THICKNESSMAP\n\n\t\tthicknessFactor *= texture2D( thicknessMap, vUv ).g;\n\n\t#endif\n\n\tvec3 pos = vWorldPosition;\n\tvec3 v = normalize( cameraPosition - pos );\n\tvec3 n = inverseTransformDirection( normal, viewMatrix );\n\n\tvec4 transmission = getIBLVolumeRefraction(\n\t\tn, v, roughnessFactor, material.diffuseColor, material.specularColor, material.specularF90,\n\t\tpos, modelMatrix, viewMatrix, projectionMatrix, ior, thicknessFactor,\n\t\tattenuationTint, attenuationDistance );\n\n\ttotalDiffuse = mix( totalDiffuse, transmission.rgb, transmissionFactor );\n\ttransmissionAlpha = transmission.a;\n#endif\n",
  transmission_pars_fragment: "\n#ifdef USE_TRANSMISSION\n\n\t// Transmission code is based on glTF-Sampler-Viewer\n\t// https://github.com/KhronosGroup/glTF-Sample-Viewer\n\n\tuniform float transmission;\n\tuniform float thickness;\n\tuniform float attenuationDistance;\n\tuniform vec3 attenuationTint;\n\n\t#ifdef USE_TRANSMISSIONMAP\n\n\t\tuniform sampler2D transmissionMap;\n\n\t#endif\n\n\t#ifdef USE_THICKNESSMAP\n\n\t\tuniform sampler2D thicknessMap;\n\n\t#endif\n\n\tuniform vec2 transmissionSamplerSize;\n\tuniform sampler2D transmissionSamplerMap;\n\n\tuniform mat4 modelMatrix;\n\tuniform mat4 projectionMatrix;\n\n\tvarying vec3 vWorldPosition;\n\n\tvec3 getVolumeTransmissionRay( vec3 n, vec3 v, float thickness, float ior, mat4 modelMatrix ) {\n\n\t\t// Direction of refracted light.\n\t\tvec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n\n\t\t// Compute rotation-independant scaling of the model matrix.\n\t\tvec3 modelScale;\n\t\tmodelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n\t\tmodelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n\t\tmodelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n\n\t\t// The thickness is specified in local space.\n\t\treturn normalize( refractionVector ) * thickness * modelScale;\n\n\t}\n\n\tfloat applyIorToRoughness( float roughness, float ior ) {\n\n\t\t// Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and\n\t\t// an IOR of 1.5 results in the default amount of microfacet refraction.\n\t\treturn roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n\n\t}\n\n\tvec4 getTransmissionSample( vec2 fragCoord, float roughness, float ior ) {\n\n\t\tfloat framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n\n\t\t#ifdef TEXTURE_LOD_EXT\n\n\t\t\treturn texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );\n\n\t\t#else\n\n\t\t\treturn texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );\n\n\t\t#endif\n\n\t}\n\n\tvec3 applyVolumeAttenuation( vec3 radiance, float transmissionDistance, vec3 attenuationColor, float attenuationDistance ) {\n\n\t\tif ( attenuationDistance == 0.0 ) {\n\n\t\t\t// Attenuation distance is +∞ (which we indicate by zero), i.e. the transmitted color is not attenuated at all.\n\t\t\treturn radiance;\n\n\t\t} else {\n\n\t\t\t// Compute light attenuation using Beer's law.\n\t\t\tvec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n\t\t\tvec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law\n\t\t\treturn transmittance * radiance;\n\n\t\t}\n\n\t}\n\n\tvec4 getIBLVolumeRefraction( vec3 n, vec3 v, float roughness, vec3 diffuseColor, vec3 specularColor, float specularF90,\n\t\tvec3 position, mat4 modelMatrix, mat4 viewMatrix, mat4 projMatrix, float ior, float thickness,\n\t\tvec3 attenuationColor, float attenuationDistance ) {\n\n\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n\t\tvec3 refractedRayExit = position + transmissionRay;\n\n\t\t// Project refracted vector on the framebuffer, while mapping to normalized device coordinates.\n\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\trefractionCoords += 1.0;\n\t\trefractionCoords /= 2.0;\n\n\t\t// Sample framebuffer to get pixel the refracted ray hits.\n\t\tvec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n\n\t\tvec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );\n\n\t\t// Get the specular component.\n\t\tvec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n\n\t\treturn vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );\n\n\t}\n#endif\n",
  uv_pars_fragment: "\n#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )\n\n\tvarying vec2 vUv;\n\n#endif\n",
  uv_pars_vertex: "\n#ifdef USE_UV\n\n\t#ifdef UVS_VERTEX_ONLY\n\n\t\tvec2 vUv;\n\n\t#else\n\n\t\tvarying vec2 vUv;\n\n\t#endif\n\n\tuniform mat3 uvTransform;\n\n#endif\n",
  uv_vertex: "\n#ifdef USE_UV\n\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\n#endif\n",
  uv2_pars_fragment: "\n#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\n\tvarying vec2 vUv2;\n\n#endif\n",
  uv2_pars_vertex: "\n#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\n\tuniform mat3 uv2Transform;\n\n#endif\n",
  uv2_vertex: "\n#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n\n#endif\n",
  worldpos_vertex: "\n#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION )\n\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\n\t#ifdef USE_INSTANCING\n\n\t\tworldPosition = instanceMatrix * worldPosition;\n\n\t#endif\n\n\tworldPosition = modelMatrix * worldPosition;\n\n#endif\n",
  background_frag: "\nuniform sampler2D t2D;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n\tvec4 texColor = texture2D( t2D, vUv );\n\n\tgl_FragColor = mapTexelToLinear( texColor );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\n}\n",
  background_vert: "\nvarying vec2 vUv;\nuniform mat3 uvTransform;\n\nvoid main() {\n\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n\n}\n",
  cube_frag: "\n#include <envmap_common_pars_fragment>\nuniform float opacity;\n\nvarying vec3 vWorldDirection;\n\n#include <cube_uv_reflection_fragment>\n\nvoid main() {\n\n\tvec3 vReflect = vWorldDirection;\n\t#include <envmap_fragment>\n\n\tgl_FragColor = envColor;\n\tgl_FragColor.a *= opacity;\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\n}\n",
  cube_vert: "\nvarying vec3 vWorldDirection;\n\n#include <common>\n\nvoid main() {\n\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\n\tgl_Position.z = gl_Position.w; // set z to camera.far\n\n}\n",
  depth_frag: "\n#if DEPTH_PACKING == 3200\n\n\tuniform float opacity;\n\n#endif\n\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvarying vec2 vHighPrecisionZW;\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( 1.0 );\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tdiffuseColor.a = opacity;\n\n\t#endif\n\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\n\t#include <logdepthbuf_fragment>\n\n\t// Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\n\t#elif DEPTH_PACKING == 3201\n\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\n\t#endif\n\n}\n",
  depth_vert: "\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\n// This is used for computing an equivalent of gl_FragCoord.z that is as high precision as possible.\n// Some platforms compute gl_FragCoord at a lower precision which makes the manually computed value better for\n// depth-based postprocessing effects. Reproduced on iPad with A10 processor / iPadOS 13.3.1.\nvarying vec2 vHighPrecisionZW;\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\t#include <skinbase_vertex>\n\n\t#ifdef USE_DISPLACEMENTMAP\n\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvHighPrecisionZW = gl_Position.zw;\n\n}\n",
  distanceRGBA_frag: "\n#define DISTANCE\n\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main () {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( 1.0 );\n\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist ); // clamp to [ 0, 1 ]\n\n\tgl_FragColor = packDepthToRGBA( dist );\n\n}\n",
  distanceRGBA_vert: "\n#define DISTANCE\n\nvarying vec3 vWorldPosition;\n\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\t#include <skinbase_vertex>\n\n\t#ifdef USE_DISPLACEMENTMAP\n\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvWorldPosition = worldPosition.xyz;\n\n}\n",
  equirect_frag: "\nuniform sampler2D tEquirect;\n\nvarying vec3 vWorldDirection;\n\n#include <common>\n\nvoid main() {\n\n\tvec3 direction = normalize( vWorldDirection );\n\n\tvec2 sampleUV = equirectUv( direction );\n\n\tvec4 texColor = texture2D( tEquirect, sampleUV );\n\n\tgl_FragColor = mapTexelToLinear( texColor );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\n}\n",
  equirect_vert: "\nvarying vec3 vWorldDirection;\n\n#include <common>\n\nvoid main() {\n\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\n}\n",
  linedashed_frag: "\nuniform vec3 diffuse;\nuniform float opacity;\n\nuniform float dashSize;\nuniform float totalSize;\n\nvarying float vLineDistance;\n\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\n\t\tdiscard;\n\n\t}\n\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\n\toutgoingLight = diffuseColor.rgb; // simple shader\n\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\n}\n",
  linedashed_vert: "\nuniform float scale;\nattribute float lineDistance;\n\nvarying float vLineDistance;\n\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\tvLineDistance = scale * lineDistance;\n\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\n}\n",
  meshbasic_frag: "\nuniform vec3 diffuse;\nuniform float opacity;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\n\t// accumulation (baked indirect lighting only)\n\t#ifdef USE_LIGHTMAP\n\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\treflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\n\t#else\n\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\n\t#endif\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\n\t#include <envmap_fragment>\n\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n",
  meshbasic_vert: "\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\n\t#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinbase_vertex>\n\t\t#include <skinnormal_vertex>\n\t\t#include <defaultnormal_vertex>\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n\n}\n",
  meshlambert_frag: "\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\n\t#ifdef DOUBLE_SIDED\n\n\t\treflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;\n\n\t#else\n\n\t\treflectedLight.indirectDiffuse += vIndirectFront;\n\n\t#endif\n\n\t#include <lightmap_fragment>\n\n\treflectedLight.indirectDiffuse *= BRDF_Lambert( diffuseColor.rgb );\n\n\t#ifdef DOUBLE_SIDED\n\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\n\t#else\n\n\t\treflectedLight.directDiffuse = vLightFront;\n\n\t#endif\n\n\treflectedLight.directDiffuse *= BRDF_Lambert( diffuseColor.rgb ) * getShadowMask();\n\n\t// modulation\n\n\t#include <aomap_fragment>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\n\t#include <envmap_fragment>\n\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",
  meshlambert_vert: "\n#define LAMBERT\n\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
  meshmatcap_frag: "\n#define MATCAP\n\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\n\nvarying vec3 vViewPosition;\n\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks\n\n\t#ifdef USE_MATCAP\n\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t\tmatcapColor = matcapTexelToLinear( matcapColor );\n\n\t#else\n\n\t\tvec4 matcapColor = vec4( 1.0 );\n\n\t#endif\n\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n",
  meshmatcap_vert: "\n#define MATCAP\n\nvarying vec3 vViewPosition;\n\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n}\n",
  meshnormal_frag: "\n#define NORMAL\n\nuniform float opacity;\n\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\n\tvarying vec3 vViewPosition;\n\n#endif\n\n#include <packing>\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n\n}\n",
  meshnormal_vert: "\n#define NORMAL\n\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\n\tvarying vec3 vViewPosition;\n\n#endif\n\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\n\tvViewPosition = - mvPosition.xyz;\n\n#endif\n\n}\n",
  meshphong_frag: "\n#define PHONG\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\n\t#include <envmap_fragment>\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n",
  meshphong_vert: "\n#define PHONG\n\nvarying vec3 vViewPosition;\n\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n",
  meshphysical_frag: "\n#define STANDARD\n\n#ifdef PHYSICAL\n\t#define IOR\n\t#define SPECULAR\n#endif\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n\n#ifdef IOR\n\tuniform float ior;\n#endif\n\n#ifdef SPECULAR\n\tuniform float specularIntensity;\n\tuniform vec3 specularTint;\n\n\t#ifdef USE_SPECULARINTENSITYMAP\n\t\tuniform sampler2D specularIntensityMap;\n\t#endif\n\n\t#ifdef USE_SPECULARTINTMAP\n\t\tuniform sampler2D specularTintMap;\n\t#endif\n#endif\n\n#ifdef USE_CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n\n#ifdef USE_SHEEN\n\tuniform vec3 sheenTint;\n#endif\n\nvarying vec3 vViewPosition;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\tvec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n\n\t#include <transmission_fragment>\n\n\tvec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n\n\t#ifdef USE_CLEARCOAT\n\n\t\tfloat dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\n\t\tvec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n\n\t\toutgoingLight = outgoingLight * ( 1.0 - clearcoat * Fcc ) + clearcoatSpecular * clearcoat;\n\n\t#endif\n\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n",
  meshphysical_vert: "\n#define STANDARD\n\nvarying vec3 vViewPosition;\n\n#ifdef USE_TRANSMISSION\n\n\tvarying vec3 vWorldPosition;\n\n#endif\n\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n#ifdef USE_TRANSMISSION\n\n\tvWorldPosition = worldPosition.xyz;\n\n#endif\n}\n",
  meshtoon_frag: "\n#define TOON\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n",
  meshtoon_vert: "\n#define TOON\n\nvarying vec3 vViewPosition;\n\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n",
  points_frag: "\nuniform vec3 diffuse;\nuniform float opacity;\n\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\n\toutgoingLight = diffuseColor.rgb;\n\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\n}\n",
  points_vert: "\nuniform float size;\nuniform float scale;\n\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\n\tgl_PointSize = size;\n\n\t#ifdef USE_SIZEATTENUATION\n\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\n\t#endif\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n\n}\n",
  shadow_frag: "\nuniform vec3 color;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n\nvoid main() {\n\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\n}\n",
  shadow_vert: "\n#include <common>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\n\nvoid main() {\n\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n",
  sprite_frag: "\nuniform vec3 diffuse;\nuniform float opacity;\n\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\n\toutgoingLight = diffuseColor.rgb;\n\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\n}\n",
  sprite_vert: "\nuniform float rotation;\nuniform vec2 center;\n\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\n\t#ifndef USE_SIZEATTENUATION\n\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\n\t#endif\n\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\n\tmvPosition.xy += rotatedPosition;\n\n\tgl_Position = projectionMatrix * mvPosition;\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\n}\n"
};
var _ = require("./6682.cjs");
var x = require("./1138.cjs");
var y = require("./1273.cjs");
const b = {
  common: {
    diffuse: {
      value: new m.I(16777215)
    },
    opacity: {
      value: 1
    },
    map: {
      value: null
    },
    uvTransform: {
      value: new y.V()
    },
    uv2Transform: {
      value: new y.V()
    },
    alphaMap: {
      value: null
    },
    alphaTest: {
      value: 0
    }
  },
  specularmap: {
    specularMap: {
      value: null
    }
  },
  envmap: {
    envMap: {
      value: null
    },
    flipEnvMap: {
      value: -1
    },
    reflectivity: {
      value: 1
    },
    ior: {
      value: 1.5
    },
    refractionRatio: {
      value: 0.98
    },
    maxMipLevel: {
      value: 0
    }
  },
  aomap: {
    aoMap: {
      value: null
    },
    aoMapIntensity: {
      value: 1
    }
  },
  lightmap: {
    lightMap: {
      value: null
    },
    lightMapIntensity: {
      value: 1
    }
  },
  emissivemap: {
    emissiveMap: {
      value: null
    }
  },
  bumpmap: {
    bumpMap: {
      value: null
    },
    bumpScale: {
      value: 1
    }
  },
  normalmap: {
    normalMap: {
      value: null
    },
    normalScale: {
      value: new x.F(1, 1)
    }
  },
  displacementmap: {
    displacementMap: {
      value: null
    },
    displacementScale: {
      value: 1
    },
    displacementBias: {
      value: 0
    }
  },
  roughnessmap: {
    roughnessMap: {
      value: null
    }
  },
  metalnessmap: {
    metalnessMap: {
      value: null
    }
  },
  gradientmap: {
    gradientMap: {
      value: null
    }
  },
  fog: {
    fogDensity: {
      value: 0.00025
    },
    fogNear: {
      value: 1
    },
    fogFar: {
      value: 2000
    },
    fogColor: {
      value: new m.I(16777215)
    }
  },
  lights: {
    ambientLightColor: {
      value: []
    },
    lightProbe: {
      value: []
    },
    directionalLights: {
      value: [],
      properties: {
        direction: {},
        color: {}
      }
    },
    directionalLightShadows: {
      value: [],
      properties: {
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {}
      }
    },
    directionalShadowMap: {
      value: []
    },
    directionalShadowMatrix: {
      value: []
    },
    spotLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        direction: {},
        distance: {},
        coneCos: {},
        penumbraCos: {},
        decay: {}
      }
    },
    spotLightShadows: {
      value: [],
      properties: {
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {}
      }
    },
    spotShadowMap: {
      value: []
    },
    spotShadowMatrix: {
      value: []
    },
    pointLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        decay: {},
        distance: {}
      }
    },
    pointLightShadows: {
      value: [],
      properties: {
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {},
        shadowCameraNear: {},
        shadowCameraFar: {}
      }
    },
    pointShadowMap: {
      value: []
    },
    pointShadowMatrix: {
      value: []
    },
    hemisphereLights: {
      value: [],
      properties: {
        direction: {},
        skyColor: {},
        groundColor: {}
      }
    },
    rectAreaLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        width: {},
        height: {}
      }
    },
    ltc_1: {
      value: null
    },
    ltc_2: {
      value: null
    }
  },
  points: {
    diffuse: {
      value: new m.I(16777215)
    },
    opacity: {
      value: 1
    },
    size: {
      value: 1
    },
    scale: {
      value: 1
    },
    map: {
      value: null
    },
    alphaMap: {
      value: null
    },
    alphaTest: {
      value: 0
    },
    uvTransform: {
      value: new y.V()
    }
  },
  sprite: {
    diffuse: {
      value: new m.I(16777215)
    },
    opacity: {
      value: 1
    },
    center: {
      value: new x.F(0.5, 0.5)
    },
    rotation: {
      value: 0
    },
    map: {
      value: null
    },
    alphaMap: {
      value: null
    },
    alphaTest: {
      value: 0
    },
    uvTransform: {
      value: new y.V()
    }
  }
};
const w = {
  basic: {
    uniforms: (0, _.Rh)([b.common, b.specularmap, b.envmap, b.aomap, b.lightmap, b.fog]),
    vertexShader: v.meshbasic_vert,
    fragmentShader: v.meshbasic_frag
  },
  lambert: {
    uniforms: (0, _.Rh)([b.common, b.specularmap, b.envmap, b.aomap, b.lightmap, b.emissivemap, b.fog, b.lights, {
      emissive: {
        value: new m.I(0)
      }
    }]),
    vertexShader: v.meshlambert_vert,
    fragmentShader: v.meshlambert_frag
  },
  phong: {
    uniforms: (0, _.Rh)([b.common, b.specularmap, b.envmap, b.aomap, b.lightmap, b.emissivemap, b.bumpmap, b.normalmap, b.displacementmap, b.fog, b.lights, {
      emissive: {
        value: new m.I(0)
      },
      specular: {
        value: new m.I(1118481)
      },
      shininess: {
        value: 30
      }
    }]),
    vertexShader: v.meshphong_vert,
    fragmentShader: v.meshphong_frag
  },
  standard: {
    uniforms: (0, _.Rh)([b.common, b.envmap, b.aomap, b.lightmap, b.emissivemap, b.bumpmap, b.normalmap, b.displacementmap, b.roughnessmap, b.metalnessmap, b.fog, b.lights, {
      emissive: {
        value: new m.I(0)
      },
      roughness: {
        value: 1
      },
      metalness: {
        value: 0
      },
      envMapIntensity: {
        value: 1
      }
    }]),
    vertexShader: v.meshphysical_vert,
    fragmentShader: v.meshphysical_frag
  },
  toon: {
    uniforms: (0, _.Rh)([b.common, b.aomap, b.lightmap, b.emissivemap, b.bumpmap, b.normalmap, b.displacementmap, b.gradientmap, b.fog, b.lights, {
      emissive: {
        value: new m.I(0)
      }
    }]),
    vertexShader: v.meshtoon_vert,
    fragmentShader: v.meshtoon_frag
  },
  matcap: {
    uniforms: (0, _.Rh)([b.common, b.bumpmap, b.normalmap, b.displacementmap, b.fog, {
      matcap: {
        value: null
      }
    }]),
    vertexShader: v.meshmatcap_vert,
    fragmentShader: v.meshmatcap_frag
  },
  points: {
    uniforms: (0, _.Rh)([b.points, b.fog]),
    vertexShader: v.points_vert,
    fragmentShader: v.points_frag
  },
  dashed: {
    uniforms: (0, _.Rh)([b.common, b.fog, {
      scale: {
        value: 1
      },
      dashSize: {
        value: 1
      },
      totalSize: {
        value: 2
      }
    }]),
    vertexShader: v.linedashed_vert,
    fragmentShader: v.linedashed_frag
  },
  depth: {
    uniforms: (0, _.Rh)([b.common, b.displacementmap]),
    vertexShader: v.depth_vert,
    fragmentShader: v.depth_frag
  },
  normal: {
    uniforms: (0, _.Rh)([b.common, b.bumpmap, b.normalmap, b.displacementmap, {
      opacity: {
        value: 1
      }
    }]),
    vertexShader: v.meshnormal_vert,
    fragmentShader: v.meshnormal_frag
  },
  sprite: {
    uniforms: (0, _.Rh)([b.sprite, b.fog]),
    vertexShader: v.sprite_vert,
    fragmentShader: v.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: {
        value: new y.V()
      },
      t2D: {
        value: null
      }
    },
    vertexShader: v.background_vert,
    fragmentShader: v.background_frag
  },
  cube: {
    uniforms: (0, _.Rh)([b.envmap, {
      opacity: {
        value: 1
      }
    }]),
    vertexShader: v.cube_vert,
    fragmentShader: v.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: {
        value: null
      }
    },
    vertexShader: v.equirect_vert,
    fragmentShader: v.equirect_frag
  },
  distanceRGBA: {
    uniforms: (0, _.Rh)([b.common, b.displacementmap, {
      referencePosition: {
        value: new a.P()
      },
      nearDistance: {
        value: 1
      },
      farDistance: {
        value: 1000
      }
    }]),
    vertexShader: v.distanceRGBA_vert,
    fragmentShader: v.distanceRGBA_frag
  },
  shadow: {
    uniforms: (0, _.Rh)([b.lights, b.fog, {
      color: {
        value: new m.I(0)
      },
      opacity: {
        value: 1
      }
    }]),
    vertexShader: v.shadow_vert,
    fragmentShader: v.shadow_frag
  }
};
function M(t, e, n, i, s) {
  const a = new m.I(0);
  let o;
  let l;
  let c = 0;
  let u = null;
  let h = 0;
  let v = null;
  function x(t, e) {
    n.buffers.color.setClear(t.r, t.g, t.b, e, s);
  }
  return {
    getClearColor: function () {
      return a;
    },
    setClearColor: function (t, e = 1) {
      a.set(t);
      c = e;
      x(a, c);
    },
    getClearAlpha: function () {
      return c;
    },
    setClearAlpha: function (t) {
      c = t;
      x(a, c);
    },
    render: function (n, s) {
      let m = false;
      let y = s.isScene === true ? s.background : null;
      if (y && y.isTexture) {
        y = e.get(y);
      }
      const b = t.xr;
      const M = b.getSession && b.getSession();
      if (M && M.environmentBlendMode === "additive") {
        y = null;
      }
      if (y === null) {
        x(a, c);
      } else if (y && y.isColor) {
        x(y, 1);
        m = true;
      }
      if (t.autoClear || m) {
        t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil);
      }
      if (y && (y.isCubeTexture || y.mapping === r.g8_)) {
        if (l === undefined) {
          l = new g.K(new d(1, 1, 1), new p.j({
            name: "BackgroundCubeMaterial",
            uniforms: (0, _.dw)(w.cube.uniforms),
            vertexShader: w.cube.vertexShader,
            fragmentShader: w.cube.fragmentShader,
            side: r._Li,
            depthTest: false,
            depthWrite: false,
            fog: false
          }));
          l.geometry.deleteAttribute("normal");
          l.geometry.deleteAttribute("uv");
          l.onBeforeRender = function (t, e, n) {
            this.matrixWorld.copyPosition(n.matrixWorld);
          };
          Object.defineProperty(l.material, "envMap", {
            get: function () {
              return this.uniforms.envMap.value;
            }
          });
          i.update(l);
        }
        l.material.uniforms.envMap.value = y;
        l.material.uniforms.flipEnvMap.value = y.isCubeTexture && y.isRenderTargetTexture === false ? -1 : 1;
        if (u !== y || h !== y.version || v !== t.toneMapping) {
          l.material.needsUpdate = true;
          u = y;
          h = y.version;
          v = t.toneMapping;
        }
        n.unshift(l, l.geometry, l.material, 0, 0, null);
      } else if (y && y.isTexture) {
        if (o === undefined) {
          o = new g.K(new f._(2, 2), new p.j({
            name: "BackgroundMaterial",
            uniforms: (0, _.dw)(w.background.uniforms),
            vertexShader: w.background.vertexShader,
            fragmentShader: w.background.fragmentShader,
            side: r.Wl3,
            depthTest: false,
            depthWrite: false,
            fog: false
          }));
          o.geometry.deleteAttribute("normal");
          Object.defineProperty(o.material, "map", {
            get: function () {
              return this.uniforms.t2D.value;
            }
          });
          i.update(o);
        }
        o.material.uniforms.t2D.value = y;
        if (y.matrixAutoUpdate === true) {
          y.updateMatrix();
        }
        o.material.uniforms.uvTransform.value.copy(y.matrix);
        if (u !== y || h !== y.version || v !== t.toneMapping) {
          o.material.needsUpdate = true;
          u = y;
          h = y.version;
          v = t.toneMapping;
        }
        n.unshift(o, o.geometry, o.material, 0, 0, null);
      }
    }
  };
}
function T(t, e, n, r) {
  const i = t.getParameter(t.MAX_VERTEX_ATTRIBS);
  const s = r.isWebGL2 ? null : e.get("OES_vertex_array_object");
  const a = r.isWebGL2 || s !== null;
  const o = {};
  const l = d(null);
  let c = l;
  function u(e) {
    if (r.isWebGL2) {
      return t.bindVertexArray(e);
    } else {
      return s.bindVertexArrayOES(e);
    }
  }
  function h(e) {
    if (r.isWebGL2) {
      return t.deleteVertexArray(e);
    } else {
      return s.deleteVertexArrayOES(e);
    }
  }
  function d(t) {
    const e = [];
    const n = [];
    const r = [];
    for (let t = 0; t < i; t++) {
      e[t] = 0;
      n[t] = 0;
      r[t] = 0;
    }
    return {
      geometry: null,
      program: null,
      wireframe: false,
      newAttributes: e,
      enabledAttributes: n,
      attributeDivisors: r,
      object: t,
      attributes: {},
      index: null
    };
  }
  function f() {
    const t = c.newAttributes;
    for (let e = 0, n = t.length; e < n; e++) {
      t[e] = 0;
    }
  }
  function p(t) {
    m(t, 0);
  }
  function m(n, i) {
    const s = c.newAttributes;
    const a = c.enabledAttributes;
    const o = c.attributeDivisors;
    s[n] = 1;
    if (a[n] === 0) {
      t.enableVertexAttribArray(n);
      a[n] = 1;
    }
    if (o[n] !== i) {
      (r.isWebGL2 ? t : e.get("ANGLE_instanced_arrays"))[r.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](n, i);
      o[n] = i;
    }
  }
  function g() {
    const e = c.newAttributes;
    const n = c.enabledAttributes;
    for (let r = 0, i = n.length; r < i; r++) {
      if (n[r] !== e[r]) {
        t.disableVertexAttribArray(r);
        n[r] = 0;
      }
    }
  }
  function v(e, n, i, s, a, o) {
    if (r.isWebGL2 !== true || i !== t.INT && i !== t.UNSIGNED_INT) {
      t.vertexAttribPointer(e, n, i, s, a, o);
    } else {
      t.vertexAttribIPointer(e, n, i, a, o);
    }
  }
  function _() {
    x();
    if (c !== l) {
      c = l;
      u(c.object);
    }
  }
  function x() {
    l.geometry = null;
    l.program = null;
    l.wireframe = false;
  }
  return {
    setup: function (i, l, h, _, x) {
      let y = false;
      if (a) {
        const e = function (e, n, i) {
          const a = i.wireframe === true;
          let l = o[e.id];
          if (l === undefined) {
            l = {};
            o[e.id] = l;
          }
          let c = l[n.id];
          if (c === undefined) {
            c = {};
            l[n.id] = c;
          }
          let u = c[a];
          if (u === undefined) {
            u = d(r.isWebGL2 ? t.createVertexArray() : s.createVertexArrayOES());
            c[a] = u;
          }
          return u;
        }(_, h, l);
        if (c !== e) {
          c = e;
          u(c.object);
        }
        y = function (t, e) {
          const n = c.attributes;
          const r = t.attributes;
          let i = 0;
          for (const t in r) {
            const e = n[t];
            const s = r[t];
            if (e === undefined) {
              return true;
            }
            if (e.attribute !== s) {
              return true;
            }
            if (e.data !== s.data) {
              return true;
            }
            i++;
          }
          return c.attributesNum !== i || c.index !== e;
        }(_, x);
        if (y) {
          (function (t, e) {
            const n = {};
            const r = t.attributes;
            let i = 0;
            for (const t in r) {
              const e = r[t];
              const s = {
                attribute: e
              };
              if (e.data) {
                s.data = e.data;
              }
              n[t] = s;
              i++;
            }
            c.attributes = n;
            c.attributesNum = i;
            c.index = e;
          })(_, x);
        }
      } else {
        const t = l.wireframe === true;
        if (c.geometry !== _.id || c.program !== h.id || c.wireframe !== t) {
          c.geometry = _.id;
          c.program = h.id;
          c.wireframe = t;
          y = true;
        }
      }
      if (i.isInstancedMesh === true) {
        y = true;
      }
      if (x !== null) {
        n.update(x, t.ELEMENT_ARRAY_BUFFER);
      }
      if (y) {
        (function (i, s, a, o) {
          if (r.isWebGL2 === false && (i.isInstancedMesh || o.isInstancedBufferGeometry) && e.get("ANGLE_instanced_arrays") === null) {
            return;
          }
          f();
          const l = o.attributes;
          const c = a.getAttributes();
          const u = s.defaultAttributeValues;
          for (const e in c) {
            const r = c[e];
            if (r.location >= 0) {
              let s = l[e];
              if (s === undefined) {
                if (e === "instanceMatrix" && i.instanceMatrix) {
                  s = i.instanceMatrix;
                }
                if (e === "instanceColor" && i.instanceColor) {
                  s = i.instanceColor;
                }
              }
              if (s !== undefined) {
                const e = s.normalized;
                const a = s.itemSize;
                const l = n.get(s);
                if (l === undefined) {
                  continue;
                }
                const c = l.buffer;
                const u = l.type;
                const h = l.bytesPerElement;
                if (s.isInterleavedBufferAttribute) {
                  const n = s.data;
                  const l = n.stride;
                  const d = s.offset;
                  if (n && n.isInstancedInterleavedBuffer) {
                    for (let t = 0; t < r.locationSize; t++) {
                      m(r.location + t, n.meshPerAttribute);
                    }
                    if (i.isInstancedMesh !== true && o._maxInstanceCount === undefined) {
                      o._maxInstanceCount = n.meshPerAttribute * n.count;
                    }
                  } else {
                    for (let t = 0; t < r.locationSize; t++) {
                      p(r.location + t);
                    }
                  }
                  t.bindBuffer(t.ARRAY_BUFFER, c);
                  for (let t = 0; t < r.locationSize; t++) {
                    v(r.location + t, a / r.locationSize, u, e, l * h, (d + a / r.locationSize * t) * h);
                  }
                } else {
                  if (s.isInstancedBufferAttribute) {
                    for (let t = 0; t < r.locationSize; t++) {
                      m(r.location + t, s.meshPerAttribute);
                    }
                    if (i.isInstancedMesh !== true && o._maxInstanceCount === undefined) {
                      o._maxInstanceCount = s.meshPerAttribute * s.count;
                    }
                  } else {
                    for (let t = 0; t < r.locationSize; t++) {
                      p(r.location + t);
                    }
                  }
                  t.bindBuffer(t.ARRAY_BUFFER, c);
                  for (let t = 0; t < r.locationSize; t++) {
                    v(r.location + t, a / r.locationSize, u, e, a * h, a / r.locationSize * t * h);
                  }
                }
              } else if (u !== undefined) {
                const n = u[e];
                if (n !== undefined) {
                  switch (n.length) {
                    case 2:
                      t.vertexAttrib2fv(r.location, n);
                      break;
                    case 3:
                      t.vertexAttrib3fv(r.location, n);
                      break;
                    case 4:
                      t.vertexAttrib4fv(r.location, n);
                      break;
                    default:
                      t.vertexAttrib1fv(r.location, n);
                  }
                }
              }
            }
          }
          g();
        })(i, l, h, _);
        if (x !== null) {
          t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, n.get(x).buffer);
        }
      }
    },
    reset: _,
    resetDefaultState: x,
    dispose: function () {
      _();
      for (const t in o) {
        const e = o[t];
        for (const t in e) {
          const n = e[t];
          for (const t in n) {
            h(n[t].object);
            delete n[t];
          }
          delete e[t];
        }
        delete o[t];
      }
    },
    releaseStatesOfGeometry: function (t) {
      if (o[t.id] === undefined) {
        return;
      }
      const e = o[t.id];
      for (const t in e) {
        const n = e[t];
        for (const t in n) {
          h(n[t].object);
          delete n[t];
        }
        delete e[t];
      }
      delete o[t.id];
    },
    releaseStatesOfProgram: function (t) {
      for (const e in o) {
        const n = o[e];
        if (n[t.id] === undefined) {
          continue;
        }
        const r = n[t.id];
        for (const t in r) {
          h(r[t].object);
          delete r[t];
        }
        delete n[t.id];
      }
    },
    initAttributes: f,
    enableAttribute: p,
    disableUnusedAttributes: g
  };
}
function S(t, e, n, r) {
  const i = r.isWebGL2;
  let s;
  this.setMode = function (t) {
    s = t;
  };
  this.render = function (e, r) {
    t.drawArrays(s, e, r);
    n.update(r, s, 1);
  };
  this.renderInstances = function (r, a, o) {
    if (o === 0) {
      return;
    }
    let l;
    let c;
    if (i) {
      l = t;
      c = "drawArraysInstanced";
    } else {
      l = e.get("ANGLE_instanced_arrays");
      c = "drawArraysInstancedANGLE";
      if (l === null) {
        console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
        return;
      }
    }
    l[c](s, r, a, o);
    n.update(a, s, o);
  };
}
function E(t, e, n) {
  let r;
  function i(e) {
    if (e === "highp") {
      if (t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_FLOAT).precision > 0 && t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT).precision > 0) {
        return "highp";
      }
      e = "mediump";
    }
    if (e === "mediump" && t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_FLOAT).precision > 0 && t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_FLOAT).precision > 0) {
      return "mediump";
    } else {
      return "lowp";
    }
  }
  const s = typeof WebGL2RenderingContext != "undefined" && t instanceof WebGL2RenderingContext || typeof WebGL2ComputeRenderingContext != "undefined" && t instanceof WebGL2ComputeRenderingContext;
  let a = n.precision !== undefined ? n.precision : "highp";
  const o = i(a);
  if (o !== a) {
    console.warn("THREE.WebGLRenderer:", a, "not supported, using", o, "instead.");
    a = o;
  }
  const l = s || e.has("WEBGL_draw_buffers");
  const c = n.logarithmicDepthBuffer === true;
  const u = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);
  const h = t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
  const d = t.getParameter(t.MAX_TEXTURE_SIZE);
  const f = t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE);
  const p = t.getParameter(t.MAX_VERTEX_ATTRIBS);
  const m = t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS);
  const g = t.getParameter(t.MAX_VARYING_VECTORS);
  const v = t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS);
  const _ = h > 0;
  const x = s || e.has("OES_texture_float");
  return {
    isWebGL2: s,
    drawBuffers: l,
    getMaxAnisotropy: function () {
      if (r !== undefined) {
        return r;
      }
      if (e.has("EXT_texture_filter_anisotropic") === true) {
        const n = e.get("EXT_texture_filter_anisotropic");
        r = t.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      } else {
        r = 0;
      }
      return r;
    },
    getMaxPrecision: i,
    precision: a,
    logarithmicDepthBuffer: c,
    maxTextures: u,
    maxVertexTextures: h,
    maxTextureSize: d,
    maxCubemapSize: f,
    maxAttributes: p,
    maxVertexUniforms: m,
    maxVaryings: g,
    maxFragmentUniforms: v,
    vertexTextures: _,
    floatFragmentTextures: x,
    floatVertexTextures: _ && x,
    maxSamples: s ? t.getParameter(t.MAX_SAMPLES) : 0
  };
}
w.physical = {
  uniforms: (0, _.Rh)([w.standard.uniforms, {
    clearcoat: {
      value: 0
    },
    clearcoatMap: {
      value: null
    },
    clearcoatRoughness: {
      value: 0
    },
    clearcoatRoughnessMap: {
      value: null
    },
    clearcoatNormalScale: {
      value: new x.F(1, 1)
    },
    clearcoatNormalMap: {
      value: null
    },
    sheenTint: {
      value: new m.I(0)
    },
    transmission: {
      value: 0
    },
    transmissionMap: {
      value: null
    },
    transmissionSamplerSize: {
      value: new x.F()
    },
    transmissionSamplerMap: {
      value: null
    },
    thickness: {
      value: 0
    },
    thicknessMap: {
      value: null
    },
    attenuationDistance: {
      value: 0
    },
    attenuationTint: {
      value: new m.I(0)
    },
    specularIntensity: {
      value: 0
    },
    specularIntensityMap: {
      value: null
    },
    specularTint: {
      value: new m.I(1, 1, 1)
    },
    specularTintMap: {
      value: null
    }
  }]),
  vertexShader: v.meshphysical_vert,
  fragmentShader: v.meshphysical_frag
};
var A = require("./1158.cjs");
function R(t) {
  const e = this;
  let n = null;
  let r = 0;
  let i = false;
  let s = false;
  const a = new A.J();
  const o = new y.V();
  const l = {
    value: null,
    needsUpdate: false
  };
  function c() {
    if (l.value !== n) {
      l.value = n;
      l.needsUpdate = r > 0;
    }
    e.numPlanes = r;
    e.numIntersection = 0;
  }
  function u(t, n, r, i) {
    const s = t !== null ? t.length : 0;
    let c = null;
    if (s !== 0) {
      c = l.value;
      if (i !== true || c === null) {
        const e = r + s * 4;
        const i = n.matrixWorldInverse;
        o.getNormalMatrix(i);
        if (c === null || c.length < e) {
          c = new Float32Array(e);
        }
        for (let e = 0, n = r; e !== s; ++e, n += 4) {
          a.copy(t[e]).applyMatrix4(i, o);
          a.normal.toArray(c, n);
          c[n + 3] = a.constant;
        }
      }
      l.value = c;
      l.needsUpdate = true;
    }
    e.numPlanes = s;
    e.numIntersection = 0;
    return c;
  }
  this.uniform = l;
  this.numPlanes = 0;
  this.numIntersection = 0;
  this.init = function (t, e, s) {
    const a = t.length !== 0 || e || r !== 0 || i;
    i = e;
    n = u(t, s, 0);
    r = t.length;
    return a;
  };
  this.beginShadows = function () {
    s = true;
    u(null);
  };
  this.endShadows = function () {
    s = false;
    c();
  };
  this.setState = function (e, a, o) {
    const h = e.clippingPlanes;
    const d = e.clipIntersection;
    const f = e.clipShadows;
    const p = t.get(e);
    if (!i || h === null || h.length === 0 || s && !f) {
      if (s) {
        u(null);
      } else {
        c();
      }
    } else {
      const t = s ? 0 : r;
      const e = t * 4;
      let i = p.clippingState || null;
      l.value = i;
      i = u(h, a, e, o);
      for (let t = 0; t !== e; ++t) {
        i[t] = n[t];
      }
      p.clippingState = i;
      this.numIntersection = d ? this.numPlanes : 0;
      this.numPlanes += t;
    }
  };
}
var L = require("./4302.cjs");
var P = require("./8478.cjs");
var C = require("./1051.cjs");
const D = 90;
class I extends P.T {
  constructor(t, e, n) {
    super();
    this.type = "CubeCamera";
    if (n.isWebGLCubeRenderTarget !== true) {
      console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");
      return;
    }
    this.renderTarget = n;
    const r = new C.c(D, 1, t, e);
    r.layers = this.layers;
    r.up.set(0, -1, 0);
    r.lookAt(new a.P(1, 0, 0));
    this.add(r);
    const i = new C.c(D, 1, t, e);
    i.layers = this.layers;
    i.up.set(0, -1, 0);
    i.lookAt(new a.P(-1, 0, 0));
    this.add(i);
    const s = new C.c(D, 1, t, e);
    s.layers = this.layers;
    s.up.set(0, 0, 1);
    s.lookAt(new a.P(0, 1, 0));
    this.add(s);
    const o = new C.c(D, 1, t, e);
    o.layers = this.layers;
    o.up.set(0, 0, -1);
    o.lookAt(new a.P(0, -1, 0));
    this.add(o);
    const l = new C.c(D, 1, t, e);
    l.layers = this.layers;
    l.up.set(0, -1, 0);
    l.lookAt(new a.P(0, 0, 1));
    this.add(l);
    const c = new C.c(D, 1, t, e);
    c.layers = this.layers;
    c.up.set(0, -1, 0);
    c.lookAt(new a.P(0, 0, -1));
    this.add(c);
  }
  update(t, e) {
    if (this.parent === null) {
      this.updateMatrixWorld();
    }
    const n = this.renderTarget;
    const [r, i, s, a, o, l] = this.children;
    const c = t.xr.enabled;
    const u = t.getRenderTarget();
    t.xr.enabled = false;
    const h = n.texture.generateMipmaps;
    n.texture.generateMipmaps = false;
    t.setRenderTarget(n, 0);
    t.render(e, r);
    t.setRenderTarget(n, 1);
    t.render(e, i);
    t.setRenderTarget(n, 2);
    t.render(e, s);
    t.setRenderTarget(n, 3);
    t.render(e, a);
    t.setRenderTarget(n, 4);
    t.render(e, o);
    n.texture.generateMipmaps = h;
    t.setRenderTarget(n, 5);
    t.render(e, l);
    t.setRenderTarget(u);
    t.xr.enabled = c;
  }
}
var N = require("./3882.cjs");
class F extends L.d {
  constructor(t, e, n) {
    if (Number.isInteger(e)) {
      console.warn("THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )");
      e = n;
    }
    super(t, t, e);
    e = e || {};
    this.texture = new N.B(undefined, e.mapping, e.wrapS, e.wrapT, e.magFilter, e.minFilter, e.format, e.type, e.anisotropy, e.encoding);
    this.texture.isRenderTargetTexture = true;
    this.texture.generateMipmaps = e.generateMipmaps !== undefined && e.generateMipmaps;
    this.texture.minFilter = e.minFilter !== undefined ? e.minFilter : r.wem;
    this.texture._needsFlipEnvMap = false;
  }
  fromEquirectangularTexture(t, e) {
    this.texture.type = e.type;
    this.texture.format = r.wk1;
    this.texture.encoding = e.encoding;
    this.texture.generateMipmaps = e.generateMipmaps;
    this.texture.minFilter = e.minFilter;
    this.texture.magFilter = e.magFilter;
    const n = {
      uniforms: {
        tEquirect: {
          value: null
        }
      },
      vertexShader: "\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\tvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\t\t\t\t\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t\t\t\t\t#include <begin_vertex>\n\t\t\t\t\t#include <project_vertex>\n\n\t\t\t\t}\n\t\t\t",
      fragmentShader: "\n\n\t\t\t\tuniform sampler2D tEquirect;\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\t#include <common>\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvec3 direction = normalize( vWorldDirection );\n\n\t\t\t\t\tvec2 sampleUV = equirectUv( direction );\n\n\t\t\t\t\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\n\t\t\t\t}\n\t\t\t"
    };
    const i = new d(5, 5, 5);
    const s = new p.j({
      name: "CubemapFromEquirect",
      uniforms: (0, _.dw)(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: r._Li,
      blending: r.jFi
    });
    s.uniforms.tEquirect.value = e;
    const a = new g.K(i, s);
    const o = e.minFilter;
    if (e.minFilter === r.D1R) {
      e.minFilter = r.wem;
    }
    new I(1, 10, this).update(t, a);
    e.minFilter = o;
    a.geometry.dispose();
    a.material.dispose();
    return this;
  }
  clear(t, e, n, r) {
    const i = t.getRenderTarget();
    for (let i = 0; i < 6; i++) {
      t.setRenderTarget(this, i);
      t.clear(e, n, r);
    }
    t.setRenderTarget(i);
  }
}
function O(t) {
  let e = new WeakMap();
  function n(t, e) {
    if (e === r.dSO) {
      t.mapping = r.fY$;
    } else if (e === r.Bf4) {
      t.mapping = r.vxC;
    }
    return t;
  }
  function i(t) {
    const n = t.target;
    n.removeEventListener("dispose", i);
    const r = e.get(n);
    if (r !== undefined) {
      e.delete(n);
      r.dispose();
    }
  }
  return {
    get: function (s) {
      if (s && s.isTexture && s.isRenderTargetTexture === false) {
        const a = s.mapping;
        if (a === r.dSO || a === r.Bf4) {
          if (e.has(s)) {
            return n(e.get(s).texture, s.mapping);
          }
          {
            const r = s.image;
            if (r && r.height > 0) {
              const a = t.getRenderTarget();
              const o = new F(r.height / 2);
              o.fromEquirectangularTexture(t, s);
              e.set(s, o);
              t.setRenderTarget(a);
              s.addEventListener("dispose", i);
              return n(o.texture, s.mapping);
            }
            return null;
          }
        }
      }
      return s;
    },
    dispose: function () {
      e = new WeakMap();
    }
  };
}
F.prototype.isWebGLCubeRenderTarget = true;
var U = require("./3131.cjs");
var B = require("./8549.cjs");
var z = require("./6173.cjs");
const k = Math.pow(2, 8);
const G = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582];
const H = 5 + G.length;
const V = 20;
const W = {
  [r.rnI]: 0,
  [r.knz]: 1,
  [r.KC9]: 2,
  [r.LgE]: 3,
  [r.Inb]: 4,
  [r.gMp]: 5,
  [r.pMV]: 6
};
const X = new U.i();
const {
  _lodPlanes: j,
  _sizeLods: q,
  _sigmas: Y
} = nt();
const Z = new m.I();
let K = null;
const J = (1 + Math.sqrt(5)) / 2;
const Q = 1 / J;
const $ = [new a.P(1, 1, 1), new a.P(-1, 1, 1), new a.P(1, 1, -1), new a.P(-1, 1, -1), new a.P(0, J, Q), new a.P(0, J, -Q), new a.P(Q, 0, J), new a.P(-Q, 0, J), new a.P(J, Q, 0), new a.P(-J, Q, 0)];
class tt {
  constructor(t) {
    this._renderer = t;
    this._pingPongRenderTarget = null;
    this._blurMaterial = function (t) {
      const e = new Float32Array(t);
      const n = new a.P(0, 1, 0);
      return new B.F({
        name: "SphericalGaussianBlur",
        defines: {
          n: t
        },
        uniforms: {
          envMap: {
            value: null
          },
          samples: {
            value: 1
          },
          weights: {
            value: e
          },
          latitudinal: {
            value: false
          },
          dTheta: {
            value: 0
          },
          mipInt: {
            value: 0
          },
          poleAxis: {
            value: n
          },
          inputEncoding: {
            value: W[r.rnI]
          },
          outputEncoding: {
            value: W[r.rnI]
          }
        },
        vertexShader: ot(),
        fragmentShader: `\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\t\t\tuniform int samples;\n\t\t\tuniform float weights[ n ];\n\t\t\tuniform bool latitudinal;\n\t\t\tuniform float dTheta;\n\t\t\tuniform float mipInt;\n\t\t\tuniform vec3 poleAxis;\n\n\t\t\t${lt()}\n\n\t\t\t#define ENVMAP_TYPE_CUBE_UV\n\t\t\t#include <cube_uv_reflection_fragment>\n\n\t\t\tvec3 getSample( float theta, vec3 axis ) {\n\n\t\t\t\tfloat cosTheta = cos( theta );\n\t\t\t\t// Rodrigues' axis-angle rotation\n\t\t\t\tvec3 sampleDirection = vOutputDirection * cosTheta\n\t\t\t\t\t+ cross( axis, vOutputDirection ) * sin( theta )\n\t\t\t\t\t+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );\n\n\t\t\t\treturn bilinearCubeUV( envMap, sampleDirection, mipInt );\n\n\t\t\t}\n\n\t\t\tvoid main() {\n\n\t\t\t\tvec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );\n\n\t\t\t\tif ( all( equal( axis, vec3( 0.0 ) ) ) ) {\n\n\t\t\t\t\taxis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );\n\n\t\t\t\t}\n\n\t\t\t\taxis = normalize( axis );\n\n\t\t\t\tgl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t\t\t\tgl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );\n\n\t\t\t\tfor ( int i = 1; i < n; i++ ) {\n\n\t\t\t\t\tif ( i >= samples ) {\n\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t}\n\n\t\t\t\t\tfloat theta = dTheta * float( i );\n\t\t\t\t\tgl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );\n\t\t\t\t\tgl_FragColor.rgb += weights[ i ] * getSample( theta, axis );\n\n\t\t\t\t}\n\n\t\t\t\tgl_FragColor = linearToOutputTexel( gl_FragColor );\n\n\t\t\t}\n\t\t`,
        blending: r.jFi,
        depthTest: false,
        depthWrite: false
      });
    }(V);
    this._equirectShader = null;
    this._cubemapShader = null;
    this._compileMaterial(this._blurMaterial);
  }
  fromScene(t, e = 0, n = 0.1, r = 100) {
    K = this._renderer.getRenderTarget();
    const i = this._allocateTargets();
    this._sceneToCubeUV(t, n, r, i);
    if (e > 0) {
      this._blur(i, 0, 0, e);
    }
    this._applyPMREM(i);
    this._cleanup(i);
    return i;
  }
  fromEquirectangular(t) {
    return this._fromTexture(t);
  }
  fromCubemap(t) {
    return this._fromTexture(t);
  }
  compileCubemapShader() {
    if (this._cubemapShader === null) {
      this._cubemapShader = at();
      this._compileMaterial(this._cubemapShader);
    }
  }
  compileEquirectangularShader() {
    if (this._equirectShader === null) {
      this._equirectShader = st();
      this._compileMaterial(this._equirectShader);
    }
  }
  dispose() {
    this._blurMaterial.dispose();
    if (this._cubemapShader !== null) {
      this._cubemapShader.dispose();
    }
    if (this._equirectShader !== null) {
      this._equirectShader.dispose();
    }
    for (let t = 0; t < j.length; t++) {
      j[t].dispose();
    }
  }
  _cleanup(t) {
    this._pingPongRenderTarget.dispose();
    this._renderer.setRenderTarget(K);
    t.scissorTest = false;
    it(t, 0, 0, t.width, t.height);
  }
  _fromTexture(t) {
    K = this._renderer.getRenderTarget();
    const e = this._allocateTargets(t);
    this._textureToCubeUV(t, e);
    this._applyPMREM(e);
    this._cleanup(e);
    return e;
  }
  _allocateTargets(t) {
    const e = {
      magFilter: r.TyD,
      minFilter: r.TyD,
      generateMipmaps: false,
      type: r.ywz,
      format: r.aoB,
      encoding: et(t) ? t.encoding : r.KC9,
      depthBuffer: false
    };
    const n = rt(e);
    n.depthBuffer = !t;
    this._pingPongRenderTarget = rt(e);
    return n;
  }
  _compileMaterial(t) {
    const e = new g.K(j[0], t);
    this._renderer.compile(e, X);
  }
  _sceneToCubeUV(t, e, n, i) {
    const s = new C.c(90, 1, e, n);
    const a = [1, -1, 1, 1, 1, 1];
    const o = [1, 1, 1, -1, -1, -1];
    const l = this._renderer;
    const c = l.autoClear;
    const u = l.outputEncoding;
    const h = l.toneMapping;
    l.getClearColor(Z);
    l.toneMapping = r.uL9;
    l.outputEncoding = r.rnI;
    l.autoClear = false;
    const f = new z.v({
      name: "PMREM.Background",
      side: r._Li,
      depthWrite: false,
      depthTest: false
    });
    const p = new g.K(new d(), f);
    let m = false;
    const v = t.background;
    if (v) {
      if (v.isColor) {
        f.color.copy(v);
        t.background = null;
        m = true;
      }
    } else {
      f.color.copy(Z);
      m = true;
    }
    for (let e = 0; e < 6; e++) {
      const n = e % 3;
      if (n == 0) {
        s.up.set(0, a[e], 0);
        s.lookAt(o[e], 0, 0);
      } else if (n == 1) {
        s.up.set(0, 0, a[e]);
        s.lookAt(0, o[e], 0);
      } else {
        s.up.set(0, a[e], 0);
        s.lookAt(0, 0, o[e]);
      }
      it(i, n * k, e > 2 ? k : 0, k, k);
      l.setRenderTarget(i);
      if (m) {
        l.render(p, s);
      }
      l.render(t, s);
    }
    p.geometry.dispose();
    p.material.dispose();
    l.toneMapping = h;
    l.outputEncoding = u;
    l.autoClear = c;
    t.background = v;
  }
  _textureToCubeUV(t, e) {
    const n = this._renderer;
    if (t.isCubeTexture) {
      if (this._cubemapShader == null) {
        this._cubemapShader = at();
      }
    } else if (this._equirectShader == null) {
      this._equirectShader = st();
    }
    const r = t.isCubeTexture ? this._cubemapShader : this._equirectShader;
    const i = new g.K(j[0], r);
    const s = r.uniforms;
    s.envMap.value = t;
    if (!t.isCubeTexture) {
      s.texelSize.value.set(1 / t.image.width, 1 / t.image.height);
    }
    s.inputEncoding.value = W[t.encoding];
    s.outputEncoding.value = W[e.texture.encoding];
    it(e, 0, 0, k * 3, k * 2);
    n.setRenderTarget(e);
    n.render(i, X);
  }
  _applyPMREM(t) {
    const e = this._renderer;
    const n = e.autoClear;
    e.autoClear = false;
    for (let e = 1; e < H; e++) {
      const n = Math.sqrt(Y[e] * Y[e] - Y[e - 1] * Y[e - 1]);
      const r = $[(e - 1) % $.length];
      this._blur(t, e - 1, e, n, r);
    }
    e.autoClear = n;
  }
  _blur(t, e, n, r, i) {
    const s = this._pingPongRenderTarget;
    this._halfBlur(t, s, e, n, r, "latitudinal", i);
    this._halfBlur(s, t, n, n, r, "longitudinal", i);
  }
  _halfBlur(t, e, n, r, i, s, a) {
    const o = this._renderer;
    const l = this._blurMaterial;
    if (s !== "latitudinal" && s !== "longitudinal") {
      console.error("blur direction must be either latitudinal or longitudinal!");
    }
    const c = new g.K(j[r], l);
    const u = l.uniforms;
    const h = q[n] - 1;
    const d = isFinite(i) ? Math.PI / (h * 2) : Math.PI * 2 / 39;
    const f = i / d;
    const p = isFinite(i) ? 1 + Math.floor(f * 3) : V;
    if (p > V) {
      console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${p} samples when the maximum is set to 20`);
    }
    const m = [];
    let v = 0;
    for (let t = 0; t < V; ++t) {
      const e = t / f;
      const n = Math.exp(-e * e / 2);
      m.push(n);
      if (t == 0) {
        v += n;
      } else if (t < p) {
        v += n * 2;
      }
    }
    for (let t = 0; t < m.length; t++) {
      m[t] = m[t] / v;
    }
    u.envMap.value = t.texture;
    u.samples.value = p;
    u.weights.value = m;
    u.latitudinal.value = s === "latitudinal";
    if (a) {
      u.poleAxis.value = a;
    }
    u.dTheta.value = d;
    u.mipInt.value = 8 - n;
    u.inputEncoding.value = W[t.texture.encoding];
    u.outputEncoding.value = W[t.texture.encoding];
    const _ = q[r];
    it(e, Math.max(0, k - _ * 2) * 3, (r === 0 ? 0 : k * 2) + _ * 2 * (r > 4 ? r - 8 + 4 : 0), _ * 3, _ * 2);
    o.setRenderTarget(e);
    o.render(c, X);
  }
}
function et(t) {
  return t !== undefined && t.type === r.ywz && (t.encoding === r.rnI || t.encoding === r.knz || t.encoding === r.pMV);
}
function nt() {
  const t = [];
  const e = [];
  const n = [];
  let r = 8;
  for (let i = 0; i < H; i++) {
    const s = Math.pow(2, r);
    e.push(s);
    let a = 1 / s;
    if (i > 4) {
      a = G[i - 8 + 4 - 1];
    } else if (i == 0) {
      a = 0;
    }
    n.push(a);
    const o = 1 / (s - 1);
    const l = -o / 2;
    const c = 1 + o / 2;
    const d = [l, l, c, l, c, c, l, l, c, c, l, c];
    const f = 6;
    const p = 6;
    const m = 3;
    const g = 2;
    const v = 1;
    const _ = new Float32Array(m * p * f);
    const x = new Float32Array(g * p * f);
    const y = new Float32Array(v * p * f);
    for (let t = 0; t < f; t++) {
      const e = t % 3 * 2 / 3 - 1;
      const n = t > 2 ? 0 : -1;
      const r = [e, n, 0, e + 2 / 3, n, 0, e + 2 / 3, n + 1, 0, e, n, 0, e + 2 / 3, n + 1, 0, e, n + 1, 0];
      _.set(r, m * p * t);
      x.set(d, g * p * t);
      const i = [t, t, t, t, t, t];
      y.set(i, v * p * t);
    }
    const b = new u.u();
    b.setAttribute("position", new h.Tl(_, m));
    b.setAttribute("uv", new h.Tl(x, g));
    b.setAttribute("faceIndex", new h.Tl(y, v));
    t.push(b);
    if (r > 4) {
      r--;
    }
  }
  return {
    _lodPlanes: t,
    _sizeLods: e,
    _sigmas: n
  };
}
function rt(t) {
  const e = new L.d(k * 3, k * 3, t);
  e.texture.mapping = r.g8_;
  e.texture.name = "PMREM.cubeUv";
  e.scissorTest = true;
  return e;
}
function it(t, e, n, r, i) {
  t.viewport.set(e, n, r, i);
  t.scissor.set(e, n, r, i);
}
function st() {
  const t = new x.F(1, 1);
  return new B.F({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: {
        value: null
      },
      texelSize: {
        value: t
      },
      inputEncoding: {
        value: W[r.rnI]
      },
      outputEncoding: {
        value: W[r.rnI]
      }
    },
    vertexShader: ot(),
    fragmentShader: `\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\t\t\tuniform vec2 texelSize;\n\n\t\t\t${lt()}\n\n\t\t\t#include <common>\n\n\t\t\tvoid main() {\n\n\t\t\t\tgl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\n\t\t\t\tvec3 outputDirection = normalize( vOutputDirection );\n\t\t\t\tvec2 uv = equirectUv( outputDirection );\n\n\t\t\t\tvec2 f = fract( uv / texelSize - 0.5 );\n\t\t\t\tuv -= f * texelSize;\n\t\t\t\tvec3 tl = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;\n\t\t\t\tuv.x += texelSize.x;\n\t\t\t\tvec3 tr = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;\n\t\t\t\tuv.y += texelSize.y;\n\t\t\t\tvec3 br = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;\n\t\t\t\tuv.x -= texelSize.x;\n\t\t\t\tvec3 bl = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;\n\n\t\t\t\tvec3 tm = mix( tl, tr, f.x );\n\t\t\t\tvec3 bm = mix( bl, br, f.x );\n\t\t\t\tgl_FragColor.rgb = mix( tm, bm, f.y );\n\n\t\t\t\tgl_FragColor = linearToOutputTexel( gl_FragColor );\n\n\t\t\t}\n\t\t`,
    blending: r.jFi,
    depthTest: false,
    depthWrite: false
  });
}
function at() {
  return new B.F({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: {
        value: null
      },
      inputEncoding: {
        value: W[r.rnI]
      },
      outputEncoding: {
        value: W[r.rnI]
      }
    },
    vertexShader: ot(),
    fragmentShader: `\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform samplerCube envMap;\n\n\t\t\t${lt()}\n\n\t\t\tvoid main() {\n\n\t\t\t\tgl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t\t\t\tgl_FragColor.rgb = envMapTexelToLinear( textureCube( envMap, vec3( - vOutputDirection.x, vOutputDirection.yz ) ) ).rgb;\n\t\t\t\tgl_FragColor = linearToOutputTexel( gl_FragColor );\n\n\t\t\t}\n\t\t`,
    blending: r.jFi,
    depthTest: false,
    depthWrite: false
  });
}
function ot() {
  return "\n\n\t\tprecision mediump float;\n\t\tprecision mediump int;\n\n\t\tattribute vec3 position;\n\t\tattribute vec2 uv;\n\t\tattribute float faceIndex;\n\n\t\tvarying vec3 vOutputDirection;\n\n\t\t// RH coordinate system; PMREM face-indexing convention\n\t\tvec3 getDirection( vec2 uv, float face ) {\n\n\t\t\tuv = 2.0 * uv - 1.0;\n\n\t\t\tvec3 direction = vec3( uv, 1.0 );\n\n\t\t\tif ( face == 0.0 ) {\n\n\t\t\t\tdirection = direction.zyx; // ( 1, v, u ) pos x\n\n\t\t\t} else if ( face == 1.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n\t\t\t} else if ( face == 2.0 ) {\n\n\t\t\t\tdirection.x *= -1.0; // ( -u, v, 1 ) pos z\n\n\t\t\t} else if ( face == 3.0 ) {\n\n\t\t\t\tdirection = direction.zyx;\n\t\t\t\tdirection.xz *= -1.0; // ( -1, v, -u ) neg x\n\n\t\t\t} else if ( face == 4.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xy *= -1.0; // ( -u, -1, v ) neg y\n\n\t\t\t} else if ( face == 5.0 ) {\n\n\t\t\t\tdirection.z *= -1.0; // ( u, v, -1 ) neg z\n\n\t\t\t}\n\n\t\t\treturn direction;\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvOutputDirection = getDirection( uv, faceIndex );\n\t\t\tgl_Position = vec4( position, 1.0 );\n\n\t\t}\n\t";
}
function lt() {
  return "\n\n\t\tuniform int inputEncoding;\n\t\tuniform int outputEncoding;\n\n\t\t#include <encodings_pars_fragment>\n\n\t\tvec4 inputTexelToLinear( vec4 value ) {\n\n\t\t\tif ( inputEncoding == 0 ) {\n\n\t\t\t\treturn value;\n\n\t\t\t} else if ( inputEncoding == 1 ) {\n\n\t\t\t\treturn sRGBToLinear( value );\n\n\t\t\t} else if ( inputEncoding == 2 ) {\n\n\t\t\t\treturn RGBEToLinear( value );\n\n\t\t\t} else if ( inputEncoding == 3 ) {\n\n\t\t\t\treturn RGBMToLinear( value, 7.0 );\n\n\t\t\t} else if ( inputEncoding == 4 ) {\n\n\t\t\t\treturn RGBMToLinear( value, 16.0 );\n\n\t\t\t} else if ( inputEncoding == 5 ) {\n\n\t\t\t\treturn RGBDToLinear( value, 256.0 );\n\n\t\t\t} else {\n\n\t\t\t\treturn GammaToLinear( value, 2.2 );\n\n\t\t\t}\n\n\t\t}\n\n\t\tvec4 linearToOutputTexel( vec4 value ) {\n\n\t\t\tif ( outputEncoding == 0 ) {\n\n\t\t\t\treturn value;\n\n\t\t\t} else if ( outputEncoding == 1 ) {\n\n\t\t\t\treturn LinearTosRGB( value );\n\n\t\t\t} else if ( outputEncoding == 2 ) {\n\n\t\t\t\treturn LinearToRGBE( value );\n\n\t\t\t} else if ( outputEncoding == 3 ) {\n\n\t\t\t\treturn LinearToRGBM( value, 7.0 );\n\n\t\t\t} else if ( outputEncoding == 4 ) {\n\n\t\t\t\treturn LinearToRGBM( value, 16.0 );\n\n\t\t\t} else if ( outputEncoding == 5 ) {\n\n\t\t\t\treturn LinearToRGBD( value, 256.0 );\n\n\t\t\t} else {\n\n\t\t\t\treturn LinearToGamma( value, 2.2 );\n\n\t\t\t}\n\n\t\t}\n\n\t\tvec4 envMapTexelToLinear( vec4 color ) {\n\n\t\t\treturn inputTexelToLinear( color );\n\n\t\t}\n\t";
}
function ct(t) {
  let e = new WeakMap();
  let n = null;
  function i(t) {
    const n = t.target;
    n.removeEventListener("dispose", i);
    const r = e.get(n);
    if (r !== undefined) {
      e.delete(n);
      r.dispose();
    }
  }
  return {
    get: function (s) {
      if (s && s.isTexture && s.isRenderTargetTexture === false) {
        const a = s.mapping;
        const o = a === r.dSO || a === r.Bf4;
        const l = a === r.fY$ || a === r.vxC;
        if (o || l) {
          if (e.has(s)) {
            return e.get(s).texture;
          }
          {
            const r = s.image;
            if (o && r && r.height > 0 || l && r && function (t) {
              let e = 0;
              const n = 6;
              for (let r = 0; r < n; r++) {
                if (t[r] !== undefined) {
                  e++;
                }
              }
              return e === n;
            }(r)) {
              const r = t.getRenderTarget();
              if (n === null) {
                n = new tt(t);
              }
              const a = o ? n.fromEquirectangular(s) : n.fromCubemap(s);
              e.set(s, a);
              t.setRenderTarget(r);
              s.addEventListener("dispose", i);
              return a.texture;
            }
            return null;
          }
        }
      }
      return s;
    },
    dispose: function () {
      e = new WeakMap();
      if (n !== null) {
        n.dispose();
        n = null;
      }
    }
  };
}
function ut(t) {
  const e = {};
  function n(n) {
    if (e[n] !== undefined) {
      return e[n];
    }
    let r;
    switch (n) {
      case "WEBGL_depth_texture":
        r = t.getExtension("WEBGL_depth_texture") || t.getExtension("MOZ_WEBGL_depth_texture") || t.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        r = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        r = t.getExtension("WEBGL_compressed_texture_s3tc") || t.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        r = t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        r = t.getExtension(n);
    }
    e[n] = r;
    return r;
  }
  return {
    has: function (t) {
      return n(t) !== null;
    },
    init: function (t) {
      if (t.isWebGL2) {
        n("EXT_color_buffer_float");
      } else {
        n("WEBGL_depth_texture");
        n("OES_texture_float");
        n("OES_texture_half_float");
        n("OES_texture_half_float_linear");
        n("OES_standard_derivatives");
        n("OES_element_index_uint");
        n("OES_vertex_array_object");
        n("ANGLE_instanced_arrays");
      }
      n("OES_texture_float_linear");
      n("EXT_color_buffer_half_float");
    },
    get: function (t) {
      const e = n(t);
      if (e === null) {
        console.warn("THREE.WebGLRenderer: " + t + " extension not supported.");
      }
      return e;
    }
  };
}
var ht = require("./392.cjs");
function dt(t, e, n, r) {
  const i = {};
  const s = new WeakMap();
  function a(t) {
    const o = t.target;
    if (o.index !== null) {
      e.remove(o.index);
    }
    for (const t in o.attributes) {
      e.remove(o.attributes[t]);
    }
    o.removeEventListener("dispose", a);
    delete i[o.id];
    const l = s.get(o);
    if (l) {
      e.remove(l);
      s.delete(o);
    }
    r.releaseStatesOfGeometry(o);
    if (o.isInstancedBufferGeometry === true) {
      delete o._maxInstanceCount;
    }
    n.memory.geometries--;
  }
  function o(t) {
    const n = [];
    const r = t.index;
    const i = t.attributes.position;
    let a = 0;
    if (r !== null) {
      const t = r.array;
      a = r.version;
      for (let e = 0, r = t.length; e < r; e += 3) {
        const r = t[e + 0];
        const i = t[e + 1];
        const s = t[e + 2];
        n.push(r, i, i, s, s, r);
      }
    } else {
      const t = i.array;
      a = i.version;
      for (let e = 0, r = t.length / 3 - 1; e < r; e += 3) {
        const t = e + 0;
        const r = e + 1;
        const i = e + 2;
        n.push(t, r, r, i, i, t);
      }
    }
    const o = new ((0, ht.uH)(n) > 65535 ? h.lC : h.ql)(n, 1);
    o.version = a;
    const l = s.get(t);
    if (l) {
      e.remove(l);
    }
    s.set(t, o);
  }
  return {
    get: function (t, e) {
      if (i[e.id] !== true) {
        e.addEventListener("dispose", a);
        i[e.id] = true;
        n.memory.geometries++;
      }
      return e;
    },
    update: function (n) {
      const r = n.attributes;
      for (const n in r) {
        e.update(r[n], t.ARRAY_BUFFER);
      }
      const i = n.morphAttributes;
      for (const n in i) {
        const r = i[n];
        for (let n = 0, i = r.length; n < i; n++) {
          e.update(r[n], t.ARRAY_BUFFER);
        }
      }
    },
    getWireframeAttribute: function (t) {
      const e = s.get(t);
      if (e) {
        const n = t.index;
        if (n !== null && e.version < n.version) {
          o(t);
        }
      } else {
        o(t);
      }
      return s.get(t);
    }
  };
}
function ft(t, e, n, r) {
  const i = r.isWebGL2;
  let s;
  let a;
  let o;
  this.setMode = function (t) {
    s = t;
  };
  this.setIndex = function (t) {
    a = t.type;
    o = t.bytesPerElement;
  };
  this.render = function (e, r) {
    t.drawElements(s, r, a, e * o);
    n.update(r, s, 1);
  };
  this.renderInstances = function (r, l, c) {
    if (c === 0) {
      return;
    }
    let u;
    let h;
    if (i) {
      u = t;
      h = "drawElementsInstanced";
    } else {
      u = e.get("ANGLE_instanced_arrays");
      h = "drawElementsInstancedANGLE";
      if (u === null) {
        console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
        return;
      }
    }
    u[h](s, l, a, r * o, c);
    n.update(l, s, c);
  };
}
function pt(t) {
  const e = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  return {
    memory: {
      geometries: 0,
      textures: 0
    },
    render: e,
    programs: null,
    autoReset: true,
    reset: function () {
      e.frame++;
      e.calls = 0;
      e.triangles = 0;
      e.points = 0;
      e.lines = 0;
    },
    update: function (n, r, i) {
      e.calls++;
      switch (r) {
        case t.TRIANGLES:
          e.triangles += i * (n / 3);
          break;
        case t.LINES:
          e.lines += i * (n / 2);
          break;
        case t.LINE_STRIP:
          e.lines += i * (n - 1);
          break;
        case t.LINE_LOOP:
          e.lines += i * n;
          break;
        case t.POINTS:
          e.points += i * n;
          break;
        default:
          console.error("THREE.WebGLInfo: Unknown draw mode:", r);
      }
    }
  };
}
function mt(t, e) {
  return t[0] - e[0];
}
function gt(t, e) {
  return Math.abs(e[1]) - Math.abs(t[1]);
}
function vt(t) {
  const e = {};
  const n = new Float32Array(8);
  const r = [];
  for (let t = 0; t < 8; t++) {
    r[t] = [t, 0];
  }
  return {
    update: function (i, s, a, o) {
      const l = i.morphTargetInfluences;
      const c = l === undefined ? 0 : l.length;
      let u = e[s.id];
      if (u === undefined || u.length !== c) {
        u = [];
        for (let t = 0; t < c; t++) {
          u[t] = [t, 0];
        }
        e[s.id] = u;
      }
      for (let t = 0; t < c; t++) {
        const e = u[t];
        e[0] = t;
        e[1] = l[t];
      }
      u.sort(gt);
      for (let t = 0; t < 8; t++) {
        if (t < c && u[t][1]) {
          r[t][0] = u[t][0];
          r[t][1] = u[t][1];
        } else {
          r[t][0] = Number.MAX_SAFE_INTEGER;
          r[t][1] = 0;
        }
      }
      r.sort(mt);
      const h = s.morphAttributes.position;
      const d = s.morphAttributes.normal;
      let f = 0;
      for (let t = 0; t < 8; t++) {
        const e = r[t];
        const i = e[0];
        const a = e[1];
        if (i !== Number.MAX_SAFE_INTEGER && a) {
          if (h && s.getAttribute("morphTarget" + t) !== h[i]) {
            s.setAttribute("morphTarget" + t, h[i]);
          }
          if (d && s.getAttribute("morphNormal" + t) !== d[i]) {
            s.setAttribute("morphNormal" + t, d[i]);
          }
          n[t] = a;
          f += a;
        } else {
          if (h && s.hasAttribute("morphTarget" + t) === true) {
            s.deleteAttribute("morphTarget" + t);
          }
          if (d && s.hasAttribute("morphNormal" + t) === true) {
            s.deleteAttribute("morphNormal" + t);
          }
          n[t] = 0;
        }
      }
      const p = s.morphTargetsRelative ? 1 : 1 - f;
      o.getUniforms().setValue(t, "morphTargetBaseInfluence", p);
      o.getUniforms().setValue(t, "morphTargetInfluences", n);
    }
  };
}
class _t extends L.d {
  constructor(t, e, n) {
    super(t, e, n);
    this.samples = 4;
  }
  copy(t) {
    super.copy.call(this, t);
    this.samples = t.samples;
    return this;
  }
}
function xt(t, e, n, r) {
  let i = new WeakMap();
  function s(t) {
    const e = t.target;
    e.removeEventListener("dispose", s);
    n.remove(e.instanceMatrix);
    if (e.instanceColor !== null) {
      n.remove(e.instanceColor);
    }
  }
  return {
    update: function (a) {
      const o = r.render.frame;
      const l = a.geometry;
      const c = e.get(a, l);
      if (i.get(c) !== o) {
        e.update(c);
        i.set(c, o);
      }
      if (a.isInstancedMesh) {
        if (a.hasEventListener("dispose", s) === false) {
          a.addEventListener("dispose", s);
        }
        n.update(a.instanceMatrix, t.ARRAY_BUFFER);
        if (a.instanceColor !== null) {
          n.update(a.instanceColor, t.ARRAY_BUFFER);
        }
      }
      return c;
    },
    dispose: function () {
      i = new WeakMap();
    }
  };
}
_t.prototype.isWebGLMultisampleRenderTarget = true;
var yt = require("./3977.cjs");
class bt extends yt.x {
  constructor(t = null, e = 1, n = 1, i = 1) {
    super(null);
    this.image = {
      data: t,
      width: e,
      height: n,
      depth: i
    };
    this.magFilter = r.TyD;
    this.minFilter = r.TyD;
    this.wrapR = r.uWy;
    this.generateMipmaps = false;
    this.flipY = false;
    this.unpackAlignment = 1;
    this.needsUpdate = true;
  }
}
bt.prototype.isDataTexture2DArray = true;
class wt extends yt.x {
  constructor(t = null, e = 1, n = 1, i = 1) {
    super(null);
    this.image = {
      data: t,
      width: e,
      height: n,
      depth: i
    };
    this.magFilter = r.TyD;
    this.minFilter = r.TyD;
    this.wrapR = r.uWy;
    this.generateMipmaps = false;
    this.flipY = false;
    this.unpackAlignment = 1;
    this.needsUpdate = true;
  }
}
wt.prototype.isDataTexture3D = true;
const Mt = new yt.x();
const Tt = new bt();
const St = new wt();
const Et = new N.B();
const At = [];
const Rt = [];
const Lt = new Float32Array(16);
const Pt = new Float32Array(9);
const Ct = new Float32Array(4);
function Dt(t, e, n) {
  const r = t[0];
  if (r <= 0 || r > 0) {
    return t;
  }
  const i = e * n;
  let s = At[i];
  if (s === undefined) {
    s = new Float32Array(i);
    At[i] = s;
  }
  if (e !== 0) {
    r.toArray(s, 0);
    for (let r = 1, i = 0; r !== e; ++r) {
      i += n;
      t[r].toArray(s, i);
    }
  }
  return s;
}
function It(t, e) {
  if (t.length !== e.length) {
    return false;
  }
  for (let n = 0, r = t.length; n < r; n++) {
    if (t[n] !== e[n]) {
      return false;
    }
  }
  return true;
}
function Nt(t, e) {
  for (let n = 0, r = e.length; n < r; n++) {
    t[n] = e[n];
  }
}
function Ft(t, e) {
  let n = Rt[e];
  if (n === undefined) {
    n = new Int32Array(e);
    Rt[e] = n;
  }
  for (let r = 0; r !== e; ++r) {
    n[r] = t.allocateTextureUnit();
  }
  return n;
}
function Ot(t, e) {
  const n = this.cache;
  if (n[0] !== e) {
    t.uniform1f(this.addr, e);
    n[0] = e;
  }
}
function Ut(t, e) {
  const n = this.cache;
  if (e.x !== undefined) {
    if (n[0] !== e.x || n[1] !== e.y) {
      t.uniform2f(this.addr, e.x, e.y);
      n[0] = e.x;
      n[1] = e.y;
    }
  } else {
    if (It(n, e)) {
      return;
    }
    t.uniform2fv(this.addr, e);
    Nt(n, e);
  }
}
function Bt(t, e) {
  const n = this.cache;
  if (e.x !== undefined) {
    if (n[0] !== e.x || n[1] !== e.y || n[2] !== e.z) {
      t.uniform3f(this.addr, e.x, e.y, e.z);
      n[0] = e.x;
      n[1] = e.y;
      n[2] = e.z;
    }
  } else if (e.r !== undefined) {
    if (n[0] !== e.r || n[1] !== e.g || n[2] !== e.b) {
      t.uniform3f(this.addr, e.r, e.g, e.b);
      n[0] = e.r;
      n[1] = e.g;
      n[2] = e.b;
    }
  } else {
    if (It(n, e)) {
      return;
    }
    t.uniform3fv(this.addr, e);
    Nt(n, e);
  }
}
function zt(t, e) {
  const n = this.cache;
  if (e.x !== undefined) {
    if (n[0] !== e.x || n[1] !== e.y || n[2] !== e.z || n[3] !== e.w) {
      t.uniform4f(this.addr, e.x, e.y, e.z, e.w);
      n[0] = e.x;
      n[1] = e.y;
      n[2] = e.z;
      n[3] = e.w;
    }
  } else {
    if (It(n, e)) {
      return;
    }
    t.uniform4fv(this.addr, e);
    Nt(n, e);
  }
}
function kt(t, e) {
  const n = this.cache;
  const r = e.elements;
  if (r === undefined) {
    if (It(n, e)) {
      return;
    }
    t.uniformMatrix2fv(this.addr, false, e);
    Nt(n, e);
  } else {
    if (It(n, r)) {
      return;
    }
    Ct.set(r);
    t.uniformMatrix2fv(this.addr, false, Ct);
    Nt(n, r);
  }
}
function Gt(t, e) {
  const n = this.cache;
  const r = e.elements;
  if (r === undefined) {
    if (It(n, e)) {
      return;
    }
    t.uniformMatrix3fv(this.addr, false, e);
    Nt(n, e);
  } else {
    if (It(n, r)) {
      return;
    }
    Pt.set(r);
    t.uniformMatrix3fv(this.addr, false, Pt);
    Nt(n, r);
  }
}
function Ht(t, e) {
  const n = this.cache;
  const r = e.elements;
  if (r === undefined) {
    if (It(n, e)) {
      return;
    }
    t.uniformMatrix4fv(this.addr, false, e);
    Nt(n, e);
  } else {
    if (It(n, r)) {
      return;
    }
    Lt.set(r);
    t.uniformMatrix4fv(this.addr, false, Lt);
    Nt(n, r);
  }
}
function Vt(t, e) {
  const n = this.cache;
  if (n[0] !== e) {
    t.uniform1i(this.addr, e);
    n[0] = e;
  }
}
function Wt(t, e) {
  const n = this.cache;
  if (!It(n, e)) {
    t.uniform2iv(this.addr, e);
    Nt(n, e);
  }
}
function Xt(t, e) {
  const n = this.cache;
  if (!It(n, e)) {
    t.uniform3iv(this.addr, e);
    Nt(n, e);
  }
}
function jt(t, e) {
  const n = this.cache;
  if (!It(n, e)) {
    t.uniform4iv(this.addr, e);
    Nt(n, e);
  }
}
function qt(t, e) {
  const n = this.cache;
  if (n[0] !== e) {
    t.uniform1ui(this.addr, e);
    n[0] = e;
  }
}
function Yt(t, e) {
  const n = this.cache;
  if (!It(n, e)) {
    t.uniform2uiv(this.addr, e);
    Nt(n, e);
  }
}
function Zt(t, e) {
  const n = this.cache;
  if (!It(n, e)) {
    t.uniform3uiv(this.addr, e);
    Nt(n, e);
  }
}
function Kt(t, e) {
  const n = this.cache;
  if (!It(n, e)) {
    t.uniform4uiv(this.addr, e);
    Nt(n, e);
  }
}
function Jt(t, e, n) {
  const r = this.cache;
  const i = n.allocateTextureUnit();
  if (r[0] !== i) {
    t.uniform1i(this.addr, i);
    r[0] = i;
  }
  n.safeSetTexture2D(e || Mt, i);
}
function Qt(t, e, n) {
  const r = this.cache;
  const i = n.allocateTextureUnit();
  if (r[0] !== i) {
    t.uniform1i(this.addr, i);
    r[0] = i;
  }
  n.setTexture3D(e || St, i);
}
function $t(t, e, n) {
  const r = this.cache;
  const i = n.allocateTextureUnit();
  if (r[0] !== i) {
    t.uniform1i(this.addr, i);
    r[0] = i;
  }
  n.safeSetTextureCube(e || Et, i);
}
function te(t, e, n) {
  const r = this.cache;
  const i = n.allocateTextureUnit();
  if (r[0] !== i) {
    t.uniform1i(this.addr, i);
    r[0] = i;
  }
  n.setTexture2DArray(e || Tt, i);
}
function ee(t, e) {
  t.uniform1fv(this.addr, e);
}
function ne(t, e) {
  const n = Dt(e, this.size, 2);
  t.uniform2fv(this.addr, n);
}
function re(t, e) {
  const n = Dt(e, this.size, 3);
  t.uniform3fv(this.addr, n);
}
function ie(t, e) {
  const n = Dt(e, this.size, 4);
  t.uniform4fv(this.addr, n);
}
function se(t, e) {
  const n = Dt(e, this.size, 4);
  t.uniformMatrix2fv(this.addr, false, n);
}
function ae(t, e) {
  const n = Dt(e, this.size, 9);
  t.uniformMatrix3fv(this.addr, false, n);
}
function oe(t, e) {
  const n = Dt(e, this.size, 16);
  t.uniformMatrix4fv(this.addr, false, n);
}
function le(t, e) {
  t.uniform1iv(this.addr, e);
}
function ce(t, e) {
  t.uniform2iv(this.addr, e);
}
function ue(t, e) {
  t.uniform3iv(this.addr, e);
}
function he(t, e) {
  t.uniform4iv(this.addr, e);
}
function de(t, e) {
  t.uniform1uiv(this.addr, e);
}
function fe(t, e) {
  t.uniform2uiv(this.addr, e);
}
function pe(t, e) {
  t.uniform3uiv(this.addr, e);
}
function me(t, e) {
  t.uniform4uiv(this.addr, e);
}
function ge(t, e, n) {
  const r = e.length;
  const i = Ft(n, r);
  t.uniform1iv(this.addr, i);
  for (let t = 0; t !== r; ++t) {
    n.safeSetTexture2D(e[t] || Mt, i[t]);
  }
}
function ve(t, e, n) {
  const r = e.length;
  const i = Ft(n, r);
  t.uniform1iv(this.addr, i);
  for (let t = 0; t !== r; ++t) {
    n.safeSetTextureCube(e[t] || Et, i[t]);
  }
}
function _e(t, e, n) {
  this.id = t;
  this.addr = n;
  this.cache = [];
  this.setValue = function (t) {
    switch (t) {
      case 5126:
        return Ot;
      case 35664:
        return Ut;
      case 35665:
        return Bt;
      case 35666:
        return zt;
      case 35674:
        return kt;
      case 35675:
        return Gt;
      case 35676:
        return Ht;
      case 5124:
      case 35670:
        return Vt;
      case 35667:
      case 35671:
        return Wt;
      case 35668:
      case 35672:
        return Xt;
      case 35669:
      case 35673:
        return jt;
      case 5125:
        return qt;
      case 36294:
        return Yt;
      case 36295:
        return Zt;
      case 36296:
        return Kt;
      case 35678:
      case 36198:
      case 36298:
      case 36306:
      case 35682:
        return Jt;
      case 35679:
      case 36299:
      case 36307:
        return Qt;
      case 35680:
      case 36300:
      case 36308:
      case 36293:
        return $t;
      case 36289:
      case 36303:
      case 36311:
      case 36292:
        return te;
    }
  }(e.type);
}
function xe(t, e, n) {
  this.id = t;
  this.addr = n;
  this.cache = [];
  this.size = e.size;
  this.setValue = function (t) {
    switch (t) {
      case 5126:
        return ee;
      case 35664:
        return ne;
      case 35665:
        return re;
      case 35666:
        return ie;
      case 35674:
        return se;
      case 35675:
        return ae;
      case 35676:
        return oe;
      case 5124:
      case 35670:
        return le;
      case 35667:
      case 35671:
        return ce;
      case 35668:
      case 35672:
        return ue;
      case 35669:
      case 35673:
        return he;
      case 5125:
        return de;
      case 36294:
        return fe;
      case 36295:
        return pe;
      case 36296:
        return me;
      case 35678:
      case 36198:
      case 36298:
      case 36306:
      case 35682:
        return ge;
      case 35680:
      case 36300:
      case 36308:
      case 36293:
        return ve;
    }
  }(e.type);
}
function ye(t) {
  this.id = t;
  this.seq = [];
  this.map = {};
}
xe.prototype.updateCache = function (t) {
  const e = this.cache;
  if (t instanceof Float32Array && e.length !== t.length) {
    this.cache = new Float32Array(t.length);
  }
  Nt(e, t);
};
ye.prototype.setValue = function (t, e, n) {
  const r = this.seq;
  for (let i = 0, s = r.length; i !== s; ++i) {
    const s = r[i];
    s.setValue(t, e[s.id], n);
  }
};
const be = /(\w+)(\])?(\[|\.)?/g;
function we(t, e) {
  t.seq.push(e);
  t.map[e.id] = e;
}
function Me(t, e, n) {
  const r = t.name;
  const i = r.length;
  for (be.lastIndex = 0;;) {
    const s = be.exec(r);
    const a = be.lastIndex;
    let o = s[1];
    const l = s[2] === "]";
    const c = s[3];
    if (l) {
      o |= 0;
    }
    if (c === undefined || c === "[" && a + 2 === i) {
      we(n, c === undefined ? new _e(o, t, e) : new xe(o, t, e));
      break;
    }
    {
      let t = n.map[o];
      if (t === undefined) {
        t = new ye(o);
        we(n, t);
      }
      n = t;
    }
  }
}
function Te(t, e) {
  this.seq = [];
  this.map = {};
  const n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS);
  for (let r = 0; r < n; ++r) {
    const n = t.getActiveUniform(e, r);
    Me(n, t.getUniformLocation(e, n.name), this);
  }
}
function Se(t, e, n) {
  const r = t.createShader(e);
  t.shaderSource(r, n);
  t.compileShader(r);
  return r;
}
Te.prototype.setValue = function (t, e, n, r) {
  const i = this.map[e];
  if (i !== undefined) {
    i.setValue(t, n, r);
  }
};
Te.prototype.setOptional = function (t, e, n) {
  const r = e[n];
  if (r !== undefined) {
    this.setValue(t, n, r);
  }
};
Te.upload = function (t, e, n, r) {
  for (let i = 0, s = e.length; i !== s; ++i) {
    const s = e[i];
    const a = n[s.id];
    if (a.needsUpdate !== false) {
      s.setValue(t, a.value, r);
    }
  }
};
Te.seqWithValue = function (t, e) {
  const n = [];
  for (let r = 0, i = t.length; r !== i; ++r) {
    const i = t[r];
    if (i.id in e) {
      n.push(i);
    }
  }
  return n;
};
let Ee = 0;
function Ae(t) {
  switch (t) {
    case r.rnI:
      return ["Linear", "( value )"];
    case r.knz:
      return ["sRGB", "( value )"];
    case r.KC9:
      return ["RGBE", "( value )"];
    case r.LgE:
      return ["RGBM", "( value, 7.0 )"];
    case r.Inb:
      return ["RGBM", "( value, 16.0 )"];
    case r.gMp:
      return ["RGBD", "( value, 256.0 )"];
    case r.pMV:
      return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];
    case r.M6c:
      return ["LogLuv", "( value )"];
    default:
      console.warn("THREE.WebGLProgram: Unsupported encoding:", t);
      return ["Linear", "( value )"];
  }
}
function Re(t, e, n) {
  const r = t.getShaderParameter(e, t.COMPILE_STATUS);
  const i = t.getShaderInfoLog(e).trim();
  if (r && i === "") {
    return "";
  } else {
    return n.toUpperCase() + "\n\n" + i + "\n\n" + function (t) {
      const e = t.split("\n");
      for (let t = 0; t < e.length; t++) {
        e[t] = t + 1 + ": " + e[t];
      }
      return e.join("\n");
    }(t.getShaderSource(e));
  }
}
function Le(t, e) {
  const n = Ae(e);
  return "vec4 " + t + "( vec4 value ) { return " + n[0] + "ToLinear" + n[1] + "; }";
}
function Pe(t, e) {
  const n = Ae(e);
  return "vec4 " + t + "( vec4 value ) { return LinearTo" + n[0] + n[1] + "; }";
}
function Ce(t, e) {
  let n;
  switch (e) {
    case r.EoG:
      n = "Linear";
      break;
    case r.CdI:
      n = "Reinhard";
      break;
    case r.YGz:
      n = "OptimizedCineon";
      break;
    case r.LY2:
      n = "ACESFilmic";
      break;
    case r.dZ3:
      n = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e);
      n = "Linear";
  }
  return "vec3 " + t + "( vec3 color ) { return " + n + "ToneMapping( color ); }";
}
function De(t) {
  return t !== "";
}
function Ie(t, e) {
  return t.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function Ne(t, e) {
  return t.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const Fe = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Oe(t) {
  return t.replace(Fe, Ue);
}
function Ue(t, e) {
  const n = v[e];
  if (n === undefined) {
    throw new Error("Can not resolve #include <" + e + ">");
  }
  return Oe(n);
}
const Be = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;
const ze = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function ke(t) {
  return t.replace(ze, He).replace(Be, Ge);
}
function Ge(t, e, n, r) {
  console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead.");
  return He(t, e, n, r);
}
function He(t, e, n, r) {
  let i = "";
  for (let t = parseInt(e); t < parseInt(n); t++) {
    i += r.replace(/\[\s*i\s*\]/g, "[ " + t + " ]").replace(/UNROLLED_LOOP_INDEX/g, t);
  }
  return i;
}
function Ve(t) {
  let e = "precision " + t.precision + " float;\nprecision " + t.precision + " int;";
  if (t.precision === "highp") {
    e += "\n#define HIGH_PRECISION";
  } else if (t.precision === "mediump") {
    e += "\n#define MEDIUM_PRECISION";
  } else if (t.precision === "lowp") {
    e += "\n#define LOW_PRECISION";
  }
  return e;
}
function We(t, e, n, i) {
  const s = t.getContext();
  const a = n.defines;
  let o = n.vertexShader;
  let l = n.fragmentShader;
  const c = function (t) {
    let e = "SHADOWMAP_TYPE_BASIC";
    if (t.shadowMapType === r._iA) {
      e = "SHADOWMAP_TYPE_PCF";
    } else if (t.shadowMapType === r.ntZ) {
      e = "SHADOWMAP_TYPE_PCF_SOFT";
    } else if (t.shadowMapType === r.dwk) {
      e = "SHADOWMAP_TYPE_VSM";
    }
    return e;
  }(n);
  const u = function (t) {
    let e = "ENVMAP_TYPE_CUBE";
    if (t.envMap) {
      switch (t.envMapMode) {
        case r.fY$:
        case r.vxC:
          e = "ENVMAP_TYPE_CUBE";
          break;
        case r.g8_:
        case r.SVc:
          e = "ENVMAP_TYPE_CUBE_UV";
      }
    }
    return e;
  }(n);
  const h = function (t) {
    let e = "ENVMAP_MODE_REFLECTION";
    if (t.envMap) {
      switch (t.envMapMode) {
        case r.vxC:
        case r.SVc:
          e = "ENVMAP_MODE_REFRACTION";
      }
    }
    return e;
  }(n);
  const d = function (t) {
    let e = "ENVMAP_BLENDING_NONE";
    if (t.envMap) {
      switch (t.combine) {
        case r.Ns1:
          e = "ENVMAP_BLENDING_MULTIPLY";
          break;
        case r.qhX:
          e = "ENVMAP_BLENDING_MIX";
          break;
        case r.NDo:
          e = "ENVMAP_BLENDING_ADD";
      }
    }
    return e;
  }(n);
  const f = t.gammaFactor > 0 ? t.gammaFactor : 1;
  const p = n.isWebGL2 ? "" : function (t) {
    return [t.extensionDerivatives || t.envMapCubeUV || t.bumpMap || t.tangentSpaceNormalMap || t.clearcoatNormalMap || t.flatShading || t.shaderID === "physical" ? "#extension GL_OES_standard_derivatives : enable" : "", (t.extensionFragDepth || t.logarithmicDepthBuffer) && t.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "", t.extensionDrawBuffers && t.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "", (t.extensionShaderTextureLOD || t.envMap || t.transmission) && t.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""].filter(De).join("\n");
  }(n);
  const m = function (t) {
    const e = [];
    for (const n in t) {
      const r = t[n];
      if (r !== false) {
        e.push("#define " + n + " " + r);
      }
    }
    return e.join("\n");
  }(a);
  const g = s.createProgram();
  let _;
  let x;
  let y = n.glslVersion ? "#version " + n.glslVersion + "\n" : "";
  if (n.isRawShaderMaterial) {
    _ = [m].filter(De).join("\n");
    if (_.length > 0) {
      _ += "\n";
    }
    x = [p, m].filter(De).join("\n");
    if (x.length > 0) {
      x += "\n";
    }
  } else {
    _ = [Ve(n), "#define SHADER_NAME " + n.shaderName, m, n.instancing ? "#define USE_INSTANCING" : "", n.instancingColor ? "#define USE_INSTANCING_COLOR" : "", n.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", "#define GAMMA_FACTOR " + f, "#define MAX_BONES " + n.maxBones, n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + h : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMap && n.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", n.normalMap && n.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", n.displacementMap && n.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "", n.specularTintMap ? "#define USE_SPECULARTINTMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.transmission ? "#define USE_TRANSMISSION" : "", n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", n.thicknessMap ? "#define USE_THICKNESSMAP" : "", n.vertexTangents ? "#define USE_TANGENT" : "", n.vertexColors ? "#define USE_COLOR" : "", n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", n.vertexUvs ? "#define USE_UV" : "", n.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.skinning ? "#define USE_SKINNING" : "", n.useVertexTexture ? "#define BONE_TEXTURE" : "", n.morphTargets ? "#define USE_MORPHTARGETS" : "", n.morphNormals && n.flatShading === false ? "#define USE_MORPHNORMALS" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + c : "", n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", n.logarithmicDepthBuffer && n.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "\tattribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "\tattribute vec3 instanceColor;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_TANGENT", "\tattribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "\tattribute vec4 color;", "#elif defined( USE_COLOR )", "\tattribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n"].filter(De).join("\n");
    x = [p, Ve(n), "#define SHADER_NAME " + n.shaderName, m, "#define GAMMA_FACTOR " + f, n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.matcap ? "#define USE_MATCAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + u : "", n.envMap ? "#define " + h : "", n.envMap ? "#define " + d : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMap && n.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", n.normalMap && n.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", n.clearcoat ? "#define USE_CLEARCOAT" : "", n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "", n.specularTintMap ? "#define USE_SPECULARTINTMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.alphaTest ? "#define USE_ALPHATEST" : "", n.sheenTint ? "#define USE_SHEEN" : "", n.transmission ? "#define USE_TRANSMISSION" : "", n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", n.thicknessMap ? "#define USE_THICKNESSMAP" : "", n.vertexTangents ? "#define USE_TANGENT" : "", n.vertexColors || n.instancingColor ? "#define USE_COLOR" : "", n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", n.vertexUvs ? "#define USE_UV" : "", n.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", n.gradientMap ? "#define USE_GRADIENTMAP" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + c : "", n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", n.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", n.logarithmicDepthBuffer && n.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", (n.extensionShaderTextureLOD || n.envMap) && n.rendererExtensionShaderTextureLod ? "#define TEXTURE_LOD_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", n.toneMapping !== r.uL9 ? "#define TONE_MAPPING" : "", n.toneMapping !== r.uL9 ? v.tonemapping_pars_fragment : "", n.toneMapping !== r.uL9 ? Ce("toneMapping", n.toneMapping) : "", n.dithering ? "#define DITHERING" : "", n.format === r.UCm ? "#define OPAQUE" : "", v.encodings_pars_fragment, n.map ? Le("mapTexelToLinear", n.mapEncoding) : "", n.matcap ? Le("matcapTexelToLinear", n.matcapEncoding) : "", n.envMap ? Le("envMapTexelToLinear", n.envMapEncoding) : "", n.emissiveMap ? Le("emissiveMapTexelToLinear", n.emissiveMapEncoding) : "", n.specularTintMap ? Le("specularTintMapTexelToLinear", n.specularTintMapEncoding) : "", n.lightMap ? Le("lightMapTexelToLinear", n.lightMapEncoding) : "", Pe("linearToOutputTexel", n.outputEncoding), n.depthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "", "\n"].filter(De).join("\n");
  }
  o = Oe(o);
  o = Ie(o, n);
  o = Ne(o, n);
  l = Oe(l);
  l = Ie(l, n);
  l = Ne(l, n);
  o = ke(o);
  l = ke(l);
  if (n.isWebGL2 && n.isRawShaderMaterial !== true) {
    y = "#version 300 es\n";
    _ = ["#define attribute in", "#define varying out", "#define texture2D texture"].join("\n") + "\n" + _;
    x = ["#define varying in", n.glslVersion === r.LSk ? "" : "out highp vec4 pc_fragColor;", n.glslVersion === r.LSk ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join("\n") + "\n" + x;
  }
  const b = y + _ + o;
  const w = y + x + l;
  const M = Se(s, s.VERTEX_SHADER, b);
  const T = Se(s, s.FRAGMENT_SHADER, w);
  s.attachShader(g, M);
  s.attachShader(g, T);
  if (n.index0AttributeName !== undefined) {
    s.bindAttribLocation(g, 0, n.index0AttributeName);
  } else if (n.morphTargets === true) {
    s.bindAttribLocation(g, 0, "position");
  }
  s.linkProgram(g);
  if (t.debug.checkShaderErrors) {
    const t = s.getProgramInfoLog(g).trim();
    const e = s.getShaderInfoLog(M).trim();
    const n = s.getShaderInfoLog(T).trim();
    let r = true;
    let i = true;
    if (s.getProgramParameter(g, s.LINK_STATUS) === false) {
      r = false;
      const e = Re(s, M, "vertex");
      const n = Re(s, T, "fragment");
      console.error("THREE.WebGLProgram: Shader Error " + s.getError() + " - VALIDATE_STATUS " + s.getProgramParameter(g, s.VALIDATE_STATUS) + "\n\nProgram Info Log: " + t + "\n" + e + "\n" + n);
    } else if (t !== "") {
      console.warn("THREE.WebGLProgram: Program Info Log:", t);
    } else if (e === "" || n === "") {
      i = false;
    }
    if (i) {
      this.diagnostics = {
        runnable: r,
        programLog: t,
        vertexShader: {
          log: e,
          prefix: _
        },
        fragmentShader: {
          log: n,
          prefix: x
        }
      };
    }
  }
  let S;
  let E;
  s.deleteShader(M);
  s.deleteShader(T);
  this.getUniforms = function () {
    if (S === undefined) {
      S = new Te(s, g);
    }
    return S;
  };
  this.getAttributes = function () {
    if (E === undefined) {
      E = function (t, e) {
        const n = {};
        const r = t.getProgramParameter(e, t.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < r; i++) {
          const r = t.getActiveAttrib(e, i);
          const s = r.name;
          let a = 1;
          if (r.type === t.FLOAT_MAT2) {
            a = 2;
          }
          if (r.type === t.FLOAT_MAT3) {
            a = 3;
          }
          if (r.type === t.FLOAT_MAT4) {
            a = 4;
          }
          n[s] = {
            type: r.type,
            location: t.getAttribLocation(e, s),
            locationSize: a
          };
        }
        return n;
      }(s, g);
    }
    return E;
  };
  this.destroy = function () {
    i.releaseStatesOfProgram(this);
    s.deleteProgram(g);
    this.program = undefined;
  };
  this.name = n.shaderName;
  this.id = Ee++;
  this.cacheKey = e;
  this.usedTimes = 1;
  this.program = g;
  this.vertexShader = M;
  this.fragmentShader = T;
  return this;
}
function Xe(t, e, n, i, s, a, o) {
  const l = [];
  const c = s.isWebGL2;
  const u = s.logarithmicDepthBuffer;
  const h = s.floatVertexTextures;
  const d = s.maxVertexUniforms;
  const f = s.vertexTextures;
  let p = s.precision;
  const m = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  const g = ["precision", "isWebGL2", "supportsVertexTextures", "outputEncoding", "instancing", "instancingColor", "map", "mapEncoding", "matcap", "matcapEncoding", "envMap", "envMapMode", "envMapEncoding", "envMapCubeUV", "lightMap", "lightMapEncoding", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "objectSpaceNormalMap", "tangentSpaceNormalMap", "clearcoat", "clearcoatMap", "clearcoatRoughnessMap", "clearcoatNormalMap", "displacementMap", "specularMap", "specularIntensityMap", "specularTintMap", "specularTintMapEncoding", "roughnessMap", "metalnessMap", "gradientMap", "alphaMap", "alphaTest", "combine", "vertexColors", "vertexAlphas", "vertexTangents", "vertexUvs", "uvsVertexOnly", "fog", "useFog", "fogExp2", "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning", "maxBones", "useVertexTexture", "morphTargets", "morphNormals", "premultipliedAlpha", "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights", "numDirLightShadows", "numPointLightShadows", "numSpotLightShadows", "shadowMapEnabled", "shadowMapType", "toneMapping", "physicallyCorrectLights", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering", "format", "sheenTint", "transmission", "transmissionMap", "thicknessMap"];
  function v(t) {
    let e;
    if (t && t.isTexture) {
      e = t.encoding;
    } else if (t && t.isWebGLRenderTarget) {
      console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead.");
      e = t.texture.encoding;
    } else {
      e = r.rnI;
    }
    return e;
  }
  return {
    getParameters: function (a, l, g, _, x) {
      const y = _.fog;
      const b = a.isMeshStandardMaterial ? _.environment : null;
      const M = (a.isMeshStandardMaterial ? n : e).get(a.envMap || b);
      const T = m[a.type];
      const S = x.isSkinnedMesh ? function (t) {
        const e = t.skeleton.bones;
        if (h) {
          return 1024;
        }
        {
          const t = d;
          const n = Math.floor((t - 20) / 4);
          const r = Math.min(n, e.length);
          if (r < e.length) {
            console.warn("THREE.WebGLRenderer: Skeleton has " + e.length + " bones. This GPU supports " + r + ".");
            return 0;
          } else {
            return r;
          }
        }
      }(x) : 0;
      let E;
      let A;
      if (a.precision !== null) {
        p = s.getMaxPrecision(a.precision);
        if (p !== a.precision) {
          console.warn("THREE.WebGLProgram.getParameters:", a.precision, "not supported, using", p, "instead.");
        }
      }
      if (T) {
        const t = w[T];
        E = t.vertexShader;
        A = t.fragmentShader;
      } else {
        E = a.vertexShader;
        A = a.fragmentShader;
      }
      const R = t.getRenderTarget();
      const L = a.alphaTest > 0;
      const P = a.clearcoat > 0;
      return {
        isWebGL2: c,
        shaderID: T,
        shaderName: a.type,
        vertexShader: E,
        fragmentShader: A,
        defines: a.defines,
        isRawShaderMaterial: a.isRawShaderMaterial === true,
        glslVersion: a.glslVersion,
        precision: p,
        instancing: x.isInstancedMesh === true,
        instancingColor: x.isInstancedMesh === true && x.instanceColor !== null,
        supportsVertexTextures: f,
        outputEncoding: R !== null ? v(R.texture) : t.outputEncoding,
        map: !!a.map,
        mapEncoding: v(a.map),
        matcap: !!a.matcap,
        matcapEncoding: v(a.matcap),
        envMap: !!M,
        envMapMode: M && M.mapping,
        envMapEncoding: v(M),
        envMapCubeUV: !!M && (M.mapping === r.g8_ || M.mapping === r.SVc),
        lightMap: !!a.lightMap,
        lightMapEncoding: v(a.lightMap),
        aoMap: !!a.aoMap,
        emissiveMap: !!a.emissiveMap,
        emissiveMapEncoding: v(a.emissiveMap),
        bumpMap: !!a.bumpMap,
        normalMap: !!a.normalMap,
        objectSpaceNormalMap: a.normalMapType === r.PA7,
        tangentSpaceNormalMap: a.normalMapType === r.IOt,
        clearcoat: P,
        clearcoatMap: P && !!a.clearcoatMap,
        clearcoatRoughnessMap: P && !!a.clearcoatRoughnessMap,
        clearcoatNormalMap: P && !!a.clearcoatNormalMap,
        displacementMap: !!a.displacementMap,
        roughnessMap: !!a.roughnessMap,
        metalnessMap: !!a.metalnessMap,
        specularMap: !!a.specularMap,
        specularIntensityMap: !!a.specularIntensityMap,
        specularTintMap: !!a.specularTintMap,
        specularTintMapEncoding: v(a.specularTintMap),
        alphaMap: !!a.alphaMap,
        alphaTest: L,
        gradientMap: !!a.gradientMap,
        sheenTint: !!a.sheenTint && (a.sheenTint.r > 0 || a.sheenTint.g > 0 || a.sheenTint.b > 0),
        transmission: a.transmission > 0,
        transmissionMap: !!a.transmissionMap,
        thicknessMap: !!a.thicknessMap,
        combine: a.combine,
        vertexTangents: !!a.normalMap && !!x.geometry && !!x.geometry.attributes.tangent,
        vertexColors: a.vertexColors,
        vertexAlphas: a.vertexColors === true && !!x.geometry && !!x.geometry.attributes.color && x.geometry.attributes.color.itemSize === 4,
        vertexUvs: !!a.map || !!a.bumpMap || !!a.normalMap || !!a.specularMap || !!a.alphaMap || !!a.emissiveMap || !!a.roughnessMap || !!a.metalnessMap || !!a.clearcoatMap || !!a.clearcoatRoughnessMap || !!a.clearcoatNormalMap || !!a.displacementMap || !!a.transmissionMap || !!a.thicknessMap || !!a.specularIntensityMap || !!a.specularTintMap,
        uvsVertexOnly: !a.map && !a.bumpMap && !a.normalMap && !a.specularMap && !a.alphaMap && !a.emissiveMap && !a.roughnessMap && !a.metalnessMap && !a.clearcoatNormalMap && !(a.transmission > 0) && !a.transmissionMap && !a.thicknessMap && !a.specularIntensityMap && !a.specularTintMap && !!a.displacementMap,
        fog: !!y,
        useFog: a.fog,
        fogExp2: y && y.isFogExp2,
        flatShading: !!a.flatShading,
        sizeAttenuation: a.sizeAttenuation,
        logarithmicDepthBuffer: u,
        skinning: x.isSkinnedMesh === true && S > 0,
        maxBones: S,
        useVertexTexture: h,
        morphTargets: !!x.geometry && !!x.geometry.morphAttributes.position,
        morphNormals: !!x.geometry && !!x.geometry.morphAttributes.normal,
        numDirLights: l.directional.length,
        numPointLights: l.point.length,
        numSpotLights: l.spot.length,
        numRectAreaLights: l.rectArea.length,
        numHemiLights: l.hemi.length,
        numDirLightShadows: l.directionalShadowMap.length,
        numPointLightShadows: l.pointShadowMap.length,
        numSpotLightShadows: l.spotShadowMap.length,
        numClippingPlanes: o.numPlanes,
        numClipIntersection: o.numIntersection,
        format: a.format,
        dithering: a.dithering,
        shadowMapEnabled: t.shadowMap.enabled && g.length > 0,
        shadowMapType: t.shadowMap.type,
        toneMapping: a.toneMapped ? t.toneMapping : r.uL9,
        physicallyCorrectLights: t.physicallyCorrectLights,
        premultipliedAlpha: a.premultipliedAlpha,
        doubleSided: a.side === r.ehD,
        flipSided: a.side === r._Li,
        depthPacking: a.depthPacking !== undefined && a.depthPacking,
        index0AttributeName: a.index0AttributeName,
        extensionDerivatives: a.extensions && a.extensions.derivatives,
        extensionFragDepth: a.extensions && a.extensions.fragDepth,
        extensionDrawBuffers: a.extensions && a.extensions.drawBuffers,
        extensionShaderTextureLOD: a.extensions && a.extensions.shaderTextureLOD,
        rendererExtensionFragDepth: c || i.has("EXT_frag_depth"),
        rendererExtensionDrawBuffers: c || i.has("WEBGL_draw_buffers"),
        rendererExtensionShaderTextureLod: c || i.has("EXT_shader_texture_lod"),
        customProgramCacheKey: a.customProgramCacheKey()
      };
    },
    getProgramCacheKey: function (e) {
      const n = [];
      if (e.shaderID) {
        n.push(e.shaderID);
      } else {
        n.push(e.fragmentShader);
        n.push(e.vertexShader);
      }
      if (e.defines !== undefined) {
        for (const t in e.defines) {
          n.push(t);
          n.push(e.defines[t]);
        }
      }
      if (e.isRawShaderMaterial === false) {
        for (let t = 0; t < g.length; t++) {
          n.push(e[g[t]]);
        }
        n.push(t.outputEncoding);
        n.push(t.gammaFactor);
      }
      n.push(e.customProgramCacheKey);
      return n.join();
    },
    getUniforms: function (t) {
      const e = m[t.type];
      let n;
      if (e) {
        const t = w[e];
        n = _.rD.clone(t.uniforms);
      } else {
        n = t.uniforms;
      }
      return n;
    },
    acquireProgram: function (e, n) {
      let r;
      for (let t = 0, e = l.length; t < e; t++) {
        const e = l[t];
        if (e.cacheKey === n) {
          r = e;
          ++r.usedTimes;
          break;
        }
      }
      if (r === undefined) {
        r = new We(t, n, e, a);
        l.push(r);
      }
      return r;
    },
    releaseProgram: function (t) {
      if (--t.usedTimes == 0) {
        const e = l.indexOf(t);
        l[e] = l[l.length - 1];
        l.pop();
        t.destroy();
      }
    },
    programs: l
  };
}
function je() {
  let t = new WeakMap();
  return {
    get: function (e) {
      let n = t.get(e);
      if (n === undefined) {
        n = {};
        t.set(e, n);
      }
      return n;
    },
    remove: function (e) {
      t.delete(e);
    },
    update: function (e, n, r) {
      t.get(e)[n] = r;
    },
    dispose: function () {
      t = new WeakMap();
    }
  };
}
function qe(t, e) {
  if (t.groupOrder !== e.groupOrder) {
    return t.groupOrder - e.groupOrder;
  } else if (t.renderOrder !== e.renderOrder) {
    return t.renderOrder - e.renderOrder;
  } else if (t.program !== e.program) {
    return t.program.id - e.program.id;
  } else if (t.material.id !== e.material.id) {
    return t.material.id - e.material.id;
  } else if (t.z !== e.z) {
    return t.z - e.z;
  } else {
    return t.id - e.id;
  }
}
function Ye(t, e) {
  if (t.groupOrder !== e.groupOrder) {
    return t.groupOrder - e.groupOrder;
  } else if (t.renderOrder !== e.renderOrder) {
    return t.renderOrder - e.renderOrder;
  } else if (t.z !== e.z) {
    return e.z - t.z;
  } else {
    return t.id - e.id;
  }
}
function Ze(t) {
  const e = [];
  let n = 0;
  const r = [];
  const i = [];
  const s = [];
  const a = {
    id: -1
  };
  function o(r, i, s, o, l, c) {
    let u = e[n];
    const h = t.get(s);
    if (u === undefined) {
      u = {
        id: r.id,
        object: r,
        geometry: i,
        material: s,
        program: h.program || a,
        groupOrder: o,
        renderOrder: r.renderOrder,
        z: l,
        group: c
      };
      e[n] = u;
    } else {
      u.id = r.id;
      u.object = r;
      u.geometry = i;
      u.material = s;
      u.program = h.program || a;
      u.groupOrder = o;
      u.renderOrder = r.renderOrder;
      u.z = l;
      u.group = c;
    }
    n++;
    return u;
  }
  return {
    opaque: r,
    transmissive: i,
    transparent: s,
    init: function () {
      n = 0;
      r.length = 0;
      i.length = 0;
      s.length = 0;
    },
    push: function (t, e, n, a, l, c) {
      const u = o(t, e, n, a, l, c);
      if (n.transmission > 0) {
        i.push(u);
      } else if (n.transparent === true) {
        s.push(u);
      } else {
        r.push(u);
      }
    },
    unshift: function (t, e, n, a, l, c) {
      const u = o(t, e, n, a, l, c);
      if (n.transmission > 0) {
        i.unshift(u);
      } else if (n.transparent === true) {
        s.unshift(u);
      } else {
        r.unshift(u);
      }
    },
    finish: function () {
      for (let t = n, r = e.length; t < r; t++) {
        const n = e[t];
        if (n.id === null) {
          break;
        }
        n.id = null;
        n.object = null;
        n.geometry = null;
        n.material = null;
        n.program = null;
        n.group = null;
      }
    },
    sort: function (t, e) {
      if (r.length > 1) {
        r.sort(t || qe);
      }
      if (i.length > 1) {
        i.sort(e || Ye);
      }
      if (s.length > 1) {
        s.sort(e || Ye);
      }
    }
  };
}
function Ke(t) {
  let e = new WeakMap();
  return {
    get: function (n, r) {
      let i;
      if (e.has(n) === false) {
        i = new Ze(t);
        e.set(n, [i]);
      } else if (r >= e.get(n).length) {
        i = new Ze(t);
        e.get(n).push(i);
      } else {
        i = e.get(n)[r];
      }
      return i;
    },
    dispose: function () {
      e = new WeakMap();
    }
  };
}
function Je() {
  const t = {};
  return {
    get: function (e) {
      if (t[e.id] !== undefined) {
        return t[e.id];
      }
      let n;
      switch (e.type) {
        case "DirectionalLight":
          n = {
            direction: new a.P(),
            color: new m.I()
          };
          break;
        case "SpotLight":
          n = {
            position: new a.P(),
            direction: new a.P(),
            color: new m.I(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          n = {
            position: new a.P(),
            color: new m.I(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          n = {
            direction: new a.P(),
            skyColor: new m.I(),
            groundColor: new m.I()
          };
          break;
        case "RectAreaLight":
          n = {
            color: new m.I(),
            position: new a.P(),
            halfWidth: new a.P(),
            halfHeight: new a.P()
          };
      }
      t[e.id] = n;
      return n;
    }
  };
}
let Qe = 0;
function $e(t, e) {
  return (e.castShadow ? 1 : 0) - (t.castShadow ? 1 : 0);
}
function tn(t, e) {
  const n = new Je();
  const r = function () {
    const t = {};
    return {
      get: function (e) {
        if (t[e.id] !== undefined) {
          return t[e.id];
        }
        let n;
        switch (e.type) {
          case "DirectionalLight":
          case "SpotLight":
            n = {
              shadowBias: 0,
              shadowNormalBias: 0,
              shadowRadius: 1,
              shadowMapSize: new x.F()
            };
            break;
          case "PointLight":
            n = {
              shadowBias: 0,
              shadowNormalBias: 0,
              shadowRadius: 1,
              shadowMapSize: new x.F(),
              shadowCameraNear: 1,
              shadowCameraFar: 1000
            };
        }
        t[e.id] = n;
        return n;
      }
    };
  }();
  const i = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotShadow: [],
    spotShadowMap: [],
    spotShadowMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: []
  };
  for (let t = 0; t < 9; t++) {
    i.probe.push(new a.P());
  }
  const o = new a.P();
  const l = new s.y();
  const c = new s.y();
  return {
    setup: function (s, a) {
      let o = 0;
      let l = 0;
      let c = 0;
      for (let t = 0; t < 9; t++) {
        i.probe[t].set(0, 0, 0);
      }
      let u = 0;
      let h = 0;
      let d = 0;
      let f = 0;
      let p = 0;
      let m = 0;
      let g = 0;
      let v = 0;
      s.sort($e);
      const _ = a !== true ? Math.PI : 1;
      for (let t = 0, e = s.length; t < e; t++) {
        const e = s[t];
        const a = e.color;
        const x = e.intensity;
        const y = e.distance;
        const b = e.shadow && e.shadow.map ? e.shadow.map.texture : null;
        if (e.isAmbientLight) {
          o += a.r * x * _;
          l += a.g * x * _;
          c += a.b * x * _;
        } else if (e.isLightProbe) {
          for (let t = 0; t < 9; t++) {
            i.probe[t].addScaledVector(e.sh.coefficients[t], x);
          }
        } else if (e.isDirectionalLight) {
          const t = n.get(e);
          t.color.copy(e.color).multiplyScalar(e.intensity * _);
          if (e.castShadow) {
            const t = e.shadow;
            const n = r.get(e);
            n.shadowBias = t.bias;
            n.shadowNormalBias = t.normalBias;
            n.shadowRadius = t.radius;
            n.shadowMapSize = t.mapSize;
            i.directionalShadow[u] = n;
            i.directionalShadowMap[u] = b;
            i.directionalShadowMatrix[u] = e.shadow.matrix;
            m++;
          }
          i.directional[u] = t;
          u++;
        } else if (e.isSpotLight) {
          const t = n.get(e);
          t.position.setFromMatrixPosition(e.matrixWorld);
          t.color.copy(a).multiplyScalar(x * _);
          t.distance = y;
          t.coneCos = Math.cos(e.angle);
          t.penumbraCos = Math.cos(e.angle * (1 - e.penumbra));
          t.decay = e.decay;
          if (e.castShadow) {
            const t = e.shadow;
            const n = r.get(e);
            n.shadowBias = t.bias;
            n.shadowNormalBias = t.normalBias;
            n.shadowRadius = t.radius;
            n.shadowMapSize = t.mapSize;
            i.spotShadow[d] = n;
            i.spotShadowMap[d] = b;
            i.spotShadowMatrix[d] = e.shadow.matrix;
            v++;
          }
          i.spot[d] = t;
          d++;
        } else if (e.isRectAreaLight) {
          const t = n.get(e);
          t.color.copy(a).multiplyScalar(x);
          t.halfWidth.set(e.width * 0.5, 0, 0);
          t.halfHeight.set(0, e.height * 0.5, 0);
          i.rectArea[f] = t;
          f++;
        } else if (e.isPointLight) {
          const t = n.get(e);
          t.color.copy(e.color).multiplyScalar(e.intensity * _);
          t.distance = e.distance;
          t.decay = e.decay;
          if (e.castShadow) {
            const t = e.shadow;
            const n = r.get(e);
            n.shadowBias = t.bias;
            n.shadowNormalBias = t.normalBias;
            n.shadowRadius = t.radius;
            n.shadowMapSize = t.mapSize;
            n.shadowCameraNear = t.camera.near;
            n.shadowCameraFar = t.camera.far;
            i.pointShadow[h] = n;
            i.pointShadowMap[h] = b;
            i.pointShadowMatrix[h] = e.shadow.matrix;
            g++;
          }
          i.point[h] = t;
          h++;
        } else if (e.isHemisphereLight) {
          const t = n.get(e);
          t.skyColor.copy(e.color).multiplyScalar(x * _);
          t.groundColor.copy(e.groundColor).multiplyScalar(x * _);
          i.hemi[p] = t;
          p++;
        }
      }
      if (f > 0) {
        if (e.isWebGL2 || t.has("OES_texture_float_linear") === true) {
          i.rectAreaLTC1 = b.LTC_FLOAT_1;
          i.rectAreaLTC2 = b.LTC_FLOAT_2;
        } else if (t.has("OES_texture_half_float_linear") === true) {
          i.rectAreaLTC1 = b.LTC_HALF_1;
          i.rectAreaLTC2 = b.LTC_HALF_2;
        } else {
          console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.");
        }
      }
      i.ambient[0] = o;
      i.ambient[1] = l;
      i.ambient[2] = c;
      const x = i.hash;
      if (x.directionalLength !== u || x.pointLength !== h || x.spotLength !== d || x.rectAreaLength !== f || x.hemiLength !== p || x.numDirectionalShadows !== m || x.numPointShadows !== g || x.numSpotShadows !== v) {
        i.directional.length = u;
        i.spot.length = d;
        i.rectArea.length = f;
        i.point.length = h;
        i.hemi.length = p;
        i.directionalShadow.length = m;
        i.directionalShadowMap.length = m;
        i.pointShadow.length = g;
        i.pointShadowMap.length = g;
        i.spotShadow.length = v;
        i.spotShadowMap.length = v;
        i.directionalShadowMatrix.length = m;
        i.pointShadowMatrix.length = g;
        i.spotShadowMatrix.length = v;
        x.directionalLength = u;
        x.pointLength = h;
        x.spotLength = d;
        x.rectAreaLength = f;
        x.hemiLength = p;
        x.numDirectionalShadows = m;
        x.numPointShadows = g;
        x.numSpotShadows = v;
        i.version = Qe++;
      }
    },
    setupView: function (t, e) {
      let n = 0;
      let r = 0;
      let s = 0;
      let a = 0;
      let u = 0;
      const h = e.matrixWorldInverse;
      for (let e = 0, d = t.length; e < d; e++) {
        const d = t[e];
        if (d.isDirectionalLight) {
          const t = i.directional[n];
          t.direction.setFromMatrixPosition(d.matrixWorld);
          o.setFromMatrixPosition(d.target.matrixWorld);
          t.direction.sub(o);
          t.direction.transformDirection(h);
          n++;
        } else if (d.isSpotLight) {
          const t = i.spot[s];
          t.position.setFromMatrixPosition(d.matrixWorld);
          t.position.applyMatrix4(h);
          t.direction.setFromMatrixPosition(d.matrixWorld);
          o.setFromMatrixPosition(d.target.matrixWorld);
          t.direction.sub(o);
          t.direction.transformDirection(h);
          s++;
        } else if (d.isRectAreaLight) {
          const t = i.rectArea[a];
          t.position.setFromMatrixPosition(d.matrixWorld);
          t.position.applyMatrix4(h);
          c.identity();
          l.copy(d.matrixWorld);
          l.premultiply(h);
          c.extractRotation(l);
          t.halfWidth.set(d.width * 0.5, 0, 0);
          t.halfHeight.set(0, d.height * 0.5, 0);
          t.halfWidth.applyMatrix4(c);
          t.halfHeight.applyMatrix4(c);
          a++;
        } else if (d.isPointLight) {
          const t = i.point[r];
          t.position.setFromMatrixPosition(d.matrixWorld);
          t.position.applyMatrix4(h);
          r++;
        } else if (d.isHemisphereLight) {
          const t = i.hemi[u];
          t.direction.setFromMatrixPosition(d.matrixWorld);
          t.direction.transformDirection(h);
          t.direction.normalize();
          u++;
        }
      }
    },
    state: i
  };
}
function en(t, e) {
  const n = new tn(t, e);
  const r = [];
  const i = [];
  return {
    init: function () {
      r.length = 0;
      i.length = 0;
    },
    state: {
      lightsArray: r,
      shadowsArray: i,
      lights: n
    },
    setupLights: function (t) {
      n.setup(r, t);
    },
    setupLightsView: function (t) {
      n.setupView(r, t);
    },
    pushLight: function (t) {
      r.push(t);
    },
    pushShadow: function (t) {
      i.push(t);
    }
  };
}
function nn(t, e) {
  let n = new WeakMap();
  return {
    get: function (r, i = 0) {
      let s;
      if (n.has(r) === false) {
        s = new en(t, e);
        n.set(r, [s]);
      } else if (i >= n.get(r).length) {
        s = new en(t, e);
        n.get(r).push(s);
      } else {
        s = n.get(r)[i];
      }
      return s;
    },
    dispose: function () {
      n = new WeakMap();
    }
  };
}
var rn = require("./2114.cjs");
var sn = require("./4164.cjs");
class an extends sn.F {
  constructor(t) {
    super();
    this.type = "MeshDistanceMaterial";
    this.referencePosition = new a.P();
    this.nearDistance = 1;
    this.farDistance = 1000;
    this.map = null;
    this.alphaMap = null;
    this.displacementMap = null;
    this.displacementScale = 1;
    this.displacementBias = 0;
    this.fog = false;
    this.setValues(t);
  }
  copy(t) {
    super.copy(t);
    this.referencePosition.copy(t.referencePosition);
    this.nearDistance = t.nearDistance;
    this.farDistance = t.farDistance;
    this.map = t.map;
    this.alphaMap = t.alphaMap;
    this.displacementMap = t.displacementMap;
    this.displacementScale = t.displacementScale;
    this.displacementBias = t.displacementBias;
    return this;
  }
}
an.prototype.isMeshDistanceMaterial = true;
function on(t, e, n) {
  let s = new i.i();
  const a = new x.F();
  const l = new x.F();
  const c = new o.L();
  const d = new rn.l({
    depthPacking: r.mSO
  });
  const f = new an();
  const m = {};
  const v = n.maxTextureSize;
  const _ = {
    0: r._Li,
    1: r.Wl3,
    2: r.ehD
  };
  const y = new p.j({
    uniforms: {
      shadow_pass: {
        value: null
      },
      resolution: {
        value: new x.F()
      },
      radius: {
        value: 4
      },
      samples: {
        value: 8
      }
    },
    vertexShader: "\nvoid main() {\n\n\tgl_Position = vec4( position, 1.0 );\n\n}\n",
    fragmentShader: "\nuniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\nuniform float samples;\n\n#include <packing>\n\nvoid main() {\n\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\n\t// This seems totally useless but it's a crazy work around for a Adreno compiler bug\n\t// float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy ) / resolution ) );\n\n\tfloat uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n\tfloat uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n\tfor ( float i = 0.0; i < samples; i ++ ) {\n\n\t\tfloat uvOffset = uvStart + i * uvStride;\n\n\t\t#ifdef HORIZONTAL_PASS\n\n\t\t\tvec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\n\t\t#else\n\n\t\t\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\n\t\t#endif\n\n\t}\n\n\tmean = mean / samples;\n\tsquared_mean = squared_mean / samples;\n\n\tfloat std_dev = sqrt( squared_mean - mean * mean );\n\n\tgl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n\n}\n"
  });
  const b = y.clone();
  b.defines.HORIZONTAL_PASS = 1;
  const w = new u.u();
  w.setAttribute("position", new h.Tl(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3));
  const M = new g.K(w, y);
  const T = this;
  function S(n, r) {
    const i = e.update(M);
    y.uniforms.shadow_pass.value = n.map.texture;
    y.uniforms.resolution.value = n.mapSize;
    y.uniforms.radius.value = n.radius;
    y.uniforms.samples.value = n.blurSamples;
    t.setRenderTarget(n.mapPass);
    t.clear();
    t.renderBufferDirect(r, null, i, y, M, null);
    b.uniforms.shadow_pass.value = n.mapPass.texture;
    b.uniforms.resolution.value = n.mapSize;
    b.uniforms.radius.value = n.radius;
    b.uniforms.samples.value = n.blurSamples;
    t.setRenderTarget(n.map);
    t.clear();
    t.renderBufferDirect(r, null, i, b, M, null);
  }
  function E(e, n, i, s, a, o, l) {
    let c = null;
    const u = s.isPointLight === true ? e.customDistanceMaterial : e.customDepthMaterial;
    c = u !== undefined ? u : s.isPointLight === true ? f : d;
    if (t.localClippingEnabled && i.clipShadows === true && i.clippingPlanes.length !== 0 || i.displacementMap && i.displacementScale !== 0 || i.alphaMap && i.alphaTest > 0) {
      const t = c.uuid;
      const e = i.uuid;
      let n = m[t];
      if (n === undefined) {
        n = {};
        m[t] = n;
      }
      let r = n[e];
      if (r === undefined) {
        r = c.clone();
        n[e] = r;
      }
      c = r;
    }
    c.visible = i.visible;
    c.wireframe = i.wireframe;
    if (l === r.dwk) {
      c.side = i.shadowSide !== null ? i.shadowSide : i.side;
    } else {
      c.side = i.shadowSide !== null ? i.shadowSide : _[i.side];
    }
    c.alphaMap = i.alphaMap;
    c.alphaTest = i.alphaTest;
    c.clipShadows = i.clipShadows;
    c.clippingPlanes = i.clippingPlanes;
    c.clipIntersection = i.clipIntersection;
    c.displacementMap = i.displacementMap;
    c.displacementScale = i.displacementScale;
    c.displacementBias = i.displacementBias;
    c.wireframeLinewidth = i.wireframeLinewidth;
    c.linewidth = i.linewidth;
    if (s.isPointLight === true && c.isMeshDistanceMaterial === true) {
      c.referencePosition.setFromMatrixPosition(s.matrixWorld);
      c.nearDistance = a;
      c.farDistance = o;
    }
    return c;
  }
  function A(n, i, a, o, l) {
    if (n.visible === false) {
      return;
    }
    if (n.layers.test(i.layers) && (n.isMesh || n.isLine || n.isPoints) && (n.castShadow || n.receiveShadow && l === r.dwk) && (!n.frustumCulled || s.intersectsObject(n))) {
      n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse, n.matrixWorld);
      const r = e.update(n);
      const i = n.material;
      if (Array.isArray(i)) {
        const e = r.groups;
        for (let s = 0, c = e.length; s < c; s++) {
          const c = e[s];
          const u = i[c.materialIndex];
          if (u && u.visible) {
            const e = E(n, 0, u, o, a.near, a.far, l);
            t.renderBufferDirect(a, null, r, e, n, c);
          }
        }
      } else if (i.visible) {
        const e = E(n, 0, i, o, a.near, a.far, l);
        t.renderBufferDirect(a, null, r, e, n, null);
      }
    }
    const c = n.children;
    for (let t = 0, e = c.length; t < e; t++) {
      A(c[t], i, a, o, l);
    }
  }
  this.enabled = false;
  this.autoUpdate = true;
  this.needsUpdate = false;
  this.type = r._iA;
  this.render = function (e, n, i) {
    if (T.enabled === false) {
      return;
    }
    if (T.autoUpdate === false && T.needsUpdate === false) {
      return;
    }
    if (e.length === 0) {
      return;
    }
    const o = t.getRenderTarget();
    const u = t.getActiveCubeFace();
    const h = t.getActiveMipmapLevel();
    const d = t.state;
    d.setBlending(r.jFi);
    d.buffers.color.setClear(1, 1, 1, 1);
    d.buffers.depth.setTest(true);
    d.setScissorTest(false);
    for (let o = 0, u = e.length; o < u; o++) {
      const u = e[o];
      const h = u.shadow;
      if (h === undefined) {
        console.warn("THREE.WebGLShadowMap:", u, "has no shadow.");
        continue;
      }
      if (h.autoUpdate === false && h.needsUpdate === false) {
        continue;
      }
      a.copy(h.mapSize);
      const f = h.getFrameExtents();
      a.multiply(f);
      l.copy(h.mapSize);
      if (a.x > v || a.y > v) {
        if (a.x > v) {
          l.x = Math.floor(v / f.x);
          a.x = l.x * f.x;
          h.mapSize.x = l.x;
        }
        if (a.y > v) {
          l.y = Math.floor(v / f.y);
          a.y = l.y * f.y;
          h.mapSize.y = l.y;
        }
      }
      if (h.map === null && !h.isPointLightShadow && this.type === r.dwk) {
        const t = {
          minFilter: r.wem,
          magFilter: r.wem,
          format: r.wk1
        };
        h.map = new L.d(a.x, a.y, t);
        h.map.texture.name = u.name + ".shadowMap";
        h.mapPass = new L.d(a.x, a.y, t);
        h.camera.updateProjectionMatrix();
      }
      if (h.map === null) {
        const t = {
          minFilter: r.TyD,
          magFilter: r.TyD,
          format: r.wk1
        };
        h.map = new L.d(a.x, a.y, t);
        h.map.texture.name = u.name + ".shadowMap";
        h.camera.updateProjectionMatrix();
      }
      t.setRenderTarget(h.map);
      t.clear();
      const p = h.getViewportCount();
      for (let t = 0; t < p; t++) {
        const e = h.getViewport(t);
        c.set(l.x * e.x, l.y * e.y, l.x * e.z, l.y * e.w);
        d.viewport(c);
        h.updateMatrices(u, t);
        s = h.getFrustum();
        A(n, i, h.camera, u, this.type);
      }
      if (!h.isPointLightShadow && this.type === r.dwk) {
        S(h, i);
      }
      h.needsUpdate = false;
    }
    T.needsUpdate = false;
    t.setRenderTarget(o, u, h);
  };
}
function ln(t, e, n) {
  const i = n.isWebGL2;
  const s = new function () {
    let e = false;
    const n = new o.L();
    let r = null;
    const i = new o.L(0, 0, 0, 0);
    return {
      setMask: function (n) {
        if (r !== n && !e) {
          t.colorMask(n, n, n, n);
          r = n;
        }
      },
      setLocked: function (t) {
        e = t;
      },
      setClear: function (e, r, s, a, o) {
        if (o === true) {
          e *= a;
          r *= a;
          s *= a;
        }
        n.set(e, r, s, a);
        if (i.equals(n) === false) {
          t.clearColor(e, r, s, a);
          i.copy(n);
        }
      },
      reset: function () {
        e = false;
        r = null;
        i.set(-1, 0, 0, 0);
      }
    };
  }();
  const a = new function () {
    let e = false;
    let n = null;
    let i = null;
    let s = null;
    return {
      setTest: function (e) {
        if (e) {
          z(t.DEPTH_TEST);
        } else {
          k(t.DEPTH_TEST);
        }
      },
      setMask: function (r) {
        if (n !== r && !e) {
          t.depthMask(r);
          n = r;
        }
      },
      setFunc: function (e) {
        if (i !== e) {
          if (e) {
            switch (e) {
              case r.BVF:
                t.depthFunc(t.NEVER);
                break;
              case r.Se2:
                t.depthFunc(t.ALWAYS);
                break;
              case r.Zr5:
                t.depthFunc(t.LESS);
                break;
              case r.vCF:
                t.depthFunc(t.LEQUAL);
                break;
              case r.eD:
                t.depthFunc(t.EQUAL);
                break;
              case r.ksN:
                t.depthFunc(t.GEQUAL);
                break;
              case r.w$m:
                t.depthFunc(t.GREATER);
                break;
              case r.M6v:
                t.depthFunc(t.NOTEQUAL);
                break;
              default:
                t.depthFunc(t.LEQUAL);
            }
          } else {
            t.depthFunc(t.LEQUAL);
          }
          i = e;
        }
      },
      setLocked: function (t) {
        e = t;
      },
      setClear: function (e) {
        if (s !== e) {
          t.clearDepth(e);
          s = e;
        }
      },
      reset: function () {
        e = false;
        n = null;
        i = null;
        s = null;
      }
    };
  }();
  const l = new function () {
    let e = false;
    let n = null;
    let r = null;
    let i = null;
    let s = null;
    let a = null;
    let o = null;
    let l = null;
    let c = null;
    return {
      setTest: function (n) {
        if (!e) {
          if (n) {
            z(t.STENCIL_TEST);
          } else {
            k(t.STENCIL_TEST);
          }
        }
      },
      setMask: function (r) {
        if (n !== r && !e) {
          t.stencilMask(r);
          n = r;
        }
      },
      setFunc: function (e, n, a) {
        if (r !== e || i !== n || s !== a) {
          t.stencilFunc(e, n, a);
          r = e;
          i = n;
          s = a;
        }
      },
      setOp: function (e, n, r) {
        if (a !== e || o !== n || l !== r) {
          t.stencilOp(e, n, r);
          a = e;
          o = n;
          l = r;
        }
      },
      setLocked: function (t) {
        e = t;
      },
      setClear: function (e) {
        if (c !== e) {
          t.clearStencil(e);
          c = e;
        }
      },
      reset: function () {
        e = false;
        n = null;
        r = null;
        i = null;
        s = null;
        a = null;
        o = null;
        l = null;
        c = null;
      }
    };
  }();
  let c = {};
  let u = null;
  let h = {};
  let d = null;
  let f = false;
  let p = null;
  let m = null;
  let g = null;
  let v = null;
  let _ = null;
  let x = null;
  let y = null;
  let b = false;
  let w = null;
  let M = null;
  let T = null;
  let S = null;
  let E = null;
  const A = t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let R = false;
  let L = 0;
  const P = t.getParameter(t.VERSION);
  if (P.indexOf("WebGL") !== -1) {
    L = parseFloat(/^WebGL (\d)/.exec(P)[1]);
    R = L >= 1;
  } else if (P.indexOf("OpenGL ES") !== -1) {
    L = parseFloat(/^OpenGL ES (\d)/.exec(P)[1]);
    R = L >= 2;
  }
  let C = null;
  let D = {};
  const I = t.getParameter(t.SCISSOR_BOX);
  const N = t.getParameter(t.VIEWPORT);
  const F = new o.L().fromArray(I);
  const O = new o.L().fromArray(N);
  function U(e, n, r) {
    const i = new Uint8Array(4);
    const s = t.createTexture();
    t.bindTexture(e, s);
    t.texParameteri(e, t.TEXTURE_MIN_FILTER, t.NEAREST);
    t.texParameteri(e, t.TEXTURE_MAG_FILTER, t.NEAREST);
    for (let e = 0; e < r; e++) {
      t.texImage2D(n + e, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, i);
    }
    return s;
  }
  const B = {};
  function z(e) {
    if (c[e] !== true) {
      t.enable(e);
      c[e] = true;
    }
  }
  function k(e) {
    if (c[e] !== false) {
      t.disable(e);
      c[e] = false;
    }
  }
  B[t.TEXTURE_2D] = U(t.TEXTURE_2D, t.TEXTURE_2D, 1);
  B[t.TEXTURE_CUBE_MAP] = U(t.TEXTURE_CUBE_MAP, t.TEXTURE_CUBE_MAP_POSITIVE_X, 6);
  s.setClear(0, 0, 0, 1);
  a.setClear(1);
  l.setClear(0);
  z(t.DEPTH_TEST);
  a.setFunc(r.vCF);
  W(false);
  X(r.tm_);
  z(t.CULL_FACE);
  V(r.jFi);
  const G = {
    [r.bGH]: t.FUNC_ADD,
    [r.Wbm]: t.FUNC_SUBTRACT,
    [r.rOj]: t.FUNC_REVERSE_SUBTRACT
  };
  if (i) {
    G[r.r_] = t.MIN;
    G[r.Sm8] = t.MAX;
  } else {
    const t = e.get("EXT_blend_minmax");
    if (t !== null) {
      G[r.r_] = t.MIN_EXT;
      G[r.Sm8] = t.MAX_EXT;
    }
  }
  const H = {
    [r.c8b]: t.ZERO,
    [r.ghN]: t.ONE,
    [r.KhW]: t.SRC_COLOR,
    [r.k74]: t.SRC_ALPHA,
    [r.RlZ]: t.SRC_ALPHA_SATURATE,
    [r.Vdb]: t.DST_COLOR,
    [r.fSK]: t.DST_ALPHA,
    [r.iWC]: t.ONE_MINUS_SRC_COLOR,
    [r.LgZ]: t.ONE_MINUS_SRC_ALPHA,
    [r.Wpd]: t.ONE_MINUS_DST_COLOR,
    [r.Hy8]: t.ONE_MINUS_DST_ALPHA
  };
  function V(e, n, i, s, a, o, l, c) {
    if (e !== r.jFi) {
      if (f === false) {
        z(t.BLEND);
        f = true;
      }
      if (e === r.Xaj) {
        a = a || n;
        o = o || i;
        l = l || s;
        if (n !== m || a !== _) {
          t.blendEquationSeparate(G[n], G[a]);
          m = n;
          _ = a;
        }
        if (i !== g || s !== v || o !== x || l !== y) {
          t.blendFuncSeparate(H[i], H[s], H[o], H[l]);
          g = i;
          v = s;
          x = o;
          y = l;
        }
        p = e;
        b = null;
      } else if (e !== p || c !== b) {
        if (m !== r.bGH || _ !== r.bGH) {
          t.blendEquation(t.FUNC_ADD);
          m = r.bGH;
          _ = r.bGH;
        }
        if (c) {
          switch (e) {
            case r.bdR:
              t.blendFuncSeparate(t.ONE, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA);
              break;
            case r.WMw:
              t.blendFunc(t.ONE, t.ONE);
              break;
            case r.N4l:
              t.blendFuncSeparate(t.ZERO, t.ZERO, t.ONE_MINUS_SRC_COLOR, t.ONE_MINUS_SRC_ALPHA);
              break;
            case r.M5h:
              t.blendFuncSeparate(t.ZERO, t.SRC_COLOR, t.ZERO, t.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", e);
          }
        } else {
          switch (e) {
            case r.bdR:
              t.blendFuncSeparate(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA);
              break;
            case r.WMw:
              t.blendFunc(t.SRC_ALPHA, t.ONE);
              break;
            case r.N4l:
              t.blendFunc(t.ZERO, t.ONE_MINUS_SRC_COLOR);
              break;
            case r.M5h:
              t.blendFunc(t.ZERO, t.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", e);
          }
        }
        g = null;
        v = null;
        x = null;
        y = null;
        p = e;
        b = c;
      }
    } else if (f === true) {
      k(t.BLEND);
      f = false;
    }
  }
  function W(e) {
    if (w !== e) {
      if (e) {
        t.frontFace(t.CW);
      } else {
        t.frontFace(t.CCW);
      }
      w = e;
    }
  }
  function X(e) {
    if (e !== r.PeU) {
      z(t.CULL_FACE);
      if (e !== M) {
        if (e === r.tm_) {
          t.cullFace(t.BACK);
        } else if (e === r.S2y) {
          t.cullFace(t.FRONT);
        } else {
          t.cullFace(t.FRONT_AND_BACK);
        }
      }
    } else {
      k(t.CULL_FACE);
    }
    M = e;
  }
  function j(e, n, r) {
    if (e) {
      z(t.POLYGON_OFFSET_FILL);
      if (S !== n || E !== r) {
        t.polygonOffset(n, r);
        S = n;
        E = r;
      }
    } else {
      k(t.POLYGON_OFFSET_FILL);
    }
  }
  function q(e = t.TEXTURE0 + A - 1) {
    if (C !== e) {
      t.activeTexture(e);
      C = e;
    }
  }
  return {
    buffers: {
      color: s,
      depth: a,
      stencil: l
    },
    enable: z,
    disable: k,
    bindFramebuffer: function (e, n) {
      if (n === null && u !== null) {
        n = u;
      }
      return h[e] !== n && (t.bindFramebuffer(e, n), h[e] = n, i && (e === t.DRAW_FRAMEBUFFER && (h[t.FRAMEBUFFER] = n), e === t.FRAMEBUFFER && (h[t.DRAW_FRAMEBUFFER] = n)), true);
    },
    bindXRFramebuffer: function (e) {
      if (e !== u) {
        t.bindFramebuffer(t.FRAMEBUFFER, e);
        u = e;
      }
    },
    useProgram: function (e) {
      return d !== e && (t.useProgram(e), d = e, true);
    },
    setBlending: V,
    setMaterial: function (e, n) {
      if (e.side === r.ehD) {
        k(t.CULL_FACE);
      } else {
        z(t.CULL_FACE);
      }
      let i = e.side === r._Li;
      if (n) {
        i = !i;
      }
      W(i);
      if (e.blending === r.bdR && e.transparent === false) {
        V(r.jFi);
      } else {
        V(e.blending, e.blendEquation, e.blendSrc, e.blendDst, e.blendEquationAlpha, e.blendSrcAlpha, e.blendDstAlpha, e.premultipliedAlpha);
      }
      a.setFunc(e.depthFunc);
      a.setTest(e.depthTest);
      a.setMask(e.depthWrite);
      s.setMask(e.colorWrite);
      const o = e.stencilWrite;
      l.setTest(o);
      if (o) {
        l.setMask(e.stencilWriteMask);
        l.setFunc(e.stencilFunc, e.stencilRef, e.stencilFuncMask);
        l.setOp(e.stencilFail, e.stencilZFail, e.stencilZPass);
      }
      j(e.polygonOffset, e.polygonOffsetFactor, e.polygonOffsetUnits);
      if (e.alphaToCoverage === true) {
        z(t.SAMPLE_ALPHA_TO_COVERAGE);
      } else {
        k(t.SAMPLE_ALPHA_TO_COVERAGE);
      }
    },
    setFlipSided: W,
    setCullFace: X,
    setLineWidth: function (e) {
      if (e !== T) {
        if (R) {
          t.lineWidth(e);
        }
        T = e;
      }
    },
    setPolygonOffset: j,
    setScissorTest: function (e) {
      if (e) {
        z(t.SCISSOR_TEST);
      } else {
        k(t.SCISSOR_TEST);
      }
    },
    activeTexture: q,
    bindTexture: function (e, n) {
      if (C === null) {
        q();
      }
      let r = D[C];
      if (r === undefined) {
        r = {
          type: undefined,
          texture: undefined
        };
        D[C] = r;
      }
      if (r.type !== e || r.texture !== n) {
        t.bindTexture(e, n || B[e]);
        r.type = e;
        r.texture = n;
      }
    },
    unbindTexture: function () {
      const e = D[C];
      if (e !== undefined && e.type !== undefined) {
        t.bindTexture(e.type, null);
        e.type = undefined;
        e.texture = undefined;
      }
    },
    compressedTexImage2D: function () {
      try {
        t.compressedTexImage2D.apply(t, arguments);
      } catch (t) {
        console.error("THREE.WebGLState:", t);
      }
    },
    texImage2D: function () {
      try {
        t.texImage2D.apply(t, arguments);
      } catch (t) {
        console.error("THREE.WebGLState:", t);
      }
    },
    texImage3D: function () {
      try {
        t.texImage3D.apply(t, arguments);
      } catch (t) {
        console.error("THREE.WebGLState:", t);
      }
    },
    scissor: function (e) {
      if (F.equals(e) === false) {
        t.scissor(e.x, e.y, e.z, e.w);
        F.copy(e);
      }
    },
    viewport: function (e) {
      if (O.equals(e) === false) {
        t.viewport(e.x, e.y, e.z, e.w);
        O.copy(e);
      }
    },
    reset: function () {
      t.disable(t.BLEND);
      t.disable(t.CULL_FACE);
      t.disable(t.DEPTH_TEST);
      t.disable(t.POLYGON_OFFSET_FILL);
      t.disable(t.SCISSOR_TEST);
      t.disable(t.STENCIL_TEST);
      t.disable(t.SAMPLE_ALPHA_TO_COVERAGE);
      t.blendEquation(t.FUNC_ADD);
      t.blendFunc(t.ONE, t.ZERO);
      t.blendFuncSeparate(t.ONE, t.ZERO, t.ONE, t.ZERO);
      t.colorMask(true, true, true, true);
      t.clearColor(0, 0, 0, 0);
      t.depthMask(true);
      t.depthFunc(t.LESS);
      t.clearDepth(1);
      t.stencilMask(4294967295);
      t.stencilFunc(t.ALWAYS, 0, 4294967295);
      t.stencilOp(t.KEEP, t.KEEP, t.KEEP);
      t.clearStencil(0);
      t.cullFace(t.BACK);
      t.frontFace(t.CCW);
      t.polygonOffset(0, 0);
      t.activeTexture(t.TEXTURE0);
      t.bindFramebuffer(t.FRAMEBUFFER, null);
      if (i === true) {
        t.bindFramebuffer(t.DRAW_FRAMEBUFFER, null);
        t.bindFramebuffer(t.READ_FRAMEBUFFER, null);
      }
      t.useProgram(null);
      t.lineWidth(1);
      t.scissor(0, 0, t.canvas.width, t.canvas.height);
      t.viewport(0, 0, t.canvas.width, t.canvas.height);
      c = {};
      C = null;
      D = {};
      u = null;
      h = {};
      d = null;
      f = false;
      p = null;
      m = null;
      g = null;
      v = null;
      _ = null;
      x = null;
      y = null;
      b = false;
      w = null;
      M = null;
      T = null;
      S = null;
      E = null;
      F.set(0, 0, t.canvas.width, t.canvas.height);
      O.set(0, 0, t.canvas.width, t.canvas.height);
      s.reset();
      a.reset();
      l.reset();
    }
  };
}
var cn = require("./2043.cjs");
function un(t, e, n, i, s, a, o) {
  const l = s.isWebGL2;
  const c = s.maxTextures;
  const u = s.maxCubemapSize;
  const h = s.maxTextureSize;
  const d = s.maxSamples;
  const f = new WeakMap();
  let p;
  let m = false;
  try {
    m = typeof OffscreenCanvas != "undefined" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch (t) {}
  function g(t, e) {
    if (m) {
      return new OffscreenCanvas(t, e);
    } else {
      return document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
    }
  }
  function v(t, e, n, r) {
    let i = 1;
    if (t.width > r || t.height > r) {
      i = r / Math.max(t.width, t.height);
    }
    if (i < 1 || e === true) {
      if (typeof HTMLImageElement != "undefined" && t instanceof HTMLImageElement || typeof HTMLCanvasElement != "undefined" && t instanceof HTMLCanvasElement || typeof ImageBitmap != "undefined" && t instanceof ImageBitmap) {
        const r = e ? cn.gy : Math.floor;
        const s = r(i * t.width);
        const a = r(i * t.height);
        if (p === undefined) {
          p = g(s, a);
        }
        const o = n ? g(s, a) : p;
        o.width = s;
        o.height = a;
        o.getContext("2d").drawImage(t, 0, 0, s, a);
        console.warn("THREE.WebGLRenderer: Texture has been resized from (" + t.width + "x" + t.height + ") to (" + s + "x" + a + ").");
        return o;
      }
      if ("data" in t) {
        console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + t.width + "x" + t.height + ").");
      }
      return t;
    }
    return t;
  }
  function _(t) {
    return cn.wt(t.width) && cn.wt(t.height);
  }
  function x(t, e) {
    return t.generateMipmaps && e && t.minFilter !== r.TyD && t.minFilter !== r.wem;
  }
  function y(e, n, r, s, a = 1) {
    t.generateMipmap(e);
    i.get(n).__maxMipLevel = Math.log2(Math.max(r, s, a));
  }
  function b(n, r, i) {
    if (l === false) {
      return r;
    }
    if (n !== null) {
      if (t[n] !== undefined) {
        return t[n];
      }
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + n + "'");
    }
    let s = r;
    if (r === t.RED) {
      if (i === t.FLOAT) {
        s = t.R32F;
      }
      if (i === t.HALF_FLOAT) {
        s = t.R16F;
      }
      if (i === t.UNSIGNED_BYTE) {
        s = t.R8;
      }
    }
    if (r === t.RGB) {
      if (i === t.FLOAT) {
        s = t.RGB32F;
      }
      if (i === t.HALF_FLOAT) {
        s = t.RGB16F;
      }
      if (i === t.UNSIGNED_BYTE) {
        s = t.RGB8;
      }
    }
    if (r === t.RGBA) {
      if (i === t.FLOAT) {
        s = t.RGBA32F;
      }
      if (i === t.HALF_FLOAT) {
        s = t.RGBA16F;
      }
      if (i === t.UNSIGNED_BYTE) {
        s = t.RGBA8;
      }
    }
    if (s === t.R16F || s === t.R32F || s === t.RGBA16F || s === t.RGBA32F) {
      e.get("EXT_color_buffer_float");
    }
    return s;
  }
  function w(e) {
    if (e === r.TyD || e === r.YLQ || e === r.aH4) {
      return t.NEAREST;
    } else {
      return t.LINEAR;
    }
  }
  function M(e) {
    const n = e.target;
    n.removeEventListener("dispose", M);
    (function (e) {
      const n = i.get(e);
      if (n.__webglInit === undefined) {
        return;
      }
      t.deleteTexture(n.__webglTexture);
      i.remove(e);
    })(n);
    if (n.isVideoTexture) {
      f.delete(n);
    }
    o.memory.textures--;
  }
  function T(e) {
    const n = e.target;
    n.removeEventListener("dispose", T);
    (function (e) {
      const n = e.texture;
      const r = i.get(e);
      const s = i.get(n);
      if (!e) {
        return;
      }
      if (s.__webglTexture !== undefined) {
        t.deleteTexture(s.__webglTexture);
        o.memory.textures--;
      }
      if (e.depthTexture) {
        e.depthTexture.dispose();
      }
      if (e.isWebGLCubeRenderTarget) {
        for (let e = 0; e < 6; e++) {
          t.deleteFramebuffer(r.__webglFramebuffer[e]);
          if (r.__webglDepthbuffer) {
            t.deleteRenderbuffer(r.__webglDepthbuffer[e]);
          }
        }
      } else {
        t.deleteFramebuffer(r.__webglFramebuffer);
        if (r.__webglDepthbuffer) {
          t.deleteRenderbuffer(r.__webglDepthbuffer);
        }
        if (r.__webglMultisampledFramebuffer) {
          t.deleteFramebuffer(r.__webglMultisampledFramebuffer);
        }
        if (r.__webglColorRenderbuffer) {
          t.deleteRenderbuffer(r.__webglColorRenderbuffer);
        }
        if (r.__webglDepthRenderbuffer) {
          t.deleteRenderbuffer(r.__webglDepthRenderbuffer);
        }
      }
      if (e.isWebGLMultipleRenderTargets) {
        for (let e = 0, r = n.length; e < r; e++) {
          const r = i.get(n[e]);
          if (r.__webglTexture) {
            t.deleteTexture(r.__webglTexture);
            o.memory.textures--;
          }
          i.remove(n[e]);
        }
      }
      i.remove(n);
      i.remove(e);
    })(n);
  }
  let S = 0;
  function E(e, r) {
    const s = i.get(e);
    if (e.isVideoTexture) {
      (function (t) {
        const e = o.render.frame;
        if (f.get(t) !== e) {
          f.set(t, e);
          t.update();
        }
      })(e);
    }
    if (e.version > 0 && s.__version !== e.version) {
      const t = e.image;
      if (t === undefined) {
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");
      } else {
        if (t.complete !== false) {
          D(s, e, r);
          return;
        }
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      }
    }
    n.activeTexture(t.TEXTURE0 + r);
    n.bindTexture(t.TEXTURE_2D, s.__webglTexture);
  }
  function A(e, s) {
    const o = i.get(e);
    if (e.version > 0 && o.__version !== e.version) {
      (function (e, i, s) {
        if (i.image.length !== 6) {
          return;
        }
        C(e, i);
        n.activeTexture(t.TEXTURE0 + s);
        n.bindTexture(t.TEXTURE_CUBE_MAP, e.__webglTexture);
        t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, i.flipY);
        t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, i.premultiplyAlpha);
        t.pixelStorei(t.UNPACK_ALIGNMENT, i.unpackAlignment);
        t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL, t.NONE);
        const o = i && (i.isCompressedTexture || i.image[0].isCompressedTexture);
        const c = i.image[0] && i.image[0].isDataTexture;
        const h = [];
        for (let t = 0; t < 6; t++) {
          h[t] = o || c ? c ? i.image[t].image : i.image[t] : v(i.image[t], false, true, u);
        }
        const d = h[0];
        const f = _(d) || l;
        const p = a.convert(i.format);
        const m = a.convert(i.type);
        const g = b(i.internalFormat, p, m);
        let w;
        P(t.TEXTURE_CUBE_MAP, i, f);
        if (o) {
          for (let e = 0; e < 6; e++) {
            w = h[e].mipmaps;
            for (let s = 0; s < w.length; s++) {
              const a = w[s];
              if (i.format !== r.wk1 && i.format !== r.UCm) {
                if (p !== null) {
                  n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + e, s, g, a.width, a.height, 0, a.data);
                } else {
                  console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");
                }
              } else {
                n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + e, s, g, a.width, a.height, 0, p, m, a.data);
              }
            }
          }
          e.__maxMipLevel = w.length - 1;
        } else {
          w = i.mipmaps;
          for (let e = 0; e < 6; e++) {
            if (c) {
              n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + e, 0, g, h[e].width, h[e].height, 0, p, m, h[e].data);
              for (let r = 0; r < w.length; r++) {
                const i = w[r].image[e].image;
                n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + e, r + 1, g, i.width, i.height, 0, p, m, i.data);
              }
            } else {
              n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + e, 0, g, p, m, h[e]);
              for (let r = 0; r < w.length; r++) {
                const i = w[r];
                n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + e, r + 1, g, p, m, i.image[e]);
              }
            }
          }
          e.__maxMipLevel = w.length;
        }
        if (x(i, f)) {
          y(t.TEXTURE_CUBE_MAP, i, d.width, d.height);
        }
        e.__version = i.version;
        if (i.onUpdate) {
          i.onUpdate(i);
        }
      })(o, e, s);
    } else {
      n.activeTexture(t.TEXTURE0 + s);
      n.bindTexture(t.TEXTURE_CUBE_MAP, o.__webglTexture);
    }
  }
  const R = {
    [r.rpg]: t.REPEAT,
    [r.uWy]: t.CLAMP_TO_EDGE,
    [r.OoA]: t.MIRRORED_REPEAT
  };
  const L = {
    [r.TyD]: t.NEAREST,
    [r.YLQ]: t.NEAREST_MIPMAP_NEAREST,
    [r.aH4]: t.NEAREST_MIPMAP_LINEAR,
    [r.wem]: t.LINEAR,
    [r.qyh]: t.LINEAR_MIPMAP_NEAREST,
    [r.D1R]: t.LINEAR_MIPMAP_LINEAR
  };
  function P(n, a, o) {
    if (o) {
      t.texParameteri(n, t.TEXTURE_WRAP_S, R[a.wrapS]);
      t.texParameteri(n, t.TEXTURE_WRAP_T, R[a.wrapT]);
      if (n === t.TEXTURE_3D || n === t.TEXTURE_2D_ARRAY) {
        t.texParameteri(n, t.TEXTURE_WRAP_R, R[a.wrapR]);
      }
      t.texParameteri(n, t.TEXTURE_MAG_FILTER, L[a.magFilter]);
      t.texParameteri(n, t.TEXTURE_MIN_FILTER, L[a.minFilter]);
    } else {
      t.texParameteri(n, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE);
      t.texParameteri(n, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE);
      if (n === t.TEXTURE_3D || n === t.TEXTURE_2D_ARRAY) {
        t.texParameteri(n, t.TEXTURE_WRAP_R, t.CLAMP_TO_EDGE);
      }
      if (a.wrapS !== r.uWy || a.wrapT !== r.uWy) {
        console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.");
      }
      t.texParameteri(n, t.TEXTURE_MAG_FILTER, w(a.magFilter));
      t.texParameteri(n, t.TEXTURE_MIN_FILTER, w(a.minFilter));
      if (a.minFilter !== r.TyD && a.minFilter !== r.wem) {
        console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.");
      }
    }
    if (e.has("EXT_texture_filter_anisotropic") === true) {
      const o = e.get("EXT_texture_filter_anisotropic");
      if (a.type === r.VzW && e.has("OES_texture_float_linear") === false) {
        return;
      }
      if (l === false && a.type === r.cLu && e.has("OES_texture_half_float_linear") === false) {
        return;
      }
      if (a.anisotropy > 1 || i.get(a).__currentAnisotropy) {
        t.texParameterf(n, o.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(a.anisotropy, s.getMaxAnisotropy()));
        i.get(a).__currentAnisotropy = a.anisotropy;
      }
    }
  }
  function C(e, n) {
    if (e.__webglInit === undefined) {
      e.__webglInit = true;
      n.addEventListener("dispose", M);
      e.__webglTexture = t.createTexture();
      o.memory.textures++;
    }
  }
  function D(e, i, s) {
    let o = t.TEXTURE_2D;
    if (i.isDataTexture2DArray) {
      o = t.TEXTURE_2D_ARRAY;
    }
    if (i.isDataTexture3D) {
      o = t.TEXTURE_3D;
    }
    C(e, i);
    n.activeTexture(t.TEXTURE0 + s);
    n.bindTexture(o, e.__webglTexture);
    t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, i.flipY);
    t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, i.premultiplyAlpha);
    t.pixelStorei(t.UNPACK_ALIGNMENT, i.unpackAlignment);
    t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL, t.NONE);
    const c = function (t) {
      return !l && (t.wrapS !== r.uWy || t.wrapT !== r.uWy || t.minFilter !== r.TyD && t.minFilter !== r.wem);
    }(i) && _(i.image) === false;
    const u = v(i.image, c, false, h);
    const d = _(u) || l;
    const f = a.convert(i.format);
    let p;
    let m = a.convert(i.type);
    let g = b(i.internalFormat, f, m);
    P(o, i, d);
    const w = i.mipmaps;
    if (i.isDepthTexture) {
      g = t.DEPTH_COMPONENT;
      if (l) {
        g = i.type === r.VzW ? t.DEPTH_COMPONENT32F : i.type === r.JQ4 ? t.DEPTH_COMPONENT24 : i.type === r.wJv ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT16;
      } else if (i.type === r.VzW) {
        console.error("WebGLRenderer: Floating point depth texture requires WebGL2.");
      }
      if (i.format === r.qkB && g === t.DEPTH_COMPONENT && i.type !== r.LsT && i.type !== r.JQ4) {
        console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.");
        i.type = r.LsT;
        m = a.convert(i.type);
      }
      if (i.format === r.brP && g === t.DEPTH_COMPONENT) {
        g = t.DEPTH_STENCIL;
        if (i.type !== r.wJv) {
          console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.");
          i.type = r.wJv;
          m = a.convert(i.type);
        }
      }
      n.texImage2D(t.TEXTURE_2D, 0, g, u.width, u.height, 0, f, m, null);
    } else if (i.isDataTexture) {
      if (w.length > 0 && d) {
        for (let e = 0, r = w.length; e < r; e++) {
          p = w[e];
          n.texImage2D(t.TEXTURE_2D, e, g, p.width, p.height, 0, f, m, p.data);
        }
        i.generateMipmaps = false;
        e.__maxMipLevel = w.length - 1;
      } else {
        n.texImage2D(t.TEXTURE_2D, 0, g, u.width, u.height, 0, f, m, u.data);
        e.__maxMipLevel = 0;
      }
    } else if (i.isCompressedTexture) {
      for (let e = 0, s = w.length; e < s; e++) {
        p = w[e];
        if (i.format !== r.wk1 && i.format !== r.UCm) {
          if (f !== null) {
            n.compressedTexImage2D(t.TEXTURE_2D, e, g, p.width, p.height, 0, p.data);
          } else {
            console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
          }
        } else {
          n.texImage2D(t.TEXTURE_2D, e, g, p.width, p.height, 0, f, m, p.data);
        }
      }
      e.__maxMipLevel = w.length - 1;
    } else if (i.isDataTexture2DArray) {
      n.texImage3D(t.TEXTURE_2D_ARRAY, 0, g, u.width, u.height, u.depth, 0, f, m, u.data);
      e.__maxMipLevel = 0;
    } else if (i.isDataTexture3D) {
      n.texImage3D(t.TEXTURE_3D, 0, g, u.width, u.height, u.depth, 0, f, m, u.data);
      e.__maxMipLevel = 0;
    } else if (w.length > 0 && d) {
      for (let e = 0, r = w.length; e < r; e++) {
        p = w[e];
        n.texImage2D(t.TEXTURE_2D, e, g, f, m, p);
      }
      i.generateMipmaps = false;
      e.__maxMipLevel = w.length - 1;
    } else {
      n.texImage2D(t.TEXTURE_2D, 0, g, f, m, u);
      e.__maxMipLevel = 0;
    }
    if (x(i, d)) {
      y(o, i, u.width, u.height);
    }
    e.__version = i.version;
    if (i.onUpdate) {
      i.onUpdate(i);
    }
  }
  function I(e, r, s, o, l) {
    const c = a.convert(s.format);
    const u = a.convert(s.type);
    const h = b(s.internalFormat, c, u);
    if (l === t.TEXTURE_3D || l === t.TEXTURE_2D_ARRAY) {
      n.texImage3D(l, 0, h, r.width, r.height, r.depth, 0, c, u, null);
    } else {
      n.texImage2D(l, 0, h, r.width, r.height, 0, c, u, null);
    }
    n.bindFramebuffer(t.FRAMEBUFFER, e);
    t.framebufferTexture2D(t.FRAMEBUFFER, o, l, i.get(s).__webglTexture, 0);
    n.bindFramebuffer(t.FRAMEBUFFER, null);
  }
  function N(e, n, i) {
    t.bindRenderbuffer(t.RENDERBUFFER, e);
    if (n.depthBuffer && !n.stencilBuffer) {
      let s = t.DEPTH_COMPONENT16;
      if (i) {
        const e = n.depthTexture;
        if (e && e.isDepthTexture) {
          if (e.type === r.VzW) {
            s = t.DEPTH_COMPONENT32F;
          } else if (e.type === r.JQ4) {
            s = t.DEPTH_COMPONENT24;
          }
        }
        const i = O(n);
        t.renderbufferStorageMultisample(t.RENDERBUFFER, i, s, n.width, n.height);
      } else {
        t.renderbufferStorage(t.RENDERBUFFER, s, n.width, n.height);
      }
      t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, e);
    } else if (n.depthBuffer && n.stencilBuffer) {
      if (i) {
        const e = O(n);
        t.renderbufferStorageMultisample(t.RENDERBUFFER, e, t.DEPTH24_STENCIL8, n.width, n.height);
      } else {
        t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_STENCIL, n.width, n.height);
      }
      t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.RENDERBUFFER, e);
    } else {
      const e = n.isWebGLMultipleRenderTargets === true ? n.texture[0] : n.texture;
      const r = a.convert(e.format);
      const s = a.convert(e.type);
      const o = b(e.internalFormat, r, s);
      if (i) {
        const e = O(n);
        t.renderbufferStorageMultisample(t.RENDERBUFFER, e, o, n.width, n.height);
      } else {
        t.renderbufferStorage(t.RENDERBUFFER, o, n.width, n.height);
      }
    }
    t.bindRenderbuffer(t.RENDERBUFFER, null);
  }
  function F(e) {
    const s = i.get(e);
    const a = e.isWebGLCubeRenderTarget === true;
    if (e.depthTexture) {
      if (a) {
        throw new Error("target.depthTexture not supported in Cube render targets");
      }
      (function (e, s) {
        if (s && s.isWebGLCubeRenderTarget) {
          throw new Error("Depth Texture with cube render targets is not supported");
        }
        n.bindFramebuffer(t.FRAMEBUFFER, e);
        if (!s.depthTexture || !s.depthTexture.isDepthTexture) {
          throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
        }
        if (!i.get(s.depthTexture).__webglTexture || s.depthTexture.image.width !== s.width || s.depthTexture.image.height !== s.height) {
          s.depthTexture.image.width = s.width;
          s.depthTexture.image.height = s.height;
          s.depthTexture.needsUpdate = true;
        }
        E(s.depthTexture, 0);
        const a = i.get(s.depthTexture).__webglTexture;
        if (s.depthTexture.format === r.qkB) {
          t.framebufferTexture2D(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.TEXTURE_2D, a, 0);
        } else {
          if (s.depthTexture.format !== r.brP) {
            throw new Error("Unknown depthTexture format");
          }
          t.framebufferTexture2D(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.TEXTURE_2D, a, 0);
        }
      })(s.__webglFramebuffer, e);
    } else if (a) {
      s.__webglDepthbuffer = [];
      for (let r = 0; r < 6; r++) {
        n.bindFramebuffer(t.FRAMEBUFFER, s.__webglFramebuffer[r]);
        s.__webglDepthbuffer[r] = t.createRenderbuffer();
        N(s.__webglDepthbuffer[r], e, false);
      }
    } else {
      n.bindFramebuffer(t.FRAMEBUFFER, s.__webglFramebuffer);
      s.__webglDepthbuffer = t.createRenderbuffer();
      N(s.__webglDepthbuffer, e, false);
    }
    n.bindFramebuffer(t.FRAMEBUFFER, null);
  }
  function O(t) {
    if (l && t.isWebGLMultisampleRenderTarget) {
      return Math.min(d, t.samples);
    } else {
      return 0;
    }
  }
  let U = false;
  let B = false;
  this.allocateTextureUnit = function () {
    const t = S;
    if (t >= c) {
      console.warn("THREE.WebGLTextures: Trying to use " + t + " texture units while this GPU supports only " + c);
    }
    S += 1;
    return t;
  };
  this.resetTextureUnits = function () {
    S = 0;
  };
  this.setTexture2D = E;
  this.setTexture2DArray = function (e, r) {
    const s = i.get(e);
    if (e.version > 0 && s.__version !== e.version) {
      D(s, e, r);
    } else {
      n.activeTexture(t.TEXTURE0 + r);
      n.bindTexture(t.TEXTURE_2D_ARRAY, s.__webglTexture);
    }
  };
  this.setTexture3D = function (e, r) {
    const s = i.get(e);
    if (e.version > 0 && s.__version !== e.version) {
      D(s, e, r);
    } else {
      n.activeTexture(t.TEXTURE0 + r);
      n.bindTexture(t.TEXTURE_3D, s.__webglTexture);
    }
  };
  this.setTextureCube = A;
  this.setupRenderTarget = function (e) {
    const c = e.texture;
    const u = i.get(e);
    const h = i.get(c);
    e.addEventListener("dispose", T);
    if (e.isWebGLMultipleRenderTargets !== true) {
      h.__webglTexture = t.createTexture();
      h.__version = c.version;
      o.memory.textures++;
    }
    const d = e.isWebGLCubeRenderTarget === true;
    const f = e.isWebGLMultipleRenderTargets === true;
    const p = e.isWebGLMultisampleRenderTarget === true;
    const m = c.isDataTexture3D || c.isDataTexture2DArray;
    const g = _(e) || l;
    if (!!l && c.format === r.UCm && (c.type === r.VzW || c.type === r.cLu)) {
      c.format = r.wk1;
      console.warn("THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.");
    }
    if (d) {
      u.__webglFramebuffer = [];
      for (let e = 0; e < 6; e++) {
        u.__webglFramebuffer[e] = t.createFramebuffer();
      }
    } else {
      u.__webglFramebuffer = t.createFramebuffer();
      if (f) {
        if (s.drawBuffers) {
          const n = e.texture;
          for (let e = 0, r = n.length; e < r; e++) {
            const r = i.get(n[e]);
            if (r.__webglTexture === undefined) {
              r.__webglTexture = t.createTexture();
              o.memory.textures++;
            }
          }
        } else {
          console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");
        }
      } else if (p) {
        if (l) {
          u.__webglMultisampledFramebuffer = t.createFramebuffer();
          u.__webglColorRenderbuffer = t.createRenderbuffer();
          t.bindRenderbuffer(t.RENDERBUFFER, u.__webglColorRenderbuffer);
          const r = a.convert(c.format);
          const i = a.convert(c.type);
          const s = b(c.internalFormat, r, i);
          const o = O(e);
          t.renderbufferStorageMultisample(t.RENDERBUFFER, o, s, e.width, e.height);
          n.bindFramebuffer(t.FRAMEBUFFER, u.__webglMultisampledFramebuffer);
          t.framebufferRenderbuffer(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.RENDERBUFFER, u.__webglColorRenderbuffer);
          t.bindRenderbuffer(t.RENDERBUFFER, null);
          if (e.depthBuffer) {
            u.__webglDepthRenderbuffer = t.createRenderbuffer();
            N(u.__webglDepthRenderbuffer, e, true);
          }
          n.bindFramebuffer(t.FRAMEBUFFER, null);
        } else {
          console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");
        }
      }
    }
    if (d) {
      n.bindTexture(t.TEXTURE_CUBE_MAP, h.__webglTexture);
      P(t.TEXTURE_CUBE_MAP, c, g);
      for (let n = 0; n < 6; n++) {
        I(u.__webglFramebuffer[n], e, c, t.COLOR_ATTACHMENT0, t.TEXTURE_CUBE_MAP_POSITIVE_X + n);
      }
      if (x(c, g)) {
        y(t.TEXTURE_CUBE_MAP, c, e.width, e.height);
      }
      n.unbindTexture();
    } else if (f) {
      const r = e.texture;
      for (let s = 0, a = r.length; s < a; s++) {
        const a = r[s];
        const o = i.get(a);
        n.bindTexture(t.TEXTURE_2D, o.__webglTexture);
        P(t.TEXTURE_2D, a, g);
        I(u.__webglFramebuffer, e, a, t.COLOR_ATTACHMENT0 + s, t.TEXTURE_2D);
        if (x(a, g)) {
          y(t.TEXTURE_2D, a, e.width, e.height);
        }
      }
      n.unbindTexture();
    } else {
      let r = t.TEXTURE_2D;
      if (m) {
        if (l) {
          r = c.isDataTexture3D ? t.TEXTURE_3D : t.TEXTURE_2D_ARRAY;
        } else {
          console.warn("THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2.");
        }
      }
      n.bindTexture(r, h.__webglTexture);
      P(r, c, g);
      I(u.__webglFramebuffer, e, c, t.COLOR_ATTACHMENT0, r);
      if (x(c, g)) {
        y(r, c, e.width, e.height, e.depth);
      }
      n.unbindTexture();
    }
    if (e.depthBuffer) {
      F(e);
    }
  };
  this.updateRenderTargetMipmap = function (e) {
    const r = _(e) || l;
    const s = e.isWebGLMultipleRenderTargets === true ? e.texture : [e.texture];
    for (let a = 0, o = s.length; a < o; a++) {
      const o = s[a];
      if (x(o, r)) {
        const r = e.isWebGLCubeRenderTarget ? t.TEXTURE_CUBE_MAP : t.TEXTURE_2D;
        const s = i.get(o).__webglTexture;
        n.bindTexture(r, s);
        y(r, o, e.width, e.height);
        n.unbindTexture();
      }
    }
  };
  this.updateMultisampleRenderTarget = function (e) {
    if (e.isWebGLMultisampleRenderTarget) {
      if (l) {
        const r = e.width;
        const s = e.height;
        let a = t.COLOR_BUFFER_BIT;
        if (e.depthBuffer) {
          a |= t.DEPTH_BUFFER_BIT;
        }
        if (e.stencilBuffer) {
          a |= t.STENCIL_BUFFER_BIT;
        }
        const o = i.get(e);
        n.bindFramebuffer(t.READ_FRAMEBUFFER, o.__webglMultisampledFramebuffer);
        n.bindFramebuffer(t.DRAW_FRAMEBUFFER, o.__webglFramebuffer);
        t.blitFramebuffer(0, 0, r, s, 0, 0, r, s, a, t.NEAREST);
        n.bindFramebuffer(t.READ_FRAMEBUFFER, null);
        n.bindFramebuffer(t.DRAW_FRAMEBUFFER, o.__webglMultisampledFramebuffer);
      } else {
        console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");
      }
    }
  };
  this.safeSetTexture2D = function (t, e) {
    if (t && t.isWebGLRenderTarget) {
      if (U === false) {
        console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead.");
        U = true;
      }
      t = t.texture;
    }
    E(t, e);
  };
  this.safeSetTextureCube = function (t, e) {
    if (t && t.isWebGLCubeRenderTarget) {
      if (B === false) {
        console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead.");
        B = true;
      }
      t = t.texture;
    }
    A(t, e);
  };
}
function hn(t, e, n) {
  const i = n.isWebGL2;
  return {
    convert: function (n) {
      let s;
      if (n === r.ywz) {
        return t.UNSIGNED_BYTE;
      }
      if (n === r.k0A) {
        return t.UNSIGNED_SHORT_4_4_4_4;
      }
      if (n === r.irR) {
        return t.UNSIGNED_SHORT_5_5_5_1;
      }
      if (n === r.XNv) {
        return t.UNSIGNED_SHORT_5_6_5;
      }
      if (n === r.T95) {
        return t.BYTE;
      }
      if (n === r.iAb) {
        return t.SHORT;
      }
      if (n === r.LsT) {
        return t.UNSIGNED_SHORT;
      }
      if (n === r.Kz5) {
        return t.INT;
      }
      if (n === r.JQ4) {
        return t.UNSIGNED_INT;
      }
      if (n === r.VzW) {
        return t.FLOAT;
      }
      if (n === r.cLu) {
        if (i) {
          return t.HALF_FLOAT;
        } else {
          s = e.get("OES_texture_half_float");
          if (s !== null) {
            return s.HALF_FLOAT_OES;
          } else {
            return null;
          }
        }
      }
      if (n === r.OTo) {
        return t.ALPHA;
      }
      if (n === r.UCm) {
        return t.RGB;
      }
      if (n === r.wk1) {
        return t.RGBA;
      }
      if (n === r.Y8D) {
        return t.LUMINANCE;
      }
      if (n === r.cRx) {
        return t.LUMINANCE_ALPHA;
      }
      if (n === r.qkB) {
        return t.DEPTH_COMPONENT;
      }
      if (n === r.brP) {
        return t.DEPTH_STENCIL;
      }
      if (n === r.hEm) {
        return t.RED;
      }
      if (n === r.D9w) {
        return t.RED_INTEGER;
      }
      if (n === r.av9) {
        return t.RG;
      }
      if (n === r.CtA) {
        return t.RG_INTEGER;
      }
      if (n === r.F5G) {
        return t.RGB_INTEGER;
      }
      if (n === r.E2K) {
        return t.RGBA_INTEGER;
      }
      if (n === r.wuA || n === r.BFQ || n === r.v3W || n === r.ILR) {
        s = e.get("WEBGL_compressed_texture_s3tc");
        if (s === null) {
          return null;
        }
        if (n === r.wuA) {
          return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
        }
        if (n === r.BFQ) {
          return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        }
        if (n === r.v3W) {
          return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        }
        if (n === r.ILR) {
          return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
        }
      }
      if (n === r._AM || n === r.vCx || n === r.eaV || n === r.CaW) {
        s = e.get("WEBGL_compressed_texture_pvrtc");
        if (s === null) {
          return null;
        }
        if (n === r._AM) {
          return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        }
        if (n === r.vCx) {
          return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        }
        if (n === r.eaV) {
          return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        }
        if (n === r.CaW) {
          return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
        }
      }
      if (n === r.fto) {
        s = e.get("WEBGL_compressed_texture_etc1");
        if (s !== null) {
          return s.COMPRESSED_RGB_ETC1_WEBGL;
        } else {
          return null;
        }
      }
      if ((n === r.l0P || n === r.ekQ) && (s = e.get("WEBGL_compressed_texture_etc"), s !== null)) {
        if (n === r.l0P) {
          return s.COMPRESSED_RGB8_ETC2;
        }
        if (n === r.ekQ) {
          return s.COMPRESSED_RGBA8_ETC2_EAC;
        }
      }
      if (n === r.ptH || n === r.jZA || n === r.y2t || n === r.gi4 || n === r.Djp || n === r.BG$ || n === r.NYV || n === r.xJs || n === r.pKu || n === r.GG6 || n === r.Gih || n === r.FUD || n === r.iiP || n === r.SvJ || n === r.APR || n === r.Abz || n === r.v6B || n === r.pnl || n === r.OS$ || n === r._wO || n === r.bcs || n === r.Y5S || n === r.Wso || n === r.p1$ || n === r.I0h || n === r.Yjz || n === r.ePn || n === r.HBG) {
        s = e.get("WEBGL_compressed_texture_astc");
        if (s !== null) {
          return n;
        } else {
          return null;
        }
      } else if (n === r.bsb) {
        s = e.get("EXT_texture_compression_bptc");
        if (s !== null) {
          return n;
        } else {
          return null;
        }
      } else if (n === r.wJv) {
        if (i) {
          return t.UNSIGNED_INT_24_8;
        } else {
          s = e.get("WEBGL_depth_texture");
          if (s !== null) {
            return s.UNSIGNED_INT_24_8_WEBGL;
          } else {
            return null;
          }
        }
      } else {
        return undefined;
      }
    }
  };
}
class dn extends C.c {
  constructor(t = []) {
    super();
    this.cameras = t;
  }
}
dn.prototype.isArrayCamera = true;
var fn = require("./7406.cjs");
var pn = require("./2010.cjs");
const mn = {
  type: "move"
};
class gn {
  constructor() {
    this._targetRay = null;
    this._grip = null;
    this._hand = null;
  }
  getHandSpace() {
    if (this._hand === null) {
      this._hand = new pn.Z();
      this._hand.matrixAutoUpdate = false;
      this._hand.visible = false;
      this._hand.joints = {};
      this._hand.inputState = {
        pinching: false
      };
    }
    return this._hand;
  }
  getTargetRaySpace() {
    if (this._targetRay === null) {
      this._targetRay = new pn.Z();
      this._targetRay.matrixAutoUpdate = false;
      this._targetRay.visible = false;
      this._targetRay.hasLinearVelocity = false;
      this._targetRay.linearVelocity = new a.P();
      this._targetRay.hasAngularVelocity = false;
      this._targetRay.angularVelocity = new a.P();
    }
    return this._targetRay;
  }
  getGripSpace() {
    if (this._grip === null) {
      this._grip = new pn.Z();
      this._grip.matrixAutoUpdate = false;
      this._grip.visible = false;
      this._grip.hasLinearVelocity = false;
      this._grip.linearVelocity = new a.P();
      this._grip.hasAngularVelocity = false;
      this._grip.angularVelocity = new a.P();
    }
    return this._grip;
  }
  dispatchEvent(t) {
    if (this._targetRay !== null) {
      this._targetRay.dispatchEvent(t);
    }
    if (this._grip !== null) {
      this._grip.dispatchEvent(t);
    }
    if (this._hand !== null) {
      this._hand.dispatchEvent(t);
    }
    return this;
  }
  disconnect(t) {
    this.dispatchEvent({
      type: "disconnected",
      data: t
    });
    if (this._targetRay !== null) {
      this._targetRay.visible = false;
    }
    if (this._grip !== null) {
      this._grip.visible = false;
    }
    if (this._hand !== null) {
      this._hand.visible = false;
    }
    return this;
  }
  update(t, e, n) {
    let r = null;
    let i = null;
    let s = null;
    const a = this._targetRay;
    const o = this._grip;
    const l = this._hand;
    if (t && e.session.visibilityState !== "visible-blurred") {
      if (a !== null) {
        r = e.getPose(t.targetRaySpace, n);
        if (r !== null) {
          a.matrix.fromArray(r.transform.matrix);
          a.matrix.decompose(a.position, a.rotation, a.scale);
          if (r.linearVelocity) {
            a.hasLinearVelocity = true;
            a.linearVelocity.copy(r.linearVelocity);
          } else {
            a.hasLinearVelocity = false;
          }
          if (r.angularVelocity) {
            a.hasAngularVelocity = true;
            a.angularVelocity.copy(r.angularVelocity);
          } else {
            a.hasAngularVelocity = false;
          }
          this.dispatchEvent(mn);
        }
      }
      if (l && t.hand) {
        s = true;
        for (const r of t.hand.values()) {
          const t = e.getJointPose(r, n);
          if (l.joints[r.jointName] === undefined) {
            const t = new pn.Z();
            t.matrixAutoUpdate = false;
            t.visible = false;
            l.joints[r.jointName] = t;
            l.add(t);
          }
          const i = l.joints[r.jointName];
          if (t !== null) {
            i.matrix.fromArray(t.transform.matrix);
            i.matrix.decompose(i.position, i.rotation, i.scale);
            i.jointRadius = t.radius;
          }
          i.visible = t !== null;
        }
        const r = l.joints["index-finger-tip"];
        const i = l.joints["thumb-tip"];
        const a = r.position.distanceTo(i.position);
        const o = 0.02;
        const c = 0.005;
        if (l.inputState.pinching && a > o + c) {
          l.inputState.pinching = false;
          this.dispatchEvent({
            type: "pinchend",
            handedness: t.handedness,
            target: this
          });
        } else if (!l.inputState.pinching && a <= o - c) {
          l.inputState.pinching = true;
          this.dispatchEvent({
            type: "pinchstart",
            handedness: t.handedness,
            target: this
          });
        }
      } else if (o !== null && t.gripSpace) {
        i = e.getPose(t.gripSpace, n);
        if (i !== null) {
          o.matrix.fromArray(i.transform.matrix);
          o.matrix.decompose(o.position, o.rotation, o.scale);
          if (i.linearVelocity) {
            o.hasLinearVelocity = true;
            o.linearVelocity.copy(i.linearVelocity);
          } else {
            o.hasLinearVelocity = false;
          }
          if (i.angularVelocity) {
            o.hasAngularVelocity = true;
            o.angularVelocity.copy(i.angularVelocity);
          } else {
            o.hasAngularVelocity = false;
          }
        }
      }
    }
    if (a !== null) {
      a.visible = r !== null;
    }
    if (o !== null) {
      o.visible = i !== null;
    }
    if (l !== null) {
      l.visible = s !== null;
    }
    return this;
  }
}
class vn extends fn.p {
  constructor(t, e) {
    super();
    const n = this;
    const r = t.state;
    let i = null;
    let s = 1;
    let c = null;
    let u = "local-floor";
    let h = null;
    let d = null;
    let f = null;
    let p = null;
    let m = null;
    let g = false;
    let v = null;
    let _ = null;
    let x = null;
    let y = null;
    let b = null;
    let w = null;
    const M = [];
    const T = new Map();
    const S = new C.c();
    S.layers.enable(1);
    S.viewport = new o.L();
    const E = new C.c();
    E.layers.enable(2);
    E.viewport = new o.L();
    const A = [S, E];
    const R = new dn();
    R.layers.enable(1);
    R.layers.enable(2);
    let L = null;
    let P = null;
    function D(t) {
      const e = T.get(t.inputSource);
      if (e) {
        e.dispatchEvent({
          type: t.type,
          data: t.inputSource
        });
      }
    }
    function I() {
      T.forEach(function (t, e) {
        t.disconnect(e);
      });
      T.clear();
      L = null;
      P = null;
      r.bindXRFramebuffer(null);
      t.setRenderTarget(t.getRenderTarget());
      if (f) {
        e.deleteFramebuffer(f);
      }
      if (v) {
        e.deleteFramebuffer(v);
      }
      if (_) {
        e.deleteRenderbuffer(_);
      }
      if (x) {
        e.deleteRenderbuffer(x);
      }
      f = null;
      v = null;
      _ = null;
      x = null;
      m = null;
      p = null;
      d = null;
      i = null;
      z.stop();
      n.isPresenting = false;
      n.dispatchEvent({
        type: "sessionend"
      });
    }
    function N(t) {
      const e = i.inputSources;
      for (let t = 0; t < M.length; t++) {
        T.set(e[t], M[t]);
      }
      for (let e = 0; e < t.removed.length; e++) {
        const n = t.removed[e];
        const r = T.get(n);
        if (r) {
          r.dispatchEvent({
            type: "disconnected",
            data: n
          });
          T.delete(n);
        }
      }
      for (let e = 0; e < t.added.length; e++) {
        const n = t.added[e];
        const r = T.get(n);
        if (r) {
          r.dispatchEvent({
            type: "connected",
            data: n
          });
        }
      }
    }
    this.cameraAutoUpdate = true;
    this.enabled = false;
    this.isPresenting = false;
    this.getController = function (t) {
      let e = M[t];
      if (e === undefined) {
        e = new gn();
        M[t] = e;
      }
      return e.getTargetRaySpace();
    };
    this.getControllerGrip = function (t) {
      let e = M[t];
      if (e === undefined) {
        e = new gn();
        M[t] = e;
      }
      return e.getGripSpace();
    };
    this.getHand = function (t) {
      let e = M[t];
      if (e === undefined) {
        e = new gn();
        M[t] = e;
      }
      return e.getHandSpace();
    };
    this.setFramebufferScaleFactor = function (t) {
      s = t;
      if (n.isPresenting === true) {
        console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
      }
    };
    this.setReferenceSpaceType = function (t) {
      u = t;
      if (n.isPresenting === true) {
        console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
      }
    };
    this.getReferenceSpace = function () {
      return c;
    };
    this.getBaseLayer = function () {
      if (p !== null) {
        return p;
      } else {
        return m;
      }
    };
    this.getBinding = function () {
      return d;
    };
    this.getFrame = function () {
      return y;
    };
    this.getSession = function () {
      return i;
    };
    this.setSession = async function (t) {
      i = t;
      if (i !== null) {
        i.addEventListener("select", D);
        i.addEventListener("selectstart", D);
        i.addEventListener("selectend", D);
        i.addEventListener("squeeze", D);
        i.addEventListener("squeezestart", D);
        i.addEventListener("squeezeend", D);
        i.addEventListener("end", I);
        i.addEventListener("inputsourceschange", N);
        const t = e.getContextAttributes();
        if (t.xrCompatible !== true) {
          await e.makeXRCompatible();
        }
        if (i.renderState.layers === undefined) {
          const n = {
            antialias: t.antialias,
            alpha: t.alpha,
            depth: t.depth,
            stencil: t.stencil,
            framebufferScaleFactor: s
          };
          m = new XRWebGLLayer(i, e, n);
          i.updateRenderState({
            baseLayer: m
          });
        } else if (e instanceof WebGLRenderingContext) {
          const n = {
            antialias: true,
            alpha: t.alpha,
            depth: t.depth,
            stencil: t.stencil,
            framebufferScaleFactor: s
          };
          m = new XRWebGLLayer(i, e, n);
          i.updateRenderState({
            layers: [m]
          });
        } else {
          g = t.antialias;
          let n = null;
          if (t.depth) {
            w = e.DEPTH_BUFFER_BIT;
            if (t.stencil) {
              w |= e.STENCIL_BUFFER_BIT;
            }
            b = t.stencil ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
            n = t.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24;
          }
          const a = {
            colorFormat: t.alpha ? e.RGBA8 : e.RGB8,
            depthFormat: n,
            scaleFactor: s
          };
          d = new XRWebGLBinding(i, e);
          p = d.createProjectionLayer(a);
          f = e.createFramebuffer();
          i.updateRenderState({
            layers: [p]
          });
          if (g) {
            v = e.createFramebuffer();
            _ = e.createRenderbuffer();
            e.bindRenderbuffer(e.RENDERBUFFER, _);
            e.renderbufferStorageMultisample(e.RENDERBUFFER, 4, e.RGBA8, p.textureWidth, p.textureHeight);
            r.bindFramebuffer(e.FRAMEBUFFER, v);
            e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, _);
            e.bindRenderbuffer(e.RENDERBUFFER, null);
            if (n !== null) {
              x = e.createRenderbuffer();
              e.bindRenderbuffer(e.RENDERBUFFER, x);
              e.renderbufferStorageMultisample(e.RENDERBUFFER, 4, n, p.textureWidth, p.textureHeight);
              e.framebufferRenderbuffer(e.FRAMEBUFFER, b, e.RENDERBUFFER, x);
              e.bindRenderbuffer(e.RENDERBUFFER, null);
            }
            r.bindFramebuffer(e.FRAMEBUFFER, null);
          }
        }
        c = await i.requestReferenceSpace(u);
        z.setContext(i);
        z.start();
        n.isPresenting = true;
        n.dispatchEvent({
          type: "sessionstart"
        });
      }
    };
    const F = new a.P();
    const O = new a.P();
    function U(t, e) {
      if (e === null) {
        t.matrixWorld.copy(t.matrix);
      } else {
        t.matrixWorld.multiplyMatrices(e.matrixWorld, t.matrix);
      }
      t.matrixWorldInverse.copy(t.matrixWorld).invert();
    }
    this.updateCamera = function (t) {
      if (i === null) {
        return;
      }
      R.near = E.near = S.near = t.near;
      R.far = E.far = S.far = t.far;
      if (L !== R.near || P !== R.far) {
        i.updateRenderState({
          depthNear: R.near,
          depthFar: R.far
        });
        L = R.near;
        P = R.far;
      }
      const e = t.parent;
      const n = R.cameras;
      U(R, e);
      for (let t = 0; t < n.length; t++) {
        U(n[t], e);
      }
      R.matrixWorld.decompose(R.position, R.quaternion, R.scale);
      t.position.copy(R.position);
      t.quaternion.copy(R.quaternion);
      t.scale.copy(R.scale);
      t.matrix.copy(R.matrix);
      t.matrixWorld.copy(R.matrixWorld);
      const r = t.children;
      for (let t = 0, e = r.length; t < e; t++) {
        r[t].updateMatrixWorld(true);
      }
      if (n.length === 2) {
        (function (t, e, n) {
          F.setFromMatrixPosition(e.matrixWorld);
          O.setFromMatrixPosition(n.matrixWorld);
          const r = F.distanceTo(O);
          const i = e.projectionMatrix.elements;
          const s = n.projectionMatrix.elements;
          const a = i[14] / (i[10] - 1);
          const o = i[14] / (i[10] + 1);
          const l = (i[9] + 1) / i[5];
          const c = (i[9] - 1) / i[5];
          const u = (i[8] - 1) / i[0];
          const h = (s[8] + 1) / s[0];
          const d = a * u;
          const f = a * h;
          const p = r / (-u + h);
          const m = p * -u;
          e.matrixWorld.decompose(t.position, t.quaternion, t.scale);
          t.translateX(m);
          t.translateZ(p);
          t.matrixWorld.compose(t.position, t.quaternion, t.scale);
          t.matrixWorldInverse.copy(t.matrixWorld).invert();
          const g = a + p;
          const v = o + p;
          const _ = d - m;
          const x = f + (r - m);
          const y = l * o / v * g;
          const b = c * o / v * g;
          t.projectionMatrix.makePerspective(_, x, y, b, g, v);
        })(R, S, E);
      } else {
        R.projectionMatrix.copy(S.projectionMatrix);
      }
    };
    this.getCamera = function () {
      return R;
    };
    this.getFoveation = function () {
      if (p !== null) {
        return p.fixedFoveation;
      } else if (m !== null) {
        return m.fixedFoveation;
      } else {
        return undefined;
      }
    };
    this.setFoveation = function (t) {
      if (p !== null) {
        p.fixedFoveation = t;
      }
      if (m !== null && m.fixedFoveation !== undefined) {
        m.fixedFoveation = t;
      }
    };
    let B = null;
    const z = new l();
    z.setAnimationLoop(function (t, n) {
      h = n.getViewerPose(c);
      y = n;
      if (h !== null) {
        const t = h.views;
        if (m !== null) {
          r.bindXRFramebuffer(m.framebuffer);
        }
        let n = false;
        if (t.length !== R.cameras.length) {
          R.cameras.length = 0;
          n = true;
        }
        for (let i = 0; i < t.length; i++) {
          const s = t[i];
          let a = null;
          if (m !== null) {
            a = m.getViewport(s);
          } else {
            const t = d.getViewSubImage(p, s);
            r.bindXRFramebuffer(f);
            if (t.depthStencilTexture !== undefined) {
              e.framebufferTexture2D(e.FRAMEBUFFER, b, e.TEXTURE_2D, t.depthStencilTexture, 0);
            }
            e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t.colorTexture, 0);
            a = t.viewport;
          }
          const o = A[i];
          o.matrix.fromArray(s.transform.matrix);
          o.projectionMatrix.fromArray(s.projectionMatrix);
          o.viewport.set(a.x, a.y, a.width, a.height);
          if (i === 0) {
            R.matrix.copy(o.matrix);
          }
          if (n === true) {
            R.cameras.push(o);
          }
        }
        if (g) {
          r.bindXRFramebuffer(v);
          if (w !== null) {
            e.clear(w);
          }
        }
      }
      const s = i.inputSources;
      for (let t = 0; t < M.length; t++) {
        const e = M[t];
        const r = s[t];
        e.update(r, n, c);
      }
      if (B) {
        B(t, n);
      }
      if (g) {
        const t = p.textureWidth;
        const n = p.textureHeight;
        r.bindFramebuffer(e.READ_FRAMEBUFFER, v);
        r.bindFramebuffer(e.DRAW_FRAMEBUFFER, f);
        e.invalidateFramebuffer(e.READ_FRAMEBUFFER, [b]);
        e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, [b]);
        e.blitFramebuffer(0, 0, t, n, 0, 0, t, n, e.COLOR_BUFFER_BIT, e.NEAREST);
        e.invalidateFramebuffer(e.READ_FRAMEBUFFER, [e.COLOR_ATTACHMENT0]);
        r.bindFramebuffer(e.READ_FRAMEBUFFER, null);
        r.bindFramebuffer(e.DRAW_FRAMEBUFFER, null);
        r.bindFramebuffer(e.FRAMEBUFFER, v);
      }
      y = null;
    });
    this.setAnimationLoop = function (t) {
      B = t;
    };
    this.dispose = function () {};
  }
}
function _n(t) {
  function e(e, n) {
    e.opacity.value = n.opacity;
    if (n.color) {
      e.diffuse.value.copy(n.color);
    }
    if (n.emissive) {
      e.emissive.value.copy(n.emissive).multiplyScalar(n.emissiveIntensity);
    }
    if (n.map) {
      e.map.value = n.map;
    }
    if (n.alphaMap) {
      e.alphaMap.value = n.alphaMap;
    }
    if (n.specularMap) {
      e.specularMap.value = n.specularMap;
    }
    if (n.alphaTest > 0) {
      e.alphaTest.value = n.alphaTest;
    }
    const r = t.get(n).envMap;
    if (r) {
      e.envMap.value = r;
      e.flipEnvMap.value = r.isCubeTexture && r.isRenderTargetTexture === false ? -1 : 1;
      e.reflectivity.value = n.reflectivity;
      e.ior.value = n.ior;
      e.refractionRatio.value = n.refractionRatio;
      const i = t.get(r).__maxMipLevel;
      if (i !== undefined) {
        e.maxMipLevel.value = i;
      }
    }
    let i;
    let s;
    if (n.lightMap) {
      e.lightMap.value = n.lightMap;
      e.lightMapIntensity.value = n.lightMapIntensity;
    }
    if (n.aoMap) {
      e.aoMap.value = n.aoMap;
      e.aoMapIntensity.value = n.aoMapIntensity;
    }
    if (n.map) {
      i = n.map;
    } else if (n.specularMap) {
      i = n.specularMap;
    } else if (n.displacementMap) {
      i = n.displacementMap;
    } else if (n.normalMap) {
      i = n.normalMap;
    } else if (n.bumpMap) {
      i = n.bumpMap;
    } else if (n.roughnessMap) {
      i = n.roughnessMap;
    } else if (n.metalnessMap) {
      i = n.metalnessMap;
    } else if (n.alphaMap) {
      i = n.alphaMap;
    } else if (n.emissiveMap) {
      i = n.emissiveMap;
    } else if (n.clearcoatMap) {
      i = n.clearcoatMap;
    } else if (n.clearcoatNormalMap) {
      i = n.clearcoatNormalMap;
    } else if (n.clearcoatRoughnessMap) {
      i = n.clearcoatRoughnessMap;
    } else if (n.specularIntensityMap) {
      i = n.specularIntensityMap;
    } else if (n.specularTintMap) {
      i = n.specularTintMap;
    } else if (n.transmissionMap) {
      i = n.transmissionMap;
    } else if (n.thicknessMap) {
      i = n.thicknessMap;
    }
    if (i !== undefined) {
      if (i.isWebGLRenderTarget) {
        i = i.texture;
      }
      if (i.matrixAutoUpdate === true) {
        i.updateMatrix();
      }
      e.uvTransform.value.copy(i.matrix);
    }
    if (n.aoMap) {
      s = n.aoMap;
    } else if (n.lightMap) {
      s = n.lightMap;
    }
    if (s !== undefined) {
      if (s.isWebGLRenderTarget) {
        s = s.texture;
      }
      if (s.matrixAutoUpdate === true) {
        s.updateMatrix();
      }
      e.uv2Transform.value.copy(s.matrix);
    }
  }
  function n(e, n) {
    e.roughness.value = n.roughness;
    e.metalness.value = n.metalness;
    if (n.roughnessMap) {
      e.roughnessMap.value = n.roughnessMap;
    }
    if (n.metalnessMap) {
      e.metalnessMap.value = n.metalnessMap;
    }
    if (n.emissiveMap) {
      e.emissiveMap.value = n.emissiveMap;
    }
    if (n.bumpMap) {
      e.bumpMap.value = n.bumpMap;
      e.bumpScale.value = n.bumpScale;
      if (n.side === r._Li) {
        e.bumpScale.value *= -1;
      }
    }
    if (n.normalMap) {
      e.normalMap.value = n.normalMap;
      e.normalScale.value.copy(n.normalScale);
      if (n.side === r._Li) {
        e.normalScale.value.negate();
      }
    }
    if (n.displacementMap) {
      e.displacementMap.value = n.displacementMap;
      e.displacementScale.value = n.displacementScale;
      e.displacementBias.value = n.displacementBias;
    }
    if (t.get(n).envMap) {
      e.envMapIntensity.value = n.envMapIntensity;
    }
  }
  return {
    refreshFogUniforms: function (t, e) {
      t.fogColor.value.copy(e.color);
      if (e.isFog) {
        t.fogNear.value = e.near;
        t.fogFar.value = e.far;
      } else if (e.isFogExp2) {
        t.fogDensity.value = e.density;
      }
    },
    refreshMaterialUniforms: function (t, i, s, a, o) {
      if (i.isMeshBasicMaterial) {
        e(t, i);
      } else if (i.isMeshLambertMaterial) {
        e(t, i);
        (function (t, e) {
          if (e.emissiveMap) {
            t.emissiveMap.value = e.emissiveMap;
          }
        })(t, i);
      } else if (i.isMeshToonMaterial) {
        e(t, i);
        (function (t, e) {
          if (e.gradientMap) {
            t.gradientMap.value = e.gradientMap;
          }
          if (e.emissiveMap) {
            t.emissiveMap.value = e.emissiveMap;
          }
          if (e.bumpMap) {
            t.bumpMap.value = e.bumpMap;
            t.bumpScale.value = e.bumpScale;
            if (e.side === r._Li) {
              t.bumpScale.value *= -1;
            }
          }
          if (e.normalMap) {
            t.normalMap.value = e.normalMap;
            t.normalScale.value.copy(e.normalScale);
            if (e.side === r._Li) {
              t.normalScale.value.negate();
            }
          }
          if (e.displacementMap) {
            t.displacementMap.value = e.displacementMap;
            t.displacementScale.value = e.displacementScale;
            t.displacementBias.value = e.displacementBias;
          }
        })(t, i);
      } else if (i.isMeshPhongMaterial) {
        e(t, i);
        (function (t, e) {
          t.specular.value.copy(e.specular);
          t.shininess.value = Math.max(e.shininess, 0.0001);
          if (e.emissiveMap) {
            t.emissiveMap.value = e.emissiveMap;
          }
          if (e.bumpMap) {
            t.bumpMap.value = e.bumpMap;
            t.bumpScale.value = e.bumpScale;
            if (e.side === r._Li) {
              t.bumpScale.value *= -1;
            }
          }
          if (e.normalMap) {
            t.normalMap.value = e.normalMap;
            t.normalScale.value.copy(e.normalScale);
            if (e.side === r._Li) {
              t.normalScale.value.negate();
            }
          }
          if (e.displacementMap) {
            t.displacementMap.value = e.displacementMap;
            t.displacementScale.value = e.displacementScale;
            t.displacementBias.value = e.displacementBias;
          }
        })(t, i);
      } else if (i.isMeshStandardMaterial) {
        e(t, i);
        if (i.isMeshPhysicalMaterial) {
          (function (t, e, i) {
            n(t, e);
            t.ior.value = e.ior;
            if (e.sheenTint) {
              t.sheenTint.value.copy(e.sheenTint);
            }
            if (e.clearcoat > 0) {
              t.clearcoat.value = e.clearcoat;
              t.clearcoatRoughness.value = e.clearcoatRoughness;
              if (e.clearcoatMap) {
                t.clearcoatMap.value = e.clearcoatMap;
              }
              if (e.clearcoatRoughnessMap) {
                t.clearcoatRoughnessMap.value = e.clearcoatRoughnessMap;
              }
              if (e.clearcoatNormalMap) {
                t.clearcoatNormalScale.value.copy(e.clearcoatNormalScale);
                t.clearcoatNormalMap.value = e.clearcoatNormalMap;
                if (e.side === r._Li) {
                  t.clearcoatNormalScale.value.negate();
                }
              }
            }
            if (e.transmission > 0) {
              t.transmission.value = e.transmission;
              t.transmissionSamplerMap.value = i.texture;
              t.transmissionSamplerSize.value.set(i.width, i.height);
              if (e.transmissionMap) {
                t.transmissionMap.value = e.transmissionMap;
              }
              t.thickness.value = e.thickness;
              if (e.thicknessMap) {
                t.thicknessMap.value = e.thicknessMap;
              }
              t.attenuationDistance.value = e.attenuationDistance;
              t.attenuationTint.value.copy(e.attenuationTint);
            }
            t.specularIntensity.value = e.specularIntensity;
            t.specularTint.value.copy(e.specularTint);
            if (e.specularIntensityMap) {
              t.specularIntensityMap.value = e.specularIntensityMap;
            }
            if (e.specularTintMap) {
              t.specularTintMap.value = e.specularTintMap;
            }
          })(t, i, o);
        } else {
          n(t, i);
        }
      } else if (i.isMeshMatcapMaterial) {
        e(t, i);
        (function (t, e) {
          if (e.matcap) {
            t.matcap.value = e.matcap;
          }
          if (e.bumpMap) {
            t.bumpMap.value = e.bumpMap;
            t.bumpScale.value = e.bumpScale;
            if (e.side === r._Li) {
              t.bumpScale.value *= -1;
            }
          }
          if (e.normalMap) {
            t.normalMap.value = e.normalMap;
            t.normalScale.value.copy(e.normalScale);
            if (e.side === r._Li) {
              t.normalScale.value.negate();
            }
          }
          if (e.displacementMap) {
            t.displacementMap.value = e.displacementMap;
            t.displacementScale.value = e.displacementScale;
            t.displacementBias.value = e.displacementBias;
          }
        })(t, i);
      } else if (i.isMeshDepthMaterial) {
        e(t, i);
        (function (t, e) {
          if (e.displacementMap) {
            t.displacementMap.value = e.displacementMap;
            t.displacementScale.value = e.displacementScale;
            t.displacementBias.value = e.displacementBias;
          }
        })(t, i);
      } else if (i.isMeshDistanceMaterial) {
        e(t, i);
        (function (t, e) {
          if (e.displacementMap) {
            t.displacementMap.value = e.displacementMap;
            t.displacementScale.value = e.displacementScale;
            t.displacementBias.value = e.displacementBias;
          }
          t.referencePosition.value.copy(e.referencePosition);
          t.nearDistance.value = e.nearDistance;
          t.farDistance.value = e.farDistance;
        })(t, i);
      } else if (i.isMeshNormalMaterial) {
        e(t, i);
        (function (t, e) {
          if (e.bumpMap) {
            t.bumpMap.value = e.bumpMap;
            t.bumpScale.value = e.bumpScale;
            if (e.side === r._Li) {
              t.bumpScale.value *= -1;
            }
          }
          if (e.normalMap) {
            t.normalMap.value = e.normalMap;
            t.normalScale.value.copy(e.normalScale);
            if (e.side === r._Li) {
              t.normalScale.value.negate();
            }
          }
          if (e.displacementMap) {
            t.displacementMap.value = e.displacementMap;
            t.displacementScale.value = e.displacementScale;
            t.displacementBias.value = e.displacementBias;
          }
        })(t, i);
      } else if (i.isLineBasicMaterial) {
        (function (t, e) {
          t.diffuse.value.copy(e.color);
          t.opacity.value = e.opacity;
        })(t, i);
        if (i.isLineDashedMaterial) {
          (function (t, e) {
            t.dashSize.value = e.dashSize;
            t.totalSize.value = e.dashSize + e.gapSize;
            t.scale.value = e.scale;
          })(t, i);
        }
      } else if (i.isPointsMaterial) {
        (function (t, e, n, r) {
          t.diffuse.value.copy(e.color);
          t.opacity.value = e.opacity;
          t.size.value = e.size * n;
          t.scale.value = r * 0.5;
          if (e.map) {
            t.map.value = e.map;
          }
          if (e.alphaMap) {
            t.alphaMap.value = e.alphaMap;
          }
          if (e.alphaTest > 0) {
            t.alphaTest.value = e.alphaTest;
          }
          let i;
          if (e.map) {
            i = e.map;
          } else if (e.alphaMap) {
            i = e.alphaMap;
          }
          if (i !== undefined) {
            if (i.matrixAutoUpdate === true) {
              i.updateMatrix();
            }
            t.uvTransform.value.copy(i.matrix);
          }
        })(t, i, s, a);
      } else if (i.isSpriteMaterial) {
        (function (t, e) {
          t.diffuse.value.copy(e.color);
          t.opacity.value = e.opacity;
          t.rotation.value = e.rotation;
          if (e.map) {
            t.map.value = e.map;
          }
          if (e.alphaMap) {
            t.alphaMap.value = e.alphaMap;
          }
          if (e.alphaTest > 0) {
            t.alphaTest.value = e.alphaTest;
          }
          let n;
          if (e.map) {
            n = e.map;
          } else if (e.alphaMap) {
            n = e.alphaMap;
          }
          if (n !== undefined) {
            if (n.matrixAutoUpdate === true) {
              n.updateMatrix();
            }
            t.uvTransform.value.copy(n.matrix);
          }
        })(t, i);
      } else if (i.isShadowMaterial) {
        t.color.value.copy(i.color);
        t.opacity.value = i.opacity;
      } else if (i.isShaderMaterial) {
        i.uniformsNeedUpdate = false;
      }
    }
  };
}
function xn(t = {}) {
  const e = t.canvas !== undefined ? t.canvas : function () {
    const t = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
    t.style.display = "block";
    return t;
  }();
  const n = t.context !== undefined ? t.context : null;
  const u = t.alpha !== undefined && t.alpha;
  const h = t.depth === undefined || t.depth;
  const d = t.stencil === undefined || t.stencil;
  const f = t.antialias !== undefined && t.antialias;
  const p = t.premultipliedAlpha === undefined || t.premultipliedAlpha;
  const m = t.preserveDrawingBuffer !== undefined && t.preserveDrawingBuffer;
  const g = t.powerPreference !== undefined ? t.powerPreference : "default";
  const v = t.failIfMajorPerformanceCaveat !== undefined && t.failIfMajorPerformanceCaveat;
  let _ = null;
  let x = null;
  const y = [];
  const b = [];
  this.domElement = e;
  this.debug = {
    checkShaderErrors: true
  };
  this.autoClear = true;
  this.autoClearColor = true;
  this.autoClearDepth = true;
  this.autoClearStencil = true;
  this.sortObjects = true;
  this.clippingPlanes = [];
  this.localClippingEnabled = false;
  this.gammaFactor = 2;
  this.outputEncoding = r.rnI;
  this.physicallyCorrectLights = false;
  this.toneMapping = r.uL9;
  this.toneMappingExposure = 1;
  const w = this;
  let A = false;
  let P = 0;
  let C = 0;
  let D = null;
  let I = -1;
  let N = null;
  const F = new o.L();
  const U = new o.L();
  let B = null;
  let z = e.width;
  let k = e.height;
  let G = 1;
  let H = null;
  let V = null;
  const W = new o.L(0, 0, z, k);
  const X = new o.L(0, 0, z, k);
  let j = false;
  const q = [];
  const Y = new i.i();
  let Z = false;
  let K = false;
  let J = null;
  const Q = new s.y();
  const $ = new a.P();
  const tt = {
    background: null,
    fog: null,
    environment: null,
    overrideMaterial: null,
    isScene: true
  };
  function et() {
    if (D === null) {
      return G;
    } else {
      return 1;
    }
  }
  let nt;
  let rt;
  let it;
  let st;
  let at;
  let ot;
  let lt;
  let ht;
  let mt;
  let gt;
  let yt;
  let bt;
  let wt;
  let Mt;
  let Tt;
  let St;
  let Et;
  let At;
  let Rt;
  let Lt;
  let Pt;
  let Ct;
  let Dt;
  let It = n;
  function Nt(t, n) {
    for (let r = 0; r < t.length; r++) {
      const i = t[r];
      const s = e.getContext(i, n);
      if (s !== null) {
        return s;
      }
    }
    return null;
  }
  try {
    const t = {
      alpha: u,
      depth: h,
      stencil: d,
      antialias: f,
      premultipliedAlpha: p,
      preserveDrawingBuffer: m,
      powerPreference: g,
      failIfMajorPerformanceCaveat: v
    };
    e.addEventListener("webglcontextlost", Ut, false);
    e.addEventListener("webglcontextrestored", Bt, false);
    if (It === null) {
      const e = ["webgl2", "webgl", "experimental-webgl"];
      if (w.isWebGL1Renderer === true) {
        e.shift();
      }
      It = Nt(e, t);
      if (It === null) {
        throw Nt(e) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    }
    if (It.getShaderPrecisionFormat === undefined) {
      It.getShaderPrecisionFormat = function () {
        return {
          rangeMin: 1,
          rangeMax: 1,
          precision: 1
        };
      };
    }
  } catch (t) {
    console.error("THREE.WebGLRenderer: " + t.message);
    throw t;
  }
  function Ft() {
    nt = new ut(It);
    rt = new E(It, nt, t);
    nt.init(rt);
    Ct = new hn(It, nt, rt);
    it = new ln(It, nt, rt);
    q[0] = It.BACK;
    st = new pt(It);
    at = new je();
    ot = new un(It, nt, it, at, rt, Ct, st);
    lt = new O(w);
    ht = new ct(w);
    mt = new c(It, rt);
    Dt = new T(It, nt, mt, rt);
    gt = new dt(It, mt, st, Dt);
    yt = new xt(It, gt, mt, st);
    Rt = new vt(It);
    St = new R(at);
    bt = new Xe(w, lt, ht, nt, rt, Dt, St);
    wt = new _n(at);
    Mt = new Ke(at);
    Tt = new nn(nt, rt);
    At = new M(w, lt, it, yt, p);
    Et = new on(w, yt, rt);
    Lt = new S(It, nt, st, rt);
    Pt = new ft(It, nt, st, rt);
    st.programs = bt.programs;
    w.capabilities = rt;
    w.extensions = nt;
    w.properties = at;
    w.renderLists = Mt;
    w.shadowMap = Et;
    w.state = it;
    w.info = st;
  }
  Ft();
  const Ot = new vn(w, It);
  function Ut(t) {
    t.preventDefault();
    console.log("THREE.WebGLRenderer: Context Lost.");
    A = true;
  }
  function Bt() {
    console.log("THREE.WebGLRenderer: Context Restored.");
    A = false;
    const t = st.autoReset;
    const e = Et.enabled;
    const n = Et.autoUpdate;
    const r = Et.needsUpdate;
    const i = Et.type;
    Ft();
    st.autoReset = t;
    Et.enabled = e;
    Et.autoUpdate = n;
    Et.needsUpdate = r;
    Et.type = i;
  }
  function zt(t) {
    const e = t.target;
    e.removeEventListener("dispose", zt);
    (function (t) {
      (function (t) {
        const e = at.get(t).programs;
        if (e !== undefined) {
          e.forEach(function (t) {
            bt.releaseProgram(t);
          });
        }
      })(t);
      at.remove(t);
    })(e);
  }
  this.xr = Ot;
  this.getContext = function () {
    return It;
  };
  this.getContextAttributes = function () {
    return It.getContextAttributes();
  };
  this.forceContextLoss = function () {
    const t = nt.get("WEBGL_lose_context");
    if (t) {
      t.loseContext();
    }
  };
  this.forceContextRestore = function () {
    const t = nt.get("WEBGL_lose_context");
    if (t) {
      t.restoreContext();
    }
  };
  this.getPixelRatio = function () {
    return G;
  };
  this.setPixelRatio = function (t) {
    if (t !== undefined) {
      G = t;
      this.setSize(z, k, false);
    }
  };
  this.getSize = function (t) {
    return t.set(z, k);
  };
  this.setSize = function (t, n, r) {
    if (Ot.isPresenting) {
      console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
    } else {
      z = t;
      k = n;
      e.width = Math.floor(t * G);
      e.height = Math.floor(n * G);
      if (r !== false) {
        e.style.width = t + "px";
        e.style.height = n + "px";
      }
      this.setViewport(0, 0, t, n);
    }
  };
  this.getDrawingBufferSize = function (t) {
    return t.set(z * G, k * G).floor();
  };
  this.setDrawingBufferSize = function (t, n, r) {
    z = t;
    k = n;
    G = r;
    e.width = Math.floor(t * r);
    e.height = Math.floor(n * r);
    this.setViewport(0, 0, t, n);
  };
  this.getCurrentViewport = function (t) {
    return t.copy(F);
  };
  this.getViewport = function (t) {
    return t.copy(W);
  };
  this.setViewport = function (t, e, n, r) {
    if (t.isVector4) {
      W.set(t.x, t.y, t.z, t.w);
    } else {
      W.set(t, e, n, r);
    }
    it.viewport(F.copy(W).multiplyScalar(G).floor());
  };
  this.getScissor = function (t) {
    return t.copy(X);
  };
  this.setScissor = function (t, e, n, r) {
    if (t.isVector4) {
      X.set(t.x, t.y, t.z, t.w);
    } else {
      X.set(t, e, n, r);
    }
    it.scissor(U.copy(X).multiplyScalar(G).floor());
  };
  this.getScissorTest = function () {
    return j;
  };
  this.setScissorTest = function (t) {
    it.setScissorTest(j = t);
  };
  this.setOpaqueSort = function (t) {
    H = t;
  };
  this.setTransparentSort = function (t) {
    V = t;
  };
  this.getClearColor = function (t) {
    return t.copy(At.getClearColor());
  };
  this.setClearColor = function () {
    At.setClearColor.apply(At, arguments);
  };
  this.getClearAlpha = function () {
    return At.getClearAlpha();
  };
  this.setClearAlpha = function () {
    At.setClearAlpha.apply(At, arguments);
  };
  this.clear = function (t, e, n) {
    let r = 0;
    if (t === undefined || t) {
      r |= It.COLOR_BUFFER_BIT;
    }
    if (e === undefined || e) {
      r |= It.DEPTH_BUFFER_BIT;
    }
    if (n === undefined || n) {
      r |= It.STENCIL_BUFFER_BIT;
    }
    It.clear(r);
  };
  this.clearColor = function () {
    this.clear(true, false, false);
  };
  this.clearDepth = function () {
    this.clear(false, true, false);
  };
  this.clearStencil = function () {
    this.clear(false, false, true);
  };
  this.dispose = function () {
    e.removeEventListener("webglcontextlost", Ut, false);
    e.removeEventListener("webglcontextrestored", Bt, false);
    Mt.dispose();
    Tt.dispose();
    at.dispose();
    lt.dispose();
    ht.dispose();
    yt.dispose();
    Dt.dispose();
    Ot.dispose();
    Ot.removeEventListener("sessionstart", Gt);
    Ot.removeEventListener("sessionend", Ht);
    if (J) {
      J.dispose();
      J = null;
    }
    Vt.stop();
  };
  this.renderBufferImmediate = function (t, e) {
    Dt.initAttributes();
    const n = at.get(t);
    if (t.hasPositions && !n.position) {
      n.position = It.createBuffer();
    }
    if (t.hasNormals && !n.normal) {
      n.normal = It.createBuffer();
    }
    if (t.hasUvs && !n.uv) {
      n.uv = It.createBuffer();
    }
    if (t.hasColors && !n.color) {
      n.color = It.createBuffer();
    }
    const r = e.getAttributes();
    if (t.hasPositions) {
      It.bindBuffer(It.ARRAY_BUFFER, n.position);
      It.bufferData(It.ARRAY_BUFFER, t.positionArray, It.DYNAMIC_DRAW);
      Dt.enableAttribute(r.position.location);
      It.vertexAttribPointer(r.position.location, 3, It.FLOAT, false, 0, 0);
    }
    if (t.hasNormals) {
      It.bindBuffer(It.ARRAY_BUFFER, n.normal);
      It.bufferData(It.ARRAY_BUFFER, t.normalArray, It.DYNAMIC_DRAW);
      Dt.enableAttribute(r.normal.location);
      It.vertexAttribPointer(r.normal.location, 3, It.FLOAT, false, 0, 0);
    }
    if (t.hasUvs) {
      It.bindBuffer(It.ARRAY_BUFFER, n.uv);
      It.bufferData(It.ARRAY_BUFFER, t.uvArray, It.DYNAMIC_DRAW);
      Dt.enableAttribute(r.uv.location);
      It.vertexAttribPointer(r.uv.location, 2, It.FLOAT, false, 0, 0);
    }
    if (t.hasColors) {
      It.bindBuffer(It.ARRAY_BUFFER, n.color);
      It.bufferData(It.ARRAY_BUFFER, t.colorArray, It.DYNAMIC_DRAW);
      Dt.enableAttribute(r.color.location);
      It.vertexAttribPointer(r.color.location, 3, It.FLOAT, false, 0, 0);
    }
    Dt.disableUnusedAttributes();
    It.drawArrays(It.TRIANGLES, 0, t.count);
    t.count = 0;
  };
  this.renderBufferDirect = function (t, e, n, r, i, s) {
    if (e === null) {
      e = tt;
    }
    const a = i.isMesh && i.matrixWorld.determinant() < 0;
    const o = Kt(t, e, r, i);
    it.setMaterial(r, a);
    let l = n.index;
    const c = n.attributes.position;
    if (l === null) {
      if (c === undefined || c.count === 0) {
        return;
      }
    } else if (l.count === 0) {
      return;
    }
    let u;
    let h = 1;
    if (r.wireframe === true) {
      l = gt.getWireframeAttribute(n);
      h = 2;
    }
    if (n.morphAttributes.position !== undefined || n.morphAttributes.normal !== undefined) {
      Rt.update(i, n, r, o);
    }
    Dt.setup(i, r, o, n, l);
    let d = Lt;
    if (l !== null) {
      u = mt.get(l);
      d = Pt;
      d.setIndex(u);
    }
    const f = l !== null ? l.count : c.count;
    const p = n.drawRange.start * h;
    const m = n.drawRange.count * h;
    const g = s !== null ? s.start * h : 0;
    const v = s !== null ? s.count * h : Infinity;
    const _ = Math.max(p, g);
    const x = Math.min(f, p + m, g + v) - 1;
    const y = Math.max(0, x - _ + 1);
    if (y !== 0) {
      if (i.isMesh) {
        if (r.wireframe === true) {
          it.setLineWidth(r.wireframeLinewidth * et());
          d.setMode(It.LINES);
        } else {
          d.setMode(It.TRIANGLES);
        }
      } else if (i.isLine) {
        let t = r.linewidth;
        if (t === undefined) {
          t = 1;
        }
        it.setLineWidth(t * et());
        if (i.isLineSegments) {
          d.setMode(It.LINES);
        } else if (i.isLineLoop) {
          d.setMode(It.LINE_LOOP);
        } else {
          d.setMode(It.LINE_STRIP);
        }
      } else if (i.isPoints) {
        d.setMode(It.POINTS);
      } else if (i.isSprite) {
        d.setMode(It.TRIANGLES);
      }
      if (i.isInstancedMesh) {
        d.renderInstances(_, y, i.count);
      } else if (n.isInstancedBufferGeometry) {
        const t = Math.min(n.instanceCount, n._maxInstanceCount);
        d.renderInstances(_, y, t);
      } else {
        d.render(_, y);
      }
    }
  };
  this.compile = function (t, e) {
    x = Tt.get(t);
    x.init();
    b.push(x);
    t.traverseVisible(function (t) {
      if (t.isLight && t.layers.test(e.layers)) {
        x.pushLight(t);
        if (t.castShadow) {
          x.pushShadow(t);
        }
      }
    });
    x.setupLights(w.physicallyCorrectLights);
    t.traverse(function (e) {
      const n = e.material;
      if (n) {
        if (Array.isArray(n)) {
          for (let r = 0; r < n.length; r++) {
            Yt(n[r], t, e);
          }
        } else {
          Yt(n, t, e);
        }
      }
    });
    b.pop();
    x = null;
  };
  let kt = null;
  function Gt() {
    Vt.stop();
  }
  function Ht() {
    Vt.start();
  }
  const Vt = new l();
  function Wt(t, e, n, r) {
    if (t.visible === false) {
      return;
    }
    if (t.layers.test(e.layers)) {
      if (t.isGroup) {
        n = t.renderOrder;
      } else if (t.isLOD) {
        if (t.autoUpdate === true) {
          t.update(e);
        }
      } else if (t.isLight) {
        x.pushLight(t);
        if (t.castShadow) {
          x.pushShadow(t);
        }
      } else if (t.isSprite) {
        if (!t.frustumCulled || Y.intersectsSprite(t)) {
          if (r) {
            $.setFromMatrixPosition(t.matrixWorld).applyMatrix4(Q);
          }
          const e = yt.update(t);
          const i = t.material;
          if (i.visible) {
            _.push(t, e, i, n, $.z, null);
          }
        }
      } else if (t.isImmediateRenderObject) {
        if (r) {
          $.setFromMatrixPosition(t.matrixWorld).applyMatrix4(Q);
        }
        _.push(t, null, t.material, n, $.z, null);
      } else if ((t.isMesh || t.isLine || t.isPoints) && (t.isSkinnedMesh && t.skeleton.frame !== st.render.frame && (t.skeleton.update(), t.skeleton.frame = st.render.frame), !t.frustumCulled || Y.intersectsObject(t))) {
        if (r) {
          $.setFromMatrixPosition(t.matrixWorld).applyMatrix4(Q);
        }
        const e = yt.update(t);
        const i = t.material;
        if (Array.isArray(i)) {
          const r = e.groups;
          for (let s = 0, a = r.length; s < a; s++) {
            const a = r[s];
            const o = i[a.materialIndex];
            if (o && o.visible) {
              _.push(t, e, o, n, $.z, a);
            }
          }
        } else if (i.visible) {
          _.push(t, e, i, n, $.z, null);
        }
      }
    }
    const i = t.children;
    for (let t = 0, s = i.length; t < s; t++) {
      Wt(i[t], e, n, r);
    }
  }
  function Xt(t, e, n, i) {
    const s = t.opaque;
    const a = t.transmissive;
    const o = t.transparent;
    x.setupLightsView(n);
    if (a.length > 0) {
      (function (t, e, n) {
        if (J === null) {
          const t = f === true && rt.isWebGL2 === true ? _t : L.d;
          J = new t(1024, 1024, {
            generateMipmaps: true,
            type: Ct.convert(r.cLu) !== null ? r.cLu : r.ywz,
            minFilter: r.D1R,
            magFilter: r.TyD,
            wrapS: r.uWy,
            wrapT: r.uWy
          });
        }
        const i = w.getRenderTarget();
        w.setRenderTarget(J);
        w.clear();
        const s = w.toneMapping;
        w.toneMapping = r.uL9;
        jt(t, e, n);
        w.toneMapping = s;
        ot.updateMultisampleRenderTarget(J);
        ot.updateRenderTargetMipmap(J);
        w.setRenderTarget(i);
      })(s, e, n);
    }
    if (i) {
      it.viewport(F.copy(i));
    }
    if (s.length > 0) {
      jt(s, e, n);
    }
    if (a.length > 0) {
      jt(a, e, n);
    }
    if (o.length > 0) {
      jt(o, e, n);
    }
  }
  function jt(t, e, n) {
    const r = e.isScene === true ? e.overrideMaterial : null;
    for (let i = 0, s = t.length; i < s; i++) {
      const s = t[i];
      const a = s.object;
      const o = s.geometry;
      const l = r === null ? s.material : r;
      const c = s.group;
      if (a.layers.test(n.layers)) {
        qt(a, e, n, o, l, c);
      }
    }
  }
  function qt(t, e, n, i, s, a) {
    t.onBeforeRender(w, e, n, i, s, a);
    t.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, t.matrixWorld);
    t.normalMatrix.getNormalMatrix(t.modelViewMatrix);
    if (t.isImmediateRenderObject) {
      const r = Kt(n, e, s, t);
      it.setMaterial(s);
      Dt.reset();
      (function (t, e) {
        t.render(function (t) {
          w.renderBufferImmediate(t, e);
        });
      })(t, r);
    } else if (s.transparent === true && s.side === r.ehD) {
      s.side = r._Li;
      s.needsUpdate = true;
      w.renderBufferDirect(n, e, i, s, t, a);
      s.side = r.Wl3;
      s.needsUpdate = true;
      w.renderBufferDirect(n, e, i, s, t, a);
      s.side = r.ehD;
    } else {
      w.renderBufferDirect(n, e, i, s, t, a);
    }
    t.onAfterRender(w, e, n, i, s, a);
  }
  function Yt(t, e, n) {
    if (e.isScene !== true) {
      e = tt;
    }
    const r = at.get(t);
    const i = x.state.lights;
    const s = x.state.shadowsArray;
    const a = i.state.version;
    const o = bt.getParameters(t, i.state, s, e, n);
    const l = bt.getProgramCacheKey(o);
    let c = r.programs;
    r.environment = t.isMeshStandardMaterial ? e.environment : null;
    r.fog = e.fog;
    r.envMap = (t.isMeshStandardMaterial ? ht : lt).get(t.envMap || r.environment);
    if (c === undefined) {
      t.addEventListener("dispose", zt);
      c = new Map();
      r.programs = c;
    }
    let u = c.get(l);
    if (u !== undefined) {
      if (r.currentProgram === u && r.lightsStateVersion === a) {
        Zt(t, o);
        return u;
      }
    } else {
      o.uniforms = bt.getUniforms(t);
      t.onBuild(o, w);
      t.onBeforeCompile(o, w);
      u = bt.acquireProgram(o, l);
      c.set(l, u);
      r.uniforms = o.uniforms;
    }
    const h = r.uniforms;
    if (!t.isShaderMaterial && !t.isRawShaderMaterial || t.clipping === true) {
      h.clippingPlanes = St.uniform;
    }
    Zt(t, o);
    r.needsLights = function (t) {
      return t.isMeshLambertMaterial || t.isMeshToonMaterial || t.isMeshPhongMaterial || t.isMeshStandardMaterial || t.isShadowMaterial || t.isShaderMaterial && t.lights === true;
    }(t);
    r.lightsStateVersion = a;
    if (r.needsLights) {
      h.ambientLightColor.value = i.state.ambient;
      h.lightProbe.value = i.state.probe;
      h.directionalLights.value = i.state.directional;
      h.directionalLightShadows.value = i.state.directionalShadow;
      h.spotLights.value = i.state.spot;
      h.spotLightShadows.value = i.state.spotShadow;
      h.rectAreaLights.value = i.state.rectArea;
      h.ltc_1.value = i.state.rectAreaLTC1;
      h.ltc_2.value = i.state.rectAreaLTC2;
      h.pointLights.value = i.state.point;
      h.pointLightShadows.value = i.state.pointShadow;
      h.hemisphereLights.value = i.state.hemi;
      h.directionalShadowMap.value = i.state.directionalShadowMap;
      h.directionalShadowMatrix.value = i.state.directionalShadowMatrix;
      h.spotShadowMap.value = i.state.spotShadowMap;
      h.spotShadowMatrix.value = i.state.spotShadowMatrix;
      h.pointShadowMap.value = i.state.pointShadowMap;
      h.pointShadowMatrix.value = i.state.pointShadowMatrix;
    }
    const d = u.getUniforms();
    const f = Te.seqWithValue(d.seq, h);
    r.currentProgram = u;
    r.uniformsList = f;
    return u;
  }
  function Zt(t, e) {
    const n = at.get(t);
    n.outputEncoding = e.outputEncoding;
    n.instancing = e.instancing;
    n.skinning = e.skinning;
    n.morphTargets = e.morphTargets;
    n.morphNormals = e.morphNormals;
    n.numClippingPlanes = e.numClippingPlanes;
    n.numIntersection = e.numClipIntersection;
    n.vertexAlphas = e.vertexAlphas;
    n.vertexTangents = e.vertexTangents;
  }
  function Kt(t, e, n, r) {
    if (e.isScene !== true) {
      e = tt;
    }
    ot.resetTextureUnits();
    const i = e.fog;
    const s = n.isMeshStandardMaterial ? e.environment : null;
    const a = D === null ? w.outputEncoding : D.texture.encoding;
    const o = (n.isMeshStandardMaterial ? ht : lt).get(n.envMap || s);
    const l = n.vertexColors === true && !!r.geometry && !!r.geometry.attributes.color && r.geometry.attributes.color.itemSize === 4;
    const c = !!r.geometry && !!r.geometry.attributes.tangent;
    const u = !!r.geometry && !!r.geometry.morphAttributes.position;
    const h = !!r.geometry && !!r.geometry.morphAttributes.normal;
    const d = at.get(n);
    const f = x.state.lights;
    if (Z === true && (K === true || t !== N)) {
      const e = t === N && n.id === I;
      St.setState(n, t, e);
    }
    let p = false;
    if (n.version === d.__version) {
      if (d.needsLights && d.lightsStateVersion !== f.state.version || d.outputEncoding !== a || r.isInstancedMesh && d.instancing === false) {
        p = true;
      } else if (r.isInstancedMesh || d.instancing !== true) {
        if (r.isSkinnedMesh && d.skinning === false) {
          p = true;
        } else if (r.isSkinnedMesh || d.skinning !== true) {
          if (d.envMap !== o || n.fog && d.fog !== i) {
            p = true;
          } else if (d.numClippingPlanes === undefined || d.numClippingPlanes === St.numPlanes && d.numIntersection === St.numIntersection) {
            if (d.vertexAlphas !== l || d.vertexTangents !== c || d.morphTargets !== u || d.morphNormals !== h) {
              p = true;
            }
          } else {
            p = true;
          }
        } else {
          p = true;
        }
      } else {
        p = true;
      }
    } else {
      p = true;
      d.__version = n.version;
    }
    let m = d.currentProgram;
    if (p === true) {
      m = Yt(n, e, r);
    }
    let g = false;
    let v = false;
    let _ = false;
    const y = m.getUniforms();
    const b = d.uniforms;
    if (it.useProgram(m.program)) {
      g = true;
      v = true;
      _ = true;
    }
    if (n.id !== I) {
      I = n.id;
      v = true;
    }
    if (g || N !== t) {
      y.setValue(It, "projectionMatrix", t.projectionMatrix);
      if (rt.logarithmicDepthBuffer) {
        y.setValue(It, "logDepthBufFC", 2 / (Math.log(t.far + 1) / Math.LN2));
      }
      if (N !== t) {
        N = t;
        v = true;
        _ = true;
      }
      if (n.isShaderMaterial || n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshStandardMaterial || n.envMap) {
        const e = y.map.cameraPosition;
        if (e !== undefined) {
          e.setValue(It, $.setFromMatrixPosition(t.matrixWorld));
        }
      }
      if (n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshLambertMaterial || n.isMeshBasicMaterial || n.isMeshStandardMaterial || n.isShaderMaterial) {
        y.setValue(It, "isOrthographic", t.isOrthographicCamera === true);
      }
      if (n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshLambertMaterial || n.isMeshBasicMaterial || n.isMeshStandardMaterial || n.isShaderMaterial || n.isShadowMaterial || r.isSkinnedMesh) {
        y.setValue(It, "viewMatrix", t.matrixWorldInverse);
      }
    }
    if (r.isSkinnedMesh) {
      y.setOptional(It, r, "bindMatrix");
      y.setOptional(It, r, "bindMatrixInverse");
      const t = r.skeleton;
      if (t) {
        if (rt.floatVertexTextures) {
          if (t.boneTexture === null) {
            t.computeBoneTexture();
          }
          y.setValue(It, "boneTexture", t.boneTexture, ot);
          y.setValue(It, "boneTextureSize", t.boneTextureSize);
        } else {
          y.setOptional(It, t, "boneMatrices");
        }
      }
    }
    var M;
    var T;
    if (v || d.receiveShadow !== r.receiveShadow) {
      d.receiveShadow = r.receiveShadow;
      y.setValue(It, "receiveShadow", r.receiveShadow);
    }
    if (v) {
      y.setValue(It, "toneMappingExposure", w.toneMappingExposure);
      if (d.needsLights) {
        T = _;
        (M = b).ambientLightColor.needsUpdate = T;
        M.lightProbe.needsUpdate = T;
        M.directionalLights.needsUpdate = T;
        M.directionalLightShadows.needsUpdate = T;
        M.pointLights.needsUpdate = T;
        M.pointLightShadows.needsUpdate = T;
        M.spotLights.needsUpdate = T;
        M.spotLightShadows.needsUpdate = T;
        M.rectAreaLights.needsUpdate = T;
        M.hemisphereLights.needsUpdate = T;
      }
      if (i && n.fog) {
        wt.refreshFogUniforms(b, i);
      }
      wt.refreshMaterialUniforms(b, n, G, k, J);
      Te.upload(It, d.uniformsList, b, ot);
    }
    if (n.isShaderMaterial && n.uniformsNeedUpdate === true) {
      Te.upload(It, d.uniformsList, b, ot);
      n.uniformsNeedUpdate = false;
    }
    if (n.isSpriteMaterial) {
      y.setValue(It, "center", r.center);
    }
    y.setValue(It, "modelViewMatrix", r.modelViewMatrix);
    y.setValue(It, "normalMatrix", r.normalMatrix);
    y.setValue(It, "modelMatrix", r.matrixWorld);
    return m;
  }
  Vt.setAnimationLoop(function (t) {
    if (kt) {
      kt(t);
    }
  });
  if (typeof window != "undefined") {
    Vt.setContext(window);
  }
  this.setAnimationLoop = function (t) {
    kt = t;
    Ot.setAnimationLoop(t);
    if (t === null) {
      Vt.stop();
    } else {
      Vt.start();
    }
  };
  Ot.addEventListener("sessionstart", Gt);
  Ot.addEventListener("sessionend", Ht);
  this.render = function (t, e) {
    if (e !== undefined && e.isCamera !== true) {
      console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
      return;
    }
    if (A === true) {
      return;
    }
    if (t.autoUpdate === true) {
      t.updateMatrixWorld();
    }
    if (e.parent === null) {
      e.updateMatrixWorld();
    }
    if (Ot.enabled === true && Ot.isPresenting === true) {
      if (Ot.cameraAutoUpdate === true) {
        Ot.updateCamera(e);
      }
      e = Ot.getCamera();
    }
    if (t.isScene === true) {
      t.onBeforeRender(w, t, e, D);
    }
    x = Tt.get(t, b.length);
    x.init();
    b.push(x);
    Q.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse);
    Y.setFromProjectionMatrix(Q);
    K = this.localClippingEnabled;
    Z = St.init(this.clippingPlanes, K, e);
    _ = Mt.get(t, y.length);
    _.init();
    y.push(_);
    Wt(t, e, 0, w.sortObjects);
    _.finish();
    if (w.sortObjects === true) {
      _.sort(H, V);
    }
    if (Z === true) {
      St.beginShadows();
    }
    const n = x.state.shadowsArray;
    Et.render(n, t, e);
    if (Z === true) {
      St.endShadows();
    }
    if (this.info.autoReset === true) {
      this.info.reset();
    }
    At.render(_, t);
    x.setupLights(w.physicallyCorrectLights);
    if (e.isArrayCamera) {
      const n = e.cameras;
      for (let e = 0, r = n.length; e < r; e++) {
        const r = n[e];
        Xt(_, t, r, r.viewport);
      }
    } else {
      Xt(_, t, e);
    }
    if (D !== null) {
      ot.updateMultisampleRenderTarget(D);
      ot.updateRenderTargetMipmap(D);
    }
    if (t.isScene === true) {
      t.onAfterRender(w, t, e);
    }
    it.buffers.depth.setTest(true);
    it.buffers.depth.setMask(true);
    it.buffers.color.setMask(true);
    it.setPolygonOffset(false);
    Dt.resetDefaultState();
    I = -1;
    N = null;
    b.pop();
    x = b.length > 0 ? b[b.length - 1] : null;
    y.pop();
    _ = y.length > 0 ? y[y.length - 1] : null;
  };
  this.getActiveCubeFace = function () {
    return P;
  };
  this.getActiveMipmapLevel = function () {
    return C;
  };
  this.getRenderTarget = function () {
    return D;
  };
  this.setRenderTarget = function (t, e = 0, n = 0) {
    D = t;
    P = e;
    C = n;
    if (t && at.get(t).__webglFramebuffer === undefined) {
      ot.setupRenderTarget(t);
    }
    let r = null;
    let i = false;
    let s = false;
    if (t) {
      const n = t.texture;
      if (n.isDataTexture3D || n.isDataTexture2DArray) {
        s = true;
      }
      const a = at.get(t).__webglFramebuffer;
      if (t.isWebGLCubeRenderTarget) {
        r = a[e];
        i = true;
      } else {
        r = t.isWebGLMultisampleRenderTarget ? at.get(t).__webglMultisampledFramebuffer : a;
      }
      F.copy(t.viewport);
      U.copy(t.scissor);
      B = t.scissorTest;
    } else {
      F.copy(W).multiplyScalar(G).floor();
      U.copy(X).multiplyScalar(G).floor();
      B = j;
    }
    if (it.bindFramebuffer(It.FRAMEBUFFER, r) && rt.drawBuffers) {
      let e = false;
      if (t) {
        if (t.isWebGLMultipleRenderTargets) {
          const n = t.texture;
          if (q.length !== n.length || q[0] !== It.COLOR_ATTACHMENT0) {
            for (let t = 0, e = n.length; t < e; t++) {
              q[t] = It.COLOR_ATTACHMENT0 + t;
            }
            q.length = n.length;
            e = true;
          }
        } else if (q.length !== 1 || q[0] !== It.COLOR_ATTACHMENT0) {
          q[0] = It.COLOR_ATTACHMENT0;
          q.length = 1;
          e = true;
        }
      } else if (q.length !== 1 || q[0] !== It.BACK) {
        q[0] = It.BACK;
        q.length = 1;
        e = true;
      }
      if (e) {
        if (rt.isWebGL2) {
          It.drawBuffers(q);
        } else {
          nt.get("WEBGL_draw_buffers").drawBuffersWEBGL(q);
        }
      }
    }
    it.viewport(F);
    it.scissor(U);
    it.setScissorTest(B);
    if (i) {
      const r = at.get(t.texture);
      It.framebufferTexture2D(It.FRAMEBUFFER, It.COLOR_ATTACHMENT0, It.TEXTURE_CUBE_MAP_POSITIVE_X + e, r.__webglTexture, n);
    } else if (s) {
      const r = at.get(t.texture);
      const i = e || 0;
      It.framebufferTextureLayer(It.FRAMEBUFFER, It.COLOR_ATTACHMENT0, r.__webglTexture, n || 0, i);
    }
    I = -1;
  };
  this.readRenderTargetPixels = function (t, e, n, i, s, a, o) {
    if (!t || !t.isWebGLRenderTarget) {
      console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      return;
    }
    let l = at.get(t).__webglFramebuffer;
    if (t.isWebGLCubeRenderTarget && o !== undefined) {
      l = l[o];
    }
    if (l) {
      it.bindFramebuffer(It.FRAMEBUFFER, l);
      try {
        const o = t.texture;
        const l = o.format;
        const c = o.type;
        if (l !== r.wk1 && Ct.convert(l) !== It.getParameter(It.IMPLEMENTATION_COLOR_READ_FORMAT)) {
          console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
          return;
        }
        const u = c === r.cLu && (nt.has("EXT_color_buffer_half_float") || rt.isWebGL2 && nt.has("EXT_color_buffer_float"));
        if (c !== r.ywz && Ct.convert(c) !== It.getParameter(It.IMPLEMENTATION_COLOR_READ_TYPE) && (c !== r.VzW || !rt.isWebGL2 && !nt.has("OES_texture_float") && !nt.has("WEBGL_color_buffer_float")) && !u) {
          console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
          return;
        }
        if (It.checkFramebufferStatus(It.FRAMEBUFFER) === It.FRAMEBUFFER_COMPLETE) {
          if (e >= 0 && e <= t.width - i && n >= 0 && n <= t.height - s) {
            It.readPixels(e, n, i, s, Ct.convert(l), Ct.convert(c), a);
          }
        } else {
          console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.");
        }
      } finally {
        const t = D !== null ? at.get(D).__webglFramebuffer : null;
        it.bindFramebuffer(It.FRAMEBUFFER, t);
      }
    }
  };
  this.copyFramebufferToTexture = function (t, e, n = 0) {
    const r = Math.pow(2, -n);
    const i = Math.floor(e.image.width * r);
    const s = Math.floor(e.image.height * r);
    let a = Ct.convert(e.format);
    if (rt.isWebGL2) {
      if (a === It.RGB) {
        a = It.RGB8;
      }
      if (a === It.RGBA) {
        a = It.RGBA8;
      }
    }
    ot.setTexture2D(e, 0);
    It.copyTexImage2D(It.TEXTURE_2D, n, a, t.x, t.y, i, s, 0);
    it.unbindTexture();
  };
  this.copyTextureToTexture = function (t, e, n, r = 0) {
    const i = e.image.width;
    const s = e.image.height;
    const a = Ct.convert(n.format);
    const o = Ct.convert(n.type);
    ot.setTexture2D(n, 0);
    It.pixelStorei(It.UNPACK_FLIP_Y_WEBGL, n.flipY);
    It.pixelStorei(It.UNPACK_PREMULTIPLY_ALPHA_WEBGL, n.premultiplyAlpha);
    It.pixelStorei(It.UNPACK_ALIGNMENT, n.unpackAlignment);
    if (e.isDataTexture) {
      It.texSubImage2D(It.TEXTURE_2D, r, t.x, t.y, i, s, a, o, e.image.data);
    } else if (e.isCompressedTexture) {
      It.compressedTexSubImage2D(It.TEXTURE_2D, r, t.x, t.y, e.mipmaps[0].width, e.mipmaps[0].height, a, e.mipmaps[0].data);
    } else {
      It.texSubImage2D(It.TEXTURE_2D, r, t.x, t.y, a, o, e.image);
    }
    if (r === 0 && n.generateMipmaps) {
      It.generateMipmap(It.TEXTURE_2D);
    }
    it.unbindTexture();
  };
  this.copyTextureToTexture3D = function (t, e, n, r, i = 0) {
    if (w.isWebGL1Renderer) {
      console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
      return;
    }
    const s = t.max.x - t.min.x + 1;
    const a = t.max.y - t.min.y + 1;
    const o = t.max.z - t.min.z + 1;
    const l = Ct.convert(r.format);
    const c = Ct.convert(r.type);
    let u;
    if (r.isDataTexture3D) {
      ot.setTexture3D(r, 0);
      u = It.TEXTURE_3D;
    } else {
      if (!r.isDataTexture2DArray) {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
        return;
      }
      ot.setTexture2DArray(r, 0);
      u = It.TEXTURE_2D_ARRAY;
    }
    It.pixelStorei(It.UNPACK_FLIP_Y_WEBGL, r.flipY);
    It.pixelStorei(It.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.premultiplyAlpha);
    It.pixelStorei(It.UNPACK_ALIGNMENT, r.unpackAlignment);
    const h = It.getParameter(It.UNPACK_ROW_LENGTH);
    const d = It.getParameter(It.UNPACK_IMAGE_HEIGHT);
    const f = It.getParameter(It.UNPACK_SKIP_PIXELS);
    const p = It.getParameter(It.UNPACK_SKIP_ROWS);
    const m = It.getParameter(It.UNPACK_SKIP_IMAGES);
    const g = n.isCompressedTexture ? n.mipmaps[0] : n.image;
    It.pixelStorei(It.UNPACK_ROW_LENGTH, g.width);
    It.pixelStorei(It.UNPACK_IMAGE_HEIGHT, g.height);
    It.pixelStorei(It.UNPACK_SKIP_PIXELS, t.min.x);
    It.pixelStorei(It.UNPACK_SKIP_ROWS, t.min.y);
    It.pixelStorei(It.UNPACK_SKIP_IMAGES, t.min.z);
    if (n.isDataTexture || n.isDataTexture3D) {
      It.texSubImage3D(u, i, e.x, e.y, e.z, s, a, o, l, c, g.data);
    } else if (n.isCompressedTexture) {
      console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture.");
      It.compressedTexSubImage3D(u, i, e.x, e.y, e.z, s, a, o, l, g.data);
    } else {
      It.texSubImage3D(u, i, e.x, e.y, e.z, s, a, o, l, c, g);
    }
    It.pixelStorei(It.UNPACK_ROW_LENGTH, h);
    It.pixelStorei(It.UNPACK_IMAGE_HEIGHT, d);
    It.pixelStorei(It.UNPACK_SKIP_PIXELS, f);
    It.pixelStorei(It.UNPACK_SKIP_ROWS, p);
    It.pixelStorei(It.UNPACK_SKIP_IMAGES, m);
    if (i === 0 && r.generateMipmaps) {
      It.generateMipmap(u);
    }
    it.unbindTexture();
  };
  this.initTexture = function (t) {
    ot.setTexture2D(t, 0);
    it.unbindTexture();
  };
  this.resetState = function () {
    P = 0;
    C = 0;
    D = null;
    it.reset();
    Dt.reset();
  };
  if (typeof __THREE_DEVTOOLS__ != "undefined") {
    __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
      detail: this
    }));
  }
}