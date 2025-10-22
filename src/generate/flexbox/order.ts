// b_path:: src/generate/flexbox/order.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { Order } from "@/core/types";

export function generate(ir: Order): GenerateResult {
	if (ir === undefined || ir === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(String(ir.value));
}
