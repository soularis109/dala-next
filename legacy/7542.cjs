(function (t) {
  "use strict";

  function n(e) {
    var t = {
      browser: {
        fullName: "",
        name: "",
        version: "",
        majorVersion: null,
        minorVersion: null,
        patchVersion: null,
        engine: ""
      },
      os: {
        fullName: "",
        name: "",
        version: "",
        versionName: "",
        versionAltNames: [],
        majorVersion: null,
        minorVersion: null,
        patchVersion: null
      },
      features: {
        bw: false,
        mobile: false,
        tv: false,
        proxy: false
      }
    };
    var n = {
      browser: [{
        test: ["SailfishBrowser"],
        browser: {
          fullName: "Sailfish Browser",
          name: "sailfishbrowser",
          engine: "gecko",
          $version: {
            search: "SailfishBrowser/"
          }
        },
        features: {
          mobile: true
        }
      }, {
        test: ["Edge/"],
        browser: {
          fullName: "Edge",
          name: "edge",
          engine: "edgehtml",
          $version: {
            search: "Edge/"
          }
        }
      }, {
        test: ["Edg/"],
        browser: {
          fullName: "Edge",
          name: "edge",
          engine: "webkit",
          $version: {
            search: "Edg/"
          }
        }
      }, {
        test: ["MSIE"],
        browser: {
          fullName: "Internet Explorer",
          name: "ie",
          engine: "trident",
          $version: {
            search: "MSIE "
          }
        }
      }, {
        test: ["Trident"],
        browser: {
          fullName: "Internet Explorer",
          name: "ie",
          engine: "trident",
          $version: {
            search: "rv:"
          }
        }
      }, {
        test: ["OPR/"],
        browser: {
          fullName: "Opera",
          name: "opera",
          engine: "webkit",
          $version: {
            search: "OPR/"
          }
        }
      }, {
        test: ["UCBrowser"],
        browser: {
          fullName: "UC Browser",
          name: "ucbrowser",
          engine: "webkit",
          $version: {
            search: "UCBrowser/"
          }
        }
      }, {
        test: ["YaBrowser"],
        browser: {
          fullName: "Yandex Browser",
          name: "yabrowser",
          engine: "webkit",
          $version: {
            search: "YaBrowser/"
          }
        }
      }, {
        test: ["Chrome"],
        browser: {
          fullName: "Chrome",
          name: "chrome",
          engine: "webkit",
          $version: {
            search: "Chrome/"
          }
        }
      }, {
        test: ["Firefox"],
        browser: {
          fullName: "Firefox",
          name: "firefox",
          engine: "gecko",
          $version: {
            search: "Firefox/"
          }
        }
      }, {
        test: ["NokiaBrowser"],
        browser: {
          fullName: "Nokia Browser",
          name: "nokiabrowser",
          engine: "webkit",
          $version: {
            search: "NokiaBrowser/"
          }
        },
        features: {
          mobile: true
        }
      }, {
        test: ["Opera Mini", "Presto"],
        browser: {
          fullName: "Opera Mini",
          name: "operamini",
          engine: "presto",
          $version: {
            search: "Version/"
          }
        },
        features: {
          mobile: true,
          proxy: true
        }
      }, {
        test: ["Opera Mini", "WebKit"],
        browser: {
          fullName: "Opera Mini",
          name: "operamini",
          engine: "webkit"
        },
        features: {
          mobile: true,
          proxy: true
        }
      }, {
        test: ["Opera"],
        browser: {
          fullName: "Opera",
          name: "opera",
          engine: "presto",
          $version: {
            search: "Version/"
          }
        }
      }, {
        test: ["OviBrowser"],
        browser: {
          fullName: "Ovi Browser",
          name: "ovi",
          engine: "gecko",
          $version: {
            search: "OviBrowser/"
          }
        },
        features: {
          mobile: true,
          proxy: true
        }
      }, {
        test: ["CriOS/"],
        browser: {
          fullName: "Chrome",
          name: "chrome",
          engine: "webkit",
          $version: {
            search: "CriOS/"
          }
        }
      }, {
        test: ["Coast/"],
        browser: {
          fullName: "Opera Coast",
          name: "coast",
          engine: "webkit",
          $version: {
            search: "Coast/"
          }
        }
      }, {
        test: ["Safari", "Version/", /(iPhone|iPod|iPad|Macintosh|Windows)/],
        browser: {
          fullName: "Safari",
          name: "safari",
          engine: "webkit",
          $version: {
            search: "Version/"
          }
        }
      }, {
        test: ["WebKit"],
        browser: {
          engine: "webkit"
        }
      }, {
        test: ["Gecko/"],
        browser: {
          engine: "gecko"
        }
      }],
      os: [{
        test: ["Sailfish"],
        os: {
          fullName: "Sailfish OS",
          name: "sailfish"
        },
        features: {
          mobile: true
        }
      }, {
        test: ["Windows Phone"],
        os: {
          fullName: "Windows Phone",
          name: "winphone",
          $version: {
            search: "Windows Phone "
          }
        },
        features: {
          mobile: true
        }
      }, {
        test: ["Windows"],
        os: {
          fullName: "Windows",
          name: "win",
          $version: {
            search: "Windows NT ",
            names: {
              "10.0": "10",
              6.3: "8.1",
              6.2: "8",
              6.1: "7",
              "6.0": "Vista",
              5.2: "XP",
              5.1: "XP",
              5.01: "2000",
              "5.0": "2000"
            },
            altNames: {
              5.2: ["Server 2003"]
            }
          }
        }
      }, {
        test: ["Macintosh", "OS X"],
        os: {
          fullName: "macOS",
          name: "osx",
          $version: {
            search: /OS X /,
            names: {
              10.6: "Snow Leopard",
              10.7: "Lion",
              10.8: "Mountain Lion",
              10.9: "Mavericks",
              "10.10": "Yosemite",
              10.11: "El Capitan",
              10.12: "Sierra",
              10.13: "High Sierra",
              10.14: "Mojave",
              10.15: "Catalina",
              "11.0": "Big Sur"
            }
          }
        }
      }, {
        test: ["Ubuntu"],
        os: {
          fullName: "Ubuntu",
          name: "ubuntu"
        }
      }, {
        test: ["Fedora"],
        os: {
          fullName: "Fedora",
          name: "fedora",
          $version: {
            search: "Fedora/",
            names: {
              20: "Heisenbug",
              19: "Schrödinger's Cat",
              18: "Spherical Cow",
              17: "Beefy Miracle",
              16: "Verne",
              15: "Lovelock",
              14: "Laughlin",
              13: "Goddard",
              12: "Constantine",
              11: "Leonidas",
              10: "Cambridge",
              9: "Sulphur",
              8: "Werewolf",
              7: "Moonshine"
            }
          }
        }
      }, {
        test: ["Kindle"],
        os: {
          fullName: "Kindle",
          name: "kindle",
          $version: {
            search: "Kindle/"
          }
        },
        features: {
          bw: true,
          mobile: true
        }
      }, {
        test: [/(BlackBerry|BB\d+)/],
        os: {
          fullName: "BlackBerry",
          name: "blackberry",
          $version: {
            search: "Version/"
          }
        },
        features: {
          mobile: true
        }
      }, {
        test: ["Symbian"],
        os: {
          fullName: "Symbian",
          name: "symbian"
        },
        features: {
          mobile: true
        }
      }, {
        test: ["Series40"],
        os: {
          fullName: "Symbian",
          name: "symbian"
        },
        features: {
          mobile: true
        }
      }, {
        test: ["PlayStation Vita"],
        os: {
          fullName: "PlayStation Vita",
          name: "psvita"
        },
        features: {
          mobile: true
        }
      }, {
        test: [/playstation/i],
        os: {
          fullName: "PlayStation",
          name: "playstation",
          $version: {
            search: /playstation\s/i
          }
        },
        features: {
          tv: true
        }
      }, {
        test: ["Nintendo DSi"],
        os: {
          fullName: "Nintendo DSi",
          name: "dsi"
        },
        features: {
          mobile: true
        }
      }, {
        test: ["New Nintendo 3DS"],
        os: {
          fullName: "New Nintendo 3DS",
          name: "n3ds"
        },
        browser: {
          engine: "webkit"
        },
        features: {
          mobile: true
        }
      }, {
        test: ["Nintendo 3DS"],
        os: {
          fullName: "Nintendo 3DS",
          name: "3ds"
        },
        browser: {
          engine: "webkit"
        },
        features: {
          mobile: true
        }
      }, {
        test: ["Viera"],
        os: {
          fullName: "Viera",
          name: "viera"
        },
        browser: {
          engine: "webkit"
        },
        features: {
          tv: true
        }
      }, {
        test: ["SonyDTV"],
        features: {
          tv: true
        }
      }, {
        test: ["Android"],
        os: {
          fullName: "Android",
          name: "android",
          $version: {
            search: "Android "
          }
        },
        features: {
          mobile: true
        }
      }, {
        test: [/iPhone|iPod|iPad/],
        os: {
          fullName: "iOS",
          name: "ios",
          $version: {
            search: "OS "
          }
        },
        features: {
          mobile: true
        }
      }],
      features: [{
        test: [/mobile/i],
        features: {
          mobile: true
        }
      }, {
        test: [/smart-{0,1}tv/i],
        features: {
          tv: true
        }
      }]
    };
    if (!e) {
      return t;
    }
    function i(t) {
      for (var n = 0; n < t.length; n++) {
        var i = true;
        for (var o = 0; o < t[n].test.length; o++) {
          if (t[n].test[o] instanceof RegExp) {
            if (!t[n].test[o].test(e)) {
              i = false;
              break;
            }
          } else if (e.indexOf(t[n].test[o]) == -1) {
            i = false;
            break;
          }
        }
        if (i) {
          r(t[n]);
          break;
        }
      }
    }
    function r(e) {
      for (var i in n) {
        if (n.hasOwnProperty(i) && e[i]) {
          if (e[i].$version) {
            var r = o(e[i].$version.search);
            if (r) {
              var s = r.split(".");
              var a = e[i].$version.names;
              var l = e[i].$version.altNames;
              e[i].version = r;
              if (s[0]) {
                e[i].majorVersion = parseInt(s[0]);
              }
              if (s[1]) {
                e[i].minorVersion = parseInt(s[1]);
              }
              if (s[2]) {
                e[i].patchVersion = parseInt(s[2]);
              }
              if (a) {
                var u;
                var c = [];
                for (var h = 0; h < s.length; h++) {
                  c.push(s[h]);
                  if (a[u = c.join(".")]) {
                    e[i].versionName = a[u];
                  }
                  if (l && l[u]) {
                    e[i].versionAltNames = l[u];
                  }
                }
              }
            }
          }
          for (var d in e[i]) {
            if (e[i].hasOwnProperty(d) && d[0] !== "$") {
              t[i][d] = e[i][d];
            }
          }
        }
      }
    }
    function o(t) {
      var n;
      if (t instanceof RegExp) {
        if (!(n = (e.match(t) || [])[0])) {
          return;
        }
      } else {
        n = t;
      }
      var i = e.indexOf(n);
      if (i != -1) {
        var r = e.substring(i + n.length);
        var o = /^(\d+(\.|_)){0,2}\d+/.exec(r);
        if (o) {
          return o[0].replace(/_/g, ".");
        }
      }
    }
    (function () {
      for (var e in n) {
        i(n[e]);
      }
    })();
    return t;
  }
  if (module.exports) {
    module.exports = n;
  } else {
    t.Sniffer = n;
  }
})(this);