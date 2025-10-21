// b_path:: src/universal.ts

/**
 * Universal API for parsing and generating ANY CSS longhand property.
 *
 * This is the main public API for b_value. Users parse declarations like
 * "color: red" and generate CSS from IR with property names.
 *
 * @module
 */

import {
	type CSSPropertyName,
	type GenerateResult,
	generateErr,
	Issues,
	type ParseResult,
	parseErr,
	parseOk,
	toParseResult,
} from "./core/result";
// Import module generators
import * as AnimationGenerate from "./generate/animation/animation";
import * as BorderGenerate from "./generate/border/border";
import * as ClipPathGenerate from "./generate/clip-path/clip-path";
import * as ColorGenerate from "./generate/color/color";
import * as FilterGenerate from "./generate/filter/filter";
import * as GradientGenerate from "./generate/gradient/gradient";
import * as LayoutGenerate from "./generate/layout";
import * as OutlineGenerate from "./generate/outline/outline";
import * as PositionGenerate from "./generate/position/position-generate";
import * as ShadowGenerate from "./generate/shadow/shadow";
import * as TransformGenerate from "./generate/transform/transform-generate";
import * as TransitionGenerate from "./generate/transition/transition";
// Import module parsers
import * as AnimationParse from "./parse/animation/animation";
// Import individual property parsers
import * as BackgroundAttachment from "./parse/background/attachment";
import * as BackgroundClip from "./parse/background/clip";
import * as BackgroundOrigin from "./parse/background/origin";
import * as BackgroundRepeat from "./parse/background/repeat";
import * as BackgroundSize from "./parse/background/size";
import * as BorderRadius from "./parse/border/radius";
import * as BorderStyle from "./parse/border/style";
import * as BorderWidth from "./parse/border/width";
import * as ClipPathParse from "./parse/clip-path/clip-path";
import * as ColorParse from "./parse/color/color";
import * as FilterParse from "./parse/filter/filter";
import * as GradientParse from "./parse/gradient/gradient";
import * as LayoutBottom from "./parse/layout/bottom";
import * as LayoutCursor from "./parse/layout/cursor";
import * as LayoutDisplay from "./parse/layout/display";
import * as LayoutHeight from "./parse/layout/height";
import * as LayoutLeft from "./parse/layout/left";
import * as LayoutOpacity from "./parse/layout/opacity";
import * as LayoutOverflowX from "./parse/layout/overflow-x";
import * as LayoutOverflowY from "./parse/layout/overflow-y";
import * as LayoutPosition from "./parse/layout/position";
import * as LayoutRight from "./parse/layout/right";
import * as LayoutTop from "./parse/layout/top";
import * as LayoutVisibility from "./parse/layout/visibility";
import * as LayoutWidth from "./parse/layout/width";
import * as LayoutZIndex from "./parse/layout/z-index";
import * as OutlineOffset from "./parse/outline/offset";
import * as OutlineStyle from "./parse/outline/style";
import * as OutlineWidth from "./parse/outline/width";
import * as PositionParse from "./parse/position/position";
import * as ShadowParse from "./parse/shadow/shadow";
import * as TextColor from "./parse/text/color";
import * as TextLine from "./parse/text/line";
import * as TextStyle from "./parse/text/style";
import * as TextThickness from "./parse/text/thickness";
import * as TransformParse from "./parse/transform/transform";
import * as TransitionParse from "./parse/transition/transition";

// ============================================================================
// Property Registry
// ============================================================================

type PropertyParser = (value: string) => ParseResult;
// biome-ignore lint/suspicious/noExplicitAny: Generators accept different IR types
type PropertyGenerator = (value: any) => GenerateResult;

/**
 * Wrap old Result<T, string> parsers to return ParseResult<T>.
 * @internal
 */
// biome-ignore lint/suspicious/noExplicitAny: Wrapper handles multiple parser return types
function wrapParser(parser: (value: string) => any): PropertyParser {
	return (value: string) => {
		const result = parser(value);
		// Already ParseResult
		if ("issues" in result) {
			return result;
		}
		// Old Result<T, string> - convert
		// biome-ignore lint/suspicious/noExplicitAny: Type conversion between Result formats
		return toParseResult(result as any);
	};
}

/**
 * Wrap old toCss generators to return GenerateResult.
 * @internal
 */
// biome-ignore lint/suspicious/noExplicitAny: Wrapper handles different IR types
function wrapGenerator(generator: (value: any) => string): PropertyGenerator {
	// biome-ignore lint/suspicious/noExplicitAny: Generator accepts any IR type
	return (value: any) => {
		try {
			const css = generator(value);
			return { ok: true, value: css, issues: [] };
		} catch (error) {
			return generateErr("invalid-ir", error instanceof Error ? error.message : "Generation failed");
		}
	};
}

/**
 * Registry mapping CSS property names to their parsers.
 * @internal
 */
const PROPERTY_PARSERS: Record<string, PropertyParser> = {
	// Color properties
	color: ColorParse.parse,
	"background-color": ColorParse.parse,
	"border-top-color": ColorParse.parse,
	"border-right-color": ColorParse.parse,
	"border-bottom-color": ColorParse.parse,
	"border-left-color": ColorParse.parse,
	"outline-color": ColorParse.parse,
	"text-decoration-color": wrapParser(TextColor.parse),

	// Background properties
	"background-attachment": wrapParser(BackgroundAttachment.parse),
	"background-clip": wrapParser(BackgroundClip.parse),
	"background-origin": wrapParser(BackgroundOrigin.parse),
	"background-repeat": wrapParser(BackgroundRepeat.parse),
	"background-size": wrapParser(BackgroundSize.parse),
	"background-position": PositionParse.parse,
	"background-image": GradientParse.parse, // gradient or image URL

	// Border properties (individual sides only - full sides are shorthands)
	"border-top-style": wrapParser(BorderStyle.parse),
	"border-right-style": wrapParser(BorderStyle.parse),
	"border-bottom-style": wrapParser(BorderStyle.parse),
	"border-left-style": wrapParser(BorderStyle.parse),
	"border-top-width": wrapParser(BorderWidth.parse),
	"border-right-width": wrapParser(BorderWidth.parse),
	"border-bottom-width": wrapParser(BorderWidth.parse),
	"border-left-width": wrapParser(BorderWidth.parse),
	"border-radius": wrapParser(BorderRadius.parse),
	"border-top-left-radius": wrapParser(BorderRadius.parse),
	"border-top-right-radius": wrapParser(BorderRadius.parse),
	"border-bottom-right-radius": wrapParser(BorderRadius.parse),
	"border-bottom-left-radius": wrapParser(BorderRadius.parse),

	// Layout properties
	top: wrapParser(LayoutTop.parse),
	right: wrapParser(LayoutRight.parse),
	bottom: wrapParser(LayoutBottom.parse),
	left: wrapParser(LayoutLeft.parse),
	width: wrapParser(LayoutWidth.parse),
	height: wrapParser(LayoutHeight.parse),
	position: wrapParser(LayoutPosition.parse),
	display: wrapParser(LayoutDisplay.parse),
	opacity: wrapParser(LayoutOpacity.parse),
	visibility: wrapParser(LayoutVisibility.parse),
	"z-index": wrapParser(LayoutZIndex.parse),
	cursor: wrapParser(LayoutCursor.parse),
	"overflow-x": wrapParser(LayoutOverflowX.parse),
	"overflow-y": wrapParser(LayoutOverflowY.parse),

	// Outline properties
	"outline-style": wrapParser(OutlineStyle.parse),
	"outline-width": wrapParser(OutlineWidth.parse),
	"outline-offset": wrapParser(OutlineOffset.parse),

	// Text decoration properties
	"text-decoration-line": wrapParser(TextLine.parse),
	"text-decoration-style": wrapParser(TextStyle.parse),
	"text-decoration-thickness": wrapParser(TextThickness.parse),

	// Complex properties
	"clip-path": ClipPathParse.parse,
	filter: FilterParse.parse,
	transform: TransformParse.parse,
	"box-shadow": ShadowParse.parse,
	"text-shadow": ShadowParse.parse,

	// Animation/Transition properties (module level)
	"animation-name": AnimationParse.parse,
	"animation-duration": AnimationParse.parse,
	"animation-timing-function": AnimationParse.parse,
	"animation-delay": AnimationParse.parse,
	"animation-iteration-count": AnimationParse.parse,
	"animation-direction": AnimationParse.parse,
	"animation-fill-mode": AnimationParse.parse,
	"animation-play-state": AnimationParse.parse,

	"transition-property": TransitionParse.parse,
	"transition-duration": TransitionParse.parse,
	"transition-timing-function": TransitionParse.parse,
	"transition-delay": TransitionParse.parse,
};

/**
 * Registry mapping CSS property names to their generators.
 * @internal
 */
const PROPERTY_GENERATORS: Record<string, PropertyGenerator> = {
	// Color properties
	color: ColorGenerate.generate,
	"background-color": ColorGenerate.generate,
	"border-color": BorderGenerate.generate,
	"border-top-color": BorderGenerate.generate,
	"border-right-color": BorderGenerate.generate,
	"border-bottom-color": BorderGenerate.generate,
	"border-left-color": BorderGenerate.generate,
	"outline-color": OutlineGenerate.generate,

	// Background properties
	"background-position": PositionGenerate.generate,
	"background-image": GradientGenerate.generate,

	// Border properties
	"border-radius": BorderGenerate.generate,

	// Layout properties
	top: wrapGenerator(LayoutGenerate.Top.toCss),
	right: wrapGenerator(LayoutGenerate.Right.toCss),
	bottom: wrapGenerator(LayoutGenerate.Bottom.toCss),
	left: wrapGenerator(LayoutGenerate.Left.toCss),
	width: wrapGenerator(LayoutGenerate.Width.toCss),
	height: wrapGenerator(LayoutGenerate.Height.toCss),
	position: wrapGenerator(LayoutGenerate.Position.toCss),
	display: wrapGenerator(LayoutGenerate.Display.toCss),
	opacity: wrapGenerator(LayoutGenerate.Opacity.toCss),
	visibility: wrapGenerator(LayoutGenerate.Visibility.toCss),
	"z-index": wrapGenerator(LayoutGenerate.ZIndex.toCss),
	cursor: wrapGenerator(LayoutGenerate.Cursor.toCss),
	"overflow-x": wrapGenerator(LayoutGenerate.OverflowX.toCss),
	"overflow-y": wrapGenerator(LayoutGenerate.OverflowY.toCss),

	// Outline properties
	"outline-style": OutlineGenerate.generate,
	"outline-width": OutlineGenerate.generate,

	// Complex properties
	"clip-path": ClipPathGenerate.generate,
	filter: FilterGenerate.generate,
	transform: TransformGenerate.generate,
	"box-shadow": ShadowGenerate.generate,
	"text-shadow": ShadowGenerate.generate,

	// Animation/Transition
	"animation-name": AnimationGenerate.generate,
	"transition-property": TransitionGenerate.generate,
};

/**
 * List of CSS shorthand properties that b_value rejects.
 * Use b_short library to expand shorthands first.
 *
 * @internal
 */
const SHORTHAND_PROPERTIES = [
	"animation",
	"background",
	"border",
	"border-color", // Can specify 1-4 colors
	"border-style", // Can specify 1-4 styles
	"border-width", // Can specify 1-4 widths
	"border-top",
	"border-right",
	"border-bottom",
	"border-left",
	"border-block",
	"border-block-start",
	"border-block-end",
	"border-inline",
	"border-inline-start",
	"border-inline-end",
	"border-color",
	"border-style",
	"border-width",
	"border-image",
	"column-rule",
	"columns",
	"flex",
	"flex-flow",
	"font",
	"gap",
	"grid",
	"grid-area",
	"grid-column",
	"grid-row",
	"grid-template",
	"list-style",
	"margin",
	"mask",
	"offset",
	"outline",
	"overflow",
	"padding",
	"place-content",
	"place-items",
	"place-self",
	"scroll-margin",
	"scroll-padding",
	"text-decoration",
	"text-emphasis",
	"transition",
];

/**
 * Check if a property is a shorthand.
 * @internal
 */
function isShorthand(property: string): boolean {
	return SHORTHAND_PROPERTIES.includes(property);
}

/**
 * Parse CSS declaration syntax "property: value".
 * @internal
 */
function parseDeclaration(declaration: string): { property: string; value: string } | null {
	// Handle "property: value" with optional semicolon
	const match = declaration.match(/^\s*([a-z-]+)\s*:\s*(.+?)\s*;?\s*$/i);
	if (!match) return null;

	return {
		// biome-ignore lint/style/noNonNullAssertion: Already checked match exists
		property: match[1]!.toLowerCase().trim(),
		// biome-ignore lint/style/noNonNullAssertion: Already checked match exists
		value: match[2]!.trim(),
	};
}

// ============================================================================
// Universal API
// ============================================================================

/**
 * Parse ANY CSS longhand property declaration.
 *
 * Takes a CSS declaration like "color: red" and returns ParseResult with
 * the property name and parsed IR value.
 *
 * @param declaration - CSS property declaration ("property: value")
 * @returns ParseResult with property name and IR value
 *
 * @example
 * ```typescript
 * const result = parse("color: red");
 * if (result.ok) {
 *   console.log(result.property); // "color"
 *   console.log(result.value);    // { kind: "named", name: "red" }
 * }
 * ```
 *
 * @example
 * Shorthand rejection:
 * ```typescript
 * const result = parse("border: 1px solid red");
 * if (!result.ok) {
 *   console.log(result.issues[0].message);
 *   // "border is a shorthand property"
 *   console.log(result.issues[0].action);
 *   // "Use b_short to expand shorthands first"
 * }
 * ```
 *
 * @public
 */
export function parse(declaration: string): ParseResult {
	// Step 1: Parse declaration syntax
	const parsed = parseDeclaration(declaration);
	if (!parsed) {
		return parseErr("invalid-syntax", "Invalid CSS declaration syntax", {
			suggestion: "Expected format: 'property: value' or 'property: value;'",
		});
	}

	const { property, value } = parsed;

	// Step 2: Check if shorthand
	if (isShorthand(property)) {
		return parseErr("shorthand-not-supported", `"${property}" is a shorthand property`, {
			suggestion: `Use individual longhand properties instead`,
			action: "Use b_short library to expand shorthands first",
			property: property as CSSPropertyName,
		});
	}

	// Step 3: Find parser
	const parser = PROPERTY_PARSERS[property];
	if (!parser) {
		return parseErr("unknown-property", `Unknown or unsupported property: "${property}"`, {
			suggestion: "Check property name spelling or check if b_value supports this property yet",
			property: property as CSSPropertyName,
		});
	}

	// Step 4: Parse value
	const result = parser(value);

	// Step 5: Add property name to result
	return {
		...result,
		property,
	};
}

/**
 * Generate CSS value from IR for ANY longhand property.
 *
 * Takes a property name and IR value, generates the CSS string.
 *
 * @param options - Property name and IR value
 * @returns GenerateResult with CSS string
 *
 * @example
 * ```typescript
 * const result = generate({
 *   property: "color",
 *   value: { kind: "hex", r: 255, g: 0, b: 0 }
 * });
 * if (result.ok) {
 *   console.log(result.value); // "#ff0000"
 * }
 * ```
 *
 * @example
 * Shorthand rejection:
 * ```typescript
 * const result = generate({
 *   property: "border",
 *   value: { /* ... *\/ }
 * });
 * if (!result.ok) {
 *   console.log(result.issues[0].message);
 *   // "border is a shorthand property"
 * }
 * ```
 *
 * @public
 */
export function generate(options: { property: string; value: unknown }): GenerateResult {
	const { property, value } = options;

	// Step 1: Check if shorthand
	if (isShorthand(property)) {
		return generateErr("shorthand-not-supported", `"${property}" is a shorthand property`, {
			action: "Use b_short library for shorthand generation",
			property: property as CSSPropertyName,
		});
	}

	// Step 2: Find generator
	const generator = PROPERTY_GENERATORS[property];
	if (!generator) {
		return generateErr("unknown-property", `Unknown or unsupported property: "${property}"`, {
			suggestion: "Check property name spelling or check if b_value supports this property yet",
			property: property as CSSPropertyName,
		});
	}

	// Step 3: Generate value
	const result = generator(value);

	// Step 4: Add property name to result
	return {
		...result,
		property,
	};
}

//
// ===== BATCH API: parseAll() and generateAll() =====
//

import type { CSSValue } from "./core/types/css-value";

/**
 * Parse multiple CSS declarations from a style block.
 *
 * Returns a single ParseResult with all properties as a flat object.
 * Perfect for CSS editors - one ok flag, one issues array, easy property access.
 *
 * **Edge Cases**:
 * - Duplicate properties: Last value wins (CSS standard), warning emitted
 * - Invalid values: Returned as unparsed string, error emitted
 * - Shorthand properties: Returned as unparsed string, error emitted (use b_short)
 * - Unknown properties: Returned as unparsed string, error emitted
 * - Empty declarations: Silently ignored
 *
 * @param css - CSS declarations (e.g., "color: red; width: 10px")
 * @returns ParseResult with flat object of parsed values
 *
 * @example
 * ```typescript
 * const result = parseAll("color: red; width: 10px");
 * if (result.ok) {
 *   console.log(result.value.color);  // { kind: "named", name: "red" }
 *   console.log(result.value.width);  // { kind: "length", value: 10, unit: "px" }
 * }
 * ```
 *
 * @example
 * Handle invalid values:
 * ```typescript
 * const result = parseAll("color: invalid; width: 10px");
 * // result.ok === false
 * // result.value.color === "invalid" (unparsed string)
 * // result.issues contains error details
 * ```
 *
 * @public
 */
export function parseAll(css: string): ParseResult<Record<string, CSSValue | string>> {
	// Handle empty input
	if (!css || css.trim().length === 0) {
		return parseOk({});
	}

	// Step 1: Split declarations by semicolon
	const declarations = splitDeclarations(css);

	// Step 2: Detect duplicates
	const duplicates = detectDuplicates(declarations);

	// Step 3: Parse each declaration
	const results: Array<{
		property: string;
		value: string;
		result: ParseResult<unknown>;
	}> = [];

	for (const decl of declarations) {
		const parseResult = parse(`${decl.property}: ${decl.value}`);
		results.push({
			property: decl.property,
			value: decl.value,
			result: parseResult,
		});
	}

	// Step 4: Merge results into single ParseResult
	return mergeResults(results, duplicates);
}

/**
 * Split CSS string into individual declarations.
 * Handles empty declarations gracefully.
 *
 * @internal
 */
function splitDeclarations(css: string): Array<{ property: string; value: string }> {
	return css
		.split(";")
		.map((decl) => decl.trim())
		.filter((decl) => decl.length > 0 && decl.includes(":")) // Skip empty and invalid
		.map((decl) => {
			const colonIdx = decl.indexOf(":");
			return {
				property: decl.slice(0, colonIdx).trim(),
				value: decl.slice(colonIdx + 1).trim(),
			};
		})
		.filter((decl) => decl.property.length > 0 && decl.value.length > 0);
}

/**
 * Detect duplicate property declarations.
 *
 * @internal
 */
function detectDuplicates(declarations: Array<{ property: string; value: string }>): Map<string, number> {
	const counts = new Map<string, number>();
	for (const decl of declarations) {
		counts.set(decl.property, (counts.get(decl.property) || 0) + 1);
	}
	return counts;
}

/**
 * Merge individual parse results into single ParseResult.
 *
 * @internal
 */
function mergeResults(
	results: Array<{
		property: string;
		value: string;
		result: ParseResult<unknown>;
	}>,
	duplicates: Map<string, number>,
): ParseResult<Record<string, CSSValue | string>> {
	const value: Record<string, CSSValue | string> = {};
	const issues: Array<import("./core/result").Issue> = [];
	let allOk = true;

	// Track which properties we've seen to handle duplicates
	const seen = new Map<string, number>();

	for (const { property, value: inputValue, result } of results) {
		// Track this property
		const count = (seen.get(property) || 0) + 1;
		seen.set(property, count);

		// Add duplicate warning on last occurrence
		const duplicateCount = duplicates.get(property);
		if (duplicateCount && duplicateCount > 1 && count === duplicateCount) {
			issues.push(Issues.duplicateProperty(property as import("./core/result").CSSLonghandProperty, duplicateCount));
		}

		// Handle parse result
		if (result.ok) {
			// Successfully parsed - use IR value
			value[property] = result.value as CSSValue;
		} else {
			// Failed to parse - use unparsed string
			value[property] = inputValue;
			allOk = false;
		}

		// Collect issues
		issues.push(...result.issues);
	}

	return {
		ok: allOk,
		value,
		issues,
	};
}

/**
 * Generate CSS declarations from a flat object of properties.
 *
 * Takes the same shape returned by parseAll() - a flat object with property names
 * as keys and IR values or unparsed strings as values. Returns formatted CSS string.
 *
 * **Features**:
 * - IR values: Automatically calls generate() for each property
 * - String values: Pass through as-is (already valid CSS)
 * - Minify option: Control spacing and formatting
 * - Perfect round-trip: parseAll() → modify → generateAll()
 *
 * @param values - Flat object of property names to values (IR or strings)
 * @param options - Optional generation options
 * @returns CSS declaration string (e.g., "color: red; width: 10px")
 *
 * @example
 * Basic usage:
 * ```typescript
 * const css = generateAll({
 *   color: { kind: "hex", r: 255, g: 0, b: 0 },
 *   width: { kind: "length", value: 10, unit: "px" }
 * });
 * // Returns: "color: #ff0000; width: 10px"
 * ```
 *
 * @example
 * Mix IR and string values:
 * ```typescript
 * const css = generateAll({
 *   color: { kind: "hex", r: 255, g: 0, b: 0 },
 *   border: "1px solid blue"  // String passthrough
 * });
 * // Returns: "color: #ff0000; border: 1px solid blue"
 * ```
 *
 * @example
 * Minified output:
 * ```typescript
 * const css = generateAll(
 *   { color: { kind: "named", name: "red" } },
 *   { minify: true }
 * );
 * // Returns: "color:red"
 * ```
 *
 * @example
 * Round-trip:
 * ```typescript
 * const parsed = parseAll("color: red; width: 10px");
 * if (parsed.ok) {
 *   // Modify values
 *   parsed.value.color = { kind: "hex", r: 0, g: 255, b: 0 };
 *
 *   // Generate back to CSS
 *   const css = generateAll(parsed.value);
 *   // Returns: "color: #00ff00; width: 10px"
 * }
 * ```
 *
 * @public
 */
export function generateAll(values: Record<string, CSSValue | string>, options?: { minify?: boolean }): string {
	// Handle empty input
	if (!values || Object.keys(values).length === 0) {
		return "";
	}

	const declarations: string[] = [];

	// Process each property
	for (const [property, value] of Object.entries(values)) {
		// Skip undefined/null values
		if (value === undefined || value === null) {
			continue;
		}

		// String passthrough - already valid CSS
		if (typeof value === "string") {
			const formatted = options?.minify ? `${property}:${value}` : `${property}: ${value}`;
			declarations.push(formatted);
			continue;
		}

		// IR value - generate CSS
		const result = generate({ property, value });
		if (result.ok) {
			const formatted = options?.minify ? `${property}:${result.value}` : `${property}: ${result.value}`;
			declarations.push(formatted);
		}
		// Silently skip failed generation (shouldn't happen with valid IR)
	}

	// Join declarations
	const separator = options?.minify ? ";" : "; ";
	return declarations.join(separator);
}
