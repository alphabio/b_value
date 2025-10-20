# b_value

[![CI](https://github.com/alphabio/b_value/workflows/CI/badge.svg)](https://github.com/alphabio/b_value/actions)
[![npm version](https://badge.fury.io/js/b_value.svg)](https://badge.fury.io/js/b_value)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**Bidirectional CSS value parser - The Rosetta Stone for CSS values**

Parse CSS values to structured IR (Intermediate Representation) and generate CSS from IR. Built with [css-tree](https://github.com/csstree/csstree) and [Zod](https://github.com/colinhacks/zod) for type-safe, spec-compliant CSS value handling.

## Why b_value?

CSS values are complex. Gradients, positions, transforms, colors - they all have intricate syntax with optional components, keywords, and units. b_value gives you:

- **Bidirectional transformation**: CSS ⇄ IR (parse and generate)
- **Type-safe IR**: Zod schemas + TypeScript types for all CSS values
- **Spec-compliant**: Built on css-tree's W3C-aligned parser
- **Tree-shakeable**: Import only what you need
- **Round-trip tested**: Parse → Generate → Parse produces identical results

## Quick Start

```bash
npm install b_value
# or
pnpm add b_value
```

## Usage

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

- **Properties supported**: 50+ CSS properties
- **Color formats**: 12 complete (hex, rgb, hsl, hwb, lab, lch, oklab, oklch, color(), named, system, special)
- **Gradient types**: 6 (linear, radial, conic × 2 variants)
- **Transform functions**: 20+ (all translate, scale, rotate, skew, matrix, perspective)
- **Basic shapes**: 4/5 complete (inset, circle, ellipse, polygon)
- **Total tests**: 2176 passing
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
- border-width (thin, medium, thick, <length>)
- border-style (11 style keywords)
- border-color (<color> values)
- border-radius (<length-percentage>, 1-4 values)

**Status**: 4 properties complete, ~80 tests

### Outline Properties ✅
- outline-width (thin, medium, thick, <length>)
- outline-style (auto + 10 style keywords)
- outline-color (<color> + invert keyword)
- outline-offset (<length>)

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
- background-color (<color>)
- background-position (<position>)
- background-size (keywords + <length-percentage>)
- background-repeat (repeat-style keywords)
- background-attachment (scroll, fixed, local)

**Status**: 5 properties complete, ~90 tests

### Text Properties ✅
- text-align (7 alignment keywords)
- text-decoration-line (underline, overline, line-through, none)
- text-decoration-style (5 style keywords)
- text-decoration-color (<color>)

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

## Why Bidirectional?

Unidirectional parsers are common, but bidirectional transformation unlocks:

- **Live editors**: Update IR → emit CSS in real-time
- **Code generation**: Transform IR → Tailwind, vanilla CSS, CSS-in-JS
- **Linting & autofixing**: Parse → normalize → re-emit
- **Design tokens**: Transform between token systems
- **Round-trip safety**: Validate transformations preserve semantics

## Relationship to Other Projects

- **b_short**: Handles CSS shorthand property expansion (e.g., `margin: 10px` → individual properties)
- **b_value**: Handles CSS value parsing/generation (e.g., `radial-gradient(...)` → structured IR)
- **b_gee**: Original project from which b_value was extracted for reusability

## License

MIT © b_value contributors
