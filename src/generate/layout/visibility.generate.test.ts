import { describe, expect, it } from "vitest";
import { generate } from "./visibility";

describe("generateVisibility", () => {
	it("should generate visible", () => {
		const result = generate({ kind: "visibility", value: "visible" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("visible");
	});

	it("should generate hidden", () => {
		const result = generate({ kind: "visibility", value: "hidden" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("hidden");
	});

	it("should generate collapse", () => {
		const result = generate({ kind: "visibility", value: "collapse" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("collapse");
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
