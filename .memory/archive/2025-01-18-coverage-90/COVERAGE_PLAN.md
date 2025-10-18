# Coverage Improvement Plan - Target 90%+

## Current Status
- **Parse/Generate Coverage**: 71.64% (lines/statements), 73.78% (branches)
- **Target**: 90%+ across all metrics
- **Core excluded**: Correct - schemas tested via parse/generate

## Uncovered Code Analysis

### 1. parse/gradient/radial.ts (Major gaps)

**Lines 109-110**: Error paths in parseSize()
- Missing: Invalid dimension/percentage inputs

**Lines 215-216**: Empty children array check
- Missing: radial-gradient() with no arguments

**Lines 260-274**: Explicit size parsing without shape keyword
- Missing: radial-gradient(100px, red, blue)
- Missing: radial-gradient(50% 100%, red, blue)

**Lines 296-339**: Color interpolation (in <colorspace>)
- Missing: radial-gradient(in srgb, red, blue)
- Missing: radial-gradient(in oklch, red, blue)
- Missing: Invalid color space
- Missing: Color space with comma

**Lines 370-371**: Position parsing errors
- Missing: Invalid position values

**Lines 503-504**: Unknown/uncovered (need to inspect)

### 2. parse/gradient/color-stop.ts

**Lines 31-32, 36-37, 44-45, 51-52, 73-74**: Error paths
- Missing: Empty nodes array
- Missing: Null node handling
- Missing: Color generation errors
- Missing: Invalid position types

### 3. generate/gradient/radial.ts

**Lines 190-196**: Color interpolation generation
- Missing: Generate with colorSpace property

## Test Files to Create/Extend

1. **src/core/result.test.ts** (NEW) - Test all utility functions
2. **src/parse/gradient/radial.parse.test.ts** (EXTEND) - Add edge cases
3. **src/parse/gradient/color-stop.test.ts** (NEW) - Test error paths
4. **src/generate/gradient/radial.generate.test.ts** (EXTEND) - Add colorSpace

## Priority Order

1. ✅ Create result.ts tests (quick win, ~100 lines)
2. ✅ Add parse edge cases (explicit size, empty args, color interpolation)
3. ✅ Add generate colorSpace tests
4. ✅ Add color-stop error path tests
5. ✅ Verify 90%+ coverage achieved

