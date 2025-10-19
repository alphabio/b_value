// b_path:: src/generate/transition/property.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "../../parse/transition/property";
import * as Generator from "./property";

describe("Transition Property Generator", () => {
	// Keywords
	it("should generate none keyword", () => {
		const ir = {
			kind: "transition-property" as const,
			properties: [{ type: "none" as const }],
		};

		const css = Generator.toCss(ir);
		expect(css).toBe("none");
	});

	it("should generate all keyword", () => {
		const ir = {
			kind: "transition-property" as const,
			properties: [{ type: "all" as const }],
		};

		const css = Generator.toCss(ir);
		expect(css).toBe("all");
	});

	// Single properties
	it("should generate single property name", () => {
		const ir = {
			kind: "transition-property" as const,
			properties: [{ type: "identifier" as const, value: "opacity" }],
		};

		const css = Generator.toCss(ir);
		expect(css).toBe("opacity");
	});

	it("should generate hyphenated property name", () => {
		const ir = {
			kind: "transition-property" as const,
			properties: [{ type: "identifier" as const, value: "background-color" }],
		};

		const css = Generator.toCss(ir);
		expect(css).toBe("background-color");
	});

	it("should generate transform property", () => {
		const ir = {
			kind: "transition-property" as const,
			properties: [{ type: "identifier" as const, value: "transform" }],
		};

		const css = Generator.toCss(ir);
		expect(css).toBe("transform");
	});

	it("should preserve case of property name", () => {
		const ir = {
			kind: "transition-property" as const,
			properties: [{ type: "identifier" as const, value: "WebkitTransform" }],
		};

		const css = Generator.toCss(ir);
		expect(css).toBe("WebkitTransform");
	});

	// Custom properties
	it("should generate custom property", () => {
		const ir = {
			kind: "transition-property" as const,
			properties: [{ type: "identifier" as const, value: "--custom-prop" }],
		};

		const css = Generator.toCss(ir);
		expect(css).toBe("--custom-prop");
	});

	// Multiple properties
	it("should generate multiple properties", () => {
		const ir = {
			kind: "transition-property" as const,
			properties: [
				{ type: "identifier" as const, value: "opacity" },
				{ type: "identifier" as const, value: "transform" },
			],
		};

		const css = Generator.toCss(ir);
		expect(css).toBe("opacity, transform");
	});

	it("should generate three properties", () => {
		const ir = {
			kind: "transition-property" as const,
			properties: [
				{ type: "identifier" as const, value: "opacity" },
				{ type: "identifier" as const, value: "transform" },
				{ type: "identifier" as const, value: "background-color" },
			],
		};

		const css = Generator.toCss(ir);
		expect(css).toBe("opacity, transform, background-color");
	});

	it("should generate mixed properties and custom properties", () => {
		const ir = {
			kind: "transition-property" as const,
			properties: [
				{ type: "identifier" as const, value: "opacity" },
				{ type: "identifier" as const, value: "--custom-color" },
				{ type: "identifier" as const, value: "transform" },
			],
		};

		const css = Generator.toCss(ir);
		expect(css).toBe("opacity, --custom-color, transform");
	});

	// Round-trip tests
	it("should round-trip none keyword", () => {
		const original = "none";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});

	it("should round-trip all keyword", () => {
		const original = "all";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});

	it("should round-trip single property", () => {
		const original = "opacity";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});

	it("should round-trip hyphenated property", () => {
		const original = "background-color";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});

	it("should round-trip custom property", () => {
		const original = "--custom-prop";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});

	it("should round-trip multiple properties", () => {
		const original = "opacity, transform";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});

	it("should round-trip three properties", () => {
		const original = "opacity, transform, background-color";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});
});
