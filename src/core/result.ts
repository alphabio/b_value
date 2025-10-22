// b_path:: src/core/result.ts

/**
 * Result type for operations that may fail.
 *
 * Provides a type-safe way to handle errors without throwing exceptions.
 * Inspired by Rust's Result<T, E> and functional programming patterns.
 *
 * Supports destructuring for convenient access:
 * - `ok: true` → `value` is available, `error` is undefined
 * - `ok: false` → `error` is available, `value` is undefined
 *
 * @example
 * ```typescript
 * import { Result, ok, err } from "@/core/result";
 *
 * function divide(a: number, b: number): Result<number, string> {
 *   if (b === 0) return err("Division by zero");
 *   return ok(a / b);
 * }
 *
 * const { ok, value, error } = divide(10, 2);
 * if (ok) {
 *   console.log(value); // 5 (type: number)
 * } else {
 *   console.error(error); // string
 * }
 * ```
 *
 * @public
 */
export type Result<T, E = Error> = { ok: true; value: T; error: undefined } | { ok: false; value: undefined; error: E };

/**
 * Create a successful result.
 *
 * @example
 * ```typescript
 * const result = ok(42);
 * console.log(result.ok); // true
 * console.log(result.value); // 42
 * console.log(result.error); // undefined
 * ```
 *
 * @public
 */
export function ok<T>(value: T): Result<T, never> {
	return { ok: true, value, error: undefined };
}

/**
 * Create an error result.
 *
 * @example
 * ```typescript
 * const result = err("Something went wrong");
 * console.log(result.ok); // false
 * console.log(result.error); // "Something went wrong"
 * console.log(result.value); // undefined
 * ```
 *
 * @public
 */
export function err<E>(error: E): Result<never, E> {
	return { ok: false, value: undefined, error };
}

/**
 * Convert a Zod SafeParseReturnType to a Result.
 *
 * @example
 * ```typescript
 * import { z } from "zod";
 * import { fromZod } from "@/core/result";
 *
 * const schema = z.number();
 * const zodResult = schema.safeParse("not a number");
 * const result = fromZod(zodResult);
 *
 * if (!result.ok) {
 *   console.error(result.error); // ZodError
 * }
 * ```
 *
 * @public
 */
export function fromZod<T, E = unknown>(
	zodResult: { success: true; data: T } | { success: false; error: E },
): Result<T, E> {
	if (zodResult.success) {
		return ok(zodResult.data);
	}
	return err(zodResult.error);
}

/**
 * Unwrap a result, throwing if it's an error.
 * Use sparingly - prefer explicit error handling.
 *
 * @example
 * ```typescript
 * const result = ok(42);
 * const value = unwrap(result); // 42
 *
 * const errorResult = err("Failed");
 * unwrap(errorResult); // throws Error("Failed")
 * ```
 *
 * @public
 */
export function unwrap<T, E>(result: Result<T, E>): T {
	if (result.ok) {
		return result.value;
	}
	throw result.error instanceof Error ? result.error : new Error(String(result.error));
}

/**
 * Get the value or a default if error.
 *
 * @example
 * ```typescript
 * const result = err("Failed");
 * const value = unwrapOr(result, 42); // 42
 * ```
 *
 * @public
 */
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
	return result.ok ? result.value : defaultValue;
}

/**
 * Map over a successful result.
 *
 * @example
 * ```typescript
 * const result = ok(2);
 * const doubled = map(result, x => x * 2);
 * console.log(doubled.value); // 4
 * ```
 *
 * @public
 */
export function map<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> {
	return result.ok ? ok(fn(result.value)) : result;
}

/**
 * Chain results together (flatMap).
 *
 * @example
 * ```typescript
 * const result = ok(2);
 * const doubled = andThen(result, x =>
 *   x > 0 ? ok(x * 2) : err("Must be positive")
 * );
 * ```
 *
 * @public
 */
export function andThen<T, U, E>(result: Result<T, E>, fn: (value: T) => Result<U, E>): Result<U, E> {
	return result.ok ? fn(result.value) : result;
}

// ============================================================================
// ParseResult and GenerateResult - Public API Types
// ============================================================================

/**
 * Longhand CSS property names - properties supported by b_value.
 * @public
 */
export type CSSLonghandProperty =
	// Color
	| "color"
	| "background-color"
	| "border-color"
	| "border-top-color"
	| "border-right-color"
	| "border-bottom-color"
	| "border-left-color"
	| "outline-color"
	| "text-decoration-color"
	// Clip-path
	| "clip-path"
	// Background
	| "background-image"
	| "background-position"
	| "background-size"
	| "background-repeat"
	| "background-attachment"
	| "background-clip"
	| "background-origin"
	// Filter
	| "filter"
	| "backdrop-filter"
	// Transform
	| "transform"
	| "transform-origin"
	// Shadow
	| "box-shadow"
	| "text-shadow"
	// Border
	| "border-width"
	| "border-top-width"
	| "border-right-width"
	| "border-bottom-width"
	| "border-left-width"
	| "border-style"
	| "border-top-style"
	| "border-right-style"
	| "border-bottom-style"
	| "border-left-style"
	| "border-top-left-radius"
	| "border-top-right-radius"
	| "border-bottom-right-radius"
	| "border-bottom-left-radius"
	// Outline
	| "outline-width"
	| "outline-style"
	| "outline-offset"
	// Animation
	| "animation-name"
	| "animation-duration"
	| "animation-timing-function"
	| "animation-delay"
	| "animation-iteration-count"
	| "animation-direction"
	| "animation-fill-mode"
	| "animation-play-state"
	// Transition
	| "transition-property"
	| "transition-duration"
	| "transition-timing-function"
	| "transition-delay"
	// Layout
	| "width"
	| "height"
	| "min-width"
	| "min-height"
	| "max-width"
	| "max-height"
	| "top"
	| "right"
	| "bottom"
	| "left"
	| "position"
	| "display"
	| "overflow-x"
	| "overflow-y"
	| "visibility"
	| "z-index"
	| "opacity"
	| "cursor"
	// Text decoration
	| "text-decoration-line"
	| "text-decoration-style"
	| "text-decoration-thickness";

/**
 * Shorthand CSS property names - NOT supported by b_value, but detected for helpful errors.
 * @public
 */
export type CSSShorthandProperty =
	| "border"
	| "border-top"
	| "border-right"
	| "border-bottom"
	| "border-left"
	| "border-radius"
	| "margin"
	| "padding"
	| "background"
	| "font"
	| "text-decoration"
	| "animation"
	| "transition"
	| "outline"
	| "overflow"
	| "flex"
	| "grid"
	| "gap"
	| "inset";

/**
 * All CSS property names (longhand + shorthand for detection).
 * @public
 */
export type CSSPropertyName = CSSLonghandProperty | CSSShorthandProperty;

/**
 * Issue codes for categorization and filtering.
 * @public
 */
export type IssueCode =
	// Parse errors
	| "invalid-value"
	| "unknown-property"
	| "shorthand-not-supported"
	| "invalid-syntax"
	| "missing-value"
	// Parse warnings
	| "duplicate-property"
	| "deprecated-syntax"
	| "legacy-syntax"
	// Generate errors
	| "invalid-ir"
	| "missing-required-field"
	| "unsupported-kind";

/**
 * Issue reported during parsing or generation.
 * All fields are strongly typed for type safety and IDE autocomplete.
 *
 * @public
 */
export type Issue = {
	/** Issue code for categorization and filtering */
	code: IssueCode;
	/** Property name that caused the issue (strongly typed) */
	property?: CSSPropertyName;
	/** Severity level */
	severity: "error" | "warning" | "info";
	/** Human-readable message */
	message: string;
	/** Optional suggestion for fixing the issue */
	suggestion?: string;
	/** Optional action to take (e.g., "use modern syntax") */
	action?: string;
	/** Optional location in input string */
	location?: {
		offset: number;
		length: number;
	};
};

/**
 * Result of parsing CSS to intermediate representation.
 *
 * Used by Module API (e.g., Parse.Color.parse()) and Universal API (e.g., parse()).
 *
 * Discriminated union ensures type safety:
 * - When `ok: true`, `value` is guaranteed to be present (type T)
 * - When `ok: false`, `value` is undefined
 *
 * This means `if (result.ok)` is sufficient - no need for `if (result.ok && result.value)`.
 *
 * @example
 * ```typescript
 * const result = Parse.Color.parse("#ff0000");
 * if (result.ok) {
 *   console.log(result.value);  // Color IR - TypeScript knows it's defined
 * } else {
 *   console.error(result.issues[0].message);
 *   console.log(result.issues[0].suggestion);
 * }
 * ```
 *
 * @public
 */
export type ParseResult<T = unknown> =
	| { ok: true; value: T; property?: string; issues: Issue[] }
	| { ok: false; value?: undefined; property?: string; issues: Issue[] };

/**
 * Result of generating CSS from intermediate representation.
 *
 * Used by Module API (e.g., Generate.Color.generate()) and Universal API.
 *
 * Discriminated union ensures type safety:
 * - When `ok: true`, `value` is guaranteed to be present (string)
 * - When `ok: false`, `value` is undefined
 *
 * @example
 * ```typescript
 * const result = Generate.Color.generate(colorIR);
 * if (result.ok) {
 *   console.log(result.value);  // "#ff0000" - TypeScript knows it's defined
 * }
 * ```
 *
 * @public
 */
export type GenerateResult =
	| { ok: true; value: string; property?: string; issues: Issue[] }
	| { ok: false; value?: undefined; property?: string; issues: Issue[] };

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Create a successful ParseResult.
 *
 * @example
 * ```typescript
 * return parseOk(colorIR);
 * return parseOk(colorIR, "background-color");  // with property
 * ```
 *
 * @public
 */
export function parseOk<T>(value: T, property?: string): ParseResult<T> {
	const result: ParseResult<T> = {
		ok: true,
		value,
		issues: [],
	};
	if (property !== undefined) {
		result.property = property;
	}
	return result;
}

/**
 * Create a failed ParseResult.
 *
 * @example
 * ```typescript
 * return parseErr("invalid-value", "Invalid color format");
 * return parseErr("invalid-value", "Invalid hex color", {
 *   suggestion: "Use #RRGGBB format",
 *   property: "color"
 * });
 * ```
 *
 * @public
 */
export function parseErr<T = never>(
	code: IssueCode,
	message: string,
	options?: {
		suggestion?: string;
		action?: string;
		location?: { offset: number; length: number };
		property?: CSSPropertyName;
	},
): ParseResult<T> {
	const issue: Issue = {
		code,
		severity: "error",
		message,
	};
	if (options?.suggestion !== undefined) issue.suggestion = options.suggestion;
	if (options?.action !== undefined) issue.action = options.action;
	if (options?.location !== undefined) issue.location = options.location;
	if (options?.property !== undefined) issue.property = options.property;

	const result: ParseResult<T> = {
		ok: false,
		issues: [issue],
	};
	if (options?.property !== undefined) {
		result.property = options.property;
	}
	return result;
}

/**
 * Create a successful GenerateResult.
 *
 * @example
 * ```typescript
 * return generateOk("#ff0000");
 * return generateOk("#ff0000", "color");  // with property
 * ```
 *
 * @public
 */
export function generateOk(value: string, property?: string): GenerateResult {
	const result: GenerateResult = {
		ok: true,
		value,
		issues: [],
	};
	if (property !== undefined) {
		result.property = property;
	}
	return result;
}

/**
 * Create a failed GenerateResult.
 *
 * @example
 * ```typescript
 * return generateErr("invalid-ir", "Invalid IR structure");
 * return generateErr("missing-required-field", "Missing 'kind' field", {
 *   suggestion: "Add 'kind' field",
 *   property: "color"
 * });
 * ```
 *
 * @public
 */
export function generateErr(
	code: IssueCode,
	message: string,
	options?: {
		suggestion?: string;
		action?: string;
		property?: CSSPropertyName;
	},
): GenerateResult {
	const issue: Issue = {
		code,
		severity: "error",
		message,
	};
	if (options?.suggestion !== undefined) issue.suggestion = options.suggestion;
	if (options?.action !== undefined) issue.action = options.action;
	if (options?.property !== undefined) issue.property = options.property;

	const result: GenerateResult = {
		ok: false,
		issues: [issue],
	};
	if (options?.property !== undefined) {
		result.property = options.property;
	}
	return result;
}

/**
 * Add an issue to a ParseResult (preserves success state).
 *
 * @example
 * ```typescript
 * let result = parseOk(colorIR);
 * result = addIssue(result, {
 *   severity: "warning",
 *   message: "Legacy syntax",
 *   suggestion: "Use modern syntax"
 * });
 * ```
 *
 * @public
 */
export function addIssue<T>(result: ParseResult<T>, issue: Issue): ParseResult<T> {
	return {
		...result,
		issues: [...result.issues, issue],
	};
}

/**
 * Add a warning to a ParseResult (preserves success state).
 *
 * @example
 * ```typescript
 * return withWarning(parseOk(colorIR), "deprecated-syntax", "Legacy comma syntax");
 * ```
 *
 * @public
 */
export function withWarning<T>(
	result: ParseResult<T>,
	code: IssueCode,
	message: string,
	suggestion?: string,
): ParseResult<T> {
	const issue: Issue = {
		code,
		severity: "warning",
		message,
	};
	if (suggestion !== undefined) issue.suggestion = suggestion;
	return addIssue(result, issue);
}

// ============================================================================
// Issue Creation Helpers
// ============================================================================

/**
 * Predefined issue creators for common error cases.
 * Provides type-safe, consistent issue creation with standardized messages.
 *
 * @example
 * ```typescript
 * // In parseAll()
 * if (duplicateCount > 1) {
 *   issues.push(Issues.duplicateProperty("color", duplicateCount));
 * }
 *
 * if (!result.ok) {
 *   issues.push(Issues.invalidValue("width", "not-a-number"));
 * }
 * ```
 *
 * @public
 */
export const Issues = {
	/**
	 * Create issue for duplicate property declaration (warning).
	 */
	duplicateProperty(property: CSSLonghandProperty, count: number): Issue {
		return {
			code: "duplicate-property",
			severity: "warning",
			property,
			message: `Duplicate property '${property}' declared ${count} times - using last value`,
		};
	},

	/**
	 * Create issue for invalid property value (error).
	 */
	invalidValue(property: CSSLonghandProperty, value: string): Issue {
		return {
			code: "invalid-value",
			severity: "error",
			property,
			message: `Invalid value '${value}' for property '${property}'`,
		};
	},

	/**
	 * Create issue for shorthand property detection (error with b_short promotion).
	 */
	shorthandNotSupported(property: CSSShorthandProperty, longhands: string[]): Issue {
		return {
			code: "shorthand-not-supported",
			severity: "error",
			property,
			message: `Shorthand property '${property}' is not supported in b_value. Use longhand properties: ${longhands.join(", ")}. For shorthand support, use the 'b_short' library.`,
			suggestion: "Use b_short to expand shorthands first",
		};
	},

	/**
	 * Create issue for unknown CSS property (error).
	 */
	unknownProperty(property: string): Issue {
		return {
			code: "unknown-property",
			severity: "error",
			message: `Unknown CSS property '${property}'`,
		};
	},

	/**
	 * Create issue for invalid syntax (error).
	 */
	invalidSyntax(message: string, location?: { offset: number; length: number }): Issue {
		const issue: Issue = {
			code: "invalid-syntax",
			severity: "error",
			message,
		};
		if (location !== undefined) {
			issue.location = location;
		}
		return issue;
	},

	/**
	 * Create issue for deprecated syntax (warning).
	 */
	deprecatedSyntax(property: CSSLonghandProperty, message: string, suggestion?: string): Issue {
		const issue: Issue = {
			code: "deprecated-syntax",
			severity: "warning",
			property,
			message,
		};
		if (suggestion !== undefined) {
			issue.suggestion = suggestion;
		}
		return issue;
	},

	/**
	 * Create issue for legacy syntax (warning).
	 */
	legacySyntax(property: CSSLonghandProperty, message: string, suggestion?: string): Issue {
		const issue: Issue = {
			code: "legacy-syntax",
			severity: "warning",
			property,
			message,
		};
		if (suggestion !== undefined) {
			issue.suggestion = suggestion;
		}
		return issue;
	},
};

/**
 * Combine multiple ParseResults into one (for layer/list parsing).
 *
 * @example
 * ```typescript
 * const results = [parseOk(color1), parseOk(color2)];
 * const combined = combineResults(results);
 * // { ok: true, value: [color1, color2], issues: [] }
 * ```
 *
 * @public
 */
export function combineResults<T>(results: ParseResult<T>[]): ParseResult<T[]> {
	const allOk = results.every((r) => r.ok);
	const values = results.map((r) => r.value).filter((v): v is T => v !== undefined);
	const allIssues = results.flatMap((r) => r.issues);

	if (allOk && values.length === results.length) {
		return {
			ok: true,
			value: values,
			issues: allIssues,
		};
	}

	return {
		ok: false,
		issues: allIssues,
	};
}

/**
 * Convert internal Result<T, string> to public ParseResult<T>.
 *
 * @internal
 */
export function toParseResult<T>(result: Result<T, string>, property?: CSSPropertyName): ParseResult<T> {
	if (result.ok) {
		return parseOk(result.value, property);
	}
	// Use generic invalid-value code for Result<T, string> conversions
	return parseErr("invalid-value", result.error, property ? { property } : undefined);
}
