# Unified API Project - START HERE

**Date**: 2025-10-21  
**Status**: Ready to Start  
**Baseline**: 2318 tests passing

---

## Quick Summary

**Goal**: Add unified `parse()` API to multi-function modules (clip-path, color, filter)

**Current Problem**:
```typescript
// User must know which parser to use
import * as ClipPath from "@/parse/clip-path";
ClipPath.Circle.parse("circle(50%)");  // Must know it's a circle
```

**Solution**:
```typescript
// Auto-detect and parse
import { parse } from "@/parse/clip-path";
parse("circle(50%)");  // Auto-detects it's a circle
```

---

## What Was Audited

✅ **Audited**: All 14 parse modules  
✅ **Found**: 5 modules need unified API  
✅ **Prioritized**: 3 high-priority modules (clip-path, color, filter)

---

## Documents Created

1. **AUDIT.md** - Complete analysis of all parse modules
2. **MASTER_PLAN.md** - 3-phase implementation plan (2.5 hours)
3. **START_HERE.md** - This file

---

## The Plan

### Phase 1: clip-path (45 min) 🎯
- 10 shapes to unify
- Clear switch logic
- User requested this one

### Phase 2: color (60 min) 🎯
- 12 formats to unify
- Smart detection needed
- Most commonly used

### Phase 3: filter (45 min) 🎯
- 11 functions to unify
- Clear switch logic
- Medium complexity

**Total**: 2.5 hours

---

## Key Benefits

1. ✅ **Better DX**: Users don't need to know which parser
2. ✅ **Backward compatible**: Namespace exports preserved
3. ✅ **Type-safe**: Result<T, string> pattern maintained
4. ✅ **Testable**: Dispatcher logic isolated
5. ✅ **Zero breaking changes**: All existing code works

---

## Pattern Template

```typescript
// {module}.ts dispatcher
export function parse(value: string): Result<Type.Module, string> {
  const ast = cssTree.parse(value, { context: "value" });
  return parseNode(ast.children.first);
}

export function parseNode(node: CssNode): Result<Type.Module, string> {
  if (node.type === "Function") {
    switch (node.name.toLowerCase()) {
      case "variant1": return Variant1.parseNode(node);
      case "variant2": return Variant2.parseNode(node);
      default: return err(`Unknown function: ${node.name}`);
    }
  }
  return err("Invalid value");
}
```

```typescript
// index.ts exports
export { parse, parseNode } from "./{module}";
export * as Variant1 from "./variant1";  // Backward compat
export * as Variant2 from "./variant2";
```

---

## Next Steps

**Option A**: Start implementation (Phase 1: clip-path)
**Option B**: Discuss/refine plan first
**Option C**: Defer to future session

---

## Questions for You

1. **Proceed with Phase 1** (clip-path)?
2. **Any concerns** about the pattern?
3. **Priority order** correct (clip-path → color → filter)?

---

Ready to start! 🚀
