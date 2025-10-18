# Session 3: HSL Colors

**Duration**: 60-90 min  
**Tests**: +40  
**Complexity**: MEDIUM  

---

## Goal

Implement HSL color format with angle units and alpha.

---

## Tasks

### 1. HSL Type (10 min)

**Update**: `src/core/types/color.ts`

```typescript
export const hslColorSchema = z.object({
  kind: z.literal("hsl"),
  h: z.number().min(0).max(360), // degrees, normalized
  s: z.number().min(0).max(100), // percentage
  l: z.number().min(0).max(100), // percentage
  alpha: z.number().min(0).max(1).optional(),
});

// Add to union
```

---

### 2. HSL Parser (25 min)

**Create**: `src/parse/color/hsl.ts`

Handle:
- `hsl(360, 100%, 50%)` - comma syntax
- `hsl(360deg 100% 50%)` - space syntax with deg
- `hsl(1turn 100% 50%)` - turn units
- `hsl(360 100% 50% / 0.5)` - alpha
- `hsla(...)` - legacy

Normalize angles to 0-360 degrees.

---

### 3. Generator (15 min)

**Create**: `src/generate/color/hsl.ts`

Output modern syntax: `hsl(H S% L%)` or `hsl(H S% L% / A)`

---

### 4. Tests (30 min)

**Create**: `src/parse/color/hsl.test.ts` (40+ tests)

Test angle variations (deg, rad, grad, turn), alpha, round-trip.

---

## Quality Gates

```bash
just check
just test   # 348 + 40 = 388 tests
```

---

**Next**: [Session 4 - HWB Colors](./session-4.md)
