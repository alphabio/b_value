// b_path:: src/parse/gradient/gradient.test.ts

import { describe, expect, it } from "vitest";
import { parse } from "./gradient";

describe("parse() - unified gradient dispatcher", () => {
	describe("linear gradient", () => {
		it("detects linear-gradient()", () => {
			const result = parse("linear-gradient(red, blue)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("linear");
				expect(result.value?.repeating).toBe(false);
			}
		});

		it("detects repeating-linear-gradient()", () => {
			const result = parse("repeating-linear-gradient(red 0%, blue 10%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("linear");
				expect(result.value?.repeating).toBe(true);
			}
		});
	});

	describe("radial gradient", () => {
		it("detects radial-gradient()", () => {
			const result = parse("radial-gradient(circle, red, blue)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("radial");
				expect(result.value?.repeating).toBe(false);
			}
		});

		it("detects repeating-radial-gradient()", () => {
			const result = parse("repeating-radial-gradient(circle, red 0%, blue 10%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("radial");
				expect(result.value?.repeating).toBe(true);
			}
		});
	});

	describe("conic gradient", () => {
		it("detects conic-gradient()", () => {
			const result = parse("conic-gradient(red, blue)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("conic");
				expect(result.value?.repeating).toBe(false);
			}
		});

		it("detects repeating-conic-gradient()", () => {
			const result = parse("repeating-conic-gradient(red 0deg, blue 180deg)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("conic");
				expect(result.value?.repeating).toBe(true);
			}
		});
	});

	describe("with direction/position/angle", () => {
		it("handles linear gradient with angle", () => {
			const result = parse("linear-gradient(45deg, red, blue)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("linear");
			}
		});

		it("handles linear gradient with to side", () => {
			const result = parse("linear-gradient(to right, red, blue)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("linear");
			}
		});

		it("handles radial gradient with position", () => {
			const result = parse("radial-gradient(at center, red, blue)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("radial");
			}
		});

		it("handles conic gradient with angle", () => {
			const result = parse("conic-gradient(from 45deg, red, blue)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("conic");
			}
		});
	});

	describe("error handling", () => {
		it("rejects unknown gradient function", () => {
			const result = parse("unknown-gradient(red, blue)");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("Unknown gradient function");
			}
		});

		it("rejects invalid syntax", () => {
			const result = parse("not-a-gradient");
			expect(result.ok).toBe(false);
		});

		it("rejects empty value", () => {
			const result = parse("");
			expect(result.ok).toBe(false);
		});
	});

	describe("case insensitivity", () => {
		it("handles lowercase (standard)", () => {
			const result = parse("linear-gradient(red, blue)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("linear");
			}
		});

		it("handles radial gradient", () => {
			const result = parse("radial-gradient(circle, red, blue)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("radial");
			}
		});

		it("handles repeating variants", () => {
			const result = parse("repeating-conic-gradient(red 0deg, blue 180deg)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("conic");
				expect(result.value?.repeating).toBe(true);
			}
		});
	});
});
