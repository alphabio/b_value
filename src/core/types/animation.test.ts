// b_path:: src/core/types/animation.test.ts
import { describe, expect, test } from "vitest";
import { cubicBezierSchema, linearEasingSchema, linearStopSchema, stepsSchema } from "./animation";

/**
 * Schema validation tests for animation timing functions.
 *
 * These tests validate Zod schemas directly using `.safeParse()` to ensure
 * they reject invalid IR values (NaN, Infinity, out-of-range, etc.) before
 * reaching parsers or generators.
 *
 * Per CSS Easing Spec: https://www.w3.org/TR/css-easing-1/
 */

describe("cubicBezierSchema", () => {
	describe("valid values", () => {
		test("accepts standard ease curve", () => {
			const result = cubicBezierSchema.safeParse({
				type: "cubic-bezier",
				x1: 0.25,
				y1: 0.1,
				x2: 0.25,
				y2: 1.0,
			});
			expect(result.success).toBe(true);
		});

		test("accepts y values outside 0-1 (bounce effects)", () => {
			const result = cubicBezierSchema.safeParse({
				type: "cubic-bezier",
				x1: 0.5,
				y1: -0.5,
				x2: 0.5,
				y2: 1.5,
			});
			expect(result.success).toBe(true);
		});

		test("accepts boundary x values (0 and 1)", () => {
			const result = cubicBezierSchema.safeParse({
				type: "cubic-bezier",
				x1: 0,
				y1: 0,
				x2: 1,
				y2: 1,
			});
			expect(result.success).toBe(true);
		});

		test("accepts linear curve (0,0,1,1)", () => {
			const result = cubicBezierSchema.safeParse({
				type: "cubic-bezier",
				x1: 0,
				y1: 0,
				x2: 1,
				y2: 1,
			});
			expect(result.success).toBe(true);
		});

		test("accepts large negative y values", () => {
			const result = cubicBezierSchema.safeParse({
				type: "cubic-bezier",
				x1: 0.5,
				y1: -100,
				x2: 0.5,
				y2: 100,
			});
			expect(result.success).toBe(true);
		});
	});

	describe("invalid values - x constraints", () => {
		test("rejects x1 > 1", () => {
			const result = cubicBezierSchema.safeParse({
				type: "cubic-bezier",
				x1: 1.5,
				y1: 0,
				x2: 0,
				y2: 1,
			});
			expect(result.success).toBe(false);
		});

		test("rejects x1 < 0", () => {
			const result = cubicBezierSchema.safeParse({
				type: "cubic-bezier",
				x1: -0.1,
				y1: 0,
				x2: 0,
				y2: 1,
			});
			expect(result.success).toBe(false);
		});

		test("rejects x2 > 1", () => {
			const result = cubicBezierSchema.safeParse({
				type: "cubic-bezier",
				x1: 0,
				y1: 0,
				x2: 1.1,
				y2: 1,
			});
			expect(result.success).toBe(false);
		});

		test("rejects x2 < 0", () => {
			const result = cubicBezierSchema.safeParse({
				type: "cubic-bezier",
				x1: 0,
				y1: 0,
				x2: -0.5,
				y2: 1,
			});
			expect(result.success).toBe(false);
		});
	});

	describe("invalid values - special numbers", () => {
		test("rejects x1 = Infinity", () => {
			const result = cubicBezierSchema.safeParse({
				type: "cubic-bezier",
				x1: Number.POSITIVE_INFINITY,
				y1: 0,
				x2: 0,
				y2: 1,
			});
			expect(result.success).toBe(false);
		});

		test("rejects x1 = -Infinity", () => {
			const result = cubicBezierSchema.safeParse({
				type: "cubic-bezier",
				x1: Number.NEGATIVE_INFINITY,
				y1: 0,
				x2: 0,
				y2: 1,
			});
			expect(result.success).toBe(false);
		});

		test("rejects x1 = NaN", () => {
			const result = cubicBezierSchema.safeParse({
				type: "cubic-bezier",
				x1: Number.NaN,
				y1: 0,
				x2: 0,
				y2: 1,
			});
			expect(result.success).toBe(false);
		});

		test("rejects y1 = NaN", () => {
			const result = cubicBezierSchema.safeParse({
				type: "cubic-bezier",
				x1: 0,
				y1: Number.NaN,
				x2: 1,
				y2: 1,
			});
			expect(result.success).toBe(false);
		});

		test("rejects y1 = Infinity", () => {
			const result = cubicBezierSchema.safeParse({
				type: "cubic-bezier",
				x1: 0,
				y1: Number.POSITIVE_INFINITY,
				x2: 1,
				y2: 1,
			});
			expect(result.success).toBe(false);
		});
	});

	describe("invalid values - missing/wrong fields", () => {
		test("rejects missing x2", () => {
			const result = cubicBezierSchema.safeParse({
				type: "cubic-bezier",
				x1: 0,
				y1: 0,
				y2: 1,
			});
			expect(result.success).toBe(false);
		});

		test("rejects missing y2", () => {
			const result = cubicBezierSchema.safeParse({
				type: "cubic-bezier",
				x1: 0,
				y1: 0,
				x2: 1,
			});
			expect(result.success).toBe(false);
		});

		test("rejects wrong type field", () => {
			const result = cubicBezierSchema.safeParse({
				type: "steps",
				x1: 0,
				y1: 0,
				x2: 1,
				y2: 1,
			});
			expect(result.success).toBe(false);
		});

		test("allows extra fields (zod default behavior)", () => {
			const result = cubicBezierSchema.safeParse({
				type: "cubic-bezier",
				x1: 0,
				y1: 0,
				x2: 1,
				y2: 1,
				extra: "field",
			});
			// Zod allows extra fields by default unless using .strict()
			expect(result.success).toBe(true);
		});
	});
});

describe("stepsSchema", () => {
	describe("valid values", () => {
		test("accepts single step", () => {
			const result = stepsSchema.safeParse({
				type: "steps",
				steps: 1,
			});
			expect(result.success).toBe(true);
		});

		test("accepts steps with end position", () => {
			const result = stepsSchema.safeParse({
				type: "steps",
				steps: 4,
				position: "end",
			});
			expect(result.success).toBe(true);
		});

		test("accepts steps with start position", () => {
			const result = stepsSchema.safeParse({
				type: "steps",
				steps: 3,
				position: "start",
			});
			expect(result.success).toBe(true);
		});

		test("accepts steps with jump-start", () => {
			const result = stepsSchema.safeParse({
				type: "steps",
				steps: 5,
				position: "jump-start",
			});
			expect(result.success).toBe(true);
		});

		test("accepts steps with jump-end", () => {
			const result = stepsSchema.safeParse({
				type: "steps",
				steps: 2,
				position: "jump-end",
			});
			expect(result.success).toBe(true);
		});

		test("accepts steps with jump-none", () => {
			const result = stepsSchema.safeParse({
				type: "steps",
				steps: 4,
				position: "jump-none",
			});
			expect(result.success).toBe(true);
		});

		test("accepts steps with jump-both", () => {
			const result = stepsSchema.safeParse({
				type: "steps",
				steps: 3,
				position: "jump-both",
			});
			expect(result.success).toBe(true);
		});

		test("accepts large step count", () => {
			const result = stepsSchema.safeParse({
				type: "steps",
				steps: 1000,
			});
			expect(result.success).toBe(true);
		});
	});

	describe("invalid values - step constraints", () => {
		test("rejects zero steps", () => {
			const result = stepsSchema.safeParse({
				type: "steps",
				steps: 0,
			});
			expect(result.success).toBe(false);
		});

		test("rejects negative steps", () => {
			const result = stepsSchema.safeParse({
				type: "steps",
				steps: -5,
			});
			expect(result.success).toBe(false);
		});

		test("rejects float steps", () => {
			const result = stepsSchema.safeParse({
				type: "steps",
				steps: 3.5,
			});
			expect(result.success).toBe(false);
		});

		test("rejects NaN steps", () => {
			const result = stepsSchema.safeParse({
				type: "steps",
				steps: Number.NaN,
			});
			expect(result.success).toBe(false);
		});

		test("rejects Infinity steps", () => {
			const result = stepsSchema.safeParse({
				type: "steps",
				steps: Number.POSITIVE_INFINITY,
			});
			expect(result.success).toBe(false);
		});
	});

	describe("invalid values - position constraints", () => {
		test("rejects invalid position keyword", () => {
			const result = stepsSchema.safeParse({
				type: "steps",
				steps: 4,
				position: "middle",
			});
			expect(result.success).toBe(false);
		});

		test("rejects numeric position", () => {
			const result = stepsSchema.safeParse({
				type: "steps",
				steps: 4,
				position: 123,
			});
			expect(result.success).toBe(false);
		});
	});

	describe("invalid values - missing/wrong fields", () => {
		test("rejects missing steps field", () => {
			const result = stepsSchema.safeParse({
				type: "steps",
			});
			expect(result.success).toBe(false);
		});

		test("rejects wrong type field", () => {
			const result = stepsSchema.safeParse({
				type: "cubic-bezier",
				steps: 4,
			});
			expect(result.success).toBe(false);
		});
	});
});

describe("linearStopSchema", () => {
	describe("valid values", () => {
		test("accepts stop with output only", () => {
			const result = linearStopSchema.safeParse({
				output: 0.5,
			});
			expect(result.success).toBe(true);
		});

		test("accepts stop with output and input", () => {
			const result = linearStopSchema.safeParse({
				output: 0.5,
				input: 0.25,
			});
			expect(result.success).toBe(true);
		});

		test("accepts boundary input values (0 and 1)", () => {
			const result = linearStopSchema.safeParse({
				output: 1,
				input: 1,
			});
			expect(result.success).toBe(true);
		});

		test("accepts negative output", () => {
			const result = linearStopSchema.safeParse({
				output: -0.5,
				input: 0.5,
			});
			expect(result.success).toBe(true);
		});

		test("accepts output > 1", () => {
			const result = linearStopSchema.safeParse({
				output: 1.5,
				input: 0.8,
			});
			expect(result.success).toBe(true);
		});
	});

	describe("invalid values - input constraints", () => {
		test("rejects input < 0", () => {
			const result = linearStopSchema.safeParse({
				output: 0.5,
				input: -0.1,
			});
			expect(result.success).toBe(false);
		});

		test("rejects input > 1", () => {
			const result = linearStopSchema.safeParse({
				output: 0.5,
				input: 1.1,
			});
			expect(result.success).toBe(false);
		});

		test("rejects input = NaN", () => {
			const result = linearStopSchema.safeParse({
				output: 0.5,
				input: Number.NaN,
			});
			expect(result.success).toBe(false);
		});

		test("rejects input = Infinity", () => {
			const result = linearStopSchema.safeParse({
				output: 0.5,
				input: Number.POSITIVE_INFINITY,
			});
			expect(result.success).toBe(false);
		});
	});

	describe("invalid values - output constraints", () => {
		test("rejects output = NaN", () => {
			const result = linearStopSchema.safeParse({
				output: Number.NaN,
				input: 0.5,
			});
			expect(result.success).toBe(false);
		});

		test("rejects output = Infinity", () => {
			const result = linearStopSchema.safeParse({
				output: Number.POSITIVE_INFINITY,
				input: 0.5,
			});
			expect(result.success).toBe(false);
		});

		test("rejects missing output", () => {
			const result = linearStopSchema.safeParse({
				input: 0.5,
			});
			expect(result.success).toBe(false);
		});
	});
});

describe("linearEasingSchema", () => {
	describe("valid values", () => {
		test("accepts single stop", () => {
			const result = linearEasingSchema.safeParse({
				type: "linear",
				stops: [{ output: 0.5 }],
			});
			expect(result.success).toBe(true);
		});

		test("accepts multiple stops", () => {
			const result = linearEasingSchema.safeParse({
				type: "linear",
				stops: [{ output: 0 }, { output: 0.5, input: 0.5 }, { output: 1 }],
			});
			expect(result.success).toBe(true);
		});

		test("accepts stops with mixed input presence", () => {
			const result = linearEasingSchema.safeParse({
				type: "linear",
				stops: [{ output: 0 }, { output: 0.5, input: 0.25 }, { output: 1 }],
			});
			expect(result.success).toBe(true);
		});
	});

	describe("invalid values", () => {
		test("rejects empty stops array", () => {
			const result = linearEasingSchema.safeParse({
				type: "linear",
				stops: [],
			});
			expect(result.success).toBe(false);
		});

		test("rejects invalid stop in array", () => {
			const result = linearEasingSchema.safeParse({
				type: "linear",
				stops: [{ output: 0 }, { output: Number.NaN }],
			});
			expect(result.success).toBe(false);
		});

		test("rejects missing type", () => {
			const result = linearEasingSchema.safeParse({
				stops: [{ output: 0.5 }],
			});
			expect(result.success).toBe(false);
		});

		test("rejects wrong type", () => {
			const result = linearEasingSchema.safeParse({
				type: "steps",
				stops: [{ output: 0.5 }],
			});
			expect(result.success).toBe(false);
		});

		test("rejects missing stops", () => {
			const result = linearEasingSchema.safeParse({
				type: "linear",
			});
			expect(result.success).toBe(false);
		});
	});
});
