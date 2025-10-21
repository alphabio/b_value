<!-- LAST UPDATED: 2025-10-21T03:34:00 -->

# Continue From Here

**Last Session**: 2025-10-21 Phase 0.5 Design Complete (APPROVED ⭐)  
**Status**: 🎨 **AUTHORITATIVE DESIGN** - Parse + Generate Symmetry  
**Tests**: 2406 passing (baseline green ✅)  
**Next**: 🚀 **Phase 0.5a - Create ParseResult + GenerateResult Types**

**👉 READ**: `.memory/archive/2025-10-21-phase0.5-v2/MASTER_PLAN.md` ← AUTHORITATIVE

---

## ⭐ APPROVED DESIGN - COMPLETE SYMMETRY

**User decision**: "LOVE THIS: universal return type" + "Need same API for generate"

**What we're building**:

```typescript
// Parse side - ParseResult<T>
const {ok, value, property, issues} = Parse.Color.parse("#ff0000")
const {ok, value, property, issues} = Parse.Animation.parse("100ms")

// Generate side - GenerateResult (MATCHING!)
const {ok, value, property, issues} = Generate.Color.generate(colorIR)
const {ok, value, property, issues} = Generate.Animation.generate(animIR)

// Round-trip (perfect symmetry)
const parsed = Parse.Color.parse("#ff0000");
if (parsed.ok) {
  const generated = Generate.Color.generate(parsed.value);
  // ✨ Same API structure!
}
```

**Architecture**:
- **Internal**: `Result<T, E>` (simple, fast) - for implementation
- **Public**: `ParseResult<T>` + `GenerateResult` - client-facing API
- **Perfect symmetry**: Same result structure for both directions

---

## 🎯 The Types

### ParseResult (for CSS → IR)

```typescript
export type ParseResult<T = unknown> = {
  ok: boolean           // Success flag
  value?: T             // IR object
  property?: string     // Property name (when available)
  issues: Issue[]       // Always present
}
```

### GenerateResult (for IR → CSS)

```typescript
export type GenerateResult = {
  ok: boolean           // Success flag
  value?: string        // CSS string
  property?: string     // Property name (when available)
  issues: Issue[]       // Always present
}
```

### Shared Issue Type

```typescript
export type Issue = {
  severity: 'error' | 'warning' | 'info'
  message: string
  suggestion?: string   // How to fix
  action?: string       // Code snippet
  location?: {
    offset: number
    length: number
  }
}
```

---

## 📋 Implementation Plan

### Phase 0.5a: Create Both Types (1.5 hours) ← START HERE

1. Add ParseResult + GenerateResult to `src/core/result.ts`
2. Add Issue type
3. Add helper functions:
   - parseOk(), parseErr(), toParseResult()
   - generateOk(), generateErr()
   - addIssue(), withWarning(), combineResults()
4. Export from `src/index.ts`
5. Run `just check && just test` (must pass)
6. Commit: `feat(core): add ParseResult and GenerateResult types for universal API`

### Phase 0.5b: Create 7 Parse Modules (3-4 hours)

1. Shadow (2 parsers) - 20 min
2. Outline (3 parsers) - 20 min
3. Transition (4 parsers) - 25 min
4. Animation (8 parsers) - 35 min
5. Text (7 parsers) - 30 min
6. Background (5 parsers) - 30 min
7. Border (4 parsers) - 30 min

### Phase 0.5c: Update 4 Existing Parsers (2 hours)

1. Color (12 formats) - 30 min
2. ClipPath (10 shapes) - 30 min
3. Filter (11 functions) - 30 min
4. Gradient (6 types) - 30 min

### Phase 0.5d: Create 14 Generate Modules (3-4 hours) ← NEW!

Add unified `generate()` to all 14 modules:
1. Color, ClipPath, Filter, Gradient
2. Animation, Transition, Shadow, Outline
3. Text, Background, Border, Layout
4. Position, Transform

**Total**: 10-12 hours, 110-160 new tests

---

## 🚀 Quick Start (Phase 0.5a)

```bash
# 1. Open result.ts
code src/core/result.ts

# 2. Add ParseResult + GenerateResult types
# (See MASTER_PLAN.md Phase 0.5a section for exact code)

# 3. Add helper functions
# parseOk(), parseErr(), generateOk(), generateErr(), etc.

# 4. Export from public API
code src/index.ts
# Add exports for both ParseResult and GenerateResult

# 5. Verify baseline
just check && just test

# 6. Commit
git add -A
git commit -m "feat(core): add ParseResult and GenerateResult types for universal API"
```

---

## 📊 Example Usage

**Parse side**:
```typescript
const result = Parse.Color.parse("#ff0000");
// {
//   ok: true,
//   value: { kind: "hex", r: 255, g: 0, b: 0, a: 1 },
//   property: undefined,
//   issues: []
// }
```

**Generate side**:
```typescript
const result = Generate.Color.generate(colorIR);
// {
//   ok: true,
//   value: "#ff0000",
//   property: undefined,
//   issues: []
// }
```

**Round-trip**:
```typescript
const parsed = Parse.Color.parse("#ff0000");
if (parsed.ok) {
  const generated = Generate.Color.generate(parsed.value);
  if (generated.ok) {
    console.log(generated.value);  // "#ff0000" ✨
  }
}
```

---

## ✅ Benefits of Complete Symmetry

1. **Consistent API** - Same structure for both directions
2. **Type safety** - ParseResult<T> for IR, GenerateResult for strings
3. **Rich errors** - Suggestions on both sides
4. **Validation** - Generate can validate IR structure
5. **Warnings** - Non-blocking issues (deprecated syntax, etc.)
6. **Property tracking** - Know what property it's for
7. **Round-trip testing** - Easy to test parse → generate → parse
8. **Future-proof** - Foundation for LSP/diagnostics

---

## 📚 Documentation

**AUTHORITATIVE**: 
- `MASTER_PLAN.md` - Parse implementation (complete)
- `GENERATE_API_DESIGN.md` - Generate design (NEW!)

**Supporting**:
- `START_HERE.md` - Quick reference
- `UNIVERSAL_TYPE_DECISION.md` - Design rationale
- `API_DESIGN_CLARIFICATION.md` - Architecture
- `POST_MORTEM.md` - Previous session lessons

**Session**: `.memory/archive/2025-10-21-phase0.5-v2/`

---

## 🔧 Quick Reference

### Essential Commands
```bash
just check                 # Format + typecheck + lint
just test                  # All tests (2406 passing)
pnpm test -- animation     # Test specific module
```

### Baseline Status
- ✅ Tests: 2406 passing
- ✅ TypeScript: 0 errors
- ✅ Lint: Clean
- ✅ Commit: f89d02b (design docs)

---

## ⚠️ LONGHAND PROPERTIES ONLY

**b_value ONLY handles LONGHAND property values.**

❌ `border: 1px solid red` (shorthand)  
✅ `border-width: 1px` (longhand)  
✅ `border-color: red` (longhand)

**Shorthand expansion** = Different library (**b_short**)

---

## 📊 Updated Timeline

| Phase | Task | Duration | Tests |
|-------|------|----------|-------|
| 0.5a | Create both types | 1.5h | 0 |
| 0.5b | 7 parse modules | 3-4h | 50-70 |
| 0.5c | 4 existing parsers | 2h | 10-20 |
| 0.5d | 14 generate modules | 3-4h | 50-70 |
| **Total** | **Phase 0.5 Complete** | **10-12h** | **110-160** |

**Final stats**:
- Tests: 2406 → 2520-2570
- Modules: 28 unified (14 parse + 14 generate)
- Public API: ParseResult + GenerateResult

---

**Next Agent**: Start Phase 0.5a - Create both types together! 🚀

Perfect symmetry between parse and generate! ✨

Follow MASTER_PLAN.md and GENERATE_API_DESIGN.md. Both are authoritative. ⭐
