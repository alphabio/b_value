#!/usr/bin/env tsx
/**
 * Test Generation Script
 * 
 * Workflow:
 * 1. Define test cases (valid + invalid)
 * 2. Run them through parser
 * 3. Save results to JSON
 * 4. Generate test file from results
 * 
 * Usage:
 *   tsx scripts/generate-tests.ts <property-name>
 *   
 * Example:
 *   tsx scripts/generate-tests.ts duration
 */

import * as fs from "node:fs";
import * as path from "node:path";

interface TestCase {
	input: string;
	description: string;
	category: string;
}

interface TestResult {
	input: string;
	description: string;
	category: string;
	output: unknown;
	success: boolean;
}

const PROPERTY_CONFIGS: Record<string, {
	importPath: string;
	cases: TestCase[];
}> = {
	duration: {
		importPath: "../src/parse/animation/duration.js",
		cases: [
			// Valid cases
			{ input: "1s", description: "single time value in seconds", category: "valid-basic" },
			{ input: "500ms", description: "single time value in milliseconds", category: "valid-basic" },
			{ input: "auto", description: "auto keyword", category: "valid-keyword" },
			{ input: "AUTO", description: "case insensitive auto", category: "valid-keyword" },
			{ input: "0s", description: "zero duration", category: "valid-edge" },
			{ input: "0ms", description: "zero duration in ms", category: "valid-edge" },
			{ input: "0.5s", description: "decimal values", category: "valid-decimal" },
			{ input: "2.5s", description: "decimal seconds", category: "valid-decimal" },
			{ input: "100.5ms", description: "decimal milliseconds", category: "valid-decimal" },
			{ input: "3600s", description: "large values", category: "valid-large" },
			{ input: "1s, auto, 500ms", description: "multiple durations", category: "valid-list" },
			{ input: "1s , auto , 2s", description: "durations with whitespace", category: "valid-list" },
			{ input: "1s, 2s, 3s, 4s", description: "multiple time values", category: "valid-list" },
			
			// Invalid cases
			{ input: "-1s", description: "negative duration", category: "invalid-negative" },
			{ input: "-500ms", description: "negative milliseconds", category: "invalid-negative" },
			{ input: "1px", description: "invalid unit", category: "invalid-unit" },
			{ input: "1em", description: "wrong unit type", category: "invalid-unit" },
			{ input: "1", description: "missing unit", category: "invalid-unit" },
			{ input: "", description: "empty value", category: "invalid-empty" },
			{ input: "1s,", description: "trailing comma", category: "invalid-comma" },
			{ input: ",1s", description: "leading comma", category: "invalid-comma" },
			{ input: "1s,,2s", description: "double comma", category: "invalid-comma" },
			{ input: "invalid", description: "invalid keyword", category: "invalid-keyword" },
			{ input: "none", description: "wrong keyword", category: "invalid-keyword" },
		],
	},
};

async function runTests(propertyName: string) {
	const config = PROPERTY_CONFIGS[propertyName];
	if (!config) {
		console.error(`❌ Unknown property: ${propertyName}`);
		console.error(`   Available: ${Object.keys(PROPERTY_CONFIGS).join(", ")}`);
		process.exit(1);
	}

	console.log(`🧪 Running test cases for: ${propertyName}\n`);

	// Dynamic import of parser
	const parser = await import(config.importPath);

	const results: TestResult[] = [];

	for (const testCase of config.cases) {
		const result = parser.parse(testCase.input);
		
		results.push({
			input: testCase.input,
			description: testCase.description,
			category: testCase.category,
			output: result,
			success: result.ok === true,
		});

		const status = result.ok ? "✅" : "❌";
		console.log(`${status} [${testCase.category}] "${testCase.input}"`);
		if (!result.ok) {
			console.log(`   Error: ${result.error}`);
		}
	}

	return results;
}

function saveResults(propertyName: string, results: TestResult[]) {
	const outputPath = path.join("scripts", "test-generator", `${propertyName}-results.json`);
	fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
	console.log(`\n📁 Results saved to: ${outputPath}`);
}

function generateTestFile(propertyName: string, results: TestResult[]): string {
	const validCases = results.filter(r => r.success);
	const invalidCases = results.filter(r => !r.success);

	const importPath = `@/parse/animation/${propertyName}`;

	let testFile = `// b_path:: test/parse/animation/${propertyName}.test.ts
// Auto-generated test file from scripts/generate-tests.ts
import { describe, expect, it } from "vitest";
import * as Parser from "${importPath}";

describe("parse/animation/${propertyName}", () => {
`;

	// Group valid cases by category
	const validByCategory = validCases.reduce((acc, r) => {
		if (!acc[r.category]) acc[r.category] = [];
		acc[r.category].push(r);
		return acc;
	}, {} as Record<string, TestResult[]>);

	testFile += `\tdescribe("valid cases", () => {\n`;
	for (const [category, cases] of Object.entries(validByCategory)) {
		testFile += `\t\tdescribe("${category}", () => {\n`;
		for (const testCase of cases) {
			const output = JSON.stringify((testCase.output as any).value, null, 3).replace(/\n/g, "\n\t\t\t\t");
			testFile += `\t\t\tit("should parse ${testCase.description}", () => {\n`;
			testFile += `\t\t\t\tconst result = Parser.parse("${testCase.input}");\n`;
			testFile += `\t\t\t\texpect(result.ok).toBe(true);\n`;
			testFile += `\t\t\t\tif (!result.ok) return;\n`;
			testFile += `\t\t\t\texpect(result.value).toEqual(${output});\n`;
			testFile += `\t\t\t});\n\n`;
		}
		testFile += `\t\t});\n\n`;
	}
	testFile += `\t});\n\n`;

	// Group invalid cases by category
	const invalidByCategory = invalidCases.reduce((acc, r) => {
		if (!acc[r.category]) acc[r.category] = [];
		acc[r.category].push(r);
		return acc;
	}, {} as Record<string, TestResult[]>);

	testFile += `\tdescribe("invalid cases", () => {\n`;
	for (const [category, cases] of Object.entries(invalidByCategory)) {
		testFile += `\t\tdescribe("${category}", () => {\n`;
		for (const testCase of cases) {
			const errorMsg = (testCase.output as any).error || "";
			testFile += `\t\t\tit("should reject ${testCase.description}", () => {\n`;
			testFile += `\t\t\t\tconst result = Parser.parse("${testCase.input}");\n`;
			testFile += `\t\t\t\texpect(result.ok).toBe(false);\n`;
			testFile += `\t\t\t\tif (result.ok) return;\n`;
			// Extract key error term for validation
			const errorTerm = errorMsg.match(/Expected|Invalid|must be|Empty/)?.[0] || "";
			if (errorTerm) {
				testFile += `\t\t\t\texpect(result.error).toContain("${errorTerm}");\n`;
			}
			testFile += `\t\t\t});\n\n`;
		}
		testFile += `\t\t});\n\n`;
	}
	testFile += `\t});\n`;

	testFile += `});\n`;

	return testFile;
}

function saveTestFile(propertyName: string, content: string) {
	const testPath = path.join("test", "parse", "animation", `${propertyName}.test.ts`);
	
	// Create directory if it doesn't exist
	const dir = path.dirname(testPath);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	fs.writeFileSync(testPath, content);
	console.log(`📝 Test file generated: ${testPath}`);
}

async function main() {
	const propertyName = process.argv[2];

	if (!propertyName) {
		console.error("Usage: tsx scripts/generate-tests.ts <property-name>");
		console.error(`Available: ${Object.keys(PROPERTY_CONFIGS).join(", ")}`);
		process.exit(1);
	}

	const results = await runTests(propertyName);
	
	console.log(`\n📊 Summary:`);
	console.log(`   Valid: ${results.filter(r => r.success).length}`);
	console.log(`   Invalid: ${results.filter(r => !r.success).length}`);
	console.log(`   Total: ${results.length}`);

	saveResults(propertyName, results);
	
	const testFileContent = generateTestFile(propertyName, results);
	saveTestFile(propertyName, testFileContent);

	console.log(`\n✅ Done! Run: pnpm test test/parse/animation/${propertyName}.test.ts`);
}

main().catch(console.error);
