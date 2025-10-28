// b_path:: src/parse/filter/hue-rotate.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./hue-rotate";

describe("parse hue-rotate filter", () => {
	it("parses hue-rotate with deg value", () => {
		const result = parse("hue-rotate(90deg)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("hue-rotate");
			expect(result.value.angle).toEqual({ value: 90, unit: "deg" });
		}
	});

	it("parses hue-rotate with turn value", () => {
		const result = parse("hue-rotate(0.5turn)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.angle).toEqual({ value: 0.5, unit: "turn" });
		}
	});

	it("parses hue-rotate with rad value", () => {
		const result = parse("hue-rotate(1.57rad)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.angle).toEqual({ value: 1.57, unit: "rad" });
		}
	});

	it("parses hue-rotate with grad value", () => {
		const result = parse("hue-rotate(100grad)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.angle).toEqual({ value: 100, unit: "grad" });
		}
	});

	it("parses negative angle", () => {
		const result = parse("hue-rotate(-90deg)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.angle).toEqual({ value: -90, unit: "deg" });
		}
	});

	it("parses zero angle", () => {
		const result = parse("hue-rotate(0deg)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.angle).toEqual({ value: 0, unit: "deg" });
		}
	});

	it("rejects no arguments", () => {
		const result = parse("hue-rotate()");
		expect(result.ok).toBe(false);
	});

	it("rejects multiple arguments", () => {
		const result = parse("hue-rotate(90deg, 180deg)");
		expect(result.ok).toBe(false);
	});

	it("rejects invalid unit", () => {
		const result = parse("hue-rotate(90px)");
		expect(result.ok).toBe(false);
	});

	it("rejects non-function input", () => {
		const result = parse("90deg");
		expect(result.ok).toBe(false);
	});
});
