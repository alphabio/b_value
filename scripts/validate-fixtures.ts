#!/usr/bin/env tsx
/**
 * Validate all test fixtures for round-trip integrity
 *
 * For each fixture:
 * 1. Parse CSS → IR
 * 2. Generate IR → CSS
 * 3. Re-parse CSS → IR2
 * 4. Compare IR === IR2 (deep equality)
 *
 * Reports success rate and any failures.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Generate, Parse } from "../src";
import type { TestFixture, ValidationReport, ValidationResult } from "./shared/types";

const ROOT = join(__dirname, "..");
const FIXTURES_FILE = join(ROOT, "scripts", "fixtures.json");

/**
 * Deep equality check for objects
 */
function deepEqual(a: unknown, b: unknown): boolean {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (typeof a !== "object" || typeof b !== "object") return false;

	const keysA = Object.keys(a as object);
	const keysB = Object.keys(b as object);

	if (keysA.length !== keysB.length) return false;

	for (const key of keysA) {
		if (!keysB.includes(key)) return false;
		if (!deepEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) {
			return false;
		}
	}

	return true;
}

/**
 * Determine which parser to use based on category
 */
function getParser(category: string) {
	// Animation properties
	if (category === "delay") return Parse.Animation.Delay;
	if (category === "direction") return Parse.Animation.Direction;
	if (category === "duration") return Parse.Animation.Duration;
	if (category === "fill-mode") return Parse.Animation.FillMode;
	if (category === "iteration-count") return Parse.Animation.IterationCount;
	if (category === "name") return Parse.Animation.Name;
	if (category === "play-state") return Parse.Animation.PlayState;
	if (category === "timing-function") return Parse.Animation.TimingFunction;

	// Transition properties
	if (category.includes("transition")) {
		if (category.includes("delay")) return Parse.Transition.Delay;
		if (category.includes("duration")) return Parse.Transition.Duration;
		if (category.includes("property")) return Parse.Transition.Property;
		if (category.includes("timing")) return Parse.Transition.TimingFunction;
	}

	// Border properties
	if (category.includes("border") || category === "width" || category === "style" || category === "radius") {
		if (category.includes("color") || category === "color") return Parse.Border.Color;
		if (category.includes("radius") || category === "radius") return Parse.Border.Radius;
		if (category.includes("style") || category === "style") return Parse.Border.Style;
		if (category.includes("width") || category === "width") return Parse.Border.Width;
	}

	// Outline properties
	if (category.includes("outline")) {
		if (category.includes("color")) return Parse.Outline.Color;
		if (category.includes("offset")) return Parse.Outline.Offset;
		if (category.includes("style")) return Parse.Outline.Style;
		if (category.includes("width")) return Parse.Outline.Width;
	}

	// Color properties
	if (category === "hex") return Parse.Color.Hex;
	if (category === "hsl") return Parse.Color.HSL;
	if (category === "hwb") return Parse.Color.HWB;
	if (category === "lab") return Parse.Color.LAB;
	if (category === "lch") return Parse.Color.LCH;
	if (category === "named") return Parse.Color.Named;
	if (category === "oklab") return Parse.Color.OKLab;
	if (category === "oklch") return Parse.Color.OKLCH;
	if (category === "rgb") return Parse.Color.RGB;
	if (category === "special") return Parse.Color.Special;
	if (category === "system") return Parse.Color.System;
	if (category === "color") return Parse.Text.Color;

	// Transform
	if (category === "origin") return Parse.Transform.Origin;

	// Text
	if (category === "text") return Parse.Text.Line;

	// Background
	if (category === "background") return Parse.Background.Position;

	return null;
}

/**
 * Determine which generator to use based on category
 */
function getGenerator(category: string) {
	// Animation properties
	if (category === "delay") return Generate.Animation.Delay;
	if (category === "direction") return Generate.Animation.Direction;
	if (category === "duration") return Generate.Animation.Duration;
	if (category === "fill-mode") return Generate.Animation.FillMode;
	if (category === "iteration-count") return Generate.Animation.IterationCount;
	if (category === "name") return Generate.Animation.Name;
	if (category === "play-state") return Generate.Animation.PlayState;
	if (category === "timing-function") return Generate.Animation.TimingFunction;

	// Transition properties
	if (category.includes("transition")) {
		if (category.includes("delay")) return Generate.Transition.Delay;
		if (category.includes("duration")) return Generate.Transition.Duration;
		if (category.includes("property")) return Generate.Transition.Property;
		if (category.includes("timing")) return Generate.Transition.TimingFunction;
	}

	// Border properties
	if (category.includes("border") || category === "width" || category === "style" || category === "radius") {
		if (category.includes("color") || category === "color") return Generate.Border.Color;
		if (category.includes("radius") || category === "radius") return Generate.Border.Radius;
		if (category.includes("style") || category === "style") return Generate.Border.Style;
		if (category.includes("width") || category === "width") return Generate.Border.Width;
	}

	// Outline properties
	if (category.includes("outline")) {
		if (category.includes("color")) return Generate.Outline.Color;
		if (category.includes("offset")) return Generate.Outline.Offset;
		if (category.includes("style")) return Generate.Outline.Style;
		if (category.includes("width")) return Generate.Outline.Width;
	}

	// Color properties
	if (category === "hex") return Generate.Color.Hex;
	if (category === "hsl") return Generate.Color.HSL;
	if (category === "hwb") return Generate.Color.HWB;
	if (category === "lab") return Generate.Color.LAB;
	if (category === "lch") return Generate.Color.LCH;
	if (category === "named") return Generate.Color.Named;
	if (category === "oklab") return Generate.Color.OKLab;
	if (category === "oklch") return Generate.Color.OKLCH;
	if (category === "rgb") return Generate.Color.RGB;
	if (category === "special") return Generate.Color.Special;
	if (category === "system") return Generate.Color.System;
	if (category === "color") return Generate.Text.Color;

	// Transform
	if (category === "origin") return Generate.Transform.Origin;

	// Text
	if (category === "text") return Generate.Text.Line;

	// Background
	if (category === "background") return Generate.Background.Position;

	return null;
}

/**
 * Validate a single fixture for round-trip integrity
 */
function validateFixture(fixture: TestFixture): ValidationResult {
	const parser = getParser(fixture.category);
	const generator = getGenerator(fixture.category);

	const result: ValidationResult = {
		fixture,
		parseSuccess: false,
		generateSuccess: false,
		roundTripSuccess: false,
	};

	// Check if we have parser/generator for this category
	if (!parser || !generator) {
		result.parseError = `No parser/generator found for category: ${fixture.category}`;
		return result;
	}

	try {
		// Step 1: Parse CSS → IR
		const parseResult = parser.parse(fixture.css);
		if (!parseResult.ok) {
			result.parseError = parseResult.error;
			return result;
		}

		result.parseSuccess = true;
		result.originalIR = parseResult.value;

		// Step 2: Generate IR → CSS
		try {
			const generatedCSS = generator.toCss(parseResult.value);
			result.generateSuccess = true;
			result.generatedCSS = generatedCSS;

			// Step 3: Re-parse CSS → IR2
			const reparseResult = parser.parse(generatedCSS);
			if (!reparseResult.ok) {
				result.roundTripError = `Re-parse failed: ${reparseResult.error}`;
				return result;
			}

			result.regeneratedIR = reparseResult.value;

			// Step 4: Compare IR === IR2
			if (deepEqual(parseResult.value, reparseResult.value)) {
				result.roundTripSuccess = true;
			} else {
				result.roundTripError = "IR mismatch after round-trip";
			}
		} catch (error) {
			result.generateError = error instanceof Error ? error.message : String(error);
		}
	} catch (error) {
		result.parseError = error instanceof Error ? error.message : String(error);
	}

	return result;
}

/**
 * Main execution
 */
function main() {
	console.log("📂 Loading fixtures...");
	const fixtures: TestFixture[] = JSON.parse(readFileSync(FIXTURES_FILE, "utf-8"));
	console.log(`Loaded ${fixtures.length} fixtures\n`);

	console.log("🔄 Validating round-trip integrity...\n");
	const results: ValidationResult[] = [];
	const startTime = Date.now();

	// Process each fixture
	for (let i = 0; i < fixtures.length; i++) {
		const fixture = fixtures[i];
		const result = validateFixture(fixture);
		results.push(result);

		// Progress indicator
		if ((i + 1) % 100 === 0) {
			console.log(`  Processed ${i + 1}/${fixtures.length} fixtures...`);
		}
	}

	const totalTime = Date.now() - startTime;

	// Generate report
	const report: ValidationReport = {
		totalFixtures: fixtures.length,
		parseSuccesses: results.filter((r) => r.parseSuccess).length,
		parseFailures: results.filter((r) => !r.parseSuccess).length,
		generateSuccesses: results.filter((r) => r.generateSuccess).length,
		generateFailures: results.filter((r) => r.parseSuccess && !r.generateSuccess).length,
		roundTripSuccesses: results.filter((r) => r.roundTripSuccess).length,
		roundTripFailures: results.filter((r) => r.parseSuccess && r.generateSuccess && !r.roundTripSuccess).length,
		results,
	};

	// Print summary
	console.log(`\n${"=".repeat(60)}`);
	console.log("📊 VALIDATION REPORT");
	console.log("=".repeat(60));
	console.log(`Total Fixtures: ${report.totalFixtures}`);
	console.log(`Time Elapsed: ${totalTime}ms (${(totalTime / fixtures.length).toFixed(2)}ms per fixture)`);
	console.log();
	console.log(
		`Parse Success:  ${report.parseSuccesses}/${report.totalFixtures} (${((report.parseSuccesses / report.totalFixtures) * 100).toFixed(2)}%)`,
	);
	console.log(`Parse Failures: ${report.parseFailures}`);
	console.log();
	console.log(
		`Generate Success:  ${report.generateSuccesses}/${report.parseSuccesses} (${((report.generateSuccesses / report.parseSuccesses) * 100).toFixed(2)}%)`,
	);
	console.log(`Generate Failures: ${report.generateFailures}`);
	console.log();
	console.log(
		`Round-Trip Success:  ${report.roundTripSuccesses}/${report.generateSuccesses} (${((report.roundTripSuccesses / report.generateSuccesses) * 100).toFixed(2)}%)`,
	);
	console.log(`Round-Trip Failures: ${report.roundTripFailures}`);
	console.log("=".repeat(60));

	// Print failures if any
	if (report.parseFailures > 0) {
		console.log("\n❌ PARSE FAILURES:");
		const parseFailures = results.filter((r) => !r.parseSuccess);
		for (const result of parseFailures.slice(0, 10)) {
			console.log(`\n  ${result.fixture.file}:${result.fixture.line}`);
			console.log(`  CSS: ${result.fixture.css}`);
			console.log(`  Category: ${result.fixture.category}`);
			console.log(`  Error: ${result.parseError}`);
		}
		if (parseFailures.length > 10) {
			console.log(`\n  ... and ${parseFailures.length - 10} more`);
		}
	}

	if (report.generateFailures > 0) {
		console.log("\n❌ GENERATE FAILURES:");
		const generateFailures = results.filter((r) => r.parseSuccess && !r.generateSuccess);
		for (const result of generateFailures.slice(0, 10)) {
			console.log(`\n  ${result.fixture.file}:${result.fixture.line}`);
			console.log(`  CSS: ${result.fixture.css}`);
			console.log(`  Category: ${result.fixture.category}`);
			console.log(`  Error: ${result.generateError}`);
		}
		if (generateFailures.length > 10) {
			console.log(`\n  ... and ${generateFailures.length - 10} more`);
		}
	}

	if (report.roundTripFailures > 0) {
		console.log("\n❌ ROUND-TRIP FAILURES:");
		const roundTripFailures = results.filter((r) => r.parseSuccess && r.generateSuccess && !r.roundTripSuccess);
		for (const result of roundTripFailures.slice(0, 10)) {
			console.log(`\n  ${result.fixture.file}:${result.fixture.line}`);
			console.log(`  Original CSS: ${result.fixture.css}`);
			console.log(`  Generated CSS: ${result.generatedCSS}`);
			console.log(`  Category: ${result.fixture.category}`);
			console.log(`  Error: ${result.roundTripError}`);
			console.log(`  Original IR: ${JSON.stringify(result.originalIR)}`);
			console.log(`  Regenerated IR: ${JSON.stringify(result.regeneratedIR)}`);
		}
		if (roundTripFailures.length > 10) {
			console.log(`\n  ... and ${roundTripFailures.length - 10} more`);
		}
	}

	// Success message
	if (report.roundTripSuccesses === report.generateSuccesses) {
		console.log("\n✅ SUCCESS: All parseable fixtures passed round-trip validation!");
		console.log(`   ${report.roundTripSuccesses} valid fixtures validated`);
		console.log(`   ${report.parseFailures} negative test cases confirmed`);
	} else {
		console.log("\n⚠️  Some valid fixtures failed round-trip validation!");
		console.log("   This indicates a bug in parse/generate logic.");
		process.exit(1);
	}
}

main();
