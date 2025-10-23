# Next Session: Continue Coverage Push to 85%+

**Current Coverage**: 82.58% → 84.41% (+1.83%)
**Tests This Session**: 2889 → 2983 (+94 tests across 26 files)
**Overall Progress**: 74.65% → 84.41% (+9.76% total)

## Files Added This Session (+94 tests)

**Layout parsers** (5 files, +60 tests):
- `src/parse/layout/padding-left.test.ts` (12 tests)
- `src/parse/layout/padding-right.test.ts` (12 tests)
- `src/parse/layout/margin-bottom.test.ts` (12 tests)
- `src/parse/layout/margin-left.test.ts` (12 tests)
- `src/parse/layout/margin-right.test.ts` (12 tests)

**Keyword validators** (14 files, +45 tests):
- `src/core/keywords/position-property-keywords.test.ts`
- `src/core/keywords/align-content-keywords.test.ts`
- `src/core/keywords/corner-shape-keywords.test.ts`
- `src/core/keywords/align-items-keywords.test.ts`
- `src/core/keywords/text-transform-keywords.test.ts`
- `src/core/keywords/align-self-keywords.test.ts`
- `src/core/keywords/justify-content-keywords.test.ts`
- `src/core/keywords/word-break-keywords.test.ts`
- `src/core/keywords/justify-items-keywords.test.ts`
- `src/core/keywords/justify-self-keywords.test.ts`
- `src/core/keywords/color-keywords.test.ts`
- `src/core/keywords/auto-keyword.test.ts`
- `src/core/keywords/white-space-keywords.test.ts`
- `src/core/keywords/visibility-keywords.test.ts`

**Filter parsers** (2 files, +20 tests):
- `src/parse/filter/blur.test.ts` (10 tests)
- `src/parse/filter/hue-rotate.test.ts` (10 tests)

**Color parsers** (1 file, +9 tests):
- `src/parse/color/hex.test.ts`

**Text parsers** (2 files, +17 tests):
- `src/parse/text/thickness.test.ts` (9 tests)
- `src/parse/text/color.test.ts` (8 tests)

**Generators** (1 file, +9 tests):
- `src/generate/clip-path/ellipse.test.ts`

**Previous Session Files** (10 files, +82 tests):
*Keyword validators, type schemas, generators, parsers*

## 🎯 NEXT TASK: Push to 85%+ Coverage

**Goal**: Add +0.59% more (target 85%)

**Strategy**: Continue with simple files (< 80 lines) without tests

**Command to find candidates**:

```bash
find src -name "*.ts" -not -name "*.test.ts" -not -name "index.ts" -exec bash -c 'lines=$(wc -l < "$1"); [ $lines -lt 80 ] && ! [ -f "${1%.ts}.test.ts" ] && echo "$lines $1"' _ {} \; | sort -n | head -30
```

## Remaining Simple Files (< 80 lines)

**Generators** (~5 untested):
- utils/generate/color, generate/clip-path/polygon

**Parse functions** (~8 untested):
- utils/parse/color, filter functions, text functions

**Type definitions** (~3 untested):
- grid-line, color-stop (may have circular dependencies - skip if needed)

**Note**: Some type files cause circular dependency issues when tested directly.
Focus on parsers and generators which are safe to test.

## Coverage Progress Tracker

- **Start of all sessions**: 69.22%
- **After Session 1**: 74.65% (+5.43%)
- **After Session 2**: 82.58% (+7.93%)
- **Current**: 84.41% (+15.19% total)
- **Next Target**: 85% (+0.59%)
- **Final Goal**: 89%

## Test Patterns to Reuse

**Keyword validator pattern**:

```typescript
it("accepts all valid keywords", () => {
  const keywords: KeywordType[] = ["value1", "value2"];
  for (const keyword of keywords) {
    expect(schema.safeParse(keyword).success).toBe(true);
  }
});
```

**Parser pattern**:

```typescript
it("parses valid value", () => {
  const result = parse("10px");
  expect(result.ok).toBe(true);
  if (result.ok) {
    expect(result.value.kind).toBe("property-name");
    expect(result.value.value).toEqual({ value: 10, unit: "px" });
  }
});
```

## Notes

- All 2983 tests passing ✅
- Zero test failures
- Coverage incrementally improving (+1.83% this session)
- Focus on breadth (many simple files) over depth for max coverage gain
- Some type files (gradient/direction, gradient/radial-size) cause circular dependencies - skip them
