# Next Session: Phase 2B - Visual Module (2 Simple Properties)

**Date**: 2025-10-28  
**Status**: Phase 2A Complete (Transition 80%), Ready for Phase 2B  
**Tests**: 3,905 passing  
**Branch**: coverage/90-percent  
**Goal**: Complete Phase 2 with Visual module

---

## 🎯 Immediate Goal: Visual Module (20-30 minutes)

### Properties to Implement (2)
1. **opacity** - Number 0-1 or percentage
2. **visibility** - Enum (visible, hidden, collapse)

### Why These Next?
- ✅ Quick win (2 simple properties)
- ✅ Validates enum property handling
- ✅ Stays on track with DUAL_TEST_EXPANSION_PLAN.md
- ✅ Completes Phase 2 (transition + visual)

---

## 🚀 Quick Start Commands

```bash
cd /Users/alphab/Dev/LLM/DEV/b_value

# 1. Check existing implementations
ls -la src/parse/visual/ src/generate/visual/

# 2. Create opacity config (if needed)
# - Accepts: 0, 1, 0.5, 50%, inherit
# - Range: 0-1 for numbers, 0-100 for percentages

# 3. Create visibility config
# - Enum: visible, hidden, collapse
# - Case-insensitive parsing

# 4. Generate tests
pnpm tsx scripts/generate-parse-tests.ts visual/opacity
pnpm tsx scripts/generate-generate-tests.ts visual/opacity
pnpm tsx scripts/generate-parse-tests.ts visual/visibility
pnpm tsx scripts/generate-generate-tests.ts visual/visibility

# 5. Verify
just test
just check
```

---

## 📊 Session Progress

### Completed This Session
- ✅ Phase 2A: Transition module (4/5 properties - 80%)
- ✅ transition-property implemented with dual tests
- ✅ No-op test template infrastructure created
- ✅ Border design philosophy documented
- ✅ Shorthand scope clarified in AGENTS.md
- ✅ All 3,905 tests passing

### Phase 2 Status
```
Phase 2A: Transition ✅ (4/5 - functionally complete)
Phase 2B: Visual ⏳ (0/2 - NEXT)
```

---

## 📋 Dual Test Expansion Progress

```
Phase 1: Animation     8/8   (100%) ✅
Phase 2A: Transition   4/5   (80%)  ✅
Phase 2B: Visual       0/2   (0%)   ⏳ ← YOU ARE HERE
Phase 3: Enums         0/~13 (0%)
Phase 4: Border        DEFERRED (see BORDER_DESIGN_PHILOSOPHY.md)
Phase 5: Complex       0/~28 (0%)
-----------------------------------
TOTAL:                 12/94 (12.8%)
```

**After Visual Module**: 14/94 (14.9%) - Phase 2 complete!

---

## 💡 Key Context for Next Agent

### 1. No-Op Test Template (New Infrastructure)
When properties have no parse failures (accept any identifier):
- Template auto-applied by parse test generator
- Located: `scripts/parse-test-generator/templates/no-op-failure.template.ts`
- Example: transition-property (accepts any CSS property name)

### 2. Border Module is Deferred
- **NOT out of scope** - it's a convenience API (not CSS shorthand)
- Pragmatic design: Apply same value to multiple longhands
- Deferred until multi-declaration parser design complete
- **Reference**: `.memory/BORDER_DESIGN_PHILOSOPHY.md`

### 3. Shorthand Scope is Clear
- b_value = **longhand properties only**
- b_short = shorthand expansion (separate project)
- **Reference**: AGENTS.md (new section at bottom)

### 4. Multi-Value Properties Work Great
- Comma-separated properties are fully validated
- Zod schemas use `.min(1)` for arrays
- Parse utility `parseCommaSeparatedSingle()` handles edge cases
- No special handling needed

---

## 🔍 Visual Module Implementation Notes

### opacity
**Type**: Number (0-1) or Percentage (0-100%)

**Examples**:
```css
opacity: 0;       /* fully transparent */
opacity: 0.5;     /* 50% transparent */
opacity: 1;       /* fully opaque */
opacity: 50%;     /* 50% transparent */
opacity: inherit; /* inherit from parent */
```

**Parse Strategy**:
- Number → validate 0-1 range
- Percentage → validate 0-100% range, normalize to 0-1
- Keywords → inherit, initial, unset

**Generate Strategy**:
- IR stores normalized 0-1 value
- Generate as number (not percentage) for simplicity
- Or preserve original format (percentage vs number)

### visibility
**Type**: Enum keyword

**Values**:
- `visible` - element is visible
- `hidden` - element is invisible but takes up space
- `collapse` - for table rows/columns (same as hidden elsewhere)

**Parse Strategy**:
- Lowercase keyword matching
- No complex logic needed

**Generate Strategy**:
- Output keyword as-is from IR

---

## 📁 Files to Reference

**Essential**:
- `.memory/DUAL_TEST_EXPANSION_PLAN.md` - Full roadmap
- `AGENTS.md` - Auto-execute protocol + scope

**Context**:
- `.memory/BORDER_DESIGN_PHILOSOPHY.md` - Why border is deferred
- `.memory/BORDER_AUDIT.md` - Technical analysis of border

**Templates**:
- `scripts/parse-test-generator/templates/no-op-failure.template.ts`

---

## ✅ Ready State Verification

```bash
# All should pass
just test    # 3,905 tests passing
just check   # Format, lint, typecheck
git status   # Clean working directory
```

---

## 🎯 Success Criteria for Visual Module

- [ ] opacity parser implemented
- [ ] opacity generator with Zod validation
- [ ] opacity parse + generate test configs created
- [ ] visibility parser implemented
- [ ] visibility generator with Zod validation  
- [ ] visibility parse + generate test configs created
- [ ] All tests generated and passing
- [ ] Roundtrip validation works for both
- [ ] ~20 new tests added (estimate)

**After completion**: Update this file with Phase 3 details!

---

## 🚀 Alternative: Jump to Phase 3 Enums

If you want to batch enum properties instead:
- Phase 3 focuses on ~13 enum-heavy properties
- cursor, pointer-events, display, position, overflow
- justify-content, align-items, flex-direction, etc.
- Estimate: 1-2 hours for all enums at once

**Recommendation**: Stick with Phase 2B (visual) for clean progression.

---

**Status**: ✅ Ready for next agent - all tests passing, clean state, clear direction!
