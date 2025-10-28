// b_path:: src/generate/clip-path/none.test.ts
import { describe, expect, it } from "vitest";
import { generate } from "./none";

describe("generate clip-path none", () => {
	it("generates 'none' keyword", () => {
		const result = generate({ kind: "clip-path-none" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("none");
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
});
