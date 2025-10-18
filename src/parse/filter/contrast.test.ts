// b_path:: src/parse/filter/contrast.test.ts
import { describe, expect, it } from "vitest";
import { toCss } from "@/generate/filter/contrast";
import { parse } from "./contrast";

describe("parse()", () => {
	it("parses contrast with number", () => {
		const result = parse("contrast(1.5)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "contrast", value: 1.5 },
		});
	});

	it("parses contrast with percentage", () => {
		const result = parse("contrast(150%)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "contrast", value: 1.5 },
		});
	});

	it("parses contrast(0)", () => {
		const result = parse("contrast(0)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "contrast", value: 0 },
		});
	});

	it("parses contrast(1)", () => {
		const result = parse("contrast(1)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "contrast", value: 1 },
		});
	});

	it("parses contrast with 100%", () => {
		const result = parse("contrast(100%)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "contrast", value: 1 },
		});
	});

	it("parses contrast with 50%", () => {
		const result = parse("contrast(50%)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "contrast", value: 0.5 },
		});
	});

	it("parses contrast with large value", () => {
		const result = parse("contrast(5)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "contrast", value: 5 },
		});
	});

	it("rejects negative value", () => {
		const result = parse("contrast(-1)");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("non-negative");
		}
	});

	it("rejects wrong function name", () => {
		const result = parse("brightness(1.5)");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("contrast");
		}
	});

	it("rejects no arguments", () => {
		const result = parse("contrast()");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("1 argument");
		}
	});

	it("rejects multiple arguments", () => {
		const result = parse("contrast(1, 2)");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("1 argument");
		}
	});

	it("rejects invalid value type", () => {
		const result = parse("contrast(red)");
		expect(result.ok).toBe(false);
	});
});

describe("toCss()", () => {
	it("generates CSS for contrast", () => {
		const css = toCss({ kind: "contrast", value: 1.5 });
		expect(css).toBe("contrast(1.5)");
	});

	it("generates CSS for contrast(0)", () => {
		const css = toCss({ kind: "contrast", value: 0 });
		expect(css).toBe("contrast(0)");
	});

	it("generates CSS for contrast(1)", () => {
		const css = toCss({ kind: "contrast", value: 1 });
		expect(css).toBe("contrast(1)");
	});

	it("generates CSS for fractional value", () => {
		const css = toCss({ kind: "contrast", value: 0.5 });
		expect(css).toBe("contrast(0.5)");
	});
});

describe("round-trip", () => {
	it("round-trip: parse → generate → parse", () => {
		const input = "contrast(1.5)";
		const parsed = parse(input);
		expect(parsed.ok).toBe(true);
		if (!parsed.ok) return;

		const generated = toCss(parsed.value);
		const reparsed = parse(generated);
		expect(reparsed).toEqual(parsed);
	});

	it("round-trip: percentage normalizes to number", () => {
		const input = "contrast(150%)";
		const parsed = parse(input);
		expect(parsed.ok).toBe(true);
		if (!parsed.ok) return;

		const generated = toCss(parsed.value);
		expect(generated).toBe("contrast(1.5)");

		const reparsed = parse(generated);
		expect(reparsed).toEqual(parsed);
	});
});
