// b_path:: src/parse/flexbox/align-content.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

const VALID_VALUES = [
	"flex-start",
	"flex-end",
	"center",
	"space-between",
	"space-around",
	"space-evenly",
	"stretch",
	"start",
	"end",
] as const;

export function parse(css: string): Result<Type.AlignContent, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });
		if (ast.type !== "Value") return err("Expected Value node");
		const children = ast.children.toArray();
		if (children.length !== 1) return err(`Expected single value, got ${children.length} values`);
		const node = children[0];
		if (!node || node.type !== "Identifier") return err("Expected identifier");
		const value = node.name.toLowerCase();
		if (VALID_VALUES.some((v) => v === value)) {
			return ok({ kind: "align-content", value: value as Type.AlignContent["value"] });
		}
		return err(`Invalid align-content value: ${value}`);
	} catch (error) {
		return err(`Failed to parse align-content: ${error instanceof Error ? error.message : String(error)}`);
	}
}
