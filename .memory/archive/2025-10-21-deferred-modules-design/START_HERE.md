# START HERE - Deferred Modules Design Session

**Session**: Design Analysis for Text/Background/Layout  
**Date**: 2025-10-21  
**Status**: ⏸️ Awaiting User Approval

---

## 📋 Quick Summary

**The "Deferred Modules" Aren't Deferred - They're Already Complete!**

The problem: We added **wrong dispatcher layers** that try to guess which CSS property the user wants.

The solution: **Remove the dispatchers**, expose only individual longhand property parsers.

---

## 🔍 Key Insight

### What We Discovered

1. **text-decoration** = CSS SHORTHAND → Should be REJECTED (ADR-003)
2. **background** = CSS SHORTHAND → Should be REJECTED (ADR-003)
3. **layout** = NOT a CSS property → Just a grouping

### What Already Exists

✅ Individual property parsers for:
- text-decoration-line, text-decoration-style, text-decoration-color, text-decoration-thickness
- background-size, background-repeat, background-clip, background-origin, background-attachment
- top, right, bottom, left, width, height, display, position, opacity, etc.

### The Mistake

We added `text.ts` and `background.ts` dispatcher files that try to route values:

```typescript
// ❌ This is WRONG - can't tell which property!
Parse.Text.parse("underline")  // line? style? color?
```

Should be:

```typescript
// ✅ This is CORRECT - explicit property
Parse.Text.Line.parse("underline")  // text-decoration-line!
```

---

## 📁 Documents to Read

1. **ANALYSIS.md** - Deep dive into current state (read first)
2. **DESIGN_PROPOSAL.md** - Complete implementation plan (read second)
3. This file - Quick reference

---

## 🎯 Proposed Changes

### Remove Dispatchers

**Delete**:
- `src/parse/text/text.ts`
- `src/parse/text/text.test.ts`
- `src/parse/background/background.ts`
- `src/parse/background/background.test.ts`

### Keep Individual Parsers

**Text module** (4 parsers):
- Line.parse() → text-decoration-line
- Style.parse() → text-decoration-style
- Color.parse() → text-decoration-color
- Thickness.parse() → text-decoration-thickness

**Background module** (5-8 parsers):
- Size.parse() → background-size
- Repeat.parse() → background-repeat
- Clip.parse() → background-clip
- Origin.parse() → background-origin
- Attachment.parse() → background-attachment
- (Maybe more if missing)

**Layout module** (13+ parsers):
- Already correct! No changes needed.

### Upgrade to Phase 0.5

For each property parser:
1. Ensure parse() returns ParseResult<T>
2. Add generate() returning GenerateResult
3. Add tests

---

## 💡 API Comparison

### Before (Wrong)
```typescript
// ❌ Ambiguous - which property?
Parse.Text.parse("underline")
Parse.Background.parse("cover")
```

### After (Correct)
```typescript
// ✅ Crystal clear
Parse.Text.Line.parse("underline")           // text-decoration-line
Parse.Text.Style.parse("wavy")               // text-decoration-style
Parse.Background.Size.parse("cover")         // background-size
Parse.Background.Repeat.parse("repeat-x")    // background-repeat
```

---

## ✅ Benefits

1. **Correct Design** - Aligns with ADR-003 (longhand-only)
2. **Clear API** - No ambiguity about which property
3. **Consistent** - Matches Color, Filter, Gradient modules
4. **Simple** - No routing logic needed
5. **Complete** - All parsers already exist!

---

## 🚀 Implementation Phases

1. **Phase 1**: Audit existing parsers (30 min)
2. **Phase 2**: Remove dispatchers (10 min)
3. **Phase 3**: Upgrade to Phase 0.5 API (1-2 hours)
4. **Phase 4**: Add tests (1 hour)
5. **Phase 5**: Update docs (30 min)

**Total**: ~3-4 hours

---

## ⏸️ Next Step

**Awaiting user approval** to proceed with implementation.

**Questions to resolve**:
1. Approve removal of text.ts and background.ts?
2. Approve the clean API design?
3. Any concerns about breaking changes?

---

## 📖 Quick Commands

```bash
# Read analysis
cat .memory/archive/2025-10-21-deferred-modules-design/ANALYSIS.md

# Read full proposal
cat .memory/archive/2025-10-21-deferred-modules-design/DESIGN_PROPOSAL.md

# Check current structure
ls -la src/parse/text/
ls -la src/parse/background/
ls -la src/parse/layout/
```

---

**Status**: Design complete, awaiting user decision to implement.
