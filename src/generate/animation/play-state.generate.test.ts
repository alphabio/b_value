// b_path:: src/generate/animation/play-state.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "../../parse/animation/play-state";
import * as Generator from "./play-state";

describe("Animation Play State Generator", () => {
	it("should generate running", () => {
		const ir = { kind: "animation-play-state" as const, states: ["running" as const] };
		expect(Generator.toCss(ir)).toBe("running");
	});

	it("should generate paused", () => {
		const ir = { kind: "animation-play-state" as const, states: ["paused" as const] };
		expect(Generator.toCss(ir)).toBe("paused");
	});

	it("should generate multiple states", () => {
		const ir = {
			kind: "animation-play-state" as const,
			states: ["running" as const, "paused" as const],
		};
		expect(Generator.toCss(ir)).toBe("running, paused");
	});

	// Round-trip tests
	it("should round-trip all keywords", () => {
		const keywords = ["running", "paused"];
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

	it("should round-trip multiple states", () => {
		const css = "running, paused";
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
