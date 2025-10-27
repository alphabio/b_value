# ADR-004: Barrel Export Pattern (index.ts Files)

**Status**: ✅ **LOCKED** - DO NOT VIOLATE  
**Date**: 2025-10-21  
**Category**: Code Organization, File Structure  
**Priority**: **CRITICAL** - Consistency across entire codebase

---

## Decision

**index.ts files SHALL ONLY contain exports. NO logic, NO imports of dependencies.**

This is a **PERMANENT, NON-NEGOTIABLE** pattern. Do not deviate.

---

## The Pattern

### ✅ CORRECT (World-Class Pattern)

```typescript
// src/parse/color/index.ts

export { parse, parseNode } from "./color";  // ← Export parse function from color.ts

export * as Hex from "./hex";
export * as Rgb from "./rgb";
export * as Hsl from "./hsl";
// ... more sub-modules
```

```typescript
// src/parse/color/color.ts

import { parseErr, toParseResult, type ParseResult } from "@/core/result";
import * as Hex from "./hex";
import * as Rgb from "./rgb";
// ... imports

export function parse(value: string): ParseResult<Color> {
  // Logic here
  const hexResult = Hex.parse(value);
  if (hexResult.ok) return toParseResult(hexResult);
  // ...
}
```

```typescript
// src/parse/color/color.test.ts

import { parse } from "./color";  // ← Direct import for testing

describe("parse()", () => {
  // tests
});
```

### ❌ WRONG (What Was Done)

```typescript
// src/parse/animation/index.ts - WRONG!

import { parseErr, toParseResult } from "@/core/result";  // ← NO! Logic imports in barrel
import * as Duration from "./duration";  // ← NO! Dependency imports in barrel

export * as Duration from "./duration";  // ← This is fine

export function parse(value: string) {  // ← NO! Logic in barrel file
  const result = Duration.parse(value);
  // ...
}
```

---

## Why This Matters

### 1. Single Responsibility Principle
- **index.ts**: Re-export only
- **module.ts**: Contains module logic
- **module.test.ts**: Contains module tests

### 2. Consistency
- Every module follows same pattern
- Developers know exactly where to look
- No surprises, no confusion

### 3. Maintainability
- Clear separation of concerns
- Easy to navigate codebase
- Changes to logic don't touch export structure

### 4. Testability
- Direct imports for testing: `import { parse } from "./color"`
- No circular dependency risks
- Clean module boundaries

### 5. Developer Experience
- Predictable structure
- IDE navigation works perfectly
- Clear mental model

---

## File Structure Template

```
src/parse/<module>/
├── index.ts              ← Barrel exports ONLY
├── <module>.ts           ← parse() dispatcher function
├── <module>.test.ts      ← Tests for parse() dispatcher
├── sub-parser-1.ts       ← Individual sub-parsers
├── sub-parser-1.test.ts
├── sub-parser-2.ts
└── sub-parser-2.test.ts
```

### index.ts Template

```typescript
// b_path:: src/parse/<module>/index.ts

// Export main parse function
export { parse } from "./<module>";

// Export sub-modules
export * as SubModule1 from "./sub-module-1";
export * as SubModule2 from "./sub-module-2";
```

### module.ts Template

```typescript
// b_path:: src/parse/<module>/<module>.ts

import { parseErr, toParseResult, type ParseResult } from "@/core/result";
import type * as Type from "@/core/types/<module>";

import * as SubParser1 from "./sub-parser-1";
import * as SubParser2 from "./sub-parser-2";

export function parse(value: string): ParseResult<Type.Module> {
  const result1 = SubParser1.parse(value);
  if (result1.ok) return toParseResult(result1);
  
  const result2 = SubParser2.parse(value);
  if (result2.ok) return toParseResult(result2);
  
  return parseErr("Invalid <module> value", {
    suggestion: "Expected format1 or format2"
  });
}
```

---

## Enforcement

**Any PR that violates this pattern SHALL be rejected immediately.**

Red flags to watch for:
- ❌ Logic in index.ts
- ❌ Dependency imports in index.ts (except re-exports)
- ❌ Function definitions in index.ts (except re-exports)
- ❌ If statements, loops, or any control flow in index.ts

---

## Examples to Follow

✅ Perfect examples in codebase:
- `src/parse/color/` - 12 sub-parsers, clean barrel
- `src/parse/clip-path/` - 10 sub-parsers, clean barrel
- `src/parse/filter/` - 11 sub-parsers, clean barrel
- `src/parse/gradient/` - 6 sub-parsers, clean barrel

❌ DO NOT follow:
- The initial attempt at animation/transition/etc (being fixed)

---

## Status

**LOCKED** - This pattern is established and proven.

Do not discuss alternatives or "improvements". The pattern works.

---

**Last Updated**: 2025-10-21  
**Author**: Development Team  
**Review Date**: Never (pattern is permanent)
