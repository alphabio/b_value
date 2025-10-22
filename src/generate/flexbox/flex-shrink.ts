// b_path:: src/generate/flexbox/flex-shrink.ts
import type { FlexShrink } from "@/core/types";

export function toCss(ir: FlexShrink): string {
	return String(ir.value);
}
