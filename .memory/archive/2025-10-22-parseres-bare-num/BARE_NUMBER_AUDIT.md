# Bare Number Audit - Complete Analysis

**Date**: 2025-10-22T01:15:00Z  
**Issue**: Should b_value auto-correct bare numbers (e.g., `0` → `0%`)?  
**Status**: 🔍 Audit Complete - Awaiting Policy Decision

---

## The Problem

User's CSS fails:
```css
radial-gradient(rgba(255,255,255,0) 0, ...)
                                    ^ bare number (no unit)
```

**Current behavior**: ❌ Rejected (spec-compliant)  
**User request**: ✅ Accept and auto-add unit with warning

---

## CSS Spec Analysis

### Per MDN/W3C Spec

**Color stop positions**: `<length-percentage>`
- `<length>` = number + unit (e.g., `0px`, `10em`)
- `<percentage>` = number + `%` (e.g., `0%`, `50%`)
- Bare numbers (e.g., `0`, `50`) are **NOT valid**

**Special case**: `0` for lengths
- Some CSS properties allow bare `0` for length values
- Example: `margin: 0` is valid (equivalent to `0px`)
- BUT: This is property-specific, NOT universal

### What CSS-tree Parses

1. **`Number` type** - Bare numbers: `0`, `1`, `0.5`, `42`
2. **`Percentage` type** - With %: `0%`, `50%`, `100%`
3. **`Dimension` type** - With unit: `0px`, `10em`, `2rem`

---

## Current b_value Behavior by Category

### Category A: Accepts ONLY Percentage/Dimension ✅ (Spec-compliant)

**Properties**: Gradient color stops
- **File**: `src/parse/gradient/color-stop.ts`
- **Lines**: 63-79
- **Logic**:
  ```typescript
  if (posNode.type === "Percentage") { ... }      // ✅ Accept
  if (posNode.type === "Dimension") { ... }       // ✅ Accept
  // Number type → falls through to error         // ❌ Reject
  ```
- **Result**: `radial-gradient(red 0)` → **REJECTED** ❌
- **Spec**: Correct! Position requires `<length-percentage>`

**Properties**: Gradient positions (radial)
- **File**: `src/parse/gradient/radial.ts`
- **Lines**: 68-75, 85-94
- **Logic**: Same as color-stop (Percentage or Dimension only)
- **Result**: Bare numbers rejected ❌

**Properties**: Gradient angles (conic)
- **File**: `src/parse/gradient/conic.ts`
- **Line**: 46
- **Logic**: Requires `Dimension` type (e.g., `45deg`, `0.5turn`)
- **Result**: Bare numbers rejected ❌

### Category B: Accepts Number ✅ (Intentional for unitless values)

**Property**: `opacity`
- **File**: `src/parse/layout/opacity.ts`
- **Lines**: 55-61
- **Logic**:
  ```typescript
  if (node.type === "Number") { value = parseFloat(...); }     // ✅ Valid
  else if (node.type === "Percentage") { value = ... / 100; }  // ✅ Valid
  ```
- **Spec**: Opacity accepts `<number>` (0-1) OR `<percentage>` (0%-100%)
- **Result**: CORRECT behavior - `opacity: 0.5` is valid CSS

**Property**: `z-index`
- **File**: `src/parse/layout/z-index.ts`
- **Lines**: 40-46
- **Logic**: Accepts `Number` type (integers only, e.g., `1`, `100`, `-1`)
- **Spec**: z-index accepts `<integer>` (unitless)
- **Result**: CORRECT behavior - `z-index: 10` is valid CSS

### Category C: Accepts Dimension (lengths with units)

**Properties**: Layout dimensions
- **Files**: `width.ts`, `height.ts`, `top.ts`, `right.ts`, `bottom.ts`, `left.ts`
- **Logic**: Requires `Dimension` type (e.g., `10px`, `50%`, `2em`)
- **Spec**: These properties require `<length-percentage>`
- **Special case**: `width: 0` vs `width: 0px`
  - CSS allows `0` without unit for lengths (it's unambiguous)
  - Our parser currently REJECTS `width: 0` (only accepts `0px`)

**Properties**: Border radius, border width
- **Files**: `border/radius.ts`, `border/width.ts`
- **Logic**: Requires `Dimension` type
- **Spec**: Require `<length-percentage>`
- **Result**: Same issue - rejects bare `0`

**Properties**: Transition/Animation timing
- **Files**: `transition/duration.ts`, `transition/delay.ts`
- **Logic**: Requires `Dimension` with time units (`s`, `ms`)
- **Spec**: Requires `<time>` (must have unit)
- **Result**: CORRECT - `transition: 0` is invalid, must be `0s`

---

## Where Bare `0` is Problematic

### Problem Case 1: Gradient Color Stops
```css
/* User writes: */
radial-gradient(red 0, blue 100)

/* CSS Spec requires: */
radial-gradient(red 0%, blue 100%)

/* Our behavior: REJECT ❌ */
/* Browsers: Some accept 0, some reject */
```

### Problem Case 2: Layout Dimensions
```css
/* User writes: */
margin: 0;

/* CSS Spec: VALID (0 is unambiguous) */

/* Our behavior: REJECT ❌ */
/* Browsers: ACCEPT ✅ */
```

### Problem Case 3: Border Radius
```css
/* User writes: */
border-radius: 0;

/* CSS Spec: VALID (0 is unambiguous) */

/* Our behavior: REJECT ❌ */
/* Browsers: ACCEPT ✅ */
```

---

## Decision Matrix

### Option 1: Strict Mode (Current) ✅
**Policy**: Reject all bare numbers except where spec allows  
**Pros**:
- Spec-compliant
- No ambiguity
- Catches actual errors
- Forces users to write correct CSS

**Cons**:
- Rejects common patterns (`width: 0`, `margin: 0`)
- Inconsistent with browsers (they accept bare `0`)
- Poor DX for users copying real-world CSS

**Examples**:
- ❌ `width: 0` → rejected
- ✅ `width: 0px` → accepted
- ❌ `radial-gradient(red 0, blue 100)` → rejected
- ✅ `radial-gradient(red 0%, blue 100%)` → accepted

### Option 2: Accept Bare Zero for Lengths
**Policy**: Accept `0` (no unit) for `<length-percentage>` contexts  
**Pros**:
- Matches browser behavior
- Better DX (accepts common CSS patterns)
- Spec allows it (0 is unambiguous)

**Cons**:
- Still rejects `radial-gradient(red 0, blue 100)` (position needs %)
- Two cases to handle: `0` vs other numbers

**Examples**:
- ✅ `width: 0` → accepted (converted to `0px` or `0%`)
- ❌ `width: 10` → rejected (must be `10px`)
- ❌ `radial-gradient(red 0, blue 100)` → rejected (needs `0%`, `100%`)

**Implementation**:
```typescript
if (node.type === "Number") {
  const value = parseFloat(node.value);
  if (value === 0) {
    return ok({ value: 0, unit: "px" });  // or "%"? 
  }
  return err("Numbers require units (except 0)");
}
```

**Issue**: Which unit to use for `0`?
- `0px` vs `0%` - both are equivalent for zero
- BUT: When generating CSS, should we output `0` or `0px`?

### Option 3: Auto-Correct with Warning
**Policy**: Accept bare numbers, infer unit, emit warning  
**Pros**:
- Maximum flexibility
- Handles real-world CSS
- Warns users about corrections

**Cons**:
- Non-spec compliant
- Ambiguous unit inference (px? %? em?)
- Different properties need different rules
- Complex implementation

**Examples**:
- ✅ `width: 10` → accepted as `10px` (⚠️ warning)
- ✅ `radial-gradient(red 0, blue 100)` → accepted as `0%`, `100%` (⚠️ warning)

**Implementation challenges**:
1. **Unit inference** - How to choose?
   - Length context: `px` (most common)
   - Gradient positions: `%` (most common)
   - Time: `s` (seconds)

2. **Consistency** - Need rules for ALL properties:
   - Layout: bare → `px`
   - Gradients: bare → `%`
   - Animation: bare → `s`
   - BUT: This is property-specific logic

3. **Testing** - Requires exhaustive test coverage

---

## Recommendation

### Short-term (v1.0): Option 1 - Strict Mode ✅
**Rationale**:
- Safest approach
- Clear, predictable behavior
- Aligns with "parser" role (not "fixer")
- Users can use linters/formatters for auto-correction

**User guidance**:
```
Issue: invalid-value
Property: background-image
Message: Invalid position in gradient color stop
Suggestion: Use <length-percentage> format (e.g., '0%' instead of '0')
```

### Long-term (v1.1+): Option 2 - Accept Bare Zero
**Rationale**:
- Matches browser behavior
- Handles common case
- Still strict for non-zero values
- Easy to implement

**Implementation**:
1. Add `allowBareZero: boolean` option to length parsers
2. Convert `0` → `0px` (or `0%` for gradients)
3. No warning needed (it's valid CSS)

### NOT Recommended: Option 3 - Auto-Correct
**Rationale**:
- Too much magic
- Property-specific heuristics
- Increases complexity
- Deviates from parser role

---

## Required Changes for Option 2

### 1. Update Length Parsers
**Files to modify**:
- `src/parse/gradient/color-stop.ts` (lines 63-79)
- `src/parse/gradient/radial.ts` (lines 68-75, 85-94)
- `src/parse/layout/width.ts` (and height, top, right, bottom, left)
- `src/parse/border/radius.ts`
- `src/parse/border/width.ts`

**Pattern**:
```typescript
if (node.type === "Number") {
  const value = parseFloat(node.value);
  if (value === 0) {
    return ok({ value: 0, unit: "px" });  // or "%" for gradients
  }
  return err("Non-zero numbers require units");
}
```

### 2. Update Tests
- Add tests for `width: 0` → `{ value: 0, unit: "px" }`
- Add tests for `radial-gradient(red 0, blue 100)` → `0%`, `100%`
- Verify rejection of `width: 10` (non-zero still requires unit)

### 3. Update Documentation
- Explain bare zero handling
- Clarify when units are required
- Add examples to JSDoc

---

## Test Coverage Needed

### For Each Property Category

1. **Bare zero**: `0` → should accept
2. **Non-zero bare**: `10` → should reject
3. **Zero with unit**: `0px`, `0%` → should accept
4. **Non-zero with unit**: `10px`, `50%` → should accept

### Example Test Matrix

| Input | Expected Result | Rationale |
|-------|----------------|-----------|
| `width: 0` | ✅ `0px` | Bare zero valid |
| `width: 10` | ❌ Error | Non-zero needs unit |
| `width: 0px` | ✅ `0px` | With unit OK |
| `width: 10px` | ✅ `10px` | With unit OK |
| `gradient(...red 0)` | ✅ `0%` | Bare zero valid |
| `gradient(...red 50)` | ❌ Error | Non-zero needs unit |
| `gradient(...red 0%)` | ✅ `0%` | With unit OK |
| `gradient(...red 50%)` | ✅ `50%` | With unit OK |

---

## Estimated Effort

### Option 1 (Current - No Change)
- **Effort**: 0 hours
- **Risk**: Low
- **User impact**: Must write correct CSS

### Option 2 (Accept Bare Zero)
- **Effort**: 4-6 hours
  - 2 hours: Update 8-10 parser files
  - 2 hours: Add 50+ tests
  - 1 hour: Update documentation
  - 1 hour: Review and QA
- **Risk**: Low
- **User impact**: Better DX, matches browsers

### Option 3 (Auto-Correct)
- **Effort**: 16-20 hours (NOT recommended)
- **Risk**: High
- **User impact**: Complex, potentially confusing

---

## Decision Required

**Question for user**: Which option do you prefer?

1. ✅ **Strict Mode** (current) - Reject bare numbers except where spec allows
2. ⚡ **Accept Bare Zero** - Allow `0` without unit for lengths (matches browsers)
3. ❌ **Auto-Correct** (not recommended) - Infer units and emit warnings

**My recommendation**: Option 2 (Accept Bare Zero) for v1.1, keep Option 1 for v1.0.
