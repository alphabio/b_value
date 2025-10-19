// b_path:: src/parse/transform/origin.test.ts
import { describe, expect, it } from "vitest";
import * as Origin from "./origin";

describe("Transform.Origin.parse", () => {
	describe("2D positions - keywords", () => {
		it("parses center", () => {
			const result = Origin.parse("center");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: "center",
					vertical: "center",
				});
			}
		});

		it("parses left top", () => {
			const result = Origin.parse("left top");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: "left",
					vertical: "top",
				});
			}
		});

		it("parses right bottom", () => {
			const result = Origin.parse("right bottom");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: "right",
					vertical: "bottom",
				});
			}
		});

		it("parses center top", () => {
			const result = Origin.parse("center top");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: "center",
					vertical: "top",
				});
			}
		});
	});

	describe("2D positions - length/percentage values", () => {
		it("parses percentage values", () => {
			const result = Origin.parse("50% 50%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: { value: 50, unit: "%" },
					vertical: { value: 50, unit: "%" },
				});
			}
		});

		it("parses pixel values", () => {
			const result = Origin.parse("100px 200px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: { value: 100, unit: "px" },
					vertical: { value: 200, unit: "px" },
				});
			}
		});

		it("parses mixed keyword and value", () => {
			const result = Origin.parse("left 25%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: "left",
					vertical: { value: 25, unit: "%" },
				});
			}
		});

		it("parses zero values", () => {
			const result = Origin.parse("0px 0px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: { value: 0, unit: "px" },
					vertical: { value: 0, unit: "px" },
				});
			}
		});
	});

	describe("3D positions", () => {
		it("parses 3D with pixel values", () => {
			const result = Origin.parse("50px 100px 10px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					x: { value: 50, unit: "px" },
					y: { value: 100, unit: "px" },
					z: { value: 10, unit: "px" },
				});
			}
		});

		it("parses 3D with keywords and z-value", () => {
			const result = Origin.parse("left top 20px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					x: "left",
					y: "top",
					z: { value: 20, unit: "px" },
				});
			}
		});

		it("parses 3D with center and z-value", () => {
			const result = Origin.parse("center center 5px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					x: "center",
					y: "center",
					z: { value: 5, unit: "px" },
				});
			}
		});

		it("parses 3D with percentages and z-value", () => {
			const result = Origin.parse("50% 50% 0px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					x: { value: 50, unit: "%" },
					y: { value: 50, unit: "%" },
					z: { value: 0, unit: "px" },
				});
			}
		});
	});

	describe("single value behavior", () => {
		it("parses single keyword (horizontal)", () => {
			const result = Origin.parse("left");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: "left",
					vertical: "center",
				});
			}
		});

		it("parses single value (horizontal)", () => {
			const result = Origin.parse("25%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: { value: 25, unit: "%" },
					vertical: "center",
				});
			}
		});

		it("parses single top keyword (vertical)", () => {
			const result = Origin.parse("top");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: "center",
					vertical: "top",
				});
			}
		});
	});

	describe("error handling", () => {
		it("rejects empty string", () => {
			const result = Origin.parse("");
			expect(result.ok).toBe(false);
		});

		it("rejects invalid keywords", () => {
			const result = Origin.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("rejects invalid values", () => {
			const result = Origin.parse("abc def");
			expect(result.ok).toBe(false);
		});
	});
});

describe("Transform.PerspectiveOrigin.parsePerspectiveOrigin", () => {
	describe("2D positions - keywords", () => {
		it("parses center", () => {
			const result = Origin.parsePerspectiveOrigin("center");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: "center",
					vertical: "center",
				});
			}
		});

		it("parses left top", () => {
			const result = Origin.parsePerspectiveOrigin("left top");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: "left",
					vertical: "top",
				});
			}
		});

		it("parses right bottom", () => {
			const result = Origin.parsePerspectiveOrigin("right bottom");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: "right",
					vertical: "bottom",
				});
			}
		});
	});

	describe("2D positions - values", () => {
		it("parses percentage values", () => {
			const result = Origin.parsePerspectiveOrigin("50% 50%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: { value: 50, unit: "%" },
					vertical: { value: 50, unit: "%" },
				});
			}
		});

		it("parses pixel values", () => {
			const result = Origin.parsePerspectiveOrigin("100px 200px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: { value: 100, unit: "px" },
					vertical: { value: 200, unit: "px" },
				});
			}
		});

		it("parses mixed values", () => {
			const result = Origin.parsePerspectiveOrigin("left 75%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					horizontal: "left",
					vertical: { value: 75, unit: "%" },
				});
			}
		});
	});

	describe("error handling", () => {
		it("rejects empty string", () => {
			const result = Origin.parsePerspectiveOrigin("");
			expect(result.ok).toBe(false);
		});

		it("rejects invalid values", () => {
			const result = Origin.parsePerspectiveOrigin("invalid");
			expect(result.ok).toBe(false);
		});
	});
});
