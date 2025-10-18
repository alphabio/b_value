# Session 7: System & Special Colors

**Duration**: 60-90 min  
**Tests**: +30  
**Complexity**: LOW  

---

## Goal

Implement system colors (ButtonText, etc.), transparent, currentcolor.

---

## Prerequisites

Keywords already exist:
- ✅ `src/core/keywords/color-keywords.ts` (transparent, currentcolor)
- System color keywords in MDN data

---

## Tasks

### 1. Types (10 min)

```typescript
export const systemColorSchema = z.object({
  kind: z.literal("system"),
  name: z.string(), // ButtonText, ActiveBorder, etc.
});

export const specialColorSchema = z.object({
  kind: z.literal("special"),
  value: z.enum(["transparent", "currentcolor"]),
});
```

---

### 2. Parsers (20 min)

**Create**: `src/parse/color/system.ts`  
**Create**: `src/parse/color/special.ts`

Use existing keyword modules.

---

### 3. Generators (10 min)

**Create**: `src/generate/color/system.ts`  
**Create**: `src/generate/color/special.ts`

---

### 4. Tests (25 min)

**Create**: `src/parse/color/system.test.ts` (15+ tests)  
**Create**: `src/parse/color/special.test.ts` (15+ tests)

---

## Quality Gates

```bash
just check
just test   # 578 + 30 = 608 tests
```

---

**Next**: [Session 8 - Master Parser](./session-8.md)
