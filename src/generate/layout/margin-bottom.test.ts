// b_path:: src/generate/layout/margin-bottom.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./margin-bottom";

describe("margin-bottom generator", () => {
	test("should generate length in px", () => {
		const result = generate({ kind: "margin-bottom", value: { value: 20, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("20px");
	});

	test("should generate length in rem", () => {
		const result = generate({ kind: "margin-bottom", value: { value: 3, unit: "rem" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("3rem");
	});

	test("should generate percentage", () => {
		const result = generate({ kind: "margin-bottom", value: { value: 8, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("8%");
	});

	test("should generate 'auto' keyword", () => {
		const result = generate({ kind: "margin-bottom", value: "auto" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("auto");
	});
});
