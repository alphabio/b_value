// b_path:: src/utils/parse/nodes/radial.test.ts
import type * as csstree from "css-tree";
import { describe, expect, it } from "vitest";
import { parseRadialSize } from "./radial";

describe("parseRadialSize", () => {
	const createIdentifier = (name: string): csstree.Identifier => ({
		type: "Identifier",
		loc: undefined,
		name,
	});

	const createDimension = (value: string, unit: string): csstree.Dimension => ({
		type: "Dimension",
		loc: undefined,
		value,
		unit,
	});

	const createPercentage = (value: string): csstree.Percentage => ({
		type: "Percentage",
		loc: undefined,
		value,
	});

	describe("undefined node", () => {
		it("returns undefined for no node", () => {
			const result = parseRadialSize(undefined, "radius");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBeUndefined();
			}
		});
	});

	describe("radial extent keywords", () => {
		it("parses 'closest-side' keyword", () => {
			const node = createIdentifier("closest-side");
			const result = parseRadialSize(node, "radius");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("closest-side");
			}
		});

		it("parses 'farthest-side' keyword", () => {
			const node = createIdentifier("farthest-side");
			const result = parseRadialSize(node, "radius");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("farthest-side");
			}
		});

		it("handles case-insensitive keywords", () => {
			const node = createIdentifier("CLOSEST-SIDE");
			const result = parseRadialSize(node, "radius");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("closest-side");
			}
		});

		it("rejects invalid keyword", () => {
			const node = createIdentifier("invalid");
			const result = parseRadialSize(node, "radius");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Invalid keyword for radius: invalid");
			}
		});
	});

	describe("'at' keyword handling", () => {
		it("rejects 'at' when allowAtKeyword is false", () => {
			const node = createIdentifier("at");
			const result = parseRadialSize(node, "radius", false);
			expect(result.ok).toBe(false);
		});

		it("returns undefined for 'at' when allowAtKeyword is true", () => {
			const node = createIdentifier("at");
			const result = parseRadialSize(node, "radiusX", true);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBeUndefined();
			}
		});

		it("handles case-insensitive 'at' with allowAtKeyword", () => {
			const node = createIdentifier("AT");
			const result = parseRadialSize(node, "radiusX", true);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBeUndefined();
			}
		});
	});

	describe("length-percentage values", () => {
		it("parses pixel dimension", () => {
			const node = createDimension("50", "px");
			const result = parseRadialSize(node, "radius");
			expect(result.ok).toBe(true);
			if (result.ok && typeof result.value === "object") {
				expect(result.value.value).toBe(50);
				expect(result.value.unit).toBe("px");
			}
		});

		it("parses percentage value", () => {
			const node = createPercentage("75");
			const result = parseRadialSize(node, "radiusY");
			expect(result.ok).toBe(true);
			if (result.ok && typeof result.value === "object") {
				expect(result.value.value).toBe(75);
				expect(result.value.unit).toBe("%");
			}
		});

		it("parses em dimension", () => {
			const node = createDimension("5", "em");
			const result = parseRadialSize(node, "radius");
			expect(result.ok).toBe(true);
			if (result.ok && typeof result.value === "object") {
				expect(result.value.value).toBe(5);
				expect(result.value.unit).toBe("em");
			}
		});

		it("parses rem dimension", () => {
			const node = createDimension("3", "rem");
			const result = parseRadialSize(node, "radius");
			expect(result.ok).toBe(true);
			if (result.ok && typeof result.value === "object") {
				expect(result.value.value).toBe(3);
				expect(result.value.unit).toBe("rem");
			}
		});

		it("parses viewport units", () => {
			const node = createDimension("50", "vw");
			const result = parseRadialSize(node, "radius");
			expect(result.ok).toBe(true);
			if (result.ok && typeof result.value === "object") {
				expect(result.value.value).toBe(50);
				expect(result.value.unit).toBe("vw");
			}
		});

		it("parses zero value", () => {
			const node = createDimension("0", "px");
			const result = parseRadialSize(node, "radius");
			expect(result.ok).toBe(true);
			if (result.ok && typeof result.value === "object") {
				expect(result.value.value).toBe(0);
			}
		});

		it("parses decimal values", () => {
			const node = createDimension("10.5", "px");
			const result = parseRadialSize(node, "radius");
			expect(result.ok).toBe(true);
			if (result.ok && typeof result.value === "object") {
				expect(result.value.value).toBe(10.5);
			}
		});
	});

	describe("non-negative validation", () => {
		it("rejects negative pixel value", () => {
			const node = createDimension("-10", "px");
			const result = parseRadialSize(node, "radius");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("radius must be non-negative");
			}
		});

		it("rejects negative percentage", () => {
			const node = createPercentage("-50");
			const result = parseRadialSize(node, "radiusX");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("radiusX must be non-negative");
			}
		});

		it("includes property name in error message", () => {
			const node = createDimension("-5", "em");
			const result = parseRadialSize(node, "radiusY");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("radiusY");
			}
		});
	});

	describe("property name in errors", () => {
		it("uses property name for invalid keyword error", () => {
			const node = createIdentifier("invalid");
			const result = parseRadialSize(node, "customRadius");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("customRadius");
			}
		});

		it("uses property name for negative value error", () => {
			const node = createDimension("-10", "px");
			const result = parseRadialSize(node, "myRadius");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("myRadius");
			}
		});
	});

	describe("edge cases", () => {
		it("handles very large values", () => {
			const node = createDimension("99999", "px");
			const result = parseRadialSize(node, "radius");
			expect(result.ok).toBe(true);
			if (result.ok && typeof result.value === "object") {
				expect(result.value.value).toBe(99999);
			}
		});

		it("handles very small decimal values", () => {
			const node = createDimension("0.001", "px");
			const result = parseRadialSize(node, "radius");
			expect(result.ok).toBe(true);
			if (result.ok && typeof result.value === "object") {
				expect(result.value.value).toBe(0.001);
			}
		});
	});
});
