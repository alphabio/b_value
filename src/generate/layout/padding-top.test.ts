// b_path:: src/generate/layout/padding-top.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./padding-top";

describe("padding-top generator", () => {
	test("should generate length in px", () => {
		const result = generate({ kind: "padding-top", value: { value: 8, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("8px");
	});

	test("should generate length in rem", () => {
		const result = generate({ kind: "padding-top", value: { value: 1, unit: "rem" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("1rem");
	});

	test("should generate percentage", () => {
		const result = generate({ kind: "padding-top", value: { value: 15, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("15%");
	});
});
