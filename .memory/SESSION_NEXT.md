# Session: Phase 2.1 - Fix Pilot Issues

**Status**: 🔴 Pilot complete but needs fixes before rollout
**Tests**: 3,760 passing (+184 from pilot), 12 skipped
**Coverage**: 89.49%

---

## 🚨 Critical Issues to Fix (User Feedback)

### Issue 1: Invalid Tests Don't Validate Error Messages

**Current** (wrong):

```typescript
test("x2 > 1", () => {
  const result = parse("cubic-bezier(0, 0, 1.1, 1)");
  expect(result.ok).toBe(false);  // ❌ NOT ENOUGH
});
```

**Required** (correct):

```typescript
test("x2 > 1", () => {
  const result = parse("cubic-bezier(0, 0, 1.1, 1)");
  expect(result.ok).toBe(false);
  if (result.ok) return;
  expect(result.error).toContain("x2");
  expect(result.error).toContain("<=1");
});
```

**Impact**: All 85 invalid tests in `timing-function.invalid.test.ts` need updating.

---

### Issue 2: Never Skip Tests

**User rule**: "We should NEVER skip tests - otherwise what's the point?"

**Problem**: 12 tests are skipped with `.skip()` for "css-tree limitations"

**Solution**: Re-classify each test:
- **If css-tree accepts it** → Move to valid tests, document behavior
- **If we should reject it** → Keep in invalid tests, fix bug or add proper assertions
- **Never skip** → Zero `.skip()` allowed

**Example fix**:

```typescript
// Before (skipped)
test.skip("double comma - css-tree accepts", () => {
  const result = parse("cubic-bezier(0.1,, 0.2, 0.3, 0.4)");
  expect(result.ok).toBe(false);
});

// After (if css-tree accepts)
test("double comma (css-tree behavior)", () => {
  const result = parse("cubic-bezier(0.1,, 0.2, 0.3, 0.4)");
  expect(result.ok).toBe(true);  // Document actual behavior
});
```

**Impact**: Re-test and re-classify all 12 skipped tests.

---

## 🎯 Next Session Tasks

### Task 1: Fix Invalid Tests (Est: 30-45 min)

Update all 85 invalid tests in `src/parse/animation/timing-function.invalid.test.ts`:

0. Might be easier to recreate file
1. Add error message validation to each test
2. Use pattern: `expect(result.error).toContain("key term")`
3. Test for function name, parameter name, constraint
4. Consider snapshot testing for full messages

**Files**: `src/parse/animation/timing-function.invalid.test.ts`

### Task 2: Remove All Skipped Tests (Est: 20-30 min)

Re-classify 12 skipped tests:

1. Run each test - what's the actual behavior?
2. **Passes?** → Move to valid tests, add comment explaining css-tree behavior
3. **Fails?** → Keep in invalid tests, add error message validation
4. Remove all `.skip()` calls

**Tests to fix**:
- 6 cubic-bezier malformed syntax
- 3 steps() position keywords
- 1 steps() malformed syntax
- 2 keyword case sensitivity

### Task 3: Validate Pattern (Est: 30 min)

After fixes, apply pattern to ONE simpler property:
- `animation-duration` (simple time values) OR
- `animation-direction` (just keywords)

Goal: Confirm pattern works for simpler cases

---

## 📊 Current State

```bash
cd /Users/alphab/Dev/LLM/DEV/b_value
just test                    # 3,760 passing, 12 skipped
git log -1 --oneline         # 1476166 docs: Add critical user feedback
```

**Branch**: `coverage/90-percent`
**Commit**: `1476166`

---

## 📁 Key Files

**To fix**:
- `src/parse/animation/timing-function.invalid.test.ts` (85 tests need error validation)
- `src/parse/animation/timing-function.invalid.test.ts` (12 skipped tests to re-classify)
- `src/parse/animation/timing-function.valid.test.ts` (may receive re-classified tests)

**Context**:
- `.memory/archive/2025-10-27-phase2-pilot/HANDOVER.md` (comprehensive analysis)
- `.memory/TESTING_STRATEGY_PHASE2.md` (original strategy)

---

## ✅ Success Criteria

Pattern is ready for rollout when:
- [ ] All invalid tests validate error messages (0 tests only checking `ok: false`)
- [ ] Zero skipped tests (0 `.skip()` calls)
- [ ] Pattern tested on 1-2 simpler properties
- [ ] User approves final approach

---

## 💡 Key Learnings

1. **Error messages ARE the API** - Must test content, not just failure
2. **Never skip tests** - Classify correctly as valid or invalid
3. **css-tree behavior** - Document it, don't skip it
4. **Test quality > quantity** - 85 incomplete tests < 85 proper tests

---

**Next Agent**: Fix issues, validate pattern, then seek user approval for rollout.
