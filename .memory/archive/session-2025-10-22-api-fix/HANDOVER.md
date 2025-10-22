# Handover: API Fix Session

**Date**: 2025-10-22  
**Session**: API Asymmetry Discovery & Planning  
**Status**: ✅ Plan Complete - Ready for Implementation  
**Next Agent**: Should implement Phase 1

---

## What We Accomplished

### 1. Identified Core Problem

**Discovery**: The `generate()` API is asymmetric with `parse()`:

```typescript
// parse() - extracts BOTH property AND value from string
parse("color: red") 
// → { ok: true, value: { kind: "color", ... }, property: "color" }

// generate() - requires REDUNDANT property parameter
generate({ property: "color", value: { kind: "color", ... } })
//         ↑ This is redundant! IR.kind already says "color"
```

**The Problem**: IR (Intermediate Representation) already contains property identity via `kind` field, making the explicit `property` parameter unnecessary and awkward.

### 2. Created Master Plan

**File**: `.memory/API_FIX_MASTER_PLAN.md`

**Decision**: User wants **BREAKING CHANGE** approach (not gradual migration)
- Let tests break intentionally
- Fix all tests in one session
- Clean API from day 1

**Strategy**: 3 phases, ~3-4 hours total

### 3. User Decisions

✅ **Want tests to break** - forces proper fix  
✅ **No backward compatibility** - clean break  
✅ **Do NOT support old `generate({ property, value })`** - remove it entirely  

---

## What's Ready to Implement

### Master Plan Location
`.memory/API_FIX_MASTER_PLAN.md`

### Phase 1: Break the API (~30 min)

**Action**: Change `generate()` signature in `src/universal.ts`

**From**:
```typescript
export function generate(options: { property: string; value: unknown }): GenerateResult
```

**To**:
```typescript
export function generate(ir: unknown): GenerateResult {
  // Infer property from ir.kind
  if (!ir || typeof ir !== "object" || !("kind" in ir)) {
    return generateErr("invalid-ir", "IR must have 'kind' field");
  }
  const kind = (ir as { kind: string }).kind;
  // ... rest of implementation
}
```

**Expected Result**: ~160 test files will break (THIS IS GOOD)

### Phase 2: Fix All Tests (~2-3 hours)

**Automated approach**:
```bash
# Find all broken tests
grep -r "generate({" test/ --include="*.test.ts"

# Replace pattern (can use sed or manual)
# Before: generate({ property: "color", value: colorIR })
# After:  generate(colorIR)
```

**Manual approach**: Simple find/replace in editor

### Phase 3: Update Docs (~30 min)

- Update README.md examples
- Add CHANGELOG entry for breaking change
- Update any example code

---

## Current State

### Baseline Status
- ✅ All tests passing before changes
- ✅ 102 properties implemented and working
- ✅ No uncommitted changes

### What's NOT Changed Yet
- ❌ `generate()` still has old signature
- ❌ Tests still use old API
- ❌ Documentation still shows old examples

---

## Next Agent Instructions

### Step 1: Verify Baseline

```bash
cd /Users/alphab/Dev/LLM/DEV/b_value
pnpm test  # Should all pass
```

### Step 2: Read Master Plan

```bash
cat .memory/API_FIX_MASTER_PLAN.md
```

### Step 3: Execute Phase 1

1. Open `src/universal.ts`
2. Find `export function generate(options: { property: string; value: unknown })`
3. Replace entire function with new signature (see master plan)
4. Run `pnpm test` to see what breaks (EXPECT ~160 failures)

### Step 4: Execute Phase 2

1. Use grep to find all `generate({` calls in test files
2. Replace with new signature:
   - **Remove**: `{ property: "X", value: `
   - **Keep**: Just the IR
   - **Remove**: Closing `}`
3. Verify module by module: `pnpm test test/integration/MODULE/`

### Step 5: Execute Phase 3

1. Update README.md examples
2. Add CHANGELOG entry
3. Final verification: `pnpm test && pnpm typecheck`

---

## Key Files

- **Master Plan**: `.memory/API_FIX_MASTER_PLAN.md`
- **Source to Change**: `src/universal.ts` (generate function)
- **Tests to Fix**: ~160 files in `test/` directory
- **Docs to Update**: `README.md`, `CHANGELOG.md`

---

## Important Notes

⚠️ **This is a BREAKING CHANGE** - intentional  
⚠️ **Tests WILL break** - this is expected  
⚠️ **No backward compatibility** - user's explicit choice  

✅ **Simple migration**: Remove wrapper object, pass IR directly  
✅ **All 102 properties keep working** - just cleaner API  
✅ **Can be done in one session** - ~3-4 hours  

---

## Rollback Plan

If anything goes wrong:
```bash
git reset --hard HEAD~1
```

But this is a straightforward find/replace operation - should be safe.

---

## Questions for User (if needed)

If next agent encounters issues:
1. Ask: "Should I continue with automated sed replacement or manual fix?"
2. Ask: "Do you want to do this module-by-module or all at once?"
3. Ask: "Any specific test modules to prioritize?"

---

## Session Context

**User Motivation**: 
- Frustrated with awkward API requiring redundant property parameter
- Wants clean, symmetric API matching `parse()`
- Willing to do breaking change to get it right

**User Style**:
- Prefers clean breaks over gradual migration
- Values API elegance over backward compatibility
- Wants tests to guide the fix process

---

**Next Agent**: Start with Phase 1 - change the `generate()` signature and let tests break!
