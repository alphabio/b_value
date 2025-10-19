// b_path:: src/generate/animation/duration.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "../../parse/animation/duration";
import * as Generator from "./duration";

describe("Animation Duration Generator", () => {
	it("should generate single time value in seconds", () => {
		const ir = {
			kind: "animation-duration" as const,
			durations: [{ type: "time" as const, value: 1, unit: "s" as const }],
		};

		expect(Generator.toCss(ir)).toBe("1s");
	});

	it("should generate single time value in milliseconds", () => {
		const ir = {
			kind: "animation-duration" as const,
			durations: [{ type: "time" as const, value: 500, unit: "ms" as const }],
		};

		expect(Generator.toCss(ir)).toBe("500ms");
	});

	it("should generate auto keyword", () => {
		const ir = {
			kind: "animation-duration" as const,
			durations: [{ type: "auto" as const }],
		};

		expect(Generator.toCss(ir)).toBe("auto");
	});

	it("should generate zero duration", () => {
		const ir = {
			kind: "animation-duration" as const,
			durations: [{ type: "time" as const, value: 0, unit: "s" as const }],
		};

		expect(Generator.toCss(ir)).toBe("0s");
	});

	it("should generate decimal values", () => {
		const ir = {
			kind: "animation-duration" as const,
			durations: [{ type: "time" as const, value: 0.5, unit: "s" as const }],
		};

		expect(Generator.toCss(ir)).toBe("0.5s");
	});

	it("should generate multiple durations", () => {
		const ir = {
			kind: "animation-duration" as const,
			durations: [
				{ type: "time" as const, value: 1, unit: "s" as const },
				{ type: "auto" as const },
				{ type: "time" as const, value: 500, unit: "ms" as const },
			],
		};

		expect(Generator.toCss(ir)).toBe("1s, auto, 500ms");
	});

	it("should generate large values", () => {
		const ir = {
			kind: "animation-duration" as const,
			durations: [{ type: "time" as const, value: 3600, unit: "s" as const }],
		};

		expect(Generator.toCss(ir)).toBe("3600s");
	});

	// Round-trip tests
	it("should round-trip single duration", () => {
		const css = "1s";
		const parsed = Parser.parse(css);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.toCss(parsed.value);
			expect(generated).toBe(css);

			const reparsed = Parser.parse(generated);
			expect(reparsed).toEqual(parsed);
		}
	});

	it("should round-trip auto keyword", () => {
		const css = "auto";
		const parsed = Parser.parse(css);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.toCss(parsed.value);
			expect(generated).toBe(css);

			const reparsed = Parser.parse(generated);
			expect(reparsed).toEqual(parsed);
		}
	});

	it("should round-trip multiple durations", () => {
		const css = "1s, auto, 500ms";
		const parsed = Parser.parse(css);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.toCss(parsed.value);
			expect(generated).toBe(css);

			const reparsed = Parser.parse(generated);
			expect(reparsed).toEqual(parsed);
		}
	});

	it("should round-trip decimal values", () => {
		const css = "0.5s";
		const parsed = Parser.parse(css);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.toCss(parsed.value);
			expect(generated).toBe(css);

			const reparsed = Parser.parse(generated);
			expect(reparsed).toEqual(parsed);
		}
	});
});
