#!/usr/bin/env tsx
// b_path:: scripts/generate-parse-tests.ts
/**
 * Parse Test Generation Script v2.0
 *
 * Generates tests for CSS → IR parsing functions.
 *
 * Workflow:
 * 1. Load test case config from configs/{module}/{property}.ts
 * 2. Validate spec references exist in source file
 * 3. Run test cases through parser (CSS string → IR)
 * 4. Detect issues (mismatches between expected and actual)
 * 5. Save results to results/{module}/{property}-results.json
 * 6. Generate co-located test files:
 *    - src/parse/{module}/{property}.test.ts (valid cases)
 *    - src/parse/{module}/{property}.failure.test.ts (invalid cases)
 * 7. Save ISSUES.md if any mismatches found
 *
 * Prerequisites:
 * - Parser must exist at src/parse/{module}/{property}.ts
 * - Config must exist at scripts/parse-test-generator/configs/{module}/{property}.ts
 *
 * Usage:
 *   tsx scripts/generate-parse-tests.ts <module>/<property>
 *   tsx scripts/generate-parse-tests.ts <module> <property>
 *
 * Examples:
 *   tsx scripts/generate-parse-tests.ts animation/duration
 *   tsx scripts/generate-parse-tests.ts transition delay
 */

import * as fs from "node:fs";
import * as path from "node:path";

interface TestCase {
	input: string;
	description: string;
	category: string;
	expectValid?: boolean;
	expectedError?: string;
}

interface PropertyConfig {
	module: string; // NEW: explicit module name (e.g., "animation", "border")
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
	expectedError?: string;
	issue?: string;
}

interface SpecRef {
	type: "w3c" | "mdn" | "other";
	url: string;
}

async function loadConfig(configName: string): Promise<PropertyConfig> {
	// Support both "module/property" and "module property" formats
	const parts = configName.includes("/") ? configName.split("/") : configName.split(" ");

	if (parts.length !== 2) {
		console.error(`❌ Invalid config name format: ${configName}`);
		console.error(`   Expected: <module>/<property> or <module> <property>`);
		console.error(`   Example: animation/duration or animation duration`);
		process.exit(1);
	}

	const [moduleName, propertyName] = parts;

	const configPath = path.join(
		path.dirname(new URL(import.meta.url).pathname),
		"parse-test-generator",
		"configs",
		moduleName,
		`${propertyName}.ts`,
	);

	if (!fs.existsSync(configPath)) {
		console.error(`❌ Config not found: ${configPath}`);
		console.error(`   Available modules:`);
		const modulesDir = path.join(
			path.dirname(new URL(import.meta.url).pathname),
			"parse-test-generator",
			"configs",
		);
		if (fs.existsSync(modulesDir)) {
			const modules = fs.readdirSync(modulesDir).filter((f) => {
				const stat = fs.statSync(path.join(modulesDir, f));
				return stat.isDirectory();
			});
			modules.forEach((mod) => {
				console.error(`\n   ${mod}:`);
				const modPath = path.join(modulesDir, mod);
				const files = fs.readdirSync(modPath).filter((f) => f.endsWith(".ts"));
				files.forEach((f) => console.error(`     - ${mod}/${f.replace(".ts", "")}`));
			});
		}
		process.exit(1);
	}

	const module = await import(configPath);
	return module.config;
}

async function validateSpecRefs(specRefs: SpecRef[]): Promise<void> {
	if (specRefs.length === 0) return;

	console.log(`\n🔗 Validating spec reference URLs...`);

	for (const ref of specRefs) {
		try {
			const controller = new AbortController();
			const timeout = setTimeout(() => controller.abort(), 5000);

			const response = await fetch(ref.url, {
				method: "HEAD",
				signal: controller.signal,
			});
			clearTimeout(timeout);

			if (response.ok) {
				console.log(`   ✅ ${ref.type}: ${ref.url}`);
			} else {
				console.warn(`   ⚠️  ${ref.type}: ${ref.url} (HTTP ${response.status})`);
			}
		} catch (error) {
			console.warn(`   ⚠️  ${ref.type}: ${ref.url} (${error instanceof Error ? error.message : "unreachable"})`);
		}
	}
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
		specRefs.forEach((ref) => console.log(`   ${ref.type}: ${ref.url}`));
		await validateSpecRefs(specRefs);
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
			expectedError: testCase.expectedError,
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
	const outputDir = path.join("scripts", "parse-test-generator", "results", config.module);
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}
	const outputPath = path.join(outputDir, `${config.propertyName}-results.json`);
	fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
	console.log(`\n📁 Results saved to: ${outputPath}`);
}

function saveIssues(config: PropertyConfig, issues: string[]) {
	if (issues.length === 0) return;

	const outputDir = path.join("scripts", "parse-test-generator", "results", config.module);
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}
	const outputPath = path.join(outputDir, `${config.propertyName}-ISSUES.md`);
	let content = `# Issues Found: ${config.module}/${config.propertyName}\n\n`;
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

function generateValidTestFile(config: PropertyConfig, validCases: TestResult[], specRefs: SpecRef[]): string {
	let testFile = `// b_path:: ${config.outputPath}\n`;
	testFile += `// Auto-generated from scripts/parse-test-generator/configs/${config.module}/${config.propertyName}.ts\n`;
	testFile += `//\n`;

	if (specRefs.length > 0) {
		testFile += `// Spec references:\n`;
		specRefs.forEach((ref) => {
			testFile += `// - ${ref.type.toUpperCase()}: ${ref.url}\n`;
		});
	} else {
		testFile += `// ⚠️  No spec references found in source file\n`;
	}

	testFile += `import { describe, expect, it } from "vitest";\n`;
	testFile += `import * as Parser from "@/parse/${config.module}/${config.propertyName}";\n\n`;
	testFile += `describe("parse/${config.module}/${config.propertyName} - valid cases", () => {\n`;

	// Group valid cases by category
	const validByCategory = validCases.reduce(
		(acc, r) => {
			if (!acc[r.category]) acc[r.category] = [];
			acc[r.category].push(r);
			return acc;
		},
		{} as Record<string, TestResult[]>,
	);

	for (const [category, cases] of Object.entries(validByCategory)) {
		testFile += `\tdescribe("${category}", () => {\n`;
		for (const testCase of cases) {
			const output = JSON.stringify((testCase.output as any).value, null, 3).replace(/\n/g, "\n\t\t\t");
			testFile += `\t\tit("should parse ${testCase.description}", () => {\n`;
			testFile += `\t\t\tconst result = Parser.parse("${testCase.input}");\n`;
			testFile += `\t\t\texpect(result.ok).toBe(true);\n`;
			testFile += `\t\t\tif (!result.ok) return;\n`;
			testFile += `\t\t\texpect(result.value).toEqual(${output});\n`;
			testFile += `\t\t});\n\n`;
		}
		testFile += `\t});\n\n`;
	}

	testFile += `});\n`;

	return testFile;
}

function generateFailureTestFile(config: PropertyConfig, invalidCases: TestResult[], specRefs: SpecRef[]): string {
	const failureOutputPath = config.outputPath.replace(".test.ts", ".failure.test.ts");
	const generateFailurePath = `src/generate/${config.module}/${config.propertyName}.failure.test.ts`;

	// If no invalid cases, use no-op template
	if (invalidCases.length === 0) {
		const templatePath = path.join("scripts", "parse-test-generator", "templates", "no-op-failure.template.ts.t");
		let template = fs.readFileSync(templatePath, "utf-8");

		// Build spec refs section
		let specRefsSection = "";
		if (specRefs.length > 0) {
			specRefsSection = "// Spec references:\n";
			specRefs.forEach((ref) => {
				specRefsSection += `// - ${ref.type.toUpperCase()}: ${ref.url}\n`;
			});
		} else {
			specRefsSection = "// ⚠️  No spec references found in source file\n";
		}

		// Replace template variables
		template = template.replace(/{{OUTPUT_PATH}}/g, failureOutputPath);
		template = template.replace(/{{MODULE}}/g, config.module);
		template = template.replace(/{{PROPERTY}}/g, config.propertyName);
		template = template.replace(/{{SPEC_REFS}}/g, specRefsSection);
		template = template.replace(/{{GENERATE_FAILURE_PATH}}/g, generateFailurePath);

		return template;
	}

	// Otherwise, generate normal failure tests
	let testFile = `// b_path:: ${failureOutputPath}\n`;
	testFile += `// Auto-generated from scripts/test-generator/configs/${config.propertyName}.ts\n`;
	testFile += `//\n`;

	if (specRefs.length > 0) {
		testFile += `// Spec references:\n`;
		specRefs.forEach((ref) => {
			testFile += `// - ${ref.type.toUpperCase()}: ${ref.url}\n`;
		});
	} else {
		testFile += `// ⚠️  No spec references found in source file\n`;
	}

	testFile += `import { describe, expect, it } from "vitest";\n`;
	testFile += `import * as Parser from "@/parse/${config.module}/${config.propertyName}";\n\n`;
	testFile += `describe("parse/${config.module}/${config.propertyName} - invalid cases", () => {\n`;

	// Group invalid cases by category
	const invalidByCategory = invalidCases.reduce(
		(acc, r) => {
			if (!acc[r.category]) acc[r.category] = [];
			acc[r.category].push(r);
			return acc;
		},
		{} as Record<string, TestResult[]>,
	);

	for (const [category, cases] of Object.entries(invalidByCategory)) {
		testFile += `\tdescribe("${category}", () => {\n`;
		for (const testCase of cases) {
			const errorMsg = (testCase.output as any).error || "";
			testFile += `\t\tit("should reject ${testCase.description}", () => {\n`;
			testFile += `\t\t\tconst result = Parser.parse("${testCase.input}");\n`;
			testFile += `\t\t\texpect(result.ok).toBe(false);\n`;
			testFile += `\t\t\tif (result.ok) return;\n`;
			// Use exact error message assertion
			testFile += `\t\t\texpect(result.error).toBe("${errorMsg}");\n`;
			testFile += `\t\t});\n\n`;
		}
		testFile += `\t});\n\n`;
	}

	testFile += `});\n`;

	return testFile;
}

function saveTestFile(config: PropertyConfig, validContent: string, failureContent: string) {
	// Save valid test file
	const validPath = config.outputPath;
	const validDir = path.dirname(validPath);
	if (!fs.existsSync(validDir)) {
		fs.mkdirSync(validDir, { recursive: true });
	}
	fs.writeFileSync(validPath, validContent);
	console.log(`📝 Valid test file: ${validPath}`);

	// Save failure test file
	const failurePath = validPath.replace(".test.ts", ".failure.test.ts");
	fs.writeFileSync(failurePath, failureContent);
	console.log(`📝 Failure test file: ${failurePath}`);
}

async function main() {
	const arg1 = process.argv[2];
	const arg2 = process.argv[3];

	if (!arg1) {
		console.error("Usage: tsx scripts/generate-parse-tests.ts <module>/<property>");
		console.error("   Or: tsx scripts/generate-parse-tests.ts <module> <property>");
		console.error("\nExamples:");
		console.error("  tsx scripts/generate-parse-tests.ts animation/duration");
		console.error("  tsx scripts/generate-parse-tests.ts animation duration");
		process.exit(1);
	}

	// Support both "module/property" and "module property" formats
	const configName = arg2 ? `${arg1}/${arg2}` : arg1;

	const config = await loadConfig(configName);
	const { results, issues, specRefs } = await runTests(config);

	console.log(`\n📊 Summary:`);
	console.log(`   Valid: ${results.filter((r) => r.success).length}`);
	console.log(`   Invalid: ${results.filter((r) => !r.success).length}`);
	console.log(`   Total: ${results.length}`);
	console.log(`   Issues: ${issues.length / 3}`);

	saveResults(config, results);
	saveIssues(config, issues);

	const validCases = results.filter((r) => r.success);
	const invalidCases = results.filter((r) => !r.success);

	const validTestFile = generateValidTestFile(config, validCases, specRefs);
	const failureTestFile = generateFailureTestFile(config, invalidCases, specRefs);
	saveTestFile(config, validTestFile, failureTestFile);

	console.log(`\n✅ Done!`);
	console.log(`   Run: pnpm test ${config.outputPath}`);
	console.log(`   Run: pnpm test ${config.outputPath.replace(".test.ts", ".failure.test.ts")}`);

	if (issues.length > 0) {
		console.log(`\n⚠️  ${issues.length / 3} issues detected - review before proceeding`);
		process.exit(1);
	}
}

main().catch(console.error);
