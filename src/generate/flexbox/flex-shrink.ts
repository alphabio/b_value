// b_path:: src/generate/flexbox/flex-shrink.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { FlexShrink } from "@/core/types";

export function generate(ir: FlexShrink): GenerateResult {
	if (ir === undefined || ir === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(String(ir.value));
}
