# ADR-001: Convenience API Layer for Progressive Disclosure

**Status**: ✅ Approved
**Date**: 2025-10-19
**Deciders**: Development Team
**Category**: API Design
**Priority**: High

---

## Context and Problem Statement

b_value is being extracted from b_gee to serve as a standalone CSS value parser/generator library. The library currently has an expert-level API that requires users to know the exact format of CSS values ahead of time:

```typescript
// Current: User must know it's RGB format
import * as Parse from 'b_value/parse';
const rgb = Parse.Color.Rgb.parse("rgb(255 0 0)"); // What if input is hex? Breaks!
```

This creates two problems:

1. **High barrier to entry**: Users must understand the internal structure before they can use the library
2. **b_gee migration complexity**: When b_gee transitions to using b_value internally, it would need to try multiple parsers or build wrapper functions

The question: Should b_value add a convenience API layer alongside the existing expert API?

---

## Decision Drivers

### 1. Extraction Context
- b_value was born FROM b_gee (not the reverse)
- Goal: Extract b_gee's value parsing into standalone library
- Future: b_gee will be gutted to use b_value internally
- Timeline: b_value must reach feature parity before b_gee migration

### 2. User Personas

**Persona A: Quick Integration (80% of users)**
- "I just need to parse a color, I don't care what format"
- Want simple API, auto-detection
- Used by: b_gee internals, build tools, CSS-in-JS libraries

**Persona B: Advanced Optimization (20% of users)**
- "I know it's hex and I need hex-specific behavior"
- Need granular control, specific format handling
- Used by: CSS optimizers, advanced tooling

### 3. Migration Requirements
When b_gee migrates to b_value:
- Must be easy to integrate
- Minimal refactoring required
- No trying multiple parsers manually

---

## Considered Options

### Option 1: Expert API Only (Status Quo)

```typescript
import * as Parse from 'b_value/parse';

// User must try all parsers
const rgb = Parse.Color.Rgb.parse(input);
const hex = Parse.Color.Hex.parse(input);
const hsl = Parse.Color.Hsl.parse(input);
// ... try all 12 formats?
```

**Pros**:
- Already implemented
- Maximum control for power users
- Explicit, no magic

**Cons**:
- ❌ High learning curve
- ❌ b_gee would need wrapper functions anyway
- ❌ Repetitive code for common use cases
- ❌ Barrier to adoption

### Option 2: Convenience API Only

```typescript
import { parseColor } from 'b_value';

// Auto-detects format
const color = parseColor(input);
```

**Pros**:
- Easy to use
- Auto-detection

**Cons**:
- ❌ Loses granular control
- ❌ No optimization for specific formats
- ❌ Throws away existing expert API
- ❌ Breaking change

### Option 3: Both APIs (Progressive Disclosure) ✅

```typescript
// Level 1: Convenience API (80% use case)
import { parseColor, generateColor } from 'b_value';
const color = parseColor("any format"); // Auto-detects!

// Level 2: Expert API (20% use case)
import * as Parse from 'b_value/parse';
const rgb = Parse.Color.Rgb.parse("rgb(255 0 0)"); // Specific control
```

**Pros**:
- ✅ Low barrier to entry (simple API)
- ✅ Preserves power for experts
- ✅ Makes b_gee migration trivial
- ✅ Non-breaking (additive only)
- ✅ Progressive disclosure principle
- ✅ Tree-shakeable (import only what you need)

**Cons**:
- Slightly larger API surface
- Need to document both patterns

---

## Decision

**We will implement Option 3: Both APIs (Progressive Disclosure)**

Add a convenience layer with auto-detecting functions alongside the existing expert API.

### API Structure

```typescript
// src/index.ts
// Level 1: Convenience API
export { parseColor, generateColor } from './convenience/color';
export { parseLength, generateLength } from './convenience/length';
export { parseAngle, generateAngle } from './convenience/angle';
export { parseTime, generateTime } from './convenience/time';
// ... etc for all value types

// Level 2: Expert API (unchanged)
export * as Parse from './parse';
export * as Generate from './generate';
export * as Type from './core/types';
```

### Implementation Pattern

```typescript
// src/convenience/color.ts
import * as ColorParsers from '../parse/color';
import type { Color } from '../core/types';
import { type Result, err } from '../core/result';

export function parseColor(input: string): Result<Color, string> {
  // Try parsers in order of likelihood
  const parsers = [
    ColorParsers.Hex,
    ColorParsers.Named,
    ColorParsers.Rgb,
    ColorParsers.Hsl,
    ColorParsers.Hwb,
    ColorParsers.Lab,
    ColorParsers.Lch,
    ColorParsers.Oklab,
    ColorParsers.Oklch,
    ColorParsers.ColorFunction,
    ColorParsers.System,
    ColorParsers.Special,
  ];

  for (const parser of parsers) {
    const result = parser.parse(input);
    if (result.ok) return result;
  }

  return err(`Unable to parse color: ${input}`);
}

export function generateColor(color: Color): string {
  switch (color.kind) {
    case "hex": return ColorGenerators.Hex.toCss(color);
    case "rgb": return ColorGenerators.Rgb.toCss(color);
    // ... handle all color types
  }
}
```

---

## Consequences

### Positive

1. **Easy b_gee Migration**

   ```typescript
   // b_gee can use simple delegation
   import { parseColor } from 'b_value';

   class BackgroundNode {
     getColor() {
       return parseColor(this.getProperty("background-color"));
     }
   }
   ```

2. **Low Barrier to Entry**
   - New users can be productive immediately
   - No need to learn internal structure upfront

3. **Progressive Disclosure**
   - Start simple, grow into expert mode naturally
   - Natural learning curve

4. **Non-Breaking**
   - Existing expert API unchanged
   - Additive only
   - Backward compatible

5. **Consistent with b_short**
   - b_short has simple `expand()` entry point
   - Now b_value has `parseColor()`, etc.
   - Familiar patterns across ecosystem

### Negative

1. **Slightly Larger API**
   - More functions to document
   - Two patterns to explain
   - Mitigation: Clear documentation structure (Quick Start → Advanced)

2. **Auto-Detection Performance**
   - Trying multiple parsers until success
   - Mitigation: Order parsers by likelihood, cache common patterns

3. **Maintenance**
   - Keep both APIs in sync
   - Mitigation: Convenience layer is thin wrapper, minimal code

---

## Implementation Plan

### Phase 1: Core Convenience Functions (Immediate)

Implement for most common value types:
- ✅ `parseColor` / `generateColor`
- `parseLength` / `generateLength`
- `parseAngle` / `generateAngle`
- `parseTime` / `generateTime`

### Phase 2: Extended Coverage (Near-term)

Add for compound types:
- `parseTransform` / `generateTransform`
- `parseClipPath` / `generateClipPath`
- `parseFilter` / `generateFilter`
- `parseShadow` / `generateShadow`
- `parseGradient` / `generateGradient`

### Phase 3: Polish (Before v1.0)

- Performance optimization (caching, parser ordering)
- Complete documentation
- Migration guide for b_gee
- Usage examples for both APIs

---

## Related Decisions

- None yet (first ADR)

---

## Success Metrics

- ✅ b_gee migration requires minimal refactoring
- ✅ New users can parse colors in < 2 minutes
- ✅ Expert API remains unchanged (no breaking changes)
- ✅ Bundle size impact < 5KB for convenience layer
- ✅ Auto-detection success rate > 99% for valid CSS

---

## References

### Documentation
- [API Design Evaluation](../archive/2025-10-19-color-function/API_DESIGN_EVALUATION.md)
- [Ecosystem Complete Analysis](../archive/2025-10-19-color-function/API_ECOSYSTEM_COMPLETE.md)
- [Corrected Understanding](../archive/2025-10-19-color-function/ECOSYSTEM_CORRECTED.md)

### Similar Patterns
- **b_short**: Simple `expand()` entry point
- **TypeScript**: Progressive type strictness (`any` → specific types)
- **Lodash**: Simple imports (`import { map }`) + full API
- **Camera**: Auto mode (80%) + Manual mode (20%)

### Ecosystem Context

```
b_short (shorthand expansion)
    ↓
b_value (value parsing) ← YOU ARE HERE
    ↓
b_gee (stylesheet IR)
    ↓
Studio (visual editor)
```

---

## Notes

### Why This Matters for b_gee

b_value was extracted FROM b_gee with the plan to eventually gut b_gee's internal parsing. The convenience API makes this migration smooth:

**Without convenience API:**

```typescript
// b_gee would need this complexity
class BackgroundNode {
  getColor() {
    const value = this.getProperty("background-color");
    // Try all 12 parsers manually? 😰
    const rgb = Parse.Color.Rgb.parse(value);
    if (rgb.ok) return rgb;
    const hex = Parse.Color.Hex.parse(value);
    if (hex.ok) return hex;
    // ... 10 more attempts
  }
}
```

**With convenience API:**

```typescript
// b_gee gets clean, simple code
class BackgroundNode {
  getColor() {
    return parseColor(this.getProperty("background-color")); // ✨
  }
}
```

This isn't just "nice to have" - it's **essential for making b_gee's migration smooth**.

---

## Review History

- 2025-10-19: Initial decision approved
- Next review: After Phase 1 implementation complete

---

## Decision Outcome

**Status**: ✅ Approved
**Implemented**: Partially (color convenience functions exist via dispatchers)
**Next Steps**:
1. Create dedicated convenience layer directory structure
2. Implement `parseColor()` and `generateColor()` as proof of concept
3. Extend to other value types
4. Update documentation with both API patterns
5. Create b_gee migration guide
