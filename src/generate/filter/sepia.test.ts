import { describe, expect, test } from "vitest";
import { generate } from "./sepia";

describe("sepia generator", () => {
	test("should generate sepia 0 (no effect)", () => {
		const result = generate({ kind: "sepia", value: 0 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("sepia(0)");
	});

	test("should generate sepia 0.5", () => {
		const result = generate({ kind: "sepia", value: 0.5 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("sepia(0.5)");
	});

	test("should generate sepia 1 (full sepia)", () => {
		const result = generate({ kind: "sepia", value: 1 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("sepia(1)");
	});

	test("should error on null input", () => {
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});
});
