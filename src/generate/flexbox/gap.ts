// b_path:: src/generate/flexbox/gap.ts
import type { Gap } from "@/core/types";
import * as GenUtils from "@/utils/generate";

export function toCss(ir: Gap): string {
	if (typeof ir.value === "string") {
		return ir.value;
	}
	return GenUtils.lengthPercentageToCss(ir.value);
}
