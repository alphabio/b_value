// b_path:: src/parse/filter/invert.test.ts
import { describe, expect, it } from "vitest";
import { toCss } from "@/generate/filter/invert";
import { parse } from "./invert";

describe("parse()", () => {
	it("parses invert(0)", () => {
		const result = parse("invert(0)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "invert", value: 0 },
		});
	});

	it("parses invert(0.5)", () => {
		const result = parse("invert(0.5)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "invert", value: 0.5 },
		});
	});

	it("parses invert(1)", () => {
		const result = parse("invert(1)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "invert", value: 1 },
		});
	});

	it("parses invert with 50%", () => {
		const result = parse("invert(50%)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "invert", value: 0.5 },
		});
	});

	it("parses invert with 100%", () => {
		const result = parse("invert(100%)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "invert", value: 1 },
		});
	});

	it("rejects value > 1", () => {
		const result = parse("invert(1.5)");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("between 0 and 1");
		}
	});

	it("rejects negative value", () => {
		const result = parse("invert(-0.1)");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("between 0 and 1");
		}
	});
});

describe("toCss()", () => {
	it("generates CSS for invert", () => {
		const css = toCss({ kind: "invert", value: 0.5 });
		expect(css).toBe("invert(0.5)");
	});

	it("generates CSS for invert(0)", () => {
		const css = toCss({ kind: "invert", value: 0 });
		expect(css).toBe("invert(0)");
	});

	it("generates CSS for invert(1)", () => {
		const css = toCss({ kind: "invert", value: 1 });
		expect(css).toBe("invert(1)");
	});
});

describe("round-trip", () => {
	it("round-trip: parse → generate → parse", () => {
		const input = "invert(0.5)";
		const parsed = parse(input);
		expect(parsed.ok).toBe(true);
		if (!parsed.ok) return;

		const generated = toCss(parsed.value);
		const reparsed = parse(generated);
		expect(reparsed).toEqual(parsed);
	});

	it("round-trip: percentage normalizes to number", () => {
		const input = "invert(50%)";
		const parsed = parse(input);
		expect(parsed.ok).toBe(true);
		if (!parsed.ok) return;

		const generated = toCss(parsed.value);
		expect(generated).toBe("invert(0.5)");

		const reparsed = parse(generated);
		expect(reparsed).toEqual(parsed);
	});
});
