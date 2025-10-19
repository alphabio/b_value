// b_path:: src/parse/animation/timing-function.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "./timing-function";

describe("Animation Timing Function Parser", () => {
	// Keywords
	it("should parse ease keyword", () => {
		const result = Parser.parse("ease");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("animation-timing-function");
			expect(result.value.functions).toEqual(["ease"]);
		}
	});

	it("should parse ease-in keyword", () => {
		const result = Parser.parse("ease-in");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.functions).toEqual(["ease-in"]);
		}
	});

	it("should parse linear keyword", () => {
		const result = Parser.parse("linear");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.functions).toEqual(["linear"]);
		}
	});

	it("should parse step-start keyword", () => {
		const result = Parser.parse("step-start");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.functions).toEqual(["step-start"]);
		}
	});

	// cubic-bezier()
	it("should parse cubic-bezier with 4 values", () => {
		const result = Parser.parse("cubic-bezier(0.1, 0.7, 1.0, 0.1)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.functions[0]).toEqual({
				type: "cubic-bezier",
				x1: 0.1,
				y1: 0.7,
				x2: 1.0,
				y2: 0.1,
			});
		}
	});

	it("should parse cubic-bezier without spaces", () => {
		const result = Parser.parse("cubic-bezier(0,0,1,1)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.functions[0]).toEqual({
				type: "cubic-bezier",
				x1: 0,
				y1: 0,
				x2: 1,
				y2: 1,
			});
		}
	});

	it("should parse cubic-bezier with negative values", () => {
		const result = Parser.parse("cubic-bezier(0.5, -0.5, 0.5, 1.5)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.functions[0]).toEqual({
				type: "cubic-bezier",
				x1: 0.5,
				y1: -0.5,
				x2: 0.5,
				y2: 1.5,
			});
		}
	});

	it("should reject cubic-bezier with wrong number of args", () => {
		const result = Parser.parse("cubic-bezier(0.1, 0.7)");
		expect(result.ok).toBe(false);
	});

	// steps()
	it("should parse steps with count only", () => {
		const result = Parser.parse("steps(4)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.functions[0]).toEqual({
				type: "steps",
				steps: 4,
				position: undefined,
			});
		}
	});

	it("should parse steps with jump-start", () => {
		const result = Parser.parse("steps(4, jump-start)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.functions[0]).toEqual({
				type: "steps",
				steps: 4,
				position: "jump-start",
			});
		}
	});

	it("should parse steps with jump-end", () => {
		const result = Parser.parse("steps(3, jump-end)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.functions[0]).toEqual({
				type: "steps",
				steps: 3,
				position: "jump-end",
			});
		}
	});

	it("should parse steps with start", () => {
		const result = Parser.parse("steps(5, start)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.functions[0]).toEqual({
				type: "steps",
				steps: 5,
				position: "start",
			});
		}
	});

	it("should reject steps with zero", () => {
		const result = Parser.parse("steps(0)");
		expect(result.ok).toBe(false);
	});

	it("should reject steps with negative", () => {
		const result = Parser.parse("steps(-1)");
		expect(result.ok).toBe(false);
	});

	it("should reject steps with decimal", () => {
		const result = Parser.parse("steps(2.5)");
		expect(result.ok).toBe(false);
	});

	// linear()
	it("should parse linear with single stop", () => {
		const result = Parser.parse("linear(0)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.functions[0]).toEqual({
				type: "linear",
				stops: [{ output: 0 }],
			});
		}
	});

	it("should parse linear with multiple stops", () => {
		const result = Parser.parse("linear(0, 0.5, 1)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.functions[0]).toEqual({
				type: "linear",
				stops: [{ output: 0 }, { output: 0.5 }, { output: 1 }],
			});
		}
	});

	it("should parse linear with input percentages", () => {
		const result = Parser.parse("linear(0 0%, 1 100%)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.functions[0]).toEqual({
				type: "linear",
				stops: [
					{ output: 0, input: 0 },
					{ output: 1, input: 1 },
				],
			});
		}
	});

	it("should parse linear with mixed stops", () => {
		const result = Parser.parse("linear(0, 0.5 50%, 1)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.functions[0]).toEqual({
				type: "linear",
				stops: [{ output: 0 }, { output: 0.5, input: 0.5 }, { output: 1 }],
			});
		}
	});

	// Multiple functions
	it("should parse multiple timing functions", () => {
		const result = Parser.parse("ease, cubic-bezier(0, 0, 1, 1), steps(2)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.functions).toHaveLength(3);
			expect(result.value.functions[0]).toBe("ease");
			expect(result.value.functions[1]).toEqual({
				type: "cubic-bezier",
				x1: 0,
				y1: 0,
				x2: 1,
				y2: 1,
			});
			expect(result.value.functions[2]).toEqual({
				type: "steps",
				steps: 2,
				position: undefined,
			});
		}
	});

	// Error cases
	it("should reject invalid keyword", () => {
		const result = Parser.parse("invalid");
		expect(result.ok).toBe(false);
	});

	it("should reject empty value", () => {
		const result = Parser.parse("");
		expect(result.ok).toBe(false);
	});

	it("should reject unknown function", () => {
		const result = Parser.parse("unknown(0.5)");
		expect(result.ok).toBe(false);
	});
});
