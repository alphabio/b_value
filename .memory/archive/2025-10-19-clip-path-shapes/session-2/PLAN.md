# Session 2: Geometry Box Keywords

**Time Estimate**: 30-45 minutes  
**Tests Expected**: +20 tests  
**Complexity**: LOW-MEDIUM

---

## ⚠️ IMPORTANT: Validate URL Implementation First!

**Before starting new work**, validate the URL refactoring from Session 1:

### Validation Tasks (10 minutes)

1. **Read and understand the URL architecture**:
   - Review `src/core/types/url.ts` - Core URL type
   - Review `src/utils/parse/url.ts` - Shared parseUrl utility
   - Review `src/utils/generate/url.ts` - Shared urlToCss utility
   - Review how clip-path uses these in `src/parse/clip-path/url.ts`

2. **Check if filter should also use shared URL utilities**:
   - Current: `src/parse/filter/url.ts` has duplicated URL parsing logic
   - Task: Refactor filter to use `parseUrl()` from utils
   - Current: Filter has `UrlFilter` type with `kind: "url", url: string`
   - Task: Update to use core `Url` type with `kind: "url", value: string`
   - Run filter tests to ensure nothing breaks

3. **Verify test coverage**:
   - Run `pnpm test -- url` to check all URL-related tests pass
   - Check that round-trip tests work correctly

4. **Document any issues found**:
   - Note in handover if URL implementation needs changes
   - Or confirm it's solid and ready for reuse

---

## After Validation: Implement Geometry Box Keywords

### Goal

Implement all geometry-box keywords that can be used standalone with clip-path.

### Syntax

```css
<geometry-box> = <shape-box> | fill-box | stroke-box | view-box
<shape-box> = <visual-box> | margin-box
<visual-box> = content-box | padding-box | border-box
```

**Total Keywords**: 7
- content-box
- padding-box
- border-box
- margin-box
- fill-box
- stroke-box
- view-box

### Examples to Support

```css
clip-path: content-box;
clip-path: padding-box;
clip-path: border-box;
clip-path: margin-box;
clip-path: fill-box;    /* SVG context */
clip-path: stroke-box;  /* SVG context */
clip-path: view-box;    /* SVG context */
```

---

## Implementation Steps

### 1. Create Keyword Definitions (10 min)

**File**: `src/core/keywords/geometry-box.ts`

**Pattern to follow**: Look at `src/core/keywords/background-clip.ts`

```typescript
import { z } from "zod";

// Visual box keywords (used in layout)
export const visualBoxKeywords = [
  "content-box",
  "padding-box", 
  "border-box"
] as const;

export const visualBoxKeywordsSchema = z.enum(visualBoxKeywords);
export type VisualBoxKeyword = z.infer<typeof visualBoxKeywordsSchema>;

// Shape box adds margin-box
export const shapeBoxKeywords = [
  ...visualBoxKeywords,
  "margin-box"
] as const;

export const shapeBoxKeywordsSchema = z.enum(shapeBoxKeywords);
export type ShapeBoxKeyword = z.infer<typeof shapeBoxKeywordsSchema>;

// Geometry box adds SVG keywords
export const geometryBoxKeywords = [
  ...shapeBoxKeywords,
  "fill-box",
  "stroke-box",
  "view-box"
] as const;

export const geometryBoxKeywordsSchema = z.enum(geometryBoxKeywords);
export type GeometryBoxKeyword = z.infer<typeof geometryBoxKeywordsSchema>;
```

### 2. Update clip-path Types (5 min)

**File**: `src/core/types/clip-path.ts`

Add GeometryBox type:

```typescript
import type { Url } from "./url";
import type { GeometryBoxKeyword } from "@/core/keywords/geometry-box";

export type ClipPathValue = 
  | Url 
  | ClipPathNone
  | ClipPathGeometryBox;

export type ClipPathNone = {
  kind: "clip-path-none";
};

export type ClipPathGeometryBox = {
  kind: "clip-path-geometry-box";
  value: GeometryBoxKeyword;
};
```

### 3. Implement Parser (10 min)

**File**: `src/parse/clip-path/geometry-box.ts`

```typescript
import { err, ok, type Result } from "@/core/result";
import { geometryBoxKeywordsSchema } from "@/core/keywords/geometry-box";
import type { ClipPathGeometryBox } from "@/core/types/clip-path";

export function parse(css: string): Result<ClipPathGeometryBox, string> {
  const trimmed = css.trim();
  const result = geometryBoxKeywordsSchema.safeParse(trimmed);

  if (!result.success) {
    return err(`Invalid geometry-box value: "${css}"`);
  }

  return ok({ 
    kind: "clip-path-geometry-box", 
    value: result.data 
  });
}
```

### 4. Implement Generator (5 min)

**File**: `src/generate/clip-path/geometry-box.ts`

```typescript
import type { ClipPathGeometryBox } from "@/core/types/clip-path";

export function toCss(value: ClipPathGeometryBox): string {
  return value.value;
}
```

### 5. Write Tests (15 min)

**File**: `src/parse/clip-path/geometry-box.test.ts`

Test all 7 keywords:
- Valid keyword parsing
- Invalid keyword rejection
- Whitespace handling
- Case sensitivity
- Round-trip validation

**Expected tests**: ~20 tests
- 7 valid keyword tests
- 7 round-trip tests
- Invalid input tests
- Edge cases

### 6. Update Exports (5 min)

Update:
- `src/parse/clip-path/index.ts` - Add GeometryBox export
- `src/generate/clip-path/index.ts` - Add GeometryBox export

---

## Quality Gates

```bash
just check  # Format, lint, typecheck - MUST PASS
just test   # All tests - MUST PASS (1910 → 1930)
```

---

## Reference Files

**Keyword pattern examples**:
- `src/core/keywords/background-clip.ts` - Simple keyword enum
- `src/core/keywords/display.ts` - Another keyword example
- `src/parse/background/clip.ts` - Simple keyword parser pattern

**Test pattern examples**:
- `src/parse/clip-path/none.test.ts` - Simple keyword tests
- `src/parse/background/clip.test.ts` - Keyword validation tests

---

## Expected Outcome

After this session:
- ✅ 7 geometry-box keywords fully implemented
- ✅ ~20 new tests passing (1910 → 1930)
- ✅ URL validation completed
- ✅ Filter refactored to use shared URL utilities (if needed)
- ✅ All quality gates passing
- ✅ Ready for Session 3 (inset shape)

---

## Deliverables Checklist

- [ ] **URL Validation**: Checked and documented (or refactored if needed)
- [ ] `src/core/keywords/geometry-box.ts` - Created with all 3 keyword tiers
- [ ] `src/core/types/clip-path.ts` - Updated with ClipPathGeometryBox type
- [ ] `src/parse/clip-path/geometry-box.ts` - Parser implemented
- [ ] `src/parse/clip-path/geometry-box.test.ts` - ~20 tests written
- [ ] `src/generate/clip-path/geometry-box.ts` - Generator implemented
- [ ] Updated index exports
- [ ] All tests passing (target: 1930 tests)
- [ ] Quality gates passing
- [ ] HANDOVER.md created with validation results

---

## Notes

- Keep it simple: geometry-box is just keyword matching, no complex parsing
- Follow existing keyword patterns - don't reinvent
- Test all 7 keywords individually
- Document URL validation findings in handover
- If filter refactoring takes too long, note it as future work

---

**Ready to start!** First validate URL, then implement keywords.
