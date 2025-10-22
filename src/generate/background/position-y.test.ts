// b_path:: src/generate/background/position-y.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./position-y";

describe("background-position-y generator", () => {
	test("should generate 'top' keyword", () => {
		const result = generate("top");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("top");
	});

	test("should generate 'center' keyword", () => {
		const result = generate("center");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("center");
	});

	test("should generate 'bottom' keyword", () => {
		const result = generate("bottom");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("bottom");
	});

	test("should generate percentage", () => {
		const result = generate({ value: 50, unit: "%" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("50%");
	});

	test("should generate length in px", () => {
		const result = generate({ value: 20, unit: "px" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("20px");
	});
});
