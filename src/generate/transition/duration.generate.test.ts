// b_path:: src/generate/transition/duration.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "../../parse/transition/duration";
import * as Generator from "./duration";

describe("Transition Duration Generator", () => {
	it("should generate single duration in seconds", () => {
		const ir = {
			kind: "transition-duration" as const,
			durations: [{ value: 1, unit: "s" as const }],
		};

		const css = Generator.toCss(ir);
		expect(css).toBe("1s");
	});

	it("should generate single duration in milliseconds", () => {
		const ir = {
			kind: "transition-duration" as const,
			durations: [{ value: 500, unit: "ms" as const }],
		};

		const css = Generator.toCss(ir);
		expect(css).toBe("500ms");
	});

	it("should generate zero duration", () => {
		const ir = {
			kind: "transition-duration" as const,
			durations: [{ value: 0, unit: "s" as const }],
		};

		const css = Generator.toCss(ir);
		expect(css).toBe("0s");
	});

	it("should generate decimal values", () => {
		const ir = {
			kind: "transition-duration" as const,
			durations: [{ value: 0.5, unit: "s" as const }],
		};

		const css = Generator.toCss(ir);
		expect(css).toBe("0.5s");
	});

	it("should generate multiple durations", () => {
		const ir = {
			kind: "transition-duration" as const,
			durations: [
				{ value: 1, unit: "s" as const },
				{ value: 500, unit: "ms" as const },
				{ value: 2, unit: "s" as const },
			],
		};

		const css = Generator.toCss(ir);
		expect(css).toBe("1s, 500ms, 2s");
	});

	// Round-trip tests
	it("should round-trip single duration", () => {
		const original = "1s";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});

	it("should round-trip multiple durations", () => {
		const original = "1s, 500ms, 2s";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});

	it("should round-trip decimal values", () => {
		const original = "0.5s";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});

	it("should round-trip zero duration", () => {
		const original = "0s";
		const parsed = Parser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});
});
