// b_path:: src/generate/flexbox/align-self.ts
import type { AlignSelf } from "@/core/types";

export function toCss(ir: AlignSelf): string {
	return ir.value;
}
