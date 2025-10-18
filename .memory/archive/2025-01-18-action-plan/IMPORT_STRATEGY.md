# Import Strategy for b_value

## Philosophy

**Use relative imports consistently throughout the codebase.** No path aliases (`@/`), no absolute paths - just clean, explicit relative imports that TypeScript can resolve naturally.

## Rules

### 1. Core Modules (`src/core/`)

Core modules import from sibling/parent directories using relative paths:

```typescript
// src/core/types/gradient/radial.ts
import { z } from "zod";
import * as Keyword from "../../keywords";      // Up 2 levels to keywords/
import { colorStopListSchema } from "../color-stop";  // Sibling in types/
import { position2DSchema } from "../position";       // Sibling in types/
```

**Pattern for core:**
- Same level: `./filename`
- Parent level: `../filename` or `../folder/filename`
- Types importing keywords: `../../keywords`
- Types importing units: `../../units`
- Nested types (gradient/) importing parent types: `../typename`

### 2. Parse Modules (`src/parse/`)

Parsers import core modules and external dependencies:

```typescript
// src/parse/gradient/radial.ts
import type * as csstree from "css-tree";
import type { ColorInterpolationKeyword } from "../../core/keywords";
import { err, ok, type Result } from "../../core/result";
import type * as Type from "../../core/types";
import * as ColorStop from "./color-stop";  // Sibling parser
```

**Pattern for parse:**
- Core types: `../../core/types`
- Core keywords: `../../core/keywords`
- Core result: `../../core/result`
- Sibling parsers: `./filename`

### 3. Generate Modules (`src/generate/`)

Generators import core types (no need for keywords usually):

```typescript
// src/generate/gradient/radial.ts
import type * as Type from "../../core/types";
import * as ColorStop from "./color-stop";  // Sibling generator
```

**Pattern for generate:**
- Core types: `../../core/types`
- Sibling generators: `./filename`

### 4. Test Files

Tests import from parse and generate using relative paths:

```typescript
// src/parse/gradient/radial.parse.test.ts
import { describe, expect, it } from "vitest";
import * as RadialParser from "./radial";

// For round-trip or integration tests that need both:
import * as RadialGenerator from "../../generate/gradient/radial";
```

**Pattern for tests:**
- Test subject (same dir): `./filename`
- Generate modules: `../../generate/folder/filename`
- Parse modules: `../../parse/folder/filename`

### 5. Index Files (Re-exports)

Index files use relative imports to aggregate exports:

```typescript
// src/parse/gradient/index.ts
export * as ColorStop from "./color-stop";
export * as Radial from "./radial";
export * as Linear from "./linear";
export * as Conic from "./conic";
```

## Quick Reference Table

| From Location | To Location | Import Path |
|--------------|-------------|-------------|
| `src/core/types/gradient/radial.ts` | `src/core/keywords/` | `../../keywords` |
| `src/core/types/gradient/radial.ts` | `src/core/types/color-stop.ts` | `../color-stop` |
| `src/parse/gradient/radial.ts` | `src/core/types/` | `../../core/types` |
| `src/parse/gradient/radial.ts` | `src/core/result.ts` | `../../core/result` |
| `src/parse/gradient/radial.ts` | `src/parse/gradient/color-stop.ts` | `./color-stop` |
| `src/generate/gradient/radial.ts` | `src/core/types/` | `../../core/types` |
| `src/parse/gradient/radial.test.ts` | `src/parse/gradient/radial.ts` | `./radial` |
| `src/parse/gradient/radial.test.ts` | `src/generate/gradient/radial.ts` | `../../generate/gradient/radial` |

## Rationale

1. **Explicitness**: Clear where imports come from without magic paths
2. **Portability**: Works in any TypeScript environment without special config
3. **Refactor-friendly**: IDEs can rename/move files and update imports automatically
4. **No config needed**: No tsconfig paths, no build config, no bundler config

## Migration from @/ Aliases

If you encounter `@/` imports (from b_gee), convert them:

```bash
# Replace @/core/keywords with relative path
@/core/keywords → ../../core/keywords  (from parse/generate)
@/core/keywords → ../keywords          (from core/types)

# Replace @/core/types with relative path
@/core/types → ../../core/types        (from parse/generate)
@/core/types → ../types                (from core/)

# Replace @/core/units with relative path
@/core/units → ../../core/units        (from parse/generate)
@/core/units → ../units                (from core/types)

# Replace @/core/result
@/core/result → ../../core/result      (from parse/)
```

## Automated Fix Script

See `.memory/archive/2025-01-18-action-plan/fix-imports.sh` for automated conversion.

## External Dependencies

Always use bare imports for packages:

```typescript
import { z } from "zod";                    // ✅ Correct
import * as csstree from "css-tree";        // ✅ Correct
import { describe, expect, it } from "vitest";  // ✅ Correct
```

Never use relative paths for node_modules packages.
