// b_path:: src/core/types/ratio.ts
import { z } from "zod";

/**
 * CSS ratio value.
 *
 * A ratio consists of two numbers separated by a slash (/).
 * Used in properties like aspect-ratio, resolution, and other ratio-based values.
 *
 * Per CSS spec: <ratio> = <number> [ / <number> ]?
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/ratio}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio}
 *
 * @example
 * ```typescript
 * import { ratioSchema } from "@/core/types/ratio";
 *
 * // Simple ratio
 * const ratio1: Ratio = { numerator: 16, denominator: 9 };
 *
 * // Single number (denominator defaults to 1)
 * const ratio2: Ratio = { numerator: 4, denominator: 3 };
 *
 * // Auto keyword
 * const ratio3: Ratio = "auto";
 * ```
 *
 * @public
 */
export const ratioSchema = z.union([
	// Explicit ratio with numerator and denominator
	z.object({
		numerator: z.number().positive().describe("numerator of the ratio"),
		denominator: z.number().positive().describe("denominator of the ratio"),
	}),

	// Auto keyword for automatic ratio
	z
		.literal("auto")
		.describe("automatic ratio based on content"),
]);

/**
 * TypeScript type for ratio.
 * @public
 */
export type Ratio = z.infer<typeof ratioSchema>;

/**
 * CSS ratio list.
 *
 * An array of ratios used in properties that accept multiple ratios.
 * Common in resolution and aspect-ratio contexts.
 *
 * @example
 * ```typescript
 * import { ratioListSchema } from "@/core/types/ratio";
 *
 * const ratios: RatioList = [
 *   { numerator: 16, denominator: 9 },
 *   { numerator: 4, denominator: 3 },
 *   "auto"
 * ];
 * ```
 *
 * @public
 */
export const ratioListSchema = z
	.array(ratioSchema)
	.min(1, "Ratio list must contain at least 1 ratio")
	.describe("array of ratios for multi-ratio CSS properties");

/**
 * TypeScript type for ratio list.
 * @public
 */
export type RatioList = z.infer<typeof ratioListSchema>;

/**
 * Common aspect ratio presets.
 *
 * Predefined ratios for common use cases like video, images, and design.
 *
 * @example
 * ```typescript
 * import { COMMON_ASPECT_RATIOS } from "@/core/types/ratio";
 *
 * const videoRatio = COMMON_ASPECT_RATIOS["16:9"]; // { numerator: 16, denominator: 9 }
 * const squareRatio = COMMON_ASPECT_RATIOS["1:1"]; // { numerator: 1, denominator: 1 }
 * ```
 *
 * @public
 */
export const COMMON_ASPECT_RATIOS = {
	"21:9": { numerator: 21, denominator: 9 },
	"16:9": { numerator: 16, denominator: 9 },
	"3:2": { numerator: 3, denominator: 2 },
	"4:3": { numerator: 4, denominator: 3 },
	"1:1": { numerator: 1, denominator: 1 },
	"3:4": { numerator: 3, denominator: 4 },
	"2:3": { numerator: 2, denominator: 3 },
	"9:16": { numerator: 9, denominator: 16 },
	"9:21": { numerator: 9, denominator: 21 },
} as const;

/**
 * Type for common aspect ratio presets.
 * @public
 */
export type CommonAspectRatio = typeof COMMON_ASPECT_RATIOS;

/**
 * Helper function to create a ratio from a string.
 *
 * @param ratioString - String in format "numerator:denominator" or "numerator/denominator"
 * @returns Ratio object or null if invalid format
 *
 * @example
 * ```typescript
 * import { createRatioFromString } from "@/core/types/ratio";
 *
 * const ratio1 = createRatioFromString("16:9"); // { numerator: 16, denominator: 9 }
 * const ratio2 = createRatioFromString("4/3"); // { numerator: 4, denominator: 3 }
 * ```
 *
 * @public
 */
export function createRatioFromString(ratioString: string): Ratio | null {
	const colonMatch = ratioString.match(/^(\d+):(\d+)$/);
	const slashMatch = ratioString.match(/^(\d+)\/(\d+)$/);

	if (colonMatch?.[1] && colonMatch?.[2]) {
		const numerator = Number.parseInt(colonMatch[1], 10);
		const denominator = Number.parseInt(colonMatch[2], 10);
		if (numerator > 0 && denominator > 0) {
			return { numerator, denominator };
		}
	}

	if (slashMatch?.[1] && slashMatch?.[2]) {
		const numerator = Number.parseInt(slashMatch[1], 10);
		const denominator = Number.parseInt(slashMatch[2], 10);
		if (numerator > 0 && denominator > 0) {
			return { numerator, denominator };
		}
	}

	return null;
}

/**
 * Helper function to format a ratio as a string.
 *
 * @param ratio - Ratio object
 * @returns Formatted string representation
 *
 * @example
 * ```typescript
 * import { formatRatioAsString } from "@/core/types/ratio";
 *
 * const ratioString = formatRatioAsString({ numerator: 16, denominator: 9 }); // "16:9"
 * ```
 *
 * @public
 */
export function formatRatioAsString(ratio: Ratio): string {
	if (ratio === "auto") {
		return "auto";
	}

	return `${ratio.numerator}:${ratio.denominator}`;
}
