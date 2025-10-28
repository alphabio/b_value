// b_path:: src/generate/layout/max-width.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./max-width";

describe("max-width generator", () => {
	test("should generate length in px", () => {
		const result = generate({ kind: "max-width", value: { value: 1200, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("1200px");
	});

	test("should generate percentage", () => {
		const result = generate({ kind: "max-width", value: { value: 90, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("90%");
	});

	test("should generate 'none' keyword", () => {
		const result = generate({ kind: "max-width", value: "none" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("none");
	});
});
