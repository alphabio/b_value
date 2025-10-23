import { describe, expect, test } from "vitest";
import { generate } from "./line";

describe("text-decoration-line generator", () => {
	test("should generate 'none'", () => {
		const result = generate("none");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("none");
	});

	test("should generate 'underline'", () => {
		const result = generate("underline");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("underline");
	});

	test("should generate 'overline'", () => {
		const result = generate("overline");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("overline");
	});

	test("should generate 'line-through'", () => {
		const result = generate("line-through");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("line-through");
	});

	test("should error on null", () => {
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});

	test("should error on undefined", () => {
		const result = generate(undefined as any);
		expect(result.ok).toBe(false);
	});

	test("should error on non-string", () => {
		const result = generate(123 as any);
		expect(result.ok).toBe(false);
	});
});
