import { describe, expect, test } from "vitest";
import { generate } from "./grayscale";

describe("grayscale generator", () => {
	test("should generate grayscale 0 (no effect)", () => {
		const result = generate({ kind: "grayscale", value: 0 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("grayscale(0)");
	});

	test("should generate grayscale 0.5", () => {
		const result = generate({ kind: "grayscale", value: 0.5 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("grayscale(0.5)");
	});

	test("should generate grayscale 1 (full grayscale)", () => {
		const result = generate({ kind: "grayscale", value: 1 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("grayscale(1)");
	});

	test("should error on null input", () => {
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});
});
