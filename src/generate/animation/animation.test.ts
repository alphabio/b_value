// b_path:: src/generate/animation/animation.test.ts

import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types/animation";
import { generate } from "./animation";

describe("Generate.Animation.generate", () => {
	describe("animation-duration", () => {
		it("generates animation-duration with seconds", () => {
			const ir: Type.AnimationDuration = {
				kind: "animation-duration",
				durations: [{ type: "time", value: 1, unit: "s" }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("1s");
			expect(result.issues).toEqual([]);
		});

		it("generates animation-duration with milliseconds", () => {
			const ir: Type.AnimationDuration = {
				kind: "animation-duration",
				durations: [{ type: "time", value: 500, unit: "ms" }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("500ms");
		});

		it("generates animation-duration with auto", () => {
			const ir: Type.AnimationDuration = {
				kind: "animation-duration",
				durations: [{ type: "auto" }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("auto");
		});
	});

	describe("animation-delay", () => {
		it("generates animation-delay with positive value", () => {
			const ir: Type.AnimationDelay = {
				kind: "animation-delay",
				delays: [{ value: 500, unit: "ms" }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("500ms");
			expect(result.issues).toEqual([]);
		});

		it("generates animation-delay with negative value", () => {
			const ir: Type.AnimationDelay = {
				kind: "animation-delay",
				delays: [{ value: -200, unit: "ms" }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("-200ms");
		});
	});

	describe("animation-timing-function", () => {
		it("generates timing function with keyword", () => {
			const ir: Type.AnimationTimingFunction = {
				kind: "animation-timing-function",
				functions: ["ease-in-out"],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("ease-in-out");
			expect(result.issues).toEqual([]);
		});

		it("generates timing function with cubic-bezier", () => {
			const ir: Type.AnimationTimingFunction = {
				kind: "animation-timing-function",
				functions: [{ type: "cubic-bezier", x1: 0.25, y1: 0.1, x2: 0.25, y2: 1 }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("cubic-bezier(0.25, 0.1, 0.25, 1)");
		});

		it("generates timing function with steps", () => {
			const ir: Type.AnimationTimingFunction = {
				kind: "animation-timing-function",
				functions: [{ type: "steps", steps: 4, position: "end" }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("steps(4, end)");
		});
	});

	describe("animation-iteration-count", () => {
		it("generates iteration count with number", () => {
			const ir: Type.AnimationIterationCount = {
				kind: "animation-iteration-count",
				counts: [{ type: "number", value: 3 }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("3");
			expect(result.issues).toEqual([]);
		});

		it("generates iteration count with infinite", () => {
			const ir: Type.AnimationIterationCount = {
				kind: "animation-iteration-count",
				counts: [{ type: "infinite" }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("infinite");
		});
	});

	describe("animation-direction", () => {
		it("generates direction normal", () => {
			const ir: Type.AnimationDirection = {
				kind: "animation-direction",
				directions: ["normal"],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("normal");
			expect(result.issues).toEqual([]);
		});

		it("generates direction reverse", () => {
			const ir: Type.AnimationDirection = {
				kind: "animation-direction",
				directions: ["reverse"],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("reverse");
		});

		it("generates direction alternate", () => {
			const ir: Type.AnimationDirection = {
				kind: "animation-direction",
				directions: ["alternate"],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("alternate");
		});

		it("generates direction alternate-reverse", () => {
			const ir: Type.AnimationDirection = {
				kind: "animation-direction",
				directions: ["alternate-reverse"],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("alternate-reverse");
		});
	});

	describe("animation-fill-mode", () => {
		it("generates fill-mode none", () => {
			const ir: Type.AnimationFillMode = {
				kind: "animation-fill-mode",
				modes: ["none"],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("none");
			expect(result.issues).toEqual([]);
		});

		it("generates fill-mode forwards", () => {
			const ir: Type.AnimationFillMode = {
				kind: "animation-fill-mode",
				modes: ["forwards"],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("forwards");
		});

		it("generates fill-mode backwards", () => {
			const ir: Type.AnimationFillMode = {
				kind: "animation-fill-mode",
				modes: ["backwards"],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("backwards");
		});

		it("generates fill-mode both", () => {
			const ir: Type.AnimationFillMode = {
				kind: "animation-fill-mode",
				modes: ["both"],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("both");
		});
	});

	describe("animation-play-state", () => {
		it("generates play-state running", () => {
			const ir: Type.AnimationPlayState = {
				kind: "animation-play-state",
				states: ["running"],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("running");
			expect(result.issues).toEqual([]);
		});

		it("generates play-state paused", () => {
			const ir: Type.AnimationPlayState = {
				kind: "animation-play-state",
				states: ["paused"],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("paused");
		});
	});

	describe("animation-name", () => {
		it("generates animation name with identifier", () => {
			const ir: Type.AnimationName = {
				kind: "animation-name",
				names: [{ type: "identifier", value: "slide-in" }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("slide-in");
			expect(result.issues).toEqual([]);
		});

		it("generates animation name with none", () => {
			const ir: Type.AnimationName = {
				kind: "animation-name",
				names: [{ type: "none" }],
			};

			const result = generate(ir);

			expect(result.ok).toBe(true);
			expect(result.value).toBe("none");
		});
	});

	describe("error handling", () => {
		it("returns error for null IR", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const result = generate(null as any);

			expect(result.ok).toBe(false);
			expect(result.issues).toHaveLength(1);
			expect(result.issues[0]?.severity).toBe("error");
			expect(result.issues[0]?.message).toBe("Invalid animation IR: missing 'kind' field");
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
			expect(result.issues[0]?.message).toBe("Unknown animation kind: unknown");
			expect(result.issues[0]?.suggestion).toContain("animation-delay");
			expect(result.issues[0]?.suggestion).toContain("animation-duration");
			expect(result.issues[0]?.suggestion).toContain("animation-timing-function");
		});
	});
});
