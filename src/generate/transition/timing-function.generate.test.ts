// b_path:: src/generate/transition/timing-function.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "../../parse/transition/timing-function";
import * as Generator from "./timing-function";

describe("Transition Timing Function Generator", () => {
	// Keywords
	it("should generate ease keyword", () => {
		const ir = {
			kind: "transition-timing-function" as const,
			functions: ["ease" as const],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "ease" });
	});

	it("should generate ease-in keyword", () => {
		const ir = {
			kind: "transition-timing-function" as const,
			functions: ["ease-in" as const],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "ease-in" });
	});

	it("should generate linear keyword", () => {
		const ir = {
			kind: "transition-timing-function" as const,
			functions: ["linear" as const],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "linear" });
	});

	// cubic-bezier
	it("should generate cubic-bezier", () => {
		const ir = {
			kind: "transition-timing-function" as const,
			functions: [
				{
					type: "cubic-bezier" as const,
					x1: 0.1,
					y1: 0.7,
					x2: 1.0,
					y2: 0.1,
				},
			],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "cubic-bezier(0.1, 0.7, 1, 0.1)" });
	});

	it("should generate cubic-bezier with negative values", () => {
		const ir = {
			kind: "transition-timing-function" as const,
			functions: [
				{
					type: "cubic-bezier" as const,
					x1: 0.5,
					y1: -0.5,
					x2: 0.5,
					y2: 1.5,
				},
			],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "cubic-bezier(0.5, -0.5, 0.5, 1.5)" });
	});

	// steps
	it("should generate steps without position", () => {
		const ir = {
			kind: "transition-timing-function" as const,
			functions: [
				{
					type: "steps" as const,
					steps: 4,
				},
			],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "steps(4)" });
	});

	it("should generate steps with start position", () => {
		const ir = {
			kind: "transition-timing-function" as const,
			functions: [
				{
					type: "steps" as const,
					steps: 4,
					position: "start" as const,
				},
			],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "steps(4, start)" });
	});

	it("should generate steps with end position", () => {
		const ir = {
			kind: "transition-timing-function" as const,
			functions: [
				{
					type: "steps" as const,
					steps: 4,
					position: "end" as const,
				},
			],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "steps(4, end)" });
	});

	// linear()
	it("should generate linear with single stop", () => {
		const ir = {
			kind: "transition-timing-function" as const,
			functions: [
				{
					type: "linear" as const,
					stops: [{ output: 0 }],
				},
			],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "linear(0)" });
	});

	it("should generate linear with multiple stops", () => {
		const ir = {
			kind: "transition-timing-function" as const,
			functions: [
				{
					type: "linear" as const,
					stops: [{ output: 0 }, { output: 0.5 }, { output: 1 }],
				},
			],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "linear(0, 0.5, 1)" });
	});

	it("should generate linear with input percentages", () => {
		const ir = {
			kind: "transition-timing-function" as const,
			functions: [
				{
					type: "linear" as const,
					stops: [
						{ output: 0, input: 0 },
						{ output: 0.5, input: 0.5 },
						{ output: 1, input: 1 },
					],
				},
			],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "linear(0 0%, 0.5 50%, 1 100%)" });
	});

	// Multiple functions
	it("should generate multiple timing functions", () => {
		const ir = {
			kind: "transition-timing-function" as const,
			functions: ["ease" as const, "ease-in" as const, "linear" as const],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "ease, ease-in, linear" });
	});

	it("should generate mixed function types", () => {
		const ir = {
			kind: "transition-timing-function" as const,
			functions: [
				"ease-in" as const,
				{
					type: "cubic-bezier" as const,
					x1: 0.1,
					y1: 0.7,
					x2: 1.0,
					y2: 0.1,
				},
				{
					type: "steps" as const,
					steps: 4,
				},
			],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "ease-in, cubic-bezier(0.1, 0.7, 1, 0.1), steps(4)" });
	});

	// Round-trip tests
	it("should round-trip ease keyword", () => {
		const original = "ease";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(original);
		}
	});

	it("should round-trip cubic-bezier", () => {
		const original = "cubic-bezier(0.1, 0.7, 1, 0.1)";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(original);
		}
	});

	it("should round-trip steps", () => {
		const original = "steps(4, start)";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(original);
		}
	});

	it("should round-trip linear", () => {
		const original = "linear(0, 0.5, 1)";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(original);
		}
	});

	it("should round-trip multiple functions", () => {
		const original = "ease, ease-in, linear";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(original);
		}
	});
});
