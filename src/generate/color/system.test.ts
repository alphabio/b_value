// b_path:: src/generate/color/system.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./system";

describe("system color generator", () => {
	test("should generate 'ButtonText' system color", () => {
		const result = generate({ kind: "system", keyword: "ButtonText" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("ButtonText");
	});

	test("should generate 'Canvas' system color", () => {
		const result = generate({ kind: "system", keyword: "Canvas" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("Canvas");
	});

	test("should generate 'LinkText' system color", () => {
		const result = generate({ kind: "system", keyword: "LinkText" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("LinkText");
	});
});
