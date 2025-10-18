// b_path:: src/parse/filter/saturate.test.ts
import { describe, expect, it } from "vitest";
import { toCss } from "@/generate/filter/saturate";
import { parse } from "./saturate";

describe("parse()", () => {
	it("parses saturate with number", () => {
		const result = parse("saturate(1.5)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "saturate", value: 1.5 },
		});
	});

	it("parses saturate with percentage", () => {
		const result = parse("saturate(150%)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "saturate", value: 1.5 },
		});
	});

	it("parses saturate(0)", () => {
		const result = parse("saturate(0)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "saturate", value: 0 },
		});
	});

	it("parses saturate(1)", () => {
		const result = parse("saturate(1)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "saturate", value: 1 },
		});
	});

	it("parses saturate with 100%", () => {
		const result = parse("saturate(100%)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "saturate", value: 1 },
		});
	});

	it("parses saturate with 50%", () => {
		const result = parse("saturate(50%)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "saturate", value: 0.5 },
		});
	});

	it("parses saturate with large value", () => {
		const result = parse("saturate(5)");
		expect(result).toEqual({
			ok: true,
			value: { kind: "saturate", value: 5 },
		});
	});

	it("rejects negative value", () => {
		const result = parse("saturate(-1)");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("non-negative");
		}
	});

	it("rejects wrong function name", () => {
		const result = parse("brightness(1.5)");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("saturate");
		}
	});

	it("rejects no arguments", () => {
		const result = parse("saturate()");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("1 argument");
		}
	});

	it("rejects multiple arguments", () => {
		const result = parse("saturate(1, 2)");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("1 argument");
		}
	});

	it("rejects invalid value type", () => {
		const result = parse("saturate(red)");
		expect(result.ok).toBe(false);
	});
});

describe("toCss()", () => {
	it("generates CSS for saturate", () => {
		const css = toCss({ kind: "saturate", value: 1.5 });
		expect(css).toBe("saturate(1.5)");
	});

	it("generates CSS for saturate(0)", () => {
		const css = toCss({ kind: "saturate", value: 0 });
		expect(css).toBe("saturate(0)");
	});

	it("generates CSS for saturate(1)", () => {
		const css = toCss({ kind: "saturate", value: 1 });
		expect(css).toBe("saturate(1)");
	});

	it("generates CSS for fractional value", () => {
		const css = toCss({ kind: "saturate", value: 0.5 });
		expect(css).toBe("saturate(0.5)");
	});
});

describe("round-trip", () => {
	it("round-trip: parse → generate → parse", () => {
		const input = "saturate(1.5)";
		const parsed = parse(input);
		expect(parsed.ok).toBe(true);
		if (!parsed.ok) return;

		const generated = toCss(parsed.value);
		const reparsed = parse(generated);
		expect(reparsed).toEqual(parsed);
	});

	it("round-trip: percentage normalizes to number", () => {
		const input = "saturate(150%)";
		const parsed = parse(input);
		expect(parsed.ok).toBe(true);
		if (!parsed.ok) return;

		const generated = toCss(parsed.value);
		expect(generated).toBe("saturate(1.5)");

		const reparsed = parse(generated);
		expect(reparsed).toEqual(parsed);
	});
});
