import { describe, expect, test } from "vitest";
import { generate } from "./clear.generate";

describe("clear generator", () => {
	test("should generate 'none'", () => {
		const result = generate("none");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("none");
	});

	test("should generate 'left'", () => {
		const result = generate("left");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("left");
	});

	test("should generate 'right'", () => {
		const result = generate("right");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("right");
	});

	test("should generate 'both'", () => {
		const result = generate("both");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("both");
	});
});
