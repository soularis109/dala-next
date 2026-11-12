# Dala document animation — handoff for Claude

Updated: 2026-11-10

## Current implementation update — 2026-11-10

This block supersedes older status/timeline notes below; the historical sections are retained for context. The detailed source of truth is [`docs/animation-scenario.md`](docs/animation-scenario.md).

- The approved visible word is English **`VISA`**, not Cyrillic. `scripts/generate-document-particles.mjs` builds its deterministic 100×100 color texture from geometric V/I/S/A glyphs on the visible 40×40 grid; the result is `public/images/document-visa-colors.png`.
- `legacy/2601.cjs` now has one shared `Folder` scene graph built from instanced copies of the same `document-core.glb` mini-document geometry as the main formations. The frame, pocket, tab and hinged cover use shared navy/champagne/ivory batches and one lightweight procedural paper shader; there are no large solid folder planes. Explicit render order keeps the frame behind the `VISA` particles and the opening cover in front.
- Finale variants are previews only: A flips, B adds a local particle burst, C slides in. They share the same final frame at `sectionProgress = 6`. No variant has been chosen as production default.
- Variant state is synchronized through `?folder=a|b|c`, `window.__DALA_FOLDER_VARIANT__`, the `dala:folder-variant` event, `app/components/FolderVariantToggle.tsx`, and the folder dropdown in `app/DevTuner.tsx`.
- Footer copy is moved into a right desktop column (`footer__head--visa`), leaving the open folder and `VISA` composition on the left. `app/page.tsx` contains English placeholder copy for `Document flows` and `Processing`; the client still needs to provide final copy.
- Mobile uses a smaller, raised finale with simplified C-style folder motion, no mouse attraction and a simplified stamp. `prefers-reduced-motion` disables attraction/flutter, suppresses strong explosion/bounce, and uses stable crossfades/opening.
- Default bokeh `maxblur` was reduced from `2.4` to `1.25` for clearer paper edges without raising DPR or adding texture cost.
- Browser QA completed in headless Chrome with software WebGL at desktop finale, A/B/C midpoint, mobile finale and forced reduced motion. All reported `gl.getError() = 0`. Known unrelated console noise remains: missing favicon/manifest resources and SwiftShader `ReadPixels` warnings.
- Remaining external decisions: choose A/B/C, provide final copy, then repeat release QA on physical Safari/iOS/Android devices.

## User goal

The original WebGL hero was a brain made from thousands of pyramid/triangle instances. It has been replaced with a large document assembled from thousands of small paper documents.

The current direction is:

- keep the original scroll choreography and spring-based flow;
- begin with scattered documents;
- assemble them into a large document during the first scroll;
- continue through the original later animation states;
- use a warm light site theme;
- make the individual document particles increasingly realistic without sacrificing performance.

The user likes the current direction and wants the next phase to focus on the quality and realism of the individual mini-documents.

## Repository constraints

- Read `AGENTS.md` before changing code.
- This repository uses a version of Next.js with potentially breaking differences. Read the relevant local documentation from `node_modules/next/dist/docs/` before editing Next.js code.
- Preserve the current dirty working tree. All currently modified and untracked files listed below are intentional work for this feature.
- Do not reset, delete, or replace unrelated changes.
- The main WebGL implementation is a legacy compiled bundle in `legacy/2601.cjs`, not a clean TypeScript Three.js module.

## Current working tree

Intentional changes currently include:

- `app/layout.tsx`
- `legacy/2601.cjs`
- `package.json`
- `public/css/light-theme.css`
- `public/images/document-colors.png`
- `public/images/document-positions.exr`
- `public/images/document-scales.png`
- `public/models/document-core.glb`
- `scripts/generate-document-particles.mjs`
- this handoff file

No commit has been created.

## Architecture discovered

### Legacy animation

The main hero animation lives in `legacy/2601.cjs`.

The original brain used:

- 10,000 instanced pyramids on desktop;
- 7,000 instances on mobile;
- four 100×100 position banks packed into a 200×200 EXR texture;
- an FBO spring simulation to morph between position banks;
- separate textures for scale and color;
- 250 independent foreground pyramids;
- scroll-driven `sectionProgress` controlling position, rotation, explosion and morph progress.

The original shape itself was not stored in a GLB. The GLB supplied the geometry for each repeated particle; the brain formations came from the position texture.

### Current document system

The new system retains the original GPU/FBO/spring architecture but replaces the pyramid geometry and formation textures.

Current render counts (the FBO still simulates all 10,000 points):

- desktop core: 5,200 sampled document instances;
- mobile core: 3,000 sampled document instances;
- desktop foreground: 28 high-detail documents;
- mobile foreground: 12 high-detail documents.

Core uses `public/models/document-core.glb`; foreground uses `public/models/document-near.glb`.

## Generated assets

`scripts/generate-document-particles.mjs` deterministically creates:

- `public/models/document-core.glb`
- `public/images/document-positions.exr`
- `public/images/document-scales.png`
- `public/images/document-colors.png`

Regenerate them with:

```bash
npm run assets:documents
```

The generator requires `ffmpeg` to convert a temporary PFM float image into EXR.

Important: the bundled legacy EXR decoder only supports uncompressed scanlines. Do not enable ZIP compression. A compressed EXR previously caused this runtime error:

```text
Uncaught Error: invalid zlib data
```

### Current mini-document geometry

The generated GLB is a very lightweight document particle:

- approximately 17 triangles;
- front and back faces;
- visible paper thickness;
- cut top-right corner;
- small raised folded corner;
- UV coordinates for procedural surface detail.

This is intentionally still lightweight. It is not yet the final realistic LOD model.

## Formation texture layout

The 200×200 position texture contains four 100×100 banks:

| Bank | Quadrant | Meaning |
|---|---|---|
| 0 | top-left | scattered documents |
| 1 | top-right | resolved large document |
| 2 | bottom-left | five document streams |
| 3 | bottom-right | final organic document |

The animation reuses bank 0 so the visible state sequence can contain five stages while only storing four banks:

```text
0: scattered bank 0
1: resolved bank 1
2: scattered bank 0 again
3: stream bank 2
4: organic final bank 3
```

This mapping is implemented in the position, scale and color shader paths. Do not replace it with the old monotonic `0 → 1 → 2 → 3` mixing without also changing the intended flow.

> **Update 2026-11-10 (step 3):** this repeated-bank mapping was replaced by a monotonic `0 → 1 → 2 → 3` mapping (bank 0 hero band → bank 1 form document → bank 2 streams → bank 3 flat lying document; `u_progress` goes 0..3). See `docs/animation-scenario.md`, section 5.

## Scroll choreography

The current sequence is:

1. Initial hero: scattered mini-documents.
2. First scroll: documents assemble into one large page.
3. The page then begins the original movement and rotation.
4. Later it scatters again.
5. It becomes five flowing streams.
6. It resolves into the final organic page formation.

Current desktop timing in `sectionProgress`:

- intro assembly: `0.0 → 0.58`;
- initial translation and rotation begin at `0.62` and finish around `1.15`;
- later scatter: `2.7 → 3.0`;
- streams: `3.3 → 3.5`;
- final resolve: `5.7 → 6.0`.

Mobile uses the same intro timing and a slightly shorter final resolve (`5.7 → 5.8`).

The intro uses a quintic easing curve, individual per-particle delays, a small tangent/arc offset and the existing spring simulation. This produces:

```text
slow chaotic movement
→ accelerated curved attraction
→ overshoot/inertia
→ magnetic-looking final settle
```

The initial scattered radius was reduced by roughly 13% after visual testing so the cloud competes less with the hero headline.

## Surface detail already added

Both core and foreground document shaders now render procedural paper details:

- darkened paper edges;
- title line;
- five body lines;
- circular marker/bullet;
- folded-corner shading;
- subtle paper-fiber variation;
- darker ink color;
- front/back face gating using the local normal so side faces do not receive the printed layout.

The individual documents also have a restrained paper flutter instead of the original full pyramid tumble.

## Current palette

The generated asset palette was adjusted for a light background:

- medium warm gray paper;
- lighter warm paper;
- lavender;
- saturated purple;
- ochre yellow;
- deep green;
- dark ink.

Colors are intentionally darker than the previous black-background version so the particles remain visible on warm white.

## Light theme

The original site assumed a black background in both CSS and WebGL. The light conversion therefore touches both systems.

### CSS

`public/css/light-theme.css` is loaded after the legacy `/css/style.css` from `app/layout.tsx`.

The light theme covers:

- warm background `#f4f1ea`;
- dark typography;
- navigation and header blur/glass;
- logo paths;
- buttons and hover colors;
- manifesto and team links;
- team portraits;
- social icons;
- footer borders and text;
- cookie notice;
- loader and navigation transition screens;
- scrollbar;
- mobile blur treatment.

Important stacking detail: do not set an opaque background directly on `html`. The fixed canvas is inside a negative z-index wrapper, and an explicit `html` background hid the WebGL output during testing. The background is currently applied to `body`, as in the original architecture.

### WebGL background and post-processing

The WebGL side now uses:

- renderer clear color `0xf4f1ea`;
- a warm paper-colored grain layer instead of black;
- lower grain brightness;
- bloom threshold `0.72`, strength `0.16`, radius `0.35`;
- a subtle light-theme vignette with offset `0.55` and darkness `0.12`.

The theme metadata and browser tile color in `app/layout.tsx` were also changed to `#f4f1ea`.

## Metadata

The Open Graph/Twitter alt text now describes a large 3D document assembled from thousands of small paper documents rather than a brain made of pyramids.

## Legacy shader editing warning

`legacy/2601.cjs` contains large GLSL strings embedded in JavaScript. Several changes are applied through exact runtime string `.replace(...)` calls.

When changing these:

- verify that the source substring still matches exactly;
- run `node --check legacy/2601.cjs`;
- visually test WebGL in a real browser;
- do not assume a successful Next.js compilation means GLSL compiled successfully;
- test both the first frame and a later scroll state.

## Visual QA already performed

Headless Chrome with software WebGL was used to inspect:

- the initial scattered hero;
- the assembly transition;
- later scroll states;
- the light background;
- header/navigation contrast;
- procedural document details on nearby foreground documents.

The final checked hero successfully displays:

- warm light background;
- dark readable headline;
- visible scattered document cloud;
- colored paper particles with printed details;
- detailed close foreground sheets;
- the existing depth-of-field effect.

An intermediate issue where the WebGL canvas disappeared was fixed by removing the explicit `html` background. It was a CSS stacking issue, not a shader compilation issue.

## Validation status

The following currently pass:

```bash
npm run assets:documents
node --check legacy/2601.cjs
node --check scripts/generate-document-particles.mjs
git diff --check
npm run lint
```

`npm run lint` reports zero errors and two pre-existing warnings about `<img>` usage in:

- `app/components/sections/Investors.tsx`
- `app/components/sections/TeamSlider.tsx`

`npm run build` passed after the first document implementation. The most recent light-theme and extra-detail changes were validated with lint, syntax checks and browser/WebGL QA; run a fresh production build before final delivery.

There are longstanding runtime warnings about `BufferGeometry.computeBoundingSphere()` receiving NaN values for the fullscreen/FBO geometry and warnings about `customUniforms` not being a native MeshBasicMaterial property. These existed in the legacy architecture and have not blocked rendering.

## Next requested phase: realistic individual documents

The user specifically wants the individual polygon/document items to become high-quality and realistic.

Do not make all 10,000 particles equally heavy. The recommended solution is a three-level LOD system.

| Layer | Suggested count | Suggested geometry | Purpose |
|---|---:|---:|---|
| Far | 7,500–8,000 | 4–8 triangles | Aggregate mass and silhouette |
| Mid | 1,700–2,200 | 30–50 triangles | Individually visible formation documents |
| Near | 150–300 | 100–160 triangles | Realistic hero/foreground documents |

This can keep the total triangle budget near or below the current implementation while concentrating detail where it is actually visible.

### Proposed realistic geometry

For mid and near documents:

- real paper thickness;
- micro bevel on edges;
- subdivided front surface;
- subtle vertex-shader curvature;
- configurable dog-ear corner;
- slightly uneven silhouette;
- warm front and cooler back surfaces;
- several proportions such as A4, report, note and card;
- optional small curl or bend driven per instance.

### Proposed texture atlas

Create a 2048×2048 atlas with approximately 16 document templates, for example:

- paragraph page;
- checklist;
- table;
- chart;
- report title;
- signature page;
- stamp;
- highlighted block;
- memo;
- short note;
- diagram;
- form.

Use believable pseudo-typography rather than readable generated words. At this scale, typographic rhythm matters more than literal text.

Per-instance variation should include:

- atlas template index;
- paper tint;
- ink intensity;
- width/height ratio;
- roughness;
- bend amount;
- fold side and fold amount;
- small edge deformation;
- front/back variation.

Pack normal, roughness and ambient occlusion data to minimize texture fetches. KTX2 or another GPU-friendly compressed format may be considered if it works with the legacy loader.

### Proposed physically inspired paper shading

The current material is derived from `MeshBasicMaterial`, so it uses custom fake shading. For greater realism, either carefully upgrade the near/mid layers to a PBR material or add a lightweight physically inspired custom model:

- high roughness around `0.78–0.94`;
- weak specular response;
- paper fiber normal detail;
- ambient occlusion near folds and edges;
- soft top-left key light;
- cooler fill/shadow;
- restrained backlighting/translucency;
- folded-corner contact shadow.

Avoid enabling expensive real-time shadows for all particles. Prefer baked/faked fold AO and shader-based contact shading.

### Proposed motion realism

The largest realism improvement after geometry will come from orientation and deformation:

- random pitch/yaw/roll in the scattered state;
- align the paper long axis with flight velocity;
- subtle air resistance and flutter;
- mass variation by document size;
- gradually align all documents to the large page plane;
- slight overshoot before settling;
- reduce flutter as assembly completes;
- align stream documents with the direction of each stream.

The desired motion is:

```text
3D tumble
→ velocity alignment
→ page-plane alignment
→ small overshoot
→ spring return
→ flutter damping
```

### Recommended implementation order

1. Build and approve the high-detail near model first.
2. Create 12–16 atlas templates and packed surface maps.
3. Apply them to the existing 180 desktop / 48 mobile foreground documents.
4. Add realistic curvature, paper shading and 3D orientation.
5. Split the main 10,000-instance core into far, mid and near instanced meshes that share the same simulation texture.
6. Assign different geometry/material quality to each layer.
7. Profile desktop and mobile separately.
8. Preserve the existing position banks, scroll timings and flow unless the user explicitly requests a choreography change.

## Practical next step

Start with a visual prototype containing 12–20 close documents using the final near geometry and material. Once one close sheet looks convincingly like paper in the current light scene, scale that approved look to the 180 foreground documents, then introduce the mid/far LOD split.

This avoids spending time optimizing thousands of instances before the art direction of one realistic document is approved.

## Update 2026-11-06: detailed document objects (historical base, phase 2 overrides counts/material)

Only the particle objects changed; choreography, timings, counts, formation textures and theme are untouched (formation EXR/PNG regenerate byte-identical).

- Generator now writes two LODs from one silhouette/UV layout:
  - `public/models/document-core.glb` — 80 triangles (currently rendered as a distributed 5,200/3,000 sample of a 10k simulation);
  - `public/models/document-near.glb` — 944 triangles (currently 28/12 foreground), loaded as asset id `documentNear`.
  - Both: smooth-normal curved sheet, real thickness, edge walls (near: micro bevel + slightly uneven silhouette), real folded dog-ear flap.
- UV flags: `uv.x + 2` = back side of paper, `uv.y + 2` = folded flap.
- Shared GLSL in `legacy/2601.cjs` (`paperVertexDecl`, `paperVertexShape`, `paperFragmentDecl`, `paperFragmentSurface`):
  - per-instance seed from `a_angle`: aspect (A4/report/note/card), static bend and twist;
  - 8 procedural templates (paragraph page, checklist, table, chart, report header, signature + stamp, form, memo with highlighter) with pseudo-typography;
  - paper fibre noise, warm front / cool back, show-through, edge AO, dog-ear contact shadow and crease AO;
  - view-space normal (`v_paperNormal`) with wrap-diffuse key light, cool fill, soft specular, rim and back translucency.
  - core uses detail 0.35 / ink 0.5, foreground detail 1.0 / ink 0.9.

## Анатомія анімації — по шматках, для власної реалізації (2026-11-09)

Мета розділу: розкласти поточну анімацію на незалежні «слоти», щоб замінити дизайн і частину поведінки своїми. Код не змінювався. Номери рядків — для `legacy/2601.cjs` станом на 2026-11-09.

### 1. Загальний конвеєр (кадр за кадром)
```
scroll (ASScroll) → sectionProgress (0..6.x)
  → JS-криві (map+clamp) → цільові значення uniforms
  → lerp-згладжування (easing 0.1 / 0.075)
  → GPU FBO-симуляція: spring-шейдер (швидкість) → pos-шейдер (позиція), 200×200 ping-pong
  → InstancedMesh (5,200/3,000 distributed samples) читає позицію з повної 10k FBO + scale/color з текстур
  → + foreground-шар (28/12 high-detail) + grain-шар
  → composer: RenderPass → RenderPass(DOM-сцена) → Bloom → Bokeh(DoF, лише desktop) → Vignette
```
Посилання: `bn` (сцена/рендер, 2601.cjs:5324), `an` (core, :4074), `Ht` (foreground, :3721), `yn` (grain, :5226), `gn` (composer, :5120), `wn` (секції, :5562).

### 2. Шматки (кожен — окремий «слот», який можна замінити)
| # | Шматок | Де в коді | Що визначає | Що замінити для своєї анімації |
|---|---|---|---|---|
| A | Таймлайн скролу | `wn.onRaf` :5571; секції 0 Landing, 1 Introduction, 2 ManifestoIntro, 3–4 ManifestoBlock, 5 Team, 6 Footer | `sectionProgress = індекс секції + частка прокрутки` | Список секцій/висот, якщо змінюється сторінка |
| B | Формації (банки позицій) | `document-positions.exr`, генератор `scatteredPoint/resolvedPagePoint/streamPoint/randomPagePoint` | 4 форми по 10 000 точок | Свої 4 (або більше) форми — набори точок xyz |
| C | Розмір частинок | `document-scales.png` | scale на частинку в кожній формі | Свої scale на форму |
| D | Колір частинок | `document-colors.png`, `pickPaperColor` | колір на частинку в кожній формі | Своя палітра/розфарбовка форм |
| E | Порядок/затримки (stagger) | `_setupFBO` :4114 — сортування по осях → `tParams/tParams2/tParams3` | хто рушає першим (хвиля зліва-направо, згори-вниз) | Напрям хвиль для кожного переходу |
| F | Фізика (spring) | spring-шейдер :4354 + replace :4358 | `spring 0.006`, `friction 0.892`, quintic intro, дуга-тангенс, explode `pos*=1..6` | Жорсткість/інерцію/траєкторії переходів |
| G | Послідовність станів | `u_progress` 0→4 з мапінгом банків `0→1→0→2→3` | які форми йдуть по черзі | Свою послідовність станів |
| H | Хореографія групи | `_updatePosition/_updateRotation` :4845–4894 (mobile :4895) | зсув X/Y, обертання Y/Z, radius, explode | Свою таблицю ключових кадрів |
| I | Геометрія однієї частинки | `document-core.glb` (80 tri), `document-near.glb` (944 tri), `createDocumentGeometry` | форма «листка» | Свій GLB (або LOD-пара) |
| J | Поверхня/шейдинг | `paperVertexShape`, `paperFragmentSurface`, `document-atlas-v2.png` :3519–3765 | 12 атласних дизайнів, папір, світло | Свій вигляд (атлас текстур або процедурно) |
| K | Індивідуальний рух | `paperFlutter` :4072 / :3516 | легке похитування | Свій idle-рух (tumble, wobble…) |
| L | Інтерактив миші | вершинний шейдер `tn` (dist/u_mouse/u_delta), камера `_updateCamera` :5542 | розштовхування біля курсора, паралакс камери | Свою реакцію на мишу |
| M | Foreground-шар | `Ht` :3768 | 28/12 великих близьких листків з паралаксом | Кількість, розкид, поведінка |
| N | Інтро/поява | `activate()` :4680 — `u_show` 0→1 за 3 с, baseRotation −45°→0 | поява після лоадера | Свою появу |
| O | Пост-обробка і фон | `gn` :5120, clear `0xf4f1ea`, grain `yn` | bloom, DoF, віньєтка, зерно | Свої значення / вимкнути |
| P | CSS-тема | `public/css/light-theme.css` | кольори сайту | Свій дизайн |

### 3. Таймлайн (desktop, розраховано з коду)
| sectionProgress | Стан форми (u_progress) | offX | offY | rotY | rotZ | explode | radius |
|---|---|---|---|---|---|---|---|
| 0 | хмара (банк 0) | 3 | 0 | 0° | 0° | 0 | 4.35 |
| 0→0.58 | збирання у сторінку (0→1) | 3 | 0 | 0° | 0° | 0 | 4.35→4.93 |
| 0.62→1.15 | сторінка, рух вліво + поворот | 3→−4.5 | 0 | 0→−90° | 0 | 0→0.05 | →5.35 |
| 1.1→2.2 | **вибух** (pos×1..6, stagger) | −4.5→−0.41 | 0 | −90° | 0 | 0→1 | 5.35→4.35 |
| 2.7→3.0 | назад у хмару (1→2), вибух гасне | −0.41→−2.5 | 0→0.5 | −90→0° | 0→−28° | 1→0 | 4.35 |
| 3.3→3.5 | 5 потоків (2→3) | −2.5→2.59 | 0.5→0 | 0→45° | −28→6° | 0 | 4.65 |
| 4.5→5.0 | потоки + вибух | 2.59→−0.5 | 0 | 45→−180° | 6° | 0→1 | 4.65 |
| 5.7→6.0 | фінальна органічна сторінка (3→4) | −0.5 | 0→1.75 | −180→0° | 6° | 1→0 | 4.65→3.65 |

Примітка-уточнення до старого handoff: «later scatter 2.7→3.0» насправді — це вже другий етап; перший розліт робить `u_explode` на 1.1→2.2. Mobile: та сама послідовність, інші X/Y (`_updateMobilePosition`), final 5.7→5.8, без bokeh.

### 4. Порядок реалізації своєї анімації (що за чим)
1. **Сценарій** — список станів і на яких секціях/scrollProgress вони відбуваються (заповнити таблицю з п.3 своїми значеннями).
2. **Форми (B)** — для кожного стану набір 10 000 (mobile 5 000) точок.
3. **Порядок появи (E)** і **фізика переходів (F)**.
4. **Хореографія групи (H)** — зсув/обертання/масштаб між станами.
5. **Частинка (I)** — геометрія.
6. **Вигляд (J, D, C)** — поверхня, кольори, розміри.
7. **Індивідуальний рух (K)** та **миша (L)**.
8. **Foreground (M)**, **інтро (N)**, **пост/фон (O)**, **CSS (P)**.
9. QA desktop/mobile.

### 5. Чекліст файлів, які треба підготувати користувачу
- [ ] Сценарій/сторіборд: стани × секції, референс-відео або кадри для кожного стану.
- [ ] Форми: або 3D-моделі (GLB/OBJ) кожної формації для семплінгу точок, або SVG/PNG-силует, або JSON з точками (`[[x,y,z],…]`, ≤10 000), або словесний опис для процедурної генерації.
- [ ] Модель однієї частинки: GLB, ≤100 tri для core і ≤1 000 tri для near, з UV; pivot у центрі, розмір ~1 одиниця.
- [ ] Текстури/атлас вигляду частинки (PNG, напр. 2048² атлас), або опис процедурного малюнка.
- [ ] Палітра: HEX-кольори частинок для кожного стану + фон сайту.
- [ ] Параметри відчуття руху: «пружно/плавно/різко», напрям хвиль, бажані дуги/закрут.
- [ ] Ключові кадри групи: позиція на екрані/поворот/розмір у кожному стані (можна схемою).
- [ ] Поведінка миші і foreground (лишити / змінити / прибрати).
- [ ] Пост-обробка: bloom/DoF/vignette/grain — лишити, змінити, прибрати.
- [ ] Обмеження: кількість частинок desktop/mobile, цільові пристрої.

### 6. Технічні обмеження (коротко, щоб файли підійшли)
- EXR — лише без компресії (ZIP ламає декодер); позиції нормуються в 0..1 через `formationRadius 4.35`.
- Текстура позицій 200×200 = 4 банки 100×100; більше 4 станів → або повтор банків (як зараз), або збільшення текстури + правки шейдерів pos/spring/scale/color.
- `_setupFBO` читає EXR через 8-бітний FBO → порядок (stagger) рахується з точністю 256 рівнів.
- GLSL правиться через `.replace(...)` по точних рядках — після змін `node --check legacy/2601.cjs` + перевірка в браузері.

## Update 2026-11-09: custom document prototype, phase 1 (historical; phase 2 is current)

Implemented the first approved custom scenario:

- first hero copy is temporarily hidden with `prototype-copy-hidden`;
- the initial document cloud is centered and uses a more contrasting navy/champagne/paper palette;
- desktop has a temporary bottom `Спокійний / Динамічний` comparison control (`DocumentMotionToggle.tsx`);
- mobile always resolves to calm mode and hides the comparison control;
- dynamic mode adds faster 3D flutter and flight offsets that damp during assembly;
- assembly now occupies one viewport (`sectionProgress 0 → 1`);
- the assembled document moves to the right and receives a restrained 3D X/Y/Z rotation;
- the Introduction copy is aligned left on desktop to reserve the right side for WebGL;
- cursor interaction now pushes nearby mini-documents radially and into negative Z, producing a springy indentation;
- the resolved formation has a cut/folded corner, uneven lower silhouette and large-sheet curvature;
- procedural mini-document layouts increased from 8 to 12 (added identity card, certificate, process/timeline and invoice patterns);
- CSS, renderer clear color, grain background, particles and procedural ink/accent colors use the Deep Navy / Champagne / Warm Ivory brand system.

QA completed:

- calm and dynamic desktop screenshots;
- exact one-viewport state (`sectionProgress = 1`, `basePosition.x = 3.4`);
- hover indentation screenshot;
- mobile user-agent check (`isMobile = true`, calm mode, toggle `display: none`);
- no GLSL compilation errors observed;
- `node --check`, asset generation, lint, `git diff --check`, and `next build --webpack` pass.

Known legacy `computeBoundingSphere()` NaN and `customUniforms` warnings remain unchanged. The existing favicon/manifest paths also return 404 in local QA and are unrelated to this animation phase.

Phase 2 removed the comparison control and selected the dynamic desktop mode. Do not restore `DocumentMotionToggle.tsx` unless the user explicitly asks for it.

## Update 2026-11-09: high-quality document pass, phase 2

The user selected dynamic motion, so the temporary comparison toggle was removed. Desktop now always uses the dynamic motion target; mobile keeps the restrained target for performance.

Visual changes:

- added `public/images/document-atlas-v2.png`, a transparent 4×3 atlas with 12 distinct premium document designs;
- replaced the visible procedural print with atlas sampling in the shared paper fragment surface;
- kept the generated 80-triangle core model and 944-triangle near model, with atlas detail concentrated on the near LOD;
- reduced foreground count to 28/12 and increased its physical scale so detailed designs remain visible instead of collapsing into 5px gray squares;
- render only a distributed 5,200/3,000 sample of the full 10,000-point simulation, preserving the complete formation and stagger data while reducing visual noise;
- made all backs and page edges warm ivory rather than inheriting dark particle palette colors;
- reduced desktop bokeh `maxblur` from 10 to 2.4 so printed surfaces survive post-processing;
- regenerated the initial formation as a wider, flatter cloud with reduced vertical and depth spread;
- retained the one-screen assembly, right-side resolved document and cursor-driven 3D indentation.

Generated atlas source:

- built-in image generation output: `/Users/soularis109/.codex/generated_images/01a1c005-ef6d-7323-8870-37fa688d3792/exec-35628709-b8b6-4d56-ac1f-1f290e255633.png`;
- project asset: `public/images/document-atlas-v2.png`.

QA after phase 2:

- production `next build --webpack` passes;
- lint passes with only the two pre-existing `<img>` warnings;
- `node --check`, asset generation and `git diff --check` pass;
- browser QA confirms `documentMotionTarget = 1`, `sectionProgress = 1`, `basePosition.x = 3.4`, atlas loading and hover indentation;
- no GLSL compilation errors were observed. Local favicon/manifest 404s and Chrome SwiftShader `ReadPixels` performance warnings remain unrelated.

## Claude continuation brief — read this first

### Latest user decision

Keep the dynamic movement. The cloud should remain wider/flatter. The highest priority is visual quality: mini-documents must look like intentional premium documents instead of gray squares or leftover reference geometry.

Do not restore the calm/dynamic switch. Do not revert the wider cloud, the right-side assembled document, the left-side Introduction copy or the cursor indentation.

### What is visible now

1. Initial viewport: a centered wide, low cloud made from document particles. The original first hero copy is temporarily hidden.
2. One viewport down: the particles assemble into a large document on the right; text is on the left.
3. Hovering the assembled document pushes nearby particles away and into negative Z, creating a springy 3D cavity.
4. Large near-LOD sheets float through the scene and show distinct atlas layouts. Small core sheets still intentionally read more as mass/silhouette at distance.

### Current implementation values

- Full GPU/FBO simulation: 10,000 points on all platforms.
- Visible distributed core sample: 5,200 desktop / 3,000 mobile.
- High-detail foreground: 28 desktop / 12 mobile.
- Core model: 80 triangles; near model: 944 triangles.
- Foreground scale: 0.28 desktop / 0.20 mobile.
- Core scale: 1.72 desktop / 1.35 mobile.
- Desktop motion target: `1`; mobile motion target: `0` for restraint/performance.
- Desktop bokeh `maxblur`: `2.4`.
- Atlas grid: 4 columns × 3 rows, 12 document types.
- One-screen state verified at `sectionProgress = 1`, `basePosition.x = 3.4`.

### Files to inspect first

- `legacy/2601.cjs` — WebGL assets, shared paper shaders, `Ht` foreground, `an` core, animation and post-processing.
- `scripts/generate-document-particles.mjs` — deterministic GLB, EXR and PNG generation; `scatteredPoint()` controls the initial cloud.
- `public/images/document-atlas-v2.png` — current premium 12-document atlas.
- `public/models/document-core.glb` and `public/models/document-near.glb` — current LOD geometry.
- `app/components/sections/Landing.tsx` and `app/globals.css` — temporarily hidden first hero copy.
- `public/css/light-theme.css` — current brand/theme alignment.

### Exact image-generation prompt used for the atlas

```text
Use case: stylized-concept
Asset type: production art-direction texture atlas for instanced WebGL document particles on a premium document-assistance website
Primary request: create a precise 4 columns by 3 rows atlas containing twelve distinct high-quality paper document designs. Every tile contains exactly one complete front-facing document, centered, fully visible, with consistent scale and generous transparent padding.
Subject: premium realistic documents including a formal application, contract, certificate, identity form, checklist, invoice, legal letter, report, table, signed form, stamped approval, and structured memo.
Style/medium: refined photorealistic 3D product render combined with crisp editorial document design; sophisticated, tactile and believable rather than cartoonish.
Composition/framing: strict orthographic front view, straight rectangular tile grid, identical document dimensions per tile; no perspective distortion; no overlap between tiles.
Lighting/mood: soft restrained studio light, subtle paper thickness and micro-beveled edges, very gentle fold and curl, fine paper fibres, sharp legibility at thumbnail scale.
Color palette: Warm Ivory #F6F2E9 paper, Deep Navy #041E42 ink and rules, Classic Champagne #D6BE93 accents; occasional cool pale paper backs only.
Text: no readable language, no logos, no brands; use realistic pseudo-typographic bars, lines, checkboxes, tables, signatures and stamp shapes.
Constraints: genuinely transparent background; strong clean silhouettes; every document isolated; uniform lighting; no cast shadows outside each document; no hands, desks, clips, pens, envelopes, folders or extra objects; no watermarks.
Avoid: gray noisy squares, illegible AI lettering, decorative gradients, neon colors, rounded app cards, perspective mockups, cropped pages, overlapping papers.
```

Generated source: `/Users/soularis109/.codex/generated_images/01a1c005-ef6d-7323-8870-37fa688d3792/exec-35628709-b8b6-4d56-ac1f-1f290e255633.png`.

### Recommended next visual iteration

Ask the user to inspect the current desktop animation first. If document quality is still insufficient, do not simply add more particles. Tune in this order:

1. foreground sheet scale/count/placement so 12 atlas variants are clearly identifiable;
2. atlas contrast and paper/ink lighting in `paperFragmentSurface()`;
3. core density versus gaps while keeping the full 10k simulation;
4. only then consider a true third mid-LOD mesh.

The current compromise deliberately reserves the detailed atlas for large near sheets. A 5–8 px core particle cannot display realistic print regardless of texture resolution.

### Commands to resume and verify

```bash
npm run dev
npm run assets:documents
node --check legacy/2601.cjs
node --check scripts/generate-document-particles.mjs
npm run lint
git diff --check
npx next build --webpack
```

`npm run assets:documents` needs `ffmpeg` and must continue producing an uncompressed EXR because the legacy decoder cannot read ZIP-compressed EXR files.

### Current QA caveats

- Two existing lint warnings remain in `Investors.tsx` and `TeamSlider.tsx` for raw `<img>` usage; there are no lint errors.
- Legacy `computeBoundingSphere(): radius is NaN` and `customUniforms` console warnings predate this pass.
- Local favicon/manifest 404s and headless SwiftShader `ReadPixels` warnings are unrelated.
- No GLSL compilation errors were observed after atlas integration.


## Інвентар компонентів анімації (2026-11-09)

Повний список усього, що формує вигляд анімації: код, текстури, моделі, стилі, шрифти. Склали його перед редизайном стилю, код при цьому не змінювали.

### A. Код (усе в `legacy/2601.cjs`, якщо не вказано інше)
| Компонент | Клас/функція | Що робить для стилю |
|---|---|---|
| Сцена, камери, рендерер | `bn` | clear color фону, 2 камери, мишачий паралакс камери |
| Основна хмара/документ | `an` | 10k симуляція, 5 200/3 000 видимих листків, хореографія скролу |
| Великі листки спереду | `Ht` | 28/12 детальних листків з атласом |
| Шейдери паперу | `paperVertexShape`, `paperFragmentDecl`, `paperFragmentSurface` | вигин, світло, атлас, краї, зворот |
| FBO-симуляція | `$t`, `Jt`, spring/pos шейдери в `an._setupFBO` | пружність, хвилі, вибух |
| Зерно/фон | `yn` | шум поверх, колір паперу |
| Пост-обробка | `gn` + `fn` (Bokeh) | bloom, DoF (desktop), віньєтка |
| Лоадер ассетів | `Ot` + `loadGlobalAssets` | список файлів нижче |
| Секції скролу | `wn` | `sectionProgress` |
| Маленька піраміда в Investors | `st.Pyramid` + `app/components/sections/Investors.tsx` (`dom2webgl="c:Pyramid"`) | окремий 3D-об'єкт, `py-lod7.glb` |
| Запуск | `app/ScriptLoader.tsx` → `legacy/entry.cjs` | |
| Генератор ассетів | `scripts/generate-document-particles.mjs` | форми, кольори, розміри, GLB |
| Бібліотеки | three.js (розпакований у `legacy/*.cjs`), GSAP 3.7.1, ASScroll | |

### B. Картинки / текстури (`public/images`)
| Файл | Розмір | Статус | Роль |
|---|---|---|---|
| `document-atlas-v2.png` | 1.7 MB | використовується | 12 дизайнів документів (4×3) — головний «вигляд» листків |
| `document-colors.png` | 15 KB | використовується | колір кожної частинки в 4 формах |
| `document-scales.png` | 56 KB | використовується | розмір частинок у 4 формах |
| `document-positions.exr` | 484 KB | використовується | 4 форми (хмара/документ/потоки/фінал) |
| `noise.jpg` | 455 KB | використовується | зерно (`grain`) |
| `gradient-noise.jpg` | 19 KB | вантажиться, лише для невикористаного `SearchBar` | |
| `dof-2k-10.jpg` | 176 KB | вантажиться, не використовується | можна прибрати |
| `dala-d.png` | 72 KB | логотип (`Logo.tsx`) | |
| `svgsprite.svg` | 8 KB | іконки футера/слайдера | |
| `cd-33.png`, `sc-33.png`, `pos-33.exr` | — | **старі (мозок), не використовуються** | |

### C. 3D-моделі (`public/models`)
| Файл | Статус |
|---|---|
| `document-core.glb` (80 tri) | хмара/документ |
| `document-near.glb` (944 tri) | великі листки спереду |
| `py-lod7.glb` | піраміда в Investors |
| `py-lod1/2/3.glb`, `py-monbile.glb` | старі, не використовуються |

### D. Стилі та шрифти
| Файл | Роль |
|---|---|
| `public/css/style.css` (97 KB) | оригінальні стилі сайту |
| `public/css/light-theme.css` | бренд-тема поверх: `#F6F2E9` фон, `#041E42` ink, `#D6BE93` accent |
| `app/globals.css` | Tailwind + змінні кольорів, `.prototype-copy-hidden` (прихований перший заголовок) |
| `tailwind.config.ts`, `postcss.config.mjs` | палітра й шрифти для Tailwind |
| `app/layout.tsx` | шрифти Playfair Display + Montserrat, підключення CSS, theme-color |

### E. «Ручки» стилю в коді (де міняти вигляд без нових файлів)
- Фон WebGL: `setClearColor` у `bn.setup`; колір зерна — replace у `yn`.
- Палітра частинок: `palette` у генераторі + кольори в `Ht._setupMesh`.
- Світло/контраст паперу: `paperFragmentSurface` (pLight, pSpec, pRim, ink).
- Розмір/кількість: `_nb`, `_scale` в `an`, `Ht`.
- Пост: bloom threshold/strength/radius, bokeh `maxblur`, vignette offset/darkness у `gn`.
- Рух: `paperFlutter`, spring/friction, хореографія `_updatePosition/_updateRotation`.

### F. Що можна прибрати (не впливає на анімацію)
`cd-33.png`, `sc-33.png`, `pos-33.exr`, `py-lod1/2/3.glb`, `py-monbile.glb`, `dof-2k-10.jpg` (+ запис `sprite` у `Ot`), `gradient-noise.jpg` (якщо SearchBar не потрібен). Видалення — лише після підтвердження користувача.


## Інструменти для редизайну (2026-11-09)

Мета: якісніша анімація, ніж у фазі 2. Кандидати завантажені в пісочницю `tools-candidates/` (свій `package.json`, `node_modules` в `.gitignore`). До `app/`, `legacy/` і кореневого `package.json` вони не підключені. Рішення про інтеграцію приймає користувач по одному інструменту.

Обмеження: анімація працює на розпакованому three.js у `legacy/2601.cjs`, тобто WebGL/GLSL, не WebGPU. Інструменти на TSL/WebGPU не підходять. Власний composer `gn` (bloom, bokeh, віньєтка) заміняти ризиковано.

### Завантажено (npm, `tools-candidates/`)
| Група | Пакет | Версія | Ліцензія | Для чого |
|---|---|---|---|---|
| Підгонка наживо | `lil-gui` | 0.21.0 | MIT | повзунки для uniform-ів (bloom, scale, spring, кольори) |
| Підгонка наживо | `tweakpane` | 4.0.5 | MIT | альтернатива lil-gui, графіки й кольори |
| Хореографія | `@theatre/core` | 0.7.2 | Apache-2.0 | програвання анімації з JSON |
| Хореографія | `@theatre/studio` | 0.7.2 | **AGPL-3.0** | візуальний таймлайн; використовувати лише в dev, у продакшн не віддавати |
| 3D-моделі | `@gltf-transform/core, functions, cli` | 4.5.1 | MIT | optimize, quantize, weld, KTX2/WebP |
| 3D-моделі | `gltfpack`, `meshoptimizer` | 1.3.0 | MIT | стиснення meshopt |
| Картинки | `sharp` | 0.35.5 | Apache-2.0 | пакування атласу, resize, WebP |
| Частинки | `three.quarks` | 0.17.1 | MIT | система частинок + редактор |
| Шейдери | `three-custom-shader-material` | 6.4.0 | MIT | розширення матеріалів three без переписування шейдера |
| Пост-обробка | `postprocessing` (pmndrs) | 6.39.6 | Zlib | Bloom, DoF, EffectPass |
| Довідка | `three` | 0.187.0 | MIT | лише для перевірки сумісності пакетів |

### Текстури (CC0, ambientCG), `tools-candidates/textures/`
`Paper001`, `Paper002`, `Paper005` (1K JPG: Color, Roughness, NormalGL/DX, Displacement). Ліцензія ambientCG: CC0. `PaperBump001` на сервері не знайдено.

### Не завантажено і чому
- `lygia`: ліцензія Prosperity/Patron, тобто безкоштовно лише для некомерційного використання. Для комерційного сайту потрібна платна.
- NixieFX: у npm-реєстрі пакета немає (404). Якщо потрібен, треба шукати репозиторій і перевіряти ліцензію окремо.
- `toktx`/`basisu` (KTX2): це бінарники, ставляться окремо (наприклад, через brew). Якщо стиснення знадобиться, спершу перевірити, чи legacy-лоадер підтримує KTX2/meshopt.
- Higgsfield і Adobe Firefly: платні/за кредитами, вже підключені як MCP. Використовуємо для генерації атласів і фонів, а не завантажуємо.
- Shadertoy, glslEditor, Blender: веб/окремі програми, не пакети.

### Поради за результатами пошуку (не все перевірено)
- Meshopt швидше декодується, Draco стискає сильніше, але має важчий декодер.
- ETC1S дає менший KTX2, UASTC якісніший, але файли набагато більші.
- Не змішувати `EffectComposer` з three і pmndrs `postprocessing` (одне стороннє джерело каже про несумісні буфери).
- Джерела: threejsresources.com, marceloretana.com, utsubo.com (100 Three.js tips), three.js Basis README, Codrops (GPGPU particles), theatrejs.com, github.com/pmndrs/postprocessing, ambientCG.

### Порядок вибору (далі питаємо користувача)
1. Підгонка наживо: lil-gui чи tweakpane.
2. Текстури паперу: які з трьох ambientCG брати.
3. Моделі листків: чи робимо свої в Blender і чи стискаємо через gltf-transform.
4. Хореографія: чи переходимо на Theatre.js.
5. Частинки/VFX: чи потрібен three.quarks.
6. Пост-обробка: лишаємо `gn` чи пробуємо pmndrs `postprocessing`.

### Рішення користувача (2026-11-09)
- Панель підгонки: **lil-gui** (tweakpane не брати).
- Текстури паперу: **Paper001, Paper002, Paper005** залишаємо.
- Хореографія: **спробувати Theatre.js** (Studio лише в dev через AGPL).
- Що не подобається: **вигляд листків, кольори й фон, рух, загальне враження**, тобто потрібен новий напрямок, а не дрібні правки.
- Ще не вирішено: власні моделі листків (Blender + gltf-transform), three.quarks, pmndrs `postprocessing`, а також новий візуальний напрямок (референси).
- Нічого поки не підключено до `app/` і `legacy/`.

## lil-gui підключено (2026-11-09)

Панель живої підгонки: відкрити `http://localhost:3000/?tune` (без `?tune` вона не вантажиться і в продакшн не потрапляє).

- `app/DevTuner.tsx` (нове) — панель lil-gui, підключена в `app/page.tsx`. Читає живі об'єкти з `window.__DALA_DEBUG__`.
- `legacy/2601.cjs`: `__DALA_DEBUG__` тепер відкривається і за `?tune`; додано спільний об'єкт `paperTune` (9 uniform-ів) і прив'язано до шейдера паперу в `paperFragmentSurface` (дрібні й великі листки). Значення за замовчуванням = попередній вигляд.
- `lil-gui@0.21.0` додано в кореневий `package.json` (також лежить у `tools-candidates/`).
- Групи: Папір і світло (експозиція, контраст, насиченість, відтінок, заповнююче/основне світло, блиск, контур, видимість друку), Листки і рух (розмір дрібних/великих, яскравість, живість руху, пружність, тертя), Світіння і розмиття (bloom, DoF, віньєтка), Фон (колір, зерно), Інструменти («Скопіювати значення (JSON)», «Скинути»).
- Перевірено в браузері: панель з'являється, сцена рендериться, `gl.getError() = 0`, зміна uniform-ів працює. `node --check`, `tsc`, `eslint` без помилок.

## Новий атлас листків v3 (2026-11-09)

- `scripts/generate-document-atlas.mjs` (нове, `npm run assets:atlas`) генерує `public/images/document-atlas-v3.png`: 4096×3072, сітка 4×3, 12 мінімалістичних документів (звіт, лист, рахунок, чекліст, графіки, сертифікат, форма, профіль, договір, меморандум, таймлайн, штамп). Векторні SVG → PNG через `sharp` (береться з `tools-candidates/`), без нейромережі і без кредитів, результат детермінований.
- Кожен документ заповнює область листка точно так, як її семплює шейдер (`x 0.18–0.82`, `y 0.025–0.975` клітинки), тож шейдер не змінювався. Палітра: Deep Navy `#041E42`, Champagne `#D6BE93`, ivory-папір `#FCFAF5`, один червоний штамп.
- `legacy/2601.cjs`: текстура `document_atlas` тепер вантажить `document-atlas-v3.png` (v2 лишається на диску як резерв).
- Перевірено в браузері: атлас 4096 px завантажується, `gl.getError() = 0`.
- Відомий обмеження: дрібні листки (ядро) і навіть «великі» на екрані мають ~25 px, тому друк на них майже не читається, а зібраний документ виглядає як сірий щільний масив. Для читабельних документів треба більші й менш численні листки (повзунок «Розмір великих» у панелі, потім кількість `Ht._nb`) або окремий середній LOD.

## Менше, але більших листків (2026-11-09)

- `an`: видимих листків тепер 1600 (desktop, сітка 40×40) / 900 (mobile, 30×30) замість 5200/3000. Беруться рівною підсіткою банку 100×100 (`this._grid`), тож зібраний документ — акуратна мозаїка рядами, без дірок і накладань. Симуляція лишається 10 000 точок; банки, таймінги й хореографія не змінені.
- `_scale` 1.72/1.35 → 2.75/2.5 (доналаштування — повзунок «Розмір дрібних» у `?tune`).
- `bn.onAssetsLoaded`: атлас документів отримує анізотропну фільтрацію (до 8×).
- Перевірено в браузері: `nb = 1600`, `anisotropy = 8`, `gl.getError() = 0`. Хмара рідша, зібраний документ складається з рядів окремих документів із видимими заголовками. Один листок ~15–18 px, тому дрібний друк усе ще не читається; наступний крок — спрощений атлас для дрібних листків і майстер-документ.

## Картинки, потрібні для чіткої анімації
| # | Картинка | Розмір/формат | Навіщо | Статус |
|---|---|---|---|---|
| 1 | Майстер-документ: один великий документ, який складається з мозаїки (кожен листок у зібраному стані показує свій шматок) | 2048×2770 PNG (пропорція 4.25:5.75) | головний ефект «багато → 1 документ» | немає, потрібна |
| 2 | Атлас близьких листків | 4096×3072, 4×3 | детальний друк на великих листках | є (v3) |
| 3 | Спрощений атлас дрібних листків (крупні блоки, 2–4 смуги, без тонких ліній) | 2048×1536, 4×3 | дрібні листки читаються як документи | немає, потрібна |
| 4 | Зворот листка (просвічування друку, фактура) | 1024×1024 | реалістичний зворот при поворотах | немає |
| 5 | Normal + roughness паперу | 1K JPG тайлові | фактура при поворотах | є (ambientCG), не підключені |
| 6 | Фон сцени (градієнт/текстура) | 2048×1152 або CSS | зараз пласкі колір + зерно | опційно |
| 7 | Зерно | `noise.jpg` | плівкова фактура | є |
| 8 | Силуети нових форм (хмара, потоки, фінал) | PNG-маски 1024 / SVG | якщо змінюємо формації | опційно |
| 9 | Статичний постер зібраного документа | WebP 1600 px | `prefers-reduced-motion`, слабкі телефони, OG | немає, бажано |

Пріоритет: 1 → 3 → 9 → 4 → 5. Картинки 1, 3, 4 можна згенерувати безкоштовно тим самим SVG-скриптом, що й атлас v3.

## Бриф для дизайнера (2026-11-09)
`designer-brief/` (і `designer-brief.zip`): `BRIEF.md` + `01-master-document-EXAMPLE.png`, `02-…-GUIDE.png` (сітка 40×40, скіс, безпечна зона), `03-…-TEMPLATE.png` (прозора накладка), `04-reference-atlas-v3.png`. Генерується `node scripts/generate-master-document-example.mjs`. Майстер-документ: 2048×2770 PNG, прозорий скіс (1542,0)-(2048,0)-(2048,506), клітинка 51.2×69.25 px. Ще не підключено до шейдера: після отримання `master-document.png` треба нарізати його на 1600 клітинок за позицією листка в сітці (`an._grid`).


## Сценарій анімації (2026-11-10)
План, оригінальний промт-розшифровка, критерії та актуальний журнал: [`docs/animation-scenario.md`](docs/animation-scenario.md). Технічні кроки 1–7 реалізовані; очікуються вибір A/B/C і фінальний копірайт.


## Оновлення 2026-11-10 (режим «лише анімація»; спроба з ассетами відкочена)

- **Текст сайту за замовчуванням сховано** (`html[data-anim-only]`, `app/globals.css` + inline-скрипт в `app/layout.tsx`); `?text` повертає його. Це `visibility`, тому висоти секцій і `sectionProgress` не змінюються. Також ховаються піраміди Investors (`Dom2Webgl.visible`).
- Спроба підключити `public/assets` (анкета v2, печатка v2, папка в палітрі макета, фігура-глобус на 4.5–5.0) **відкочена**: файли не вантажились напряму, а глобус не замовлявся. Стан анімації = до цієї спроби. Див. `docs/animation-scenario.md`, «Відкат кроків 8.1–8.4».
- Далі: використати `public/assets` напряму (документ A4, печатка, папка як площини); фігури L-* і матеріали M-* пізніше.

### Оновлення (крок 9): файли з `public/assets` підключені напряму
Документ `document-2048.png` (формація — прямокутний A4), відбиток `stamp-impression-alpha.png` + спрайт тіла з S-01 (`stamp-body.png`), папка з `folder-cover-alpha.png` / `folder-pocket-alpha.png` / `folder-panel.png` (площини). Похідні файли генерують `npm run assets:stamp-body` і `assets:folder-panel`. Деталі: `docs/animation-scenario.md`, крок 9. Старі `master-form.png` і `stamp-mark.png` лишились у `public/images`, але більше не вантажаться.

## Note 2026-11-12 — фронтальний документ і плоска папка

- «Обробка» (3.3→5.0): документ більше не лежить під нахилом. `rotX`, `rotY`, `rotZ` на 3.3–3.5 прибрано; печатка опускається зверху-збоку в площині кадру (`Stamp.update`, `HIGH = 1.6`, `swoop` по y = 2.2).
- Папка у фіналі: листки плоскі (без затінення сторін і z-підйому, пружне замикання ease-out-back). Переворот варіанта A і відкриття обкладинки ортографічні: масштаб по x замість 3D-шарніра. Варіант B пульсує в площині кадру.
- Детальний журнал і перевірки — `docs/animation-scenario.md`, розділ 5, «Крок 11».
