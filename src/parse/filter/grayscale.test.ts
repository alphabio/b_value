// b_path:: src/parse/filter/grayscale.test.ts
import { describe, expect, it } from "vitest";
import { toCss } from "@/generate/filter/grayscale";
import { parse } from "./grayscale";

describe("parse()", () => {
	it("parses grayscale(0)", () => {
		const result = parse("grayscale(0)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "grayscale", value: 0 },
		});
	});

	it("parses grayscale(0.5)", () => {
		const result = parse("grayscale(0.5)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "grayscale", value: 0.5 },
		});
	});

	it("parses grayscale(1)", () => {
		const result = parse("grayscale(1)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "grayscale", value: 1 },
		});
	});

	it("parses grayscale with 50%", () => {
		const result = parse("grayscale(50%)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "grayscale", value: 0.5 },
		});
	});

	it("parses grayscale with 100%", () => {
		const result = parse("grayscale(100%)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "grayscale", value: 1 },
		});
	});

	it("rejects value > 1", () => {
		const result = parse("grayscale(1.5)");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("between 0 and 1");
		}
	});

	it("rejects negative value", () => {
		const result = parse("grayscale(-0.1)");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("between 0 and 1");
		}
	});
});

describe("toCss()", () => {
	it("generates CSS for grayscale", () => {
		const css = toCss({ kind: "grayscale", value: 0.5 });
		expect(css).toBe("grayscale(0.5)");
	});

	it("generates CSS for grayscale(0)", () => {
		const css = toCss({ kind: "grayscale", value: 0 });
		expect(css).toBe("grayscale(0)");
	});

	it("generates CSS for grayscale(1)", () => {
		const css = toCss({ kind: "grayscale", value: 1 });
		expect(css).toBe("grayscale(1)");
	});
});

describe("round-trip", () => {
	it("round-trip: parse → generate → parse", () => {
		const input = "grayscale(0.5)";
		const parsed = parse(input);
		expect(parsed.ok).toBe(true);
		if (!parsed.ok) return;

		const generated = toCss(parsed.value);
		const reparsed = parse(generated);
		expect(reparsed).toEqual(parsed);
	});

	it("round-trip: percentage normalizes to number", () => {
		const input = "grayscale(50%)";
		const parsed = parse(input);
		expect(parsed.ok).toBe(true);
		if (!parsed.ok) return;

		const generated = toCss(parsed.value);
		expect(generated).toBe("grayscale(0.5)");

		const reparsed = parse(generated);
		expect(reparsed).toEqual(parsed);
	});
});
