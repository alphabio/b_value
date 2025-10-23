import { describe, expect, test } from "vitest";
import { generate } from "./style";

describe("text-decoration-style generator", () => {
	test("should generate 'solid'", () => {
		const result = generate("solid");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("solid");
	});

	test("should generate 'double'", () => {
		const result = generate("double");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("double");
	});

	test("should generate 'dotted'", () => {
		const result = generate("dotted");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("dotted");
	});

	test("should generate 'dashed'", () => {
		const result = generate("dashed");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("dashed");
	});

	test("should generate 'wavy'", () => {
		const result = generate("wavy");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("wavy");
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
