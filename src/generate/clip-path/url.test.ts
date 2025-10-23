import { describe, expect, it } from "vitest";
import { generate } from "./url";

describe("generate clip-path url", () => {
	it("generates url with fragment", () => {
		const result = generate({ kind: "url", value: "#clip-shape" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("url(#clip-shape)");
		}
	});

	it("generates url with file and fragment", () => {
		const result = generate({ kind: "url", value: "shapes.svg#clip" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("url(shapes.svg#clip)");
		}
	});

	it("generates url with path", () => {
		const result = generate({ kind: "url", value: "/path/to/shapes.svg#myClip" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("url(/path/to/shapes.svg#myClip)");
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
});
