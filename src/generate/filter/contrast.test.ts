import { describe, expect, test } from "vitest";
import { generate } from "./contrast";

describe("contrast generator", () => {
	test("should generate contrast 0", () => {
		const result = generate({ kind: "contrast", value: 0 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("contrast(0)");
	});

	test("should generate contrast 1 (normal)", () => {
		const result = generate({ kind: "contrast", value: 1 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("contrast(1)");
	});

	test("should generate contrast 2 (high)", () => {
		const result = generate({ kind: "contrast", value: 2 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("contrast(2)");
	});

	test("should error on null input", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});
});
