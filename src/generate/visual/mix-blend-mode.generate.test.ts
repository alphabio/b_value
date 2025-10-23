import { describe, expect, it } from "vitest";
import { generateMixBlendMode } from "./mix-blend-mode.generate";

describe("generate mix-blend-mode", () => {
	it("generates 'normal'", () => {
		const result = generateMixBlendMode({ kind: "mix-blend-mode", mode: "normal" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("normal");
		}
	});

	it("generates 'multiply'", () => {
		const result = generateMixBlendMode({ kind: "mix-blend-mode", mode: "multiply" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("multiply");
		}
	});

	it("generates 'screen'", () => {
		const result = generateMixBlendMode({ kind: "mix-blend-mode", mode: "screen" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("screen");
		}
	});

	it("generates 'darken'", () => {
		const result = generateMixBlendMode({ kind: "mix-blend-mode", mode: "darken" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("darken");
		}
	});

	it("generates 'lighten'", () => {
		const result = generateMixBlendMode({ kind: "mix-blend-mode", mode: "lighten" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("lighten");
		}
	});
});
