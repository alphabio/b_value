# Next Agent: Transition Properties Implementation

**Date**: 2025-10-19  
**From**: Animation World-Class Session  
**To**: Next Agent  
**Recommended Task**: Transition Properties

---

## Quick Start for Next Agent

You're picking up after a successful animation API implementation. The perfect next step is **transition properties** because we can reuse ~50% of the animation code.

### Immediate Actions

```bash
# 1. Verify baseline
just check && just test
# Should show: 1075 tests passing

# 2. Read this handover
cat .memory/archive/2025-10-19-animation-world-class/HANDOVER.md

# 3. Review timing-function implementation (you'll reuse this!)
cat src/parse/animation/timing-function.ts
cat src/generate/animation/timing-function.ts

# 4. Start working
mkdir -p .memory/archive/2025-10-19-transition-api
```

---

## What to Implement: Transition Properties

### Scope (4 properties)

1. **transition-delay** 
   - Pattern: Exactly like animation-delay
   - Reuse: Copy `src/parse/animation/delay.ts`
   - Tests: ~15 tests

2. **transition-duration**
   - Pattern: Exactly like animation-duration (but no `auto` keyword)
   - Reuse: Copy animation-duration, remove auto support
   - Tests: ~15 tests

3. **transition-timing-function** ⭐ (The big win)
   - Pattern: **IDENTICAL to animation-timing-function**
   - Reuse: Extract timing function to shared utility
   - Option A: Copy animation timing-function files directly
   - Option B: Extract to `src/utils/parse/easing.ts` (better DRY)
   - Tests: ~25 tests (or reuse animation tests)

4. **transition-property**
   - Pattern: CSS property names (identifiers)
   - Keywords: `none`, `all`
   - Identifiers: CSS property names (kebab-case)
   - Examples: `opacity`, `transform`, `background-color`
   - Tests: ~20 tests

**Total Effort**: 2-3 hours  
**Total Tests**: ~75-80 new tests  
**Final Count**: 1075 → 1150-1155 tests

---

## Code Reuse Strategy

### Option A: Direct Copy (Fastest - Recommended for Speed)

```bash
# 1. Copy animation files to transition
cp src/parse/animation/delay.ts src/parse/transition/delay.ts
cp src/parse/animation/duration.ts src/parse/transition/duration.ts
cp src/parse/animation/timing-function.ts src/parse/transition/timing-function.ts

# 2. Find/replace in files
# animation-delay → transition-delay
# AnimationDelay → TransitionDelay
# etc.

# 3. Update duration.ts to remove 'auto' support

# 4. Implement transition-property (new)
```

### Option B: Extract Shared Utilities (Better DRY - Recommended for Quality)

```bash
# 1. Extract easing functions to shared utility
mkdir -p src/utils/parse/easing
# Move timing-function logic to:
# - src/utils/parse/easing/cubic-bezier.ts
# - src/utils/parse/easing/steps.ts
# - src/utils/parse/easing/linear.ts
# - src/utils/parse/easing/index.ts

# 2. Update animation-timing-function to use utilities
# 3. Create transition-timing-function using same utilities
# 4. Copy delay/duration as before
# 5. Implement transition-property
```

**My Recommendation**: Start with Option A for speed, then refactor to Option B if time permits.

---

## File Structure

### Create These Files

```
src/
├── core/
│   └── types/
│       └── transition.ts          # NEW - TransitionDelay, TransitionDuration, etc.
├── parse/
│   └── transition/
│       ├── index.ts               # NEW - Export all
│       ├── delay.ts               # NEW - Copy from animation
│       ├── delay.test.ts          # NEW
│       ├── duration.ts            # NEW - Copy from animation (remove auto)
│       ├── duration.test.ts       # NEW
│       ├── timing-function.ts     # NEW - Copy from animation
│       ├── timing-function.test.ts # NEW
│       ├── property.ts            # NEW - Implement property names
│       └── property.test.ts       # NEW
└── generate/
    └── transition/
        ├── index.ts               # NEW - Export all
        ├── delay.ts               # NEW
        ├── delay.generate.test.ts # NEW
        ├── duration.ts            # NEW
        ├── duration.generate.test.ts # NEW
        ├── timing-function.ts     # NEW
        ├── timing-function.generate.test.ts # NEW
        ├── property.ts            # NEW
        └── property.generate.test.ts # NEW
```

---

## Implementation Guide

### Step 1: Core Types (15 min)

Create `src/core/types/transition.ts`:

```typescript
import { z } from "zod";
import { timeSchema } from "./time";
import { easingFunctionSchema } from "./animation"; // Reuse!

export const transitionDelaySchema = z.object({
  kind: z.literal("transition-delay"),
  delays: z.array(timeSchema).min(1),
});

export const transitionDurationSchema = z.object({
  kind: z.literal("transition-duration"),
  durations: z.array(timeSchema).min(1), // No 'auto' here!
});

export const transitionTimingFunctionSchema = z.object({
  kind: z.literal("transition-timing-function"),
  functions: z.array(easingFunctionSchema).min(1), // Reuse!
});

export const transitionPropertySchema = z.object({
  kind: z.literal("transition-property"),
  properties: z.array(
    z.union([
      z.literal("none"),
      z.literal("all"),
      z.object({ type: z.literal("identifier"), value: z.string() }),
    ])
  ).min(1),
});

export type TransitionDelay = z.infer<typeof transitionDelaySchema>;
export type TransitionDuration = z.infer<typeof transitionDurationSchema>;
export type TransitionTimingFunction = z.infer<typeof transitionTimingFunctionSchema>;
export type TransitionProperty = z.infer<typeof transitionPropertySchema>;
```

### Step 2: Copy Delay (20 min)

```bash
# Copy files
cp src/parse/animation/delay.ts src/parse/transition/delay.ts
cp src/parse/animation/delay.test.ts src/parse/transition/delay.test.ts
cp src/generate/animation/delay.ts src/generate/transition/delay.ts
cp src/generate/animation/delay.generate.test.ts src/generate/transition/delay.generate.test.ts

# Find/replace in all files:
# animation-delay → transition-delay
# AnimationDelay → TransitionDelay
# animation → transition (in paths)

# Update imports to use transition types
```

### Step 3: Copy Duration (20 min)

Same as delay, but **remove auto keyword support**:

```typescript
// In parseDuration(), remove this:
if (node.type === "Identifier" && node.name.toLowerCase() === "auto") {
  return ok({ type: "auto" as const });
}

// Remove auto from union type, keep only time
```

### Step 4: Copy Timing Function (15 min)

```bash
# Direct copy - it's identical!
cp src/parse/animation/timing-function.ts src/parse/transition/timing-function.ts
cp src/parse/animation/timing-function.test.ts src/parse/transition/timing-function.test.ts
cp src/generate/animation/timing-function.ts src/generate/transition/timing-function.ts
cp src/generate/animation/timing-function.generate.test.ts src/generate/transition/timing-function.generate.test.ts

# Find/replace:
# animation-timing-function → transition-timing-function
# AnimationTimingFunction → TransitionTimingFunction
```

### Step 5: Implement Property (60 min)

This is the only NEW logic:

```typescript
// src/parse/transition/property.ts
export function parse(css: string): Result<Type.TransitionProperty, string> {
  // Parse comma-separated list
  // Accept: "none", "all", or CSS property names
  // Examples: "opacity", "transform", "background-color"
  // Follow same comma-list pattern as other properties
}
```

**Key patterns**:
- Identifier nodes for property names
- Validate kebab-case format
- `none` and `all` are case-insensitive keywords
- Custom properties (`--custom-prop`) should be supported

### Step 6: Update Exports (10 min)

```typescript
// src/parse/transition/index.ts
export * as Delay from "./delay";
export * as Duration from "./duration";
export * as TimingFunction from "./timing-function";
export * as Property from "./property";

// src/parse/index.ts
export * as Transition from "./transition";
```

Same for generators.

### Step 7: Run Tests (5 min)

```bash
just check
just test
# Should see: 1075 → 1150+ tests
```

---

## Test Strategy

### Delay Tests (reuse animation tests)
- Single time value
- Multiple comma-separated
- Negative values (allowed)
- Decimals
- Round-trip

### Duration Tests (similar to animation)
- Single time value
- Multiple comma-separated  
- NO auto keyword (that's the difference)
- NO negative values (non-negative constraint)
- Round-trip

### Timing Function Tests (reuse animation tests)
- All keywords
- cubic-bezier with 4 params
- steps with position
- linear with stops
- Multiple functions
- Round-trip

### Property Tests (NEW)
- Single property: `opacity`
- Multiple: `opacity, transform`
- Keywords: `none`, `all`
- Hyphenated: `background-color`
- Custom: `--custom-prop`
- Case insensitive keywords
- Round-trip

---

## Expected Outcome

**Files Created**: ~16 new files
- 4 parsers + 4 tests
- 4 generators + 4 tests

**Lines of Code**: ~1,500 lines (mostly copied)

**Tests**: 1075 → 1150-1155 (+75-80)

**Time**: 2-3 hours total

**Commit Message**:
```
feat(transition): Implement transition properties API

Implement all 4 transition properties with comprehensive test coverage:

Properties Added:
- transition-delay (time values, allows negative)
- transition-duration (time values, non-negative only)
- transition-timing-function (reuse animation easing functions)
- transition-property (none | all | CSS property names)

Features:
- Full easing function support (cubic-bezier, steps, linear)
- CSS property name validation
- Custom property support (--variables)
- Comma-separated list support

Tests: 1075 → 1155 (+80 new tests)
- Comprehensive edge case coverage
- Round-trip validation
- Zero regressions

Code Reuse:
- timing-function: 100% reused from animation
- delay: 95% reused from animation
- duration: 90% reused from animation (removed auto)
- property: 100% new implementation
```

---

## Tips

1. **Start with delay** - easiest, builds confidence
2. **Copy tests too** - they're already written!
3. **Run tests frequently** - catch issues early
4. **Use animation as reference** - same patterns throughout
5. **DRY later** - get it working first, refactor if time permits

---

## Questions to Consider

**Should we extract easing functions to shared utils?**
- Pros: Better DRY, single source of truth
- Cons: More refactoring, might break existing animation code
- Recommendation: Do it AFTER transition works, as a separate refactor

**Should we support vendor prefixes?**
- Example: `-webkit-transform`
- Recommendation: Not yet, keep scope clean

**Should we validate property names against known CSS properties?**
- Pros: Catches typos
- Cons: Maintenance burden, spec changes
- Recommendation: No validation, accept any identifier

---

## Success Criteria

- [x] Baseline passes (1075 tests)
- [ ] All 4 transition properties implemented
- [ ] ~80 new tests, all passing
- [ ] Round-trip validation for all properties
- [ ] just check passes
- [ ] just test passes (1150+ tests)
- [ ] Zero regressions
- [ ] HANDOVER.md created
- [ ] CONTINUE.md updated
- [ ] Clean commit with good message

---

## Ready to Go!

You have everything you need:
- ✅ Working baseline (1075 tests)
- ✅ Animation code to copy from
- ✅ Clear implementation plan
- ✅ Established patterns
- ✅ Test templates

Estimated time: **2-3 hours** for world-class transition API.

Good luck! 🚀
