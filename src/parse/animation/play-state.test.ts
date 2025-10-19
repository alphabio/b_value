// b_path:: src/parse/animation/play-state.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "./play-state";

describe("Animation Play State Parser", () => {
	it("should parse running keyword", () => {
		const result = Parser.parse("running");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("animation-play-state");
			expect(result.value.states).toEqual(["running"]);
		}
	});

	it("should parse paused keyword", () => {
		const result = Parser.parse("paused");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.states).toEqual(["paused"]);
		}
	});

	it("should parse multiple states", () => {
		const result = Parser.parse("running, paused");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.states).toEqual(["running", "paused"]);
		}
	});

	it("should handle whitespace", () => {
		const result = Parser.parse("running , paused");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.states).toHaveLength(2);
		}
	});

	it("should handle case insensitive", () => {
		const result = Parser.parse("PAUSED");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.states).toEqual(["paused"]);
		}
	});

	it("should reject invalid keyword", () => {
		const result = Parser.parse("stopped");
		expect(result.ok).toBe(false);
	});

	it("should reject empty value", () => {
		const result = Parser.parse("");
		expect(result.ok).toBe(false);
	});
});
