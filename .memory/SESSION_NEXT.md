# Session 8: Push to 90% Coverage

**Current Coverage**: 89.13% ✓ 
**Target**: 90% (+0.87% remaining)
**Status**: ✅ 3,488 tests passing, all checks passing

## ✅ Session 7 Achievements (89.01% → 89.13%)

Successfully fixed all build/lint errors and boosted typography coverage!

### Work Completed:
1. **Test Fixes** (+10 files fixed)
   - Removed incorrect `kind` fields from primitive types (angle, length)
   - Fixed transition property test type
   - Added biome-ignore for intentional `as any` usage
   
2. **Parse/Typography Module** (+4 files, 8 tests)
   - font-family.test.ts: 87.5% → 92.5%
   - font-weight.test.ts: 80.95% → 90.47%
   - letter-spacing.test.ts: 79.48% → 89.74%
   - line-height.test.ts: 82.6% → 91.3%
   - Module: 83.01% → 86.36% (+3.35%)

3. **Key Learning**: Primitive type schemas (angle, length) never had `kind` fields

📄 **Full details**: `.memory/archive/2025-01-25-bugfix-tests/HANDOVER.md`

## 🎯 Roadmap to 90% (+0.87% needed)

### Strategy A: Generate Dispatchers (Quick Win ~0.5-0.8% impact)

These high-value dispatcher files have very low coverage:

1. **clip-path/clip-path.ts** (27.27% coverage)
   - Lines 41-84 uncovered (dispatcher logic)
   - Need: ~6-8 tests for different clip-path kinds
   - Impact: ~0.3-0.4%

2. **clip-path/inset.ts** (8.57% coverage)
   - Lines 33-87 uncovered (most of file)
   - Need: ~8-10 tests for inset generation
   - Impact: ~0.2-0.3%

3. **transform/origin.ts** (28.57% coverage)
   - Lines 54-64, 91-92 uncovered
   - Need: ~4-6 tests for origin generation
   - Impact: ~0.1-0.2%

### Strategy B: Parse Error Paths (Systematic ~0.1-0.2% each)

Focus on modules with consistent error path patterns:

1. **parse/color** (lab, lch, oklab, oklch at 83-85%)
2. **parse/filter** (brightness, contrast, grayscale at 51-54%)
3. **parse/animation** (direction, fill-mode, play-state at 92%)

### Strategy C: If not critical, document and plan next phase

### Commands to Start

```bash
# Quick check current state
just test && just check

# Option A: Generate dispatcher tests (best path to 90%)
cat src/generate/clip-path/clip-path.ts
cat src/generate/clip-path/clip-path.test.ts
# Check what's missing, add dispatcher tests

# Option B: Parse error paths
pnpm test:coverage 2>&1 | grep "parse/color"
pnpm test:coverage 2>&1 | grep "parse/filter"

# Find all opportunities
pnpm test:coverage 2>&1 | grep -v "100\s*|" | grep "\.ts"
```

### Test Pattern for Dispatchers

Clip-path dispatcher example:
```typescript
it("dispatches circle", () => {
  const result = generate({
    kind: "clip-path",
    value: { kind: "circle", radius: {...}, position: {...} }
  });
  expect(result.ok).toBe(true);
});

it("dispatches inset", () => {
  const result = generate({
    kind: "clip-path",
    value: { kind: "inset", offsets: {...} }
  });
  expect(result.ok).toBe(true);
});
```

## 📊 Coverage Progress

- **Session 1**: 74.65% (+5.43%)
- **Session 2**: 82.58% (+7.93%)
- **Session 3**: 84.41% (+1.83%)
- **Session 4**: 84.61% (+0.20%)
- **Session 5**: 86.33% (+1.72%)
- **Session 6**: 86.74% (+0.41%)
- **Session 7**: 89.01% (+2.27%) ✓ **89% MILESTONE ACHIEVED!**
- **Next Goal**: 90% (0.99% to go)
