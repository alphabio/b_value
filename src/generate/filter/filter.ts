// b_path:: src/generate/filter/filter.ts

import { type GenerateResult, generateErr } from "@/core/result";
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
			return Blur.generate(filter);
		case "brightness":
			return Brightness.generate(filter);
		case "contrast":
			return Contrast.generate(filter);
		case "drop-shadow":
			return DropShadow.generate(filter);
		case "grayscale":
			return Grayscale.generate(filter);
		case "hue-rotate":
			return HueRotate.generate(filter);
		case "invert":
			return Invert.generate(filter);
		case "opacity":
			return Opacity.generate(filter);
		case "saturate":
			return Saturate.generate(filter);
		case "sepia":
			return Sepia.generate(filter);
		case "url":
			return Url.generate(filter);
		default:
			return generateErr("unsupported-kind", `Unknown filter kind: ${(filter as { kind?: string }).kind}`, {
				suggestion: "Check that filter IR is valid",
			});
	}
}
