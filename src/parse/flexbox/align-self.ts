// b_path:: src/parse/flexbox/align-self.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

const VALID_VALUES = [
	"auto",
	"flex-start",
	"flex-end",
	"center",
	"baseline",
	"stretch",
	"start",
	"end",
	"self-start",
	"self-end",
] as const;

export function parse(css: string): Result<Type.AlignSelf, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });
		if (ast.type !== "Value") return err("Expected Value node");
		const children = ast.children.toArray();
		if (children.length !== 1) return err(`Expected single value, got ${children.length} values`);
		const node = children[0];
		if (!node || node.type !== "Identifier") return err("Expected identifier");
		const value = node.name.toLowerCase();
		if (VALID_VALUES.some((v) => v === value)) {
			return ok({ kind: "align-self", value: value as Type.AlignSelf["value"] });
		}
		return err(`Invalid align-self value: ${value}`);
	} catch (error) {
		return err(`Failed to parse align-self: ${error instanceof Error ? error.message : String(error)}`);
	}
}
