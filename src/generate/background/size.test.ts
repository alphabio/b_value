import { describe, expect, test } from "vitest";
import { generate } from "./size";

describe("background-size generator", () => {
	test("should generate 'cover' keyword", () => {
		const result = generate("cover");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("cover");
	});

	test("should generate 'contain' keyword", () => {
		const result = generate("contain");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("contain");
	});

	test("should generate 'auto' keyword", () => {
		const result = generate("auto");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("auto");
	});

	test("should generate length in px", () => {
		const result = generate({ value: 100, unit: "px" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("100px");
	});

	test("should generate percentage", () => {
		const result = generate({ value: 50, unit: "%" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("50%");
	});
});
