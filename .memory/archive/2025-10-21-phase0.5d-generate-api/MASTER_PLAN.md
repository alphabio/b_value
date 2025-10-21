# MASTER PLAN: Phase 0.5d - Complete Generate API (8 Remaining Modules)

**Created**: 2025-10-21T05:32:00Z  
**Status**: 🎯 **ACTIVE - INCREMENTAL EXECUTION**  
**Baseline**: 2469 tests passing, zero TypeScript errors  
**Progress**: 6/14 modules complete (43%)  
**Remaining**: 8/14 modules (57%)

---

## 📊 CURRENT STATUS

### ✅ COMPLETED (6/14 modules - 43%)

| Module | Pattern | File(s) | Tests | Commit |
|--------|---------|---------|-------|--------|
| color | A | `color.ts` | 15 | f78fc01 |
| clip-path | A | `clip-path.ts` | 12 | 4b90763 |
| gradient | A | `gradient.ts` | 5 | b50b7b9 |
| filter | A | `filter.ts` | 11 | efbb9c8 |
| position | B | `position.ts` + `position-generate.ts` | 16 | 1d02b58 |
| transform | B | `transform.ts` + `transform-generate.ts` | 17 | 1d02b58 |

**Total tests added**: 76 tests

---

## 🎯 REMAINING WORK (8/14 modules - 57%)

### Priority Queue (Ordered by complexity & dependency)

| # | Module | Sub-modules | Parse() | IR Type | Est. Tests | Pattern | Priority |
|---|--------|-------------|---------|---------|------------|---------|----------|
| 1 | **shadow** | 2 types | ✅ | `Shadow` union | 8-12 | A | 🔥 HIGH |
| 2 | **transition** | 4 props | ✅ | `Transition` union | 12-16 | A | 🔥 HIGH |
| 3 | **outline** | 4 props | ✅ | `unknown` | 12-16 | A | 🟡 MED |
| 4 | **border** | 4 props | ✅ | `unknown` | 12-16 | A | 🟡 MED |
| 5 | **text** | 4 props | ✅ | `unknown` | 12-16 | A | 🟡 MED |
| 6 | **background** | 5 props | ✅ | `unknown` | 15-20 | A | 🟡 MED |
| 7 | **animation** | 8 props | ✅ | `Animation` union | 24-32 | A | 🔴 COMPLEX |
| 8 | **layout** | 13 props | ❌ | N/A | 0 | SKIP | ⚪ DEFER |

**Estimated total new tests**: 95-140 tests

---

## 🏗️ ARCHITECTURE PATTERNS

### Pattern A: Single File with generate() (PREFERRED)

**Used for**: Modules with multiple sub-types that need auto-detection

**Structure**:
```
src/generate/{module}/
  ├── {module}.ts          ← NEW: Contains generate() dispatcher
  ├── {type1}.ts           ← Existing: toCss() functions
  ├── {type2}.ts           ← Existing: toCss() functions
  └── index.ts             ← UPDATE: Export generate()
```

**Implementation**:
```typescript
// {module}.ts
import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type * as Type from "@/core/types/{module}";
import * as Type1 from "./{type1}";
import * as Type2 from "./{type2}";

export function generate(ir: Type.ModuleUnion): GenerateResult {
  if (!ir || typeof ir !== "object" || !("kind" in ir)) {
    return generateErr("Invalid {module} IR: missing 'kind' field", {
      suggestion: "Ensure IR was parsed correctly",
    });
  }

  switch (ir.kind) {
    case "type1":
      return generateOk(Type1.toCss(ir));
    case "type2":
      return generateOk(Type2.toCss(ir));
    default:
      return generateErr(`Unknown {module} kind: ${ir.kind}`, {
        suggestion: "Check that IR is valid",
      });
  }
}
```

**index.ts update**:
```typescript
export * as Type1 from "./{type1}";
export * as Type2 from "./{type2}";
export { generate } from "./{module}";  // ← ADD THIS
```

---

### Pattern B: Separate Wrapper File (LEGACY COMPATIBILITY)

**Used for**: Modules with existing complex exports (position, transform)

**Structure**:
```
src/generate/{module}/
  ├── {module}.ts           ← Existing: Complex legacy toCss() functions
  ├── {module}-generate.ts  ← NEW: generate() wrapper
  └── index.ts              ← UPDATE: Export generate()
```

**Implementation**:
```typescript
// {module}-generate.ts
import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type * as Type from "@/core/types";
import * as Module from "./{module}";

export function generate(ir: Type.ModuleIR): GenerateResult {
  if (!ir || typeof ir !== "object") {
    return generateErr("Invalid {module} IR", {
      suggestion: "Ensure IR was parsed correctly",
    });
  }

  try {
    const css = Module.toCss(ir);
    return generateOk(css);
  } catch (error) {
    return generateErr(`Failed to generate {module}: ${error}`, {
      suggestion: "Check that IR is valid",
    });
  }
}
```

---

## 📋 MODULE-BY-MODULE GUIDE

### Session 1: shadow (Simplest - 2 types)

**Goal**: Add `generate()` to shadow module  
**Time**: 20-30 minutes  
**Pattern**: A (single file)

**Files to create**:
- `src/generate/shadow/shadow.ts`

**Files to modify**:
- `src/generate/shadow/index.ts`

**IR Type**:
```typescript
type Shadow = BoxShadow | TextShadow;
```

**Implementation**:
```typescript
export function generate(ir: Type.Shadow): GenerateResult {
  if (!ir || typeof ir !== "object" || !("kind" in ir)) {
    return generateErr("Invalid shadow IR: missing 'kind' field");
  }

  switch (ir.kind) {
    case "box-shadow":
      return generateOk(BoxShadow.toCss(ir));
    case "text-shadow":
      return generateOk(TextShadow.toCss(ir));
    default:
      return generateErr(`Unknown shadow kind: ${ir.kind}`);
  }
}
```

**Tests to add** (~10):
```typescript
// shadow.test.ts
describe("Generate.Shadow.generate", () => {
  it("generates box-shadow", () => {
    const result = generate({ kind: "box-shadow", ... });
    expect(result.ok).toBe(true);
    expect(result.value).toBe("2px 2px 4px rgba(0,0,0,0.5)");
  });

  it("generates text-shadow", () => {
    const result = generate({ kind: "text-shadow", ... });
    expect(result.ok).toBe(true);
    expect(result.value).toBe("1px 1px 2px #000");
  });

  it("returns error for invalid IR", () => {
    const result = generate(null);
    expect(result.ok).toBe(false);
    expect(result.issues[0].severity).toBe("error");
  });

  it("returns error for unknown kind", () => {
    const result = generate({ kind: "invalid" });
    expect(result.ok).toBe(false);
  });
});
```

**Validation**:
```bash
just check  # Format, lint, typecheck
just test   # Run all tests (should add ~10 tests)
git add src/generate/shadow/
git commit -m "feat(shadow): add unified generate() returning GenerateResult"
```

**Handover**:
- Update CONTINUE.md with progress (7/14 complete)
- Create SESSION_1_HANDOVER.md in archive directory

---

### Session 2: transition (4 props - time values)

**Goal**: Add `generate()` to transition module  
**Time**: 30-40 minutes  
**Pattern**: A (single file)

**Files to create**:
- `src/generate/transition/transition.ts`

**Files to modify**:
- `src/generate/transition/index.ts`

**IR Type**:
```typescript
type Transition = 
  | TransitionDelay
  | TransitionDuration
  | TransitionProperty
  | TransitionTimingFunction;
```

**Sub-modules** (4):
1. `delay.ts` - Time values
2. `duration.ts` - Time values
3. `property.ts` - Property names
4. `timing-function.ts` - Easing functions

**Implementation strategy**:
- Parse side already has auto-detection logic - mirror it
- Duration/delay both use time values - need `kind` discriminator
- Follow same order as parse: duration → delay → timing → property

**Tests to add** (~16):
- 4 tests per sub-type (valid, edge cases)
- Error cases (invalid IR, unknown kind)

**Validation**:
```bash
just check && just test
git commit -m "feat(transition): add unified generate() returning GenerateResult"
```

---

### Session 3: outline (4 props - similar to border)

**Goal**: Add `generate()` to outline module  
**Time**: 30-40 minutes  
**Pattern**: A (single file)

**Files to create**:
- `src/generate/outline/outline.ts`

**Sub-modules** (4):
1. `width.ts` - Length values
2. `style.ts` - Line styles
3. `color.ts` - Color values
4. `offset.ts` - Length values

**Parse returns**: `unknown` (needs investigation of actual types)

**Action items**:
1. Check parse/outline/outline.ts to understand IR types
2. Create type union if needed
3. Implement generate() with auto-detection
4. Add 12-16 tests

---

### Session 4: border (4 props - similar to outline)

**Goal**: Add `generate()` to border module  
**Time**: 30-40 minutes  
**Pattern**: A (single file)

**Files to create**:
- `src/generate/border/border.ts`

**Sub-modules** (4):
1. `width.ts` - Length values
2. `style.ts` - Line styles
3. `color.ts` - Color values
4. `radius.ts` - Corner radius values

---

### Session 5: text (4 props - text decoration)

**Goal**: Add `generate()` to text module  
**Time**: 30-40 minutes  
**Pattern**: A (single file)

**Files to create**:
- `src/generate/text/text.ts`

**Sub-modules** (4):
1. `color.ts` - Color values
2. `line.ts` - Decoration lines
3. `style.ts` - Line styles
4. `thickness.ts` - Line thickness

---

### Session 6: background (5 props)

**Goal**: Add `generate()` to background module  
**Time**: 40-50 minutes  
**Pattern**: A (single file)

**Files to create**:
- `src/generate/background/background.ts`

**Sub-modules** (5):
1. `attachment.ts` - scroll, fixed, local
2. `clip.ts` - Border box values
3. `origin.ts` - Border box values
4. `repeat.ts` - Repeat patterns
5. `size.ts` - Size values

---

### Session 7: animation (8 props - MOST COMPLEX)

**Goal**: Add `generate()` to animation module  
**Time**: 60-90 minutes  
**Pattern**: A (single file)

**Files to create**:
- `src/generate/animation/animation.ts`

**Sub-modules** (8):
1. `delay.ts` - Time values
2. `duration.ts` - Time values
3. `timing-function.ts` - Easing functions
4. `iteration-count.ts` - Numbers, infinite
5. `direction.ts` - Keywords
6. `fill-mode.ts` - Keywords
7. `play-state.ts` - running, paused
8. `name.ts` - Identifiers

**IR Type**:
```typescript
type Animation =
  | AnimationDelay
  | AnimationDirection
  | AnimationDuration
  | AnimationFillMode
  | AnimationIterationCount
  | AnimationName
  | AnimationPlayState
  | AnimationTimingFunction;
```

**Complexity factors**:
- 8 different types to handle
- Similar to transition but more complex
- Parse side has good auto-detection - mirror it

**Tests to add** (~32):
- 4 tests per sub-type minimum
- Error handling
- Edge cases

---

### Session 8: layout (DEFER - No parse() function)

**Status**: ⚪ **DEFERRED**

**Reason**: 
- No unified `parse()` function exists
- 13+ independent properties (width, height, top, bottom, left, right, etc.)
- Each property is standalone (no auto-detection needed)
- No IR union type
- Different architecture from other modules

**Decision**:
- Skip layout module for Phase 0.5d
- Each layout property already has `toCss()` generators
- No unified `generate()` needed (no polymorphic IR)
- Can revisit if requirements change

---

## 🔄 SESSION WORKFLOW (STANDARDIZED)

### For Each Module Session:

**1. Setup** (2 min)
```bash
# Start fresh
git status  # Ensure clean
just check && just test  # Verify baseline
```

**2. Create Files** (10-20 min)
```bash
# Create main dispatcher
touch src/generate/{module}/{module}.ts
code src/generate/{module}/{module}.ts
```

**3. Implement** (15-30 min)
- Copy pattern from completed module (e.g., shadow)
- Update imports for specific sub-modules
- Implement switch/case for IR kinds
- Add error handling

**4. Update Exports** (2 min)
```typescript
// src/generate/{module}/index.ts
export { generate } from "./{module}";
```

**5. Write Tests** (15-25 min)
```bash
touch src/generate/{module}/{module}.test.ts
code src/generate/{module}/{module}.test.ts
```

**6. Validate** (5 min)
```bash
just check  # Format, lint, typecheck
just test   # All tests (should increase count)
```

**7. Commit** (2 min)
```bash
git add src/generate/{module}/
git commit -m "feat({module}): add unified generate() returning GenerateResult"
```

**8. Handover** (5 min)
- Update CONTINUE.md with progress
- Create handover doc if session ending

---

## 📈 PROGRESS TRACKING

### Test Count Milestones

| Milestone | Modules Complete | Est. Total Tests | Status |
|-----------|------------------|------------------|--------|
| Baseline | 6/14 (43%) | 2469 | ✅ CURRENT |
| +shadow | 7/14 (50%) | ~2479 | 🎯 SESSION 1 |
| +transition | 8/14 (57%) | ~2495 | 🎯 SESSION 2 |
| +outline | 9/14 (64%) | ~2511 | 🎯 SESSION 3 |
| +border | 10/14 (71%) | ~2527 | 🎯 SESSION 4 |
| +text | 11/14 (79%) | ~2543 | 🎯 SESSION 5 |
| +background | 12/14 (86%) | ~2563 | 🎯 SESSION 6 |
| +animation | 13/14 (93%) | ~2595 | 🎯 SESSION 7 |
| Complete | 13/14 (93%) | ~2595 | 🏁 PHASE COMPLETE |

**Note**: layout deferred (14th module skipped)

---

## ✅ ACCEPTANCE CRITERIA (Per Session)

### Before Starting:
- [ ] `just check` passes (format, lint, typecheck)
- [ ] `just test` passes (baseline test count)
- [ ] Git working tree clean

### After Implementation:
- [ ] New `{module}.ts` file created with `generate()` function
- [ ] `index.ts` exports `generate`
- [ ] Tests added (`{module}.test.ts` or in existing file)
- [ ] `just check` passes
- [ ] `just test` passes with increased test count
- [ ] All new tests passing
- [ ] Committed with clear message

### Session Handover:
- [ ] CONTINUE.md updated with new progress
- [ ] Session handover doc created (if ending session)
- [ ] Next module identified

---

## 🎯 PHASE 0.5d COMPLETION CRITERIA

**When all 7 remaining modules complete**:

1. **All modules have generate()** (13/14 - layout deferred)
2. **~2595 total tests passing**
3. **Zero TypeScript errors**
4. **Zero lint issues**
5. **Symmetry with parse API** (matching patterns)

**Final deliverables**:
- [ ] All 7 modules implemented
- [ ] All tests passing
- [ ] HANDOVER.md documenting Phase 0.5d completion
- [ ] CONTINUE.md updated for Phase 0.5e (or next phase)
- [ ] Phase 0.5d marked COMPLETE

---

## 📚 REFERENCE DOCUMENTS

**Critical**:
- `.memory/archive/2025-10-21-phase0.5-v2/MASTER_PLAN.md` - Parse API design
- `.memory/archive/2025-10-21-phase0.5-v2/GENERATE_API_DESIGN.md` - Generate API design
- This document - Implementation guide

**Examples**:
- `src/generate/color/color.ts` - Pattern A example
- `src/generate/shadow/shadow.ts` - Pattern A (will be first session)
- `src/generate/position/position-generate.ts` - Pattern B example

**Parse side reference**:
- `src/parse/{module}/{module}.ts` - Auto-detection logic to mirror

---

## 🚨 CRITICAL NOTES

1. **Layout is deferred** - Don't attempt it, no unified IR type
2. **Follow pattern exactly** - Use completed modules as templates
3. **Mirror parse logic** - Same order of type checking
4. **Always validate baseline** - `just check && just test` before/after
5. **Commit per module** - Don't batch multiple modules
6. **Test thoroughly** - Minimum 8-10 tests per module
7. **Update docs** - CONTINUE.md progress tracking critical

---

## 🎯 NEXT SESSION: START HERE

**Execute**: Session 1 - shadow module

**Commands**:
```bash
# 1. Verify baseline
just check && just test

# 2. Start implementation
code src/generate/shadow/shadow.ts

# 3. Follow Session 1 guide above
```

**Expected outcome**: 
- 7/14 modules complete
- ~2479 tests passing
- Commit: `feat(shadow): add unified generate() returning GenerateResult`

---

**Status**: Ready for incremental execution 🚀
