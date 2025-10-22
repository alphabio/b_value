// b_path:: src/generate/background/clip.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./clip";

describe("background-clip generator", () => {
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

	test("should generate 'text'", () => {
		const result = generate("text");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("text");
	});
});
