# Coverage Improvement Plan

**Date**: 2025-10-29
**Time**: 21:16 UTC
**Goal**: Achieve 100% coverage for properties with parse tests
**Current**: 87.66% lines, 86.35% statements (threshold: 89%)

---

## 📊 Parse Test Coverage Gaps

### Typography Module (7 files with gaps)

| File | Lines | Branches | Funcs | Stmts | Uncovered Lines |
|------|-------|----------|-------|-------|-----------------|
| font-style.ts | 77.77% | 58.33% | 100% | 77.77% | 39,50,68-70 |
| text-align.ts | 77.77% | 58.33% | 100% | 77.77% | 31,42,60-62 |
| text-transform.ts | 77.77% | 58.33% | 100% | 77.77% | 32,43,61-63 |
| overflow-wrap.ts | 83.33% | 66.66% | 100% | 83.33% | 32,43,63 |
| word-break.ts | 83.33% | 66.66% | 100% | 83.33% | 32,43,63 |
| font-family.ts | 95.83% | 85% | 100% | 95.83% | 39 |
| font-size.ts | 92.59% | 85% | 100% | 92.59% | 40,51 |
| font-weight.ts | 91.3% | 83.33% | 100% | 91.3% | 39,50 |
| letter-spacing.ts | 90% | 78.57% | 100% | 90% | 40,51 |
| line-height.ts | 91.3% | 81.25% | 100% | 91.3% | 40,51 |
| vertical-align.ts | 80.95% | 64.28% | 100% | 80.95% | 40,51,77-79 |

### Visual Module (3 files with gaps)

| File | Lines | Branches | Funcs | Stmts | Uncovered Lines |
|------|-------|----------|-------|-------|-----------------|
| background-blend-mode.ts | 87.5% | 71.42% | 100% | 87.5% | 34,59 |
| mix-blend-mode.ts | 87.5% | 71.42% | 100% | 87.5% | 34,59 |
| opacity.ts | 83.33% | 66.66% | 100% | 83.33% | 39,50,71 |
| visibility.ts | 86.66% | 71.42% | 100% | 86.66% | 40,65 |

---

## 🎯 Missing Test Cases Pattern

All gaps follow similar patterns - uncovered error handling branches:

### Common Uncovered Lines

1. **"Expected Value node"** - Malformed CSS that doesn't parse to Value AST
2. **Empty node check** - Defensive null/undefined check (line ~39-50)
3. **Non-identifier type check** - Numbers, dimensions instead of keywords (line ~60-70)
4. **CSS parse errors** - CSS tree parsing exceptions (catch block)

### Test Cases Needed

For each property config in `scripts/parse-test-generator/configs/`, add:

```typescript
// Invalid type tests (covers non-identifier branches)
{ input: "0", description: "numeric value", category: "invalid-type", expectValid: false },
{ input: "10px", description: "dimension value", category: "invalid-type", expectValid: false },

// Multiple values test (covers single value check)
{ input: "value1 value2", description: "multiple values", category: "invalid-multiple", expectValid: false },
```

---

## 📋 Files Requiring Config Updates

### High Priority (< 85% coverage)

**Typography:**
- ✅ `scripts/parse-test-generator/configs/typography/font-style.ts` (77.77%)
- ✅ `scripts/parse-test-generator/configs/typography/text-align.ts` (77.77%)
- ✅ `scripts/parse-test-generator/configs/typography/text-transform.ts` (77.77%)
- ✅ `scripts/parse-test-generator/configs/typography/overflow-wrap.ts` (83.33%)
- ✅ `scripts/parse-test-generator/configs/typography/word-break.ts` (83.33%)
- ✅ `scripts/parse-test-generator/configs/typography/vertical-align.ts` (80.95%)

**Visual:**
- ✅ `scripts/parse-test-generator/configs/visual/opacity.ts` (83.33%)

### Medium Priority (85-95% coverage)

**Typography:**
- ✅ `scripts/parse-test-generator/configs/typography/font-family.ts` (95.83%)
- ✅ `scripts/parse-test-generator/configs/typography/font-size.ts` (92.59%)
- ✅ `scripts/parse-test-generator/configs/typography/font-weight.ts` (91.3%)
- ✅ `scripts/parse-test-generator/configs/typography/letter-spacing.ts` (90%)
- ✅ `scripts/parse-test-generator/configs/typography/line-height.ts` (91.3%)

**Visual:**
- ✅ `scripts/parse-test-generator/configs/visual/background-blend-mode.ts` (87.5%)
- ✅ `scripts/parse-test-generator/configs/visual/mix-blend-mode.ts` (87.5%)
- ✅ `scripts/parse-test-generator/configs/visual/visibility.ts` (86.66%)

---

## 🔄 Execution Plan

### Step 1: Update Configs (15-20 min)

For each config file, add missing test cases:

```bash
# Example for font-style.ts
# Add to cases array:
{ input: "10px", description: "dimension value", category: "invalid-type", expectValid: false },
{ input: "0", description: "numeric value", category: "invalid-type", expectValid: false },
{ input: "normal italic", description: "multiple values", category: "invalid-multiple", expectValid: false },
```

### Step 2: Regenerate Tests (2-3 min)

```bash
# Remove old results
rm -rf scripts/parse-test-generator/results

# Regenerate all parse tests
find scripts/parse-test-generator/configs -type f -name "*.ts" | while read config; do
  relative_path="${config#scripts/parse-test-generator/configs/}"
  module_property="${relative_path%.ts}"
  tsx scripts/generate-parse-tests.ts "$module_property"
done
```

### Step 3: Verify Coverage (2-3 min)

```bash
just coverage
# Target: All parse files at 100% coverage
# Expected: Overall coverage > 89% threshold
```

### Step 4: Commit (1-2 min)

```bash
git add scripts/parse-test-generator/configs/ \
  scripts/parse-test-generator/results/ \
  src/parse/
git commit -m "test(coverage): add missing test cases for 100% parse coverage"
```

---

## 📈 Expected Impact

**Before:**
- Lines: 87.66%
- Statements: 86.35%
- ❌ Below 89% threshold

**After:**
- Lines: ~92-95% (targeting 100% for parse files)
- Statements: ~91-94%
- ✅ Above 89% threshold

**New Tests:** ~40-50 additional test cases across 16 properties

---

## 🐛 Known Issues

None - all parse tests currently passing (3,990 tests)

---

## 📚 Related Files

- `.memory/HANDOVER.md` - Current session handover
- `scripts/parse-test-generator/configs/` - Test configs to update
- `docs.internal/plans/dual-test-expansion-plan.md` - Overall testing strategy

---

**Status**: Ready to execute
**Estimated Time**: 20-30 minutes total
**Risk**: Low (automated test generation)
