// b_path:: src/generate/transition/duration.test.ts
// Auto-generated from scripts/generate-test-generator/configs/transition/duration.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration
// - W3C: https://www.w3.org/TR/css-transitions-1/#transition-duration-property
import { describe, expect, it } from "vitest";
import * as Generator from "@/generate/transition/duration";
import * as Parser from "@/parse/transition/duration";
import type * as Type from "@/core/types";

describe("generate/transition/duration - valid cases", () => {
	describe("valid-basic", () => {
		it("should generate single time value in seconds", () => {
			const input: Type.AnimationDuration = {
			   "kind": "transition-duration",
			   "durations": [
			      {
			         "type": "time",
			         "value": 1,
			         "unit": "s"
			      }
			   ]
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("1s");
		});

		it("should generate single time value in milliseconds", () => {
			const input: Type.AnimationDuration = {
			   "kind": "transition-duration",
			   "durations": [
			      {
			         "type": "time",
			         "value": 500,
			         "unit": "ms"
			      }
			   ]
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("500ms");
		});

	});

	describe("valid-edge", () => {
		it("should generate zero duration", () => {
			const input: Type.AnimationDuration = {
			   "kind": "transition-duration",
			   "durations": [
			      {
			         "type": "time",
			         "value": 0,
			         "unit": "s"
			      }
			   ]
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("0s");
		});

		it("should generate zero duration in ms", () => {
			const input: Type.AnimationDuration = {
			   "kind": "transition-duration",
			   "durations": [
			      {
			         "type": "time",
			         "value": 0,
			         "unit": "ms"
			      }
			   ]
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("0ms");
		});

	});

	describe("valid-decimal", () => {
		it("should generate decimal values", () => {
			const input: Type.AnimationDuration = {
			   "kind": "transition-duration",
			   "durations": [
			      {
			         "type": "time",
			         "value": 0.5,
			         "unit": "s"
			      }
			   ]
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("0.5s");
		});

		it("should generate decimal seconds", () => {
			const input: Type.AnimationDuration = {
			   "kind": "transition-duration",
			   "durations": [
			      {
			         "type": "time",
			         "value": 2.5,
			         "unit": "s"
			      }
			   ]
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("2.5s");
		});

		it("should generate decimal milliseconds", () => {
			const input: Type.AnimationDuration = {
			   "kind": "transition-duration",
			   "durations": [
			      {
			         "type": "time",
			         "value": 100.5,
			         "unit": "ms"
			      }
			   ]
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("100.5ms");
		});

	});

	describe("valid-large", () => {
		it("should generate large values", () => {
			const input: Type.AnimationDuration = {
			   "kind": "transition-duration",
			   "durations": [
			      {
			         "type": "time",
			         "value": 3600,
			         "unit": "s"
			      }
			   ]
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("3600s");
		});

	});

	describe("valid-list", () => {
		it("should generate multiple time values", () => {
			const input: Type.AnimationDuration = {
			   "kind": "transition-duration",
			   "durations": [
			      {
			         "type": "time",
			         "value": 1,
			         "unit": "s"
			      },
			      {
			         "type": "time",
			         "value": 2,
			         "unit": "s"
			      },
			      {
			         "type": "time",
			         "value": 3,
			         "unit": "s"
			      },
			      {
			         "type": "time",
			         "value": 4,
			         "unit": "s"
			      }
			   ]
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("1s, 2s, 3s, 4s");
		});

	});

});
