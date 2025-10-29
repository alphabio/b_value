// b_path:: src/generate/layout/cursor.failure.test.ts
// Auto-generated from scripts/generate-test-generator/configs/cursor.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
import { describe, expect, it } from "vitest";
import * as Generator from "@/generate/layout/cursor";

describe("generate/layout/cursor - invalid cases", () => {
	describe("invalid-null", () => {
		it("should reject null input", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = null;
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("Invalid input: expected object, received null");
		});
	});

	describe("invalid-keyword", () => {
		it("should reject invalid keyword", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "cursor",
				value: "hand",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				'value: Invalid option: expected one of "auto"|"default"|"none"|"context-menu"|"help"|"pointer"|"progress"|"wait"|"cell"|"crosshair"|"text"|"vertical-text"|"alias"|"copy"|"move"|"no-drop"|"not-allowed"|"grab"|"grabbing"|"e-resize"|"n-resize"|"ne-resize"|"nw-resize"|"s-resize"|"se-resize"|"sw-resize"|"w-resize"|"ew-resize"|"ns-resize"|"nesw-resize"|"nwse-resize"|"col-resize"|"row-resize"|"all-scroll"|"zoom-in"|"zoom-out"',
			);
		});
	});
});
