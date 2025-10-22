// b_path:: src/generate/flexbox/justify-content.ts
import type { JustifyContent } from "@/core/types";

export function toCss(ir: JustifyContent): string {
	return ir.value;
}
