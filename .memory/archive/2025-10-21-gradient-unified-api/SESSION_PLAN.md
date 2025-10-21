# Gradient Unified API Implementation

**Date**: 2025-10-21  
**Session**: 2025-10-21-gradient-unified-api  
**Estimated Time**: 1.5-2 hours

---

## Objective

Add unified dispatcher API to gradient module with auto-detection for 3 gradient types:
- linear-gradient / repeating-linear-gradient
- radial-gradient / repeating-radial-gradient  
- conic-gradient / repeating-conic-gradient

---

## Current State

### Existing Parsers
- ✅ `src/parse/gradient/linear.ts` - Linear gradient parser
- ✅ `src/parse/gradient/radial.ts` - Radial gradient parser
- ✅ `src/parse/gradient/conic.ts` - Conic gradient parser
- ✅ `src/parse/gradient/color-stop.ts` - Color stop helper

### Type System
- ✅ `LinearGradient` type defined
- ✅ `RadialGradient` type defined
- ✅ `ConicGradient` type defined
- ⚠️ **No union type** - Need to create `Gradient` union

---

## Implementation Plan

### Step 1: Create Union Type (10 min)

**File**: `src/core/types/gradient/index.ts`

Add Gradient union type:
```typescript
export type Gradient = LinearGradient | RadialGradient | ConicGradient;
```

### Step 2: Create Dispatcher (30 min)

**File**: `src/parse/gradient/gradient.ts`

Implement:
- `parse(value: string): Result<Gradient, string>`
- `parseNode(node: CssNode): Result<Gradient, string>`

Function detection:
- `linear-gradient`
- `repeating-linear-gradient`
- `radial-gradient`
- `repeating-radial-gradient`
- `conic-gradient`
- `repeating-conic-gradient`

### Step 3: Add Tests (20 min)

**File**: `src/parse/gradient/gradient.test.ts`

Test coverage:
- Auto-detection for all 6 gradient functions
- Error handling (unknown, invalid, empty)
- Case insensitivity
- Repeating variants

**Expected**: ~18 tests

### Step 4: Update Exports (5 min)

**File**: `src/parse/gradient/index.ts`

Add:
```typescript
export { parse, parseNode } from "./gradient";
```

### Step 5: Verify (10 min)

Run quality gates:
```bash
just check && just test
```

Expected: 2408 tests passing (+18)

---

## Success Criteria

- [ ] Union type `Gradient` created
- [ ] Dispatcher handles all 6 gradient functions
- [ ] 18+ new tests, all passing
- [ ] Quality gates green
- [ ] Commit with clear message

---

## Time Breakdown

| Task | Estimate | Notes |
|------|----------|-------|
| Union type | 10 min | Simple addition |
| Dispatcher | 30 min | Pattern established |
| Tests | 20 min | 18 tests |
| Exports | 5 min | One line |
| Verify | 10 min | Quality gates |
| **Total** | **75 min** | **~1.5 hours** |

---

## Pattern Reference

From previous phases, dispatcher structure:

```typescript
export function parseNode(node: CssNode): Result<Type.Gradient, string> {
  if (node.type === "Function") {
    switch (node.name.toLowerCase()) {
      case "linear-gradient":
      case "repeating-linear-gradient":
        return Linear.parse(cssTree.generate(node));
      case "radial-gradient":
      case "repeating-radial-gradient":
        return Radial.parse(cssTree.generate(node));
      case "conic-gradient":
      case "repeating-conic-gradient":
        return Conic.parse(cssTree.generate(node));
      default:
        return err(`Unknown gradient function: ${node.name}`);
    }
  }
  return err("Invalid gradient value");
}
```

---

## Notes

- Gradient is simpler than filter (3 types vs 11)
- Each gradient type handles its own "repeating" variant
- No special node types like URL - all are Functions
- Pattern is well-established from previous 3 phases

---

**Status**: Ready to implement  
**Next**: Create union type, then dispatcher
