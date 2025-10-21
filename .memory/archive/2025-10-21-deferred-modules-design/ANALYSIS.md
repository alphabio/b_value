# Deferred Modules Analysis

**Date**: 2025-10-21  
**Scope**: text, background, layout modules

---

## Current State Analysis

### 1. Text Module (text-decoration-*)

**MDN Structure**:
```
text-decoration (SHORTHAND - REJECT)
├── text-decoration-line      (longhand)
├── text-decoration-style     (longhand)
├── text-decoration-color     (longhand)
└── text-decoration-thickness (longhand)
```

**Current Implementation**:
```typescript
// src/parse/text/text.ts
export function parse(value: string): ParseResult<unknown> {
  // Try each longhand parser in sequence
  if (Line.parse(value).ok) return ...
  if (Style.parse(value).ok) return ...
  if (Thickness.parse(value).ok) return ...
  if (Color.parse(value).ok) return ...
  return parseErr(...)
}
```

**Properties**:
- `text-decoration-line`: keywords (none, underline, overline, line-through)
- `text-decoration-style`: keywords (solid, double, dotted, dashed, wavy)
- `text-decoration-color`: <color>
- `text-decoration-thickness`: auto | from-font | <length-percentage>

**Problem**: 
- Current parse() tries to guess which property based on value type
- No unified IR type (returns different types: keyword, Color, length-percentage)
- Cannot distinguish which property user wants

**Reality Check**:
❌ "text-decoration" is a SHORTHAND → Should be REJECTED per ADR-003
✅ "text-decoration-line", "text-decoration-style", etc. are LONGHANDS → Should be PARSED

---

### 2. Background Module

**MDN Structure**:
```
background (SHORTHAND - REJECT)
├── background-image      (longhand)
├── background-position   (longhand)
├── background-size       (longhand)
├── background-repeat     (longhand)
├── background-origin     (longhand)
├── background-clip       (longhand)
├── background-attachment (longhand)
└── background-color      (longhand)
```

**Current Implementation**:
```typescript
// src/parse/background/background.ts
export function parse(value: string): ParseResult<unknown> {
  // Try each longhand parser
  if (Size.parse(value).ok) return ...
  if (Repeat.parse(value).ok) return ...
  if (Attachment.parse(value).ok) return ...
  if (Clip.parse(value).ok) return ...
  if (Origin.parse(value).ok) return ...
  return parseErr(...)
}
```

**Problem**: Same as text module
- Guessing which property
- No unified IR
- Mixing different property types

**Reality Check**:
❌ "background" is a SHORTHAND → Should be REJECTED per ADR-003
✅ Individual "background-*" properties are LONGHANDS → Should be PARSED

---

### 3. Layout Module

**Current Structure**:
```
src/parse/layout/
├── top.ts         (longhand: <length-percentage> | auto)
├── right.ts       (longhand: <length-percentage> | auto)
├── bottom.ts      (longhand: <length-percentage> | auto)
├── left.ts        (longhand: <length-percentage> | auto)
├── width.ts       (longhand: <length-percentage> | auto | ...)
├── height.ts      (longhand: <length-percentage> | auto | ...)
├── position.ts    (longhand: static | relative | absolute | ...)
├── display.ts     (longhand: block | inline | flex | ...)
├── opacity.ts     (longhand: <number>)
├── visibility.ts  (longhand: visible | hidden | collapse)
├── z-index.ts     (longhand: auto | <integer>)
├── cursor.ts      (longhand: pointer | ...)
├── overflow-x.ts  (longhand: visible | hidden | scroll | auto)
└── overflow-y.ts  (longhand: visible | hidden | scroll | auto)
```

**NO parse/layout/layout.ts** - No unified module parser

**Reality Check**:
✅ ALL are LONGHANDS → Should be PARSED individually
❌ NO "layout" shorthand exists → Module parse() makes no sense

---

## The Real Problem

### Misconception
We thought "text", "background", "layout" were **modules** that needed unified parse()/generate() APIs.

### Reality
1. **"text-decoration"** and **"background"** are CSS SHORTHANDS
   - Should be REJECTED per ADR-003 (b_value only handles longhands)
   - Different library (b_short) should handle these

2. **"layout"** is NOT a CSS property at all
   - It's just a grouping of unrelated longhand properties
   - No unified IR makes sense (top, width, display are different types)

3. **Current parse() functions are WRONG**
   - They try to guess which property from the value
   - Cannot distinguish "underline" for text-decoration-line vs "wavy" for text-decoration-style
   - Mixing concerns (property routing should not be in value parser)

---

## What These Modules Should Be

### Text Module → Text Decoration Property Parsers

**Should contain**:
```
src/parse/text/
├── line.ts       → parse text-decoration-line values
├── style.ts      → parse text-decoration-style values  
├── color.ts      → parse text-decoration-color values
├── thickness.ts  → parse text-decoration-thickness values
└── (NO text.ts)  → Remove dispatcher
```

**API**:
```typescript
// ❌ Current (wrong)
Parse.Text.parse("underline")  // Which property???

// ✅ Proposed (correct)
Parse.Text.Line.parse("underline")           // text-decoration-line
Parse.Text.Style.parse("wavy")               // text-decoration-style
Parse.Text.Color.parse("red")                // text-decoration-color
Parse.Text.Thickness.parse("2px")            // text-decoration-thickness
```

### Background Module → Background Property Parsers

**Should contain**:
```
src/parse/background/
├── image.ts       → parse background-image values
├── position.ts    → parse background-position values
├── size.ts        → parse background-size values
├── repeat.ts      → parse background-repeat values
├── origin.ts      → parse background-origin values
├── clip.ts        → parse background-clip values
├── attachment.ts  → parse background-attachment values
├── color.ts       → parse background-color values (might be in color module?)
└── (NO background.ts) → Remove dispatcher
```

**API**:
```typescript
// ❌ Current (wrong)
Parse.Background.parse("repeat-x")  // Which property???

// ✅ Proposed (correct)
Parse.Background.Size.parse("cover")
Parse.Background.Repeat.parse("repeat-x")
Parse.Background.Position.parse("center")
```

### Layout Module → Box Model Property Parsers

**Keep as is** (no unified dispatcher):
```
src/parse/layout/
├── top.ts, right.ts, bottom.ts, left.ts
├── width.ts, height.ts
├── position.ts, display.ts
├── opacity.ts, visibility.ts, z-index.ts
├── cursor.ts, overflow-x.ts, overflow-y.ts
└── (NO layout.ts) → No dispatcher needed
```

**API** (already correct):
```typescript
Parse.Layout.Top.parse("10px")
Parse.Layout.Width.parse("100%")
Parse.Layout.Display.parse("flex")
```

---

## Design Decision

### Options

**Option A: Keep Dispatchers**
- Add property discrimination (parse with property name)
- API: `Parse.Text.parse("underline", "text-decoration-line")`
- **Problem**: Violates b_value principle (value parser, not property parser)

**Option B: Remove Dispatchers**
- Remove text.ts and background.ts
- Only expose individual property parsers
- API: `Parse.Text.Line.parse("underline")`
- **Benefit**: Clear, correct, matches longhand-only principle

**Option C: Make Dispatchers Explicit**
- Keep dispatchers but rename to clarify
- API: `Parse.TextDecoration.parseProperty(value, property)`
- **Problem**: Still mixing concerns

### Recommendation: **Option B**

**Rationale**:
1. ✅ Aligns with ADR-003 (longhand-only)
2. ✅ Clear API (no ambiguity)
3. ✅ Each parser maps to ONE CSS longhand property
4. ✅ No guessing/routing logic needed
5. ✅ Consistent with other modules (Color, Filter, etc. parse ONE thing)

---

## Proposed Changes

### 1. Text Module

**Remove**:
- `src/parse/text/text.ts` (dispatcher)
- `src/parse/text/text.test.ts`

**Keep**:
- `src/parse/text/line.ts` → text-decoration-line
- `src/parse/text/style.ts` → text-decoration-style
- `src/parse/text/color.ts` → text-decoration-color
- `src/parse/text/thickness.ts` → text-decoration-thickness

**Update**: Already have ParseResult return types (may need generate())

### 2. Background Module

**Remove**:
- `src/parse/background/background.ts` (dispatcher)
- `src/parse/background/background.test.ts`

**Keep**:
- All individual property parsers
- May need to add background-image, background-position, background-color if missing

**Check**: Do these have ParseResult return types?

### 3. Layout Module

**No changes needed** - Already correct structure!

### 4. Documentation

**Update**:
- CONTINUE.md → Remove text/background/layout from "deferred"
- README → Document that individual property parsers exist
- ADR-003 → Reference text-decoration and background as shorthand examples

---

## Next Steps

1. ✅ Verify this analysis with user
2. Audit existing text/background parsers for ParseResult compliance
3. Remove dispatcher files (text.ts, background.ts)
4. Add generate() functions for each property
5. Update tests
6. Update documentation

---

**Key Insight**: These aren't "deferred modules" - they're ALREADY COMPLETE individual property parsers! We just need to remove the wrong dispatcher layer.
