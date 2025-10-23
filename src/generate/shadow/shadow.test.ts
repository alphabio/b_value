import { describe, expect, it } from "vitest";
import { generate } from "./shadow";

describe("generateShadow (dispatcher)", () => {
	describe("box-shadow", () => {
		it("dispatches box-shadow to BoxShadow.generate", () => {
			const result = generate({
				kind: "box-shadow",
				shadows: [
					{
						offsetX: { value: 2, unit: "px" },
						offsetY: { value: 2, unit: "px" },
						blurRadius: { value: 4, unit: "px" },
						color: { kind: "named", name: "black" },
					},
				],
			});
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("2px 2px 4px black");
			}
		});

		it("handles inset box-shadow", () => {
			const result = generate({
				kind: "box-shadow",
				shadows: [
					{
						inset: true,
						offsetX: { value: 0, unit: "px" },
						offsetY: { value: 0, unit: "px" },
						blurRadius: { value: 10, unit: "px" },
						color: { kind: "named", name: "white" },
					},
				],
			});
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("inset 0px 0px 10px white");
			}
		});

		it("handles multiple box-shadows", () => {
			const result = generate({
				kind: "box-shadow",
				shadows: [
					{
						offsetX: { value: 2, unit: "px" },
						offsetY: { value: 2, unit: "px" },
						color: { kind: "named", name: "black" },
					},
					{
						inset: true,
						offsetX: { value: 0, unit: "px" },
						offsetY: { value: 0, unit: "px" },
						blurRadius: { value: 10, unit: "px" },
						color: { kind: "named", name: "white" },
					},
				],
			});
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("2px 2px black, inset 0px 0px 10px white");
			}
		});
	});

	describe("text-shadow", () => {
		it("dispatches text-shadow to TextShadow.generate", () => {
			const result = generate({
				kind: "text-shadow",
				shadows: [
					{
						offsetX: { value: 1, unit: "px" },
						offsetY: { value: 1, unit: "px" },
						blurRadius: { value: 2, unit: "px" },
						color: { kind: "named", name: "gray" },
					},
				],
			});
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("1px 1px 2px gray");
			}
		});

		it("handles multiple text-shadows", () => {
			const result = generate({
				kind: "text-shadow",
				shadows: [
					{
						offsetX: { value: 1, unit: "px" },
						offsetY: { value: 1, unit: "px" },
						color: { kind: "named", name: "black" },
					},
					{
						offsetX: { value: -1, unit: "px" },
						offsetY: { value: -1, unit: "px" },
						color: { kind: "named", name: "white" },
					},
				],
			});
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("1px 1px black, -1px -1px white");
			}
		});
	});

	describe("error handling", () => {
		it("rejects null input", () => {
			const result = generate(null as any);
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.code).toBe("missing-required-field");
				expect(result.issues[0]?.message).toContain("missing 'kind' field");
			}
		});

		it("rejects undefined input", () => {
			const result = generate(undefined as any);
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.code).toBe("missing-required-field");
			}
		});

		it("rejects object without kind field", () => {
			const result = generate({} as any);
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.code).toBe("missing-required-field");
			}
		});

		it("rejects unknown shadow kind", () => {
			const result = generate({ kind: "unknown-shadow" } as any);
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.code).toBe("unsupported-kind");
				expect(result.issues[0]?.message).toContain("unknown-shadow");
			}
		});
	});
});
