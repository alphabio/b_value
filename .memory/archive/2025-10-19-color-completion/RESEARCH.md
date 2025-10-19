# Research: Why color() Function is Not Supported

## Summary

The `color()` function (e.g., `color(display-p3 0.928 0.322 0.203 / 0.8)`) is **NOT YET IMPLEMENTED** in the codebase.

## Current State

### ✅ What IS Implemented (Color Support)
The project currently supports these color formats:

1. **Hex colors**: `#RGB`, `#RRGGBB`, `#RGBA`, `#RRGGBBAA`
2. **Named colors**: 148 standard CSS color names
3. **RGB**: `rgb(255 87 51)`, `rgb(255 87 51 / 0.5)`
4. **HSL**: `hsl(12deg 100% 60%)`, `hsl(12deg 100% 60% / 0.5)`
5. **HWB**: `hwb(12deg 0% 20%)`, `hwb(12deg 0% 20% / 0.5)`
6. **LAB**: `lab(50% -20 30)`, `lab(50% -20 30 / 0.5)`
7. **LCH**: `lch(50% 50 180deg)`, `lch(50% 50 180deg / 0.5)`
8. **OKLab**: `oklab(0.5 -0.1 0.1)`, `oklab(0.5 -0.1 0.1 / 0.5)`
9. **OKLCH**: `oklch(0.5 0.15 180deg)`, `oklch(0.5 0.15 180deg / 0.5)`
10. **System colors**: `currentColor`, `AccentColor`, `ButtonFace`, etc.
11. **Special colors**: `transparent`

**Test Count**: ~450 color tests passing (sessions 1-7 complete)

### ❌ What is NOT Implemented

1. **`color()` function** - Explicit color space specification
   - Syntax: `color(display-p3 0.928 0.322 0.203 / 0.8)`
   - Syntax: `color(srgb 0.5 0.2 0.8)`
   - Syntax: `color(srgb-linear 0.2 0.4 0.6)`
   
2. **`color-mix()` function** - Color mixing/blending
   - Syntax: `color-mix(in srgb, red 50%, blue)`
   - Syntax: `color-mix(in oklch, red, blue 30%)`

3. **`light-dark()` function** - Theme-aware colors
   - Syntax: `light-dark(white, black)`

## Why Not Implemented?

### Planning Documents Show It Was Intended

From `.memory/archive/2025-10-18-phase4-colors-backgrounds/`:

1. **PHASE4_PLAN.md** lists it as planned:
   - "Color functions: `color()` with color spaces"
   - "Color mixing: `color-mix()`"
   - Color Spaces listed: srgb, srgb-linear, display-p3, a98-rgb, prophoto-rgb, rec2020, lab, oklab, xyz, xyz-d50, xyz-d65, hsl, hwb, lch, oklch

2. **IMPLEMENTATION_ROADMAP.md** had it scheduled for Week 3:
   - Day 3-4: "Create Color Function Parser (`src/parse/color/color.ts`)"
   - "Parse color() functions: `color(srgb 0.5 0.2 0.8)`"
   - "Handle different color spaces (srgb, display-p3, etc.)"

3. **Phase 4 Master Plan** shows 8 sessions planned:
   - Sessions 1-4: ✅ Hex, Named, RGB, HSL, HWB (COMPLETE)
   - Sessions 5-7: ⚪ LAB/LCH, OKLab/OKLCH, System Colors (PARTIALLY DONE)
   - Session 8: ⚪ Master Parser & Integration (TODO)
   
   The `color()` function was likely intended for Session 8 or beyond.

### Current Implementation Phase

Looking at git history:
- Last color work: Sessions 6-7 (OKLab, OKLCH, System Colors)
- Session 8 "Master Parser & Integration" was planned but appears incomplete
- The project moved on to other features (shadows, borders, layouts, clip-path)

## What Would Be Needed to Implement?

### 1. Type Definitions
Add to `src/core/types/color.ts`:

```typescript
export const colorFunctionSchema = z.object({
  kind: z.literal("color"),
  colorSpace: z.enum([
    "srgb", "srgb-linear", "display-p3", "a98-rgb", 
    "prophoto-rgb", "rec2020", "xyz", "xyz-d50", "xyz-d65"
  ]),
  channels: z.array(z.number()).length(3), // [r, g, b] or [x, y, z]
  alpha: z.number().min(0).max(1).optional(),
});

export type ColorFunction = z.infer<typeof colorFunctionSchema>;
```

### 2. Parser Implementation
Create `src/parse/color/color-function.ts`:

```typescript
export function parse(input: string): Result<ColorFunction, string> {
  // Parse: color(display-p3 0.928 0.322 0.203 / 0.8)
  // 1. Extract color space
  // 2. Parse 3 channel values (0-1 range typically)
  // 3. Parse optional alpha after /
  // 4. Validate color space and channel ranges
}
```

### 3. Generator Implementation
Create `src/generate/color/color-function.ts`:

```typescript
export function toCss(value: ColorFunction): string {
  // Generate: color(display-p3 0.928 0.322 0.203 / 0.8)
}
```

### 4. Integration
- Add to color union type
- Add to master color parser
- Add to master color generator

## Estimated Effort

**Time**: 2-3 hours
**Tests**: +30-40 tests
**Complexity**: MEDIUM-HIGH

Challenges:
- Multiple color spaces with different valid ranges
- Channel value validation per color space
- Wide gamut color space handling
- Integration with existing color infrastructure

## Workarounds

Currently, users must use one of the supported formats:
- Display P3 colors → Use `oklch()` or `lab()` for wide gamut
- sRGB colors → Use `rgb()` 
- Need specific color space → Convert manually to supported format

## Recommendation

This would be a good "Phase 4 Completion" task or "Advanced Color Features" session to:
1. Complete the color() function
2. Add color-mix() function
3. Add light-dark() function
4. Finalize Session 8 work

Priority: **MEDIUM** - Nice to have for completeness, but existing color formats cover most use cases.
