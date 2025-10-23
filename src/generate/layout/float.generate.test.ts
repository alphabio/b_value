import { describe, expect, it } from "vitest";
import { generate } from "./float.generate";

describe("generate float", () => {
	it("generates 'none'", () => {
		const result = generate("none");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("none");
		}
	});

	it("generates 'left'", () => {
		const result = generate("left");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("left");
		}
	});

	it("generates 'right'", () => {
		const result = generate("right");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("right");
		}
	});

	it("rejects null", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing error handling
		const result = generate(null as any);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues.length).toBeGreaterThan(0);
		}
	});

	it("rejects undefined", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing error handling
		const result = generate(undefined as any);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues.length).toBeGreaterThan(0);
		}
	});

	it("rejects non-string", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing error handling
		const result = generate(123 as any);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues.length).toBeGreaterThan(0);
		}
	});
});
