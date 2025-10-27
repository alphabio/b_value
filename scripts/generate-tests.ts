#!/usr/bin/env tsx
/**
 * Test Generation Script v2.0
 *
 * Workflow:
 * 1. Load test case config from configs/ *.ts
 * 2. Validate spec references exist in source file
 * 3. Run cases through parser
 * 4. Detect issues (mismatches between expected and actual)
 * 5. Save results to JSON
 * 6. Generate co-located test file (src/ ** /*.test.ts)
 * 7. Save ISSUES.md if any mismatches found
 *
 * Usage:
 *   tsx scripts/generate-tests.ts <config-name>
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
	expectValid?: boolean;
}

interface PropertyConfig {
	propertyName: string;
	sourceFile: string;
	importPath: string;
	outputPath: string;
	cases: TestCase[];
}

interface TestResult {
	input: string;
	description: string;
	category: string;
	output: unknown;
	success: boolean;
	expectValid?: boolean;
	issue?: string;
}

interface SpecRef {
	type: "w3c" | "mdn" | "other";
	url: string;
}

async function loadConfig(configName: string): Promise<PropertyConfig> {
	const configPath = path.join(
		path.dirname(new URL(import.meta.url).pathname),
		"test-generator",
		"configs",
		`${configName}.ts`
	);

	if (!fs.existsSync(configPath)) {
		console.error(`❌ Config not found: ${configPath}`);
		console.error(`   Available configs:`);
		const configsDir = path.join(path.dirname(configPath));
		if (fs.existsSync(configsDir)) {
			const files = fs.readdirSync(configsDir).filter(f => f.endsWith(".ts"));
			files.forEach(f => console.error(`   - ${f.replace(".ts", "")}`));
		}
		process.exit(1);
	}

	const module = await import(configPath);
	return module.config;
}

function extractSpecRefs(sourceFilePath: string): SpecRef[] {
	if (!fs.existsSync(sourceFilePath)) {
		console.warn(`⚠️  Source file not found: ${sourceFilePath}`);
		return [];
	}

	const content = fs.readFileSync(sourceFilePath, "utf-8");
	const refs: SpecRef[] = [];

	// Extract @see links from JSDoc
	const seePattern = /@see\s+\{@link\s+(https?:\/\/[^\s|]+)[^}]*\}/g;
	let match: RegExpExecArray | null;

	while ((match = seePattern.exec(content)) !== null) {
		const url = match[1];
		let type: "w3c" | "mdn" | "other" = "other";
		if (url.includes("w3.org")) type = "w3c";
		else if (url.includes("developer.mozilla.org")) type = "mdn";
		
		refs.push({ type, url });
	}

	return refs;
}

async function runTests(config: PropertyConfig) {
	console.log(`🧪 Running test cases for: ${config.propertyName}\n`);

	// Validate spec refs exist
	const specRefs = extractSpecRefs(config.sourceFile);
	if (specRefs.length === 0) {
		console.warn(`⚠️  No spec references found in ${config.sourceFile}`);
		console.warn(`   Expected @see {@link ...} in JSDoc comments\n`);
	} else {
		console.log(`📖 Found ${specRefs.length} spec reference(s):`);
		specRefs.forEach(ref => console.log(`   ${ref.type}: ${ref.url}`));
		console.log();
	}

	// Dynamic import of parser
	const parser = await import(config.importPath);

	const results: TestResult[] = [];
	const issues: string[] = [];

	for (const testCase of config.cases) {
		const result = parser.parse(testCase.input);
		const success = result.ok === true;

		let issue: string | undefined;

		// Detect mismatches between expected and actual behavior
		if (testCase.expectValid !== undefined && testCase.expectValid !== success) {
			if (testCase.expectValid && !success) {
				issue = `Expected VALID but got ERROR: ${result.ok ? "" : result.error}`;
				issues.push(`❌ "${testCase.input}" - ${testCase.description}`);
				issues.push(`   Expected: VALID (ok: true)`);
				issues.push(`   Actual: ERROR - ${result.ok ? "" : result.error}\n`);
			} else {
				issue = `Expected ERROR but got VALID`;
				issues.push(`❌ "${testCase.input}" - ${testCase.description}`);
				issues.push(`   Expected: ERROR (ok: false)`);
				issues.push(`   Actual: VALID - ${JSON.stringify(result.ok ? result.value : null)}\n`);
			}
		}

		results.push({
			input: testCase.input,
			description: testCase.description,
			category: testCase.category,
			output: result,
			success,
			expectValid: testCase.expectValid,
			issue,
		});

		const status = success ? "✅" : "❌";
		const issueFlag = issue ? " ⚠️  ISSUE" : "";
		console.log(`${status} [${testCase.category}] "${testCase.input}"${issueFlag}`);
		if (!success) {
			console.log(`   Error: ${result.ok ? "" : result.error}`);
		}
	}

	return { results, issues, specRefs };
}

function saveResults(config: PropertyConfig, results: TestResult[]) {
	const outputPath = path.join("scripts", "test-generator", `${config.propertyName}-results.json`);
	fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
	console.log(`\n📁 Results saved to: ${outputPath}`);
}

function saveIssues(config: PropertyConfig, issues: string[]) {
	if (issues.length === 0) return;

	const outputPath = path.join("scripts", "test-generator", `${config.propertyName}-ISSUES.md`);
	let content = `# Issues Found: ${config.propertyName}\n\n`;
	content += `**Date**: ${new Date().toISOString().split("T")[0]}\n\n`;
	content += `Found ${issues.length / 3} mismatches between expected and actual parser behavior.\n\n`;
	content += `These need to be reviewed:\n`;
	content += `- If parser is wrong: Fix parser, then regenerate tests\n`;
	content += `- If expectation is wrong: Update config, then regenerate tests\n`;
	content += `- If behavior is intentional: Document as known limitation\n\n`;
	content += `---\n\n`;
	content += issues.join("\n");

	fs.writeFileSync(outputPath, content);
	console.log(`\n⚠️  ISSUES found! See: ${outputPath}`);
}

function generateTestFile(config: PropertyConfig, results: TestResult[], specRefs: SpecRef[]): string {
	const validCases = results.filter(r => r.success);
	const invalidCases = results.filter(r => !r.success);

	let testFile = `// b_path:: ${config.outputPath}\n`;
	testFile += `// Auto-generated from scripts/test-generator/configs/${config.propertyName}.ts\n`;
	testFile += `//\n`;
	
	if (specRefs.length > 0) {
		testFile += `// Spec references:\n`;
		specRefs.forEach(ref => {
			testFile += `// - ${ref.type.toUpperCase()}: ${ref.url}\n`;
		});
	} else {
		testFile += `// ⚠️  No spec references found in source file\n`;
	}
	
	testFile += `import { describe, expect, it } from "vitest";\n`;
	testFile += `import * as Parser from "@/parse/animation/${config.propertyName}";\n\n`;
	testFile += `describe("parse/animation/${config.propertyName}", () => {\n`;

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

function saveTestFile(config: PropertyConfig, content: string) {
	const testPath = config.outputPath;
	
	// Create directory if it doesn't exist
	const dir = path.dirname(testPath);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	fs.writeFileSync(testPath, content);
	console.log(`📝 Test file generated: ${testPath}`);
}

async function main() {
	const configName = process.argv[2];

	if (!configName) {
		console.error("Usage: tsx scripts/generate-tests.ts <config-name>");
		console.error("\nExample: tsx scripts/generate-tests.ts duration");
		process.exit(1);
	}

	const config = await loadConfig(configName);
	const { results, issues, specRefs } = await runTests(config);
	
	console.log(`\n📊 Summary:`);
	console.log(`   Valid: ${results.filter(r => r.success).length}`);
	console.log(`   Invalid: ${results.filter(r => !r.success).length}`);
	console.log(`   Total: ${results.length}`);
	console.log(`   Issues: ${issues.length / 3}`);

	saveResults(config, results);
	saveIssues(config, issues);
	
	const testFileContent = generateTestFile(config, results, specRefs);
	saveTestFile(config, testFileContent);

	console.log(`\n✅ Done! Run: pnpm test ${config.outputPath}`);
	
	if (issues.length > 0) {
		console.log(`\n⚠️  ${issues.length / 3} issues detected - review before proceeding`);
		process.exit(1);
	}
}

main().catch(console.error);
