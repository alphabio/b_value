import { describe, expect, it } from "vitest";
import { parseMixBlendMode } from "./mix-blend-mode.js";

describe("parseMixBlendMode", () => {
	it("parses normal", () => {
		const result = parseMixBlendMode("normal");
		expect(result).toEqual({
			ok: true,
			value: { kind: "mix-blend-mode", mode: "normal" },
		});
	});

	it("parses multiply", () => {
		const result = parseMixBlendMode("multiply");
		expect(result).toEqual({
			ok: true,
			value: { kind: "mix-blend-mode", mode: "multiply" },
		});
	});

	it("parses screen", () => {
		const result = parseMixBlendMode("screen");
		expect(result).toEqual({
			ok: true,
			value: { kind: "mix-blend-mode", mode: "screen" },
		});
	});

	it("parses overlay", () => {
		const result = parseMixBlendMode("overlay");
		expect(result).toEqual({
			ok: true,
			value: { kind: "mix-blend-mode", mode: "overlay" },
		});
	});

	it("parses darken", () => {
		const result = parseMixBlendMode("darken");
		expect(result).toEqual({
			ok: true,
			value: { kind: "mix-blend-mode", mode: "darken" },
		});
	});

	it("parses lighten", () => {
		const result = parseMixBlendMode("lighten");
		expect(result).toEqual({
			ok: true,
			value: { kind: "mix-blend-mode", mode: "lighten" },
		});
	});

	it("parses color-dodge", () => {
		const result = parseMixBlendMode("color-dodge");
		expect(result).toEqual({
			ok: true,
			value: { kind: "mix-blend-mode", mode: "color-dodge" },
		});
	});

	it("parses color-burn", () => {
		const result = parseMixBlendMode("color-burn");
		expect(result).toEqual({
			ok: true,
			value: { kind: "mix-blend-mode", mode: "color-burn" },
		});
	});

	it("parses hard-light", () => {
		const result = parseMixBlendMode("hard-light");
		expect(result).toEqual({
			ok: true,
			value: { kind: "mix-blend-mode", mode: "hard-light" },
		});
	});

	it("parses soft-light", () => {
		const result = parseMixBlendMode("soft-light");
		expect(result).toEqual({
			ok: true,
			value: { kind: "mix-blend-mode", mode: "soft-light" },
		});
	});

	it("parses difference", () => {
		const result = parseMixBlendMode("difference");
		expect(result).toEqual({
			ok: true,
			value: { kind: "mix-blend-mode", mode: "difference" },
		});
	});

	it("parses exclusion", () => {
		const result = parseMixBlendMode("exclusion");
		expect(result).toEqual({
			ok: true,
			value: { kind: "mix-blend-mode", mode: "exclusion" },
		});
	});

	it("parses hue", () => {
		const result = parseMixBlendMode("hue");
		expect(result).toEqual({
			ok: true,
			value: { kind: "mix-blend-mode", mode: "hue" },
		});
	});

	it("parses saturation", () => {
		const result = parseMixBlendMode("saturation");
		expect(result).toEqual({
			ok: true,
			value: { kind: "mix-blend-mode", mode: "saturation" },
		});
	});

	it("parses color", () => {
		const result = parseMixBlendMode("color");
		expect(result).toEqual({
			ok: true,
			value: { kind: "mix-blend-mode", mode: "color" },
		});
	});

	it("parses luminosity", () => {
		const result = parseMixBlendMode("luminosity");
		expect(result).toEqual({
			ok: true,
			value: { kind: "mix-blend-mode", mode: "luminosity" },
		});
	});

	it("handles whitespace", () => {
		const result = parseMixBlendMode("  screen  ");
		expect(result).toEqual({
			ok: true,
			value: { kind: "mix-blend-mode", mode: "screen" },
		});
	});

	it("rejects invalid value", () => {
		const result = parseMixBlendMode("invalid");
		expect(result.ok).toBe(false);
		expect(result.error).toContain("Invalid mix-blend-mode");
	});
});
