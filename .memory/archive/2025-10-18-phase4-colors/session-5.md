# Session 5: LAB & LCH Colors

**Duration**: 90-120 min  
**Tests**: +80  
**Complexity**: HIGH  

---

## Goal

Implement LAB and LCH color spaces with proper value ranges.

---

## Tasks

### 1. LAB/LCH Types (15 min)

**Update**: `src/core/types/color.ts`

```typescript
export const labColorSchema = z.object({
  kind: z.literal("lab"),
  l: z.number().min(0).max(100), // lightness %
  a: z.number().min(-125).max(125), // green-red
  b: z.number().min(-125).max(125), // blue-yellow
  alpha: z.number().min(0).max(1).optional(),
});

export const lchColorSchema = z.object({
  kind: z.literal("lch"),
  l: z.number().min(0).max(100), // lightness %
  c: z.number().min(0).max(150), // chroma
  h: z.number().min(0).max(360), // hue degrees
  alpha: z.number().min(0).max(1).optional(),
});
```

---

### 2. LAB Parser (30 min)

**Create**: `src/parse/color/lab.ts`

Parse: `lab(50% -20 30)`, `lab(50% -20 30 / 0.5)`

---

### 3. LCH Parser (30 min)

**Create**: `src/parse/color/lch.ts`

Parse: `lch(50% 50 180deg)`, `lch(50% 50 180 / 0.5)`

---

### 4. Generators (15 min)

**Create**: `src/generate/color/lab.ts`  
**Create**: `src/generate/color/lch.ts`

---

### 5. Tests (30 min)

**Create**: `src/parse/color/lab.test.ts` (40+ tests)  
**Create**: `src/parse/color/lch.test.ts` (40+ tests)

Test value range validation, alpha, round-trip.

---

## Quality Gates

```bash
just check
just test   # 418 + 80 = 498 tests
```

---

**Next**: [Session 6 - OKLab & OKLCH](./session-6.md)
