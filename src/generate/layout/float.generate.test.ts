// b_path:: src/generate/layout/float.generate.test.ts

import { describe, expect, it } from "vitest";
import * as FloatGen from "./float.generate";

describe("generate/layout/float", () => {
	it("generates left", () => {
		expect(FloatGen.toCss("left")).toBe("left");
	});

	it("generates right", () => {
		expect(FloatGen.toCss("right")).toBe("right");
	});

	it("generates none", () => {
		expect(FloatGen.toCss("none")).toBe("none");
	});

	it("generates inline-start", () => {
		expect(FloatGen.toCss("inline-start")).toBe("inline-start");
	});

	it("generates inline-end", () => {
		expect(FloatGen.toCss("inline-end")).toBe("inline-end");
	});
});
