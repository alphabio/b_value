// b_path:: src/parse/flexbox/flex-wrap.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

export function parse(css: string): Result<Type.FlexWrap, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });
		if (ast.type !== "Value") return err("Expected Value node");
		const children = ast.children.toArray();
		if (children.length !== 1) return err(`Expected single value, got ${children.length} values`);
		const node = children[0];
		if (!node || node.type !== "Identifier") return err("Expected identifier");
		const value = node.name.toLowerCase();
		if (value === "nowrap" || value === "wrap" || value === "wrap-reverse") {
			return ok({ kind: "flex-wrap", value });
		}
		return err(`Invalid flex-wrap value: ${value}`);
	} catch (error) {
		return err(`Failed to parse flex-wrap: ${error instanceof Error ? error.message : String(error)}`);
	}
}
