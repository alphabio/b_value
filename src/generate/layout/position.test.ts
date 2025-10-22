// b_path:: src/generate/layout/position.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./position";

describe("position generator", () => {
	test("should generate 'static'", () => {
		const result = generate({ kind: "position-property", value: "static" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("static");
	});

	test("should generate 'relative'", () => {
		const result = generate({ kind: "position-property", value: "relative" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("relative");
	});

	test("should generate 'absolute'", () => {
		const result = generate({ kind: "position-property", value: "absolute" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("absolute");
	});

	test("should generate 'fixed'", () => {
		const result = generate({ kind: "position-property", value: "fixed" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("fixed");
	});

	test("should generate 'sticky'", () => {
		const result = generate({ kind: "position-property", value: "sticky" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("sticky");
	});
});
