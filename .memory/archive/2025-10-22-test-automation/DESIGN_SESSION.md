# Design Session: Test Automation Strategy

**Session Date**: 2025-10-22  
**Focus**: Coverage improvement strategy & test automation design  
**Coverage Progress**: 60.58% → 64.04% (+3.46%)  
**Tests Added**: +103 tests (+11 files)

---

## 🎯 Session Summary

Analyzed patterns in manual test creation and designed an automation strategy to accelerate coverage growth from current 3.5%/session to 5-7%/session.

---

## 📊 What We Accomplished

### 1. Coverage Progress
- **Before**: 60.58% coverage, 1624 tests
- **After**: 64.04% coverage, 1727 tests
- **Gain**: +3.46% (+103 tests)
- **Files**: +11 test files

### 2. Tests Created

#### Typography Generators (+38 tests, +6 files)
- `test/generate/typography/font-size.test.ts` - 7 tests
- `test/generate/typography/font-weight.test.ts` - 5 tests
- `test/generate/typography/line-height.test.ts` - 7 tests
- `test/generate/typography/text-align.test.ts` - 4 tests
- `test/generate/typography/font-family.test.ts` - 7 tests
- `test/generate/typography/vertical-align.test.ts` - 8 tests

#### Typography Parsers (+65 tests, +5 files)
- `test/parse/typography/font-size.test.ts` - 15 tests
- `test/parse/typography/font-family.test.ts` - 15 tests
- `test/parse/typography/font-weight.test.ts` - 13 tests
- `test/parse/typography/line-height.test.ts` - 13 tests
- `test/parse/typography/text-align.test.ts` - 9 tests

### 3. Baseline Fixes
- Fixed Math.PI precision in `utils/generate/values.test.ts` (2 tests)
- All 1727 tests passing ✅

---

## 🔍 Pattern Analysis

### Identified 3 Core Test Patterns

#### Pattern 1: Simple Keyword Generators (100% automatable)
```typescript
// Properties: text-align, word-break, overflow-wrap, font-style, etc.
test("should generate 'keyword'", () => {
  const result = generate({ kind: "property", value: "keyword" });
  expect(result.ok).toBe(true);
  if (result.ok) expect(result.value).toBe("keyword");
});
```

#### Pattern 2: Value-Based Generators (95% automatable)
```typescript
// Properties: font-size, line-height, width, height, etc.
test("should generate length", () => {
  const result = generate({ kind: "property", value: { value: 16, unit: "px" } });
  expect(result.ok).toBe(true);
  if (result.ok) expect(result.value).toBe("16px");
});
```

#### Pattern 3: Simple Keyword Parsers (95% automatable)
```typescript
// Most parsers follow: parse CSS → validate → return IR
test("should parse 'keyword'", () => {
  const result = parse("keyword");
  expect(result.ok).toBe(true);
  if (result.ok) expect(result.value).toEqual({ kind: "property", value: "keyword" });
});
```

---

## 💡 Automation Strategy Designed

### What Can Be Automated (80-90% of simple properties)

✅ **Keyword-only properties** - 100% automatable
- Extract union type from source
- Generate test for each keyword value
- Examples: text-align, word-break, font-style

✅ **Length/percentage properties** - 95% automatable
- Standard test cases: px, em, rem, %, vw, vh
- Examples: font-size, line-height, width, height

✅ **Number properties** - 95% automatable
- Test integers, decimals, boundaries
- Examples: font-weight, z-index, opacity

### What Needs Manual Tests (10-20%)

⚠️ **Complex parsers** with custom logic
- transform (multiple functions)
- gradient (complex syntax)
- shadow (multiple shadows, complex combinations)

---

## 🚀 Recommended Implementation: Option C (Hybrid)

### Design
1. **Templates** for common patterns (3 templates)
2. **Simple script** that fills templates based on heuristics
3. **Manual review** before committing generated tests
4. **Time**: 1 hour to build
5. **ROI**: Recover investment in 2-3 sessions

### Expected Gains
- **Speed**: 3.5%/session → 5-7%/session
- **Consistency**: All tests follow same patterns
- **Time to 90%**: 7-8 sessions → 5-6 sessions

### What It Would Look Like
```bash
# Usage:
./scripts/generate-tests.sh src/generate/layout/width.ts

# Output:
# - Reads TypeScript source
# - Detects pattern (keyword | length-percentage | number)
# - Generates test file from template
# - Opens in editor for review
```

---

## 📁 Directory Started

Created skeleton:
```
scripts/test-generator/
  templates/          # Test templates (to be created)
  generate-tests.sh   # Generator script (to be created)
```

---

## 🎯 Next Steps for Next Agent

### Immediate (Next Session)

**Option A: Build the Generator** (recommended if wanting acceleration)
1. Create 3 test templates (keyword, value-based, parser)
2. Build simple Bash/Node script to:
   - Read source file
   - Detect pattern (grep/regex for type hints)
   - Fill template with property name
   - Write to test directory
3. Test on 3-5 properties
4. Document usage in README

**Expected time**: 1 hour  
**Expected gain**: Tool that speeds up future sessions by 40-50%

**Option B: Continue Manual Testing** (if wanting immediate coverage gains)
1. Continue with layout module tests
   - width, height, max-width, max-height
   - margin, padding (shorthand properties)
   - display, position, overflow
2. Target: +5-7% coverage

**Expected time**: 2-3 hours  
**Expected gain**: +5-7% coverage (69-71%)

### Recommendation

**Do Option A first** - The 1-hour investment will pay off immediately and make all future sessions faster. We've proven the patterns work, now let's codify them.

---

## 📊 Coverage Metrics

**Current State**: 64.04% coverage, 1727 tests  
**Target**: 90% coverage  
**Remaining**: +25.96%  
**Estimated Sessions**: 5-6 with automation, 7-8 without

**Trajectory**:
- Manual rate: +3.5%/session
- With automation: +5-7%/session
- Break-even: After 2-3 sessions

---

## 🔗 Related Documents

- **Status**: `.memory/STATUS.md`
- **Roadmap**: `.memory/ROADMAP.md`
- **Property Counter**: `.memory/scripts/count-properties.sh`

---

## ✅ Session Checklist

- [x] Coverage improved: 60.58% → 64.04%
- [x] All tests passing (1727/1727)
- [x] Patterns identified and documented
- [x] Automation strategy designed
- [x] Next steps clearly defined
- [x] No uncommitted changes
- [x] Handover document created

---

**End of Session**  
**Next Agent**: Choose Option A (build automation) or Option B (continue manual)
