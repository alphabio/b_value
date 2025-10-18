// b_path:: src/parse/filter/sepia.test.ts
import { describe, expect, it } from "vitest";
import { toCss } from "@/generate/filter/sepia";
import { parse } from "./sepia";

describe("parse()", () => {
	it("parses sepia(0)", () => {
		const result = parse("sepia(0)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "sepia", value: 0 },
		});
	});

	it("parses sepia(0.5)", () => {
		const result = parse("sepia(0.5)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "sepia", value: 0.5 },
		});
	});

	it("parses sepia(1)", () => {
		const result = parse("sepia(1)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "sepia", value: 1 },
		});
	});

	it("parses sepia with 50%", () => {
		const result = parse("sepia(50%)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "sepia", value: 0.5 },
		});
	});

	it("parses sepia with 100%", () => {
		const result = parse("sepia(100%)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "sepia", value: 1 },
		});
	});

	it("rejects value > 1", () => {
		const result = parse("sepia(1.5)");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("between 0 and 1");
		}
	});

	it("rejects negative value", () => {
		const result = parse("sepia(-0.1)");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("between 0 and 1");
		}
	});
});

describe("toCss()", () => {
	it("generates CSS for sepia", () => {
		const css = toCss({ kind: "sepia", value: 0.5 });
		expect(css).toBe("sepia(0.5)");
	});

	it("generates CSS for sepia(0)", () => {
		const css = toCss({ kind: "sepia", value: 0 });
		expect(css).toBe("sepia(0)");
	});

	it("generates CSS for sepia(1)", () => {
		const css = toCss({ kind: "sepia", value: 1 });
		expect(css).toBe("sepia(1)");
	});
});

describe("round-trip", () => {
	it("round-trip: parse → generate → parse", () => {
		const input = "sepia(0.5)";
		const parsed = parse(input);
		expect(parsed.ok).toBe(true);
		if (!parsed.ok) return;

		const generated = toCss(parsed.value);
		const reparsed = parse(generated);
		expect(reparsed).toEqual(parsed);
	});

	it("round-trip: percentage normalizes to number", () => {
		const input = "sepia(50%)";
		const parsed = parse(input);
		expect(parsed.ok).toBe(true);
		if (!parsed.ok) return;

		const generated = toCss(parsed.value);
		expect(generated).toBe("sepia(0.5)");

		const reparsed = parse(generated);
		expect(reparsed).toEqual(parsed);
	});
});
