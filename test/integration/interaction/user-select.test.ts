// b_path:: test/integration/interaction/user-select.test.ts
import { describe, expect, it } from "vitest";
import { generate, parse } from "@/index";

describe("Integration.Interaction.UserSelect", () => {
	describe("parse()", () => {
		it("should parse standard values", () => {
			const result = parse("user-select: none");
			expect(result.ok).toBe(true);
			if (result.ok && result.value && typeof result.value === "object" && "kind" in result.value) {
				expect(result.value.kind).toBe("user-select");
				if ("value" in result.value) {
					expect(result.value.value).toBe("none");
				}
			}
		});

		it("should parse text value", () => {
			const result = parse("user-select: text");
			expect(result.ok).toBe(true);
			if (result.ok && result.value && typeof result.value === "object" && "kind" in result.value) {
				expect(result.value.kind).toBe("user-select");
				if ("value" in result.value) {
					expect(result.value.value).toBe("text");
				}
			}
		});
	});

	describe("generate()", () => {
		it("should generate CSS from IR", () => {
			const result = generate({
				property: "user-select",
				value: {
					kind: "user-select",
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
		const testCases = ["auto", "text", "none", "contain", "all"];

		testCases.forEach((value) => {
			it(`should roundtrip ${value}`, () => {
				const parsed = parse(`user-select: ${value}`);
				expect(parsed.ok).toBe(true);
				if (parsed.ok) {
					const generated = generate({
						property: "user-select",
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
