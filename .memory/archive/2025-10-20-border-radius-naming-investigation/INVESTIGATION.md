# Investigation: parseBorderRadiusShorthand Naming Issue

**Date**: 2025-10-20  
**Trigger**: User question about function name accuracy  
**Status**: ⚠️ **NAMING MISMATCH CONFIRMED**

---

## 🔍 The Question

> "parseBorderRadiusShorthand - What does it mean? We only work with longhand in this lib."

**User's Concern**: The function name suggests it parses CSS shorthand properties, but b_value is supposed to work with **longhand values only** (b_short handles shorthand expansion).

---

## 📊 Investigation Findings

### 1. The Function in Question

**Location**: `src/utils/parse/nodes.ts`  
**Name**: `parseBorderRadiusShorthand()`  
**Current JSDoc**: "Parse border-radius shorthand syntax (simplified)"

**What it does**:
```typescript
// Accepts 1-4 values and expands them using CSS TRBL rules
parseBorderRadiusShorthand([node1, node2, node3, node4])
// Returns: { topLeft, topRight, bottomRight, bottomLeft }
```

**Example behavior**:
- 1 value: `5px` → all corners = 5px
- 2 values: `5px 10px` → TL/BR = 5px, TR/BL = 10px  
- 3 values: `5px 10px 15px` → TL = 5px, TR/BL = 10px, BR = 15px
- 4 values: `5px 10px 15px 20px` → clockwise from TL

### 2. The Actual border-radius Property Parser

**Location**: `src/parse/border/radius.ts`  
**Name**: `parse()`  
**What it does**: Parses **LONGHAND** border-radius

```typescript
// LONGHAND ONLY - single value
parse("5px")  // ✅ Valid
parse("5px 10px")  // ❌ Error: "Expected single border-radius value"
```

**Type**: `BorderRadiusValue`
```typescript
{
  kind: "border-radius",
  radius: LengthPercentage  // SINGLE value only
}
```

### 3. Where parseBorderRadiusShorthand is Used

**Used by**: Clip-path shape functions (inset, rect, xywh)
```typescript
// src/parse/clip-path/inset.ts
const radiusResult = ParseUtils.parseBorderRadiusShorthand(radiusNodes);
```

**Context**: The `round` keyword in inset(), rect(), xywh()
```css
inset(10px round 5px 10px)
rect(0 0 100% 100% round 10px)
xywh(0 0 100% 100% round 5px 10px 15px 20px)
```

### 4. Library Philosophy (from API_ECOSYSTEM_COMPLETE.md)

**b_value**: Parses/generates **individual CSS property values** (longhand)
**b_short**: Handles **shorthand → longhand expansion** (property level)

```
┌──────────────────────────────────────────────────┐
│                     b_short                      │
│                (Shorthand Expander)              │
│                                                   │
│  • Shorthand → longhand expansion only          │
│  • Independent utility                          │
│  • Used by b_gee as preprocessor                │
└──────────────────────────────────────────────────┘
```

---

## 🎯 The Naming Issue

### Current State ❌

**Function name**: `parseBorderRadiusShorthand()`  
**Implication**: "Parses the border-radius shorthand property"  
**Reality**: Parses a **multi-value syntax** (1-4 values with TRBL expansion)

### The Confusion

1. **Property-level shorthand** (handled by b_short):
   ```css
   border-radius: 5px 10px;  /* Expands to 4 longhand properties */
   ```

2. **Value-level multi-value syntax** (what the function actually does):
   ```css
   inset(10px round 5px 10px)  /* Part of inset() value, not a property */
   ```

### Why It Matters

- **Misleading**: Suggests the function parses CSS properties (it doesn't)
- **Inconsistent**: b_value is supposed to work with longhand properties only
- **Confusing**: Developers might think it parses `border-radius: 5px 10px` shorthand

---

## 💡 The Truth

### What the Function Actually Does

**It's NOT parsing a shorthand property.**  
**It's parsing a multi-value syntax pattern used WITHIN other values.**

Specifically:
- It's a **value syntax pattern** (1-4 values with CSS TRBL expansion rules)
- Used by **clip-path shapes** after the `round` keyword
- Returns **all 4 corner values** (which IS the longhand representation)

### Analogy

```typescript
// This is like parsing:
"rgba(255, 128, 64, 0.5)"  // Multi-value function syntax
// NOT like parsing:
"background: red;"  // Property shorthand
```

The function parses a **multi-value syntax** that happens to use the same expansion rules as CSS shorthand properties, but it's NOT parsing a property.

---

## 🔧 Proposed Solution

### Option 1: Rename to Clarify Intent ✅ RECOMMENDED

**New name**: `parseCornerValues()` or `parseFourCornerValues()` or `parseMultiValueCorners()`

**Rationale**:
- Accurately describes what it does (parse 1-4 values → 4 corners)
- Removes "shorthand" which implies property-level parsing
- Clearer for developers

**JSDoc**:
```typescript
/**
 * Parse CSS corner values using TRBL expansion rules.
 *
 * Accepts 1-4 length-percentage values and expands them to all 4 corners
 * using the same expansion logic as CSS box model properties:
 * - 1 value: all corners
 * - 2 values: (top-left/bottom-right) (top-right/bottom-left)
 * - 3 values: top-left (top-right/bottom-left) bottom-right
 * - 4 values: top-left top-right bottom-right bottom-left
 *
 * Used by clip-path shapes (inset, rect, xywh) for border-radius values
 * after the 'round' keyword.
 *
 * @param nodes - Array of 1-4 CSS nodes (length-percentage values)
 * @returns Result with 4 corner values or error
 */
export function parseCornerValues(nodes: CssNode[]): Result<...>
```

### Option 2: Keep Name, Fix Documentation

**Keep**: `parseBorderRadiusShorthand()`  
**But clarify**: It's parsing a **value syntax**, not a **property shorthand**

**Updated JSDoc**:
```typescript
/**
 * Parse border-radius multi-value syntax (used in clip-path shapes).
 *
 * NOTE: This is NOT a CSS property parser. It parses the multi-value
 * syntax used after the 'round' keyword in clip-path shapes like
 * inset(), rect(), and xywh().
 *
 * The actual border-radius property parser is in src/parse/border/radius.ts
 * and only accepts single values (longhand).
 *
 * Accepts 1-4 values and expands using CSS TRBL rules...
 */
```

### Option 3: Create Namespace Clarity

**Move function**: `src/utils/parse/nodes.ts` → `src/utils/parse/value-syntax.ts`  
**Rename**: `parseBorderRadiusShorthand()` → `parseMultiValueCorners()`  
**Add comment**: "Value-level multi-value syntax utilities"

---

## 📋 Recommendation

**RENAME** the function to remove "shorthand" and clarify it's a value syntax parser:

1. **Best name**: `parseCornerValues()`
2. **Update JSDoc**: Clarify it's for clip-path shape values, not properties
3. **Add note**: Reference the actual border-radius property parser

**Why**:
- Aligns with b_value philosophy (longhand properties only)
- Removes misleading "shorthand" terminology
- Makes the codebase more maintainable
- Prevents future confusion

---

## 🎯 Action Items

- [ ] Rename `parseBorderRadiusShorthand()` → `parseCornerValues()`
- [ ] Update all 3 call sites (inset.ts, rect.ts, xywh.ts)
- [ ] Update JSDoc with clear explanation
- [ ] Update tests (name + descriptions)
- [ ] Verify no other "shorthand" naming issues exist
- [ ] Document in HANDOVER.md

**Estimated time**: 15-20 minutes

---

## 📚 References

- **Function**: `src/utils/parse/nodes.ts` line ~200
- **Users**: `src/parse/clip-path/{inset,rect,xywh}.ts`
- **Property parser**: `src/parse/border/radius.ts` (longhand only)
- **Philosophy**: `.memory/archive/2025-10-19-color-function/API_ECOSYSTEM_COMPLETE.md`

---

**Conclusion**: User is **CORRECT** - the name is misleading. The function parses a multi-value syntax, not a shorthand property. Should be renamed to avoid confusion.
