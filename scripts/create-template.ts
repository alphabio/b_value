#!/usr/bin/env node
// b_path:: scripts/create-template.ts

/**
 * Template Repository Generator
 *
 * Creates a new repository from the b_value template.
 *
 * Usage:
 *   npx tsx scripts/create-template.ts <new-repo-name> [destination-path]
 *
 * Examples:
 *   npx tsx scripts/create-template.ts my-awesome-lib
 *   npx tsx scripts/create-template.ts my-awesome-lib ../projects/
 */

import { execSync } from "node:child_process";
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { createInterface } from "node:readline";

// Colors for console output
const colors = {
	red: "\x1b[31m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	magenta: "\x1b[35m",
	cyan: "\x1b[36m",
	reset: "\x1b[0m",
	bright: "\x1b[1m",
} as const;

// Utility functions
function log(message: string, color: string = colors.reset): void {
	console.log(color + message + colors.reset);
}

function ask(question: string): Promise<string> {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	return new Promise((resolve) => {
		rl.question(question, (answer: string) => {
			rl.close();
			resolve(answer.toLowerCase().trim());
		});
	});
}

function replaceInFile(filePath: string, oldString: string, newString: string): boolean {
	try {
		const content = readFileSync(filePath, "utf8");
		const updatedContent = content.replace(new RegExp(oldString, "g"), newString);
		writeFileSync(filePath, updatedContent, "utf8");
		return true;
	} catch (error) {
		log(`Warning: Could not update ${filePath}: ${(error as Error).message}`, colors.yellow);
		return false;
	}
}

function findFiles(dir: string, pattern: RegExp): string[] {
	const results: string[] = [];

	function scan(currentDir: string): void {
		const items = readdirSync(currentDir);

		for (const item of items) {
			const fullPath = join(currentDir, item);
			const stat = statSync(fullPath);

			if (stat.isDirectory() && !item.startsWith(".") && item !== "node_modules" && item !== "dist") {
				scan(fullPath);
			} else if (stat.isFile() && (pattern.test(item) || pattern.test(fullPath))) {
				results.push(fullPath);
			}
		}
	}

	scan(dir);
	return results;
}

async function main(): Promise<void> {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		log("Usage: npx tsx scripts/create-template.ts <new-repo-name> [destination-path]", colors.red);
		log("");
		log("Examples:", colors.cyan);
		log("  npx tsx scripts/create-template.ts my-awesome-lib", colors.cyan);
		log("  npx tsx scripts/create-template.ts my-awesome-lib ../projects/", colors.cyan);
		log("  npx tsx scripts/create-template.ts my-awesome-lib /absolute/path/", colors.cyan);
		process.exit(1);
	}

	const newRepoName = args[0];
	const destinationPath = args[1] || ".";
	const templateRoot = resolve(dirname(new URL(import.meta.url).pathname), "..");
	const targetDir = resolve(destinationPath, newRepoName);

	log(`🚀 Template Generator`, colors.bright + colors.blue);
	log(`Template: ${templateRoot}`, colors.cyan);
	log(`New repo: ${newRepoName}`, colors.cyan);
	log(`Location: ${targetDir}`, colors.cyan);
	log("");

	// Check if target directory already exists
	if (existsSync(targetDir)) {
		log(`⚠️  Directory ${newRepoName} already exists!`, colors.yellow);
		const answer = await ask("Do you want to overwrite it? (y/N): ");

		if (answer !== "y" && answer !== "yes") {
			log("❌ Operation cancelled.", colors.red);
			process.exit(0);
		}

		log("🗑️  Removing existing directory...", colors.yellow);
		rmSync(targetDir, { recursive: true, force: true });
	}

	try {
		// Copy template to new location
		log("📋 Copying template files...", colors.blue);
		cpSync(templateRoot, targetDir, {
			recursive: true,
			filter: (src: string) => {
				// Skip common files that shouldn't be copied
				const skipPatterns = [".git", "node_modules", "dist", "coverage", "*.log", "tsconfig.tsbuildinfo", "docs/api"];

				const relativePath = src.replace(`${templateRoot}/`, "");
				return !skipPatterns.some((pattern: string) => relativePath.includes(pattern));
			},
		});

		// Ensure essential files are copied (they might be excluded by the filter above)
		const essentialFiles = [
			".gitignore",
			".editorconfig",
			".nvmrc",
			"LICENSE",
			"CHANGELOG.md",
			"CONTRIBUTING.md",
			"SECURITY.md",
		];

		for (const file of essentialFiles) {
			const srcPath = join(templateRoot, file);
			const destPath = join(targetDir, file);
			if (existsSync(srcPath)) {
				cpSync(srcPath, destPath, { recursive: true });
			}
		}

		// Replace template name with new repo name
		log("🔄 Updating repository name...", colors.blue);

		const filesToUpdate = [
			"package.json",
			"README.md",
			"tsconfig.json",
			"typedoc.json",
			".github/workflows/ci.yml",
			".github/workflows/release.yml",
		];

		for (const file of filesToUpdate) {
			const filePath = join(targetDir, file);
			if (existsSync(filePath)) {
				const updates = [
					["b_value", newRepoName],
					["b_value", newRepoName], // Double check
					["your-username/b_value", `alphabio/${newRepoName}`], // Update GitHub URLs
				];

				for (const [oldText, newText] of updates) {
					replaceInFile(filePath, oldText, newText);
				}
			}
		}

		// Update all TypeScript/JavaScript files for import paths
		log("📝 Updating import paths...", colors.blue);
		const codeFiles = findFiles(targetDir, /\.(ts|js|json)$/);
		for (const file of codeFiles) {
			replaceInFile(file, "b_value", newRepoName);
		}

		// Initialize git repository
		log("🔧 Initializing git repository...", colors.blue);
		try {
			execSync("git init", { cwd: targetDir, stdio: "pipe" });
			execSync("git add .", { cwd: targetDir, stdio: "pipe" });
			execSync('git commit -m "Initial commit from b_value"', {
				cwd: targetDir,
				stdio: "pipe",
			});
		} catch (_error) {
			log("⚠️  Git initialization failed, but template was created successfully", colors.yellow);
		}

		// Install dependencies
		log("📦 Installing dependencies...", colors.blue);
		try {
			execSync("pnpm install", { cwd: targetDir, stdio: "pipe" });
		} catch (_error) {
			log('⚠️  Dependency installation failed. Run "pnpm install" manually in the new repository.', colors.yellow);
		}

		log("");
		log("✅ Template created successfully!", colors.green + colors.bright);
		log("");
		log("📋 Next steps:", colors.cyan);
		log(`  cd ${newRepoName}`, colors.cyan);
		log("  pnpm install  # If dependencies weren't installed automatically", colors.cyan);
		log("  pnpm build    # Test that everything builds correctly", colors.cyan);
		log("  pnpm check    # Run all quality checks", colors.cyan);
		log("");
		log("🔗 Useful links:", colors.cyan);
		log(`  Repository: https://github.com/alphabio/${newRepoName}`, colors.cyan);
		log(`  Issues: https://github.com/alphabio/${newRepoName}/issues`, colors.cyan);
		log(`  Documentation: https://github.com/alphabio/${newRepoName}#readme`, colors.cyan);
		log("");
		log("🎉 Happy coding!", colors.green + colors.bright);
	} catch {
		log(`❌ Error creating template: unknown error`, colors.red);
		process.exit(1);
	}
}

// Run the script
main().catch(() => {
	log(`❌ Unexpected error: unknown error`, colors.red);
	process.exit(1);
});
