// b_path:: src/parse/animation/name.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "./name";

describe("Animation Name Parser", () => {
	it("should parse none keyword", () => {
		const result = Parser.parse("none");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("animation-name");
			expect(result.value.names).toEqual([{ type: "none" }]);
		}
	});

	it("should parse identifier", () => {
		const result = Parser.parse("slideIn");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.names).toEqual([{ type: "identifier", value: "slideIn" }]);
		}
	});

	it("should parse multiple names", () => {
		const result = Parser.parse("slideIn, fadeOut, none");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.names).toEqual([
				{ type: "identifier", value: "slideIn" },
				{ type: "identifier", value: "fadeOut" },
				{ type: "none" },
			]);
		}
	});

	it("should handle whitespace", () => {
		const result = Parser.parse("slideIn , fadeOut");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.names).toHaveLength(2);
		}
	});

	it("should handle case sensitive identifiers", () => {
		const result = Parser.parse("SlideIn");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.names[0]).toEqual({ type: "identifier", value: "SlideIn" });
		}
	});

	it("should handle case insensitive none", () => {
		const result = Parser.parse("NONE");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.names).toEqual([{ type: "none" }]);
		}
	});

	it("should parse hyphenated names", () => {
		const result = Parser.parse("slide-in-from-left");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.names[0]).toEqual({ type: "identifier", value: "slide-in-from-left" });
		}
	});

	it("should reject empty value", () => {
		const result = Parser.parse("");
		expect(result.ok).toBe(false);
	});
});
