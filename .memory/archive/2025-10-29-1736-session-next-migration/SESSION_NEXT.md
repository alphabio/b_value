# Next Session: Enum Cleanup & Parse Tests

**Date**: 2025-10-29 | **Tests**: ✅ All passing | **Branch**: develop

---

## 🎯 SIDE QUEST: We are optimizing AGENTS onboarding

Stop right here and let's talk about the experience

---

## 🎯 Goal: Standardize Enum Schemas

**Problem**: `z.union([z.literal(...)])` generates 16+ errors instead of 1

**Solution**: Convert to `z.enum([...])` with custom error messages

---

## 📋 Tasks

### 1. Blend Mode (15 min)

```bash
# Fix src/core/keywords/blend-mode-keywords.ts
# Update typeName in configs
# Regenerate: tsx scripts/generate-generate-tests.ts visual/{background,mix}-blend-mode
```

### 2. Remaining Enums (45 min)
Per `.memory/ENUM_TEST_NOTES.md`:
- flexbox: align-content, align-items, align-self, flex-direction, flex-wrap, justify-content
- layout: box-sizing, clear, cursor, float
- typography: font-style, text-align, text-transform

### 3. Parse Tests (1-2 hrs)
Generate parse tests for all properties

---

## 🔍 Pattern

```typescript
// Convert z.union([z.literal(...)]) to:
export const schema = z.enum(["a", "b"], {
  error: () => ({ message: "Expected a | b" })
});

const DESCRIPTIONS: Record<Type, string> = {...};
export const options = KEYWORDS.map(v => ({
  value: v,
  description: DESCRIPTIONS[v]
}));
```

---

## 📁 References
- `.memory/ENUM_TEST_NOTES.md`
- `.memory/decisions/TEST_GENERATOR_IMPROVEMENTS.md`
- Completed: display, visibility, position

**Status**: ✅ Ready to go!
