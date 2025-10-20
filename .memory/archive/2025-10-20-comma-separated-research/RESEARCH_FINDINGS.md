# Comma-Separated Values Research & Proposal

**Date**: 2025-10-20  
**Type**: Side Quest - Infrastructure Research  
**Status**: 🔬 RESEARCH COMPLETE → PROPOSAL READY

---

## Executive Summary

**Problem**: Multiple CSS properties accept comma-separated values (e.g., `animation-name: fade, slide`), but each parser reimplements the same comma-splitting logic, leading to code duplication.

**Solution**: Extract common comma-separated parsing logic into a reusable utility function.

**Impact**: 
- Reduces ~30-40 lines of boilerplate per property
- Currently 10+ properties have this duplication
- 80+ properties in MDN data use `#` multiplier (comma-separated)
- Improves consistency and maintainability

---

## Research Findings

### 1. Current State Analysis

**Properties Already Implemented with Comma-Separated Values:**

| Domain | Property | Pattern | Lines of Code |
|--------|----------|---------|---------------|
| Animation | `animation-name` | Single identifier per item | ~35 lines |
| Animation | `animation-delay` | Single value per item | ~35 lines |
| Animation | `animation-duration` | Single value per item | ~35 lines |
| Animation | `animation-direction` | Single value per item | ~35 lines |
| Animation | `animation-fill-mode` | Single value per item | ~35 lines |
| Animation | `animation-iteration-count` | Single value per item | ~35 lines |
| Animation | `animation-play-state` | Single value per item | ~35 lines |
| Animation | `animation-timing-function` | Single value per item | ~35 lines |
| Transition | `transition-property` | Single identifier per item | ~35 lines |
| Transition | `transition-delay` | Single value per item | ~35 lines |
| Transition | `transition-duration` | Single value per item | ~35 lines |
| Transition | `transition-timing-function` | Single value per item | ~35 lines |
| Shadow | `box-shadow` | Multiple values per layer | ~50 lines |
| Shadow | `text-shadow` | Multiple values per layer | ~50 lines |

**Total Duplication**: ~500+ lines of similar comma-handling code

### 2. Common Pattern Identified

All implementations follow this pattern:

```typescript
export function parse(css: string): Result<Type.SomeType, string> {
  const ast = csstree.parse(css, { context: "value" });
  const children = ast.children.toArray();
  
  const results: SomeItemType[] = [];
  let currentNodes: csstree.CssNode[] = [];
  
  for (const node of children) {
    if (node.type === "Operator" && "value" in node && node.value === ",") {
      // Parse accumulated nodes
      if (currentNodes.length === 1 && currentNodes[0]) {
        const itemResult = parseItem(currentNodes[0]);
        if (!itemResult.ok) return err(itemResult.error);
        results.push(itemResult.value);
        currentNodes = [];
      } else if (currentNodes.length === 0) {
        return err("Empty value before comma");
      } else {
        return err("Expected single value between commas");
      }
    } else {
      currentNodes.push(node);
    }
  }
  
  // Handle last value
  if (currentNodes.length === 1 && currentNodes[0]) {
    const itemResult = parseItem(currentNodes[0]);
    if (!itemResult.ok) return err(itemResult.error);
    results.push(itemResult.value);
  } else if (currentNodes.length === 0) {
    return err("Empty value");
  } else {
    return err("Expected single value");
  }
  
  if (results.length === 0) {
    return err("Requires at least one value");
  }
  
  return ok({ kind: "some-type", items: results });
}
```

### 3. Two Categories of Comma-Separated Properties

#### Category A: Single Value Per Item (Simple)
**Examples**: `animation-name`, `transition-property`, `animation-delay`

**Pattern**: Each comma-separated item is exactly ONE node/value
- `animation-name: fade, slide, bounce`
- `transition-delay: 1s, 500ms, 2s`

**Parsing**: `currentNodes.length === 1` between commas

#### Category B: Multiple Values Per Layer (Complex)
**Examples**: `box-shadow`, `text-shadow`, `background`

**Pattern**: Each comma-separated layer contains MULTIPLE nodes/values
- `box-shadow: 2px 2px 4px red, inset 0 0 10px blue`
- `background: url(img1.png) top left, url(img2.png) center`

**Parsing**: `currentNodes.length >= 1` between commas, must parse complex structure

### 4. MDN Data Analysis

**Properties with `#` multiplier** (comma-separated support): **80+ properties**

Key domains:
- **Animation** (14 properties) - all longhand
- **Transition** (4 properties) - all longhand
- **Background** (11 properties) - layered
- **Mask** (12 properties) - layered
- **Shadow** (2 properties) - layered
- **Font** (3 properties) - special cases
- **Transform** - sometimes comma-separated

See full list in MDN data: `/Users/alphab/Dev/LLM/DEV/mdm-data/css/properties.json`

---

## Proposed Solution

### Option A: Simple Single-Value Helper (RECOMMENDED)

**Use Case**: Category A properties (animation, transition longhand)

**API Design**:

```typescript
// @/utils/parse/comma-separated.ts

/**
 * Parse comma-separated list where each item is a single value.
 * 
 * @param css - CSS value string
 * @param itemParser - Function to parse each individual item
 * @param propertyName - Property name for error messages
 * @returns Result with array of parsed items
 * 
 * @example
 * parseCommaSeparatedSingle(
 *   "fade, slide, bounce",
 *   (node) => parseAnimationName(node),
 *   "animation-name"
 * )
 */
export function parseCommaSeparatedSingle<T>(
  css: string,
  itemParser: (node: csstree.CssNode) => Result<T, string>,
  propertyName: string
): Result<T[], string>
```

**Implementation** (~50 lines):
1. Parse CSS to AST
2. Split children by comma operators
3. For each segment, validate it's exactly 1 node
4. Call `itemParser` on that node
5. Collect results or return error

**Benefits**:
- Handles 90% of comma-separated cases
- Simple, focused API
- Easy to test and maintain
- Reduces each property from ~35 lines to ~10 lines

**Limitations**:
- Doesn't handle complex multi-value layers (box-shadow, background)
- Those remain custom implementations (justified complexity)

### Option B: Generic Multi-Value Helper

**Use Case**: Both Category A and Category B

**API Design**:

```typescript
/**
 * Parse comma-separated list where each item can be multiple values.
 * 
 * @param css - CSS value string
 * @param layerParser - Function to parse accumulated nodes for one layer
 * @param propertyName - Property name for error messages
 * @param options - Validation options (min/max nodes per layer)
 * @returns Result with array of parsed layers
 */
export function parseCommaSeparatedMulti<T>(
  css: string,
  layerParser: (nodes: csstree.CssNode[]) => Result<T, string>,
  propertyName: string,
  options?: {
    minNodesPerLayer?: number;
    maxNodesPerLayer?: number;
    allowEmpty?: boolean;
  }
): Result<T[], string>
```

**Benefits**:
- Handles both simple and complex cases
- More flexible

**Drawbacks**:
- More complex API
- Overkill for simple cases
- Each property still needs custom layer parser

---

## Recommended Implementation Plan

### Phase 1: Extract Simple Helper (PRIORITY)

**Goal**: Handle Category A properties (single value per item)

**Steps**:

1. **Create utility function** (~30 min)
   - File: `src/utils/parse/comma-separated.ts`
   - Function: `parseCommaSeparatedSingle<T>`
   - Tests: Basic comma splitting, edge cases, error handling
   - ~50 lines implementation + ~100 lines tests

2. **Refactor existing properties** (~2 hours)
   - Refactor 12 properties to use new helper:
     - `animation-name` (✓ good reference)
     - `animation-delay`
     - `animation-duration`
     - `animation-direction`
     - `animation-fill-mode`
     - `animation-iteration-count`
     - `animation-play-state`
     - `animation-timing-function`
     - `transition-property` (✓ good reference)
     - `transition-delay` (✓ good reference)
     - `transition-duration`
     - `transition-timing-function`
   
3. **Validate** (~15 min)
   - Run full test suite (should still be 2176 passing)
   - No behavior changes, just refactoring
   - Check code reduction: ~350 lines removed

**Time**: ~3 hours total
**Tests**: No new tests (existing tests validate behavior)
**Impact**: -350 lines, +150 lines (net -200 lines)

### Phase 2: Multi-Value Helper (FUTURE)

**Goal**: Handle Category B properties (if needed)

**When**: Only if we implement more complex comma-separated properties like:
- `background-image`
- `background-position`
- `mask-image`
- Multiple `transform` functions

**Decision**: Defer until needed. Current `box-shadow` and `text-shadow` are working well with custom implementation.

---

## Preprocessing Strategy

### Current Approach (No Preprocessing)
- CSS string → AST → Split by comma → Parse each item
- Works well, no preprocessing needed
- `csstree` handles all syntax edge cases

### Alternative: String Splitting (NOT RECOMMENDED)
- Could split by `,` at string level before parsing
- **Problems**:
  - CSS has commas in other contexts: `rgb(255, 0, 0)`
  - Would need complex regex or state machine
  - Reinventing what `csstree` already does
  - More bugs, less reliable

### Recommendation: Stick with AST-Based Splitting
- Let `csstree` parse first (handles all edge cases)
- Split at AST level (robust, correct)
- Our helper function operates on AST nodes
- **No preprocessing needed** ✓

---

## Code Examples

### Before (animation-name.ts - 119 lines)

```typescript
export function parse(css: string): Result<Type.AnimationName, string> {
  try {
    const ast = csstree.parse(css, { context: "value" });
    if (ast.type !== "Value") {
      return err("Expected Value node");
    }

    const children = ast.children.toArray();
    const names: Type.AnimationName["names"] = [];
    let currentNodes: csstree.CssNode[] = [];

    for (const node of children) {
      if (node.type === "Operator" && "value" in node && node.value === ",") {
        if (currentNodes.length === 1 && currentNodes[0]) {
          const nameResult = parseAnimationName(currentNodes[0]);
          if (!nameResult.ok) {
            return err(nameResult.error);
          }
          names.push(nameResult.value);
          currentNodes = [];
        } else if (currentNodes.length === 0) {
          return err("Empty value before comma");
        } else {
          return err("Expected single animation name between commas");
        }
      } else {
        currentNodes.push(node);
      }
    }

    // Handle last value
    if (currentNodes.length === 1 && currentNodes[0]) {
      const nameResult = parseAnimationName(currentNodes[0]);
      if (!nameResult.ok) {
        return err(nameResult.error);
      }
      names.push(nameResult.value);
    } else if (currentNodes.length === 0) {
      return err("Empty animation-name value");
    } else {
      return err("Expected single animation name");
    }

    if (names.length === 0) {
      return err("animation-name requires at least one value");
    }

    return ok({
      kind: "animation-name",
      names,
    });
  } catch (e) {
    return err(`Failed to parse animation-name: ${e instanceof Error ? e.message : String(e)}`);
  }
}
```

### After (animation-name.ts - ~60 lines, 50% reduction)

```typescript
import { parseCommaSeparatedSingle } from "@/utils/parse/comma-separated";

export function parse(css: string): Result<Type.AnimationName, string> {
  const namesResult = parseCommaSeparatedSingle(
    css,
    parseAnimationName,
    "animation-name"
  );
  
  if (!namesResult.ok) {
    return err(namesResult.error);
  }
  
  return ok({
    kind: "animation-name",
    names: namesResult.value,
  });
}
```

---

## Test Strategy

### For Helper Function

```typescript
// src/utils/parse/comma-separated.test.ts

describe("parseCommaSeparatedSingle", () => {
  it("parses single value", () => {
    // Test: "value" → ["value"]
  });
  
  it("parses multiple comma-separated values", () => {
    // Test: "a, b, c" → ["a", "b", "c"]
  });
  
  it("handles whitespace", () => {
    // Test: "a,b,c" and "a , b , c" → ["a", "b", "c"]
  });
  
  it("rejects empty values", () => {
    // Test: "a, , c" → error
  });
  
  it("rejects trailing comma", () => {
    // Test: "a, b," → error
  });
  
  it("rejects leading comma", () => {
    // Test: ", a, b" → error
  });
  
  it("propagates parser errors", () => {
    // Test: parser returns error → propagate with context
  });
});
```

### For Refactored Properties

**No new tests needed** - existing tests validate behavior remains identical.

Run after refactoring:
```bash
just test  # Should still be 2176/2176 passing
```

---

## Risk Assessment

### Low Risk ✅
- **Scope**: Pure refactoring, no behavior change
- **Tests**: Full coverage already exists (2176 tests)
- **Rollback**: Easy - keep old implementations in git history
- **Impact**: Internal only - no API changes

### Mitigation
- Refactor one property at a time
- Run tests after each property
- Compare before/after output for same inputs
- Keep helper function simple and well-tested

---

## Success Criteria

1. ✅ Helper function created with full test coverage
2. ✅ 12 properties refactored to use helper
3. ✅ All 2176 tests still passing
4. ✅ Net code reduction: ~200 lines
5. ✅ No behavior changes (verified by tests)
6. ✅ Code more maintainable (DRY principle)

---

## Future Work

### Additional Properties to Implement (with comma-separated support)

**High Priority** (commonly used):
- `font-family` - comma-separated font names
- `background-image` - layered (complex)
- `background-position` - layered (complex)
- `will-change` - comma-separated property names
- `filter` - comma-separated filter functions

**Medium Priority**:
- Mask properties (12 properties) - layered
- `font-variant` - comma-separated features
- `font-feature-settings` - comma-separated settings

**Low Priority**:
- Anchor properties
- Vendor-prefixed mask properties

---

## References

### MDN Data
- Properties: `/Users/alphab/Dev/LLM/DEV/mdm-data/css/properties.json`
- Syntax definitions: Search for `#` multiplier (comma-separated)

### Existing Implementations
- Simple pattern: `src/parse/animation/name.ts`
- Simple pattern: `src/parse/transition/property.ts`
- Complex pattern: `src/parse/shadow/box-shadow.ts`

### CSS Specs
- [CSS Syntax Module Level 3](https://www.w3.org/TR/css-syntax-3/)
- [CSS Values and Units Module Level 4](https://www.w3.org/TR/css-values-4/)
- Multipliers: `#` means comma-separated, one or more

---

## Decision

**PROCEED WITH PHASE 1**: Extract `parseCommaSeparatedSingle` helper

**Rationale**:
1. Clear duplication (12 properties, ~350 lines)
2. Low risk (pure refactoring, full test coverage)
3. High value (maintainability, consistency)
4. Quick win (~3 hours total)
5. Foundation for future comma-separated properties

**Next Steps**:
1. Get approval on this proposal
2. Create implementation plan document
3. Execute Phase 1 (helper + refactor 12 properties)
4. Create HANDOVER.md with results

---

**Status**: 🟢 READY TO IMPLEMENT
