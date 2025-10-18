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

### Round-Trip Validation

```typescript
const original = "radial-gradient(circle closest-side, red, blue)";
const parsed = Parse.Gradient.Radial.parse(original);

if (parsed.ok) {
  const generated = Generate.Gradient.Radial.toCss(parsed.value);
  console.log(generated === original); // true - perfect round-trip
}
```

## Architecture

```
b_value/
├── core/           # Type definitions, units, keywords
│   ├── types/      # Zod schemas for CSS values
│   ├── units/      # Unit schemas (px, deg, %, etc.)
│   ├── keywords/   # CSS keyword schemas
│   └── result.ts   # Result<T,E> type
├── parse/          # CSS → IR parsers
│   └── gradient/   # Gradient parsers
└── generate/       # IR → CSS generators
    └── gradient/   # Gradient stringifiers
```

## Current Support

### Completed ✅
- **Phase 1**: Radial gradients + core infrastructure
- **Phase 2**: Linear & conic gradients
- **Phase 3**: Positions & transforms
- **Phase 4 (Sessions 1-3)**: Colors
  - Hex colors (#RGB, #RRGGBB, #RGBA, #RRGGBBAA)
  - Named colors (148 CSS color keywords)
  - RGB/RGBA (all syntax variations)
  - HSL/HSLA (all angle units, modern & legacy syntax)

### In Progress 🔵
- **Phase 4 (Session 4+)**: More color formats
  - HWB (Hue-Whiteness-Blackness)
  - LAB & LCH
  - OKLab & OKLCH
  - System colors

### Roadmap
- Phase 5: Borders & box model
- Phase 6: Flexbox & Grid
- Phase 7: Typography
- Phase 8: Polish & documentation
- Phase 9: Animations

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
