# Color Module Completion Plan

**Date**: 2025-10-19  
**Type**: SIDE QUEST / DEVIATION  
**Priority**: Complete color module, then return to clip-path  
**Time**: 2-3 hours  
**Tests**: +30-40 tests  

---

## ⚠️ IMPORTANT: This is a Deviation

**Main Quest**: Clip-Path Implementation (Session 4/9 complete)  
**Side Quest**: Complete missing color() function  
**After Completion**: Resume clip-path with ellipse() (Session 5)

---

## Context

### What's Missing

The project has excellent color support (11 formats, ~450 tests) but is missing the `color()` function:

**Missing**: `color(display-p3 0.928 0.322 0.203 / 0.8)`

This was planned in Phase 4 but never completed. The work stopped after Session 7.

### Why Complete It Now

User requested to complete the color module before continuing clip-path work. This ensures:
1. Color module is 100% complete
2. No loose ends in color implementation
3. Can reference as "complete" in documentation
4. Then return focus to clip-path

---

## What to Implement

### 1. IR Type Definition

**File**: `src/core/types/color.ts`

Add:
```typescript
/**
 * CSS color() function with explicit color space.
 *
 * Represents a color in a specific color space with explicit channel values.
 * Supports wide-gamut color spaces like display-p3 and professional spaces.
 *
 * Syntax: color(colorspace c1 c2 c3 [ / alpha ]?)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color}
 *
 * @example
 * ```typescript
 * // Display P3 color
 * const color1: ColorFunction = {
 *   kind: "color",
 *   colorSpace: "display-p3",
 *   channels: [0.928, 0.322, 0.203],
 *   alpha: 0.8
 * };
 *
 * // sRGB linear
 * const color2: ColorFunction = {
 *   kind: "color",
 *   colorSpace: "srgb-linear",
 *   channels: [0.5, 0.2, 0.8]
 * };
 * ```
 *
 * @public
 */
export const colorFunctionSchema = z.object({
  kind: z.literal("color"),
  colorSpace: z.enum([
    "srgb",
    "srgb-linear",
    "display-p3",
    "a98-rgb",
    "prophoto-rgb",
    "rec2020",
    "xyz",
    "xyz-d50",
    "xyz-d65",
  ]),
  channels: z.tuple([
    z.number(), // First channel
    z.number(), // Second channel
    z.number(), // Third channel
  ]),
  alpha: z.number().min(0).max(1).optional(),
});

export type ColorFunction = z.infer<typeof colorFunctionSchema>;
```

**Update color union**:
```typescript
export const colorSchema = z.union([
  hexColorSchema,
  namedColorSchema,
  rgbColorSchema,
  hslColorSchema,
  hwbColorSchema,
  labColorSchema,
  lchColorSchema,
  oklabColorSchema,
  oklchColorSchema,
  systemColorSchema,
  specialColorSchema,
  colorFunctionSchema, // ADD THIS
]);
```

---

### 2. Parser Implementation

**File**: `src/parse/color/color-function.ts`

```typescript
// b_path:: src/parse/color/color-function.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as AstUtils from "@/utils/ast";

/**
 * Parse color() function with explicit color space.
 *
 * Syntax: color(colorspace c1 c2 c3 [ / alpha ]?)
 *
 * @param input - CSS color() function string
 * @returns Result with ColorFunction IR or error
 *
 * @example
 * ```typescript
 * parse("color(display-p3 0.928 0.322 0.203)");
 * parse("color(srgb 0.5 0.2 0.8 / 0.8)");
 * parse("color(xyz-d50 0.3 0.4 0.5)");
 * ```
 *
 * @public
 */
export function parse(input: string): Result<Type.ColorFunction, string> {
  try {
    const astResult = AstUtils.parseCssString(input);
    if (!astResult.ok) return err(astResult.error);

    const fnResult = AstUtils.findFunctionNode(astResult.value, "color");
    if (!fnResult.ok) return err(fnResult.error);

    const children = fnResult.value.children.toArray();
    
    if (children.length < 4) {
      return err("color() requires at least 4 arguments: colorspace + 3 channels");
    }

    // 1. Parse color space
    const colorSpaceNode = children[0];
    if (!colorSpaceNode || colorSpaceNode.type !== "Identifier") {
      return err("Expected color space identifier");
    }
    
    const colorSpace = colorSpaceNode.name.toLowerCase();
    const validSpaces = [
      "srgb", "srgb-linear", "display-p3", "a98-rgb",
      "prophoto-rgb", "rec2020", "xyz", "xyz-d50", "xyz-d65"
    ];
    
    if (!validSpaces.includes(colorSpace)) {
      return err(`Invalid color space: ${colorSpace}`);
    }

    // 2. Parse 3 channel values
    const channels: [number, number, number] = [0, 0, 0];
    
    for (let i = 0; i < 3; i++) {
      const channelNode = children[i + 1];
      if (!channelNode) {
        return err(`Missing channel ${i + 1}`);
      }
      
      if (channelNode.type === "Number") {
        const value = Number.parseFloat(channelNode.value);
        if (Number.isNaN(value)) {
          return err(`Invalid channel ${i + 1} value`);
        }
        channels[i] = value;
      } else if (channelNode.type === "Percentage") {
        // Convert percentage to 0-1 range
        const value = Number.parseFloat(channelNode.value) / 100;
        if (Number.isNaN(value)) {
          return err(`Invalid channel ${i + 1} percentage`);
        }
        channels[i] = value;
      } else {
        return err(`Expected number or percentage for channel ${i + 1}`);
      }
    }

    // 3. Parse optional alpha after /
    let alpha: number | undefined = undefined;
    let idx = 4;
    
    if (idx < children.length) {
      const slashNode = children[idx];
      if (slashNode?.type === "Operator" && slashNode.value === "/") {
        idx++;
        const alphaNode = children[idx];
        if (!alphaNode) {
          return err("Expected alpha value after /");
        }
        
        if (alphaNode.type === "Number") {
          alpha = Number.parseFloat(alphaNode.value);
        } else if (alphaNode.type === "Percentage") {
          alpha = Number.parseFloat(alphaNode.value) / 100;
        } else {
          return err("Expected number or percentage for alpha");
        }
        
        if (Number.isNaN(alpha) || alpha < 0 || alpha > 1) {
          return err("Alpha must be between 0 and 1");
        }
      }
    }

    return ok({
      kind: "color",
      colorSpace: colorSpace as Type.ColorFunction["colorSpace"],
      channels,
      ...(alpha !== undefined && { alpha }),
    });
  } catch (e) {
    return err(`Failed to parse color(): ${e instanceof Error ? e.message : String(e)}`);
  }
}
```

---

### 3. Generator Implementation

**File**: `src/generate/color/color-function.ts`

```typescript
// b_path:: src/generate/color/color-function.ts
import type * as Type from "@/core/types";

/**
 * Convert color() IR to CSS string.
 *
 * @param value - ColorFunction IR
 * @returns CSS color() function string
 *
 * @example
 * ```typescript
 * toCss({
 *   kind: "color",
 *   colorSpace: "display-p3",
 *   channels: [0.928, 0.322, 0.203],
 *   alpha: 0.8
 * });
 * // "color(display-p3 0.928 0.322 0.203 / 0.8)"
 * ```
 *
 * @public
 */
export function toCss(value: Type.ColorFunction): string {
  const parts: string[] = ["color(", value.colorSpace];
  
  // Add channels
  for (const channel of value.channels) {
    parts.push(" ");
    // Round to reasonable precision (6 decimal places)
    parts.push(channel.toFixed(6).replace(/\.?0+$/, ""));
  }
  
  // Add alpha if present
  if (value.alpha !== undefined) {
    parts.push(" / ");
    parts.push(value.alpha.toFixed(6).replace(/\.?0+$/, ""));
  }
  
  parts.push(")");
  return parts.join("");
}
```

---

### 4. Tests

**File**: `src/parse/color/color-function.test.ts` (~20 tests)

Test cases:
- All 9 color spaces (srgb, srgb-linear, display-p3, a98-rgb, prophoto-rgb, rec2020, xyz, xyz-d50, xyz-d65)
- Channel values as numbers and percentages
- Optional alpha values
- Edge cases (0 values, 1 values, negative, out of range)
- Error cases (invalid color space, wrong number of channels, invalid alpha)
- Whitespace handling

**File**: `src/generate/color/color-function.test.ts` (~15 tests)

Test cases:
- Generate for all color spaces
- Channel precision/rounding
- Alpha generation
- Round-trip validation

---

### 5. Integration

**Update**: `src/parse/color/index.ts`
```typescript
export * as ColorFunction from "./color-function";
```

**Update**: `src/generate/color/index.ts`
```typescript
export * as ColorFunction from "./color-function";
```

**Update master color parser** (if exists) to dispatch to ColorFunction.parse

---

## Test Strategy

### Parser Tests (~20)
1. **Color space variations** (9 tests - one per space)
2. **Channel formats** (2 tests - numbers vs percentages)
3. **Alpha handling** (3 tests - no alpha, with alpha, percentage alpha)
4. **Edge cases** (3 tests - zero values, boundary values, precision)
5. **Error cases** (3 tests - invalid space, wrong channels, bad alpha)

### Generator Tests (~15)
1. **Basic generation** (9 tests - one per color space)
2. **Precision/rounding** (2 tests)
3. **Alpha generation** (2 tests)
4. **Round-trip** (2 tests)

**Total**: ~35 tests

---

## Checklist

- [ ] Add ColorFunction type to `src/core/types/color.ts`
- [ ] Update color union to include colorFunctionSchema
- [ ] Create `src/parse/color/color-function.ts` parser
- [ ] Create `src/parse/color/color-function.test.ts` tests
- [ ] Export from `src/parse/color/index.ts`
- [ ] Create `src/generate/color/color-function.ts` generator
- [ ] Create `src/generate/color/color-function.test.ts` tests
- [ ] Export from `src/generate/color/index.ts`
- [ ] Run `just check` (all passing)
- [ ] Run `just test` (all passing, ~2065 tests expected)
- [ ] Create HANDOVER.md documenting completion
- [ ] Update CONTINUE.md to return focus to clip-path
- [ ] Commit with message: "feat(color): complete color module with color() function"

---

## After Completion

**IMMEDIATELY** update CONTINUE.md to:
1. Mark color module as COMPLETE
2. Redirect next agent back to clip-path
3. Point to clip-path session 5 (ellipse() function)

Create handover that says:
```
✅ Color module now COMPLETE (12 color formats supported)
🔄 RETURN TO MAIN QUEST: Clip-Path Session 5 - ellipse()
```

---

## Time Estimate

**Phase 1**: Type definitions (15 min)
**Phase 2**: Parser implementation (45 min)
**Phase 3**: Parser tests (30 min)
**Phase 4**: Generator implementation (20 min)
**Phase 5**: Generator tests (20 min)
**Phase 6**: Integration & verification (20 min)

**Total**: 2.5 hours

---

## Success Criteria

- [ ] color() function fully implemented
- [ ] All 9 color spaces supported
- [ ] ~35 tests passing
- [ ] Round-trip validation working
- [ ] All quality gates passing
- [ ] Documentation complete
- [ ] Ready to return to clip-path work

---

## Reference Links

**Research**: See `.memory/archive/2025-10-19-color-completion/RESEARCH.md`  
**Original Plan**: `.memory/archive/2025-10-18-phase4-colors-backgrounds/IMPLEMENTATION_ROADMAP.md`  
**Return To**: `.memory/archive/2025-10-19-clip-path-shapes/session-4/HANDOVER.md`
