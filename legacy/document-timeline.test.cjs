const { test } = require("node:test");
const assert = require("node:assert/strict");
const { documentTimeline } = require("./document-timeline.cjs");

test("each formation holds, breaks apart, floats, then resolves into the next", () => {
  for (const mobile of [false, true]) {
    const at = progress => documentTimeline(progress, { mobile });
    for (const [progress, formation] of [[1.4, 1], [3.8, 3], [4.5, 3]]) {
      assert.equal(at(progress).formation, formation);
      assert.equal(at(progress).explode, 0, `form must hold at ${progress}`);
    }
    for (const floating of [2.3, 2.6, 2.9, 3.1, 3.3, 3.4]) {
      assert.equal(at(floating).explode, 1);
      assert.equal(at(floating).formation, 1, "no intermediate formation before the stamp page");
      assert.equal(at(floating).x, 0, "free flight stays centered until the stamp page assembles");
    }
    assert.ok(at(3.52).formation > 1 && at(3.52).formation < 3);
    assert.ok(at(3.52).explode > 0 && at(3.52).explode < 1);
    assert.equal(at(5.2).explode, 1);
    assert.equal(at(5.2).finale, 0, "folder must wait for free flight after the stamp");
    assert.equal(at(6).explode, 0);
    assert.equal(at(6).finale, 1);
  }
});

test("the automatic stamp and its finished imprint have stable paper beneath them", () => {
  for (const progress of [3.65, 3.8, 4, 4.2, 4.4, 4.59]) {
    const state = documentTimeline(progress);
    assert.equal(state.formation, 3);
    assert.equal(state.explode, 0);
    assert.equal(state.stampScatter, 0);
    assert.equal(state.x, -3.2);
  }
});

test("scroll targets remain bounded and continuous through every transition", () => {
  for (const mobile of [false, true]) {
    for (const variant of ["a", "b", "c"]) {
      let previous = documentTimeline(-0.1, { mobile, variant });
      for (let i = -99; i <= 7500; i++) {
        const state = documentTimeline(i / 1000, { mobile, variant });
        for (const [key, value] of Object.entries(state)) {
          assert.ok(Number.isFinite(value), key);
          assert.ok(Math.abs(value - previous[key]) < 0.04, `jump in ${key} at ${i / 1000}`);
        }
        assert.ok(state.formation >= 0 && state.formation <= 3);
        assert.ok(state.explode >= 0 && state.explode <= 1);
        previous = state;
      }
    }
  }
});

test("fast jumps and reverse scrolling produce the same targets", () => {
  const positions = [0, 1.4, 2.3, 2.9, 3.3, 3.8, 4.22, 5.2, 5.85, 6, 6.2, 6.45, 6.85, 7];
  const forward = positions.map(progress => documentTimeline(progress));
  positions.toReversed().forEach((progress, index) => {
    assert.deepEqual(documentTimeline(progress), forward[forward.length - 1 - index]);
  });
});

test("folder assembles closed, holds, then opens with the visa already prepared", () => {
  for (const mobile of [false, true]) {
    const end = mobile ? 5.8 : 6;
    for (const variant of ["a", "b", "c"]) {
      const at = progress => documentTimeline(progress, { mobile, variant });
      assert.equal(at(5.2).folderOpacity, 0);
      assert.ok(at(5.65).folderAssemble > 0 && at(5.65).folderAssemble < 1);
      for (const progress of [end, 6.1, 6.2]) {
        const state = at(progress);
        assert.equal(state.folderAssemble, 1);
        assert.equal(state.folderEnter, 1);
        assert.equal(state.folderOpen, 0);
        assert.equal(state.visaReveal, 1);
        assert.equal(state.documentVisibility, 0);
      }
      assert.ok(at(6.4).folderOpen > 0 && at(6.4).folderOpen < 1);
      assert.equal(at(6.4).documentVisibility, 1);
      assert.equal(at(mobile ? 6.65 : 6.85).folderOpen, 1);
      assert.deepEqual(at(7), at(7.5));
    }
  }
});

test("B bursts the folder pieces without breaking the enclosed page", () => {
  const a = documentTimeline(5.8, { variant: "a" });
  const b = documentTimeline(5.8, { variant: "b" });
  assert.equal(b.explode, a.explode);
  assert.equal(b.formation, a.formation);
  assert.ok(b.folderBurst > 0);
  assert.equal(documentTimeline(6, { variant: "b" }).folderBurst, 0);
  assert.equal(documentTimeline(5.8, { variant: "b", reducedMotion: true }).folderBurst, 0);
});

test("mobile and reduced motion preserve the sequence with a stable final frame", () => {
  for (const mobile of [false, true]) {
    for (const variant of ["a", "b", "c"]) {
      for (const progress of [1, 2.3, 2.9, 3.3, 3.8, 4.22, 5.2, 5.86, 6]) {
        const normal = documentTimeline(progress, { mobile, variant });
        const reduced = documentTimeline(progress, { mobile, variant, reducedMotion: true });
        assert.equal(reduced.formation, normal.formation);
        assert.ok(reduced.explode <= 0.12);
      }
      const end = documentTimeline(mobile ? 5.8 : 6, { mobile, variant });
      assert.equal(end.finale, 1);
      assert.ok(end.explode < 0.000001);
    }
  }
});


test("standalone assembles a stable blank page, then applies VISA with further scroll", () => {
  for (const mobile of [false, true]) {
    const assembled = mobile ? 5.8 : 6;
    const applied = mobile ? 6.65 : 6.85;
    const at = progress => documentTimeline(progress, { mobile, finaleMode: "document" });
    assert.equal(at(5.2).standaloneFrame, 0);
    assert.equal(at(5.2).explode, 1);
    assert.ok(at(5.65).standaloneFrame > 0 && at(5.65).standaloneFrame < 1);
    for (const progress of [assembled, 6.1, 6.2]) {
      assert.equal(at(progress).visaReveal, 0, "the collected page is blank before application");
      assert.equal(at(progress).visaApplication, 0);
      assert.equal(at(progress).visaAvailable, 0);
    }
    const midway = at((6.2 + applied) / 2);
    assert.ok(midway.visaApplication > 0 && midway.visaApplication < 1);
    assert.ok(midway.visaAvailable < 1, "cursor scatter waits for fixation");
    assert.deepEqual(at((6.2 + applied) / 2), midway, "pausing scroll holds the same phase");
    for (const progress of [assembled, 6.1, 6.5, applied, 7, 7.5]) {
      assert.equal(at(progress).folderOpacity, 0);
      assert.equal(at(progress).documentVisibility, 1);
      assert.equal(at(progress).finaleLayout, 1, "layout is independent of sticker alpha");
      assert.equal(at(progress).visaIdleWeight, 1);
      assert.equal(at(progress).standaloneFrame, 1);
      assert.equal(at(progress).explode, 0);
      assert.ok(Math.abs(at(progress).x + 3.2) < 1e-9);
    }
    for (const progress of [applied, 7, 7.5]) {
      assert.equal(at(progress).visaReveal, 1);
      assert.equal(at(progress).visaApplication, 1);
      assert.equal(at(progress).visaAvailable, 1);
    }
    const stops = [5.5, assembled, 6.2, (6.2 + applied) / 2, applied, 7];
    const forward = stops.map(at);
    stops.toReversed().forEach((progress, index) => assert.deepEqual(at(progress), forward[forward.length - 1 - index]));
  }
});

test("reduced motion reveals the sticker over the same scroll interval", () => {
  for (const mobile of [false, true]) {
    const end = mobile ? 6.65 : 6.85;
    const at = progress => documentTimeline(progress, { mobile, finaleMode: "document", reducedMotion: true });
    assert.equal(at(6.2).visaReveal, 0);
    assert.ok(Math.abs(at((6.2 + end) / 2).visaReveal - 0.5) < 1e-9);
    assert.equal(at(end).visaReveal, 1);
    assert.equal(at(end).visaAvailable, 1);
  }
});

test("mode selection preserves earlier scenes, defaults and folder variants", () => {
  for (const progress of [0, 1.4, 2.5, 3.8, 4.55, 5.2, 5.5]) {
    assert.deepEqual(documentTimeline(progress, { finaleMode: "document" }), documentTimeline(progress));
  }
  assert.deepEqual(documentTimeline(6.5, { finaleMode: "invalid" }), documentTimeline(6.5));
  for (const variant of ["a", "b", "c"]) {
    assert.deepEqual(documentTimeline(6.5, { variant, finaleMode: "folder" }), documentTimeline(6.5, { variant }));
  }
});

test("mode blending uses the current scroll target and reverses without history", () => {
  for (const mobile of [false, true]) {
    for (const progress of [5.6, 6.1, 6.5, 7]) {
      const folder = documentTimeline(progress, { mobile, finaleMode: "folder" });
      const page = documentTimeline(progress, { mobile, finaleMode: "document" });
      const mixed = documentTimeline(progress, { mobile, finaleMix: 0.5 });
      for (const key of Object.keys(folder)) {
        assert.ok(Number.isFinite(mixed[key]));
        assert.ok(Math.abs(mixed[key] - (folder[key] + page[key]) / 2) < 1e-9);
      }
      assert.deepEqual(documentTimeline(progress, { mobile, finaleMix: 0 }), folder);
      assert.deepEqual(documentTimeline(progress, { mobile, finaleMix: 1 }), page);
    }
  }
});
