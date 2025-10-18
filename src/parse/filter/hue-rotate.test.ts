// b_path:: src/parse/filter/hue-rotate.test.ts
import { describe, expect, it } from "vitest";
import { toCss } from "@/generate/filter/hue-rotate";
import { parse } from "./hue-rotate";

describe("parse()", () => {
	it("parses hue-rotate with deg", () => {
		const result = parse("hue-rotate(90deg)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "hue-rotate", angle: { value: 90, unit: "deg" } },
		});
	});

	it("parses hue-rotate with rad", () => {
		const result = parse("hue-rotate(1.57rad)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "hue-rotate", angle: { value: 1.57, unit: "rad" } },
		});
	});

	it("parses hue-rotate with grad", () => {
		const result = parse("hue-rotate(100grad)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "hue-rotate", angle: { value: 100, unit: "grad" } },
		});
	});

	it("parses hue-rotate with turn", () => {
		const result = parse("hue-rotate(0.5turn)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "hue-rotate", angle: { value: 0.5, unit: "turn" } },
		});
	});

	it("parses hue-rotate with 0deg", () => {
		const result = parse("hue-rotate(0deg)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "hue-rotate", angle: { value: 0, unit: "deg" } },
		});
	});

	it("parses hue-rotate with negative angle", () => {
		const result = parse("hue-rotate(-90deg)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "hue-rotate", angle: { value: -90, unit: "deg" } },
		});
	});

	it("parses hue-rotate with large angle", () => {
		const result = parse("hue-rotate(360deg)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "hue-rotate", angle: { value: 360, unit: "deg" } },
		});
	});

	it("rejects hue-rotate without unit", () => {
		const result = parse("hue-rotate(90)");
		expect(result).toEqual({
			ok: false,
			error: "Expected angle dimension",
		});
	});

	it("rejects hue-rotate with wrong unit", () => {
		const result = parse("hue-rotate(90px)");
		expect(result).toEqual({
			ok: false,
			error: "Invalid angle unit: px",
		});
	});

	it("rejects hue-rotate with wrong function name", () => {
		const result = parse("blur(90deg)");
		expect(result).toEqual({
			ok: false,
			error: "No function found with name(s): hue-rotate",
		});
	});

	it("rejects hue-rotate with no arguments", () => {
		const result = parse("hue-rotate()");
		expect(result).toEqual({
			ok: false,
			error: "hue-rotate() expects 1 argument, got 0",
		});
	});

	it("rejects hue-rotate with too many arguments", () => {
		const result = parse("hue-rotate(90deg, 180deg)");
		expect(result).toEqual({
			ok: false,
			error: "hue-rotate() expects 1 argument, got 2",
		});
	});

	it("rejects hue-rotate with percentage", () => {
		const result = parse("hue-rotate(50%)");
		expect(result).toEqual({
			ok: false,
			error: "Expected angle dimension",
		});
	});
});

describe("toCss()", () => {
	it("generates CSS for hue-rotate with deg", () => {
		const css = toCss({ kind: "hue-rotate", angle: { value: 90, unit: "deg" } });
		expect(css).toBe("hue-rotate(90deg)");
	});

	it("generates CSS for hue-rotate with rad", () => {
		const css = toCss({ kind: "hue-rotate", angle: { value: 1.57, unit: "rad" } });
		expect(css).toBe("hue-rotate(1.57rad)");
	});

	it("generates CSS for hue-rotate with turn", () => {
		const css = toCss({ kind: "hue-rotate", angle: { value: 0.5, unit: "turn" } });
		expect(css).toBe("hue-rotate(0.5turn)");
	});

	it("generates CSS for hue-rotate with 0deg", () => {
		const css = toCss({ kind: "hue-rotate", angle: { value: 0, unit: "deg" } });
		expect(css).toBe("hue-rotate(0deg)");
	});

	it("generates CSS for hue-rotate with negative angle", () => {
		const css = toCss({ kind: "hue-rotate", angle: { value: -90, unit: "deg" } });
		expect(css).toBe("hue-rotate(-90deg)");
	});
});

describe("round-trip", () => {
	it("round-trips hue-rotate(90deg)", () => {
		const input = "hue-rotate(90deg)";
		const result = parse(input);
		expect(result.ok).toBe(true);
		if (result.ok) {
			const css = toCss(result.value);
			expect(css).toBe(input);
			const result2 = parse(css);
			expect(result2).toEqual(result);
		}
	});

	it("round-trips hue-rotate(0.5turn)", () => {
		const input = "hue-rotate(0.5turn)";
		const result = parse(input);
		expect(result.ok).toBe(true);
		if (result.ok) {
			const css = toCss(result.value);
			expect(css).toBe(input);
			const result2 = parse(css);
			expect(result2).toEqual(result);
		}
	});

	it("round-trips hue-rotate(-90deg)", () => {
		const input = "hue-rotate(-90deg)";
		const result = parse(input);
		expect(result.ok).toBe(true);
		if (result.ok) {
			const css = toCss(result.value);
			expect(css).toBe(input);
			const result2 = parse(css);
			expect(result2).toEqual(result);
		}
	});

	it("round-trips hue-rotate(1.57rad)", () => {
		const input = "hue-rotate(1.57rad)";
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
