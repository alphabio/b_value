// b_path:: src/generate/flexbox/align-content.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { AlignContent } from "@/core/types";

export function generate(ir: AlignContent): GenerateResult {
	if (ir === undefined || ir === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(ir.value);
}
