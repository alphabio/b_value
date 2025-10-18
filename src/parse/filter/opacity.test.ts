// b_path:: src/parse/filter/opacity.test.ts
import { describe, expect, it } from "vitest";
import { toCss } from "@/generate/filter/opacity";
import { parse } from "./opacity";

describe("parse()", () => {
	it("parses opacity(0)", () => {
		const result = parse("opacity(0)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "opacity", value: 0 },
		});
	});

	it("parses opacity(0.5)", () => {
		const result = parse("opacity(0.5)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "opacity", value: 0.5 },
		});
	});

	it("parses opacity(1)", () => {
		const result = parse("opacity(1)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "opacity", value: 1 },
		});
	});

	it("parses opacity with 50%", () => {
		const result = parse("opacity(50%)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "opacity", value: 0.5 },
		});
	});

	it("parses opacity with 100%", () => {
		const result = parse("opacity(100%)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "opacity", value: 1 },
		});
	});

	it("rejects value > 1", () => {
		const result = parse("opacity(1.5)");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("between 0 and 1");
		}
	});

	it("rejects negative value", () => {
		const result = parse("opacity(-0.1)");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("between 0 and 1");
		}
	});
});

describe("toCss()", () => {
	it("generates CSS for opacity", () => {
		const css = toCss({ kind: "opacity", value: 0.5 });
		expect(css).toBe("opacity(0.5)");
	});

	it("generates CSS for opacity(0)", () => {
		const css = toCss({ kind: "opacity", value: 0 });
		expect(css).toBe("opacity(0)");
	});

	it("generates CSS for opacity(1)", () => {
		const css = toCss({ kind: "opacity", value: 1 });
		expect(css).toBe("opacity(1)");
	});
});

describe("round-trip", () => {
	it("round-trip: parse → generate → parse", () => {
		const input = "opacity(0.5)";
		const parsed = parse(input);
		expect(parsed.ok).toBe(true);
		if (!parsed.ok) return;

		const generated = toCss(parsed.value);
		const reparsed = parse(generated);
		expect(reparsed).toEqual(parsed);
	});

	it("round-trip: percentage normalizes to number", () => {
		const input = "opacity(50%)";
		const parsed = parse(input);
		expect(parsed.ok).toBe(true);
		if (!parsed.ok) return;

		const generated = toCss(parsed.value);
		expect(generated).toBe("opacity(0.5)");

		const reparsed = parse(generated);
		expect(reparsed).toEqual(parsed);
	});
});
