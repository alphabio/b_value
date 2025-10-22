// b_path:: src/generate/flexbox/flex-wrap.ts
import type { FlexWrap } from "@/core/types";

export function toCss(ir: FlexWrap): string {
	return ir.value;
}
