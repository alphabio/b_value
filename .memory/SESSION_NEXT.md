# Next Session: Continue Coverage Push to 85%+

**Current Coverage**: 84.41% (maintained)
**Tests This Session**: 2983 → 3039 (+56 tests across 4 files)
**Overall Progress**: 74.65% → 84.41% (+9.76% total from start)

## Files Added This Session (+56 tests)

**Type schemas** (2 files, +39 tests):
- `src/core/types/border.test.ts` (24 tests) - border-width, border-style, border-color, border-radius schemas
- `src/core/types/shadow.test.ts` (15 tests) - box-shadow and text-shadow schemas

**Keyword validators** (2 files, +17 tests):
- `src/core/keywords/background-attachment-keywords.test.ts` (9 tests) - scroll, fixed, local
- `src/core/keywords/border-width-keywords.test.ts` (8 tests) - thin, medium, thick

## Previous Session Files (+94 tests)

**Layout parsers** (5 files, +60 tests):
- padding-left, padding-right, margin-bottom, margin-left, margin-right

**Keyword validators** (14 files, +45 tests):
- position-property, align-content, corner-shape, align-items, text-transform, etc.

**Filter parsers** (2 files, +20 tests):
- blur, hue-rotate

**Color & text parsers** (3 files, +26 tests):
- hex, thickness, color

**Generators** (1 file, +9 tests):
- clip-path/ellipse

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

- All 3039 tests passing ✅
- Zero test failures
- Coverage: 84.41% (maintained - type files have low impact)
- **Always check `/Users/alphab/Dev/LLM/DEV/mdm-data/css/properties.json` for spec-accurate schemas**
- Example: `border-color` syntax is `<color>{1,4}`, box-shadow is `none | <shadow>#`
- Type files test schema validation but don't execute much code → low coverage impact
- Need to focus on parser/generator files for coverage boost
