// b_path:: src/parse/flexbox/flex-shrink.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

export function parse(css: string): Result<Type.FlexShrink, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });
		if (ast.type !== "Value") return err("Expected Value node");
		const children = ast.children.toArray();
		if (children.length !== 1) return err(`Expected single value, got ${children.length} values`);
		const node = children[0];
		if (!node || node.type !== "Number") return err("Expected number");
		const value = Number.parseFloat(node.value);
		if (value < 0) return err("flex-shrink must be non-negative");
		return ok({ kind: "flex-shrink", value });
	} catch (error) {
		return err(`Failed to parse flex-shrink: ${error instanceof Error ? error.message : String(error)}`);
	}
}
