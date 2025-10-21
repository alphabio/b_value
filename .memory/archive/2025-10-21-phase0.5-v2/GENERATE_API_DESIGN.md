# DESIGN ADDENDUM: GenerateResult API

**Date**: 2025-10-21T03:27:00  
**Status**: 🎨 **DESIGN DISCUSSION** - Match ParseResult symmetry  
**Question**: "Don't want to pollute parse... are we clear we need the same API for generate?"

**Answer**: YES! Absolutely need matching API for symmetry. 💯

---

## 🎯 The Symmetry

**Parse side** (what we designed):
```typescript
const {ok, value, property, issues} = Parse.Color.parse("#ff0000")
//     ↑    ↑      ↑         ↑
//     ParseResult<T>
```

**Generate side** (needs matching):
```typescript
const {ok, value, property, issues} = Generate.Color.generate(colorIR)
//     ↑    ↑      ↑         ↑
//     GenerateResult (NEW!)
```

---

## 📊 Current Generate API

**What exists now**:
```typescript
// Generators return strings directly
Generate.Color.Hex.toCss(hexIR): string
Generate.Color.Rgb.toCss(rgbIR): string
// ... 81 generators total, all return string

// NO unified generate() function
// NO error handling
// NO result type
```

**Issues**:
- ❌ Can't fail gracefully (throws or returns invalid CSS)
- ❌ No warnings (e.g., deprecated syntax)
- ❌ No validation of IR
- ❌ Inconsistent with parse API
- ❌ Can't track what property it's for

---

## ✅ Proposed GenerateResult Type

```typescript
/**
 * Result of generate operation with validation and warnings.
 * This is the public API type returned by all generate functions.
 * 
 * @public
 */
export type GenerateResult = {
  /** Success flag */
  ok: boolean
  
  /** Generated CSS string (present when ok=true) */
  value?: string
  
  /** Property name (when generating declarations) */
  property?: string
  
  /** Issues encountered (empty array if no issues) */
  issues: Issue[]
}
```

**Helpers**:
```typescript
export function generateOk(value: string, property?: string): GenerateResult
export function generateErr(message: string, options?: {...}): GenerateResult
```

---

## 💻 API Examples

### Module-Level Generate

```typescript
// Success
const result = Generate.Color.generate(colorIR);
// {
//   ok: true,
//   value: "#ff0000",
//   property: undefined,
//   issues: []
// }

// Success with warning
const result = Generate.Color.generate(legacyRgbIR);
// {
//   ok: true,
//   value: "rgb(255, 0, 0)",
//   issues: [{
//     severity: "warning",
//     message: "Generated legacy rgb() syntax",
//     suggestion: "Consider using modern syntax for better browser support"
//   }]
// }

// Error (invalid IR)
const result = Generate.Color.generate(invalidIR);
// {
//   ok: false,
//   value: undefined,
//   issues: [{
//     severity: "error",
//     message: "Invalid color IR: missing 'kind' field",
//     suggestion: "Check that IR was parsed correctly"
//   }]
// }
```

---

### Universal Generate (Phase 1)

```typescript
// Value only
const result = generate(colorIR);
// {
//   ok: true,
//   value: "#ff0000",
//   property: undefined,
//   issues: []
// }

// Full declaration
const result = generate(colorIR, { property: "color" });
// {
//   ok: true,
//   value: "color: #ff0000",  // ← Full declaration
//   property: "color",
//   issues: []
// }

// Batch generation
const result = generateAll([
  { property: "color", value: colorIR },
  { property: "width", value: widthIR }
]);
// {
//   ok: true,
//   value: "color: #ff0000; width: 10px",
//   issues: []
// }
```

---

## 🏗️ Implementation Strategy

### Option A: Parallel to Parse (RECOMMENDED)

**Add GenerateResult alongside ParseResult**:

```typescript
// src/core/result.ts

export type GenerateResult = {
  ok: boolean
  value?: string        // CSS string (not IR!)
  property?: string
  issues: Issue[]
}

export function generateOk(value: string, property?: string): GenerateResult {
  return { ok: true, value, property, issues: [] };
}

export function generateErr(message: string, options?: {...}): GenerateResult {
  return {
    ok: false,
    value: undefined,
    property: options?.property,
    issues: [{
      severity: options?.severity ?? 'error',
      message,
      suggestion: options?.suggestion,
      action: options?.action
    }]
  };
}
```

**Pros**:
- ✅ Parallel structure (easy to understand)
- ✅ Type-safe (string vs IR)
- ✅ Clear naming

**Cons**:
- ❌ Two types (but appropriate!)

---

### Option B: Unified Result Type

**Single type for both**:

```typescript
export type Result<T = unknown> = {
  ok: boolean
  value?: T             // T = IR for parse, string for generate
  property?: string
  issues: Issue[]
}

// Type aliases for clarity
export type ParseResult<T = unknown> = Result<T>
export type GenerateResult = Result<string>
```

**Pros**:
- ✅ Single type
- ✅ Flexible

**Cons**:
- ❌ Less clear (T is different things)
- ❌ Confusing type parameter

---

**Recommendation**: **Option A** (separate GenerateResult) - clearer, type-safe

---

## 📋 Updated Implementation Plan

### Phase 0.5a: Create ParseResult + GenerateResult Types (1.5 hours)

**Add both types together**:

```typescript
// src/core/result.ts

// Parse types (for IR → string)
export type ParseResult<T = unknown> = {
  ok: boolean
  value?: T              // IR object
  property?: string
  issues: Issue[]
}

export function parseOk<T>(value: T, property?: string): ParseResult<T>
export function parseErr<T>(message: string, options?: {...}): ParseResult<T>

// Generate types (for IR → CSS string)
export type GenerateResult = {
  ok: boolean
  value?: string         // CSS string
  property?: string
  issues: Issue[]
}

export function generateOk(value: string, property?: string): GenerateResult
export function generateErr(message: string, options?: {...}): GenerateResult

// Shared Issue type
export type Issue = { ... }
```

**Changes**:
- Duration: 1 hour → 1.5 hours (add GenerateResult)
- Tests: 0 → 0 (still no breaking changes)

---

### Phase 0.5b: Update Parsers (3-4 hours) - NO CHANGE

Still focused on parse side:
1. Shadow
2. Outline
3. Transition
4. Animation
5. Text
6. Background
7. Border

---

### Phase 0.5c: Update Existing Parsers (2 hours) - NO CHANGE

1. Color
2. ClipPath
3. Filter
4. Gradient

---

### Phase 0.5d: Create Generator Unified Functions (3-4 hours) - NEW!

**Add unified `generate()` to each module**:

```typescript
// src/generate/color/color.ts (NEW FILE)
import { generateErr, generateOk, type GenerateResult } from "@/core/result";
import type * as Type from "@/core/types";
import * as Hex from "./hex";
import * as Rgb from "./rgb";
import * as Hsl from "./hsl";
// ... import all generators

/**
 * Generate CSS from color IR with auto-detection.
 * 
 * Automatically detects color format from IR.kind and generates appropriate CSS.
 * 
 * @param color - Color IR
 * @returns GenerateResult with CSS string or error
 * 
 * @example
 * ```typescript
 * generate({ kind: "hex", value: "#FF0000" })
 * // → { ok: true, value: "#FF0000", issues: [] }
 * 
 * generate({ kind: "rgb", r: 255, g: 0, b: 0, a: 1 })
 * // → { ok: true, value: "rgb(255 0 0)", issues: [] }
 * ```
 * 
 * @public
 */
export function generate(color: Type.Color): GenerateResult {
  // Validate IR has 'kind' field
  if (!color.kind) {
    return generateErr("Invalid color IR: missing 'kind' field", {
      suggestion: "Ensure IR was parsed correctly"
    });
  }
  
  // Dispatch based on kind
  switch (color.kind) {
    case "hex":
      return generateOk(Hex.toCss(color));
    
    case "rgb":
      return generateOk(Rgb.toCss(color));
    
    case "hsl":
      return generateOk(Hsl.toCss(color));
    
    // ... all 12 color formats
    
    default:
      return generateErr(`Unknown color kind: ${color.kind}`, {
        suggestion: "Check that color IR is valid"
      });
  }
}
```

**For each of 14 modules**:
1. Create module.ts with generate() function
2. Add tests
3. Export from index.ts
4. Run checks
5. Commit

**Modules**:
1. Color (12 formats) - 30 min
2. ClipPath (10 shapes) - 30 min
3. Filter (11 functions) - 30 min
4. Gradient (6 types) - 30 min
5. Animation (8 values) - 30 min
6. Transition (4 values) - 20 min
7. Shadow (2 types) - 20 min
8. Outline (3 values) - 20 min
9. Text (7 values) - 30 min
10. Background (5 values) - 30 min
11. Border (4 values) - 30 min
12. Layout (17 values) - 40 min
13. Position (1 type) - 15 min
14. Transform (1 type) - 15 min

**Total**: 3-4 hours

---

### Phase 0.5e: Update Sub-Generators (Optional)

**Keep existing toCss() functions**:
```typescript
// These stay as-is (return string directly)
Generate.Color.Hex.toCss(hexIR): string
Generate.Color.Rgb.toCss(rgbIR): string
```

**Or upgrade to GenerateResult**:
```typescript
// Upgrade all to return GenerateResult
Generate.Color.Hex.toCss(hexIR): GenerateResult
```

**Decision needed**: Keep simple or upgrade all?

**Recommendation**: Keep simple (internal use only), only unified `generate()` returns GenerateResult

---

## 📊 Updated Timeline

| Phase | Task | Duration | Tests Added |
|-------|------|----------|-------------|
| 0.5a | Create ParseResult + GenerateResult | 1.5 hours | 0 |
| 0.5b | 7 parse modules | 3-4 hours | 50-70 |
| 0.5c | 4 existing parsers | 2 hours | 10-20 |
| 0.5d | 14 generate modules | 3-4 hours | 50-70 |
| **Total** | **Complete Phase 0.5** | **10-12 hours** | **110-160 tests** |

**Updated stats**:
- Tests: 2406 → 2520-2570
- TypeScript errors: 0
- Modules unified: 28 (14 parse + 14 generate)
- Public API: Consistent ParseResult + GenerateResult

---

## ✅ Final API Surface

### Parse API
```typescript
const {ok, value, property, issues} = Parse.Color.parse("#ff0000")
const {ok, value, property, issues} = Parse.Animation.parse("100ms")
const {ok, value, property, issues} = parse("color: #ff0000")  // Phase 1
```

### Generate API
```typescript
const {ok, value, property, issues} = Generate.Color.generate(colorIR)
const {ok, value, property, issues} = Generate.Animation.generate(animIR)
const {ok, value, property, issues} = generate(colorIR, {property: "color"})  // Phase 1
```

### Symmetry ✨
```typescript
// Round-trip
const parsed = Parse.Color.parse("#ff0000");
if (parsed.ok) {
  const generated = Generate.Color.generate(parsed.value);
  if (generated.ok) {
    console.log(generated.value);  // "#ff0000"
  }
}
```

---

## 🎯 Benefits of Matching API

1. **Symmetry**: Parse and generate use same result structure
2. **Validation**: Generators can validate IR
3. **Warnings**: Can warn about deprecated syntax
4. **Property tracking**: Know what property it's for
5. **Error handling**: Graceful failures instead of invalid CSS
6. **Consistency**: Single mental model for entire API
7. **Round-trip testing**: Easy to test parse → generate → parse
8. **Future-proof**: Foundation for advanced features

---

## ❓ Questions to Answer

1. **Should we do this in Phase 0.5 or separate phase?**
   - Option A: Include in Phase 0.5 (10-12 hours total)
   - Option B: Defer to Phase 0.6 (after parse is done)

2. **Should sub-generators return GenerateResult or string?**
   - Option A: Keep string (simpler)
   - Option B: All return GenerateResult (consistent)

3. **Should generators validate IR?**
   - Option A: Yes, check 'kind' field and structure
   - Option B: No, trust IR is valid (from parse)

---

## 💡 Recommendation

**Include GenerateResult in Phase 0.5a** (add types together):
- Same session, same context
- Symmetry designed upfront
- No "polluting parse" - they're parallel

**Keep Phase 0.5b-c focused on parse** (easier to implement):
- Parse side: Phases 0.5b, 0.5c
- Generate side: Phase 0.5d (new)

**Total timeline**: 10-12 hours (was 6-7 hours)
**But**: Complete symmetry, better design

**User approval needed**: Include generate or defer?

---

**Status**: Waiting for decision on generate side implementation. 🎨
