// b_path:: src/core/types/box-model.test.ts
import { describe, expect, it } from "vitest";
import type { BoxSides, UnifiedMargin, UnifiedPadding } from "./box-model";
import { boxSidesSchema, unifiedMarginSchema, unifiedPaddingSchema } from "./box-model";

describe("boxSidesSchema", () => {
	it("accepts valid side arrays", () => {
		const validSides: BoxSides[] = [
			["top"],
			["right"],
			["bottom"],
			["left"],
			["top", "bottom"],
			["left", "right"],
			["top", "right", "bottom", "left"],
		];

		for (const sides of validSides) {
			expect(boxSidesSchema.safeParse(sides).success).toBe(true);
		}
	});

	it("accepts undefined (optional)", () => {
		expect(boxSidesSchema.safeParse(undefined).success).toBe(true);
	});

	it("rejects invalid side names", () => {
		expect(boxSidesSchema.safeParse(["invalid"]).success).toBe(false);
		expect(boxSidesSchema.safeParse(["center"]).success).toBe(false);
	});

	it("rejects non-array values", () => {
		expect(boxSidesSchema.safeParse("top").success).toBe(false);
		expect(boxSidesSchema.safeParse(123).success).toBe(false);
	});
});

describe("unifiedMarginSchema", () => {
	it("accepts valid margin with all sides", () => {
		const margin: UnifiedMargin = {
			value: { value: 10, unit: "px" },
		};
		expect(unifiedMarginSchema.safeParse(margin).success).toBe(true);
	});

	it("accepts valid margin with specific sides", () => {
		const margin: UnifiedMargin = {
			sides: ["top", "bottom"],
			value: { value: 20, unit: "px" },
		};
		expect(unifiedMarginSchema.safeParse(margin).success).toBe(true);
	});

	it("accepts auto value for margin", () => {
		const margin: UnifiedMargin = {
			value: "auto",
		};
		expect(unifiedMarginSchema.safeParse(margin).success).toBe(true);
	});

	it("accepts percentage value for margin", () => {
		const margin: UnifiedMargin = {
			value: { value: 50, unit: "%" },
		};
		expect(unifiedMarginSchema.safeParse(margin).success).toBe(true);
	});

	it("accepts margin without sides (applies to all)", () => {
		const margin = {
			value: { value: 10, unit: "px" },
		};
		expect(unifiedMarginSchema.safeParse(margin).success).toBe(true);
	});
});

describe("unifiedPaddingSchema", () => {
	it("accepts valid padding with all sides", () => {
		const padding: UnifiedPadding = {
			value: { value: 10, unit: "px" },
		};
		expect(unifiedPaddingSchema.safeParse(padding).success).toBe(true);
	});

	it("accepts valid padding with specific sides", () => {
		const padding: UnifiedPadding = {
			sides: ["left", "right"],
			value: { value: 15, unit: "px" },
		};
		expect(unifiedPaddingSchema.safeParse(padding).success).toBe(true);
	});

	it("accepts percentage value for padding", () => {
		const padding: UnifiedPadding = {
			value: { value: 25, unit: "%" },
		};
		expect(unifiedPaddingSchema.safeParse(padding).success).toBe(true);
	});

	it("rejects auto value for padding (not valid for padding)", () => {
		const padding = {
			value: "auto",
		};
		expect(unifiedPaddingSchema.safeParse(padding).success).toBe(false);
	});

	it("accepts padding without sides (applies to all)", () => {
		const padding = {
			value: { value: 10, unit: "px" },
		};
		expect(unifiedPaddingSchema.safeParse(padding).success).toBe(true);
	});

	it("accepts multiple sides", () => {
		const padding: UnifiedPadding = {
			sides: ["top", "right", "bottom"],
			value: { value: 8, unit: "em" },
		};
		expect(unifiedPaddingSchema.safeParse(padding).success).toBe(true);
	});
});

describe("Box model type consistency", () => {
	it("margin and padding schemas are structurally similar", () => {
		const margin = { value: { value: 10, unit: "px" as const } };
		const padding = { value: { value: 10, unit: "px" as const } };

		expect(unifiedMarginSchema.safeParse(margin).success).toBe(true);
		expect(unifiedPaddingSchema.safeParse(padding).success).toBe(true);
	});
});
