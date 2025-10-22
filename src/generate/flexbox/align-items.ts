// b_path:: src/generate/flexbox/align-items.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { AlignItems } from "@/core/types";

export function generate(ir: AlignItems): GenerateResult {
	if (ir === undefined || ir === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(ir.value);
}
