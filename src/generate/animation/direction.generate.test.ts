// b_path:: src/generate/animation/direction.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "../../parse/animation/direction";
import * as Generator from "./direction";

describe("Animation Direction Generator", () => {
	it("should generate normal", () => {
		const ir = { kind: "animation-direction" as const, directions: ["normal" as const] };
		expect(Generator.toCss(ir)).toBe("normal");
	});

	it("should generate reverse", () => {
		const ir = { kind: "animation-direction" as const, directions: ["reverse" as const] };
		expect(Generator.toCss(ir)).toBe("reverse");
	});

	it("should generate alternate", () => {
		const ir = { kind: "animation-direction" as const, directions: ["alternate" as const] };
		expect(Generator.toCss(ir)).toBe("alternate");
	});

	it("should generate alternate-reverse", () => {
		const ir = { kind: "animation-direction" as const, directions: ["alternate-reverse" as const] };
		expect(Generator.toCss(ir)).toBe("alternate-reverse");
	});

	it("should generate multiple directions", () => {
		const ir = {
			kind: "animation-direction" as const,
			directions: ["normal" as const, "reverse" as const, "alternate" as const],
		};
		expect(Generator.toCss(ir)).toBe("normal, reverse, alternate");
	});

	// Round-trip tests
	it("should round-trip all keywords", () => {
		const keywords = ["normal", "reverse", "alternate", "alternate-reverse"];
		for (const keyword of keywords) {
			const parsed = Parser.parse(keyword);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generator.toCss(parsed.value);
				expect(generated).toBe(keyword);
				const reparsed = Parser.parse(generated);
				expect(reparsed).toEqual(parsed);
			}
		}
	});

	it("should round-trip multiple directions", () => {
		const css = "normal, reverse, alternate";
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
