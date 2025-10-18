# Session 4: HWB Colors

**Duration**: 45-60 min  
**Tests**: +30  
**Complexity**: LOW-MEDIUM  

---

## Goal

Implement HWB (Hue, Whiteness, Blackness) color format.

---

## Tasks

### 1. HWB Type (10 min)

**Update**: `src/core/types/color.ts`

```typescript
export const hwbColorSchema = z.object({
  kind: z.literal("hwb"),
  h: z.number().min(0).max(360),
  w: z.number().min(0).max(100), // whiteness %
  b: z.number().min(0).max(100), // blackness %
  alpha: z.number().min(0).max(1).optional(),
});
```

---

### 2. Parser & Generator (20 min)

**Create**: `src/parse/color/hwb.ts`  
**Create**: `src/generate/color/hwb.ts`

Similar to HSL but with whiteness and blackness instead of saturation/lightness.

---

### 3. Tests (20 min)

**Create**: `src/parse/color/hwb.test.ts` (30+ tests)

---

## Quality Gates

```bash
just check
just test   # 388 + 30 = 418 tests
```

---

**Next**: [Session 5 - LAB & LCH](./session-5.md)
