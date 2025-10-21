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
 * Issue reported during parsing or generation.
 *
 * @public
 */
export type Issue = {
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
 * @example
 * ```typescript
 * const result = Parse.Color.parse("#ff0000");
 * if (result.ok) {
 *   console.log(result.value);  // Color IR
 * } else {
 *   console.error(result.issues[0].message);
 *   console.log(result.issues[0].suggestion);
 * }
 * ```
 *
 * @public
 */
export type ParseResult<T = unknown> = {
	/** Success flag */
	ok: boolean;
	/** Parsed value (present when ok=true) */
	value?: T;
	/** Property name from CSS declaration (Module API: undefined, Universal API: present) */
	property?: string;
	/** Issues encountered (always present, empty array if none) */
	issues: Issue[];
};

/**
 * Result of generating CSS from intermediate representation.
 *
 * Used by Module API (e.g., Generate.Color.generate()) and Universal API.
 *
 * @example
 * ```typescript
 * const result = Generate.Color.generate(colorIR);
 * if (result.ok) {
 *   console.log(result.value);  // "#ff0000"
 * }
 * ```
 *
 * @public
 */
export type GenerateResult = {
	/** Success flag */
	ok: boolean;
	/** Generated CSS string (present when ok=true) */
	value?: string;
	/** Property name when generating declarations */
	property?: string;
	/** Issues encountered (always present, empty array if none) */
	issues: Issue[];
};

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
 * return parseErr("Invalid color format");
 * return parseErr("Invalid hex color", { suggestion: "Use #RRGGBB format" });
 * ```
 *
 * @public
 */
export function parseErr<T = never>(
	message: string,
	options?: {
		suggestion?: string;
		action?: string;
		location?: { offset: number; length: number };
		property?: string;
	},
): ParseResult<T> {
	const issue: Issue = {
		severity: "error",
		message,
	};
	if (options?.suggestion !== undefined) issue.suggestion = options.suggestion;
	if (options?.action !== undefined) issue.action = options.action;
	if (options?.location !== undefined) issue.location = options.location;

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
 * return generateErr("Invalid IR structure");
 * return generateErr("Missing required field", { suggestion: "Add 'kind' field" });
 * ```
 *
 * @public
 */
export function generateErr(
	message: string,
	options?: {
		suggestion?: string;
		action?: string;
		property?: string;
	},
): GenerateResult {
	const issue: Issue = {
		severity: "error",
		message,
	};
	if (options?.suggestion !== undefined) issue.suggestion = options.suggestion;
	if (options?.action !== undefined) issue.action = options.action;

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
 * return withWarning(parseOk(colorIR), "Legacy comma syntax");
 * ```
 *
 * @public
 */
export function withWarning<T>(result: ParseResult<T>, message: string, suggestion?: string): ParseResult<T> {
	const issue: Issue = {
		severity: "warning",
		message,
	};
	if (suggestion !== undefined) issue.suggestion = suggestion;
	return addIssue(result, issue);
}

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
export function toParseResult<T>(result: Result<T, string>, property?: string): ParseResult<T> {
	if (result.ok) {
		return parseOk(result.value, property);
	}
	if (property !== undefined) {
		return parseErr(result.error, { property });
	}
	return parseErr(result.error);
}
