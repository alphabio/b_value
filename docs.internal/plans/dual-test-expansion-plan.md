# Dual Test Expansion Plan

**Purpose**: Systematically add parse + generate tests with roundtrip validation

**Status**: 33 properties with generate tests ✅ | Parse tests needed ⏳

---

## ✅ Phase 1: Foundation (Complete)

**Animation** (8 properties) - 100%
- delay, direction, duration, fill-mode, iteration-count, name, play-state, timing-function

---

## ✅ Phase 2A: Transition (Complete)

**Transition** (4/5 properties) - 80%
- ✅ delay, duration, property, timing-function
- ⏳ transition-behavior (deferred)

---

## ⏳ Phase 2B: Visual (In Progress)

**Visual** (5 properties)
- ✅ opacity, visibility (generate tests done)
- ✅ background-blend-mode, mix-blend-mode (generate tests done, enum fix needed)

---

## ⏳ Phase 3: Enum Properties

**Flexbox** (6 properties)
- align-content, align-items, align-self, flex-direction, flex-wrap, justify-content

**Layout** (7 properties)
- box-sizing, clear, cursor, display, float, overflow-x, overflow-y, position

**Typography** (3 properties)
- font-style, text-align, text-transform

---

## 📊 Progress Summary

```
Animation:     8/8  (100%) ✅
Transition:    4/5  (80%)  ✅
Visual:        4/4  (100%) ✅ (enum fix pending)
Enums:         0/16 (0%)   ⏳
---
TOTAL:        16/33 (48%)
```

---

## 🎯 Next Steps

1. **Enum standardization** - Convert remaining properties to `z.enum()`
2. **Parse test generation** - Generate parse tests for all 33 properties
3. **Expand coverage** - Add more properties per ROADMAP.md

---

## 📝 Notes

- **Dual tests** = parse test + generate test + roundtrip validation
- **Roundtrip** validates: `parse(generate(IR)) === IR`
- **See** `.memory/ENUM_TEST_NOTES.md` for enum property list
- **See** `.memory/ROADMAP.md` for full property inventory

**Last Updated**: 2025-10-29
