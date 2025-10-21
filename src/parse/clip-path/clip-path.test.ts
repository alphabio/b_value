// b_path:: src/parse/clip-path/clip-path.test.ts

import { describe, expect, it } from "vitest";
import { parse } from "./clip-path";

describe("parse() - unified dispatcher", () => {
	describe("basic shapes", () => {
		it("detects circle()", () => {
			const result = parse("circle(50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-circle");
			}
		});

		it("detects ellipse()", () => {
			const result = parse("ellipse(50% 30%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-ellipse");
			}
		});

		it("detects inset()", () => {
			const result = parse("inset(10px)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-inset");
			}
		});

		it("detects polygon()", () => {
			const result = parse("polygon(0 0, 100% 0, 100% 100%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-polygon");
			}
		});

		it("detects rect()", () => {
			const result = parse("rect(10px 20px 30px 40px)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-rect");
			}
		});

		it("detects xywh()", () => {
			const result = parse("xywh(10px 20px 30px 40px)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-xywh");
			}
		});

		it("detects path()", () => {
			const result = parse('path("M 10 10 L 50 50")');
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-path");
			}
		});
	});

	describe("keywords", () => {
		it("detects none", () => {
			const result = parse("none");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-none");
			}
		});
	});

	describe("geometry-box keywords", () => {
		it("detects border-box", () => {
			const result = parse("border-box");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-geometry-box");
				if (result.value.kind === "clip-path-geometry-box") {
					expect(result.value.value).toBe("border-box");
				}
			}
		});

		it("detects padding-box", () => {
			const result = parse("padding-box");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-geometry-box");
				if (result.value.kind === "clip-path-geometry-box") {
					expect(result.value.value).toBe("padding-box");
				}
			}
		});

		it("detects content-box", () => {
			const result = parse("content-box");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-geometry-box");
				if (result.value.kind === "clip-path-geometry-box") {
					expect(result.value.value).toBe("content-box");
				}
			}
		});

		it("detects fill-box", () => {
			const result = parse("fill-box");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-geometry-box");
				if (result.value.kind === "clip-path-geometry-box") {
					expect(result.value.value).toBe("fill-box");
				}
			}
		});

		it("detects stroke-box", () => {
			const result = parse("stroke-box");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-geometry-box");
				if (result.value.kind === "clip-path-geometry-box") {
					expect(result.value.value).toBe("stroke-box");
				}
			}
		});

		it("detects view-box", () => {
			const result = parse("view-box");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-geometry-box");
				if (result.value.kind === "clip-path-geometry-box") {
					expect(result.value.value).toBe("view-box");
				}
			}
		});
	});

	describe("url reference", () => {
		it("detects url()", () => {
			const result = parse("url(#clip-shape)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("url");
				if (result.value.kind === "url") {
					expect(result.value.value).toBe("#clip-shape");
				}
			}
		});
	});

	describe("error cases", () => {
		it("rejects empty value", () => {
			const result = parse("");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Empty");
			}
		});

		it("rejects unknown function", () => {
			const result = parse("unknown(10px)");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Unknown clip-path function");
			}
		});

		it("rejects invalid identifier", () => {
			const result = parse("invalid-keyword");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Invalid geometry-box value");
			}
		});
	});

	describe("case insensitivity", () => {
		it("handles CIRCLE()", () => {
			const result = parse("CIRCLE(50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-circle");
			}
		});

		it("handles Polygon()", () => {
			const result = parse("Polygon(0 0, 100% 0, 100% 100%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-polygon");
			}
		});
	});
});
