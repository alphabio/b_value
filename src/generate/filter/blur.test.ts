import { describe, expect, test } from "vitest";
import { generate } from "./blur";

describe("blur generator", () => {
	test("should generate blur with px", () => {
		const result = generate({ kind: "blur", radius: { value: 5, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("blur(5px)");
	});

	test("should generate blur with rem", () => {
		const result = generate({ kind: "blur", radius: { value: 0.5, unit: "rem" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("blur(0.5rem)");
	});

	test("should generate blur with em", () => {
		const result = generate({ kind: "blur", radius: { value: 1, unit: "em" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("blur(1em)");
	});

	test("should error on null input", () => {
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});
});
