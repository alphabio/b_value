# Session 1: Core Infrastructure & Parse Wrapper

**Time**: 60-90 minutes  
**Impact**: 🔴 CRITICAL - Removes ALL parse boilerplate  
**Lines Saved**: ~105 lines  
**Files**: 8 (1 new + 7 refactored)

---

## 🎯 Goal

Create the foundational parse wrapper utilities that eliminate 100% of duplicated parse boilerplate across all shape parsers.

**What we're removing**:
```typescript
// THIS CODE APPEARS 7 TIMES ❌
try {
    const astResult = AstUtils.parseCssString(css);
    if (!astResult.ok) return err(astResult.error);

    const fnResult = AstUtils.findFunctionNode(astResult.value, "rect");
    if (!fnResult.ok) return err(fnResult.error);

    const args = AstUtils.parseFunctionArguments(fnResult.value);
    // ... shape logic ...
} catch (e) {
    return err(`Failed to parse rect(): ${e instanceof Error ? e.message : String(e)}`);
}
```

**What we're creating**:
```typescript
// THIS REPLACES ALL OF IT ✅
return parseShapeFunction(css, "rect", parseRectArgs);
```

---

## 📋 Task Checklist

### Part 1: Create Wrapper Utilities (30 min)

- [ ] **1.1** Create `src/parse/clip-path/utils.ts`
- [ ] **1.2** Implement `parseShapeFunction<T>()` helper
- [ ] **1.3** Implement `parseShapeFunctionRaw<T>()` helper
- [ ] **1.4** Add comprehensive JSDoc comments
- [ ] **1.5** Export from `src/parse/clip-path/index.ts`

### Part 2: Migrate Parsers (45-60 min)

- [ ] **2.1** Migrate `path.ts` (simplest, 15 min)
- [ ] **2.2** Migrate `xywh.ts` (15 min)
- [ ] **2.3** Migrate `rect.ts` (15 min)
- [ ] **2.4** Migrate `inset.ts` (15 min)
- [ ] **2.5** Migrate `circle.ts` (raw wrapper, 15 min)
- [ ] **2.6** Migrate `ellipse.ts` (raw wrapper, 15 min)
- [ ] **2.7** Migrate `polygon.ts` (raw wrapper, 15 min)

### Part 3: Verify & Commit (10 min)

- [ ] **3.1** Run `just check` (format, lint, typecheck)
- [ ] **3.2** Run `just test` (all 2318 tests pass)
- [ ] **3.3** Review changes with `git diff`
- [ ] **3.4** Commit with detailed message
- [ ] **3.5** Create HANDOVER.md

---

## 🛠️ Part 1: Create Wrapper Utilities

### Step 1.1: Create utils.ts File

```bash
# Create the new file
touch src/parse/clip-path/utils.ts
```

### Step 1.2-1.3: Implement Helper Functions

```typescript
// b_path:: src/parse/clip-path/utils.ts
import type { CssNode } from "css-tree";
import { err, type Result } from "@/core/result";
import * as AstUtils from "@/utils/ast";

/**
 * Common wrapper for parsing CSS basic shape functions.
 * 
 * Eliminates boilerplate of:
 * - Parsing CSS string to AST
 * - Finding the function node
 * - Extracting function arguments
 * - Error handling and try/catch
 * 
 * @param css - CSS string to parse (e.g., "rect(10px 20px 30px 40px)")
 * @param functionName - Name of the shape function (e.g., "rect", "circle")
 * @param parser - Function to parse shape-specific arguments
 * @returns Result with parsed shape IR or error
 * 
 * @example
 * Basic usage:
 * ```typescript
 * export function parse(css: string): Result<ClipPathRect, string> {
 *   return parseShapeFunction(css, "rect", parseRectArgs);
 * }
 * 
 * function parseRectArgs(args: CssNode[]): Result<ClipPathRect, string> {
 *   // Parse rect-specific arguments
 *   return ok({ kind: "clip-path-rect", ... });
 * }
 * ```
 * 
 * @example
 * With error handling:
 * ```typescript
 * function parseRectArgs(args: CssNode[]): Result<ClipPathRect, string> {
 *   if (args.length === 0) {
 *     return err("rect() requires at least one value");
 *   }
 *   // ... parse logic ...
 * }
 * ```
 * 
 * @public
 */
export function parseShapeFunction<T>(
	css: string,
	functionName: string,
	parser: (args: CssNode[]) => Result<T, string>,
): Result<T, string> {
	try {
		// Parse CSS string to AST
		const astResult = AstUtils.parseCssString(css);
		if (!astResult.ok) {
			return err(astResult.error);
		}

		// Find the shape function node
		const fnResult = AstUtils.findFunctionNode(astResult.value, functionName);
		if (!fnResult.ok) {
			return err(fnResult.error);
		}

		// Extract function arguments (commas removed)
		const args = AstUtils.parseFunctionArguments(fnResult.value);

		// Delegate to shape-specific parser
		return parser(args);
	} catch (e) {
		return err(
			`Failed to parse ${functionName}(): ${e instanceof Error ? e.message : String(e)}`,
		);
	}
}

/**
 * Similar to parseShapeFunction but returns raw AST children.
 * 
 * Use this variant when you need direct access to AST nodes with commas
 * preserved (e.g., polygon needs to split by commas manually).
 * 
 * @param css - CSS string to parse
 * @param functionName - Name of the shape function
 * @param parser - Function to parse raw AST children
 * @returns Result with parsed shape IR or error
 * 
 * @example
 * For shapes that need comma handling:
 * ```typescript
 * export function parse(css: string): Result<ClipPathPolygon, string> {
 *   return parseShapeFunctionRaw(css, "polygon", parsePolygonChildren);
 * }
 * 
 * function parsePolygonChildren(children: CssNode[]): Result<ClipPathPolygon, string> {
 *   // Split by commas manually
 *   const pointGroups = AstUtils.splitNodesByComma(children);
 *   // ... parse points ...
 * }
 * ```
 * 
 * @public
 */
export function parseShapeFunctionRaw<T>(
	css: string,
	functionName: string,
	parser: (children: CssNode[]) => Result<T, string>,
): Result<T, string> {
	try {
		// Parse CSS string to AST
		const astResult = AstUtils.parseCssString(css);
		if (!astResult.ok) {
			return err(astResult.error);
		}

		// Find the shape function node
		const fnResult = AstUtils.findFunctionNode(astResult.value, functionName);
		if (!fnResult.ok) {
			return err(fnResult.error);
		}

		// Get raw children (commas preserved)
		const children = fnResult.value.children.toArray();

		// Delegate to shape-specific parser
		return parser(children);
	} catch (e) {
		return err(
			`Failed to parse ${functionName}(): ${e instanceof Error ? e.message : String(e)}`,
		);
	}
}
```

### Step 1.4: Add to Index Exports

```typescript
// b_path:: src/parse/clip-path/index.ts (add this line)
export * as Utils from "./utils";
```

---

## 🔄 Part 2: Migrate Parsers

### Migration Pattern (Same for All Files)

**For each file**:
1. Import wrapper: `import { parseShapeFunction } from "./utils"`
2. Extract shape logic into `parse{Shape}Args` function
3. Replace main parse function with wrapper call
4. Run tests: `just test src/parse/clip-path/{shape}.test.ts`
5. Commit: `git commit -m "refactor(clip-path): DRY up {shape}() parser"`

---

### Step 2.1: Migrate path.ts (Simplest First!)

**BEFORE** (140 lines):
```typescript
export function parse(css: string): Result<Type.ClipPathPath, string> {
	try {
		const astResult = AstUtils.parseCssString(css);
		if (!astResult.ok) {
			return err(astResult.error);
		}

		const fnResult = AstUtils.findFunctionNode(astResult.value, "path");
		if (!fnResult.ok) {
			return err(fnResult.error);
		}

		const args = AstUtils.parseFunctionArguments(fnResult.value);

		// ... 100+ lines of path-specific logic ...
	} catch (error) {
		return err(`Error parsing path(): ${error instanceof Error ? error.message : String(error)}`);
	}
}
```

**AFTER** (~125 lines, saves 15 lines):
```typescript
import { parseShapeFunction } from "./utils";

export function parse(css: string): Result<Type.ClipPathPath, string> {
	return parseShapeFunction(css, "path", parsePathArgs);
}

function parsePathArgs(args: CssNode[]): Result<Type.ClipPathPath, string> {
	if (args.length === 0) {
		return err("path() requires a path data string");
	}

	// Check if first argument is fill-rule keyword
	let fillRule: "nonzero" | "evenodd" | undefined;
	let pathDataNode: CssNode;

	// ... rest of path-specific logic (unchanged) ...
}
```

**Test & Commit**:
```bash
just test src/parse/clip-path/path.test.ts
git add src/parse/clip-path/path.ts
git commit -m "refactor(clip-path): DRY up path() parser

- Use parseShapeFunction wrapper
- Extract parsePathArgs helper
- Remove 15 lines of boilerplate
- All 30 tests passing"
```

---

### Step 2.2: Migrate xywh.ts

**Follow same pattern as path.ts**:

```typescript
import { parseShapeFunction } from "./utils";

export function parse(css: string): Result<Type.ClipPathXywh, string> {
	return parseShapeFunction(css, "xywh", parseXywhArgs);
}

function parseXywhArgs(args: CssNode[]): Result<Type.ClipPathXywh, string> {
	if (args.length === 0) {
		return err("xywh() requires exactly 4 values");
	}

	// Find 'round' keyword
	const roundIndex = args.findIndex(
		(node) => node.type === "Identifier" && node.name.toLowerCase() === "round"
	);

	// ... rest unchanged ...
}
```

---

### Step 2.3: Migrate rect.ts

**Same pattern**:

```typescript
import { parseShapeFunction } from "./utils";

export function parse(css: string): Result<Type.ClipPathRect, string> {
	return parseShapeFunction(css, "rect", parseRectArgs);
}

function parseRectArgs(args: CssNode[]): Result<Type.ClipPathRect, string> {
	// ... rect-specific logic ...
}
```

---

### Step 2.4: Migrate inset.ts

**Same pattern**:

```typescript
import { parseShapeFunction } from "./utils";

export function parse(css: string): Result<Type.ClipPathInset, string> {
	return parseShapeFunction(css, "inset", parseInsetArgs);
}

function parseInsetArgs(args: CssNode[]): Result<Type.ClipPathInset, string> {
	// ... inset-specific logic ...
}
```

---

### Step 2.5: Migrate circle.ts (Raw Wrapper)

**Uses `parseShapeFunctionRaw` for index-based parsing**:

```typescript
import { parseShapeFunctionRaw } from "./utils";

export function parse(css: string): Result<Type.ClipPathCircle, string> {
	return parseShapeFunctionRaw(css, "circle", parseCircleChildren);
}

function parseCircleChildren(children: CssNode[]): Result<Type.ClipPathCircle, string> {
	if (children.length === 0) {
		return ok({ kind: "clip-path-circle" });
	}

	let idx = 0;
	// ... rest unchanged (uses children array) ...
}
```

---

### Step 2.6: Migrate ellipse.ts (Raw Wrapper)

**Same as circle**:

```typescript
import { parseShapeFunctionRaw } from "./utils";

export function parse(css: string): Result<Type.ClipPathEllipse, string> {
	return parseShapeFunctionRaw(css, "ellipse", parseEllipseChildren);
}

function parseEllipseChildren(children: CssNode[]): Result<Type.ClipPathEllipse, string> {
	// ... ellipse-specific logic ...
}
```

---

### Step 2.7: Migrate polygon.ts (Raw Wrapper)

**Needs raw children for comma splitting**:

```typescript
import { parseShapeFunctionRaw } from "./utils";

export function parse(css: string): Result<Type.ClipPathPolygon, string> {
	return parseShapeFunctionRaw(css, "polygon", parsePolygonChildren);
}

function parsePolygonChildren(children: CssNode[]): Result<Type.ClipPathPolygon, string> {
	let idx = 0;
	let fillRule: Type.ClipPathPolygon["fillRule"];
	
	// ... rest unchanged (needs raw children for comma handling) ...
}
```

---

## ✅ Part 3: Verify & Commit

### Step 3.1: Format & Lint Check

```bash
just check
# ✅ Should pass with no errors
```

### Step 3.2: Full Test Suite

```bash
just test
# ✅ Should see: 2318 tests passing (including 307 clip-path)
```

### Step 3.3: Review Changes

```bash
# See all changes
git diff

# Count lines changed
git diff --stat
```

**Expected**:
- 1 file added: `utils.ts` (~110 lines)
- 7 files modified: All shape parsers
- Net result: ~15 lines removed per file = ~105 lines saved
- Final: ~860 lines (down from 965)

### Step 3.4: Final Commit

```bash
git add src/parse/clip-path/
git commit -m "refactor(clip-path): DRY up all shape parsers with wrapper utilities

Session 1 Complete - Core Infrastructure

Created:
- src/parse/clip-path/utils.ts with parseShapeFunction helpers

Refactored:
- path.ts, xywh.ts, rect.ts, inset.ts (use parseShapeFunction)
- circle.ts, ellipse.ts, polygon.ts (use parseShapeFunctionRaw)

Impact:
- Removed ~105 lines of duplicated parse boilerplate
- All 307 clip-path tests passing
- Duplication: 33% → 18% (-15%)
- Each parser now focused on shape-specific logic only

See: .memory/archive/[session]/HANDOVER.md"
```

### Step 3.5: Create Handover

```bash
cat > .memory/archive/$(date +%Y-%m-%d)-clip-path-dry-session-1/HANDOVER.md << 'EOF'
# Session 1 Handover - Core Infrastructure

**Date**: 2025-10-20  
**Duration**: XX minutes  
**Status**: ✅ DONE

---

## Completed Tasks
- [x] Created src/parse/clip-path/utils.ts
- [x] Implemented parseShapeFunction wrapper
- [x] Implemented parseShapeFunctionRaw wrapper
- [x] Migrated all 7 shape parsers
- [x] All 307 tests passing

## Metrics
- Lines removed: ~105
- Files created: 1 (utils.ts)
- Files migrated: 7/7 parsers
- Tests: 307 passing (no regression)
- Duplication: 33% → 18% (-15%)

## Next Session Should Start With
Session 2 - Border-Radius & Position Utilities:
1. Add parseRoundBorderRadius() to src/utils/parse/nodes.ts
2. Add parseAtPosition() to src/utils/parse/nodes.ts
3. Refactor inset/rect/xywh to use parseRoundBorderRadius
4. Refactor circle/ellipse to use parseAtPosition
5. Target: Remove ~45 more lines

## Blockers
None - session completed successfully.

## Key Decisions Made
- Created TWO wrappers: parseShapeFunction (args) and parseShapeFunctionRaw (children)
- Reason: polygon/circle/ellipse need raw children for comma/index handling
- Kept error messages identical to preserve test expectations
- Extracted shape logic into separate functions (parseXxxArgs/parseXxxChildren)

## Tricky Parts / Gotchas
- polygon MUST use Raw wrapper due to comma splitting
- circle/ellipse use Raw wrapper for index-based parsing
- Error messages in wrapper must match original format exactly
- All tests passed without modification (good sign!)

## Code Quality Notes
- Added comprehensive JSDoc to both wrapper functions
- Included usage examples in comments
- Each parser now <100 lines and very readable
- Shape-specific logic clearly separated from boilerplate

EOF
```

---

## 🎯 Success Criteria

By end of session, you should have:

- [x] `src/parse/clip-path/utils.ts` created (~110 lines)
- [x] 7 parsers refactored (all using wrappers)
- [x] All 2318 tests passing (307 clip-path)
- [x] `just check` passing (no lint errors)
- [x] ~105 lines removed
- [x] Duplication reduced: 33% → 18%
- [x] HANDOVER.md created
- [x] Clean git history with good commit messages

---

## 💡 Tips & Tricks

### Migration Order Matters
Start with **simplest first** (path) to gain confidence, then tackle more complex ones.

### Test After Each File
Don't migrate all files then test. Test after EACH migration to catch issues early.

### Preserve Error Messages
Tests depend on exact error message text. Don't "improve" them during refactoring.

### Keep Original Logic
Don't refactor logic WHILE refactoring structure. One thing at a time.

### Use Git Liberally
Commit after each successful file migration. Easy to revert if needed.

---

## 🚨 Common Issues & Solutions

### Issue: Tests fail with "unexpected error message"
**Solution**: Error message in wrapper must match original exactly.

### Issue: polygon tests fail
**Solution**: polygon MUST use `parseShapeFunctionRaw`, not `parseShapeFunction`.

### Issue: circle/ellipse tests fail
**Solution**: These also need `parseShapeFunctionRaw` for index-based parsing.

### Issue: TypeScript errors on generic types
**Solution**: Ensure `Result<Type.ClipPathXxx, string>` is explicit in all signatures.

---

## 📚 Reference Examples

### Good Commit Message
```
refactor(clip-path): DRY up path() parser

- Use parseShapeFunction wrapper
- Extract parsePathArgs helper
- Remove 15 lines of boilerplate
- All 30 tests passing
```

### Bad Commit Message
```
update path parser
```

### Good Function Name
```typescript
function parseRectArgs(args: CssNode[]): Result<ClipPathRect, string>
```

### Bad Function Name
```typescript
function parseArgs(args: CssNode[]): Result<any, string>
```

---

**Ready to start?** Create your session directory and begin with Part 1! 🚀

**Questions?** Review MASTER_PLAN.md or EVALUATION.md for context.

**Stuck?** Take a break, re-read the section, check existing code patterns.
