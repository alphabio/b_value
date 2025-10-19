# Animation API Implementation Plan

**Session**: 2025-10-19-animation-api
**Goal**: Implement parsers and generators for CSS animation properties (non-shorthand only)
**Reference**: https://developer.mozilla.org/en-US/docs/Web/CSS/animation

---

## Scope: Individual Animation Properties

Per project policy (no shorthands), we implement **individual properties only**:

### Core Properties (Simple)
1. ✅ **animation-delay** - `<time>#` (e.g., "1s, 2s")
2. ✅ **animation-duration** - `[ auto | <time [0s,∞]> ]#` (e.g., "1s, auto, 500ms")
3. ✅ **animation-iteration-count** - `<single-animation-iteration-count>#` (e.g., "infinite, 2, 3.5")
4. ✅ **animation-direction** - `<single-animation-direction>#` (e.g., "normal, reverse, alternate")
5. ✅ **animation-fill-mode** - `<single-animation-fill-mode>#` (e.g., "none, forwards, both")
6. ✅ **animation-play-state** - `<single-animation-play-state>#` (e.g., "running, paused")
7. ✅ **animation-name** - `[ none | <keyframes-name> ]#` (e.g., "none, slide-in, fadeOut")

### Timing Functions (Complex - High Priority)
8. ✅ **animation-timing-function** - `<easing-function>#`
   - Keywords: ease, ease-in, ease-out, ease-in-out, linear, step-start, step-end
   - Functions: cubic-bezier(), steps(), linear()

### Timeline Properties (Advanced - Lower Priority)
9. 🔄 **animation-timeline** - `<single-animation-timeline>#`
10. 🔄 **animation-range** - `[ <'animation-range-start'> <'animation-range-end'>? ]#`
11. 🔄 **animation-range-start** - Complex syntax with timeline-range-name
12. 🔄 **animation-range-end** - Complex syntax with timeline-range-name

---

## Implementation Strategy

### Phase 1: Simple Properties (High Value, Low Complexity)
**Target**: Properties 1-7 (delay, duration, iteration-count, direction, fill-mode, play-state, name)

These are straightforward:
- Comma-separated lists
- Keywords or simple values (time, number, identifier)
- No complex nesting

**Files to create**:
```
src/parse/animation/
├── index.ts
├── delay.ts & delay.test.ts
├── duration.ts & duration.test.ts
├── iteration-count.ts & iteration-count.test.ts
├── direction.ts & direction.test.ts
├── fill-mode.ts & fill-mode.test.ts
├── play-state.ts & play-state.test.ts
└── name.ts & name.test.ts

src/generate/animation/
├── index.ts
├── delay.ts & delay.generate.test.ts
├── duration.ts & duration.generate.test.ts
├── iteration-count.ts & iteration-count.generate.test.ts
├── direction.ts & direction.generate.test.ts
├── fill-mode.ts & fill-mode.generate.test.ts
├── play-state.ts & play-state.generate.test.ts
└── name.ts & name.generate.test.ts
```

### Phase 2: Timing Functions (High Value, Medium Complexity)
**Target**: animation-timing-function (easing functions)

**Complexity**:
- Keywords: ease, linear, etc.
- cubic-bezier(x1, y1, x2, y2)
- steps(n, <step-position>?)
- linear(<linear-stop>#)

**Files to create**:
```
src/parse/animation/
├── timing-function.ts & timing-function.test.ts
├── cubic-bezier.ts (helper)
├── steps.ts (helper)
└── linear-easing.ts (helper for linear() function)

src/generate/animation/
├── timing-function.ts & timing-function.generate.test.ts
├── cubic-bezier.ts (helper)
├── steps.ts (helper)
└── linear-easing.ts (helper)
```

### Phase 3: Timeline Properties (Lower Priority)
**Target**: animation-timeline, animation-range, animation-range-start/end

These are newer and less commonly used. Can be deferred.

---

## Core Types to Define

**Location**: `src/core/types/animation.ts`

```typescript
// Simple properties
export const AnimationDelaySchema = z.object({
  kind: z.literal("animation-delay"),
  delays: z.array(TimeSchema), // Reuse from core
});

export const AnimationDurationSchema = z.object({
  kind: z.literal("animation-duration"),
  durations: z.array(z.union([
    z.object({ type: z.literal("auto") }),
    TimeSchema
  ])),
});

export const AnimationIterationCountSchema = z.object({
  kind: z.literal("animation-iteration-count"),
  counts: z.array(z.union([
    z.object({ type: z.literal("infinite") }),
    z.number().positive()
  ])),
});

export const AnimationDirectionSchema = z.object({
  kind: z.literal("animation-direction"),
  directions: z.array(z.enum(["normal", "reverse", "alternate", "alternate-reverse"])),
});

export const AnimationFillModeSchema = z.object({
  kind: z.literal("animation-fill-mode"),
  modes: z.array(z.enum(["none", "forwards", "backwards", "both"])),
});

export const AnimationPlayStateSchema = z.object({
  kind: z.literal("animation-play-state"),
  states: z.array(z.enum(["running", "paused"])),
});

export const AnimationNameSchema = z.object({
  kind: z.literal("animation-name"),
  names: z.array(z.union([
    z.object({ type: z.literal("none") }),
    z.string() // keyframes name (identifier or string)
  ])),
});

// Timing functions (easing)
export const CubicBezierSchema = z.object({
  type: z.literal("cubic-bezier"),
  x1: z.number(),
  y1: z.number(),
  x2: z.number(),
  y2: z.number(),
});

export const StepsSchema = z.object({
  type: z.literal("steps"),
  steps: z.number().positive().int(),
  position: z.enum(["jump-start", "jump-end", "jump-none", "jump-both", "start", "end"]).optional(),
});

export const LinearStopSchema = z.object({
  output: z.number(),
  input: z.number().min(0).max(1).optional(),
});

export const LinearEasingSchema = z.object({
  type: z.literal("linear"),
  stops: z.array(LinearStopSchema).min(1),
});

export const EasingFunctionSchema = z.union([
  z.enum(["ease", "ease-in", "ease-out", "ease-in-out", "linear", "step-start", "step-end"]),
  CubicBezierSchema,
  StepsSchema,
  LinearEasingSchema,
]);

export const AnimationTimingFunctionSchema = z.object({
  kind: z.literal("animation-timing-function"),
  functions: z.array(EasingFunctionSchema),
});
```

---

## Keywords to Add

**Location**: `src/core/keywords/animation.ts`

```typescript
export const ANIMATION_DIRECTION_KEYWORDS = [
  "normal",
  "reverse",
  "alternate",
  "alternate-reverse",
] as const;

export const ANIMATION_FILL_MODE_KEYWORDS = [
  "none",
  "forwards",
  "backwards",
  "both",
] as const;

export const ANIMATION_PLAY_STATE_KEYWORDS = [
  "running",
  "paused",
] as const;

export const EASING_KEYWORD_KEYWORDS = [
  "ease",
  "ease-in",
  "ease-out",
  "ease-in-out",
  "linear",
  "step-start",
  "step-end",
] as const;

export const STEP_POSITION_KEYWORDS = [
  "jump-start",
  "jump-end",
  "jump-none",
  "jump-both",
  "start",
  "end",
] as const;
```

---

## Testing Strategy

### Per-Property Tests (15+ tests each)
- Simple case: single value
- Multiple values: comma-separated list
- Mixed types: where applicable (e.g., "1s, auto" for duration)
- Keywords: all valid keywords
- Edge cases: boundary values
- Invalid: error handling

### Round-Trip Tests
- Parse → Generate → Parse should equal original

### Integration Tests
- Combine multiple animation properties
- Real-world examples from MDN

---

## Implementation Order

1. **Setup** (30 min)
   - Create types in `src/core/types/animation.ts`
   - Create keywords in `src/core/keywords/animation.ts`
   - Export from core index files

2. **Phase 1: Simple Properties** (3-4 hours)
   - Implement parsers for 7 simple properties
   - Implement generators for 7 simple properties
   - Write tests (15+ per property = 210+ tests)
   - Run quality gates

3. **Phase 2: Timing Functions** (2-3 hours)
   - Implement cubic-bezier() parser/generator
   - Implement steps() parser/generator
   - Implement linear() parser/generator
   - Implement timing-function wrapper
   - Write tests (50+ tests)
   - Run quality gates

4. **Phase 3: Timeline Properties** (deferred)
   - Only if time permits or user requests

5. **Final** (30 min)
   - Update documentation
   - Update CONTINUE.md
   - Create HANDOVER.md
   - Final commit

---

## Success Criteria

- [ ] All simple properties (1-7) implemented with parsers and generators
- [ ] Timing functions (cubic-bezier, steps, linear) implemented
- [ ] 260+ new tests (210 simple + 50 timing)
- [ ] All tests passing (current 903 + new tests)
- [ ] `just check` passes
- [ ] Round-trip validation for all properties
- [ ] Documentation updated
- [ ] Types exported from src/index.ts

---

## Notes

- **No shorthand**: `animation` property is out of scope
- **Reuse existing**: Time values already implemented in core
- **Follow patterns**: Use gradient parsers as template for comma-separated lists
- **DRY**: Extract shared comma-list parsing logic to utils if repeated
