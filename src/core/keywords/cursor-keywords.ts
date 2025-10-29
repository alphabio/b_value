// b_path:: src/core/keywords/cursor-keywords.ts
import { z } from "zod";

/**
 * CSS cursor keyword values.
 *
 * The cursor property sets the mouse cursor to display when the mouse pointer is over an element.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/cursor}
 *
 * @example
 * ```typescript
 * import { cursorKeywordsSchema } from "@/core/keywords/cursor-keywords";
 *
 * const keyword = cursorKeywordsSchema.parse("pointer");
 * ```
 *
 * @public
 */
export const cursorKeywordsSchema = z.enum([
	"auto",
	"default",
	"none",
	"context-menu",
	"help",
	"pointer",
	"progress",
	"wait",
	"cell",
	"crosshair",
	"text",
	"vertical-text",
	"alias",
	"copy",
	"move",
	"no-drop",
	"not-allowed",
	"grab",
	"grabbing",
	"e-resize",
	"n-resize",
	"ne-resize",
	"nw-resize",
	"s-resize",
	"se-resize",
	"sw-resize",
	"w-resize",
	"ew-resize",
	"ns-resize",
	"nesw-resize",
	"nwse-resize",
	"col-resize",
	"row-resize",
	"all-scroll",
	"zoom-in",
	"zoom-out",
]);

/**
 * Array of all cursor keyword values.
 *
 * @public
 */
export const CURSOR_KEYWORDS = cursorKeywordsSchema.options;

/**
 * TypeScript type for cursor keywords.
 *
 * @public
 */
export type CursorKeyword = z.infer<typeof cursorKeywordsSchema>;

/**
 * Descriptions for cursor keywords.
 *
 * @internal
 */
const CURSOR_DESCRIPTIONS: Record<CursorKeyword, string> = {
	auto: "browser determines cursor based on context",
	default: "platform-dependent default cursor (usually arrow)",
	none: "no cursor is rendered",
	"context-menu": "context menu is available",
	help: "help information is available",
	pointer: "link or clickable element (usually hand)",
	progress: "program is busy but user can still interact",
	wait: "program is busy",
	cell: "cell or set of cells can be selected",
	crosshair: "simple crosshair",
	text: "text can be selected (usually I-beam)",
	"vertical-text": "vertical text can be selected",
	alias: "alias or shortcut is to be created",
	copy: "something is to be copied",
	move: "something is to be moved",
	"no-drop": "drop is not allowed at current location",
	"not-allowed": "requested action will not be executed",
	grab: "something can be grabbed",
	grabbing: "something is being grabbed",
	"e-resize": "edge is to be moved east",
	"n-resize": "edge is to be moved north",
	"ne-resize": "edge is to be moved northeast",
	"nw-resize": "edge is to be moved northwest",
	"s-resize": "edge is to be moved south",
	"se-resize": "edge is to be moved southeast",
	"sw-resize": "edge is to be moved southwest",
	"w-resize": "edge is to be moved west",
	"ew-resize": "bidirectional resize cursor (east-west)",
	"ns-resize": "bidirectional resize cursor (north-south)",
	"nesw-resize": "bidirectional resize cursor (northeast-southwest)",
	"nwse-resize": "bidirectional resize cursor (northwest-southeast)",
	"col-resize": "column can be resized horizontally",
	"row-resize": "row can be resized vertically",
	"all-scroll": "scrolling in any direction",
	"zoom-in": "something can be zoomed in",
	"zoom-out": "something can be zoomed out",
};

/**
 * Metadata for cursor keyword options.
 *
 * @public
 */
export const cursorKeywordOptions = CURSOR_KEYWORDS.map((value) => ({
	value,
	description: CURSOR_DESCRIPTIONS[value],
}));

/**
 * Type for cursor keyword options metadata.
 *
 * @public
 */
export type CursorKeywordOptions = typeof cursorKeywordOptions;
