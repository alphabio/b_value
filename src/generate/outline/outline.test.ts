// b_path:: src/generate/outline/outline.test.ts

import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types/outline";
import { generate } from "./outline";

describe("Generate.Outline.generate", () => {
	describe("outline-width", () => {
		it("generates outline-width with length", () => {
			const ir: Type.OutlineWidthValue = {
				kind: "outline-width",
				width: { value: 2, unit: "px" },
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("2px");
			expect(result.issues).toEqual([]);
		});

		it("generates outline-width with keyword", () => {
			const ir: Type.OutlineWidthValue = {
				kind: "outline-width",
				width: "medium",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("medium");
		});

		it("generates outline-width with thin", () => {
			const ir: Type.OutlineWidthValue = {
				kind: "outline-width",
				width: "thin",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("thin");
		});

		it("generates outline-width with thick", () => {
			const ir: Type.OutlineWidthValue = {
				kind: "outline-width",
				width: "thick",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("thick");
		});
	});

	describe("outline-style", () => {
		it("generates outline-style solid", () => {
			const ir: Type.OutlineStyleValue = {
				kind: "outline-style",
				style: "solid",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("solid");
			expect(result.issues).toEqual([]);
		});

		it("generates outline-style dashed", () => {
			const ir: Type.OutlineStyleValue = {
				kind: "outline-style",
				style: "dashed",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("dashed");
		});

		it("generates outline-style auto", () => {
			const ir: Type.OutlineStyleValue = {
				kind: "outline-style",
				style: "auto",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("auto");
		});

		it("generates outline-style none", () => {
			const ir: Type.OutlineStyleValue = {
				kind: "outline-style",
				style: "none",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("none");
		});
	});

	describe("outline-color", () => {
		it("generates outline-color with keyword", () => {
			const ir: Type.OutlineColorValue = {
				kind: "outline-color",
				color: "red",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("red");
			expect(result.issues).toEqual([]);
		});

		it("generates outline-color with invert", () => {
			const ir: Type.OutlineColorValue = {
				kind: "outline-color",
				color: "invert",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("invert");
		});

		it("generates outline-color with transparent", () => {
			const ir: Type.OutlineColorValue = {
				kind: "outline-color",
				color: "transparent",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("transparent");
		});

		it("generates outline-color with currentColor", () => {
			const ir: Type.OutlineColorValue = {
				kind: "outline-color",
				color: "currentColor",
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("currentColor");
		});
	});

	describe("outline-offset", () => {
		it("generates outline-offset with positive value", () => {
			const ir: Type.OutlineOffsetValue = {
				kind: "outline-offset",
				offset: { value: 4, unit: "px" },
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("4px");
			expect(result.issues).toEqual([]);
		});

		it("generates outline-offset with negative value", () => {
			const ir: Type.OutlineOffsetValue = {
				kind: "outline-offset",
				offset: { value: -2, unit: "px" },
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("-2px");
		});

		it("generates outline-offset with em units", () => {
			const ir: Type.OutlineOffsetValue = {
				kind: "outline-offset",
				offset: { value: 0.5, unit: "em" },
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
			expect(result.issues[0]?.message).toBe("Invalid outline IR: missing 'kind' field");
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
			expect(result.issues[0]?.message).toBe("Unknown outline kind: unknown");
			expect(result.issues[0]?.suggestion).toContain("outline-width");
			expect(result.issues[0]?.suggestion).toContain("outline-style");
			expect(result.issues[0]?.suggestion).toContain("outline-color");
			expect(result.issues[0]?.suggestion).toContain("outline-offset");
		});
	});
});
