// b_path:: src/universal-batch.test.ts

/**
 * Tests for parseAll() and generateAll() batch API
 */

import { describe, expect, it } from "vitest";
import { parseAll } from "./universal";

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
