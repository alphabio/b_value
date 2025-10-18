// b_path:: src/parse/filter/brightness.test.ts
import { describe, expect, it } from "vitest";
import { toCss } from "@/generate/filter/brightness";
import { parse } from "./brightness";

describe("parse()", () => {
	it("parses brightness with number", () => {
		const result = parse("brightness(1.5)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "brightness", value: 1.5 },
		});
	});

	it("parses brightness with percentage", () => {
		const result = parse("brightness(150%)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "brightness", value: 1.5 },
		});
	});

	it("parses brightness(0)", () => {
		const result = parse("brightness(0)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "brightness", value: 0 },
		});
	});

	it("parses brightness(1)", () => {
		const result = parse("brightness(1)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "brightness", value: 1 },
		});
	});

	it("parses brightness with 100%", () => {
		const result = parse("brightness(100%)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "brightness", value: 1 },
		});
	});

	it("parses brightness with 50%", () => {
		const result = parse("brightness(50%)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "brightness", value: 0.5 },
		});
	});

	it("parses brightness with large value", () => {
		const result = parse("brightness(5)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "brightness", value: 5 },
		});
	});

	it("rejects negative value", () => {
		const result = parse("brightness(-1)");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("non-negative");
		}
	});

	it("rejects wrong function name", () => {
		const result = parse("contrast(1.5)");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("brightness");
		}
	});

	it("rejects no arguments", () => {
		const result = parse("brightness()");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("1 argument");
		}
	});

	it("rejects multiple arguments", () => {
		const result = parse("brightness(1, 2)");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("1 argument");
		}
	});

	it("rejects invalid value type", () => {
		const result = parse("brightness(red)");
		expect(result.ok).toBe(false);
	});
});

describe("toCss()", () => {
	it("generates CSS for brightness", () => {
		const css = toCss({ kind: "brightness", value: 1.5 });
		expect(css).toBe("brightness(1.5)");
	});

	it("generates CSS for brightness(0)", () => {
		const css = toCss({ kind: "brightness", value: 0 });
		expect(css).toBe("brightness(0)");
	});

	it("generates CSS for brightness(1)", () => {
		const css = toCss({ kind: "brightness", value: 1 });
		expect(css).toBe("brightness(1)");
	});

	it("generates CSS for fractional value", () => {
		const css = toCss({ kind: "brightness", value: 0.5 });
		expect(css).toBe("brightness(0.5)");
	});
});

describe("round-trip", () => {
	it("round-trip: parse → generate → parse", () => {
		const input = "brightness(1.5)";
		const parsed = parse(input);
		expect(parsed.ok).toBe(true);
		if (!parsed.ok) return;

		const generated = toCss(parsed.value);
		const reparsed = parse(generated);
		expect(reparsed).toEqual(parsed);
	});

	it("round-trip: percentage normalizes to number", () => {
		const input = "brightness(150%)";
		const parsed = parse(input);
		expect(parsed.ok).toBe(true);
		if (!parsed.ok) return;

		const generated = toCss(parsed.value);
		expect(generated).toBe("brightness(1.5)");

		const reparsed = parse(generated);
		expect(reparsed).toEqual(parsed);
	});
});
