# Unified API Audit - Parse/Generate Modules

**Date**: 2025-10-21  
**Context**: Evaluate all parse/generate modules for unified API pattern

---

## Executive Summary

**Current State**: Mixed API patterns across 14 parse modules
- ✅ **3 modules** already have unified API (gradient, transform, position)
- ⚠️ **5 modules** need unified API (clip-path, color, filter, animation, transition)
- ✅ **6 modules** are simple properties (no dispatcher needed)

**Recommendation**: Implement dispatcher pattern for 5 complex modules

---

## Module Audit Results

### Category 1: ✅ Already Has Unified API

#### 1. **gradient** (4 parsers)
- `linear.ts`, `radial.ts`, `conic.ts`, `color-stop.ts`
- **Status**: ✅ Uses `Gradient.Linear.parse()`, `Gradient.Radial.parse()`, etc.
- **Pattern**: Namespace exports (good for expert usage)
- **Action**: Consider adding `parse()` dispatcher for auto-detect

#### 2. **transform** (1 parser + origin)
- `transform.ts`, `origin.ts`
- **Status**: ✅ Has unified `Transform.parse()` that handles all functions
- **Pattern**: Single parser with internal dispatcher
- **Action**: None - already optimal

#### 3. **position** (1 parser)
- `position.ts`
- **Status**: ✅ Single parser
- **Action**: None - no dispatcher needed

---

### Category 2: ⚠️ Needs Unified API (Priority)

#### 4. **clip-path** (10 parsers) 🎯 HIGH PRIORITY
- `circle`, `ellipse`, `inset`, `polygon`, `rect`, `xywh`, `path`, `url`, `none`, `geometry-box`
- **Current**: Namespace exports only (`ClipPath.Circle.parse()`)
- **Needed**: Unified `parse()` dispatcher
- **Complexity**: MEDIUM (10 variants, clear switch logic)
- **Estimate**: 45 minutes

#### 5. **color** (12 parsers) 🎯 HIGH PRIORITY
- `hex`, `rgb`, `hsl`, `hwb`, `lab`, `lch`, `oklab`, `oklch`, `named`, `special`, `system`, `color-function`
- **Current**: Namespace exports only (`Color.Rgb.parse()`)
- **Needed**: Unified `parse()` dispatcher with format detection
- **Complexity**: HIGH (12 formats, hex regex, keyword detection)
- **Estimate**: 60 minutes

#### 6. **filter** (11 parsers) 🎯 MEDIUM PRIORITY
- `blur`, `brightness`, `contrast`, `drop-shadow`, `grayscale`, `hue-rotate`, `invert`, `opacity`, `saturate`, `sepia`, `url`
- **Current**: Namespace exports only (`Filter.Blur.parse()`)
- **Needed**: Unified `parse()` dispatcher
- **Complexity**: MEDIUM (11 functions, clear switch logic)
- **Estimate**: 45 minutes

#### 7. **animation** (8 parsers) ⚪ LOW PRIORITY
- `delay`, `direction`, `duration`, `fill-mode`, `iteration-count`, `name`, `play-state`, `timing-function`
- **Current**: Namespace exports (individual properties)
- **Needed**: Consider unified API for convenience
- **Complexity**: LOW (mostly independent properties)
- **Estimate**: 30 minutes
- **Note**: May not need dispatcher - these are separate properties

#### 8. **transition** (4 parsers) ⚪ LOW PRIORITY
- `delay`, `duration`, `property`, `timing-function`
- **Current**: Namespace exports (individual properties)
- **Needed**: Consider unified API for convenience
- **Complexity**: LOW (independent properties)
- **Estimate**: 20 minutes
- **Note**: May not need dispatcher - these are separate properties

---

### Category 3: ✅ Simple Properties (No Dispatcher Needed)

#### 9. **background** (5 parsers)
- `attachment`, `clip`, `origin`, `repeat`, `size`
- **Status**: ✅ Individual properties, no dispatcher needed
- **Action**: None

#### 10. **border** (4 parsers)
- `color`, `radius`, `style`, `width`
- **Status**: ✅ Individual properties, no dispatcher needed
- **Action**: None

#### 11. **layout** (13 parsers)
- `bottom`, `cursor`, `display`, `height`, `left`, `opacity`, etc.
- **Status**: ✅ Individual properties, no dispatcher needed
- **Action**: None

#### 12. **outline** (4 parsers)
- `color`, `offset`, `style`, `width`
- **Status**: ✅ Individual properties, no dispatcher needed
- **Action**: None

#### 13. **shadow** (2 parsers)
- `box-shadow`, `text-shadow`
- **Status**: ✅ Only 2 parsers, namespace export sufficient
- **Action**: None

#### 14. **text** (4 parsers)
- `color`, `line`, `style`, `thickness`
- **Status**: ✅ Individual properties, no dispatcher needed
- **Action**: None

---

## Priority Matrix

| Module | Parsers | Complexity | Priority | Estimate | Reason |
|--------|---------|------------|----------|----------|--------|
| **clip-path** | 10 | MEDIUM | 🎯 HIGH | 45 min | Many shapes, user mentioned |
| **color** | 12 | HIGH | 🎯 HIGH | 60 min | Most formats, commonly used |
| **filter** | 11 | MEDIUM | 🎯 MEDIUM | 45 min | Many functions, clear pattern |
| **animation** | 8 | LOW | ⚪ LOW | 30 min | Separate properties |
| **transition** | 4 | LOW | ⚪ LOW | 20 min | Separate properties |

**Total Estimate**: 3.3 hours (200 minutes)

---

## Design Pattern: Unified Dispatcher

### Template Structure

```typescript
// src/parse/{module}/{module}.ts
export function parse(value: string): Result<Type.{Module}, string> {
  const ast = cssTree.parse(value, { context: "value" });
  return parseNode(ast.children.first);
}

export function parseNode(node: CssNode): Result<Type.{Module}, string> {
  // Auto-detect and dispatch to appropriate parser
  if (node.type === "Function") {
    switch (node.name.toLowerCase()) {
      case "variant1": return Variant1.parseNode(node);
      case "variant2": return Variant2.parseNode(node);
      default: return err(`Unknown function: ${node.name}`);
    }
  }
  
  // Handle keywords, special cases, etc.
  return err("Invalid value");
}
```

### Index.ts Pattern

```typescript
// Primary API (recommended)
export { parse, parseNode } from "./{module}";

// Expert API (namespaced - backward compatible)
export * as Variant1 from "./variant1";
export * as Variant2 from "./variant2";
// ... etc
```

---

## Benefits of Unified API

### 1. ✅ Better Developer Experience
```typescript
// Before (user must know format)
import * as Color from "@/parse/color";
Color.Rgb.parse("rgb(255, 0, 0)");

// After (auto-detect)
import { parse } from "@/parse/color";
parse("rgb(255, 0, 0)");
parse("#ff0000");
parse("red");
```

### 2. ✅ Backward Compatible
```typescript
// Expert API still available
import * as Color from "@/parse/color";
Color.Rgb.parse(ast); // Direct access, no dispatch overhead
```

### 3. ✅ Type-Safe
```typescript
const result: Result<Type.Color, string> = parse("red");
if (result.ok) {
  // Type narrowing works correctly
}
```

### 4. ✅ Testable
```typescript
// Dispatcher logic is isolated and testable
describe("Color.parse dispatcher", () => {
  it("detects rgb format", () => { ... });
  it("detects hex format", () => { ... });
});
```

---

## Recommendation

**Start with Phases 1-3** (clip-path, color, filter):
- High value, clear benefit
- 2.5 hours total
- Establishes pattern for future modules
- Zero breaking changes

**Defer animation/transition** until user feedback on first 3 phases.

---

**Next**: Create MASTER_PLAN.md for implementation
