# 🎯 EXECUTE: 90% COVERAGE - DEFINITIVE PLAN

**Current**: 69.22% coverage (2122 tests passing)  
**Target**: 90% coverage  
**Gap**: +20.78% needed  
**Status**: ✅ GREEN BASELINE - Ready to execute

---

## ✅ YOU HAVE A PLAN - LET'S EXECUTE IT

You have **TWO excellent planning documents**:
1. `.memory/90_PERCENT_PLAN.md` - Strategy & approach
2. `.memory/COVERAGE_TARGETS.md` - Prioritized file list

**This document is THE EXECUTION CHECKLIST** - follow it step by step.

---

## 📋 PHASE 1: QUICK WINS → 75% Coverage

**Goal**: +5-7% coverage (69.22% → 75%)  
**Time**: 2-3 hours focused work  
**Files**: ~20-25 simple untested files

### Strategy
Test the **easiest, highest-impact files first**:
- Simple generators (keyword enums, boolean flags)
- Simple parsers (keyword validation)
- Files with clear patterns to copy

### File Priority (Start Here)

**Batch 1: Visual Effects (2 files) - 10 min**
- [ ] `src/generate/visual/background-blend-mode.generate.ts`
- [ ] `src/generate/visual/mix-blend-mode.generate.ts`

**Batch 2: Layout Keywords (3 files) - 15 min**
- [ ] `src/generate/layout/float.generate.ts`
- [ ] `src/generate/layout/overflow.generate.ts`
- [ ] `src/generate/layout/clear.generate.ts`

**Batch 3: Text Decoration (4 files) - 20 min**
- [ ] `src/generate/text/line.ts`
- [ ] `src/generate/text/style.ts`
- [ ] `src/generate/text/color.ts`
- [ ] `src/generate/text/thickness.ts`

**Batch 4: Background Properties (5 files) - 25 min**
- [ ] `src/parse/background/clip.ts`
- [ ] `src/parse/background/origin.ts`
- [ ] `src/parse/background/repeat.ts`
- [ ] `src/parse/background/attachment.ts`
- [ ] `src/parse/background/size.ts`

**Batch 5: Simple Parsers (6 files) - 30 min**
- [ ] `src/parse/layout/cursor.ts`
- [ ] `src/parse/layout/visibility.ts`
- [ ] `src/parse/layout/display.ts`
- [ ] `src/parse/layout/opacity.ts`
- [ ] `src/parse/layout/box-sizing.ts`
- [ ] `src/parse/color/named.ts`

### Execution Pattern

```bash
# 1. Pick ONE file from batch above
FILE="src/generate/visual/background-blend-mode.generate.ts"

# 2. Create test file
TEST_FILE="${FILE%.ts}.test.ts"
cp similar-existing-test.test.ts $TEST_FILE

# 3. Run in watch mode
pnpm vitest --watch $TEST_FILE

# 4. Write 3-5 tests:
#    - Valid value test
#    - Invalid value test  
#    - Edge case test
#    - Round-trip test (if parser exists)

# 5. Verify coverage went up
pnpm test:coverage | grep "% Coverage" -A 3

# 6. Commit
git add $TEST_FILE
git commit -m "test(visual): add background-blend-mode generator tests - coverage +0.2%"

# 7. Repeat for next file
```

### Success Criteria for Phase 1
- ✅ Coverage ≥ 75%
- ✅ ~20-25 new test files
- ✅ ~100-150 new tests
- ✅ All tests passing
- ✅ Committed after each batch

---

## 📋 PHASE 2: MEDIUM IMPACT → 83% Coverage

**Goal**: +8% coverage (75% → 83%)  
**Time**: 4-6 hours  
**Files**: ~30-40 partially tested files

### Strategy
Files with **50-80% coverage** - they have tests but missing branches:
- Add error cases
- Add edge values
- Add enum completeness
- Test all code paths

### How to Find These Files

```bash
# List files with 50-80% coverage
pnpm test:coverage 2>&1 | grep -E "^\s+[a-z].*\|.*[5-7][0-9]\.[0-9]+" > medium-coverage-files.txt

# Review the list and pick highest-impact files
```

### Priority Files (from coverage report)

**Batch 1: Animation (partial coverage)**
- [ ] `src/generate/animation/timing-function.ts` (54.54%)
- [ ] `src/generate/animation/delay.ts` (71.42%)
- [ ] `src/generate/animation/direction.ts` (71.42%)
- [ ] `src/generate/animation/fill-mode.ts` (71.42%)
- [ ] `src/generate/animation/play-state.ts` (71.42%)

**Batch 2: Background (partial coverage)**
- [ ] `src/generate/background/attachment.ts` (60%)
- [ ] `src/generate/background/clip.ts` (60%)
- [ ] `src/generate/background/origin.ts` (60%)
- [ ] `src/generate/background/repeat.ts` (60%)

**Batch 3: Color (partial coverage)**
- [ ] Complete coverage for color parsers
- [ ] Complete coverage for color generators

**Batch 4: Gradient (partial coverage)**
- [ ] `src/generate/gradient/linear.ts`
- [ ] `src/generate/gradient/radial.ts`
- [ ] `src/generate/gradient/conic.ts`
- [ ] `src/generate/gradient/color-stop.ts`

### Execution Pattern

```bash
# 1. Pick file with partial coverage
FILE="src/generate/animation/timing-function.ts"

# 2. Check what's NOT covered
pnpm test:coverage -- $FILE

# 3. Look at uncovered lines in coverage report
# Example: "Uncovered Line #s: 34-47,86-87"

# 4. Open test file, add tests for those lines
# Usually means:
#    - Testing error branches
#    - Testing edge values (null, undefined, 0, negative)
#    - Testing all enum values

# 5. Run test in watch mode
pnpm vitest --watch ${FILE%.ts}.test.ts

# 6. Add tests until coverage is 100% for that file

# 7. Commit
git add .
git commit -m "test(animation): complete timing-function coverage - 54% → 100%"
```

### Success Criteria for Phase 2
- ✅ Coverage ≥ 83%
- ✅ ~30-40 files improved
- ✅ ~150-200 new tests
- ✅ All medium-coverage files at 90%+
- ✅ Committed after each 5-file batch

---

## 📋 PHASE 3: HARD STUFF → 90%+ Coverage

**Goal**: +7%+ coverage (83% → 90%+)  
**Time**: 6-8 hours  
**Files**: ~15-20 complex files

### Strategy
Complex files with lots of logic that need careful testing:
- AST manipulation utilities
- Transform matrix math
- Color space conversions
- Complex parsing logic

### Priority Files (Complex Logic)

**Batch 1: Clip-Path (complex shapes)**
- [ ] `src/generate/clip-path/circle.ts`
- [ ] `src/generate/clip-path/ellipse.ts`
- [ ] `src/generate/clip-path/polygon.ts`
- [ ] `src/generate/clip-path/inset.ts`
- [ ] `src/generate/clip-path/rect.ts`
- [ ] `src/generate/clip-path/xywh.ts`
- [ ] `src/generate/clip-path/path.ts`

**Batch 2: Transform (complex math)**
- [ ] `src/generate/transform/transform.ts`
- [ ] `src/generate/transform/origin.ts`
- [ ] `src/generate/transform/utils.ts`
- [ ] `src/parse/transform/transform.ts`

**Batch 3: Shadow (complex values)**
- [ ] `src/generate/shadow/box-shadow.ts`
- [ ] `src/generate/shadow/text-shadow.ts`
- [ ] `src/parse/shadow/shadow.ts`

**Batch 4: Filter (11 functions)**
- [ ] All filter parsers (11 files)
- [ ] All filter generators (if untested)

**Batch 5: Utilities (complex parsing)**
- [ ] `src/utils/ast/functions.ts`
- [ ] `src/utils/parse/color.ts`
- [ ] `src/utils/parse/nodes/*.ts`
- [ ] `src/utils/generate/color.ts`

### Execution Pattern

```bash
# 1. Pick complex file
FILE="src/generate/transform/transform.ts"

# 2. READ THE CODE FIRST
#    - Understand all code paths
#    - Identify edge cases
#    - Note error conditions

# 3. List all functions/branches
#    - Write them down on paper
#    - One test per function/branch

# 4. Create comprehensive test suite
#    - Valid inputs (happy path)
#    - Invalid inputs (errors)
#    - Edge cases (boundaries)
#    - Combined operations
#    - Round-trip validation

# 5. Run with coverage
pnpm vitest --coverage $FILE

# 6. Keep adding tests until 90%+ for that file

# 7. Commit
git add .
git commit -m "test(transform): comprehensive transform tests - coverage +1.5%"
```

### Success Criteria for Phase 3
- ✅ Coverage ≥ 90%
- ✅ All complex files at 85%+
- ✅ ~100-150 new tests
- ✅ No skipped tests
- ✅ All edge cases covered

---

## 🎯 OVERALL EXECUTION CHECKLIST

### Before Starting
- [x] Baseline is green (`just check && just test` passing)
- [x] Current coverage known (69.22%)
- [x] Plan reviewed and understood
- [ ] Create branch: `git checkout -b coverage/90-percent`

### Phase 1: Quick Wins (2-3 hours)
- [ ] Complete Batch 1 (2 files)
- [ ] Complete Batch 2 (3 files)
- [ ] Complete Batch 3 (4 files)
- [ ] Complete Batch 4 (5 files)
- [ ] Complete Batch 5 (6 files)
- [ ] Verify coverage ≥ 75%
- [ ] Commit phase completion

### Phase 2: Medium Impact (4-6 hours)
- [ ] Complete Animation batch (5 files)
- [ ] Complete Background batch (4 files)
- [ ] Complete Color batch
- [ ] Complete Gradient batch (4 files)
- [ ] Verify coverage ≥ 83%
- [ ] Commit phase completion

### Phase 3: Hard Stuff (6-8 hours)
- [ ] Complete Clip-Path batch (7 files)
- [ ] Complete Transform batch (4 files)
- [ ] Complete Shadow batch (3 files)
- [ ] Complete Filter batch (11 files)
- [ ] Complete Utilities batch
- [ ] Verify coverage ≥ 90%
- [ ] Commit phase completion

### After Completion
- [ ] Run full test suite: `just test`
- [ ] Run coverage report: `pnpm test:coverage`
- [ ] Verify coverage ≥ 90%
- [ ] Run all checks: `just check`
- [ ] Create PR with summary
- [ ] Update STATUS.md
- [ ] Celebrate! 🎉

---

## 📊 TRACKING PROGRESS

### Daily Check-In Format

```markdown
## Coverage Progress - [DATE]

**Starting Coverage**: 69.22%
**Current Coverage**: [XX.XX]%
**Progress Today**: +[X.XX]%

**Files Added Today**: [N]
**Tests Added Today**: [N]

**Phase**: [1/2/3]
**Batch**: [Current batch]

**Blockers**: [None/Describe]

**Next Session**: [What to tackle next]
```

### Commit Message Format

```bash
# Pattern:
test(module): add [feature] tests - coverage +X.X%

# Examples:
test(visual): add blend-mode tests - coverage +0.3%
test(animation): complete timing-function coverage - 54% → 100%
test(phase1): complete quick wins - coverage 69.22% → 75.1%
```

---

## 🚫 ANTI-PATTERNS TO AVOID

### DON'T Do This
❌ Write 50 test files without running them  
❌ Use `@ts-ignore` or `any` to bypass types  
❌ Write tests that mock everything  
❌ Skip error cases "to save time"  
❌ Commit without verifying coverage went up  
❌ Test implementation details instead of behavior  

### DO This Instead
✅ Write 1 test file, verify it works, commit  
✅ Use proper types, fix type errors  
✅ Test real behavior with real inputs  
✅ Test error cases explicitly  
✅ Check coverage after each batch  
✅ Test public API behavior  

---

## 🎓 TESTING PATTERNS TO USE

### 1. Generator Test Pattern
```typescript
import { describe, expect, it } from "vitest";
import { generate } from "./property-name";

describe("propertyName generator", () => {
  it("should generate valid value", () => {
    const result = generate({ kind: "property-name", value: "test" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe("expected-css");
    }
  });

  it("should error on null input", () => {
    const result = generate(null as any);
    expect(result.ok).toBe(false);
  });

  it("should error on missing required field", () => {
    const result = generate({} as any);
    expect(result.ok).toBe(false);
  });
});
```

### 2. Parser Test Pattern
```typescript
import { describe, expect, it } from "vitest";
import { parse } from "./property-name";

describe("propertyName parser", () => {
  it("should parse valid value", () => {
    const result = parse("valid-css-value");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toEqual({ kind: "property-name", value: "test" });
    }
  });

  it("should error on invalid value", () => {
    const result = parse("invalid");
    expect(result.ok).toBe(false);
  });

  it("should error on empty string", () => {
    const result = parse("");
    expect(result.ok).toBe(false);
  });
});
```

### 3. Round-Trip Test Pattern
```typescript
it("should round-trip successfully", () => {
  const original = "rotate(45deg)";
  const parsed = parse(original);
  expect(parsed.ok).toBe(true);
  
  if (parsed.ok) {
    const generated = generate(parsed.value);
    expect(generated.ok).toBe(true);
    if (generated.ok) {
      expect(generated.value).toBe(original);
    }
  }
});
```

---

## 📅 ESTIMATED TIMELINE

### Aggressive (Full-Time Focus)
- **Week 1**: Phase 1 + Phase 2 (75% → 83%)
- **Week 2**: Phase 3 (83% → 90%+)
- **Total**: 2 weeks

### Realistic (Part-Time)
- **Week 1-2**: Phase 1 (69% → 75%)
- **Week 3-4**: Phase 2 (75% → 83%)
- **Week 5-6**: Phase 3 (83% → 90%+)
- **Total**: 6 weeks

### Sustainable (1-2 hours/day)
- **Daily**: 1-2 files tested
- **Weekly**: ~10-15 files
- **Total**: 8-10 weeks

**Recommended**: Realistic pace (4-6 weeks)

---

## 🎯 SUCCESS METRICS

### Quantitative
- ✅ Coverage ≥ 90%
- ✅ All tests passing (100%)
- ✅ ~300-500 new tests added
- ✅ ~80-100 new test files
- ✅ Zero skipped/pending tests

### Qualitative
- ✅ Tests are readable
- ✅ Tests are maintainable
- ✅ Tests document behavior
- ✅ Tests catch regressions
- ✅ Confidence in shipping v1.0.0

---

## 🚀 GETTING STARTED RIGHT NOW

```bash
# 1. Create branch
git checkout -b coverage/90-percent

# 2. Pick FIRST file (easiest win)
# Let's start with visual effects - simple keyword enums

# 3. Create test
cat > src/generate/visual/background-blend-mode.generate.test.ts << 'EOF'
import { describe, expect, it } from "vitest";
import { generate } from "./background-blend-mode.generate";

describe("background-blend-mode generator", () => {
  it("should generate normal", () => {
    const result = generate({ kind: "background-blend-mode", value: "normal" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe("normal");
  });

  it("should generate multiply", () => {
    const result = generate({ kind: "background-blend-mode", value: "multiply" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe("multiply");
  });

  it("should error on null", () => {
    const result = generate(null as any);
    expect(result.ok).toBe(false);
  });
});
EOF

# 4. Run test
pnpm vitest src/generate/visual/background-blend-mode.generate.test.ts

# 5. Commit
git add .
git commit -m "test(visual): add background-blend-mode tests - coverage +0.1%"

# 6. REPEAT for next file
```

---

## 💪 YOU GOT THIS

You have:
- ✅ **Green baseline** (all tests passing)
- ✅ **Clear plan** (this document)
- ✅ **Prioritized files** (COVERAGE_TARGETS.md)
- ✅ **Working patterns** (existing tests to copy)
- ✅ **Measurable progress** (coverage %)

**This is not complex. It's just systematic work.**

The library is **easy to test** because:
- Functions are pure (no side effects)
- Inputs/outputs are clear
- Result<T,E> pattern is consistent
- Existing tests show the way

**Just execute the plan, one file at a time. You'll hit 90% in 2-6 weeks.**

---

**Last Updated**: 2025-10-23  
**Status**: Ready to Execute  
**Next**: Create branch and start Phase 1, Batch 1
