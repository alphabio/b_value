// b_path:: src/parse/animation/duration.test.ts
// Auto-generated from scripts/test-generator/configs/duration.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-duration
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/animation/duration";

describe("parse/animation/duration", () => {
	describe("valid cases", () => {
		describe("valid-basic", () => {
			it("should parse single time value in seconds", () => {
				const result = Parser.parse("1s");
				expect(result.ok).toBe(true);
				if (!result.ok) return;
				expect(result.value).toEqual({
				   "kind": "animation-duration",
				   "durations": [
				      {
				         "type": "time",
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
				   "kind": "animation-duration",
				   "durations": [
				      {
				         "type": "time",
				         "value": 500,
				         "unit": "ms"
				      }
				   ]
				});
			});

		});

		describe("valid-keyword", () => {
			it("should parse auto keyword", () => {
				const result = Parser.parse("auto");
				expect(result.ok).toBe(true);
				if (!result.ok) return;
				expect(result.value).toEqual({
				   "kind": "animation-duration",
				   "durations": [
				      {
				         "type": "auto"
				      }
				   ]
				});
			});

			it("should parse case insensitive auto", () => {
				const result = Parser.parse("AUTO");
				expect(result.ok).toBe(true);
				if (!result.ok) return;
				expect(result.value).toEqual({
				   "kind": "animation-duration",
				   "durations": [
				      {
				         "type": "auto"
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
				   "kind": "animation-duration",
				   "durations": [
				      {
				         "type": "time",
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
				   "kind": "animation-duration",
				   "durations": [
				      {
				         "type": "time",
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
				   "kind": "animation-duration",
				   "durations": [
				      {
				         "type": "time",
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
				   "kind": "animation-duration",
				   "durations": [
				      {
				         "type": "time",
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
				   "kind": "animation-duration",
				   "durations": [
				      {
				         "type": "time",
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
				   "kind": "animation-duration",
				   "durations": [
				      {
				         "type": "time",
				         "value": 3600,
				         "unit": "s"
				      }
				   ]
				});
			});

		});

		describe("valid-list", () => {
			it("should parse multiple durations", () => {
				const result = Parser.parse("1s, auto, 500ms");
				expect(result.ok).toBe(true);
				if (!result.ok) return;
				expect(result.value).toEqual({
				   "kind": "animation-duration",
				   "durations": [
				      {
				         "type": "time",
				         "value": 1,
				         "unit": "s"
				      },
				      {
				         "type": "auto"
				      },
				      {
				         "type": "time",
				         "value": 500,
				         "unit": "ms"
				      }
				   ]
				});
			});

			it("should parse durations with whitespace", () => {
				const result = Parser.parse("1s , auto , 2s");
				expect(result.ok).toBe(true);
				if (!result.ok) return;
				expect(result.value).toEqual({
				   "kind": "animation-duration",
				   "durations": [
				      {
				         "type": "time",
				         "value": 1,
				         "unit": "s"
				      },
				      {
				         "type": "auto"
				      },
				      {
				         "type": "time",
				         "value": 2,
				         "unit": "s"
				      }
				   ]
				});
			});

			it("should parse multiple time values", () => {
				const result = Parser.parse("1s, 2s, 3s, 4s");
				expect(result.ok).toBe(true);
				if (!result.ok) return;
				expect(result.value).toEqual({
				   "kind": "animation-duration",
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
				});
			});

		});

	});

	describe("invalid cases", () => {
		describe("invalid-negative", () => {
			it("should reject negative duration", () => {
				const result = Parser.parse("-1s");
				expect(result.ok).toBe(false);
				if (result.ok) return;
				expect(result.error).toContain("must be");
			});

			it("should reject negative milliseconds", () => {
				const result = Parser.parse("-500ms");
				expect(result.ok).toBe(false);
				if (result.ok) return;
				expect(result.error).toContain("must be");
			});

		});

		describe("invalid-unit", () => {
			it("should reject invalid unit", () => {
				const result = Parser.parse("1px");
				expect(result.ok).toBe(false);
				if (result.ok) return;
				expect(result.error).toContain("Invalid");
			});

			it("should reject wrong unit type", () => {
				const result = Parser.parse("1em");
				expect(result.ok).toBe(false);
				if (result.ok) return;
				expect(result.error).toContain("Invalid");
			});

			it("should reject missing unit", () => {
				const result = Parser.parse("1");
				expect(result.ok).toBe(false);
				if (result.ok) return;
				expect(result.error).toContain("Expected");
			});

		});

		describe("invalid-empty", () => {
			it("should reject empty value", () => {
				const result = Parser.parse("");
				expect(result.ok).toBe(false);
				if (result.ok) return;
				expect(result.error).toContain("Empty");
			});

		});

		describe("invalid-comma", () => {
			it("should reject trailing comma", () => {
				const result = Parser.parse("1s,");
				expect(result.ok).toBe(false);
				if (result.ok) return;
				expect(result.error).toContain("Empty");
			});

			it("should reject leading comma", () => {
				const result = Parser.parse(",1s");
				expect(result.ok).toBe(false);
				if (result.ok) return;
				expect(result.error).toContain("Empty");
			});

			it("should reject double comma", () => {
				const result = Parser.parse("1s,,2s");
				expect(result.ok).toBe(false);
				if (result.ok) return;
				expect(result.error).toContain("Empty");
			});

		});

		describe("invalid-keyword", () => {
			it("should reject invalid keyword", () => {
				const result = Parser.parse("invalid");
				expect(result.ok).toBe(false);
				if (result.ok) return;
				expect(result.error).toContain("Expected");
			});

			it("should reject wrong keyword", () => {
				const result = Parser.parse("none");
				expect(result.ok).toBe(false);
				if (result.ok) return;
				expect(result.error).toContain("Expected");
			});

		});

	});
});
