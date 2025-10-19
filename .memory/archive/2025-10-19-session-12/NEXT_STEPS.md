# Next Steps: Master Index/Export Polish (Recommended)

**Status**: Ready to Start
**Priority**: HIGH - Complete the user experience
**Estimated Time**: 60-90 minutes
**Estimated Tests**: Minimal new tests, mostly refactoring

---

## Mission

Create unified top-level exports for professional API ergonomics:
- `Parse.Color`, `Parse.Gradient`, `Parse.Filter`, `Parse.Transform`, `Parse.Position`
- `Generate.Color`, `Generate.Gradient`, `Generate.Filter`, `Generate.Transform`, `Generate.Position`
- Clean import paths for users
- Comprehensive README update

---

## Current State

**What We Have**:
- ✅ Colors: All 11 formats with master API
- ✅ Gradients: linear, radial, conic
- ✅ Filters: All 11 functions with master API
- ✅ Transforms: All transform functions
- ✅ Positions: Position parsing/generation

**Current Import Pattern** (Inconsistent):
```typescript
// Some have master APIs
import { Filter } from "@/parse/filter";      // ✅ Good
import { Color } from "@/parse/color";        // ✅ Good

// Some don't
import * as RadialGradient from "@/parse/gradient/radial";  // ❌ Inconsistent
import * as Transform from "@/parse/transform";              // ❌ No master API?
```

**Goal**:
```typescript
// Unified, clean top-level API
import { Parse, Generate } from "b_value";

Parse.Color.parse("#ff0000");
Parse.Filter.parse("blur(5px)");
Parse.Gradient.parse("linear-gradient(red, blue)");

Generate.Color.toCss(colorIR);
Generate.Filter.toCss(filterIR);
Generate.Gradient.toCss(gradientIR);
```

---

## Implementation Plan

### Task 1: Audit Current Master APIs (15 min)

Check which domains already have master APIs:
```bash
# Check parse master APIs
cat src/parse/color/index.ts      # ✅ Has Color master
cat src/parse/filter/index.ts     # ✅ Has Filter master
cat src/parse/gradient/index.ts   # ❓ Check
cat src/parse/transform/index.ts  # ❓ Check
cat src/parse/position/index.ts   # ❓ Check

# Check generate master APIs
cat src/generate/color/index.ts      # ✅ Has Color master
cat src/generate/filter/index.ts     # ✅ Has Filter master
cat src/generate/gradient/index.ts   # ❓ Check
cat src/generate/transform/index.ts  # ❓ Check
cat src/generate/position/index.ts   # ❓ Check
```

Document what's missing in session notes.

---

### Task 2: Create Missing Master APIs (30-45 min)

For each domain without a master API:

**Gradient Master API** (if missing):
- `src/parse/gradient/index.ts` - `Gradient.parse()` with auto-detection
- `src/generate/gradient/index.ts` - `Gradient.toCss()` dispatcher
- Tests for master APIs

**Transform Master API** (if missing):
- `src/parse/transform/index.ts` - `Transform.parse()` with auto-detection
- `src/generate/transform/index.ts` - `Transform.toCss()` dispatcher
- Tests for master APIs

**Position Master API** (if needed):
- May not need auto-detection, just namespace cleanup

Follow the proven pattern from Color and Filter!

---

### Task 3: Create Top-Level Exports (15 min)

Update `src/parse/index.ts`:
```typescript
// b_path:: src/parse/index.ts
import { Color } from "./color";
import { Filter } from "./filter";
import { Gradient } from "./gradient";
import { Transform } from "./transform";
import { Position } from "./position";

/**
 * Unified Parse API for all CSS value types.
 * 
 * @example
 * ```typescript
 * import { Parse } from "b_value";
 * 
 * Parse.Color.parse("#ff0000");
 * Parse.Filter.parse("blur(5px)");
 * Parse.Gradient.parse("linear-gradient(red, blue)");
 * ```
 */
export const Parse = {
  Color,
  Filter,
  Gradient,
  Transform,
  Position,
};

export type * from "./color";
export type * from "./filter";
export type * from "./gradient";
export type * from "./transform";
export type * from "./position";
```

Update `src/generate/index.ts` (same pattern).

Update `src/index.ts`:
```typescript
// b_path:: src/index.ts
export { Parse } from "./parse";
export { Generate } from "./generate";

// Re-export all types
export type * from "./core/types";
export type * from "./parse";
export type * from "./generate";
```

---

### Task 4: Update README (20 min)

Complete rewrite with all capabilities:

```markdown
# b_value

Bidirectional CSS value parser - Parse CSS to IR, generate IR to CSS.

## Features

- ✅ **11 Color Formats**: hex, rgb, hsl, hwb, lab, lch, oklab, oklch, named, system, special
- ✅ **3 Gradient Types**: linear, radial, conic (including repeating variants)
- ✅ **11 Filter Functions**: blur, brightness, contrast, drop-shadow, grayscale, hue-rotate, invert, opacity, saturate, sepia, url
- ✅ **Transform Functions**: All CSS transforms
- ✅ **Position Values**: All position-based values
- ✅ **Type-Safe**: Full TypeScript support with discriminated unions
- ✅ **Spec-Compliant**: Built on css-tree's W3C-aligned parser
- ✅ **Round-Trip Tested**: Parse → Generate → Parse produces identical results

## Installation

\`\`\`bash
npm install b_value
\`\`\`

## Usage

### Colors

\`\`\`typescript
import { Parse, Generate } from "b_value";

// Parse any color format
const hex = Parse.Color.parse("#ff0000");
const rgb = Parse.Color.parse("rgb(255 0 0 / 0.5)");
const hsl = Parse.Color.parse("hsl(0 100% 50%)");

// Generate back to CSS
Generate.Color.toCss(hex.value);  // "#ff0000"
\`\`\`

### Filters

\`\`\`typescript
import { Parse, Generate } from "b_value";

// Parse any filter function
const blur = Parse.Filter.parse("blur(5px)");
const shadow = Parse.Filter.parse("drop-shadow(2px 2px 4px black)");

// Generate back to CSS
Generate.Filter.toCss(blur.value);  // "blur(5px)"
\`\`\`

### Gradients

\`\`\`typescript
import { Parse, Generate } from "b_value";

// Parse any gradient type
const linear = Parse.Gradient.parse("linear-gradient(red, blue)");
const radial = Parse.Gradient.parse("radial-gradient(circle, red, blue)");

// Generate back to CSS
Generate.Gradient.toCss(linear.value);
\`\`\`

## API Reference

See [API Documentation](./docs/api.md) for complete reference.

## Tests

1020+ tests covering all CSS value types and edge cases.

\`\`\`bash
pnpm test
\`\`\`

## License

MIT
```

---

### Task 5: Integration Tests (10 min)

Create `test/integration/master-api.test.ts`:
```typescript
import { describe, expect, test } from "vitest";
import { Parse, Generate } from "@/index";

describe("Master API Integration", () => {
  test("Parse namespace exports all domains", () => {
    expect(Parse.Color).toBeDefined();
    expect(Parse.Filter).toBeDefined();
    expect(Parse.Gradient).toBeDefined();
    expect(Parse.Transform).toBeDefined();
    expect(Parse.Position).toBeDefined();
  });

  test("Generate namespace exports all domains", () => {
    expect(Generate.Color).toBeDefined();
    expect(Generate.Filter).toBeDefined();
    expect(Generate.Gradient).toBeDefined();
    expect(Generate.Transform).toBeDefined();
    expect(Generate.Position).toBeDefined();
  });

  test("End-to-end: Color round-trip", () => {
    const css = "#ff0000";
    const parsed = Parse.Color.parse(css);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const generated = Generate.Color.toCss(parsed.value);
    expect(generated.toLowerCase()).toBe(css);
  });

  test("End-to-end: Filter round-trip", () => {
    const css = "blur(5px)";
    const parsed = Parse.Filter.parse(css);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const generated = Generate.Filter.toCss(parsed.value);
    expect(generated).toBe(css);
  });
});
```

---

## Quality Gates

```bash
just check   # Format, typecheck, lint
just test    # All tests (should stay ~1020+)
```

---

## Commits

1. **Audit and document current state** (if needed)
2. **Create Gradient master APIs** (if missing)
3. **Create Transform master APIs** (if missing)
4. **Create top-level Parse/Generate exports**
5. **Update README with comprehensive examples**
6. **Add master API integration tests**
7. **Final: Update documentation**

Each commit should pass quality gates.

---

## Success Criteria

✅ Clean, unified API: `Parse.X` and `Generate.X` for all domains
✅ README showcases all capabilities
✅ Integration tests verify top-level exports
✅ All existing tests still pass
✅ No breaking changes to existing APIs

---

## Notes

- This is **refactoring + docs**, not new features
- Should be mostly mechanical following Color/Filter patterns
- Focus on UX polish and discoverability
- Sets up clean foundation for v1.0 release

---

## Alternative: If Time is Limited

**Minimal Version** (30 min):
1. Just create top-level exports (Task 3)
2. Update README with basic examples (simplified Task 4)
3. Skip missing master APIs (can add later)
4. Simple integration test

This still gives users a better experience!

---

**READY FOR NEXT AGENT** ✅

This session prepared:
- Clear mission and tasks
- Step-by-step implementation plan
- Quality gates and success criteria
- Alternative paths if needed
