# Design Proposal: Clean API for Text/Background/Layout

**Date**: 2025-10-21  
**Status**: Proposal (awaiting approval)

---

## Executive Summary

The "deferred modules" (text, background, layout) are **not deferred at all** - they're already complete! The problem is we added **wrong dispatcher layers** that:

1. Try to guess which CSS property the user wants
2. Violate ADR-003 (shorthand rejection principle)
3. Create ambiguous APIs

**Solution**: Remove the dispatcher files and expose only the individual longhand property parsers.

---

## The Core Insight

### What We Thought
- "text", "background", "layout" are modules that need unified parse()/generate() APIs
- They're "deferred" because they lack unified IR types with 'kind' discriminators

### What's Actually True
- **text-decoration** is a CSS SHORTHAND (should be rejected per ADR-003)
- **background** is a CSS SHORTHAND (should be rejected per ADR-003)  
- **layout** is NOT a CSS property (just a grouping of unrelated longhands)
- Individual property parsers ALREADY EXIST and work correctly!

### The Mistake
We added dispatcher files (`text.ts`, `background.ts`) that try to route values to the correct property parser. This is:
- Impossible (can't distinguish "underline" for text-decoration-line vs "wavy" for text-decoration-style without context)
- Wrong design (mixes property routing with value parsing)
- Violates ADR-003 (pretends to handle shorthands)

---

## Current State

### Text Module

**Files**:
```
src/parse/text/
├── text.ts          ❌ DISPATCHER (wrong)
├── text.test.ts     ❌ Tests dispatcher
├── line.ts          ✅ Parse text-decoration-line
├── style.ts         ✅ Parse text-decoration-style
├── color.ts         ✅ Parse text-decoration-color
└── thickness.ts     ✅ Parse text-decoration-thickness
```

**Problem**:
```typescript
// ❌ Ambiguous - which property?
Parse.Text.parse("underline")  // line?
Parse.Text.parse("wavy")       // style?
Parse.Text.parse("red")        // color?
Parse.Text.parse("2px")        // thickness?
```

**Reality**:
- `text-decoration` is a shorthand (like `border`, `margin`)
- Should be handled by b_short, not b_value
- Individual longhands should be parsed directly

### Background Module

**Files**:
```
src/parse/background/
├── background.ts    ❌ DISPATCHER (wrong)
├── background.test.ts ❌ Tests dispatcher
├── size.ts          ✅ Parse background-size
├── repeat.ts        ✅ Parse background-repeat
├── attachment.ts    ✅ Parse background-attachment
├── clip.ts          ✅ Parse background-clip
└── origin.ts        ✅ Parse background-origin
```

**Same problem**: Guessing which property

### Layout Module

**Files**:
```
src/parse/layout/
├── (NO layout.ts)   ✅ CORRECT - no dispatcher
├── top.ts           ✅ Parse top
├── right.ts         ✅ Parse right
├── width.ts         ✅ Parse width
├── display.ts       ✅ Parse display
└── ... (all individual properties)
```

**Status**: ✅ Already correct! No dispatcher needed.

---

## Proposed Design

### Clean API Pattern

Each module contains **only** individual property parsers, one per CSS longhand property:

```typescript
// ✅ CORRECT: Direct property parsers
Parse.Text.Line.parse("underline")              // text-decoration-line
Parse.Text.Style.parse("wavy")                  // text-decoration-style
Parse.Text.Color.parse("red")                   // text-decoration-color
Parse.Text.Thickness.parse("2px")               // text-decoration-thickness

Parse.Background.Size.parse("cover")            // background-size
Parse.Background.Repeat.parse("repeat-x")       // background-repeat
Parse.Background.Position.parse("center")       // background-position

Parse.Layout.Top.parse("10px")                  // top
Parse.Layout.Width.parse("100%")                // width
Parse.Layout.Display.parse("flex")              // display
```

### Module Organization

```
Module = Collection of Related Property Parsers

Text Module:
  - Line       → text-decoration-line
  - Style      → text-decoration-style
  - Color      → text-decoration-color
  - Thickness  → text-decoration-thickness

Background Module:
  - Size       → background-size
  - Repeat     → background-repeat
  - Position   → background-position
  - Image      → background-image
  - Clip       → background-clip
  - Origin     → background-origin
  - Attachment → background-attachment

Layout Module:
  - Top, Right, Bottom, Left
  - Width, Height
  - Position, Display
  - Opacity, Visibility, ZIndex
  - Cursor, OverflowX, OverflowY
```

### Why This Works

1. **Clear Mapping**: Each parser = ONE CSS longhand property
2. **No Ambiguity**: Property name is explicit in API
3. **ADR-003 Compliant**: Only handles longhands, rejects shorthands
4. **Consistent**: Same pattern as Color, Filter, Gradient modules
5. **Simple**: No routing logic, no guessing

---

## Implementation Plan

### Phase 1: Audit Existing Parsers

Check each property parser for Phase 0.5 compliance:

**Text Module**:
- [ ] `line.ts` - Has ParseResult? Has generate()?
- [ ] `style.ts` - Has ParseResult? Has generate()?
- [ ] `color.ts` - Has ParseResult? Has generate()?
- [ ] `thickness.ts` - Has ParseResult? Has generate()?

**Background Module**:
- [ ] `size.ts` - Has ParseResult? Has generate()?
- [ ] `repeat.ts` - Has ParseResult? Has generate()?
- [ ] `attachment.ts` - Has ParseResult? Has generate()?
- [ ] `clip.ts` - Has ParseResult? Has generate()?
- [ ] `origin.ts` - Has ParseResult? Has generate()?

**Layout Module**:
- [ ] All property parsers - Has ParseResult? Has generate()?

### Phase 2: Remove Dispatchers

**Delete Files**:
- `src/parse/text/text.ts`
- `src/parse/text/text.test.ts`
- `src/parse/background/background.ts`
- `src/parse/background/background.test.ts`

**Update Exports**:
- Remove dispatcher exports from `index.ts` files
- Keep individual property parser exports

### Phase 3: Upgrade to Phase 0.5 API

For each property parser that doesn't have Phase 0.5 compliance:

**Parse Side**:
```typescript
// Before (old Result<T, string>)
export function parse(css: string): Result<Type, string> {
  // ...
}

// After (new ParseResult<T>)
export function parse(css: string): ParseResult<Type> {
  // Use parseOk/parseErr helpers
}
```

**Generate Side**:
```typescript
// Add if missing
export function generate(value: Type): GenerateResult {
  // Use generateOk/generateErr helpers
}
```

### Phase 4: Add Tests

For each property parser:
- Test parse() with ParseResult
- Test generate() with GenerateResult
- Test error cases with helpful suggestions

### Phase 5: Documentation

**Update**:
- CONTINUE.md - Remove text/background/layout from "deferred"
- README.md - Document property parser organization
- ADR-003 - Add text-decoration/background as shorthand examples

---

## Benefits

### 1. Correct Architecture
- Aligns with ADR-003 (longhand-only)
- No shorthand handling confusion
- Clear separation of concerns

### 2. Better API
```typescript
// ❌ Before: Ambiguous
Parse.Text.parse("underline")  // Which property???

// ✅ After: Crystal clear
Parse.Text.Line.parse("underline")  // text-decoration-line!
```

### 3. Consistency
- Matches other modules (Color, Filter, Gradient)
- One parser = One CSS property
- Predictable patterns

### 4. Simplicity
- No routing logic
- No guessing games
- Each parser does ONE thing well

### 5. Completeness
- Text module: 4 property parsers ✅
- Background module: 5-8 property parsers ✅
- Layout module: 13+ property parsers ✅
- All already implemented!

---

## Migration Guide

### For Users

**Before (v0.5)**:
```typescript
// ❌ Ambiguous API
Parse.Text.parse("underline")
```

**After (v0.6)**:
```typescript
// ✅ Clear API
Parse.Text.Line.parse("underline")
Parse.Text.Style.parse("wavy")
```

**Breaking Change**: Yes, but the old API was wrong/ambiguous

### For Internal Code

**Impact**: Minimal
- Dispatcher files are barely used internally
- Individual parsers already work correctly
- Just need ParseResult/GenerateResult upgrades

---

## Comparison: Before vs After

### Text Module

**Before**:
```typescript
// ❌ Wrong
Parse.Text.parse("underline")  // Returns: ParseResult<unknown>
```

**After**:
```typescript
// ✅ Correct
Parse.Text.Line.parse("underline")
// Returns: ParseResult<TextDecorationLineKeyword>

Parse.Text.Style.parse("wavy")
// Returns: ParseResult<TextDecorationStyleKeyword>

Parse.Text.Color.parse("red")
// Returns: ParseResult<Color>

Parse.Text.Thickness.parse("2px")
// Returns: ParseResult<LengthPercentage | TextDecorationThicknessKeyword>
```

### Background Module

**Before**:
```typescript
// ❌ Wrong
Parse.Background.parse("cover")  // Returns: ParseResult<unknown>
```

**After**:
```typescript
// ✅ Correct
Parse.Background.Size.parse("cover")
// Returns: ParseResult<BackgroundSize>

Parse.Background.Repeat.parse("repeat-x")
// Returns: ParseResult<BackgroundRepeat>
```

### Layout Module

**Already Correct**:
```typescript
// ✅ No changes needed
Parse.Layout.Top.parse("10px")
Parse.Layout.Width.parse("100%")
Parse.Layout.Display.parse("flex")
```

---

## Decision Points

### 1. Remove Dispatchers?

**Options**:
- A) Remove text.ts and background.ts ✅ **RECOMMENDED**
- B) Keep but deprecate
- C) Keep and add property parameter

**Decision**: **Option A** - Clean break, correct design

### 2. Module Naming?

**Options**:
- A) Keep "Text" module (maps to text-decoration-* properties) ✅
- B) Rename to "TextDecoration" (more explicit)
- C) Split into separate modules

**Decision**: **Option A** - "Text" is fine, module is clear from subparsers

### 3. Missing Parsers?

**Background module may need**:
- background-image (likely just reuse gradient parser?)
- background-position (likely already exists in position module?)
- background-color (use color module?)

**Action**: Audit what's missing, add if needed

---

## Success Criteria

### Definition of Done

1. ✅ All text property parsers return ParseResult<T>
2. ✅ All background property parsers return ParseResult<T>
3. ✅ All layout property parsers return ParseResult<T>
4. ✅ All have generate() returning GenerateResult
5. ✅ Dispatcher files removed
6. ✅ Tests updated
7. ✅ Documentation updated
8. ✅ All 2568+ tests passing

### Quality Gates

```bash
just check  # ✅ Must pass
just test   # ✅ Must pass (all 2568+ tests)
```

---

## Timeline Estimate

- **Phase 1** (Audit): 30 min
- **Phase 2** (Remove dispatchers): 10 min
- **Phase 3** (Upgrade parsers): 1-2 hours
- **Phase 4** (Tests): 1 hour
- **Phase 5** (Docs): 30 min

**Total**: ~3-4 hours

---

## Risks & Mitigation

### Risk 1: Breaking Changes
**Impact**: Users using Parse.Text.parse() will break  
**Mitigation**: This API was always wrong/ambiguous, clean break is justified

### Risk 2: Missing Parsers
**Impact**: Some background properties might not exist yet  
**Mitigation**: Audit first, implement missing ones

### Risk 3: Time Estimate
**Impact**: Might take longer than estimated  
**Mitigation**: Can pause after each phase, verify before proceeding

---

## Conclusion

**Recommendation**: **APPROVE and implement**

**Rationale**:
1. Current design is wrong (violates ADR-003)
2. Individual parsers already exist and work
3. Only need to remove wrong dispatcher layer
4. API becomes clear and unambiguous
5. Aligns with project principles

**Next Step**: Get user approval, then proceed with Phase 1 audit.

---

**Status**: ⏸️ Awaiting user feedback
