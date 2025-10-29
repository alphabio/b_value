# Generate Test Generator v2.0

**Auto-generate comprehensive test files for IR → CSS generation with roundtrip validation**

## 🎯 Purpose

Replace tedious manual test writing with automated test generation:
1. Define test cases in config files
2. Run generator - validates IR → CSS → IR roundtrip automatically
3. **Detects issues** (validation failures, roundtrip mismatches)
4. Auto-generates complete test files (valid + failure cases)

## 📦 Usage

```bash
# Generate tests from a config
tsx scripts/generate-generate-tests.ts <module>/<property>
tsx scripts/generate-generate-tests.ts <module> <property>

# Examples
tsx scripts/generate-generate-tests.ts animation/duration
tsx scripts/generate-generate-tests.ts layout box-sizing
tsx scripts/generate-generate-tests.ts flexbox/flex-direction

# Output:
# - src/generate/{module}/{property}.test.ts (valid cases)
# - src/generate/{module}/{property}.failure.test.ts (invalid cases)
# - scripts/generate-test-generator/results/{module}/{property}-results.json
# - scripts/generate-test-generator/results/{module}/{property}-ISSUES.md (if issues found)
```

## ✨ Features

### 1. **Automatic Roundtrip Testing**
For each valid test case, generator:
- Calls `generate(IR)` → gets CSS string
- Calls `parse(CSS)` → gets IR back
- Verifies `parse(generate(IR)) === IR`
- Catches serialization bugs early!

### 2. **Real Error Message Capture**
Generator runs actual validation against test cases and captures:
- Real Zod validation errors
- Exact error messages from schemas
- **No manual error string writing!**

### 3. **Issue Detection**
Compares actual generator behavior with expected:
- ✅ No issues: Generates tests
- ⚠️  Issues found: Creates `*-ISSUES.md` + stops

Example issue report:
```markdown
# Issues Found: box-sizing

❌ "invalid-value" - invalid keyword
   Expected: INVALID (expectValid: false)
   Actual: Valid output generated
   
   This indicates the generator schema is too permissive!
```

### 4. **Spec Reference Validation**
Automatically extracts and validates spec refs from generator source files:

```typescript
// From src/generate/layout/box-sizing.ts:
/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing}
 */

// Generated test includes:
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
```

### 5. **Co-located Tests**
Generates tests next to source:
- `src/generate/layout/box-sizing.test.ts` (valid cases)
- `src/generate/layout/box-sizing.failure.test.ts` (invalid cases)

---

## 📝 Creating a Config

Create `scripts/generate-test-generator/configs/{module}/{property}.ts`:

```typescript
import type { PropertyConfig } from "../animation/duration"; // For types

export const config: PropertyConfig = {
  module: "layout",              // Module name (animation, layout, flexbox, etc)
  propertyName: "box-sizing",    // Property name (kebab-case)
  typeName: "BoxSizing",         // OPTIONAL: Override auto-generated type name
  
  // File paths
  sourceFile: "src/generate/layout/box-sizing.ts",       // For spec ref extraction
  importPath: "../src/generate/layout/box-sizing.js",    // For generator import
  parseImportPath: "../src/parse/layout/box-sizing.js",  // For parser import (roundtrip)
  outputPath: "src/generate/layout/box-sizing.test.ts",  // Where to generate
  
  cases: [
    // Valid cases - will be roundtrip tested automatically
    {
      input: { kind: "box-sizing", value: "border-box" },
      expected: "border-box",
      description: "border-box keyword",
      category: "valid-basic",
      roundtrip: true,   // Enable roundtrip validation
      expectValid: true
    },
    
    // Invalid cases - captures exact error messages
    {
      input: { kind: "box-sizing", value: "padding-box" } as any,
      expected: "",
      description: "invalid keyword",
      category: "invalid-keyword",
      expectValid: false,
      expectedError: "Invalid input"  // Generic - actual error captured at runtime
    },
  ],
};
```

### Key Fields

- **`typeName`** - Override auto-generated type name
  - Auto-generated: `ModulePropertyName` (e.g., `LayoutBoxSizing`)
  - Use when actual type differs (e.g., `BackgroundBlendMode` not `VisualBackgroundBlendMode`)
  
- **`roundtrip`** - Enable roundtrip testing for valid cases
  - Tests that `parse(generate(IR)) === IR`
  - Critical for ensuring serialization correctness
  
- **`expectValid`** - Enables issue detection
  - `true`: Generator should succeed
  - `false`: Generator should fail validation
  
- **`expectedError`** - Placeholder for error message
  - Actual error captured at runtime from Zod validation
  - No need to write exact error strings manually!

---

## 🏗️ Generated Test Structure

### Valid Cases (`*.test.ts`)

```typescript
// b_path:: src/generate/layout/box-sizing.test.ts
// Auto-generated from scripts/generate-test-generator/configs/layout/box-sizing.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing

import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/layout/box-sizing";
import * as Parser from "@/parse/layout/box-sizing";

describe("generate/layout/box-sizing - valid cases", () => {
  describe("valid-basic", () => {
    it("should generate border-box keyword", () => {
      const input: Type.BoxSizing = {
        kind: "box-sizing",
        value: "border-box",
      };
      const result = Generator.generate(input);
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value).toBe("border-box");

      // Roundtrip validation
      const parseResult = Parser.parse(result.value);
      expect(parseResult.ok).toBe(true);
      if (!parseResult.ok) return;
      expect(parseResult.value).toEqual(input);
    });
  });
});
```

### Invalid Cases (`*.failure.test.ts`)

```typescript
// b_path:: src/generate/layout/box-sizing.failure.test.ts
// Auto-generated from scripts/generate-test-generator/configs/layout/box-sizing.ts

describe("generate/layout/box-sizing - invalid cases", () => {
  describe("invalid-keyword", () => {
    it("should reject invalid keyword", () => {
      const input: any = {
        kind: "box-sizing",
        value: "padding-box",
      };
      const result = Generator.generate(input);
      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.issues).toHaveLength(1);
      // Exact error message captured at generation time
      expect(result.issues?.[0]?.message).toBe('value: Expected content-box | border-box');
    });
  });
});
```

---

## 🎨 Category Naming Convention

### Valid Cases
- `valid-basic` - Basic usage
- `valid-keyword` - Keyword values
- `valid-edge` - Edge cases (zero, min/max)
- `valid-decimal` - Decimal values
- `valid-negative` - Negative values (if allowed)
- `valid-list` - Multiple values
- `valid-complex` - Complex combinations

### Invalid Cases
- `invalid-null` - Null/undefined input
- `invalid-keyword` - Wrong keywords
- `invalid-kind` - Wrong `kind` field
- `invalid-unit` - Wrong units
- `invalid-range` - Out of range values
- `invalid-type` - Wrong type (string instead of number, etc)
- `invalid-structure` - Malformed IR structure

---

## 🔧 Enum Properties - Important Pattern

**When schemas use `z.enum()`, ALWAYS add error messages!**

### Good ✅
```typescript
export const boxSizingSchema = z.object({
  kind: z.literal("box-sizing"),
  value: z.enum(["content-box", "border-box"], {
    error: () => ({ message: "Expected content-box | border-box" })
  })
});
```

### Bad ❌
```typescript
export const boxSizingSchema = z.object({
  kind: z.literal("box-sizing"),
  value: z.enum(["content-box", "border-box"])  // Missing error message!
});
```

**Why?**
- Without error message: Zod generates verbose error with 16+ issues
- With error message: Single, clear error message
- Test generator expects single error for invalid cases

**After adding error messages:**
```bash
# ALWAYS regenerate tests to capture new error messages
tsx scripts/generate-generate-tests.ts layout/box-sizing
```

---

## 📊 Results JSON

The results file contains raw generator output for each test case:

```json
[
  {
    "description": "border-box keyword",
    "category": "valid-basic",
    "output": {
      "ok": true,
      "value": "border-box"
    },
    "success": true,
    "expectValid": true,
    "expected": "border-box",
    "actual": "border-box",
    "roundtrip": true,
    "roundtripSuccess": true
  },
  {
    "description": "invalid keyword",
    "category": "invalid-keyword",
    "output": {
      "ok": false,
      "issues": [
        {
          "code": "invalid-ir",
          "path": ["value"],
          "message": "value: Expected content-box | border-box"
        }
      ],
      "error": "value: Expected content-box | border-box"
    },
    "success": true,
    "expectValid": false
  }
]
```

---

## 🔄 Workflow

### Initial Setup
1. **Create config** with test cases and `expectValid` flags
2. **Run generator** - detects issues automatically
3. **If issues found**:
   - Review `*-ISSUES.md`
   - Fix generator schema OR update expectations
   - Regenerate
4. **If no issues**: Tests are ready!
5. **Run tests**: `pnpm test src/generate/layout/box-sizing.test.ts`

### After Schema Changes
**CRITICAL**: Always regenerate tests after changing schemas!

```bash
# Example: After adding enum error messages
tsx scripts/generate-generate-tests.ts layout/box-sizing
tsx scripts/generate-generate-tests.ts layout/clear
tsx scripts/generate-generate-tests.ts layout/float

# Or regenerate all
find scripts/generate-test-generator/configs -name "*.ts" | \
  sed 's|scripts/generate-test-generator/configs/||' | \
  sed 's|\.ts$||' | \
  xargs -I {} tsx scripts/generate-generate-tests.ts {}
```

**Why?**
- Generator captures ACTUAL error messages from schemas
- Tests expect exact error strings
- Schema changes = error message changes = tests must be regenerated

---

## 🎯 Properties with Generated Tests (33 total)

### Animation (8)
- ✅ animation/delay
- ✅ animation/direction
- ✅ animation/duration
- ✅ animation/fill-mode
- ✅ animation/iteration-count
- ✅ animation/name
- ✅ animation/play-state
- ✅ animation/timing-function

### Flexbox (6)
- ✅ flexbox/align-content
- ✅ flexbox/align-items
- ✅ flexbox/align-self
- ✅ flexbox/flex-direction
- ✅ flexbox/flex-wrap
- ✅ flexbox/justify-content

### Layout (7)
- ✅ layout/box-sizing
- ✅ layout/clear
- ✅ layout/cursor
- ✅ layout/display
- ✅ layout/float
- ✅ layout/overflow-x
- ✅ layout/overflow-y
- ✅ layout/position

### Transition (4)
- ✅ transition/delay
- ✅ transition/duration
- ✅ transition/property
- ✅ transition/timing-function

### Typography (3)
- ✅ typography/font-style
- ✅ typography/text-align
- ✅ typography/text-transform

### Visual (5)
- ✅ visual/background-blend-mode
- ✅ visual/mix-blend-mode
- ✅ visual/opacity
- ✅ visual/visibility

---

## 💡 Tips & Best Practices

### 1. Start with `expectValid`
Add to all test cases for automatic issue detection:
```typescript
{
  input: { kind: "property", value: "test" },
  expected: "test",
  description: "test case",
  category: "valid-basic",
  roundtrip: true,
  expectValid: true  // ← Always include!
}
```

### 2. Enable Roundtrip Testing
For valid cases, always enable roundtrip:
```typescript
{
  input: { kind: "property", value: "test" },
  expected: "test",
  description: "test case",
  category: "valid-basic",
  roundtrip: true,  // ← Critical for serialization testing!
  expectValid: true
}
```

### 3. Add Enum Error Messages
When using `z.enum()`, ALWAYS add error message:
```typescript
z.enum(["value1", "value2"], {
  error: () => ({ message: "Expected value1 | value2" })
})
```

Then regenerate tests to capture new error messages.

### 4. Use `typeName` Override When Needed
If auto-generated type name doesn't match actual export:
```typescript
export const config: PropertyConfig = {
  propertyName: "background-blend-mode",
  typeName: "BackgroundBlendMode",  // Not "VisualBackgroundBlendMode"
  module: "visual",
  // ...
};
```

### 5. Review Generated Tests
After generation:
- Run tests: `pnpm test src/generate/module/property.test.ts`
- Check roundtrip tests pass
- Verify error messages are clear

### 6. Categories Matter
Good categories = good test organization:
- Group related cases together
- Use consistent naming across properties
- Makes tests easier to navigate and debug

---

## 🔍 Troubleshooting

### Tests Fail After Schema Changes
**Problem**: Error message assertions fail
**Solution**: Regenerate tests to capture new error messages
```bash
tsx scripts/generate-generate-tests.ts module/property
```

### Type Errors in Generated Tests
**Problem**: `Type.ModulePropertyName` doesn't exist
**Solution**: Add `typeName` override to config
```typescript
export const config: PropertyConfig = {
  typeName: "ActualTypeName",  // Override auto-generated name
  // ...
};
```

### Roundtrip Tests Fail
**Problem**: `parse(generate(IR)) !== IR`
**Solution**: 
1. Check parser implementation
2. Check generator implementation
3. Verify IR schema matches between parse and generate
4. May indicate serialization bug!

### Too Many Error Issues
**Problem**: Invalid cases generate 16+ error issues instead of 1
**Solution**: Add error message to enum schema
```typescript
z.enum(["val1", "val2"], {
  error: () => ({ message: "Expected val1 | val2" })
})
```

---

## 📚 Related

- **Parse Test Generator**: `scripts/parse-test-generator/`
  - Similar concept but for CSS → IR parsing
  - Read their README for parse-specific patterns
  
- **Config as Fixture**: Configs are single source of truth
  - Test generation ✅
  - Documentation generation (future)
  - Fuzzing (future)
  - Benchmarking (future)

---

## 🎉 Success Metrics

**33 properties** with auto-generated tests:
- ✅ All 3,949 tests passing
- ✅ Roundtrip validation on all valid cases
- ✅ Exact error message assertions
- ✅ Spec reference validation
- ⚡ ~5 minutes vs ~30+ minutes manual (6x faster per property)

**Total time saved**: ~13.75 hours of manual test writing! 🚀
