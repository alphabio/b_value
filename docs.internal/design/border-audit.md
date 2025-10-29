# Border Module Audit

**Date**: 2025-10-28
**Auditor**: AI Agent
**Scope**: Parse and Generate implementations

---

## 📊 Current Implementation Status

### Files Found

```
src/parse/border/
├── border.ts          ← Fallthrough parser (tries width/style/radius/color)
├── color.ts           ← border-color (single color value)
├── radius.ts          ← border-radius (single radius value) ⚠️
├── style.ts           ← border-style (single style keyword)
├── width.ts           ← border-width (single width value)
└── index.ts           ← Exports

src/generate/border/
├── border.ts          ← (need to check)
├── color.ts
├── radius.ts          ← (need to check)
├── style.ts
├── width.ts
└── index.ts
```

---

## 🚨 Issue #1: border-radius is a SHORTHAND

**Problem**: `border-radius` is implemented as if it's a longhand property.

**CSS Spec**:

```css
/* border-radius is a SHORTHAND for 4 properties: */
border-top-left-radius: 10px;
border-top-right-radius: 10px;
border-bottom-right-radius: 10px;
border-bottom-left-radius: 10px;

/* Shorthand (NOT supported in b_value): */
border-radius: 10px;              /* all 4 corners */
border-radius: 10px 20px;         /* top-left/bottom-right, top-right/bottom-left */
border-radius: 10px 20px 30px;    /* tl, tr/bl, br */
border-radius: 10px 20px 30px 40px; /* tl, tr, br, bl */
```

**Actual Longhand Properties** (should be implemented):
- `border-top-left-radius`
- `border-top-right-radius`
- `border-bottom-right-radius`
- `border-bottom-left-radius`

**Current Implementation**: Treats `border-radius` as a longhand accepting a single value.

**Action Required**:
1. ❌ Remove `src/parse/border/radius.ts` (shorthand, out of scope)
2. ❌ Remove `src/generate/border/radius.ts`
3. ✅ Create 4 individual corner parsers/generators
4. ✅ Update type definitions to reflect individual corners

---

## 🚨 Issue #2: Missing Individual Side Properties

### Border Width
**Implemented**: `border-width` (single value)
**Missing**:
- `border-top-width`
- `border-right-width`
- `border-bottom-width`
- `border-left-width`

### Border Style
**Implemented**: `border-style` (single value)
**Missing**:
- `border-top-style`
- `border-right-style`
- `border-bottom-style`
- `border-left-style`

### Border Color
**Implemented**: `border-color` (single value)
**Missing**:
- `border-top-color`
- `border-right-color`
- `border-bottom-color`
- `border-left-color`

---

## 🤔 Analysis: Are These Shorthands Too?

Let me check the CSS spec for these properties...

### border-width
**CSS Spec**: SHORTHAND for 4 properties

```css
/* Longhand properties: */
border-top-width: 1px;
border-right-width: 2px;
border-bottom-width: 3px;
border-left-width: 4px;

/* Shorthand (NOT in b_value): */
border-width: 1px;              /* all 4 sides */
border-width: 1px 2px;          /* top/bottom, right/left */
border-width: 1px 2px 3px;      /* top, right/left, bottom */
border-width: 1px 2px 3px 4px;  /* top, right, bottom, left */
```

### border-style
**CSS Spec**: SHORTHAND for 4 properties

```css
/* Longhand properties: */
border-top-style: solid;
border-right-style: dashed;
border-bottom-style: dotted;
border-left-style: solid;

/* Shorthand (NOT in b_value): */
border-style: solid;
border-style: solid dashed;
```

### border-color
**CSS Spec**: SHORTHAND for 4 properties

```css
/* Longhand properties: */
border-top-color: red;
border-right-color: blue;
border-bottom-color: green;
border-left-color: yellow;

/* Shorthand (NOT in b_value): */
border-color: red;
border-color: red blue;
```

---

## ✅ Verdict: ALL Current Border Properties are Shorthands

**Conclusion**: The entire `border` module as currently implemented consists of SHORTHAND properties that should be in `b_short`, not `b_value`.

---

## 📋 What Should Actually Be in b_value

### Individual Side Properties (12 properties)

**Width** (4):
- border-top-width
- border-right-width
- border-bottom-width
- border-left-width

**Style** (4):
- border-top-style
- border-right-style
- border-bottom-style
- border-left-style

**Color** (4):
- border-top-color
- border-right-color
- border-bottom-color
- border-left-color

### Individual Corner Radius Properties (4 properties)

- border-top-left-radius
- border-top-right-radius
- border-bottom-right-radius
- border-bottom-left-radius

### Other Border Properties

- border-collapse (table-specific, enum: collapse | separate)
- border-spacing (table-specific)
- border-image-* properties (if implemented)

**Total Longhand Properties**: 16+ properties

---

## 🎯 Recommended Actions

### Immediate Actions

1. **Document the scope issue** in ROADMAP.md and STATUS.md
2. **Mark current border/* as SHORTHAND** (deprecate or move to b_short)
3. **Do NOT create dual tests** for current border properties
4. **Skip border module in Phase 4** of DUAL_TEST_EXPANSION_PLAN

### Future Work (Separate Initiative)

When ready to properly implement border longhands:

1. Create 12 individual side property parsers/generators:
   - `border-{top|right|bottom|left}-{width|style|color}.ts`

2. Create 4 individual corner radius parsers/generators:
   - `border-{top|bottom}-{left|right}-radius.ts`

3. Each property is simple (single value):
   - `border-top-width: 1px` → `{ kind: "border-top-width", width: { value: 1, unit: "px" } }`
   - `border-top-color: red` → `{ kind: "border-top-color", color: "red" }`
   - etc.

4. Update type definitions to reflect individual properties

---

## 📊 Impact on DUAL_TEST_EXPANSION_PLAN

**Current Plan Says**:
> Phase 4: Border (17 properties)

**Reality**:
- Current 5 properties (width, style, color, radius, border) are all SHORTHANDS
- Should NOT be in b_value
- Should NOT create dual tests for them
- Needs 16 individual longhand properties instead

**Updated Plan**:
- Skip current border implementation
- Add note: "Border module needs refactor to longhand properties"
- Estimate for proper implementation: ~2-3 hours for all 16 properties

---

## 🔍 How to Verify Other Modules

**Red Flags** that indicate shorthand:
1. Property name without side/corner qualifier (e.g., `margin` vs `margin-top`)
2. Documentation mentions "space-separated values" or "1-4 values"
3. Parser handles multiple values with different meanings based on count
4. MDN docs say "shorthand property"

**To verify a property is longhand**:
1. Check MDN "Formal definition" section → "Formal syntax"
2. Longhand = accepts only ONE value type
3. Shorthand = accepts multiple values OR is listed as "shorthand for: ..."

---

## 🔄 UPDATE: Not Shorthands, Convenience APIs

**Date**: 2025-10-28 (after discussion)

### Clarification

The initial audit **incorrectly** classified border properties as "CSS shorthands out of scope."

**Reality**: They are **convenience APIs** for ergonomics, not CSS shorthands.

### Key Differences

**CSS Shorthand** (belongs in b_short):

```css
border-width: 1px 2px 3px 4px;  /* 4 DIFFERENT values */
border-radius: 10px 20px;        /* 2 values with special semantics */
```

**Convenience API** (belongs in b_value):

```typescript
Border.Width.parse("2px")  // SAME value to all 4 sides
Border.Radius.parse("8px") // SAME value to all 4 corners
```

### Why This Matters

1. **Client ergonomics**: Avoid 16 separate calls to update border uniformly
2. **Not spec violation**: Still generates proper longhand IR internally
3. **Pragmatic design**: 90% of use cases want uniform values
4. **Fine-tuning available**: Individual side APIs when needed

### Correct Assessment

- ✅ Current implementation is **IN SCOPE** for b_value
- ✅ Convenience APIs are **valuable and needed**
- ⚠️ Current implementation treats convenience as single property (simplification)
- 🎯 Future: Properly implement as convenience layer over 16 longhands

### Recommendation Updated

1. **Don't remove** current border implementation (it's useful)
2. **Don't create dual tests yet** (design needs refinement)
3. **Defer to later phase** (after multi-declaration parser design)
4. **Reference** BORDER_DESIGN_PHILOSOPHY.md for full context

---

**See**: `.memory/BORDER_DESIGN_PHILOSOPHY.md` for complete design rationale.
