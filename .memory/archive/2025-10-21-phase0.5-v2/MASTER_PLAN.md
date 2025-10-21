# MASTER PLAN: Phase 0.5 - Universal ParseResult API

**Created**: 2025-10-21T03:06:00
**Updated**: 2025-10-21T03:21:00
**Status**: 🎨 **AUTHORITATIVE - DESIGN APPROVED**
**Baseline**: 2406 tests passing, zero TypeScript errors
**Timeline**: 6-7 hours over 3 sub-phases

---

## ⭐ APPROVED DESIGN

**User decision**: "LOVE THIS: universal return type for clients, internal types for implementation"

**This document is now the authoritative source of truth for Phase 0.5 implementation.**

---

## 🎯 The Mission

### Create Universal Public API Type

**ALL public parse functions return `ParseResult<T>`**:

```typescript
// Module-level parsers
const {ok, value, property, issues} = Parse.Color.parse("#ff0000")
const {ok, value, property, issues} = Parse.Animation.parse("100ms")
const {ok, value, property, issues} = Parse.ClipPath.parse("circle(50%)")

// Universal parser (Phase 1 - future)
const {ok, value, property, issues} = parse("color: #ff0000")
```

**Key benefits**:
- ✅ Single consistent type across all 14 modules
- ✅ Rich error messages with suggestions
- ✅ Property tracking (when available)
- ✅ Warnings don't block parsing
- ✅ Foundation for Universal API (Phase 1)

---

## 🏗️ Two-Layer Architecture

### Internal Layer (Implementation)

**Keep existing `Result<T, E>` for internal use**:

```typescript
// INTERNAL - stays in codebase, used by sub-parsers
type Result<T, E> =
  | { ok: true; value: T; error: undefined }
  | { ok: false; value: undefined; error: E }

// Sub-parsers continue using this
Parse.Color.Hex.parse(value: string): Result<HexColor, string>
Parse.Animation.Delay.parse(value: string): Result<AnimationDelay, string>
```

**Why keep it**:
- ✅ Simple, proven, works well
- ✅ No refactoring needed
- ✅ Fast implementation
- ✅ No breaking changes

---

### Public Layer (Client API)

**Create new `ParseResult<T>` for all public APIs**:

```typescript
// PUBLIC - what clients import and use
export type ParseResult<T = unknown> = {
  ok: boolean           // Success flag
  value?: T             // Parsed value (present when ok=true)
  property?: string     // Property name (when parsing declarations)
  issues: Issue[]       // Always present, empty array if no issues
}

export type Issue = {
  severity: 'error' | 'warning' | 'info'
  message: string
  suggestion?: string    // "Did you mean 'color'?"
  action?: string        // Code snippet to fix
  location?: {
    offset: number
    length: number
  }
}
```

**Examples**:

```typescript
// Success with no issues
Parse.Color.parse("#ff0000")
// → { ok: true, value: {...}, property: undefined, issues: [] }

// Error with helpful suggestion
Parse.Color.parse("bad-color")
// → {
//     ok: false,
//     value: undefined,
//     property: undefined,
//     issues: [{
//       severity: "error",
//       message: "No color format matched",
//       suggestion: "Expected hex (#fff), rgb(), hsl(), or named color"
//     }]
//   }

// Success with warning (non-blocking)
Parse.Color.parse("rgb(255, 0, 0)")
// → {
//     ok: true,
//     value: {...},
//     issues: [{
//       severity: "warning",
//       message: "Legacy rgb() syntax",
//       suggestion: "Consider modern syntax: rgb(255 0 0)"
//     }]
//   }

// Universal API knows property
parse("color: #ff0000")
// → { ok: true, value: {...}, property: "color", issues: [] }
```

---

## 📋 Implementation Phases

### Phase 0.5a: Create ParseResult Type (1 hour)

**Goal**: Add new type system to `src/core/result.ts`

**Steps**:
1. Add `ParseResult<T>` type definition
2. Add `Issue` type definition
3. Add `parseOk()` helper function
4. Add `parseErr()` helper function
5. Add `toParseResult()` converter
6. Add utility functions (addIssue, withWarning, combineResults)
7. Export from `src/index.ts`
8. Run `just check && just test` (must pass - no breaking changes)
9. Commit: `feat(core): add ParseResult type for universal public API`

**Code to add**:

```typescript
// src/core/result.ts

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
 * // { ok: true, value: colorIR, property: undefined, issues: [] }
 *
 * return parseOk(colorIR, "color");
 * // { ok: true, value: colorIR, property: "color", issues: [] }
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
 * return parseErr("Invalid color");
 * // { ok: false, value: undefined, issues: [{ severity: "error", message: "Invalid color" }] }
 *
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

/**
 * Add an issue to existing ParseResult.
 * Useful for warnings that don't block parsing.
 *
 * @public
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
 *
 * @public
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
 *
 * @public
 */
export function combineResults<T>(
  results: ParseResult<T>[]
): ParseResult<T[]> {
  const values: T[] = [];
  const issues: Issue[] = [];

  for (const result of results) {
    if (result.ok && result.value !== undefined) {
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

**Success criteria**:
- [ ] Types defined in src/core/result.ts
- [ ] 7 helper functions created
- [ ] Exported from src/index.ts
- [ ] `just check` passes (0 TypeScript errors)
- [ ] `just test` passes (2406 tests)
- [ ] Committed with clear message

---

### Phase 0.5b: Create 7 Module Parsers (3-4 hours)

**Goal**: Add unified `parse()` to modules that lack it

**Modules** (in order of complexity):
1. **Shadow** (2 parsers) - 20 min
2. **Outline** (3 parsers) - 20 min
3. **Transition** (4 parsers) - 25 min
4. **Animation** (8 parsers) - 35 min
5. **Text** (7 parsers) - 30 min
6. **Background** (5 parsers) - 30 min
7. **Border** (4 parsers) - 30 min

**Per-module workflow**:

```bash
# 1. Create module.ts file with parse() function
touch src/parse/shadow/shadow.ts

# 2. Implement parse() returning ParseResult<T>
# (See pattern below)

# 3. Create tests
touch src/parse/shadow/shadow.test.ts

# 4. Export from index.ts
echo 'export { parse } from "./shadow";' >> src/parse/shadow/index.ts

# 5. Run checks
just check  # Must pass!

# 6. Run tests
just test   # Must pass!

# 7. Commit when green
git add -A
git commit -m "feat(shadow): add unified parse() returning ParseResult"
```

**Implementation pattern**:

```typescript
// src/parse/shadow/shadow.ts
import { parseErr, parseOk, type ParseResult } from "@/core/result";
import type * as Type from "@/core/types";
import * as BoxShadow from "./box-shadow";
import * as TextShadow from "./text-shadow";

/**
 * Parse shadow value with auto-detection.
 *
 * Tries to parse as box-shadow or text-shadow.
 * Both have same syntax, so just try both parsers.
 *
 * @param value - Shadow value string
 * @returns ParseResult with shadow IR or error
 *
 * @example
 * ```typescript
 * parse("2px 2px 4px black")  // Box or text shadow
 * parse("0 0 10px rgba(0,0,0,0.5)")
 * ```
 *
 * @public
 */
export function parse(value: string): ParseResult<Type.Shadow.Kinds> {
  // Try box-shadow
  const boxResult = BoxShadow.parse(value);
  if (boxResult.ok) {
    return parseOk(boxResult.value);
  }

  // Try text-shadow
  const textResult = TextShadow.parse(value);
  if (textResult.ok) {
    return parseOk(textResult.value);
  }

  // Both failed
  return parseErr("No shadow format matched", {
    suggestion: "Expected shadow syntax: <offset-x> <offset-y> <blur-radius>? <spread-radius>? <color>?"
  });
}
```

**Test pattern**:

```typescript
// src/parse/shadow/shadow.test.ts
import { describe, expect, test } from "vitest";
import { parse } from "./shadow";

describe("Shadow.parse()", () => {
  test("parses box-shadow", () => {
    const result = parse("2px 2px 4px black");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.kind).toBe("box-shadow");
      expect(result.issues).toEqual([]);
    }
  });

  test("parses text-shadow", () => {
    const result = parse("1px 1px 2px red");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.kind).toBe("text-shadow");
      expect(result.issues).toEqual([]);
    }
  });

  test("returns error for invalid value", () => {
    const result = parse("not-a-shadow");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues).toHaveLength(1);
      expect(result.issues[0].severity).toBe("error");
      expect(result.issues[0].message).toContain("No shadow format matched");
      expect(result.issues[0].suggestion).toBeDefined();
    }
  });
});
```

**Success criteria per module**:
- [ ] parse() function created
- [ ] Returns ParseResult<T>
- [ ] Helpful error suggestions
- [ ] 5-12 tests added
- [ ] Exported from index.ts
- [ ] `just check` passes
- [ ] `just test` passes
- [ ] Committed individually

---

### Phase 0.5c: Update 4 Existing Modules (2 hours)

**Goal**: Upgrade existing modules for consistency

**Modules**:
1. **Color** (12 formats) - 30 min
2. **ClipPath** (10 shapes) - 30 min
3. **Filter** (11 functions) - 30 min
4. **Gradient** (6 types) - 30 min

**What to change**:

```typescript
// BEFORE
export function parse(value: string): Result<Type.Color, string> {
  // ... implementation
  return err("No color format matched");
}

// AFTER
export function parse(value: string): ParseResult<Type.Color> {
  // ... implementation (mostly same)
  return parseErr("No color format matched", {
    suggestion: "Expected hex (#fff), rgb(), hsl(), or named color"
  });
}
```

**Changes needed**:
1. Change return type to `ParseResult<T>`
2. Change `err()` to `parseErr()` with suggestions
3. Change `ok()` to `parseOk()`
4. Update tests to check `issues` array
5. Run `just check && just test`
6. Commit individually

**Success criteria per module**:
- [ ] Return type changed to ParseResult<T>
- [ ] Helper suggestions added to errors
- [ ] Tests updated
- [ ] `just check` passes
- [ ] `just test` passes
- [ ] Committed: `refactor(module): return ParseResult for consistency`

---

## ✅ Final Success Criteria

**After Phase 0.5 complete**:

- [ ] ParseResult<T> type exists and is documented
- [ ] All 14 modules have unified `parse()` function
- [ ] All return ParseResult<T> consistently
- [ ] Rich error messages with suggestions
- [ ] ~60-80 new tests added
- [ ] Total tests: 2406 → 2470-2490
- [ ] Zero TypeScript errors
- [ ] Zero breaking changes
- [ ] All commits clean and atomic
- [ ] Documentation updated

**Result**: Foundation ready for Phase 1 (Universal API)

---

## 🎓 Critical Implementation Rules

### Type System Rules

1. ✅ **Public API returns `ParseResult<T>`**:

   ```typescript
   export function parse(value: string): ParseResult<Type.Animation.Kinds>
   ```

2. ✅ **Internal parsers can keep `Result<T, E>`**:

   ```typescript
   // Sub-parsers (not exported from index.ts)
   function parseDelay(value: string): Result<AnimationDelay, string>
   ```

3. ✅ **Convert at boundary**:

   ```typescript
   const delayResult = Delay.parse(value);  // Result<T, E>
   if (delayResult.ok) {
     return parseOk(delayResult.value);  // ParseResult<T>
   }
   ```

4. ❌ **Never use `any`**:

   ```typescript
   ParseResult<Type.Animation.Kinds>  // ✅ Good
   ParseResult<any>                   // ❌ Bad
   ```

---

### Error Message Rules

1. ✅ **Always provide suggestions**:

   ```typescript
   return parseErr("No color format matched", {
     suggestion: "Expected hex (#fff), rgb(), hsl(), or named color"
   });
   ```

2. ✅ **Property tracking when available**:

   ```typescript
   // Module doesn't know property
   return parseOk(value);  // property: undefined

   // Universal API knows property
   return parseOk(value, "color");  // property: "color"
   ```

3. ✅ **Issues always present**:

   ```typescript
   // Success
   { ok: true, value: {...}, issues: [] }  // Empty array

   // Error
   { ok: false, issues: [{...}] }  // Has issues
   ```

---

### Testing Rules

1. ✅ **Test success case**:

   ```typescript
   test("parses valid value", () => {
     const result = parse("100ms");
     expect(result.ok).toBe(true);
     if (result.ok) {
       expect(result.value.kind).toBe("animation-delay");
       expect(result.issues).toEqual([]);
     }
   });
   ```

2. ✅ **Test error case**:

   ```typescript
   test("returns error with suggestion", () => {
     const result = parse("invalid");
     expect(result.ok).toBe(false);
     if (!result.ok) {
       expect(result.issues).toHaveLength(1);
       expect(result.issues[0].severity).toBe("error");
       expect(result.issues[0].suggestion).toBeDefined();
     }
   });
   ```

3. ✅ **Test each sub-parser path**:

   ```typescript
   test("parses delay", () => { ... });
   test("parses duration", () => { ... });
   test("parses timing function", () => { ... });
   ```

---

### Workflow Rules

1. ✅ **One module at a time**
2. ✅ **Run `just check` after each file created**
3. ✅ **Run `just test` before commit**
4. ✅ **Commit only when green**
5. ✅ **Clear commit messages**:
   - Phase 0.5a: `feat(core): add ParseResult type for universal public API`
   - Phase 0.5b: `feat(shadow): add unified parse() returning ParseResult`
   - Phase 0.5c: `refactor(color): return ParseResult for consistency`

---

## 📊 Estimated Timeline

| Phase | Task | Duration | Tests Added |
|-------|------|----------|-------------|
| 0.5a | Create ParseResult type | 1 hour | 0 (no breaking change) |
| 0.5b | 7 new module parsers | 3-4 hours | 50-70 tests |
| 0.5c | 4 existing modules | 2 hours | 10-20 tests |
| **Total** | **Complete Phase 0.5** | **6-7 hours** | **60-90 tests** |

**Final stats**:
- Tests: 2406 → 2470-2500
- TypeScript errors: 0
- Modules unified: 14/14
- Public API: Consistent ParseResult<T>

---

## 🚀 Getting Started

### Step 1: Implement Phase 0.5a

```bash
# 1. Open result.ts
code src/core/result.ts

# 2. Add ParseResult type and helpers (see Phase 0.5a section)

# 3. Export from public API
code src/index.ts
# Add: export type { ParseResult, Issue } from "./core/result"
# Add: export { parseOk, parseErr, toParseResult, addIssue, withWarning } from "./core/result"

# 4. Verify baseline
just check && just test

# 5. Commit
git add -A
git commit -m "feat(core): add ParseResult type for universal public API"
```

### Step 2: Implement Phase 0.5b (Shadow module first)

```bash
# Follow the pattern in "Phase 0.5b" section
# Start with Shadow (simplest - 2 parsers)
```

---

## 📚 Reference Documentation

### Key Files

- **Type definitions**: `src/core/result.ts`
- **Type exports**: `src/index.ts`
- **Pattern example**: `src/parse/color/color.ts` (after Phase 0.5c)

### Key Types

```typescript
// Public API
ParseResult<T>           // Universal result type
Issue                    // Error/warning/info details

// Helpers
parseOk<T>()            // Create success result
parseErr<T>()           // Create error result
toParseResult<T>()      // Convert Result → ParseResult
addIssue<T>()           // Add issue to result
withWarning<T>()        // Add warning to success
combineResults<T>()     // Merge multiple results

// Internal (still exists)
Result<T, E>            // Simple success/error type
ok<T>()                 // Create success
err<E>()                // Create error
```

---

## ✅ Approval Status

**User**: "LOVE THIS: update status / master plan / docs / make this authoritative"

**Status**: ⭐ **APPROVED AND AUTHORITATIVE**

This document is the single source of truth for Phase 0.5 implementation.

---

**Ready to implement Phase 0.5a** (create ParseResult type)! 🚀
