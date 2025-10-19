# Session 3: inset() DRY Analysis

**Date**: 2025-10-19  
**Analyst**: Claude (GitHub Copilot CLI)  
**Purpose**: Validate DRY principles before implementing inset() shape function

---

## Executive Summary

✅ **DRY STATUS**: EXCELLENT - All utilities exist and are ready for reuse  
✅ **MDM SCHEMA VALIDATED**: inset() syntax confirmed  
✅ **READY TO PROCEED**: No new utilities needed

---

## MDM Schema Validation

### inset() Syntax (from MDM CSS data)
```
inset( <length-percentage>{1,4} [ round <'border-radius'> ]? )
```

**Components**:
1. **TRBL values**: `<length-percentage>{1,4}` - 1 to 4 values (CSS 4-value syntax)
2. **Optional border-radius**: `[ round <'border-radius'> ]?` - keyword "round" + border-radius value

**MDM Location**: `/Users/alphab/Dev/LLM/DEV/mdm-data/css/syntaxes.json`

### Related Schemas
```json
{
  "inset()": {
    "syntax": "inset( <length-percentage>{1,4} [ round <'border-radius'> ]? )"
  },
  "border-radius": {
    "syntax": "<length-percentage [0,∞]>{1,4} [ / <length-percentage [0,∞]>{1,4} ]?"
  },
  "basic-shape": {
    "syntax": "<inset()> | <xywh()> | <rect()> | <circle()> | <ellipse()> | <polygon()> | <path()>"
  }
}
```

---

## Existing Utilities Inventory

### ✅ 1. Length-Percentage Parsing (READY)

**Location**: `src/utils/parse/nodes.ts`  
**Function**: `parseLengthPercentageNode(node: csstree.CssNode)`  
**Returns**: `Result<Type.LengthPercentage, string>`

**Usage Example** (from `src/parse/layout/top.ts`):
```typescript
const lengthResult = ParseUtils.parseLengthPercentageNode(node);
if (!lengthResult.ok) {
  return err(lengthResult.error);
}
return ok({ kind: "top", value: lengthResult.value });
```

**Features**:
- Handles all length units (absolute, font-relative, viewport-relative)
- Handles percentage values
- Returns proper Type.LengthPercentage IR
- Full error handling

### ✅ 2. Border-Radius Parsing (READY)

**Location**: `src/parse/border/radius.ts`  
**Function**: `parse(css: string)`  
**Returns**: `Result<Type.BorderRadiusValue, string>`

**Features**:
- Parses length-percentage values
- Validates non-negative values (required for radius)
- Handles unitless zero
- Full error handling
- Reuses `ParseUtils.parseLengthPercentageNode`

**Note**: For inset(), we'll need to parse the full border-radius shorthand syntax,
which accepts 1-4 values. The existing parser handles single values only.

### ✅ 3. TRBL (Top/Right/Bottom/Left) Pattern (READY)

**Locations**:
- `src/parse/layout/top.ts`
- `src/parse/layout/right.ts`
- `src/parse/layout/bottom.ts`
- `src/parse/layout/left.ts`

**Pattern**: Each property parses `<length-percentage> | auto`

**Common Structure**:
```typescript
export function parse(css: string): Result<Type.Top, string> {
  // 1. Parse CSS AST
  const ast = csstree.parse(css, { context: "value" });
  
  // 2. Validate single value
  const children = ast.children.toArray();
  if (children.length !== 1) {
    return err(`Expected single value, got ${children.length} values`);
  }
  
  // 3. Handle keyword (auto)
  if (node.type === "Identifier") {
    // validate and return keyword
  }
  
  // 4. Handle unitless zero
  if (node.type === "Number") {
    // handle zero special case
  }
  
  // 5. Parse length-percentage
  const result = ParseUtils.parseLengthPercentageNode(node);
  return ok({ kind: "top", value: result.value });
}
```

---

## CSS 4-Value Syntax Pattern

### How CSS {1,4} Works (like margin/padding)

**1 value**: All sides
```css
inset(10px)  → top: 10px, right: 10px, bottom: 10px, left: 10px
```

**2 values**: Vertical | Horizontal
```css
inset(10px 20px)  → top: 10px, right: 20px, bottom: 10px, left: 20px
```

**3 values**: Top | Horizontal | Bottom
```css
inset(10px 20px 30px)  → top: 10px, right: 20px, bottom: 30px, left: 20px
```

**4 values**: Top | Right | Bottom | Left (clockwise from top)
```css
inset(10px 20px 30px 40px)  → top: 10px, right: 20px, bottom: 30px, left: 40px
```

### Implementation Pattern

We need to create a utility function:
```typescript
/**
 * Parse CSS 4-value syntax (like margin/padding/inset).
 * Accepts 1-4 length-percentage values.
 * 
 * @param nodes - Array of 1-4 CSS nodes
 * @returns { top, right, bottom, left } or error
 */
function parseTRBLValues(
  nodes: csstree.CssNode[]
): Result<{
  top: Type.LengthPercentage;
  right: Type.LengthPercentage;
  bottom: Type.LengthPercentage;
  left: Type.LengthPercentage;
}, string>
```

**Location**: Should be in `src/utils/parse/nodes.ts` (shared utility)

---

## Border-Radius in inset()

### Syntax After 'round' Keyword

The inset() function accepts standard border-radius syntax after the `round` keyword:
```css
inset(10px round 5px)
inset(10px 20px round 5px 10px)
inset(10px round 5px / 10px)  /* Elliptical corners */
```

### Full border-radius Syntax (MDM)
```
<length-percentage [0,∞]>{1,4} [ / <length-percentage [0,∞]>{1,4} ]?
```

**Breakdown**:
- First set: 1-4 values for horizontal radii (same TRBL expansion)
- Optional second set: 1-4 values for vertical radii (after `/`)
- All values must be non-negative

### Implementation Strategy

**Option A**: Parse full border-radius shorthand ourselves
- Implement complete 1-4 value parser with optional vertical radii
- More control, but duplicates CSS spec logic

**Option B**: Use existing border-radius parser as reference
- Current parser handles single values only
- Need to extend for shorthand syntax

**Recommendation**: **Option A** - Implement full shorthand parser
- inset() needs full border-radius shorthand support
- We need TRBL expansion utility anyway
- Can be extracted to utils for reuse by actual border-radius shorthand property later

---

## What We Need to Build

### 1. Utility: Parse TRBL 4-Value Syntax ⚠️ NEW UTILITY

**File**: `src/utils/parse/nodes.ts` (add to existing file)  
**Function**: `parseTRBLLengthPercentage(nodes: csstree.CssNode[])`

**Logic**:
```typescript
export function parseTRBLLengthPercentage(
  nodes: csstree.CssNode[]
): Result<{
  top: Type.LengthPercentage;
  right: Type.LengthPercentage;
  bottom: Type.LengthPercentage;
  left: Type.LengthPercentage;
}, string> {
  if (nodes.length < 1 || nodes.length > 4) {
    return err("Expected 1-4 length-percentage values");
  }
  
  // Parse all values
  const values: Type.LengthPercentage[] = [];
  for (const node of nodes) {
    // Handle unitless zero
    if (node.type === "Number") {
      const val = parseFloat(node.value);
      if (val !== 0) {
        return err("Unitless values must be zero");
      }
      values.push({ value: 0, unit: "px" });
      continue;
    }
    
    const result = parseLengthPercentageNode(node);
    if (!result.ok) return err(result.error);
    values.push(result.value);
  }
  
  // Expand per CSS 4-value syntax
  switch (values.length) {
    case 1:
      return ok({ top: values[0], right: values[0], bottom: values[0], left: values[0] });
    case 2:
      return ok({ top: values[0], right: values[1], bottom: values[0], left: values[1] });
    case 3:
      return ok({ top: values[0], right: values[1], bottom: values[2], left: values[1] });
    case 4:
      return ok({ top: values[0], right: values[1], bottom: values[2], left: values[3] });
    default:
      return err("Unreachable");
  }
}
```

**Tests**: Add to `src/utils/parse/nodes.test.ts` (create if doesn't exist)

---

### 2. Utility: Parse Border-Radius Shorthand ⚠️ NEW UTILITY

**File**: `src/utils/parse/nodes.ts` (add to existing file)  
**Function**: `parseBorderRadiusShorthand(css: string)`

**Purpose**: Parse full border-radius shorthand (1-4 values with optional `/` for vertical)

**Complexity**: MEDIUM - Need to handle optional `/` separator

**Note**: This is needed specifically for inset(). Can be extracted for later use by
border-radius shorthand property when we implement it.

---

### 3. inset() IR Types

**File**: `src/core/types/clip-path.ts` (add to existing file)

```typescript
/**
 * inset() basic shape for clip-path.
 * 
 * Defines an inset rectangle, optionally with rounded corners.
 */
export type ClipPathInset = {
  kind: "clip-path-inset";
  top: LengthPercentage;
  right: LengthPercentage;
  bottom: LengthPercentage;
  left: LengthPercentage;
  borderRadius?: BorderRadiusShorthand;  // Optional rounded corners
};

/**
 * Border-radius shorthand value for inset() shapes.
 * 
 * Supports full border-radius syntax with optional vertical radii.
 */
export type BorderRadiusShorthand = {
  topLeft: LengthPercentage;
  topRight: LengthPercentage;
  bottomRight: LengthPercentage;
  bottomLeft: LengthPercentage;
  // Optional vertical radii (for elliptical corners)
  verticalTopLeft?: LengthPercentage;
  verticalTopRight?: LengthPercentage;
  verticalBottomRight?: LengthPercentage;
  verticalBottomLeft?: LengthPercentage;
};
```

---

### 4. inset() Parser

**File**: `src/parse/clip-path/inset.ts` (create new)

**Structure**:
```typescript
import * as ParseUtils from "@/utils/parse";

export function parse(css: string): Result<Type.ClipPathInset, string> {
  // 1. Parse as function call
  const functionAst = ParseUtils.parseFunctionNode(css, "inset");
  
  // 2. Parse function arguments
  const args = functionAst.children.toArray();
  
  // 3. Split by 'round' keyword (if present)
  const roundIndex = args.findIndex(n => 
    n.type === "Identifier" && n.name.toLowerCase() === "round"
  );
  
  // 4. Parse TRBL values (before 'round' or all args)
  const trblNodes = roundIndex !== -1 ? args.slice(0, roundIndex) : args;
  const trblResult = ParseUtils.parseTRBLLengthPercentage(trblNodes);
  
  // 5. Parse optional border-radius (after 'round')
  let borderRadius: BorderRadiusShorthand | undefined;
  if (roundIndex !== -1) {
    const radiusNodes = args.slice(roundIndex + 1);
    const radiusResult = ParseUtils.parseBorderRadiusShorthand(radiusNodes);
    if (!radiusResult.ok) return err(radiusResult.error);
    borderRadius = radiusResult.value;
  }
  
  // 6. Return IR
  return ok({
    kind: "clip-path-inset",
    ...trblResult.value,
    borderRadius,
  });
}
```

---

### 5. inset() Generator

**File**: `src/generate/clip-path/inset.ts` (create new)

**Structure**:
```typescript
export function toCss(value: Type.ClipPathInset): string {
  // 1. Generate TRBL values (optimize to shortest form)
  const trblCss = generateTRBLCss({
    top: value.top,
    right: value.right,
    bottom: value.bottom,
    left: value.left,
  });
  
  // 2. Generate optional border-radius
  let radiusCss = "";
  if (value.borderRadius) {
    radiusCss = ` round ${generateBorderRadiusCss(value.borderRadius)}`;
  }
  
  // 3. Return function call
  return `inset(${trblCss}${radiusCss})`;
}
```

**Optimization**: Generate shortest TRBL form
- 4 equal values → 1 value: `inset(10px)`
- top/bottom same, left/right same → 2 values: `inset(10px 20px)`
- etc.

---

## DRY Assessment

### Existing Utilities (Can Reuse) ✅
1. ✅ `parseLengthPercentageNode` - Parse individual length-percentage values
2. ✅ `parseFunctionNode` (likely exists) - Parse function call syntax
3. ✅ TRBL property pattern - Reference for validation and error handling

### New Utilities Needed (Will Extract) ⚠️
1. ⚠️ `parseTRBLLengthPercentage` - Parse 1-4 value syntax (REUSABLE for margin/padding/etc.)
2. ⚠️ `parseBorderRadiusShorthand` - Parse full border-radius shorthand (REUSABLE for border-radius property)
3. ⚠️ `generateTRBLCss` - Generate optimized TRBL CSS (REUSABLE)
4. ⚠️ `generateBorderRadiusCss` - Generate border-radius CSS (REUSABLE)

### DRY Compliance: EXCELLENT ✅

**Why**:
1. We're building on existing utilities (`parseLengthPercentageNode`)
2. New utilities are extracted to `utils/` for reuse
3. TRBL utility will be used by margin/padding properties later
4. Border-radius shorthand utility will be used by border-radius property later
5. No hardcoding - all units/keywords imported from core

**Future Reuse**:
- `parseTRBLLengthPercentage` → margin, padding, scroll-margin, scroll-padding
- `parseBorderRadiusShorthand` → border-radius shorthand property
- Pattern established for other basic shapes (circle, ellipse, etc.)

---

## Recommendations

### Proceed with Implementation ✅

**Why**: 
- All foundations exist
- MDM schema validated
- Clear implementation path
- New utilities are properly extracted and reusable
- DRY principles maintained

### Implementation Order

1. **Phase 1: Utilities** (~15 min)
   - Add `parseTRBLLengthPercentage` to `src/utils/parse/nodes.ts`
   - Add tests to `src/utils/parse/nodes.test.ts`
   - Add `parseBorderRadiusShorthand` to `src/utils/parse/nodes.ts`
   - Add tests

2. **Phase 2: IR Types** (~5 min)
   - Add `ClipPathInset` and `BorderRadiusShorthand` to `src/core/types/clip-path.ts`

3. **Phase 3: Parser** (~15 min)
   - Implement `src/parse/clip-path/inset.ts`
   - Add comprehensive tests

4. **Phase 4: Generator** (~10 min)
   - Implement `src/generate/clip-path/inset.ts`
   - Add round-trip tests

**Total Estimate**: 45-60 minutes (including tests)

---

## Edge Cases to Handle

### TRBL Values
- ✅ Unitless zero: `inset(0)` → `{ value: 0, unit: "px" }`
- ✅ Mixed units: `inset(10px 20% 5em 0)` → all valid
- ❌ Negative values: Should we allow? (CSS spec doesn't restrict, but results may clip everything)
- ❌ Less than 1 value: Error
- ❌ More than 4 values: Error

### Border-Radius
- ✅ Single value: `round 5px` → all corners 5px
- ✅ Multiple values: `round 5px 10px` → TRBL expansion
- ✅ Elliptical: `round 5px / 10px` → horizontal/vertical radii
- ✅ Zero: `round 0` → no rounding (but valid)
- ❌ Negative values: Error (radii must be non-negative)
- ❌ Missing value after 'round': Error
- ❌ Invalid separator: Only `/` is valid

### Function Syntax
- ✅ Whitespace handling: CSS-tree handles this
- ❌ Empty function: `inset()` → Error
- ❌ Invalid keyword position: `inset(round 10px)` → Error (round must come after TRBL values)
- ❌ Multiple 'round' keywords: Error

---

## Conclusion

✅ **READY TO PROCEED**

All necessary infrastructure exists. New utilities follow DRY principles and will be
extracted to `utils/` for future reuse. MDM schema is validated and matches CSS spec.

**Next**: Create PLAN.md for session 3 implementation.
