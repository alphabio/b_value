import { describe, expect, it } from "vitest";
import type { MixBlendModeIR } from "../../parse/visual/mix-blend-mode.js";
import { generateMixBlendMode } from "./mix-blend-mode.generate.js";

describe("generateMixBlendMode", () => {
	it("generates normal", () => {
		const ir: MixBlendModeIR = { kind: "mix-blend-mode", mode: "normal" };
		expect(generateMixBlendMode(ir)).toBe("normal");
	});

	it("generates multiply", () => {
		const ir: MixBlendModeIR = { kind: "mix-blend-mode", mode: "multiply" };
		expect(generateMixBlendMode(ir)).toBe("multiply");
	});

	it("generates screen", () => {
		const ir: MixBlendModeIR = { kind: "mix-blend-mode", mode: "screen" };
		expect(generateMixBlendMode(ir)).toBe("screen");
	});

	it("generates overlay", () => {
		const ir: MixBlendModeIR = { kind: "mix-blend-mode", mode: "overlay" };
		expect(generateMixBlendMode(ir)).toBe("overlay");
	});

	it("generates darken", () => {
		const ir: MixBlendModeIR = { kind: "mix-blend-mode", mode: "darken" };
		expect(generateMixBlendMode(ir)).toBe("darken");
	});

	it("generates lighten", () => {
		const ir: MixBlendModeIR = { kind: "mix-blend-mode", mode: "lighten" };
		expect(generateMixBlendMode(ir)).toBe("lighten");
	});

	it("generates color-dodge", () => {
		const ir: MixBlendModeIR = { kind: "mix-blend-mode", mode: "color-dodge" };
		expect(generateMixBlendMode(ir)).toBe("color-dodge");
	});

	it("generates color-burn", () => {
		const ir: MixBlendModeIR = { kind: "mix-blend-mode", mode: "color-burn" };
		expect(generateMixBlendMode(ir)).toBe("color-burn");
	});

	it("generates hard-light", () => {
		const ir: MixBlendModeIR = { kind: "mix-blend-mode", mode: "hard-light" };
		expect(generateMixBlendMode(ir)).toBe("hard-light");
	});

	it("generates soft-light", () => {
		const ir: MixBlendModeIR = { kind: "mix-blend-mode", mode: "soft-light" };
		expect(generateMixBlendMode(ir)).toBe("soft-light");
	});

	it("generates difference", () => {
		const ir: MixBlendModeIR = { kind: "mix-blend-mode", mode: "difference" };
		expect(generateMixBlendMode(ir)).toBe("difference");
	});

	it("generates exclusion", () => {
		const ir: MixBlendModeIR = { kind: "mix-blend-mode", mode: "exclusion" };
		expect(generateMixBlendMode(ir)).toBe("exclusion");
	});

	it("generates hue", () => {
		const ir: MixBlendModeIR = { kind: "mix-blend-mode", mode: "hue" };
		expect(generateMixBlendMode(ir)).toBe("hue");
	});

	it("generates saturation", () => {
		const ir: MixBlendModeIR = { kind: "mix-blend-mode", mode: "saturation" };
		expect(generateMixBlendMode(ir)).toBe("saturation");
	});

	it("generates color", () => {
		const ir: MixBlendModeIR = { kind: "mix-blend-mode", mode: "color" };
		expect(generateMixBlendMode(ir)).toBe("color");
	});

	it("generates luminosity", () => {
		const ir: MixBlendModeIR = { kind: "mix-blend-mode", mode: "luminosity" };
		expect(generateMixBlendMode(ir)).toBe("luminosity");
	});
});
