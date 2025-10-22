import { describe, expect, it } from "vitest";
import { generate } from "./opacity";

describe("generateOpacity", () => {
	it("should generate opacity 0", () => {
		const result = generate({ kind: "opacity", value: 0 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("0");
	});

	it("should generate opacity 0.5", () => {
		const result = generate({ kind: "opacity", value: 0.5 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("0.5");
	});

	it("should generate opacity 1", () => {
		const result = generate({ kind: "opacity", value: 1 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("1");
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
