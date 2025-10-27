// b_path:: src/parse/transition/duration.test.ts
// Auto-generated from scripts/parse-test-generator/configs/transition/duration.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration
// - W3C: https://www.w3.org/TR/css-transitions-1/#transition-duration-property
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/transition/duration";

describe("parse/transition/duration - valid cases", () => {
	describe("valid-basic", () => {
		it("should parse single time value in seconds", () => {
			const result = Parser.parse("1s");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
			   "kind": "transition-duration",
			   "durations": [
			      {
			         "value": 1,
			         "unit": "s"
			      }
			   ]
			});
		});

		it("should parse single time value in milliseconds", () => {
			const result = Parser.parse("500ms");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
			   "kind": "transition-duration",
			   "durations": [
			      {
			         "value": 500,
			         "unit": "ms"
			      }
			   ]
			});
		});

	});

	describe("valid-edge", () => {
		it("should parse zero duration", () => {
			const result = Parser.parse("0s");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
			   "kind": "transition-duration",
			   "durations": [
			      {
			         "value": 0,
			         "unit": "s"
			      }
			   ]
			});
		});

		it("should parse zero duration in ms", () => {
			const result = Parser.parse("0ms");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
			   "kind": "transition-duration",
			   "durations": [
			      {
			         "value": 0,
			         "unit": "ms"
			      }
			   ]
			});
		});

	});

	describe("valid-decimal", () => {
		it("should parse decimal values", () => {
			const result = Parser.parse("0.5s");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
			   "kind": "transition-duration",
			   "durations": [
			      {
			         "value": 0.5,
			         "unit": "s"
			      }
			   ]
			});
		});

		it("should parse decimal seconds", () => {
			const result = Parser.parse("2.5s");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
			   "kind": "transition-duration",
			   "durations": [
			      {
			         "value": 2.5,
			         "unit": "s"
			      }
			   ]
			});
		});

		it("should parse decimal milliseconds", () => {
			const result = Parser.parse("100.5ms");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
			   "kind": "transition-duration",
			   "durations": [
			      {
			         "value": 100.5,
			         "unit": "ms"
			      }
			   ]
			});
		});

	});

	describe("valid-large", () => {
		it("should parse large values", () => {
			const result = Parser.parse("3600s");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
			   "kind": "transition-duration",
			   "durations": [
			      {
			         "value": 3600,
			         "unit": "s"
			      }
			   ]
			});
		});

	});

	describe("valid-list", () => {
		it("should parse multiple time values", () => {
			const result = Parser.parse("1s, 2s, 3s, 4s");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
			   "kind": "transition-duration",
			   "durations": [
			      {
			         "value": 1,
			         "unit": "s"
			      },
			      {
			         "value": 2,
			         "unit": "s"
			      },
			      {
			         "value": 3,
			         "unit": "s"
			      },
			      {
			         "value": 4,
			         "unit": "s"
			      }
			   ]
			});
		});

	});

});
