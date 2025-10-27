# Schema Improvement Master Plan

**Date**: 2025-10-27  
**Status**: ✅ Phase 1 & 2 COMPLETE | 📋 Phase 3 READY
**Commits**: 27f887e (Phase 1), 88d14b5 (Phase 2)

---

## 🎉 Completed Phases

### ✅ Phase 1: Units (COMPLETE)
All unit schemas now have custom error messages:
- [x] `angle.ts` - 4 errors → 1 message
- [x] `frequency.ts` - 2 errors → 1 message
- [x] `length.absolute.ts` - 7 errors → 1 message
- [x] `length.font.ts` - 12 errors → 1 message
- [x] `length.viewport.ts` - 24 errors → 1 grouped message
- [x] `time.ts` - Already had custom error ✅
- [x] `percentage.ts` - Single literal, no union (N/A)

### ✅ Phase 2: Animation & Transition (COMPLETE)
Critical types for generate validation work:
- [x] `animation.ts` - 3 unions improved:
  - animationIterationCountSchema (infinite/number)
  - animationNameSchema (none/identifier)
  - easingFunctionSchema (keyword + 3 function types)
- [x] `transition.ts` - 1 union improved:
  - transitionPropertySchema (none/all/identifier)

**Impact**: 4 more unions with clear error messages!

---

## 📋 Phase 3: Remaining Core Types (13 files)

**Priority tiers** for remaining work:

### Tier 1: High Usage (Do Next)
- [ ] `transform.ts` - Has discriminatedUnion, add custom errors
- [ ] `color.ts` - Color space unions
- [ ] `length-percentage.ts` - Common utility type

### Tier 2: Visual Properties
- [ ] `border.ts`
- [ ] `outline.ts`
- [ ] `clip-path.ts`
- [ ] `position-layer.ts` - Has discriminatedUnion

### Tier 3: Layout
- [ ] `flexbox.ts`
- [ ] `grid-line.ts`
- [ ] `layout.ts`
- [ ] `position.ts`

### Tier 4: Misc
- [ ] `ratio.ts`
- [ ] `typography.ts`

---

## 📊 Overall Progress

**Completed**: 8 files (6 units + 2 types)  
**Remaining**: 13 type files  
**Parked**: 90+ keyword files (not needed)

**Tests**: All 3,723 passing ✅

---

## 🎯 Established Pattern

```typescript
export const schema = z.union(
  [
    z.literal("value1").describe("description"),
    z.object({ type: z.literal("type1"), ... }),
  ],
  {
    error: (issue) =>
      issue.code === "invalid_union"
        ? 'Clear, specific error message'
        : "Invalid input"
  }
);
```

**When to apply**:
- ✅ Simple unions (multiple literals or enums)
- ✅ Object unions (discriminated or not)
- ✅ Mixed unions (literals + objects + schemas)
- ❌ Single literals (no union needed)
- ❌ z.enum() from keyword arrays (errors already clear)

---

## 🚀 Next Steps

**Option A**: Continue with Tier 1 (transform, color, length-percentage)  
**Option B**: Take a break, resume Phase 3 later  
**Option C**: Focus on generate function validation (use improved schemas)

**Recommendation**: Take stock of progress and decide if Phase 3 is needed now or later.

---

## 💡 Key Learnings

1. **Fast iteration** - ~5-10 mins per file once pattern established
2. **Zero test breakage** - Schemas are backwards compatible
3. **Clear value** - Error messages went from confusing to helpful
4. **Generate validation ready** - Animation/transition schemas ready for use

---

**Total session time**: ~1.5 hours for 8 files (Phase 1 + 2)  
**Estimated remaining**: ~3-4 hours for 13 files (Phase 3)

