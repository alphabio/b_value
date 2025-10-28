// b_path:: src/generate/color/special.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./special";

describe("special color generator", () => {
	test("should generate 'transparent' keyword", () => {
		const result = generate({ kind: "special", keyword: "transparent" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("transparent");
	});

	test("should generate 'currentcolor' keyword", () => {
		const result = generate({ kind: "special", keyword: "currentcolor" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("currentcolor");
	});
});
