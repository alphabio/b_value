// b_path:: src/generate/shadow/shadow.test.ts

import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types/shadow";
import { generate } from "./shadow";

describe("Generate.Shadow.generate", () => {
	describe("box-shadow", () => {
		it("generates basic box-shadow", () => {
			const ir: Type.BoxShadow = {
				kind: "box-shadow",
				shadows: [
					{
						offsetX: { value: 2, unit: "px" },
						offsetY: { value: 2, unit: "px" },
					},
				],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("2px 2px");
			expect(result.issues).toEqual([]);
		});

		it("generates box-shadow with blur", () => {
			const ir: Type.BoxShadow = {
				kind: "box-shadow",
				shadows: [
					{
						offsetX: { value: 2, unit: "px" },
						offsetY: { value: 2, unit: "px" },
						blurRadius: { value: 4, unit: "px" },
					},
				],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("2px 2px 4px");
		});

		it("generates box-shadow with blur and spread", () => {
			const ir: Type.BoxShadow = {
				kind: "box-shadow",
				shadows: [
					{
						offsetX: { value: 2, unit: "px" },
						offsetY: { value: 2, unit: "px" },
						blurRadius: { value: 4, unit: "px" },
						spreadRadius: { value: 2, unit: "px" },
					},
				],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("2px 2px 4px 2px");
		});

		it("generates box-shadow with color", () => {
			const ir: Type.BoxShadow = {
				kind: "box-shadow",
				shadows: [
					{
						offsetX: { value: 2, unit: "px" },
						offsetY: { value: 2, unit: "px" },
						blurRadius: { value: 4, unit: "px" },
						color: { kind: "named", name: "black" },
					},
				],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("2px 2px 4px black");
		});

		it("generates inset box-shadow", () => {
			const ir: Type.BoxShadow = {
				kind: "box-shadow",
				shadows: [
					{
						inset: true,
						offsetX: { value: 0, unit: "px" },
						offsetY: { value: 0, unit: "px" },
						blurRadius: { value: 10, unit: "px" },
						color: { kind: "named", name: "rgba(0,0,0,0.5)" },
					},
				],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("inset 0px 0px 10px rgba(0,0,0,0.5)");
		});

		it("generates multiple box-shadows", () => {
			const ir: Type.BoxShadow = {
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
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("2px 2px black, inset 0px 0px 10px white");
		});
	});

	describe("text-shadow", () => {
		it("generates basic text-shadow", () => {
			const ir: Type.TextShadow = {
				kind: "text-shadow",
				shadows: [
					{
						offsetX: { value: 1, unit: "px" },
						offsetY: { value: 1, unit: "px" },
					},
				],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("1px 1px");
			expect(result.issues).toEqual([]);
		});

		it("generates text-shadow with blur", () => {
			const ir: Type.TextShadow = {
				kind: "text-shadow",
				shadows: [
					{
						offsetX: { value: 1, unit: "px" },
						offsetY: { value: 1, unit: "px" },
						blurRadius: { value: 2, unit: "px" },
					},
				],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("1px 1px 2px");
		});

		it("generates text-shadow with color", () => {
			const ir: Type.TextShadow = {
				kind: "text-shadow",
				shadows: [
					{
						offsetX: { value: 1, unit: "px" },
						offsetY: { value: 1, unit: "px" },
						blurRadius: { value: 2, unit: "px" },
						color: { kind: "named", name: "gray" },
					},
				],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("1px 1px 2px gray");
		});

		it("generates multiple text-shadows", () => {
			const ir: Type.TextShadow = {
				kind: "text-shadow",
				shadows: [
					{
						offsetX: { value: 1, unit: "px" },
						offsetY: { value: 1, unit: "px" },
						blurRadius: { value: 2, unit: "px" },
						color: { kind: "named", name: "black" },
					},
					{
						offsetX: { value: -1, unit: "px" },
						offsetY: { value: -1, unit: "px" },
						blurRadius: { value: 2, unit: "px" },
						color: { kind: "named", name: "white" },
					},
				],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("1px 1px 2px black, -1px -1px 2px white");
		});
	});

	describe("error handling", () => {
		it("returns error for null IR", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const result = generate(null as any);

			expect(result.ok).toBe(false);
			expect(result.issues).toHaveLength(1);
			expect(result.issues[0]?.severity).toBe("error");
			expect(result.issues[0]?.message).toBe("Invalid shadow IR: missing 'kind' field");
		});

		it("returns error for undefined IR", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const result = generate(undefined as any);

			expect(result.ok).toBe(false);
			expect(result.issues).toHaveLength(1);
			expect(result.issues[0]?.severity).toBe("error");
		});

		it("returns error for IR without kind", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const result = generate({} as any);

			expect(result.ok).toBe(false);
			expect(result.issues[0]?.message).toContain("missing 'kind' field");
		});

		it("returns error for unknown kind", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const result = generate({ kind: "unknown" } as any);

			expect(result.ok).toBe(false);
			expect(result.issues).toHaveLength(1);
			expect(result.issues[0]?.severity).toBe("error");
			expect(result.issues[0]?.message).toBe("Unknown shadow kind: unknown");
			expect(result.issues[0]?.suggestion).toContain("box-shadow");
			expect(result.issues[0]?.suggestion).toContain("text-shadow");
		});
	});
});
