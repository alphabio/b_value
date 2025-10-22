# Generator Fix Progress Tracker

**Started**: TBD  
**Status**: 🔴 NOT STARTED  
**Progress**: 0/139 generators fixed (0%)

---

## Progress Summary

| Phase | Status | Count | Percentage |
|-------|--------|-------|------------|
| Leaf Generators | ⬜ Not Started | 0/80 | 0% |
| Mid-Level Generators | ⬜ Not Started | 0/35 | 0% |
| Complex Generators | ⬜ Not Started | 0/13 | 0% |
| Dispatcher Generators | ✅ Already Done | 11/11 | 100% |
| Custom Named | ⬜ Not Started | 0/2 | 0% |
| **TOTAL** | ⬜ | **11/139** | **8%** |

---

## Phase 1: Preparation ⬜

- [ ] Create `src/utils/generate-validation.ts`
- [ ] Document migration pattern example
- [ ] Identify all callsites (grep for `.toCss(`)
- [ ] Test validation utility

**Estimated time**: 30 minutes

---

## Phase 2: Fix Generators by Module

### Animation (8 files to fix)

- [ ] `src/generate/animation/delay.ts`
- [ ] `src/generate/animation/direction.ts`
- [ ] `src/generate/animation/duration.ts`
- [ ] `src/generate/animation/fill-mode.ts`
- [ ] `src/generate/animation/iteration-count.ts`
- [ ] `src/generate/animation/name.ts`
- [ ] `src/generate/animation/play-state.ts`
- [ ] `src/generate/animation/timing-function.ts`

### Background (7 files to fix)

- [ ] `src/generate/background/attachment.ts`
- [ ] `src/generate/background/clip.ts`
- [ ] `src/generate/background/origin.ts`
- [ ] `src/generate/background/position-x.ts`
- [ ] `src/generate/background/position-y.ts`
- [ ] `src/generate/background/repeat.ts`
- [ ] `src/generate/background/size.ts`

### Border (3 files to fix)

- [ ] `src/generate/border/color.ts`
- [ ] `src/generate/border/radius.ts`
- [ ] `src/generate/border/style.ts`
- [ ] `src/generate/border/width.ts`

### Clip-Path (10 files to fix)

- [ ] `src/generate/clip-path/circle.ts`
- [ ] `src/generate/clip-path/ellipse.ts`
- [ ] `src/generate/clip-path/geometry-box.ts`
- [ ] `src/generate/clip-path/inset.ts`
- [ ] `src/generate/clip-path/none.ts`
- [ ] `src/generate/clip-path/path.ts`
- [ ] `src/generate/clip-path/polygon.ts`
- [ ] `src/generate/clip-path/rect.ts`
- [ ] `src/generate/clip-path/url.ts`
- [ ] `src/generate/clip-path/xywh.ts`

### Color (11 files to fix)

- [ ] `src/generate/color/color-function.ts`
- [ ] `src/generate/color/hex.ts`
- [ ] `src/generate/color/hsl.ts`
- [ ] `src/generate/color/hwb.ts`
- [ ] `src/generate/color/lab.ts`
- [ ] `src/generate/color/lch.ts`
- [ ] `src/generate/color/named.ts`
- [ ] `src/generate/color/oklab.ts`
- [ ] `src/generate/color/oklch.ts`
- [ ] `src/generate/color/rgb.ts`
- [ ] `src/generate/color/special.ts`
- [ ] `src/generate/color/system.ts`

### Filter (11 files to fix)

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

### Flexbox (11 files to fix)

- [ ] `src/generate/flexbox/align-content.ts`
- [ ] `src/generate/flexbox/align-items.ts`
- [ ] `src/generate/flexbox/align-self.ts`
- [ ] `src/generate/flexbox/flex-basis.ts`
- [ ] `src/generate/flexbox/flex-direction.ts`
- [ ] `src/generate/flexbox/flex-grow.ts`
- [ ] `src/generate/flexbox/flex-shrink.ts`
- [ ] `src/generate/flexbox/flex-wrap.ts`
- [ ] `src/generate/flexbox/gap.ts`
- [ ] `src/generate/flexbox/justify-content.ts`
- [ ] `src/generate/flexbox/order.ts`

### Gradient (3 files to fix)

- [ ] `src/generate/gradient/color-stop.ts`
- [ ] `src/generate/gradient/conic.ts`
- [ ] `src/generate/gradient/linear.ts`
- [ ] `src/generate/gradient/radial.ts`

### Interaction (2 files to fix)

- [ ] `src/generate/interaction/pointer-events.ts`
- [ ] `src/generate/interaction/user-select.ts`

### Layout (34 files to fix)

- [ ] `src/generate/layout/bottom.ts`
- [ ] `src/generate/layout/box-sizing.ts`
- [ ] `src/generate/layout/clear.generate.ts`
- [ ] `src/generate/layout/cursor.ts`
- [ ] `src/generate/layout/display.ts`
- [ ] `src/generate/layout/float.generate.ts`
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
- [ ] `src/generate/layout/opacity.ts`
- [ ] `src/generate/layout/overflow-x.ts`
- [ ] `src/generate/layout/overflow-y.ts`
- [ ] `src/generate/layout/overflow.generate.ts`
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

### Outline (3 files to fix)

- [ ] `src/generate/outline/color.ts`
- [ ] `src/generate/outline/offset.ts`
- [ ] `src/generate/outline/style.ts`
- [ ] `src/generate/outline/width.ts`

### Shadow (2 files to fix)

- [ ] `src/generate/shadow/box-shadow.ts`
- [ ] `src/generate/shadow/text-shadow.ts`

### Text (4 files to fix)

- [ ] `src/generate/text/color.ts`
- [ ] `src/generate/text/line.ts`
- [ ] `src/generate/text/style.ts`
- [ ] `src/generate/text/thickness.ts`

### Transform (1 file to fix)

- [ ] `src/generate/transform/origin.ts`

### Transition (4 files to fix)

- [ ] `src/generate/transition/delay.ts`
- [ ] `src/generate/transition/duration.ts`
- [ ] `src/generate/transition/property.ts`
- [ ] `src/generate/transition/timing-function.ts`

### Typography (11 files to fix)

- [ ] `src/generate/typography/font-family.ts`
- [ ] `src/generate/typography/font-size.ts`
- [ ] `src/generate/typography/font-style.ts`
- [ ] `src/generate/typography/font-weight.ts`
- [ ] `src/generate/typography/letter-spacing.ts`
- [ ] `src/generate/typography/line-height.ts`
- [ ] `src/generate/typography/overflow-wrap.ts`
- [ ] `src/generate/typography/text-align.ts`
- [ ] `src/generate/typography/text-transform.ts`
- [ ] `src/generate/typography/vertical-align.ts`
- [ ] `src/generate/typography/word-break.ts`

### Visual (2 files to fix - custom names)

- [ ] `src/generate/visual/background-blend-mode.generate.ts`
- [ ] `src/generate/visual/mix-blend-mode.generate.ts`

---

## Phase 3: Update Callsites ⬜

### Dispatcher Generators (11 files)
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

### Other Callsites
- [ ] Find with: `grep -r "\.toCss(" src/ --include="*.ts"`
- [ ] Update each callsite
- [ ] Verify no remaining `.toCss(` calls

---

## Phase 4: Update Tests ⬜

- [ ] Update 53 test files
- [ ] Add validation tests to each
- [ ] Verify all tests pass

**Test files**: Find with `find src -name "*.generate.test.ts"`

---

## Phase 5: Final Verification ⬜

- [ ] `just test` - All tests pass
- [ ] `just check` - No lint errors
- [ ] `pnpm typecheck` - No type errors
- [ ] Verify test count (should be 2938+)
- [ ] Git status clean (no uncommitted work)

---

## Blockers / Issues

None yet.

---

## Notes

- Work in small batches (one module at a time)
- Run tests after each module
- Use validation utility for consistency
- Don't forget to update dispatcher generators' internal calls

---

## Final Commit

Once 100% complete:

```bash
git add -A
git commit -m "refactor(generate): make all generators return GenerateResult with validation"
```
