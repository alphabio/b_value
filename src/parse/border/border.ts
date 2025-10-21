// b_path:: src/parse/border/border.ts

import { type ParseResult, parseErr, toParseResult } from "@/core/result";

import * as Color from "./color";
import * as Radius from "./radius";
import * as Style from "./style";
import * as Width from "./width";

export function parse(value: string): ParseResult<unknown> {
	const widthResult = Width.parse(value);
	if (widthResult.ok) return toParseResult(widthResult);

	const styleResult = Style.parse(value);
	if (styleResult.ok) return toParseResult(styleResult);

	const radiusResult = Radius.parse(value);
	if (radiusResult.ok) return toParseResult(radiusResult);

	const colorResult = Color.parse(value);
	if (colorResult.ok) return toParseResult(colorResult);

	return parseErr("Invalid border property value", {
		suggestion: "Expected width, style, radius, or color",
	});
}
