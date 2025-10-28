// b_path:: src/core/types/border.test.ts
import { describe, expect, it } from "vitest";
import {
	type BorderColor,
	type BorderColorValue,
	type BorderSides,
	type BorderStyle,
	type BorderStyleValue,
	type BorderWidth,
	type BorderWidthValue,
	borderColorSchema,
	borderColorValueSchema,
	borderRadiusValueSchema,
	borderSidesSchema,
	borderStyleSchema,
	borderStyleValueSchema,
	borderWidthSchema,
	borderWidthValueSchema,
	type UnifiedBorder,
	unifiedBorderSchema,
} from "./border";

describe("borderWidthSchema", () => {
	it("accepts length values", () => {
		const result = borderWidthSchema.safeParse({ value: 1, unit: "px" });
		expect(result.success).toBe(true);
	});

	it("accepts border-width keywords", () => {
		const keywords = ["thin", "medium", "thick"];
		for (const keyword of keywords) {
			expect(borderWidthSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid values", () => {
		expect(borderWidthSchema.safeParse("invalid").success).toBe(false);
		expect(borderWidthSchema.safeParse(123).success).toBe(false);
	});
});

describe("borderStyleSchema", () => {
	it("accepts border-style keywords", () => {
		const keywords = ["none", "solid", "dashed", "dotted", "double"];
		for (const keyword of keywords) {
			expect(borderStyleSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid values", () => {
		expect(borderStyleSchema.safeParse("invalid").success).toBe(false);
	});
});

describe("borderColorSchema", () => {
	it("accepts color keywords", () => {
		const keywords = ["currentcolor", "transparent", "red", "#ff0000"];
		for (const keyword of keywords) {
			expect(borderColorSchema.safeParse(keyword).success).toBe(true);
		}
	});
});

describe("borderSidesSchema", () => {
	it("accepts array of sides", () => {
		const result = borderSidesSchema.safeParse(["top", "bottom"]);
		expect(result.success).toBe(true);
	});

	it("accepts undefined (optional)", () => {
		const result = borderSidesSchema.safeParse(undefined);
		expect(result.success).toBe(true);
	});

	it("rejects invalid sides", () => {
		const result = borderSidesSchema.safeParse(["invalid"]);
		expect(result.success).toBe(false);
	});
});

describe("unifiedBorderSchema", () => {
	it("validates unified border object", () => {
		const border: UnifiedBorder = {
			sides: ["top"],
			width: { value: 1, unit: "px" },
			style: "solid",
			color: "red",
		};
		const result = unifiedBorderSchema.safeParse(border);
		expect(result.success).toBe(true);
	});

	it("accepts border without sides", () => {
		const border = {
			width: "thin",
			style: "dashed",
			color: "transparent",
		};
		const result = unifiedBorderSchema.safeParse(border);
		expect(result.success).toBe(true);
	});
});

describe("borderWidthValueSchema", () => {
	it("validates border-width property IR", () => {
		const value: BorderWidthValue = {
			kind: "border-width",
			width: { value: 2, unit: "px" },
		};
		const result = borderWidthValueSchema.safeParse(value);
		expect(result.success).toBe(true);
	});

	it("accepts keyword width", () => {
		const value: BorderWidthValue = {
			kind: "border-width",
			width: "medium",
		};
		const result = borderWidthValueSchema.safeParse(value);
		expect(result.success).toBe(true);
	});

	it("rejects wrong kind", () => {
		const value = {
			kind: "wrong-kind",
			width: { value: 1, unit: "px" },
		};
		const result = borderWidthValueSchema.safeParse(value);
		expect(result.success).toBe(false);
	});
});

describe("borderStyleValueSchema", () => {
	it("validates border-style property IR", () => {
		const value: BorderStyleValue = {
			kind: "border-style",
			style: "solid",
		};
		const result = borderStyleValueSchema.safeParse(value);
		expect(result.success).toBe(true);
	});

	it("accepts all valid styles", () => {
		const styles = ["none", "solid", "dashed", "dotted", "double"];
		for (const style of styles) {
			const value = { kind: "border-style" as const, style };
			expect(borderStyleValueSchema.safeParse(value).success).toBe(true);
		}
	});
});

describe("borderColorValueSchema", () => {
	it("validates border-color property IR", () => {
		const value: BorderColorValue = {
			kind: "border-color",
			color: "red",
		};
		const result = borderColorValueSchema.safeParse(value);
		expect(result.success).toBe(true);
	});
});

describe("borderRadiusValueSchema", () => {
	it("validates border-radius property IR", () => {
		const value = {
			kind: "border-radius",
			radius: { value: 4, unit: "px" },
		};
		const result = borderRadiusValueSchema.safeParse(value);
		expect(result.success).toBe(true);
	});

	it("accepts percentage values", () => {
		const value = {
			kind: "border-radius",
			radius: { value: 50, unit: "%" },
		};
		const result = borderRadiusValueSchema.safeParse(value);
		expect(result.success).toBe(true);
	});

	it("rejects wrong kind", () => {
		const value = {
			kind: "wrong-kind",
			radius: { value: 4, unit: "px" },
		};
		const result = borderRadiusValueSchema.safeParse(value);
		expect(result.success).toBe(false);
	});
});

describe("Type exports", () => {
	it("exports BorderWidth type", () => {
		const width: BorderWidth = { value: 1, unit: "px" };
		expect(width).toBeDefined();
	});

	it("exports BorderStyle type", () => {
		const style: BorderStyle = "solid";
		expect(style).toBeDefined();
	});

	it("exports BorderColor type", () => {
		const color: BorderColor = "red";
		expect(color).toBeDefined();
	});

	it("exports BorderSides type", () => {
		const sides: BorderSides = ["top", "bottom"];
		expect(sides).toBeDefined();
	});
});
