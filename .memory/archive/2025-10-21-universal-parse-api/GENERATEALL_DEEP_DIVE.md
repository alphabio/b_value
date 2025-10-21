# generateAll() - Deep Dive

**Purpose**: Batch generate multiple CSS declarations from IR objects

---

## 📋 Basic Signature

```typescript
function generateAll(
  declarations: Array<{ property: string; value: CSSValue }>,
  options?: { minify?: boolean }
): string
```

---

## 🎯 Core Concept

`generateAll()` is the **inverse of `parseAll()`** - it takes an array of property-value pairs and produces a CSS string with semicolon-separated declarations.

```typescript
// Parse multiple declarations
const parsed = parseAll("color: red; width: 10px; filter: blur(5px)");
// → [
//   { ok: true, property: "color", value: { kind: "named", ... } },
//   { ok: true, property: "width", value: { kind: "length", ... } },
//   { ok: true, property: "filter", value: { kind: "filter-blur", ... } }
// ]

// Generate back to CSS
const css = generateAll([
  { property: "color", value: parsed[0].value },
  { property: "width", value: parsed[1].value },
  { property: "filter", value: parsed[2].value }
]);
// → "color: red; width: 10px; filter: blur(5px)"
```

---

## 💡 Use Cases

### 1. Round-Trip (Parse → Modify → Generate)

```typescript
import { parseAll, generateAll } from "b_value";

// Parse CSS block
const parsed = parseAll(`
  color: #ff0000;
  clip-path: circle(50%);
  filter: blur(5px)
`);

// Modify values
const modified = parsed.map(result => {
  if (!result.ok) return result;
  
  // Change red to green
  if (result.property === "color" && result.value.kind === "hex") {
    return {
      ...result,
      value: { ...result.value, value: "#00FF00" }
    };
  }
  
  // Increase blur
  if (result.property === "filter" && result.value.kind === "filter-blur") {
    return {
      ...result,
      value: { ...result.value, amount: { value: 10, unit: "px" } }
    };
  }
  
  return result;
});

// Generate back to CSS
const css = generateAll(
  modified
    .filter(r => r.ok)
    .map(r => ({ property: r.property!, value: r.value! }))
);
// → "color: #00ff00; clip-path: circle(50%); filter: blur(10px)"
```

---

### 2. Building Style Objects

```typescript
import type { HexColor, ClipPathCircle, FilterBlur } from "b_value/types";
import { generateAll } from "b_value";

// Build style declarations programmatically
function buildButtonStyles(theme: Theme) {
  const declarations: Array<{ property: string; value: CSSValue }> = [];
  
  // Add color
  const colorIR: HexColor = { 
    kind: "hex", 
    value: theme.primaryColor 
  };
  declarations.push({ property: "color", value: colorIR });
  
  // Add background
  const bgIR: HexColor = { 
    kind: "hex", 
    value: theme.bgColor 
  };
  declarations.push({ property: "background-color", value: bgIR });
  
  // Add clip-path if rounded
  if (theme.rounded) {
    const clipIR: ClipPathCircle = {
      kind: "clip-path-circle",
      radius: { value: 50, unit: "%" }
    };
    declarations.push({ property: "clip-path", value: clipIR });
  }
  
  return generateAll(declarations);
}

const css = buildButtonStyles({
  primaryColor: "#FF5733",
  bgColor: "#FFFFFF",
  rounded: true
});
// → "color: #ff5733; background-color: #ffffff; clip-path: circle(50%)"
```

---

### 3. Integration with b_short (Complete Pipeline)

```typescript
import { expand } from "b_short";
import { parseAll, generateAll } from "b_value";

// Complete pipeline: shorthand → longhand → modify → CSS
function processStyles(css: string, modifications: Record<string, any>) {
  // 1. Expand shorthands to longhand
  const expanded = expand(css);
  // "margin: 10px 20px" → "margin-top: 10px; margin-right: 20px; ..."
  
  // 2. Parse each longhand property
  const parsed = parseAll(expanded.result);
  
  // 3. Apply modifications
  const modified = parsed.map(result => {
    if (!result.ok) return result;
    
    const mod = modifications[result.property!];
    if (mod) {
      return {
        ...result,
        value: { ...result.value, ...mod }
      };
    }
    
    return result;
  });
  
  // 4. Generate back to CSS
  return generateAll(
    modified
      .filter(r => r.ok)
      .map(r => ({ property: r.property!, value: r.value! }))
  );
}

const result = processStyles(
  "margin: 10px 20px; color: red",
  { "margin-top": { value: 30, unit: "px" } }
);
// → "margin-top: 30px; margin-right: 20px; margin-bottom: 10px; margin-left: 20px; color: red"
```

---

### 4. CSS-in-JS Integration

```typescript
import { generateAll } from "b_value";

// Convert IR state to CSS string for CSS-in-JS libraries
function stateToCSS(state: StyleState): string {
  const declarations = Object.entries(state.styles).map(([prop, value]) => ({
    property: prop,
    value: value
  }));
  
  return generateAll(declarations);
}

// Usage with styled-components, emotion, etc.
const StyledButton = styled.button`
  ${props => stateToCSS(props.styleState)}
`;
```

---

### 5. Minified Output

```typescript
import { generateAll } from "b_value";

const declarations = [
  { property: "color", value: { kind: "hex", value: "#FF0000" } },
  { property: "background-color", value: { kind: "hex", value: "#0000FF" } },
  { property: "clip-path", value: { kind: "clip-path-circle", radius: { value: 50, unit: "%" } } }
];

// Normal (human-readable)
const readable = generateAll(declarations);
// → "color: #ff0000; background-color: #0000ff; clip-path: circle(50%)"

// Minified (production)
const minified = generateAll(declarations, { minify: true });
// → "color: #ff0000;background-color: #0000ff;clip-path: circle(50%)"
//    (no spaces after semicolons)
```

---

### 6. Filtering & Transforming

```typescript
import { parseAll, generateAll } from "b_value";

// Parse CSS and filter out certain properties
const css = `
  color: red;
  background-color: blue;
  filter: blur(5px);
  clip-path: circle(50%)
`;

const parsed = parseAll(css);

// Remove filter properties
const withoutFilters = parsed
  .filter(r => r.ok && r.property !== "filter")
  .map(r => ({ property: r.property!, value: r.value! }));

const result = generateAll(withoutFilters);
// → "color: red; background-color: blue; clip-path: circle(50%)"
```

---

### 7. Style Composition

```typescript
import { generateAll } from "b_value";

// Compose styles from multiple sources
function composeStyles(...sources: Array<{ property: string; value: CSSValue }[]>) {
  // Merge declarations (last one wins for duplicate properties)
  const merged = new Map<string, CSSValue>();
  
  for (const source of sources) {
    for (const { property, value } of source) {
      merged.set(property, value);
    }
  }
  
  return generateAll(
    Array.from(merged.entries()).map(([property, value]) => ({
      property,
      value
    }))
  );
}

const baseStyles = [
  { property: "color", value: { kind: "hex", value: "#000000" } }
];

const themeStyles = [
  { property: "background-color", value: { kind: "hex", value: "#FFFFFF" } }
];

const overrideStyles = [
  { property: "color", value: { kind: "hex", value: "#FF0000" } }  // Override base
];

const css = composeStyles(baseStyles, themeStyles, overrideStyles);
// → "color: #ff0000; background-color: #ffffff"
```

---

## 🎯 Implementation Details

### Internal Logic

```typescript
export function generateAll(
  declarations: Array<{ property: string; value: CSSValue }>,
  options?: { minify?: boolean }
): string {
  // Choose separator based on minify option
  const separator = options?.minify ? ';' : '; ';
  
  return declarations
    // Generate each declaration using generate()
    .map(({ property, value }) => generate(value, { property }))
    // Join with separator
    .join(separator);
}
```

**Key points**:
1. Reuses `generate()` for each declaration
2. Handles property name automatically
3. Simple join with configurable separator
4. No complex logic - just orchestration

---

### Error Handling

```typescript
// What if a value has unknown IR kind?
const declarations = [
  { property: "color", value: { kind: "unknown-kind" } as any }
];

try {
  const css = generateAll(declarations);
} catch (error) {
  console.error(error.message);  // "No generator found for IR kind: unknown-kind"
}

// Better: Validate before generating
import { isValidIR } from "b_value";

const validDeclarations = declarations.filter(({ value }) => isValidIR(value));
const css = generateAll(validDeclarations);
```

---

### Type Safety

```typescript
import type { CSSValue } from "b_value/types";

// TypeScript ensures value is a valid CSSValue
const declarations: Array<{ property: string; value: CSSValue }> = [
  { 
    property: "color", 
    value: { kind: "hex", value: "#FF0000" }  // ✅ Valid
  },
  { 
    property: "filter", 
    value: { kind: "filter-blur", amount: { value: 5, unit: "px" } }  // ✅ Valid
  },
  // {
  //   property: "unknown",
  //   value: { kind: "invalid" }  // ❌ TypeScript error
  // }
];

const css = generateAll(declarations);
```

---

## 🚀 Advanced Patterns

### Streaming Generation

```typescript
// For very large style sheets, generate incrementally
function* generateAllStream(
  declarations: Array<{ property: string; value: CSSValue }>
): Generator<string> {
  for (let i = 0; i < declarations.length; i++) {
    const { property, value } = declarations[i];
    const decl = generate(value, { property });
    
    if (i < declarations.length - 1) {
      yield decl + "; ";
    } else {
      yield decl;
    }
  }
}

// Usage
const stream = generateAllStream(largeDeclarationArray);
for (const chunk of stream) {
  writeToFile(chunk);
}
```

---

### Conditional Generation

```typescript
// Only generate declarations that pass certain conditions
function generateAllIf(
  declarations: Array<{ property: string; value: CSSValue }>,
  predicate: (property: string, value: CSSValue) => boolean
): string {
  return generateAll(
    declarations.filter(({ property, value }) => predicate(property, value))
  );
}

// Example: Only color properties
const onlyColors = generateAllIf(
  allDeclarations,
  (prop) => prop.includes("color")
);
```

---

## 📊 Comparison with Alternatives

### vs. Manual String Building

```typescript
// ❌ Manual (error-prone, no type safety)
const css = declarations
  .map(d => `${d.property}: ${d.value}`)  // What if value is object?
  .join("; ");

// ✅ generateAll (handles IR → CSS conversion)
const css = generateAll(declarations);
```

### vs. Individual generate() Calls

```typescript
// ❌ Verbose
const css1 = generate(value1, { property: "color" });
const css2 = generate(value2, { property: "width" });
const css = `${css1}; ${css2}`;

// ✅ Concise
const css = generateAll([
  { property: "color", value: value1 },
  { property: "width", value: value2 }
]);
```

---

## 🎯 Summary

**generateAll()** is a:
- **Batch generator** - handles multiple declarations at once
- **Inverse of parseAll()** - enables round-trip workflows
- **Simple orchestrator** - delegates to `generate()` for each value
- **Pipeline-friendly** - works great with `parseAll()`, b_short, etc.
- **Type-safe** - enforces valid CSSValue types

**Common patterns**:
1. Parse → Modify → Generate (round-trip)
2. Build styles programmatically
3. CSS-in-JS integration
4. Style composition/merging
5. Filtering/transforming styles

**Options**:
- `minify: true` - No spaces after semicolons (production builds)

Perfect for working with multiple CSS properties as a cohesive unit! 🚀
