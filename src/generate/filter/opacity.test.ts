// b_path:: src/generate/filter/opacity.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./opacity";

describe("opacity filter generator", () => {
	test("should generate opacity 0 (transparent)", () => {
		const result = generate({ kind: "opacity", value: 0 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("opacity(0)");
	});

	test("should generate opacity 0.5", () => {
		const result = generate({ kind: "opacity", value: 0.5 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("opacity(0.5)");
	});

	test("should generate opacity 1 (opaque)", () => {
		const result = generate({ kind: "opacity", value: 1 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("opacity(1)");
	});

	test("should error on null input", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});
});
