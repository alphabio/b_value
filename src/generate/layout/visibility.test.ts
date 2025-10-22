// b_path:: src/generate/layout/visibility.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./visibility";

describe("visibility generator", () => {
	test("should generate 'visible'", () => {
		const result = generate({ kind: "visibility", value: "visible" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("visible");
	});

	test("should generate 'hidden'", () => {
		const result = generate({ kind: "visibility", value: "hidden" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("hidden");
	});

	test("should generate 'collapse'", () => {
		const result = generate({ kind: "visibility", value: "collapse" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("collapse");
	});
});
