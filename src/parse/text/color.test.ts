// b_path:: src/parse/text/color.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./color";

describe("parse text-decoration-color", () => {
	it("parses named colors", () => {
		const result = parse("red");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("named");
		}
	});

	it("parses hex colors", () => {
		const result = parse("#ff0000");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("hex");
		}
	});

	it("parses rgb colors", () => {
		const result = parse("rgb(255, 0, 0)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("rgb");
		}
	});

	it("parses hsl colors", () => {
		const result = parse("hsl(0, 100%, 50%)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("hsl");
		}
	});

	it("parses transparent keyword", () => {
		const result = parse("transparent");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("special");
		}
	});

	it("parses currentcolor keyword", () => {
		const result = parse("currentcolor");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("special");
		}
	});

	it("rejects invalid color", () => {
		const result = parse("invalid-color");
		expect(result.ok).toBe(false);
	});

	it("rejects empty string", () => {
		const result = parse("");
		expect(result.ok).toBe(false);
	});
});
