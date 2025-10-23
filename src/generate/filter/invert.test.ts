import { describe, expect, test } from "vitest";
import { generate } from "./invert";

describe("invert generator", () => {
	test("should generate invert 0 (no effect)", () => {
		const result = generate({ kind: "invert", value: 0 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("invert(0)");
	});

	test("should generate invert 0.5", () => {
		const result = generate({ kind: "invert", value: 0.5 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("invert(0.5)");
	});

	test("should generate invert 1 (full invert)", () => {
		const result = generate({ kind: "invert", value: 1 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("invert(1)");
	});

	test("should error on null input", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});
});
