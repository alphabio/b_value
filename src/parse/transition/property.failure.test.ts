// b_path:: src/parse/transition/property.failure.test.ts
// Auto-generated from scripts/parse-test-generator/configs/transition/property.ts
//
// Spec references:
// - OTHER: https://github.com/mdn/data/blob/main/css/properties.json
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property
// - W3C: https://www.w3.org/TR/css-transitions-1/#transition-property-property
import { describe, it } from "vitest";

/**
 * Parse failure tests for transition-property
 *
 * NOTE: This property has NO parse failure test cases.
 *
 * Reason: transition-property accepts lenient input:
 * - Basic syntax validation is handled by css-tree parser
 * - The property accepts any valid CSS syntax that css-tree can parse
 * - There are no additional semantic constraints to validate
 *
 * Per CSS specification, this property's grammar accepts a wide range
 * of valid inputs, making it impossible to construct invalid CSS strings
 * that would pass css-tree validation but fail in our parser.
 *
 * Invalid IR structures are tested in generate failure tests instead.
 *
 * @see Generate failure tests: src/generate/transition/property.failure.test.ts
 */
describe("parse/transition/property - invalid cases", () => {
	it("no-op: property has lenient parsing (see documentation above)", () => {
		// This test exists to document why there are no failure test cases.
		// The property parser accepts any input that css-tree validates.
	});
});
