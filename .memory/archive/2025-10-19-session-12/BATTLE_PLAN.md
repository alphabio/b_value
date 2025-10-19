# Session 12 Battle Plan: URL Filter + Master Filter API

**Status**: Session 4 of Phase 5 (Final Session)
**Date**: 2025-10-19
**Baseline**: 926 tests passing, all quality gates green ✅
**Target**: +25-30 tests, 950+ total
**Estimated Duration**: 60-90 minutes

---

## Mission

Complete Phase 5 (Filter Functions) by implementing:
1. URL filter (simple string extraction)
2. Master Filter.parse() API (auto-detect filter type)
3. Master Filter.toCss() API (dispatch by kind)
4. Integration tests (round-trip all 11 filters)

**Completion Criteria**: All 11 filters accessible through unified API, 100% test coverage.

---

## Pre-Flight Checklist

- [x] Archive INDEX.md to session directory
- [x] Read MASTER_PLAN.md for phase context
- [x] Read Session 11 HANDOVER.md for latest state
- [x] Verify baseline: `just check && just test` ✅ (926 tests)
- [x] Create session archive directory
- [x] Understand existing patterns (color master API)
- [ ] Create detailed action plan (this file)

---

## Context Analysis

### What We Have (10/11 Filters Complete)

**Simple Numeric Filters** (Session 1 - 7 filters):
- ✅ `brightness()` - number/percentage
- ✅ `contrast()` - number/percentage
- ✅ `grayscale()` - number 0-1
- ✅ `invert()` - number 0-1
- ✅ `opacity()` - number 0-1
- ✅ `saturate()` - number/percentage
- ✅ `sepia()` - number 0-1

**Specialized Filters** (Session 2 - 2 filters):
- ✅ `blur()` - length value
- ✅ `hue-rotate()` - angle value

**Complex Filter** (Session 3 - 1 filter):
- ✅ `drop-shadow()` - multi-value (offsets, blur, color)

**Missing** (Session 4 - 1 filter):
- ⚪ `url()` - reference to SVG filter

**Missing Master API**:
- ⚪ `Filter.parse()` - auto-detect and parse
- ⚪ `Filter.toCss()` - generate from any filter IR

### Existing Patterns to Follow

**Color Master Parser** (`src/parse/color/index.ts`):
- Auto-detection by prefix (`#`, function name)
- Dispatch to specific parser
- Export namespace with all parsers
- Pattern: Try parsers in logical order

**Color Master Generator** (`src/generate/color/index.ts`):
- Switch statement on discriminated union `kind`
- Dispatch to specific generator
- Export namespace with all generators

**Type System** (`src/core/types/filter.ts`):
- ✅ Already has complete `FilterFunction` discriminated union
- ✅ All 11 filter types defined (including `UrlFilter`)
- ✅ Zod schemas for runtime validation

### Key Insights

1. **URL Filter is Simple**: Just extract string from `url(...)` or `url("...")` or `url('#...')`
2. **Master Parse is String-Based**: Detect function name, dispatch to parser
3. **Master Generate is Type-Based**: Switch on `kind`, dispatch to generator
4. **Integration Tests Matter**: Ensure round-trip works for all 11 filters

---

## Battle Plan: 4 Commits

### Commit 1: URL Filter Parser + Generator
**Time**: 15-20 minutes | **Tests**: +10-12

**Files to Create**:
- `src/parse/filter/url.ts`
- `src/parse/filter/url.test.ts`
- `src/generate/filter/url.ts`

**URL Filter Specification**:
```typescript
// Syntax variations:
url(#fragment)           → { kind: "url", url: "#fragment" }
url("#fragment")         → { kind: "url", url: "#fragment" }
url('#fragment')         → { kind: "url", url: "#fragment" }
url(path/to/file.svg)    → { kind: "url", url: "path/to/file.svg" }
url("path/to/file.svg")  → { kind: "url", url: "path/to/file.svg" }
url('path/to/file.svg')  → { kind: "url", url: "path/to/file.svg" }
```

**Implementation Strategy**:

**Parser** (`src/parse/filter/url.ts`):
```typescript
export function parse(input: string): Result<UrlFilter, string> {
  // 1. Parse CSS to AST
  // 2. Find url() function
  // 3. Extract single argument
  // 4. Handle String or Url node types
  // 5. Return { kind: "url", url: string }
}
```

**Generator** (`src/generate/filter/url.ts`):
```typescript
export function toCss(filter: UrlFilter): string {
  // Simple: url(${filter.url})
  // No quotes needed for fragments or simple paths
  // Add quotes if url contains spaces or special chars
}
```

**Test Coverage**:
- Parse: fragments, paths, with/without quotes
- Generate: preserve format
- Round-trip: parse → generate → parse = identical
- Errors: missing argument, invalid syntax

**Quality Check**:
```bash
just check
pnpm test -- url
```

**Commit Message**:
```
feat(filter): url filter implementation

- Add url() filter for SVG filter references
- Support fragment refs (#id) and file paths
- Handle quoted and unquoted URLs
- 12 new tests (parse + generate + round-trip)
- Tests: 926 → 938
```

---

### Commit 2: Master Filter Parser (Filter.parse)
**Time**: 20-25 minutes | **Tests**: +5-7

**Files to Create**:
- `src/parse/filter/index.ts`
- `src/parse/filter/index.test.ts`

**Master Parser Strategy**:

Following color pattern, create unified parse API that auto-detects filter type:

```typescript
// src/parse/filter/index.ts
export function parse(input: string): Result<FilterFunction, string> {
  const trimmed = input.trim().toLowerCase();
  
  // Detect function name
  if (trimmed.startsWith("blur(")) return Blur.parse(input);
  if (trimmed.startsWith("brightness(")) return Brightness.parse(input);
  if (trimmed.startsWith("contrast(")) return Contrast.parse(input);
  if (trimmed.startsWith("drop-shadow(")) return DropShadow.parse(input);
  if (trimmed.startsWith("grayscale(")) return Grayscale.parse(input);
  if (trimmed.startsWith("hue-rotate(")) return HueRotate.parse(input);
  if (trimmed.startsWith("invert(")) return Invert.parse(input);
  if (trimmed.startsWith("opacity(")) return Opacity.parse(input);
  if (trimmed.startsWith("saturate(")) return Saturate.parse(input);
  if (trimmed.startsWith("sepia(")) return Sepia.parse(input);
  if (trimmed.startsWith("url(")) return Url.parse(input);
  
  return err(`Unknown filter function: ${input}`);
}

export const Filter = {
  parse,
  blur: Blur,
  brightness: Brightness,
  contrast: Contrast,
  dropShadow: DropShadow,
  grayscale: Grayscale,
  hueRotate: HueRotate,
  invert: Invert,
  opacity: Opacity,
  saturate: Saturate,
  sepia: Sepia,
  url: Url,
};
```

**Test Coverage**:
- Parse all 11 filter types via master API
- Error: unknown function name
- Error: malformed input
- Type narrowing works (discriminated union)

**Quality Check**:
```bash
just check
pnpm test -- "parse/filter/index"
```

**Commit Message**:
```
feat(filter): master Filter.parse() API

- Auto-detect filter type by function name
- Dispatch to appropriate parser
- Export unified Filter namespace
- 7 new tests (one per filter type + errors)
- Tests: 938 → 945
```

---

### Commit 3: Master Filter Generator (Filter.toCss)
**Time**: 15-20 minutes | **Tests**: +5-7

**Files to Create/Modify**:
- `src/generate/filter/index.ts`
- `src/generate/filter/index.test.ts`

**Master Generator Strategy**:

Following color pattern, create unified toCss API using discriminated union:

```typescript
// src/generate/filter/index.ts
export function toCss(filter: FilterFunction): string {
  switch (filter.kind) {
    case "blur": return Blur.toCss(filter);
    case "brightness": return Brightness.toCss(filter);
    case "contrast": return Contrast.toCss(filter);
    case "drop-shadow": return DropShadow.toCss(filter);
    case "grayscale": return Grayscale.toCss(filter);
    case "hue-rotate": return HueRotate.toCss(filter);
    case "invert": return Invert.toCss(filter);
    case "opacity": return Opacity.toCss(filter);
    case "saturate": return Saturate.toCss(filter);
    case "sepia": return Sepia.toCss(filter);
    case "url": return Url.toCss(filter);
  }
}

export const Filter = {
  toCss,
  blur: Blur,
  brightness: Brightness,
  contrast: Contrast,
  dropShadow: DropShadow,
  grayscale: Grayscale,
  hueRotate: HueRotate,
  invert: Invert,
  opacity: Opacity,
  saturate: Saturate,
  sepia: Sepia,
  url: Url,
};
```

**Test Coverage**:
- Generate CSS for all 11 filter types via master API
- Type safety: TypeScript infers correct types
- Round-trip through master API

**Quality Check**:
```bash
just check
pnpm test -- "generate/filter/index"
```

**Commit Message**:
```
feat(filter): master Filter.toCss() API

- Generate CSS from any FilterFunction IR
- Switch on discriminated union kind
- Export unified Filter namespace
- 7 new tests (one per filter type)
- Tests: 945 → 952
```

---

### Commit 4: Integration Tests + Documentation
**Time**: 15-20 minutes | **Tests**: +5-8

**Files to Create**:
- `test/integration/filter.test.ts`
- Update `src/parse/filter/index.ts` (add comprehensive JSDoc)
- Update `src/generate/filter/index.ts` (add comprehensive JSDoc)

**Integration Test Strategy**:

Create comprehensive integration tests that verify the complete filter pipeline:

```typescript
// test/integration/filter.test.ts
import { describe, expect, test } from "vitest";
import { Filter as ParseFilter } from "@/parse/filter";
import { Filter as GenerateFilter } from "@/generate/filter";

describe("Filter Integration Tests", () => {
  describe("Round-trip: Parse → Generate → Parse", () => {
    test("blur filter", () => {
      const input = "blur(5px)";
      const parsed = ParseFilter.parse(input);
      expect(parsed.ok).toBe(true);
      if (!parsed.ok) return;
      
      const css = GenerateFilter.toCss(parsed.value);
      const reparsed = ParseFilter.parse(css);
      expect(reparsed.ok).toBe(true);
      if (!reparsed.ok) return;
      
      expect(reparsed.value).toEqual(parsed.value);
    });
    
    // Repeat for all 11 filters with various parameter combinations
  });
  
  describe("Multiple filters in sequence", () => {
    test("parse and generate multiple filters", () => {
      const filters = [
        "blur(5px)",
        "brightness(1.5)",
        "drop-shadow(2px 2px 4px black)",
      ];
      
      const parsed = filters.map(f => ParseFilter.parse(f));
      expect(parsed.every(r => r.ok)).toBe(true);
      
      const generated = parsed.map(r => r.ok ? GenerateFilter.toCss(r.value) : "");
      const reparsed = generated.map(css => ParseFilter.parse(css));
      expect(reparsed.every(r => r.ok)).toBe(true);
    });
  });
});
```

**Test Coverage**:
- Round-trip all 11 filters with typical parameters
- Round-trip edge cases (e.g., 0 values, max values)
- Multiple filters in sequence
- Master API usage patterns

**Documentation Updates**:
- Add comprehensive JSDoc to `Filter.parse()` with all 11 examples
- Add comprehensive JSDoc to `Filter.toCss()` with all 11 examples
- Include usage examples in master index files

**Quality Check**:
```bash
just check
pnpm test
```

**Commit Message**:
```
feat(filter): integration tests and documentation

- Add comprehensive integration tests
- Round-trip all 11 filter types
- Test multiple filters in sequence
- Complete JSDoc with examples for all filters
- Tests: 952 → 960+
- Phase 5 COMPLETE: 11/11 filters ✅
```

---

## Quality Gates (Every Commit)

**Must Pass Before Each Commit**:
```bash
just check    # Format, lint, typecheck
just test     # All tests passing
```

**Red Flags to Watch**:
- TypeScript errors (strict mode violations)
- Test failures in existing filters
- Missing error handling
- Incomplete test coverage

---

## DRY Opportunities

### Reuse Existing Utilities

**From `@/utils/ast/functions.ts`**:
- `parseCssString()` - Parse CSS to AST
- `findFunctionNode()` - Find function by name
- `parseFunctionArguments()` - Extract arguments

**From `@/utils/parse/nodes.ts`**:
- URL parsing might need custom logic (check AST node types)

### Create New Utilities (if needed)

**Only if we copy logic 2+ times**:
- URL quote handling (strip quotes from strings)
- URL validation patterns

---

## Risk Assessment

### Low Risk ✅
- URL filter implementation (simple string extraction)
- Master parser (straightforward dispatch)
- Master generator (straightforward switch)

### Medium Risk ⚠️
- URL quote handling edge cases (might need careful testing)
- Master API export structure (must match color pattern)

### Mitigation
- Follow color master API pattern exactly
- Test URL filter with all quote variations
- Verify TypeScript type narrowing works correctly

---

## Success Criteria

**Phase 5 Complete When**:
1. ✅ All 11 filters implemented (url is last)
2. ✅ Master `Filter.parse()` works for all filters
3. ✅ Master `Filter.toCss()` works for all filters
4. ✅ Integration tests verify round-trip accuracy
5. ✅ Test count: 950+ tests (925 baseline + 25-35 new)
6. ✅ All quality gates passing
7. ✅ Complete JSDoc documentation

**Definition of Done**:
- All commits have clear, descriptive messages
- No lint/type/test failures
- Code follows DRY and KISS principles
- Documentation is comprehensive
- HANDOVER.md created for next session

---

## Execution Order

```bash
# 1. Commit 1: URL Filter
#    - Implement url parser
#    - Implement url generator
#    - Add 12 tests
#    - Commit

# 2. Commit 2: Master Parser
#    - Create parse/filter/index.ts
#    - Add 7 tests
#    - Commit

# 3. Commit 3: Master Generator
#    - Create generate/filter/index.ts
#    - Add 7 tests
#    - Commit

# 4. Commit 4: Integration + Docs
#    - Create integration tests
#    - Update documentation
#    - Add 8+ tests
#    - Commit

# 5. Final Verification
#    - just check && just test
#    - Create HANDOVER.md
#    - Update INDEX.md
#    - Final commit (docs)
```

---

## Time Allocation

| Task | Estimated | Buffer | Total |
|------|-----------|--------|-------|
| Commit 1: URL Filter | 15-20 min | +5 min | 25 min |
| Commit 2: Master Parse | 20-25 min | +5 min | 30 min |
| Commit 3: Master Generate | 15-20 min | +5 min | 25 min |
| Commit 4: Integration | 15-20 min | +5 min | 25 min |
| Final Verification | 5-10 min | +5 min | 15 min |
| **Total** | **70-95 min** | **+25 min** | **120 min max** |

**Realistic Estimate**: 75-90 minutes (excluding unexpected issues)

---

## Next Steps After This Session

**Phase 5 Complete** → What's next?
- Check `MASTER_PLAN.md` for next phase
- Likely: Phase 6 or new feature area
- Update project roadmap if needed

---

## Notes

**Key Decisions**:
1. Follow color master API pattern exactly (proven, works well)
2. URL filter keeps it simple (no validation of URL format)
3. Integration tests focus on round-trip accuracy
4. All 11 filters accessible through unified namespace

**Assumptions**:
1. URL filter doesn't need to validate SVG filter references
2. Master API should match color API structure
3. Integration tests belong in `test/integration/`
4. Documentation updates can be part of final commit

**Dependencies**:
- None (all utilities exist, all types defined)

---

**BATTLE PLAN READY** ✅

Ready to execute? Say "GO" and I'll start with Commit 1.
