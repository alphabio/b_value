// b_path:: src/generate/animation/timing-function.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "../../parse/animation/timing-function";
import * as Generator from "./timing-function";

describe("Animation Timing Function Generator", () => {
	// Keywords
	it("should generate ease keyword", () => {
		const ir = { kind: "animation-timing-function" as const, functions: ["ease" as const] };
		expect(Generator.generate(ir)).toBe("ease");
	});

	it("should generate ease-in keyword", () => {
		const ir = { kind: "animation-timing-function" as const, functions: ["ease-in" as const] };
		expect(Generator.generate(ir)).toBe("ease-in");
	});

	it("should generate linear keyword", () => {
		const ir = { kind: "animation-timing-function" as const, functions: ["linear" as const] };
		expect(Generator.generate(ir)).toBe("linear");
	});

	it("should generate step-start keyword", () => {
		const ir = { kind: "animation-timing-function" as const, functions: ["step-start" as const] };
		expect(Generator.generate(ir)).toBe("step-start");
	});

	// cubic-bezier()
	it("should generate cubic-bezier", () => {
		const ir = {
			kind: "animation-timing-function" as const,
			functions: [{ type: "cubic-bezier" as const, x1: 0.1, y1: 0.7, x2: 1.0, y2: 0.1 }],
		};
		expect(Generator.generate(ir)).toBe("cubic-bezier(0.1, 0.7, 1, 0.1)");
	});

	it("should generate cubic-bezier with integers", () => {
		const ir = {
			kind: "animation-timing-function" as const,
			functions: [{ type: "cubic-bezier" as const, x1: 0, y1: 0, x2: 1, y2: 1 }],
		};
		expect(Generator.generate(ir)).toBe("cubic-bezier(0, 0, 1, 1)");
	});

	// steps()
	it("should generate steps with count only", () => {
		const ir = {
			kind: "animation-timing-function" as const,
			functions: [{ type: "steps" as const, steps: 4, position: undefined }],
		};
		expect(Generator.generate(ir)).toBe("steps(4)");
	});

	it("should generate steps with position", () => {
		const ir = {
			kind: "animation-timing-function" as const,
			functions: [{ type: "steps" as const, steps: 4, position: "jump-start" as const }],
		};
		expect(Generator.generate(ir)).toBe("steps(4, jump-start)");
	});

	// linear()
	it("should generate linear with single stop", () => {
		const ir = {
			kind: "animation-timing-function" as const,
			functions: [{ type: "linear" as const, stops: [{ output: 0 }] }],
		};
		expect(Generator.generate(ir)).toBe("linear(0)");
	});

	it("should generate linear with multiple stops", () => {
		const ir = {
			kind: "animation-timing-function" as const,
			functions: [{ type: "linear" as const, stops: [{ output: 0 }, { output: 0.5 }, { output: 1 }] }],
		};
		expect(Generator.generate(ir)).toBe("linear(0, 0.5, 1)");
	});

	it("should generate linear with input percentages", () => {
		const ir = {
			kind: "animation-timing-function" as const,
			functions: [
				{
					type: "linear" as const,
					stops: [
						{ output: 0, input: 0 },
						{ output: 1, input: 1 },
					],
				},
			],
		};
		expect(Generator.generate(ir)).toBe("linear(0 0%, 1 100%)");
	});

	// Multiple functions
	it("should generate multiple timing functions", () => {
		const ir = {
			kind: "animation-timing-function" as const,
			functions: [
				"ease" as const,
				{ type: "cubic-bezier" as const, x1: 0, y1: 0, x2: 1, y2: 1 },
				{ type: "steps" as const, steps: 2, position: undefined },
			],
		};
		expect(Generator.generate(ir)).toBe("ease, cubic-bezier(0, 0, 1, 1), steps(2)");
	});

	// Round-trip tests
	it("should round-trip keywords", () => {
		const keywords = ["ease", "ease-in", "ease-out", "ease-in-out", "linear", "step-start", "step-end"];
		for (const keyword of keywords) {
			const parsed = Parser.parse(keyword);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generator.generate(parsed.value);
				expect(generated.ok && generated.value).toBe(keyword);
				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = Parser.parse(generated.value);
				expect(reparsed).toEqual(parsed);
			}
		}
	});

	it("should round-trip cubic-bezier", () => {
		const css = "cubic-bezier(0.1, 0.7, 1, 0.1)";
		const parsed = Parser.parse(css);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);
			expect(generated.ok).toBe(true);
			if (!generated.ok) return;
			const reparsed = Parser.parse(generated.value);
			expect(reparsed).toEqual(parsed);
		}
	});

	it("should round-trip steps with count only", () => {
		const css = "steps(4)";
		const parsed = Parser.parse(css);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);
			expect(generated.ok).toBe(true);
			if (!generated.ok) return;
			const reparsed = Parser.parse(generated.value);
			expect(reparsed).toEqual(parsed);
		}
	});

	it("should round-trip steps with position", () => {
		const css = "steps(4, jump-start)";
		const parsed = Parser.parse(css);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);
			expect(generated.ok).toBe(true);
			if (!generated.ok) return;
			const reparsed = Parser.parse(generated.value);
			expect(reparsed).toEqual(parsed);
		}
	});

	it("should round-trip linear", () => {
		const css = "linear(0, 0.5, 1)";
		const parsed = Parser.parse(css);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);
			expect(generated.ok).toBe(true);
			if (!generated.ok) return;
			const reparsed = Parser.parse(generated.value);
			expect(reparsed).toEqual(parsed);
		}
	});

	it("should round-trip linear with percentages", () => {
		const css = "linear(0 0%, 1 100%)";
		const parsed = Parser.parse(css);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);
			expect(generated.ok).toBe(true);
			if (!generated.ok) return;
			const reparsed = Parser.parse(generated.value);
			expect(reparsed).toEqual(parsed);
		}
	});

	it("should round-trip multiple functions", () => {
		const css = "ease, cubic-bezier(0, 0, 1, 1), steps(2)";
		const parsed = Parser.parse(css);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);
			expect(generated.ok).toBe(true);
			if (!generated.ok) return;
			const reparsed = Parser.parse(generated.value);
			expect(reparsed).toEqual(parsed);
		}
	});
});
