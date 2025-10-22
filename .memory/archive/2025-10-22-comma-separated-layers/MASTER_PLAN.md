# MASTER PLAN: Comma-Separated Layer Support (# Multiplier)

**Date**: 2025-10-22T00:39:29Z  
**Status**: Planning  
**Goal**: Add full support for CSS properties with `#` multiplier (comma-separated lists)

---

## Executive Summary

**PROBLEM**: b_value currently registers 21 properties that accept comma-separated lists per CSS spec, but only parses the FIRST value and ignores the rest.

**IMPACT**: 
- ❌ `background-image: gradient1, gradient2` - BROKEN
- ❌ `box-shadow: shadow1, shadow2, shadow3` - BROKEN  
- ❌ `animation-name: fade, slide, bounce` - BROKEN
- ❌ All 21 properties return incomplete results

**ROOT CAUSE**: Properties mapped to single-value parsers instead of list parsers.

**SOLUTION**: Create dedicated list parsers for all 21 properties using existing `parseCommaSeparatedSingle` utility.

**ESTIMATE**: 4-6 hours total (broken into fool-proof 30-minute sessions)

---

## Audit Results: Properties Needing List Support

### Current State (from MDM CSS spec validation)

**Total properties in b_value**: 51  
**Properties with `#` multiplier**: 21 (41%)  
**Properties currently broken**: 21 (100% of comma-separated properties)

### Breakdown by Category

#### Background Properties (7 properties)
```
❌ background-attachment: <attachment>#
❌ background-clip: <bg-clip>#
❌ background-origin: <visual-box>#
❌ background-repeat: <repeat-style>#
❌ background-size: <bg-size>#
❌ background-position: <bg-position>#
❌ background-image: <bg-image>#
```

**Critical**: These are used together for layered backgrounds (your use case)

#### Shadow Properties (2 properties)
```
❌ box-shadow: none | <shadow>#
❌ text-shadow: none | <shadow-t>#
```

**Note**: Current shadow parser already returns array internally, but universal.ts doesn't know this.

#### Animation Properties (8 properties)
```
❌ animation-name: [ none | <keyframes-name> ]#
❌ animation-duration: [ auto | <time [0s,∞]> ]#
❌ animation-timing-function: <easing-function>#
❌ animation-delay: <time>#
❌ animation-iteration-count: <single-animation-iteration-count>#
❌ animation-direction: <single-animation-direction>#
❌ animation-fill-mode: <single-animation-fill-mode>#
❌ animation-play-state: <single-animation-play-state>#
```

**Status**: Some have list support in module, but universal.ts bypasses it.

#### Transition Properties (4 properties)
```
❌ transition-property: none | <single-transition-property>#
❌ transition-duration: <time>#
❌ transition-timing-function: <easing-function>#
❌ transition-delay: <time>#
```

**Status**: Some have list support in module, but universal.ts bypasses it.

---

## Architecture Analysis

### The Utility Already Exists ✅

From `.memory/archive/2025-10-20-comma-separated-deep-research/RESEARCH.md`:

```typescript
// src/utils/parse/comma-separated.ts
export function parseCommaSeparatedSingle<T>(
  value: string,
  itemParser: (item: string) => Result<T, string>,
  propertyName: string
): Result<T[], string>
```

**Features**:
- ✅ Splits CSS string on commas
- ✅ Parses each item individually
- ✅ Handles errors gracefully
- ✅ Returns array of parsed values
- ✅ 19 passing tests

### What's Missing

Individual property parsers that:
1. Accept full CSS value string (with commas)
2. Call `parseCommaSeparatedSingle` with appropriate item parser
3. Return `ParseResult<T[]>` instead of `ParseResult<T>`

### Current vs Needed Architecture

**Current (BROKEN)**:
```typescript
// src/universal.ts
"background-image": GradientParse.parse,  // Only parses ONE gradient

// User calls
parse("background-image: grad1, grad2, grad3")
// Returns: grad1 only ❌
```

**Needed (CORRECT)**:
```typescript
// src/parse/background/image.ts
export function parse(value: string): ParseResult<BackgroundImage[]> {
  return toParseResult(
    parseCommaSeparatedSingle(value, parseSingleLayer, "background-image")
  );
}

// src/universal.ts
"background-image": BackgroundImage.parse,

// User calls
parse("background-image: grad1, grad2, grad3")
// Returns: [grad1, grad2, grad3] ✅
```

---

## Implementation Strategy

### Phase 0: Prerequisites (30 min)
**Goal**: Fix TypeScript error and verify baseline

- [ ] Fix `src/universal.ts:633` type error
- [ ] Run `just check && just test` → all passing
- [ ] Verify `parseCommaSeparatedSingle` utility exists and has tests
- [ ] Commit baseline

### Phase 1: Background Properties (60 min)
**Goal**: Fix the 7 background properties (your immediate use case)

**Priority Order** (by dependency):
1. `background-image` (gradient/url/none list)
2. `background-position` (position list)  
3. `background-size` (size list)
4. `background-repeat` (repeat-style list)
5. `background-clip` (keyword list)
6. `background-origin` (keyword list)
7. `background-attachment` (keyword list)

**Steps per property**:
1. Create/update `src/parse/background/{property}.ts`
2. Implement list parser using `parseCommaSeparatedSingle`
3. Update `src/universal.ts` registration
4. Add tests (single value + multi-value)
5. Verify with your example CSS

### Phase 2: Shadow Properties (30 min)
**Goal**: Fix box-shadow and text-shadow

**Note**: Shadow parser already returns arrays internally. Just need to wire up correctly.

**Properties**:
1. `box-shadow`
2. `text-shadow`

### Phase 3: Animation Properties (45 min)
**Goal**: Fix 8 animation properties

**Note**: Animation module already has some list support. Verify and wire up.

**Properties**:
1. `animation-name`
2. `animation-duration`
3. `animation-timing-function`
4. `animation-delay`
5. `animation-iteration-count`
6. `animation-direction`
7. `animation-fill-mode`
8. `animation-play-state`

### Phase 4: Transition Properties (30 min)
**Goal**: Fix 4 transition properties

**Note**: Transition module already has some list support. Verify and wire up.

**Properties**:
1. `transition-property`
2. `transition-duration`
3. `transition-timing-function`
4. `transition-delay`

### Phase 5: Documentation & Polish (30 min)
**Goal**: Update docs and examples

- [ ] Update README with layered examples
- [ ] Add examples/layered-backgrounds.ts
- [ ] Update CHANGELOG.md
- [ ] Update CONTINUE.md

---

## Fool-Proof Implementation Steps

### Session 1: Fix Baseline + background-image (45 min)

#### Step 1.1: Fix TypeScript Error (5 min)
```bash
# View the error
code src/universal.ts +633

# Fix type annotation
# Issue: allOk is boolean, needs explicit type
# Fix: Use conditional return or type assertion
```

#### Step 1.2: Verify Utility Exists (5 min)
```bash
# Check utility
cat src/utils/parse/comma-separated.ts | head -50

# Check tests
pnpm test src/utils/parse/comma-separated.test.ts
```

#### Step 1.3: Create background-image Parser (20 min)
```bash
# Create new file
code src/parse/background/image.ts

# Implementation (see detailed spec below)
```

#### Step 1.4: Update Universal Registration (5 min)
```typescript
// src/universal.ts
import * as BackgroundImage from "./parse/background/image";

// In PROPERTY_PARSERS
"background-image": BackgroundImage.parse,  // CHANGED
```

#### Step 1.5: Test with Your Example (10 min)
```bash
# Create test file
cat > test-layers.ts << 'EOF'
import { parse } from "./src/index";

const result = parse(`
  background-image: 
    radial-gradient(red, blue),
    linear-gradient(green, yellow)
`);

console.log(JSON.stringify(result, null, 2));
EOF

pnpm tsx test-layers.ts
```

### Session 2: background-position & background-size (30 min)

Similar structure to Session 1 for each property.

### Session 3: Remaining Background Properties (30 min)

Batch implementation of simpler keyword-based properties.

### Session 4: Shadow Properties (30 min)

Wire up existing shadow parser properly.

### Session 5: Animation Properties (45 min)

Wire up existing animation module list support.

### Session 6: Transition Properties (30 min)

Wire up existing transition module list support.

---

## Detailed Specifications

### background-image Parser Spec

**File**: `src/parse/background/image.ts`

**Type Definition**:
```typescript
export type BackgroundImageLayer = 
  | { kind: "none" }
  | { kind: "url"; url: string }
  | Type.Gradient;

export type BackgroundImage = BackgroundImageLayer[];
```

**Implementation**:
```typescript
import { parseCommaSeparatedSingle } from "@/utils/parse/comma-separated";
import { toParseResult, type ParseResult } from "@/core/result";
import * as GradientParse from "@/parse/gradient/gradient";

export function parse(value: string): ParseResult<BackgroundImage> {
  const result = parseCommaSeparatedSingle(
    value,
    parseSingleLayer,
    "background-image"
  );
  return toParseResult(result);
}

function parseSingleLayer(value: string): Result<BackgroundImageLayer, string> {
  const trimmed = value.trim();
  
  // Check for 'none'
  if (trimmed === "none") {
    return ok({ kind: "none" });
  }
  
  // Check for url()
  if (trimmed.startsWith("url(")) {
    return parseURL(trimmed);
  }
  
  // Must be gradient
  const gradientResult = GradientParse.parse(trimmed);
  if (!gradientResult.ok) {
    return err(gradientResult.issues[0]?.message || "Invalid gradient");
  }
  
  return ok(gradientResult.value);
}

function parseURL(value: string): Result<BackgroundImageLayer, string> {
  // Extract URL from url(...)
  const match = value.match(/^url\(\s*['"]?([^'"]+)['"]?\s*\)$/);
  if (!match) {
    return err("Invalid url() syntax");
  }
  
  return ok({ kind: "url", url: match[1] });
}
```

**Tests**:
```typescript
// src/parse/background/image.test.ts
describe("background-image", () => {
  it("parses single gradient", () => {
    const result = parse("linear-gradient(red, blue)");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toHaveLength(1);
      expect(result.value[0].kind).toBe("linear");
    }
  });

  it("parses multiple gradients", () => {
    const result = parse("linear-gradient(red, blue), radial-gradient(green, yellow)");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toHaveLength(2);
      expect(result.value[0].kind).toBe("linear");
      expect(result.value[1].kind).toBe("radial");
    }
  });

  it("parses url", () => {
    const result = parse("url(image.png)");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value[0].kind).toBe("url");
    }
  });

  it("parses mixed layers", () => {
    const result = parse("url(bg.png), linear-gradient(red, blue), none");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toHaveLength(3);
      expect(result.value[0].kind).toBe("url");
      expect(result.value[1].kind).toBe("linear");
      expect(result.value[2].kind).toBe("none");
    }
  });

  it("handles your complex example", () => {
    const css = `
      radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.15) 30%),
      radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.1) 11%),
      linear-gradient(45deg, #343702 0%, #184500 20%)
    `;
    const result = parse(css);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toHaveLength(3);
    }
  });
});
```

---

## Risk Mitigation

### Risk 1: Breaking Existing Single-Value Usage
**Mitigation**: Properties now return arrays, but consumers expect single values.

**Solution**: 
- Update type definitions to reflect arrays
- Maintain backward compat in generate() - accept both single and array
- Document breaking change in CHANGELOG

### Risk 2: Performance Impact
**Mitigation**: Parsing arrays is slower than single values.

**Solution**: 
- Lazy parsing (only split if commas detected)
- Benchmark before/after
- Optimize hot path if needed

### Risk 3: Complex Gradients with Commas Inside
**Mitigation**: `rgba(255,0,0,0.5)` has commas that aren't separators.

**Solution**: 
- `parseCommaSeparatedSingle` uses AST-based splitting (already handles this)
- Test with complex gradients

---

## Testing Strategy

### Unit Tests (per property)
- [ ] Single value
- [ ] Multiple values (2, 3, 5+ items)
- [ ] Edge cases (none, empty)
- [ ] Complex values (nested commas)
- [ ] Error cases

### Integration Tests
- [ ] parseAll() with layered backgrounds
- [ ] Round-trip: parse → generate → parse
- [ ] Your exact CSS example

### Performance Tests
- [ ] Benchmark single vs array parsing
- [ ] Memory profiling for large lists

---

## Success Criteria

### Must Have ✅
- [ ] All 21 comma-separated properties parse correctly
- [ ] Your example CSS works end-to-end
- [ ] All existing tests still pass
- [ ] Type safety maintained
- [ ] Documentation updated

### Should Have
- [ ] Performance within 10% of single-value parsing
- [ ] Examples for each property category
- [ ] Migration guide if breaking

### Nice to Have
- [ ] Benchmark comparisons
- [ ] Visual examples in docs
- [ ] Generator support for arrays

---

## Timeline

| Session | Duration | Tasks | Output |
|---------|----------|-------|--------|
| 0 | 30 min | Fix baseline | TypeScript clean, tests pass |
| 1 | 45 min | background-image | Works with your example |
| 2 | 30 min | background-position/size | Layered positioning |
| 3 | 30 min | Other background props | All 7 complete |
| 4 | 30 min | Shadow properties | Multi-shadow support |
| 5 | 45 min | Animation properties | Multi-animation support |
| 6 | 30 min | Transition properties | Multi-transition support |
| 7 | 30 min | Documentation | Updated README, examples |

**Total**: 4 hours 30 minutes

---

## Next Steps

### Immediate (Do Now)
1. Read this plan thoroughly
2. Confirm approach makes sense
3. Start Session 0 (fix baseline)

### After Baseline Fixed
1. Start Session 1 (background-image)
2. Test with your example
3. Validate approach before continuing

### Before Each Session
1. Read session spec
2. Verify prerequisites
3. Commit previous work

---

## References

- MDM CSS Data: `/Users/alphab/Dev/LLM/DEV/mdm-data/css/properties.json`
- Comma-separated utility: `src/utils/parse/comma-separated.ts`
- Research doc: `.memory/archive/2025-10-20-comma-separated-deep-research/RESEARCH.md`
- Universal API: `src/universal.ts`

---

## Questions for Clarification

1. **Breaking Change**: Properties now return arrays - is this acceptable?
2. **Priority**: Start with background properties (your use case) or all 21 at once?
3. **Generators**: Should generateAll() also support array inputs?
4. **Backward Compat**: Keep single-value API or always return arrays?

---

**STATUS**: Ready for Session 0 - Fix Baseline

**NEXT**: Fix TypeScript error at `src/universal.ts:633`
