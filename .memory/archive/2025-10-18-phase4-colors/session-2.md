# Session 2: RGB Colors

**Duration**: 60-90 min  
**Tests**: +50  
**Complexity**: MEDIUM  

---

## Goal

Implement RGB color format with all syntax variations and alpha channel.

---

## Prerequisites

Session 1 complete:
- ✅ Base color types exist
- ✅ Hex and named colors working

---

## Tasks

### 1. RGB Type (10 min)

**Update**: `src/core/types/color.ts`

```typescript
export const rgbColorSchema = z.object({
  kind: z.literal("rgb"),
  r: z.number().min(0).max(255),
  g: z.number().min(0).max(255),
  b: z.number().min(0).max(255),
  alpha: z.number().min(0).max(1).optional(),
});
export type RGBColor = z.infer<typeof rgbColorSchema>;

// Update union
export const colorSchema = z.union([
  hexColorSchema,
  namedColorSchema,
  rgbColorSchema, // ADD THIS
]);
```

---

### 2. RGB Parser (30 min)

**Create**: `src/parse/color/rgb.ts`

Handle all syntax variations:
- `rgb(255, 0, 0)` - comma syntax
- `rgb(255 0 0)` - space syntax
- `rgb(100% 0% 0%)` - percentage syntax
- `rgb(255 0 0 / 0.5)` - alpha with slash
- `rgb(255, 0, 0, 0.5)` - alpha with comma (legacy)
- `rgba(...)` - legacy rgba function

Use css-tree to parse function:

```typescript
import * as csstree from "css-tree";
import { ok, err, type Result } from "@/core/result";
import type { RGBColor } from "@/core/types/color";

export function parse(input: string): Result<RGBColor, string> {
  let ast: csstree.CssNode;
  try {
    ast = csstree.parse(input, { context: "value" });
  } catch (e) {
    return err(`Invalid CSS syntax: ${e}`);
  }

  // Find rgb() or rgba() function
  let rgbFunc: csstree.FunctionNode | null = null;
  csstree.walk(ast, (node) => {
    if (node.type === "Function" && (node.name === "rgb" || node.name === "rgba")) {
      rgbFunc = node;
    }
  });

  if (!rgbFunc) {
    return err("No rgb() or rgba() function found");
  }

  // Parse arguments (handle comma and space syntax)
  // See existing gradient parsers for pattern
  
  // Return normalized RGBColor
}
```

---

### 3. RGB Generator (15 min)

**Create**: `src/generate/color/rgb.ts`

```typescript
import type { RGBColor } from "@/core/types/color";

export function toCss(color: RGBColor): string {
  const { r, g, b, alpha } = color;
  
  if (alpha !== undefined && alpha < 1) {
    return `rgb(${r} ${g} ${b} / ${alpha})`;
  }
  
  return `rgb(${r} ${g} ${b})`;
}
```

---

### 4. Tests (25 min)

**Create**: `src/parse/color/rgb.test.ts` (50+ tests)

Test cases:
- Integer values: `rgb(255, 0, 0)`
- Percentage values: `rgb(100%, 0%, 0%)`
- Space-separated: `rgb(255 0 0)`
- Alpha with slash: `rgb(255 0 0 / 0.5)`
- Alpha with comma: `rgb(255, 0, 0, 0.5)`
- Legacy rgba: `rgba(255, 0, 0, 0.5)`
- Edge cases: black, white, boundaries
- Invalid: negative, >255, >100%, wrong arg count
- Round-trip accuracy

---

## Quality Gates

```bash
just check  # Must pass
just test   # 298 + 50 = 348 tests
```

---

## Handover

Create `.memory/archive/YYYY-MM-DD-session-2/HANDOVER.md`

Document:
- RGB type and parser implementation
- Syntax variations supported
- Alpha handling approach
- Any tricky parsing decisions

---

## Commit

```bash
git commit -m "feat(colors): Session 2 - RGB colors

- Added RGB color type with alpha support
- Implemented RGB parser (comma, space, percentage)
- Handle rgba() legacy syntax
- Alpha normalization to 0-1 range
- 50+ tests with 100% round-trip

Session 2 complete"
```

---

**Next**: [Session 3 - HSL Colors](./session-3.md)
