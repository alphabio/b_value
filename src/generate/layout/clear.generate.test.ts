// b_path:: src/generate/layout/clear.generate.test.ts

import { describe, expect, it } from "vitest";
import * as ClearGen from "./clear.generate";

describe("generate/layout/clear", () => {
	it("generates left", () => {
		expect(ClearGen.toCss("left")).toBe("left");
	});

	it("generates right", () => {
		expect(ClearGen.toCss("right")).toBe("right");
	});

	it("generates both", () => {
		expect(ClearGen.toCss("both")).toBe("both");
	});

	it("generates none", () => {
		expect(ClearGen.toCss("none")).toBe("none");
	});

	it("generates inline-start", () => {
		expect(ClearGen.toCss("inline-start")).toBe("inline-start");
	});

	it("generates inline-end", () => {
		expect(ClearGen.toCss("inline-end")).toBe("inline-end");
	});
});
