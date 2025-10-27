# Round-Trip Tests

## Purpose

Round-trip tests verify the fundamental correctness of the parse/generate pipeline by testing:

1. **Parse succeeds** for valid CSS input
2. **Generate produces valid CSS** from the parsed IR
3. **Re-parsing produces identical IR** (parse → generate → parse stability)

This is the foundation of correctness - if round-trips fail, the library cannot be trusted for bidirectional workflows (e.g., CSS parsers, formatters, transformers).

## Structure

Tests are organized by property category:

- **color.test.ts** - `color` property (named, hex, rgb, rgba, hsl)
- **layout.test.ts** - `width` and `height` properties (lengths, percentages, keywords)
- **border.test.ts** - `border-color` and `border-width` properties
- **transform.test.ts** - `transform` property (translate, rotate, scale, multiple)
- **gradient.test.ts** - Gradient functions for `background-image` (linear)

## Test Pattern

Each test follows this pattern:

```typescript
test("description: CSS value", () => {
  // 1. Parse input
  const p1 = PropertyParse.parse("value");
  expect(p1.ok).toBe(true);
  if (!p1.ok) return;

  // 2. Generate CSS
  const gen = PropertyGenerate.generate(p1.value);
  expect(gen.ok).toBe(true);
  if (!gen.ok) return;

  // 3. Optional: Verify generated CSS matches expected format
  expect(gen.value).toBe("expected");

  // 4. Re-parse and verify IR is identical
  const p2 = PropertyParse.parse(gen.value);
  expect(p2.ok).toBe(true);
  if (!p2.ok) return;

  expect(p1.value).toEqual(p2.value);
});
```

## Normalization

Some values may be normalized during generation (e.g., `#ff0000` → `#f00`, `rgb(255, 0, 0)` → `rgb(255 0 0)`). This is acceptable as long as:

1. The generated CSS is valid
2. Re-parsing produces the same IR as the first parse

The IR is the source of truth, not the generated CSS string.

## Handling Failures

When a round-trip test fails:

1. **DO NOT** modify test expectations to make them pass
2. **DO** investigate the root cause:
   - Is the parser incorrect?
   - Is the generator incorrect?
   - Is this expected normalization? (document it)
3. **DO** document failures in `../ROUNDTRIP_FAILURES.md`
4. **DO** fix source code if a bug is found

## Current Status

- **21 tests** passing (5 color + 5 layout + 4 border + 4 transform + 3 gradient)
- **0 failures** documented
- **Phase 1** of 4 in progress

## Expansion Plan

See `.memory/SESSION_NEXT.md` for planned additions:
- Radial and conic gradients
- Shadow properties (box-shadow, text-shadow)
- Filter functions
- Clip-path shapes
- Animation/transition timing functions

## References

- `.memory/TEST_QUALITY_PLAN.md` - Overall quality improvement plan
- `.memory/archive/2025-10-27-roundtrip-phase1/HANDOVER.md` - Initial implementation
- `../ROUNDTRIP_FAILURES.md` - Known failures and investigations
