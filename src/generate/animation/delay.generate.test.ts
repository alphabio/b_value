// b_path:: src/generate/animation/delay.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "../../parse/animation/delay";
import * as Generator from "./delay";

describe("Animation Delay Generator", () => {
	it("should generate single delay in seconds", () => {
		const ir = {
			kind: "animation-delay" as const,
			delays: [{ value: 1, unit: "s" as const }],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "1s" });
	});

	it("should generate single delay in milliseconds", () => {
		const ir = {
			kind: "animation-delay" as const,
			delays: [{ value: 500, unit: "ms" as const }],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "500ms" });
	});

	it("should generate negative delay", () => {
		const ir = {
			kind: "animation-delay" as const,
			delays: [{ value: -2, unit: "s" as const }],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "-2s" });
	});

	it("should generate zero delay", () => {
		const ir = {
			kind: "animation-delay" as const,
			delays: [{ value: 0, unit: "s" as const }],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "0s" });
	});

	it("should generate decimal values", () => {
		const ir = {
			kind: "animation-delay" as const,
			delays: [{ value: 0.5, unit: "s" as const }],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "0.5s" });
	});

	it("should generate multiple delays", () => {
		const ir = {
			kind: "animation-delay" as const,
			delays: [
				{ value: 1, unit: "s" as const },
				{ value: 500, unit: "ms" as const },
				{ value: 2, unit: "s" as const },
			],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "1s, 500ms, 2s" });
	});

	it("should generate mixed positive and negative delays", () => {
		const ir = {
			kind: "animation-delay" as const,
			delays: [
				{ value: 1, unit: "s" as const },
				{ value: -500, unit: "ms" as const },
				{ value: 2, unit: "s" as const },
			],
		};

		const css = Generator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "1s, -500ms, 2s" });
	});

	// Round-trip tests
	it("should round-trip single delay", () => {
		const original = "1s";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(original);
		}
	});

	it("should round-trip multiple delays", () => {
		const original = "1s, 500ms, 2s";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(original);
		}
	});

	it("should round-trip negative delays", () => {
		const original = "-2s";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(original);
		}
	});

	it("should round-trip decimal values", () => {
		const original = "0.5s";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(original);
		}
	});
});
