# Clip-Path DRY Refactoring Proposal

**Date**: 2025-10-20  
**Context**: Eliminate 180+ lines of duplication in clip-path parsers  
**Risk Level**: LOW (all changes preserve existing behavior)

---

## 📋 Executive Summary

**Problem**: 33-39% code duplication across 7 shape parsers  
**Solution**: Extract 4 common helper functions  
**Impact**: Remove ~180 lines, improve maintainability  
**Time**: 2-4 hours (depending on phases)  
**Tests**: 307 existing tests validate all changes

---

## 🎯 Phase 1: High-Priority Refactoring

### 1.1 Common Parser Wrapper

**File**: `src/parse/clip-path/utils.ts` (NEW)

```typescript
// b_path:: src/parse/clip-path/utils.ts
import type { CssNode } from "css-tree";
import { err, type Result } from "@/core/result";
import * as AstUtils from "@/utils/ast";

/**
 * Common wrapper for parsing CSS basic shape functions.
 * 
 * Handles the boilerplate of:
 * 1. Parsing CSS string to AST
 * 2. Finding the function node
 * 3. Extracting function arguments
 * 4. Error handling
 * 
 * @param css - CSS string to parse
 * @param functionName - Name of the shape function (e.g., "circle", "rect")
 * @param parser - Function-specific parser for arguments
 * @returns Result with parsed shape IR or error
 * 
 * @example
 * ```typescript
 * export function parse(css: string): Result<Type.ClipPathCircle, string> {
 *   return parseShapeFunction(css, "circle", (args) => {
 *     // Parse circle-specific arguments
 *     return ok({ kind: "clip-path-circle", ... });
 *   });
 * }
 * ```
 */
export function parseShapeFunction<T>(
	css: string,
	functionName: string,
	parser: (args: CssNode[]) => Result<T, string>,
): Result<T, string> {
	try {
		const astResult = AstUtils.parseCssString(css);
		if (!astResult.ok) {
			return err(astResult.error);
		}

		const fnResult = AstUtils.findFunctionNode(astResult.value, functionName);
		if (!fnResult.ok) {
			return err(fnResult.error);
		}

		const args = AstUtils.parseFunctionArguments(fnResult.value);
		return parser(args);
	} catch (e) {
		return err(
			`Failed to parse ${functionName}(): ${e instanceof Error ? e.message : String(e)}`,
		);
	}
}

/**
 * Similar to parseShapeFunction but returns raw children instead of parsed args.
 * 
 * Used for shapes that need direct access to AST nodes with commas preserved
 * (e.g., polygon, circle, ellipse).
 * 
 * @param css - CSS string to parse
 * @param functionName - Name of the shape function
 * @param parser - Function-specific parser for raw children
 * @returns Result with parsed shape IR or error
 */
export function parseShapeFunctionRaw<T>(
	css: string,
	functionName: string,
	parser: (children: CssNode[]) => Result<T, string>,
): Result<T, string> {
	try {
		const astResult = AstUtils.parseCssString(css);
		if (!astResult.ok) {
			return err(astResult.error);
		}

		const fnResult = AstUtils.findFunctionNode(astResult.value, functionName);
		if (!fnResult.ok) {
			return err(fnResult.error);
		}

		const children = fnResult.value.children.toArray();
		return parser(children);
	} catch (e) {
		return err(
			`Failed to parse ${functionName}(): ${e instanceof Error ? e.message : String(e)}`,
		);
	}
}
```

**Migration Example** (rect.ts):

```typescript
// BEFORE (143 lines)
export function parse(css: string): Result<Type.ClipPathRect, string> {
	try {
		const astResult = AstUtils.parseCssString(css);
		if (!astResult.ok) {
			return err(astResult.error);
		}

		const fnResult = AstUtils.findFunctionNode(astResult.value, "rect");
		if (!fnResult.ok) {
			return err(fnResult.error);
		}

		const args = AstUtils.parseFunctionArguments(fnResult.value);
		// ... 100+ lines of rect-specific logic ...
	} catch (error) {
		return err(`Error parsing rect(): ${error instanceof Error ? error.message : String(error)}`);
	}
}

// AFTER (128 lines - saves 15 lines)
import { parseShapeFunction } from "./utils";

export function parse(css: string): Result<Type.ClipPathRect, string> {
	return parseShapeFunction(css, "rect", parseRectArgs);
}

function parseRectArgs(args: CssNode[]): Result<Type.ClipPathRect, string> {
	if (args.length === 0) {
		return err("rect() requires at least one value");
	}

	// Find 'round' keyword (if present)
	const roundIndex = args.findIndex(
		(node) => node.type === "Identifier" && node.name.toLowerCase() === "round"
	);
	
	// ... rest of rect-specific logic (unchanged) ...
}
```

**Files to Migrate**:
1. ✅ `rect.ts` - Uses `parseFunctionArguments`
2. ✅ `xywh.ts` - Uses `parseFunctionArguments`
3. ✅ `inset.ts` - Uses `parseFunctionArguments`
4. ✅ `path.ts` - Uses `parseFunctionArguments`
5. ✅ `circle.ts` - Uses `children.toArray()` → use `parseShapeFunctionRaw`
6. ✅ `ellipse.ts` - Uses `children.toArray()` → use `parseShapeFunctionRaw`
7. ✅ `polygon.ts` - Uses `children.toArray()` → use `parseShapeFunctionRaw`

**Savings**: ~15 lines × 7 files = **~105 lines**

---

### 1.2 Border-Radius 'round' Helper

**File**: `src/utils/parse/border-radius.ts` (EXTEND EXISTING)

```typescript
/**
 * Parse optional 'round <border-radius>' clause from function arguments.
 * 
 * Finds 'round' keyword and parses subsequent border-radius values.
 * 
 * @param args - Function arguments (may contain 'round' keyword)
 * @param valueSectionLength - Number of args before 'round' keyword
 * @returns Result with border-radius and index where 'round' starts
 * 
 * @example
 * ```typescript
 * // args = [10px, 20px, 'round', 5px, 10px]
 * const result = parseRoundBorderRadius(args, 2);
 * // { roundIndex: 2, borderRadius: { ... } }
 * ```
 */
export function parseRoundBorderRadius(
	args: CssNode[],
): Result<{ roundIndex: number; borderRadius?: InsetBorderRadius }, string> {
	const roundIndex = args.findIndex(
		(node) => node.type === "Identifier" && node.name.toLowerCase() === "round",
	);

	if (roundIndex === -1) {
		return ok({ roundIndex: -1 });
	}

	const radiusNodes = args.slice(roundIndex + 1);
	if (radiusNodes.length === 0) {
		return err("Expected border-radius values after 'round' keyword");
	}

	const radiusResult = parseBorderRadiusShorthand(radiusNodes);
	if (!radiusResult.ok) {
		return err(`Invalid border-radius: ${radiusResult.error}`);
	}

	return ok({
		roundIndex,
		borderRadius: radiusResult.value,
	});
}
```

**Migration Example** (rect.ts):

```typescript
// BEFORE
const roundIndex = args.findIndex(
	(node) => node.type === "Identifier" && node.name.toLowerCase() === "round"
);

let borderRadius: Type.InsetBorderRadius | undefined;
if (roundIndex !== -1) {
	const radiusNodes = args.slice(roundIndex + 1);

	if (radiusNodes.length === 0) {
		return err("Expected border-radius values after 'round' keyword");
	}

	const radiusResult = ParseUtils.parseBorderRadiusShorthand(radiusNodes);
	if (!radiusResult.ok) {
		return err(`Invalid border-radius: ${radiusResult.error}`);
	}

	borderRadius = radiusResult.value;
}

// AFTER
const roundResult = ParseUtils.parseRoundBorderRadius(args);
if (!roundResult.ok) return roundResult;

const { roundIndex, borderRadius } = roundResult.value;
```

**Files to Migrate**:
1. ✅ `inset.ts`
2. ✅ `rect.ts`
3. ✅ `xywh.ts`

**Savings**: ~12 lines × 3 files = **~36 lines**

---

## 🎯 Phase 2: Optional Refactoring

### 2.1 Position 'at' Helper

**File**: `src/utils/parse/position.ts` (EXTEND EXISTING)

```typescript
/**
 * Parse optional 'at <position>' clause from AST children.
 * 
 * Used by circle() and ellipse() for center position.
 * 
 * @param children - AST nodes (may contain 'at' keyword)
 * @param startIdx - Index to start parsing from
 * @returns Result with position and next index
 * 
 * @example
 * ```typescript
 * // children = [50px, 'at', center, top]
 * const result = parseAtPosition(children, 1);
 * // { position: { x: "center", y: "top" }, nextIdx: 4 }
 * ```
 */
export function parseAtPosition(
	children: CssNode[],
	startIdx: number,
): Result<{ position?: Position2D; nextIdx: number }, string> {
	if (startIdx >= children.length) {
		return ok({ nextIdx: startIdx });
	}

	const atNode = children[startIdx];
	if (atNode?.type !== "Identifier" || atNode.name.toLowerCase() !== "at") {
		// No 'at' keyword, return current index
		return ok({ nextIdx: startIdx });
	}

	// Skip 'at' keyword
	const positionStartIdx = startIdx + 1;
	const positionNodes = children.slice(positionStartIdx);

	if (positionNodes.length === 0) {
		return err("Expected position after 'at' keyword");
	}

	const posResult = parsePosition2D(positionNodes, 0);
	if (!posResult.ok) return posResult;

	return ok({
		position: posResult.value.position,
		nextIdx: positionStartIdx + posResult.value.nextIdx,
	});
}
```

**Files to Migrate**:
1. ✅ `circle.ts`
2. ✅ `ellipse.ts`

**Savings**: ~14 lines × 2 files = **~28 lines**

---

### 2.2 Radial Size Helper

**File**: `src/utils/parse/radial-size.ts` (NEW)

```typescript
/**
 * Parse radial size value (keyword or length-percentage).
 * 
 * Used by circle() and ellipse() for radius values.
 * 
 * @param node - AST node to parse
 * @param propertyName - Name for error messages (e.g., "radius", "radiusX")
 * @returns Result with parsed size value
 * 
 * @example
 * ```typescript
 * const result = parseRadialSize(node, "radius");
 * // "closest-side" | "farthest-side" | LengthPercentage
 * ```
 */
export function parseRadialSize(
	node: CssNode | undefined,
	propertyName: string,
): Result<"closest-side" | "farthest-side" | LengthPercentage | undefined, string> {
	if (!node) {
		return ok(undefined);
	}

	// Check for radial size keywords
	if (node.type === "Identifier") {
		const keyword = node.name.toLowerCase();
		if (keyword === "closest-side" || keyword === "farthest-side") {
			return ok(keyword);
		}
		// Invalid keyword (but might be 'at' or other valid keyword for next part)
		return ok(undefined);
	}

	// Parse as length-percentage
	const lpResult = parseLengthPercentageNode(node);
	if (!lpResult.ok) {
		return lpResult;
	}

	// Validate non-negative
	if (lpResult.value.value < 0) {
		return err(`${propertyName} must be non-negative`);
	}

	return ok(lpResult.value);
}
```

**Files to Migrate**:
1. ✅ `circle.ts` - Once for radius
2. ✅ `ellipse.ts` - Twice for radiusX and radiusY

**Savings**: ~10 lines × 3 occurrences = **~30 lines**

---

## 📊 Impact Summary

| Phase | Helper | Files | Lines Saved | Time | Risk |
|-------|--------|-------|-------------|------|------|
| 1.1 | `parseShapeFunction` | 7 | ~105 | 45m | Low |
| 1.2 | `parseRoundBorderRadius` | 3 | ~36 | 30m | Low |
| **Phase 1 Total** | | **10** | **~141** | **75m** | **Low** |
| 2.1 | `parseAtPosition` | 2 | ~28 | 25m | Low-Med |
| 2.2 | `parseRadialSize` | 2 | ~30 | 25m | Low |
| **Phase 2 Total** | | **4** | **~58** | **50m** | **Low-Med** |
| **GRAND TOTAL** | **4 helpers** | **14 migrations** | **~199 lines** | **~2 hours** | **Low** |

---

## 🚦 Implementation Plan

### Step 1: Create Helpers (30-45 min)
1. ✅ Create `src/parse/clip-path/utils.ts`
   - Implement `parseShapeFunction`
   - Implement `parseShapeFunctionRaw`
2. ✅ Extend `src/utils/parse/border-radius.ts`
   - Add `parseRoundBorderRadius`
3. ⚠️ Optional: Create position/radial helpers

### Step 2: Migrate Files One-by-One (45-75 min)
For each file:
1. Import helper(s)
2. Refactor parse function
3. Extract args parser to separate function
4. Run `just test` to verify no breakage
5. Commit with message: `refactor(clip-path): DRY up [shape] parser`

**Order** (simplest → most complex):
1. `path.ts` - Simplest (just wrapper)
2. `xywh.ts` - Wrapper + border-radius
3. `rect.ts` - Wrapper + border-radius + TRBL
4. `inset.ts` - Wrapper + border-radius + TRBL
5. `circle.ts` - Raw wrapper + radial size + position
6. `ellipse.ts` - Raw wrapper + radial size (2x) + position
7. `polygon.ts` - Raw wrapper (complex comma logic)

### Step 3: Verify & Document (10-15 min)
1. Run full test suite: `just test`
2. Ensure all 307 tests pass
3. Run `just check` (format, lint, typecheck)
4. Update `CHANGELOG.md` with refactoring entry
5. Final commit: `docs(clip-path): document DRY refactoring`

---

## ✅ Success Criteria

- [ ] All 307 existing tests pass unchanged
- [ ] No new tests needed (behavior preserved)
- [ ] `just check` passes (lint, format, typecheck)
- [ ] ~180-200 lines removed
- [ ] Code duplication: 33% → ~15%
- [ ] No breaking changes to public API
- [ ] Git history shows incremental commits

---

## 🚨 Risk Mitigation

### Risk: Breaking existing functionality
**Mitigation**: 
- Test after each file migration
- Preserve exact error messages
- Keep test coverage at 100%

### Risk: Making code harder to understand
**Mitigation**:
- Add comprehensive JSDoc to helpers
- Keep shape-specific logic in original files
- Only extract truly repeated patterns

### Risk: Over-abstraction
**Mitigation**:
- Only extract patterns repeated 3+ times
- Keep helpers simple and focused
- Don't force-fit different patterns

---

## 📝 Testing Strategy

### Before Refactoring
```bash
just test
# ✅ 2318 tests pass
```

### During Refactoring (After Each File)
```bash
just test src/parse/clip-path/rect.test.ts
# ✅ 28 rect tests pass

just test
# ✅ All 2318 tests still pass
```

### After Refactoring
```bash
just check && just test
# ✅ All quality gates pass
# ✅ All 2318 tests pass
# ✅ No regression
```

---

## 🎓 Learning Outcomes

### Skills Demonstrated
- ✅ Identifying code duplication patterns
- ✅ Designing clean abstractions
- ✅ Refactoring without breaking tests
- ✅ Balancing DRY vs readability
- ✅ Risk assessment and mitigation

### Principles Applied
- **DRY** (Don't Repeat Yourself) - Single source of truth
- **KISS** (Keep It Simple, Stupid) - Simple, focused helpers
- **YAGNI** (You Aren't Gonna Need It) - Only extract what's actually repeated
- **Boy Scout Rule** - Leave code cleaner than you found it

---

## 🏁 Decision: Proceed or Ship As-Is?

### Option A: Ship As-Is ✅
**Pros**:
- Feature-complete right now
- All tests passing
- 100% spec compliance
- Zero risk

**Cons**:
- 33% code duplication
- Higher maintenance burden
- Harder to add new shapes

**Best for**: Tight deadline, shipping urgency

---

### Option B: Refactor Phase 1 Only 🟡
**Pros**:
- Remove ~140 lines (70% of duplication)
- Low risk, high reward
- 75 minutes time investment
- Sets foundation for future

**Cons**:
- Delays shipping by ~1 hour
- Some duplication remains

**Best for**: Balanced approach, sustainable quality

---

### Option C: Full Refactoring 🟢
**Pros**:
- Remove ~200 lines (all duplication)
- Gold-standard code quality
- Maximum maintainability
- Complete DRY compliance

**Cons**:
- Delays shipping by ~2 hours
- Medium-low risk

**Best for**: Long-term project, high quality bar

---

## 💬 Recommendation

**Go with Option B** (Phase 1 only):

1. Biggest impact with least risk
2. Removes 70% of duplication in 75 minutes
3. Makes future shapes easier to add
4. Still ships today (not delayed significantly)
5. Can do Phase 2 later if needed

**Next steps if approved**:
1. Create helpers (30 min)
2. Migrate 7 files (45 min)
3. Verify and commit (15 min)
4. Ship! 🚀

---

**Ready to proceed?** Let me know which option you prefer.
