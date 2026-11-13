# Dala document animation — handoff for Claude

Updated: 2026-11-13

## Speed-aware first-cloud magnet — 2026-11-13

- Slow cursor movement now captures one nearby sheet as soon as a second position supplies a speed sample. The selected sheet follows slow movement, retaining its 1.8× magnetic scale; moving over 3px no longer automatically releases it. A first position only seeds input; a stationary first hover still waits 150ms.
- Fast motion enters repel at 650 CSS px/s using the raw sample immediately. Return to attract when the exponentially smoothed speed (40ms time constant) falls to 300 px/s; retain the current mode between thresholds. After 150ms without significant movement, return to attract and capture as before. Only repel supplies a fresh swept impulse and releases the captured sheet.
- Tracker v4 records monotonic movement time and cumulative travel. Paired Pointer/Mouse events at identical coordinates update neither twice; hover events do not supply movement samples. Speed uses the real sampling interval, including slow frames, so rendering delays cannot inflate a gentle approach into a swipe. No cursor path is retained.
- Existing push radius/strength/cap (45px, 360–520px/s, 640px/s), relative GPU offsets, continuous native animation, intro timing, single runtime and no-click activation remain in place.
- Verification for this change is limited to TypeScript, targeted ESLint and diff whitespace checks under AGENTS.md. Browser interaction and regression test execution have not been performed for this revision; earlier browser results below describe the earlier behavior.

## Shorter intro tail and enlarged magnetic sheet — 2026-11-13

- Desktop intro duration is now 4.6s. `heroIntroEase` preserves the original show progression for the first 3.85s (through show=0.7), then uses a cubic Hermite tail over 0.75s instead of 1.65s. Tangents match at the join and finish at zero. All four show uniforms share the ease; base yaw composes its original cubic-out with the same progress. The start delay stays intact. Mobile retains 3.2s/linear show, reduced motion retains instant reveal; custom duration proportionally scales the normalized curve.
- Runtime `defaultIntroDuration` is the shared source for activation and DevTuner's initial duration, replacing the old duplicated 5.5 default. Pure curve checks confirm monotonicity, exact early motion (max error ~1e-16), join 0.7 and endpoint 1; browser sampling confirmed all four show uniforms stay synchronized and the tuner displays 4.6.
- `HERO_MAGNET_SCALE=1.8` drives `u_heroMagnetScale` in the shared color/depth shader and the projected-face picking scale. Growth follows the existing capture weight; selected papers retain the larger size while held and decay smoothly on release. Only the captured sheet grows. Relative offsets and zero-delta identity remain intact. Magnetic interaction marks its sheet as touched, including for later boundary handling.
- Sharp browser acceptance passed: synchronized intro uniforms, DevTuner 4.6, zero-delta color/depth parity, no-click sweep, single magnetic sheet, stable enlarged hold and release, untouched sheets unchanged, blur/re-entry/resize and form/reverse/reduced behavior. An isolated native paper rendered at the same magnetic depth measured ~1.86x width / ~1.84x height at 1.8 versus 1.0 scale (raster bounds). New JS/GLSL errors: none; WebGL error zero. QA: `/private/tmp/qa-dala-hero-size-timing.mjs`; image `/private/tmp/dala-continuous-magnet-1p8.png`.

## Continuous native hero with relative interaction — 2026-11-13

This fixes the visible reshuffle after the flight. Runtime initialization was already stable, but the 150ms `u_heroPoseMix` handoff replaced every native GPU center/rotation/scale with a different CPU pose, even without input. That absolute-pose path is now removed.

- Core and foreground keep their original simulation, native flutter/tilt, paper shape, size, phase transitions and `u_time` throughout. `a_heroInteraction` contains only relative CSS-pixel XY displacement, additional view-space spin and magnetic weight. The shared color/depth hook applies them around each native instance center. Zero deltas return the original position/normal directly, so enabling interaction cannot alter untouched papers.
- Attributes are allocated as zeros before the first frame. There is no absolute-pose attribute, quaternion override, startup blend or independent CPU pose clock. The interaction gate only fades effects on the existing hero-to-form interval; readiness itself introduces no visual transition.
- `a_heroRank` is prepared before the intro and shared by CPU visibility and the native shader's density test. Existing `a_angle` seeds drive native tilt and picking consistently. Picking uses the original material time, shared native drift parameters, projected face rotations and the same frame transforms. The one-time simulation/scale cache remains for picking only; it never replaces rendered GPU positions.
- `HeroMotion` still owns impulse velocity, persistent offsets, spin and a single captured sheet. The prior 360–520 px/s impulse, 640 cap, 45px radius, 150ms pause, 100px capture range, braking and no-click input are retained. `hero-motion.cjs` now includes quaternion composition helpers used only by projected-face picking.
- Sharp desktop browser acceptance passed: no input at readiness gives exactly identical frozen color AND depth buffers with the interaction gate 0 versus 1 (max difference 0, changed components 0). Native papers then respond to a real sweep and single-sheet magnet with zero presses. Untouched papers keep zero deltas; blur, re-entry, resize, form/reverse scroll and live reduced motion pass. No new JS/GLSL errors; WebGL error zero. QA: `/private/tmp/qa-dala-continuous-hero.mjs`; images: `/private/tmp/dala-continuous-{ready,magnet}.png`.

## Single automatic runtime and stable hero lifetime — 2026-11-13

This replaces the synthetic DOMContentLoaded bridge and visual resets on pointer lifecycle events. The client explicitly chose automatic interaction after the initial flight, without any click.

- `ScriptLoader` imports `entry.cjs` and calls the exported `startDala()` directly. `2601.cjs` evaluates its application setup inside a runtime factory, so module reevaluation itself cannot attach duplicate listeners or replace the debug state. A document-wide `window.__DALA_RUNTIME__` owns the shared initialization promise and state. StrictMode/remounts/repeated start calls reuse that promise, renderer, RAF subscription and automatic intro. Native or synthetic DOMContentLoaded no longer starts the engine.
- The promise resolves after assets/reveal enable the site and schedule the intro. Hero interaction becomes ready automatically once both layers and the intro are ready; pointer information captured before that point is consumed without a press. Debug mode exposes `u.start` and `u.lifecycle` (bootCount, introCount, captures, heroReady). The explicit DevTuner replay remains the only intentional intro restart.
- Pointer tracker v3 listens only to mouse/pointer over/move, with no button subscriptions. Element blur is ignored; actual window blur/leave invalidates the input. Lifecycle resets now release the magnet and reset its clock without clearing pose blending or reconstructing physical state.
- Hidden tabs keep the existing controller and attributes. The autonomous hero pose clock and handoff advance only with visible bounded frame deltas, avoiding phase jumps and repeat capture on return. Resize retains the same controller/offsets. Leaving the hero or enabling reduced/coarse/mobile behavior still clears the controller normally; reverse scene entry captures a new cloud after settling.
- Browser acceptance on the existing server passed sharp desktop: ordinary loader, cursor captured during the intro, automatic magnetic response with zero presses, repeated start returning the same promise, duplicate DOMContentLoaded, native click without any change to renderer/controller/capture count/u_show, blur/re-entry, resize, hidden/visible return, form/reverse scroll and live reduced motion. WebGL error zero; no new JS/GLSL errors. QA: `/private/tmp/qa-dala-runtime.mjs`; before/after-click images: `/private/tmp/dala-runtime-{before,after}-click.png`. The same checks passed current rendering; mobile and initial reduced motion also started automatically with physics disabled and no new JS/GLSL errors.

## Reliable mouse input and pause magnet — 2026-11-13

This replaces the one-second face dwell below. The client selected a 150ms pause, twice the push strength and fast braking when the cursor stops.

- The early self-contained tracker is now version 2. Both PointerEvents and MouseEvents are captured even when `PointerEvent` exists; coordinate-based motion sampling prevents a paired event from doubling an impulse. Touch/pen and compatibility mouse input are ignored. Versioned, disposable subscriptions replace stale HMR snapshots and reset the controller's consumed history. No click or document focus requirement is introduced.
- `HeroMotion` tracks actual motion sequence changes and `lastMotionAt`. Motion over 3px releases capture and supplies only a fresh swept segment. The controller stays in moving mode for 150ms after the last significant sample, preventing false pauses between events. Click/hover-only coordinate updates can seed a position without producing an impulse.
- After 150ms of stillness, capture one visible paper within 100 CSS px: prefer the projected face under the pointer (frontmost for overlap), otherwise nearest by distance. Keep that paper locked while stationary, even if inertia/drift carries it out of its initial face hitbox; ease the magnet in over 200ms from `capturedAt`. No nearby paper means no capture.
- Push speeds are 360–520 CSS px/s with a final 640 cap, radius remains 45px. Moving damping stays 5/s; paused damping is 30/s to brake residual flight over roughly 100ms. New locations and autonomous floating are retained; there is no cursor trail.
- In-memory checks of the actual CJS sources passed mouse-only activation, paired-event deduplication, upgrade/disposal, touch filtering and pause/capture/release behavior at 30/60/120fps. Browser acceptance is pending: the previously running localhost:3000 server is now stopped, and AGENTS.md requires explicit authorization to start it. No server was started or production build run.

## Individual first-cloud physics, no cursor trail — 2026-11-13

This replaces the trail-based implementation and continuous collective magnet below. The client chose independent papers, persistent new positions after a push, and exactly one magnetic sheet after a one-second dwell.

- `legacy/hero-motion.cjs` owns per-sheet position offsets, velocity, spin, cooldown and magnetic state. Only the current cursor segment can apply an impulse; no spatial cursor history survives. Speeds start at 180–260 CSS px/s, cap at 320, and decay exponentially at 5/s. Integrated offsets remain after velocity decays. A broad viewport boundary acts only on interacted sheets, never restoring their original cells.
- The root's early pointer tracker stays in place. Click/focus is unnecessary. A 3px cursor tolerance separates jitter from a sweep; a candidate must remain under the projected paper face (8px hysteresis) for 1000ms before magnetic capture, easing over 200ms. Only the frontmost eligible instance across core/foreground is selected. Motion immediately releases it and supplies a new impulse.
- At full hero readiness, the controller captures the existing simulation position texture once (Float32 or decoded half float) and caches scales once. CPU-generated floating poses, physical offsets, quaternion rotations, mild selected-sheet lift/scale and projected hit quads share two instanced attributes across color/depth. There is no per-frame GPU readback, extra draw call, target, asset or cursor-history shader loop. Recovering the old simulation ID from `a_id` frees the attribute slot required by WebGL's limit.
- The legacy intro stays in place, with a 150ms handoff to the new poses. Input stops above progress 0.1 and pose weight fades to zero by 0.46; the controller is discarded outside hero. Reverse entry waits for the cloud to settle before a fresh capture. Resize/leave/blur reset dwell; hidden/reduced-motion scenes discard physics. Touch/coarse pointer disables the controller. Form/stamp/folder/VISA keep their existing interaction.
- Browser QA has passed sharp/current desktop: persistent displacement, 1000ms dwell, exactly one selected paper, release on movement, blur, scroll into form/reverse entry, resize and live reduced motion. WebGL error is zero with no new JS/GLSL errors. Temporary acceptance script: `/private/tmp/qa-dala-hero-physics.mjs`; images: `/private/tmp/dala-hero-physics-{before,sweep,magnet,form}.png`. Mobile and initial reduced-motion acceptance also passed: physics disabled, no new shader errors, WebGL error zero.

## Immediate hero hover with additive scatter — 2026-11-13

This supersedes the moving-cursor magnet mute and magnetic-pause behavior below. Only the first cloud changes; assembled form/stamp/folder/VISA interaction is retained.

- Root layout installs the self-contained `hero-pointer.cjs` tracker with `beforeInteractive`; the engine also installs it idempotently as a fallback. A cached snapshot separates known/inside coordinates, real movement and lifecycle resets. Hover captured during loading seeds core/foreground uniforms at intro completion without a click or fabricated sweep. Unknown position waits for the first real hover; no center fallback.
- Hero no longer requires `document.hasFocus()`, and magnet weight stays one for valid mouse hover, including movement. Existing attraction 0.72, lift, scale and phase fade remain. Mouse leave, blur, hidden tabs, resize and phase changes clear trails. Touch/coarse pointer and reduced motion disable the effects.
- To keep the stronger scatter additive to a continuous magnet, the old pre-magnet velocity steering is replaced by a shared post-magnet screen-space displacement in core and foreground color/depth shaders. The base GPU simulation is retained. A bounded 16-segment history coalesces at 80ms, uses 45px radius / up to 50px travel, and an analytic critically damped pulse with a 150ms rise/hold and return to exact zero by 1.15s. The strongest contribution wins, so paths cannot accumulate unlimited displacement. No new FBO, texture or draw call; the tradeoff is a bounded vertex-shader loop.
- Genuine motion is consumed once; click/up events only update position. Both shader passes see the same uniform arrays and clock. `hero-pointer.test.cjs` covers serialized bootstrap, pre-load hover, no-click activation, valid zero coordinates, motion consumption, click/leave/blur/visibility/resize resets and touch filtering.
- Targeted first-hover browser acceptance passed on the existing localhost:3000 server using `/private/tmp/qa-dala-hero-first-hover.mjs`: unknown position waits; a real mouse hover captured while the EXR asset is paused activates both layers after loading with zero clicks and `document.hasFocus() = false`; initial seeding creates no sweep; real movement retains the magnet; stationary hover adds no trail; blur/re-entry and live reduced motion reset correctly. WebGL error zero, no new JS/GLSL errors. Screenshot: `/private/tmp/dala-hero-first-hover.png`. This validates first-hover activation, not the older GPU-displacement assertions. Broader visual/mobile acceptance and the Node test runner remain pending.

## Scroll-applied VISA sticker — 2026-11-13

This supersedes standalone VISA appearing during page assembly. The client chose a sticker application driven by further scrolling, with reverse playback on reverse scroll.

- Standalone now assembles a blank page by 6 desktop / 5.8 mobile, holds to 6.2, then applies VISA at 6.2→6.85 desktop / 6.2→6.65 mobile. Folder-mode sticker opacity and the existing section heights are retained. `visaApplication` is a stateless normalized scroll signal; `visaAvailable` waits for the completed application/opening.
- `visaStickerPose` in `document-motion.cjs` supplies opacity over the first 18%, approach from 108% scale / +0.18 page-unit Y / -2°, contact by 85%, then a hold. Reduced motion uses only an opacity fade over the same interval. There is no automatic playback or elapsed-time clock.
- Core transforms the existing VISA texture in rest-page coordinates around its actual artwork center, preserving aspect. A procedural rounded-rectangle shadow softens the approach and vanishes at contact. Final UV mapping is the original sticker placement; the artwork continues to move with its underlying tiles. No new meshes, textures or render passes were added.
- New `u_finaleLayout` follows collection independently of sticker alpha. Full-face selection, tile width/overscan, paper alpha, original-corner shading suppression and depth coverage use it. Core color/depth share the uniform, so the blank final page is already stable before applying the status.
- Existing floating continues; cursor scatter waits for the completed application and settled sticker pose. Mode changes blend folder identity and standalone pose at the current scroll via the existing 200ms transition.
- Regression scenarios cover blank hold, application/readiness boundaries, frozen/reversed/fast scroll targets, mode blending, clamped pose endpoints and reduced motion. Browser/WebGL visual acceptance and the Node test runner remain unrun under the lightweight-only AGENTS.md rule.

## Hero cursor scatter with magnetic pause — 2026-11-13

The first cloud now scatters softly along a moving cursor, then restores the existing magnet after a pause. The client selected the same restrained radius/travel as the form.

- `_updateHeroInteraction` tracks its own consumed cursor segment and clock, independent of the assembled-page scatter. Movement over 0.5 CSS px mutes the hero magnet; after 150 ms idle, `u_heroMagnetWeight` smoothly returns to one over 200 ms. The existing 0.72 attraction, lift and scale use this shared color/depth weight.
- The existing GPU velocity pass receives a swept screen-space segment, 45 px radius and up to 25 px target offset. Damped local steering and the original spring/friction return the papers toward their cloud positions in roughly a second. No new render target, pass, draw call or per-frame CPU readback is added.
- The velocity pass projects current simulated centers with the rendering view/projection matrices and mirrors the hero's random drift/seeded depth. The unused YZW channels of `t_params3` carry the visible instances' `a_random.xyz`; X still controls later explosion. New material uniforms are appended to preserve indexed uniform access.
- Input starts after the intro show settles and fades over raw/eased hero progress 0.1–0.46. Leaving the hero, blur/mouseleave and resize clear the segment; stationary scrolling cannot inject impulses. Touch, coarse pointers, live reduced motion and hidden/unfocused documents disable the interaction.

- Browser acceptance passed on the existing localhost:3000 server: sharp/current desktop, mobile and initial/live reduced motion; actual GPU displacement, moving/stationary cursor, magnetic recovery, forward/reverse scroll, resize, touch and leave resets. No new shader/JS errors; WebGL error zero. Temporary QA: `/private/tmp/qa-dala-hero-scatter.mjs`; screenshots: `/private/tmp/dala-hero-scatter-{sharp,current,mobile,reduced}-{before,active,settled}.png`. No build or dev-server restart.

## Two finale views — 2026-11-13

The client selected folder as the default and a larger standalone VISA alternative, using the earlier stamped-page scale.

- `app/lib/finaleControls.ts` owns the typed client publisher for `?finale=folder|document`, `window.__DALA_FINALE_MODE__` and `dala:finale-mode`. The visible final-stage panel and DevTuner share it; URL reload/popstate are supported. Existing `folder=a|b|c`, `docs` and other query parameters remain independent. A/B/C is retained and hidden in document mode; mobile exposes the two view buttons above the footer bar.
- `documentTimeline` accepts `finaleMode` (default folder) plus an optional numeric `finaleMix` for the 200ms transition. Numeric standalone-frame, VISA availability and idle weights remove dependencies on opening a hidden folder. Earlier scenes are unchanged. Standalone collects directly at the existing finale interval, stays visible, and holds over the existing opening stage without changing section heights.
- Desktop standalone ends at x=-3.2, y=0, factor=4.65. Mobile starts from the earlier factor=3 and fits above the measured footer with space reserved for idle motion. Color/depth consume the same frame and visibility uniforms.
- Current-scroll switching uses the existing frame clock, clears both cursor histories/springs and gates interaction until framing settles. Standalone bypasses the pocket mask. Reduced motion snaps the frame/mode instead of animating the switch; ordinary mobile retains half idle without hover scatter.
- Added timeline regression scenarios for direct collection, default/invalid modes, previous-scene equality, A/B/C preservation and reversible blend endpoints. Browser/WebGL acceptance and the Node test runner remain unrun under AGENTS.md's lightweight-only verification rule.

## Live folder and VISA interaction — 2026-11-13

This supersedes the stable, non-interactive finale below. The client selected the form's floating/rocking motion for the closed folder, then only the VISA page after opening.

- `document-motion.cjs` shares the existing idle pose, cursor impulse and critically damped return formulas between core and folder. Core retains its form/stamp gating and adds fully open, settled VISA; each stage/grid has separate pointer history and clears springs on transitions. Folder receives its own move/leave/resize events.
- `u_finaleGap` (default 0.04) shrinks settled cells around unchanged centers in all folder layers and the final page. Core color/depth use the same vertex shader and gap uniform. UVs, particle counts and complete faces are retained. DevTuner exposes the gap with copy/reset; existing idle/scatter controls also serve the finale.
- Closed-folder idle enters over the final 5% of assembly and fades at progress 6.1→6.2. Only the exterior cover scatters after assembly. VISA idle enters over the final 10% of opening; VISA scatter waits for full opening, visible/settled paper. The open folder subtracts the page-only idle transform and remains still.
- Cover and pocket alpha masks are cached once at 256px from existing textures. Projected cover picking ignores transparent margins. VISA picking ignores cells and cursor segments behind the pocket. No per-frame image readback, new assets, FBOs or render passes.
- Mobile halves idle and disables scatter; live reduced-motion disables both. New helper regression scenarios cover strength, swept paths, deterministic travel limits and exact spring return. Browser/WebGL acceptance and the Node test runner remain unrun under the lightweight-only AGENTS.md rule.

## Cursor scatter on the stamped page — 2026-11-13

The completed stamp page now shares the second-stage form's cursor scatter. This supersedes the separate ink plane described below.

- `documentScatterWeight` preserves the form window and adds 3.65→4.6 after `StampPlayback` is done and the page is assembled. It fades on 4.5→4.6. The same 45px radius / 25px travel / 15° tilt / 0.10 depth / 150ms pause / ~1s return and DevTuner controls serve both scenes. Touch/coarse pointers, reduced motion, focus checks and mousemove-only activation are retained.
- The core's existing attributes and springs are reused. Inactive stages and direct jumps between pages clear displacement and cursor history. Reverse entry permits interaction after settling; returning to the preceding cloud rearms the automatic stamp first.
- The ink is composited into `pMaster` via rest-page UVs, before mosaic/paper shading. A shared `STAMP_PLACEMENT` gives the body and inverse UV mapping the same center, size and angle. Timed ink opacity uses a shared core uniform, zero outside the stamp scene. The separate mark mesh/material is removed, so each ink fragment moves with its actual tile and color/depth stay aligned.
- Assets, automatic top-down pressing, scroll length, existing form idle motion and folder behavior are retained. Regression cases cover completion gating, fades, unsettled paper, reverse entry and replay. The single final batch passed `npx tsc --noEmit` and targeted CJS ESLint (no-unreachable/no-duplicate-case/no-unexpected-multiline) for the three changed code files. Node test runner and browser/WebGL QA were not run under the lightweight-only rule.

## Shared finale paper relief — 2026-11-13

The client selected the earlier form/stamp paper style for the whole folder composition, with a stable final frame and no cursor scatter.

- `paperMicroReliefDecl` supplies one shared GLSL function for the VISA page and all instanced folder layers. It adds directional edge shading, the existing document-corner shadow profile, a shaded fold and restrained deterministic tone variation after the printed artwork is sampled, before the shared color grade. Navy and ivory retain their palette through multiplicative shading.
- Core's internal `u_finalePaper` eases toward the existing `timeline.finale`, independently of VISA sticker opacity. Earlier scenes target zero relief; folder relief follows each cell's existing settle weight. No new timers or scroll phases were introduced.
- Complete per-instance faces, UVs, alpha/depth coverage, particle counts, assets, A/B/C entrance and opening transforms are retained. `?foldersheets=0` remains the flat comparison. No cursor interaction was added to the finale.
- Visual acceptance remains pending: closed folder, opening midpoint, open VISA frame, reverse scroll, A/B/C, mobile and reduced motion. Verification is limited to targeted ESLint under AGENTS.md; no production build or dev-server launch/restart.

## Assembled-form idle float — 2026-11-13

The client selected subtle whole-page floating and rocking while the second-scene form holds, alongside the approved cursor scatter.

- `an._applyFormIdle(time)` uses the existing GSAP frame clock (seconds): horizontal ±2 CSS px / 8s, vertical ±5 CSS px / 6s, X tilt ±0.6° / 8s, Y tilt ±0.8° / 10s, Z tilt ±0.3° / 7s. All tiles move rigidly together. No geometry deformation, shader changes, extra FBOs or draw calls were added.
- Smooth scroll envelopes enter at 0.95→1.05 and exit at 1.7→1.8. Phase is never restarted on re-entry. Mobile halves all amplitudes; live reduced-motion disables the addition immediately. Strength zero also removes the addition immediately.
- The previous frame's idle offset/rotation is subtracted before the scroll base eases; the new idle transform is added afterwards. This prevents cumulative drift and leaves no idle residue in stamp/folder stages. CSS pixels convert to view units using the current center depth and camera projection, independent of viewport size and DPR.
- Color and depth receive exactly the same final offset/rotation. The existing cursor projection reads those transforms after idle is applied, preserving the 45px / 25px / 15° scatter. Stationary pointers still cannot inject scatter.
- DevTuner reads `_idleTune.strength` (default 1), exposes “Сила живого руху” at 0–2 in steps of 0.05, and includes it in the existing copy/reset flow.
- Acceptance scenarios: idle hold, moving/stationary cursor, forward/reverse boundary crossings, resize, strength zero/reset, mobile half amplitude and live reduced-motion. Visual/browser acceptance remains to be confirmed. The single final batch passed TypeScript, targeted DevTuner ESLint, syntax-oriented bundle ESLint (no-unreachable/no-duplicate-case/no-unexpected-multiline), and diff whitespace checks under AGENTS.md.

## Top-down stamp contact — 2026-11-13

This supersedes the side-view sprite, billboard, XY travel and 3% Y compression in the earlier automatic-stamp entry. The client selected a stamp viewed from above to match the frontal document.

- `npm run assets:stamp-body` retains the S-01 cutout and generates `public/images/stamp-body-top.svg` plus `.png`. The new navy/champagne body has a circular base and compact central handle. Its 1024px canvas matches the unchanged ink texture; the base radius is derived from all nonzero-alpha ink pixels plus a small cover margin. Do not trim this new PNG.
- Runtime `stamp_body` loads the new PNG. Body and mark now use the same centered square geometry, local anchor, fixed angle and page-space vertex shader. Their contact scale is 1.4; the body renders over the ink. The old bottom-edge translation, camera-facing shader and XY offsets are removed.
- `stampPose` now returns `{ scale, opacity, ink }`. The 1.2s cycle appears at uniform scale 1.12 through 0.35s, presses to 1.0 at 0.5s, holds until 0.65s, then grows toward 1.12 while fading out. Ink forms underneath during contact. Playback state, replay/fast-scroll handling and the 150ms reduced-motion ink fade are preserved.
- Regression scenarios now cover one scale minimum, no position/Y-squash outputs, full coverage during contact and continuous scale. The generated asset has been inspected directly; browser/WebGL alignment still requires visual confirmation. The single final verification batch passed: `npx tsc --noEmit`, generator ESLint, and syntax-oriented ESLint for the three modified CJS files. The Node test runner was not run under the lightweight-only rule in AGENTS.md.

## Two-screen scatter and automatic 2D stamp — 2026-11-13

This supersedes the first-cloud duration and the two scroll-driven presses below.

- `ManifestoIntro` keeps the extra two paragraph panels behind `SHOW_EXTRA_SCATTER_SCREENS = false`. Flip it to restore them and a four-screen budget. The active first scatter, from progress 1.8 to 3.4, gets 200svh including the neighboring section tails and the legacy review margin. `Sn.fitFirstScatter` measures those portions on load/resize; the font-ready pass repeats the measurement before building scroll triggers. The compact section's progress includes the following margin to prevent premature assembly. Section indices and later scene targets remain intact.
- `legacy/document-stamp.cjs` owns the idle/playing/done state and a single 1.2-second press, independent of scrolling after the document has settled. Fast forward completes the imprint, reverse entry keeps it, and returning below 3.4 rearms playback. Visibility changes pause the clock; resizing does not reset it. Reduced motion uses a 150ms ink fade, and live preference changes preserve the cycle fraction.
- `Stamp` uses the existing sprite and imprint textures. Its billboard shader adds XY offsets at fixed anchor depth and a fixed angle; the one contact compresses the artwork by at most 3%. The moving shadow, depth flight, wobble, second press and paper impact are disabled. The imprint fades with the existing second scatter.
- Meaningful regression cases live in `legacy/document-stamp.test.cjs`; the old timeline test now describes a stable page during the automatic cycle. The single final validation batch passed: `npx tsc --noEmit`, targeted TSX ESLint, and syntax-oriented ESLint for the modified/new CJS files (no-unreachable, no-duplicate-case, no-unexpected-multiline). Browser/WebGL QA and the Node test runner have not been run under the current lightweight-only rule.

## Assembled-form cursor scatter — 2026-11-13

This supersedes the semantic-block hover and its overlay visibility fix below. The client selected local scatter along the moving cursor, return after stopping, and replacement of the old block magnet.

- Core now moves its actual 40×40 tiles through `a_stageScatter` (XYZ offset and signed rotation), after grid lock. Color and depth share `tn`; tile UVs stay attached to their original master-form fragments. The overlay mesh/material and region picking were removed.
- `_updateStageScatter` projects rest-cell centers to CSS pixels and tests the swept mouse segment clipped to the original page. Per-cell typed arrays hold targets, displacement, velocity and last-hit time. A critically damped, time-based spring moves the cells out and restores exact zero after settling. No extra FBO, draw call, asset regeneration or DOM animation is needed.
- Defaults softened after client review: radius 45 CSS px, travel up to 25 px (speed/falloff weighted), tilt up to 15°, depth up to 0.10 page units. These replace the original 80 px / 120 px / 40° / 0.35 settings, which opened too large a hole in the form. Return starts 150 ms after each cell's last hit and completes in about one second. DevTuner reads the runtime defaults for its radius/travel/return controls, including copy/reset.
- Interaction is restricted to assembled form progress 1→1.8, fades on 1.7→1.8, and clears outside that stage. Pointer coordinates are consumed only after mousemove, so scrolling under a stationary cursor cannot trigger scatter. Mouseleave/blur and resize reset the previous pointer. Touch, coarse pointers and reduced motion disable scatter; changing reduced motion clears it immediately.
- Desktop headless Chrome verified visible displacement (321 affected cells in the sampled sweep), exact return to the grid, no stationary retrigger, reverse scroll, mouseleave and live reduced-motion reset. WebGL error is zero; no new shader/JS errors. Screenshots: `/private/tmp/dala-scatter-{before,active,returned}.png`. Existing favicon/manifest 404 and fullscreen-triangle bounding-sphere warnings remain unrelated. Mobile form/stamp/finale also passed with scatter disabled and WebGL error zero. Final TypeScript, bundle syntax and diff whitespace checks passed.

## Assembled-form hover visibility fix — 2026-11-13

The selected-block overlay material must have `depthTest = false` and `depthWrite = false`, retaining render order 3. Browser diagnosis confirmed that picking, spring activation and GPU uniforms worked while depth testing hid the animated copy behind the base page. A controlled browser experiment made the block visible by disabling only that depth test. Keep the existing 12% growth, 0.8 attraction, 30 CSS-pixel target tether and original-region hit testing. See the latest hover entry in `docs/animation-scenario.md` for verification.

## Folder assembly and opening — 2026-11-13

This update supersedes the earlier single-step finale. The client retained the light cover and visa document, requested lightly visible mini-document seams, a distinct closed-folder stage, and a Deep Navy panel only behind the document.

- A full-viewport `.folder-finale-stage.js-section` precedes the footer. Earlier section indices remain 0–5; the new stage is 6 and footer is 7. The A/B/C switcher covers the entrance, new stage and footer.
- `documentTimeline` now supplies `folderAssemble`, `folderEnter`, `folderOpacity`, `folderBurst`, `folderOpen`, `visaReveal`, and `documentVisibility`. Folder and main document consume this one reversible scroll signal. Collection remains 5.5→6 desktop / 5.5→5.8 mobile. The closed folder holds to 6.2; opening is 6.2→6.85 desktop / 6.2→6.65 mobile, then holds through the footer.
- A/B/C affect closed-folder entrance only. B bursts folder instances, never the enclosed visa page. Mobile uses C; reduced motion suppresses entrance travel, burst and piece flight while retaining the closed/open sequence.
- The original document-core geometry supplies each folder piece. Rectangular grids (48×34 desktop / 35×25 mobile per layer) preserve paper proportions near the former instance budget. Edges receive subtle shading. `documentMosaicGeometry` adds a complete face to each existing GLB instance; the source silhouette is used in flight, and the complete face at settle prevents corner pinholes. The final visa page uses that same face and becomes opaque, with its source fold shading suppressed and tile overscan reduced. Earlier form/stamp appearances retain the source GLB. IDs remain deterministic and every piece remains independently addressable.
- `assets:finale` adds `folder-back-panel` with Deep Navy `#041E42`; `folder-panel` remains ivory on the opening cover. Outside/inside cover meshes switch explicitly at the hinge midpoint, avoiding mirrored exterior printing on the inside.
- The main page prepares its visa before opening and uses shared color/depth visibility to stay hidden while the folder enters. Cloud visibility returns when scrolling back below assembly. Existing form/stamp scenes and final framing are retained.
- Latest verification results are recorded in the animation-scenario journal.

## Finale appearance — 2026-11-13

- The client selected a light ivory folder and a visa sticker over the existing v2 form. This supersedes historical descriptions of a navy folder and VISA letters made from recolored particles.
- `npm run assets:finale` deterministically creates SVG/PNG surfaces under `public/images/finale/`, preserving the original designer assets. The transparent A4 visa overlay uses path lettering (no font dependency), champagne border and abstract data rows; desktop loads 4096px, mobile 2048px.
- The main mosaic keeps sampling `master_form` in the finale. `t_visa` now samples the RGBA overlay in the same page UV space; `u_visaReveal` fades only the sticker after assembly (5.92→6 desktop, 5.76→5.8 mobile). It no longer recolors the page. The old color-map generator output remains on disk but is unused at runtime.
- Folder layers clone the main formation's document-core geometry, with deterministic cell seeds, atlas print while flying, and surface UVs when settled. Grid density stays 40×40 / 30×30. Folder and main document use the same color-grading helper and live paper uniforms. Flight stays flat and scroll-driven; A/B/C, mobile C and reduced motion are retained.
- The shallow pocket renders in front of the lower page (order 25), below the visa overlay region; the hinged cover remains above it. `?foldersheets=0` retains a flat light-surface comparison.
- Browser verification and targeted lint results are recorded in the latest animation-scenario journal entry.

## Current choreography — 2026-11-13

This update supersedes the earlier timelines, including step 13's restoration of streams. The client has now removed the five-stream scene completely. The current sequence is hero → form → scatter/float → stamp document → scatter/float → open folder/VISA. The final frame holds; A/B/C remain available.

- `legacy/document-timeline.cjs` is the shared desktop/mobile scroll target function. Core color/depth passes and both FBO simulations use the same formation/explosion values. No one-shot timers were added.
- Timeline: form assembles 0→1, holds to 1.8; scatters 1.8→2.2 and floats continuously to 3.4; stamp document assembles 3.4→3.65, holds through both presses and the imprint to 4.6; scatters 4.6→4.95, floats to 5.5; finale collects 5.5→6 (mobile 5.8). Section heights are unchanged.
- The four-bank texture format is preserved. Banks 2 and 3 now contain identical flat stamp-page positions, scales and colors; all stream generation and timeline parameters are removed. Formation progress goes directly from 1 to 3 during stamp assembly. Regenerate the uncompressed EXR and companion PNGs with `npm run assets:documents` when editing the generator.
- Both transition clouds share the existing tumble, depth variation and time-driven drift. Reduced motion keeps explosion ≤0.12 and suppresses the added tumble/drift.
- The stamp arrives from 3.6; presses remain at 3.92 and 4.15, departure ends at 4.42. The imprint fades with the breaking paper after 4.6. Folder/VISA final positions, colors and A/B/C remain intact.
- The former `Document flows` section is titled `Document review`; its layout and placeholder paragraphs are unchanged.
- Assembled-form hover: each of the six existing semantic regions grows by 12% and follows the pointer with the existing spring. Attraction is 0.8 and the target tether is 30 CSS px (~24 px visible center travel); DevTuner reads these runtime defaults and resets to them. Picking stays tied to the original region, releasing on exit and finishing its return before another region activates. Touch/reduced-motion remain disabled. See step 15 for acceptance scenarios and verification limits.
- Regression scenarios in `legacy/document-timeline.test.cjs` reflect the two remaining transitions. Current verification details are in step 14 of `docs/animation-scenario.md`; earlier browser QA is historical and does not validate this removal.

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

Final runtime acceptance also passed on the plain `/` URL without diagnostic parameters: zero-press activation, unchanged scene after a native click, stable blur/resize/visibility lifecycle and WebGL error zero.

Current render also passed exact frozen color/depth parity (max difference 0). Mobile and initial reduced motion passed with interaction disabled. Final TypeScript, targeted CJS ESLint and diff whitespace checks passed.

The final magnetic scale is uniform XYZ about the native center (not view XY alone), preserving tilted-sheet proportions. Current-render acceptance passed the full flow and measured ~1.86x width / ~1.78x height at a fixed magnetic depth. Mobile and initial reduced motion also passed.

Final uniform-XYZ sharp acceptance passed too (~1.86x width / ~1.82x height in the isolated fixed-depth sample); TypeScript, targeted ESLint and diff whitespace checks passed. No production build or dev-server restart.
