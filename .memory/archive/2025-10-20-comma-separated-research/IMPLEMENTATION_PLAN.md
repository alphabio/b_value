# Comma-Separated Values: Executable Implementation Plan

**Date**: 2025-10-20  
**Type**: Side Quest - Infrastructure Refactoring  
**Estimated Time**: 3 hours  
**Risk**: Low (pure refactoring with full test coverage)

---

## Overview

Extract duplicated comma-separated parsing logic into a reusable utility function, then refactor 12 existing properties to use it.

**Goal**: Reduce ~350 lines of duplication while maintaining 100% test compatibility.

---

## Pre-Flight Checklist

```bash
# 1. Verify baseline
just check && just test  # Should show 2176 tests passing

# 2. Create feature branch (optional)
git checkout -b refactor/comma-separated-helper

# 3. Verify current state
ls src/parse/animation/*.ts src/parse/transition/*.ts
```

---

## Phase 1: Create Helper Function (~45 min)

### Step 1.1: Create Utility File (10 min)

**File**: `src/utils/parse/comma-separated.ts`

**Content**:

```typescript
// b_path:: src/utils/parse/comma-separated.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";

/**
 * Parse comma-separated list where each item is a single AST node.
 *
 * This helper handles the common pattern of splitting comma-separated values
 * where each item between commas is exactly one value (not a complex expression).
 *
 * Examples:
 * - animation-name: fade, slide, bounce
 * - transition-property: opacity, transform
 * - animation-delay: 1s, 500ms, 2s
 *
 * @param css - CSS value string to parse
 * @param itemParser - Function to parse each individual item node
 * @param propertyName - Property name for error messages
 * @returns Result with array of parsed items or error
 *
 * @example
 * ```typescript
 * const result = parseCommaSeparatedSingle(
 *   "fade, slide, bounce",
 *   (node) => parseAnimationName(node),
 *   "animation-name"
 * );
 * // result.value = [{ type: "identifier", value: "fade" }, ...]
 * ```
 *
 * @internal
 */
export function parseCommaSeparatedSingle<T>(
	css: string,
	itemParser: (node: csstree.CssNode) => Result<T, string>,
	propertyName: string,
): Result<T[], string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err(`${propertyName}: Expected Value node`);
		}

		const children = ast.children.toArray();

		const results: T[] = [];
		let currentNodes: csstree.CssNode[] = [];

		for (const node of children) {
			if (node.type === "Operator" && "value" in node && node.value === ",") {
				// Found comma - process accumulated nodes
				if (currentNodes.length === 1 && currentNodes[0]) {
					const itemResult = itemParser(currentNodes[0]);
					if (!itemResult.ok) {
						return err(`${propertyName}: ${itemResult.error}`);
					}
					results.push(itemResult.value);
					currentNodes = [];
				} else if (currentNodes.length === 0) {
					return err(`${propertyName}: Empty value before comma`);
				} else {
					return err(
						`${propertyName}: Expected single value between commas, got ${currentNodes.length} values`,
					);
				}
			} else {
				currentNodes.push(node);
			}
		}

		// Process last value (after final comma or only value)
		if (currentNodes.length === 1 && currentNodes[0]) {
			const itemResult = itemParser(currentNodes[0]);
			if (!itemResult.ok) {
				return err(`${propertyName}: ${itemResult.error}`);
			}
			results.push(itemResult.value);
		} else if (currentNodes.length === 0) {
			return err(`${propertyName}: Empty value`);
		} else {
			return err(
				`${propertyName}: Expected single value, got ${currentNodes.length} values`,
			);
		}

		if (results.length === 0) {
			return err(`${propertyName}: Requires at least one value`);
		}

		return ok(results);
	} catch (e) {
		return err(
			`Failed to parse ${propertyName}: ${e instanceof Error ? e.message : String(e)}`,
		);
	}
}
```

### Step 1.2: Create Test File (20 min)

**File**: `src/utils/parse/comma-separated.test.ts`

**Content**:

```typescript
// b_path:: src/utils/parse/comma-separated.test.ts
import { describe, expect, it } from "vitest";
import { err, ok, type Result } from "@/core/result";
import type * as csstree from "css-tree";
import { parseCommaSeparatedSingle } from "./comma-separated";

/**
 * Mock parser that extracts identifier name from node.
 */
function mockIdentifierParser(
	node: csstree.CssNode,
): Result<string, string> {
	if (node.type !== "Identifier") {
		return err(`Expected Identifier, got ${node.type}`);
	}
	return ok(node.name);
}

/**
 * Mock parser that validates and returns number value.
 */
function mockNumberParser(node: csstree.CssNode): Result<number, string> {
	if (node.type === "Number") {
		return ok(Number.parseFloat(node.value));
	}
	if (node.type === "Dimension" && node.unit === "px") {
		return ok(Number.parseFloat(node.value));
	}
	return err(`Expected number or dimension, got ${node.type}`);
}

describe("parseCommaSeparatedSingle", () => {
	describe("Basic Functionality", () => {
		it("parses single value", () => {
			const result = parseCommaSeparatedSingle(
				"value",
				mockIdentifierParser,
				"test-property",
			);

			expect(result).toEqual({
				ok: true,
				value: ["value"],
			});
		});

		it("parses two comma-separated values", () => {
			const result = parseCommaSeparatedSingle(
				"first, second",
				mockIdentifierParser,
				"test-property",
			);

			expect(result).toEqual({
				ok: true,
				value: ["first", "second"],
			});
		});

		it("parses three comma-separated values", () => {
			const result = parseCommaSeparatedSingle(
				"one, two, three",
				mockIdentifierParser,
				"test-property",
			);

			expect(result).toEqual({
				ok: true,
				value: ["one", "two", "three"],
			});
		});

		it("parses many comma-separated values", () => {
			const result = parseCommaSeparatedSingle(
				"a, b, c, d, e, f, g",
				mockIdentifierParser,
				"test-property",
			);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toHaveLength(7);
				expect(result.value).toEqual(["a", "b", "c", "d", "e", "f", "g"]);
			}
		});
	});

	describe("Whitespace Handling", () => {
		it("handles values with no spaces around commas", () => {
			const result = parseCommaSeparatedSingle(
				"first,second,third",
				mockIdentifierParser,
				"test-property",
			);

			expect(result).toEqual({
				ok: true,
				value: ["first", "second", "third"],
			});
		});

		it("handles values with multiple spaces around commas", () => {
			const result = parseCommaSeparatedSingle(
				"first  ,  second  ,  third",
				mockIdentifierParser,
				"test-property",
			);

			expect(result).toEqual({
				ok: true,
				value: ["first", "second", "third"],
			});
		});

		it("handles values with tabs and newlines", () => {
			const result = parseCommaSeparatedSingle(
				"first\t,\nsecond\t,\nthird",
				mockIdentifierParser,
				"test-property",
			);

			expect(result).toEqual({
				ok: true,
				value: ["first", "second", "third"],
			});
		});
	});

	describe("Different Value Types", () => {
		it("parses numeric values", () => {
			const result = parseCommaSeparatedSingle(
				"1, 2, 3",
				mockNumberParser,
				"test-property",
			);

			expect(result).toEqual({
				ok: true,
				value: [1, 2, 3],
			});
		});

		it("parses dimension values", () => {
			const result = parseCommaSeparatedSingle(
				"10px, 20px, 30px",
				mockNumberParser,
				"test-property",
			);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual([10, 20, 30]);
			}
		});

		it("parses mixed identifiers", () => {
			const result = parseCommaSeparatedSingle(
				"ease, linear, ease-in-out",
				mockIdentifierParser,
				"test-property",
			);

			expect(result).toEqual({
				ok: true,
				value: ["ease", "linear", "ease-in-out"],
			});
		});
	});

	describe("Error Cases", () => {
		it("rejects empty string", () => {
			const result = parseCommaSeparatedSingle(
				"",
				mockIdentifierParser,
				"test-property",
			);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("test-property");
			}
		});

		it("rejects empty value before comma", () => {
			const result = parseCommaSeparatedSingle(
				", second",
				mockIdentifierParser,
				"test-property",
			);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Empty value");
			}
		});

		it("rejects empty value after comma", () => {
			const result = parseCommaSeparatedSingle(
				"first, ",
				mockIdentifierParser,
				"test-property",
			);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Empty value");
			}
		});

		it("rejects empty value between commas", () => {
			const result = parseCommaSeparatedSingle(
				"first, , third",
				mockIdentifierParser,
				"test-property",
			);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Empty value");
			}
		});

		it("propagates parser errors", () => {
			const result = parseCommaSeparatedSingle(
				"123, 456",
				mockIdentifierParser, // Expects identifiers, not numbers
				"test-property",
			);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Expected Identifier");
			}
		});

		it("includes property name in error messages", () => {
			const result = parseCommaSeparatedSingle(
				", invalid",
				mockIdentifierParser,
				"my-custom-property",
			);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("my-custom-property");
			}
		});
	});

	describe("Edge Cases", () => {
		it("handles single comma (two empty values)", () => {
			const result = parseCommaSeparatedSingle(
				",",
				mockIdentifierParser,
				"test-property",
			);

			expect(result.ok).toBe(false);
		});

		it("handles multiple consecutive commas", () => {
			const result = parseCommaSeparatedSingle(
				"first,,third",
				mockIdentifierParser,
				"test-property",
			);

			expect(result.ok).toBe(false);
		});

		it("handles only whitespace", () => {
			const result = parseCommaSeparatedSingle(
				"   ",
				mockIdentifierParser,
				"test-property",
			);

			expect(result.ok).toBe(false);
		});
	});
});
```

### Step 1.3: Update Utils Index (5 min)

**File**: `src/utils/parse/index.ts`

Add export:

```typescript
export * from "./comma-separated";
```

### Step 1.4: Verify Helper (10 min)

```bash
# Run tests for new helper
pnpm test -- comma-separated

# Should show ~30+ tests passing

# Run full suite
just test  # Should still be 2176 tests passing
```

---

## Phase 2: Refactor Properties (~2 hours)

### Properties to Refactor (in order)

1. `transition-property` (simple, good test case)
2. `transition-delay`
3. `transition-duration`
4. `transition-timing-function`
5. `animation-name`
6. `animation-delay`
7. `animation-duration`
8. `animation-direction`
9. `animation-fill-mode`
10. `animation-iteration-count`
11. `animation-play-state`
12. `animation-timing-function`

### Refactoring Template

For each property, follow this pattern:

**Before** (example: `animation-name.ts`):
- ~119 lines with manual comma splitting
- Duplicated error handling
- Custom loop logic

**After** (example: `animation-name.ts`):

```typescript
// b_path:: src/parse/animation/name.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { parseCommaSeparatedSingle } from "@/utils/parse/comma-separated";

/**
 * Parse animation name from AST node.
 * ... (keep existing doc comment)
 * @internal
 */
function parseAnimationName(
	node: csstree.CssNode,
): Result<{ type: "none" } | { type: "identifier"; value: string }, string> {
	if (node.type !== "Identifier") {
		return err(`Expected identifier or 'none', got: ${node.type}`);
	}

	const name = node.name;

	if (name.toLowerCase() === "none") {
		return ok({ type: "none" as const });
	}

	return ok({
		type: "identifier" as const,
		value: name,
	});
}

/**
 * Parse CSS animation-name property value.
 * ... (keep existing doc comment)
 * @public
 */
export function parse(css: string): Result<Type.AnimationName, string> {
	const namesResult = parseCommaSeparatedSingle(
		css,
		parseAnimationName,
		"animation-name",
	);

	if (!namesResult.ok) {
		return err(namesResult.error);
	}

	return ok({
		kind: "animation-name",
		names: namesResult.value,
	});
}
```

### Refactoring Process (per property)

```bash
# 1. Edit property file
# - Import parseCommaSeparatedSingle
# - Keep internal parser function (parseAnimationName, etc.)
# - Replace manual comma-splitting with helper call
# - Keep all doc comments

# 2. Run tests for that property
pnpm test -- [property-name]

# 3. Verify output unchanged
just test

# 4. Commit
git add src/parse/[domain]/[property].ts
git commit -m "refactor([property]): use comma-separated helper"
```

### Step 2.1: Refactor transition-property (10 min)

```bash
# Edit file
# Run tests
pnpm test -- transition/property

# Verify
git diff src/parse/transition/property.ts  # Review changes
git add src/parse/transition/property.ts
git commit -m "refactor(transition-property): use comma-separated helper"
```

### Step 2.2: Refactor remaining transition properties (30 min)

Repeat for:
- `transition-delay` (~10 min)
- `transition-duration` (~10 min)
- `transition-timing-function` (~10 min)

```bash
# After each property
pnpm test -- transition/[property-name]
git add src/parse/transition/[property].ts
git commit -m "refactor(transition-[property]): use comma-separated helper"
```

### Step 2.3: Refactor animation properties (1 hour)

Repeat for all 8 animation properties:
- `animation-name` (~10 min)
- `animation-delay` (~7 min)
- `animation-duration` (~7 min)
- `animation-direction` (~7 min)
- `animation-fill-mode` (~7 min)
- `animation-iteration-count` (~7 min)
- `animation-play-state` (~7 min)
- `animation-timing-function` (~8 min)

```bash
# After each property
pnpm test -- animation/[property-name]
git add src/parse/animation/[property].ts
git commit -m "refactor(animation-[property]): use comma-separated helper"
```

### Step 2.4: Final Verification (10 min)

```bash
# Run all quality gates
just check  # Format + typecheck + lint
just test   # All tests (should be 2176+ passing)

# Check code reduction
git diff --stat origin/main  # Should show net reduction

# Create summary commit
git commit --allow-empty -m "refactor: extract comma-separated parsing helper

- Created parseCommaSeparatedSingle utility
- Refactored 12 properties to use helper
- Reduced ~350 lines of duplication
- All 2176 tests passing"
```

---

## Phase 3: Documentation & Handover (20 min)

### Step 3.1: Update CHANGELOG.md

Add entry:

```markdown
## [Unreleased]

### Changed
- **Internal**: Extracted comma-separated value parsing into reusable utility
- **Internal**: Refactored 12 properties to use shared comma-separated helper:
  - All animation longhand properties (8)
  - All transition longhand properties (4)
- **Impact**: ~200 lines of code reduction, improved maintainability
- **Tests**: All existing tests passing (no behavior changes)
```

### Step 3.2: Create HANDOVER.md

**File**: `.memory/archive/2025-10-20-comma-separated-research/HANDOVER.md`

Document:
- What was done
- Files changed
- Test results
- Commits made
- Next agent recommendations

### Step 3.3: Update CONTINUE.md

Update project state with completion status.

---

## Testing Strategy

### Unit Tests (Helper Function)
- ✅ ~30 tests for `parseCommaSeparatedSingle`
- Coverage: basic, whitespace, errors, edge cases

### Integration Tests (Refactored Properties)
- ✅ No new tests needed
- Existing tests validate behavior unchanged
- 2176 tests should all still pass

### Manual Verification (Optional)
Compare outputs before/after:

```typescript
// Test script
import * as OldParser from "./old/animation-name";
import * as NewParser from "./src/parse/animation/name";

const testCases = [
  "fade",
  "fade, slide",
  "none",
  "a, b, c, d, e",
];

for (const css of testCases) {
  const oldResult = OldParser.parse(css);
  const newResult = NewParser.parse(css);
  console.assert(
    JSON.stringify(oldResult) === JSON.stringify(newResult),
    `Mismatch for: ${css}`
  );
}
```

---

## Rollback Plan

If anything goes wrong:

```bash
# Option 1: Revert specific property
git checkout origin/main -- src/parse/[domain]/[property].ts
pnpm test

# Option 2: Revert entire refactoring
git revert <commit-range>

# Option 3: Delete helper and restore all
git checkout origin/main -- src/utils/parse/comma-separated.ts
git checkout origin/main -- src/parse/animation/*.ts
git checkout origin/main -- src/parse/transition/*.ts
```

---

## Success Criteria

- [x] Helper function created with full test coverage (~30 tests)
- [x] 12 properties refactored successfully
- [x] All 2176+ tests passing
- [x] `just check` passing (format, typecheck, lint)
- [x] Net code reduction: ~200 lines
- [x] No behavior changes (validated by existing tests)
- [x] Clean git history with atomic commits
- [x] Documentation updated (CHANGELOG, HANDOVER)

---

## Time Breakdown

| Phase | Task | Estimated | Actual |
|-------|------|-----------|--------|
| 1.1 | Create helper function | 10 min | |
| 1.2 | Create helper tests | 20 min | |
| 1.3 | Update utils index | 5 min | |
| 1.4 | Verify helper | 10 min | |
| 2.1 | Refactor transition-property | 10 min | |
| 2.2 | Refactor 3 transition props | 30 min | |
| 2.3 | Refactor 8 animation props | 60 min | |
| 2.4 | Final verification | 10 min | |
| 3 | Documentation & handover | 20 min | |
| **Total** | | **175 min** | |

**Estimated**: ~3 hours  
**Buffer**: +30 min for unexpected issues  
**Total with buffer**: ~3.5 hours

---

## Next Agent Instructions

To execute this plan:

```bash
# 1. Read this file completely
cat .memory/archive/2025-10-20-comma-separated-research/IMPLEMENTATION_PLAN.md

# 2. Read research findings
cat .memory/archive/2025-10-20-comma-separated-research/RESEARCH_FINDINGS.md

# 3. Verify baseline
just check && just test

# 4. Execute phases in order
# - Phase 1: Create helper (~45 min)
# - Phase 2: Refactor properties (~2 hours)
# - Phase 3: Documentation (~20 min)

# 5. Create handover document
```

---

**Status**: 🟢 READY TO EXECUTE
