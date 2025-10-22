// b_path:: src/generate/flexbox/align-content.ts
import type { AlignContent } from "@/core/types";

export function toCss(ir: AlignContent): string {
	return ir.value;
}
