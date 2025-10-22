import { describe, expect, it } from "vitest";
import { generate } from "./position";

describe("generatePosition", () => {
	it("should generate static", () => {
		const result = generate({ kind: "position-property", value: "static" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("static");
	});

	it("should generate relative", () => {
		const result = generate({ kind: "position-property", value: "relative" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("relative");
	});

	it("should generate absolute", () => {
		const result = generate({ kind: "position-property", value: "absolute" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("absolute");
	});

	it("should generate fixed", () => {
		const result = generate({ kind: "position-property", value: "fixed" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("fixed");
	});

	it("should generate sticky", () => {
		const result = generate({ kind: "position-property", value: "sticky" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("sticky");
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
