// b_path:: src/generate/background/attachment.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./attachment";

describe("background-attachment generator", () => {
	test("should generate 'scroll'", () => {
		const result = generate("scroll");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("scroll");
	});

	test("should generate 'fixed'", () => {
		const result = generate("fixed");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("fixed");
	});

	test("should generate 'local'", () => {
		const result = generate("local");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("local");
	});
});
