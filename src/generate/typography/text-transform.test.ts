// b_path:: src/generate/typography/text-transform.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./text-transform";

describe("text-transform generator", () => {
	test("should generate 'none'", () => {
		const result = generate({ kind: "text-transform", value: "none" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("none");
	});

	test("should generate 'uppercase'", () => {
		const result = generate({ kind: "text-transform", value: "uppercase" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("uppercase");
	});

	test("should generate 'lowercase'", () => {
		const result = generate({ kind: "text-transform", value: "lowercase" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("lowercase");
	});

	test("should generate 'capitalize'", () => {
		const result = generate({ kind: "text-transform", value: "capitalize" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("capitalize");
	});
});
