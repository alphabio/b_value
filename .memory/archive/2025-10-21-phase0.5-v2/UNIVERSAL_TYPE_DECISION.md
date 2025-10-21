# DESIGN DECISION: Universal Result Type

**Date**: 2025-10-21T03:17:00
**Decision**: Create universal public API type, keep internal Result<T, E> for implementation
**Status**: 🎨 Design Mode - Finalize Type System

---

## 🎯 The Decision

**User's insight**: "We need a universal return type... internally we can use the existing types but the client should always receive a well known public API type"

**This is brilliant!** ✨

---

## 🏗️ Two-Layer Architecture

### Internal Layer (Implementation)

**Keep `Result<T, E>` for internal use**:
- Parsers use it internally
- Simple, proven, works well
- No breaking changes to codebase
- Fast implementation

```typescript
// INTERNAL - not exported to public API
type Result<T, E> =
  | { ok: true; value: T; error: undefined }
  | { ok: false; value: undefined; error: E };
```

---

### Public Layer (Client API)

**Create universal `ParseResult` for all public APIs**:
- Module API returns it
- Universal API returns it
- Consistent everywhere
- Rich error information

```typescript
// PUBLIC - this is what clients see
export type ParseResult<T = CSSValue> = {
  ok: boolean
  value?: T
  property?: string      // Present when parsing declarations
  issues: Issue[]        // Always present, empty array if no issues
}

export type Issue = {
  severity: 'error' | 'warning' | 'info'
  message: string
  suggestion?: string    // "Did you mean 'color'?"
  action?: string        // Code snippet to fix
  location?: {           // Where in input string
    offset: number
    length: number
  }
}
```

---

## 📋 API Surface

### Module-Level Parsers (Public)

```typescript
// All return ParseResult
Parse.Color.parse(value: string): ParseResult<Type.Color>
Parse.ClipPath.parse(value: string): ParseResult<Type.ClipPath>
Parse.Animation.parse(value: string): ParseResult<Type.Animation.Kinds>
Parse.Transition.parse(value: string): ParseResult<Type.Transition.Kinds>
// ... all 14 modules

// Sub-parsers also return ParseResult
Parse.Color.Hex.parse(value: string): ParseResult<Type.HexColor>
Parse.Color.Rgb.parse(value: string): ParseResult<Type.RgbColor>
```

**Examples**:

```typescript
// Success case
const result = Parse.Color.parse("#ff0000");
// {
//   ok: true,
//   value: { kind: "hex", r: 255, g: 0, b: 0, a: 1 },
//   property: undefined,  // Module doesn't know property
//   issues: []
// }

// Error case
const bad = Parse.Color.parse("not-a-color");
// {
//   ok: false,
//   value: undefined,
//   property: undefined,
//   issues: [{
//     severity: "error",
//     message: "No color format matched",
//     suggestion: "Expected hex (#fff), rgb(), hsl(), or named color"
//   }]
// }
```

---

### Universal Parsers (Public)

```typescript
// Parse full declaration
parse(declaration: string): ParseResult<CSSValue>

// Parse multiple declarations
parseAll(css: string): ParseResult<CSSValue>[]

// Examples
parse("color: #ff0000")
// {
//   ok: true,
//   value: { kind: "hex", ... },
//   property: "color",  // ← Universal API knows property
//   issues: []
// }

parse("margin: 10px")  // Shorthand error
// {
//   ok: false,
//   value: undefined,
//   property: "margin",
//   issues: [{
//     severity: "error",
//     message: "Shorthand property not supported",
//     suggestion: "Use longhand: margin-top, margin-right, margin-bottom, margin-left",
//     action: 'const expanded = b_short.expand("margin: 10px")'
//   }]
// }
```

---

## 🔧 Implementation Strategy

### Step 1: Create ParseResult type (Phase 0.5)

**In `src/core/result.ts`**, add:

```typescript
/**
 * Public API result type with rich error information.
 *
 * All public parse functions return this type for consistency.
 * Provides detailed error messages, suggestions, and optional property tracking.
 *
 * @public
 */
export type ParseResult<T = unknown> = {
  /** Success flag */
  ok: boolean

  /** Parsed value (present when ok=true) */
  value?: T

  /** Property name from declaration (when parsing "property: value") */
  property?: string

  /** Issues encountered (empty array if no issues) */
  issues: Issue[]
}

/**
 * Issue encountered during parsing.
 * Can be error (blocking), warning (non-blocking), or info (helpful hint).
 *
 * @public
 */
export type Issue = {
  /** Severity level */
  severity: 'error' | 'warning' | 'info'

  /** Human-readable error message */
  message: string

  /** Suggestion to fix the issue */
  suggestion?: string

  /** Code snippet showing how to fix */
  action?: string

  /** Location in input string */
  location?: {
    offset: number
    length: number
  }
}

/**
 * Create a successful ParseResult.
 *
 * @example
 * ```typescript
 * return parseOk(colorIR);
 * // { ok: true, value: colorIR, issues: [] }
 * ```
 *
 * @public
 */
export function parseOk<T>(value: T, property?: string): ParseResult<T> {
  return {
    ok: true,
    value,
    property,
    issues: []
  };
}

/**
 * Create an error ParseResult.
 *
 * @example
 * ```typescript
 * return parseErr("Invalid color", {
 *   suggestion: "Expected hex (#fff) or rgb()"
 * });
 * ```
 *
 * @public
 */
export function parseErr<T = never>(
  message: string,
  options?: {
    property?: string
    suggestion?: string
    action?: string
    location?: { offset: number, length: number }
    severity?: 'error' | 'warning' | 'info'
  }
): ParseResult<T> {
  return {
    ok: false,
    value: undefined,
    property: options?.property,
    issues: [{
      severity: options?.severity ?? 'error',
      message,
      suggestion: options?.suggestion,
      action: options?.action,
      location: options?.location
    }]
  };
}

/**
 * Convert internal Result<T, E> to public ParseResult<T>.
 *
 * @internal
 */
export function toParseResult<T>(
  result: Result<T, string>,
  property?: string
): ParseResult<T> {
  if (result.ok) {
    return parseOk(result.value, property);
  }
  return parseErr(result.error, { property });
}
```

---

### Step 2: Update Module Parsers (Phase 0.5)

**Each module's unified parser returns `ParseResult`**:

```typescript
// src/parse/animation/animation.ts
import { parseErr, parseOk, type ParseResult } from "@/core/result";
import type * as Type from "@/core/types";
import * as Delay from "./delay";
import * as Duration from "./duration";
// ... other imports

/**
 * Parse animation value with auto-detection.
 *
 * @public
 */
export function parse(value: string): ParseResult<Type.Animation.Kinds> {
  // Try delay (returns internal Result<T, E>)
  const delayResult = Delay.parse(value);
  if (delayResult.ok) {
    return parseOk(delayResult.value);
  }

  // Try duration
  const durationResult = Duration.parse(value);
  if (durationResult.ok) {
    return parseOk(durationResult.value);
  }

  // ... try other parsers

  // All failed
  return parseErr("No animation value parser matched", {
    suggestion: "Expected time (100ms), timing function (ease), name, direction, fill-mode, play-state, or iteration-count"
  });
}
```

**Sub-parsers can stay internal** (returning `Result<T, E>`), or we can wrap them:

```typescript
// Option 1: Keep internal Result<T, E>
Delay.parse(value: string): Result<AnimationDelay, string>

// Option 2: Also return ParseResult
Delay.parse(value: string): ParseResult<AnimationDelay>
```

**Decision needed**: Should sub-parsers return `ParseResult` or `Result<T, E>`?

**Recommendation**: Keep sub-parsers returning `Result<T, E>`, only unified `parse()` returns `ParseResult`.

---

### Step 3: Add Helper Functions

```typescript
// src/core/result.ts

/**
 * Add an issue to existing ParseResult.
 * Useful for warnings that don't block parsing.
 */
export function addIssue<T>(
  result: ParseResult<T>,
  issue: Issue
): ParseResult<T> {
  return {
    ...result,
    issues: [...result.issues, issue]
  };
}

/**
 * Add warning to successful result.
 */
export function withWarning<T>(
  result: ParseResult<T>,
  message: string,
  suggestion?: string
): ParseResult<T> {
  if (!result.ok) return result;
  return addIssue(result, {
    severity: 'warning',
    message,
    suggestion
  });
}

/**
 * Combine multiple results (for parseAll).
 */
export function combineResults<T>(
  results: ParseResult<T>[]
): ParseResult<T[]> {
  const values: T[] = [];
  const issues: Issue[] = [];

  for (const result of results) {
    if (result.ok && result.value) {
      values.push(result.value);
    }
    issues.push(...result.issues);
  }

  const hasErrors = issues.some(i => i.severity === 'error');

  if (hasErrors) {
    return { ok: false, value: undefined, issues };
  }

  return { ok: true, value: values, issues };
}
```

---

## 📊 Migration Path

### Phase 0.5a: Create ParseResult Type (1 hour)

1. Add `ParseResult`, `Issue`, `parseOk()`, `parseErr()` to `src/core/result.ts`
2. Add helper functions
3. Export from `src/index.ts`
4. Run `just check && just test` (no breaking changes)
5. Commit: `feat(core): add ParseResult type for public API`

---

### Phase 0.5b: Update Module Parsers (3-4 hours)

For each module (7 total):
1. Change unified `parse()` return type to `ParseResult<T>`
2. Convert internal `Result<T, E>` to `ParseResult<T>` using `parseOk()/parseErr()`
3. Add helpful suggestions to errors
4. Update tests to check `issues` array
5. Run `just check && just test`
6. Commit individually

**Example commit**:

```
feat(animation): return ParseResult from unified parse()

- Change return type from Result<T, E> to ParseResult<T>
- Add helpful suggestions to error messages
- Update tests to check issues array
- Backwards compatible (structure similar, issues field added)
```

---

### Phase 0.5c: Update Existing Modules (2 hours)

**Color, ClipPath, Filter, Gradient** already have `parse()` returning `Result<T, E>`.

**Options**:
1. **Update now** - Change to `ParseResult` for consistency
2. **Leave for now** - Update in Phase 1 when needed
3. **Deprecate old, add new** - Keep `parse()` returning `Result`, add `parseValue()` returning `ParseResult`

**Recommendation**: Update now for consistency, one commit per module.

---

## ✅ Benefits of This Approach

### For Implementation
- ✅ Keep internal `Result<T, E>` (proven, works)
- ✅ No refactoring existing parsers
- ✅ Just wrap at public API boundary
- ✅ Fast to implement

### For Clients
- ✅ **Single consistent type everywhere**
- ✅ Rich error messages with suggestions
- ✅ Can collect multiple issues
- ✅ Property tracking (when available)
- ✅ Helpful for debugging
- ✅ Great TypeScript autocomplete

### For Evolution
- ✅ Can add fields to `Issue` without breaking changes
- ✅ Can add `warnings` separate from `errors` later
- ✅ Can add `location` info when we parse it
- ✅ Foundation for LSP/diagnostics tooling

---

## 🎯 Final Type Definitions

```typescript
// src/core/result.ts

// ============================================================================
// PUBLIC API (exported)
// ============================================================================

/**
 * Result of parsing operation with rich error information.
 * This is the public API type returned by all parse functions.
 */
export type ParseResult<T = unknown> = {
  ok: boolean
  value?: T
  property?: string
  issues: Issue[]
}

export type Issue = {
  severity: 'error' | 'warning' | 'info'
  message: string
  suggestion?: string
  action?: string
  location?: { offset: number, length: number }
}

export function parseOk<T>(value: T, property?: string): ParseResult<T>
export function parseErr<T>(message: string, options?: {...}): ParseResult<T>
export function toParseResult<T>(result: Result<T, string>, property?: string): ParseResult<T>

// ============================================================================
// INTERNAL API (may keep as internal or also export)
// ============================================================================

/**
 * Simple result type for internal implementation.
 * Parsers can use this internally, then convert to ParseResult at API boundary.
 */
export type Result<T, E = Error> =
  | { ok: true; value: T; error: undefined }
  | { ok: false; value: undefined; error: E }

export function ok<T>(value: T): Result<T, never>
export function err<E>(error: E): Result<never, E>
```

---

## 🚀 Implementation Timeline

**Phase 0.5a** (1 hour):
- Create `ParseResult` type
- Add helper functions
- Export from public API
- Tests pass, no breaking changes

**Phase 0.5b** (3-4 hours):
- Update 7 module parsers to return `ParseResult`
- One module at a time
- Test after each
- Commit when green

**Phase 0.5c** (2 hours):
- Update 4 existing modules (Color, ClipPath, Filter, Gradient)
- Consistent API across all 14 modules
- Ready for Phase 1

**Total**: 6-7 hours (was 3-5 hours, but better quality)

---

## ✅ Approval Needed

Does this design work for you?

1. ✅ Universal `ParseResult` type for all public APIs
2. ✅ Internal `Result<T, E>` for implementation
3. ✅ Rich error messages with `issues` array
4. ✅ Consistent across all 14 modules
5. ✅ Foundation for Universal API (Phase 1)

**If approved, we'll implement Phase 0.5a first** (create the type), then tackle modules! 🎨
