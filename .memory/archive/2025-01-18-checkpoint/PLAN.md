# DRY Cleanup Plan - Option A

**Goal**: Eliminate 426 lines of duplicated code before Session 8

**Time Estimate**: 60-90 minutes

## Tasks

### 1. Create Shared Color Component Utilities (15 min)

**File**: `src/utils/parse/color-components.ts`

Implement 4 shared functions:
- `parseAlpha(node, options?)` - Parse alpha with clamp vs error mode
- `parseHue(node)` - Parse angle with normalization to 0-360
- `parseLightness(node, range)` - Parse lightness with configurable range (0-1 or 0-100)
- `parsePercentage(node, clamp?)` - Parse percentage with optional clamping

Include JSDoc for each, follow existing util patterns.

### 2. Add Tests for Utilities (10 min)

**File**: `src/utils/parse/color-components.test.ts`

Test each utility function:
- Happy paths (number, percentage, angles)
- Edge cases (0, 100%, 360deg)
- Error cases (invalid types, out of range)
- Clamping behavior

Target: ~20 tests

### 3. Refactor Color Parsers (40-50 min)

**Order**: One at a time, run tests after each

1. `src/parse/color/rgb.ts` - Replace parseAlphaValue
2. `src/parse/color/hsl.ts` - Replace parseAlphaValue, parseHue, parsePercentage
3. `src/parse/color/hwb.ts` - Replace parseAlpha, parseHue, parsePercentage
4. `src/parse/color/lab.ts` - Replace parseAlpha, parseLightness
5. `src/parse/color/lch.ts` - Replace parseAlpha, parseLightness, parseHue
6. `src/parse/color/oklab.ts` - Replace parseAlpha, parseLightness
7. `src/parse/color/oklch.ts` - Replace parseAlpha, parseLightness, parseHue

### 4. Update Exports (5 min)

**File**: `src/utils/parse/index.ts`

Export new color-components utilities.

### 5. Verify & Commit (10 min)

```bash
just check   # Must pass
just test    # 647 tests must still pass
git add .
git commit -m "refactor(color): eliminate parseAlpha/Hue/Lightness/Percentage duplication"
```

## Success Criteria

- ✅ All 647 tests passing
- ✅ `just check` green (format, typecheck, lint)
- ✅ ~426 lines removed
- ✅ ~100 lines added (utils + tests)
- ✅ Net reduction: ~300 lines

## Notes

- **Alpha variants**: rgb/hsl error on out-of-range, others clamp. Use options parameter.
- **Lightness ranges**: lab/lch use 0-100, oklab/oklch use 0-1. Use range parameter.
- **Keep it simple**: Don't over-engineer. These are straightforward parsing functions.
