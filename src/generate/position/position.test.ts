// b_path:: src/generate/position/position.test.ts
import { describe, expect, it } from "vitest";
import { generate } from "./position";

describe("generate position", () => {
	it("generates center center", () => {
		const result = generate({ horizontal: "center", vertical: "center" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("center center");
		}
	});

	it("generates left top", () => {
		const result = generate({ horizontal: "left", vertical: "top" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("left top");
		}
	});

	it("generates right bottom", () => {
		const result = generate({ horizontal: "right", vertical: "bottom" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("right bottom");
		}
	});

	it("generates with percentage", () => {
		const result = generate({
			horizontal: { value: 50, unit: "%" },
			vertical: { value: 50, unit: "%" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("50% 50%");
		}
	});

	it("generates with length", () => {
		const result = generate({
			horizontal: { value: 10, unit: "px" },
			vertical: { value: 20, unit: "px" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("10px 20px");
		}
	});

	it("rejects null", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing error handling
		const result = generate(null as any);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues.length).toBeGreaterThan(0);
		}
	});

	it("rejects undefined", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing error handling
		const result = generate(undefined as any);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues.length).toBeGreaterThan(0);
		}
	});

	it("rejects non-object", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing error handling
		const result = generate("not-an-object" as any);
		expect(result.ok).toBe(false);
	});
});
