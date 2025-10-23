// b_path:: src/generate/transform/transform.test.ts

import { describe, expect, it } from "vitest";
import { generate } from "./transform";

describe("generate transform", () => {
	it("generates single translateX", () => {
		const result = generate([{ kind: "translateX", x: { value: 100, unit: "px" } }]);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("translateX(100px)");
		}
	});

	it("generates single rotate", () => {
		const result = generate([{ kind: "rotate", angle: { value: 45, unit: "deg" } }]);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("rotate(45deg)");
		}
	});

	it("generates multiple transforms", () => {
		const result = generate([
			{ kind: "translateX", x: { value: 100, unit: "px" } },
			{ kind: "rotate", angle: { value: 45, unit: "deg" } },
		]);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("translateX(100px) rotate(45deg)");
		}
	});

	it("generates scale", () => {
		const result = generate([{ kind: "scale", x: 2, y: 2 }]);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toContain("scale");
		}
	});

	it("rejects empty array", () => {
		const result = generate([]);
		expect(result.ok).toBe(false);
	});

	it("rejects null input", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing error handling
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});

	it("rejects undefined input", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing error handling
		const result = generate(undefined as any);
		expect(result.ok).toBe(false);
	});

	it("rejects non-array input", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing error handling
		const result = generate("not an array" as any);
		expect(result.ok).toBe(false);
	});
});
