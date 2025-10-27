# Session: Generate Testing - The Inverse Challenge

**Status**: 🚀 **NEW DIRECTION** - Pivot to generate testing approved!

**Tests**: 3,709 passing (all animation parse tests complete)
**Branch**: coverage/90-percent
**Latest Commit**: e61010c

---

## 🎯 Mission: Prove Parse ↔ Generate Symmetry

Animation package parse tests are **100% complete**. 
Now let's prove the full cycle with generate tests!

### Why This Matters

**Current**: We validate `CSS → IR` (parse)
**Missing**: We don't validate `IR → CSS` (generate)
**Goal**: Validate **both directions + roundtrip**

```typescript
// Parse test: CSS → IR
parse("1s") // ✅ tested

// Generate test: IR → CSS  
generate({value:1, unit:"s"}) // ❌ not tested

// Roundtrip: IR → CSS → IR
parse(generate({value:1, unit:"s"})) === input // ❌ not tested
```

---

## 📋 Next Steps

### Step 1: Reorganize (5 mins)
```bash
# Rename parse test generator
mv scripts/generate-tests.ts scripts/generate-parse-tests.ts
mv scripts/test-generator/ scripts/parse-test-generator/

# Create structure for generate tests
mkdir -p scripts/generate-test-generator/configs
mkdir -p scripts/generate-test-generator/templates
```

### Step 2: Design Config Format (15 mins)

**Parse test config** (current):
```typescript
{ 
  input: "1s",           // CSS string
  expectValid: true,
  expectedError: "..."   // for invalid cases
}
```

**Generate test config** (new):
```typescript
{
  input: { value: 1, unit: "s" },  // IR object
  expected: "1s",                   // CSS output
  roundtrip: true,                  // validate parse(generate(IR))
  expectValid: true
}
```

### Step 3: Pilot on duration (30 mins)

Create `scripts/generate-test-generator/configs/duration.ts`:
- Valid IR objects → expected CSS
- Invalid IR objects → expected errors
- Roundtrip cases

Generate tests:
- `src/generate/animation/duration.test.ts`
- `src/generate/animation/duration.failure.test.ts`

### Step 4: Validate & Iterate (20 mins)

Run tests, refine config format, document patterns.

---

## 🔍 Key Questions to Answer

1. **Config format**: What IR structure do we provide?
2. **Expected output**: Exact CSS or normalized CSS?
3. **Roundtrip validation**: How to handle formatting differences?
4. **Error cases**: What makes an IR object invalid for generate?
5. **Normalization**: `1s` vs `1.0s` - are they equivalent?

---

## 📚 Reference Files

**Existing parsers** (for understanding IR):
- `src/parse/animation/duration.ts`
- `src/parse/animation/timing-function.ts`
- etc.

**Existing generators** (to test):
- `src/generate/animation/duration.ts`
- `src/generate/animation/timing-function.ts`
- etc.

**Parse test configs** (for inspiration):
- `scripts/parse-test-generator/configs/duration.ts`
- `scripts/parse-test-generator/configs/timing-function.ts`
- etc.

**Current generator**:
- `scripts/generate-tests.ts` (to be renamed)

---

## 🎓 Expected Learnings

After this session, we'll have:
1. ✅ Generate test config format defined
2. ✅ Generate test generator working
3. ✅ duration generate tests passing
4. ✅ Roundtrip validation proven
5. ✅ Pattern for applying to all 7 animation properties

**Then**: Return to remaining parse properties with **dual-generator approach**
- Generate parse tests
- Generate generate tests  
- Validate roundtrip
- Check off in PROPERTY_COMPLETION_PLAN.md

---

## 🚀 Quick Start Commands

```bash
# 1. Rename existing
just rename-parse-generator  # (create this justfile recipe)

# 2. Check generate functions exist
ls -la src/generate/animation/

# 3. Review IR types
grep -A 10 "AnimationDuration" src/core/types/animation.ts

# 4. Start design
vim scripts/generate-test-generator/configs/duration.ts
```

---

**Next Agent**: Design generate test config format, pilot on duration, prove symmetry! 🎯
