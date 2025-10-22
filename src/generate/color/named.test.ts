import { describe, expect, test } from "vitest";
import { generate } from "./named";

describe("named color generator", () => {
	test("should generate basic named color", () => {
		const result = generate({ kind: "named", name: "red" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("red");
	});

	test("should generate compound named color", () => {
		const result = generate({ kind: "named", name: "cornflowerblue" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("cornflowerblue");
	});

	test("should generate 'white' color", () => {
		const result = generate({ kind: "named", name: "white" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("white");
	});

	test("should generate 'black' color", () => {
		const result = generate({ kind: "named", name: "black" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("black");
	});
});
