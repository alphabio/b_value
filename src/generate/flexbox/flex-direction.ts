// b_path:: src/generate/flexbox/flex-direction.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { FlexDirection } from "@/core/types";

export function generate(ir: FlexDirection): GenerateResult {
	if (ir === undefined || ir === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(ir.value);
}
