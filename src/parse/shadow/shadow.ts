// b_path:: src/parse/shadow/shadow.ts

import { type ParseResult, parseErr, toParseResult } from "@/core/result";
import type * as Type from "@/core/types/shadow";

import * as BoxShadow from "./box-shadow";
import * as TextShadow from "./text-shadow";

export type Shadow = Type.BoxShadow | Type.TextShadow;

export function parse(value: string): ParseResult<Shadow> {
	const boxResult = BoxShadow.parse(value);
	if (boxResult.ok) return toParseResult(boxResult);

	const textResult = TextShadow.parse(value);
	if (textResult.ok) return toParseResult(textResult);

	return parseErr("Invalid shadow value", {
		suggestion: "Expected box-shadow (with optional inset) or text-shadow format",
	});
}
