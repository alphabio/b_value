// b_path:: src/generate/border/color.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./color";

describe("border-color generator", () => {
	test("should generate named color", () => {
		const result = generate({ kind: "border-color", color: "red" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("red");
	});

	test("should generate 'transparent'", () => {
		const result = generate({ kind: "border-color", color: "transparent" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("transparent");
	});

	test("should generate 'currentColor'", () => {
		const result = generate({ kind: "border-color", color: "currentColor" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("currentColor");
	});
});
