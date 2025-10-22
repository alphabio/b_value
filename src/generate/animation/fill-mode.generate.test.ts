// b_path:: src/generate/animation/fill-mode.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "../../parse/animation/fill-mode";
import * as Generator from "./fill-mode";

describe("Animation Fill Mode Generator", () => {
	it("should generate none", () => {
		const ir = { kind: "animation-fill-mode" as const, modes: ["none" as const] };
		expect(Generator.generate(ir)).toBe("none");
	});

	it("should generate forwards", () => {
		const ir = { kind: "animation-fill-mode" as const, modes: ["forwards" as const] };
		expect(Generator.generate(ir)).toBe("forwards");
	});

	it("should generate backwards", () => {
		const ir = { kind: "animation-fill-mode" as const, modes: ["backwards" as const] };
		expect(Generator.generate(ir)).toBe("backwards");
	});

	it("should generate both", () => {
		const ir = { kind: "animation-fill-mode" as const, modes: ["both" as const] };
		expect(Generator.generate(ir)).toBe("both");
	});

	it("should generate multiple modes", () => {
		const ir = {
			kind: "animation-fill-mode" as const,
			modes: ["none" as const, "forwards" as const, "both" as const],
		};
		expect(Generator.generate(ir)).toBe("none, forwards, both");
	});

	// Round-trip tests
	it("should round-trip all keywords", () => {
		const keywords = ["none", "forwards", "backwards", "both"];
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

	it("should round-trip multiple modes", () => {
		const css = "none, forwards, both";
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
