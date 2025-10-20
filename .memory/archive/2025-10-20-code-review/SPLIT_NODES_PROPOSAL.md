# Split nodes.ts Utility - Detailed Proposal

**Item**: #9 from ACTION_ITEMS.md  
**Priority**: 🟡 Medium  
**Effort**: 2-3 hours  
**Impact**: Medium readability gain

---

## Current State

**File**: `src/utils/parse/nodes.ts`  
**Size**: 751 lines  
**Functions**: 12 exported parsing utilities

### Problem

The `nodes.ts` file has grown into a "junk drawer" utility file containing disparate parsing functions:
- Length parsing (3 functions)
- Angle parsing (1 function)
- Number parsing (1 function)
- Position parsing (3 functions)
- Border-radius parsing (3 functions)
- Radial size parsing (1 function)

**Current structure violates Single Responsibility Principle** - one file handles too many concerns.

---

## Current Functions (12 total)

```typescript
// Length & Percentage (3 functions - 150 lines)
export function parseLengthNode()
export function parseLengthPercentageNode()
export function parseNumberNode()

// Angle (1 function - 50 lines)
export function parseAngleNode()

// Identifiers (1 function - 20 lines)
export function parseIdentifierNode()

// Position (3 functions - 250 lines)
export function parsePositionValueNode()
export function parsePosition2D()
export function parseAtPosition()

// Border Radius (3 functions - 180 lines)
export function parseTRBLLengthPercentage()
export function parseCornerValues()
export function parseRoundBorderRadius()

// Radial (1 function - 100 lines)
export function parseRadialSize()
```

### Size Analysis

| Function Group | Lines | Percentage |
|---------------|-------|------------|
| Position parsing | ~250 | 33% |
| Border-radius | ~180 | 24% |
| Length/percentage | ~150 | 20% |
| Radial size | ~100 | 13% |
| Angle | ~50 | 7% |
| Identifier | ~20 | 3% |

---

## Proposed Refactoring

### Goal
Break `nodes.ts` into focused, cohesive modules following domain boundaries.

### New Structure

```
src/utils/parse/
├── nodes/                    # New directory
│   ├── index.ts             # Barrel export
│   ├── length.ts            # Length & percentage parsing
│   ├── angle.ts             # Angle parsing
│   ├── number.ts            # Number & identifier parsing
│   ├── position.ts          # Position parsing
│   ├── border-radius.ts     # Border-radius parsing
│   └── radial.ts            # Radial size parsing
└── (other existing files)
```

### File Breakdown

#### 1. `nodes/length.ts` (~180 lines)
```typescript
/**
 * Length and percentage parsing utilities
 * 
 * Handles:
 * - parseLengthNode()
 * - parseLengthPercentageNode()
 * - parseNumberNode() // Could move to number.ts
 */
export function parseLengthNode(...)
export function parseLengthPercentageNode(...)
```

**Cohesion**: All functions deal with CSS length/percentage values

#### 2. `nodes/angle.ts` (~60 lines)
```typescript
/**
 * Angle parsing utilities
 * 
 * Handles:
 * - parseAngleNode()
 */
export function parseAngleNode(...)
```

**Cohesion**: Single responsibility - angle values

#### 3. `nodes/number.ts` (~50 lines)
```typescript
/**
 * Number and identifier parsing utilities
 * 
 * Handles:
 * - parseNumberNode() // If not in length.ts
 * - parseIdentifierNode()
 */
export function parseNumberNode(...)
export function parseIdentifierNode(...)
```

**Cohesion**: Primitive value extraction

#### 4. `nodes/position.ts` (~270 lines)
```typescript
/**
 * Position parsing utilities
 * 
 * Handles:
 * - parsePositionValueNode()
 * - parsePosition2D()
 * - parseAtPosition()
 */
export function parsePositionValueNode(...)
export function parsePosition2D(...)
export function parseAtPosition(...)
```

**Cohesion**: All functions parse CSS position values (background-position, clip-path positions, etc.)

#### 5. `nodes/border-radius.ts` (~200 lines)
```typescript
/**
 * Border-radius parsing utilities
 * 
 * Handles:
 * - parseTRBLLengthPercentage()
 * - parseCornerValues()
 * - parseRoundBorderRadius()
 */
export function parseTRBLLengthPercentage(...)
export function parseCornerValues(...)
export function parseRoundBorderRadius(...)
```

**Cohesion**: All functions parse border-radius shorthand formats

#### 6. `nodes/radial.ts` (~110 lines)
```typescript
/**
 * Radial shape size parsing utilities
 * 
 * Handles:
 * - parseRadialSize()
 */
export function parseRadialSize(...)
```

**Cohesion**: Radial gradients and shapes

#### 7. `nodes/index.ts` (~20 lines - barrel export)
```typescript
/**
 * Centralized export for all node parsing utilities
 * 
 * Maintains backward compatibility
 */
export * from "./length";
export * from "./angle";
export * from "./number";
export * from "./position";
export * from "./border-radius";
export * from "./radial";
```

---

## Benefits

### 1. **Improved Discoverability**
- Developers know exactly where to find position parsing
- New functions have clear homes
- Easier to navigate codebase

### 2. **Better Maintainability**
- Smaller files = easier to understand
- Changes are localized to specific domains
- Reduced cognitive load

### 3. **Clearer Dependencies**
- Each file has focused imports
- Cross-domain dependencies become explicit
- Easier to identify circular dependencies

### 4. **Easier Testing** (Future benefit)
- Could add unit tests per domain
- Test coverage by concern
- Focused test suites

### 5. **Backward Compatibility**
- Barrel export maintains existing imports
- No breaking changes for consumers
- Gradual migration possible

---

## Migration Strategy

### Phase 1: Create New Structure (30 mins)
```bash
mkdir -p src/utils/parse/nodes
touch src/utils/parse/nodes/{index,length,angle,number,position,border-radius,radial}.ts
```

### Phase 2: Move Functions (60 mins)
1. Copy functions to new files
2. Update imports in each new file
3. Add JSDoc to document each module
4. Ensure all functions are exported

### Phase 3: Create Barrel Export (15 mins)
```typescript
// src/utils/parse/nodes/index.ts
export * from "./length";
export * from "./angle";
// ... etc
```

### Phase 4: Update Original nodes.ts (15 mins)
**Option A** (Recommended): Deprecate with re-exports
```typescript
// src/utils/parse/nodes.ts
/**
 * @deprecated Import from @/utils/parse/nodes/<specific-file>
 * This file is maintained for backward compatibility only.
 */
export * from "./nodes";
```

**Option B**: Delete and update all imports
- Requires updating ~50-100 import statements
- More disruptive but cleaner

### Phase 5: Update Imports (30 mins)
Search and replace imports throughout codebase:
```typescript
// Before
import { parsePosition2D } from "@/utils/parse/nodes";

// After
import { parsePosition2D } from "@/utils/parse/nodes/position";
// OR (if using barrel)
import { parsePosition2D } from "@/utils/parse/nodes";
```

### Phase 6: Test & Verify (30 mins)
```bash
just check   # Format, typecheck, lint
just test    # All 2318 tests must pass
```

---

## Detailed File Contents

### Example: `nodes/length.ts`

```typescript
// src/utils/parse/nodes/length.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as Unit from "@/core/units";

/**
 * Length and percentage value parsing utilities.
 * 
 * This module handles:
 * - CSS length values (px, em, rem, vh, vw, etc.)
 * - Percentage values
 * - Unitless zero
 * - LengthPercentage union types
 * 
 * @module utils/parse/nodes/length
 */

/**
 * Parse a CSS dimension node into a Length IR.
 * 
 * Handles all CSS length units using core unit definitions.
 * Validates units against ABSOLUTE_LENGTH_UNITS, FONT_LENGTH_UNITS,
 * and VIEWPORT_LENGTH_UNITS.
 *
 * @param node - CSS AST dimension node
 * @returns Result containing Length IR or error message
 *
 * @example
 * ```typescript
 * const result = parseLengthNode(dimensionNode);
 * if (result.ok) {
 *   console.log(result.value); // { value: 100, unit: "px" }
 * }
 * ```
 */
export function parseLengthNode(node: csstree.CssNode): Result<Type.Length, string> {
  // Implementation...
}

/**
 * Parse a CSS dimension or percentage node into a LengthPercentage IR.
 * 
 * Handles:
 * - Length units (px, em, rem, etc.)
 * - Percentage values
 * - Unitless zero (treated as 0px)
 * 
 * This is the most common parsing function for CSS properties that
 * accept both lengths and percentages (width, height, margin, etc.)
 *
 * @param node - CSS AST node (dimension, percentage, or number)
 * @returns Result containing LengthPercentage IR or error message
 *
 * @example
 * ```typescript
 * parseLengthPercentageNode(node) // "50px"  → { value: 50, unit: "px" }
 * parseLengthPercentageNode(node) // "50%"   → { value: 50, unit: "%" }
 * parseLengthPercentageNode(node) // "0"     → { value: 0, unit: "px" }
 * ```
 */
export function parseLengthPercentageNode(
  node: csstree.CssNode
): Result<Type.LengthPercentage, string> {
  // Implementation...
}

/**
 * Parse a CSS number node into a numeric value.
 * 
 * Used for unitless numbers (opacity, z-index, flex-grow, etc.)
 *
 * @param node - CSS AST number node
 * @returns Result containing numeric value or error message
 *
 * @example
 * ```typescript
 * parseNumberNode(node) // "1.5" → 1.5
 * parseNumberNode(node) // "0"   → 0
 * ```
 */
export function parseNumberNode(node: csstree.CssNode): Result<number, string> {
  // Implementation...
}
```

---

## Risk Assessment

### Low Risk
- **Breaking changes**: None (if using barrel export)
- **Test failures**: Unlikely (pure refactoring)
- **Performance**: No impact (same code, different files)

### Potential Issues
1. **Circular dependencies**: Watch for length → position → length
   - Solution: Keep dependencies unidirectional
2. **Import churn**: Many files import from nodes.ts
   - Solution: Use barrel export for compatibility
3. **Git history**: File moves lose blame history
   - Solution: Use `git log --follow` or keep original as re-export

---

## Alternative Approaches

### Option 1: Keep as-is (Do Nothing)
**Pros**: Zero effort  
**Cons**: File continues to grow, harder to maintain

### Option 2: Split into 2 files (nodes.ts + nodes-extended.ts)
**Pros**: Lower effort (1 hour)  
**Cons**: Arbitrary boundary, doesn't solve problem

### Option 3: Split by usage frequency (common.ts + specialized.ts)
**Pros**: Common utils easy to find  
**Cons**: Arbitrary grouping, doesn't scale

### Option 4: Split by domain (Recommended)
**Pros**: Clear boundaries, scalable, maintainable  
**Cons**: Most effort (2-3 hours)

---

## Success Criteria

- [x] All 2318 tests passing
- [x] No lint or typecheck errors
- [x] No breaking changes for consumers
- [x] All 12 functions accessible via imports
- [x] Each new file < 300 lines
- [x] JSDoc documentation on all modules
- [x] Clear import paths

---

## Timeline

| Phase | Task | Duration | Cumulative |
|-------|------|----------|------------|
| 1 | Create new files | 30 min | 30 min |
| 2 | Move functions | 60 min | 90 min |
| 3 | Barrel export | 15 min | 105 min |
| 4 | Update nodes.ts | 15 min | 120 min |
| 5 | Update imports | 30 min | 150 min |
| 6 | Test & verify | 30 min | 180 min |

**Total**: 3 hours (180 minutes)

---

## Future Enhancements

After split is complete:

1. **Add unit tests** for each module
   - `nodes/length.test.ts`
   - `nodes/position.test.ts`
   - etc.

2. **Extract more utilities** as patterns emerge
   - `nodes/time.ts` for duration/delay
   - `nodes/color.ts` for color component parsing

3. **Document parsing patterns** in each module
   - Common AST node shapes
   - Error handling conventions
   - Validation strategies

---

## Recommendation

**Proceed with Option 4 (Domain-based split)** because:

1. ✅ Clear, logical boundaries
2. ✅ Scales as project grows
3. ✅ Improves maintainability
4. ✅ No breaking changes
5. ✅ Sets precedent for future refactoring

**When to do it**: 
- Not urgent (current code works fine)
- Good candidate for "cleanup sprint"
- Could combine with adding unit tests
- Best done when no active feature work

---

## References

- Current file: `src/utils/parse/nodes.ts` (751 lines)
- Related: Recent DRY refactoring reduced duplication by 240 lines
- Pattern: Similar split could be done for `generate/values.ts` in future

---

**Proposed by**: Code Review Session  
**Date**: 2025-10-20  
**Status**: 📋 Proposal (not yet implemented)

