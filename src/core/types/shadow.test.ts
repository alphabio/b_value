// b_path:: src/core/types/shadow.test.ts
import { describe, expect, it } from "vitest";
import {
	type BoxShadow,
	type BoxShadowLayer,
	boxShadowSchema,
	type TextShadow,
	type TextShadowLayer,
	textShadowSchema,
} from "./shadow";

describe("boxShadowSchema", () => {
	it("validates simple box-shadow", () => {
		const shadow: BoxShadow = {
			kind: "box-shadow",
			shadows: [
				{
					offsetX: { value: 2, unit: "px" },
					offsetY: { value: 2, unit: "px" },
				},
			],
		};
		const result = boxShadowSchema.safeParse(shadow);
		expect(result.success).toBe(true);
	});

	it("validates box-shadow with blur radius", () => {
		const shadow: BoxShadow = {
			kind: "box-shadow",
			shadows: [
				{
					offsetX: { value: 0, unit: "px" },
					offsetY: { value: 4, unit: "px" },
					blurRadius: { value: 8, unit: "px" },
				},
			],
		};
		const result = boxShadowSchema.safeParse(shadow);
		expect(result.success).toBe(true);
	});

	it("validates box-shadow with spread radius", () => {
		const shadow: BoxShadow = {
			kind: "box-shadow",
			shadows: [
				{
					offsetX: { value: 0, unit: "px" },
					offsetY: { value: 0, unit: "px" },
					blurRadius: { value: 4, unit: "px" },
					spreadRadius: { value: 2, unit: "px" },
				},
			],
		};
		const result = boxShadowSchema.safeParse(shadow);
		expect(result.success).toBe(true);
	});

	it("validates inset box-shadow", () => {
		const shadow: BoxShadow = {
			kind: "box-shadow",
			shadows: [
				{
					inset: true,
					offsetX: { value: 0, unit: "px" },
					offsetY: { value: 2, unit: "px" },
					blurRadius: { value: 4, unit: "px" },
				},
			],
		};
		const result = boxShadowSchema.safeParse(shadow);
		expect(result.success).toBe(true);
	});

	it("validates box-shadow with color", () => {
		const shadow: BoxShadow = {
			kind: "box-shadow",
			shadows: [
				{
					offsetX: { value: 2, unit: "px" },
					offsetY: { value: 2, unit: "px" },
					blurRadius: { value: 4, unit: "px" },
					color: { kind: "named", name: "black" },
				},
			],
		};
		const result = boxShadowSchema.safeParse(shadow);
		expect(result.success).toBe(true);
	});

	it("validates multiple box-shadows", () => {
		const shadow: BoxShadow = {
			kind: "box-shadow",
			shadows: [
				{
					offsetX: { value: 0, unit: "px" },
					offsetY: { value: 1, unit: "px" },
					blurRadius: { value: 2, unit: "px" },
				},
				{
					offsetX: { value: 0, unit: "px" },
					offsetY: { value: 4, unit: "px" },
					blurRadius: { value: 8, unit: "px" },
				},
			],
		};
		const result = boxShadowSchema.safeParse(shadow);
		expect(result.success).toBe(true);
	});

	it("rejects wrong kind", () => {
		const shadow = {
			kind: "text-shadow",
			shadows: [
				{
					offsetX: { value: 2, unit: "px" },
					offsetY: { value: 2, unit: "px" },
				},
			],
		};
		const result = boxShadowSchema.safeParse(shadow);
		expect(result.success).toBe(false);
	});

	it("accepts empty shadows array", () => {
		const shadow = {
			kind: "box-shadow",
			shadows: [],
		};
		const result = boxShadowSchema.safeParse(shadow);
		expect(result.success).toBe(true);
	});
});

describe("textShadowSchema", () => {
	it("validates simple text-shadow", () => {
		const shadow: TextShadow = {
			kind: "text-shadow",
			shadows: [
				{
					offsetX: { value: 1, unit: "px" },
					offsetY: { value: 1, unit: "px" },
				},
			],
		};
		const result = textShadowSchema.safeParse(shadow);
		expect(result.success).toBe(true);
	});

	it("validates text-shadow with blur radius", () => {
		const shadow: TextShadow = {
			kind: "text-shadow",
			shadows: [
				{
					offsetX: { value: 2, unit: "px" },
					offsetY: { value: 2, unit: "px" },
					blurRadius: { value: 4, unit: "px" },
				},
			],
		};
		const result = textShadowSchema.safeParse(shadow);
		expect(result.success).toBe(true);
	});

	it("validates text-shadow with color", () => {
		const shadow: TextShadow = {
			kind: "text-shadow",
			shadows: [
				{
					offsetX: { value: 1, unit: "px" },
					offsetY: { value: 1, unit: "px" },
					blurRadius: { value: 2, unit: "px" },
					color: { kind: "named", name: "gray" },
				},
			],
		};
		const result = textShadowSchema.safeParse(shadow);
		expect(result.success).toBe(true);
	});

	it("validates multiple text-shadows", () => {
		const shadow: TextShadow = {
			kind: "text-shadow",
			shadows: [
				{
					offsetX: { value: 1, unit: "px" },
					offsetY: { value: 1, unit: "px" },
					color: { kind: "named", name: "white" },
				},
				{
					offsetX: { value: -1, unit: "px" },
					offsetY: { value: -1, unit: "px" },
					color: { kind: "named", name: "black" },
				},
			],
		};
		const result = textShadowSchema.safeParse(shadow);
		expect(result.success).toBe(true);
	});

	it("rejects wrong kind", () => {
		const shadow = {
			kind: "box-shadow",
			shadows: [
				{
					offsetX: { value: 1, unit: "px" },
					offsetY: { value: 1, unit: "px" },
				},
			],
		};
		const result = textShadowSchema.safeParse(shadow);
		expect(result.success).toBe(false);
	});
});

describe("Type exports", () => {
	it("exports BoxShadowLayer type", () => {
		const layer: BoxShadowLayer = {
			offsetX: { value: 0, unit: "px" },
			offsetY: { value: 0, unit: "px" },
		};
		expect(layer).toBeDefined();
	});

	it("exports TextShadowLayer type", () => {
		const layer: TextShadowLayer = {
			offsetX: { value: 0, unit: "px" },
			offsetY: { value: 0, unit: "px" },
		};
		expect(layer).toBeDefined();
	});
});
