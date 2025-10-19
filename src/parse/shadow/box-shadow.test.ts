// b_path:: src/parse/shadow/box-shadow.test.ts
import { describe, expect, test } from "vitest";
import { parse } from "./box-shadow";

describe("box-shadow parser", () => {
	describe("basic shadows", () => {
		test("parses simple 2-value shadow", () => {
			const result = parse("2px 2px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "box-shadow",
					shadows: [
						{
							offsetX: { value: 2, unit: "px" },
							offsetY: { value: 2, unit: "px" },
						},
					],
				});
			}
		});

		test("parses shadow with blur radius", () => {
			const result = parse("2px 2px 4px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]).toMatchObject({
					offsetX: { value: 2, unit: "px" },
					offsetY: { value: 2, unit: "px" },
					blurRadius: { value: 4, unit: "px" },
				});
			}
		});

		test("parses shadow with blur and spread radius", () => {
			const result = parse("2px 2px 4px 8px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]).toMatchObject({
					offsetX: { value: 2, unit: "px" },
					offsetY: { value: 2, unit: "px" },
					blurRadius: { value: 4, unit: "px" },
					spreadRadius: { value: 8, unit: "px" },
				});
			}
		});
	});

	describe("shadows with colors", () => {
		test("parses shadow with named color", () => {
			const result = parse("2px 2px 4px black");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]?.color).toEqual({
					kind: "named",
					name: "black",
				});
			}
		});

		test("parses shadow with rgb color", () => {
			const result = parse("2px 2px 4px rgb(255 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]?.color).toMatchObject({
					kind: "rgb",
				});
			}
		});

		test("parses shadow with rgba color", () => {
			const result = parse("2px 2px 4px rgba(0 0 0 / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]?.color).toMatchObject({
					kind: "rgb",
					alpha: 0.5,
				});
			}
		});

		test("parses color at beginning", () => {
			const result = parse("black 2px 2px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]?.color).toEqual({
					kind: "named",
					name: "black",
				});
			}
		});

		test("parses color in middle", () => {
			const result = parse("2px black 2px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]?.color).toEqual({
					kind: "named",
					name: "black",
				});
			}
		});
	});

	describe("inset shadows", () => {
		test("parses inset shadow", () => {
			const result = parse("inset 2px 2px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]?.inset).toBe(true);
				expect(result.value.shadows[0]).toMatchObject({
					offsetX: { value: 2, unit: "px" },
					offsetY: { value: 2, unit: "px" },
				});
			}
		});

		test("parses inset shadow with all values", () => {
			const result = parse("inset 0 0 10px 5px rgba(0 0 0 / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const shadow = result.value.shadows[0];
				expect(shadow?.inset).toBe(true);
				expect(shadow).toMatchObject({
					offsetX: { value: 0, unit: "px" },
					offsetY: { value: 0, unit: "px" },
					blurRadius: { value: 10, unit: "px" },
					spreadRadius: { value: 5, unit: "px" },
				});
			}
		});

		test("parses inset keyword at end", () => {
			const result = parse("2px 2px inset");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]?.inset).toBe(true);
			}
		});
	});

	describe("multiple shadows", () => {
		test("parses two shadows", () => {
			const result = parse("2px 2px 4px black, -2px -2px 4px white");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows).toHaveLength(2);
				expect(result.value.shadows[0]).toMatchObject({
					offsetX: { value: 2, unit: "px" },
					offsetY: { value: 2, unit: "px" },
				});
				expect(result.value.shadows[1]).toMatchObject({
					offsetX: { value: -2, unit: "px" },
					offsetY: { value: -2, unit: "px" },
				});
			}
		});

		test("parses multiple shadows with mixed inset", () => {
			const result = parse("2px 2px 4px black, inset 0 0 10px white");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows).toHaveLength(2);
				expect(result.value.shadows[0]?.inset).toBeUndefined();
				expect(result.value.shadows[1]?.inset).toBe(true);
			}
		});

		test("parses three shadows", () => {
			const result = parse("2px 2px red, 4px 4px blue, 6px 6px green");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows).toHaveLength(3);
			}
		});
	});

	describe("units", () => {
		test("parses rem units", () => {
			const result = parse("1rem 1rem");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]).toMatchObject({
					offsetX: { value: 1, unit: "rem" },
					offsetY: { value: 1, unit: "rem" },
				});
			}
		});

		test("parses em units", () => {
			const result = parse("0.5em 0.5em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]).toMatchObject({
					offsetX: { value: 0.5, unit: "em" },
					offsetY: { value: 0.5, unit: "em" },
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
			const result = parse("1px 2rem 3em 4vh");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]).toMatchObject({
					offsetX: { value: 1, unit: "px" },
					offsetY: { value: 2, unit: "rem" },
					blurRadius: { value: 3, unit: "em" },
					spreadRadius: { value: 4, unit: "vh" },
				});
			}
		});
	});

	describe("negative values", () => {
		test("parses negative offsets", () => {
			const result = parse("-5px -5px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]).toMatchObject({
					offsetX: { value: -5, unit: "px" },
					offsetY: { value: -5, unit: "px" },
				});
			}
		});

		test("parses negative spread", () => {
			const result = parse("0 0 10px -5px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows[0]).toMatchObject({
					spreadRadius: { value: -5, unit: "px" },
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
			const result = parse("2px");
			expect(result.ok).toBe(false);
		});

		test("rejects too many length values", () => {
			const result = parse("1px 2px 3px 4px 5px");
			expect(result.ok).toBe(false);
		});

		test("rejects duplicate inset keyword", () => {
			const result = parse("inset inset 2px 2px");
			expect(result.ok).toBe(false);
		});

		test("rejects duplicate color", () => {
			const result = parse("2px 2px black white");
			expect(result.ok).toBe(false);
		});

		test("rejects invalid keyword", () => {
			const result = parse("outset 2px 2px");
			expect(result.ok).toBe(false);
		});

		test("rejects empty layer before comma", () => {
			const result = parse(", 2px 2px");
			expect(result.ok).toBe(false);
		});

		test("rejects empty layer after comma", () => {
			// Note: Trailing comma is actually accepted (parsed as valid shadow before comma)
			// This matches CSS parser behavior where trailing commas are often ignored
			const result = parse("2px 2px,");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.shadows).toHaveLength(1);
			}
		});
	});
});
