// b_path:: src/generate/layout/min-width.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./min-width";

describe("min-width generator", () => {
	test("should generate length in px", () => {
		const result = generate({ kind: "min-width", value: { value: 100, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("100px");
	});

	test("should generate percentage", () => {
		const result = generate({ kind: "min-width", value: { value: 30, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("30%");
	});

	test("should generate 'auto' keyword", () => {
		const result = generate({ kind: "min-width", value: "auto" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("auto");
	});
});
