import { describe, expect, test } from "vitest";
import { generate } from "./thickness";

describe("text-decoration-thickness generator", () => {
	test("should generate 'auto'", () => {
		const result = generate("auto");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("auto");
	});

	test("should generate 'from-font'", () => {
		const result = generate("from-font");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("from-font");
	});

	test("should generate length value", () => {
		const result = generate({ value: 2, unit: "px" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("2px");
	});

	test("should generate percentage value", () => {
		const result = generate({ value: 10, unit: "%" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("10%");
	});

	test("should error on null", () => {
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});

	test("should error on undefined", () => {
		const result = generate(undefined as any);
		expect(result.ok).toBe(false);
	});
});
