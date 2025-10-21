// b_path:: src/parse/outline/outline.ts

import { type ParseResult, parseErr, toParseResult } from "@/core/result";

import * as Color from "./color";
import * as Offset from "./offset";
import * as Style from "./style";
import * as Width from "./width";

export function parse(value: string): ParseResult<unknown> {
	const widthResult = Width.parse(value);
	if (widthResult.ok) return toParseResult(widthResult);

	const styleResult = Style.parse(value);
	if (styleResult.ok) return toParseResult(styleResult);

	const colorResult = Color.parse(value);
	if (colorResult.ok) return toParseResult(colorResult);

	const offsetResult = Offset.parse(value);
	if (offsetResult.ok) return toParseResult(offsetResult);

	return parseErr("Invalid outline property value", {
		suggestion: "Expected width, style, color, or offset",
	});
}
