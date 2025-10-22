/**
 * Batch API Examples - parseAll() and generateAll()
 *
 * This example shows how to use the batch API for parsing and generating
 * multiple CSS properties at once. Perfect for CSS editors and style manipulation tools.
 */

import { generateAll, parseAll } from "../src/index";

console.log("=== Batch API Examples ===\n");

// ============================================================================
// Example 1: Basic Usage - Parse Multiple Properties
// ============================================================================
console.log("1. Basic parseAll() usage:");
console.log("─────────────────────────────");

const css1 = "color: red; width: 100px; opacity: 0.5";
const result1 = parseAll(css1);

if (result1.ok) {
	console.log(result1);

	console.log("✓ Successfully parsed 3 properties");
	console.log("  color:", JSON.stringify(result1.value?.color));
	console.log("  width:", JSON.stringify(result1.value?.width));
	console.log("  opacity:", JSON.stringify(result1.value?.opacity));
} else {
	console.log("✗ Parse failed:", result1.issues);
}

console.log("\n");

// ============================================================================
// Example 2: Generate CSS from IR
// ============================================================================
console.log("2. Basic generateAll() usage:");
console.log("─────────────────────────────");

const generated1 = generateAll({
	color: { kind: "hex", value: "#FF0000" },
	width: { kind: "width", value: { value: 100, unit: "px" } },
	opacity: { kind: "opacity", value: 0.8 },
});

console.log("Generated CSS:", generated1);
console.log("\n");

// ============================================================================
// Example 3: CSS Editor Use Case - Round Trip
// ============================================================================
console.log("3. CSS Editor Round-Trip:");
console.log("─────────────────────────────");

// User's initial CSS
const userCSS = "color: blue; font-size: 16px; line-height: 1.5";
console.log("Initial CSS:", userCSS);

// Parse it
const parsed = parseAll(userCSS);

if (parsed.ok && parsed.value) {
	console.log("✓ Parsed successfully");

	// User modifies color in UI
	parsed.value.color = { kind: "hex", value: "#FF6B00" };
	console.log("✓ Modified color to #FF6B00");

	// Generate updated CSS
	const updatedCSS = generateAll(parsed.value);
	console.log("Updated CSS:", updatedCSS);

	// Verify round-trip
	const reparsed = parseAll(updatedCSS);
	console.log("✓ Round-trip successful:", reparsed.ok);
}

console.log("\n");

// ============================================================================
// Example 4: Error Handling - Invalid Values
// ============================================================================
console.log("4. Error Handling:");
console.log("─────────────────────────────");

const invalidCSS = "color: notacolor; width: 100px; height: invalid";
const result2 = parseAll(invalidCSS);

console.log("Parse result - ok:", result2.ok); // false
console.log("Issues found:", result2.issues.length);

result2.issues.forEach((issue) => {
	console.log(`  - [${issue.severity}] ${issue.property}: ${issue.message}`);
});

console.log("\nInvalid values preserved as strings:");
console.log("  color:", result2.value?.color); // "notacolor"
console.log("  width:", JSON.stringify(result2.value?.width)); // IR object
console.log("  height:", result2.value?.height); // "invalid"

console.log("\n");

// ============================================================================
// Example 5: Duplicate Properties
// ============================================================================
console.log("5. Duplicate Property Handling:");
console.log("─────────────────────────────");

const duplicateCSS = "color: red; width: 100px; color: blue";
const result3 = parseAll(duplicateCSS);

console.log("Parse result - ok:", result3.ok); // true (warning, not error)
console.log("Final color value:", JSON.stringify(result3.value?.color)); // blue (last wins)

console.log("\nWarning issued:");
result3.issues.forEach((issue) => {
	if (issue.severity === "warning") {
		console.log(`  [${issue.severity}] ${issue.message}`);
	}
});

console.log("\n");

// ============================================================================
// Example 6: String Passthrough
// ============================================================================
console.log("6. String Passthrough (Unknown/Shorthand):");
console.log("─────────────────────────────");

const mixedCSS = "color: red; border: 1px solid black; width: 100px";
const result4 = parseAll(mixedCSS);

console.log("Parse result - ok:", result4.ok); // false (border is shorthand)
console.log("\nParsed values:");
console.log("  color:", JSON.stringify(result4.value?.color)); // IR object
console.log("  border:", result4.value?.border); // "1px solid black" (string)
console.log("  width:", JSON.stringify(result4.value?.width)); // IR object

// Can still generate CSS with string values
const generated2 = generateAll(result4);
console.log("\nGenerated CSS:", generated2);

console.log("\n");

// ============================================================================
// Example 7: Minification
// ============================================================================
console.log("7. Minification:");
console.log("─────────────────────────────");

const values = {
	color: { kind: "named", name: "red" },
	width: { kind: "width", value: { value: 100, unit: "px" } },
	opacity: { kind: "opacity", value: 0.5 },
};

const normal = generateAll(values);
const minified = generateAll(values, { minify: true });

console.log("Normal:   ", normal);
console.log("Minified: ", minified);

console.log("\n");

// ============================================================================
// Example 8: Complex Properties
// ============================================================================
console.log("8. Complex Properties (Transform, Filter):");
console.log("─────────────────────────────");

const complexCSS = "transform: rotate(45deg) scale(1.5); filter: blur(5px); background-position: center top";
const result5 = parseAll(complexCSS);

if (result5.ok) {
	console.log("✓ Successfully parsed complex properties");
	console.log("  transform:", JSON.stringify(result5.value?.transform));
	console.log("  filter:", JSON.stringify(result5.value?.filter));
	console.log("  background-position:", JSON.stringify(result5.value?.["background-position"]));

	// Generate back
	const generated3 = generateAll(result5);
	console.log("\nGenerated CSS:", generated3);
}

console.log("\n");

// ============================================================================
// Example 9: CSS Editor with Validation UI
// ============================================================================
console.log("9. CSS Editor with Validation:");
console.log("─────────────────────────────");

function cssEditorSimulation(css: string) {
	console.log("User input:", css);

	const result = parseAll(css);

	// Show validation errors in UI
	if (!result.ok) {
		console.log("\n⚠️  Validation Issues:");
		result.issues
			.filter((issue) => issue.severity === "error")
			.forEach((issue) => {
				console.log(`  • ${issue.property}: ${issue.message}`);
			});
	}

	// Show warnings
	const warnings = result.issues.filter((issue) => issue.severity === "warning");
	if (warnings.length > 0) {
		console.log("\n⚠️  Warnings:");
		warnings.forEach((warning) => {
			console.log(`  • ${warning.message}`);
		});
	}

	// Show success
	if (result.ok && result.issues.length === 0) {
		console.log("✓ All properties valid!");
	}

	// Return parsed values for editing
	return result.value;
}

const editorInput = "color: red; width: notvalid; color: blue; height: 100px";
const editableValues = cssEditorSimulation(editorInput);

console.log("\nEditable values available:");
console.log("  Properties:", Object.keys(editableValues || {}).join(", "));

console.log("\n");

// ============================================================================
// Example 10: Performance - Batch vs Individual
// ============================================================================
console.log("10. Performance Comparison:");
console.log("─────────────────────────────");

const testCSS = "color: red; width: 100px; height: 200px; opacity: 0.5; z-index: 10";

console.log("Batch API (one call):");
console.time("  parseAll");
const batchResult = parseAll(testCSS);
console.timeEnd("  parseAll");
console.log("  Properties parsed:", Object.keys(batchResult).length);

console.log("\n=== Examples Complete ===");
