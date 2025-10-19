// b_path:: src/generate/transform/origin.test.ts
import { describe, expect, it } from "vitest";
import * as Parse from "../../parse/transform/origin";
import * as Origin from "./origin";

describe("Transform.Origin.toCss", () => {
	describe("2D positions - keywords", () => {
		it("generates center", () => {
			const css = Origin.toCss({
				horizontal: "center",
				vertical: "center",
			});
			expect(css).toBe("center center");
		});

		it("generates left top", () => {
			const css = Origin.toCss({
				horizontal: "left",
				vertical: "top",
			});
			expect(css).toBe("left top");
		});

		it("generates right bottom", () => {
			const css = Origin.toCss({
				horizontal: "right",
				vertical: "bottom",
			});
			expect(css).toBe("right bottom");
		});
	});

	describe("2D positions - values", () => {
		it("generates percentage values", () => {
			const css = Origin.toCss({
				horizontal: { value: 50, unit: "%" },
				vertical: { value: 50, unit: "%" },
			});
			expect(css).toBe("50% 50%");
		});

		it("generates pixel values", () => {
			const css = Origin.toCss({
				horizontal: { value: 100, unit: "px" },
				vertical: { value: 200, unit: "px" },
			});
			expect(css).toBe("100px 200px");
		});

		it("generates mixed values", () => {
			const css = Origin.toCss({
				horizontal: "left",
				vertical: { value: 25, unit: "%" },
			});
			expect(css).toBe("left 25%");
		});

		it("generates zero values", () => {
			const css = Origin.toCss({
				horizontal: { value: 0, unit: "px" },
				vertical: { value: 0, unit: "px" },
			});
			expect(css).toBe("0px 0px");
		});
	});

	describe("3D positions", () => {
		it("generates 3D with pixel values", () => {
			const css = Origin.toCss({
				x: { value: 50, unit: "px" },
				y: { value: 100, unit: "px" },
				z: { value: 10, unit: "px" },
			});
			expect(css).toBe("50px 100px 10px");
		});

		it("generates 3D with keywords and z-value", () => {
			const css = Origin.toCss({
				x: "left",
				y: "top",
				z: { value: 20, unit: "px" },
			});
			expect(css).toBe("left top 20px");
		});

		it("generates 3D with center", () => {
			const css = Origin.toCss({
				x: "center",
				y: "center",
				z: { value: 5, unit: "px" },
			});
			expect(css).toBe("center center 5px");
		});
	});

	describe("round-trip validation", () => {
		it("round-trips 2D keywords", () => {
			const original = "left top";
			const parsed = Parse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Origin.toCss(parsed.value);
				const reparsed = Parse.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("round-trips 2D values", () => {
			const original = "50% 100px";
			const parsed = Parse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Origin.toCss(parsed.value);
				const reparsed = Parse.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("round-trips 3D positions", () => {
			const original = "center center 10px";
			const parsed = Parse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Origin.toCss(parsed.value);
				const reparsed = Parse.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("round-trips 3D with values", () => {
			const original = "50px 100px 20px";
			const parsed = Parse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Origin.toCss(parsed.value);
				const reparsed = Parse.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});
	});
});

describe("Transform.PerspectiveOrigin.toCssPerspectiveOrigin", () => {
	describe("2D positions", () => {
		it("generates center", () => {
			const css = Origin.toCssPerspectiveOrigin({
				horizontal: "center",
				vertical: "center",
			});
			expect(css).toBe("center center");
		});

		it("generates percentage values", () => {
			const css = Origin.toCssPerspectiveOrigin({
				horizontal: { value: 50, unit: "%" },
				vertical: { value: 50, unit: "%" },
			});
			expect(css).toBe("50% 50%");
		});

		it("generates mixed values", () => {
			const css = Origin.toCssPerspectiveOrigin({
				horizontal: "left",
				vertical: { value: 75, unit: "%" },
			});
			expect(css).toBe("left 75%");
		});
	});

	describe("round-trip validation", () => {
		it("round-trips keywords", () => {
			const original = "right bottom";
			const parsed = Parse.parsePerspectiveOrigin(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Origin.toCssPerspectiveOrigin(parsed.value);
				const reparsed = Parse.parsePerspectiveOrigin(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("round-trips values", () => {
			const original = "100px 200px";
			const parsed = Parse.parsePerspectiveOrigin(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Origin.toCssPerspectiveOrigin(parsed.value);
				const reparsed = Parse.parsePerspectiveOrigin(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});
	});
});
