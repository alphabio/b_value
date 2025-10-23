# 🎯 COMPREHENSIVE TEST COVERAGE PLAN

**Goal**: 90% test coverage  
**Current**: 69.22%  
**Gap**: +20.78%  
**Date**: 2025-10-22

---

## 📊 Reality Check

- **Total source files**: 387 (excluding index.ts)
- **Total test files**: 206
- **Untested files**: 181 (46.8%)

This is NOT a race. This is about **comprehensive, quality coverage**.

---

## 🗂️ UNTESTED FILES BY CATEGORY

### A. Core Infrastructure (90 files)

#### Keywords (50 files)
- align-content-keywords.ts
- align-items-keywords.ts
- align-self-keywords.ts
- animation.ts
- auto-keyword.ts
- background-attachment-keywords.ts
- basic-color-keywords.ts
- blend-mode-keywords.ts
- border-style-keywords.ts
- border-width-keywords.ts
- box-edge-keywords.ts
- color-interpolation-keywords.ts
- color-keywords.ts
- color-value-keywords.ts
- content-distribution-keywords.ts
- content-position-keywords.ts
- corner-shape-keywords.ts
- cursor-keywords.ts
- display-keywords.ts
- extended-color-keywords.ts
- flex-direction-keywords.ts
- flex-wrap-keywords.ts
- font-size-keywords.ts
- font-style-keywords.ts
- font-weight-keywords.ts
- geometry-box.ts
- grid-auto-flow-keywords.ts
- justify-content-keywords.ts
- justify-items-keywords.ts
- justify-self-keywords.ts
- outline-style-keywords.ts
- overflow-keywords.ts
- overflow-wrap-keywords.ts
- position-keywords.ts
- position-property-keywords.ts
- repeat-keywords.ts
- shape-keywords.ts
- sizing-keywords.ts
- system-color-keywords.ts
- text-align-keywords.ts
- text-decoration-line-keywords.ts
- text-decoration-style-keywords.ts
- text-decoration-thickness-keywords.ts
- text-transform-keywords.ts
- transform-keywords.ts
- vertical-align-keywords.ts
- visibility-keywords.ts
- white-space-keywords.ts
- width-height-keywords.ts
- word-break-keywords.ts

**Priority**: LOW (these are mostly const definitions - may not need dedicated tests)

#### Types (30 files)
- angle.ts
- animation.ts
- border.ts
- box-model.ts
- clip-path.ts
- color-stop.ts
- color.ts
- css-value.ts
- filter.ts
- flexbox.ts
- gradient/conic.ts
- gradient/direction.ts
- gradient/linear.ts
- gradient/radial-shape.ts
- gradient/radial-size.ts
- gradient/radial.ts
- grid-line.ts
- interaction.ts
- layout.ts
- length-percentage.ts
- outline.ts
- position-layer.ts
- position.ts
- ratio.ts
- shadow.ts
- size-layer.ts
- time.ts
- transform.ts
- transition.ts
- typography.ts
- url.ts

**Priority**: LOW (type definitions - test via usage, not directly)

#### Units (7 files)
- angle.ts
- frequency.ts
- length.absolute.ts
- length.font.ts
- length.viewport.ts
- percentage.ts
- time.ts

**Priority**: LOW (const definitions)

### B. Generators (37 files) - HIGH PRIORITY

#### Clip-path generators (11 files)
- [ ] circle.ts
- [ ] clip-path.ts (shorthand)
- [ ] ellipse.ts
- [ ] geometry-box.ts
- [ ] inset.ts
- [ ] none.ts
- [ ] path.ts
- [ ] polygon.ts
- [ ] rect.ts
- [ ] url.ts
- [ ] xywh.ts

**Estimated effort**: 3-4 tests per file = 33-44 tests
**Coverage gain**: ~2-3%

#### Gradient generators (4 files)
- [ ] color-stop.ts
- [ ] conic.ts
- [ ] linear.ts
- [ ] radial.ts

**Estimated effort**: 5-7 tests per file = 20-28 tests
**Coverage gain**: ~1.5-2%

#### Layout generators (3 files)
- [ ] clear.generate.ts
- [ ] float.generate.ts
- [ ] overflow.generate.ts

**Estimated effort**: 3-4 tests per file = 9-12 tests
**Coverage gain**: ~0.5%

#### Position generators (2 files + utils)
- [ ] position.ts
- [ ] utils.ts

**Estimated effort**: 5-6 tests per file = 10-12 tests
**Coverage gain**: ~0.5%

#### Shadow generators (3 files)
- [ ] box-shadow.ts
- [ ] shadow.ts (shorthand)
- [ ] text-shadow.ts

**Estimated effort**: 5-6 tests per file = 15-18 tests
**Coverage gain**: ~1%

#### Text generators (4 files)
- [ ] color.ts
- [ ] line.ts
- [ ] style.ts
- [ ] thickness.ts

**Estimated effort**: 3-5 tests per file = 12-20 tests
**Coverage gain**: ~0.5-1%

#### Transform generators (3 files)
- [ ] origin.ts
- [ ] transform.ts
- [ ] utils.ts

**Estimated effort**: 5-8 tests per file = 15-24 tests
**Coverage gain**: ~1-1.5%

#### Transition generators (1 file)
- [ ] transition.ts (shorthand)

**Estimated effort**: 6-8 tests
**Coverage gain**: ~0.3%

#### Visual generators (2 files)
- [ ] background-blend-mode.generate.ts
- [ ] mix-blend-mode.generate.ts

**Estimated effort**: 4-5 tests per file = 8-10 tests
**Coverage gain**: ~0.3%

**SUBTOTAL GENERATORS**: ~37 files, 142-176 tests, ~8-10% coverage gain

### C. Parsers (47 files) - HIGH PRIORITY

#### Background parsers (6 files)
- [ ] attachment.ts
- [ ] background.ts (shorthand)
- [ ] clip.ts
- [ ] origin.ts
- [ ] repeat.ts
- [ ] size.ts

**Estimated effort**: 5-8 tests per file = 30-48 tests
**Coverage gain**: ~2-3%

#### Border parsers (1 file)
- [ ] border.ts (shorthand)

**Estimated effort**: 8-10 tests
**Coverage gain**: ~0.5%

#### Clip-path parsers (4 files)
- [ ] geometry-box.ts
- [ ] none.ts
- [ ] url.ts
- [ ] utils.ts

**Estimated effort**: 3-5 tests per file = 12-20 tests
**Coverage gain**: ~0.5-1%

#### Color parsers (7 files)
- [ ] hex.ts
- [ ] hsl.ts
- [ ] hwb.ts
- [ ] named.ts
- [ ] rgb.ts
- [ ] special.ts
- [ ] system.ts

**Estimated effort**: 4-6 tests per file = 28-42 tests
**Coverage gain**: ~1.5-2%

#### Filter parsers (11 files)
- [ ] blur.ts
- [ ] brightness.ts
- [ ] contrast.ts
- [ ] drop-shadow.ts
- [ ] grayscale.ts
- [ ] hue-rotate.ts
- [ ] invert.ts
- [ ] opacity.ts
- [ ] saturate.ts
- [ ] sepia.ts
- [ ] url.ts

**Estimated effort**: 4-6 tests per file = 44-66 tests
**Coverage gain**: ~2-3%

#### Flexbox parsers (8 files)
- [ ] align-content.ts
- [ ] align-items.ts
- [ ] align-self.ts
- [ ] flex-shrink.ts
- [ ] flex-wrap.ts
- [ ] gap.ts
- [ ] justify-content.ts
- [ ] order.ts

**Estimated effort**: 4-6 tests per file = 32-48 tests
**Coverage gain**: ~1.5-2%

#### Gradient parsers (3 files)
- [ ] conic.ts
- [ ] linear.ts
- [ ] radial.ts

**Estimated effort**: 8-12 tests per file = 24-36 tests
**Coverage gain**: ~2-3%

#### Layout parsers (13 files)
- [ ] box-sizing.ts
- [ ] cursor.ts
- [ ] display.ts
- [ ] margin-bottom.ts
- [ ] margin-left.ts
- [ ] margin-right.ts
- [ ] max-height.ts
- [ ] min-height.ts
- [ ] opacity.ts
- [ ] padding-bottom.ts
- [ ] padding-left.ts
- [ ] padding-right.ts
- [ ] visibility.ts

**Estimated effort**: 4-6 tests per file = 52-78 tests
**Coverage gain**: ~3-4%

#### Outline parsers (1 file)
- [ ] outline.ts (shorthand)

**Estimated effort**: 6-8 tests
**Coverage gain**: ~0.3%

#### Position parsers (1 file)
- [ ] position.ts

**Estimated effort**: 5-7 tests
**Coverage gain**: ~0.3%

#### Shadow parsers (1 file)
- [ ] shadow.ts (shorthand)

**Estimated effort**: 6-8 tests
**Coverage gain**: ~0.3%

#### Text parsers (5 files)
- [ ] color.ts
- [ ] line.ts
- [ ] style.ts
- [ ] text.ts (shorthand)
- [ ] thickness.ts

**Estimated effort**: 4-6 tests per file = 20-30 tests
**Coverage gain**: ~1-1.5%

#### Transform parsers (1 file)
- [ ] transform.ts

**Estimated effort**: 8-12 tests
**Coverage gain**: ~0.5%

#### Transition parsers (1 file)
- [ ] transition.ts (shorthand)

**Estimated effort**: 6-8 tests
**Coverage gain**: ~0.3%

**SUBTOTAL PARSERS**: ~47 files, 268-407 tests, ~16-22% coverage gain

### D. Utilities (7 files) - MEDIUM PRIORITY

- [ ] utils/ast/functions.ts (8-10 tests, ~0.5%)
- [ ] utils/generate/color.ts (ALREADY HAS TESTS via generate/color/*)
- [ ] utils/parse/color.ts (ALREADY HAS TESTS via parse/color/*)
- [ ] utils/parse/nodes/angle.ts (4-6 tests, ~0.2%)
- [ ] utils/parse/nodes/border-radius.ts (6-8 tests, ~0.3%)
- [ ] utils/parse/nodes/length.ts (6-8 tests, ~0.3%)
- [ ] utils/parse/nodes/number.ts (3-4 tests, ~0.1%)
- [ ] utils/parse/nodes/position.ts (6-8 tests, ~0.3%)
- [ ] utils/parse/nodes/radial.ts (5-7 tests, ~0.3%)
- [ ] utils/parse/url.ts (3-5 tests, ~0.2%)

**SUBTOTAL UTILITIES**: ~7 files, 41-63 tests, ~2-3% coverage gain

---

## 📈 COVERAGE PROJECTION

| Category | Files | Tests (est) | Coverage Gain |
|----------|-------|-------------|---------------|
| Generators | 37 | 142-176 | +8-10% |
| Parsers | 47 | 268-407 | +16-22% |
| Utilities | 7 | 41-63 | +2-3% |
| **TOTAL** | **91** | **451-646** | **+26-35%** |

**Current**: 69.22%  
**Projected**: **95-104%** (target: 90%)

---

## 🎯 EXECUTION STRATEGY

### Phase 1: Quick Wins (Target: +5%, 2-3 sessions)
1. Layout parsers (margin/padding) - 13 files
2. Flexbox parsers - 8 files
3. Layout generators (clear/float/overflow) - 3 files

**Estimated**: 97-138 tests, ~3-4 days

### Phase 2: Color & Filters (Target: +4%, 2 sessions)
1. Color parsers - 7 files
2. Filter parsers - 11 files

**Estimated**: 72-108 tests, ~2-3 days

### Phase 3: Gradients & Shadows (Target: +5%, 2-3 sessions)
1. Gradient parsers - 3 files
2. Gradient generators - 4 files
3. Shadow parsers - 1 file
4. Shadow generators - 3 files

**Estimated**: 65-98 tests, ~3-4 days

### Phase 4: Clip-paths (Target: +3%, 2 sessions)
1. Clip-path generators - 11 files
2. Clip-path parsers - 4 files

**Estimated**: 45-64 tests, ~2-3 days

### Phase 5: Transforms & Transitions (Target: +2%, 1-2 sessions)
1. Transform generators - 3 files
2. Transform parsers - 1 file
3. Transition generators - 1 file
4. Transition parsers - 1 file

**Estimated**: 35-52 tests, ~2 days

### Phase 6: Text & Background (Target: +3%, 2 sessions)
1. Text generators - 4 files
2. Text parsers - 5 files
3. Background parsers - 6 files
4. Border parsers - 1 file

**Estimated**: 68-106 tests, ~2-3 days

### Phase 7: Utilities & Cleanup (Target: +2%, 1-2 sessions)
1. Utils files - 7 files
2. Miscellaneous - 2-3 files

**Estimated**: 44-68 tests, ~1-2 days

---

## 🔍 TESTING STANDARDS

For each file, tests must cover:

1. **Happy path**: Valid inputs produce expected outputs
2. **Edge cases**: Boundary values (0, negative, very large, etc.)
3. **Error handling**: Invalid inputs are rejected properly
4. **Variants**: All supported syntaxes/units/keywords
5. **Integration**: Works with actual CSS strings (for parsers)

**NO shortcuts. NO cheating. COMPREHENSIVE coverage.**

---

## 📝 PROGRESS TRACKING

- [ ] Phase 1: Quick Wins (13+8+3 = 24 files)
- [ ] Phase 2: Color & Filters (7+11 = 18 files)
- [ ] Phase 3: Gradients & Shadows (3+4+1+3 = 11 files)
- [ ] Phase 4: Clip-paths (11+4 = 15 files)
- [ ] Phase 5: Transforms & Transitions (3+1+1+1 = 6 files)
- [ ] Phase 6: Text & Background (4+5+6+1 = 16 files)
- [ ] Phase 7: Utilities & Cleanup (7+ files)

**Total**: ~91+ files over 7 phases

---

## ⏱️ TIME ESTIMATE

- **Best case**: 15-20 days (assuming 1-2 phases per day)
- **Realistic**: 20-25 days (accounting for complexity and debugging)
- **Safe**: 30 days (buffer for unexpected issues)

This is **laborious work**. It's **not hard**, just **methodical and comprehensive**.

---

## 🎖️ COMMITMENT

This is not a race. This is about **taking pride in the work** and creating **comprehensive, quality test coverage** that will serve the project for years.

Every test will be:
- ✅ Honest
- ✅ Thorough
- ✅ Well-documented
- ✅ Maintainable

**No shortcuts. No cheating. Just good, solid work.**
