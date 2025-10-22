// b_path:: src/generate/layout/box-sizing.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./box-sizing";

describe("box-sizing generator", () => {
	test("should generate 'content-box'", () => {
		const result = generate({ kind: "box-sizing", value: "content-box" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("content-box");
	});

	test("should generate 'border-box'", () => {
		const result = generate({ kind: "box-sizing", value: "border-box" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("border-box");
	});
});
