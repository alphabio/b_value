import { describe, expect, it } from "vitest";
import { generateBackgroundBlendMode } from "./background-blend-mode.generate";

describe("generate background-blend-mode", () => {
	it("generates 'normal'", () => {
		const result = generateBackgroundBlendMode({ kind: "background-blend-mode", mode: "normal" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("normal");
		}
	});

	it("generates 'multiply'", () => {
		const result = generateBackgroundBlendMode({ kind: "background-blend-mode", mode: "multiply" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("multiply");
		}
	});

	it("generates 'screen'", () => {
		const result = generateBackgroundBlendMode({ kind: "background-blend-mode", mode: "screen" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("screen");
		}
	});

	it("generates 'overlay'", () => {
		const result = generateBackgroundBlendMode({ kind: "background-blend-mode", mode: "overlay" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("overlay");
		}
	});

	it("generates 'color-dodge'", () => {
		const result = generateBackgroundBlendMode({ kind: "background-blend-mode", mode: "color-dodge" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("color-dodge");
		}
	});
});
