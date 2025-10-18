# Session 8: Master Parser & Integration

**Duration**: 90-120 min  
**Tests**: +40  
**Complexity**: HIGH  

---

## Goal

Create unified color parser and integrate with gradients.

---

## Tasks

### 1. Master Parser (45 min)

**Create**: `src/parse/color/index.ts`

```typescript
import { ok, err, type Result } from "@/core/result";
import type { Color } from "@/core/types/color";
import * as Hex from "./hex";
import * as Named from "./named";
import * as RGB from "./rgb";
import * as HSL from "./hsl";
// ... import all parsers

export const Color = {
  parse(input: string): Result<Color, string> {
    const trimmed = input.trim();
    
    // Try hex
    if (trimmed.startsWith("#")) {
      return Hex.parse(trimmed);
    }
    
    // Try function syntax
    if (trimmed.includes("(")) {
      if (trimmed.startsWith("rgb")) return RGB.parse(trimmed);
      if (trimmed.startsWith("hsl")) return HSL.parse(trimmed);
      if (trimmed.startsWith("hwb")) return HWB.parse(trimmed);
      if (trimmed.startsWith("lab")) return LAB.parse(trimmed);
      if (trimmed.startsWith("lch")) return LCH.parse(trimmed);
      if (trimmed.startsWith("oklab")) return OKLab.parse(trimmed);
      if (trimmed.startsWith("oklch")) return OKLCH.parse(trimmed);
    }
    
    // Try special
    if (trimmed === "transparent" || trimmed === "currentcolor") {
      return Special.parse(trimmed);
    }
    
    // Try named
    return Named.parse(trimmed);
  },
  
  // Export individual parsers
  hex: Hex,
  named: Named,
  rgb: RGB,
  hsl: HSL,
  // ...
};
```

---

### 2. Master Generator (15 min)

**Create**: `src/generate/color/index.ts`

```typescript
import type { Color } from "@/core/types/color";
import * as Hex from "./hex";
import * as Named from "./named";
// ... import all generators

export function toCss(color: Color): string {
  switch (color.kind) {
    case "hex": return Hex.toCss(color);
    case "named": return Named.toCss(color);
    case "rgb": return RGB.toCss(color);
    case "hsl": return HSL.toCss(color);
    case "hwb": return HWB.toCss(color);
    case "lab": return LAB.toCss(color);
    case "lch": return LCH.toCss(color);
    case "oklab": return OKLab.toCss(color);
    case "oklch": return OKLCH.toCss(color);
    case "system": return System.toCss(color);
    case "special": return Special.toCss(color);
  }
}

export const Color = {
  toCss,
  hex: Hex,
  named: Named,
  // ...
};
```

---

### 3. Gradient Integration (30 min)

**Update**: `src/parse/gradient/color-stop.ts`

Replace string color with parsed Color type:

```typescript
import * as ColorParse from "@/parse/color";

// In parseColorStop function:
const colorResult = ColorParse.Color.parse(colorString);
if (!colorResult.ok) {
  return err(colorResult.error);
}
const color = colorResult.value;
```

**Update**: `src/core/types/color-stop.ts`

Change color field from `string` to `Color` type.

---

### 4. Tests (30 min)

**Create**: `src/parse/color/index.test.ts` (20+ tests)

Test master parser dispatch logic.

**Create**: `test/integration/color-gradient.test.ts` (20+ tests)

Test gradients with all color formats:
- `radial-gradient(circle, #ff0000, rgb(0 255 0))`
- `linear-gradient(hsl(0 100% 50%), oklch(0.5 0.2 180))`

---

## Quality Gates

```bash
just check
just test   # 608 + 40 = 648 tests (ALL MUST PASS including original 258)
```

---

## Final Handover

Create `.memory/archive/YYYY-MM-DD-session-8/HANDOVER.md`

Document:
- Master parser dispatch strategy
- Gradient integration approach
- Any breaking changes (should be none)
- Performance considerations

---

## Commit

```bash
git commit -m "feat(colors): Session 8 - master parser and integration

- Created unified color parser with dispatch logic
- Integrated all 11 color formats
- Updated gradient color stops to use Color type
- 40+ integration tests
- All 648 tests passing

Phase 4 Color Implementation COMPLETE ✅"
```

---

**Done!** All 8 core sessions complete. Color system is production-ready.
