# JSDoc Documentation Standard for b_value

**Date:** 2025-10-18  
**Status:** Standard established for Phase 2+  
**Applies to:** All public APIs and types

---

## Overview

This document defines the JSDoc documentation standard for b_value. All public functions, types, and modules must follow these guidelines to ensure consistent, comprehensive API documentation.

---

## Core Principles

1. **Document all public APIs** - Every exported function, type, interface, and module must have JSDoc
2. **Include examples** - Real-world usage examples help developers understand the API
3. **Link to specs** - Reference MDN and W3C specifications where applicable
4. **Be comprehensive** - Cover all parameters, return values, and edge cases
5. **Show error handling** - Demonstrate proper Result type usage

---

## Function Documentation Template

### Parse Functions

```typescript
/**
 * Parse a CSS [value type] into structured intermediate representation (IR).
 *
 * [Brief description of what the parser does, what syntax it supports]
 *
 * Supports all CSS [value type] syntax per [CSS Spec Reference]:
 * - [Feature 1]: description
 * - [Feature 2]: description
 * - [Feature N]: description
 *
 * @param css - CSS string containing [value type] function/value
 * @returns Result containing [Type] IR on success, or error message on failure
 *
 * @public
 *
 * @example
 * Simple example:
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Category.Type.parse("css-value-here");
 * if (result.ok) {
 *   console.log(result.value);
 * }
 * ```
 *
 * @example
 * [Feature 1] example:
 * ```typescript
 * const result = Parse.Category.Type.parse("example-with-feature-1");
 * if (result.ok) {
 *   console.log(result.value.feature1); // specific property
 * }
 * ```
 *
 * @example
 * Error handling:
 * ```typescript
 * const result = Parse.Category.Type.parse("invalid syntax");
 * if (!result.ok) {
 *   console.error(result.error); // Error message string
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/... | MDN: [value-type]}
 * @see {@link https://www.w3.org/... | W3C Spec: [Value Type]}
 */
export function parse(css: string): Result<Type, string> {
  // implementation
}
```

### Generate Functions

```typescript
/**
 * Generate a CSS [value type] string from intermediate representation (IR).
 *
 * Converts a [Type] IR object into a valid CSS [value-type] string.
 * Handles all [value-type] components: [list components].
 *
 * The generated CSS string is spec-compliant and can be used directly in CSS
 * properties like `[property1]`, `[property2]`, or `[propertyN]`.
 *
 * This function performs the inverse operation of `Parse.Category.Type.parse()`,
 * enabling bidirectional transformation between CSS and IR.
 *
 * @param ir - [Type] IR object to convert to CSS
 * @returns CSS [value-type] string
 *
 * @public
 *
 * @example
 * Simple example:
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Category.Type.toCss({
 *   kind: "type",
 *   // ... properties
 * });
 * console.log(css); // "expected-output"
 * ```
 *
 * @example
 * [Feature 1] example:
 * ```typescript
 * const css = Generate.Category.Type.toCss({
 *   kind: "type",
 *   feature1: "value",
 *   // ... properties
 * });
 * console.log(css); // "output-with-feature-1"
 * ```
 *
 * @example
 * Round-trip transformation (parse → generate):
 * ```typescript
 * import { Parse, Generate } from "b_value";
 *
 * const original = "css-value-here";
 * const parsed = Parse.Category.Type.parse(original);
 *
 * if (parsed.ok) {
 *   const generated = Generate.Category.Type.toCss(parsed.value);
 *   console.log(generated === original); // true - perfect round-trip!
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/... | MDN: [value-type]}
 * @see {@link https://www.w3.org/... | W3C Spec: [Value Type]}
 */
export function toCss(ir: Type): string {
  // implementation
}
```

---

## Type Documentation Template

```typescript
/**
 * [Brief description of the type].
 *
 * [Detailed description of what this type represents in CSS, its purpose,
 * and how it's used in the CSS specification.]
 *
 * Per [CSS Spec Name] specification.
 *
 * @see {@link https://developer.mozilla.org/... | MDN: [value-type]}
 * @see {@link https://www.w3.org/... | W3C Spec: [Value Type]}
 *
 * @example
 * Simple usage:
 * ```typescript
 * import type { Type } from "b_value/core/types";
 *
 * const example: Type = {
 *   property1: "value1",
 *   property2: "value2"
 * };
 * ```
 *
 * @example
 * [Use case 2]:
 * ```typescript
 * const example: Type = {
 *   // ... different configuration
 * };
 * ```
 *
 * @public
 */
export type TypeName = {
  /**
   * [Property description]
   * 
   * [Additional details about this property, constraints, defaults]
   */
  property1: string;
  
  /**
   * [Property description]
   * 
   * @default defaultValue
   */
  property2?: string;
};
```

---

## Module Documentation Template

### Top-Level Index (src/index.ts)

```typescript
/**
 * b_value - Bidirectional CSS value parser
 *
 * [Brief description of the package]
 *
 * @packageDocumentation
 *
 * @example
 * Parse CSS to IR:
 * ```typescript
 * import { Parse } from "b_value";
 * // ... example
 * ```
 *
 * @example
 * Generate IR to CSS:
 * ```typescript
 * import { Generate } from "b_value";
 * // ... example
 * ```
 *
 * @example
 * Round-trip transformation:
 * ```typescript
 * import { Parse, Generate } from "b_value";
 * // ... example
 * ```
 */

/**
 * [Namespace description]
 *
 * [Detailed description of what this namespace provides]
 *
 * @example
 * ```typescript
 * import { Namespace } from "b_value";
 * // ... example
 * ```
 */
export * as Namespace from "./namespace";
```

### Category Index (src/parse/index.ts, src/generate/index.ts)

```typescript
/**
 * [Category] parsers/generators - [brief description]
 *
 * [Detailed description]
 *
 * @module Parse/Generate
 * @public
 *
 * @example
 * ```typescript
 * import { Parse/Generate } from "b_value";
 * // ... example
 * ```
 */

/**
 * [Subcategory description]
 *
 * @see {@link Subcategory.functionName}
 */
export * as Subcategory from "./subcategory";
```

### Value Type Index (src/parse/gradient/index.ts)

```typescript
/**
 * CSS [category] parsers/generators - convert [category] strings to/from IR.
 *
 * @module Parse.Category or Generate.Category
 * @public
 */

/**
 * Parse/Generate [specific type].
 *
 * @see {@link Type.parse} or {@link Type.toCss}
 */
export * as Type from "./type";
```

---

## Required Elements

### For All Public Functions

- [ ] One-line summary
- [ ] Detailed description
- [ ] `@param` for each parameter with description
- [ ] `@returns` with type and description
- [ ] `@public` tag
- [ ] At least 2 `@example` blocks with working code
- [ ] Error handling example (for parsers)
- [ ] Round-trip example (for generators)
- [ ] `@see` links to MDN and W3C specs

### For All Public Types

- [ ] One-line summary
- [ ] Detailed description
- [ ] Spec reference
- [ ] `@see` links to specs
- [ ] At least 1 `@example` block
- [ ] `@public` tag
- [ ] Property descriptions with JSDoc comments

### For All Modules

- [ ] Module-level JSDoc with `@module` tag
- [ ] Brief description
- [ ] Usage examples
- [ ] `@public` tag
- [ ] Export descriptions

---

## Example Patterns

### Multiple Examples Pattern

Always include multiple examples showing:
1. **Simple case** - Minimal working example
2. **Common features** - Most-used features (shape, size, position, etc.)
3. **Advanced features** - Color interpolation, explicit sizes, etc.
4. **Edge cases** - Repeating variants, complex combinations
5. **Error handling** - For parsers only
6. **Round-trip** - For generators, show bidirectionality

### Code Block Format

```typescript
/**
 * @example
 * [Description of what this example shows]:
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Gradient.Radial.parse("...");
 * if (result.ok) {
 *   console.log(result.value.property);
 * }
 * ```
 */
```

**Rules:**
- Start with descriptive text followed by colon
- Use proper imports (show full path from package)
- Include output as comments when helpful
- Keep examples concise but complete
- Show proper error handling for Result types

---

## Tag Usage

### Required Tags

- `@param` - For every parameter
- `@returns` - For return values
- `@public` / `@internal` - Visibility
- `@example` - Working code examples (minimum 2)

### Optional but Recommended Tags

- `@see` - Links to specs, related functions
- `@throws` - If function throws (we don't, we use Result)
- `@deprecated` - Mark deprecated APIs
- `@default` - Default values for optional parameters/properties
- `@module` - For index files

### Tags We Don't Use

- `@throws` - We use Result type instead
- `@author` - Package-level metadata
- `@version` - Package-level metadata
- `@since` - Not tracking this granularly

---

## Link Format

### MDN Links

```typescript
@see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient | MDN: radial-gradient()}
```

### W3C Spec Links

```typescript
@see {@link https://www.w3.org/TR/css-images-3/#radial-gradients | W3C Spec: Radial Gradients}
```

### Internal Links

```typescript
@see {@link Parse.Gradient.Radial.parse}
@see {@link Type.RadialGradient}
```

---

## Real Examples from b_value

### Excellent Parse Function JSDoc

See: `src/parse/gradient/radial.ts` - `parse()` function

Demonstrates:
- Comprehensive description
- Multiple examples covering different features
- Error handling example
- Proper imports shown in examples
- Links to specs

### Excellent Generate Function JSDoc

See: `src/generate/gradient/radial.ts` - `toCss()` function

Demonstrates:
- Clear inverse operation description
- Multiple examples for different features
- Round-trip example showing bidirectionality
- Property usage examples
- Links to specs

### Excellent Type JSDoc

See: `src/core/types/gradient/radial.ts` - `RadialGradient` type

Demonstrates:
- Detailed type description
- Multiple usage examples
- Property documentation
- Spec references

---

## Quality Checklist

Before committing new code, verify:

- [ ] All public functions have comprehensive JSDoc
- [ ] All examples are tested and work
- [ ] Import paths in examples are correct
- [ ] Result type usage is shown correctly
- [ ] Round-trip examples for generators
- [ ] Error handling examples for parsers
- [ ] Links to MDN and W3C specs
- [ ] Module-level documentation for index files
- [ ] Property descriptions for types
- [ ] No JSDoc linting errors

---

## TypeDoc Configuration

Our `typedoc.json` is configured to generate API documentation from JSDoc:

```json
{
  "entryPoints": ["src/index.ts"],
  "out": "docs",
  "excludePrivate": true,
  "excludeInternal": true,
  "readme": "README.md"
}
```

Generate docs with:
```bash
pnpm run docs:api
```

---

## Benefits of This Standard

1. **Consistency** - All APIs documented in same style
2. **Discoverability** - IDE hints show full usage examples
3. **Generated docs** - TypeDoc creates beautiful reference
4. **Onboarding** - New contributors understand patterns quickly
5. **Testing** - Examples serve as informal integration tests
6. **Quality** - Forces us to think about DX while coding

---

## Phase 2 Compliance

When implementing linear and conic gradients:

1. Copy JSDoc from radial gradient functions
2. Update descriptions for linear/conic specifics
3. Update examples to show linear/conic syntax
4. Update feature lists in descriptions
5. Keep the same structure and level of detail

**Goal:** Every Phase 2 function should have JSDoc equal to or better than Phase 1.

---

## Summary

**All public APIs must have:**
- Comprehensive JSDoc following this standard
- Multiple working examples
- Links to specifications
- Proper tag usage
- Clear descriptions

**This ensures:**
- Excellent developer experience
- Professional documentation
- Easy onboarding
- Clear API understanding

---

*Standard established: 2025-10-18*  
*Applies to: Phase 2 onwards*
