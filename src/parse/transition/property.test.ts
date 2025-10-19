// b_path:: src/parse/transition/property.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "./property";

describe("Transition Property Parser", () => {
	// Keywords
	it("should parse none keyword", () => {
		const result = Parser.parse("none");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("transition-property");
			expect(result.value.properties).toEqual([{ type: "none" }]);
		}
	});

	it("should parse all keyword", () => {
		const result = Parser.parse("all");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.properties).toEqual([{ type: "all" }]);
		}
	});

	it("should parse NONE with uppercase", () => {
		const result = Parser.parse("NONE");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.properties).toEqual([{ type: "none" }]);
		}
	});

	it("should parse ALL with uppercase", () => {
		const result = Parser.parse("ALL");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.properties).toEqual([{ type: "all" }]);
		}
	});

	// Single property names
	it("should parse single property name", () => {
		const result = Parser.parse("opacity");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.properties).toEqual([{ type: "identifier", value: "opacity" }]);
		}
	});

	it("should parse hyphenated property name", () => {
		const result = Parser.parse("background-color");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.properties).toEqual([{ type: "identifier", value: "background-color" }]);
		}
	});

	it("should parse transform property", () => {
		const result = Parser.parse("transform");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.properties).toEqual([{ type: "identifier", value: "transform" }]);
		}
	});

	it("should preserve case of property name", () => {
		const result = Parser.parse("WebkitTransform");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.properties).toEqual([{ type: "identifier", value: "WebkitTransform" }]);
		}
	});

	// Custom properties
	it("should parse custom property", () => {
		const result = Parser.parse("--custom-prop");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.properties).toEqual([{ type: "identifier", value: "--custom-prop" }]);
		}
	});

	it("should parse custom property with numbers", () => {
		const result = Parser.parse("--color-1");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.properties).toEqual([{ type: "identifier", value: "--color-1" }]);
		}
	});

	// Multiple properties
	it("should parse multiple properties", () => {
		const result = Parser.parse("opacity, transform");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.properties).toHaveLength(2);
			expect(result.value.properties[0]).toEqual({ type: "identifier", value: "opacity" });
			expect(result.value.properties[1]).toEqual({ type: "identifier", value: "transform" });
		}
	});

	it("should parse three properties", () => {
		const result = Parser.parse("opacity, transform, background-color");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.properties).toHaveLength(3);
			expect(result.value.properties[0]).toEqual({ type: "identifier", value: "opacity" });
			expect(result.value.properties[1]).toEqual({ type: "identifier", value: "transform" });
			expect(result.value.properties[2]).toEqual({ type: "identifier", value: "background-color" });
		}
	});

	it("should parse properties with whitespace", () => {
		const result = Parser.parse("opacity , transform , background-color");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.properties).toHaveLength(3);
		}
	});

	it("should parse mixed properties and custom properties", () => {
		const result = Parser.parse("opacity, --custom-color, transform");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.properties).toHaveLength(3);
			expect(result.value.properties[1]).toEqual({ type: "identifier", value: "--custom-color" });
		}
	});

	// Error cases
	it("should reject empty value", () => {
		const result = Parser.parse("");
		expect(result.ok).toBe(false);
	});

	it("should reject trailing comma", () => {
		const result = Parser.parse("opacity,");
		expect(result.ok).toBe(false);
	});

	it("should reject leading comma", () => {
		const result = Parser.parse(",opacity");
		expect(result.ok).toBe(false);
	});

	it("should reject multiple commas", () => {
		const result = Parser.parse("opacity,,transform");
		expect(result.ok).toBe(false);
	});

	it("should reject number value", () => {
		const result = Parser.parse("123");
		expect(result.ok).toBe(false);
	});
});
