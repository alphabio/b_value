// b_path:: src/generate/flexbox/align-self.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { AlignSelf } from "@/core/types";

export function generate(ir: AlignSelf): GenerateResult {
	if (ir === undefined || ir === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(ir.value);
}
