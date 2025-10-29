#!/usr/bin/env tsx
// b_path:: scripts/generate-generate-tests.ts
/**
 * Generate Test Generator v2.0
 *
 * Generates tests for IR → CSS generation functions with roundtrip validation.
 *
 * Features:
 * - Validates IR → CSS string conversion
 * - Roundtrip testing: parse(generate(IR)) === IR
 * - Auto-detects issues (validation failures, roundtrip mismatches)
 * - Generates co-located test files (valid + failure cases)
 * - Auto-cleanup of resolved ISSUES files
 *
 * Usage:
 *   tsx scripts/generate-generate-tests.ts <module>/<property>
 *   tsx scripts/generate-generate-tests.ts <module> <property>
 *
 * Examples:
 *   tsx scripts/generate-generate-tests.ts animation/duration
 *   tsx scripts/generate-generate-tests.ts visual visibility
 *
 * Prerequisites:
 * - Generator: src/generate/{module}/{property}.ts with Zod validation
 * - Parser: src/parse/{module}/{property}.ts (for roundtrip)
 * - Config: scripts/generate-test-generator/configs/{module}/{property}.ts
 *
 * Output Files:
 * - src/generate/{module}/{property}.test.ts - Valid cases with roundtrip
 * - src/generate/{module}/{property}.failure.test.ts - Invalid cases
 * - scripts/generate-test-generator/results/{module}/{property}-results.json
 * - scripts/generate-test-generator/results/{module}/{property}-ISSUES.md (if issues found)
 *
 * Note: ISSUES files are automatically deleted when all issues are resolved.
 */

import * as fs from "node:fs";
import * as path from "node:path";

interface TestResult {
	description: string;
	category: string;
	output: unknown;
	success: boolean;
	expectValid?: boolean;
	expectedError?: string;
	expected?: string;
	actual?: string;
	roundtrip?: boolean;
	roundtripSuccess?: boolean;
	issue?: string;
}

interface SpecRef {
	type: "w3c" | "mdn" | "other";
	url: string;
}

async function loadConfig(configName: string): Promise<any> {
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
		"generate-test-generator",
		"configs",
		moduleName,
		`${propertyName}.ts`,
	);

	if (!fs.existsSync(configPath)) {
		console.error(`❌ Config not found: ${configPath}`);
		console.error(`   Available modules:`);
		const modulesDir = path.join(
			path.dirname(new URL(import.meta.url).pathname),
			"generate-test-generator",
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
	// Matches: @see {@link URL} or @see {@link URL | text}
	const seePattern = /@see\s+\{@link\s+(https?:\/\/[^\s|}]+)/g;
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

async function runTests(config: any) {
	console.log(`🧪 Running generate tests for: ${config.propertyName}\n`);

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

	// Dynamic import of generator and parser
	const generator = await import(config.importPath);
	const parser = config.parseImportPath ? await import(config.parseImportPath) : null;

	const results: TestResult[] = [];
	const issues: string[] = [];

	for (const testCase of config.cases) {
		const result = generator.generate(testCase.input);
		const success = result.ok === true;

		let issue: string | undefined;
		let actual: string | undefined;
		let roundtripSuccess: boolean | undefined;

		if (success) {
			actual = result.value;

			// Check expected output
			if (testCase.expected && actual !== testCase.expected) {
				issue = `Expected "${testCase.expected}" but got "${actual}"`;
				issues.push(`❌ ${testCase.description}`);
				issues.push(`   Expected: "${testCase.expected}"`);
				issues.push(`   Actual: "${actual}"\n`);
			}

			// Roundtrip validation
			if (testCase.roundtrip && parser) {
				const parseResult = parser.parse(actual);
				roundtripSuccess = parseResult.ok === true;

				if (roundtripSuccess) {
					// Deep equality check
					const originalJson = JSON.stringify(testCase.input);
					const roundtripJson = JSON.stringify(parseResult.value);

					if (originalJson !== roundtripJson) {
						issue = `Roundtrip failed: parse(generate(IR)) !== IR`;
						roundtripSuccess = false;
						issues.push(`❌ ${testCase.description} - ROUNDTRIP FAILED`);
						issues.push(`   Original: ${originalJson}`);
						issues.push(`   Roundtrip: ${roundtripJson}\n`);
					}
				} else {
					issue = `Roundtrip parse failed: ${parseResult.error}`;
					issues.push(`❌ ${testCase.description} - ROUNDTRIP PARSE FAILED`);
					issues.push(`   Generated CSS: "${actual}"`);
					issues.push(`   Parse error: ${parseResult.error}\n`);
				}
			}
		} else {
			actual = result.issues?.[0]?.message || result.error;

			// Check if error was expected
			if (testCase.expectValid) {
				issue = `Expected VALID but got ERROR: ${actual}`;
				issues.push(`❌ ${testCase.description}`);
				issues.push(`   Expected: VALID`);
				issues.push(`   Actual: ERROR - ${actual}\n`);
			}
		}

		// Detect mismatches between expected and actual behavior
		if (testCase.expectValid !== undefined && testCase.expectValid !== success) {
			if (!issue) {
				if (testCase.expectValid && !success) {
					issue = `Expected VALID but got ERROR: ${result.error}`;
					issues.push(`❌ ${testCase.description}`);
					issues.push(`   Expected: VALID (ok: true)`);
					issues.push(`   Actual: ERROR - ${result.error}\n`);
				} else {
					issue = `Expected ERROR but got VALID: ${result.value}`;
					issues.push(`❌ ${testCase.description}`);
					issues.push(`   Expected: ERROR (ok: false)`);
					issues.push(`   Actual: VALID - ${result.value}\n`);
				}
			}
		}

		results.push({
			description: testCase.description,
			category: testCase.category,
			output: result,
			success,
			expectValid: testCase.expectValid,
			expectedError: testCase.expectedError,
			expected: testCase.expected,
			actual,
			roundtrip: testCase.roundtrip,
			roundtripSuccess,
			issue,
		});

		const status = success ? "✅" : "❌";
		const roundtripFlag = testCase.roundtrip ? (roundtripSuccess ? " 🔄" : " 🔄❌") : "";
		const issueFlag = issue ? " ⚠️  ISSUE" : "";
		console.log(`${status} [${testCase.category}] ${testCase.description}${roundtripFlag}${issueFlag}`);
		if (!success) {
			console.log(`   Error: ${result.issues?.[0]?.message || result.error}`);
		} else if (testCase.roundtrip && !roundtripSuccess) {
			console.log(`   Roundtrip failed!`);
		}
	}

	return { results, issues, specRefs };
}

function saveResults(config: any, results: TestResult[]) {
	const outputDir = path.join("scripts", "generate-test-generator", "results", config.module);
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}
	const outputPath = path.join(outputDir, `${config.propertyName}-results.json`);
	fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
	console.log(`\n📁 Results saved to: ${outputPath}`);
}

function saveIssues(config: any, issues: string[]) {
	const outputDir = path.join("scripts", "generate-test-generator", "results", config.module);
	const outputPath = path.join(outputDir, `${config.propertyName}-ISSUES.md`);

	// If no issues, delete the ISSUES file if it exists
	if (issues.length === 0) {
		if (fs.existsSync(outputPath)) {
			fs.unlinkSync(outputPath);
			console.log(`\n✅ No issues - removed old ISSUES file: ${outputPath}`);
		}
		return;
	}

	// Create output directory if needed
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	// Write ISSUES file
	let content = `# Issues Found: ${config.module}/${config.propertyName} (Generate)\n\n`;
	content += `**Date**: ${new Date().toISOString().split("T")[0]}\n\n`;
	content += `Found ${issues.length / 3} mismatches between expected and actual generator behavior.\n\n`;
	content += `These need to be reviewed:\n`;
	content += `- If generator is wrong: Fix generator, then regenerate tests\n`;
	content += `- If expectation is wrong: Update config, then regenerate tests\n`;
	content += `- If behavior is intentional: Document as known limitation\n\n`;
	content += `---\n\n`;
	content += issues.join("\n");

	fs.writeFileSync(outputPath, content);
	console.log(`\n⚠️  ISSUES found! See: ${outputPath}`);
}

function generateValidTestFile(config: any, validCases: TestResult[], specRefs: SpecRef[]): string {
	// Convert module and property name to PascalCase type name (e.g., "transition" + "timing-function" -> "TransitionTimingFunction")
	const modulePrefix = config.module.charAt(0).toUpperCase() + config.module.slice(1);
	const typeName = config.typeName || modulePrefix + config.propertyName
		.split('-')
		.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
		.join('');

	let testFile = `// b_path:: ${config.outputPath}\n`;
	testFile += `// Auto-generated from scripts/generate-test-generator/configs/${config.module}/${config.propertyName}.ts\n`;
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
	testFile += `import * as Generator from "@/generate/${config.module}/${config.propertyName}";\n`;

	// Add parser import if roundtrip tests exist
	const hasRoundtrip = validCases.some((r) => r.roundtrip);
	if (hasRoundtrip) {
		testFile += `import * as Parser from "@/parse/${config.module}/${config.propertyName}";\n`;
	}

	testFile += `import type * as Type from "@/core/types";\n\n`;
	testFile += `describe("generate/${config.module}/${config.propertyName} - valid cases", () => {\n`;

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
			// Get original input from config
			const configCase = config.cases.find((c: any) => c.description === testCase.description);
			const inputJson = JSON.stringify(configCase.input, null, 3).replace(/\n/g, "\n\t\t\t");

			testFile += `\t\tit("should generate ${testCase.description}", () => {\n`;
			testFile += `\t\t\tconst input: Type.${typeName} = ${inputJson};\n`;
			testFile += `\t\t\tconst result = Generator.generate(input);\n`;
			testFile += `\t\t\texpect(result.ok).toBe(true);\n`;
			testFile += `\t\t\tif (!result.ok) return;\n`;
			testFile += `\t\t\texpect(result.value).toBe("${testCase.actual}");\n`;

			// Add roundtrip test if enabled
			if (testCase.roundtrip && testCase.roundtripSuccess) {
				testFile += `\n\t\t\t// Roundtrip validation\n`;
				testFile += `\t\t\tconst parseResult = Parser.parse(result.value);\n`;
				testFile += `\t\t\texpect(parseResult.ok).toBe(true);\n`;
				testFile += `\t\t\tif (!parseResult.ok) return;\n`;
				testFile += `\t\t\texpect(parseResult.value).toEqual(input);\n`;
			}

			testFile += `\t\t});\n\n`;
		}
		testFile += `\t});\n\n`;
	}

	testFile += `});\n`;

	return testFile;
}

function generateFailureTestFile(config: any, invalidCases: TestResult[], specRefs: SpecRef[]): string {
	const failureOutputPath = config.outputPath.replace(".test.ts", ".failure.test.ts");

	let testFile = `// b_path:: ${failureOutputPath}\n`;
	testFile += `// Auto-generated from scripts/generate-test-generator/configs/${config.propertyName}.ts\n`;
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
	testFile += `import * as Generator from "@/generate/${config.module}/${config.propertyName}";\n`;

	// Only add Type import if there are invalid cases
	if (invalidCases.length > 0) {
		testFile += `\n`;
	}

	testFile += `describe("generate/${config.module}/${config.propertyName} - invalid cases", () => {\n`;

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
			// Get original input from config
			const configCase = config.cases.find((c: any) => c.description === testCase.description);
			// Handle undefined specially since JSON.stringify(undefined) returns undefined
			const inputJson = configCase?.input === undefined
				? "undefined"
				: JSON.stringify(configCase?.input || null, null, 3).replace(/\n/g, "\n\t\t\t");
			const errorMsg = (testCase.output as any)?.issues?.[0]?.message || (testCase.output as any)?.error || "";

			testFile += `\t\tit("should reject ${testCase.description}", () => {\n`;
			testFile += `\t\t\t// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input\n`;
			testFile += `\t\t\tconst input: any = ${inputJson};\n`;
			testFile += `\t\t\tconst result = Generator.generate(input);\n`;
			testFile += `\t\t\texpect(result.ok).toBe(false);\n`;
			testFile += `\t\t\tif (result.ok) return;\n`;
			testFile += `\t\t\texpect(result.issues).toHaveLength(1);\n`;
			testFile += `\t\t\texpect(result.issues?.[0]?.message).toBe(${JSON.stringify(errorMsg)});\n`;
			testFile += `\t\t});\n\n`;
		}
		testFile += `\t});\n\n`;
	}

	testFile += `});\n`;

	return testFile;
}

function saveTestFile(config: any, validContent: string, failureContent: string) {
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
		console.error("Usage: tsx scripts/generate-generate-tests.ts <module>/<property>");
		console.error("   Or: tsx scripts/generate-generate-tests.ts <module> <property>");
		console.error("\nExamples:");
		console.error("  tsx scripts/generate-generate-tests.ts animation/duration");
		console.error("  tsx scripts/generate-generate-tests.ts animation duration");
		process.exit(1);
	}

	// Support both "module/property" and "module property" formats
	const configName = arg2 ? `${arg1}/${arg2}` : arg1;

	const config = await loadConfig(configName);
	const { results, issues, specRefs } = await runTests(config);

	console.log(`\n📊 Summary:`);
	console.log(`   Valid: ${results.filter((r) => r.success).length}`);
	console.log(`   Invalid: ${results.filter((r) => !r.success).length}`);
	console.log(`   Roundtrip: ${results.filter((r) => r.roundtrip && r.roundtripSuccess).length}/${results.filter((r) => r.roundtrip).length}`);
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
