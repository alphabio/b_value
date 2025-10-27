# Session: Phase 2.1 - Comprehensive Testing Pilot

**Current Status**: 89.49% coverage, 3,576 tests passing ✅  
**Phase 1**: ✅ COMPLETE (100/100 round-trip tests)  
**Phase 2**: 🔥 **CRITICAL PIVOT** - Comprehensive CSS Spec Testing  

---

## ⚠️ Critical Discovery: Testing Quality Crisis

**User identified fundamental problems**:
- ❌ We do NOT support CSS shorthand properties (that's `b_short` library's job)
- ❌ Current tests barely cover CSS spec surface area  
- ❌ We do a VERY poor job testing failures (should have MORE failure tests than success tests)
- ❌ Current test organization is monolithic and hard to maintain
- ❌ Schema constraints are too loose (e.g., `cubicBezierSchema` accepts NaN, Infinity, values > 1)

**Example**: `cubicBezierSchema` (src/core/types/animation.ts:190-196)
```typescript
export const cubicBezierSchema = z.object({
  type: z.literal("cubic-bezier"),
  x1: z.number(),  // ❌ TOO LOOSE
  y1: z.number(),
  x2: z.number(),
  y2: z.number(),
});
```

**Per CSS Easing Spec**:
- x1, x2 MUST be in [0, 1] range
- y1, y2 can be any number
- Should reject NaN, Infinity

---

## 🎯 Phase 2 Mission: Full CSS Spec Coverage + Robust Failure Testing

**Goal**: Test parsers/generators to their limits with 4-layer comprehensive testing  
**Target**: ~100-150 tests for ONE property (pilot), then systematic rollout  
**Focus**: Schema validation, full spec coverage, MORE failure tests than success tests  

### Core Principles
1. **Test the Full CSS Spec Surface** - ALL valid syntax per W3C/MDN
2. **More Failure Tests Than Success Tests** - 2:1 or 3:1 ratio
3. **Validate Schema Constraints** - Zod schemas must be strict
4. **Decompose for Readability** - One property = multiple focused test files

---

## 📋 4-Layer Testing Approach

### Layer 1: Schema Validation Tests
**File**: `src/core/types/animation.test.ts`  
**Focus**: Test Zod schemas directly with `.safeParse()`

```typescript
describe("cubicBezierSchema", () => {
  test("accepts valid values", () => {
    const result = cubicBezierSchema.safeParse({
      type: "cubic-bezier",
      x1: 0.25, y1: 0.1, x2: 0.25, y2: 1.0
    });
    expect(result.success).toBe(true);
  });

  test("rejects x1 > 1", () => {
    const result = cubicBezierSchema.safeParse({
      type: "cubic-bezier",
      x1: 1.5, y1: 0, x2: 0, y2: 1
    });
    expect(result.success).toBe(false);
  });

  test("rejects NaN", () => { /* ... */ });
  test("rejects Infinity", () => { /* ... */ });
});
```

### Layer 2: Parser Valid Tests
**File**: `src/parse/animation/timing-function.valid.test.ts`  
**Focus**: ALL CSS syntax variations from W3C/MDN spec

```typescript
describe("timing-function - valid syntax", () => {
  test("ease", () => { /* ... */ });
  test("linear", () => { /* ... */ });
  test("cubic-bezier(0.25, 0.1, 0.25, 1.0)", () => { /* ... */ });
  test("cubic-bezier with negative y (bounce)", () => { /* ... */ });
  test("steps(4, end)", () => { /* ... */ });
  test("steps(1)", () => { /* ... */ });
  test("whitespace variations", () => { /* ... */ });
  test("comma-separated list", () => { /* ... */ });
});
```

**~50 tests** covering all valid syntax

### Layer 3: Parser Invalid Tests ⚡ MOST IMPORTANT
**File**: `src/parse/animation/timing-function.invalid.test.ts`  
**Focus**: Comprehensive error testing - **THIS FILE SHOULD BE 2-3X LARGER THAN VALID TESTS**

```typescript
describe("timing-function - invalid syntax", () => {
  // cubic-bezier errors
  test("x1 out of range (> 1)", () => { /* ... */ });
  test("x1 out of range (< 0)", () => { /* ... */ });
  test("too few arguments (3)", () => { /* ... */ });
  test("too many arguments (5)", () => { /* ... */ });
  test("missing commas", () => { /* ... */ });
  test("invalid number format", () => { /* ... */ });
  test("Infinity value", () => { /* ... */ });
  test("NaN value", () => { /* ... */ });
  test("missing closing paren", () => { /* ... */ });
  test("empty function call", () => { /* ... */ });

  // steps errors
  test("zero steps", () => { /* ... */ });
  test("negative steps", () => { /* ... */ });
  test("float steps", () => { /* ... */ });
  test("invalid position keyword", () => { /* ... */ });

  // general errors
  test("empty string", () => { /* ... */ });
  test("whitespace only", () => { /* ... */ });
  test("unknown function", () => { /* ... */ });
  test("trailing comma", () => { /* ... */ });
});
```

**~100-150 tests** covering all failure paths

### Layer 4: Generator Tests
**File**: `src/generate/animation/timing-function.test.ts`  
**Focus**: Valid IR → CSS, invalid IR rejection

```typescript
describe("generate timing-function", () => {
  test("valid IR generates CSS", () => { /* ... */ });
  test("rejects invalid x1 > 1", () => { /* ... */ });
  test("rejects NaN", () => { /* ... */ });
});
```

---

## 🎯 Phase 2.1: Pilot Implementation (NEXT SESSION)

**Goal**: Establish the pattern with ONE complete example  
**Target**: `animation-timing-function` (most complex property)  
**Estimated**: 2-3 hours, ~100-150 tests total

### Steps

1. **Fix Schema** (5 min)
   - Update `cubicBezierSchema` to add range constraints: `x1: z.number().min(0).max(1)`
   - Update `stepsSchema` if needed

2. **Create Schema Tests** (20 min)
   - Create `src/core/types/animation.test.ts`
   - ~20 tests validating all schemas (cubicBezier, steps, linear)

3. **Create Valid Parser Tests** (30 min)
   - Create `src/parse/animation/timing-function.valid.test.ts`
   - ~50 tests covering all valid CSS syntax from spec

4. **Create Invalid Parser Tests** (60 min) ⚡ BIGGEST EFFORT
   - Create `src/parse/animation/timing-function.invalid.test.ts`
   - ~100-150 tests covering all error cases
   - Validate error messages are clear

5. **Update Generator Tests** (20 min)
   - Update `src/generate/animation/timing-function.test.ts`
   - Add validation tests

6. **Document Pattern** (15 min)
   - Create handover in `.memory/archive/2025-10-27-phase2-pilot/`
   - Document the 4-layer pattern for future properties

### File Organization Decision Needed

**Option A** (directories):
```
src/parse/animation/
  timing-function/
    timing-function.ts
    timing-function.valid.test.ts
    timing-function.invalid.test.ts
```

**Option B** (flat):
```
src/parse/animation/
  timing-function.ts
  timing-function.valid.test.ts
  timing-function.invalid.test.ts
```

---

## 📊 Expected Impact After Phase 2.1 Pilot

- **Tests**: 3,576 → ~3,700 (+100-150 for one property)
- **Coverage**: 89.49% → likely small increase (error paths covered)
- **Bugs Found**: Expect 3-5 schema/parser bugs in this one property
- **Pattern Established**: Template for remaining 60+ properties

---

## 🚀 Phase 2.2: Systematic Rollout (FUTURE SESSIONS)

After pilot, apply pattern to all properties in priority order:

1. **Animation** (6 properties: timing-function ✅, duration, delay, iteration-count, direction, fill-mode)
2. **Color** functions (rgb, hsl, oklch, hwb, lab, lch)
3. **Transform** functions (translate, rotate, scale, skew, matrix)
4. **Filter** functions (blur, brightness, contrast, etc.)
5. **Gradient** functions (linear-gradient, radial-gradient, conic-gradient)
6. **Layout** properties (width, height, margin, padding, etc.)
7. Remaining properties

**Estimated**: 10-15 properties per session, 5-10 sessions total

---

## ✅ Phase 2.1 Pilot Success Criteria

- [ ] `cubicBezierSchema` fixed with range constraints
- [ ] `src/core/types/animation.test.ts` created (~20 tests)
- [ ] `timing-function.valid.test.ts` created (~50 tests)
- [ ] `timing-function.invalid.test.ts` created (~100-150 tests) ⚡ LARGEST
- [ ] Generator tests updated with validation
- [ ] All tests passing (no regressions)
- [ ] 3-5 bugs discovered and fixed
- [ ] Pattern documented in handover
- [ ] File organization decided for rollout

---

## 📚 Key Documents

**Read these**:
1. **`.memory/TESTING_STRATEGY_PHASE2.md`** - Full comprehensive strategy (~700 lines) ⚡ READ THIS
2. **`.memory/archive/2025-10-27-roundtrip-phase1/HANDOVER.md`** - Phase 1 completion summary
3. **CSS Easing Spec**: https://www.w3.org/TR/css-easing-1/
4. **MDN timing-function**: https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function

---

## ❓ Open Questions for User

1. **File Organization**: Directory structure (Option A) or flat (Option B)?
2. **Naming Convention**: `.valid.test.ts` / `.invalid.test.ts` OR `.spec.test.ts` / `.error.test.ts`?
3. **Scope**: Backfill ALL existing properties or only prioritize high-value ones?
4. **Start Now**: Begin Phase 2.1 pilot with `animation-timing-function` immediately?

---

## 💡 Key Insights from User

- **"This is going to be tedious but it has to be done"** - No shortcuts
- **Shorthand is NOT our job** - That's `b_short` library
- **Quality over quantity** - Tests should be living spec documentation
- **Error tests are critical** - We should have MORE failure tests than success tests
- **Schema constraints matter** - Loose schemas lead to silent bugs

---

## 🎯 Current State

```bash
cd /Users/alphab/Dev/LLM/DEV/b_value
just test                    # 3,576 tests passing
git status                   # Clean working directory
git branch --show-current    # coverage/90-percent
```

**Ready to start Phase 2.1 pilot!**

---

**Last Updated**: 2025-10-27 (Context updated after running out of space)  
**Next Agent**: Start Phase 2.1 pilot or discuss open questions  
**Status**: 🟢 Strategy approved, ready to implement  
**Previous Sessions**: 
- `.memory/archive/2025-10-27-roundtrip-phase1/HANDOVER.md` (Phase 1 complete)
- `.memory/TESTING_STRATEGY_PHASE2.md` (Comprehensive strategy document)
