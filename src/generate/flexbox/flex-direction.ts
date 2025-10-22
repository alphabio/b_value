// b_path:: src/generate/flexbox/flex-direction.ts
import type { FlexDirection } from "@/core/types";

export function toCss(ir: FlexDirection): string {
	return ir.value;
}
