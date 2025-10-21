#!/usr/bin/env tsx
// b_path:: scripts/extract-fixtures.ts
/**
 * Extract all CSS test fixtures from test files
 *
 * Scans all .test.ts files and extracts CSS strings passed to parse functions.
 * Outputs a JSON file with all fixtures categorized by property type.
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import type { TestFixture } from "./shared/types";

const ROOT = join(__dirname, "..");
const OUTPUT_FILE = join(ROOT, "scripts", "fixtures.json");

/**
 * Recursively find all .test.ts files
 */
function findTestFiles(dir: string): string[] {
	const files: string[] = [];
	const entries = readdirSync(dir);

	for (const entry of entries) {
		const fullPath = join(dir, entry);
		const stat = statSync(fullPath);

		if (stat.isDirectory() && entry !== "node_modules" && entry !== "dist" && entry !== "coverage") {
			files.push(...findTestFiles(fullPath));
		} else if (entry.endsWith(".test.ts")) {
			files.push(fullPath);
		}
	}

	return files;
}

/**
 * Extract CSS strings from a test file
 *
 * Looks for patterns like:
 * - parse("css-string")
 * - parse('css-string')
 * - parse(`css-string`)
 */
function extractFixtures(filePath: string): TestFixture[] {
	const content = readFileSync(filePath, "utf-8");
	const lines = content.split("\n");
	const fixtures: TestFixture[] = [];

	// Patterns to match parse calls
	const patterns = [/\.parse\(\s*["']([^"']+)["']\s*\)/g, /\.parse\(\s*`([^`]+)`\s*\)/g];

	// Determine category from file path
	const relativePath = relative(ROOT, filePath);
	const pathParts = relativePath.split("/");
	const category = pathParts[pathParts.length - 1].replace(".test.ts", "");

	for (let lineNum = 0; lineNum < lines.length; lineNum++) {
		const line = lines[lineNum];

		for (const pattern of patterns) {
			let match: RegExpExecArray | null;
			// biome-ignore lint/suspicious/noAssignInExpressions: Intentional for regex matching
			while ((match = pattern.exec(line)) !== null) {
				fixtures.push({
					css: match[1],
					category,
					file: relativePath,
					line: lineNum + 1,
				});
			}
		}
	}

	return fixtures;
}

/**
 * Main execution
 */
function main() {
	console.log("🔍 Searching for test files...");
	const testFiles = findTestFiles(join(ROOT, "src")).concat(findTestFiles(join(ROOT, "test")));
	console.log(`Found ${testFiles.length} test files\n`);

	console.log("📝 Extracting CSS fixtures...");
	const allFixtures: TestFixture[] = [];

	for (const file of testFiles) {
		const fixtures = extractFixtures(file);
		if (fixtures.length > 0) {
			console.log(`  ${relative(ROOT, file)}: ${fixtures.length} fixtures`);
			allFixtures.push(...fixtures);
		}
	}

	console.log(`\n✅ Extracted ${allFixtures.length} total fixtures`);

	// Group by category for reporting
	const byCategory = new Map<string, number>();
	for (const fixture of allFixtures) {
		byCategory.set(fixture.category, (byCategory.get(fixture.category) || 0) + 1);
	}

	console.log("\n📊 Fixtures by category:");
	for (const [category, count] of Array.from(byCategory.entries()).sort((a, b) => b[1] - a[1])) {
		console.log(`  ${category}: ${count}`);
	}

	// Write to file
	writeFileSync(OUTPUT_FILE, JSON.stringify(allFixtures, null, 2));
	console.log(`\n💾 Saved to ${relative(ROOT, OUTPUT_FILE)}`);
}

main();
