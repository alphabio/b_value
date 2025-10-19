// b_path:: src/generate/filter/index.test.ts
import { describe, expect, test } from "vitest";
import type {
	BlurFilter,
	BrightnessFilter,
	ContrastFilter,
	DropShadowFilter,
	GrayscaleFilter,
	HueRotateFilter,
	InvertFilter,
	OpacityFilter,
	SaturateFilter,
	SepiaFilter,
	UrlFilter,
} from "@/core/types/filter";
import { Filter } from "./index";

describe("Filter.toCss() - Master filter generator", () => {
	describe("Generate CSS for all filter types", () => {
		test("generates blur filter", () => {
			const filter: BlurFilter = {
				kind: "blur",
				radius: { value: 5, unit: "px" },
			};
			const css = Filter.toCss(filter);
			expect(css).toBe("blur(5px)");
		});

		test("generates brightness filter", () => {
			const filter: BrightnessFilter = {
				kind: "brightness",
				value: 1.5,
			};
			const css = Filter.toCss(filter);
			expect(css).toBe("brightness(1.5)");
		});

		test("generates contrast filter", () => {
			const filter: ContrastFilter = {
				kind: "contrast",
				value: 2,
			};
			const css = Filter.toCss(filter);
			expect(css).toBe("contrast(2)");
		});

		test("generates drop-shadow filter", () => {
			const filter: DropShadowFilter = {
				kind: "drop-shadow",
				offsetX: { value: 2, unit: "px" },
				offsetY: { value: 2, unit: "px" },
				blurRadius: { value: 4, unit: "px" },
				color: { kind: "named", name: "black" },
			};
			const css = Filter.toCss(filter);
			expect(css).toBe("drop-shadow(2px 2px 4px black)");
		});

		test("generates grayscale filter", () => {
			const filter: GrayscaleFilter = {
				kind: "grayscale",
				value: 0.5,
			};
			const css = Filter.toCss(filter);
			expect(css).toBe("grayscale(0.5)");
		});

		test("generates hue-rotate filter", () => {
			const filter: HueRotateFilter = {
				kind: "hue-rotate",
				angle: { value: 90, unit: "deg" },
			};
			const css = Filter.toCss(filter);
			expect(css).toBe("hue-rotate(90deg)");
		});

		test("generates invert filter", () => {
			const filter: InvertFilter = {
				kind: "invert",
				value: 1,
			};
			const css = Filter.toCss(filter);
			expect(css).toBe("invert(1)");
		});

		test("generates opacity filter", () => {
			const filter: OpacityFilter = {
				kind: "opacity",
				value: 0.5,
			};
			const css = Filter.toCss(filter);
			expect(css).toBe("opacity(0.5)");
		});

		test("generates saturate filter", () => {
			const filter: SaturateFilter = {
				kind: "saturate",
				value: 2,
			};
			const css = Filter.toCss(filter);
			expect(css).toBe("saturate(2)");
		});

		test("generates sepia filter", () => {
			const filter: SepiaFilter = {
				kind: "sepia",
				value: 0.8,
			};
			const css = Filter.toCss(filter);
			expect(css).toBe("sepia(0.8)");
		});

		test("generates url filter", () => {
			const filter: UrlFilter = {
				kind: "url",
				url: "#filter-id",
			};
			const css = Filter.toCss(filter);
			expect(css).toBe("url(#filter-id)");
		});
	});

	describe("Type safety and discriminated union", () => {
		test("TypeScript correctly narrows types", () => {
			const filters: Array<BlurFilter | BrightnessFilter> = [
				{ kind: "blur", radius: { value: 5, unit: "px" } },
				{ kind: "brightness", value: 1.5 },
			];

			const cssResults = filters.map((f) => Filter.toCss(f));
			expect(cssResults).toEqual(["blur(5px)", "brightness(1.5)"]);
		});
	});

	describe("Namespace exports", () => {
		test("exposes individual generators", () => {
			expect(Filter.blur).toBeDefined();
			expect(Filter.brightness).toBeDefined();
			expect(Filter.contrast).toBeDefined();
			expect(Filter.dropShadow).toBeDefined();
			expect(Filter.grayscale).toBeDefined();
			expect(Filter.hueRotate).toBeDefined();
			expect(Filter.invert).toBeDefined();
			expect(Filter.opacity).toBeDefined();
			expect(Filter.saturate).toBeDefined();
			expect(Filter.sepia).toBeDefined();
			expect(Filter.url).toBeDefined();
		});

		test("individual generators work", () => {
			const filter: BlurFilter = {
				kind: "blur",
				radius: { value: 5, unit: "px" },
			};
			const css = Filter.blur.toCss(filter);
			expect(css).toBe("blur(5px)");
		});
	});
});
