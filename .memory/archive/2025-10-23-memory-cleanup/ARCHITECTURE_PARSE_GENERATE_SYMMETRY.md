# CRITICAL ARCHITECTURE DECISION: Parse and Generate Symmetry

**Date**: 2025-10-22T13:24:00Z  
**Status**: 🔴 FOUNDATIONAL PRINCIPLE - DO NOT VIOLATE

---

## The Principle

**BOTH `parse()` AND `generate()` MUST RETURN RESULT TYPES.**

This is not optional. This is not negotiable. This is architectural bedrock.

---

## Why This Matters

### Parse: Validates Untrusted Input
```typescript
const result = parse("color: red");
// Input: CSS string from user (untrusted)
// Can fail: Invalid syntax, unknown values, malformed input
// Must return: ParseResult<T> with ok/error/issues
```

### Generate: Validates Untrusted Input
```typescript
const result = generate({ kind: "color", value: "???" });
// Input: IR object from user (untrusted - manually constructed)
// Can fail: Wrong type, missing fields, invalid combinations
// Must return: GenerateResult with ok/error/issues
```

**Key insight**: Users can construct IR manually. It's not always from our parser. JavaScript has no runtime type safety. Generation MUST validate.

---

## The Failure Modes Are Real

### Generation Can Fail When:

1. **Type errors**: User passes `{kind: "color", value: 42}` (number instead of string)
2. **Missing fields**: User forgets required properties
3. **Invalid combinations**: Structurally valid but semantically wrong IR
4. **Malformed data**: User manually constructs IR incorrectly
5. **Future validation**: New rules, deprecations, warnings

**JavaScript has no compile-time type safety.** TypeScript types are erased at runtime. We MUST validate at runtime.

---

## Current State (BROKEN)

### Pattern 1: Correct (11 generators)
```typescript
export function generate(color: Color): GenerateResult {
  // Validates input
  if (!color || !color.kind) {
    return generateErr("Invalid color IR: missing 'kind' field");
  }
  // ... more validation
  return generateOk(cssString);
}
```

### Pattern 2: WRONG (128 generators)
```typescript
export function toCss(color: Color): string {
  // No validation - just assumes valid input
  return color.value; // THROWS if color is malformed
}
```

**Problem**: 92% of generators throw exceptions instead of returning errors gracefully.

---

## The Fix

**Make ALL 139 generators**:
1. Return `GenerateResult` (not raw `string`)
2. Validate their input IR
3. Return errors gracefully (no thrown exceptions)
4. Use consistent function names

### Implementation Pattern

```typescript
export function generate(ir: PropertyIR): GenerateResult {
  // Step 1: Validate IR structure
  if (!ir || typeof ir !== "object") {
    return generateErr("invalid-ir", "IR must be an object");
  }
  
  if (!("kind" in ir)) {
    return generateErr("missing-required-field", "Missing 'kind' field");
  }
  
  // Step 2: Validate IR semantics
  // ... property-specific validation ...
  
  // Step 3: Generate CSS
  const css = /* generation logic */;
  
  // Step 4: Return success
  return generateOk(css);
}
```

---

## API Symmetry

```typescript
// Parse API
const {ok, value, issues} = parse("color: red");
// - Input: Untrusted CSS string
// - Returns: ParseResult<IR>
// - Validates: Syntax, semantics, browser support

// Generate API
const {ok, value, issues} = generate(colorIR);
// - Input: Untrusted IR object
// - Returns: GenerateResult (CSS string)
// - Validates: Structure, types, semantic correctness
```

**Both APIs have the same shape.** This is deliberate. This is correct.

---

## Why We Were Confused

I (Claude) assumed:
- "Generation can't fail because IR comes from our parser"
- "IR is already validated so why wrap it in Result?"

**This assumption was wrong because**:
- Users can construct IR manually (they're not required to use our parser)
- JavaScript has no runtime type safety
- Generators MUST validate input just like parsers do

---

## Migration Path

1. **Phase 1**: Audit all 139 generators
2. **Phase 2**: Add validation to 128 generators that lack it
3. **Phase 3**: Change return type from `string` to `GenerateResult`
4. **Phase 4**: Rename `toCss` to `generate` for consistency
5. **Phase 5**: Update all tests
6. **Phase 6**: Update all callsites
7. **Phase 7**: Build universal API (now trivial - all generators same signature)

**Estimated effort**: 6-8 hours focused work

---

## Never Again

**If anyone suggests**:
- "Generation can't fail, so why return Result?"
- "Let's make generators return raw strings for simplicity"
- "The 92% majority pattern must be right"

**Point them to this document.**

Parse and Generate are symmetric operations that validate untrusted input. Both return Result types. This is foundational architecture.

---

## Related Decisions

- **Function naming**: `parse()` and `generate()` (not `toCss`, not custom names)
- **Return types**: `ParseResult<T>` and `GenerateResult` (not raw types)
- **Error handling**: Result types (not thrown exceptions)
- **Validation**: Always validate input (never assume trust)

---

**This conversation took hours because I didn't understand Jesse's architectural vision. Never repeat this mistake.**
