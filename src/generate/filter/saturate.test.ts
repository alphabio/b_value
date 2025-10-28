// b_path:: src/generate/filter/saturate.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./saturate";

describe("saturate generator", () => {
	test("should generate saturate 0 (desaturated)", () => {
		const result = generate({ kind: "saturate", value: 0 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("saturate(0)");
	});

	test("should generate saturate 1 (normal)", () => {
		const result = generate({ kind: "saturate", value: 1 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("saturate(1)");
	});

	test("should generate saturate 2 (high)", () => {
		const result = generate({ kind: "saturate", value: 2 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("saturate(2)");
	});

	test("should error on null input", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});
});
