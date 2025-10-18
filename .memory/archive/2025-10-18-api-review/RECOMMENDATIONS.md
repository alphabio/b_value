# API Design Recommendations for Phase 2+

**Based on:** API Review (2025-10-18)  
**For:** Future phases of b_value development

---

## Core Principles (Maintain These)

### 1. Hierarchical Namespace Structure

```typescript
// ✅ GOOD - Clear hierarchy
Parse.Gradient.Radial.parse()
Parse.Color.Rgb.parse()
Parse.Position.TwoD.parse()

// ❌ BAD - Flat structure doesn't scale
Parse.parseRadialGradient()
Parse.parseRgbColor()
Parse.parsePosition2D()
```

### 2. Consistent Function Names

```typescript
// ✅ GOOD - Consistent naming
Parse.*.*.parse(css: string): Result<T, string>
Generate.*.*.toCss(ir: T): string

// ❌ BAD - Inconsistent naming
Parse.*.*.from()
Parse.*.*.parseCSS()
Generate.*.*.toString()
Generate.*.*.stringify()
```

### 3. Result Type for All Parsers

```typescript
// ✅ GOOD - Type-safe error handling
const result = Parse.Gradient.Linear.parse(css);
if (result.ok) {
  use(result.value);
} else {
  console.error(result.error);
}

// ❌ BAD - Throws or returns null
try {
  const value = Parse.Gradient.Linear.parse(css); // throws
} catch (e) { }

const value = Parse.Gradient.Linear.parse(css); // returns null
if (!value) { /* no error info */ }
```

### 4. Direct String Return for Generators

```typescript
// ✅ GOOD - Generation can't fail
const css: string = Generate.Gradient.Linear.toCss(ir);

// ❌ BAD - Unnecessary Result type
const result: Result<string, never> = Generate.Gradient.Linear.toCss(ir);
```

---

## Naming Patterns for Phase 2+

### Categories and Types

Follow this structure:

```
Parse/Generate
  ├── Gradient
  │   ├── Radial    ✅ (Phase 1)
  │   ├── Linear    🎯 (Phase 2)
  │   ├── Conic     🎯 (Phase 2)
  │   └── Direction 🎯 (Phase 2, helper)
  ├── Color
  │   ├── Rgb
  │   ├── Rgba
  │   ├── Hsl
  │   ├── Hsla
  │   ├── Hex
  │   └── Named
  ├── Position
  │   ├── TwoD
  │   └── ThreeD
  ├── Transform
  │   ├── Matrix
  │   ├── Translate
  │   ├── Rotate
  │   └── Scale
  └── ...
```

### File Structure

```
src/parse/[category]/[type].ts
src/generate/[category]/[type].ts
src/core/types/[category]/[type].ts
```

Examples:
```
src/parse/gradient/linear.ts
src/generate/gradient/linear.ts
src/core/types/gradient/linear.ts
```

### Module Exports

Every parser/generator module exports a single function:

```typescript
// src/parse/gradient/linear.ts
export function parse(css: string): Result<LinearGradient, string> { }

// src/generate/gradient/linear.ts
export function toCss(ir: LinearGradient): string { }
```

Index files aggregate:

```typescript
// src/parse/gradient/index.ts
export * as Radial from "./radial";
export * as Linear from "./linear";
export * as Conic from "./conic";
```

---

## Type Naming Conventions

### IR Types

```typescript
// PascalCase, descriptive
type RadialGradient = { ... }
type LinearGradient = { ... }
type ConicGradient = { ... }
type Position2D = { ... }
type ColorStop = { ... }
```

### Schema Names

```typescript
// camelCase + "Schema" suffix
const radialGradientSchema = z.object({ ... });
const linearGradientSchema = z.object({ ... });
const position2DSchema = z.object({ ... });
```

### Enum/Union Types

```typescript
// PascalCase for type, lowercase literals
type GradientShape = "circle" | "ellipse";
type GradientSize = "closest-side" | "farthest-corner" | /* ... */;
type ColorFormat = "rgb" | "rgba" | "hsl" | "hsla" | "hex" | "named";
```

---

## Error Handling Patterns

### Current Approach (Keep This)

```typescript
export function parse(css: string): Result<T, string> {
  try {
    // parsing logic
    return ok(value);
  } catch (e) {
    return err(`Failed to parse: ${String(e)}`);
  }
}
```

### Future Enhancement (Optional)

If string errors become limiting, consider:

```typescript
type ParseError = {
  code: string;
  message: string;
  position?: number;
  context?: string;
};

export function parse(css: string): Result<T, ParseError> { }
```

**Verdict:** Stick with string errors for now. Only add structure if users request it.

---

## Testing Patterns

### Every Parser/Generator Needs:

1. **Unit tests** (src/parse/[category]/[type].parse.test.ts)
   - Valid inputs
   - Invalid inputs (edge cases)
   - Boundary conditions

2. **Integration tests** (test/integration/[category]/[type].test.ts)
   - Round-trip (parse → generate → parse)
   - Multiple variations
   - Edge cases

### Test Structure

```typescript
// src/parse/gradient/linear.parse.test.ts
describe("Linear Gradient Parser", () => {
  describe("Valid inputs", () => {
    it("should parse simple gradient", () => { });
    it("should parse with direction", () => { });
    it("should parse with angle", () => { });
  });

  describe("Invalid inputs", () => {
    it("should fail on malformed syntax", () => { });
    it("should fail on invalid angle", () => { });
  });
});

// test/integration/gradient/linear.test.ts
describe("Linear Gradient - Round-Trip", () => {
  it("should round-trip simple gradient", () => {
    const original = "linear-gradient(red, blue)";
    const parsed = Parse.Gradient.Linear.parse(original);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      const generated = Generate.Gradient.Linear.toCss(parsed.value);
      expect(generated).toBe(original);
    }
  });
});
```

---

## Documentation Standards

### JSDoc for All Public Functions

```typescript
/**
 * Parse a linear gradient CSS value into structured IR.
 * 
 * @param css - CSS string like "linear-gradient(to right, red, blue)"
 * @returns Result containing LinearGradient IR or error message
 * 
 * @example
 * ```typescript
 * const result = parse("linear-gradient(to right, red, blue)");
 * if (result.ok) {
 *   console.log(result.value.direction); // "to right"
 * }
 * ```
 */
export function parse(css: string): Result<LinearGradient, string> { }
```

### Type Documentation

```typescript
/**
 * Intermediate representation of a linear gradient.
 * 
 * @property kind - Always "linear"
 * @property direction - Direction keyword or angle
 * @property colorStops - List of color stops with positions
 * @property repeating - Whether gradient repeats
 */
export type LinearGradient = {
  kind: "linear";
  direction: LinearDirection;
  colorStops: ColorStop[];
  repeating: boolean;
};
```

---

## File Organization

### Directory Structure

```
src/
├── core/
│   ├── types/
│   │   ├── gradient/
│   │   │   ├── radial.ts      ✅
│   │   │   ├── linear.ts      🎯
│   │   │   └── conic.ts       🎯
│   │   ├── color/
│   │   │   ├── rgb.ts
│   │   │   └── ...
│   │   └── ...
│   ├── units/
│   ├── keywords/
│   └── result.ts
├── parse/
│   ├── gradient/
│   │   ├── radial.ts          ✅
│   │   ├── linear.ts          🎯
│   │   └── conic.ts           🎯
│   └── ...
└── generate/
    ├── gradient/
    │   ├── radial.ts          ✅
    │   ├── linear.ts          🎯
    │   └── conic.ts           🎯
    └── ...
```

### Test Organization

```
test/
└── integration/
    ├── gradient/
    │   ├── radial.test.ts     ✅
    │   ├── linear.test.ts     🎯
    │   └── conic.test.ts      🎯
    └── ...

src/[module]/[file].test.ts    # Unit tests co-located
```

---

## Phase 2 Checklist

When implementing linear and conic gradients:

### For Each Value Type:

- [ ] Create type definition in `core/types/gradient/[type].ts`
- [ ] Create Zod schema in same file
- [ ] Export from `core/types/gradient/index.ts`
- [ ] Create parser in `parse/gradient/[type].ts`
  - [ ] Export `parse()` function
  - [ ] Return `Result<T, string>`
  - [ ] Write 8-12 unit tests
- [ ] Create generator in `generate/gradient/[type].ts`
  - [ ] Export `toCss()` function
  - [ ] Return `string`
  - [ ] Write 8-12 unit tests
- [ ] Export from index files
  - [ ] `parse/gradient/index.ts`
  - [ ] `generate/gradient/index.ts`
- [ ] Create integration tests
  - [ ] 8-12 round-trip tests in `test/integration/gradient/[type].test.ts`
- [ ] Add JSDoc to all exports
- [ ] Run quality gates
  - [ ] `just check` (format + typecheck + lint)
  - [ ] `just test` (all tests pass)
- [ ] Update README with examples
- [ ] Commit with conventional commit message

---

## Quality Gates (Never Skip)

After implementing any new parser/generator:

```bash
# 1. Type check
pnpm typecheck

# 2. Lint and format
pnpm lint
pnpm format

# 3. Run all tests
pnpm test

# 4. All-in-one check
just check && just test

# 5. Git status should be clean
git status
```

All must pass before committing.

---

## Anti-Patterns to Avoid

### ❌ Don't Break Naming Consistency

```typescript
// BAD - inconsistent naming
Parse.Gradient.Linear.parseLinearGradient()
Parse.Gradient.Radial.parse()
```

### ❌ Don't Add Unnecessary Abstraction

```typescript
// BAD - generic parser loses type safety
function parseValue(css: string, type: string): any

// GOOD - specific parsers maintain types
Parse.Gradient.Linear.parse(css): Result<LinearGradient, string>
```

### ❌ Don't Skip Tests

Every parser needs:
- Unit tests (parse valid/invalid inputs)
- Unit tests (generate from IR)
- Integration tests (round-trip)

### ❌ Don't Change Core Patterns

The Parse/Generate/Core structure is final. Don't introduce:
- New top-level namespaces
- Different function naming
- Alternative error handling

---

## Summary

**Keep doing:**
- Hierarchical namespaces (Parse.Category.Type.function)
- Result type for parsers
- Direct string return for generators
- Comprehensive testing (unit + integration)
- Consistent naming (parse/toCss)

**Start doing:**
- Add JSDoc to all new exports
- Document types with comments
- Update README with each phase

**Don't do:**
- Change naming patterns
- Skip tests
- Break existing API
- Add unnecessary complexity

---

The Phase 1 foundation is excellent. Following these patterns will ensure b_value remains consistent, maintainable, and production-ready through all future phases. 🚀
