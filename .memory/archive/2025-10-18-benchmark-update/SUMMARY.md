# Benchmark Update

**Date:** 2025-10-18
**Duration:** ~5 minutes
**Status:** ✅ Complete

## Objective

Replace copied benchmark scripts from another project with benchmarks appropriate for b_value's current functionality.

## Changes Made

### Updated Files

1. **benchmark/parse.bench.ts**
   - Replaced background/border parsing benchmarks with radial gradient parsing
   - 21 benchmark operations covering:
     - Simple cases (minimal, circle, ellipse)
     - Position variations (center, top left, percentages, pixels)
     - Color stop variations (%, px, multiple stops)
     - Size keywords (closest-side, closest-corner, farthest-side, farthest-corner)
     - Complex cases (combined features, repeating)
     - Color format variations (hex, rgb, rgba, hsl)

2. **benchmark/generate.bench.ts**
   - Replaced background/border generation benchmarks with radial gradient generation
   - 17 benchmark operations covering similar variations
   - Fixed IR structure to match actual b_value types (size as object with kind/value)

3. **benchmark/roundtrip.bench.ts**
   - Replaced background/border roundtrip benchmarks with radial gradient roundtrips
   - 21 benchmark operations testing parse → generate cycles
   - Ensures bidirectional transformation works correctly

4. **benchmark/BASELINE.md**
   - Updated documentation with proper usage instructions
   - Added placeholders for benchmark results

## Test Results

All benchmarks execute successfully:

### Parse Performance
- 21 operations tested
- ~150K-350K ops/sec range
- Fastest: hex colors (~355K ops/sec)
- Slowest: rgba colors (~154K ops/sec)

### Generate Performance
- 17 operations tested
- ~2.1M-4.2M ops/sec range (significantly faster than parsing)
- Fastest: minimal two colors (~4.2M ops/sec)
- Slowest: multiple color stops (~2.2M ops/sec)

### Roundtrip Performance
- 21 operations tested
- ~127K-322K ops/sec range
- Fastest: hex colors (~322K ops/sec)
- Slowest: multiple color stops (~127K ops/sec)

## Quality Gates

✅ `just check` - All formatting, typechecking, and linting passed
✅ `just test` - All 32 tests passing
✅ All 3 benchmark suites execute without errors

## Notes

- Benchmarks focus on radial gradients (Phase 1 complete functionality)
- When Phase 2 adds linear and conic gradients, benchmarks should be expanded
- Performance baselines can be captured by running `pnpm bench` and updating BASELINE.md
- Generation is ~10-20x faster than parsing (expected - no parsing overhead)
- Roundtrip performance primarily limited by parsing step

## Next Steps

- Consider expanding benchmarks when Phase 2 (linear/conic gradients) is implemented
- Optionally capture and commit performance baselines to BASELINE.md
- Monitor for performance regressions as new features are added
