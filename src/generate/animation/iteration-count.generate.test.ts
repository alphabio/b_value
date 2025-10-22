// b_path:: src/generate/animation/iteration-count.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "../../parse/animation/iteration-count";
import * as Generator from "./iteration-count";

describe("Animation Iteration Count Generator", () => {
	it("should generate single number", () => {
		const ir = {
			kind: "animation-iteration-count" as const,
			counts: [{ type: "number" as const, value: 3 }],
		};

		expect(Generator.generate(ir)).toBe("3");
	});

	it("should generate infinite keyword", () => {
		const ir = {
			kind: "animation-iteration-count" as const,
			counts: [{ type: "infinite" as const }],
		};

		expect(Generator.generate(ir)).toBe("infinite");
	});

	it("should generate zero count", () => {
		const ir = {
			kind: "animation-iteration-count" as const,
			counts: [{ type: "number" as const, value: 0 }],
		};

		expect(Generator.generate(ir)).toBe("0");
	});

	it("should generate decimal values", () => {
		const ir = {
			kind: "animation-iteration-count" as const,
			counts: [{ type: "number" as const, value: 2.5 }],
		};

		expect(Generator.generate(ir)).toBe("2.5");
	});

	it("should generate multiple counts", () => {
		const ir = {
			kind: "animation-iteration-count" as const,
			counts: [
				{ type: "number" as const, value: 1 },
				{ type: "infinite" as const },
				{ type: "number" as const, value: 2.5 },
			],
		};

		expect(Generator.generate(ir)).toBe("1, infinite, 2.5");
	});

	// Round-trip tests
	it("should round-trip single number", () => {
		const css = "3";
		const parsed = Parser.parse(css);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);

			const reparsed = Parser.parse(generated);
			expect(reparsed).toEqual(parsed);
		}
	});

	it("should round-trip infinite keyword", () => {
		const css = "infinite";
		const parsed = Parser.parse(css);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);

			const reparsed = Parser.parse(generated);
			expect(reparsed).toEqual(parsed);
		}
	});

	it("should round-trip multiple counts", () => {
		const css = "1, infinite, 2.5";
		const parsed = Parser.parse(css);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);

			const reparsed = Parser.parse(generated);
			expect(reparsed).toEqual(parsed);
		}
	});

	it("should round-trip decimal value", () => {
		const css = "0.5";
		const parsed = Parser.parse(css);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);

			const reparsed = Parser.parse(generated);
			expect(reparsed).toEqual(parsed);
		}
	});
});
