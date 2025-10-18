# Session 6: OKLab & OKLCH Colors

**Duration**: 90-120 min
**Tests**: +80
**Complexity**: HIGH

---

## Goal

Implement OKLab and OKLCH color spaces (different value ranges than LAB/LCH).

---

## Tasks

### 1. Types (15 min)

```typescript
export const oklabColorSchema = z.object({
  kind: z.literal("oklab"),
  l: z.number().min(0).max(1), // lightness (NOT percentage)
  a: z.number().min(-0.4).max(0.4), // different range
  b: z.number().min(-0.4).max(0.4),
  alpha: z.number().min(0).max(1).optional(),
});

export const oklchColorSchema = z.object({
  kind: z.literal("oklch"),
  l: z.number().min(0).max(1),
  c: z.number().min(0).max(0.4), // different range
  h: z.number().min(0).max(360),
  alpha: z.number().min(0).max(1).optional(),
});
```

---

### 2. Parsers (60 min)

**Create**: `src/parse/color/oklab.ts`
**Create**: `src/parse/color/oklch.ts`

Parse: `oklab(0.5 -0.2 0.3)`, `oklch(0.5 0.2 180deg)`

---

### 3. Generators (15 min)

**Create**: `src/generate/color/oklab.ts`
**Create**: `src/generate/color/oklch.ts`

---

### 4. Tests (30 min)

**Create**: `src/parse/color/oklab.test.ts` (40+ tests)
**Create**: `src/parse/color/oklch.test.ts` (40+ tests)

---

## Quality Gates

```bash
just check
just test   # 498 + 80 = 578 tests
```

---

**Next**: [Session 7 - System Colors](./session-7.md)
