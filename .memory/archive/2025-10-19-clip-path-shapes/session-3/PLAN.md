# Session 3 Plan: inset() Basic Shape Function

**Date**: 2025-10-19  
**Estimated Time**: 45-60 minutes  
**Complexity**: MEDIUM  
**Status**: Ready to start

---

## Goal

Implement the `inset()` basic shape function for clip-path with:
- TRBL (top/right/bottom/left) syntax with 1-4 values
- Optional border-radius with `round` keyword
- Reusable utilities extracted to `utils/`

---

## Prerequisites

✅ **Read First**: `DRY_ANALYSIS.md` in this directory  
✅ **Baseline**: 1932 tests passing (verified)  
✅ **MDM Schema**: Validated from `/Users/alphab/Dev/LLM/DEV/mdm-data/css/syntaxes.json`

---

## Syntax Reference

### inset() Function (from MDM)
```
inset( <length-percentage>{1,4} [ round <'border-radius'> ]? )
```

### Examples
```css
/* Single value - all sides */
clip-path: inset(10px);

/* Two values - vertical | horizontal */
clip-path: inset(10px 20px);

/* Three values - top | horizontal | bottom */
clip-path: inset(10px 20px 30px);

/* Four values - top | right | bottom | left */
clip-path: inset(10px 20px 30px 40px);

/* With rounded corners */
clip-path: inset(10px round 5px);

/* With elliptical rounded corners */
clip-path: inset(10px round 5px / 10px);

/* Complex example */
clip-path: inset(10% 20% 30% 40% round 5px 10px);
```

---

## Implementation Phases

### Phase 1: TRBL Utility (~15 min)

**Goal**: Create reusable utility for parsing CSS 1-4 value syntax (TRBL pattern)

#### 1.1 Add `parseTRBLLengthPercentage` to `src/utils/parse/nodes.ts`

```typescript
/**
 * Parse CSS 4-value syntax (top, right, bottom, left).
 *
 * Accepts 1-4 length-percentage values following CSS 4-value expansion:
 * - 1 value: all sides
 * - 2 values: vertical | horizontal
 * - 3 values: top | horizontal | bottom
 * - 4 values: top | right | bottom | left (clockwise)
 *
 * Commonly used by margin, padding, inset(), scroll-margin, etc.
 *
 * @param nodes - Array of 1-4 CSS nodes
 * @returns Result with TRBL values or error
 *
 * @example
 * ```typescript
 * // Parse "10px 20px"
 * const result = parseTRBLLengthPercentage([node1, node2]);
 * // { top: 10px, right: 20px, bottom: 10px, left: 20px }
 * ```
 */
export function parseTRBLLengthPercentage(
	nodes: csstree.CssNode[],
): Result<
	{
		top: Type.LengthPercentage;
		right: Type.LengthPercentage;
		bottom: Type.LengthPercentage;
		left: Type.LengthPercentage;
	},
	string
> {
	// Validate count
	if (nodes.length < 1 || nodes.length > 4) {
		return err(`Expected 1-4 length-percentage values, got ${nodes.length}`);
	}

	// Parse all values
	const values: Type.LengthPercentage[] = [];
	for (const node of nodes) {
		// Handle unitless zero
		if (node.type === "Number") {
			const val = Number.parseFloat(node.value);
			if (val !== 0) {
				return err("Unitless values must be zero");
			}
			values.push({ value: 0, unit: "px" });
			continue;
		}

		// Parse length-percentage
		const result = parseLengthPercentageNode(node);
		if (!result.ok) {
			return err(result.error);
		}
		values.push(result.value);
	}

	// Expand per CSS 4-value syntax
	switch (values.length) {
		case 1:
			return ok({
				top: values[0],
				right: values[0],
				bottom: values[0],
				left: values[0],
			});
		case 2:
			return ok({
				top: values[0],
				right: values[1],
				bottom: values[0],
				left: values[1],
			});
		case 3:
			return ok({
				top: values[0],
				right: values[1],
				bottom: values[2],
				left: values[1],
			});
		case 4:
			return ok({
				top: values[0],
				right: values[1],
				bottom: values[2],
				left: values[3],
			});
		default:
			return err("Invalid number of values");
	}
}
```

#### 1.2 Add Tests

**File**: Create `src/utils/parse/nodes.test.ts`

**Test Cases**:
- ✅ Single value: `["10px"]` → all sides 10px
- ✅ Two values: `["10px", "20px"]` → vertical 10px, horizontal 20px
- ✅ Three values: `["10px", "20px", "30px"]` → top 10px, h 20px, bottom 30px
- ✅ Four values: `["10px", "20px", "30px", "40px"]` → TRBL
- ✅ Mixed units: `["10px", "50%", "2em", "0"]`
- ✅ Unitless zero: `["0", "10px"]`
- ❌ Empty array: Error
- ❌ More than 4 values: Error
- ❌ Invalid values: Error
- ❌ Unitless non-zero: Error

**Pattern**: Use existing test pattern from other utils tests

---

### Phase 2: Border-Radius Shorthand Utility (~10 min)

**Goal**: Parse full border-radius shorthand syntax for inset()

**Note**: For initial implementation, we'll support simplified syntax (1-4 values, no elliptical).
Full elliptical support (with `/`) can be added in a follow-up if needed.

#### 2.1 Add `parseBorderRadiusShorthand` to `src/utils/parse/nodes.ts`

```typescript
/**
 * Parse border-radius shorthand syntax (simplified).
 *
 * Accepts 1-4 non-negative length-percentage values.
 * Uses same TRBL expansion as margins/padding:
 * - 1 value: all corners
 * - 2 values: top-left/bottom-right | top-right/bottom-left
 * - 3 values: top-left | top-right/bottom-left | bottom-right
 * - 4 values: top-left | top-right | bottom-right | bottom-left (clockwise from top-left)
 *
 * Note: This simplified version doesn't support elliptical corners (/ syntax).
 * That can be added later if needed.
 *
 * @param nodes - Array of 1-4 CSS nodes
 * @returns Result with border-radius corners or error
 */
export function parseBorderRadiusShorthand(
	nodes: csstree.CssNode[],
): Result<
	{
		topLeft: Type.LengthPercentage;
		topRight: Type.LengthPercentage;
		bottomRight: Type.LengthPercentage;
		bottomLeft: Type.LengthPercentage;
	},
	string
> {
	// Validate count
	if (nodes.length < 1 || nodes.length > 4) {
		return err(`Expected 1-4 border-radius values, got ${nodes.length}`);
	}

	// Parse all values
	const values: Type.LengthPercentage[] = [];
	for (const node of nodes) {
		// Handle unitless zero
		if (node.type === "Number") {
			const val = Number.parseFloat(node.value);
			if (val !== 0) {
				return err("Unitless values must be zero");
			}
			values.push({ value: 0, unit: "px" });
			continue;
		}

		// Parse length-percentage
		const result = parseLengthPercentageNode(node);
		if (!result.ok) {
			return err(result.error);
		}

		// Validate non-negative
		if (result.value.value < 0) {
			return err("border-radius values must be non-negative");
		}

		values.push(result.value);
	}

	// Expand per CSS 4-value syntax (clockwise from top-left)
	switch (values.length) {
		case 1:
			return ok({
				topLeft: values[0],
				topRight: values[0],
				bottomRight: values[0],
				bottomLeft: values[0],
			});
		case 2:
			return ok({
				topLeft: values[0],
				topRight: values[1],
				bottomRight: values[0],
				bottomLeft: values[1],
			});
		case 3:
			return ok({
				topLeft: values[0],
				topRight: values[1],
				bottomRight: values[2],
				bottomLeft: values[1],
			});
		case 4:
			return ok({
				topLeft: values[0],
				topRight: values[1],
				bottomRight: values[2],
				bottomLeft: values[3],
			});
		default:
			return err("Invalid number of values");
	}
}
```

#### 2.2 Add Tests

**File**: `src/utils/parse/nodes.test.ts`

**Test Cases**:
- ✅ Single value: all corners same
- ✅ Two values: diagonal corners
- ✅ Three values: top-left, diagonals, bottom-right
- ✅ Four values: all different
- ✅ Unitless zero
- ❌ Negative values: Error
- ❌ Too many values: Error

---

### Phase 3: IR Types (~5 min)

**Goal**: Define TypeScript IR types for inset()

#### 3.1 Add to `src/core/types/clip-path.ts`

```typescript
import type { LengthPercentage } from "./length-percentage";

/**
 * Border-radius shorthand for inset() shapes.
 *
 * Simplified version without elliptical corners.
 * All corners use same radius for horizontal and vertical.
 */
export type InsetBorderRadius = {
	topLeft: LengthPercentage;
	topRight: LengthPercentage;
	bottomRight: LengthPercentage;
	bottomLeft: LengthPercentage;
};

/**
 * inset() basic shape function.
 *
 * Defines an inset rectangle by specifying offsets from each edge.
 * Optionally accepts rounded corners via border-radius syntax.
 *
 * Syntax: inset( <length-percentage>{1,4} [ round <border-radius> ]? )
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/inset}
 */
export const clipPathInsetSchema = z.object({
	kind: z.literal("clip-path-inset"),
	top: lengthPercentageSchema,
	right: lengthPercentageSchema,
	bottom: lengthPercentageSchema,
	left: lengthPercentageSchema,
	borderRadius: z
		.object({
			topLeft: lengthPercentageSchema,
			topRight: lengthPercentageSchema,
			bottomRight: lengthPercentageSchema,
			bottomLeft: lengthPercentageSchema,
		})
		.optional(),
});

export type ClipPathInset = z.infer<typeof clipPathInsetSchema>;
```

#### 3.2 Update `ClipPathValue` union

```typescript
export type ClipPathValue = 
  | Url 
  | ClipPathNone 
  | ClipPathGeometryBox 
  | ClipPathInset;  // ADD THIS
```

---

### Phase 4: Parser (~15 min)

**Goal**: Implement inset() parser

#### 4.1 Create `src/parse/clip-path/inset.ts`

```typescript
// b_path:: src/parse/clip-path/inset.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as AstUtils from "@/utils/ast";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse CSS inset() function for clip-path.
 *
 * Accepts 1-4 length-percentage values for inset offsets (TRBL),
 * optionally followed by 'round' keyword and border-radius values.
 *
 * Syntax: inset( <length-percentage>{1,4} [ round <border-radius> ]? )
 *
 * @param css - CSS inset() function (e.g., "inset(10px round 5px)")
 * @returns Result with ClipPathInset IR or error message
 *
 * @example
 * Simple inset:
 * ```typescript
 * const result = parse("inset(10px)");
 * // { kind: "clip-path-inset", top: 10px, right: 10px, bottom: 10px, left: 10px }
 * ```
 *
 * @example
 * With border-radius:
 * ```typescript
 * const result = parse("inset(10px 20px round 5px)");
 * // { kind: "clip-path-inset", top: 10px, right: 20px, ..., borderRadius: { ... } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/inset | MDN: inset()}
 */
export function parse(css: string): Result<Type.ClipPathInset, string> {
	try {
		// Parse CSS
		const astResult = AstUtils.parseCssString(css);
		if (!astResult.ok) {
			return err(astResult.error);
		}

		// Find inset() function
		const fnResult = AstUtils.findFunctionNode(astResult.value, "inset");
		if (!fnResult.ok) {
			return err(fnResult.error);
		}

		// Get function arguments
		const args = AstUtils.parseFunctionArguments(fnResult.value);

		if (args.length === 0) {
			return err("inset() requires at least one value");
		}

		// Find 'round' keyword (if present)
		const roundIndex = args.findIndex(
			(node) => node.type === "Identifier" && node.name.toLowerCase() === "round",
		);

		// Parse TRBL values (before 'round' or all args if no 'round')
		const trblNodes = roundIndex !== -1 ? args.slice(0, roundIndex) : args;

		if (trblNodes.length === 0) {
			return err("inset() requires at least one inset value");
		}

		const trblResult = ParseUtils.parseTRBLLengthPercentage(trblNodes);
		if (!trblResult.ok) {
			return err(`Invalid inset values: ${trblResult.error}`);
		}

		// Parse optional border-radius (after 'round')
		let borderRadius: Type.InsetBorderRadius | undefined;
		if (roundIndex !== -1) {
			const radiusNodes = args.slice(roundIndex + 1);

			if (radiusNodes.length === 0) {
				return err("Expected border-radius values after 'round' keyword");
			}

			const radiusResult = ParseUtils.parseBorderRadiusShorthand(radiusNodes);
			if (!radiusResult.ok) {
				return err(`Invalid border-radius: ${radiusResult.error}`);
			}

			borderRadius = radiusResult.value;
		}

		// Build IR
		return ok({
			kind: "clip-path-inset",
			top: trblResult.value.top,
			right: trblResult.value.right,
			bottom: trblResult.value.bottom,
			left: trblResult.value.left,
			borderRadius,
		});
	} catch (e) {
		return err(`Failed to parse inset(): ${e instanceof Error ? e.message : String(e)}`);
	}
}
```

#### 4.2 Create Tests `src/parse/clip-path/inset.test.ts`

**Test Categories**:

1. **Basic TRBL** (8 tests)
   - Single value: `inset(10px)`
   - Two values: `inset(10px 20px)`
   - Three values: `inset(10px 20px 30px)`
   - Four values: `inset(10px 20px 30px 40px)`
   - Mixed units: `inset(10% 20px 5em 0)`
   - Unitless zero: `inset(0 10px)`
   - All zero: `inset(0)`
   - Percentage: `inset(10% 20%)`

2. **Border-Radius** (6 tests)
   - Single radius: `inset(10px round 5px)`
   - Two radii: `inset(10px round 5px 10px)`
   - Four radii: `inset(10px round 5px 10px 15px 20px)`
   - Zero radius: `inset(10px round 0)`
   - Mixed with TRBL: `inset(10px 20px round 5px)`
   - Full example: `inset(5% 10% 15% 20% round 2px 4px 6px 8px)`

3. **Edge Cases** (6 tests)
   - Empty function: `inset()` → Error
   - Too many TRBL values: `inset(1px 2px 3px 4px 5px)` → Error
   - Round without value: `inset(10px round)` → Error
   - Negative inset: `inset(-10px)` → Should work (clips outside)
   - Negative radius: `inset(10px round -5px)` → Error
   - Invalid syntax: `inset(round 10px)` → Error

**Pattern**: Use existing test patterns from other parsers

#### 4.3 Update `src/parse/clip-path/index.ts`

```typescript
export * as Inset from "./inset";
```

---

### Phase 5: Generator (~10 min)

**Goal**: Implement inset() CSS generator with optimization

#### 5.1 Create `src/generate/clip-path/inset.ts`

```typescript
// b_path:: src/generate/clip-path/inset.ts
import type * as Type from "@/core/types";
import * as GenerateUtils from "@/utils/generate";

/**
 * Generate CSS for inset() function.
 *
 * Optimizes TRBL values to shortest form:
 * - 4 equal values → 1 value
 * - top/bottom same, left/right same → 2 values
 * - etc.
 *
 * @param value - ClipPathInset IR
 * @returns CSS inset() function string
 *
 * @example
 * ```typescript
 * const css = toCss({
 *   kind: "clip-path-inset",
 *   top: { value: 10, unit: "px" },
 *   right: { value: 10, unit: "px" },
 *   bottom: { value: 10, unit: "px" },
 *   left: { value: 10, unit: "px" }
 * });
 * // "inset(10px)"
 * ```
 *
 * @public
 */
export function toCss(value: Type.ClipPathInset): string {
	// Generate TRBL CSS (optimized to shortest form)
	const trblCss = generateOptimizedTRBL({
		top: value.top,
		right: value.right,
		bottom: value.bottom,
		left: value.left,
	});

	// Generate optional border-radius
	let radiusCss = "";
	if (value.borderRadius) {
		const radiusOptimized = generateOptimizedBorderRadius(value.borderRadius);
		radiusCss = ` round ${radiusOptimized}`;
	}

	return `inset(${trblCss}${radiusCss})`;
}

/**
 * Generate optimized TRBL CSS (shortest form).
 *
 * @internal
 */
function generateOptimizedTRBL(trbl: {
	top: Type.LengthPercentage;
	right: Type.LengthPercentage;
	bottom: Type.LengthPercentage;
	left: Type.LengthPercentage;
}): string {
	const top = GenerateUtils.lengthPercentageToCss(trbl.top);
	const right = GenerateUtils.lengthPercentageToCss(trbl.right);
	const bottom = GenerateUtils.lengthPercentageToCss(trbl.bottom);
	const left = GenerateUtils.lengthPercentageToCss(trbl.left);

	// Check for optimization opportunities
	if (top === right && right === bottom && bottom === left) {
		// All equal: 1 value
		return top;
	}

	if (top === bottom && right === left) {
		// Vertical same, horizontal same: 2 values
		return `${top} ${right}`;
	}

	if (right === left) {
		// Left/right same: 3 values
		return `${top} ${right} ${bottom}`;
	}

	// All different: 4 values
	return `${top} ${right} ${bottom} ${left}`;
}

/**
 * Generate optimized border-radius CSS (shortest form).
 *
 * @internal
 */
function generateOptimizedBorderRadius(radius: Type.InsetBorderRadius): string {
	const tl = GenerateUtils.lengthPercentageToCss(radius.topLeft);
	const tr = GenerateUtils.lengthPercentageToCss(radius.topRight);
	const br = GenerateUtils.lengthPercentageToCss(radius.bottomRight);
	const bl = GenerateUtils.lengthPercentageToCss(radius.bottomLeft);

	// Check for optimization opportunities
	if (tl === tr && tr === br && br === bl) {
		// All equal: 1 value
		return tl;
	}

	if (tl === br && tr === bl) {
		// Diagonals same: 2 values
		return `${tl} ${tr}`;
	}

	if (tr === bl) {
		// Top-right/bottom-left same: 3 values
		return `${tl} ${tr} ${br}`;
	}

	// All different: 4 values
	return `${tl} ${tr} ${br} ${bl}`;
}
```

#### 5.2 Check if `lengthPercentageToCss` exists

**File**: `src/utils/generate/values.ts` (check and add if missing)

```typescript
/**
 * Generate CSS for length-percentage value.
 */
export function lengthPercentageToCss(value: Type.LengthPercentage): string {
	return `${value.value}${value.unit}`;
}
```

#### 5.3 Create Tests `src/generate/clip-path/inset.test.ts`

**Test Categories**:

1. **TRBL Optimization** (5 tests)
   - All equal → 1 value: `10px 10px 10px 10px` → `inset(10px)`
   - V/H pairs → 2 values: `10px 20px 10px 20px` → `inset(10px 20px)`
   - H same → 3 values: `10px 20px 30px 20px` → `inset(10px 20px 30px)`
   - All different → 4 values: `10px 20px 30px 40px` → `inset(10px 20px 30px 40px)`
   - Mixed units: Should preserve units correctly

2. **Border-Radius Optimization** (4 tests)
   - All equal → 1 value
   - Diagonals same → 2 values
   - TR/BL same → 3 values
   - All different → 4 values

3. **Round-Trip Validation** (5 tests)
   - Parse then generate should match original (normalized)
   - Various TRBL combinations
   - With and without border-radius

**Pattern**: Use existing generator test patterns

#### 5.4 Update `src/generate/clip-path/index.ts`

```typescript
export * as Inset from "./inset";
```

---

## Testing Strategy

### Unit Tests
- ✅ Parse utilities: TRBL and border-radius
- ✅ Parser: All inset() variations
- ✅ Generator: Optimization and output

### Integration Tests
- ✅ Round-trip: Parse → Generate → Parse (should match)
- ✅ Edge cases: Error handling

### Quality Gates
```bash
just check  # Format, typecheck, lint
just test   # All tests (target: 1932 + ~30 new tests = ~1962)
```

---

## Success Criteria

- [ ] All tests passing (~30 new tests)
- [ ] TRBL utility in `utils/parse/nodes.ts` with tests
- [ ] Border-radius utility in `utils/parse/nodes.ts` with tests
- [ ] IR types in `src/core/types/clip-path.ts`
- [ ] Parser in `src/parse/clip-path/inset.ts` with tests
- [ ] Generator in `src/generate/clip-path/inset.ts` with tests
- [ ] Round-trip validation passing
- [ ] No hardcoded values (import from core)
- [ ] Quality gates passing (just check && just test)

---

## Files to Create/Modify

### Create
- [ ] `src/utils/parse/nodes.test.ts` - Utility tests
- [ ] `src/parse/clip-path/inset.ts` - Parser
- [ ] `src/parse/clip-path/inset.test.ts` - Parser tests
- [ ] `src/generate/clip-path/inset.ts` - Generator
- [ ] `src/generate/clip-path/inset.test.ts` - Generator tests

### Modify
- [ ] `src/utils/parse/nodes.ts` - Add TRBL and border-radius utilities
- [ ] `src/core/types/clip-path.ts` - Add inset IR types
- [ ] `src/parse/clip-path/index.ts` - Export inset parser
- [ ] `src/generate/clip-path/index.ts` - Export inset generator
- [ ] `src/utils/generate/values.ts` - Check/add lengthPercentageToCss (if missing)

---

## Notes

### Simplifications
- No elliptical border-radius support (with `/`) in this session
- Can be added later if needed (rare use case)

### Future Reuse
- `parseTRBLLengthPercentage` → margin, padding, scroll-margin, scroll-padding
- `parseBorderRadiusShorthand` → border-radius property (when implemented)
- Pattern established for other basic shapes (circle, ellipse, polygon)

### Estimated Test Count
- TRBL utility: ~10 tests
- Border-radius utility: ~8 tests
- inset() parser: ~20 tests
- inset() generator: ~14 tests
- **Total**: ~52 tests (conservative estimate: ~30-40 after deduplication)

---

## Ready to Start!

1. Run baseline: `just check && just test`
2. Follow phases in order
3. Run quality gates after each phase
4. Create HANDOVER.md when complete

Good luck! 🚀
