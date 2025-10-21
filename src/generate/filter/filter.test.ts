// b_path:: src/generate/filter/filter.test.ts

import { describe, expect, test } from "vitest";
import type * as Type from "@/core/types";
import { generate } from "./filter";

describe("Filter.generate()", () => {
	test("generates blur", () => {
		const filter: Type.FilterFunction = { kind: "blur", radius: { value: 5, unit: "px" } };
		const result = generate(filter);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("blur(5px)");
		}
	});

	test("generates brightness", () => {
		const filter: Type.FilterFunction = { kind: "brightness", value: 150 };
		const result = generate(filter);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("brightness(150)");
		}
	});

	test("generates contrast", () => {
		const filter: Type.FilterFunction = { kind: "contrast", value: 75 };
		const result = generate(filter);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("contrast(75)");
		}
	});

	test("generates grayscale", () => {
		const filter: Type.FilterFunction = { kind: "grayscale", value: 100 };
		const result = generate(filter);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("grayscale(100)");
		}
	});

	test("generates hue-rotate", () => {
		const filter: Type.FilterFunction = { kind: "hue-rotate", angle: { value: 90, unit: "deg" } };
		const result = generate(filter);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("hue-rotate(90deg)");
		}
	});

	test("generates invert", () => {
		const filter: Type.FilterFunction = { kind: "invert", value: 50 };
		const result = generate(filter);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("invert(50)");
		}
	});

	test("generates opacity", () => {
		const filter: Type.FilterFunction = { kind: "opacity", value: 75 };
		const result = generate(filter);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("opacity(75)");
		}
	});

	test("generates saturate", () => {
		const filter: Type.FilterFunction = { kind: "saturate", value: 200 };
		const result = generate(filter);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("saturate(200)");
		}
	});

	test("generates sepia", () => {
		const filter: Type.FilterFunction = { kind: "sepia", value: 80 };
		const result = generate(filter);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("sepia(80)");
		}
	});

	test("generates url", () => {
		const filter: Type.FilterFunction = { kind: "url", url: "#filter-id" };
		const result = generate(filter);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("url(#filter-id)");
		}
	});

	test("returns error for missing kind", () => {
		const filter = {} as Type.FilterFunction;
		const result = generate(filter);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues[0]?.message).toContain("missing 'kind' field");
		}
	});
});
