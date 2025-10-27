// b_path:: src/generate/transition/delay.failure.test.ts
// Auto-generated from scripts/generate-test-generator/configs/delay.ts
//
// Spec references:
// - OTHER: https://github.com/mdn/data/blob/main/css/properties.json
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay
// - W3C: https://www.w3.org/TR/css-transitions-1/#transition-delay-property
import { describe, expect, it } from "vitest";
import * as Generator from "@/generate/transition/delay";

describe("generate/transition/delay - invalid cases", () => {
	describe("valid-negative", () => {
		it("should reject negative delay", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
			   "kind": "transition-delay",
			   "delays": [
			      {
			         "value": -1,
			         "unit": "s"
			      }
			   ]
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("delays[0].value: Time value must be non-negative");
		});

		it("should reject negative delay in milliseconds", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
			   "kind": "transition-delay",
			   "delays": [
			      {
			         "value": -500,
			         "unit": "ms"
			      }
			   ]
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("delays[0].value: Time value must be non-negative");
		});

	});

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

		it("should reject undefined input", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = undefined;
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("Invalid input: expected object, received undefined");
		});

	});

	describe("invalid-unit", () => {
		it("should reject invalid unit px", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
			   "kind": "transition-delay",
			   "delays": [
			      {
			         "value": 1,
			         "unit": "px"
			      }
			   ]
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("delays[0].unit: Invalid unit. Expected \"s\" or \"ms\".");
		});

		it("should reject invalid unit em", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
			   "kind": "transition-delay",
			   "delays": [
			      {
			         "value": 1,
			         "unit": "em"
			      }
			   ]
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("delays[0].unit: Invalid unit. Expected \"s\" or \"ms\".");
		});

	});

	describe("invalid-value-type", () => {
		it("should reject string value", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
			   "kind": "transition-delay",
			   "delays": [
			      {
			         "value": "oops",
			         "unit": "s"
			      }
			   ]
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("delays[0].value: Invalid input: expected number, received string");
		});

		it("should reject null value", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
			   "kind": "transition-delay",
			   "delays": [
			      {
			         "value": null,
			         "unit": "s"
			      }
			   ]
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("delays[0].value: Invalid input: expected number, received null");
		});

	});

	describe("invalid-missing", () => {
		it("should reject missing value field", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
			   "kind": "transition-delay",
			   "delays": [
			      {
			         "unit": "s"
			      }
			   ]
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("delays[0].value: Invalid input: expected number, received undefined");
		});

		it("should reject missing unit field", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
			   "kind": "transition-delay",
			   "delays": [
			      {
			         "value": 1
			      }
			   ]
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("delays[0].unit: Invalid unit. Expected \"s\" or \"ms\".");
		});

	});

	describe("invalid-empty", () => {
		it("should reject empty delays array", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
			   "kind": "transition-delay",
			   "delays": []
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("delays: Too small: expected array to have >=1 items");
		});

	});

});
