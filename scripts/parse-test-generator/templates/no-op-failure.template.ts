// b_path:: {{OUTPUT_PATH}}
// Auto-generated from scripts/parse-test-generator/configs/{{MODULE}}/{{PROPERTY}}.ts
//
{{SPEC_REFS}}import { describe, it } from "vitest";

/**
 * Parse failure tests for {{MODULE}}-{{PROPERTY}}
 *
 * NOTE: This property has NO parse failure test cases.
 *
 * Reason: {{MODULE}}-{{PROPERTY}} accepts lenient input:
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
 * @see Generate failure tests: {{GENERATE_FAILURE_PATH}}
 */
describe("parse/{{MODULE}}/{{PROPERTY}} - invalid cases", () => {
it("no-op: property has lenient parsing (see documentation above)", () => {
// This test exists to document why there are no failure test cases.
// The property parser accepts any input that css-tree validates.
});
});
