// b_path:: src/generate/layout/overflow.generate.test.ts

import { describe, expect, it } from "vitest";
import * as OverflowGen from "./overflow.generate";

describe("generate/layout/overflow", () => {
	it("generates visible", () => {
		expect(OverflowGen.generate("visible")).toBe("visible");
	});

	it("generates hidden", () => {
		expect(OverflowGen.generate("hidden")).toBe("hidden");
	});

	it("generates clip", () => {
		expect(OverflowGen.generate("clip")).toBe("clip");
	});

	it("generates scroll", () => {
		expect(OverflowGen.generate("scroll")).toBe("scroll");
	});

	it("generates auto", () => {
		expect(OverflowGen.generate("auto")).toBe("auto");
	});
});
