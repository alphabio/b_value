# Session 1: Hex & Named Colors

**Duration**: 60-90 min
**Tests**: +40
**Complexity**: LOW

---

## Goal

Implement simplest color formats (hex and named colors) to validate architecture.

---

## Prerequisites

Color keywords already exist:
- ✅ `src/core/keywords/basic-color-keywords.ts` (22 colors)
- ✅ `src/core/keywords/extended-color-keywords.ts` (126 colors)
- ✅ `src/core/keywords/color-keywords.ts` (transparent, currentcolor)

---

## Tasks

### 1. Base Color Types (15 min)

**Create**: `src/core/types/color.ts`

```typescript
import { z } from "zod";

// Base hex color
export const hexColorSchema = z.object({
  kind: z.literal("hex"),
  value: z.string().regex(/^#[0-9A-Fa-f]{6,8}$/), // #RRGGBB or #RRGGBBAA
});
export type HexColor = z.infer<typeof hexColorSchema>;

// Named color
export const namedColorSchema = z.object({
  kind: z.literal("named"),
  name: z.string(), // validates against keyword list
});
export type NamedColor = z.infer<typeof namedColorSchema>;

// Union type (will grow in later sessions)
export const colorSchema = z.union([hexColorSchema, namedColorSchema]);
export type Color = z.infer<typeof colorSchema>;
```

---

### 2. Hex Color Parser (20 min)

**Create**: `src/parse/color/hex.ts`

Parse:
- `#RGB` → normalize to `#RRGGBB`
- `#RRGGBB` → uppercase
- `#RRGGBBAA` → with alpha

Example:

```typescript
import { ok, err, type Result } from "@/core/result";
import type { HexColor } from "@/core/types/color";

export function parse(input: string): Result<HexColor, string> {
  if (!input.startsWith("#")) {
    return err("Hex color must start with #");
  }

  const hex = input.slice(1);

  // #RGB → #RRGGBB
  if (hex.length === 3) {
    const normalized = hex.split('').map(c => c + c).join('');
    return ok({ kind: "hex", value: `#${normalized.toUpperCase()}` });
  }

  // #RRGGBB or #RRGGBBAA
  if (hex.length === 6 || hex.length === 8) {
    if (!/^[0-9A-Fa-f]+$/.test(hex)) {
      return err("Invalid hex color format");
    }
    return ok({ kind: "hex", value: `#${hex.toUpperCase()}` });
  }

  return err("Hex color must be #RGB, #RRGGBB, or #RRGGBBAA");
}
```

---

### 3. Named Color Parser (15 min)

**Create**: `src/parse/color/named.ts`

Use existing keyword modules:

```typescript
import { ok, err, type Result } from "@/core/result";
import { BASIC_NAMED_COLOR_KEYWORDS, EXTENDED_NAMED_COLOR_KEYWORDS } from "@/core/keywords";
import type { NamedColor } from "@/core/types/color";

const ALL_NAMED_COLORS = new Set([
  ...BASIC_NAMED_COLOR_KEYWORDS,
  ...EXTENDED_NAMED_COLOR_KEYWORDS,
]);

export function parse(input: string): Result<NamedColor, string> {
  const lower = input.toLowerCase();

  if (ALL_NAMED_COLORS.has(lower)) {
    return ok({ kind: "named", name: lower });
  }

  return err(`Unknown color name: ${input}`);
}
```

---

### 4. Generators (15 min)

**Create**: `src/generate/color/hex.ts`

```typescript
import type { HexColor } from "@/core/types/color";

export function toCss(color: HexColor): string {
  return color.value;
}
```

**Create**: `src/generate/color/named.ts`

```typescript
import type { NamedColor } from "@/core/types/color";

export function toCss(color: NamedColor): string {
  return color.name;
}
```

---

### 5. Tests (25 min)

**Create**: `src/parse/color/hex.test.ts` (20+ tests)

```typescript
import { describe, it, expect } from "vitest";
import * as Hex from "./hex";
import * as Gen from "@/generate/color/hex";

describe("hex color parser", () => {
  it("parses #RGB", () => {
    const result = Hex.parse("#abc");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.value).toBe("#AABBCC");
    }
  });

  it("parses #RRGGBB", () => {
    const result = Hex.parse("#ff5733");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.value).toBe("#FF5733");
    }
  });

  it("parses #RRGGBBAA", () => {
    const result = Hex.parse("#ff573380");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.value).toBe("#FF573380");
    }
  });

  it("rejects invalid format", () => {
    expect(Hex.parse("ff5733").ok).toBe(false);
    expect(Hex.parse("#ff57").ok).toBe(false);
    expect(Hex.parse("#gg5733").ok).toBe(false);
  });

  describe("round-trip", () => {
    it("maintains accuracy", () => {
      const original = "#FF5733";
      const parsed = Hex.parse(original);
      expect(parsed.ok).toBe(true);
      if (parsed.ok) {
        expect(Gen.toCss(parsed.value)).toBe(original);
      }
    });
  });
});
```

**Create**: `src/parse/color/named.test.ts` (20+ tests)

Test basic colors, extended colors, case-insensitivity, invalid names, round-trip.

---

## Quality Gates

```bash
just check  # Must pass
just test   # 258 + 40 = 298 tests
```

---

## Handover

Create `.memory/archive/YYYY-MM-DD-session-1/HANDOVER.md`:

```markdown
# Session 1 Handover

**Status**: ✅ DONE
**Tests**: 298 passing (+40)
**Duration**: X minutes

## Completed
- [x] Base color type infrastructure
- [x] Hex color parser (#RGB, #RRGGBB, #RRGGBBAA)
- [x] Named color parser (148 colors)
- [x] Generators for both
- [x] 40+ tests with 100% round-trip

## Architecture
- Used discriminated union with `kind` field
- Normalized hex to uppercase #RRGGBB format
- Named colors stored as lowercase

## Next Session
Session 2: Implement RGB color format
- Add RGBColor type to color.ts
- Create rgb.ts parser (comma and space syntax)
- Handle alpha channel variations

## Blockers
None

## Notes
- Color keywords already existed - reused them
- Hex normalization makes round-trip consistent
```

---

## Commit

```bash
git add -A
git commit -m "feat(colors): Session 1 - hex and named colors

- Added base color type infrastructure
- Implemented hex parser (#RGB, #RRGGBB, #RRGGBBAA)
- Implemented named color parser (148 colors)
- Added generators for both formats
- 40+ tests with 100% round-trip accuracy

Session 1 complete"
```

---

**Next**: [Session 2 - RGB Colors](./session-2.md)
