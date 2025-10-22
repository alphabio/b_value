// b_path:: src/parse/flexbox/order.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

export function parse(css: string): Result<Type.Order, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });
		if (ast.type !== "Value") return err("Expected Value node");
		const children = ast.children.toArray();
		if (children.length !== 1) return err(`Expected single value, got ${children.length} values`);
		const node = children[0];
		if (!node || node.type !== "Number") return err("Expected integer");
		const value = Number.parseInt(node.value, 10);
		if (!Number.isInteger(value)) return err("order must be an integer");
		return ok({ kind: "order", value });
	} catch (error) {
		return err(`Failed to parse order: ${error instanceof Error ? error.message : String(error)}`);
	}
}
