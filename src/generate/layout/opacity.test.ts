// b_path:: src/generate/layout/opacity.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./opacity";

describe("opacity generator", () => {
	test("should generate full opacity", () => {
		const result = generate({ kind: "opacity", value: 1 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("1");
	});

	test("should generate half opacity", () => {
		const result = generate({ kind: "opacity", value: 0.5 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("0.5");
	});

	test("should generate zero opacity", () => {
		const result = generate({ kind: "opacity", value: 0 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("0");
	});

	test("should generate decimal opacity", () => {
		const result = generate({ kind: "opacity", value: 0.75 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("0.75");
	});
});
