# Master Plan: Fix generate() API Asymmetry

**Date**: 2025-10-22  
**Status**: APPROVED - Ready for implementation  
**Impact**: BREAKING CHANGE - Tests will break intentionally  
**Strategy**: Break everything, fix everything

---

## Problem Summary

**Current (awkward)**:
```typescript
const parsed = parse("color: red");
const generated = generate({
  property: "color",  // redundant - IR.kind already says "color"
  value: parsed.value
});
```

**Desired (clean)**:
```typescript
const parsed = parse("color: red");
const generated = generate(parsed.value);  // just pass IR
```

**Root cause**: IR already contains property identity via `kind` field, making explicit `property` parameter redundant.

---

## Strategy: Breaking Change (Clean Break)

**Philosophy**: Make the tests break so we're FORCED to fix them properly.

### Phase 1: Break the API (30 min)
### Phase 2: Fix All Tests (~2-3 hours)
### Phase 3: Update Docs (30 min)

**Total time**: ~3-4 hours in one session.

---

## Phase 1: Break the API (INTENTIONALLY)

### Step 1.1: Change `generate()` signature

**File**: `src/universal.ts`

**REPLACE** the entire `generate()` function:

```typescript
/**
 * Generate CSS value from IR (infers property from IR.kind).
 * 
 * Symmetric with parse() - just pass the IR directly.
 * 
 * @param ir - Intermediate representation with kind discriminant
 * @returns GenerateResult with CSS string and property name
 * 
 * @example
 * ```typescript
 * const parsed = parse("color: red");
 * if (parsed.ok) {
 *   const generated = generate(parsed.value);
 *   // { ok: true, value: "red", property: "color" }
 * }
 * ```
 * 
 * @public
 */
export function generate(ir: unknown): GenerateResult {
  // Guard: Check if IR has 'kind' field
  if (!ir || typeof ir !== "object" || !("kind" in ir)) {
    return generateErr(
      "invalid-ir",
      "IR must be an object with a 'kind' field",
      { suggestion: "Pass a valid IR from parse()" }
    );
  }

  const kind = (ir as { kind: string }).kind;

  // Step 1: Check if shorthand
  if (isShorthand(kind)) {
    return generateErr("shorthand-not-supported", `"${kind}" is a shorthand property`, {
      action: "Use b_short library for shorthand generation",
      property: kind as CSSPropertyName,
    });
  }

  // Step 2: Find generator by kind
  const generator = PROPERTY_GENERATORS[kind];
  if (!generator) {
    return generateErr("unknown-property", `Unknown or unsupported property: "${kind}"`, {
      suggestion: "Check if b_value supports this property yet",
      property: kind as CSSPropertyName,
    });
  }

  // Step 3: Generate value
  const result = generator(ir);

  // Step 4: Add property name to result
  return {
    ...result,
    property: kind,
  };
}
```

### Step 1.2: Run tests to see what breaks

```bash
pnpm test
```

**Expected**: ~160 test files will fail with type errors.

**Success Criteria for Phase 1**:
- [ ] `generate()` signature changed from `{ property, value }` to `ir`
- [ ] Tests break (THIS IS GOOD!)
- [ ] Compiler shows type errors (THIS IS GOOD!)

---

## Phase 2: Fix All Tests (Automated)

### Step 2.1: Find all broken test files

```bash
# Find all files with generate({ property:
grep -r "generate({" test/ --include="*.test.ts" | cut -d: -f1 | sort -u > /tmp/files_to_fix.txt
```

### Step 2.2: Automated fix using sed/script

**Option A: Simple sed replacement** (for straightforward cases):

```bash
# Replace generate({ property: "X", value: Y }) with generate(Y)
find test/ -name "*.test.ts" -exec sed -i '' \
  's/generate({ *property: *"[^"]*", *value: *\([^}]*\) *})/generate(\1)/g' {} +
```

**Option B: Manual fix using text editor** (more reliable):

1. Search for: `generate({`
2. Replace pattern:
   - **Before**: `generate({ property: "color", value: colorIR })`
   - **After**: `generate(colorIR)`

### Step 2.3: Fix each module

Work through modules in this order:

1. **interaction** (2 files) - easiest, just did these
2. **layout** (multiple files)
3. **color** (multiple files)
4. **typography** (multiple files)
5. Continue...

### Example Fix

**Before**:
```typescript
const result = generate({
  property: "pointer-events",
  value: {
    kind: "pointer-events",
    value: "none",
  },
});
```

**After**:
```typescript
const result = generate({
  kind: "pointer-events",
  value: "none",
});
```

### Step 2.4: Verify after each module

```bash
# Test specific module
pnpm test test/integration/interaction/

# When all done, test everything
pnpm test
```

**Success Criteria for Phase 2**:
- [ ] All test files updated
- [ ] All tests pass: `pnpm test`
- [ ] No TypeScript errors: `pnpm typecheck`

---

## Phase 3: Update Documentation

### Files to Update:

1. **README.md**
   - Update examples to use new `generate()` signature
   - Show parse -> generate roundtrip

2. **Examples** (if any exist)
   - Update all example code

3. **CHANGELOG.md**
   - Document breaking change
   - Provide migration guide

### Example Changelog Entry

```markdown
## [NEXT] - 2025-10-22

### BREAKING CHANGES

- **`generate()` signature changed**: Now accepts IR directly instead of `{ property, value }` object

  **Before**:
  ```typescript
  const result = generate({
    property: "color",
    value: { kind: "color", r: 255, g: 0, b: 0 }
  });
  ```

  **After**:
  ```typescript
  const result = generate({ kind: "color", r: 255, g: 0, b: 0 });
  ```

  **Migration**: Remove the `property` wrapper and pass IR directly.

  **Rationale**: The IR already contains property identity via `kind` field.
  This makes `generate()` truly symmetric with `parse()`.
```

**Success Criteria for Phase 3**:
- [ ] README examples updated
- [ ] CHANGELOG entry added
- [ ] Examples updated (if any)

---

## Why This Works

✅ **Clean break**: No legacy baggage  
✅ **Forced fix**: Tests break, must fix them  
✅ **Symmetric API**: `generate()` now mirrors `parse()`  
✅ **Simple migration**: Remove wrapper, pass IR directly  
✅ **One session**: Can be done in 3-4 hours  

---

## Next Steps (Execute in Order)

1. **Phase 1**: Change `generate()` signature (~30 min)
2. **Phase 2**: Fix all test files (~2-3 hours)
3. **Phase 3**: Update docs (~30 min)
4. **Verify**: Run full test suite

---

## Success Metrics

- [ ] `generate()` accepts IR directly
- [ ] All tests pass: `pnpm test`
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] Documentation updated
- [ ] CHANGELOG entry added

---

## Quick Reference: The Change

| Aspect | Before | After |
|--------|--------|-------|
| **Signature** | `generate({ property, value })` | `generate(ir)` |
| **Usage** | `generate({ property: "color", value: ir })` | `generate(ir)` |
| **Property** | Explicit parameter | Inferred from `ir.kind` |
| **Result** | `{ ok, value }` | `{ ok, value, property }` |

---

## Rollback Plan

If something goes catastrophically wrong:

```bash
git reset --hard HEAD~1  # Undo last commit
```

But this shouldn't happen - it's a simple find/replace operation.
