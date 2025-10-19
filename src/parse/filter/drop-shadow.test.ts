// b_path:: src/parse/filter/drop-shadow.test.ts
import { describe, expect, it } from "vitest";
import { toCss } from "@/generate/filter/drop-shadow";
import { parse } from "./drop-shadow";

describe("parse()", () => {
	// Basic drop-shadow with just offset values
	it("parses drop-shadow with px offsets", () => {
		const result = parse("drop-shadow(2px 2px)");
		expect(result).toEqual({
			ok: true,
			value: {
				kind: "drop-shadow",
				offsetX: { value: 2, unit: "px" },
				offsetY: { value: 2, unit: "px" },
			},
		});
	});

	it("parses drop-shadow with em offsets", () => {
		const result = parse("drop-shadow(1em 0.5em)");
		expect(result).toEqual({
			ok: true,
			value: {
				kind: "drop-shadow",
				offsetX: { value: 1, unit: "em" },
				offsetY: { value: 0.5, unit: "em" },
			},
		});
	});

	it("parses drop-shadow with rem offsets", () => {
		const result = parse("drop-shadow(2rem 1rem)");
		expect(result).toEqual({
			ok: true,
			value: {
				kind: "drop-shadow",
				offsetX: { value: 2, unit: "rem" },
				offsetY: { value: 1, unit: "rem" },
			},
		});
	});

	it("parses drop-shadow with mixed units", () => {
		const result = parse("drop-shadow(10px 1em)");
		expect(result).toEqual({
			ok: true,
			value: {
				kind: "drop-shadow",
				offsetX: { value: 10, unit: "px" },
				offsetY: { value: 1, unit: "em" },
			},
		});
	});

	// With blur radius
	it("parses drop-shadow with blur radius", () => {
		const result = parse("drop-shadow(2px 2px 4px)");
		expect(result).toEqual({
			ok: true,
			value: {
				kind: "drop-shadow",
				offsetX: { value: 2, unit: "px" },
				offsetY: { value: 2, unit: "px" },
				blurRadius: { value: 4, unit: "px" },
			},
		});
	});

	it("parses drop-shadow with blur radius and em", () => {
		const result = parse("drop-shadow(1em 0.5em 0.2em)");
		expect(result).toEqual({
			ok: true,
			value: {
				kind: "drop-shadow",
				offsetX: { value: 1, unit: "em" },
				offsetY: { value: 0.5, unit: "em" },
				blurRadius: { value: 0.2, unit: "em" },
			},
		});
	});

	// With color
	it("parses drop-shadow with named color", () => {
		const result = parse("drop-shadow(2px 2px black)");
		expect(result).toEqual({
			ok: true,
			value: {
				kind: "drop-shadow",
				offsetX: { value: 2, unit: "px" },
				offsetY: { value: 2, unit: "px" },
				color: { kind: "named", name: "black" },
			},
		});
	});

	it("parses drop-shadow with hex color", () => {
		const result = parse("drop-shadow(2px 2px #000000)");
		expect(result).toEqual({
			ok: true,
			value: {
				kind: "drop-shadow",
				offsetX: { value: 2, unit: "px" },
				offsetY: { value: 2, unit: "px" },
				color: { kind: "hex", value: "#000000" },
			},
		});
	});

	it("parses drop-shadow with rgb color", () => {
		const result = parse("drop-shadow(2px 2px rgb(0 0 0))");
		expect(result).toEqual({
			ok: true,
			value: {
				kind: "drop-shadow",
				offsetX: { value: 2, unit: "px" },
				offsetY: { value: 2, unit: "px" },
				color: { kind: "rgb", r: 0, g: 0, b: 0 },
			},
		});
	});

	it("parses drop-shadow with rgba color", () => {
		const result = parse("drop-shadow(2px 2px rgba(0 0 0 / 0.5))");
		expect(result).toEqual({
			ok: true,
			value: {
				kind: "drop-shadow",
				offsetX: { value: 2, unit: "px" },
				offsetY: { value: 2, unit: "px" },
				color: { kind: "rgb", r: 0, g: 0, b: 0, alpha: 0.5 },
			},
		});
	});

	// With both blur radius and color
	it("parses drop-shadow with blur radius and color", () => {
		const result = parse("drop-shadow(2px 2px 4px black)");
		expect(result).toEqual({
			ok: true,
			value: {
				kind: "drop-shadow",
				offsetX: { value: 2, unit: "px" },
				offsetY: { value: 2, unit: "px" },
				blurRadius: { value: 4, unit: "px" },
				color: { kind: "named", name: "black" },
			},
		});
	});

	it("parses drop-shadow with blur radius and hex color", () => {
		const result = parse("drop-shadow(1em 0.5em 0.2em #ff0000)");
		expect(result).toEqual({
			ok: true,
			value: {
				kind: "drop-shadow",
				offsetX: { value: 1, unit: "em" },
				offsetY: { value: 0.5, unit: "em" },
				blurRadius: { value: 0.2, unit: "em" },
				color: { kind: "hex", value: "#FF0000" },
			},
		});
	});

	// Edge cases
	it("parses drop-shadow with 0 values", () => {
		const result = parse("drop-shadow(0px 0px)");
		expect(result).toEqual({
			ok: true,
			value: {
				kind: "drop-shadow",
				offsetX: { value: 0, unit: "px" },
				offsetY: { value: 0, unit: "px" },
			},
		});
	});

	it("parses drop-shadow with currentcolor", () => {
		const result = parse("drop-shadow(2px 2px currentcolor)");
		expect(result).toEqual({
			ok: true,
			value: {
				kind: "drop-shadow",
				offsetX: { value: 2, unit: "px" },
				offsetY: { value: 2, unit: "px" },
				color: { kind: "special", keyword: "currentcolor" },
			},
		});
	});

	// Error cases
	it("rejects drop-shadow with no arguments", () => {
		const result = parse("drop-shadow()");
		expect(result).toEqual({
			ok: false,
			error: "drop-shadow() expects at least 2 arguments, got 0",
		});
	});

	it("rejects drop-shadow with only one argument", () => {
		const result = parse("drop-shadow(2px)");
		expect(result).toEqual({
			ok: false,
			error: "drop-shadow() expects at least 2 arguments, got 1",
		});
	});

	it("rejects drop-shadow with too many arguments", () => {
		const result = parse("drop-shadow(2px 2px 4px black extra)");
		expect(result).toEqual({
			ok: false,
			error: "drop-shadow() invalid argument: extra. Expected length or color.",
		});
	});

	it("rejects drop-shadow with invalid offset-x", () => {
		const result = parse("drop-shadow(invalid 2px)");
		expect(result).toEqual({
			ok: false,
			error: "drop-shadow() offset-x: Expected length dimension",
		});
	});

	it("rejects drop-shadow with invalid offset-y", () => {
		const result = parse("drop-shadow(2px invalid)");
		expect(result).toEqual({
			ok: false,
			error: "drop-shadow() offset-y: Expected length dimension",
		});
	});

	it("rejects drop-shadow with invalid blur radius", () => {
		const result = parse("drop-shadow(2px 2px invalid)");
		expect(result).toEqual({
			ok: false,
			error: "drop-shadow() invalid argument: invalid. Expected length or color.",
		});
	});

	it("rejects drop-shadow with invalid color", () => {
		const result = parse("drop-shadow(2px 2px 4px invalid-color)");
		expect(result).toEqual({
			ok: false,
			error: "drop-shadow() invalid argument: invalid-color. Expected length or color.",
		});
	});

	it("rejects drop-shadow with duplicate blur radius", () => {
		const result = parse("drop-shadow(2px 2px 4px 2px)");
		expect(result).toEqual({
			ok: false,
			error: "drop-shadow() can have at most one blur-radius",
		});
	});

	it("rejects drop-shadow with duplicate color", () => {
		const result = parse("drop-shadow(2px 2px 4px black red)");
		expect(result).toEqual({
			ok: false,
			error: "drop-shadow() can have at most one color",
		});
	});

	it("rejects drop-shadow with wrong function name", () => {
		const result = parse("blur(2px 2px)");
		expect(result).toEqual({
			ok: false,
			error: "No function found with name(s): drop-shadow",
		});
	});
});

describe("toCss()", () => {
	// Basic generation
	it("generates CSS for basic drop-shadow", () => {
		const css = toCss({
			kind: "drop-shadow",
			offsetX: { value: 2, unit: "px" },
			offsetY: { value: 2, unit: "px" },
		});
		expect(css).toBe("drop-shadow(2px 2px)");
	});

	it("generates CSS for drop-shadow with blur radius", () => {
		const css = toCss({
			kind: "drop-shadow",
			offsetX: { value: 2, unit: "px" },
			offsetY: { value: 2, unit: "px" },
			blurRadius: { value: 4, unit: "px" },
		});
		expect(css).toBe("drop-shadow(2px 2px 4px)");
	});

	it("generates CSS for drop-shadow with color", () => {
		const css = toCss({
			kind: "drop-shadow",
			offsetX: { value: 2, unit: "px" },
			offsetY: { value: 2, unit: "px" },
			color: { kind: "named", name: "black" },
		});
		expect(css).toBe("drop-shadow(2px 2px black)");
	});

	it("generates CSS for drop-shadow with blur radius and color", () => {
		const css = toCss({
			kind: "drop-shadow",
			offsetX: { value: 2, unit: "px" },
			offsetY: { value: 2, unit: "px" },
			blurRadius: { value: 4, unit: "px" },
			color: { kind: "named", name: "black" },
		});
		expect(css).toBe("drop-shadow(2px 2px 4px black)");
	});

	// Different units
	it("generates CSS with em units", () => {
		const css = toCss({
			kind: "drop-shadow",
			offsetX: { value: 1, unit: "em" },
			offsetY: { value: 0.5, unit: "em" },
			blurRadius: { value: 0.2, unit: "em" },
			color: { kind: "hex", value: "#FF0000" },
		});
		expect(css).toBe("drop-shadow(1em 0.5em 0.2em #FF0000)");
	});

	// Different color formats
	it("generates CSS with hex color", () => {
		const css = toCss({
			kind: "drop-shadow",
			offsetX: { value: 2, unit: "px" },
			offsetY: { value: 2, unit: "px" },
			color: { kind: "hex", value: "#000000" },
		});
		expect(css).toBe("drop-shadow(2px 2px #000000)");
	});

	it("generates CSS with rgb color", () => {
		const css = toCss({
			kind: "drop-shadow",
			offsetX: { value: 2, unit: "px" },
			offsetY: { value: 2, unit: "px" },
			color: { kind: "rgb", r: 0, g: 0, b: 0 },
		});
		expect(css).toBe("drop-shadow(2px 2px rgb(0 0 0))");
	});

	it("generates CSS with rgba color", () => {
		const css = toCss({
			kind: "drop-shadow",
			offsetX: { value: 2, unit: "px" },
			offsetY: { value: 2, unit: "px" },
			color: { kind: "rgb", r: 0, g: 0, b: 0, alpha: 0.5 },
		});
		expect(css).toBe("drop-shadow(2px 2px rgb(0 0 0 / 0.5))");
	});
});

describe("round-trip", () => {
	it("round-trips basic drop-shadow", () => {
		const input = "drop-shadow(2px 2px)";
		const result = parse(input);
		expect(result.ok).toBe(true);
		if (result.ok) {
			const css = toCss(result.value);
			expect(css).toBe(input);
			const result2 = parse(css);
			expect(result2).toEqual(result);
		}
	});

	it("round-trips drop-shadow with blur radius", () => {
		const input = "drop-shadow(2px 2px 4px)";
		const result = parse(input);
		expect(result.ok).toBe(true);
		if (result.ok) {
			const css = toCss(result.value);
			expect(css).toBe(input);
			const result2 = parse(css);
			expect(result2).toEqual(result);
		}
	});

	it("round-trips drop-shadow with color", () => {
		const input = "drop-shadow(2px 2px black)";
		const result = parse(input);
		expect(result.ok).toBe(true);
		if (result.ok) {
			const css = toCss(result.value);
			expect(css).toBe(input);
			const result2 = parse(css);
			expect(result2).toEqual(result);
		}
	});

	it("round-trips drop-shadow with blur radius and color", () => {
		const input = "drop-shadow(2px 2px 4px black)";
		const result = parse(input);
		expect(result.ok).toBe(true);
		if (result.ok) {
			const css = toCss(result.value);
			expect(css).toBe(input);
			const result2 = parse(css);
			expect(result2).toEqual(result);
		}
	});

	it("round-trips drop-shadow with hex color", () => {
		const input = "drop-shadow(1em 0.5em #FF0000)";
		const result = parse(input);
		expect(result.ok).toBe(true);
		if (result.ok) {
			const css = toCss(result.value);
			expect(css).toBe(input);
			const result2 = parse(css);
			expect(result2).toEqual(result);
		}
	});

	it("round-trips drop-shadow with rgba color", () => {
		const input = "drop-shadow(2px 2px 4px rgb(0 0 0 / 0.5))";
		const result = parse(input);
		expect(result.ok).toBe(true);
		if (result.ok) {
			const css = toCss(result.value);
			expect(css).toBe(input);
			const result2 = parse(css);
			expect(result2).toEqual(result);
		}
	});

	it("round-trips drop-shadow with currentcolor", () => {
		const input = "drop-shadow(2px 2px currentcolor)";
		const result = parse(input);
		expect(result.ok).toBe(true);
		if (result.ok) {
			const css = toCss(result.value);
			expect(css).toBe(input);
			const result2 = parse(css);
			expect(result2).toEqual(result);
		}
	});
});
