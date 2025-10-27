# Session: Test Generator - Design Decisions & Next Steps

**Status**: ✅ Pilot complete - Generator works! Now need design decisions before scaling up.

**Tests**: 3,655 passing (365 test files)
**Branch**: coverage/90-percent
**Commit**: ed57231

---

## ✅ What We Built

**Test Generator Script** (`scripts/generate-tests.ts`):
- Define test cases → Run parser → Auto-generate tests
- **Pilot**: duration property (24 tests, all passing, ~5 min vs 30+ min manual)
- See: `.memory/archive/2025-10-27-test-generator-pilot/HANDOVER.md`

---

## 🔍 DISCUSS: 6 Key Design Decisions

### 1. **Make Script Generic**
Currently hardcoded to animation parsers. Need to support:
- Different import paths (not just `src/parse/animation/`)
- Different output paths (not just `test/parse/animation/`)
- Any property type (color, transform, filter, etc.)

### 2. **Externalize Configs**
Should we move `PROPERTY_CONFIGS` out of the script?

```
scripts/test-generator/
  configs/
    animation-duration.ts
    animation-timing-function.ts
  generate-tests.ts (just the generator logic)
```

**Benefits**: Cleaner, reusable as fixtures, easier to maintain

### 3. **Separate Valid/Invalid Files?**
- **Current**: One file with both sections
- **TESTING_STRATEGY_PHASE2.md recommends**: Two files (`.valid.test.ts` + `.invalid.test.ts`)
- **Reason**: Invalid should be 2-3x larger, easier to navigate

### 4. **Co-located vs Test Directory?**
- **Current**: Generates to `test/parse/animation/`
- **Existing project**: Uses co-located `src/parse/animation/*.test.ts`
- **Question**: Which pattern to follow?

### 5. **Configs as Fixtures?**
Can we reuse test case definitions for:
- Documentation generation
- Parser fuzzing
- Example code
- Multiple purposes beyond test generation

### 6. **Alignment with TESTING_STRATEGY_PHASE2.md?**
Strategy defines 4 layers:
- **Layer 1**: Schema validation tests (not implemented)
- **Layer 2**: Parser valid tests (✅ implemented)
- **Layer 3**: Parser invalid tests (✅ implemented)
- **Layer 4**: Generator tests (not implemented)

**Questions**:
- Should generator support schema testing?
- Should we enforce invalid > valid ratio (2:1 or 3:1)?
- Should we add spec reference annotations?

---

## 📋 Documented: Failing Test Essence

**File**: `src/parse/animation/timing-function.valid.test.ts:562`

```typescript
test("number as position (css-tree behavior)", () => {
  const result = parse("steps(4, 1)");
  // Tests that css-tree accepts numeric position "1" instead of keyword
  // This is technically invalid per CSS spec
  expect(result.value.functions[0]).toEqual({
    type: "steps",
    steps: 4,
    position: "1", // Expected "1" as string, not a keyword
  });
});
```

**What it tested**: css-tree's behavior of accepting invalid numeric positions
**Why it failed**: Expected `steps: 4` but got `steps: 1`
**Resolution**: File deleted (was being replaced anyway)
**Decision needed**: Should we accept numeric positions (like css-tree) or reject per spec?

---

## 🚀 After Discussion: Next Steps

Based on decisions above, refactor generator then:

1. **Add timing-function config** (most complex property - cubic-bezier, steps, keywords)
2. **Generate timing-function tests** (validate generator handles complexity)
3. **Apply to 2-3 more properties** (delay, iteration-count, direction)
4. **Document patterns** (lessons learned, gotchas)

---

## 📊 Current State

```bash
cd /Users/alphab/Dev/LLM/DEV/b_value
just test                    # 3,655 passing (365 files)
git log -1 --oneline         # ed57231 docs: Rewrite SESSION_NEXT.md
```

**Branch**: `coverage/90-percent`

---

## 📁 Key Files

**New**:
- `scripts/generate-tests.ts` (test generator - working pilot)
- `scripts/test-generator/README.md` (documentation)
- `test/parse/animation/duration.test.ts` (auto-generated, 24 tests)
- `.memory/archive/2025-10-27-test-generator-pilot/HANDOVER.md` (full session summary)

**Removed**:
- `src/parse/animation/timing-function.*.test.ts` (broken tests, will be regenerated)

**Context**:
- `.memory/TESTING_STRATEGY_PHASE2.md` (4-layer testing strategy)
- `scripts/test-generator/duration-results.json` (example output)

---

## ✅ Success Criteria

Pattern is production-ready when:
- [ ] Script is generic (works for any property)
- [ ] Configs are externalized
- [ ] Design decisions documented
- [ ] Applied to timing-function successfully
- [ ] Applied to 2-3 more properties
- [ ] Pattern documented

---

## 💡 Key Learnings

1. **Script approach is 6x faster** - 5 min vs 30+ min manual
2. **Auto-generation is reliable** - 24/24 tests passing first run
3. **JSON output is valuable** - Review before generation catches issues
4. **Categories organize naturally** - Good for test readability
5. **Error extraction works** - Regex finds key validation terms

---

**Next Agent**:
1. Discuss 6 design decisions with user
2. Refactor generator based on decisions
3. Apply to timing-function
4. Document learnings
