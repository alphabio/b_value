# Session 2: Border-Radius & Position Utilities

**Time**: 45-60 minutes  
**Impact**: 🟡 HIGH - DRY up border-radius and position patterns  
**Lines Saved**: ~45 lines  
**Files**: 7 (2 utilities + 5 refactored)

---

## 🎯 Goal

Extract common patterns for border-radius parsing and position 'at' keyword handling into reusable utilities.

**What we're removing**:
```typescript
// REPEATED 3 TIMES in inset/rect/xywh ❌
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
```

**What we're creating**:
```typescript
// REPLACES ALL OF IT ✅
const roundResult = parseRoundBorderRadius(args);
if (!roundResult.ok) return roundResult;
const { roundIndex, borderRadius } = roundResult.value;
```

---

## 📋 Task Checklist

### Part 1: Create Border-Radius Helper (20 min)

- [ ] **1.1** Open `src/utils/parse/nodes.ts`
- [ ] **1.2** Add `parseRoundBorderRadius()` function
- [ ] **1.3** Add comprehensive JSDoc
- [ ] **1.4** Export from `src/utils/parse/index.ts`
- [ ] **1.5** Write 3-5 quick tests (optional but recommended)

### Part 2: Create Position 'at' Helper (15 min)

- [ ] **2.1** Add `parseAtPosition()` to `nodes.ts`
- [ ] **2.2** Add comprehensive JSDoc
- [ ] **2.3** Export from `src/utils/parse/index.ts`
- [ ] **2.4** Write 2-3 quick tests (optional)

### Part 3: Refactor Border-Radius Users (20 min)

- [ ] **3.1** Update `inset.ts` to use helper
- [ ] **3.2** Update `rect.ts` to use helper
- [ ] **3.3** Update `xywh.ts` to use helper
- [ ] **3.4** Test each after update

### Part 4: Refactor Position 'at' Users (10 min)

- [ ] **4.1** Update `circle.ts` to use helper
- [ ] **4.2** Update `ellipse.ts` to use helper
- [ ] **4.3** Test each after update

### Part 5: Verify & Commit (5 min)

- [ ] **5.1** Run `just check`
- [ ] **5.2** Run `just test`
- [ ] **5.3** Create HANDOVER.md

---

## 🛠️ Part 1: Create Border-Radius Helper

### Step 1.1-1.2: Add parseRoundBorderRadius Function

Open `src/utils/parse/nodes.ts` and add at the end:

```typescript
/**
 * Parse optional 'round <border-radius>' clause from function arguments.
 * 
 * Finds 'round' keyword and parses subsequent border-radius values.
 * Used by inset(), rect(), and xywh() shape functions.
 * 
 * @param args - Function arguments (may contain 'round' keyword)
 * @returns Result with roundIndex and optional borderRadius
 * 
 * @example
 * Basic usage:
 * ```typescript
 * // args = [10px, 20px, 'round', 5px, 10px]
 * const result = parseRoundBorderRadius(args);
 * // { roundIndex: 2, borderRadius: { topLeft: {...}, ... } }
 * ```
 * 
 * @example
 * No 'round' keyword:
 * ```typescript
 * // args = [10px, 20px, 30px, 40px]
 * const result = parseRoundBorderRadius(args);
 * // { roundIndex: -1, borderRadius: undefined }
 * ```
 * 
 * @example
 * Error case:
 * ```typescript
 * // args = [10px, 'round'] // no radius values!
 * const result = parseRoundBorderRadius(args);
 * // err("Expected border-radius values after 'round' keyword")
 * ```
 * 
 * @public
 */
export function parseRoundBorderRadius(
	args: CssNode[],
): Result<{ roundIndex: number; borderRadius?: InsetBorderRadius }, string> {
	// Find 'round' keyword position
	const roundIndex = args.findIndex(
		(node) => node.type === "Identifier" && node.name.toLowerCase() === "round",
	);

	// No 'round' keyword found - valid case
	if (roundIndex === -1) {
		return ok({ roundIndex: -1, borderRadius: undefined });
	}

	// Get border-radius values (everything after 'round')
	const radiusNodes = args.slice(roundIndex + 1);

	// Must have at least one radius value
	if (radiusNodes.length === 0) {
		return err("Expected border-radius values after 'round' keyword");
	}

	// Parse border-radius using existing utility
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

### Step 1.3-1.4: Export from Index

Already exported via `export * from "./nodes"` in `src/utils/parse/index.ts`. ✅

---

## 🛠️ Part 2: Create Position 'at' Helper

### Step 2.1-2.2: Add parseAtPosition Function

Add to `src/utils/parse/nodes.ts`:

```typescript
/**
 * Parse optional 'at <position>' clause from AST children.
 * 
 * Finds 'at' keyword and parses subsequent position values.
 * Used by circle() and ellipse() shape functions for center position.
 * 
 * @param children - AST nodes (may contain 'at' keyword)
 * @param startIdx - Index to start parsing from
 * @returns Result with optional position and next index
 * 
 * @example
 * With 'at' keyword:
 * ```typescript
 * // children = [50px, 'at', center, top]
 * const result = parseAtPosition(children, 1);
 * // { position: { x: "center", y: "top" }, nextIdx: 4 }
 * ```
 * 
 * @example
 * No 'at' keyword:
 * ```typescript
 * // children = [50px, 100px]
 * const result = parseAtPosition(children, 1);
 * // { position: undefined, nextIdx: 1 }
 * ```
 * 
 * @example
 * Error case:
 * ```typescript
 * // children = [50px, 'at'] // no position values!
 * const result = parseAtPosition(children, 1);
 * // err("Expected position after 'at' keyword")
 * ```
 * 
 * @public
 */
export function parseAtPosition(
	children: CssNode[],
	startIdx: number,
): Result<{ position?: Position2D; nextIdx: number }, string> {
	// Check if we're at or past the end
	if (startIdx >= children.length) {
		return ok({ position: undefined, nextIdx: startIdx });
	}

	// Check if current node is 'at' keyword
	const atNode = children[startIdx];
	if (atNode?.type !== "Identifier" || atNode.name.toLowerCase() !== "at") {
		// No 'at' keyword found - valid case, return current index
		return ok({ position: undefined, nextIdx: startIdx });
	}

	// Skip 'at' keyword
	const positionStartIdx = startIdx + 1;

	// Get position nodes (everything after 'at')
	const positionNodes = children.slice(positionStartIdx);

	// Must have position values after 'at'
	if (positionNodes.length === 0) {
		return err("Expected position after 'at' keyword");
	}

	// Parse position using existing utility
	const posResult = parsePosition2D(positionNodes, 0);
	if (!posResult.ok) {
		return posResult;
	}

	return ok({
		position: posResult.value.position,
		nextIdx: positionStartIdx + posResult.value.nextIdx,
	});
}
```

---

## 🔄 Part 3: Refactor Border-Radius Users

### Migration Pattern for Border-Radius

**For inset/rect/xywh**:
1. Import: `import { parseRoundBorderRadius } from "@/utils/parse"`
2. Replace 15 lines of code with 3 lines
3. Use destructured result
4. Test immediately

---

### Step 3.1: Update inset.ts

**FIND** (around lines 58-87):
```typescript
// Find 'round' keyword (if present)
const roundIndex = args.findIndex((node) => node.type === "Identifier" && node.name.toLowerCase() === "round");

// Parse TRBL values (before 'round' or all args if no 'round')
const trblNodes = roundIndex !== -1 ? args.slice(0, roundIndex) : args;

// ... validate trblNodes ...

// Parse optional border-radius (after 'round')
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
```

**REPLACE WITH**:
```typescript
// Parse optional border-radius (if 'round' keyword present)
const roundResult = ParseUtils.parseRoundBorderRadius(args);
if (!roundResult.ok) {
	return roundResult;
}

const { roundIndex, borderRadius } = roundResult.value;

// Parse TRBL values (before 'round' or all args if no 'round')
const trblNodes = roundIndex !== -1 ? args.slice(0, roundIndex) : args;
```

**Test**:
```bash
just test src/parse/clip-path/inset.test.ts
git add src/parse/clip-path/inset.ts
git commit -m "refactor(clip-path): DRY up inset() border-radius parsing"
```

---

### Step 3.2: Update rect.ts

**Same pattern as inset** - find and replace border-radius block.

**Test**:
```bash
just test src/parse/clip-path/rect.test.ts
git add src/parse/clip-path/rect.ts
git commit -m "refactor(clip-path): DRY up rect() border-radius parsing"
```

---

### Step 3.3: Update xywh.ts

**Same pattern as inset** - find and replace border-radius block.

**Test**:
```bash
just test src/parse/clip-path/xywh.test.ts
git add src/parse/clip-path/xywh.ts
git commit -m "refactor(clip-path): DRY up xywh() border-radius parsing"
```

---

## 🔄 Part 4: Refactor Position 'at' Users

### Migration Pattern for Position 'at'

**For circle/ellipse**:
1. Import: `import { parseAtPosition } from "@/utils/parse"`
2. Replace ~18 lines with 4 lines
3. Use destructured result
4. Update index handling

---

### Step 4.1: Update circle.ts

**FIND** (around lines 69-86):
```typescript
// Parse optional position after 'at'
if (idx < children.length) {
	const atNode = children[idx];
	if (atNode?.type !== "Identifier" || atNode.name.toLowerCase() !== "at") {
		return err("Expected 'at' keyword before position");
	}
	idx++;

	const positionNodes = children.slice(idx);
	if (positionNodes.length === 0) {
		return err("Expected position after 'at'");
	}

	const posResult = ParseUtils.parsePosition2D(positionNodes, 0);
	if (!posResult.ok) return posResult;

	position = posResult.value.position;
	idx += posResult.value.nextIdx;
}
```

**REPLACE WITH**:
```typescript
// Parse optional position after 'at'
const atResult = ParseUtils.parseAtPosition(children, idx);
if (!atResult.ok) {
	return atResult;
}

position = atResult.value.position;
idx = atResult.value.nextIdx;
```

**Test**:
```bash
just test src/parse/clip-path/circle.test.ts
git add src/parse/clip-path/circle.ts
git commit -m "refactor(clip-path): DRY up circle() position parsing"
```

---

### Step 4.2: Update ellipse.ts

**Same pattern as circle** - find and replace position 'at' block.

**IMPORTANT**: ellipse has TWO optional radiuses before 'at', so the idx management is slightly more complex. Make sure the `parseAtPosition` call happens AFTER radius parsing.

**Test**:
```bash
just test src/parse/clip-path/ellipse.test.ts
git add src/parse/clip-path/ellipse.ts
git commit -m "refactor(clip-path): DRY up ellipse() position parsing"
```

---

## ✅ Part 5: Verify & Commit

### Step 5.1: Format & Lint Check

```bash
just check
# ✅ Should pass with no errors
```

### Step 5.2: Full Test Suite

```bash
just test
# ✅ Should see: 2318 tests passing (including 307 clip-path)
```

### Step 5.3: Final Commit

```bash
git add src/utils/parse/nodes.ts
git commit -m "refactor(clip-path): add border-radius and position utilities

Session 2 Complete - Border-Radius & Position Utilities

Created utilities:
- parseRoundBorderRadius() for inset/rect/xywh
- parseAtPosition() for circle/ellipse

Refactored:
- inset.ts, rect.ts, xywh.ts (use parseRoundBorderRadius)
- circle.ts, ellipse.ts (use parseAtPosition)

Impact:
- Removed ~45 lines of duplicated code
- All 307 clip-path tests passing
- Duplication: 18% → 12% (-6%)
- Border-radius handling now DRY
- Position 'at' handling now DRY

See: .memory/archive/[session]/HANDOVER.md"
```

### Step 5.4: Create Handover

```bash
cat > .memory/archive/$(date +%Y-%m-%d)-clip-path-dry-session-2/HANDOVER.md << 'EOF'
# Session 2 Handover - Border-Radius & Position Utilities

**Date**: 2025-10-20  
**Duration**: XX minutes  
**Status**: ✅ DONE

---

## Completed Tasks
- [x] Added parseRoundBorderRadius() to nodes.ts
- [x] Added parseAtPosition() to nodes.ts
- [x] Refactored inset/rect/xywh to use parseRoundBorderRadius
- [x] Refactored circle/ellipse to use parseAtPosition
- [x] All 307 tests passing

## Metrics
- Lines removed: ~45
- Utilities created: 2 (border-radius + position)
- Files refactored: 5 parsers
- Tests: 307 passing (no regression)
- Duplication: 18% → 12% (-6%)
- Cumulative savings: ~150 lines (Session 1 + 2)

## Next Session Should Start With
Session 3 - Radial Utilities & Final Polish:
1. Add parseRadialSize() to src/utils/parse/nodes.ts
2. Refactor circle.ts to use parseRadialSize (1x)
3. Refactor ellipse.ts to use parseRadialSize (2x for radiusX/Y)
4. Review generators for duplication patterns
5. Add documentation and examples
6. Target: Remove ~40 more lines + polish

## Blockers
None - session completed successfully.

## Key Decisions Made
- Put both utilities in nodes.ts (logical home for parse helpers)
- parseRoundBorderRadius returns both index AND borderRadius
- parseAtPosition returns both position AND nextIdx (maintains state)
- Kept error messages identical for test compatibility

## Tricky Parts / Gotchas
- parseAtPosition must handle "no 'at' keyword" gracefully (return undefined)
- ellipse.ts has complex idx tracking due to TWO optional radiuses
- Border-radius parsing order: must happen BEFORE using the roundIndex
- Position 'at' comes AFTER all shape parameters

## Code Quality Notes
- Added comprehensive JSDoc with 3 examples each
- Error cases clearly documented
- Return types explicit for type safety
- Helpers are composable and reusable

EOF
```

---

## 🎯 Success Criteria

By end of session, you should have:

- [x] 2 new utilities in `nodes.ts` (~60 lines)
- [x] 5 parsers refactored (using new helpers)
- [x] All 2318 tests passing (307 clip-path)
- [x] `just check` passing (no lint errors)
- [x] ~45 lines removed
- [x] Duplication reduced: 18% → 12%
- [x] HANDOVER.md created
- [x] Cumulative savings: ~150 lines from Sessions 1+2

---

## 💡 Tips & Tricks

### Order Matters
Do border-radius helper FIRST (used by 3 files), then position helper (used by 2 files).

### Test Incrementally
After refactoring each file, run its specific test file before moving to next.

### Watch for Index Management
`parseAtPosition` returns `nextIdx` - make sure to use it correctly in circle/ellipse.

### Preserve Exact Behavior
Don't change logic, just extract to helper. Tests shouldn't need changes.

---

## 🚨 Common Issues & Solutions

### Issue: "Expected 'at' keyword" error in tests
**Solution**: `parseAtPosition` should return `ok` when NO 'at' found (not error).

### Issue: Border-radius values not parsed correctly
**Solution**: Make sure to slice args using roundIndex BEFORE calling helper.

### Issue: ellipse tests fail with index errors
**Solution**: ellipse has TWO optional radiuses. Call `parseAtPosition` AFTER both.

### Issue: TypeScript errors on Result types
**Solution**: Explicitly type the return: `Result<{ position?: Position2D, nextIdx: number }, string>`

---

## 📚 Before & After Comparison

### Before (inset.ts - 15 lines)
```typescript
const roundIndex = args.findIndex(...);
let borderRadius: Type.InsetBorderRadius | undefined;
if (roundIndex !== -1) {
  const radiusNodes = args.slice(roundIndex + 1);
  if (radiusNodes.length === 0) {
    return err("Expected border-radius...");
  }
  const radiusResult = ParseUtils.parseBorderRadiusShorthand(radiusNodes);
  if (!radiusResult.ok) {
    return err(`Invalid border-radius: ${radiusResult.error}`);
  }
  borderRadius = radiusResult.value;
}
```

### After (inset.ts - 3 lines)
```typescript
const roundResult = ParseUtils.parseRoundBorderRadius(args);
if (!roundResult.ok) return roundResult;
const { roundIndex, borderRadius } = roundResult.value;
```

**80% less code, same functionality!** ✨

---

**Ready to start?** Create your session directory and begin with Part 1! 🚀

**Questions?** Review SESSION_1 HANDOVER.md for context from previous session.

**Stuck?** Check MASTER_PLAN.md for the big picture.
