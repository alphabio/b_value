// b_path:: src/generate/layout/padding-right.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./padding-right";

describe("padding-right generator", () => {
	test("should generate length in px", () => {
		const result = generate({ kind: "padding-right", value: { value: 12, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("12px");
	});

	test("should generate length in em", () => {
		const result = generate({ kind: "padding-right", value: { value: 2, unit: "em" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("2em");
	});

	test("should generate percentage", () => {
		const result = generate({ kind: "padding-right", value: { value: 20, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("20%");
	});
});
