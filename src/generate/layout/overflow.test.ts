import { describe, expect, test } from "vitest";
import { generate } from "./overflow.generate";

describe("overflow generator", () => {
	test("should generate 'visible'", () => {
		const result = generate("visible");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("visible");
	});

	test("should generate 'hidden'", () => {
		const result = generate("hidden");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("hidden");
	});

	test("should generate 'scroll'", () => {
		const result = generate("scroll");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("scroll");
	});

	test("should generate 'auto'", () => {
		const result = generate("auto");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("auto");
	});
});
