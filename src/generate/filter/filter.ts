// b_path:: src/generate/filter/filter.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type * as Type from "@/core/types";
import * as Blur from "./blur";
import * as Brightness from "./brightness";
import * as Contrast from "./contrast";
import * as DropShadow from "./drop-shadow";
import * as Grayscale from "./grayscale";
import * as HueRotate from "./hue-rotate";
import * as Invert from "./invert";
import * as Opacity from "./opacity";
import * as Saturate from "./saturate";
import * as Sepia from "./sepia";
import * as Url from "./url";

/**
 * Generate CSS from filter IR with auto-detection.
 *
 * @param filter - Filter IR
 * @returns GenerateResult with CSS string or error
 *
 * @public
 */
export function generate(filter: Type.FilterFunction): GenerateResult {
	if (!filter || typeof filter !== "object" || !("kind" in filter)) {
		return generateErr("missing-required-field", "Invalid filter IR: missing 'kind' field", {
			suggestion: "Ensure IR was parsed correctly",
		});
	}

	switch (filter.kind) {
		case "blur":
			return generateOk(Blur.toCss(filter));
		case "brightness":
			return generateOk(Brightness.toCss(filter));
		case "contrast":
			return generateOk(Contrast.toCss(filter));
		case "drop-shadow":
			return generateOk(DropShadow.toCss(filter));
		case "grayscale":
			return generateOk(Grayscale.toCss(filter));
		case "hue-rotate":
			return generateOk(HueRotate.toCss(filter));
		case "invert":
			return generateOk(Invert.toCss(filter));
		case "opacity":
			return generateOk(Opacity.toCss(filter));
		case "saturate":
			return generateOk(Saturate.toCss(filter));
		case "sepia":
			return generateOk(Sepia.toCss(filter));
		case "url":
			return generateOk(Url.toCss(filter));
		default:
			return generateErr("unsupported-kind", `Unknown filter kind: ${(filter as { kind?: string }).kind}`, {
				suggestion: "Check that filter IR is valid",
			});
	}
}
