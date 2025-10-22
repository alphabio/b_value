// b_path:: src/generate/layout/clear.generate.test.ts

import { describe, expect, it } from "vitest";
import * as ClearGen from "./clear.generate";

describe("generate/layout/clear", () => {
	it("generates left", () => {
		expect(ClearGen.generate("left")).toBe("left");
	});

	it("generates right", () => {
		expect(ClearGen.generate("right")).toBe("right");
	});

	it("generates both", () => {
		expect(ClearGen.generate("both")).toBe("both");
	});

	it("generates none", () => {
		expect(ClearGen.generate("none")).toBe("none");
	});

	it("generates inline-start", () => {
		expect(ClearGen.generate("inline-start")).toBe("inline-start");
	});

	it("generates inline-end", () => {
		expect(ClearGen.generate("inline-end")).toBe("inline-end");
	});
});
