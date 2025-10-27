/**
 * Valid syntax tests for animation-timing-function parser.
 *
 * Tests full CSS spec coverage of valid easing function syntax.
 * Per CSS Easing Functions Level 1: https://www.w3.org/TR/css-easing-1/
 * MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function
 *
 * Test Pattern: Parse CSS → Validate IR structure
 */
import { describe, expect, test } from "vitest";
import { parse } from "./timing-function";

describe("parse/animation/timing-function - valid syntax", () => {
	describe("keywords", () => {
		test("ease", () => {
			const result = parse("ease");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-timing-function",
				functions: ["ease"],
			});
		});

		test("linear", () => {
			const result = parse("linear");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-timing-function",
				functions: ["linear"],
			});
		});

		test("ease-in", () => {
			const result = parse("ease-in");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-timing-function",
				functions: ["ease-in"],
			});
		});

		test("ease-out", () => {
			const result = parse("ease-out");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-timing-function",
				functions: ["ease-out"],
			});
		});

		test("ease-in-out", () => {
			const result = parse("ease-in-out");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-timing-function",
				functions: ["ease-in-out"],
			});
		});

		test("step-start", () => {
			const result = parse("step-start");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-timing-function",
				functions: ["step-start"],
			});
		});

		test("step-end", () => {
			const result = parse("step-end");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-timing-function",
				functions: ["step-end"],
			});
		});
	});

	describe("cubic-bezier() - standard values", () => {
		test("standard ease curve", () => {
			const result = parse("cubic-bezier(0.25, 0.1, 0.25, 1.0)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]).toEqual({
				type: "cubic-bezier",
				x1: 0.25,
				y1: 0.1,
				x2: 0.25,
				y2: 1.0,
			});
		});

		test("linear curve (0, 0, 1, 1)", () => {
			const result = parse("cubic-bezier(0, 0, 1, 1)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]).toEqual({
				type: "cubic-bezier",
				x1: 0,
				y1: 0,
				x2: 1,
				y2: 1,
			});
		});

		test("all zeros", () => {
			const result = parse("cubic-bezier(0, 0, 0, 0)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]).toEqual({
				type: "cubic-bezier",
				x1: 0,
				y1: 0,
				x2: 0,
				y2: 0,
			});
		});

		test("all ones", () => {
			const result = parse("cubic-bezier(1, 1, 1, 1)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]).toEqual({
				type: "cubic-bezier",
				x1: 1,
				y1: 1,
				x2: 1,
				y2: 1,
			});
		});

		test("decimal precision", () => {
			const result = parse("cubic-bezier(0.123456, 0.789012, 0.345678, 0.901234)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]?.type).toBe("cubic-bezier");
		});
	});

	describe("cubic-bezier() - bounce effects (y outside 0-1)", () => {
		test("negative y1 (bounce back)", () => {
			const result = parse("cubic-bezier(0.5, -0.5, 0.5, 1.0)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]).toEqual({
				type: "cubic-bezier",
				x1: 0.5,
				y1: -0.5,
				x2: 0.5,
				y2: 1.0,
			});
		});

		test("y2 > 1 (overshoot)", () => {
			const result = parse("cubic-bezier(0.5, 0, 0.5, 1.5)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]).toEqual({
				type: "cubic-bezier",
				x1: 0.5,
				y1: 0,
				x2: 0.5,
				y2: 1.5,
			});
		});

		test("both y negative", () => {
			const result = parse("cubic-bezier(0.5, -1.0, 0.5, -0.5)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]).toEqual({
				type: "cubic-bezier",
				x1: 0.5,
				y1: -1.0,
				x2: 0.5,
				y2: -0.5,
			});
		});

		test("both y > 1", () => {
			const result = parse("cubic-bezier(0.5, 1.5, 0.5, 2.0)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]).toEqual({
				type: "cubic-bezier",
				x1: 0.5,
				y1: 1.5,
				x2: 0.5,
				y2: 2.0,
			});
		});

		test("extreme negative y", () => {
			const result = parse("cubic-bezier(0.5, -100, 0.5, 0)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]?.type).toBe("cubic-bezier");
		});

		test("extreme positive y", () => {
			const result = parse("cubic-bezier(0.5, 0, 0.5, 100)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]?.type).toBe("cubic-bezier");
		});
	});

	describe("cubic-bezier() - whitespace variations", () => {
		test("no spaces", () => {
			const result = parse("cubic-bezier(0.1,0.2,0.3,0.4)");
			expect(result.ok).toBe(true);
		});

		test("extra spaces around commas", () => {
			const result = parse("cubic-bezier(0.1 , 0.2 , 0.3 , 0.4)");
			expect(result.ok).toBe(true);
		});

		test("spaces inside parentheses", () => {
			const result = parse("cubic-bezier( 0.1, 0.2, 0.3, 0.4 )");
			expect(result.ok).toBe(true);
		});

		test("multiple spaces", () => {
			const result = parse("cubic-bezier(  0.1  ,  0.2  ,  0.3  ,  0.4  )");
			expect(result.ok).toBe(true);
		});
	});

	describe("steps() - basic", () => {
		test("steps with count only (defaults to end)", () => {
			const result = parse("steps(4)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]).toEqual({
				type: "steps",
				steps: 4,
			});
		});

		test("single step", () => {
			const result = parse("steps(1)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]).toEqual({
				type: "steps",
				steps: 1,
			});
		});

		test("large step count", () => {
			const result = parse("steps(1000)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]).toEqual({
				type: "steps",
				steps: 1000,
			});
		});
	});

	describe("steps() - with position keywords", () => {
		test("steps with end", () => {
			const result = parse("steps(4, end)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]).toEqual({
				type: "steps",
				steps: 4,
				position: "end",
			});
		});

		test("steps with start", () => {
			const result = parse("steps(3, start)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]).toEqual({
				type: "steps",
				steps: 3,
				position: "start",
			});
		});

		test("steps with jump-start", () => {
			const result = parse("steps(5, jump-start)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]).toEqual({
				type: "steps",
				steps: 5,
				position: "jump-start",
			});
		});

		test("steps with jump-end", () => {
			const result = parse("steps(2, jump-end)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]).toEqual({
				type: "steps",
				steps: 2,
				position: "jump-end",
			});
		});

		test("steps with jump-none", () => {
			const result = parse("steps(4, jump-none)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]).toEqual({
				type: "steps",
				steps: 4,
				position: "jump-none",
			});
		});

		test("steps with jump-both", () => {
			const result = parse("steps(3, jump-both)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]).toEqual({
				type: "steps",
				steps: 3,
				position: "jump-both",
			});
		});
	});

	describe("steps() - whitespace variations", () => {
		test("no spaces", () => {
			const result = parse("steps(4,end)");
			expect(result.ok).toBe(true);
		});

		test("extra spaces", () => {
			const result = parse("steps( 4 , end )");
			expect(result.ok).toBe(true);
		});
	});

	describe("linear() - basic", () => {
		test("linear with single stop", () => {
			const result = parse("linear(0.5)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]).toEqual({
				type: "linear",
				stops: [{ output: 0.5 }],
			});
		});

		test("linear with multiple stops", () => {
			const result = parse("linear(0, 0.5, 1)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions[0]).toEqual({
				type: "linear",
				stops: [{ output: 0 }, { output: 0.5 }, { output: 1 }],
			});
		});

		test("linear with stop positions", () => {
			const result = parse("linear(0 0%, 0.5 50%, 1 100%)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			const func = result.value.functions[0];
			expect(func?.type).toBe("linear");
			if (func?.type !== "linear") return;
			expect(func.stops).toHaveLength(3);
			expect(func.stops[0]?.output).toBe(0);
			expect(func.stops[1]?.output).toBe(0.5);
			expect(func.stops[2]?.output).toBe(1);
		});
	});

	describe("comma-separated lists", () => {
		test("two keywords", () => {
			const result = parse("ease, ease-in-out");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions).toEqual(["ease", "ease-in-out"]);
		});

		test("three keywords", () => {
			const result = parse("ease, linear, ease-out");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions).toHaveLength(3);
		});

		test("keyword and cubic-bezier", () => {
			const result = parse("ease, cubic-bezier(0.1, 0.2, 0.3, 0.4)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions).toHaveLength(2);
			expect(result.value.functions[0]).toBe("ease");
			expect(result.value.functions[1]).toEqual({
				type: "cubic-bezier",
				x1: 0.1,
				y1: 0.2,
				x2: 0.3,
				y2: 0.4,
			});
		});

		test("mixed functions", () => {
			const result = parse("ease, cubic-bezier(0.1, 0.2, 0.3, 0.4), steps(3, start)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions).toHaveLength(3);
		});

		test("multiple cubic-bezier", () => {
			const result = parse("cubic-bezier(0, 0, 1, 1), cubic-bezier(0.5, 0, 0.5, 1)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.functions).toHaveLength(2);
		});
	});

	describe("whitespace around lists", () => {
		test("spaces around commas", () => {
			const result = parse("ease , linear , ease-out");
			expect(result.ok).toBe(true);
		});

		test("no spaces", () => {
			const result = parse("ease,linear,ease-out");
			expect(result.ok).toBe(true);
		});

		test("leading/trailing spaces", () => {
			const result = parse("  ease, linear  ");
			expect(result.ok).toBe(true);
		});
	});
});
