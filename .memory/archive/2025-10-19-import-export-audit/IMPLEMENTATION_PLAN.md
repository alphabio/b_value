# Implementation Plan: Pure KISS Export Pattern

**Decision**: Adopt pure KISS pattern everywhere - `export * as X` only, no exceptions.

**Pattern**: Like Gradient (already compliant)
```typescript
export * as Linear from "./linear";
export * as Radial from "./radial";
// ... just re-exports, nothing derived
```

---

## Changes Required

### 1. src/parse/color/index.ts
**Remove**:
- `export function parse()` (master function)
- `export const Color = { ... }` (derived namespace)

**Replace with**:
```typescript
export * as Hex from "./hex";
export * as Named from "./named";
export * as Rgb from "./rgb";
export * as Hsl from "./hsl";
export * as Hwb from "./hwb";
export * as Lab from "./lab";
export * as Lch from "./lch";
export * as Oklab from "./oklab";
export * as Oklch from "./oklch";
export * as System from "./system";
export * as Special from "./special";
```

### 2. src/generate/color/index.ts
**Remove**:
- `export function toCss()` (master function)
- `export const Color = { ... }` (derived namespace)

**Replace with**: Same as parse

### 3. src/parse/filter/index.ts
**Remove**:
- `export function parse()` (master function)
- `export const Filter = { ... }` (derived namespace)

**Replace with**:
```typescript
export * as Blur from "./blur";
export * as Brightness from "./brightness";
export * as Contrast from "./contrast";
export * as DropShadow from "./drop-shadow";
export * as Grayscale from "./grayscale";
export * as HueRotate from "./hue-rotate";
export * as Invert from "./invert";
export * as Opacity from "./opacity";
export * as Saturate from "./saturate";
export * as Sepia from "./sepia";
export * as Url from "./url";
```

### 4. src/generate/filter/index.ts
**Remove**:
- `export function toCss()` (master function)
- `export const Filter = { ... }` (derived namespace)

**Replace with**: Same as parse

### 5. src/parse/index.ts
**Add missing export**:
```typescript
export * as Filter from "./filter";
```

### 6. src/generate/index.ts
**Add missing export**:
```typescript
export * as Filter from "./filter";
```

### 7. Gradient, Transform, Position
✅ Already compliant - no changes needed

---

## Breaking Changes

### Before (Color)
```typescript
import { Parse } from "b_value";
Parse.Color.parse("#ff0000");        // ❌ REMOVED
Parse.Color.hex.parse("#ff0000");    // ❌ Changes to:
```

### After (Color)
```typescript
import { Parse } from "b_value";
Parse.Color.Hex.parse("#ff0000");    // ✅ Explicit type
```

### Before (Filter) - DIDN'T WORK ANYWAY
```typescript
import { Parse } from "b_value";
Parse.Filter.parse("blur(5px)");     // ❌ Was undefined!
```

### After (Filter)
```typescript
import { Parse } from "b_value";
Parse.Filter.Blur.parse("blur(5px)"); // ✅ Works now
```

---

## Migration Guide for Users

**Color**:
- OLD: `Parse.Color.parse(input)` → NEW: Use specific parser
- OLD: `Parse.Color.hex.parse()` → NEW: `Parse.Color.Hex.parse()`
- OLD: `Parse.Color.rgb.parse()` → NEW: `Parse.Color.Rgb.parse()`
- (Same for all 11 color types)

**Filter**:
- OLD: Didn't work (was undefined)
- NEW: `Parse.Filter.Blur.parse()`, `Parse.Filter.Brightness.parse()`, etc.

**Gradient, Transform, Position**:
- ✅ No changes - already using this pattern

---

## Expected Test Changes

Current: 1020 tests passing

**Tests that may fail**:
- Any integration tests using `Color.parse()` master function
- Any integration tests using `Filter.parse()` master function
- Tests using lowercase property access (`.hex` → `.Hex`)

**Action**: Fix tests to use specific parsers

---

## Implementation Order

1. ✅ Create session directory (done)
2. ✅ Baseline verification (done - 1020 tests)
3. Update Color parse/generate indices (parallel)
4. Update Filter parse/generate indices (parallel)
5. Add Filter to parent indices
6. Run tests - see what breaks
7. Fix broken tests
8. Run full test suite
9. Commit
10. Create HANDOVER.md

---

## Success Criteria

- ✅ All indices use pure `export * as X` pattern
- ✅ No derived namespace objects
- ✅ No master auto-detection functions
- ✅ Filter exported from parent indices
- ✅ All tests passing
- ✅ Consistent pattern everywhere

---

**Ready to implement. Starting now.**
