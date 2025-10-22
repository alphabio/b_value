// b_path:: src/generate/flexbox/flex-wrap.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { FlexWrap } from "@/core/types";

export function generate(ir: FlexWrap): GenerateResult {
	if (ir === undefined || ir === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(ir.value);
}
