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
 * import { cursorKeywordsSchema } from "../keywords/cursor-keywords";
 *
 * const keyword = cursorKeywordsSchema.parse("pointer");
 * ```
 *
 * @public
 */
export const cursorKeywordsSchema = z
	.union([
		z.literal("auto").describe("browser determines cursor based on context"),
		z.literal("default").describe("platform-dependent default cursor (usually arrow)"),
		z.literal("none").describe("no cursor is rendered"),
		z.literal("context-menu").describe("context menu is available"),
		z.literal("help").describe("help information is available"),
		z.literal("pointer").describe("link or clickable element (usually hand)"),
		z.literal("progress").describe("program is busy but user can still interact"),
		z.literal("wait").describe("program is busy"),
		z.literal("cell").describe("cell or set of cells can be selected"),
		z.literal("crosshair").describe("simple crosshair"),
		z.literal("text").describe("text can be selected (usually I-beam)"),
		z.literal("vertical-text").describe("vertical text can be selected"),
		z.literal("alias").describe("alias or shortcut is to be created"),
		z.literal("copy").describe("something is to be copied"),
		z.literal("move").describe("something is to be moved"),
		z.literal("no-drop").describe("drop is not allowed at current location"),
		z.literal("not-allowed").describe("requested action will not be executed"),
		z.literal("grab").describe("something can be grabbed"),
		z.literal("grabbing").describe("something is being grabbed"),
		z.literal("e-resize").describe("edge is to be moved east"),
		z.literal("n-resize").describe("edge is to be moved north"),
		z.literal("ne-resize").describe("edge is to be moved northeast"),
		z.literal("nw-resize").describe("edge is to be moved northwest"),
		z.literal("s-resize").describe("edge is to be moved south"),
		z.literal("se-resize").describe("edge is to be moved southeast"),
		z.literal("sw-resize").describe("edge is to be moved southwest"),
		z.literal("w-resize").describe("edge is to be moved west"),
		z.literal("ew-resize").describe("bidirectional resize cursor (east-west)"),
		z.literal("ns-resize").describe("bidirectional resize cursor (north-south)"),
		z.literal("nesw-resize").describe("bidirectional resize cursor (northeast-southwest)"),
		z.literal("nwse-resize").describe("bidirectional resize cursor (northwest-southeast)"),
		z.literal("col-resize").describe("column can be resized horizontally"),
		z.literal("row-resize").describe("row can be resized vertically"),
		z.literal("all-scroll").describe("scrolling in any direction"),
		z.literal("zoom-in").describe("something can be zoomed in"),
		z.literal("zoom-out").describe("something can be zoomed out"),
	])
	.describe("CSS cursor property keyword values");

/**
 * Array of all cursor keyword values.
 *
 * @public
 */
export const CURSOR_KEYWORDS = cursorKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for cursor keywords.
 *
 * @public
 */
export type CursorKeyword = z.infer<typeof cursorKeywordsSchema>;

/**
 * Metadata for cursor keyword options.
 *
 * @public
 */
export const cursorKeywordOptions = cursorKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for cursor keyword options metadata.
 *
 * @public
 */
export type CursorKeywordOptions = typeof cursorKeywordOptions;
