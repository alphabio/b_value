// b_path:: src/generate/background/origin.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./origin";

describe("background-origin generator", () => {
	test("should generate 'border-box'", () => {
		const result = generate("border-box");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("border-box");
	});

	test("should generate 'padding-box'", () => {
		const result = generate("padding-box");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("padding-box");
	});

	test("should generate 'content-box'", () => {
		const result = generate("content-box");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("content-box");
	});
});
