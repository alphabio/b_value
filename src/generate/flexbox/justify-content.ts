// b_path:: src/generate/flexbox/justify-content.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { JustifyContent } from "@/core/types";

export function generate(ir: JustifyContent): GenerateResult {
	if (ir === undefined || ir === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(ir.value);
}
