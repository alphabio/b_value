# API DESIGN CLARIFICATION

**Date**: 2025-10-21T03:13:00
**Issue**: Confusion between current Result<T, E> and planned API with `issues` field
**Status**: 🎨 Design Mode - Clarify Before Implementation

---

## 🤔 The Question

User asks: Is this the API we're building?

```typescript
const {ok, value, issues} = parse("...")
const {ok, value, issues} = Parse.Color.parse()
```

**Answer**: There are **TWO different APIs** with **TWO different result types**!

---

## 📊 Current State vs. Planned State

### Current API (Existing Codebase)

**Module-level parsers** return `Result<T, E>`:

```typescript
import { Parse } from "b_value";

// Current module API - Result<T, E>
const result = Parse.Color.parse("#ff0000");
// Type: Result<Type.Color, string>

if (result.ok) {
  console.log(result.value);  // Color IR
  console.log(result.error);  // undefined
} else {
  console.log(result.value);  // undefined
  console.log(result.error);  // string error message
}

// ❌ No 'issues' field!
// result.issues → Type error!
```

**Actual type** (from `src/core/result.ts`):

```typescript
type Result<T, E> =
  | { ok: true; value: T; error: undefined }
  | { ok: false; value: undefined; error: E };
```

**Properties**:
- ✅ `ok: boolean` - success flag
- ✅ `value: T | undefined` - parsed value (only if ok=true)
- ✅ `error: E | undefined` - error value (only if ok=false)
- ❌ **NO `issues` field**

---

### Planned Universal API (Not Built Yet)

**Top-level parse/generate** will return `ParseResult`:

```typescript
import { parse, generate } from "b_value";

// Planned universal API - ParseResult (new type!)
const result = parse("color: #ff0000");
// Type: ParseResult (to be defined)

// Proposed structure:
if (result.ok) {
  console.log(result.value);     // Color IR
  console.log(result.property);  // "color"
  console.log(result.issues);    // [] (empty, no issues)
} else {
  console.log(result.value);     // undefined
  console.log(result.property);  // "color" (still know what was parsed)
  console.log(result.issues);    // [{ severity, message, suggestion }]
}
```

**Proposed type** (not yet implemented):

```typescript
// NEW TYPE - Not in codebase yet!
type ParseResult = {
  ok: boolean
  value?: CSSValue        // IR object
  property?: string       // "color", "clip-path", etc.
  issues: Issue[]         // Always present, may be empty
}

type Issue = {
  severity: 'error' | 'warning' | 'info'
  message: string
  suggestion?: string
  action?: string
}
```

**Properties**:
- ✅ `ok: boolean` - success flag
- ✅ `value?: CSSValue` - parsed value (present when ok=true)
- ✅ `property?: string` - property name from declaration
- ✅ `issues: Issue[]` - **NEW!** Always present, rich error information

---

## 🎯 The Two-Tier Design

### Tier 1: Module API (Current - Phase 0.5)

**Uses**: `Result<T, E>` (existing type)

```typescript
// Module-level API
Parse.Color.parse(value: string): Result<Type.Color, string>
Parse.ClipPath.parse(value: string): Result<Type.ClipPath, string>
Parse.Animation.parse(value: string): Result<Type.Animation.Kinds, string>
// ... all 14 modules
```

**Characteristics**:
- Takes just the **value** part (no property name)
- Returns `Result<T, E>` (ok/value/error)
- Simple error strings
- No `issues` field
- No `property` field

**Example**:

```typescript
const result = Parse.Color.parse("#ff0000");
// { ok: true, value: { kind: "hex", ... }, error: undefined }

const bad = Parse.Color.parse("invalid");
// { ok: false, value: undefined, error: "No color format matched" }
```

---

### Tier 2: Universal API (Planned - Phase 1)

**Uses**: `ParseResult` (NEW type to be created)

```typescript
// Top-level universal API
parse(declaration: string): ParseResult
parseAll(css: string): ParseResult[]
generate(ir: CSSValue, options?: GenerateOptions): string
generateAll(values: Array<{property, value}>): string
```

**Characteristics**:
- Takes **full declaration** ("color: #ff0000")
- Returns `ParseResult` (ok/value/property/issues)
- Rich error information with suggestions
- Always has `issues` array
- Always has `property` field

**Example**:

```typescript
const result = parse("color: #ff0000");
// {
//   ok: true,
//   property: "color",
//   value: { kind: "hex", ... },
//   issues: []
// }

const bad = parse("margin: 10px");  // Shorthand = error
// {
//   ok: false,
//   property: "margin",
//   value: undefined,
//   issues: [{
//     severity: "error",
//     message: "Shorthand property not supported",
//     suggestion: "Use longhand: margin-top, margin-right, ...",
//     action: 'import { expand } from "b_short"; ...'
//   }]
// }
```

---

## 🚧 Implementation Phases

### Phase 0.5: Unify Module API ← WE ARE HERE

**Goal**: Make all modules consistent (use existing `Result<T, E>`)

**What we're building**:

```typescript
// Add parse() to 7 modules that lack it
Parse.Animation.parse(value: string): Result<Type.Animation.Kinds, string>
Parse.Transition.parse(value: string): Result<Type.Transition.Kinds, string>
Parse.Shadow.parse(value: string): Result<Type.Shadow.Kinds, string>
// ... etc (7 modules total)
```

**Type used**: `Result<T, E>` (existing, no changes)

**NO `issues` field yet!** That comes in Phase 1.

---

### Phase 1: Universal API (Future)

**Goal**: Create top-level parse/generate with rich errors

**What we'll build**:

```typescript
// NEW: Create ParseResult type
type ParseResult = {
  ok: boolean
  value?: CSSValue
  property?: string
  issues: Issue[]
}

// NEW: Top-level functions
export function parse(declaration: string): ParseResult { ... }
export function parseAll(css: string): ParseResult[] { ... }
export function generate(ir: CSSValue, options?: GenerateOptions): string { ... }
export function generateAll(values): string { ... }
```

**Type used**: `ParseResult` (NEW type, will create)

**Will have `issues` field!**

---

## 🎨 Design Questions to Answer

### Question 1: Should Module API also get `issues`?

**Option A**: Keep module API simple (current `Result<T, E>`)
- Module: `Result<T, E>` with simple error strings
- Universal: `ParseResult` with rich issues

**Pros**:
- ✅ Simple, proven type system
- ✅ No breaking changes to existing code
- ✅ Clear separation of concerns

**Cons**:
- ❌ Two different result types (confusing?)
- ❌ Module API has less helpful errors

---

**Option B**: Upgrade Result<T, E> to include optional issues

```typescript
// Enhanced Result type
type Result<T, E = Error> =
  | { ok: true; value: T; error: undefined; issues?: Issue[] }
  | { ok: false; value: undefined; error: E; issues: Issue[] };
```

**Pros**:
- ✅ Single result type everywhere
- ✅ Rich errors at all levels
- ✅ Consistent API

**Cons**:
- ❌ Breaking change (issues optional → required in error case)
- ❌ More complex type
- ❌ Module parsers need updating

---

**Option C**: Two separate types, explicit naming

```typescript
// Keep Result<T, E> as-is for modules
type Result<T, E> =
  | { ok: true; value: T; error: undefined }
  | { ok: false; value: undefined; error: E };

// New ParseResult for universal API
type ParseResult = {
  ok: boolean
  value?: CSSValue
  property?: string
  issues: Issue[]
}
```

**Pros**:
- ✅ No breaking changes
- ✅ Clear separation (simple vs rich errors)
- ✅ Type names indicate purpose

**Cons**:
- ❌ Two types to remember
- ❌ Can't use module API results directly in universal API

---

### Question 2: Should generate() return Result or throw?

**Current** (Generate module):

```typescript
// All generators return strings directly, no Result
Generate.Color.Hex.toCss(ir: HexColor): string  // Just returns string
```

**Option A**: Keep generators simple (return string, no Result)

```typescript
generate(ir: CSSValue): string  // Never fails (IR is valid by construction)
```

**Option B**: Generators return Result for consistency

```typescript
generate(ir: CSSValue): Result<string, string>  // Can validate IR
```

**Option C**: Generators return ParseResult with issues

```typescript
generate(ir: CSSValue): ParseResult  // Rich errors, warnings about deprecated syntax
```

---

### Question 3: Error vs. Issues - naming consistency?

**Current**: `Result<T, E>` has `error` field (singular)

**Planned**: `ParseResult` has `issues` field (plural)

**Inconsistency**: Same concept, different names?

**Options**:
1. Keep both (`error` in Result, `issues` in ParseResult)
2. Rename to `errors` in both (plural)
3. Rename ParseResult to use `error` (singular, holds array)

---

## 📋 Recommendations

### For Phase 0.5 (NOW)

**Use existing `Result<T, E>` type - don't touch it!**

```typescript
// What we're implementing in Phase 0.5
export function parse(value: string): Result<Type.Animation.Kinds, string> {
  // Try all parsers
  const delay = Delay.parse(value);
  if (delay.ok) return delay;

  // ...

  return err("No animation value matched");  // Simple string error
}
```

**Why**:
- ✅ No type system changes needed
- ✅ No breaking changes
- ✅ Fast implementation
- ✅ Works perfectly for module-level API

**Defer** `issues` field to Phase 1 (Universal API)

---

### For Phase 1 (FUTURE)

**Create new `ParseResult` type with issues**

```typescript
// NEW type for universal API
export type ParseResult = {
  ok: boolean
  value?: CSSValue
  property: string        // Always present
  issues: Issue[]         // Always present, may be empty
}

export type Issue = {
  severity: 'error' | 'warning' | 'info'
  message: string
  suggestion?: string
  action?: string
  location?: { offset: number, length: number }
}

// NEW universal API functions
export function parse(declaration: string): ParseResult { ... }
```

**Why**:
- ✅ Rich error information
- ✅ Helpful suggestions
- ✅ Property always known
- ✅ Can collect multiple issues

**Design decision needed**: Should module API be upgraded to also use `issues`?

---

## 🎯 Summary

### Current Reality

| API Level | Type | Fields | Status |
|-----------|------|--------|--------|
| Module | `Result<T, E>` | ok, value, error | ✅ Exists |
| Universal | - | - | ❌ Not built |

**Module example**:

```typescript
Parse.Color.parse("#ff0000")
// → Result<Type.Color, string>
// → { ok: true, value: {...}, error: undefined }
```

---

### After Phase 0.5

| API Level | Type | Fields | Status |
|-----------|------|--------|--------|
| Module | `Result<T, E>` | ok, value, error | ✅ All 14 modules unified |
| Universal | - | - | ❌ Not built |

**New module parsers**:

```typescript
Parse.Animation.parse("100ms")       // ✅ NEW
Parse.Transition.parse("ease-in")    // ✅ NEW
Parse.Shadow.parse("2px 2px black")  // ✅ NEW
// ... 7 modules total
```

---

### After Phase 1 (Future Vision)

| API Level | Type | Fields | Status |
|-----------|------|--------|--------|
| Module | `Result<T, E>` | ok, value, error | ✅ Unchanged |
| Universal | `ParseResult` | ok, value, property, issues | ✅ NEW! |

**Universal API**:

```typescript
parse("color: #ff0000")
// → ParseResult
// → { ok: true, value: {...}, property: "color", issues: [] }

parse("margin: 10px")  // Shorthand error
// → { ok: false, property: "margin", issues: [{
//     severity: "error",
//     message: "Shorthand not supported",
//     suggestion: "Use margin-top, margin-right, margin-bottom, margin-left",
//     action: 'const { marginTop, ... } = b_short.expand("margin: 10px")'
//   }]}
```

---

## ✅ Action Items

**For NOW (Phase 0.5)**:
1. ✅ Use `Result<T, E>` (existing type)
2. ✅ Simple error strings
3. ❌ **NO `issues` field**
4. ❌ **NO `property` field**
5. ✅ Module API only (value parameter)

**For LATER (Phase 1)**:
1. Define `ParseResult` type (with issues)
2. Implement universal parse/generate
3. Decide: Upgrade module API to use issues?
4. Decide: Generator return type?
5. Update documentation

---

**Current Status**: In design mode for Phase 0.5. Using `Result<T, E>` without `issues` field. 🎨
