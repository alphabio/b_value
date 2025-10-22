// b_path:: src/parse/flexbox/flex-basis.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ParseUtils from "@/utils/parse";

export function parse(css: string): Result<Type.FlexBasis, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });
		if (ast.type !== "Value") return err("Expected Value node");
		const children = ast.children.toArray();
		if (children.length !== 1) return err(`Expected single value, got ${children.length} values`);
		const node = children[0];
		if (!node) return err("Expected flex-basis value");

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();
			if (
				keyword === "auto" ||
				keyword === "content" ||
				keyword === "max-content" ||
				keyword === "min-content" ||
				keyword === "fit-content"
			) {
				return ok({ kind: "flex-basis", value: keyword });
			}
			return err(`Invalid flex-basis keyword: ${keyword}`);
		}

		if (node.type === "Number") {
			const value = Number.parseFloat(node.value);
			if (value === 0) return ok({ kind: "flex-basis", value: { value: 0, unit: "px" } });
			return err("Length values require a unit (except for 0)");
		}

		const lengthResult = ParseUtils.parseLengthPercentageNode(node);
		if (!lengthResult.ok) return err(lengthResult.error);
		return ok({ kind: "flex-basis", value: lengthResult.value });
	} catch (error) {
		return err(`Failed to parse flex-basis: ${error instanceof Error ? error.message : String(error)}`);
	}
}
