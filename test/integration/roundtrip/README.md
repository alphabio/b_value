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
3. **DO** check if side tests exist and are passing:
   - Check `src/parse/[category]/[property].test.ts`
   - Check `src/generate/[category]/[property].test.ts`
   - **If side test is missing**: Create it with comprehensive test cases
   - **If side test exists but passes**: The bug may be in round-trip interaction
   - **If side test has false assertions**: Fix the assertions (don't hide bugs!)
4. **DO** document failures in `../KNOWN_LIMITATIONS.md`
5. **DO** fix source code if a bug is found

### Why Check Side Tests?

Round-trip tests catch bugs that unit tests miss because they test the **full pipeline**. When a round-trip test fails but unit tests pass, it usually means:

- **Missing unit tests**: The specific case isn't tested in isolation
- **False assertions**: Unit tests expect wrong behavior
- **Integration bugs**: Parse/generate work individually but not together

**Example**: The `inset()` generator had a type bug that caused it to output `[object Object]`. This wasn't caught by unit tests because **no unit test existed** for the generator. The round-trip test found it immediately.

### Protocol for Missing Side Tests

1. Identify the module: `src/[parse|generate]/[category]/[property].ts`
2. Check if test exists: `src/[parse|generate]/[category]/[property].test.ts`
3. If missing:
   - Copy pattern from a similar test in the same directory
   - Create comprehensive tests covering all code paths
   - Run tests to verify they pass
   - Document in commit message: "test: add missing unit tests for [property]"
4. If exists:
   - Review assertions - are they testing the right behavior?
   - Add missing test cases that round-trip test revealed
   - Fix any false assertions

## Current Status

- **51 tests** passing across 10 test files
- **1 bug fixed** this session (inset generator)
- **1 limitation documented** (background-size two-value syntax)
- **1 missing unit test created** (inset.test.ts)
- **Phase 1** of 4 in progress (51% to 100-test goal)

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
