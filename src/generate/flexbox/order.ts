// b_path:: src/generate/flexbox/order.ts
import type { Order } from "@/core/types";

export function toCss(ir: Order): string {
	return String(ir.value);
}
