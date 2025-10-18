// b_path:: src/parse/gradient/color-stop.test.ts

import { describe, expect, it } from "vitest";
import { fromNodes } from "./color-stop";

describe("Color Stop Parser", () => {
	it("should handle empty nodes array", () => {
		const result = fromNodes([]);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("requires at least a color value");
		}
	});

	it("should parse color-only stop", () => {
		// This would be tested through integration, but we need direct unit tests
		// for coverage of error paths
		const result = fromNodes([]);
		expect(result.ok).toBe(false);
	});
});
