// b_path:: src/generate/layout/min-height.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./min-height";

describe("min-height generator", () => {
	test("should generate length in px", () => {
		const result = generate({ kind: "min-height", value: { value: 150, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("150px");
	});

	test("should generate percentage", () => {
		const result = generate({ kind: "min-height", value: { value: 50, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("50%");
	});

	test("should generate 'auto' keyword", () => {
		const result = generate({ kind: "min-height", value: "auto" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("auto");
	});
});
