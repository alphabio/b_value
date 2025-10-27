# Phase 2: Comprehensive Testing Strategy

**Created**: 2025-10-27
**Goal**: Test parsers and generators to their limits with full spec coverage and robust failure cases

---

## 🎯 Core Principles

### 1. **Test the Full CSS Spec Surface**
Not just happy paths - cover ALL valid syntax per W3C/MDN specs

### 2. **More Failure Tests Than Success Tests**
For every valid input, there should be 2-3 invalid variations testing:
- Malformed syntax
- Invalid values
- Boundary violations
- Type errors

### 3. **Validate Schema Constraints**
Schemas must be strict and validated with dedicated tests

### 4. **Decompose for Readability**
One test file per property, organized by concern (parse/generate/schema/errors)

---

## 🔍 Problem Analysis: Current State

### Example: `cubicBezierSchema` (src/core/types/animation.ts:190-196)

```typescript
export const cubicBezierSchema = z.object({
  type: z.literal("cubic-bezier"),
  x1: z.number(),
  y1: z.number(),
  x2: z.number(),
  y2: z.number(),
});
```

**Problems:**
- ❌ Accepts `Infinity`, `-Infinity`, `NaN`
- ❌ No range constraints (x values must be 0-1)
- ❌ No tests validating schema rejection
- ❌ Parser might accept malformed syntax: `cubic-bezier(0.1 0.2, 0.3, 0.4)`

**Per CSS Easing Spec:**
- x1, x2 MUST be in range [0, 1]
- y1, y2 can be any number (even negative for bounce effects)
- Must have exactly 4 comma-separated numbers
- No whitespace issues

### Example: `stepsSchema` (src/core/types/animation.ts:215-219)

```typescript
export const stepsSchema = z.object({
  type: z.literal("steps"),
  steps: z.number().positive().int(),
  position: z.enum(Keyword.STEP_POSITION_KEYWORDS).optional(),
});
```

**Better!** Has `.positive().int()` constraints.

**Still Missing Tests:**
- ✅ Rejects 0: `steps(0, end)`
- ✅ Rejects negative: `steps(-5, start)`
- ✅ Rejects float: `steps(3.5, end)`
- ✅ Rejects invalid position: `steps(4, middle)`
- ✅ Accepts missing position: `steps(4)`

---

## 📋 Testing Strategy: 4-Layer Approach

### Layer 1: **Schema Validation Tests**
**File**: `src/core/types/[category].test.ts`
**Focus**: Validate Zod schemas directly

```typescript
describe("cubicBezierSchema", () => {
  describe("valid values", () => {
    test("accepts standard ease curve", () => {
      const result = cubicBezierSchema.safeParse({
        type: "cubic-bezier",
        x1: 0.25, y1: 0.1, x2: 0.25, y2: 1.0
      });
      expect(result.success).toBe(true);
    });

    test("accepts y values outside 0-1 (bounce)", () => {
      const result = cubicBezierSchema.safeParse({
        type: "cubic-bezier",
        x1: 0.5, y1: -0.5, x2: 0.5, y2: 1.5
      });
      expect(result.success).toBe(true);
    });

    test("accepts boundary x values (0 and 1)", () => {
      const result = cubicBezierSchema.safeParse({
        type: "cubic-bezier",
        x1: 0, y1: 0, x2: 1, y2: 1
      });
      expect(result.success).toBe(true);
    });
  });

  describe("invalid values", () => {
    test("rejects x1 > 1", () => {
      const result = cubicBezierSchema.safeParse({
        type: "cubic-bezier",
        x1: 1.5, y1: 0, x2: 0, y2: 1
      });
      expect(result.success).toBe(false);
    });

    test("rejects x1 < 0", () => {
      const result = cubicBezierSchema.safeParse({
        type: "cubic-bezier",
        x1: -0.1, y1: 0, x2: 0, y2: 1
      });
      expect(result.success).toBe(false);
    });

    test("rejects Infinity", () => {
      const result = cubicBezierSchema.safeParse({
        type: "cubic-bezier",
        x1: Infinity, y1: 0, x2: 0, y2: 1
      });
      expect(result.success).toBe(false);
    });

    test("rejects NaN", () => {
      const result = cubicBezierSchema.safeParse({
        type: "cubic-bezier",
        x1: NaN, y1: 0, x2: 0, y2: 1
      });
      expect(result.success).toBe(false);
    });

    test("rejects missing fields", () => {
      const result = cubicBezierSchema.safeParse({
        type: "cubic-bezier",
        x1: 0, y1: 0
      });
      expect(result.success).toBe(false);
    });

    test("rejects wrong type field", () => {
      const result = cubicBezierSchema.safeParse({
        type: "steps",
        x1: 0, y1: 0, x2: 1, y2: 1
      });
      expect(result.success).toBe(false);
    });
  });
});
```

**Test Ratio**: ~50% valid, ~50% invalid

---

### Layer 2: **Parser Tests - Valid Syntax**
**File**: `src/parse/animation/timing-function.valid.test.ts`
**Focus**: Full spec coverage of valid CSS

```typescript
describe("parse/animation/timing-function - valid syntax", () => {
  describe("keywords", () => {
    test("ease", () => {
      const result = parse("ease");
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value.functions).toEqual(["ease"]);
    });

    test("linear", () => { /* ... */ });
    test("ease-in", () => { /* ... */ });
    test("ease-out", () => { /* ... */ });
    test("ease-in-out", () => { /* ... */ });
    test("step-start", () => { /* ... */ });
    test("step-end", () => { /* ... */ });
  });

  describe("cubic-bezier()", () => {
    test("standard values", () => {
      const result = parse("cubic-bezier(0.25, 0.1, 0.25, 1.0)");
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value.functions[0]).toEqual({
        type: "cubic-bezier",
        x1: 0.25, y1: 0.1, x2: 0.25, y2: 1.0
      });
    });

    test("negative y values (bounce)", () => {
      const result = parse("cubic-bezier(0.5, -0.5, 0.5, 1.5)");
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value.functions[0].y1).toBe(-0.5);
      expect(result.value.functions[0].y2).toBe(1.5);
    });

    test("boundary x values (0, 1)", () => {
      const result = parse("cubic-bezier(0, 0, 1, 1)");
      expect(result.ok).toBe(true);
    });

    test("integer values without decimal", () => {
      const result = parse("cubic-bezier(0, 0, 1, 1)");
      expect(result.ok).toBe(true);
    });

    test("whitespace variations", () => {
      const result = parse("cubic-bezier( 0.1 , 0.2 , 0.3 , 0.4 )");
      expect(result.ok).toBe(true);
    });
  });

  describe("steps()", () => {
    test("steps with end position", () => {
      const result = parse("steps(4, end)");
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value.functions[0]).toEqual({
        type: "steps",
        steps: 4,
        position: "end"
      });
    });

    test("steps with start position", () => { /* ... */ });
    test("steps with jump-start", () => { /* ... */ });
    test("steps with jump-end", () => { /* ... */ });
    test("steps with jump-none", () => { /* ... */ });
    test("steps with jump-both", () => { /* ... */ });

    test("steps without position (defaults to end)", () => {
      const result = parse("steps(5)");
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value.functions[0].position).toBeUndefined();
    });

    test("single step", () => {
      const result = parse("steps(1)");
      expect(result.ok).toBe(true);
    });
  });

  describe("linear()", () => {
    // TODO: If linear() is implemented
    test.skip("linear with stops", () => {});
  });

  describe("comma-separated lists", () => {
    test("two functions", () => {
      const result = parse("ease, ease-in-out");
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value.functions).toHaveLength(2);
    });

    test("mixed keywords and functions", () => {
      const result = parse("ease, cubic-bezier(0.1, 0.2, 0.3, 0.4), steps(3, start)");
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value.functions).toHaveLength(3);
    });
  });
});
```

**Spec References**: Link to MDN/W3C for each group

---

### Layer 3: **Parser Tests - Invalid Syntax**
**File**: `src/parse/animation/timing-function.invalid.test.ts`
**Focus**: Comprehensive failure testing

```typescript
describe("parse/animation/timing-function - invalid syntax", () => {
  describe("cubic-bezier() errors", () => {
    test("x1 out of range (> 1)", () => {
      const result = parse("cubic-bezier(1.5, 0, 0, 1)");
      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.issues[0]?.code).toBe("parse-error");
      expect(result.issues[0]?.message).toContain("x1");
      expect(result.issues[0]?.message).toContain("0");
      expect(result.issues[0]?.message).toContain("1");
    });

    test("x1 out of range (< 0)", () => {
      const result = parse("cubic-bezier(-0.1, 0, 0, 1)");
      expect(result.ok).toBe(false);
    });

    test("x2 out of range", () => {
      const result = parse("cubic-bezier(0, 0, 1.1, 1)");
      expect(result.ok).toBe(false);
    });

    test("too few arguments (3)", () => {
      const result = parse("cubic-bezier(0.1, 0.2, 0.3)");
      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.issues[0]?.message).toContain("4 values");
    });

    test("too many arguments (5)", () => {
      const result = parse("cubic-bezier(0.1, 0.2, 0.3, 0.4, 0.5)");
      expect(result.ok).toBe(false);
    });

    test("missing commas", () => {
      const result = parse("cubic-bezier(0.1 0.2 0.3 0.4)");
      expect(result.ok).toBe(false);
    });

    test("invalid number format", () => {
      const result = parse("cubic-bezier(0.1, abc, 0.3, 0.4)");
      expect(result.ok).toBe(false);
    });

    test("Infinity value", () => {
      const result = parse("cubic-bezier(Infinity, 0, 0, 1)");
      expect(result.ok).toBe(false);
    });

    test("NaN value", () => {
      const result = parse("cubic-bezier(NaN, 0, 0, 1)");
      expect(result.ok).toBe(false);
    });

    test("missing closing paren", () => {
      const result = parse("cubic-bezier(0, 0, 1, 1");
      expect(result.ok).toBe(false);
    });

    test("empty function call", () => {
      const result = parse("cubic-bezier()");
      expect(result.ok).toBe(false);
    });
  });

  describe("steps() errors", () => {
    test("zero steps", () => {
      const result = parse("steps(0)");
      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.issues[0]?.message).toContain("positive");
    });

    test("negative steps", () => {
      const result = parse("steps(-5)");
      expect(result.ok).toBe(false);
    });

    test("float steps", () => {
      const result = parse("steps(3.5)");
      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.issues[0]?.message).toContain("integer");
    });

    test("invalid position keyword", () => {
      const result = parse("steps(4, middle)");
      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.issues[0]?.suggestion).toContain("start");
      expect(result.issues[0]?.suggestion).toContain("end");
    });

    test("too many arguments", () => {
      const result = parse("steps(4, end, extra)");
      expect(result.ok).toBe(false);
    });

    test("missing steps argument", () => {
      const result = parse("steps()");
      expect(result.ok).toBe(false);
    });
  });

  describe("keyword errors", () => {
    test("invalid keyword", () => {
      const result = parse("ease-in-and-out");
      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.issues[0]?.suggestion).toContain("ease-in-out");
    });

    test("typo in keyword", () => {
      const result = parse("esae");
      expect(result.ok).toBe(false);
    });
  });

  describe("general errors", () => {
    test("empty string", () => {
      const result = parse("");
      expect(result.ok).toBe(false);
    });

    test("whitespace only", () => {
      const result = parse("   ");
      expect(result.ok).toBe(false);
    });

    test("unknown function", () => {
      const result = parse("bezier(0.1, 0.2, 0.3, 0.4)");
      expect(result.ok).toBe(false);
    });

    test("malformed list (trailing comma)", () => {
      const result = parse("ease,");
      expect(result.ok).toBe(false);
    });

    test("malformed list (leading comma)", () => {
      const result = parse(",ease");
      expect(result.ok).toBe(false);
    });

    test("malformed list (double comma)", () => {
      const result = parse("ease,,linear");
      expect(result.ok).toBe(false);
    });
  });
});
```

**Test Ratio**: This file should be 2-3x larger than the valid test file!

---

### Layer 4: **Generator Tests**
**File**: `src/generate/animation/timing-function.test.ts`
**Focus**: Validate IR → CSS generation

```typescript
describe("generate/animation/timing-function", () => {
  describe("valid IR", () => {
    test("keyword", () => {
      const result = generate({
        kind: "animation-timing-function",
        functions: ["ease-in-out"]
      });
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value).toBe("ease-in-out");
    });

    test("cubic-bezier", () => {
      const result = generate({
        kind: "animation-timing-function",
        functions: [{
          type: "cubic-bezier",
          x1: 0.25, y1: 0.1, x2: 0.25, y2: 1.0
        }]
      });
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value).toBe("cubic-bezier(0.25, 0.1, 0.25, 1)");
    });

    test("multiple functions", () => {
      const result = generate({
        kind: "animation-timing-function",
        functions: ["ease", "linear"]
      });
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value).toBe("ease, linear");
    });
  });

  describe("invalid IR", () => {
    test("rejects invalid x1 > 1", () => {
      const result = generate({
        kind: "animation-timing-function",
        functions: [{
          type: "cubic-bezier",
          x1: 1.5, y1: 0, x2: 0, y2: 1
        }]
      });
      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.issues[0]?.code).toBe("validation-error");
    });

    test("rejects NaN", () => {
      const result = generate({
        kind: "animation-timing-function",
        functions: [{
          type: "cubic-bezier",
          x1: NaN, y1: 0, x2: 0, y2: 1
        }]
      });
      expect(result.ok).toBe(false);
    });

    test("rejects empty functions array", () => {
      const result = generate({
        kind: "animation-timing-function",
        functions: []
      });
      expect(result.ok).toBe(false);
    });
  });
});
```

---

## 📁 File Organization: Decomposed Structure

### Before (Monolithic)

```
src/parse/animation/
  animation.test.ts (154 lines - all properties mixed)
```

### After (Decomposed)

```
src/parse/animation/
  timing-function/
    timing-function.ts (parser implementation)
    timing-function.valid.test.ts (~200 lines - valid syntax)
    timing-function.invalid.test.ts (~400 lines - error cases)
  duration/
    duration.ts
    duration.valid.test.ts
    duration.invalid.test.ts
  delay/
    delay.ts
    delay.valid.test.ts
    delay.invalid.test.ts
  iteration-count/
    iteration-count.ts
    iteration-count.valid.test.ts
    iteration-count.invalid.test.ts
  [etc...]

src/generate/animation/
  timing-function/
    timing-function.ts
    timing-function.test.ts
  [etc...]

src/core/types/
  animation.test.ts (schema validation tests)
```

**Alternative** (if directories feel heavy):

```
src/parse/animation/
  timing-function.ts
  timing-function.valid.test.ts
  timing-function.invalid.test.ts
  duration.ts
  duration.valid.test.ts
  duration.invalid.test.ts
  [etc...]
```

---

## 🎯 Implementation Plan

### Phase 2.1: Pilot (Establish Pattern)
**Goal**: Create one complete example to establish the pattern
**Target**: `animation-timing-function` (most complex)

**Steps**:
1. Fix `cubicBezierSchema` to add range constraints
2. Create `src/core/types/animation.test.ts` with schema tests
3. Create `timing-function.valid.test.ts` with full spec coverage
4. Create `timing-function.invalid.test.ts` with comprehensive errors
5. Update generator tests
6. Document the pattern

**Estimated**: 2-3 hours, ~100-150 tests for this one property

---

### Phase 2.2: Rollout
**Goal**: Apply pattern to all properties systematically
**Priority Order**:
1. **Animation** properties (6 properties) - Complex, already started
2. **Color** functions (rgb, hsl, oklch, etc.) - High value
3. **Transform** functions - Common bugs
4. **Filter** functions - Good failure test candidates
5. **Gradient** functions - Complex parsing
6. **Layout** properties - Simpler, good for momentum
7. Remaining properties

**Estimated**: 10-15 properties per session, 5-10 sessions total

---

## ✅ Success Criteria

For each property, we need:

### Schema Tests
- [ ] All valid value types accepted
- [ ] All invalid value types rejected
- [ ] Boundary values tested (0, -1, max, min)
- [ ] Special values tested (NaN, Infinity, null, undefined)
- [ ] Type constraints validated (int, positive, nonnegative)
- [ ] Range constraints validated (min, max)

### Parser Valid Tests
- [ ] All CSS syntax variations from spec
- [ ] All keywords from spec
- [ ] All function forms from spec
- [ ] Whitespace variations
- [ ] Comma-separated lists (if applicable)
- [ ] Boundary values (per spec)
- [ ] Edge cases (empty values, single values, max values)

### Parser Invalid Tests
- [ ] Wrong keywords
- [ ] Malformed function syntax
- [ ] Out-of-range values
- [ ] Wrong number of arguments
- [ ] Wrong types
- [ ] Missing required values
- [ ] Extra unexpected values
- [ ] Empty/whitespace
- [ ] Invalid separators

### Generator Tests
- [ ] Valid IR generates correct CSS
- [ ] Invalid IR is rejected with clear error
- [ ] Normalization is consistent
- [ ] Edge cases handled

### Error Quality
- [ ] Error messages are clear and actionable
- [ ] Suggestions provided where helpful
- [ ] Error codes are specific
- [ ] Location information included (if applicable)

---

## 📊 Expected Impact

### Coverage
- **Current**: 89.49%
- **After Phase 2**: 92-95% (comprehensive error path coverage)

### Test Count
- **Current**: 3,576 tests
- **After Phase 2**: ~6,000-8,000 tests (2-3x increase, mostly error cases)

### Bug Discovery
- Expect to find 10-20 bugs in schema constraints
- Expect to find 20-30 bugs in parser edge cases
- Expect to find 5-10 bugs in generator validation

### Documentation Value
- Tests become spec documentation
- Tests demonstrate all valid syntax
- Tests demonstrate common mistakes

---

## 💡 Key Insights

1. **Schemas are the foundation** - Fix them first
2. **Spec compliance matters** - Link every test to MDN/W3C
3. **Errors are features** - Good error messages require tests
4. **Decompose ruthlessly** - One property = multiple test files
5. **Failure tests > success tests** - 2:1 or 3:1 ratio
6. **Incremental is OK** - Establish pattern, then rollout

---

**Next Steps**:
1. Review and approve this strategy
2. Start Phase 2.1 pilot with `animation-timing-function`
3. Document the pattern
4. Roll out systematically

**Questions to Answer**:
- File organization: directories vs flat?
- Naming: `.valid.test.ts` / `.invalid.test.ts` or `.spec.test.ts` / `.error.test.ts`?
- Should we backfill existing properties or only do new ones?
- Priority order: agree on which properties first?
