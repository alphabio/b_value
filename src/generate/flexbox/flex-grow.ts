// b_path:: src/generate/flexbox/flex-grow.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { FlexGrow } from "@/core/types";

export function generate(ir: FlexGrow): GenerateResult {
	if (ir === undefined || ir === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(String(ir.value));
}
