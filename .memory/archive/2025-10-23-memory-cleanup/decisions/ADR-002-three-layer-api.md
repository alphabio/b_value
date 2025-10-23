# ADR-002: Three-Layer API Architecture with ParseResult/GenerateResult

**Status**: ✅ **APPROVED**  
**Date**: 2025-10-21  
**Supersedes**: ADR-001  
**Deciders**: Development Team  
**Category**: API Design, Type System  
**Priority**: **CRITICAL** - Foundation for entire library

---

## Context and Problem Statement

After extracting b_value from b_gee and implementing basic parsers, we need a unified API architecture that supports three use cases:

1. **Expert Use** - Direct format access (hex, rgb, etc.)
2. **Module Use** - Auto-detection per value type (color, gradient, etc.)
3. **Universal Use** - Full CSS parsing (declarations, blocks, layers)

The previous ADR-001 called layer 2 "Convenience API" which was confusing. This ADR clarifies the architecture and introduces the **ParseResult/GenerateResult type system**.

**User's killer API requirement**:
```typescript
// Parse full CSS block with:
// - Multiple declarations (semicolon-separated)
// - Layer support (comma-separated values)
// - Property context tracking
const {ok, value, issues} = parse(`
  background-image: 
    linear-gradient(30deg, #445 12%, transparent),
    linear-gradient(150deg, #445 12%, transparent),
    none;
  background-position: 0% 0%, 0% 0%, 0 0;
  background-color: #556;
`);
```

This is the **Universal API** (Phase 1), but it requires solid foundations first.

---

## Decision Drivers

### 1. Progressive Disclosure
- Beginners: Start with Module API (`Parse.Color.parse("#fff")`)
- Intermediate: Use Universal API (`parse("color: #fff")`)
- Advanced: Drop to Expert API (`Parse.Color.Hex.parse("#fff")`)

### 2. Type Safety with Rich Errors
- Simple internal types (`Result<T, E>`)
- Rich public types (`ParseResult<T>`, `GenerateResult`)
- Errors with suggestions, warnings, property tracking

### 3. Foundation for Universal API
- Module API provides building blocks
- Universal API composes Module API
- No duplication, clean separation

### 4. Symmetry
- Parse and generate mirror each other
- Same result structure for both directions
- Predictable, learnable API

---

## Three-Layer Architecture

### Layer 1: Expert API (Specific Format Access)

**Current State**: Implemented  
**Purpose**: Maximum control, specific format handling

```typescript
import * as Parse from 'b_value/parse';

// Direct access to specific parsers
const hex = Parse.Color.Hex.parse("#ff0000");
const rgb = Parse.Color.Rgb.parse("rgb(255 0 0)");
const linear = Parse.Gradient.Linear.parse("linear-gradient(red, blue)");

// Specific generators
import * as Generate from 'b_value/generate';
const css = Generate.Color.Hex.toCss(hexIR);
```

**Use Cases**:
- Performance-critical code (skip auto-detection)
- Format-specific behavior (hex optimization)
- Advanced tooling (CSS minifiers)

**Status**: ✅ Exists and working

---

### Layer 2: Module API (Auto-Detection per Module)

**Target**: Phase 0.5 (THIS DECISION)  
**Purpose**: Auto-detect format within a value type

```typescript
import { Parse, Generate } from 'b_value';

// Auto-detects color format
const colorResult = Parse.Color.parse("#ff0000");
// → ParseResult<Color> - tries hex, rgb, hsl, named, etc.

const colorResult2 = Parse.Color.parse("rgb(255 0 0)");
// → ParseResult<Color> - same return type!

// Auto-detects gradient type
const gradResult = Parse.Gradient.parse("linear-gradient(red, blue)");
// → ParseResult<Gradient.Kinds> - tries linear, radial, conic

// Generate with validation
const css = Generate.Color.generate(colorIR);
// → GenerateResult - validates IR, generates CSS
```

**Return Types** (NEW!):
```typescript
export type ParseResult<T = unknown> = {
  ok: boolean           // Success flag
  value?: T             // IR object (present when ok=true)
  property?: string     // Property name (undefined for Module API)
  issues: Issue[]       // Errors, warnings, info
}

export type GenerateResult = {
  ok: boolean           // Success flag
  value?: string        // CSS string (present when ok=true)
  property?: string     // Property name (undefined for Module API)
  issues: Issue[]       // Errors, warnings, info
}

export type Issue = {
  severity: 'error' | 'warning' | 'info'
  message: string
  suggestion?: string   // "Did you mean rgb()?"
  action?: string       // Code snippet to fix
  location?: {          // Future: Phase 2
    offset: number
    length: number
  }
}
```

**Key Features**:
- ✅ Auto-detection within module (tries all formats)
- ✅ Rich error messages with suggestions
- ✅ Non-blocking warnings (legacy syntax, deprecations)
- ✅ Consistent return type across all modules
- ✅ Property field undefined (no declaration context yet)

**Implementation Pattern**:
```typescript
// src/parse/color/color.ts
export function parse(value: string): ParseResult<Type.Color> {
  // Try parsers in order of likelihood
  const hexResult = Hex.parse(value);
  if (hexResult.ok) return parseOk(hexResult.value);
  
  const namedResult = Named.parse(value);
  if (namedResult.ok) return parseOk(namedResult.value);
  
  const rgbResult = Rgb.parse(value);
  if (rgbResult.ok) return parseOk(rgbResult.value);
  
  // ... try all 12 formats
  
  return parseErr("No color format matched", {
    suggestion: "Expected hex (#fff), rgb(), hsl(), or named color"
  });
}
```

**Use Cases**:
- Quick integration (don't care about format)
- b_gee internals (just need the color)
- Build tools (parse whatever comes)
- 80% of users

**Modules to Implement** (Phase 0.5):
1. ✅ Color (12 formats) - Has `parse()`, needs ParseResult upgrade
2. ✅ ClipPath (10 shapes) - Has `parse()`, needs ParseResult upgrade
3. ✅ Filter (11 functions) - Has `parse()`, needs ParseResult upgrade
4. ✅ Gradient (6 types) - Has `parse()`, needs ParseResult upgrade
5. ⚠️ Animation (8 values) - Needs `parse()` + ParseResult
6. ⚠️ Transition (4 values) - Needs `parse()` + ParseResult
7. ⚠️ Shadow (2 types) - Needs `parse()` + ParseResult
8. ⚠️ Outline (3 values) - Needs `parse()` + ParseResult
9. ⚠️ Text (7 values) - Needs `parse()` + ParseResult
10. ⚠️ Background (5 values) - Needs `parse()` + ParseResult
11. ⚠️ Border (4 values) - Needs `parse()` + ParseResult

**Generate Modules** (Phase 0.5d):
- All 14 modules need `generate()` function with GenerateResult

**Status**: 🚧 In Progress (4/14 modules have parse, 0/14 have generate)

---

### Layer 3: Universal API (Full CSS Parsing)

**Target**: Phase 1 (FUTURE)  
**Purpose**: Parse complete CSS with declarations, layers, context

```typescript
import { parse, parseAll } from 'b_value';

// Parse single declaration
const result = parse("color: #ff0000");
// → ParseResult<Declaration>
// {
//   ok: true,
//   value: { property: "color", value: Color },
//   property: "color",  // ← NOW populated!
//   issues: []
// }

// Parse declaration with layers (comma-separated)
const bgResult = parse("background-image: gradient1, gradient2, none");
// → ParseResult<Declaration>
// {
//   ok: true,
//   value: { 
//     property: "background-image", 
//     value: [Gradient, Gradient, None]  // ← Array for layers!
//   },
//   property: "background-image",
//   issues: []
// }

// Parse multiple declarations (semicolon-separated)
const blockResult = parseAll(`
  background-image: linear-gradient(red, blue), none;
  background-position: 0% 0%, center;
  background-color: #556;
`);
// → ParseResult<Declaration[]>
// {
//   ok: true,
//   value: [
//     { property: "background-image", value: [Gradient, None] },
//     { property: "background-position", value: [Position, Position] },
//     { property: "background-color", value: Color }
//   ],
//   issues: []
// }
```

**Key Features**:
- ✅ Semicolon splitting (multiple declarations)
- ✅ Comma splitting (layers for background, etc.)
- ✅ Property-value splitting
- ✅ Property context tracking (property field populated)
- ✅ Property dispatch (route to correct Module API)
- ✅ Layer detection (know which properties support layers)

**Type System**:
```typescript
export type Declaration = {
  property: string
  value: CSSValue | CSSValue[]  // Array for layered properties
}

export type CSSValue = 
  | Color
  | Gradient
  | Length
  | Position
  | ClipPath
  | Filter
  // ... all IR types
```

**Implementation Strategy**:
```typescript
// Phase 1 USES Phase 0.5 Module API
function parse(declaration: string): ParseResult<Declaration> {
  // 1. Split "property: value"
  const {property, value} = splitDeclaration(declaration);
  
  // 2. Check if property supports layers
  if (isLayeredProperty(property)) {
    // Split by comma
    const layers = splitByComma(value);
    
    // 3. Route to appropriate Module API
    const results = layers.map(layer => {
      if (property === "background-image") {
        return Parse.Gradient.parse(layer);  // ← Phase 0.5!
      }
      // ... other property types
    });
    
    return {
      ok: true,
      value: { property, value: results.map(r => r.value) },
      property,
      issues: results.flatMap(r => r.issues)
    };
  }
  
  // Non-layered property
  if (property === "color") {
    const result = Parse.Color.parse(value);  // ← Phase 0.5!
    return {
      ...result,
      property  // Add property context
    };
  }
  
  // ... other properties
}
```

**Use Cases**:
- CSS-in-JS libraries (parse style objects)
- Build tools (process CSS blocks)
- Developer tools (CSS inspector)
- b_gee migration (parse full stylesheets)

**Layered Properties** (comma-separated values):
- `background-image`
- `background-position`
- `background-size`
- `background-repeat`
- `background-origin`
- `background-clip`
- `background-attachment`
- `animation-*` properties
- `transition-*` properties

**Status**: 📋 Planned (Phase 1)

---

## Decision: ParseResult/GenerateResult Type System

### Core Types (Phase 0.5a)

```typescript
// PUBLIC API - Exported from src/index.ts

export type ParseResult<T = unknown> = {
  /** Success flag */
  ok: boolean
  
  /** Parsed IR value (present when ok=true) */
  value?: T
  
  /** 
   * Property name from CSS declaration.
   * - Module API: Always undefined
   * - Universal API: Always present
   */
  property?: string
  
  /** 
   * Issues encountered (always present, empty array if none).
   * Can contain errors (blocking), warnings (non-blocking), or info.
   */
  issues: Issue[]
}

export type GenerateResult = {
  /** Success flag */
  ok: boolean
  
  /** Generated CSS string (present when ok=true) */
  value?: string
  
  /** Property name when generating declarations */
  property?: string
  
  /** Issues encountered */
  issues: Issue[]
}

export type Issue = {
  severity: 'error' | 'warning' | 'info'
  message: string
  suggestion?: string
  action?: string
  location?: {
    offset: number
    length: number
  }
}

// Helper functions
export function parseOk<T>(value: T, property?: string): ParseResult<T>
export function parseErr<T>(message: string, options?: {...}): ParseResult<T>
export function generateOk(value: string, property?: string): GenerateResult
export function generateErr(message: string, options?: {...}): GenerateResult
export function addIssue<T>(result: ParseResult<T>, issue: Issue): ParseResult<T>
export function withWarning<T>(result: ParseResult<T>, message: string): ParseResult<T>
export function combineResults<T>(results: ParseResult<T>[]): ParseResult<T[]>
```

### Internal Types (NOT exported)

```typescript
// INTERNAL - Stays in src/core/result.ts, NOT exported from index

export type Result<T, E = Error> =
  | { ok: true; value: T; error: undefined }
  | { ok: false; value: undefined; error: E }

export function ok<T>(value: T): Result<T, never>
export function err<E>(error: E): Result<never, E>
export function toParseResult<T>(result: Result<T, string>): ParseResult<T>
```

**Why Two Type Systems?**
- **Internal** (`Result<T, E>`): Fast, simple, proven - used by sub-parsers
- **Public** (`ParseResult<T>`): Rich, helpful, extensible - used by clients
- **Conversion at boundary**: Internal code stays fast, public API stays helpful
- **No confusion**: Only public types exported from main index

---

## API Examples

### Module API (Phase 0.5)

```typescript
import { Parse, Generate } from 'b_value';

// Parse with auto-detection
const result = Parse.Color.parse("#ff0000");

if (result.ok) {
  console.log(result.value);  // Color IR
  console.log(result.property);  // undefined (Module API)
  console.log(result.issues);  // [] (no issues)
} else {
  console.error(result.issues[0].message);
  console.log(result.issues[0].suggestion);  // Helpful hint!
}

// Success with warning
const legacyResult = Parse.Color.parse("rgb(255, 0, 0)");
// {
//   ok: true,
//   value: { kind: "rgb", r: 255, g: 0, b: 0, a: 1 },
//   issues: [{
//     severity: "warning",
//     message: "Legacy rgb() syntax with commas",
//     suggestion: "Modern syntax: rgb(255 0 0)"
//   }]
// }

// Generate with validation
const genResult = Generate.Color.generate(colorIR);
if (genResult.ok) {
  console.log(genResult.value);  // "#ff0000"
}
```

### Universal API (Phase 1 - Future)

```typescript
import { parse, parseAll } from 'b_value';

// Single declaration
const result = parse("color: #ff0000");
// {
//   ok: true,
//   value: { property: "color", value: Color },
//   property: "color",  // ← Populated!
//   issues: []
// }

// Layered declaration
const bgResult = parse("background-image: gradient1, gradient2");
// {
//   ok: true,
//   value: { 
//     property: "background-image",
//     value: [Gradient, Gradient]  // ← Array!
//   },
//   property: "background-image",
//   issues: []
// }

// Multiple declarations
const blockResult = parseAll(`
  background-image: linear-gradient(red, blue);
  background-color: #556;
`);
// {
//   ok: true,
//   value: [
//     { property: "background-image", value: [Gradient] },
//     { property: "background-color", value: Color }
//   ],
//   issues: []
// }
```

### Expert API (Unchanged)

```typescript
import * as Parse from 'b_value/parse';

// Direct format access (no auto-detection)
const hex = Parse.Color.Hex.parse("#ff0000");
// → Result<HexColor, string> (simple type)
```

---

## Implementation Phases

### Phase 0.5: Module API + Type System (10-12 hours)

**0.5a: Create Types** (1.5 hours)
- Add ParseResult<T>, GenerateResult, Issue to `src/core/result.ts`
- Add helper functions (parseOk, parseErr, generateOk, generateErr, etc.)
- Export public types from `src/index.ts`
- Do NOT export internal Result<T, E>
- Tests: 0 (no breaking changes)

**0.5b: Add Parse Modules** (3-4 hours)
- 7 modules need new `parse()` function
- Animation, Transition, Shadow, Outline, Text, Background, Border
- Each returns ParseResult<T>
- Tests: 50-70 new tests

**0.5c: Migrate Existing Parsers** (2 hours)
- 4 modules need upgrade to ParseResult
- Color, ClipPath, Filter, Gradient
- Change Result<T, E> → ParseResult<T>
- Add suggestions to errors
- Tests: 10-20 updated tests

**0.5d: Add Generate Modules** (3-4 hours)
- All 14 modules need `generate()` function
- Returns GenerateResult
- Structural validation only (check kind field)
- Tests: 50-70 new tests

**Total**: 10-12 hours, 110-160 tests

### Phase 1: Universal API (TBD - Future Session)

**Requirements**:
- Semicolon splitting (`parseAll()`)
- Comma splitting (layer detection)
- Property-value splitting
- Property dispatch (route to Module API)
- Declaration type system
- Layer support for 7+ properties

**Timeline**: 15-20 hours (needs separate planning session)

---

## Consequences

### Positive

1. **Clear Architecture**
   - Three distinct layers, each with purpose
   - Progressive disclosure (beginner → advanced)
   - No confusion about what to use when

2. **Rich Error System**
   - Suggestions help users fix problems
   - Warnings don't block parsing
   - Property tracking for context
   - Foundation for LSP/diagnostics

3. **Symmetry**
   - Parse and generate mirror each other
   - Same result structure
   - Predictable, learnable

4. **Foundation for Universal API**
   - Module API provides building blocks
   - Universal API composes cleanly
   - No duplication, clean separation

5. **b_gee Migration Ready**
   - Module API makes migration smooth
   - Universal API matches b_gee needs
   - Rich errors help debugging

6. **Non-Breaking**
   - Expert API unchanged
   - Additive only
   - Backward compatible

### Negative

1. **Larger API Surface**
   - Three layers to document
   - More functions to maintain
   - **Mitigation**: Clear documentation structure, progressive disclosure in docs

2. **Migration Cost**
   - 4 existing modules need upgrade
   - Breaking change (0.1.0 → 0.2.0)
   - **Mitigation**: Clear migration guide, early stage makes it acceptable

3. **Property Field Confusion**
   - When is it populated?
   - Module API: undefined
   - Universal API: present
   - **Mitigation**: Clear documentation, examples for both

4. **Location Tracking Not Yet Implemented**
   - Issue type has location field
   - Not populated in Phase 0.5
   - **Mitigation**: Optional field, implement in Phase 2

### Neutral

1. **Performance**
   - Module API tries multiple parsers (slower than Expert)
   - Generate validation adds ~0.02ms per call
   - Memory: ~120 bytes per result
   - **Impact**: Negligible (<1% of total time)

---

## Success Metrics

### Phase 0.5 (Module API)
- ✅ All 14 modules have unified `parse()` function
- ✅ All 14 modules have unified `generate()` function
- ✅ All return ParseResult<T> / GenerateResult
- ✅ Tests: 2406 → 2520-2570 (all passing)
- ✅ Zero TypeScript errors
- ✅ Documentation complete
- ✅ Migration guide for existing users

### Phase 1 (Universal API)
- ⏳ `parse()` and `parseAll()` functions work
- ⏳ Semicolon splitting works
- ⏳ Comma splitting for layers works
- ⏳ Property dispatch works
- ⏳ Declaration type system complete
- ⏳ b_gee can use for migration

---

## Related Decisions

- **ADR-001**: Superseded by this ADR (concept same, naming clarified)
- **Next**: ADR-003 will cover shorthand expansion integration (b_short + b_value)

---

## Alternatives Considered

### Alternative 1: Keep Result<T, E>, Add RichError
**Rejected**: No warnings, no property tracking, not extensible enough.

### Alternative 2: Throw Enhanced Errors
**Rejected**: No warnings, slow performance, anti-pattern for parsing.

### Alternative 3: Validation-Only (parse never fails)
**Rejected**: Wrong semantics, some inputs are genuinely invalid.

### Alternative 4: Discriminated Union (status: "success")
**Viable but rejected**: `ok: boolean` is more conventional (Rust, Zod).

### Alternative 5: Callback-Based API
**Rejected**: Awkward, hard to compose, against modern patterns.

**Conclusion**: Proposed design is best option.

---

## Ecosystem Comparison

| Library | Pattern | Match? |
|---------|---------|--------|
| **Rust Result<T, E>** | ok/err pattern | ✅ Yes |
| **TypeScript Diagnostics** | Multiple issues, severity, location | ✅ Yes |
| **Zod** | success/data, rich errors | ✅ Yes |
| **ESLint** | Multiple issues, severity | ✅ Yes |
| **PostCSS** | Throws on error, warnings separate | ❌ No |

Our design follows proven patterns from Rust, TypeScript, Zod, and ESLint.

---

## References

### Audit Documents
- [API Audit](../.memory/archive/2025-10-21-phase0.5-audit/API_AUDIT.md) - 47KB comprehensive analysis
- [Executive Summary](../.memory/archive/2025-10-21-phase0.5-audit/EXECUTIVE_SUMMARY.md) - Quick reference

### Previous Decisions
- ADR-001: Convenience API (superseded)

### Design Documents
- [MASTER_PLAN.md](../.memory/archive/2025-10-21-phase0.5-v2/MASTER_PLAN.md) - Phase 0.5 implementation plan
- [GENERATE_API_DESIGN.md](../.memory/archive/2025-10-21-phase0.5-v2/GENERATE_API_DESIGN.md) - Generate symmetry
- [UNIVERSAL_TYPE_DECISION.md](../.memory/archive/2025-10-21-phase0.5-v2/UNIVERSAL_TYPE_DECISION.md) - Type system rationale

---

## Notes

### Why Three Layers?

**Layer 1 (Expert)**: Already exists, proven, fast. Keep it.

**Layer 2 (Module)**: Essential for b_gee migration. Without it, b_gee would need to manually try all 12 color parsers. With it, clean one-line calls. This is what ADR-001 called "Convenience API" but "Module API" is clearer.

**Layer 3 (Universal)**: User's "killer API" requirement. Parse full CSS blocks with layers. Needs Layer 2 as foundation. Can't build this first.

### Property Field Semantics

The `property` field tracks CSS declaration context:

**Module API** (Layer 2):
```typescript
Parse.Color.parse("#ff0000")
// property: undefined (no declaration context)
```

**Universal API** (Layer 3):
```typescript
parse("color: #ff0000")
// property: "color" (from declaration)
```

This allows Universal API to provide better error messages:
- "Invalid value for 'background-color' property"
- "Property 'margin' is shorthand, use longhand properties"

### Layer Support

**Why comma-separated layers matter**:

```css
/* One property, three layers */
background-image:
  linear-gradient(red, blue),
  linear-gradient(green, yellow),
  none;
```

This is not:
- Three separate values (it's one property value)
- Simple comma splitting (need to respect function nesting)
- Optional feature (essential for real CSS)

**Implementation** (Phase 1):
```typescript
// Already have the utility!
import { splitNodesByComma } from '@/utils/split/nodes';

// Universal API uses it:
const layers = splitNodesByComma(parseCSS(value));
const results = layers.map(layer => Parse.Gradient.parse(layer));
```

---

## Review History

- 2025-10-21: Initial decision approved
- Next review: After Phase 0.5 complete

---

## Decision Outcome

**Status**: ✅ **APPROVED with 9/10 confidence**

**Ready to implement**:
1. Phase 0.5a: Create ParseResult/GenerateResult types (1.5 hours)
2. Phase 0.5b: Add parse() to 7 modules (3-4 hours)
3. Phase 0.5c: Migrate 4 existing modules (2 hours)
4. Phase 0.5d: Add generate() to 14 modules (3-4 hours)

**Deferred to Phase 1**:
- Universal API (`parse()`, `parseAll()`)
- Semicolon splitting
- Layer detection and comma splitting
- Declaration type system
- Property dispatch

**This ADR supersedes ADR-001** and provides the foundation for the entire library architecture.

---

**Next Steps**: Implement Phase 0.5a (create types) ✅
