# MASTER PLAN: parseAll() & generateAll() Batch API

**CREATED**: 2025-10-21T08:36:00Z  
**STATUS**: Ready for Implementation  
**GOAL**: Implement batch parsing/generation for CSS Editor use case

---

## 🎯 Executive Summary

Implement `parseAll()` and `generateAll()` functions for batch CSS declaration processing. Designed specifically for CSS Editor tools that need to parse entire style blocks, show validation issues, allow modifications, and regenerate CSS.

**Key Innovation**: `parseAll()` returns a **single ParseResult** with flat object structure, not an array. Perfect for CSS Editor UX.

---

## 📋 API Design (FINAL)

### parseAll()

```typescript
/**
 * Parse multiple CSS declarations from a style block.
 * 
 * Returns a single ParseResult with all properties as a flat object.
 * Perfect for CSS editors - one ok flag, one issues array, easy property access.
 * 
 * @param css - CSS declarations (e.g., "color: red; width: 10px")
 * @returns ParseResult with flat object of parsed values
 * 
 * @example
 * const result = parseAll("color: red; width: 10px");
 * if (result.ok) {
 *   console.log(result.value.color);  // { kind: "named", value: "red" }
 *   console.log(result.value.width);  // { kind: "length", value: 10, unit: "px" }
 * }
 */
export function parseAll(css: string): ParseResult<Record<string, CSSValue | string>>
```

**Return Type**:
```typescript
ParseResult<Record<string, CSSValue | string>> = {
  ok: boolean,              // true if ALL properties valid
  value: {                  // Flat object keyed by property name
    color: CSSValue,        // Parsed IR
    width: CSSValue,        // Parsed IR
    border: string,         // Unparsed string (shorthand or invalid)
    ...
  },
  issues: Issue[]           // All warnings/errors from all properties
}
```

---

### generateAll()

```typescript
/**
 * Generate complete CSS declaration block from property values.
 * 
 * Accepts the same object shape that parseAll() returns, making
 * parse → modify → generate workflow seamless.
 * 
 * @param values - Object mapping property names to IR values or strings
 * @param options - Generation options
 * @returns Complete CSS declaration block (e.g., "color: red; width: 10px")
 * 
 * @example
 * const css = generateAll({
 *   color: { kind: "named", value: "red" },
 *   width: { kind: "length", value: 10, unit: "px" },
 *   border: "1px solid black"  // String passthrough
 * });
 * // Returns: "color: red; width: 10px; border: 1px solid black"
 */
export function generateAll(
  values: Record<string, CSSValue | string>,
  options?: { minify?: boolean }
): string
```

**Return Type**: Plain `string` - ready-to-use CSS, no Result wrapper!

---

## 🎨 Edge Cases (CRITICAL)

### 1. Duplicate Properties

```typescript
parseAll("color: red; color: blue; width: 10px")
// Returns:
{
  ok: true,  // Still ok - just a warning
  value: {
    color: { kind: "named", value: "blue" },  // Last wins (CSS standard)
    width: { kind: "length", value: 10, unit: "px" }
  },
  issues: [
    {
      property: "color",
      severity: "warning",
      code: "duplicate-property",
      message: "Duplicate property 'color' declared 2 times - using last value"
    }
  ]
}
```

**Rule**: Last declaration wins (CSS standard behavior). Create **warning** issue, not error. Keep `ok: true`.

---

### 2. Invalid Property Value

```typescript
parseAll("color: red; width: not-a-number; filter: blur(5px)")
// Returns:
{
  ok: false,  // ← Failed because invalid value
  value: {
    color: { kind: "named", value: "red" },
    width: "not-a-number",  // ← Return input string as-is
    filter: { kind: "filter-blur", amount: {...} }
  },
  issues: [
    {
      property: "width",
      severity: "error",
      code: "invalid-value",
      message: "Invalid value 'not-a-number' for property 'width'"
    }
  ]
}
```

**Rule**: 
- Return input string as-is in `value` object
- Add error to `issues`
- Set `ok: false`
- Continue parsing other properties

---

### 3. Shorthand Property (Rejected)

```typescript
parseAll("color: red; border: 1px solid black; width: 10px")
// Returns:
{
  ok: false,  // ← Failed because shorthand not allowed
  value: {
    color: { kind: "named", value: "red" },
    border: "1px solid black",  // ← Return input string, NO parsing
    width: { kind: "length", value: 10, unit: "px" }
  },
  issues: [
    {
      property: "border",  // Note: This will be a string, not CSSPropertyName (border is shorthand)
      severity: "error",
      code: "shorthand-not-supported",
      message: "Shorthand property 'border' is not supported in b_value. Use longhand properties: border-width, border-style, border-color. For shorthand support, use the 'b_short' library.",
      suggestion: "Use b_short to expand shorthands first"
    }
  ]
}
```

**Rule**:
- **DO NOT** attempt to parse shorthand
- Return input string as-is
- Add error to `issues` with **b_short promotion**
- Set `ok: false`
- Continue parsing other properties

**Error Message Template**:
```
"Shorthand property '{property}' is not supported in b_value. Use longhand properties: {longhands}. For shorthand support, use the 'b_short' library."
```

---

### 4. Unknown Property

```typescript
parseAll("color: red; made-up-property: value; width: 10px")
// Returns:
{
  ok: false,
  value: {
    color: { kind: "named", value: "red" },
    "made-up-property": "value",  // ← Return as-is
    width: { kind: "length", value: 10, unit: "px" }
  },
  issues: [
    {
      // Note: made-up-property is not in CSSPropertyName, so property field omitted
      severity: "error",
      code: "unknown-property",
      message: "Unknown CSS property 'made-up-property'"
    }
  ]
}
```

**Rule**: Same as invalid value - return input, add error, continue.

---

### 5. Empty/Whitespace Declarations

```typescript
parseAll("color: red;  ;  ; width: 10px")
// Returns:
{
  ok: true,
  value: {
    color: { kind: "named", value: "red" },
    width: { kind: "length", value: 10, unit: "px" }
  },
  issues: []  // No issues - empty declarations ignored silently
}
```

**Rule**: Silently ignore empty declarations. No errors, no warnings.

---

## 🔨 Implementation Strategy

### Phase 0: Type Setup (30min - 1h)

**PREREQUISITE**: Must be done before Phase 1!

**Files to create/modify**:

1. **Create `src/core/types/css-value.ts`** (30min)
   ```typescript
   // Re-export all IR types from modules
   export type * from "../types/color";
   export type * from "../types/clip-path";
   export type * from "../types/gradient";
   export type * from "../types/filter";
   export type * from "../types/shadow";
   export type * from "../types/transform";
   export type * from "../types/border";
   export type * from "../types/outline";
   export type * from "../types/animation";
   export type * from "../types/transition";
   export type * from "../types/position";
   export type * from "../types/layout";
   export type * from "../types/text";
   export type * from "../types/background";
   
   // Create union of all CSS value types
   export type CSSValue = 
     | HexColor | RGBColor | HSLColor | NamedColor | CurrentColor
     | ClipPathCircle | ClipPathEllipse | ClipPathPolygon | ClipPathInset
     | LinearGradient | RadialGradient | ConicGradient
     | FilterBlur | FilterBrightness | FilterContrast
     | BoxShadow | TextShadow
     | TransformMatrix | TransformTranslate | TransformRotate
     | PositionKeyword | PositionTwoValue
     // ... all other IR types
     ;
   
   // Type guards
   export function isCSSValue(value: unknown): value is CSSValue {
     return typeof value === "object" && value !== null && "kind" in value;
   }
   
   export function isUnparsedString(value: CSSValue | string): value is string {
     return typeof value === "string";
   }
   ```

2. **Update `src/core/result.ts`** (15min)
   
   Add property name registry and issue code types:
   ```typescript
   /**
    * CSS property names - exhaustive list of longhand properties
    */
   export type CSSPropertyName = 
     | "color" | "background-color" | "border-color"
     | "clip-path"
     | "filter" | "backdrop-filter"
     | "transform" | "transform-origin"
     | "box-shadow" | "text-shadow"
     | "width" | "height" | "top" | "right" | "bottom" | "left"
     | "position" | "display" | "overflow" | "overflow-x" | "overflow-y"
     | "animation-name" | "animation-duration" | "animation-timing-function"
     | "transition-property" | "transition-duration" | "transition-timing-function"
     // ... all 60+ longhand properties
     ;
   
   /**
    * Issue codes for categorization
    */
   export type IssueCode =
     // Parse errors
     | "invalid-value"
     | "unknown-property"
     | "shorthand-not-supported"
     | "invalid-syntax"
     | "missing-value"
     
     // Parse warnings
     | "duplicate-property"
     | "deprecated-syntax"
     | "legacy-syntax"
     
     // Generate errors
     | "invalid-ir"
     | "missing-required-field"
     | "unsupported-kind";
   
   /**
    * Issue reported during parsing or generation.
    */
   export type Issue = {
     property?: CSSPropertyName;  // ← Strongly typed!
     severity: "error" | "warning" | "info";
     code: IssueCode;  // ← Machine-readable code
     message: string;
     suggestion?: string;
     action?: string;
     location?: { offset: number; length: number };
   };
   ```

3. **Update `src/index.ts`** (5min)
   ```typescript
   export type { 
     CSSValue, 
     isCSSValue, 
     isUnparsedString 
   } from "./core/types/css-value";
   
   export type {
     CSSPropertyName,
     CSSLonghandProperty,
     CSSShorthandProperty,
     IssueCode
   } from "./core/result";
   ```

4. **Add Issue creation helpers to `src/core/result.ts`** (15min)
   ```typescript
   export const Issues = {
     duplicateProperty(property: CSSLonghandProperty, count: number): Issue,
     invalidValue(property: CSSLonghandProperty, value: string): Issue,
     shorthandNotSupported(property: CSSShorthandProperty, longhands: string[]): Issue,
     unknownProperty(property: string): Issue,
     invalidSyntax(message: string, location?: {...}): Issue
   };
   ```

---

### Phase 1: parseAll() Implementation (3-4 hours)

**File**: `src/universal.ts` (extend existing)

**Steps**:

1. **Add parseAll() function** (1h)
   ```typescript
   export function parseAll(css: string): ParseResult<Record<string, CSSValue | string>> {
     // 1. Split by semicolon
     // 2. For each declaration:
     //    - Split by first colon
     //    - Detect duplicates
     //    - Call parse() for each
     //    - Collect results
     // 3. Merge into single ParseResult
   }
   ```

2. **Implement declaration splitting** (30min)
   ```typescript
   function splitDeclarations(css: string): Array<{ property: string; value: string }> {
     return css
       .split(';')
       .map(decl => decl.trim())
       .filter(decl => decl.length > 0)  // Skip empty
       .map(decl => {
         const colonIdx = decl.indexOf(':');
         if (colonIdx === -1) return null;
         return {
           property: decl.slice(0, colonIdx).trim(),
           value: decl.slice(colonIdx + 1).trim()
         };
       })
       .filter(Boolean);
   }
   ```

3. **Implement duplicate detection** (30min)
   ```typescript
   function detectDuplicates(
     declarations: Array<{ property: string; value: string }>
   ): Map<string, number> {
     const counts = new Map<string, number>();
     for (const decl of declarations) {
       counts.set(decl.property, (counts.get(decl.property) || 0) + 1);
     }
     return counts;
   }
   ```

4. **Implement result merging** (1h)
   ```typescript
   function mergeResults(
     results: Array<{ property: string; result: ParseResult }>
   ): ParseResult<Record<string, CSSValue | string>> {
     const value: Record<string, CSSValue | string> = {};
     const issues: Issue[] = [];
     let allOk = true;
     
     for (const { property, result } of results) {
       if (result.ok) {
         value[property] = result.value;
       } else {
         value[property] = /* input string */;
         allOk = false;
       }
       issues.push(...result.issues);
     }
     
     return { ok: allOk, value, issues };
   }
   ```

5. **Add comprehensive tests** (1h)
   - Test all edge cases listed above
   - Test empty input
   - Test single property
   - Test mixed valid/invalid
   - Test duplicate detection

---

### Phase 2: generateAll() Implementation (2-3 hours)

**File**: `src/universal.ts` (extend existing)

**Steps**:

1. **Add generateAll() function** (1h)
   ```typescript
   export function generateAll(
     values: Record<string, CSSValue | string>,
     options?: { minify?: boolean }
   ): string {
     const declarations: string[] = [];
     
     for (const [property, value] of Object.entries(values)) {
       if (typeof value === 'string') {
         // String passthrough
         declarations.push(`${property}: ${value}`);
       } else {
         // Generate from IR
         const result = generate({ property, value });
         if (result.ok) {
           declarations.push(`${property}: ${result.value}`);
         }
         // If generation fails, skip silently (or throw?)
       }
     }
     
     const separator = options?.minify ? ';' : '; ';
     return declarations.join(separator);
   }
   ```

2. **Handle string passthrough** (30min)
   - Detect `typeof value === 'string'`
   - Pass through as-is (for shorthand/invalid values)

3. **Handle IR generation** (30min)
   - Use existing `generate()` function
   - Handle generation errors gracefully

4. **Add formatting options** (30min)
   - Minified: `"color:red;width:10px"`
   - Normal: `"color: red; width: 10px"`
   - Pretty? (future: multiline with indentation)

5. **Add comprehensive tests** (1h)
   - Test mixed IR and strings
   - Test minify option
   - Test empty object
   - Test single property
   - Test round-trip (parseAll → generateAll)

---

### Phase 3: Integration & Documentation (1-2 hours)

1. **Update exports** (15min)
   ```typescript
   // src/index.ts
   export { parse, generate, parseAll, generateAll } from './universal';
   ```

2. **Update TypeScript types** (15min)
   - Export `ParseResult<Record<string, CSSValue | string>>`
   - Document generic usage

3. **Add JSDoc examples** (30min)
   - CSS Editor use case
   - Round-trip workflow
   - Error handling

4. **Update README** (30min)
   - Add batch API section
   - Show CSS Editor example
   - Explain edge cases

5. **Run full test suite** (15min)
   ```bash
   just check && just test
   ```

---

## 📊 Test Plan

### parseAll() Tests

```typescript
describe('parseAll()', () => {
  describe('Basic functionality', () => {
    it('parses single property')
    it('parses multiple properties')
    it('returns flat object keyed by property name')
    it('returns single ParseResult with ok flag')
  })
  
  describe('Edge cases', () => {
    it('handles duplicate properties (last wins, warning)')
    it('handles invalid property values (return string, error)')
    it('detects shorthand properties (return string, error, promote b_short)')
    it('handles unknown properties (return string, error)')
    it('ignores empty declarations silently')
    it('handles whitespace-only declarations')
    it('handles missing colon (invalid syntax)')
  })
  
  describe('Issue aggregation', () => {
    it('collects issues from all properties')
    it('sets ok=false if any property fails')
    it('sets ok=true if only warnings present')
    it('includes property name in each issue')
  })
  
  describe('Real-world scenarios', () => {
    it('parses typical CSS block')
    it('handles mix of valid/invalid/shorthand')
    it('preserves property order in value object')
  })
})
```

### generateAll() Tests

```typescript
describe('generateAll()', () => {
  describe('Basic functionality', () => {
    it('generates single property')
    it('generates multiple properties')
    it('returns semicolon-separated string')
    it('includes property name in output')
  })
  
  describe('String passthrough', () => {
    it('passes through string values as-is')
    it('handles mix of IR and strings')
    it('preserves shorthand strings')
  })
  
  describe('Formatting options', () => {
    it('generates with spaces by default')
    it('generates minified when minify=true')
  })
  
  describe('Round-trip', () => {
    it('parseAll → generateAll produces equivalent CSS')
    it('handles modifications between parse/generate')
    it('preserves unparsed strings through round-trip')
  })
})
```

---

## 🎯 Success Criteria

**Must Have**:
- ✅ `parseAll()` returns single ParseResult with flat object
- ✅ `generateAll()` returns plain CSS string
- ✅ All 5 edge cases handled correctly
- ✅ Shorthand detection with b_short promotion
- ✅ Duplicate detection with warnings
- ✅ String passthrough in generateAll()
- ✅ All tests passing (2650+ total)
- ✅ TypeScript clean
- ✅ Lint clean

**Nice to Have**:
- 📝 CSS Editor example in README
- 📝 JSDoc with rich examples
- 🎨 Pretty-print option for generateAll()

---

## 📁 Files to Modify

1. **src/universal.ts**
   - Add `parseAll()` function
   - Add `generateAll()` function
   - Add helper functions (split, merge, etc.)

2. **src/universal.test.ts**
   - Add parseAll() test suite (~20 tests)
   - Add generateAll() test suite (~15 tests)

3. **src/index.ts**
   - Export new functions

4. **README.md** (optional but recommended)
   - Add batch API section
   - Add CSS Editor example

---

## 🚀 Implementation Order

### Session 0: Type Setup (1-1.5h)
- Create CSSValue union type
- Add type guards (isCSSValue, isUnparsedString)
- Create property name types (CSSLonghandProperty, CSSShorthandProperty)
- Create IssueCode type
- Update Issue type with strong typing
- Add Issue creation helpers
- Update exports
- Verify baseline: `just check && just test`

**Deliverable**: Complete type system, all tests still passing

---

### Session 1: parseAll() Core (3-4h)
- Implement declaration splitting
- Implement parseAll() function
- Add basic tests
- Handle edge cases 1-5
- Verify baseline: `just check && just test`

**Deliverable**: `parseAll()` working with all edge cases

---

### Session 2: generateAll() Core (2-3h)
- Implement generateAll() function
- Add string passthrough
- Add formatting options
- Add basic tests
- Add round-trip tests
- Verify baseline: `just check && just test`

**Deliverable**: `generateAll()` working with round-trip

---

### Session 3: Polish & Documentation (1-2h)
- Update exports
- Add JSDoc
- Update README
- Add CSS Editor example
- Final verification

**Deliverable**: Complete, documented, tested batch API

---

## 💡 CSS Editor Use Case Example

```typescript
import { parseAll, generateAll } from 'b_value';

// CSS Editor receives style block from user
const styleBlock = `
  color: #ff0000;
  width: 100px;
  border: 1px solid black;
  background-color: blue;
  filter: blur(5px)
`;

// Parse entire block
const result = parseAll(styleBlock);

// Show validation in editor UI
if (!result.ok) {
  // Highlight problematic properties
  for (const issue of result.issues) {
    if (issue.property === 'border') {
      editor.showError(issue.property, issue.message);
      // Show suggestion: "Use b_short to expand this shorthand"
    }
  }
}

// User can still work with valid properties
console.log(result.value.color);  // Access parsed color
console.log(result.value.width);  // Access parsed width
console.log(result.value.border); // "1px solid black" (unparsed string)

// User modifies color in color picker
result.value.color = { kind: "hex", value: "#00ff00" };

// User increases blur with slider
result.value.filter.amount.value = 10;

// Regenerate CSS for live preview
const updatedCSS = generateAll(result.value);
// Returns: "color: #00ff00; width: 100px; border: 1px solid black; background-color: blue; filter: blur(10px)"

editor.updatePreview(updatedCSS);
```

---

## 🔗 Dependencies

**Uses existing code**:
- `parse()` function - for parsing individual properties
- `generate()` function - for generating individual properties
- Property registry - for shorthand detection
- `ParseResult` type - for return type
- Issue system - for error reporting

**New types needed** (see SCHEMA.md):
- ✅ `CSSValue` union type - Union of all IR types (needs creation)
- ✅ Type guards (`isCSSValue`, `isUnparsedString`)
- ✅ Update `Issue` type to include `property?: string` field

**Action items**:
1. Create `src/core/types/css-value.ts` with CSSValue union
2. Export CSSValue from `src/index.ts`
3. Add type guards in `src/universal.ts`
4. Update Issue type in `src/core/result.ts` (add `property?` field)

---

## ⚠️ Critical Notes

1. **Shorthand Promotion**: Always promote b_short when shorthand detected
2. **String Passthrough**: generateAll() must handle string values (for unparsed properties)
3. **Last Wins**: Duplicate properties follow CSS standard (last declaration wins)
4. **No Array**: parseAll() returns object, not array - this is intentional for editor UX
5. **Plain String**: generateAll() returns string, not Result - keep it simple

---

## 🎯 Next Agent Instructions

**To implement this**:

1. Read this entire document
2. Review existing `parse()` and `generate()` in `src/universal.ts`
3. Start with Phase 1: parseAll() (Session 1)
4. Follow test-driven approach:
   - Write tests first
   - Implement to pass tests
   - Verify edge cases
5. Run `just check && just test` after each phase
6. Create HANDOVER.md when complete

**Verification checklist**:
```bash
# Before starting
just check && just test  # Baseline: 2610 tests passing

# After parseAll()
just check && just test  # Should have ~2630 tests passing

# After generateAll()
just check && just test  # Should have ~2645 tests passing

# Final
just check && just test  # Should have 2645+ tests passing, all green
```

---

**END OF MASTER PLAN**

Ready for implementation! 🚀
