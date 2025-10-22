import { describe, expect, it } from "vitest";
import { parseBackgroundBlendMode } from "./background-blend-mode.js";

describe("parseBackgroundBlendMode", () => {
	it("parses normal", () => {
		const result = parseBackgroundBlendMode("normal");
		expect(result).toEqual({
			ok: true,
			value: { kind: "background-blend-mode", mode: "normal" },
		});
	});

	it("parses multiply", () => {
		const result = parseBackgroundBlendMode("multiply");
		expect(result).toEqual({
			ok: true,
			value: { kind: "background-blend-mode", mode: "multiply" },
		});
	});

	it("parses screen", () => {
		const result = parseBackgroundBlendMode("screen");
		expect(result).toEqual({
			ok: true,
			value: { kind: "background-blend-mode", mode: "screen" },
		});
	});

	it("parses overlay", () => {
		const result = parseBackgroundBlendMode("overlay");
		expect(result).toEqual({
			ok: true,
			value: { kind: "background-blend-mode", mode: "overlay" },
		});
	});

	it("parses darken", () => {
		const result = parseBackgroundBlendMode("darken");
		expect(result).toEqual({
			ok: true,
			value: { kind: "background-blend-mode", mode: "darken" },
		});
	});

	it("parses lighten", () => {
		const result = parseBackgroundBlendMode("lighten");
		expect(result).toEqual({
			ok: true,
			value: { kind: "background-blend-mode", mode: "lighten" },
		});
	});

	it("parses color-dodge", () => {
		const result = parseBackgroundBlendMode("color-dodge");
		expect(result).toEqual({
			ok: true,
			value: { kind: "background-blend-mode", mode: "color-dodge" },
		});
	});

	it("parses color-burn", () => {
		const result = parseBackgroundBlendMode("color-burn");
		expect(result).toEqual({
			ok: true,
			value: { kind: "background-blend-mode", mode: "color-burn" },
		});
	});

	it("parses hard-light", () => {
		const result = parseBackgroundBlendMode("hard-light");
		expect(result).toEqual({
			ok: true,
			value: { kind: "background-blend-mode", mode: "hard-light" },
		});
	});

	it("parses soft-light", () => {
		const result = parseBackgroundBlendMode("soft-light");
		expect(result).toEqual({
			ok: true,
			value: { kind: "background-blend-mode", mode: "soft-light" },
		});
	});

	it("parses difference", () => {
		const result = parseBackgroundBlendMode("difference");
		expect(result).toEqual({
			ok: true,
			value: { kind: "background-blend-mode", mode: "difference" },
		});
	});

	it("parses exclusion", () => {
		const result = parseBackgroundBlendMode("exclusion");
		expect(result).toEqual({
			ok: true,
			value: { kind: "background-blend-mode", mode: "exclusion" },
		});
	});

	it("parses hue", () => {
		const result = parseBackgroundBlendMode("hue");
		expect(result).toEqual({
			ok: true,
			value: { kind: "background-blend-mode", mode: "hue" },
		});
	});

	it("parses saturation", () => {
		const result = parseBackgroundBlendMode("saturation");
		expect(result).toEqual({
			ok: true,
			value: { kind: "background-blend-mode", mode: "saturation" },
		});
	});

	it("parses color", () => {
		const result = parseBackgroundBlendMode("color");
		expect(result).toEqual({
			ok: true,
			value: { kind: "background-blend-mode", mode: "color" },
		});
	});

	it("parses luminosity", () => {
		const result = parseBackgroundBlendMode("luminosity");
		expect(result).toEqual({
			ok: true,
			value: { kind: "background-blend-mode", mode: "luminosity" },
		});
	});

	it("handles whitespace", () => {
		const result = parseBackgroundBlendMode("  multiply  ");
		expect(result).toEqual({
			ok: true,
			value: { kind: "background-blend-mode", mode: "multiply" },
		});
	});

	it("rejects invalid value", () => {
		const result = parseBackgroundBlendMode("invalid");
		expect(result.ok).toBe(false);
		expect(result.error).toContain("Invalid background-blend-mode");
	});
});
