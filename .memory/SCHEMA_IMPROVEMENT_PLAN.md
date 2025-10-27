# Schema Improvement Master Plan

**Date**: 2025-10-27
**Status**: ✅ Phase 1 COMPLETE | 🚀 Phase 2 READY
**Commit**: 27f887e

---

## 📊 Progress Summary

### ✅ Phase 1: Units (COMPLETE)
- [x] `angle.ts` - 4 errors → 1 clear message
- [x] `frequency.ts` - 2 errors → 1 clear message
- [x] `length.absolute.ts` - 7 errors → 1 clear message
- [x] `length.font.ts` - 12 errors → 1 clear message
- [x] `length.viewport.ts` - 24 errors → 1 grouped message
- [x] `time.ts` - Already had custom error ✅
- [x] `percentage.ts` - Single literal, no union (N/A)

**Result**: All unit schemas now have custom error messages!

### 🚀 Phase 2: Animation & Transition Types (NEXT)
- [ ] `animation.ts` - Add custom errors to unions
- [ ] `transition.ts` - Add custom errors to unions

### 📋 Phase 3: Remaining Core Types
- [ ] 13 type files remaining (see full list below)

---

## 🎯 Established Pattern

```typescript
export const unitSchema = z.union(
  [
    z.literal("unit1").describe("description"),
    z.literal("unit2").describe("description"),
  ],
  {
    error: (issue) =>
      issue.code === "invalid_union"
        ? 'Clear error message listing all valid units'
        : "Invalid input"
  }
).describe("Overall purpose");
```

**Benefits Achieved**:
- ✅ Single clear error instead of N "expected X" messages
- ✅ Better DX for users debugging validation
- ✅ Cleaner test assertions
- ✅ All 3,723 tests still passing

---

## 📋 Remaining Work

### Phase 2: Animation & Transition (Priority: HIGH)
**Estimated**: 2-3 hours

These already use discriminatedUnion, just need custom errors on any remaining simple unions.

- [ ] `src/core/types/animation.ts`
- [ ] `src/core/types/transition.ts`

### Phase 3: Other Core Types (Priority: MEDIUM)  
**Estimated**: 4-6 hours (spread across sessions)

- [ ] `transform.ts` - Has discriminatedUnion, add custom errors
- [ ] `color.ts` - Color space unions
- [ ] `border.ts`
- [ ] `outline.ts`
- [ ] `clip-path.ts`
- [ ] `position-layer.ts` - Has discriminatedUnion
- [ ] `flexbox.ts`
- [ ] `grid-line.ts`
- [ ] `layout.ts`
- [ ] `length-percentage.ts`
- [ ] `position.ts`
- [ ] `ratio.ts`
- [ ] `typography.ts`

### Keywords: PARKED
- 90+ keyword files are simple enums
- Errors already clear ("expected 'visible'")
- Not worth the effort

---

## 🎓 Lessons Learned

1. **Units first was right** - High impact, quick wins, foundational
2. **Pattern is easy to apply** - Takes ~5-10 mins per file
3. **viewport.ts taught us** - For many options, group by category in error message
4. **Tests just work** - No test changes needed, schemas are backwards compatible

---

## 🚀 Next Action

Start Phase 2 with `animation.ts`:
1. View current unions
2. Identify which need custom errors
3. Apply pattern
4. Test and commit

