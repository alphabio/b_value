// b_path:: src/generate/visual/visibility.generate.failure.test.ts
// Auto-generated from scripts/generate-test-generator/configs/visibility.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/visibility}
import { describe, expect, it } from "vitest";
import * as Generator from "@/generate/visual/visibility";

describe("generate/visual/visibility - invalid cases", () => {
	describe("invalid-null", () => {
		it("should reject null input", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = null;
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues.length).toBeGreaterThan(0);
		});

		it("should reject undefined input", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = undefined;
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues.length).toBeGreaterThan(0);
		});
	});

	describe("invalid-keyword", () => {
		it("should reject invalid keyword auto", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "visibility",
				value: "auto",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues.length).toBeGreaterThan(0);
		});

		it("should reject invalid keyword none", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "visibility",
				value: "none",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues.length).toBeGreaterThan(0);
		});

		it("should reject display keyword", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "visibility",
				value: "block",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues.length).toBeGreaterThan(0);
		});
	});

	describe("invalid-type", () => {
		it("should reject number value", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "visibility",
				value: 0,
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues.length).toBeGreaterThan(0);
		});

		it("should reject null value", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "visibility",
				value: null,
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues.length).toBeGreaterThan(0);
		});
	});

	describe("invalid-kind", () => {
		it("should reject wrong kind field", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "opacity",
				value: "visible",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues.length).toBeGreaterThan(0);
		});
	});
});
