# START HERE: Phase 0.5 - Universal ParseResult API

**Created**: 2025-10-21T03:22:00  
**Status**: ⭐ **AUTHORITATIVE - DESIGN APPROVED**  
**Timeline**: 6-7 hours over 3 sub-phases

---

## 🎯 What We're Building

**Universal public API type for all parse functions**:

```typescript
// ALL parsers return this type
const {ok, value, property, issues} = Parse.Color.parse("#ff0000")
const {ok, value, property, issues} = Parse.Animation.parse("100ms")
const {ok, value, property, issues} = parse("color: #ff0000")  // Future
```

**Why**: Single consistent API with rich error information, suggestions, and warnings.

---

## ⭐ The Approved Design

**Two-layer architecture**:

┌─────────────────────────────────────────────────────────────────┐
│                     PUBLIC API (ParseResult)                    │
│  What clients see: ok, value, property, issues                 │
│  Rich errors with suggestions and warnings                      │
└─────────────────────────────────────────────────────────────────┘
                               ▲
                               │ Convert at boundary
                               │
┌─────────────────────────────▼───────────────────────────────────┐
│                INTERNAL (Result<T, E>)                          │
│  What parsers use: ok, value, error                             │
│  Simple, fast, proven                                           │
└─────────────────────────────────────────────────────────────────┘

**Benefits**:
- ✅ Keep internal implementation simple
- ✅ Rich public API for clients
- ✅ Single source of truth
- ✅ No breaking changes

---

## 📋 The Type

```typescript
export type ParseResult<T = unknown> = {
  ok: boolean           // Success flag
  value?: T             // Parsed value (when ok=true)
  property?: string     // Property name (from declarations)
  issues: Issue[]       // Always present, empty if no issues
}

export type Issue = {
  severity: 'error' | 'warning' | 'info'
  message: string
  suggestion?: string   // "Expected hex (#fff) or rgb()"
  action?: string       // Code snippet to fix
  location?: {
    offset: number
    length: number
  }
}
```

---

## 🚀 Implementation Phases

### Phase 0.5a: Create ParseResult Type (1 hour) ← START HERE

**What**: Add new type system to `src/core/result.ts`

**Steps**:
1. Add `ParseResult<T>` type
2. Add `Issue` type
3. Add `parseOk()`, `parseErr()`, `toParseResult()` helpers
4. Add utility functions
5. Export from `src/index.ts`
6. Verify: `just check && just test` (must pass)
7. Commit: `feat(core): add ParseResult type for universal public API`

**Duration**: 1 hour  
**Tests**: 0 new (no breaking change)

---

### Phase 0.5b: Create 7 Module Parsers (3-4 hours)

**What**: Add unified `parse()` to modules lacking it

**Modules** (in order):
1. Shadow (2 parsers) - 20 min
2. Outline (3 parsers) - 20 min
3. Transition (4 parsers) - 25 min
4. Animation (8 parsers) - 35 min
5. Text (7 parsers) - 30 min
6. Background (5 parsers) - 30 min
7. Border (4 parsers) - 30 min

**Pattern**:
```typescript
export function parse(value: string): ParseResult<Type.Shadow.Kinds> {
  const boxResult = BoxShadow.parse(value);  // Internal Result<T, E>
  if (boxResult.ok) {
    return parseOk(boxResult.value);  // Convert to ParseResult
  }
  
  const textResult = TextShadow.parse(value);
  if (textResult.ok) {
    return parseOk(textResult.value);
  }
  
  return parseErr("No shadow format matched", {
    suggestion: "Expected shadow syntax: <offset-x> <offset-y> ..."
  });
}
```

**Per module**: Create → Test → Export → Check → Commit

**Duration**: 3-4 hours  
**Tests**: 50-70 new

---

### Phase 0.5c: Update 4 Existing Modules (2 hours)

**What**: Upgrade existing modules for consistency

**Modules**:
1. Color (12 formats) - 30 min
2. ClipPath (10 shapes) - 30 min
3. Filter (11 functions) - 30 min
4. Gradient (6 types) - 30 min

**Change**:
- Return type: `Result<T, E>` → `ParseResult<T>`
- Errors: `err()` → `parseErr()` with suggestions
- Success: `ok()` → `parseOk()`

**Duration**: 2 hours  
**Tests**: 10-20 updated

---

## ✅ Success Criteria

**After Phase 0.5 complete**:
- [ ] ParseResult type exists and documented
- [ ] All 14 modules return ParseResult<T>
- [ ] Rich error messages with suggestions
- [ ] 60-90 new tests added
- [ ] Total tests: 2406 → 2470-2500
- [ ] Zero TypeScript errors
- [ ] Zero breaking changes
- [ ] Committed atomically

**Result**: Foundation for Phase 1 (Universal API) ✅

---

## 📚 Documentation

**AUTHORITATIVE**: `MASTER_PLAN.md` ← Read this for complete details

**Supporting**:
- `UNIVERSAL_TYPE_DECISION.md` - Design rationale
- `API_DESIGN_CLARIFICATION.md` - Architecture explanation
- `POST_MORTEM.md` - Previous session lessons

**Session directory**: `.memory/archive/2025-10-21-phase0.5-v2/`

---

## 🎓 Critical Rules

1. **Public API returns `ParseResult<T>`** (always)
2. **Internal parsers can keep `Result<T, E>`** (optional)
3. **Always provide helpful suggestions** in errors
4. **Issues always present** (empty array if none)
5. **One module at a time** - test after each
6. **Commit only when green** - no exceptions

---

## 🚀 Getting Started

```bash
# Read the authoritative plan
cat .memory/archive/2025-10-21-phase0.5-v2/MASTER_PLAN.md

# Start Phase 0.5a
code src/core/result.ts

# (Add ParseResult type and helpers - see MASTER_PLAN.md)

# Verify
just check && just test

# Commit
git add -A && git commit -m "feat(core): add ParseResult type for universal public API"
```

**Then proceed to Phase 0.5b** (Shadow module first)

---

## 💡 Key Insight

**"Universal return type for clients, internal types for implementation"**

This gives us:
- Simple internal implementation (keep Result<T, E>)
- Rich public API (new ParseResult<T>)
- Single source of truth for clients
- Foundation for future features

**This is the way!** ⭐

---

**Next**: Implement Phase 0.5a - Create ParseResult type! 🚀
