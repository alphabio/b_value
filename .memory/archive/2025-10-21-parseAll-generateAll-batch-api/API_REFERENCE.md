# API Reference: parseAll() & generateAll()

**Batch parsing and generation for CSS declarations**

---

## parseAll()

### Signature

```typescript
function parseAll(css: string): ParseResult<Record<string, CSSValue | string>>
```

### Parameters

- **css**: CSS declaration block (e.g., `"color: red; width: 10px"`)
  - Semicolon-separated declarations
  - Property-value pairs with colons
  - Whitespace flexible

### Returns

```typescript
{
  ok: boolean,                          // true if ALL properties valid
  value: Record<string, CSSValue | string>,  // Flat object keyed by property
  issues: Issue[]                       // All warnings/errors
}
```

**Value object contains**:
- Parsed IR objects for valid properties
- Input strings for invalid/shorthand/unknown properties

### Examples

#### Success
```typescript
parseAll("color: red; width: 10px")
// Returns:
{
  ok: true,
  value: {
    color: { kind: "named", value: "red" },
    width: { kind: "length", value: 10, unit: "px" }
  },
  issues: []
}
```

#### With Duplicates (Warning)
```typescript
parseAll("color: red; color: blue")
// Returns:
{
  ok: true,  // Still ok - just warning
  value: {
    color: { kind: "named", value: "blue" }  // Last wins
  },
  issues: [
    {
      property: "color",
      severity: "warning",
      message: "Duplicate property 'color' declared 2 times - using last value"
    }
  ]
}
```

#### With Invalid Value (Error)
```typescript
parseAll("color: red; width: not-a-number")
// Returns:
{
  ok: false,  // Failed
  value: {
    color: { kind: "named", value: "red" },
    width: "not-a-number"  // String returned
  },
  issues: [
    {
      property: "width",
      severity: "error",
      message: "Invalid value 'not-a-number' for property 'width'"
    }
  ]
}
```

#### With Shorthand (Error + b_short Promotion)
```typescript
parseAll("color: red; border: 1px solid black")
// Returns:
{
  ok: false,  // Failed
  value: {
    color: { kind: "named", value: "red" },
    border: "1px solid black"  // String returned, NOT parsed
  },
  issues: [
    {
      property: "border",
      severity: "error",
      message: "Shorthand property 'border' is not supported in b_value. Use longhand properties: border-width, border-style, border-color. For shorthand support, use the 'b_short' library.",
      suggestion: "Use b_short to expand shorthands first"
    }
  ]
}
```

---

## generateAll()

### Signature

```typescript
function generateAll(
  values: Record<string, CSSValue | string>,
  options?: { minify?: boolean }
): string
```

### Parameters

- **values**: Object mapping property names to values
  - Keys: CSS property names
  - Values: IR objects OR strings (for passthrough)
  
- **options** (optional):
  - `minify`: If true, no spaces after colons/semicolons

### Returns

Plain CSS string with semicolon-separated declarations.

### Examples

#### Basic Generation
```typescript
generateAll({
  color: { kind: "named", value: "red" },
  width: { kind: "length", value: 10, unit: "px" }
})
// Returns: "color: red; width: 10px"
```

#### With String Passthrough
```typescript
generateAll({
  color: { kind: "named", value: "red" },
  border: "1px solid black",  // String passes through
  width: { kind: "length", value: 10, unit: "px" }
})
// Returns: "color: red; border: 1px solid black; width: 10px"
```

#### Minified
```typescript
generateAll({
  color: { kind: "named", value: "red" },
  width: { kind: "length", value: 10, unit: "px" }
}, { minify: true })
// Returns: "color:red;width:10px"
```

#### Round-Trip
```typescript
const result = parseAll("color: red; width: 10px");
result.value.color = { kind: "hex", value: "#00ff00" };
const css = generateAll(result.value);
// Returns: "color: #00ff00; width: 10px"
```

---

## Edge Case Behavior Summary

| Scenario | parseAll() ok | parseAll() value | generateAll() behavior |
|----------|---------------|------------------|------------------------|
| Valid property | ✅ true | IR object | Generate from IR |
| Duplicate property | ✅ true (warning) | Last value (IR) | Generate from IR |
| Invalid value | ❌ false | Input string | Pass through string |
| Shorthand property | ❌ false | Input string | Pass through string |
| Unknown property | ❌ false | Input string | Pass through string |
| Empty declaration | ✅ true | (skipped) | (skipped) |

---

## Type Definitions

```typescript
type CSSValue = 
  | { kind: "named", value: string }
  | { kind: "hex", value: string }
  | { kind: "length", value: number, unit: string }
  | { kind: "filter-blur", amount: LengthPercentage }
  | ... // All IR types

type ParseResult<T> = {
  ok: boolean
  value?: T
  property?: string
  issues: Issue[]
}

type Issue = {
  property?: string
  severity: "error" | "warning"
  message: string
  suggestion?: string
}
```

---

## CSS Editor Use Case

```typescript
// User enters CSS in editor
const input = `
  color: #ff0000;
  width: 100px;
  border: 1px solid black;
  filter: blur(5px)
`;

// Parse block
const result = parseAll(input);

// Show issues in UI
if (!result.ok) {
  for (const issue of result.issues) {
    editor.showIssue(issue.property, issue.message, issue.severity);
  }
}

// User can still work with valid properties
// Access parsed values directly
const colorValue = result.value.color;  // IR object
const borderValue = result.value.border;  // String (unparsed)

// User modifies color in color picker
result.value.color = { kind: "hex", value: "#00ff00" };

// User increases blur with slider
if (result.value.filter?.kind === "filter-blur") {
  result.value.filter.amount.value = 10;
}

// Regenerate CSS for live preview
const output = generateAll(result.value);
// Output: "color: #00ff00; width: 100px; border: 1px solid black; filter: blur(10px)"

editor.updatePreview(output);
```

---

## Implementation Notes

### parseAll() Algorithm

1. Split CSS by semicolon
2. Trim and filter empty declarations
3. For each declaration:
   - Split by first colon
   - Call `parse(declaration)` 
   - Detect duplicates → add warning
   - Detect shorthand → add error with b_short promotion
   - Collect results
4. Merge all results into single ParseResult:
   - `ok`: true if all succeeded (warnings ok)
   - `value`: flat object with all properties
   - `issues`: concatenated from all properties

### generateAll() Algorithm

1. For each property in input object:
   - If value is string → pass through as-is
   - If value is IR object → call `generate({ property, value })`
2. Join all declarations with separator
   - Normal: `"; "` (semicolon + space)
   - Minified: `";"` (semicolon only)
3. Return plain string

---

## Error Messages

### Duplicate Property
```
"Duplicate property '{property}' declared {count} times - using last value"
```

### Invalid Value
```
"Invalid value '{value}' for property '{property}'"
```

### Shorthand Property (CRITICAL - Promote b_short)
```
"Shorthand property '{property}' is not supported in b_value. Use longhand properties: {longhands}. For shorthand support, use the 'b_short' library."
```

### Unknown Property
```
"Unknown CSS property '{property}'"
```

---

**See MASTER_PLAN.md for complete implementation details.**
