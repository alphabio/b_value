# Universal API Design - Phase 0.6

**Date**: 2025-10-21T07:54:52Z  
**Goal**: Build the ACTUAL public API for b_value

---

## The Vision

```typescript
// Parse ANY CSS longhand property declaration
parse("background-position: center top")
// → { ok: true, property: "background-position", value: {...}, issues: [] }

// Generate CSS from IR
generate({ property: "background-position", value: {...} })
// → { ok: true, value: "center top", issues: [] }
```

**That's the whole API.**

---

## API Specification

### parse(declaration: string): ParseResult

Parse a CSS longhand property declaration.

```typescript
export function parse(declaration: string): ParseResult {
  // 1. Parse declaration → extract property & value
  // 2. Validate property is longhand (reject shorthands)
  // 3. Route to appropriate property parser
  // 4. Return unified ParseResult with property name
}
```

**Examples**:
```typescript
parse("color: red")
// → { ok: true, property: "color", value: { kind: "named", name: "red" }, issues: [] }

parse("background-position: center top")
// → { ok: true, property: "background-position", value: {...}, issues: [] }

parse("transform: rotate(45deg) scale(2)")
// → { ok: true, property: "transform", value: [...], issues: [] }

parse("border: 1px solid red")
// → { ok: false, property: "border", issues: [{
//      severity: "error",
//      message: "border is a shorthand property",
//      suggestion: "Use border-width, border-style, border-color",
//      action: "Use b_short to expand shorthands"
//    }] }

parse("invalid syntax")
// → { ok: false, issues: [{ severity: "error", message: "Invalid declaration syntax" }] }
```

---

### generate(options): GenerateResult

Generate CSS value from IR.

```typescript
export function generate(options: {
  property: string;
  value: unknown;
}): GenerateResult {
  // 1. Validate property is longhand
  // 2. Route to appropriate generator
  // 3. Return unified GenerateResult
}
```

**Examples**:
```typescript
generate({
  property: "color",
  value: { kind: "hex", r: 255, g: 0, b: 0 }
})
// → { ok: true, property: "color", value: "#ff0000", issues: [] }

generate({
  property: "background-position",
  value: { horizontal: "center", vertical: "top" }
})
// → { ok: true, property: "background-position", value: "center top", issues: [] }

generate({
  property: "transform",
  value: [
    { kind: "rotate", angle: { value: 45, unit: "deg" } },
    { kind: "scale", x: 2, y: 2 }
  ]
})
// → { ok: true, property: "transform", value: "rotate(45deg) scale(2)", issues: [] }

generate({
  property: "border",
  value: { /* ... */ }
})
// → { ok: false, issues: [{ message: "border is a shorthand property" }] }
```

---

## Implementation Strategy

### 1. Property Registry

Map CSS property names to parsers/generators:

```typescript
// Internal registry
const PROPERTY_PARSERS: Record<string, PropertyParser> = {
  "color": Color.parse,
  "background-color": Color.parse,
  "border-color": Border.Color.parse,
  "background-position": Position.parse,
  "background-size": Background.Size.parse,
  "transform": Transform.parse,
  "text-decoration-line": Text.Line.parse,
  "text-decoration-style": Text.Style.parse,
  "width": Layout.Width.parse,
  "top": Layout.Top.parse,
  // ... etc for all longhand properties
};

const PROPERTY_GENERATORS: Record<string, PropertyGenerator> = {
  "color": Color.generate,
  "background-color": Color.generate,
  "border-color": Border.Color.generate,
  "background-position": Position.generate,
  // ... etc
};
```

### 2. Shorthand Detection

List of known shorthands to reject:

```typescript
const SHORTHAND_PROPERTIES = [
  "background",
  "border",
  "border-top",
  "border-right", 
  "border-bottom",
  "border-left",
  "margin",
  "padding",
  "text-decoration",
  "font",
  "animation",
  "transition",
  // ... etc
];

function isShorthand(property: string): boolean {
  return SHORTHAND_PROPERTIES.includes(property);
}
```

### 3. Declaration Parser

```typescript
function parseDeclaration(declaration: string): {
  property: string;
  value: string;
} | null {
  // Use css-tree or regex to parse "property: value"
  const match = declaration.match(/^\s*([a-z-]+)\s*:\s*(.+?)\s*;?\s*$/i);
  if (!match) return null;
  return {
    property: match[1].toLowerCase(),
    value: match[2]
  };
}
```

### 4. Universal parse()

```typescript
export function parse(declaration: string): ParseResult {
  // Step 1: Parse declaration syntax
  const parsed = parseDeclaration(declaration);
  if (!parsed) {
    return parseErr("Invalid CSS declaration syntax", {
      suggestion: "Expected format: 'property: value'"
    });
  }

  const { property, value } = parsed;

  // Step 2: Check if shorthand
  if (isShorthand(property)) {
    return parseErr(`${property} is a shorthand property`, {
      suggestion: `Use individual longhand properties`,
      action: "Use b_short to expand shorthands first"
    });
  }

  // Step 3: Find parser
  const parser = PROPERTY_PARSERS[property];
  if (!parser) {
    return parseErr(`Unknown property: ${property}`, {
      suggestion: "Check property name spelling"
    });
  }

  // Step 4: Parse value
  const result = parser(value);
  
  // Step 5: Add property name to result
  return {
    ...result,
    property
  };
}
```

### 5. Universal generate()

```typescript
export function generate(options: {
  property: string;
  value: unknown;
}): GenerateResult {
  const { property, value } = options;

  // Step 1: Check if shorthand
  if (isShorthand(property)) {
    return generateErr(`${property} is a shorthand property`, {
      action: "Use b_short for shorthand generation"
    });
  }

  // Step 2: Find generator
  const generator = PROPERTY_GENERATORS[property];
  if (!generator) {
    return generateErr(`Unknown property: ${property}`, {
      suggestion: "Check property name spelling"
    });
  }

  // Step 3: Generate value
  const result = generator(value);

  // Step 4: Add property name to result
  return {
    ...result,
    property
  };
}
```

---

## Module APIs = Internal

The module-level parse()/generate() functions are INTERNAL:

```typescript
// Internal (for implementation)
Color.parse(value: string): ParseResult<Color>
Transform.parse(value: string): ParseResult<Transform>
Background.Size.parse(value: string): ParseResult<BackgroundSize>

// Public (for users)
parse(declaration: string): ParseResult
generate(options: { property: string, value: unknown }): GenerateResult
```

Users never call module functions directly. They use universal API.

---

## Phase 0.6 Implementation Plan

### Step 1: Build Property Registry (1 hour)
- Map all longhand properties to parsers
- Map all longhand properties to generators
- Create shorthand list

### Step 2: Declaration Parser (30 min)
- Parse "property: value" syntax
- Handle edge cases (whitespace, semicolons)

### Step 3: Universal parse() (1 hour)
- Implement routing logic
- Add shorthand rejection
- Add property name to results

### Step 4: Universal generate() (1 hour)
- Implement routing logic
- Add shorthand rejection
- Add property name to results

### Step 5: Tests (2 hours)
- Test all supported properties
- Test shorthand rejection
- Test error cases

### Step 6: Documentation (1 hour)
- Update README with universal API
- Add migration guide
- Update examples

**Total**: ~6-7 hours

---

## Success Criteria

1. ✅ `parse("color: red")` works for ALL longhand properties
2. ✅ `generate({ property: "color", value: IR })` works for ALL properties
3. ✅ Shorthand properties are rejected with helpful errors
4. ✅ Unknown properties are rejected with helpful errors
5. ✅ All existing tests still pass
6. ✅ Property name included in all results

---

## Breaking Changes

**Module APIs**:
- Remain available for internal use
- Not recommended for public use
- Documentation will show universal API only

**No breaking changes** - Just adding new universal functions.

---

## Documentation Example

```markdown
# b_value

Parse and generate CSS longhand property values.

## Installation

npm install b_value

## Usage

### Parse

// Parse any CSS longhand property
import { parse } from "b_value";

const result = parse("color: red");
if (result.ok) {
  console.log(result.property); // "color"
  console.log(result.value);    // { kind: "named", name: "red" }
}

### Generate

// Generate CSS from IR
import { generate } from "b_value";

const result = generate({
  property: "color",
  value: { kind: "hex", r: 255, g: 0, b: 0 }
});
if (result.ok) {
  console.log(result.value); // "#ff0000"
}

## Supported Properties

All CSS longhand properties. For shorthand properties (border, margin, etc.), 
use [b_short](https://github.com/user/b_short).

## API

### parse(declaration: string): ParseResult

Parse a CSS property declaration.

### generate(options: { property: string, value: unknown }): GenerateResult

Generate CSS value from intermediate representation.
```

---

## Next Agent Instructions

1. Read CLARITY.md first
2. Implement Phase 0.6 universal API
3. DO NOT waste time on module organization
4. Focus on the universal parse()/generate() functions
5. Reject shorthands with clear error messages

---

**The goal is simple: One API to parse/generate ANY longhand CSS property.**
