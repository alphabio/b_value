// b_path:: src/generate/border/border.test.ts

import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types/border";
import { generate } from "./border";

describe("Generate.Border.generate", () => {
	describe("border-width", () => {
		it("generates border-width with length", () => {
			const ir: Type.BorderWidthValue = {
				kind: "border-width",
				width: { value: 2, unit: "px" },
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("2px");
			expect(result.issues).toEqual([]);
		});

		it("generates border-width with keyword", () => {
			const ir: Type.BorderWidthValue = {
				kind: "border-width",
				width: "medium",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("medium");
		});

		it("generates border-width with thin", () => {
			const ir: Type.BorderWidthValue = {
				kind: "border-width",
				width: "thin",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("thin");
		});

		it("generates border-width with thick", () => {
			const ir: Type.BorderWidthValue = {
				kind: "border-width",
				width: "thick",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("thick");
		});
	});

	describe("border-style", () => {
		it("generates border-style solid", () => {
			const ir: Type.BorderStyleValue = {
				kind: "border-style",
				style: "solid",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("solid");
			expect(result.issues).toEqual([]);
		});

		it("generates border-style dashed", () => {
			const ir: Type.BorderStyleValue = {
				kind: "border-style",
				style: "dashed",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("dashed");
		});

		it("generates border-style dotted", () => {
			const ir: Type.BorderStyleValue = {
				kind: "border-style",
				style: "dotted",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("dotted");
		});

		it("generates border-style none", () => {
			const ir: Type.BorderStyleValue = {
				kind: "border-style",
				style: "none",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("none");
		});
	});

	describe("border-color", () => {
		it("generates border-color with keyword", () => {
			const ir: Type.BorderColorValue = {
				kind: "border-color",
				color: "red",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("red");
			expect(result.issues).toEqual([]);
		});

		it("generates border-color with transparent", () => {
			const ir: Type.BorderColorValue = {
				kind: "border-color",
				color: "transparent",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("transparent");
		});

		it("generates border-color with currentColor", () => {
			const ir: Type.BorderColorValue = {
				kind: "border-color",
				color: "currentColor",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("currentColor");
		});
	});

	describe("border-radius", () => {
		it("generates border-radius with px", () => {
			const ir: Type.BorderRadiusValue = {
				kind: "border-radius",
				radius: { value: 4, unit: "px" },
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("4px");
			expect(result.issues).toEqual([]);
		});

		it("generates border-radius with percentage", () => {
			const ir: Type.BorderRadiusValue = {
				kind: "border-radius",
				radius: { value: 50, unit: "%" },
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("50%");
		});

		it("generates border-radius with em", () => {
			const ir: Type.BorderRadiusValue = {
				kind: "border-radius",
				radius: { value: 0.5, unit: "em" },
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("0.5em");
		});
	});

	describe("error handling", () => {
		it("returns error for null IR", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const result = generate(null as any);

			expect(result.ok).toBe(false);
			expect(result.issues).toHaveLength(1);
			expect(result.issues[0]?.severity).toBe("error");
			expect(result.issues[0]?.message).toBe("Invalid border IR: missing 'kind' field");
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
			expect(result.issues[0]?.message).toBe("Unknown border kind: unknown");
			expect(result.issues[0]?.suggestion).toContain("border-width");
			expect(result.issues[0]?.suggestion).toContain("border-style");
			expect(result.issues[0]?.suggestion).toContain("border-color");
			expect(result.issues[0]?.suggestion).toContain("border-radius");
		});
	});
});
