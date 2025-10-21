// b_path:: src/parse/animation/animation.test.ts

import { describe, expect, test } from "vitest";
import { parse } from "./animation";

describe("parse() - auto-detection", () => {
	describe("duration", () => {
		test("detects time values", () => {
			const result = parse("1s");
			expect(result.ok).toBe(true);
			expect(result.value?.kind).toBe("animation-duration");
		});

		test("detects auto", () => {
			const result = parse("auto");
			expect(result.ok).toBe(true);
			expect(result.value?.kind).toBe("animation-duration");
		});
	});

	describe("delay", () => {
		test("detects delay values", () => {
			const result = parse("500ms");
			expect(result.ok).toBe(true);
			// Note: Ambiguous with duration - duration takes precedence
			expect(result.value?.kind).toBe("animation-duration");
		});
	});

	describe("timing-function", () => {
		test("detects ease keywords", () => {
			const result = parse("ease-in-out");
			expect(result.ok).toBe(true);
			expect(result.value?.kind).toBe("animation-timing-function");
		});

		test("detects cubic-bezier", () => {
			const result = parse("cubic-bezier(0.1, 0.7, 1.0, 0.1)");
			expect(result.ok).toBe(true);
			expect(result.value?.kind).toBe("animation-timing-function");
		});

		test("detects steps", () => {
			const result = parse("steps(4, end)");
			expect(result.ok).toBe(true);
			expect(result.value?.kind).toBe("animation-timing-function");
		});
	});

	describe("iteration-count", () => {
		test("detects infinite", () => {
			const result = parse("infinite");
			expect(result.ok).toBe(true);
			expect(result.value?.kind).toBe("animation-iteration-count");
		});

		test("detects number", () => {
			const result = parse("2.5");
			expect(result.ok).toBe(true);
			expect(result.value?.kind).toBe("animation-iteration-count");
		});
	});

	describe("direction", () => {
		test("detects normal", () => {
			const result = parse("normal");
			expect(result.ok).toBe(true);
			expect(result.value?.kind).toBe("animation-direction");
		});

		test("detects alternate", () => {
			const result = parse("alternate");
			expect(result.ok).toBe(true);
			expect(result.value?.kind).toBe("animation-direction");
		});

		test("detects reverse", () => {
			const result = parse("reverse");
			expect(result.ok).toBe(true);
			expect(result.value?.kind).toBe("animation-direction");
		});
	});

	describe("fill-mode", () => {
		test("detects forwards", () => {
			const result = parse("forwards");
			expect(result.ok).toBe(true);
			expect(result.value?.kind).toBe("animation-fill-mode");
		});

		test("detects backwards", () => {
			const result = parse("backwards");
			expect(result.ok).toBe(true);
			expect(result.value?.kind).toBe("animation-fill-mode");
		});

		test("detects both", () => {
			const result = parse("both");
			expect(result.ok).toBe(true);
			expect(result.value?.kind).toBe("animation-fill-mode");
		});
	});

	describe("play-state", () => {
		test("detects running", () => {
			const result = parse("running");
			expect(result.ok).toBe(true);
			expect(result.value?.kind).toBe("animation-play-state");
		});

		test("detects paused", () => {
			const result = parse("paused");
			expect(result.ok).toBe(true);
			expect(result.value?.kind).toBe("animation-play-state");
		});
	});

	describe("name", () => {
		test("detects custom name", () => {
			const result = parse("slideIn");
			expect(result.ok).toBe(true);
			expect(result.value?.kind).toBe("animation-name");
		});

		test("none matches fill-mode first (ambiguous)", () => {
			// "none" is valid for both fill-mode and animation-name
			// fill-mode parser comes first in dispatch order
			const result = parse("none");
			expect(result.ok).toBe(true);
			expect(result.value?.kind).toBe("animation-fill-mode");
		});
	});

	describe("error handling", () => {
		test("rejects truly invalid value", () => {
			const result = parse("@invalid");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues).toHaveLength(1);
				expect(result.issues[0]?.severity).toBe("error");
				expect(result.issues[0]?.message).toContain("Invalid animation property value");
			}
		});

		test("provides helpful suggestion", () => {
			const result = parse("@bad");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.suggestion).toBeDefined();
			}
		});
	});
});
