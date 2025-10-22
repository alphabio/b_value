import { describe, expect, it } from "vitest";
import { generate } from "./box-sizing";

describe("generateBoxSizing", () => {
	it("should generate border-box", () => {
		const result = generate({ kind: "box-sizing", value: "border-box" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("border-box");
	});

	it("should generate content-box", () => {
		const result = generate({ kind: "box-sizing", value: "content-box" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("content-box");
	});

	it("should handle null input", () => {
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});

	it("should handle undefined input", () => {
		const result = generate(undefined as any);
		expect(result.ok).toBe(false);
	});
});
