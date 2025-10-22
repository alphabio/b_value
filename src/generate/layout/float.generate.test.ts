// b_path:: src/generate/layout/float.generate.test.ts

import { describe, expect, it } from "vitest";
import * as FloatGen from "./float.generate";

describe("generate/layout/float", () => {
	it("generates left", () => {
		expect(FloatGen.generate("left")).toBe("left");
	});

	it("generates right", () => {
		expect(FloatGen.generate("right")).toBe("right");
	});

	it("generates none", () => {
		expect(FloatGen.generate("none")).toBe("none");
	});

	it("generates inline-start", () => {
		expect(FloatGen.generate("inline-start")).toBe("inline-start");
	});

	it("generates inline-end", () => {
		expect(FloatGen.generate("inline-end")).toBe("inline-end");
	});
});
