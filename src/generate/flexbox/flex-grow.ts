// b_path:: src/generate/flexbox/flex-grow.ts
import type { FlexGrow } from "@/core/types";

export function toCss(ir: FlexGrow): string {
	return String(ir.value);
}
