# Geometry-Box Keyword Analysis
**Date**: 2025-10-20T09:20  
**Issue**: Duplicate exports between box-edge-keywords.ts and geometry-box.ts

---

## 📋 OFFICIAL CSS SPEC (from MDM schema)

```
visual-box: "content-box | padding-box | border-box"
shape-box: "<visual-box> | margin-box"
geometry-box: "<shape-box> | fill-box | stroke-box | view-box"
```

**Hierarchy** (spec-defined):
```
visual-box (3 keywords)
  ├─ content-box
  ├─ padding-box
  └─ border-box

shape-box (4 keywords) = visual-box + margin
  └─ margin-box

geometry-box (7 keywords) = shape-box + SVG
  ├─ fill-box
  ├─ stroke-box
  └─ view-box
```

---

## 📁 CURRENT IMPLEMENTATION

### File 1: `src/core/keywords/box-edge-keywords.ts` (178 lines, Oct 18)

**Exports**:
- `BoxEdgeKeyword` (7 keywords: all visual + margin + SVG)
- `VisualBoxKeyword` (3 keywords: content/padding/border) **← DUPLICATE**
- `BackgroundClipKeyword` (4 keywords: visual + text)

**Uses**: `z.union()` with descriptions for each

**Problem**: Doesn't match CSS spec naming
- Calls it "box-edge" instead of "geometry-box"
- Has visual-box subset ✅
- Missing shape-box concept

### File 2: `src/core/keywords/geometry-box.ts` (51 lines, Oct 20)

**Exports**:
- `VisualBoxKeyword` (3 keywords) **← DUPLICATE**
- `ShapeBoxKeyword` (4 keywords) ✅ Matches spec!
- `GeometryBoxKeyword` (7 keywords) ✅ Matches spec!

**Uses**: `z.enum()` with array spreading

**Matches CSS spec exactly**: ✅
- visual-box → VisualBoxKeyword
- shape-box → ShapeBoxKeyword  
- geometry-box → GeometryBoxKeyword

---

## 🎯 THE TRUTH

### geometry-box.ts is CORRECT

**Why**:
1. ✅ Matches official CSS spec naming exactly
2. ✅ Has proper hierarchy (visual → shape → geometry)
3. ✅ Used by clip-path parser/generator (22 tests passing)
4. ✅ Newer implementation (Oct 20 vs Oct 18)

### box-edge-keywords.ts is WRONG

**Why**:
1. ❌ Made-up name "box-edge" (not in CSS spec)
2. ❌ Flat structure, missing shape-box concept
3. ❌ Conflates different use cases (background-clip mixed in)
4. ⚠️ Exported from index, causing duplicate conflicts

**However**:
- Has useful descriptions (z.union with .describe())
- Includes background-clip variant (visual + text)
- More verbose/documented

---

## ✅ THE SOLUTION

### Keep geometry-box.ts, Fix box-edge-keywords.ts

**Step 1**: Remove duplicates from box-edge-keywords.ts

Delete these exports (they're in geometry-box.ts):
- `visualBoxKeywordsSchema` 
- `VISUAL_BOX_KEYWORDS`
- `VisualBoxKeyword`

**Step 2**: Rename box-edge-keywords.ts concepts

The file should focus on:
- `BackgroundClipKeyword` (its unique contribution)
- Reference geometry-box.ts for visual/shape/geometry keywords

**Step 3**: Update imports across codebase

Any code importing from box-edge-keywords should import from geometry-box instead (except background-clip specific code).

---

## 📋 DETAILED ACTION PLAN

### Phase 1: Fix box-edge-keywords.ts (Remove Duplicates)

**File**: `src/core/keywords/box-edge-keywords.ts`

**Remove** (lines ~107-135):
```typescript
// DELETE THIS ENTIRE SECTION
export const visualBoxKeywordsSchema = z.union([...]);
export const VISUAL_BOX_KEYWORDS = ...;
export type VisualBoxKeyword = ...;
```

**Keep**:
- `BoxEdgeKeyword` (can rename to AllBoxKeywords or keep)
- `BackgroundClipKeyword` (unique to this file)

**Add at top**:
```typescript
// Import from geometry-box for consistency
import { visualBoxKeywordsSchema, type VisualBoxKeyword } from "./geometry-box";
```

### Phase 2: Export geometry-box.ts from index

**File**: `src/core/keywords/index.ts`

**Add after line 27**:
```typescript
export * from "./geometry-box";
```

**This now works because**:
- box-edge-keywords.ts no longer exports conflicting names
- geometry-box.ts is the source of truth

### Phase 3: Update background-clip to use geometry-box

**File**: `src/core/keywords/box-edge-keywords.ts`

Update BackgroundClipKeyword to reference geometry-box:
```typescript
import { visualBoxKeywords } from "./geometry-box";

export const backgroundClipKeywordsSchema = z
  .enum([...visualBoxKeywords, "text"] as const)
  .describe("...");
```

---

## 🧪 VERIFICATION PLAN

After changes:

```bash
# 1. TypeScript should compile
just typecheck

# 2. All tests should pass
just test

# 3. Check no regressions in clip-path
pnpm test --run src/parse/clip-path/geometry-box.test.ts
```

---

## 📊 IMPACT ASSESSMENT

### Files to Modify

1. `src/core/keywords/box-edge-keywords.ts` - Remove duplicate exports
2. `src/core/keywords/index.ts` - Add geometry-box export
3. Any files importing VisualBoxKeyword from box-edge - Update imports (likely none)

### Tests Affected

- ❌ None - geometry-box parser/generator already working
- ✅ All 2234 tests should continue passing

### Breaking Changes

- ❌ None - Internal refactor only
- Anyone importing from box-edge for visual-box should import from geometry-box
- But box-edge wasn't exported from index anyway, so no external impact

---

## 🎓 WHY THIS HAPPENED

**Timeline**:
1. Oct 18: Someone created `box-edge-keywords.ts` with flat structure
2. Oct 20: During clip-path work, realized need for spec-compliant hierarchy
3. Oct 20: Created `geometry-box.ts` with proper visual→shape→geometry
4. Oct 20: Didn't delete/refactor box-edge-keywords.ts (left duplicate)

**Root cause**: No coordination between the two implementations

**Lesson**: Always check for existing keyword files before creating new ones

---

## ✅ RECOMMENDATION

**Proceed with the fix**:
1. Remove duplicates from box-edge-keywords.ts
2. Export geometry-box.ts from index  
3. Keep both files (they serve different purposes)
4. Document the relationship

**Time**: 15-20 minutes for clean implementation

**Risk**: LOW - Just removing duplicates and adding export

**Do this?** YES - This resolves the conflict properly
