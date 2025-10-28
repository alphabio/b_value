// b_path:: src/generate/layout/padding-bottom.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./padding-bottom";

describe("padding-bottom generator", () => {
	test("should generate length in px", () => {
		const result = generate({ kind: "padding-bottom", value: { value: 16, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("16px");
	});

	test("should generate length in rem", () => {
		const result = generate({ kind: "padding-bottom", value: { value: 1.5, unit: "rem" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("1.5rem");
	});

	test("should generate percentage", () => {
		const result = generate({ kind: "padding-bottom", value: { value: 10, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("10%");
	});
});
