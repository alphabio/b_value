// b_path:: src/parse/color/color-function.ts
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as AstUtils from "@/utils/ast";

/**
 * Parse color() function with explicit color space.
 *
 * Syntax: color(colorspace c1 c2 c3 [ / alpha ]?)
 *
 * @param input - CSS color() function string
 * @returns Result with ColorFunction IR or error
 *
 * @example
 * ```typescript
 * parse("color(display-p3 0.928 0.322 0.203)");
 * parse("color(srgb 0.5 0.2 0.8 / 0.8)");
 * parse("color(xyz-d50 0.3 0.4 0.5)");
 * ```
 *
 * @public
 */
export function parse(input: string): Result<Type.ColorFunction, string> {
	try {
		const astResult = AstUtils.parseCssString(input);
		if (!astResult.ok) return err(astResult.error);

		const fnResult = AstUtils.findFunctionNode(astResult.value, "color");
		if (!fnResult.ok) return err(fnResult.error);

		const children = fnResult.value.children.toArray();

		if (children.length < 4) {
			return err("color() requires at least 4 arguments: colorspace + 3 channels");
		}

		// 1. Parse color space
		const colorSpaceNode = children[0];
		if (!colorSpaceNode || colorSpaceNode.type !== "Identifier") {
			return err("Expected color space identifier");
		}

		const colorSpace = colorSpaceNode.name.toLowerCase();
		const validSpaces = [
			"srgb",
			"srgb-linear",
			"display-p3",
			"a98-rgb",
			"prophoto-rgb",
			"rec2020",
			"xyz",
			"xyz-d50",
			"xyz-d65",
		];

		if (!validSpaces.includes(colorSpace)) {
			return err(`Invalid color space: ${colorSpace}`);
		}

		// 2. Parse 3 channel values
		const channels: [number, number, number] = [0, 0, 0];

		for (let i = 0; i < 3; i++) {
			const channelNode = children[i + 1];
			if (!channelNode) {
				return err(`Missing channel ${i + 1}`);
			}

			if (channelNode.type === "Number") {
				const value = Number.parseFloat(channelNode.value);
				if (Number.isNaN(value)) {
					return err(`Invalid channel ${i + 1} value`);
				}
				channels[i] = value;
			} else if (channelNode.type === "Percentage") {
				const value = Number.parseFloat(channelNode.value) / 100;
				if (Number.isNaN(value)) {
					return err(`Invalid channel ${i + 1} percentage`);
				}
				channels[i] = value;
			} else {
				return err(`Expected number or percentage for channel ${i + 1}`);
			}
		}

		// 3. Parse optional alpha after /
		let alpha: number | undefined;
		let idx = 4;

		if (idx < children.length) {
			const slashNode = children[idx];
			if (slashNode?.type === "Operator" && slashNode.value === "/") {
				idx++;
				const alphaNode = children[idx];
				if (!alphaNode) {
					return err("Expected alpha value after /");
				}

				if (alphaNode.type === "Number") {
					alpha = Number.parseFloat(alphaNode.value);
				} else if (alphaNode.type === "Percentage") {
					alpha = Number.parseFloat(alphaNode.value) / 100;
				} else {
					return err("Expected number or percentage for alpha");
				}

				if (Number.isNaN(alpha) || alpha < 0 || alpha > 1) {
					return err("Alpha must be between 0 and 1");
				}
			}
		}

		return ok({
			kind: "color",
			colorSpace: colorSpace as Type.ColorFunction["colorSpace"],
			channels,
			...(alpha !== undefined && { alpha }),
		});
	} catch (e) {
		return err(`Failed to parse color(): ${e instanceof Error ? e.message : String(e)}`);
	}
}
