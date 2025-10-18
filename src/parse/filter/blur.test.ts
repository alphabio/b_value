// b_path:: src/parse/filter/blur.test.ts
import { describe, expect, it } from "vitest";
import { toCss } from "@/generate/filter/blur";
import { parse } from "./blur";

describe("parse()", () => {
	it("parses blur with px", () => {
		const result = parse("blur(5px)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "blur", radius: { value: 5, unit: "px" } },
		});
	});

	it("parses blur with em", () => {
		const result = parse("blur(1em)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "blur", radius: { value: 1, unit: "em" } },
		});
	});

	it("parses blur with rem", () => {
		const result = parse("blur(2rem)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "blur", radius: { value: 2, unit: "rem" } },
		});
	});

	it("parses blur with 0px", () => {
		const result = parse("blur(0px)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "blur", radius: { value: 0, unit: "px" } },
		});
	});

	it("parses blur with decimal", () => {
		const result = parse("blur(2.5px)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "blur", radius: { value: 2.5, unit: "px" } },
		});
	});

	it("parses blur with vw", () => {
		const result = parse("blur(1vw)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "blur", radius: { value: 1, unit: "vw" } },
		});
	});

	it("rejects blur with negative value", () => {
		const result = parse("blur(-5px)");
		expect(result).toEqual({
			ok: false,
			error: "blur() radius must be non-negative, got -5px",
		});
	});

	it("rejects blur without unit", () => {
		const result = parse("blur(5)");
		expect(result).toEqual({
			ok: false,
			error: "Expected length dimension",
		});
	});

	it("rejects blur with wrong function name", () => {
		const result = parse("brightness(5px)");
		expect(result).toEqual({
			ok: false,
			error: "No function found with name(s): blur",
		});
	});

	it("rejects blur with no arguments", () => {
		const result = parse("blur()");
		expect(result).toEqual({
			ok: false,
			error: "blur() expects 1 argument, got 0",
		});
	});

	it("rejects blur with too many arguments", () => {
		const result = parse("blur(5px, 10px)");
		expect(result).toEqual({
			ok: false,
			error: "blur() expects 1 argument, got 2",
		});
	});

	it("rejects blur with percentage", () => {
		const result = parse("blur(50%)");
		expect(result).toEqual({
			ok: false,
			error: "Expected length dimension",
		});
	});
});

describe("toCss()", () => {
	it("generates CSS for blur with px", () => {
		const css = toCss({ kind: "blur", radius: { value: 5, unit: "px" } });
		expect(css).toBe("blur(5px)");
	});

	it("generates CSS for blur with em", () => {
		const css = toCss({ kind: "blur", radius: { value: 1, unit: "em" } });
		expect(css).toBe("blur(1em)");
	});

	it("generates CSS for blur with 0px", () => {
		const css = toCss({ kind: "blur", radius: { value: 0, unit: "px" } });
		expect(css).toBe("blur(0px)");
	});
});

describe("round-trip", () => {
	it("round-trips blur(5px)", () => {
		const input = "blur(5px)";
		const result = parse(input);
		expect(result.ok).toBe(true);
		if (result.ok) {
			const css = toCss(result.value);
			expect(css).toBe(input);
			const result2 = parse(css);
			expect(result2).toEqual(result);
		}
	});

	it("round-trips blur(1em)", () => {
		const input = "blur(1em)";
		const result = parse(input);
		expect(result.ok).toBe(true);
		if (result.ok) {
			const css = toCss(result.value);
			expect(css).toBe(input);
			const result2 = parse(css);
			expect(result2).toEqual(result);
		}
	});

	it("round-trips blur(2.5px)", () => {
		const input = "blur(2.5px)";
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
