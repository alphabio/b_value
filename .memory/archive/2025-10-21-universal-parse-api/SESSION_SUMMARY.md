# Session Summary: Universal Parse & Generate API Design

**Date**: 2025-10-21T02:12  
**Duration**: ~1 hour (planning session)  
**Status**: ✅ Planning Complete - Ready for Implementation  
**Commit**: `0e91e0e`

---

## 🎯 What We Accomplished

### 1. Refined the API Design

**Started with**: "Better API proposal" from previous session  
**Refined to**: Complete specification with all edge cases handled

**Key refinements**:
- ❌ Dropped heuristic value parsing (too ambiguous)
- ✅ Simplified ParseResult to `{ok, value?, property?, issues}`
- ✅ Issues array pattern for errors/warnings/suggestions
- ✅ Explicit shorthand rejection with b_short integration hints
- ✅ Auto-detect generation based on IR kind

### 2. Created Complete Documentation

**Files created**:
1. **START_HERE.md** (9KB)
   - Quick overview for next agent
   - Complete API specification
   - Type system
   - Key design decisions
   - Integration examples

2. **MASTER_PLAN.md** (25KB)
   - Full implementation plan
   - 5 phases with detailed tasks
   - Complete code examples
   - Test specifications
   - Time estimates per phase

3. **CONTINUE.md** (updated)
   - Points to START_HERE.md
   - Current status
   - Next step (Phase 1)

---

## 📋 The API Design

### Parse API

```typescript
// Single declaration
parse("color: #ff0000")
// → { ok: true, property: "color", value: {...}, issues: [] }

// Batch parse
parseAll("color: red; clip-path: circle(50%)")
// → [{ ok: true, ... }, { ok: true, ... }]

// Shorthand rejection
parse("margin: 10px")
// → { ok: false, property: "margin", issues: [{
//     severity: "error",
//     message: "Shorthand property not supported",
//     suggestion: "Use longhand: margin-top, margin-right, ...",
//     action: 'import { expand } from "b_short"; ...'
//   }]}
```

### Generate API

```typescript
// Value only
generate({ kind: "hex", value: "#FF0000" })
// → "#FF0000"

// Full declaration
generate({ kind: "hex", value: "#FF0000" }, { property: "color" })
// → "color: #FF0000"

// Batch generate
generateAll([
  { property: "color", value: colorIR },
  { property: "clip-path", value: clipPathIR }
])
// → "color: #ff0000; clip-path: circle(50%)"
```

### Round-Trip Workflow

```typescript
// Parse → Modify → Generate → Parse (perfect round-trip)
const parsed = parse("color: #ff0000");
const modified = { ...parsed.value, value: "#00FF00" };
const css = generate(modified, { property: parsed.property });
const reparsed = parse(css);
// reparsed.value === modified ✅
```

---

## 🎯 Key Design Decisions

### ✅ What We're Doing

1. **Declaration-based parsing** - `parse("property: value")`
   - Natural CSS syntax
   - Copy-paste from stylesheets/DevTools
   - Self-documenting

2. **Reject shorthands explicitly**
   - Clear error messages
   - Point to b_short library
   - Show longhand equivalents
   - Provide code examples

3. **Simplified ParseResult**
   - Single `ok` flag
   - `issues` array (errors, warnings, info)
   - `property` preserved for context

4. **Auto-detect generation**
   - IR `kind` → generator function
   - No module knowledge required

5. **Perfect round-trips**
   - Parse → modify → generate → parse
   - Values remain identical

### ❌ What We're NOT Doing

1. **No heuristic value parsing**
   - `parse("#ff0000")` → ERROR (missing colon)
   - Too ambiguous (which property?)
   - Forces explicit declarations

2. **No shorthand expansion**
   - That's b_short's responsibility
   - Clear separation of concerns
   - Deterministic behavior

---

## 📋 Implementation Plan

### Phase 1: Property Mapping (3-4h) ⬅️ NEXT
- Map ~100+ CSS properties → parser modules
- Identify shorthand properties
- Map shorthand → longhand (for errors)
- Map IR kind → generator functions
- Tests

### Phase 2: Parse API (6-7h)
- Implement `parse()` function
- Declaration parsing (split on colon)
- Shorthand rejection with errors
- Unknown property detection
- Implement `parseAll()` batch parser
- 50+ tests

### Phase 3: Generate API (4-5h)
- Implement `generate()` function
- Auto-detect IR kind
- Support value/declaration modes
- Implement `generateAll()` batch
- 30+ tests

### Phase 4: Round-Trip Tests (1-2h)
- Test parse → generate → parse
- Test parse → modify → generate
- 20+ test cases

### Phase 5: Documentation (2h)
- Update README
- API reference
- Migration guide
- b_short integration examples

**Total Estimate**: 16-20 hours (~2 days)

---

## 🎯 Success Criteria

- [ ] All existing tests pass (2390 tests)
- [ ] Parse API tests pass (50+ new tests)
- [ ] Generate API tests pass (30+ new tests)
- [ ] Round-trip tests pass (20+ test cases)
- [ ] `just check && just test` passes
- [ ] Zero breaking changes to existing module API
- [ ] Both APIs coexist (backward compatible)
- [ ] Documentation complete

---

## 💡 Integration with b_short

```typescript
// Complete pipeline
import { expand } from "b_short";
import { parse, generate, parseAll, generateAll } from "b_value";

// 1. Expand shorthand → longhand
const expanded = expand("margin: 10px 20px;");
// → "margin-top: 10px; margin-right: 20px; ..."

// 2. Parse each longhand
const parsed = parseAll(expanded.result);

// 3. Modify IR values
const modified = parsed.map(r => {
  if (r.ok && r.property === "margin-top") {
    return { ...r, value: { ...r.value, value: 30 } };
  }
  return r;
});

// 4. Generate back to CSS
const css = generateAll(
  modified.map(r => ({ property: r.property, value: r.value }))
);
```

---

## 📊 Project Status

**Baseline**: ✅ Green (2390 tests passing)  
**Documentation**: ✅ Complete  
**Next Agent Action**: Start Phase 1 (Property Mapping)

**Read These First**:
1. `.memory/archive/2025-10-21-universal-parse-api/START_HERE.md`
2. `.memory/archive/2025-10-21-universal-parse-api/MASTER_PLAN.md`

---

## 🚀 For Next Agent

**Start here**:
1. Run `just check && just test` to verify baseline
2. Read `START_HERE.md` for overview
3. Read `MASTER_PLAN.md` Phase 1 for detailed tasks
4. Create `src/property-map.ts` with first mappings
5. Write tests as you go
6. Commit incrementally

**Context preserved in**:
- START_HERE.md - Quick reference & overview
- MASTER_PLAN.md - Full implementation details
- CONTINUE.md - Current status pointer

---

**Session complete!** 🎉

Ready for implementation. Next agent has everything needed to start Phase 1.
