# CRITICAL API DESIGN AUDIT REQUIRED

**Date**: 2025-10-22  
**Priority**: HIGH  
**Status**: NEEDS IMMEDIATE REVIEW

---

## Issue: Inconsistent API Design Between `parse()` and `generate()`

### Current State

The `parse()` and `generate()` functions have **asymmetric APIs** that create unnecessary friction:

#### `parse()` - Simple and Elegant
```typescript
const result = parse("pointer-events: none");
// Returns: { ok: true, value: { kind: "pointer-events", value: "none" }, property: "pointer-events" }
```

**User provides**: CSS declaration string  
**Function extracts**: Property name + value  
**User receives**: Parsed IR with property name

#### `generate()` - Requires Client Legwork
```typescript
const result = generate({
  property: "pointer-events",  // ❌ User must specify property name
  value: { kind: "pointer-events", value: "none" }
});
// Returns: { ok: true, value: "none" }
```

**User provides**: Property name + IR value (redundant - `kind` already identifies property)  
**Function returns**: Just the CSS value string  
**User must**: Know property name despite IR already containing it

### The Problem

The IR type system **already encodes the property name** via the `kind` discriminant:

```typescript
{ kind: "pointer-events", value: "none" }
```

The `kind` field uniquely identifies which CSS property this IR represents. Requiring users to **also pass the property name separately** is:

1. **Redundant** - Information is duplicated
2. **Error-prone** - User could pass wrong property name for IR type
3. **Inconsistent** - `parse()` extracts property from declaration, `generate()` requires it
4. **More boilerplate** - Every call site has extra ceremony

### Example: Roundtrip Pattern

Current API forces awkward code:

```typescript
// Parse
const parsed = parse("pointer-events: none");
if (parsed.ok) {
  // Generate - must manually pass property name again
  const generated = generate({
    property: "pointer-events",  // Already in parsed.value.kind!
    value: parsed.value,
  });
}
```

### Proposed Fix

Make `generate()` API symmetric with `parse()`:

```typescript
// Option 1: Single IR parameter (recommended)
const result = generate({ kind: "pointer-events", value: "none" });
// Returns: { ok: true, value: "pointer-events: none" } or { ok: true, property: "pointer-events", value: "none" }

// Option 2: Overloaded - support both forms
generate(ir)  // Infer property from IR.kind
generate({ property, value })  // Explicit for backward compat
```

### Expected Behavior

```typescript
// Clean roundtrip
const parsed = parse("pointer-events: none");
if (parsed.ok) {
  const generated = generate(parsed.value);  // ✅ Just pass IR
  // Auto-infers property from IR.kind
}
```

---

## Batch API Concerns (Related)

User mentions expectations for batch APIs:

- `parse()` should handle multiple declarations (not `parseAll`)
- `generateAll()` should accept single/array of well-known IR types
- IR type should be self-describing (no property name required)

---

## Action Required

**Next agent must**:

1. **Audit current `generate()` implementation** in `src/universal.ts`
2. **Review all call sites** (tests, examples, docs)
3. **Design symmetric API** where `generate()` infers property from `IR.kind`
4. **Implement backward-compatible migration** if needed
5. **Update all tests and integration examples**
6. **Document API design rationale** in ADR

### Files to Review

- `src/universal.ts` (lines ~540-620)
- `test/integration/**/*.test.ts` (all generate() calls)
- Type definitions in `src/core/result.ts`
- All property generators

### Success Criteria

- [ ] `generate()` accepts IR directly without explicit property parameter
- [ ] Property name inferred from `IR.kind` discriminant
- [ ] Roundtrip tests simplified (no manual property passing)
- [ ] Backward compatibility maintained (or migration path clear)
- [ ] ADR documents design decision

---

## Related Context

- Session completed 2 interaction properties (pointer-events, user-select)
- Both required awkward `{ property, value }` API in integration tests
- Issue discovered during test implementation
- 102 properties currently implemented - API change impacts all

**Priority**: Address before implementing more properties to avoid technical debt.
