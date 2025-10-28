// b_path:: src/generate/layout/overflow.generate.test.ts
import { describe, expect, it } from "vitest";
import { generate } from "./overflow.generate";

describe("generate overflow", () => {
	it("generates 'visible'", () => {
		const result = generate("visible");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("visible");
		}
	});

	it("generates 'hidden'", () => {
		const result = generate("hidden");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("hidden");
		}
	});

	it("generates 'scroll'", () => {
		const result = generate("scroll");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("scroll");
		}
	});

	it("generates 'auto'", () => {
		const result = generate("auto");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("auto");
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
