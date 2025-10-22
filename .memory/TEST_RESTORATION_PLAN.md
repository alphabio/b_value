# Test Restoration Master Plan

**Goal**: Restore coverage from 60.94% → 90%+  
**Strategy**: Recreate deleted generator tests (simple, high-value)  
**Time Estimate**: 2-3 hours (multiple sessions)

---

## 🔄 SESSION HANDOVER PROTOCOL

**For Next Agent**:
1. Read this file
2. Check `PROGRESS.md` for current status
3. Find next unchecked `[ ]` item in checklist below
4. Create tests for that batch
5. Update `PROGRESS.md` after each batch
6. When low on tokens: update `PROGRESS.md` with current state

**Progress Tracking**: `.memory/TEST_RESTORATION_PROGRESS.md`

---

## Coverage Analysis

### Current State (60.94%)
- **Parse modules**: 80-95% coverage ✅ (mostly good)
- **Generate modules**: 0-20% coverage ❌ (need tests)
- **Utils**: 75-90% coverage ✅ (mostly good)

### Target Modules (by priority)

#### Priority 1: Zero Coverage Generators (Quick Wins)
These have **0% coverage** and are simple keyword/value generators:

1. **Layout** (0%) - 20 files
   - `box-sizing`, `cursor`, `display`, `float`, `clear`, `overflow*`, `position`, `visibility`
   - Pattern: Simple keyword enums
   - Test pattern: 3-5 tests per file

2. **Typography** (0%) - 11 files  
   - `font-family`, `font-size`, `font-style`, `font-weight`, `text-align`, etc.
   - Pattern: Keyword/value generators
   - Test pattern: 3-8 tests per file

3. **Animation** (3.24%) - 9 files
   - `animation`, `delay`, `direction`, `duration`, `fill-mode`, etc.
   - Pattern: Time/keyword values
   - Test pattern: 3-8 tests per file

4. **Flexbox** (0%) - 11 files
   - `align-*`, `flex-*`, `gap`, `justify-content`, `order`
   - Pattern: Keyword enums
   - Test pattern: 3-5 tests per file

5. **Interaction** (0%) - 2 files
   - `pointer-events`, `user-select`
   - Test pattern: 3-5 tests each

6. **Visual** (0%) - 2 files
   - `background-blend-mode`, `mix-blend-mode`
   - Test pattern: 5-8 tests each

#### Priority 2: Low Coverage Generators (More Complex)

7. **Background** (21%) - Missing tests for:
   - `attachment`, `clip`, `origin`, `repeat`, `size`
   - Test pattern: 5-10 tests per file

8. **Clip-path** (0%) - 11 files
   - `circle`, `ellipse`, `inset`, `polygon`, `rect`, etc.
   - Pattern: Shape generators
   - Test pattern: 8-15 tests per file

9. **Shadow** (0%) - 3 files
   - `box-shadow`, `text-shadow`, `shadow`
   - Pattern: Complex multi-value
   - Test pattern: 10-20 tests per file

10. **Transform** (0%) - 2 files
    - `origin`, `transform`
    - Pattern: Complex multi-value
    - Test pattern: 15-25 tests per file

11. **Position** (0%) - 2 files
    - `position`, `utils`
    - Test pattern: 10-15 tests per file

12. **Text** (0%) - 4 files
    - `color`, `line`, `style`, `thickness`
    - Test pattern: 5-10 tests per file

---

## Implementation Strategy

### Phase 1: Layout (30 min → +10% coverage)
Target: 20 simple generator files

**Test Template**:
```typescript
import { describe, expect, it } from "vitest";
import { generate } from "./module-name";

describe("generateModuleName", () => {
  it("should generate keyword value", () => {
    const result = generate({ type: "keyword", value: "auto" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe("auto");
  });

  it("should handle invalid input", () => {
    const result = generate({ type: "invalid" } as any);
    expect(result.ok).toBe(false);
  });
});
```

**Files to create**: 20 × `*.generate.test.ts`

### Phase 2: Typography + Animation (30 min → +8% coverage)
Target: 20 generator files (11 typography + 9 animation)

Same pattern as Phase 1.

### Phase 3: Flexbox + Interaction + Visual (20 min → +5% coverage)
Target: 15 generator files

Same pattern as Phase 1.

### Phase 4: Background + Filter (30 min → +5% coverage)
Target: Fill gaps in existing coverage

### Phase 5: Complex Generators (40 min → +5% coverage)
Target: Clip-path, Shadow, Transform, Position

These need more comprehensive tests:
- Multiple valid inputs
- Edge cases
- Complex value combinations

---

## Execution Checklist

### Batch 1: Layout (20 files)
- [ ] `box-sizing.generate.test.ts`
- [ ] `cursor.generate.test.ts`
- [ ] `display.generate.test.ts`
- [ ] `opacity.generate.test.ts`
- [ ] `visibility.generate.test.ts`
- [ ] `bottom.generate.test.ts`
- [ ] `left.generate.test.ts`
- [ ] `right.generate.test.ts`
- [ ] `top.generate.test.ts`
- [ ] `height.generate.test.ts`
- [ ] `width.generate.test.ts`
- [ ] `max-height.generate.test.ts`
- [ ] `max-width.generate.test.ts`
- [ ] `min-height.generate.test.ts`
- [ ] `min-width.generate.test.ts`
- [ ] `margin-*.generate.test.ts` (4 files)
- [ ] `padding-*.generate.test.ts` (4 files)
- [ ] `z-index.generate.test.ts`

### Batch 2: Typography (11 files)
- [ ] `font-family.generate.test.ts`
- [ ] `font-size.generate.test.ts`
- [ ] `font-style.generate.test.ts`
- [ ] `font-weight.generate.test.ts`
- [ ] `letter-spacing.generate.test.ts`
- [ ] `line-height.generate.test.ts`
- [ ] `overflow-wrap.generate.test.ts`
- [ ] `text-align.generate.test.ts`
- [ ] `text-transform.generate.test.ts`
- [ ] `vertical-align.generate.test.ts`
- [ ] `word-break.generate.test.ts`

### Batch 3: Animation (9 files)
- [ ] `animation.generate.test.ts`
- [ ] `direction.generate.test.ts`
- [ ] `duration.generate.test.ts`
- [ ] `fill-mode.generate.test.ts`
- [ ] `iteration-count.generate.test.ts`
- [ ] `name.generate.test.ts`
- [ ] `play-state.generate.test.ts`
- [ ] `timing-function.generate.test.ts`

### Batch 4: Flexbox (11 files)
- [ ] `align-content.generate.test.ts`
- [ ] `align-items.generate.test.ts`
- [ ] `align-self.generate.test.ts`
- [ ] `flex-basis.generate.test.ts`
- [ ] `flex-direction.generate.test.ts`
- [ ] `flex-grow.generate.test.ts`
- [ ] `flex-shrink.generate.test.ts`
- [ ] `flex-wrap.generate.test.ts`
- [ ] `gap.generate.test.ts`
- [ ] `justify-content.generate.test.ts`
- [ ] `order.generate.test.ts`

### Batch 5: Background gaps (5 files)
- [ ] `attachment.generate.test.ts`
- [ ] `clip.generate.test.ts`
- [ ] `origin.generate.test.ts`
- [ ] `repeat.generate.test.ts`
- [ ] `size.generate.test.ts`

### Batch 6: Others (15 files)
- [ ] Interaction: `pointer-events`, `user-select`
- [ ] Visual: `background-blend-mode`, `mix-blend-mode`
- [ ] Text: 4 files
- [ ] Position: 2 files
- [ ] Shadow: 3 files
- [ ] Clip-path: Selected files
- [ ] Transform: Selected files

---

## Success Metrics

- **Target**: 90% overall coverage
- **Minimum**: 
  - Layout: 85%
  - Typography: 85%
  - Animation: 85%
  - Flexbox: 85%
  - Background: 70%
  - Other modules: 60%+

---

## Verification

After each batch:
```bash
just coverage
```

Final check:
```bash
just check && just test && just coverage
```

Expected: **90%+ coverage** across statements, branches, functions, lines.
