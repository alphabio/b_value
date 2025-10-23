# Generator Fix Execution Checklist

**Use this to track progress. Check off each item as completed.**

---

## Phase 1: Leaf Generators (128 files)

### Module 1: Color (12 files) ⏱️ 30 min
- [ ] `src/generate/color/hex.ts`
- [ ] `src/generate/color/named.ts`
- [ ] `src/generate/color/rgb.ts`
- [ ] `src/generate/color/hsl.ts`
- [ ] `src/generate/color/hwb.ts`
- [ ] `src/generate/color/lab.ts`
- [ ] `src/generate/color/lch.ts`
- [ ] `src/generate/color/oklab.ts`
- [ ] `src/generate/color/oklch.ts`
- [ ] `src/generate/color/system.ts`
- [ ] `src/generate/color/special.ts`
- [ ] `src/generate/color/color-function.ts`
- [ ] Tests passing: `pnpm test src/generate/color`

### Module 2: Background (6 files) ⏱️ 15 min
- [ ] `src/generate/background/attachment.ts`
- [ ] `src/generate/background/clip.ts`
- [ ] `src/generate/background/origin.ts`
- [ ] `src/generate/background/position-x.ts`
- [ ] `src/generate/background/position-y.ts`
- [ ] `src/generate/background/repeat.ts`
- [ ] Tests passing: `pnpm test src/generate/background`

### Module 3: Border (3 files) ⏱️ 10 min
- [ ] `src/generate/border/color.ts`
- [ ] `src/generate/border/radius.ts`
- [ ] `src/generate/border/width.ts`
- [ ] Tests passing: `pnpm test src/generate/border`

### Module 4: Typography (11 files) ⏱️ 30 min
- [ ] `src/generate/typography/font-style.ts`
- [ ] `src/generate/typography/font-weight.ts`
- [ ] `src/generate/typography/letter-spacing.ts`
- [ ] `src/generate/typography/line-height.ts`
- [ ] `src/generate/typography/overflow-wrap.ts`
- [ ] `src/generate/typography/text-align.ts`
- [ ] `src/generate/typography/text-decoration-line.ts`
- [ ] `src/generate/typography/text-decoration-style.ts`
- [ ] `src/generate/typography/text-transform.ts`
- [ ] `src/generate/typography/vertical-align.ts`
- [ ] `src/generate/typography/word-break.ts`
- [ ] Tests passing: `pnpm test src/generate/typography`

### Module 5: Layout (34 files) ⏱️ 90 min
- [ ] `src/generate/layout/bottom.ts`
- [ ] `src/generate/layout/clear.ts`
- [ ] `src/generate/layout/display.ts`
- [ ] `src/generate/layout/float.ts`
- [ ] `src/generate/layout/height.ts`
- [ ] `src/generate/layout/left.ts`
- [ ] `src/generate/layout/margin-bottom.ts`
- [ ] `src/generate/layout/margin-left.ts`
- [ ] `src/generate/layout/margin-right.ts`
- [ ] `src/generate/layout/margin-top.ts`
- [ ] `src/generate/layout/max-height.ts`
- [ ] `src/generate/layout/max-width.ts`
- [ ] `src/generate/layout/min-height.ts`
- [ ] `src/generate/layout/min-width.ts`
- [ ] `src/generate/layout/overflow.ts`
- [ ] `src/generate/layout/overflow-x.ts`
- [ ] `src/generate/layout/overflow-y.ts`
- [ ] `src/generate/layout/padding-bottom.ts`
- [ ] `src/generate/layout/padding-left.ts`
- [ ] `src/generate/layout/padding-right.ts`
- [ ] `src/generate/layout/padding-top.ts`
- [ ] `src/generate/layout/position.ts`
- [ ] `src/generate/layout/right.ts`
- [ ] `src/generate/layout/top.ts`
- [ ] `src/generate/layout/visibility.ts`
- [ ] `src/generate/layout/width.ts`
- [ ] `src/generate/layout/z-index.ts`
- [ ] (remaining 7 layout files)
- [ ] Tests passing: `pnpm test src/generate/layout`

### Module 6: Flexbox (11 files) ⏱️ 30 min
- [ ] `src/generate/flexbox/align-content.ts`
- [ ] `src/generate/flexbox/align-items.ts`
- [ ] `src/generate/flexbox/align-self.ts`
- [ ] `src/generate/flexbox/flex-basis.ts`
- [ ] `src/generate/flexbox/flex-direction.ts`
- [ ] `src/generate/flexbox/flex-grow.ts`
- [ ] `src/generate/flexbox/flex-shrink.ts`
- [ ] `src/generate/flexbox/flex-wrap.ts`
- [ ] `src/generate/flexbox/justify-content.ts`
- [ ] `src/generate/flexbox/order.ts`
- [ ] `src/generate/flexbox/gap.ts`
- [ ] Tests passing: `pnpm test src/generate/flexbox`

### Module 7: Animation (8 files) ⏱️ 20 min
- [ ] `src/generate/animation/delay.ts`
- [ ] `src/generate/animation/direction.ts`
- [ ] `src/generate/animation/duration.ts`
- [ ] `src/generate/animation/fill-mode.ts`
- [ ] `src/generate/animation/iteration-count.ts`
- [ ] `src/generate/animation/name.ts`
- [ ] `src/generate/animation/play-state.ts`
- [ ] `src/generate/animation/timing-function.ts`
- [ ] Tests passing: `pnpm test src/generate/animation`

### Module 8: Transition (4 files) ⏱️ 10 min
- [ ] `src/generate/transition/delay.ts`
- [ ] `src/generate/transition/duration.ts`
- [ ] `src/generate/transition/property.ts`
- [ ] `src/generate/transition/timing-function.ts`
- [ ] Tests passing: `pnpm test src/generate/transition`

### Module 9: Clip-Path (10 files) ⏱️ 30 min
- [ ] `src/generate/clip-path/circle.ts`
- [ ] `src/generate/clip-path/ellipse.ts`
- [ ] `src/generate/clip-path/inset.ts`
- [ ] `src/generate/clip-path/path.ts`
- [ ] `src/generate/clip-path/polygon.ts`
- [ ] (remaining 5 clip-path files)
- [ ] Tests passing: `pnpm test src/generate/clip-path`

### Module 10: Filter (11 files) ⏱️ 30 min
- [ ] `src/generate/filter/blur.ts`
- [ ] `src/generate/filter/brightness.ts`
- [ ] `src/generate/filter/contrast.ts`
- [ ] `src/generate/filter/drop-shadow.ts`
- [ ] `src/generate/filter/grayscale.ts`
- [ ] `src/generate/filter/hue-rotate.ts`
- [ ] `src/generate/filter/invert.ts`
- [ ] `src/generate/filter/opacity.ts`
- [ ] `src/generate/filter/saturate.ts`
- [ ] `src/generate/filter/sepia.ts`
- [ ] `src/generate/filter/url.ts`
- [ ] Tests passing: `pnpm test src/generate/filter`

### Module 11: Gradient (3 files) ⏱️ 10 min
- [ ] `src/generate/gradient/linear.ts`
- [ ] `src/generate/gradient/radial.ts`
- [ ] `src/generate/gradient/conic.ts`
- [ ] Tests passing: `pnpm test src/generate/gradient`

### Module 12: Shadow (2 files) ⏱️ 10 min
- [ ] `src/generate/shadow/box-shadow.ts`
- [ ] `src/generate/shadow/text-shadow.ts`
- [ ] Tests passing: `pnpm test src/generate/shadow`

### Module 13: Text (4 files) ⏱️ 10 min
- [ ] All text/ generators
- [ ] Tests passing: `pnpm test src/generate/text`

### Module 14: Outline (3 files) ⏱️ 10 min
- [ ] `src/generate/outline/color.ts`
- [ ] `src/generate/outline/offset.ts`
- [ ] `src/generate/outline/width.ts`
- [ ] Tests passing: `pnpm test src/generate/outline`

### Module 15: Interaction (2 files) ⏱️ 5 min
- [ ] `src/generate/interaction/pointer-events.ts`
- [ ] `src/generate/interaction/user-select.ts`
- [ ] Tests passing: `pnpm test src/generate/interaction`

### Module 16: Visual (2 files) ⏱️ 5 min
- [ ] `src/generate/visual/background-blend-mode.generate.ts`
- [ ] `src/generate/visual/mix-blend-mode.generate.ts`
- [ ] Tests passing: `pnpm test src/generate/visual`

### Module 17: Transform (1 file) ⏱️ 5 min
- [ ] `src/generate/transform/origin.ts`
- [ ] Tests passing: `pnpm test src/generate/transform`

### Phase 1 Checkpoint ✅
- [ ] All 128 leaf generators fixed
- [ ] Run: `just test` → ALL PASSING

---

## Phase 2: Dispatcher Generators (11 files) ⏱️ 30 min

- [ ] `src/generate/animation/animation.ts`
- [ ] `src/generate/border/border.ts`
- [ ] `src/generate/clip-path/clip-path.ts`
- [ ] `src/generate/color/color.ts`
- [ ] `src/generate/filter/filter.ts`
- [ ] `src/generate/gradient/gradient.ts`
- [ ] `src/generate/outline/outline.ts`
- [ ] `src/generate/position/position.ts`
- [ ] `src/generate/shadow/shadow.ts`
- [ ] `src/generate/transform/transform.ts`
- [ ] `src/generate/transition/transition.ts`

### Phase 2 Checkpoint ✅
- [ ] Run: `just test` → ALL PASSING

---

## Phase 3: Update Generator Test Files (53 files) ⏱️ 90 min

- [ ] `src/generate/color/*.test.ts` (12 files)
- [ ] `src/generate/background/*.test.ts` (6 files)
- [ ] `src/generate/border/*.test.ts` (3 files)
- [ ] `src/generate/typography/*.test.ts` (11 files)
- [ ] `src/generate/layout/*.test.ts` (34 files)
- [ ] (continue for all modules)

### Phase 3 Checkpoint ✅
- [ ] Run: `just test` → ALL PASSING

---

## Phase 4: Update Parse Round-Trip Tests ⏱️ 30 min

- [ ] Find: `grep -r "\.toCss(" src/parse --include="*.test.ts"`
- [ ] Update each occurrence
- [ ] Run: `just test` → ALL PASSING

---

## Phase 5: Final Verification ✅

```bash
# 1. No toCss() calls remain
grep -r "\.toCss(" src/ --include="*.ts" | grep -v "test.ts" | wc -l
```
- [ ] Result: 0

```bash
# 2. All tests pass
just test
```
- [ ] Result: 2938+ passing

```bash
# 3. No lint errors
just check
```
- [ ] Result: clean

```bash
# 4. All generators return GenerateResult
find src/generate -name "*.ts" -type f ! -name "*.test.ts" -exec grep -L "GenerateResult" {} \;
```
- [ ] Result: empty (or only index.ts files)

---

## Final Commit ✅

```bash
git add -A
git commit -m "refactor(generate): make all generators return GenerateResult with validation

- Change 128 generators from toCss() → generate()
- Add input validation to all generators (validate IR structure, kind field, required fields)
- Change return type: string → GenerateResult
- Update all tests to expect GenerateResult
- Update all callsites (dispatcher generators + tests)

BREAKING CHANGE: All generator functions now return GenerateResult instead of raw strings.
This enforces Parse/Generate symmetry - both operations validate untrusted input."
```

- [ ] Committed ✅

---

## 🎉 COMPLETE!

All 139 generators now return `GenerateResult` with validation.
Clean API achieved. No hacks. No noise.
