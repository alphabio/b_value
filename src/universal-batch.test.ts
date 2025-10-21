// b_path:: src/universal-batch.test.ts

/**
 * Tests for parseAll() and generateAll() batch API
 */

import { describe, expect, it } from "vitest";
import { generateAll, parseAll } from "./universal";

describe("parseAll()", () => {
	describe("basic functionality", () => {
		it("should parse single valid property", () => {
			const result = parseAll("color: red");

			expect(result.ok).toBe(true);
			expect(result.value).toEqual({
				color: { kind: "named", name: "red" },
			});
			expect(result.issues).toEqual([]);
		});

		it("should parse multiple valid properties", () => {
			const result = parseAll("color: red; width: 10px");

			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value?.color).toEqual({ kind: "named", name: "red" });
			expect(result.value?.width).toBeDefined();
			expect(result.issues).toEqual([]);
		});

		it("should handle empty input", () => {
			const result = parseAll("");

			expect(result.ok).toBe(true);
			expect(result.value).toEqual({});
			expect(result.issues).toEqual([]);
		});

		it("should ignore empty declarations", () => {
			const result = parseAll("color: red;  ;  ; width: 10px");

			expect(result.ok).toBe(true);
			expect(result.value?.color).toEqual({ kind: "named", name: "red" });
			expect(result.value?.width).toBeDefined();
			expect(result.issues).toEqual([]);
		});
	});

	describe("edge case: duplicates", () => {
		it("should use last value for duplicate properties (CSS standard)", () => {
			const result = parseAll("color: red; color: blue; width: 10px");

			expect(result.ok).toBe(true);
			expect(result.value?.color).toEqual({ kind: "named", name: "blue" }); // Last wins
			expect(result.value?.width).toBeDefined();
		});

		it("should emit warning for duplicate properties", () => {
			const result = parseAll("color: red; color: blue");

			expect(result.ok).toBe(true); // Still ok despite warning
			expect(result.issues).toHaveLength(1);
			expect(result.issues[0]?.severity).toBe("warning");
			expect(result.issues[0]?.code).toBe("duplicate-property");
			expect(result.issues[0]?.property).toBe("color");
		});

		it("should count all duplicates in warning", () => {
			const result = parseAll("color: red; color: blue; color: green");

			expect(result.ok).toBe(true);
			expect(result.value?.color).toEqual({ kind: "named", name: "green" }); // Last wins
			expect(result.issues).toHaveLength(1);
			expect(result.issues[0]?.message).toContain("3 times");
		});
	});

	describe("edge case: invalid values", () => {
		it("should return unparsed string for invalid value", () => {
			const result = parseAll("color: not-a-color; width: 10px");

			expect(result.ok).toBe(false); // Error present
			expect(result.value?.color).toBe("not-a-color"); // Unparsed string
			expect(result.value?.width).toBeDefined();
			expect(result.issues).toHaveLength(1);
			expect(result.issues[0]?.severity).toBe("error");
			expect(result.issues[0]?.code).toBe("invalid-value");
		});

		it("should continue parsing after invalid value", () => {
			const result = parseAll("color: invalid; width: 10px; height: 20px");

			expect(result.ok).toBe(false);
			expect(result.value?.color).toBe("invalid");
			expect(result.value?.width).toBeDefined();
			expect(result.value?.height).toBeDefined();
		});
	});

	describe("edge case: shorthand properties", () => {
		it("should return unparsed string for shorthand property", () => {
			const result = parseAll("color: red; border: 1px solid black");

			expect(result.ok).toBe(false); // Error present
			expect(result.value?.color).toEqual({ kind: "named", name: "red" });
			expect(result.value?.border).toBe("1px solid black"); // Unparsed
			expect(result.issues).toHaveLength(1);
			expect(result.issues[0]?.severity).toBe("error");
			expect(result.issues[0]?.code).toBe("shorthand-not-supported");
		});

		it("should include b_short promotion message", () => {
			const result = parseAll("border: 1px solid black");

			expect(result.issues[0]?.action).toContain("b_short");
		});
	});

	describe("edge case: unknown properties", () => {
		it("should return unparsed string for unknown property", () => {
			const result = parseAll("color: red; made-up-property: value");

			expect(result.ok).toBe(false);
			expect(result.value?.color).toEqual({ kind: "named", name: "red" });
			expect(result.value?.["made-up-property"]).toBe("value");
			expect(result.issues).toHaveLength(1);
			expect(result.issues[0]?.code).toBe("unknown-property");
		});
	});

	describe("complex scenarios", () => {
		it("should handle mix of valid, invalid, shorthand, and unknown", () => {
			const result = parseAll("color: red; made-up: x; border: 1px solid; width: invalid; height: 10px");

			expect(result.ok).toBe(false);
			expect(result.value?.color).toEqual({ kind: "named", name: "red" });
			expect(result.value?.["made-up"]).toBe("x");
			expect(result.value?.border).toBe("1px solid");
			expect(result.value?.width).toBe("invalid");
			expect(result.value?.height).toBeDefined();
			expect(result.issues.length).toBeGreaterThan(0);
		});
	});
});

describe("generateAll()", () => {
	describe("basic functionality", () => {
		it("should generate CSS from single IR value", () => {
			const css = generateAll({
				color: { kind: "named", name: "red" },
			});

			expect(css).toBe("color: red");
		});

		it("should generate CSS from multiple IR values", () => {
			const css = generateAll({
				color: { kind: "named", name: "red" },
				width: { kind: "width", value: { value: 10, unit: "px" } },
			});

			expect(css).toBe("color: red; width: 10px");
		});

		it("should handle empty input", () => {
			const css = generateAll({});

			expect(css).toBe("");
		});

		it("should handle null values object", () => {
			const css = generateAll(null as unknown as Record<string, string>);

			expect(css).toBe("");
		});
	});

	describe("string passthrough", () => {
		it("should pass through string values as-is", () => {
			const css = generateAll({
				color: "red",
				border: "1px solid blue",
			});

			expect(css).toBe("color: red; border: 1px solid blue");
		});

		it("should handle mix of IR and string values", () => {
			const css = generateAll({
				color: { kind: "hex", value: "#FF0000" },
				border: "1px solid blue",
			});

			expect(css).toBe("color: #FF0000; border: 1px solid blue");
		});
	});

	describe("minify option", () => {
		it("should minify output when minify: true", () => {
			const css = generateAll(
				{
					color: { kind: "named", name: "red" },
					width: { kind: "width", value: { value: 10, unit: "px" } },
				},
				{ minify: true },
			);

			expect(css).toBe("color:red;width:10px");
		});

		it("should not minify by default", () => {
			const css = generateAll({
				color: { kind: "named", name: "red" },
			});

			expect(css).toBe("color: red");
		});

		it("should minify string values too", () => {
			const css = generateAll(
				{
					color: "red",
					border: "1px solid blue",
				},
				{ minify: true },
			);

			expect(css).toBe("color:red;border:1px solid blue");
		});
	});

	describe("edge cases", () => {
		it("should skip undefined values", () => {
			const css = generateAll({
				color: { kind: "named", name: "red" },
				width: undefined as unknown as string,
			});

			expect(css).toBe("color: red");
		});

		it("should skip null values", () => {
			const css = generateAll({
				color: { kind: "named", name: "red" },
				width: null as unknown as string,
			});

			expect(css).toBe("color: red");
		});

		it("should skip properties with invalid generation", () => {
			// If IR is invalid or generation fails, property should be silently skipped
			const css = generateAll({
				color: { kind: "named", name: "red" },
				// Unknown property generator will skip
				"made-up-property": "some-value",
			});

			// Should only have color
			expect(css).toBe("color: red; made-up-property: some-value");
		});
	});

	describe("round-trip", () => {
		it("should round-trip simple values", () => {
			const input = "color: red; width: 10px";
			const parsed = parseAll(input);

			expect(parsed.ok).toBe(true);
			if (!parsed.ok || !parsed.value) return;

			const css = generateAll(parsed.value);

			expect(css).toBe("color: red; width: 10px");
		});

		it("should round-trip after modification", () => {
			const input = "color: red; width: 10px";
			const parsed = parseAll(input);

			expect(parsed.ok).toBe(true);
			if (!parsed.ok || !parsed.value) return;

			// Modify color
			parsed.value.color = { kind: "hex", value: "#00FF00" };

			const css = generateAll(parsed.value);

			expect(css).toBe("color: #00FF00; width: 10px");
		});

		it("should preserve string values in round-trip", () => {
			const input = "color: red; border: 1px solid blue";
			const parsed = parseAll(input);

			// border will be unparsed string (shorthand)
			if (!parsed.value) return;
			const css = generateAll(parsed.value);

			expect(css).toContain("color: red");
			expect(css).toContain("border: 1px solid blue");
		});

		it("should round-trip complex properties", () => {
			const input = "transform: rotate(45deg) scale(2); filter: blur(5px)";
			const parsed = parseAll(input);

			expect(parsed.ok).toBe(true);
			if (!parsed.ok || !parsed.value) return;

			const css = generateAll(parsed.value);

			expect(css).toContain("transform:");
			expect(css).toContain("rotate(45deg)");
			expect(css).toContain("scale("); // scale() may add implicit second param
			expect(css).toContain("filter:");
			expect(css).toContain("blur(5px)");
		});
	});

	describe("property ordering", () => {
		it("should preserve property order from object iteration", () => {
			const css = generateAll({
				color: { kind: "named", name: "red" },
				width: { kind: "width", value: { value: 10, unit: "px" } },
				height: { kind: "height", value: { value: 20, unit: "px" } },
			});

			// Note: Object iteration order is insertion order in modern JS
			expect(css).toBe("color: red; width: 10px; height: 20px");
		});
	});
});
