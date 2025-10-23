import { describe, expect, it } from "vitest";
import { generate } from "./transition";

describe("generateTransition (dispatcher)", () => {
	describe("transition-duration", () => {
		it("dispatches transition-duration in seconds", () => {
			const result = generate({
				kind: "transition-duration",
				durations: [{ value: 1, unit: "s" }],
			});
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("1s");
			}
		});

		it("dispatches transition-duration in milliseconds", () => {
			const result = generate({
				kind: "transition-duration",
				durations: [{ value: 500, unit: "ms" }],
			});
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("500ms");
			}
		});
	});

	describe("transition-delay", () => {
		it("dispatches transition-delay in seconds", () => {
			const result = generate({
				kind: "transition-delay",
				delays: [{ value: 0.5, unit: "s" }],
			});
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("0.5s");
			}
		});

		it("dispatches transition-delay in milliseconds", () => {
			const result = generate({
				kind: "transition-delay",
				delays: [{ value: 200, unit: "ms" }],
			});
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("200ms");
			}
		});
	});

	describe("transition-timing-function", () => {
		it("dispatches keyword timing function", () => {
			const result = generate({
				kind: "transition-timing-function",
				functions: ["ease-in-out"],
			});
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("ease-in-out");
			}
		});

		it("dispatches cubic-bezier timing function", () => {
			const result = generate({
				kind: "transition-timing-function",
				functions: [{ type: "cubic-bezier", x1: 0.1, y1: 0.7, x2: 1.0, y2: 0.1 }],
			});
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("cubic-bezier(0.1, 0.7, 1, 0.1)");
			}
		});
	});

	describe("transition-property", () => {
		it("dispatches transition-property", () => {
			const result = generate({
				kind: "transition-property",
				properties: [{ type: "custom", value: "opacity" }],
			});
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("opacity");
			}
		});

		it("dispatches all keyword", () => {
			const result = generate({
				kind: "transition-property",
				properties: [{ type: "all" }],
			});
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("all");
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

		it("rejects unknown transition kind", () => {
			const result = generate({ kind: "unknown-transition" } as any);
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.code).toBe("unsupported-kind");
				expect(result.issues[0]?.message).toContain("unknown-transition");
			}
		});
	});
});
