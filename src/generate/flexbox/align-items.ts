// b_path:: src/generate/flexbox/align-items.ts
import type { AlignItems } from "@/core/types";

export function toCss(ir: AlignItems): string {
	return ir.value;
}
