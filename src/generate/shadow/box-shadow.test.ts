// b_path:: src/generate/shadow/box-shadow.test.ts
import { describe, expect, it } from "vitest";
import { generate } from "./box-shadow";

describe("generateBoxShadow", () => {
	it("generates basic shadow with offsets only", () => {
		const result = generate({
			kind: "box-shadow",
			shadows: [
				{
					offsetX: { value: 2, unit: "px" },
					offsetY: { value: 2, unit: "px" },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("2px 2px");
		}
	});

	it("generates shadow with blur radius", () => {
		const result = generate({
			kind: "box-shadow",
			shadows: [
				{
					offsetX: { value: 2, unit: "px" },
					offsetY: { value: 2, unit: "px" },
					blurRadius: { value: 4, unit: "px" },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("2px 2px 4px");
		}
	});

	it("generates shadow with blur and spread", () => {
		const result = generate({
			kind: "box-shadow",
			shadows: [
				{
					offsetX: { value: 2, unit: "px" },
					offsetY: { value: 2, unit: "px" },
					blurRadius: { value: 4, unit: "px" },
					spreadRadius: { value: 2, unit: "px" },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("2px 2px 4px 2px");
		}
	});

	it("generates shadow with color", () => {
		const result = generate({
			kind: "box-shadow",
			shadows: [
				{
					offsetX: { value: 2, unit: "px" },
					offsetY: { value: 2, unit: "px" },
					color: { kind: "named", name: "black" },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("2px 2px black");
		}
	});

	it("generates inset shadow", () => {
		const result = generate({
			kind: "box-shadow",
			shadows: [
				{
					inset: true,
					offsetX: { value: 0, unit: "px" },
					offsetY: { value: 0, unit: "px" },
					blurRadius: { value: 10, unit: "px" },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("inset 0px 0px 10px");
		}
	});

	it("generates complete shadow with all properties", () => {
		const result = generate({
			kind: "box-shadow",
			shadows: [
				{
					inset: true,
					offsetX: { value: 2, unit: "px" },
					offsetY: { value: 2, unit: "px" },
					blurRadius: { value: 4, unit: "px" },
					spreadRadius: { value: 1, unit: "px" },
					color: { kind: "hex", value: "#000000" },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("inset 2px 2px 4px 1px #000000");
		}
	});

	it("generates multiple shadows", () => {
		const result = generate({
			kind: "box-shadow",
			shadows: [
				{
					offsetX: { value: 2, unit: "px" },
					offsetY: { value: 2, unit: "px" },
					color: { kind: "named", name: "black" },
				},
				{
					inset: true,
					offsetX: { value: 0, unit: "px" },
					offsetY: { value: 0, unit: "px" },
					blurRadius: { value: 10, unit: "px" },
					color: { kind: "named", name: "white" },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("2px 2px black, inset 0px 0px 10px white");
		}
	});

	it("preserves different length units", () => {
		const result = generate({
			kind: "box-shadow",
			shadows: [
				{
					offsetX: { value: 1, unit: "em" },
					offsetY: { value: 1, unit: "rem" },
					blurRadius: { value: 2, unit: "vh" },
					spreadRadius: { value: 0.5, unit: "vw" },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("1em 1rem 2vh 0.5vw");
		}
	});

	it("handles negative offsets", () => {
		const result = generate({
			kind: "box-shadow",
			shadows: [
				{
					offsetX: { value: -2, unit: "px" },
					offsetY: { value: -2, unit: "px" },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("-2px -2px");
		}
	});

	it("handles zero values", () => {
		const result = generate({
			kind: "box-shadow",
			shadows: [
				{
					offsetX: { value: 0, unit: "px" },
					offsetY: { value: 0, unit: "px" },
					blurRadius: { value: 0, unit: "px" },
					spreadRadius: { value: 0, unit: "px" },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("0px 0px 0px 0px");
		}
	});

	it("generates shadow with rgba color", () => {
		const result = generate({
			kind: "box-shadow",
			shadows: [
				{
					offsetX: { value: 2, unit: "px" },
					offsetY: { value: 2, unit: "px" },
					blurRadius: { value: 4, unit: "px" },
					color: { kind: "rgb", r: 0, g: 0, b: 0, alpha: 0.5 },
				},
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("2px 2px 4px rgb(0 0 0 / 0.5)");
		}
	});

	it("rejects null input", () => {
		// biome-ignore lint/suspicious/noExplicitAny: testing invalid input
		const result = generate(null as any);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues[0]?.code).toBe("invalid-ir");
		}
	});

	it("rejects undefined input", () => {
		// biome-ignore lint/suspicious/noExplicitAny: testing invalid input
		const result = generate(undefined as any);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues[0]?.code).toBe("invalid-ir");
		}
	});
});
