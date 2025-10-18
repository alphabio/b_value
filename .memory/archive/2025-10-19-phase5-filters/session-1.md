# Session 1: Simple Numeric Filters

**Time Estimate**: 60-90 minutes
**Target Tests**: +40 tests
**Complexity**: LOW

---

## Overview

Implement 7 filter functions that accept number or percentage values. These are the simplest filters and establish patterns for the rest of Phase 5.

---

## Filters to Implement

### Unbounded (0 to ∞)
1. **brightness()** - Linear multiplier, 1 = 100%
2. **contrast()** - Contrast adjustment, 1 = 100%
3. **saturate()** - Saturation adjustment, 1 = 100%

### Bounded (0 to 1)
4. **grayscale()** - Grayscale conversion, 1 = 100%
5. **invert()** - Color inversion, 1 = 100%
6. **opacity()** - Transparency, 1 = 100%
7. **sepia()** - Sepia tone, 1 = 100%

---

## Value Handling

### Input Formats
- **Number**: `brightness(1.5)` → value = 1.5
- **Percentage**: `brightness(150%)` → value = 1.5 (converted to decimal)
- **Zero**: `brightness(0)` → value = 0
- **Implicit 100%**: `brightness()` → value = 1 (for some filters)

### Conversion Rules
- Percentage to number: divide by 100
  - `150%` → 1.5
  - `50%` → 0.5
  - `100%` → 1.0
- Number to CSS: output as-is
  - 1.5 → `brightness(1.5)`
  - 0.5 → `grayscale(0.5)`

### Validation
- **Unbounded**: `value >= 0` (no upper limit)
- **Bounded**: `0 <= value <= 1`

---

## Implementation Order

### Phase 1: Create Directory Structure
```bash
mkdir -p src/parse/filter
mkdir -p src/generate/filter
```

### Phase 2: Implement First Filter (brightness)
This establishes the pattern for all others.

**Files to create**:
1. `src/parse/filter/brightness.ts` + tests
2. `src/generate/filter/brightness.ts` + tests

**Pattern to follow**:
```typescript
// Parse
export function parse(input: string): Result<BrightnessFilter, string> {
  // 1. Parse CSS to AST
  // 2. Extract function node
  // 3. Validate function name is "brightness"
  // 4. Parse parameter (number or percentage)
  // 5. Convert percentage to decimal if needed
  // 6. Validate range (>= 0)
  // 7. Return { kind: "brightness", value }
}

// Generate
export function toCss(filter: BrightnessFilter): string {
  // 1. Format value
  // 2. Return "brightness(value)"
}
```

**Tests for brightness** (~6 tests):
- Parse number: `brightness(1.5)` → `{ kind: "brightness", value: 1.5 }`
- Parse percentage: `brightness(150%)` → `{ kind: "brightness", value: 1.5 }`
- Parse zero: `brightness(0)` → `{ kind: "brightness", value: 0 }`
- Generate number: `{ value: 1.5 }` → `brightness(1.5)`
- Round-trip: parse → generate → parse = identical
- Invalid: negative value returns error

### Phase 3: Implement Remaining Unbounded (contrast, saturate)
Copy and adapt brightness pattern. Change function name and type.

**Tests per filter** (~6 tests each = 12 tests):
- Same pattern as brightness
- Verify correct function name

### Phase 4: Implement Bounded Filters (grayscale, invert, opacity, sepia)
Copy and adapt brightness pattern. Add upper bound validation.

**Tests per filter** (~5 tests each = 20 tests):
- Parse 0: `grayscale(0)` → `{ value: 0 }`
- Parse 0.5: `grayscale(0.5)` → `{ value: 0.5 }`
- Parse 1: `grayscale(1)` → `{ value: 1 }`
- Parse 50%: `grayscale(50%)` → `{ value: 0.5 }`
- Invalid: value > 1 returns error

### Phase 5: Run Quality Gates
```bash
just check  # Format, typecheck, lint
just test   # All tests passing
```

---

## File Structure

```
src/
├── core/
│   └── types/
│       └── filter.ts (✅ already done)
├── parse/
│   └── filter/
│       ├── brightness.ts
│       ├── brightness.test.ts
│       ├── contrast.ts
│       ├── contrast.test.ts
│       ├── grayscale.ts
│       ├── grayscale.test.ts
│       ├── invert.ts
│       ├── invert.test.ts
│       ├── opacity.ts
│       ├── opacity.test.ts
│       ├── saturate.ts
│       ├── saturate.test.ts
│       ├── sepia.ts
│       └── sepia.test.ts
└── generate/
    └── filter/
        ├── brightness.ts
        ├── brightness.test.ts
        ├── contrast.ts
        ├── contrast.test.ts
        ├── grayscale.ts
        ├── grayscale.test.ts
        ├── invert.ts
        ├── invert.test.ts
        ├── opacity.ts
        ├── opacity.test.ts
        ├── saturate.ts
        ├── saturate.test.ts
        ├── sepia.ts
        └── sepia.test.ts
```

---

## Code Examples

### Parse Example (brightness.ts)

```typescript
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type { BrightnessFilter } from "@/core/types/filter";
import * as ASTUtils from "@/utils/ast";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse CSS brightness() filter function.
 *
 * @param input - CSS string like "brightness(1.5)" or "brightness(150%)"
 * @returns Result with BrightnessFilter IR or error message
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/filter/brightness";
 *
 * const result = parse("brightness(1.5)");
 * // { ok: true, value: { kind: "brightness", value: 1.5 } }
 *
 * const result2 = parse("brightness(150%)");
 * // { ok: true, value: { kind: "brightness", value: 1.5 } }
 * ```
 */
export function parse(input: string): Result<BrightnessFilter, string> {
  // Parse CSS to AST
  let ast: csstree.CssNode;
  try {
    ast = csstree.parse(input, { context: "value" });
  } catch (e) {
    return err(`Invalid CSS: ${e instanceof Error ? e.message : String(e)}`);
  }

  // Extract function from AST
  const fnResult = ASTUtils.fromFunction(ast);
  if (!fnResult.ok) {
    return err(fnResult.error);
  }

  const { name, children } = fnResult.value;

  // Validate function name
  if (name !== "brightness") {
    return err(`Expected brightness() function, got ${name}()`);
  }

  // Expect exactly one argument
  if (children.length !== 1) {
    return err(`brightness() expects 1 argument, got ${children.length}`);
  }

  const valueNode = children[0];

  // Parse number or percentage
  let value: number;

  if (valueNode.type === "Percentage") {
    const percentResult = ParseUtils.parsePercentage(valueNode);
    if (!percentResult.ok) {
      return err(percentResult.error);
    }
    value = percentResult.value / 100; // Convert to decimal
  } else if (valueNode.type === "Number") {
    const numberResult = ParseUtils.parseNumberNode(valueNode);
    if (!numberResult.ok) {
      return err(numberResult.error);
    }
    value = numberResult.value;
  } else {
    return err(`Expected number or percentage, got ${valueNode.type}`);
  }

  // Validate range (non-negative)
  if (value < 0) {
    return err(`brightness() value must be non-negative, got ${value}`);
  }

  return ok({ kind: "brightness", value });
}
```

### Generate Example (brightness.ts)

```typescript
import type { BrightnessFilter } from "@/core/types/filter";

/**
 * Generate CSS brightness() filter function from IR.
 *
 * @param filter - BrightnessFilter IR
 * @returns CSS string like "brightness(1.5)"
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/filter/brightness";
 *
 * const css = toCss({ kind: "brightness", value: 1.5 });
 * // "brightness(1.5)"
 * ```
 */
export function toCss(filter: BrightnessFilter): string {
  const { value } = filter;
  return `brightness(${value})`;
}
```

### Test Example (brightness.test.ts)

```typescript
import { describe, expect, it } from "vitest";
import { parse } from "./brightness";
import { toCss } from "@/generate/filter/brightness";

describe("parse()", () => {
  it("parses brightness with number", () => {
    const result = parse("brightness(1.5)");
    expect(result).toEqual({
      ok: true,
      value: { kind: "brightness", value: 1.5 },
    });
  });

  it("parses brightness with percentage", () => {
    const result = parse("brightness(150%)");
    expect(result).toEqual({
      ok: true,
      value: { kind: "brightness", value: 1.5 },
    });
  });

  it("parses brightness(0)", () => {
    const result = parse("brightness(0)");
    expect(result).toEqual({
      ok: true,
      value: { kind: "brightness", value: 0 },
    });
  });

  it("rejects negative value", () => {
    const result = parse("brightness(-1)");
    expect(result.ok).toBe(false);
  });
});

describe("toCss()", () => {
  it("generates CSS for brightness", () => {
    const css = toCss({ kind: "brightness", value: 1.5 });
    expect(css).toBe("brightness(1.5)");
  });

  it("round-trip: parse → generate → parse", () => {
    const input = "brightness(1.5)";
    const parsed = parse(input);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const generated = toCss(parsed.value);
    const reparsed = parse(generated);
    expect(reparsed).toEqual(parsed);
  });
});
```

---

## Success Criteria

- [ ] 7 filters implemented (parse + generate)
- [ ] 40+ tests passing
- [ ] All tests have round-trip verification
- [ ] `just check` passes (format, lint, types)
- [ ] `just test` passes (all 785+ tests)
- [ ] Code follows DRY principles
- [ ] Functions are simple (KISS)

---

## Commit Strategy

Commit after each filter to make progress incremental:

```bash
# After brightness
git add src/parse/filter/brightness.* src/generate/filter/brightness.*
git commit -m "feat(filter): add brightness() parse and generate"

# After contrast
git add src/parse/filter/contrast.* src/generate/filter/contrast.*
git commit -m "feat(filter): add contrast() parse and generate"

# Continue for each filter...
```

---

## Next Steps

After completing this session:
1. Run `just check && just test` - ensure all green
2. Create HANDOVER.md in `.memory/archive/$(date +%Y-%m-%d)-phase5-session-1/`
3. Update progress table in MASTER_PLAN.md
4. Commit all changes with summary message

Session 2 will implement blur() and hue-rotate() filters.
