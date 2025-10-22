// b_path:: test/integration/interaction/pointer-events.test.ts
import { describe, expect, it } from "vitest";
import { generate, parse } from "@/index";

describe("Integration.Interaction.PointerEvents", () => {
	describe("parse()", () => {
		it("should parse standard values", () => {
			const result = parse("pointer-events: none");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("pointer-events");
				expect(result.value.value).toBe("none");
			}
		});

		it("should parse SVG values", () => {
			const result = parse("pointer-events: visiblePainted");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("pointer-events");
				expect(result.value.value).toBe("visiblePainted");
			}
		});
	});

	describe("generate()", () => {
		it("should generate CSS from IR", () => {
			const result = generate({
				property: "pointer-events",
				value: {
					kind: "pointer-events",
					value: "none",
				},
			});
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("none");
			}
		});
	});

	describe("roundtrip", () => {
		const testCases = [
			"auto",
			"none",
			"visiblePainted",
			"visibleFill",
			"visibleStroke",
			"visible",
			"painted",
			"fill",
			"stroke",
			"all",
			"bounding-box",
		];

		testCases.forEach((value) => {
			it(`should roundtrip ${value}`, () => {
				const parsed = parse(`pointer-events: ${value}`);
				expect(parsed.ok).toBe(true);
				if (parsed.ok) {
					const generated = generate({
						property: "pointer-events",
						value: parsed.value,
					});
					expect(generated.ok).toBe(true);
					if (generated.ok) {
						expect(generated.value).toBe(value);
					}
				}
			});
		});
	});
});
