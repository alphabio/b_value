// b_path:: src/parse/position/position.parse.test.ts
import { describe, expect, it } from "vitest";
import * as PositionParser from "./position";

describe("Position Parser", () => {
	describe("2D Position parsing", () => {
		it("should parse single keyword position", () => {
			const css = "center";
			const result = PositionParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: "center",
					vertical: "center",
				});
			}
		});

		it("should parse two keyword positions", () => {
			const css = "left top";
			const result = PositionParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: "left",
					vertical: "top",
				});
			}
		});

		it("should parse all keyword combinations", () => {
			const positions = [
				{ css: "center", expected: { horizontal: "center", vertical: "center" } },
				{ css: "left", expected: { horizontal: "left", vertical: "center" } },
				{ css: "right", expected: { horizontal: "right", vertical: "center" } },
				{ css: "top", expected: { horizontal: "center", vertical: "top" } },
				{ css: "bottom", expected: { horizontal: "center", vertical: "bottom" } },
				{ css: "left top", expected: { horizontal: "left", vertical: "top" } },
				{ css: "right bottom", expected: { horizontal: "right", vertical: "bottom" } },
				{ css: "center top", expected: { horizontal: "center", vertical: "top" } },
			];

			for (const { css, expected } of positions) {
				const result = PositionParser.parse(css);
				expect(result.ok).toBe(true);
				if (result.ok) {
					expect(result.value).toEqual(expected);
				}
			}
		});

		it("should parse length values", () => {
			const css = "100px 50px";
			const result = PositionParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: { value: 100, unit: "px" },
					vertical: { value: 50, unit: "px" },
				});
			}
		});

		it("should parse percentage values", () => {
			const css = "50% 25%";
			const result = PositionParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: { value: 50, unit: "%" },
					vertical: { value: 25, unit: "%" },
				});
			}
		});

		it("should parse mixed keyword and length", () => {
			const css = "left 50px";
			const result = PositionParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: "left",
					vertical: { value: 50, unit: "px" },
				});
			}
		});

		it("should parse mixed keyword and percentage", () => {
			const css = "50% top";
			const result = PositionParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: { value: 50, unit: "%" },
					vertical: "top",
				});
			}
		});
	});

	describe("3D Position parsing", () => {
		it("should parse 3D position", () => {
			const css = "10px 20px 30px";
			const result = PositionParser.parse3D(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					x: { value: 10, unit: "px" },
					y: { value: 20, unit: "px" },
					z: { value: 30, unit: "px" },
				});
			}
		});

		it("should parse 3D position with mixed units", () => {
			const css = "50% 100px 2em";
			const result = PositionParser.parse3D(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					x: { value: 50, unit: "%" },
					y: { value: 100, unit: "px" },
					z: { value: 2, unit: "em" },
				});
			}
		});
	});

	describe("Position list parsing", () => {
		it("should parse position list", () => {
			const css = "center, left top, 50% 25%";
			const result = PositionParser.parseList(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toHaveLength(3);
				expect(result.value?.[0]).toEqual({
					horizontal: "center",
					vertical: "center",
				});
				expect(result.value?.[1]).toEqual({
					horizontal: "left",
					vertical: "top",
				});
				expect(result.value?.[2]).toEqual({
					horizontal: { value: 50, unit: "%" },
					vertical: { value: 25, unit: "%" },
				});
			}
		});

		it("should parse single position in list", () => {
			const css = "center";
			const result = PositionParser.parseList(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toHaveLength(1);
				expect(result.value?.[0]).toEqual({
					horizontal: "center",
					vertical: "center",
				});
			}
		});
	});

	describe("Error handling", () => {
		it("should return error for invalid position", () => {
			const css = "invalid position";
			const result = PositionParser.parse(css);

			expect(result.ok).toBe(false);
		});

		it("should return error for invalid 3D position", () => {
			const css = "10px 20px";
			const result = PositionParser.parse3D(css);

			expect(result.ok).toBe(false);
		});

		it("should return error for invalid position list", () => {
			const css = "center, invalid, left";
			const result = PositionParser.parseList(css);

			expect(result.ok).toBe(false);
		});

		it("should return error for empty string", () => {
			const css = "";
			const result = PositionParser.parse(css);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("No position values found");
			}
		});
	});
});
