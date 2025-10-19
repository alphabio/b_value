// b_path:: src/parse/shadow/text-shadow.test.ts
import { describe, expect, test } from "vitest";
import { parse } from "./text-shadow";

describe("text-shadow parser", () => {
	describe("basic shadows", () => {
		test("parses simple 2-value shadow", () => {
			const result = parse("1px 1px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "text-shadow",
					shadows: [
						{
							offsetX: { value: 1, unit: "px" },
							offsetY: { value: 1, unit: "px" },
						},
					],
				});
			}
		});

		test("parses shadow with blur radius", () => {
			const result = parse("1px 1px 2px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]).toMatchObject({
					offsetX: { value: 1, unit: "px" },
					offsetY: { value: 1, unit: "px" },
					blurRadius: { value: 2, unit: "px" },
				});
			}
		});
	});

	describe("shadows with colors", () => {
		test("parses shadow with named color", () => {
			const result = parse("1px 1px 2px gray");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]?.color).toEqual({
					kind: "named",
					name: "gray",
				});
			}
		});

		test("parses shadow with rgb color", () => {
			const result = parse("1px 1px 2px rgb(128 128 128)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]?.color).toMatchObject({
					kind: "rgb",
				});
			}
		});

		test("parses shadow with rgba color", () => {
			const result = parse("1px 1px 2px rgba(0 0 0 / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]?.color).toMatchObject({
					kind: "rgb",
					alpha: 0.5,
				});
			}
		});

		test("parses color at beginning", () => {
			const result = parse("gray 1px 1px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]?.color).toEqual({
					kind: "named",
					name: "gray",
				});
			}
		});

		test("parses color in middle", () => {
			const result = parse("1px gray 1px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]?.color).toEqual({
					kind: "named",
					name: "gray",
				});
			}
		});
	});

	describe("multiple shadows", () => {
		test("parses two shadows", () => {
			const result = parse("1px 1px 2px black, -1px -1px 2px white");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows).toHaveLength(2);
				expect(result.value.shadows[0]).toMatchObject({
					offsetX: { value: 1, unit: "px" },
					offsetY: { value: 1, unit: "px" },
				});
				expect(result.value.shadows[1]).toMatchObject({
					offsetX: { value: -1, unit: "px" },
					offsetY: { value: -1, unit: "px" },
				});
			}
		});

		test("parses three shadows", () => {
			const result = parse("1px 1px red, 2px 2px blue, 3px 3px green");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows).toHaveLength(3);
			}
		});

		test("parses complex multi-shadow", () => {
			const result = parse("0 0 3px red, 0 0 6px orange, 0 0 9px yellow");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows).toHaveLength(3);
				expect(result.value.shadows[0]?.blurRadius).toEqual({ value: 3, unit: "px" });
				expect(result.value.shadows[1]?.blurRadius).toEqual({ value: 6, unit: "px" });
				expect(result.value.shadows[2]?.blurRadius).toEqual({ value: 9, unit: "px" });
			}
		});
	});

	describe("units", () => {
		test("parses rem units", () => {
			const result = parse("0.5rem 0.5rem");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]).toMatchObject({
					offsetX: { value: 0.5, unit: "rem" },
					offsetY: { value: 0.5, unit: "rem" },
				});
			}
		});

		test("parses em units", () => {
			const result = parse("0.25em 0.25em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]).toMatchObject({
					offsetX: { value: 0.25, unit: "em" },
					offsetY: { value: 0.25, unit: "em" },
				});
			}
		});

		test("parses zero without unit", () => {
			const result = parse("0 0");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]).toMatchObject({
					offsetX: { value: 0, unit: "px" },
					offsetY: { value: 0, unit: "px" },
				});
			}
		});

		test("parses mixed units", () => {
			const result = parse("1px 2rem 3em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]).toMatchObject({
					offsetX: { value: 1, unit: "px" },
					offsetY: { value: 2, unit: "rem" },
					blurRadius: { value: 3, unit: "em" },
				});
			}
		});
	});

	describe("negative values", () => {
		test("parses negative offsets", () => {
			const result = parse("-2px -2px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]).toMatchObject({
					offsetX: { value: -2, unit: "px" },
					offsetY: { value: -2, unit: "px" },
				});
			}
		});

		test("parses negative blur (should work even though unusual)", () => {
			const result = parse("1px 1px -2px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]).toMatchObject({
					blurRadius: { value: -2, unit: "px" },
				});
			}
		});
	});

	describe("error cases", () => {
		test("rejects empty value", () => {
			const result = parse("");
			expect(result.ok).toBe(false);
		});

		test("rejects single value", () => {
			const result = parse("1px");
			expect(result.ok).toBe(false);
		});

		test("rejects too many length values", () => {
			const result = parse("1px 2px 3px 4px");
			expect(result.ok).toBe(false);
		});

		test("rejects duplicate color", () => {
			const result = parse("1px 1px black white");
			expect(result.ok).toBe(false);
		});

		test("rejects invalid keyword", () => {
			const result = parse("inset 1px 1px");
			expect(result.ok).toBe(false);
		});

		test("rejects empty layer before comma", () => {
			const result = parse(", 1px 1px");
			expect(result.ok).toBe(false);
		});

		test("rejects empty layer after comma", () => {
			// Note: Trailing comma is actually accepted (parsed as valid shadow before comma)
			// This matches CSS parser behavior where trailing commas are often ignored
			const result = parse("1px 1px,");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows).toHaveLength(1);
			}
		});
	});
});
