// b_path:: src/generate/background/position-x.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./position-x";

describe("background-position-x generator", () => {
	test("should generate 'left' keyword", () => {
		const result = generate("left");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("left");
	});

	test("should generate 'center' keyword", () => {
		const result = generate("center");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("center");
	});

	test("should generate 'right' keyword", () => {
		const result = generate("right");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("right");
	});

	test("should generate percentage", () => {
		const result = generate({ value: 25, unit: "%" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("25%");
	});

	test("should generate length in px", () => {
		const result = generate({ value: 10, unit: "px" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("10px");
	});
});
