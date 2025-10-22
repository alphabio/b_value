// b_path:: src/generate/layout/overflow.generate.test.ts

import { describe, expect, it } from "vitest";
import * as OverflowGen from "./overflow.generate";

describe("generate/layout/overflow", () => {
	it("generates visible", () => {
		expect(OverflowGen.toCss("visible")).toBe("visible");
	});

	it("generates hidden", () => {
		expect(OverflowGen.toCss("hidden")).toBe("hidden");
	});

	it("generates clip", () => {
		expect(OverflowGen.toCss("clip")).toBe("clip");
	});

	it("generates scroll", () => {
		expect(OverflowGen.toCss("scroll")).toBe("scroll");
	});

	it("generates auto", () => {
		expect(OverflowGen.toCss("auto")).toBe("auto");
	});
});
