// b_path:: src/generate/flexbox/flex-basis.ts
import type { FlexBasis } from "@/core/types";
import * as GenUtils from "@/utils/generate";

export function toCss(ir: FlexBasis): string {
	if (typeof ir.value === "string") {
		return ir.value;
	}
	return GenUtils.lengthPercentageToCss(ir.value);
}
