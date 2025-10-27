# Schema Improvement Master Plan

**Date**: 2025-10-27
**Status**: 🚀 IN PROGRESS - Phase 1: Units
**Goal**: Apply custom union error messages to improve validation DX

---

## 🎯 Two Patterns to Apply

### Pattern 1: Custom Union Error Messages ✅
**Example**: `src/core/units/time.ts`

```typescript
export const timeUnitSchema = z.union(
  [
    z.literal("s").describe("seconds - canonical time unit"),
    z.literal("ms").describe("milliseconds - 1000 milliseconds in a second"),
  ],
  {
    error: (issue) => 
      issue.code === "invalid_union" 
        ? 'Invalid unit. Expected "s" or "ms".' 
        : "Invalid input"
  }
).describe("Time units specify duration or delay...");
```

### Pattern 2: discriminatedUnion for Type Unions ✅
**Example**: `src/generate/animation/duration.ts`

```typescript
export const animationDurationSchema = z.object({
  kind: z.literal("animation-duration"),
  durations: z.array(
    z.discriminatedUnion("type", [autoSchema, timeExtendedSchema])
  ).min(1),
});
```

---

## 📊 Audit Results

- **Total union schemas**: 15 in core/types + 6 in core/units
- **With custom errors**: 1 (time.ts)
- **Without custom errors**: 14+ types, 5 units
- **Using discriminatedUnion**: 4 types (animation, position-layer, size-layer, transform)
- **Keywords**: 90+ files - PARKED (simple enums, errors already clear)

---

## ��️ Execution Plan

### Phase 1: Units (Priority: HIGH) ⏳ IN PROGRESS
**Goal**: Complete unit schemas with custom errors
**Estimated**: 1-2 hours

- [ ] `angle.ts` - Add custom error to angleUnitSchema
- [ ] `frequency.ts` - Add custom error to frequencyUnitSchema
- [ ] `length.absolute.ts` - Check and improve if needed
- [ ] `length.font.ts` - Check and improve if needed
- [ ] `length.viewport.ts` - Check and improve if needed
- [ ] `percentage.ts` - Check if has unions

### Phase 2: Animation & Transition Types (Priority: HIGH)
**Goal**: Support generate validation work
**Estimated**: 2-3 hours

- [ ] `animation.ts` - Add custom errors to unions
- [ ] `transition.ts` - Add custom errors to unions

### Phase 3: Remaining Core Types (Priority: MEDIUM)
**Goal**: Comprehensive type improvements
**Estimated**: 4-6 hours (can spread across sessions)

- [ ] `transform.ts` - Add custom errors (has discriminatedUnion)
- [ ] `color.ts` - Add custom errors to color space unions
- [ ] `border.ts` - Add custom errors
- [ ] `outline.ts` - Add custom errors
- [ ] `clip-path.ts` - Add custom errors
- [ ] `position-layer.ts` - Add custom errors
- [ ] `flexbox.ts` - Add custom errors
- [ ] `grid-line.ts` - Add custom errors
- [ ] `layout.ts` - Add custom errors
- [ ] `length-percentage.ts` - Add custom errors
- [ ] `position.ts` - Add custom errors
- [ ] `ratio.ts` - Add custom errors
- [ ] `typography.ts` - Add custom errors

### Phase 4: Apply to Generate Functions (Priority: HIGH)
**Goal**: Use improved schemas in validation
**Estimated**: Done as types are improved

This happens automatically as we improve schemas - generate functions already import them.

---

## ✅ Success Criteria

- [ ] All unit schemas have custom error messages
- [ ] Animation/transition types improved (for generate work)
- [ ] All 3,723+ tests still passing
- [ ] Cleaner error messages in failure tests
- [ ] Pattern established for future schemas

---

## 📝 Progress Tracking

### Completed
- ✅ Pattern established (time.ts, duration.ts)
- ✅ Audit completed
- ✅ Master plan created
- ✅ Keywords parked (not needed)

### In Progress
- ⏳ Phase 1: Units - Starting with angle.ts

### Timeline
- Phase 1: 1-2 hours (6 files)
- Phase 2: 2-3 hours (2 files)
- Phase 3: 4-6 hours (13 files, spread across sessions)
- **Total**: ~8-12 hours

---

**Current Task**: Improve `angle.ts` schema with custom error message
