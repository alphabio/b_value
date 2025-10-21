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

**CRITICAL DISCOVERY**: Two parser patterns exist in codebase!

**Pattern A - Unified Dispatchers (4 modules)**:
- `Parse.ClipPath.parse()` - Auto-detects shape type
- `Parse.Color.parse()` - Auto-detects color format
- `Parse.Filter.parse()` - Auto-detects filter function
- `Parse.Gradient.parse()` - Auto-detects gradient type

**Pattern B - Sub-parsers Only (10 modules)**:
- `Parse.Animation.Delay.parse()` - Specific property parser
- `Parse.Border.Width.parse()` - Specific property parser
- `Parse.Layout.Display.parse()` - Specific property parser
- (No unified entry point)

**Implication**: We need **two-tier routing**!

**Tasks**:
1. Create two-tier property map (unified + sub-parsers)
2. Identify all shorthand properties (~35-40)
3. Map shorthand → longhand for error messages
4. Create reverse map (IR kind → generator) (~120+ kinds)

**Files to create**:
```
src/property-map.ts          # Two-tier property → parser mapping
src/shorthand-properties.ts  # Shorthand detection & expansion map
src/ir-to-generator.ts       # IR kind → generator function (~120 kinds)
```

**Two-Tier Property Map Structure**:
```typescript
// Tier 1: Unified parsers (~15-20 properties)
export const UNIFIED_PARSERS: Record<string, UnifiedParser> = {
  // Color properties
  'color': Parse.Color,
  'background-color': Parse.Color,
  'border-color': Parse.Color,
  'border-top-color': Parse.Color,
  'border-right-color': Parse.Color,
  'border-bottom-color': Parse.Color,
  'border-left-color': Parse.Color,
  'outline-color': Parse.Color,
  'text-decoration-color': Parse.Color,
  
  // Gradient properties
  'background-image': Parse.Gradient,
  'border-image-source': Parse.Gradient,
  
  // Clip-path
  'clip-path': Parse.ClipPath,
  
  // Filter
  'filter': Parse.Filter,
  'backdrop-filter': Parse.Filter,
};

// Tier 2: Sub-parsers (~80-100 properties)
export const SUBPARSER_MAP: Record<string, SubParser> = {
  // Animation properties
  'animation-delay': Parse.Animation.Delay,
  'animation-duration': Parse.Animation.Duration,
  'animation-iteration-count': Parse.Animation.IterationCount,
  'animation-direction': Parse.Animation.Direction,
  'animation-fill-mode': Parse.Animation.FillMode,
  'animation-play-state': Parse.Animation.PlayState,
  'animation-name': Parse.Animation.Name,
  'animation-timing-function': Parse.Animation.TimingFunction,
  
  // Background properties
  'background-attachment': Parse.Background.Attachment,
  'background-clip': Parse.Background.Clip,
  'background-origin': Parse.Background.Origin,
  'background-repeat': Parse.Background.Repeat,
  'background-size': Parse.Background.Size,
  
  // Border properties
  'border-width': Parse.Border.Width,
  'border-top-width': Parse.Border.Width,
  'border-right-width': Parse.Border.Width,
  'border-bottom-width': Parse.Border.Width,
  'border-left-width': Parse.Border.Width,
  'border-style': Parse.Border.Style,
  'border-top-style': Parse.Border.Style,
  'border-right-style': Parse.Border.Style,
  'border-bottom-style': Parse.Border.Style,
  'border-left-style': Parse.Border.Style,
  'border-radius': Parse.Border.Radius,
  // ... border-*-radius variants
  
  // Layout properties
  'display': Parse.Layout.Display,
  'visibility': Parse.Layout.Visibility,
  'width': Parse.Layout.Width,
  'height': Parse.Layout.Height,
  // ... more layout props
  
  // Outline properties
  'outline-width': Parse.Outline.Width,
  'outline-style': Parse.Outline.Style,
  'outline-color': Parse.Outline.Color,
  'outline-offset': Parse.Outline.Offset,
  
  // Position properties
  'top': Parse.Position.parse,
  'right': Parse.Position.parse,
  'bottom': Parse.Position.parse,
  'left': Parse.Position.parse,
  
  // Shadow properties
  'box-shadow': Parse.Shadow.BoxShadow,
  'text-shadow': Parse.Shadow.TextShadow,
  
  // Text properties
  'text-decoration-line': Parse.Text.Line,
  'text-decoration-style': Parse.Text.Style,
  'text-decoration-thickness': Parse.Text.Thickness,
  
  // Transform properties
  'transform': Parse.Transform.parse,
  'transform-origin': Parse.Transform.Origin,
  
  // Transition properties
  'transition-delay': Parse.Transition.Delay,
  'transition-duration': Parse.Transition.Duration,
  'transition-property': Parse.Transition.Property,
  'transition-timing-function': Parse.Transition.TimingFunction,
};

// Routing helper
function routeToParser(property: string): Parser | null {
  // Check unified parsers first
  if (property in UNIFIED_PARSERS) {
    return UNIFIED_PARSERS[property];
  }
  
  // Check sub-parsers
  if (property in SUBPARSER_MAP) {
    return SUBPARSER_MAP[property];
  }
  
  return null;
}
```

**Complete Shorthand List (~35-40)**:
```typescript
export const SHORTHAND_PROPERTIES = new Set([
  // Spacing
  'margin', 'padding', 'inset',
  
  // Border
  'border', 'border-top', 'border-right', 'border-bottom', 'border-left',
  'border-width', 'border-style', 'border-color',
  'border-image', 'border-radius',
  
  // Background, Font, Text
  'background', 'font', 'text-decoration',
  
  // List, Outline
  'list-style', 'outline',
  
  // Flex & Grid
  'flex', 'flex-flow',
  'grid', 'grid-template', 'grid-area', 'grid-column', 'grid-row',
  'place-items', 'place-content', 'place-self', 'gap',
  
  // Animation, Transition
  'animation', 'transition',
  
  // Other
  'columns', 'column-rule', 'mask', 'offset',
]);

// Shorthand → longhand mapping (for helpful errors)
export const SHORTHAND_TO_LONGHAND: Record<string, string[]> = {
  'margin': ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
  'padding': ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
  'border': ['border-width', 'border-style', 'border-color'],
  'border-width': ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'],
  'border-style': ['border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style'],
  'border-color': ['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'],
  'background': ['background-color', 'background-image', 'background-position', 
                 'background-size', 'background-repeat', 'background-origin', 
                 'background-clip', 'background-attachment'],
  'animation': ['animation-name', 'animation-duration', 'animation-timing-function',
                'animation-delay', 'animation-iteration-count', 'animation-direction',
                'animation-fill-mode', 'animation-play-state'],
  'transition': ['transition-property', 'transition-duration', 'transition-timing-function', 'transition-delay'],
  'font': ['font-style', 'font-variant', 'font-weight', 'font-size', 'line-height', 'font-family'],
  'flex': ['flex-grow', 'flex-shrink', 'flex-basis'],
  'grid-template': ['grid-template-rows', 'grid-template-columns', 'grid-template-areas'],
  'gap': ['row-gap', 'column-gap'],
  // ... complete mapping
};
```

**IR to Generator Map (~120 IR kinds)**:
```typescript
// Map IR kind → generator function
export const IR_KIND_TO_GENERATOR: Record<string, GeneratorFunction> = {
  // Colors (12)
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
  'color': Generate.Color.Color.toCss,
  
  // Gradients (3)
  'radial': Generate.Gradient.Radial.toCss,
  'linear': Generate.Gradient.Linear.toCss,
  'conic': Generate.Gradient.Conic.toCss,
  
  // Clip-path (9)
  'clip-path-circle': Generate.ClipPath.Circle.toCss,
  'clip-path-ellipse': Generate.ClipPath.Ellipse.toCss,
  'clip-path-inset': Generate.ClipPath.Inset.toCss,
  'clip-path-polygon': Generate.ClipPath.Polygon.toCss,
  'clip-path-rect': Generate.ClipPath.Rect.toCss,
  'clip-path-xywh': Generate.ClipPath.Xywh.toCss,
  'clip-path-path': Generate.ClipPath.Path.toCss,
  'clip-path-geometry-box': Generate.ClipPath.GeometryBox.toCss,
  'clip-path-none': Generate.ClipPath.None.toCss,
  
  // Filters (11)
  'blur': Generate.Filter.Blur.toCss,
  'brightness': Generate.Filter.Brightness.toCss,
  'contrast': Generate.Filter.Contrast.toCss,
  'drop-shadow': Generate.Filter.DropShadow.toCss,
  'grayscale': Generate.Filter.Grayscale.toCss,
  'hue-rotate': Generate.Filter.HueRotate.toCss,
  'invert': Generate.Filter.Invert.toCss,
  'opacity': Generate.Filter.Opacity.toCss,
  'saturate': Generate.Filter.Saturate.toCss,
  'sepia': Generate.Filter.Sepia.toCss,
  'url': Generate.Filter.Url.toCss,
  
  // Animation (8)
  'animation-delay': Generate.Animation.Delay.toCss,
  'animation-duration': Generate.Animation.Duration.toCss,
  'animation-iteration-count': Generate.Animation.IterationCount.toCss,
  'animation-direction': Generate.Animation.Direction.toCss,
  'animation-fill-mode': Generate.Animation.FillMode.toCss,
  'animation-play-state': Generate.Animation.PlayState.toCss,
  'animation-name': Generate.Animation.Name.toCss,
  'animation-timing-function': Generate.Animation.TimingFunction.toCss,
  
  // Border (4)
  'border-width': Generate.Border.Width.toCss,
  'border-style': Generate.Border.Style.toCss,
  'border-color': Generate.Border.Color.toCss,
  'border-radius': Generate.Border.Radius.toCss,
  
  // Layout (14)
  'display': Generate.Layout.Display.toCss,
  'visibility': Generate.Layout.Visibility.toCss,
  'width': Generate.Layout.Width.toCss,
  'height': Generate.Layout.Height.toCss,
  'z-index': Generate.Layout.ZIndex.toCss,
  'cursor': Generate.Layout.Cursor.toCss,
  'overflow-x': Generate.Layout.OverflowX.toCss,
  'overflow-y': Generate.Layout.OverflowY.toCss,
  // ... more layout kinds
  
  // Outline (4)
  'outline-width': Generate.Outline.Width.toCss,
  'outline-style': Generate.Outline.Style.toCss,
  'outline-color': Generate.Outline.Color.toCss,
  'outline-offset': Generate.Outline.Offset.toCss,
  
  // Position (6)
  'top': Generate.Position.toCss,
  'right': Generate.Position.toCss,
  'bottom': Generate.Position.toCss,
  'left': Generate.Position.toCss,
  'center': Generate.Position.toCss,
  'position-property': Generate.Position.toCss,
  
  // Shadow (2)
  'box-shadow': Generate.Shadow.BoxShadow.toCss,
  'text-shadow': Generate.Shadow.TextShadow.toCss,
  
  // Transform (24 - matrix, translate, rotate, scale, skew, perspective)
  'matrix': Generate.Transform.Matrix.toCss,
  'matrix3d': Generate.Transform.Matrix3d.toCss,
  'translate': Generate.Transform.Translate.toCss,
  'translate3d': Generate.Transform.Translate3d.toCss,
  'translateX': Generate.Transform.TranslateX.toCss,
  'translateY': Generate.Transform.TranslateY.toCss,
  'translateZ': Generate.Transform.TranslateZ.toCss,
  'rotate': Generate.Transform.Rotate.toCss,
  'rotate3d': Generate.Transform.Rotate3d.toCss,
  'rotateX': Generate.Transform.RotateX.toCss,
  'rotateY': Generate.Transform.RotateY.toCss,
  'rotateZ': Generate.Transform.RotateZ.toCss,
  'scale': Generate.Transform.Scale.toCss,
  'scale3d': Generate.Transform.Scale3d.toCss,
  'scaleX': Generate.Transform.ScaleX.toCss,
  'scaleY': Generate.Transform.ScaleY.toCss,
  'scaleZ': Generate.Transform.ScaleZ.toCss,
  'skew': Generate.Transform.Skew.toCss,
  'skewX': Generate.Transform.SkewX.toCss,
  'skewY': Generate.Transform.SkewY.toCss,
  'perspective': Generate.Transform.Perspective.toCss,
  // ... function variants
  
  // Transition (4)
  'transition-delay': Generate.Transition.Delay.toCss,
  'transition-duration': Generate.Transition.Duration.toCss,
  'transition-property': Generate.Transition.Property.toCss,
  'transition-timing-function': Generate.Transition.TimingFunction.toCss,
  
  // Shared/Utility types
  'angle': Generate.Shared.Angle.toCss,
  'keyword': Generate.Shared.Keyword.toCss,
  'auto': Generate.Shared.Auto.toCss,
  // ... more utility kinds
};
```

**Note**: Complete list of 120+ IR kinds documented in `PHASE_0_AUDIT.md`

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
