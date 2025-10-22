# b_value

[![CI](https://github.com/alphabio/b_value/workflows/CI/badge.svg)](https://github.com/alphabio/b_value/actions)
[![npm version](https://badge.fury.io/js/b_value.svg)](https://badge.fury.io/js/b_value)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**Bidirectional CSS longhand property parser and generator**

Transform CSS declarations into structured TypeScript objects and back again. Perfect for CSS editors, design tools, linters, and style manipulation.

```typescript
// Parse any CSS longhand property
const result = parse("transform: rotate(45deg) scale(1.5)");
// → { ok: true, value: [{ kind: "rotate", angle: {...} }, { kind: "scale", ... }] }

// Modify and regenerate
result.value[0].angle.value = 90;
generate({ property: "transform", value: result.value });
// → "transform: rotate(90deg) scale(1.5)"
```

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Use Cases](#use-cases)
- [API Overview](#api-overview)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Features

### Why b_value?

CSS property values are notoriously complex to parse and manipulate. `b_value` makes it simple:

- **🔄 Bidirectional**: Parse CSS → IR → CSS with perfect round-trip fidelity
- **🎯 60+ Properties**: Colors, gradients, transforms, layouts, animations, and more
- **📦 Batch Operations**: Parse and generate multiple properties at once
- **🛡️ Type-Safe**: Full TypeScript support with Zod schemas
- **✅ Spec-Compliant**: Built on [css-tree](https://github.com/csstree/csstree)'s W3C-aligned parser
- **🌳 Tree-Shakeable**: Import only what you need
- **🧪 Battle-Tested**: 2,600+ tests with 86% coverage

### What Makes It Different?

Most CSS parsers only go **one direction** (CSS → Object). b_value is **bidirectional**:

1. **Parse** CSS declarations to structured TypeScript objects
2. **Modify** the objects programmatically
3. **Generate** valid CSS back from the modified objects

This enables powerful workflows like visual editors, style transformations, and code generation.

## Installation

```bash
npm install b_value
```

Or using other package managers:

```bash
yarn add b_value
pnpm add b_value
bun add b_value
```

## Quick Start

### Parse a Single Property

```typescript
import { parse } from "b_value";

// Parse any CSS longhand property
const result = parse("color: #ff0080");

if (result.ok) {
  console.log(result.property); // "color"
  console.log(result.value);    // { kind: "hex", r: 255, g: 0, b: 128 }
}
```

### Generate CSS from IR

```typescript
import { generate } from "b_value";

const css = generate({
  property: "color",
  value: { kind: "hex", value: "#ff0080" }
});

if (css.ok) {
  console.log(css.value); // "color: #ff0080"
}
```

### Parse Multiple Properties at Once

```typescript
import { parseAll, generateAll } from "b_value";

// Parse entire style blocks
const styles = parseAll("color: red; width: 100px; opacity: 0.5");

if (styles.ok) {
  // Modify values
  styles.value.color = { kind: "hex", value: "#0000ff" };
  styles.value.opacity = { kind: "opacity", value: 1.0 };

  // Generate CSS back
  const css = generateAll(styles.value);
  console.log(css); // "color: #0000ff; width: 100px; opacity: 1"
}
```

## Use Cases

### 🎨 Visual CSS Editors

Build interactive style editors where users can manipulate CSS properties visually:

```typescript
// User adjusts a color picker
const styles = parseAll(element.style.cssText);
styles.value.color = userSelectedColor;
element.style.cssText = generateAll(styles.value);
```

### 🔧 CSS Transformation Tools

Transform styles programmatically (e.g., theme generation, dark mode):

```typescript
// Convert all colors to dark mode variants
const styles = parseAll(css);
for (const [prop, value] of Object.entries(styles.value)) {
  if (typeof value === "object" && value.kind === "hex") {
    styles.value[prop] = darkenColor(value);
  }
}
```

### ✨ Code Generators

Generate CSS from design tokens or configuration:

```typescript
const tokens = { primary: "#ff0080", spacing: "1rem" };
const css = generateAll({
  color: { kind: "hex", value: tokens.primary },
  padding: { kind: "length", value: tokens.spacing }
});
```

### 🔍 CSS Linters & Formatters

Parse, validate, and auto-fix CSS properties:

```typescript
const result = parse("color: red");
if (!result.ok) {
  console.error(`Invalid color: ${result.issues[0].message}`);
}
```

## API Overview

### Single Property API

Parse and generate individual CSS properties with automatic routing:

```typescript
import { parse, generate } from "b_value";

// Parse ANY longhand property
const colorResult = parse("color: red");
const widthResult = parse("width: 100px");
const transformResult = parse("transform: rotate(45deg)");

if (colorResult.ok) {
  console.log(colorResult.property); // "color"
  console.log(colorResult.value);    // { kind: "named", name: "red" }
}

// Generate CSS from IR for ANY property
const css1 = generate({
  property: "color",
  value: { kind: "hex", value: "#FF0000" }
});
// Returns: { ok: true, value: "color: #FF0000", issues: [] }

const css2 = generate({
  property: "transform",
  value: [{ kind: "rotate", angle: { value: 45, unit: "deg" } }]
});
// Returns: { ok: true, value: "transform: rotate(45deg)", issues: [] }
```

**Features**:
- ✅ Auto-routes to correct parser/generator (60+ properties)
- ✅ Helpful errors for shorthand properties → use `b_short` library
- ✅ Type-safe with full TypeScript support
- ✅ Returns structured `ParseResult` / `GenerateResult`

---

### Batch API (Multiple Properties)

**NEW!** Parse and generate multiple properties at once - perfect for CSS editors:

```typescript
import { parseAll, generateAll } from "b_value";

// Parse entire style blocks
const result = parseAll("color: red; width: 100px; opacity: 0.5");

if (result.ok) {
  console.log(result.value);
  // {
  //   color: { kind: "named", name: "red" },
  //   width: { kind: "width", value: { value: 100, unit: "px" } },
  //   opacity: { kind: "opacity", value: 0.5 }
  // }
}

// Modify properties
result.value.color = { kind: "hex", value: "#0000FF" };

// Generate CSS back
const css = generateAll(result.value);
// "color: #0000FF; width: 100px; opacity: 0.5"
```

**Features**:
- ✅ **Single ParseResult** for entire block (one `ok` flag, one `issues` array)
- ✅ **Flat object structure** matches CSS mental model
- ✅ **Perfect round-trip**: `parseAll()` → modify → `generateAll()` → `parseAll()`
- ✅ **Error handling**: Invalid values returned as strings with error details
- ✅ **Duplicate detection**: Warnings for duplicate properties (last wins per CSS spec)
- ✅ **String passthrough**: Unknown values preserved as strings

**CSS Editor Use Case**:

```typescript
// User editing styles in UI
const styles = parseAll(userInput);

// Show validation errors
if (!styles.ok) {
  styles.issues.forEach(issue => {
    if (issue.severity === "error") {
      showError(issue.property, issue.message);
    }
  });
}

// User modifies a property
styles.value.width = { kind: "width", value: { value: 200, unit: "px" } };

// Regenerate CSS
const updatedCSS = generateAll(styles.value, { minify: false });
```

**Minification**:

```typescript
// Normal spacing (default)
generateAll({ color: "red", width: "100px" });
// "color: red; width: 100px"

// Minified
generateAll({ color: "red", width: "100px" }, { minify: true });
// "color:red;width:100px"
```

---

### Colors

```typescript
import { Parse, Generate } from "b_value";

// Parse hex colors
const hex = Parse.Color.Hex.parse("#ff0080");
// { kind: "hex", r: 255, g: 0, b: 128 }

// Parse RGB with alpha
const rgb = Parse.Color.RGB.parse("rgb(255 0 128 / 0.5)");
// { kind: "rgb", r: 255, g: 0, b: 128, alpha: 0.5 }

// Parse HSL with angle units
const hsl = Parse.Color.HSL.parse("hsl(330deg 100% 50%)");
// { kind: "hsl", h: 330, s: 100, l: 50 }

// Generate back to CSS
Generate.Color.Hex.toCss(hex.value);    // "#ff0080"
Generate.Color.RGB.toCss(rgb.value);    // "rgb(255 0 128 / 0.5)"
Generate.Color.HSL.toCss(hsl.value);    // "hsl(330 100% 50%)"
```

### Gradients

```typescript
import { Parse, Generate } from "b_value";

// Parse CSS → IR
const css = "radial-gradient(circle at center, red 0%, blue 100%)";
const result = Parse.Gradient.Radial.parse(css);

if (result.ok) {
  console.log(result.value);
  // {
  //   kind: "radial",
  //   shape: "circle",
  //   position: { horizontal: "center", vertical: "center" },
  //   colorStops: [
  //     { color: "red", position: { value: 0, unit: "%" } },
  //     { color: "blue", position: { value: 100, unit: "%" } }
  //   ],
  //   repeating: false
  // }

  // Generate IR → CSS
  const generated = Generate.Gradient.Radial.toCss(result.value);
  console.log(generated);
  // "radial-gradient(circle at center center, red 0%, blue 100%)"
}
```

### Clip-Path Values

```typescript
import { Parse, Generate } from "b_value";

// Parse basic shapes
const circle = Parse.ClipPath.Circle.parse("circle(50px at center)");
// { kind: "clip-path-circle", radius: { value: 50, unit: "px" }, position: {...} }

const polygon = Parse.ClipPath.Polygon.parse("polygon(50% 0%, 100% 100%, 0% 100%)");
// { kind: "clip-path-polygon", points: [{x: 50%, y: 0%}, {x: 100%, y: 100%}, {x: 0%, y: 100%}] }

const inset = Parse.ClipPath.Inset.parse("inset(10px round 5px)");
// { kind: "clip-path-inset", top: 10px, right: 10px, bottom: 10px, left: 10px, borderRadius: {...} }

// Generate back to CSS
Generate.ClipPath.Circle.toCss(circle.value);
// "circle(50px at center center)"

Generate.ClipPath.Polygon.toCss(polygon.value);
// "polygon(50% 0%, 100% 100%, 0% 100%)"
```

### Round-Trip Validation

```typescript
// Round-trip works for all parsers
const original = "polygon(50% 0%, 100% 100%, 0% 100%)";
const parsed = Parse.ClipPath.Polygon.parse(original);

if (parsed.ok) {
  const generated = Generate.ClipPath.Polygon.toCss(parsed.value);
  console.log(generated === original); // true - perfect round-trip
}
```

## Statistics

- **Properties supported**: 60+ CSS longhand properties
- **Universal API**: `parse()` and `generate()` for any property
- **Batch API**: `parseAll()` and `generateAll()` for multiple properties
- **Color formats**: 12 complete (hex, rgb, hsl, hwb, lab, lch, oklab, oklch, color(), named, system, special)
- **Gradient types**: 6 (linear, radial, conic × 2 variants)
- **Transform functions**: 20+ (all translate, scale, rotate, skew, matrix, perspective)
- **Basic shapes**: 4/5 complete (inset, circle, ellipse, polygon)
- **Total tests**: 2640 passing
- **Test coverage**: ~86%
- **Type safety**: 100% TypeScript strict mode

## Architecture

```
b_value/
├── core/              # Type definitions, units, keywords
│   ├── types/         # Zod schemas for CSS values
│   ├── units/         # Unit schemas (px, deg, %, etc.)
│   ├── keywords/      # CSS keyword schemas
│   └── result.ts      # Result<T,E> type
├── parse/             # CSS → IR parsers
│   ├── animation/     # Animation property parsers
│   ├── background/    # Background property parsers
│   ├── border/        # Border property parsers
│   ├── clip-path/     # Clip-path value parsers
│   ├── color/         # Color value parsers (12 formats)
│   ├── gradient/      # Gradient parsers (linear, radial, conic)
│   ├── layout/        # Layout property parsers
│   ├── outline/       # Outline property parsers
│   ├── position/      # Position value parsers
│   ├── shadow/        # Shadow value parsers
│   ├── text/          # Text property parsers
│   └── transform/     # Transform parsers
└── generate/          # IR → CSS generators
    ├── animation/     # Animation generators
    ├── background/    # Background generators
    ├── border/        # Border generators
    ├── clip-path/     # Clip-path generators
    ├── color/         # Color generators
    ├── gradient/      # Gradient generators
    ├── layout/        # Layout generators
    ├── outline/       # Outline generators
    ├── position/      # Position generators
    ├── shadow/        # Shadow generators
    ├── text/          # Text generators
    └── transform/     # Transform generators
```

## Current Support

### Animation Properties ✅
- animation-delay, animation-duration (time values)
- animation-iteration-count (numeric + infinite)
- animation-direction (4 keywords)
- animation-fill-mode (4 keywords)
- animation-play-state (2 keywords)
- animation-name (identifier)
- animation-timing-function (cubic-bezier, steps, linear, keywords)

**Status**: 8 properties complete, ~146 tests

### Color Values ✅
- **Hex colors**: #RGB, #RRGGBB, #RGBA, #RRGGBBAA (4/8 digit)
- **Named colors**: 148 CSS color keywords + transparent
- **RGB/RGBA**: Modern (`rgb(255 0 128 / 0.5)`) & legacy (`rgba(255, 0, 128, 0.5)`) syntax
- **HSL/HSLA**: All angle units (deg, grad, rad, turn), modern & legacy syntax
- **HWB**: Hue-Whiteness-Blackness (modern syntax)
- **LAB/LCH**: Perceptual color spaces with all units
- **OKLab/OKLCH**: Improved perceptual color spaces
- **color() function**: 9 color spaces (srgb, display-p3, rec2020, xyz, etc.)
- **System colors**: currentColor, transparent
- **Special keywords**: inherit, initial, unset, revert

**Status**: 12 color formats complete, ~350 tests

### Gradient Values ✅
- **Linear gradients**: All direction syntax (angle, to side-or-corner)
- **Radial gradients**: Shapes (circle, ellipse), sizes, positions
- **Conic gradients**: From angle, at position
- **Color stops**: All position syntaxes, multiple stops per color
- **Color interpolation**: All colorspaces (srgb, oklch, etc.) in modern syntax
- **Repeating variants**: All gradient types

**Status**: 3 gradient types × 2 variants = 6 total, ~200 tests

### Shadow Values ✅
- **box-shadow**: Inset, blur, spread, color, multiple shadows
- **text-shadow**: Offset, blur, color, multiple shadows

**Status**: 2 shadow properties complete, ~50 tests

### Border Properties ✅
- border-width (thin, medium, thick, `<length>`)
- border-style (11 style keywords)
- border-color (`<color>` values)
- border-radius (`<length-percentage>`, 1-4 values)

**Status**: 4 properties complete, ~80 tests

### Outline Properties ✅
- outline-width (thin, medium, thick, `<length>`)
- outline-style (auto + 10 style keywords)
- outline-color (`<color>` + invert keyword)
- outline-offset (`<length>`)

**Status**: 4 properties complete, ~80 tests

### Transform Values ✅
- transform-origin (1-3 values, keywords + lengths)
- **Transform functions**: All 20+ transform functions
  - Translate: translate(), translateX(), translateY(), translateZ(), translate3d()
  - Scale: scale(), scaleX(), scaleY(), scaleZ(), scale3d()
  - Rotate: rotate(), rotateX(), rotateY(), rotateZ(), rotate3d()
  - Skew: skew(), skewX(), skewY()
  - Matrix: matrix(), matrix3d()
  - Perspective: perspective()

**Status**: 1 property + 20 functions complete, ~150 tests

### Background Properties ✅
- background-color (`<color>`)
- background-position (`<position>`)
- background-size (keywords + `<length-percentage>`)
- background-repeat (repeat-style keywords)
- background-attachment (scroll, fixed, local)

**Status**: 5 properties complete, ~90 tests

### Text Properties ✅
- text-align (7 alignment keywords)
- text-decoration-line (underline, overline, line-through, none)
- text-decoration-style (5 style keywords)
- text-decoration-color (`<color>`)

**Status**: 4 properties complete, ~60 tests

### Layout Properties ✅
- **Display**: 31 display keywords (block, flex, grid, inline-flex, etc.)
- **Visibility**: visible, hidden, collapse
- **Opacity**: <number> | <percentage>
- **Position**: static, relative, absolute, fixed, sticky
- **Z-index**: <integer> | auto
- **Overflow**: overflow-x, overflow-y (5 keywords each)
- **Cursor**: 35 cursor keywords (pointer, default, text, move, etc.)
- **Box sizing**: width, height (intrinsic sizing: min-content, max-content, fit-content)
- **Inset properties**: top, right, bottom, left (<length-percentage> | auto)

**Status**: 14 properties complete, ~160 tests

### Clip-Path Values 🔵 In Progress
- **URL references**: url(#clipPath)
- **Geometry box**: 7 keywords (border-box, padding-box, content-box, etc.)
- **Basic shapes**:
  - ✅ inset() - Rectangle with optional rounded corners
  - ✅ circle() - Circle with optional radius and position
  - ✅ ellipse() - Ellipse with two radii and position
  - ✅ polygon() - Polygon with optional fill-rule and point list
  - 🔵 path() - SVG path data (next)
- **none keyword**

**Status**: 6/9 sessions complete (~67%), 223 tests

### Infrastructure ✅
- **Core types**: LengthPercentage, Angle, Position2D, Time, Number
- **Unit schemas**: px, em, rem, %, deg, grad, rad, turn, s, ms
- **Keyword validation**: All CSS keywords typed and validated
- **Result type**: Type-safe Result<T, E> for error handling
- **Round-trip testing**: All parsers validate bidirectional conversion
- **Tree-shakeable exports**: Import only what you need

**Status**: Complete, ~2176 total tests

## API

### Parse

```typescript
import { Parse } from "b_value";

// Returns Result<RadialGradient, string>
const result = Parse.Gradient.Radial.parse(cssString);
```

### Generate

```typescript
import { Generate } from "b_value";

// Returns CSS string
const css = Generate.Gradient.Radial.toCss(irObject);
```

### Types

```typescript
import { Core } from "b_value";

// Access all Zod schemas and TypeScript types
type RadialGradient = Core.Type.RadialGradient;
type Position2D = Core.Type.Position2D;
type ColorStop = Core.Type.ColorStop;
```

## Development

```bash
# Install dependencies
pnpm install

# Type check
pnpm typecheck

# Lint & format
pnpm lint
pnpm format

# Run all checks
just check

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage
```

## Examples

### Working with Colors

```typescript
import { parse, generate } from "b_value";

// Parse hex color
const hex = parse("color: #ff0080");
// { kind: "hex", r: 255, g: 0, b: 128 }

// Parse RGB with alpha
const rgb = parse("color: rgb(255 0 128 / 0.5)");
// { kind: "rgb", r: 255, g: 0, b: 128, alpha: 0.5 }

// Convert between formats
generate({ property: "color", value: { kind: "hsl", h: 330, s: 100, l: 50 } });
// "color: hsl(330 100% 50%)"
```

### Working with Transforms

```typescript
// Parse complex transforms
const result = parse("transform: rotate(45deg) scale(1.5) translateX(20px)");

// Modify individual transforms
result.value[0].angle.value = 90; // Change rotation

// Generate updated CSS
generate({ property: "transform", value: result.value });
// "transform: rotate(90deg) scale(1.5) translateX(20px)"
```

### Working with Gradients

```typescript
// Parse radial gradient
const gradient = parse("background-image: radial-gradient(circle at center, red, blue)");

// Access gradient data
gradient.value.shape; // "circle"
gradient.value.position; // { kind: "keyword-pair", x: "center", y: "center" }
gradient.value.colorStops; // [{ color: {...}, position: undefined }, ...]
```

### Batch Operations for CSS Editors

```typescript
import { parseAll, generateAll } from "b_value";

// User's current styles
const userCSS = "color: red; font-size: 16px; margin: 0";

// Parse all properties
const styles = parseAll(userCSS);

if (styles.ok) {
  // Update properties via UI
  styles.value.color = { kind: "hex", value: "#0000ff" };
  styles.value["font-size"] = { kind: "length", value: { value: 18, unit: "px" } };

  // Generate updated CSS
  const updatedCSS = generateAll(styles.value);
  console.log(updatedCSS);
  // "color: #0000ff; font-size: 18px; margin: 0"
}
```

### Error Handling

```typescript
const result = parse("color: not-a-valid-color");

if (!result.ok) {
  console.error("Parse failed:");
  result.issues.forEach(issue => {
    console.log(`  ${issue.severity}: ${issue.message}`);
    console.log(`  Code: ${issue.code}`);
  });
}
```

## Important: Longhand Properties Only

**b_value handles LONGHAND properties only**, not shorthand properties.

```typescript
// ✅ SUPPORTED (longhand)
parse("color: red")
parse("background-color: blue")
parse("margin-top: 10px")
parse("border-top-width: 2px")

// ❌ NOT SUPPORTED (shorthand)
parse("background: blue url(...)") // Use b_short library
parse("margin: 10px 20px")         // Use b_short library
parse("border: 1px solid red")     // Use b_short library
```

For shorthand property expansion, use the companion library **[b_short](https://github.com/alphabio/b_short)**.

## Why Bidirectional?

Most CSS parsers only parse **CSS → Object**. b_value supports **CSS ⇄ Object**:

- **Visual Editors**: Parse styles, modify via UI, generate CSS back
- **Code Generation**: Transform design tokens → CSS
- **Linting & Auto-fixing**: Parse → normalize → re-emit
- **Style Transformations**: Modify styles programmatically (theming, dark mode)
- **Round-trip Safety**: Validate transformations preserve semantics

## Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup

```bash
# Install dependencies
pnpm install

# Run all checks (format, lint, typecheck)
just check

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Watch mode for development
pnpm test:watch
```

### Project Structure

```
b_value/
├── src/
│   ├── parse/           # Property parsers
│   ├── generate/        # Property generators
│   ├── core/            # Core types and utilities
│   ├── universal.ts     # Universal parse/generate API
│   └── universal-batch.ts # Batch parseAll/generateAll API
├── test/                # Integration tests
└── docs/                # API documentation
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Adding a New Property

1. Create parser in `src/parse/<module>/<property>.ts`
2. Create generator in `src/generate/<module>/<property>.ts`
3. Add tests for both
4. Register in `src/universal.ts`
5. Update documentation

## Related Projects

- **[b_short](https://github.com/alphabio/b_short)** - CSS shorthand property expansion
- **[css-tree](https://github.com/csstree/csstree)** - CSS parser used internally
- **[b_gee](https://github.com/alphabio/b_gee)** - Original project (b_value was extracted for reusability)

## License

MIT © b_value contributors

See [LICENSE](LICENSE) for details.
