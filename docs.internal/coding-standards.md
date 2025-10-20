# Parser & Generator Implementation Policy

**Version**: 1.0
**Date**: 2025-10-18
**Status**: ACTIVE POLICY

## Purpose

This document establishes coding standards and best practices for implementing CSS value parsers and generators in b_value. Following these policies ensures consistency, maintainability, and alignment with project architecture.

---

## 1. Import Patterns

### ✅ DO: Use ES6 Imports with Type Annotations

```typescript
// Correct - for runtime usage
import * as csstree from "css-tree";

// Correct - for type-only imports
import type * as csstree from "css-tree";
import type * as Keyword from "@/core/keywords";
import type * as Type from "@/core/types";
```

### ❌ DON'T: Use CommonJS require()

```typescript
// WRONG - never do this
const csstree = require("css-tree");
```

**Why**: ES6 imports provide better type checking, tree-shaking, and consistency with the codebase.

---

## 2. Core Constants & Keywords

### ✅ DO: Use Exported Constants from Core

```typescript
import { COLOR_INTERPOLATION_KEYWORDS } from "@/core/keywords";
import { ANGLE_UNITS } from "@/core/units";

// Use in validation
if (COLOR_INTERPOLATION_KEYWORDS.includes(space as Keyword.ColorInterpolationKeyword)) {
  colorSpace = space as Keyword.ColorInterpolationKeyword;
}
```

### ❌ DON'T: Hardcode Duplicate Lists

```typescript
// WRONG - duplicates core data
const validSpaces = [
  "srgb", "srgb-linear", "display-p3", ...
];
```

**Why**:
- Violates DRY principle
- Risk of getting out of sync with core
- Makes maintenance harder
- Core exports are the single source of truth

**Available Core Exports**:
- `COLOR_INTERPOLATION_KEYWORDS` - All color interpolation keywords
- `ANGLE_UNITS` - All angle units (deg, rad, grad, turn)
- `LENGTH_UNITS` - All length units
- Check `src/core/keywords/index.ts` and `src/core/units/index.ts` for more

---

## 3. Documentation & References

### ✅ DO: Include All Three Reference Types

```typescript
/**
 * @see {@link https://github.com/mdn/data/blob/main/css/functions.json | MDN Data}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient | MDN: linear-gradient()}
 * @see {@link https://www.w3.org/TR/css-images-3/#linear-gradients | W3C Spec}
 */
```

**Why**:
- MDN Data: Canonical data source we're implementing (@see cloned repo ->> /Users/alphab/Dev/LLM/DEV/mdm-data)
- MDN: User-friendly documentation
- W3C: Authoritative specification

**MDN Data Location**: `/Users/alphab/Dev/LLM/DEV/mdm-data/css/`

---

## 4. Parser Structure

### Standard Pattern

All parsers should follow this structure:

```typescript
// 1. Imports
import * as csstree from "css-tree";
import type * as Keyword from "@/core/keywords";
import { RELEVANT_CONSTANTS } from "@/core/keywords"; // or @/core/units
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

// 2. Internal helper functions (if needed)
function parseSpecificComponent(
  nodes: csstree.CssNode[],
  startIdx: number,
): Result<{ component: Type.Component; nextIdx: number }, string> {
  // Implementation
}

// 3. Main fromFunction parser
export function fromFunction(fn: csstree.FunctionNode): Result<Type.IRType, string> {
  const functionName = fn.name.toLowerCase();
  const isRepeating = functionName === "repeating-something";

  // Validate function name
  if (!isRepeating && functionName !== "something") {
    return err(`Expected something, got: ${functionName}`);
  }

  // Parse children nodes
  const children = fn.children.toArray();

  // ... parsing logic ...

  return ok({ /* IR object */ });
}

// 4. Public parse function
export function parse(css: string): Result<Type.IRType, string> {
  try {
    const ast = csstree.parse(css, { context: "value" });

    let funcNode: csstree.FunctionNode | null = null;
    csstree.walk(ast, {
      visit: "Function",
      enter(node: csstree.FunctionNode) {
        if (node.name === "something" || node.name === "repeating-something") {
          funcNode = node;
        }
      },
    });

    if (!funcNode) {
      return err("No something function found in CSS string");
    }

    return fromFunction(funcNode);
  } catch (e) {
    return err(`Failed to parse CSS: ${e instanceof Error ? e.message : String(e)}`);
  }
}
```

---

## 5. Generator Structure

### Standard Pattern

```typescript
// 1. Imports
import type * as Type from "@/core/types";
import * as HelperGenerator from "./helper"; // if needed

// 2. Internal helper functions (if needed)
function componentToCss(component: Type.Component): string {
  // Implementation
}

// 3. Public toCss function
export function toCss(ir: Type.IRType): string {
  const parts: string[] = [];

  // Build CSS parts from IR
  if (ir.optionalPart) {
    parts.push(componentToCss(ir.optionalPart));
  }

  // Add required parts
  const requiredParts = ir.requiredList.map(item => itemToCss(item));
  parts.push(...requiredParts);

  // Generate function
  const functionName = ir.repeating ? "repeating-something" : "something";
  return `${functionName}(${parts.join(", ")})`;
}
```

---

## 6. Test Structure

### Parser Tests

```typescript
describe("Thing Parser", () => {
  it("should parse simple case", () => {
    const css = "thing(value1, value2)";
    const result = Parser.parse(css);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.kind).toBe("thing");
      // ... assertions
    }
  });

  it("should parse with optional parameters", () => {
    // Test optional features
  });

  it("should parse repeating variant", () => {
    // Test repeating version
  });

  it("should return error for invalid syntax", () => {
    const css = "not valid";
    const result = Parser.parse(css);

    expect(result.ok).toBe(false);
  });

  it("should return error for insufficient parameters", () => {
    // Test validation errors
  });
});
```

### Generator Tests

```typescript
describe("Thing Generator", () => {
  it("should generate simple case", () => {
    const ir = {
      kind: "thing" as const,
      value: "something",
      repeating: false,
    };

    const css = Generator.toCss(ir);
    expect(css).toBe("thing(something)");
  });

  it("should generate with optional parameters", () => {
    // Test optional features
  });

  it("should generate repeating variant", () => {
    // Test repeating version
  });
});
```

**Test Coverage Goals**:
- Lines: 90%+
- Functions: 90%+
- Branches: 83%+ (defensive error paths may remain uncovered)
- All generators: 100% coverage

---

## 7. Error Handling

### ✅ DO: Use Result<T, E> Pattern

```typescript
import { err, ok, type Result } from "@/core/result";

function parseComponent(): Result<Component, string> {
  if (invalid) {
    return err("Clear error message explaining what's wrong");
  }
  return ok(component);
}
```

### ✅ DO: Provide Clear Error Messages

```typescript
// Good error messages
return err("Expected 'at' keyword for position");
return err("Invalid angle unit: ${unit}");
return err("gradient requires at least 2 color stops");

// Include context
return err(`Expected something or repeating-something, got: ${functionName}`);
```

---

## 8. Type Safety

### ✅ DO: Use Zod Schemas from Core

```typescript
import * as Type from "@/core/types";

// Types come from validated Zod schemas
const gradient: Type.LinearGradient = {
  kind: "linear",
  direction: { kind: "angle", value: { value: 45, unit: "deg" } },
  colorStops: [/*...*/],
  repeating: false,
};
```

### ✅ DO: Maintain Type Consistency

```typescript
// Use literal types for discriminated unions
kind: z.literal("linear")
kind: z.literal("radial")
kind: z.literal("conic")

// This enables exhaustive checking
switch (gradient.kind) {
  case "linear": // ...
  case "radial": // ...
  case "conic": // ...
}
```

---

## 9. JSDoc Documentation

### Required Elements

```typescript
/**
 * Brief one-line description.
 *
 * Detailed description explaining:
 * - What it does
 * - How it works
 * - Any important notes
 *
 * Per CSS specification reference.
 *
 * @param name - Parameter description
 * @returns Return value description
 *
 * @public (or @internal)
 *
 * @example
 * Simple case:
 * ```typescript
 * const result = parse("value");
 * ```
 *
 * @example
 * Complex case:
 * ```typescript
 * const result = parse("complex(value)");
 * ```
 *
 * @see {@link MDN_DATA_URL | MDN Data}
 * @see {@link MDN_URL | MDN: name}
 * @see {@link W3C_URL | W3C Spec}
 */
```

---

## 10. File Organization

### Parser Files

```
src/parse/
└── category/           # e.g., gradient, transform, color
    ├── index.ts        # Exports all parsers
    ├── helper.ts       # Shared helper functions
    ├── thing.ts        # Main parser implementation
    └── thing.parse.test.ts  # Parser tests
```

### Generator Files

```
src/generate/
└── category/
    ├── index.ts        # Exports all generators
    ├── helper.ts       # Shared helper functions
    ├── thing.ts        # Main generator implementation
    └── thing.generate.test.ts  # Generator tests
```

---

## 11. Validation & Quality Gates

### Before Committing

Run all quality checks:

```bash
just check   # Format, typecheck, lint
just test    # All tests must pass
```

### Coverage Requirements

- Minimum 90% line coverage
- Minimum 90% function coverage
- Minimum 83% branch coverage
- 100% coverage on all generator code

---

## 12. Common Patterns

### Color Stop Parsing

```typescript
import * as ColorStop from "./color-stop";

// Use existing color stop parser
const colorStops: Type.ColorStop[] = [];
for (const stopNodes of colorStopNodes) {
  const stopResult = ColorStop.fromNodes(stopNodes);
  if (stopResult.ok) {
    colorStops.push(stopResult.value);
  } else {
    return err(`Invalid color stop: ${stopResult.error}`);
  }
}
```

### Position Parsing

```typescript
// Reuse position parsing logic where possible
// Check existing gradient parsers for examples
```

### Comma-Separated Lists

```typescript
const items: Type.Item[] = [];
let currentItemNodes: csstree.CssNode[] = [];

for (let idx = 0; idx < children.length; idx++) {
  const node = children[idx];
  if (!node) continue;

  if (node.type === "Operator" && "value" in node && node.value === ",") {
    if (currentItemNodes.length > 0) {
      items.push(parseItem(currentItemNodes));
      currentItemNodes = [];
    }
  } else {
    currentItemNodes.push(node);
  }
}

// Don't forget the last item
if (currentItemNodes.length > 0) {
  items.push(parseItem(currentItemNodes));
}
```

---

## 13. Checklist for New Parsers/Generators

### Parser Implementation

- [ ] ES6 imports (no require())
- [ ] Use core constants instead of duplicating
- [ ] Result<T, E> error handling
- [ ] Clear error messages
- [ ] Comprehensive JSDoc with examples
- [ ] All three reference types (MDN, W3C, MDN Data)
- [ ] Helper functions are @internal
- [ ] Public API is @public
- [ ] Handles repeating variant (if applicable)
- [ ] Validates function name
- [ ] Validates minimum requirements

### Generator Implementation

- [ ] Clean IR-to-CSS transformation
- [ ] Handles all optional fields
- [ ] Handles repeating variant (if applicable)
- [ ] Uses helper generators for complex parts
- [ ] Comprehensive JSDoc with examples
- [ ] All three reference types

### Tests

- [ ] Simple case
- [ ] With optional features
- [ ] With repeating variant
- [ ] Error cases
- [ ] Invalid syntax
- [ ] Minimum 15 test cases per parser/generator
- [ ] Round-trip tests (parse → generate → parse)

### Integration

- [ ] Export from category index.ts
- [ ] Update parent index.ts if needed
- [ ] Update START_HERE.md
- [ ] Run `just check` (all pass)
- [ ] Run `just test` (all pass)
- [ ] Coverage meets thresholds

---

## 14. Examples from Existing Code

### Good Examples to Follow

**Linear Gradient Parser**: `src/parse/gradient/linear.ts`
- Clean structure
- Good error handling
- Comprehensive JSDoc

**Radial Gradient Generator**: `src/generate/gradient/radial.ts`
- Clear helper functions
- Good separation of concerns
- 100% test coverage

### Recent Improvements

See `.memory/archive/2025-10-18-phase2-gradients/REFACTOR_NOTES.md` for examples of what to avoid and how to fix common issues.

---

## 15. Getting Help

### Finding Core Exports

```typescript
// Check these files for available exports:
src/core/keywords/index.ts        // All keyword exports
src/core/units/index.ts           // All unit exports
src/core/types/index.ts           // All type exports
```

### MDN Data Reference

Location: `/Users/alphab/Dev/LLM/DEV/mdm-data/css/`

Files:
- `functions.json` - All CSS functions
- `properties.json` - All CSS properties
- `types.json` - CSS value types
- `units.json` - CSS units

### Existing Patterns

When implementing something new, find the most similar existing implementation and follow its pattern. The gradient parsers are excellent templates.

---

## Policy Compliance

**Current Status**: All gradient parsers/generators comply with this policy as of 2025-10-18.

**Enforcement**: New implementations must follow this policy. Code reviews should verify compliance.

**Updates**: This policy should be updated as patterns evolve. Version and date at top.
