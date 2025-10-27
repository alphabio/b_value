# Session 10: Round-Trip Testing - Phase 1 Expansion

**Current Status**: 88.98% coverage, 3,487 tests passing ✅
**Focus**: Quality testing (not coverage %)
**Phase**: 1 of 4 (Round-Trip Testing)

---

## 🎯 Mission: Expand Round-Trip Tests

**Goal**: Add 10-15 more round-trip tests to reach ~35 total

**Current Progress**: 21/35 tests complete (all passing!)

**Files**:
- `test/integration/roundtrip.test.ts` - Add tests here
- `test/integration/ROUNDTRIP_FAILURES.md` - Document failures here

---

## 📋 Tests to Add (10-15 tests)

### 1. Radial & Conic Gradients (3 tests)
```typescript
// In roundtrip.test.ts, add new describe block:
describe("radial gradients", () => {
  test("simple: radial-gradient(circle, red, blue)", () => { ... });
  test("with position: radial-gradient(at top left, red, blue)", () => { ... });
});

describe("conic gradients", () => {
  test("simple: conic-gradient(from 90deg, red, blue)", () => { ... });
});
```

### 2. Shadow Properties (4 tests)
```typescript
describe("box-shadow", () => {
  test("basic: 2px 2px 4px black", () => { ... });
  test("inset: inset 0 0 10px rgba(0,0,0,0.5)", () => { ... });
});

describe("text-shadow", () => {
  test("basic: 1px 1px 2px black", () => { ... });
  test("multiple: 1px 1px 2px black, -1px -1px 2px white", () => { ... });
});
```

### 3. Filter Functions (3 tests)
```typescript
describe("filters", () => {
  test("blur: blur(5px)", () => { ... });
  test("brightness: brightness(1.2)", () => { ... });
  test("multiple: blur(5px) brightness(1.2)", () => { ... });
});
```

### 4. Clip-path Shapes (2 tests)
```typescript
describe("clip-path", () => {
  test("circle: circle(50%)", () => { ... });
  test("polygon: polygon(0 0, 100% 0, 100% 100%)", () => { ... });
});
```

### 5. Animation/Transition (2 tests)
```typescript
describe("timing functions", () => {
  test("animation-timing-function: ease-in-out", () => { ... });
  test("transition-duration: 0.3s", () => { ... });
});
```

---

## 🚀 Step-by-Step Process

### Step 1: Add Import Statements
First, check what modules exist:
```bash
ls src/parse/gradient/     # For radial, conic
ls src/parse/shadow/       # For box-shadow, text-shadow
ls src/parse/filter/       # For filters
ls src/parse/clip-path/    # For clip-path
ls src/parse/animation/    # For timing functions
```

Then add imports to roundtrip.test.ts:
```typescript
import * as RadialGradientParse from "@/parse/gradient/radial";
import * as RadialGradientGenerate from "@/generate/gradient/radial";
// ... etc
```

### Step 2: Add Tests (5 at a time)
- Copy the test pattern from existing tests
- Add 5 tests
- Run: `pnpm test roundtrip`
- Check results

### Step 3: Handle Failures
**If tests fail**:
1. ❌ DO NOT modify test expectations
2. ✅ DO add failure to ROUNDTRIP_FAILURES.md:
   ```markdown
   ## [property]: [test description]
   **Date**: 2025-10-27
   **Input**: `[CSS value]`
   **Expected**: `[what we expect]`
   **Actual**: `[what we got]`
   **Status**: Investigating
   ```
3. ✅ DO investigate root cause (parse bug? generate bug?)
4. ✅ DO fix source code OR mark as known normalization

### Step 4: Run Full Test Suite
```bash
just test
```

Ensure no regressions.

### Step 5: Commit
```bash
git add test/integration/roundtrip.test.ts test/integration/ROUNDTRIP_FAILURES.md
git commit -m "test: expand round-trip tests (XX more tests)"
```

---

## 📚 Required Reading

Before starting:
1. `.memory/TEST_QUALITY_PLAN.md` - Overall quality plan
2. `.memory/archive/2025-10-27-roundtrip-phase1/HANDOVER.md` - Previous session
3. `test/integration/roundtrip.test.ts` - Current tests (see pattern)

---

## ✅ Success Criteria

- [ ] 10-15 new round-trip tests added
- [ ] Total: ~35 round-trip tests
- [ ] All failures documented (not hidden)
- [ ] Root causes investigated
- [ ] All tests passing OR documented in ROUNDTRIP_FAILURES.md
- [ ] Handover created in `.memory/archive/2025-10-27-roundtrip-expansion/`

---

## ⚠️ Important Rules

### DO
- ✅ Document every failure honestly
- ✅ Fix source code when bugs found
- ✅ Take time to investigate
- ✅ Add tests incrementally (5 at a time)

### DON'T
- ❌ Modify test expectations to make them pass
- ❌ Hide failures
- ❌ Chase coverage % (ignore it!)
- ❌ Add all 15 tests at once

---

## 🎯 Current State (Baseline)

```bash
# Run this first to verify baseline:
cd /Users/alphab/Dev/LLM/DEV/b_value
just test                    # Should show 3,487 tests passing
pnpm test roundtrip          # Should show 21 tests passing
```

**Expected**:
- ✅ 3,487 tests passing
- ✅ 21 round-trip tests passing
- ✅ Coverage: 88.98%
- ✅ Branch: coverage/90-percent

---

## 💡 Tips

1. **Check module paths first** - Use `ls src/parse/[category]/` to find correct imports
2. **Copy test pattern** - Use existing tests as template
3. **Test frequently** - Run `pnpm test roundtrip` after every 5 tests
4. **Document immediately** - Don't batch failure documentation
5. **Celebrate failures** - They reveal real issues!

---

## 📊 Progress Tracking

**Week 1 Goal**: 100 round-trip tests (Phase 1 complete)
**Current**: 21 tests (21%)
**This Session Goal**: 35 tests (35%)
**Remaining**: 65 tests for Phase 1

Take your time. Quality > speed. 🎯

---

**Last Updated**: 2025-10-27
**Next Agent**: Ready to expand round-trip tests
**Status**: 🟢 Green light - foundation solid, ready for expansion
