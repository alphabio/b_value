import { describe, expect, it } from "vitest";
import { generate } from "./text-shadow";

describe("generateTextShadow", () => {
	it("generates basic shadow with offsets only", () => {
		const result = generate({
			kind: "text-shadow",
			shadows: [
				{
					offsetX: { value: 1, unit: "px" },
					offsetY: { value: 1, unit: "px" },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("1px 1px");
		}
	});

	it("generates shadow with blur radius", () => {
		const result = generate({
			kind: "text-shadow",
			shadows: [
				{
					offsetX: { value: 1, unit: "px" },
					offsetY: { value: 1, unit: "px" },
					blurRadius: { value: 2, unit: "px" },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("1px 1px 2px");
		}
	});

	it("generates shadow with color", () => {
		const result = generate({
			kind: "text-shadow",
			shadows: [
				{
					offsetX: { value: 1, unit: "px" },
					offsetY: { value: 1, unit: "px" },
					color: { kind: "named", name: "gray" },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("1px 1px gray");
		}
	});

	it("generates complete shadow with all properties", () => {
		const result = generate({
			kind: "text-shadow",
			shadows: [
				{
					offsetX: { value: 1, unit: "px" },
					offsetY: { value: 1, unit: "px" },
					blurRadius: { value: 2, unit: "px" },
					color: { kind: "named", name: "black" },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("1px 1px 2px black");
		}
	});

	it("generates multiple shadows", () => {
		const result = generate({
			kind: "text-shadow",
			shadows: [
				{
					offsetX: { value: 1, unit: "px" },
					offsetY: { value: 1, unit: "px" },
					blurRadius: { value: 2, unit: "px" },
					color: { kind: "named", name: "black" },
				},
				{
					offsetX: { value: -1, unit: "px" },
					offsetY: { value: -1, unit: "px" },
					blurRadius: { value: 2, unit: "px" },
					color: { kind: "named", name: "white" },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("1px 1px 2px black, -1px -1px 2px white");
		}
	});

	it("preserves different length units", () => {
		const result = generate({
			kind: "text-shadow",
			shadows: [
				{
					offsetX: { value: 0.5, unit: "em" },
					offsetY: { value: 0.5, unit: "rem" },
					blurRadius: { value: 1, unit: "vh" },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("0.5em 0.5rem 1vh");
		}
	});

	it("handles negative offsets", () => {
		const result = generate({
			kind: "text-shadow",
			shadows: [
				{
					offsetX: { value: -1, unit: "px" },
					offsetY: { value: -1, unit: "px" },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("-1px -1px");
		}
	});

	it("handles zero values", () => {
		const result = generate({
			kind: "text-shadow",
			shadows: [
				{
					offsetX: { value: 0, unit: "px" },
					offsetY: { value: 0, unit: "px" },
					blurRadius: { value: 0, unit: "px" },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("0px 0px 0px");
		}
	});

	it("generates shadow with hex color", () => {
		const result = generate({
			kind: "text-shadow",
			shadows: [
				{
					offsetX: { value: 2, unit: "px" },
					offsetY: { value: 2, unit: "px" },
					color: { kind: "hex", value: "#333333" },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("2px 2px #333333");
		}
	});

	it("rejects null input", () => {
		const result = generate(null as any);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues[0]?.code).toBe("invalid-ir");
		}
	});

	it("rejects undefined input", () => {
		const result = generate(undefined as any);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues[0]?.code).toBe("invalid-ir");
		}
	});
});
