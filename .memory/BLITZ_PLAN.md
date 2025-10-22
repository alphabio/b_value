# 🚀 COVERAGE BLITZ MASTER PLAN - Path to 90%

**Current**: 66.43% | **Target**: 90% | **Gap**: 23.57%

## 🎯 THE REAL PROBLEM
- **140 total generators**
- **61 have tests (43.6%)**
- **79 UNTESTED (56.4%)** ← THIS IS THE ISSUE!

## 📊 PRIORITY QUEUE (79 generators to test)

### WAVE 1: EASY WINS - Simple Keyword/Enum Generators (15 files, ~30 min)
*Target: +2.5% coverage*

**Animation (2):**
- [ ] animation.ts (shorthand)
- [ ] timing-function.ts (ALREADY HAS BUG - cubic-bezier works now)

**Interaction (2):**
- [ ] pointer-events.ts (keywords)
- [ ] user-select.ts (keywords)

**Position (1):**
- [ ] position.ts (static/relative/absolute/fixed/sticky)

**Visual (2):**
- [ ] background-blend-mode.ts (keywords)
- [ ] mix-blend-mode.ts (keywords)

**Layout (8 simple):**
- [ ] overflow.generate.ts (visible/hidden/scroll/auto)
- [ ] overflow-x.ts
- [ ] overflow-y.ts
- [ ] clear.generate.ts (none/left/right/both)
- [ ] float.generate.ts (none/left/right)

### WAVE 2: LENGTH/SIZE PROPERTIES (19 files, ~40 min)
*Target: +3.5% coverage*

**Layout spacing (8):**
- [ ] margin-top.ts
- [ ] margin-right.ts
- [ ] margin-bottom.ts
- [ ] margin-left.ts
- [ ] padding-top.ts
- [ ] padding-right.ts
- [ ] padding-bottom.ts
- [ ] padding-left.ts

**Layout sizing (6):**
- [ ] width.ts
- [ ] height.ts
- [ ] min-width.ts
- [ ] max-width.ts
- [ ] min-height.ts
- [ ] max-height.ts

**Flexbox (1):**
- [ ] flex-basis.ts

**Border (2):**
- [ ] radius.ts
- [ ] width.ts

**Background (1):**
- [ ] size.ts

**Transform (1):**
- [ ] origin.ts

### WAVE 3: COLOR FUNCTIONS (11 files, ~35 min)
*Target: +2.5% coverage*

**All color formats:**
- [ ] rgb.ts
- [ ] hsl.ts
- [ ] hwb.ts
- [ ] lab.ts
- [ ] lch.ts
- [ ] oklab.ts
- [ ] oklch.ts
- [ ] hex.ts
- [ ] named.ts
- [ ] special.ts (currentColor, transparent)
- [ ] system.ts

### WAVE 4: FILTERS (11 files, ~35 min)
*Target: +2.5% coverage*

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

### WAVE 5: GRADIENTS (4 files, ~30 min)
*Target: +1.5% coverage*

- [ ] linear.ts
- [ ] radial.ts
- [ ] conic.ts
- [ ] color-stop.ts

### WAVE 6: CLIP-PATH (11 files, ~40 min)
*Target: +2.5% coverage*

- [ ] circle.ts
- [ ] ellipse.ts
- [ ] polygon.ts
- [ ] inset.ts
- [ ] rect.ts
- [ ] xywh.ts
- [ ] path.ts
- [ ] url.ts
- [ ] geometry-box.ts
- [ ] none.ts
- [ ] clip-path.ts (shorthand)

### WAVE 7: SHADOWS (3 files, ~20 min)
*Target: +1.5% coverage*

- [ ] box-shadow.ts
- [ ] text-shadow.ts
- [ ] shadow.ts

### WAVE 8: TRANSFORM & TEXT (7 files, ~30 min)
*Target: +2% coverage*

**Transform:**
- [ ] transform.ts (shorthand)
- [ ] utils.ts

**Text:**
- [ ] color.ts
- [ ] line.ts (underline, overline, etc.)
- [ ] style.ts (solid, wavy, etc.)
- [ ] thickness.ts

**Transition:**
- [ ] transition.ts (shorthand)

## 📈 PROJECTED COVERAGE GAINS

| Wave | Files | Time | Coverage Gain | Cumulative |
|------|-------|------|---------------|------------|
| 1    | 15    | 30m  | +2.5%         | 68.93%     |
| 2    | 19    | 40m  | +3.5%         | 72.43%     |
| 3    | 11    | 35m  | +2.5%         | 74.93%     |
| 4    | 11    | 35m  | +2.5%         | 77.43%     |
| 5    | 4     | 30m  | +1.5%         | 78.93%     |
| 6    | 11    | 40m  | +2.5%         | 81.43%     |
| 7    | 3     | 20m  | +1.5%         | 82.93%     |
| 8    | 7     | 30m  | +2%           | 84.93%     |
| **TOTAL** | **81** | **4h 20m** | **+18.5%** | **~85%** |

## 🎯 STRATEGY

1. **One wave per session** (30-40 min focused work)
2. **Template-driven** - copy/paste/modify existing tests
3. **No overthinking** - simple input/output validation
4. **Batch commits** - one commit per wave
5. **Target: 3 waves per day = 3 sessions = reach 75% in 3 days**

## 🔥 EXECUTION PLAN

### TODAY (Session 8):
- **WAVE 1**: Easy wins (15 files, 30 min) → 68.93%

### TOMORROW (3 sessions):
- **WAVE 2**: Length/size (19 files, 40 min) → 72.43%
- **WAVE 3**: Colors (11 files, 35 min) → 74.93%
- **WAVE 4**: Filters (11 files, 35 min) → 77.43%

### DAY 3 (3 sessions):
- **WAVE 5**: Gradients (4 files, 30 min) → 78.93%
- **WAVE 6**: Clip-path (11 files, 40 min) → 81.43%
- **WAVE 7**: Shadows (3 files, 20 min) → 82.93%

### DAY 4 (1-2 sessions):
- **WAVE 8**: Transform/Text (7 files, 30 min) → 84.93%
- **Parser tests** (if needed) → 90%+

## ✨ KEY INSIGHT

The issue wasn't the RATE of progress - it was TARGETING THE WRONG THINGS!

- ❌ **Before**: Testing already-tested generators
- ✅ **Now**: Target the 79 untested generators systematically

At **~0.3% per file**, 79 files = **~24% coverage gain** = **90% TOTAL** 🎯

---

**Next Action**: Execute WAVE 1 NOW (15 files, 30 min)
