// b_path:: src/parse/text/text.ts

import { type ParseResult, parseErr, toParseResult } from "@/core/result";

import * as Color from "./color";
import * as Line from "./line";
import * as Style from "./style";
import * as Thickness from "./thickness";

export function parse(value: string): ParseResult<unknown> {
	const lineResult = Line.parse(value);
	if (lineResult.ok) return toParseResult(lineResult);

	const styleResult = Style.parse(value);
	if (styleResult.ok) return toParseResult(styleResult);

	const thicknessResult = Thickness.parse(value);
	if (thicknessResult.ok) return toParseResult(thicknessResult);

	const colorResult = Color.parse(value);
	if (colorResult.ok) return toParseResult(colorResult);

	return parseErr("invalid-value", "Invalid text decoration property value", {
		suggestion: "Expected line, style, thickness, or color",
	});
}
