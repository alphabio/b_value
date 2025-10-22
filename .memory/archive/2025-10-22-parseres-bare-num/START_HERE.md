# Session: ParseResult Type Safety & Bare Number Policy

**Date**: 2025-10-22T01:11:00Z  
**Status**: 🚧 In Progress  
**Focus**: Two independent improvements

---

## Issue 1: ParseResult Type Safety 🎯

### Problem
Current type doesn't enforce value presence after `if (result.ok)`:
```typescript
export type ParseResult<T = unknown> = {
  ok: boolean;
  value?: T;
  property?: string;
  issues: Issue[];
};
```

User wants: `if (result.ok)` should be sufficient  
Reality: TypeScript still requires `if (result.ok && result.value)`

### Commented-Out Solution (lines 367-369)
```typescript
export type ParseResult<T = unknown> =
  | { ok: true; value: T; property?: string; issues: Issue[] }
  | { ok: false; value?: undefined; property?: string; issues: Issue[] };
```

This is a **discriminated union** that makes value non-optional when `ok: true`.

### Why Was It Commented Out?

Need to investigate:
1. Does it break existing code?
2. Are there cases where `ok: true` but `value` is intentionally undefined?
3. Test impact?

---

## Issue 2: Bare Number Auto-Correction Policy 🔧

### Background
CSS spec requires units for positions:
- ❌ `radial-gradient(red 0, blue 50)` - INVALID (bare numbers)
- ✅ `radial-gradient(red 0%, blue 50%)` - VALID (with %)

Current b_value: **Strictly rejects bare numbers** (spec-compliant)

### User's Request
**"Let this through and auto-add the unit with an issue"**

This would mean:
1. Accept `0` → treat as `0%` or `0px`
2. Emit warning/info issue about correction
3. Continue parsing successfully

### Concerns
This is **NOT a simple fix** - requires:
1. Complete audit of ALL numeric values across ALL properties
2. Consistent policy: Which properties? Which contexts?
3. Units: `%` vs `px` vs `em` - which to add?
4. Testing: Validate every correction scenario

### Decision Required
User says: **"Complete audit of all values to see where this can be an issue"**

---

## Session Goals

### Phase 1: Fix ParseResult Type ✅
1. Test commented-out discriminated union
2. Fix any breaking code
3. Verify all tests pass
4. Update documentation if needed

### Phase 2: Bare Number Audit 🔍
1. Inventory all numeric value parsers
2. Identify where bare numbers appear
3. Document current behavior
4. Propose policy options with pros/cons
5. Get user decision before implementing

---

## Quick Status
- Baseline: ❌ 16 TypeScript errors in `image.test.ts` (needs discriminated union fix)
- Tests: 2654 tests (would pass after type fix)
