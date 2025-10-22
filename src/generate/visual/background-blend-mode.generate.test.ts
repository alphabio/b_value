import { describe, expect, it } from "vitest";
import type { BackgroundBlendModeIR } from "../../parse/visual/background-blend-mode.js";
import { generateBackgroundBlendMode } from "./background-blend-mode.generate.js";

describe("generateBackgroundBlendMode", () => {
	it("generates normal", () => {
		const ir: BackgroundBlendModeIR = {
			kind: "background-blend-mode",
			mode: "normal",
		};
		expect(generateBackgroundBlendMode(ir)).toBe("normal");
	});

	it("generates multiply", () => {
		const ir: BackgroundBlendModeIR = {
			kind: "background-blend-mode",
			mode: "multiply",
		};
		expect(generateBackgroundBlendMode(ir)).toBe("multiply");
	});

	it("generates screen", () => {
		const ir: BackgroundBlendModeIR = {
			kind: "background-blend-mode",
			mode: "screen",
		};
		expect(generateBackgroundBlendMode(ir)).toBe("screen");
	});

	it("generates overlay", () => {
		const ir: BackgroundBlendModeIR = {
			kind: "background-blend-mode",
			mode: "overlay",
		};
		expect(generateBackgroundBlendMode(ir)).toBe("overlay");
	});

	it("generates darken", () => {
		const ir: BackgroundBlendModeIR = {
			kind: "background-blend-mode",
			mode: "darken",
		};
		expect(generateBackgroundBlendMode(ir)).toBe("darken");
	});

	it("generates lighten", () => {
		const ir: BackgroundBlendModeIR = {
			kind: "background-blend-mode",
			mode: "lighten",
		};
		expect(generateBackgroundBlendMode(ir)).toBe("lighten");
	});

	it("generates color-dodge", () => {
		const ir: BackgroundBlendModeIR = {
			kind: "background-blend-mode",
			mode: "color-dodge",
		};
		expect(generateBackgroundBlendMode(ir)).toBe("color-dodge");
	});

	it("generates color-burn", () => {
		const ir: BackgroundBlendModeIR = {
			kind: "background-blend-mode",
			mode: "color-burn",
		};
		expect(generateBackgroundBlendMode(ir)).toBe("color-burn");
	});

	it("generates hard-light", () => {
		const ir: BackgroundBlendModeIR = {
			kind: "background-blend-mode",
			mode: "hard-light",
		};
		expect(generateBackgroundBlendMode(ir)).toBe("hard-light");
	});

	it("generates soft-light", () => {
		const ir: BackgroundBlendModeIR = {
			kind: "background-blend-mode",
			mode: "soft-light",
		};
		expect(generateBackgroundBlendMode(ir)).toBe("soft-light");
	});

	it("generates difference", () => {
		const ir: BackgroundBlendModeIR = {
			kind: "background-blend-mode",
			mode: "difference",
		};
		expect(generateBackgroundBlendMode(ir)).toBe("difference");
	});

	it("generates exclusion", () => {
		const ir: BackgroundBlendModeIR = {
			kind: "background-blend-mode",
			mode: "exclusion",
		};
		expect(generateBackgroundBlendMode(ir)).toBe("exclusion");
	});

	it("generates hue", () => {
		const ir: BackgroundBlendModeIR = {
			kind: "background-blend-mode",
			mode: "hue",
		};
		expect(generateBackgroundBlendMode(ir)).toBe("hue");
	});

	it("generates saturation", () => {
		const ir: BackgroundBlendModeIR = {
			kind: "background-blend-mode",
			mode: "saturation",
		};
		expect(generateBackgroundBlendMode(ir)).toBe("saturation");
	});

	it("generates color", () => {
		const ir: BackgroundBlendModeIR = {
			kind: "background-blend-mode",
			mode: "color",
		};
		expect(generateBackgroundBlendMode(ir)).toBe("color");
	});

	it("generates luminosity", () => {
		const ir: BackgroundBlendModeIR = {
			kind: "background-blend-mode",
			mode: "luminosity",
		};
		expect(generateBackgroundBlendMode(ir)).toBe("luminosity");
	});
});
