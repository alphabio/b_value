# Architecture Plan: Spec-Aligned Comma-Splitting Utilities

**Date**: 2025-10-20  
**Type**: 🏗️ Architecture & Implementation Plan  
**Priority**: 🔥 CRITICAL - Infrastructure Redesign  
**Est. Time**: 60-75 minutes  
**Status**: 🚧 READY FOR IMPLEMENTATION

---

## Executive Summary

**Problem**: Current API is confusing - mixing "single vs multi node" when the real distinction is semantic: **Values vs Layers**

**User's Insight**: 
> "parseCommaSeparatedSingle - is this exclusive to animation-name? I think splitValue applies here"
> "parseCommaSeparatedMulti - splitValue?? We have layers here, when split we can treat each layer as a value"
> "The other split we need is splitFunction as in gradient(here)"

**Correct Architecture**: Three distinct splitting utilities matching CSS spec concepts:
1. **`splitValue`** - Comma-separated VALUES (keywords OR functions)
2. **`splitLayer`** - Comma-separated LAYERS (multiple tokens per layer)
3. **`splitFunction`** - Function ARGUMENTS (already implemented as `splitNodesByComma`)

---

## The Real Pattern Distinction

### ❌ WRONG: "Single Node vs Multi Node"

This is implementation detail, not semantic meaning!

### ✅ CORRECT: Semantic CSS Concepts

#### 1. splitValue - Independent Complete Values

```css
animation-name: fade, slide, bounce
/* Value 1: fade (keyword) */
/* Value 2: slide (keyword) */
/* Value 3: bounce (keyword) */

background-image: url(a.png), linear-gradient(red, blue)
/* Value 1: url(a.png) (function) */
/* Value 2: linear-gradient(red, blue) (function with internal commas!) */

transition-property: opacity, transform
/* Value 1: opacity (keyword) */
/* Value 2: transform (keyword) */
```

**Key**: Each comma-separated item is a **complete value** (can be keyword, function, or expression)

---

#### 2. splitLayer - Layer Components

```css
box-shadow: 2px 2px 5px red, 3px 3px blue
/* Layer 1: 2px 2px 5px red (4 tokens forming one shadow) */
/* Layer 2: 3px 3px blue (3 tokens forming one shadow) */

text-shadow: 1px 1px red, 2px 2px blue
/* Layer 1: 1px 1px red (3 tokens forming one shadow) */
/* Layer 2: 2px 2px blue (3 tokens forming one shadow) */
```

**Key**: Each comma-separated item is a **layer with multiple components**

---

#### 3. splitFunction - Function Arguments (✅ Already Done!)

```css
linear-gradient(red, blue, green)
/* Arg 1: red */
/* Arg 2: blue */
/* Arg 3: green */

polygon(0% 0%, 100% 0%, 50% 100%)
/* Point 1: 0% 0% */
/* Point 2: 100% 0% */
/* Point 3: 50% 100% */
```

**Key**: Split comma-separated arguments **inside function parentheses**
**Status**: ✅ Already implemented as `splitNodesByComma()` in `src/utils/ast/`

---

## Current State Analysis

### What We Have (Misnamed)

```typescript
// src/utils/parse/comma-separated.ts

parseCommaSeparatedSingle<T>(
  css: string,
  itemParser: (node: CssNode) => Result<T, string>,
  propertyName: string
): Result<T[], string>
```

**Current use**: Animation/transition properties
**Real semantic**: This is **splitValue** (each comma-separated item is a complete value)
**Problem**: Name implies "single item" but actually about "complete values"

### What We Need

1. **Rename** `parseCommaSeparatedSingle` → `splitValue`
2. **Create** `splitLayer` for box-shadow, text-shadow
3. **Keep** `splitNodesByComma` (it's already correct for function args)

---

## Proposed API (Spec-Aligned)

### Location: `src/utils/parse/comma.ts` (new clean file)

```typescript
/**
 * Split comma-separated VALUES where each value is a complete independent item.
 * 
 * A "value" can be:
 * - A keyword: fade, slide, bounce
 * - A function: url(...), linear-gradient(...)
 * - A complex expression: calc(100% - 20px)
 * 
 * Use for properties with syntax: <value>#
 * 
 * Examples:
 * - animation-name: fade, slide, bounce
 * - background-image: url(a.png), linear-gradient(red, blue)
 * - transition-property: opacity, transform
 * - font-family: Arial, "Times New Roman", sans-serif
 * 
 * @param css - CSS value string
 * @param valueParser - Parser for each complete value (receives single node or function)
 * @param propertyName - For error messages
 */
export function splitValue<T>(
  css: string,
  valueParser: (node: CssNode) => Result<T, string>,
  propertyName: string
): Result<T[], string>

/**
 * Split comma-separated LAYERS where each layer has multiple components.
 * 
 * A "layer" is a comma-separated group of tokens that together form one
 * visual layer/effect. Each layer is parsed as a unit.
 * 
 * Use for properties where commas separate layers, not independent values.
 * 
 * Examples:
 * - box-shadow: 2px 2px 5px red, 3px 3px blue
 * - text-shadow: 1px 1px red, 2px 2px blue
 * - background: url(a.png) center / cover, linear-gradient(red, blue)
 * 
 * @param css - CSS value string
 * @param layerParser - Parser for each layer (receives array of nodes)
 * @param propertyName - For error messages
 */
export function splitLayer<T>(
  css: string,
  layerParser: (nodes: CssNode[]) => Result<T, string>,
  propertyName: string
): Result<T[], string>
```

---

## Why This API Is Better

### 1. Matches CSS Spec Terminology

CSS specs talk about "comma-separated values" and "layered values" - our API now matches!

### 2. Clear Use Case from Name

```typescript
// Clear: splitting values
splitValue(css, parseAnimationName, "animation-name")

// Clear: splitting layers
splitLayer(css, parseShadowLayer, "box-shadow")

// Clear: splitting function args (different domain - AST level)
splitNodesByComma(nodes, { startIndex: 0 })
```

### 3. Handles Complexity Correctly

**splitValue** handles EITHER:
- Simple keywords: `fade`
- Complex functions: `linear-gradient(red, blue)` (as single value!)

**splitLayer** handles:
- Multiple tokens forming one layer: `2px 2px 5px red`

### 4. Future-Proof

```typescript
// Future: background shorthand (layers!)
splitLayer(css, parseBackgroundLayer, "background")
// Each layer: "url(a.png) center / cover no-repeat"

// Future: transform list (values!)
splitValue(css, parseTransformFunction, "transform")
// Each value: "translate(10px)", "rotate(45deg)"
```

---

## Implementation Plan

### Phase 1: Create New Clean API (30 min)

**File**: `src/utils/parse/comma.ts` (NEW - clean start)

**Step 1**: Implement `splitValue()` (15 min)
```typescript
// Copy logic from parseCommaSeparatedSingle
// Rename, clean up, improve JSDoc
// Same behavior, better name
```

**Step 2**: Implement `splitLayer()` (15 min)
```typescript
// New utility - similar to splitValue but:
// - Collects ALL nodes between commas (not just 1)
// - Passes array to parser (not single node)
```

---

### Phase 2: Write Tests (20 min)

**File**: `src/utils/parse/comma.test.ts` (NEW)

**splitValue tests** (10 tests):
1. Single keyword value
2. Multiple keyword values
3. Function value (url)
4. Multiple function values
5. Mixed keywords and functions
6. Nested function commas (shouldn't split!)
7. Empty value (error)
8. Trailing comma (error)
9. Whitespace handling
10. Error propagation

**splitLayer tests** (8 tests):
1. Single layer, multiple tokens
2. Multiple layers
3. Layers with different token counts
4. Nested function in layer (shouldn't split on internal comma!)
5. Empty layer (error)
6. Whitespace handling
7. Error propagation
8. Complex layer with function

---

### Phase 3: Migrate Existing Code (20 min)

**Step 1**: Update animation/transition properties (10 min)

```typescript
// Before
import { parseCommaSeparatedSingle } from "@/utils/parse/comma-separated";
const result = parseCommaSeparatedSingle(css, parseAnimationName, "animation-name");

// After
import { splitValue } from "@/utils/parse/comma";
const result = splitValue(css, parseAnimationName, "animation-name");
```

Files to update (12 files):
- src/parse/animation/*.ts (8 files)
- src/parse/transition/*.ts (4 files)

**Step 2**: Refactor shadow properties (10 min)

```typescript
// box-shadow.ts - Before (~195 lines with manual loop)
export function parse(css: string): Result<BoxShadow, string> {
  const ast = csstree.parse(css, { context: "value" });
  const children = ast.children.toArray();
  const shadows: BoxShadowLayer[] = [];
  let currentNodes: csstree.CssNode[] = [];
  
  for (const node of children) {
    if (node.type === "Operator" && "value" in node && node.value === ",") {
      // ... 20 lines of manual comma handling
    }
  }
  // ... more manual code
}

// box-shadow.ts - After (~165 lines)
import { splitLayer } from "@/utils/parse/comma";

export function parse(css: string): Result<BoxShadow, string> {
  if (css.trim() === "none") {
    return ok({ kind: "box-shadow", layers: [] });
  }

  const result = splitLayer(css, parseShadowLayer, "box-shadow");
  if (!result.ok) return result;
  
  return ok({ kind: "box-shadow", layers: result.value });
}

// parseShadowLayer stays the same - it already takes CssNode[]!
```

Same pattern for text-shadow.ts

---

### Phase 4: Deprecate Old API (5 min)

**File**: `src/utils/parse/comma-separated.ts`

```typescript
/**
 * @deprecated Use splitValue from @/utils/parse/comma instead
 */
export { splitValue as parseCommaSeparatedSingle } from "./comma";
```

Keep file for backward compatibility but deprecate.

---

## Critical: Nested Comma Handling

### The Challenge

```css
/* splitValue example */
background-image: linear-gradient(red, blue), url(a.png)
                              ↑ DON'T split here! This is inside function
                                        ↑ Split HERE - separates values

/* splitLayer example */
box-shadow: drop-shadow(1px, 2px), 3px 3px blue
                       ↑ DON'T split here! Inside function
                                 ↑ Split HERE - separates layers
```

### The Solution

**css-tree handles this automatically!**

When you call `csstree.parse(css, {context: "value"})`:
- Top-level commas appear in `ast.children`
- Nested commas (inside functions) are hidden inside function nodes

**Proof**:
```typescript
const ast = csstree.parse("linear-gradient(red, blue), url(a.png)", {context: "value"});
ast.children.toArray() = [
  FunctionNode("linear-gradient") {  // SINGLE node at top level!
    children: [Identifier(red), Operator(","), Identifier(blue)]
  },
  Operator(","),  // ← This is the VALUE separator
  FunctionNode("url") { ... }
]
```

**Both `splitValue` and `splitLayer` only iterate `ast.children` - nested commas never seen!**

**MUST TEST**: Verify with both utilities!

---

## Complete Implementation Code

### splitValue (src/utils/parse/comma.ts)

```typescript
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";

/**
 * Split comma-separated VALUES where each value is a complete independent item.
 *
 * Automatically handles nested commas inside functions - only splits on
 * top-level property commas.
 *
 * @example
 * ```typescript
 * // Keywords
 * const result = splitValue(
 *   "fade, slide, bounce",
 *   parseAnimationName,
 *   "animation-name"
 * );
 *
 * // Functions
 * const result = splitValue(
 *   "url(a.png), linear-gradient(red, blue)",
 *   parseBackgroundImage,
 *   "background-image"
 * );
 * ```
 */
export function splitValue<T>(
  css: string,
  valueParser: (node: csstree.CssNode) => Result<T, string>,
  propertyName: string,
): Result<T[], string> {
  try {
    const ast = csstree.parse(css, { context: "value" });

    if (ast.type !== "Value") {
      return err(`${propertyName}: Expected Value node`);
    }

    const children = ast.children.toArray();
    const results: T[] = [];
    let currentNodes: csstree.CssNode[] = [];

    for (const node of children) {
      if (node.type === "Operator" && "value" in node && node.value === ",") {
        // Found value separator
        if (currentNodes.length === 1 && currentNodes[0]) {
          // Parse the single value (keyword or function)
          const valueResult = valueParser(currentNodes[0]);
          if (!valueResult.ok) {
            return err(`${propertyName}: ${valueResult.error}`);
          }
          results.push(valueResult.value);
          currentNodes = [];
        } else if (currentNodes.length === 0) {
          return err(`${propertyName}: Empty value before comma`);
        } else {
          // More than one node between commas - invalid for value splitting
          return err(
            `${propertyName}: Expected single value between commas, got ${currentNodes.length} nodes`
          );
        }
      } else if (node.type !== "WhiteSpace") {
        // Collect non-whitespace nodes
        currentNodes.push(node);
      }
    }

    // Parse final value
    if (currentNodes.length === 1 && currentNodes[0]) {
      const valueResult = valueParser(currentNodes[0]);
      if (!valueResult.ok) {
        return err(`${propertyName}: ${valueResult.error}`);
      }
      results.push(valueResult.value);
    } else if (currentNodes.length === 0) {
      if (results.length === 0) {
        return err(`${propertyName}: Empty value`);
      }
      // Trailing comma case - already have results
    } else {
      return err(
        `${propertyName}: Expected single value, got ${currentNodes.length} nodes`
      );
    }

    return ok(results);
  } catch (error) {
    return err(
      `${propertyName}: Parse error: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
```

---

### splitLayer (src/utils/parse/comma.ts)

```typescript
/**
 * Split comma-separated LAYERS where each layer has multiple components.
 *
 * Automatically handles nested commas inside functions - only splits on
 * top-level property commas.
 *
 * @example
 * ```typescript
 * const result = splitLayer(
 *   "2px 2px 5px red, 3px 3px blue",
 *   parseShadowLayer,
 *   "box-shadow"
 * );
 * ```
 */
export function splitLayer<T>(
  css: string,
  layerParser: (nodes: csstree.CssNode[]) => Result<T, string>,
  propertyName: string,
): Result<T[], string> {
  try {
    const ast = csstree.parse(css, { context: "value" });

    if (ast.type !== "Value") {
      return err(`${propertyName}: Expected Value node`);
    }

    const children = ast.children.toArray();
    const results: T[] = [];
    let currentNodes: csstree.CssNode[] = [];

    for (const node of children) {
      if (node.type === "Operator" && "value" in node && node.value === ",") {
        // Found layer separator
        if (currentNodes.length > 0) {
          const layerResult = layerParser(currentNodes);
          if (!layerResult.ok) {
            return err(`${propertyName}: ${layerResult.error}`);
          }
          results.push(layerResult.value);
          currentNodes = [];
        } else {
          return err(`${propertyName}: Empty layer before comma`);
        }
      } else {
        // Collect all nodes (including whitespace - let layer parser handle)
        currentNodes.push(node);
      }
    }

    // Parse final layer
    if (currentNodes.length > 0) {
      const layerResult = layerParser(currentNodes);
      if (!layerResult.ok) {
        return err(`${propertyName}: ${layerResult.error}`);
      }
      results.push(layerResult.value);
    } else if (results.length === 0) {
      return err(`${propertyName}: Empty value`);
    }

    return ok(results);
  } catch (error) {
    return err(
      `${propertyName}: Parse error: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
```

---

## Migration Strategy

### Backward Compatibility

**Keep old exports** with deprecation:

```typescript
// src/utils/parse/comma-separated.ts
/**
 * @deprecated Use splitValue from @/utils/parse/comma instead
 */
export { splitValue as parseCommaSeparatedSingle } from "./comma";
```

### Gradual Migration

1. Create new `comma.ts` file
2. Implement `splitValue` and `splitLayer`
3. Add re-export with deprecation in old file
4. Update properties one by one (can be gradual)
5. Shadow properties benefit immediately

---

## Test Specifications

### splitValue Tests

```typescript
describe("splitValue", () => {
  test("parses single keyword value", () => {
    const result = splitValue(
      "fade",
      (node) => ok({ name: csstree.generate(node) }),
      "test"
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toHaveLength(1);
      expect(result.value[0]?.name).toBe("fade");
    }
  });

  test("parses multiple keyword values", () => {
    const result = splitValue(
      "fade, slide, bounce",
      (node) => ok({ name: csstree.generate(node) }),
      "test"
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toHaveLength(3);
    }
  });

  test("CRITICAL: handles nested function commas", () => {
    // linear-gradient has internal comma - should NOT split on it
    const result = splitValue(
      "linear-gradient(red, blue), url(a.png)",
      (node) => ok({ type: node.type }),
      "test"
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      // Should be 2 values, NOT 3!
      expect(result.value).toHaveLength(2);
    }
  });

  test("errors on empty value", () => {
    const result = splitValue(
      "fade, , slide",
      (node) => ok({ name: csstree.generate(node) }),
      "test"
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("Empty value");
    }
  });

  test("errors on multiple nodes between commas", () => {
    const result = splitValue(
      "fade slide, bounce",
      (node) => ok({ name: csstree.generate(node) }),
      "test"
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("Expected single value");
    }
  });
});
```

### splitLayer Tests

```typescript
describe("splitLayer", () => {
  test("parses single layer with multiple tokens", () => {
    const result = splitLayer(
      "2px 2px red",
      (nodes) => ok({ count: nodes.filter(n => n.type !== "WhiteSpace").length }),
      "test"
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toHaveLength(1);
      expect(result.value[0]?.count).toBe(3);
    }
  });

  test("parses multiple layers", () => {
    const result = splitLayer(
      "2px 2px red, 3px 3px blue",
      (nodes) => ok({ count: nodes.filter(n => n.type !== "WhiteSpace").length }),
      "test"
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toHaveLength(2);
    }
  });

  test("CRITICAL: handles nested function commas in layer", () => {
    const result = splitLayer(
      "drop-shadow(1px, 2px), 3px 3px blue",
      (nodes) => ok({ nodeCount: nodes.length }),
      "test"
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      // Should be 2 layers, NOT 3!
      expect(result.value).toHaveLength(2);
    }
  });

  test("handles layers with different token counts", () => {
    const result = splitLayer(
      "2px, 3px 3px 5px red",
      (nodes) => ok({ count: nodes.filter(n => n.type !== "WhiteSpace").length }),
      "test"
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value[0]?.count).toBe(1);  // First layer: 1 token
      expect(result.value[1]?.count).toBe(4);  // Second layer: 4 tokens
    }
  });
});
```

---

## Success Criteria

### Must Have ✅
- [ ] `splitValue()` implemented
- [ ] `splitLayer()` implemented
- [ ] Both nested comma tests pass (CRITICAL!)
- [ ] box-shadow refactored (~30 lines removed)
- [ ] text-shadow refactored (~30 lines removed)
- [ ] All 2216+ tests passing
- [ ] 18+ new tests (10 splitValue + 8 splitLayer)

### Nice to Have 🎯
- [ ] Animation/transition properties migrated to new API
- [ ] Deprecation notice on old export
- [ ] START_HERE updated with new API names

---

## Time Estimate

| Task | Time |
|------|------|
| Implement splitValue + splitLayer | 30 min |
| Write 18 tests | 20 min |
| Refactor box-shadow + text-shadow | 10 min |
| Migrate 12 animation/transition props | 10 min |
| Quality gates + docs | 10 min |
| **Total** | **80 min** |

---

## Handover Checklist

### Setup
- [ ] Read this ARCHITECTURE.md fully
- [ ] Run baseline: `just check && just test` (2216 passing)
- [ ] Understand value vs layer distinction

### Implement
- [ ] Create `src/utils/parse/comma.ts`
- [ ] Implement `splitValue()`
- [ ] Implement `splitLayer()`
- [ ] Write 18+ tests
- [ ] Refactor box-shadow
- [ ] Refactor text-shadow
- [ ] (Optional) Migrate animation/transition props

### Validate
- [ ] **CRITICAL**: Both nested comma tests pass!
- [ ] `just check` passes
- [ ] `just test` passes (all 2234+ tests)
- [ ] Test with real examples

### Document
- [ ] Create HANDOVER.md
- [ ] Update CONTINUE.md
- [ ] Update START_HERE with new API

---

## API Summary

```typescript
// src/utils/parse/comma.ts

// For comma-separated VALUES (complete items - keywords or functions)
splitValue<T>(
  css: string,
  valueParser: (node: CssNode) => Result<T, string>,
  propertyName: string
): Result<T[], string>

// For comma-separated LAYERS (multiple tokens per layer)
splitLayer<T>(
  css: string,
  layerParser: (nodes: CssNode[]) => Result<T, string>,
  propertyName: string
): Result<T[], string>

// src/utils/ast/split-by-comma.ts (already exists!)

// For function ARGUMENTS (inside parentheses)
splitNodesByComma(
  nodes: CssNode[],
  options?: { startIndex?, allowEmpty?, trimWhitespace? }
): CssNode[][]
```

---

**Status**: 🚀 **SPEC-ALIGNED ARCHITECTURE - READY TO IMPLEMENT**

**Key Insight**: Match CSS spec terminology (Values, Layers, Functions) not implementation details (Single, Multi)

**Next Agent**: Follow phases step-by-step. Test nested commas in BOTH utilities!

**Good luck!** 🎉
