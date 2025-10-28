// b_path:: src/utils/parse/color.ts
// // b_path:: src/utils/parse/color.ts

// TODO: LLM -> Let's chat about this -> READ next 5 lines only

// import type { Result } from "@/core/result";
// import type { Color } from "@/core/types/color";
// import * as ColorParse from "@/parse/color"; <-- We should not be importing from parse here

// /**
//  * Parse a CSS color value with auto-detection of format.
//  *
//  * Convenience helper that dispatches to appropriate color parser
//  * based on input format detection.
//  *
//  * @param input - CSS color string
//  * @returns Result containing parsed Color IR or error message
//  *
//  * @internal
//  */
// export function parseColor(input: string): Result<Color, string> {
// 	const trimmed = input.trim();

// 	// Try hex - starts with #
// 	if (trimmed.startsWith("#")) {
// 		return ColorParse.Hex.parse(trimmed);
// 	}

// 	// Try function syntax - contains (
// 	if (trimmed.includes("(")) {
// 		const lower = trimmed.toLowerCase();

// 		// Check function name prefix
// 		if (lower.startsWith("rgb(") || lower.startsWith("rgba(")) {
// 			return ColorParse.Rgb.parse(trimmed);
// 		}
// 		if (lower.startsWith("hsl(") || lower.startsWith("hsla(")) {
// 			return ColorParse.Hsl.parse(trimmed);
// 		}
// 		if (lower.startsWith("hwb(")) {
// 			return ColorParse.Hwb.parse(trimmed);
// 		}
// 		if (lower.startsWith("lab(")) {
// 			return ColorParse.Lab.parse(trimmed);
// 		}
// 		if (lower.startsWith("lch(")) {
// 			return ColorParse.Lch.parse(trimmed);
// 		}
// 		if (lower.startsWith("oklab(")) {
// 			return ColorParse.Oklab.parse(trimmed);
// 		}
// 		if (lower.startsWith("oklch(")) {
// 			return ColorParse.Oklch.parse(trimmed);
// 		}
// 	}

// 	// Try special keywords - transparent, currentcolor
// 	const lower = trimmed.toLowerCase();
// 	if (lower === "transparent" || lower === "currentcolor") {
// 		return ColorParse.Special.parse(trimmed);
// 	}

// 	// Try system color keywords
// 	const systemResult = ColorParse.System.parse(trimmed);
// 	if (systemResult.ok) {
// 		return systemResult;
// 	}

// 	// Try named colors - fallback
// 	return ColorParse.Named.parse(trimmed);
// }
