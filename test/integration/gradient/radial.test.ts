// b_path:: test/integration/gradient/radial.test.ts

import { describe, expect, it } from "vitest";
import * as RadialGenerator from "../../../src/generate/gradient/radial";
import * as RadialParser from "../../../src/parse/gradient/radial";

describe("Radial Gradient - Round-Trip Integration", () => {
	it("should round-trip simple gradient", () => {
		const original = "radial-gradient(red, blue)";
		const parsed = RadialParser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = RadialGenerator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});

	it("should round-trip gradient with shape", () => {
		const original = "radial-gradient(circle, red, blue)";
		const parsed = RadialParser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = RadialGenerator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});

	it("should round-trip gradient with shape and size", () => {
		const original = "radial-gradient(circle closest-side, red, blue)";
		const parsed = RadialParser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = RadialGenerator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});

	it("should round-trip gradient with position", () => {
		const original = "radial-gradient(at center center, red, blue)";
		const parsed = RadialParser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = RadialGenerator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});

	it("should round-trip gradient with color stop positions", () => {
		const original = "radial-gradient(red 0%, blue 100%)";
		const parsed = RadialParser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = RadialGenerator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});

	it("should round-trip repeating gradient", () => {
		const original = "repeating-radial-gradient(red, blue 20px)";
		const parsed = RadialParser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = RadialGenerator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});

	it("should round-trip complex gradient", () => {
		const original = "radial-gradient(ellipse farthest-corner at 30% 30%, red 0%, blue 100%)";
		const parsed = RadialParser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = RadialGenerator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});

	it("should round-trip gradient with multiple stops", () => {
		const original = "radial-gradient(red, yellow 30%, green 60%, blue)";
		const parsed = RadialParser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = RadialGenerator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});

	it("should round-trip gradient with mixed position types", () => {
		const original = "radial-gradient(at 50% 75%, red, blue)";
		const parsed = RadialParser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = RadialGenerator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});

	it("should round-trip gradient with explicit circle size", () => {
		const original = "radial-gradient(circle 100px, red, blue)";
		const parsed = RadialParser.parse(original);

		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = RadialGenerator.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});
});
