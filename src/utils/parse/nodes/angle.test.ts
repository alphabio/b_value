import { describe, expect, it } from "vitest";
import { parseAngleNode } from "./angle";

describe("parseAngleNode", () => {
	it("parses degrees", () => {
		const node = { type: "Dimension" as const, value: "45", unit: "deg" };
		const result = parseAngleNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ value: 45, unit: "deg" });
		}
	});

	it("parses radians", () => {
		const node = { type: "Dimension" as const, value: "1.57", unit: "rad" };
		const result = parseAngleNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ value: 1.57, unit: "rad" });
		}
	});

	it("parses gradians", () => {
		const node = { type: "Dimension" as const, value: "100", unit: "grad" };
		const result = parseAngleNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ value: 100, unit: "grad" });
		}
	});

	it("parses turns", () => {
		const node = { type: "Dimension" as const, value: "0.5", unit: "turn" };
		const result = parseAngleNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ value: 0.5, unit: "turn" });
		}
	});

	it("parses zero", () => {
		const node = { type: "Dimension" as const, value: "0", unit: "deg" };
		const result = parseAngleNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ value: 0, unit: "deg" });
		}
	});

	it("parses negative angles", () => {
		const node = { type: "Dimension" as const, value: "-45", unit: "deg" };
		const result = parseAngleNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ value: -45, unit: "deg" });
		}
	});

	it("rejects invalid unit", () => {
		const node = { type: "Dimension" as const, value: "45", unit: "px" };
		const result = parseAngleNode(node);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Invalid angle unit");
		}
	});

	it("rejects non-dimension node", () => {
		const node = { type: "Number" as const, value: "45" };
		const result = parseAngleNode(node);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Expected angle dimension");
		}
	});

	it("rejects NaN value", () => {
		const node = { type: "Dimension" as const, value: "abc", unit: "deg" };
		const result = parseAngleNode(node);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Invalid angle value");
		}
	});
});
