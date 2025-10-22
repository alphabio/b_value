// b_path:: src/generate/animation/name.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "../../parse/animation/name";
import * as Generator from "./name";

describe("Animation Name Generator", () => {
	it("should generate none", () => {
		const ir = { kind: "animation-name" as const, names: [{ type: "none" as const }] };
		expect(Generator.generate(ir)).toBe("none");
	});

	it("should generate identifier", () => {
		const ir = { kind: "animation-name" as const, names: [{ type: "identifier" as const, value: "slideIn" }] };
		expect(Generator.generate(ir)).toBe("slideIn");
	});

	it("should generate multiple names", () => {
		const ir = {
			kind: "animation-name" as const,
			names: [
				{ type: "identifier" as const, value: "slideIn" },
				{ type: "identifier" as const, value: "fadeOut" },
				{ type: "none" as const },
			],
		};
		expect(Generator.generate(ir)).toBe("slideIn, fadeOut, none");
	});

	// Round-trip tests
	it("should round-trip none", () => {
		const css = "none";
		const parsed = Parser.parse(css);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);
			const reparsed = Parser.parse(generated);
			expect(reparsed).toEqual(parsed);
		}
	});

	it("should round-trip identifier", () => {
		const css = "slideIn";
		const parsed = Parser.parse(css);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);
			const reparsed = Parser.parse(generated);
			expect(reparsed).toEqual(parsed);
		}
	});

	it("should round-trip multiple names", () => {
		const css = "slideIn, fadeOut, none";
		const parsed = Parser.parse(css);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generator.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);
			const reparsed = Parser.parse(generated);
			expect(reparsed).toEqual(parsed);
		}
	});

	it("should round-trip hyphenated names", () => {
		const css = "slide-in-from-left";
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
