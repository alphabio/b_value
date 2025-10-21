// b_path:: src/parse/background/background.ts

import { type ParseResult, parseErr, toParseResult } from "@/core/result";

import * as Attachment from "./attachment";
import * as Clip from "./clip";
import * as Origin from "./origin";
import * as Repeat from "./repeat";
import * as Size from "./size";

export function parse(value: string): ParseResult<unknown> {
	const sizeResult = Size.parse(value);
	if (sizeResult.ok) return toParseResult(sizeResult);

	const repeatResult = Repeat.parse(value);
	if (repeatResult.ok) return toParseResult(repeatResult);

	const attachmentResult = Attachment.parse(value);
	if (attachmentResult.ok) return toParseResult(attachmentResult);

	const clipResult = Clip.parse(value);
	if (clipResult.ok) return toParseResult(clipResult);

	const originResult = Origin.parse(value);
	if (originResult.ok) return toParseResult(originResult);

	return parseErr("invalid-value", "Invalid background property value", {
		suggestion: "Expected size, repeat, attachment, clip, or origin",
	});
}
