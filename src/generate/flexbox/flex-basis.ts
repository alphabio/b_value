// b_path:: src/generate/flexbox/flex-basis.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { FlexBasis } from "@/core/types";
import * as GenUtils from "@/utils/generate";

export function generate(ir: FlexBasis): GenerateResult {
	if (ir === undefined || ir === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	if (typeof ir.value === "string") {
		return generateOk(ir.value);
	}
	return GenUtils.lengthPercentageToCss(ir.value);
}
