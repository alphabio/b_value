# Master Plan: Universal Parse & Generate API

**Created**: 2025-10-21T02:06  
**Goal**: Natural CSS declaration API for parse and generate  
**Estimate**: 14-17 hours (~2 days)

---

## 🎯 Vision

### Current State (Module-based)
```typescript
// Parse - must know which module
const color = Parse.Color.parse("#ff0000");
const gradient = Parse.Gradient.parse("radial-gradient(red, blue)");

// Generate - must know which module
const css1 = Generate.Color.Hex.toCss(color.value);
const css2 = Generate.Gradient.Radial.toCss(gradient.value);
```

**Problems**:
- User must memorize 13 modules
- No connection between property names and modules
- Round-trip requires knowing both parse and generate modules
- Not natural CSS workflow

---

## ✅ New State (Declaration-based)

### Parse API

```typescript
// Parse CSS declarations naturally
const result = parse("color: #ff0000");
// → { ok: true, property: "color", value: { kind: "hex", ... }, issues: [] }

const result2 = parse("background-image: radial-gradient(red, blue)");
// → { ok: true, property: "background-image", value: { kind: "radial", ... }, issues: [] }

// Batch parse
const results = parseAll(`
  clip-path: circle(50%);
  color: #ff0000;
  filter: blur(5px);
`);
// → [{ ok: true, ... }, { ok: true, ... }, { ok: true, ... }]
```

### Generate API

```typescript
// Generate from IR - auto-detects format
const css = generate(value);
// → "radial-gradient(circle, red, blue)"

// Generate with property (for declaration)
const decl = generate(value, { property: "background-image" });
// → "background-image: radial-gradient(circle, red, blue)"

// Batch generate
const declarations = generateAll([
  { property: "color", value: colorIR },
  { property: "clip-path", value: clipPathIR }
]);
// → "color: #ff0000; clip-path: circle(50%)"
```

### Round-Trip Workflow

```typescript
// 1. Parse declaration
const parsed = parse("color: #ff0000");
if (!parsed.ok) throw new Error(parsed.issues[0].message);

// 2. Modify IR
const modified = { ...parsed.value, r: 0, g: 255, b: 0 };  // Change to green

// 3. Generate back
const css = generate(modified, { property: parsed.property });
// → "color: #00ff00"

// 4. Round-trip test
const reparsed = parse(css);
expect(reparsed.value).toEqual(modified);  // ✅ Perfect round-trip
```

---

## 🏗️ Architecture

### Type System

```typescript
// Parse result (shared with current design discussion)
type ParseResult = {
  ok: boolean
  value?: CSSValue           // IR object when ok=true
  property?: string          // Property name from declaration
  issues: Issue[]            // Always present, may be empty
}

type Issue = {
  severity: 'error' | 'warning' | 'info'
  message: string
  suggestion?: string        // "Did you mean...?"
  action?: string            // "Use b_short.expand() first"
}

// Generate options
type GenerateOptions = {
  property?: string          // If provided, output full declaration
  minify?: boolean           // Compact output (future)
  format?: 'modern' | 'legacy'  // CSS syntax version (future)
}

// All IR types (union of all value types)
type CSSValue = 
  | HexColor | RGBColor | HSLColor | /* ...all color types */
  | RadialGradient | LinearGradient | ConicGradient
  | ClipPathCircle | ClipPathPolygon | /* ...all clip-path types */
  | FilterBlur | FilterContrast | /* ...all filter types */
  | /* ...all other value types */
```

---

## 📋 Implementation Plan

### Phase 1: Property Mapping (3-4h)

**Goal**: Map CSS properties to parse/generate modules

**Tasks**:
1. Create comprehensive property map
2. Identify all shorthand properties
3. Map shorthand → longhand for error messages
4. Create reverse map (IR kind → generator)

**Files to create**:
```
src/property-map.ts          # Property → module mapping
src/shorthand-properties.ts  # Shorthand detection & expansion map
src/ir-to-generator.ts       # IR kind → generator function
```

**Property Map Structure**:
```typescript
// Map property → parser module
export const PROPERTY_TO_PARSER: Record<string, ParserModule> = {
  // Color properties
  'color': Parse.Color,
  'background-color': Parse.Color,
  'border-color': Parse.Color,
  'border-top-color': Parse.Color,
  'border-right-color': Parse.Color,
  'border-bottom-color': Parse.Color,
  'border-left-color': Parse.Color,
  'outline-color': Parse.Color,
  'text-decoration-color': Parse.Text.Color,
  
  // Gradient properties
  'background-image': Parse.Gradient,
  'border-image-source': Parse.Gradient,
  
  // Clip-path
  'clip-path': Parse.ClipPath,
  
  // Filter
  'filter': Parse.Filter,
  'backdrop-filter': Parse.Filter,
  
  // ... ~100+ more properties
};

// Shorthand properties we reject
export const SHORTHAND_PROPERTIES = new Set([
  'margin', 'padding', 'border', 'border-width', 'border-style', 'border-color',
  'background', 'font', 'animation', 'transition', 'flex', 'grid',
  'gap', 'place-items', 'place-content', 'place-self',
  // ... complete list
]);

// Shorthand → longhand mapping
export const SHORTHAND_TO_LONGHAND: Record<string, string[]> = {
  'margin': ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
  'padding': ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
  'border': ['border-width', 'border-style', 'border-color'],
  'background': ['background-color', 'background-image', 'background-position', 
                 'background-size', 'background-repeat', 'background-origin', 
                 'background-clip', 'background-attachment'],
  // ... complete list
};
```

**IR to Generator Map**:
```typescript
// Map IR kind → generator function
export const IR_KIND_TO_GENERATOR: Record<string, GeneratorFunction> = {
  // Colors
  'hex': Generate.Color.Hex.toCss,
  'rgb': Generate.Color.RGB.toCss,
  'hsl': Generate.Color.HSL.toCss,
  'hwb': Generate.Color.HWB.toCss,
  'lab': Generate.Color.LAB.toCss,
  'lch': Generate.Color.LCH.toCss,
  'oklab': Generate.Color.OKLab.toCss,
  'oklch': Generate.Color.OKLCH.toCss,
  'named': Generate.Color.Named.toCss,
  'system': Generate.Color.System.toCss,
  'special': Generate.Color.Special.toCss,
  
  // Gradients
  'radial': Generate.Gradient.Radial.toCss,
  'linear': Generate.Gradient.Linear.toCss,
  'conic': Generate.Gradient.Conic.toCss,
  
  // Clip-path
  'clip-path-circle': Generate.ClipPath.Circle.toCss,
  'clip-path-ellipse': Generate.ClipPath.Ellipse.toCss,
  'clip-path-inset': Generate.ClipPath.Inset.toCss,
  'clip-path-polygon': Generate.ClipPath.Polygon.toCss,
  'clip-path-rect': Generate.ClipPath.Rect.toCss,
  'clip-path-xywh': Generate.ClipPath.Xywh.toCss,
  
  // Filters
  'filter-blur': Generate.Filter.Blur.toCss,
  'filter-brightness': Generate.Filter.Brightness.toCss,
  'filter-contrast': Generate.Filter.Contrast.toCss,
  // ... all filter types
  
  // ... all other IR kinds
};
```

**Tests**:
```typescript
describe("property-map", () => {
  it("maps all color properties to Parse.Color", () => {
    expect(PROPERTY_TO_PARSER['color']).toBe(Parse.Color);
    expect(PROPERTY_TO_PARSER['background-color']).toBe(Parse.Color);
  });
  
  it("identifies shorthand properties", () => {
    expect(SHORTHAND_PROPERTIES.has('margin')).toBe(true);
    expect(SHORTHAND_PROPERTIES.has('margin-top')).toBe(false);
  });
  
  it("maps IR kinds to generators", () => {
    expect(IR_KIND_TO_GENERATOR['hex']).toBe(Generate.Color.Hex.toCss);
    expect(IR_KIND_TO_GENERATOR['radial']).toBe(Generate.Gradient.Radial.toCss);
  });
});
```

---

### Phase 2: Parse API (6-7h)

**Goal**: Implement `parse()` and `parseAll()`

**Tasks**:
1. Implement declaration parsing (split on colon)
2. Route to appropriate parser module
3. Shorthand rejection with helpful errors
4. Unknown property detection
5. Format validation
6. Comprehensive error handling
7. `parseAll()` batch parser

**Files to create**:
```
src/parse.ts          # Main parse() function
src/parse.test.ts     # Tests for parse API
```

**Implementation**:
```typescript
// src/parse.ts

import { PROPERTY_TO_PARSER, SHORTHAND_PROPERTIES, SHORTHAND_TO_LONGHAND } from './property-map';
import type { ParseResult, CSSValue, Issue } from './types';

/**
 * Parse a CSS longhand declaration
 * 
 * @param input - CSS declaration: "property: value"
 * @returns Parse result with value or issues
 * 
 * @example
 * ```typescript
 * const result = parse("color: #ff0000");
 * if (result.ok) {
 *   console.log(result.value);  // { kind: "hex", value: "#FF0000" }
 * }
 * ```
 */
export function parse(input: string): ParseResult {
  // Validate format
  const colonIndex = input.indexOf(':');
  if (colonIndex === -1) {
    return {
      ok: false,
      issues: [{
        severity: 'error',
        message: 'Invalid format. Expected "property: value"',
        suggestion: 'Example: "color: red"'
      }]
    };
  }
  
  const property = input.slice(0, colonIndex).trim();
  const value = input.slice(colonIndex + 1).trim();
  
  // Check for empty property or value
  if (!property) {
    return {
      ok: false,
      issues: [{
        severity: 'error',
        message: 'Missing property name',
        suggestion: 'Example: "color: red"'
      }]
    };
  }
  
  if (!value) {
    return {
      ok: false,
      property,
      issues: [{
        severity: 'error',
        message: `Missing value for property "${property}"`,
        suggestion: `Example: "${property}: <value>"`
      }]
    };
  }
  
  // Check if shorthand property
  if (SHORTHAND_PROPERTIES.has(property)) {
    const longhand = SHORTHAND_TO_LONGHAND[property];
    return {
      ok: false,
      property,
      issues: [{
        severity: 'error',
        message: `Shorthand property "${property}" not supported`,
        suggestion: longhand 
          ? `Use longhand: ${longhand.join(', ')}`
          : 'Use longhand properties instead',
        action: longhand
          ? `import { expand } from "b_short";\nconst result = expand("${input}");`
          : undefined
      }]
    };
  }
  
  // Get parser module
  const parser = PROPERTY_TO_PARSER[property];
  if (!parser) {
    const similar = findSimilarProperty(property);
    return {
      ok: false,
      property,
      issues: [{
        severity: 'error',
        message: `Unknown property: ${property}`,
        suggestion: similar ? `Did you mean "${similar}"?` : undefined
      }]
    };
  }
  
  // Parse value
  const result = parser.parse(value);
  
  if (result.ok) {
    return {
      ok: true,
      property,
      value: result.value,
      issues: []
    };
  }
  
  return {
    ok: false,
    property,
    issues: [{
      severity: 'error',
      message: result.error
    }]
  };
}

/**
 * Parse multiple CSS declarations
 * 
 * @param css - CSS string with semicolon-separated declarations
 * @returns Array of parse results
 * 
 * @example
 * ```typescript
 * const results = parseAll("color: red; background: blue");
 * // → [{ ok: true, ... }, { ok: false, ... }]
 * ```
 */
export function parseAll(css: string): ParseResult[] {
  return css
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(parse);
}

// Helper: Find similar property name (fuzzy match)
function findSimilarProperty(input: string): string | undefined {
  const properties = Object.keys(PROPERTY_TO_PARSER);
  
  // Exact match (case insensitive)
  const exactMatch = properties.find(p => p.toLowerCase() === input.toLowerCase());
  if (exactMatch) return exactMatch;
  
  // Levenshtein distance (simple version)
  const matches = properties
    .map(p => ({ prop: p, dist: levenshtein(input.toLowerCase(), p.toLowerCase()) }))
    .filter(m => m.dist <= 3)  // Max 3 edits
    .sort((a, b) => a.dist - b.dist);
  
  return matches[0]?.prop;
}

// Simple Levenshtein distance
function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[b.length][a.length];
}
```

**Tests**:
```typescript
// src/parse.test.ts

import { describe, expect, it } from "vitest";
import { parse, parseAll } from "./parse";

describe("parse()", () => {
  describe("valid declarations", () => {
    it("parses color property", () => {
      const result = parse("color: #ff0000");
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.property).toBe("color");
        expect(result.value.kind).toBe("hex");
        expect(result.issues).toEqual([]);
      }
    });
    
    it("parses background-image gradient", () => {
      const result = parse("background-image: radial-gradient(red, blue)");
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.property).toBe("background-image");
        expect(result.value.kind).toBe("radial");
      }
    });
    
    it("parses clip-path", () => {
      const result = parse("clip-path: circle(50%)");
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.property).toBe("clip-path");
        expect(result.value.kind).toBe("clip-path-circle");
      }
    });
    
    it("parses filter", () => {
      const result = parse("filter: blur(5px)");
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.property).toBe("filter");
        expect(result.value.kind).toBe("filter-blur");
      }
    });
  });
  
  describe("error handling", () => {
    it("rejects missing colon", () => {
      const result = parse("color red");
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.issues[0].severity).toBe("error");
        expect(result.issues[0].message).toContain("Invalid format");
      }
    });
    
    it("rejects shorthand properties", () => {
      const result = parse("margin: 10px 20px");
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.property).toBe("margin");
        expect(result.issues[0].message).toContain("Shorthand property");
        expect(result.issues[0].suggestion).toContain("margin-top");
        expect(result.issues[0].action).toContain("b_short");
      }
    });
    
    it("rejects unknown properties", () => {
      const result = parse("unknown-prop: value");
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.issues[0].message).toContain("Unknown property");
      }
    });
    
    it("suggests similar property names", () => {
      const result = parse("colr: red");  // Typo
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.issues[0].suggestion).toContain("color");
      }
    });
    
    it("rejects empty value", () => {
      const result = parse("color: ");
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.property).toBe("color");
        expect(result.issues[0].message).toContain("Missing value");
      }
    });
    
    it("rejects invalid value", () => {
      const result = parse("color: not-a-color");
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.property).toBe("color");
      }
    });
  });
});

describe("parseAll()", () => {
  it("parses multiple declarations", () => {
    const results = parseAll(`
      color: #ff0000;
      clip-path: circle(50%);
      filter: blur(5px)
    `);
    
    expect(results).toHaveLength(3);
    expect(results.every(r => r.ok)).toBe(true);
  });
  
  it("handles mix of valid and invalid", () => {
    const results = parseAll("color: red; margin: 10px; clip-path: circle(50%)");
    
    expect(results).toHaveLength(3);
    expect(results[0].ok).toBe(true);   // color
    expect(results[1].ok).toBe(false);  // margin (shorthand)
    expect(results[2].ok).toBe(true);   // clip-path
  });
  
  it("ignores empty declarations", () => {
    const results = parseAll("color: red;; ; clip-path: circle(50%)");
    expect(results).toHaveLength(2);
  });
});
```

---

### Phase 3: Generate API (4-5h)

**Goal**: Implement `generate()` and `generateAll()`

**Tasks**:
1. Auto-detect IR kind and route to generator
2. Support value-only generation
3. Support full declaration generation
4. Batch generation
5. Comprehensive tests

**Files to create**:
```
src/generate.ts          # Main generate() function
src/generate.test.ts     # Tests for generate API
```

**Implementation**:
```typescript
// src/generate.ts

import { IR_KIND_TO_GENERATOR } from './ir-to-generator';
import type { CSSValue, GenerateOptions } from './types';

/**
 * Generate CSS from IR
 * 
 * @param value - IR object to convert to CSS
 * @param options - Generation options
 * @returns CSS string (value or full declaration)
 * 
 * @example
 * ```typescript
 * // Generate value only
 * const css = generate({ kind: "hex", value: "#FF0000" });
 * // → "#FF0000"
 * 
 * // Generate full declaration
 * const decl = generate({ kind: "hex", value: "#FF0000" }, { property: "color" });
 * // → "color: #FF0000"
 * ```
 */
export function generate(value: CSSValue, options?: GenerateOptions): string {
  // Get generator function based on IR kind
  const generator = IR_KIND_TO_GENERATOR[value.kind];
  
  if (!generator) {
    throw new Error(`No generator found for IR kind: ${value.kind}`);
  }
  
  // Generate CSS value
  const css = generator(value);
  
  // Return full declaration if property provided
  if (options?.property) {
    return `${options.property}: ${css}`;
  }
  
  return css;
}

/**
 * Generate CSS declarations from multiple IR objects
 * 
 * @param declarations - Array of property-value pairs
 * @param options - Generation options
 * @returns CSS string with semicolon-separated declarations
 * 
 * @example
 * ```typescript
 * const css = generateAll([
 *   { property: "color", value: colorIR },
 *   { property: "clip-path", value: clipPathIR }
 * ]);
 * // → "color: #ff0000; clip-path: circle(50%)"
 * ```
 */
export function generateAll(
  declarations: Array<{ property: string; value: CSSValue }>,
  options?: { minify?: boolean }
): string {
  const separator = options?.minify ? ';' : '; ';
  
  return declarations
    .map(({ property, value }) => generate(value, { property }))
    .join(separator);
}

/**
 * Type guard to check if value has a valid IR kind
 */
export function isValidIR(value: unknown): value is CSSValue {
  if (!value || typeof value !== 'object') return false;
  const kind = (value as any).kind;
  return typeof kind === 'string' && kind in IR_KIND_TO_GENERATOR;
}
```

**Tests**:
```typescript
// src/generate.test.ts

import { describe, expect, it } from "vitest";
import { generate, generateAll } from "./generate";
import type { HexColor, RadialGradient } from "./core/types";

describe("generate()", () => {
  describe("value generation", () => {
    it("generates hex color", () => {
      const ir: HexColor = { kind: "hex", value: "#FF0000" };
      const css = generate(ir);
      expect(css).toBe("#FF0000");
    });
    
    it("generates radial gradient", () => {
      const ir: RadialGradient = {
        kind: "radial",
        shape: "circle",
        colorStops: [
          { color: { kind: "named", name: "red" } },
          { color: { kind: "named", name: "blue" } }
        ],
        repeating: false
      };
      const css = generate(ir);
      expect(css).toContain("radial-gradient");
      expect(css).toContain("circle");
    });
  });
  
  describe("declaration generation", () => {
    it("generates full declaration", () => {
      const ir: HexColor = { kind: "hex", value: "#FF0000" };
      const css = generate(ir, { property: "color" });
      expect(css).toBe("color: #FF0000");
    });
    
    it("generates declaration with gradient", () => {
      const ir: RadialGradient = {
        kind: "radial",
        colorStops: [
          { color: { kind: "named", name: "red" } },
          { color: { kind: "named", name: "blue" } }
        ],
        repeating: false
      };
      const css = generate(ir, { property: "background-image" });
      expect(css).toContain("background-image: radial-gradient");
    });
  });
  
  describe("error handling", () => {
    it("throws on unknown IR kind", () => {
      const invalidIR = { kind: "unknown-kind" } as any;
      expect(() => generate(invalidIR)).toThrow("No generator found");
    });
  });
});

describe("generateAll()", () => {
  it("generates multiple declarations", () => {
    const declarations = [
      { 
        property: "color", 
        value: { kind: "hex", value: "#FF0000" } as HexColor 
      },
      { 
        property: "background-color", 
        value: { kind: "hex", value: "#0000FF" } as HexColor 
      }
    ];
    
    const css = generateAll(declarations);
    expect(css).toBe("color: #FF0000; background-color: #0000FF");
  });
  
  it("supports minified output", () => {
    const declarations = [
      { property: "color", value: { kind: "hex", value: "#FF0000" } as HexColor },
      { property: "background-color", value: { kind: "hex", value: "#0000FF" } as HexColor }
    ];
    
    const css = generateAll(declarations, { minify: true });
    expect(css).toBe("color: #FF0000;background-color: #0000FF");
  });
});
```

---

### Phase 4: Round-Trip Tests (1-2h)

**Goal**: Verify parse → generate → parse produces identical results

**Files to create**:
```
test/round-trip/parse-generate.test.ts
```

**Tests**:
```typescript
// test/round-trip/parse-generate.test.ts

import { describe, expect, it } from "vitest";
import { parse } from "@/parse";
import { generate } from "@/generate";

describe("round-trip: parse → generate → parse", () => {
  const testCases = [
    "color: #ff0000",
    "background-color: rgb(255 0 0)",
    "color: hsl(0 100% 50%)",
    "background-image: radial-gradient(circle, red, blue)",
    "background-image: linear-gradient(to right, red, blue)",
    "clip-path: circle(50%)",
    "clip-path: polygon(0 0, 100% 0, 100% 100%)",
    "filter: blur(5px)",
    "filter: contrast(200%)",
  ];
  
  for (const declaration of testCases) {
    it(`round-trips: ${declaration}`, () => {
      // Parse
      const parsed1 = parse(declaration);
      expect(parsed1.ok).toBe(true);
      if (!parsed1.ok) return;
      
      // Generate
      const generated = generate(parsed1.value, { property: parsed1.property });
      
      // Parse again
      const parsed2 = parse(generated);
      expect(parsed2.ok).toBe(true);
      if (!parsed2.ok) return;
      
      // Values should be identical
      expect(parsed2.value).toEqual(parsed1.value);
      expect(parsed2.property).toBe(parsed1.property);
    });
  }
  
  it("round-trips modified values", () => {
    // Parse
    const parsed = parse("color: #ff0000");
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    
    // Modify
    const modified = { ...parsed.value, value: "#00FF00" };
    
    // Generate
    const css = generate(modified, { property: parsed.property });
    expect(css).toBe("color: #00FF00");
    
    // Parse modified
    const reparsed = parse(css);
    expect(reparsed.ok).toBe(true);
    if (!reparsed.ok) return;
    
    expect(reparsed.value).toEqual(modified);
  });
});
```

---

### Phase 5: Documentation (2h)

**Tasks**:
1. Update README with new API
2. Add migration guide
3. Document integration with b_short
4. Add JSDoc comments
5. Create examples

**Files to update**:
```
README.md                    # Main docs
docs/api/parse.md           # Parse API reference
docs/api/generate.md        # Generate API reference
docs/guides/migration.md    # Migration from module API
docs/guides/b_short.md      # Integration guide
```

---

## 📊 Summary

### What We're Building

**Two complementary APIs**:

1. **Parse API**: CSS declarations → IR
   - `parse("property: value")` - single declaration
   - `parseAll("prop1: val1; prop2: val2")` - batch
   - Rejects shorthands with helpful errors
   - No heuristic value parsing (too ambiguous)

2. **Generate API**: IR → CSS
   - `generate(ir)` - value only
   - `generate(ir, {property})` - full declaration
   - `generateAll([{property, value}])` - batch

### Key Design Decisions

✅ **Declaration-based parsing** - natural CSS syntax  
✅ **Reject shorthands** - deterministic, points to b_short  
✅ **No value heuristics** - too ambiguous, explicit is better  
✅ **Simplified ParseResult** - `{ok, value?, property?, issues}`  
✅ **Auto-detect generation** - IR kind → generator  
✅ **Perfect round-trips** - parse → modify → generate → parse  

### Time Estimate

| Phase | Hours |
|-------|-------|
| Phase 1: Property Mapping | 3-4h |
| Phase 2: Parse API | 6-7h |
| Phase 3: Generate API | 4-5h |
| Phase 4: Round-Trip Tests | 1-2h |
| Phase 5: Documentation | 2h |
| **Total** | **16-20h** |

Realistically: **~2 days** of focused work

---

## 🎯 Success Criteria

- [ ] All existing tests pass (2390 tests)
- [ ] Parse API tests pass (50+ new tests)
- [ ] Generate API tests pass (30+ new tests)
- [ ] Round-trip tests pass (20+ test cases)
- [ ] Documentation complete
- [ ] `just check && just test` passes
- [ ] Zero breaking changes to existing module API
- [ ] Both APIs coexist (module API deprecated but working)

---

## 🚀 Next Steps

1. Review this plan
2. Start with Phase 1 (property mapping)
3. Implement incrementally with tests at each phase
4. Keep existing API working throughout
5. Document as we go

Ready to start? 🎯
