// b_path:: src/generate/transition/transition.test.ts

import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types/transition";
import { generate } from "./transition";

describe("Generate.Transition.generate", () => {
	describe("transition-duration", () => {
		it("generates duration in seconds", () => {
			const ir: Type.TransitionDuration = {
				kind: "transition-duration",
				durations: [{ value: 1, unit: "s" }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("1s");
			expect(result.issues).toEqual([]);
		});

		it("generates duration in milliseconds", () => {
			const ir: Type.TransitionDuration = {
				kind: "transition-duration",
				durations: [{ value: 500, unit: "ms" }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("500ms");
		});

		it("generates fractional duration", () => {
			const ir: Type.TransitionDuration = {
				kind: "transition-duration",
				durations: [{ value: 0.5, unit: "s" }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("0.5s");
		});

		it("generates multiple durations", () => {
			const ir: Type.TransitionDuration = {
				kind: "transition-duration",
				durations: [
					{ value: 1, unit: "s" },
					{ value: 500, unit: "ms" },
				],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("1s, 500ms");
		});
	});

	describe("transition-delay", () => {
		it("generates delay in seconds", () => {
			const ir: Type.TransitionDelay = {
				kind: "transition-delay",
				delays: [{ value: 2, unit: "s" }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("2s");
		});

		it("generates delay in milliseconds", () => {
			const ir: Type.TransitionDelay = {
				kind: "transition-delay",
				delays: [{ value: 100, unit: "ms" }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("100ms");
		});

		it("generates negative delay", () => {
			const ir: Type.TransitionDelay = {
				kind: "transition-delay",
				delays: [{ value: -0.5, unit: "s" }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("-0.5s");
		});

		it("generates multiple delays", () => {
			const ir: Type.TransitionDelay = {
				kind: "transition-delay",
				delays: [
					{ value: 0, unit: "s" },
					{ value: 500, unit: "ms" },
				],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("0s, 500ms");
		});
	});

	describe("transition-timing-function", () => {
		it("generates ease keyword", () => {
			const ir: Type.TransitionTimingFunction = {
				kind: "transition-timing-function",
				functions: ["ease"],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("ease");
		});

		it("generates ease-in-out keyword", () => {
			const ir: Type.TransitionTimingFunction = {
				kind: "transition-timing-function",
				functions: ["ease-in-out"],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("ease-in-out");
		});

		it("generates linear keyword", () => {
			const ir: Type.TransitionTimingFunction = {
				kind: "transition-timing-function",
				functions: ["linear"],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("linear");
		});

		it("generates step-start keyword", () => {
			const ir: Type.TransitionTimingFunction = {
				kind: "transition-timing-function",
				functions: ["step-start"],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("step-start");
		});

		it("generates multiple timing functions", () => {
			const ir: Type.TransitionTimingFunction = {
				kind: "transition-timing-function",
				functions: ["ease-in", "linear"],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("ease-in, linear");
		});
	});

	describe("transition-property", () => {
		it("generates property name", () => {
			const ir: Type.TransitionProperty = {
				kind: "transition-property",
				properties: [{ type: "identifier", value: "opacity" }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("opacity");
		});

		it("generates all keyword", () => {
			const ir: Type.TransitionProperty = {
				kind: "transition-property",
				properties: [{ type: "all" }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("all");
		});

		it("generates none keyword", () => {
			const ir: Type.TransitionProperty = {
				kind: "transition-property",
				properties: [{ type: "none" }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("none");
		});

		it("generates complex property name", () => {
			const ir: Type.TransitionProperty = {
				kind: "transition-property",
				properties: [{ type: "identifier", value: "background-color" }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("background-color");
		});

		it("generates multiple properties", () => {
			const ir: Type.TransitionProperty = {
				kind: "transition-property",
				properties: [
					{ type: "identifier", value: "opacity" },
					{ type: "identifier", value: "transform" },
				],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("opacity, transform");
		});
	});

	describe("error handling", () => {
		it("returns error for null IR", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const result = generate(null as any);

			expect(result.ok).toBe(false);
			expect(result.issues).toHaveLength(1);
			expect(result.issues[0]?.severity).toBe("error");
			expect(result.issues[0]?.message).toBe("Invalid transition IR: missing 'kind' field");
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
			expect(result.issues[0]?.message).toBe("Unknown transition kind: unknown");
			expect(result.issues[0]?.suggestion).toContain("transition-duration");
			expect(result.issues[0]?.suggestion).toContain("transition-delay");
		});
	});
});
