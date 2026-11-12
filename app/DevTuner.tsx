"use client";

import { useEffect } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Any = any;

// Live tuning panel (lil-gui). Active only with `?tune` in the URL, e.g. http://localhost:3000/?tune
// Reads the live WebGL objects from window.__DALA_DEBUG__ (exposed by legacy/2601.cjs when `?tune` or `?logs` is set).
export default function DevTuner() {
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("tune")) return;

    let gui: Any = null;
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | undefined;

    const start = async () => {
      const { default: GUI } = await import("lil-gui");
      if (cancelled) return;

      timer = setInterval(() => {
        const u: Any = (window as Any).__DALA_DEBUG__;
        const gl: Any = u?.WebGL;
        if (!gl?._cones?._loaded || !gl?._frontCones?._loaded || !gl?._composer) return;
        clearInterval(timer);
        if (cancelled) return;
        gui = build(GUI, u, gl);
      }, 300);
    };

    start();
    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
      gui?.destroy();
    };
  }, []);

  return null;
}

const uni = (list: Any[], id: string) => list.find((x) => x.id === id);

function build(GUI: Any, u: Any, gl: Any) {
  const core = gl._cones;
  const fg = gl._frontCones;
  const comp = gl._composer;
  const tune = u.paperTune;
  const grain = gl._layer?._mesh?.material?.uniforms;
  const normalizeFolder = (value: string) => (value === "b" || value === "c" ? value : "a");
  const publishFolder = (value: string) => {
    const next = normalizeFolder(value);
    (window as Any).__DALA_FOLDER_VARIANT__ = next;
    u.folderVariant = next;
    const url = new URL(window.location.href);
    url.searchParams.set("folder", next);
    window.history.replaceState(window.history.state, "", url);
    window.dispatchEvent(new CustomEvent("dala:folder-variant", { detail: next }));
  };

  const coreScale = uni(core._material.customUniforms, "u_scale");
  const coreColor = uni(core._material.customUniforms, "u_colorFactor");
  const attract = uni(core._material.customUniforms, "u_attract");
  const attractDepth = core._depthMaterial?.customUniforms?.u_attract;
  const stageAttract = uni(core._material.customUniforms, "u_stageAttract");
  const stageLift = uni(core._material.customUniforms, "u_stageLift");
  const stageScale = uni(core._material.customUniforms, "u_stageScale");
  const stageMaxOffset = uni(core._material.customUniforms, "u_stageMaxOffset");
  const stageTune: Any = core._stageTune; // JS-side spring rates (grow / return / magnet)
  const fgScale = uni(fg._material.customUniforms, "u_scale");
  const fgAttract = uni(fg._material.customUniforms, "u_attract");
  const fgAttractDepth = fg._depthMaterial?.customUniforms?.u_attract;
  const spring = core._simulationSpring.material.uniforms;
  const bloom = comp._bloomPass;
  const bokeh = comp._bokehPass.uniforms;
  const vig = comp._vignettePass.uniforms;
  const clearHex = "#f6f2e9"; // matches renderer.setClearColor in legacy/2601.cjs (bn.setup)

  const S: Any = {
    exposure: tune.u_pExposure.value,
    contrast: tune.u_pContrast.value,
    saturation: tune.u_pSaturation.value,
    tint: "#ffffff",
    ambient: tune.u_pAmbient.value,
    key: tune.u_pKey.value,
    spec: tune.u_pSpec.value,
    rim: tune.u_pRim.value,
    atlas: tune.u_pAtlas.value,
    coreScale: coreScale.value,
    fgScale: fgScale.value,
    colorFactor: coreColor.value,
    motion: u.documentMotionTarget,
    introDuration: u.introDuration ?? 5.5,
    heroTilt: u.heroTiltUniform?.value ?? 1,
    heroDensity: u.heroDensityUniform?.value ?? 0.38,
    exFloat: u.exFloatUniform?.value ?? 1,
    spring: spring.u_spring.value,
    friction: spring.u_friction.value,
    attract: attract?.value ?? 0,
    stageAttract: stageAttract?.value ?? 0,
    stageLift: stageLift?.value ?? 0,
    stageScale: stageScale?.value ?? 0,
    stageGrow: stageTune?.growGain ?? 0.14,
    stageFollow: stageTune?.followStiffness ?? 0.14,
    stageFriction: stageTune?.followDamping ?? 0.65,
    stageOffset: stageTune?.maxOffset ?? 12,
    stageReturn: stageTune?.returnGain ?? 0.18,
    bloomStrength: bloom.strength,
    bloomThreshold: bloom.threshold,
    bloomRadius: bloom.radius,
    blur: bokeh.maxblur.value,
    vigOffset: vig.offset.value,
    vigDark: vig.darkness.value,
    background: clearHex,
    grainAlpha: grain?.u_alpha.value ?? 0,
    grainBright: grain?.u_bright.value ?? 0,
    folderVariant: normalizeFolder((window as Any).__DALA_FOLDER_VARIANT__ ?? u.folderVariant ?? "a"),
  };
  const defaults = JSON.parse(JSON.stringify(S));

  const gui = new GUI({ title: "Dala · live tuning", width: 300 });
  gui.domElement.style.zIndex = "99999";

  const setDepth = (obj: Any, id: string, v: number) => {
    const d = obj._depthMaterial?.customUniforms?.[id];
    if (d) d.value = v;
  };

  const paper = gui.addFolder("Папір і світло");
  paper.add(S, "exposure", 0.4, 1.8, 0.01).name("Експозиція").onChange((v: number) => (tune.u_pExposure.value = v));
  paper.add(S, "contrast", 0.5, 1.8, 0.01).name("Контраст").onChange((v: number) => (tune.u_pContrast.value = v));
  paper.add(S, "saturation", 0, 2, 0.01).name("Насиченість").onChange((v: number) => (tune.u_pSaturation.value = v));
  paper.addColor(S, "tint").name("Відтінок").onChange((v: string) => {
    const n = parseInt(v.slice(1), 16);
    tune.u_pTint.value.set(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
  });
  paper.add(S, "ambient", 0, 1.6, 0.01).name("Заповнюче світло").onChange((v: number) => (tune.u_pAmbient.value = v));
  paper.add(S, "key", 0, 3, 0.01).name("Основне світло").onChange((v: number) => (tune.u_pKey.value = v));
  paper.add(S, "spec", 0, 6, 0.05).name("Блиск").onChange((v: number) => (tune.u_pSpec.value = v));
  paper.add(S, "rim", 0, 6, 0.05).name("Контур по краю").onChange((v: number) => (tune.u_pRim.value = v));
  paper.add(S, "atlas", 0, 1, 0.01).name("Видимість друку").onChange((v: number) => (tune.u_pAtlas.value = v));

  const parts = gui.addFolder("Листки і рух");
  parts.add(S, "coreScale", 0.5, 4, 0.01).name("Розмір дрібних").onChange((v: number) => {
    coreScale.value = v;
    setDepth(core, "u_scale", v);
  });
  parts.add(S, "fgScale", 0.2, 4, 0.01).name("Розмір великих").onChange((v: number) => {
    fgScale.value = v;
    const d = fg._depthMaterial?.customUniforms?.u_scale;
    if (d) d.value = v;
  });
  parts.add(S, "colorFactor", 0.4, 1.6, 0.01).name("Яскравість дрібних").onChange((v: number) => (coreColor.value = v));
  parts.add(S, "motion", 0, 2, 0.01).name("Живість руху").onChange((v: number) => (u.documentMotionTarget = v));
  parts.add(S, "spring", 0.001, 0.03, 0.0005).name("Пружність").onChange((v: number) => (spring.u_spring.value = v));
  parts.add(S, "friction", 0.7, 0.98, 0.001).name("Тертя (гасіння)").onChange((v: number) => (spring.u_friction.value = v));
  parts.add(S, "attract", 0, 1.2, 0.005).name("Магніт до миші (hero)").onChange((v: number) => {
    if (attract) attract.value = v;
    if (attractDepth) attractDepth.value = v;
    if (fgAttract) fgAttract.value = v;
    if (fgAttractDepth) fgAttractDepth.value = v;
  });
  parts
    .add(S, "heroTilt", 0, 2, 0.01)
    .name("3D-нахил документів (hero)")
    .onChange((v: number) => {
      if (u.heroTiltUniform) u.heroTiltUniform.value = v;
    });
  parts
    .add(S, "heroDensity", 0.1, 1, 0.01)
    .name("Кількість документів (hero)")
    .onChange((v: number) => {
      if (u.heroDensityUniform) u.heroDensityUniform.value = v;
    });
  parts
    .add(S, "exFloat", 0, 2, 0.01)
    .name("Рух після розльоту")
    .onChange((v: number) => {
      if (u.exFloatUniform) u.exFloatUniform.value = v;
    });
  parts.add(S, "stageAttract", 0, 1.2, 0.005).name("Магніт блока документа").onChange((v: number) => {
    if (stageAttract) stageAttract.value = v;
  });
  parts.add(S, "stageLift", 0, 2, 0.01).name("Підйом блока документа").onChange((v: number) => {
    if (stageLift) stageLift.value = v;
  });
  parts.add(S, "stageScale", 0, 0.2, 0.005).name("Збільшення блока").onChange((v: number) => {
    if (stageScale) stageScale.value = v;
  });
  parts.add(S, "stageGrow", 0.02, 0.2, 0.005).name("Швидкість збільшення").onChange((v: number) => {
    if (stageTune) stageTune.growGain = v;
  });
  parts.add(S, "stageFollow", 0.02, 0.2, 0.005).name("Пружність магніту").onChange((v: number) => {
    if (stageTune) stageTune.followStiffness = v;
  });
  parts.add(S, "stageFriction", 0.6, 0.95, 0.005).name("Тертя магніту").onChange((v: number) => {
    if (stageTune) stageTune.followDamping = v;
  });
  parts.add(S, "stageOffset", 0, 30, 1).name("Макс. зсув блока (px)").onChange((v: number) => {
    if (stageTune) stageTune.maxOffset = v;
    if (stageMaxOffset) stageMaxOffset.value = v;
  });
  parts.add(S, "stageReturn", 0.02, 0.2, 0.005).name("Швидкість повернення").onChange((v: number) => {
    if (stageTune) stageTune.returnGain = v;
  });

  const post = gui.addFolder("Світіння і розмиття");
  post.add(S, "bloomStrength", 0, 1.5, 0.01).name("Bloom сила").onChange((v: number) => (bloom.strength = v));
  post.add(S, "bloomThreshold", 0, 1, 0.01).name("Bloom поріг").onChange((v: number) => (bloom.threshold = v));
  post.add(S, "bloomRadius", 0, 1.5, 0.01).name("Bloom радіус").onChange((v: number) => (bloom.radius = v));
  post.add(S, "blur", 0, 10, 0.1).name("Розмиття глибини").onChange((v: number) => (bokeh.maxblur.value = v));
  post.add(S, "vigOffset", 0, 1.5, 0.01).name("Віньєтка зсув").onChange((v: number) => (vig.offset.value = v));
  post.add(S, "vigDark", 0, 1, 0.01).name("Віньєтка темрява").onChange((v: number) => (vig.darkness.value = v));

  const bg = gui.addFolder("Фон");
  bg.addColor(S, "background").name("Колір фону").onChange((v: string) => gl.renderer.setClearColor(parseInt(v.slice(1), 16), 1));
  if (grain) {
    bg.add(S, "grainAlpha", 0, 0.6, 0.005).name("Зерно: прозорість").onChange((v: number) => (grain.u_alpha.value = v));
    bg.add(S, "grainBright", 0, 0.3, 0.001).name("Зерно: яскравість").onChange((v: number) => (grain.u_bright.value = v));
  }

  const finale = gui.addFolder("Фінал папки");
  const folderController = finale
    .add(S, "folderVariant", { "A · Переворот": "a", "B · Розліт": "b", "C · Під’їзд": "c" })
    .name("Варіант")
    .onChange((value: string) => publishFolder(value));
  const onFolderVariant = (event: Event) => {
    S.folderVariant = normalizeFolder((event as CustomEvent<string>).detail);
    folderController.updateDisplay();
  };
  window.addEventListener("dala:folder-variant", onFolderVariant);

  const tools = gui.addFolder("Інструменти");
  tools
    .add(
      {
        replayIntro: () => (window as Any).__DALA_REPLAY_INTRO__?.(),
      },
      "replayIntro",
    )
    .name("Повторити вхід документів");
  tools
    .add(S, "introDuration", 2, 10, 0.1)
    .name("Тривалість входу, с")
    .onChange((v: number) => (u.introDuration = v));
  tools
    .add(
      {
        copy: () => {
          const json = JSON.stringify(S, null, 2);
          navigator.clipboard?.writeText(json);
          console.log("[tuner] values\n" + json);
        },
      },
      "copy",
    )
    .name("Скопіювати значення (JSON)");
  tools
    .add(
      {
        reset: () => {
          gui.controllersRecursive().forEach((c: Any) => {
            if (c.property in defaults) c.setValue(defaults[c.property]);
          });
        },
      },
      "reset",
    )
    .name("Скинути до початкових");

  const destroy = gui.destroy.bind(gui);
  gui.destroy = () => {
    window.removeEventListener("dala:folder-variant", onFolderVariant);
    destroy();
  };
  return gui;
}
