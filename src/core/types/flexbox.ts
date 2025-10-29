// b_path:: src/core/types/flexbox.ts
import { z } from "zod";
import { lengthPercentageAutoSchema } from "./length-percentage";

/**
 * CSS flex-direction property IR.
 *
 * Establishes the main-axis, defining the direction flex items are placed in the flex container.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction}
 *
 * @public
 */
export const flexDirectionSchema = z.object({
	kind: z.literal("flex-direction"),
	value: z.enum(["row", "row-reverse", "column", "column-reverse"], {
		error: () => ({ message: "Expected row | row-reverse | column | column-reverse" }),
	}),
});

export type FlexDirection = z.infer<typeof flexDirectionSchema>;

/**
 * CSS flex-wrap property IR.
 *
 * Sets whether flex items are forced onto one line or can wrap onto multiple lines.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap}
 *
 * @public
 */
export const flexWrapSchema = z.object({
	kind: z.literal("flex-wrap"),
	value: z.enum(["nowrap", "wrap", "wrap-reverse"], {
		error: () => ({ message: "Expected nowrap | wrap | wrap-reverse" }),
	}),
});

export type FlexWrap = z.infer<typeof flexWrapSchema>;

/**
 * CSS justify-content property IR.
 *
 * Defines how the browser distributes space between and around content items along the main-axis.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content}
 *
 * @public
 */
export const justifyContentSchema = z.object({
	kind: z.literal("justify-content"),
	value: z.enum(
		[
			"flex-start",
			"flex-end",
			"center",
			"space-between",
			"space-around",
			"space-evenly",
			"start",
			"end",
			"left",
			"right",
		],
		{
			error: () => ({
				message:
					"Expected flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right",
			}),
		},
	),
});

export type JustifyContent = z.infer<typeof justifyContentSchema>;

/**
 * CSS align-items property IR.
 *
 * Sets the align-self value on all direct children as a group.
 * Controls alignment of items on the cross-axis.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/align-items}
 *
 * @public
 */
export const alignItemsSchema = z.object({
	kind: z.literal("align-items"),
	value: z.enum(["flex-start", "flex-end", "center", "baseline", "stretch", "start", "end", "self-start", "self-end"], {
		error: () => ({
			message: "Expected flex-start | flex-end | center | baseline | stretch | start | end | self-start | self-end",
		}),
	}),
});

export type AlignItems = z.infer<typeof alignItemsSchema>;

/**
 * CSS align-content property IR.
 *
 * Sets the distribution of space between and around content items along the cross-axis.
 * Only has an effect on multi-line flex containers.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/align-content}
 *
 * @public
 */
export const alignContentSchema = z.object({
	kind: z.literal("align-content"),
	value: z.enum(
		["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly", "stretch", "start", "end"],
		{
			error: () => ({
				message:
					"Expected flex-start | flex-end | center | space-between | space-around | space-evenly | stretch | start | end",
			}),
		},
	),
});

export type AlignContent = z.infer<typeof alignContentSchema>;

/**
 * CSS align-self property IR.
 *
 * Overrides the align-items value for a flex item.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/align-self}
 *
 * @public
 */
export const alignSelfSchema = z.object({
	kind: z.literal("align-self"),
	value: z.enum(
		["auto", "flex-start", "flex-end", "center", "baseline", "stretch", "start", "end", "self-start", "self-end"],
		{
			error: () => ({
				message:
					"Expected auto | flex-start | flex-end | center | baseline | stretch | start | end | self-start | self-end",
			}),
		},
	),
});

export type AlignSelf = z.infer<typeof alignSelfSchema>;

/**
 * CSS flex-grow property IR.
 *
 * Sets the flex grow factor, which specifies how much of the remaining space
 * should be assigned to the flex item's main size.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow}
 *
 * @public
 */
export const flexGrowSchema = z.object({
	kind: z.literal("flex-grow"),
	value: z.number().min(0),
});

export type FlexGrow = z.infer<typeof flexGrowSchema>;

/**
 * CSS flex-shrink property IR.
 *
 * Sets the flex shrink factor, which determines how much the flex item will
 * shrink relative to the rest of the flex items when negative free space is distributed.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink}
 *
 * @public
 */
export const flexShrinkSchema = z.object({
	kind: z.literal("flex-shrink"),
	value: z.number().min(0),
});

export type FlexShrink = z.infer<typeof flexShrinkSchema>;

/**
 * CSS flex-basis property IR.
 *
 * Sets the initial main size of a flex item before remaining space is distributed.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis}
 *
 * @public
 */
export const flexBasisSchema = z.object({
	kind: z.literal("flex-basis"),
	value: z.union(
		[
			lengthPercentageAutoSchema,
			z.literal("content"),
			z.literal("max-content"),
			z.literal("min-content"),
			z.literal("fit-content"),
		],
		{
			error: (issue) =>
				issue.code === "invalid_union"
					? { message: "Expected <length-percentage> | auto | content | max-content | min-content | fit-content" }
					: { message: "Invalid flex-basis value" },
		},
	),
});

export type FlexBasis = z.infer<typeof flexBasisSchema>;

/**
 * CSS order property IR.
 *
 * Sets the order to lay out an item in a flex or grid container.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/order}
 *
 * @public
 */
export const orderSchema = z.object({
	kind: z.literal("order"),
	value: z.number().int(),
});

export type Order = z.infer<typeof orderSchema>;

/**
 * CSS gap property IR.
 *
 * Sets the gaps (gutters) between rows and columns.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gap}
 *
 * @public
 */
export const gapSchema = z.object({
	kind: z.literal("gap"),
	value: z.union([lengthPercentageAutoSchema, z.literal("normal")], {
		error: (issue) =>
			issue.code === "invalid_union"
				? { message: "Expected <length-percentage> | auto | normal" }
				: { message: "Invalid gap value" },
	}),
});

export type Gap = z.infer<typeof gapSchema>;
