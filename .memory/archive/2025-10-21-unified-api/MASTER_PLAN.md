# Unified API Implementation - MASTER PLAN

**Date**: 2025-10-21  
**Session**: unified-api  
**Goal**: Add unified `parse()` API to multi-function modules  
**Baseline**: 2318 tests passing

---

## Quick Start

**First time here?**
1. Read: AUDIT.md for full context
2. Run: `just check && just test` (verify baseline)
3. Start: Phase 1 (clip-path)

**Returning?**
1. Check progress tracker below
2. Find your phase
3. Continue from there

---

## Progress Tracker

| Phase | Module | Parsers | Status | Duration | Tests | Completed |
|-------|--------|---------|--------|----------|-------|-----------|
| 1 | clip-path | 10 | ⚪ TODO | 45 min | 2318 | - |
| 2 | color | 12 | ⚪ TODO | 60 min | 2318 | - |
| 3 | filter | 11 | ⚪ TODO | 45 min | 2318 | - |

**Status Legend**: ⚪ TODO | 🔵 IN PROGRESS | ✅ DONE | ⚠️ BLOCKED

**Total Time**: 2.5 hours (150 minutes)

---

## Overall Goal

**Current State**:
```typescript
// User must know which parser to call
import * as ClipPath from "@/parse/clip-path";
ClipPath.Circle.parse("circle(50%)");

import * as Color from "@/parse/color";
Color.Rgb.parse("rgb(255, 0, 0)");
```

**Target State**:
```typescript
// Auto-detect and parse
import { parse } from "@/parse/clip-path";
parse("circle(50%)");

import { parse } from "@/parse/color";
parse("rgb(255, 0, 0)");
parse("#ff0000");
parse("red");
```

**Benefits**:
- ✅ Better developer experience
- ✅ Backward compatible (namespace exports preserved)
- ✅ Type-safe with Result<T, string>
- ✅ Zero breaking changes

---

## Phase 1: clip-path (45 min)

**Status**: ⚪ TODO  
**Complexity**: MEDIUM  
**Parsers**: 10 (circle, ellipse, inset, polygon, rect, xywh, path, url, none, geometry-box)

### Tasks

1. **Create dispatcher** (20 min)
   - Create `src/parse/clip-path/clip-path.ts`
   - Implement `parse(value: string)` function
   - Implement `parseNode(node: CssNode)` function
   - Handle all 10 variants with switch statement

2. **Update exports** (5 min)
   - Update `src/parse/clip-path/index.ts`
   - Add: `export { parse, parseNode } from "./clip-path"`
   - Keep namespace exports for backward compatibility

3. **Add tests** (15 min)
   - Create `src/parse/clip-path/clip-path.test.ts`
   - Test dispatcher logic for all 10 shapes
   - Test error cases (unknown functions)

4. **Verify** (5 min)
   - Run `just check && just test`
   - All 2318 tests passing
   - Commit with clear message

### Success Criteria

- [ ] `parse()` and `parseNode()` functions created
- [ ] All 10 shapes dispatched correctly
- [ ] Backward compatible namespace exports preserved
- [ ] Tests for dispatcher logic (10+ tests)
- [ ] All 2318 tests passing
- [ ] Clean git commit

### Implementation Template

```typescript
// src/parse/clip-path/clip-path.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as Circle from "./circle";
import * as Ellipse from "./ellipse";
// ... import all parsers

/**
 * Parse clip-path value with auto-detection.
 */
export function parse(value: string): Result<Type.ClipPath, string> {
  const ast = cssTree.parse(value, { context: "value" });
  const first = ast.children.first;
  if (!first) return err("Empty value");
  return parseNode(first);
}

/**
 * Parse clip-path AST node with auto-detection.
 */
export function parseNode(node: csstree.CssNode): Result<Type.ClipPath, string> {
  // Keyword: none
  if (node.type === "Identifier" && node.name === "none") {
    return None.parseNode(node);
  }
  
  // URL reference
  if (node.type === "Url") {
    return Url.parseNode(node);
  }
  
  // Basic shapes (function)
  if (node.type === "Function") {
    switch (node.name.toLowerCase()) {
      case "circle": return Circle.parseNode(node);
      case "ellipse": return Ellipse.parseNode(node);
      case "inset": return Inset.parseNode(node);
      case "polygon": return Polygon.parseNode(node);
      case "rect": return Rect.parseNode(node);
      case "xywh": return Xywh.parseNode(node);
      case "path": return Path.parseNode(node);
      default: return err(`Unknown clip-path function: ${node.name}`);
    }
  }
  
  // Geometry-box keyword
  return GeometryBox.parseNode(node);
}
```

---

## Phase 2: color (60 min)

**Status**: ⚪ TODO  
**Complexity**: HIGH  
**Parsers**: 12 (hex, rgb, hsl, hwb, lab, lch, oklab, oklch, named, special, system, color-function)

### Tasks

1. **Create dispatcher** (35 min)
   - Create `src/parse/color/color.ts`
   - Implement `parse(value: string)` function
   - Implement `parseNode(node: CssNode)` function
   - **Smart detection**:
     - Hex: Check for `#` prefix
     - Named: Lookup in named colors
     - Special: Check for `transparent`, `currentcolor`
     - System: Check system color keywords
     - Function: Switch on function name

2. **Update exports** (5 min)
   - Update `src/parse/color/index.ts`
   - Add: `export { parse, parseNode } from "./color"`

3. **Add tests** (15 min)
   - Create `src/parse/color/color.test.ts`
   - Test all 12 format detections
   - Test error cases

4. **Verify** (5 min)
   - Run `just check && just test`
   - All 2318 tests passing

### Success Criteria

- [ ] Smart format detection implemented
- [ ] All 12 formats dispatched correctly
- [ ] Performance optimized (minimal overhead)
- [ ] Tests for dispatcher logic (15+ tests)
- [ ] All 2318 tests passing

### Implementation Notes

**Format Detection Strategy**:
```typescript
export function parseNode(node: csstree.CssNode): Result<Type.Color, string> {
  // 1. Hex (Hash node)
  if (node.type === "Hash") {
    return Hex.parseNode(node);
  }
  
  // 2. Function (rgb, hsl, etc.)
  if (node.type === "Function") {
    switch (node.name.toLowerCase()) {
      case "rgb":
      case "rgba": return Rgb.parseNode(node);
      case "hsl":
      case "hsla": return Hsl.parseNode(node);
      case "hwb": return Hwb.parseNode(node);
      case "lab": return Lab.parseNode(node);
      case "lch": return Lch.parseNode(node);
      case "oklab": return Oklab.parseNode(node);
      case "oklch": return Oklch.parseNode(node);
      case "color": return ColorFunction.parseNode(node);
      default: return err(`Unknown color function: ${node.name}`);
    }
  }
  
  // 3. Identifier (named colors, special, system)
  if (node.type === "Identifier") {
    const keyword = node.name.toLowerCase();
    
    // Special keywords
    if (keyword === "transparent" || keyword === "currentcolor") {
      return Special.parseNode(node);
    }
    
    // System colors (try first - smaller set)
    const systemResult = System.parseNode(node);
    if (systemResult.ok) return systemResult;
    
    // Named colors (fallback)
    return Named.parseNode(node);
  }
  
  return err("Invalid color value");
}
```

---

## Phase 3: filter (45 min)

**Status**: ⚪ TODO  
**Complexity**: MEDIUM  
**Parsers**: 11 (blur, brightness, contrast, drop-shadow, grayscale, hue-rotate, invert, opacity, saturate, sepia, url)

### Tasks

1. **Create dispatcher** (25 min)
   - Create `src/parse/filter/filter.ts`
   - Implement `parse(value: string)` function
   - Implement `parseNode(node: CssNode)` function
   - Switch on function name

2. **Update exports** (5 min)
   - Update `src/parse/filter/index.ts`
   - Add: `export { parse, parseNode } from "./filter"`

3. **Add tests** (10 min)
   - Create `src/parse/filter/filter.test.ts`
   - Test all 11 function dispatches
   - Test error cases

4. **Verify** (5 min)
   - Run `just check && just test`
   - All 2318 tests passing

### Success Criteria

- [ ] All 11 filter functions dispatched
- [ ] URL filter handled correctly
- [ ] Tests for dispatcher logic (12+ tests)
- [ ] All 2318 tests passing

### Implementation Template

```typescript
// src/parse/filter/filter.ts
export function parseNode(node: csstree.CssNode): Result<Type.Filter, string> {
  // URL filter
  if (node.type === "Url") {
    return Url.parseNode(node);
  }
  
  // Filter functions
  if (node.type === "Function") {
    switch (node.name.toLowerCase()) {
      case "blur": return Blur.parseNode(node);
      case "brightness": return Brightness.parseNode(node);
      case "contrast": return Contrast.parseNode(node);
      case "drop-shadow": return DropShadow.parseNode(node);
      case "grayscale": return Grayscale.parseNode(node);
      case "hue-rotate": return HueRotate.parseNode(node);
      case "invert": return Invert.parseNode(node);
      case "opacity": return Opacity.parseNode(node);
      case "saturate": return Saturate.parseNode(node);
      case "sepia": return Sepia.parseNode(node);
      default: return err(`Unknown filter function: ${node.name}`);
    }
  }
  
  return err("Invalid filter value");
}
```

---

## Quality Gates (All Phases)

**Before starting phase**:
```bash
just check && just test  # Verify baseline
```

**After completing phase**:
```bash
just check               # Format + typecheck + lint
just test                # All 2318 tests
git status               # Review changes
```

**Commit message template**:
```
feat(parse): Add unified parse() API to {module}

- Created {module}.ts dispatcher with parse() and parseNode()
- Auto-detects {N} variants: [list variants]
- Backward compatible namespace exports preserved
- Added {N} dispatcher tests
- All 2318 tests passing

Pattern: Dispatcher switches on node type/function name
Usage: import { parse } from "@/parse/{module}"
```

---

## Success Metrics

**Per Phase**:
- ✅ Dispatcher created with parse() and parseNode()
- ✅ All variants auto-detected correctly
- ✅ Backward compatible exports preserved
- ✅ Tests added for dispatcher logic
- ✅ All 2318 tests passing
- ✅ Clean git commit

**Overall (All 3 Phases)**:
- ✅ 33 parsers unified under 3 dispatchers
- ✅ Consistent API pattern across modules
- ✅ Zero breaking changes
- ✅ Documentation updated
- ✅ ~50 new dispatcher tests added

---

## File Structure (After Completion)

```
src/parse/
├── clip-path/
│   ├── clip-path.ts        ← NEW: Dispatcher
│   ├── clip-path.test.ts   ← NEW: Dispatcher tests
│   ├── circle.ts
│   ├── ellipse.ts
│   └── ... (10 parsers)
│   └── index.ts            ← Updated: Exports parse()
├── color/
│   ├── color.ts            ← NEW: Dispatcher
│   ├── color.test.ts       ← NEW: Dispatcher tests
│   ├── rgb.ts
│   ├── hex.ts
│   └── ... (12 parsers)
│   └── index.ts            ← Updated: Exports parse()
└── filter/
    ├── filter.ts           ← NEW: Dispatcher
    ├── filter.test.ts      ← NEW: Dispatcher tests
    ├── blur.ts
    ├── brightness.ts
    └── ... (11 parsers)
    └── index.ts            ← Updated: Exports parse()
```

---

## Next Steps After Completion

1. **Update CONTINUE.md** - Mark unified API work as done
2. **Update documentation** - Add usage examples
3. **Announce pattern** - Share with team for future modules
4. **Consider**: gradient dispatcher (optional enhancement)

---

## Questions to Resolve

1. Should we also add generate() unified API? (Defer for now)
2. Do animation/transition need dispatchers? (Decide after Phase 3)
3. Should gradient get a dispatcher too? (Optional - already works well)

---

**Ready to start?** Begin with Phase 1 (clip-path) 🚀
