# Test Generator v2.0

**Auto-generate comprehensive test files from test case definitions**

## 🎯 Purpose

Replace tedious "write test → run → see error → fix → repeat" cycle with:
1. Define test cases in config files
2. Run & validate all at once
3. **Detect issues** (mismatches between expected and actual)
4. Auto-generate complete test file

## 📦 Usage

```bash
# Generate tests from a config
tsx scripts/generate-tests.ts duration

# Output:
# - scripts/test-generator/duration-results.json (raw results)
# - src/parse/animation/duration.test.ts (co-located test file)
# - scripts/test-generator/duration-ISSUES.md (if any issues found)
```

## ✨ New in v2.0

### 1. **External Configs**
Test cases are now in separate config files:

```
scripts/test-generator/configs/
  duration.ts       ← Test case definitions
  timing-function.ts
  [more to come]
```

### 2. **Issue Detection**
Script compares actual parser behavior with expected:
- ✅ No issues: Generates tests
- ⚠️  Issues found: Creates `*-ISSUES.md` + exits with code 1

Example issue report:

```markdown
# Issues Found: duration

❌ "steps(0)" - zero steps
   Expected: ERROR (ok: false)
   Actual: VALID - {...}
```

**Purpose**: Catch schema issues, parser bugs, and mismatches BEFORE generating tests.

### 3. **Spec Reference Validation**
Automatically extracts and validates spec refs from source files:

```typescript
// From src/parse/animation/duration.ts:
/**
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-duration | W3C Spec}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration | MDN}
 */

// Generated test includes:
// Spec references:
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-duration
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration
```

⚠️ Warns if no spec refs found!

### 4. **Co-located Tests**
Generates tests next to source: `src/parse/animation/duration.test.ts`

(E2E/integration tests still go in `test/` directory)

---

## ✅ Proven Results

**duration property** (v2.0):
- ✅ 24 tests generated automatically
- ✅ 13 valid cases + 11 invalid cases
- ✅ All passing on first run
- ✅ Spec refs extracted and validated
- ⚡ ~5 minutes vs ~30+ minutes manual (6x faster)

---

## 📝 Creating a Config

Create `scripts/test-generator/configs/your-property.ts`:

```typescript
import type { PropertyConfig } from "../configs/duration"; // For types

export const config: PropertyConfig = {
  propertyName: "your-property",
  sourceFile: "src/parse/your/property.ts",        // For spec ref extraction
  importPath: "../src/parse/your/property.js",     // For running tests
  outputPath: "src/parse/your/property.test.ts",   // Where to generate
  cases: [
    // Valid cases
    {
      input: "value",
      description: "description",
      category: "valid-basic",
      expectValid: true  // ← Expected behavior
    },

    // Invalid cases
    {
      input: "bad-value",
      description: "description",
      category: "invalid-xyz",
      expectValid: false,  // ← Will flag if parser accepts it!
      expectedError: "property-name: Exact error message"  // ← NEW: For exact assertions
    },
  ],
};
```

**Key fields**:
- `expectValid` - Enables issue detection!
- `expectedError` - Exact error message for invalid cases (ensures consistent error schema)

### Why Exact Error Messages?

Using `.toBe()` instead of `.toContain()` ensures:
1. **Consistent schema**: All errors follow `"property-name: error details"` pattern
2. **Catch regressions**: Tests fail if error messages change unexpectedly
3. **Self-documenting**: Test shows exactly what users will see
4. **No false positives**: `toContain("Expected")` could match unrelated errors

---

## 🏗️ Generated Test Structure

```typescript
// b_path:: src/parse/animation/duration.test.ts
// Auto-generated from scripts/test-generator/configs/duration.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/...
// - W3C: https://www.w3.org/TR/...

describe("parse/animation/duration", () => {
  describe("valid cases", () => {
    describe("valid-basic", () => {
      it("should parse single time value in seconds", () => {
        const result = Parser.parse("1s");
        expect(result.ok).toBe(true);
        if (!result.ok) return;
        expect(result.value).toEqual({ /* full IR */ });
      });
    });

    describe("valid-keyword", () => { /* ... */ });
    // ... grouped by category
  });

  describe("invalid cases", () => {
    describe("invalid-negative", () => {
      it("should reject negative duration", () => {
        const result = Parser.parse("-1s");
        expect(result.ok).toBe(false);
        if (result.ok) return;
        expect(result.error).toBe("animation-duration: animation-duration must be non-negative, got: -1");
      });
    });
    // ... grouped by category
  });
});
```

---

## 🎨 Category Naming Convention

**Valid cases**:
- `valid-basic` - Basic usage
- `valid-keyword` - Keyword values
- `valid-edge` - Edge cases (zero, etc)
- `valid-decimal` - Decimal values
- `valid-large` - Large values
- `valid-list` - Multiple values

**Invalid cases**:
- `invalid-negative` - Negative values
- `invalid-unit` - Wrong units
- `invalid-empty` - Empty/missing values
- `invalid-comma` - Comma issues
- `invalid-keyword` - Wrong keywords
- `invalid-range` - Out of range values

---

## 📊 Results JSON

The results file contains the raw parser output for each test case:

```json
[
  {
    "input": "1s",
    "description": "single time value in seconds",
    "category": "valid-basic",
    "output": { "ok": true, "value": {...} },
    "success": true,
    "expectValid": true,
    "issue": undefined
  }
]
```

Useful for:
- Manual review before test generation
- Debugging parser behavior
- Documentation
- Sharing with team

---

## 🔄 Next Properties to Generate

Priority queue (based on complexity):
1. ✅ `duration` - Complete (pilot for v2.0)
2. `timing-function` - Most complex ← **NEXT**
3. `delay` - Similar to duration
4. `iteration-count` - Numbers + infinite
5. `direction` - Simple keywords
6. `fill-mode` - Simple keywords
7. `play-state` - Simple keywords

---

## 💡 Tips

1. **Start with expectValid** - Add to all cases for issue detection
2. **Review ISSUES.md** - Fix parser/schema before generating tests
3. **Check spec refs** - Ensure source files have @see links
4. **Categories matter** - Good categories = good test organization
5. **Iterate** - Add more cases as you discover edge cases

---

## 🔧 Workflow

1. **Create config** with test cases and `expectValid` flags
2. **Run generator** - detects issues automatically
3. **If issues found**:
   - Review `*-ISSUES.md`
   - Fix parser/schema OR update expectations
   - Regenerate
4. **If no issues**: Tests are ready to use!
5. **Run tests**: `pnpm test src/parse/animation/your-property.test.ts`

---

## 📚 Config as Fixture

Configs can be reused for:
- Test generation ✅
- Documentation generation (future)
- Parser fuzzing (future)
- Example code (future)
- Benchmarking (future)

**Single source of truth** for all property test cases!
