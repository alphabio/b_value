# Clip-Path: True Status Report
**Date**: 2025-10-20T09:12  
**Analyst**: Recovery from failed Level 2 attempt  
**Status**: Clean baseline, ready for proper implementation

---

## ✅ CURRENT STATE: CLEAN BASELINE

**Quality Gates**:
- ✅ `just check` - ALL PASSING (format + typecheck + lint)
- ✅ `just test` - ALL PASSING (2234/2234 tests)
- ✅ No uncommitted changes
- ✅ No stashed work
- ✅ Clean working tree

**Branch**: `develop` (clean, up to date)

---

## 📊 WHAT EXISTS: Clip-Path Level 1 (CSS Shapes Level 1)

### Complete Implementations (6 shape types)

| Shape | Parser | Generator | Tests | Status |
|-------|--------|-----------|-------|--------|
| **url()** | ✅ | ✅ | ✅ | COMPLETE |
| **none** | ✅ | ✅ | ✅ | COMPLETE |
| **geometry-box** | ✅ | ✅ | 22 tests | COMPLETE |
| **inset()** | ✅ | ✅ | 55 tests | COMPLETE |
| **circle()** | ✅ | ✅ | 42 tests | COMPLETE |
| **ellipse()** | ✅ | ✅ | 48 tests | COMPLETE |
| **polygon()** | ✅ | ✅ | 37 tests | COMPLETE |

**Total**: ~223 clip-path tests, all passing ✅

### Type Definitions (src/core/types/clip-path.ts)

```typescript
export type ClipPathValue =
	| Url
	| ClipPathNone
	| ClipPathGeometryBox
	| ClipPathInset
	| ClipPathCircle
	| ClipPathEllipse
	| ClipPathPolygon;
```

**All Level 1 types**: ✅ Defined and exported

---

## ❌ WHAT'S MISSING: Clip-Path Level 2 (CSS Shapes Level 2)

### Three Unimplemented Shapes

| Shape | Parser | Generator | Tests | Type | Status |
|-------|--------|-----------|-------|------|--------|
| **path()** | ❌ | ❌ | ❌ | ❌ | NOT STARTED |
| **rect()** | ❌ | ❌ | ❌ | ❌ | NOT STARTED |
| **xywh()** | ❌ | ❌ | ❌ | ❌ | NOT STARTED |

**Reality**: Level 2 shapes are **completely unimplemented**. Previous session attempted them but was reverted.

---

## 🔍 DISCOVERED ISSUE: geometry-box Export

### The Problem

File exists: `src/core/keywords/geometry-box.ts` ✅  
File imported: `src/core/types/clip-path.ts` imports from it ✅  
**File NOT exported**: `src/core/keywords/index.ts` missing export ❌

### The Error

```typescript
// src/core/keywords/index.ts
export * from "./geometry-box"; // ❌ MISSING
```

**When commented out**:
```
Cannot find module './geometry-box' or its corresponding type declarations.ts(2307)
```

### Current Workaround

The types file imports directly:
```typescript
import type { GeometryBoxKeyword } from "@/core/keywords/geometry-box";
```

This works because of the direct path import, **but it's inconsistent** with the rest of the codebase which exports everything through `index.ts`.

### Should We Fix It?

**Analysis**:
1. ✅ **Tests pass** - Direct import works fine
2. ⚠️ **Inconsistent** - Every other keyword exports through index
3. ⚠️ **Potential confusion** - Future developers might not know about this file
4. ✅ **Low risk** - Adding export won't break anything

**Recommendation**: Yes, add the export for consistency. Takes 1 minute.

---

## 🎯 WHAT NEEDS TO HAPPEN: Level 2 Implementation Plan

### Overview

**Goal**: Add 3 new basic shapes (path, rect, xywh)  
**Estimated Time**: 1.5-2.5 hours total  
**Estimated Tests**: ~80-90 new tests  
**Pattern**: Follow Level 1 implementation exactly

### Prerequisites (5 minutes) - DO THIS FIRST

**Task 1: Fix geometry-box export** (1 min)
```typescript
// src/core/keywords/index.ts
// Add after line 27 (after font-weight-keywords):
export * from "./geometry-box";
```

**Task 2: Create session directory** (1 min)
```bash
mkdir -p .memory/archive/2025-10-20-clip-path-level-2
cp .memory/archive/INDEX.md .memory/archive/2025-10-20-clip-path-level-2/INDEX_ARCHIVED.md
```

**Task 3: Verify baseline** (3 min)
```bash
just check && just test
# Must be ALL GREEN before starting
```

---

## 📋 IMPLEMENTATION PLAN: Shape-by-Shape

### Shape 1: rect() - Rectangle with TRBL (25-30 min) 🟢 START HERE

**Why first**: Simpler than path(), good warm-up

**Syntax**: `rect( [<length-percentage> | auto]{1,4} [ round <border-radius> ]? )`

#### Phase 1: Type Definition (5 min)

**File**: `src/core/types/clip-path.ts`

```typescript
// Add after ClipPathPolygon (line 172)

/**
 * rect() basic shape function.
 *
 * Defines a rectangle using edge offsets (TRBL).
 * Each edge can be a length-percentage or 'auto'.
 * Optionally accepts rounded corners via border-radius syntax.
 *
 * Syntax: rect( [<length-percentage> | auto]{1,4} [ round <border-radius> ]? )
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/rect}
 *
 * @public
 */
export const clipPathRectSchema = z.object({
	kind: z.literal("clip-path-rect"),
	top: z.union([lengthPercentageSchema, z.literal("auto")]),
	right: z.union([lengthPercentageSchema, z.literal("auto")]),
	bottom: z.union([lengthPercentageSchema, z.literal("auto")]),
	left: z.union([lengthPercentageSchema, z.literal("auto")]),
	borderRadius: z
		.object({
			topLeft: lengthPercentageSchema,
			topRight: lengthPercentageSchema,
			bottomRight: lengthPercentageSchema,
			bottomLeft: lengthPercentageSchema,
		})
		.optional(),
});

export type ClipPathRect = z.infer<typeof clipPathRectSchema>;

// Update ClipPathValue union (line 19)
export type ClipPathValue =
	| Url
	| ClipPathNone
	| ClipPathGeometryBox
	| ClipPathInset
	| ClipPathCircle
	| ClipPathEllipse
	| ClipPathPolygon
	| ClipPathRect; // ADD THIS
```

**Verify**: `just typecheck` should pass

#### Phase 2: Parser (10 min)

**Files**: 
- `src/parse/clip-path/rect.ts` (new)
- `src/parse/clip-path/rect.test.ts` (new)
- `src/parse/clip-path/index.ts` (add export)

**Pattern**: Copy from `inset.ts`, adapt for:
- TRBL expansion logic (1-4 values like CSS margin)
- Auto keyword support
- Border-radius parsing (reuse from inset)

**Key logic**:
```typescript
// 1 value: all sides
// 2 values: vertical horizontal
// 3 values: top horizontal bottom
// 4 values: top right bottom left
```

**Tests**: ~15-18 tests (basic, TRBL expansion, auto, border-radius, errors)

#### Phase 3: Generator (10 min)

**Files**:
- `src/generate/clip-path/rect.ts` (new)
- `src/generate/clip-path/rect.test.ts` (new)
- `src/generate/clip-path/index.ts` (add export)

**Pattern**: Always output all 4 values for clarity
```typescript
// Always: rect(top right bottom left)
// Not: rect(10px) even if all same
```

**Tests**: ~12 tests (basic, auto, border-radius, round-trip)

---

### Shape 2: xywh() - Position Rectangle (25-30 min) 🟡 SECOND

**Why second**: Similar to rect() but different semantics

**Syntax**: `xywh( <length-percentage>{4} [ round <border-radius> ]? )`

#### Phase 1: Type Definition (5 min)

**File**: `src/core/types/clip-path.ts`

```typescript
// Add after ClipPathRect

/**
 * xywh() basic shape function.
 *
 * Defines a rectangle using position (x, y) and dimensions (width, height).
 * All values are length-percentages. Width and height must be non-negative.
 * Optionally accepts rounded corners via border-radius syntax.
 *
 * Syntax: xywh( <length-percentage>{4} [ round <border-radius> ]? )
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/xywh}
 *
 * @public
 */
export const clipPathXywhSchema = z.object({
	kind: z.literal("clip-path-xywh"),
	x: lengthPercentageSchema,
	y: lengthPercentageSchema,
	width: lengthPercentageSchema,
	height: lengthPercentageSchema,
	borderRadius: z
		.object({
			topLeft: lengthPercentageSchema,
			topRight: lengthPercentageSchema,
			bottomRight: lengthPercentageSchema,
			bottomLeft: lengthPercentageSchema,
		})
		.optional(),
});

export type ClipPathXywh = z.infer<typeof clipPathXywhSchema>;

// Update ClipPathValue union
export type ClipPathValue =
	| Url
	| ClipPathNone
	| ClipPathGeometryBox
	| ClipPathInset
	| ClipPathCircle
	| ClipPathEllipse
	| ClipPathPolygon
	| ClipPathRect
	| ClipPathXywh; // ADD THIS
```

#### Phase 2: Parser (10 min)

**Files**:
- `src/parse/clip-path/xywh.ts` (new)
- `src/parse/clip-path/xywh.test.ts` (new)
- `src/parse/clip-path/index.ts` (add export)

**Key validation**: Width and height must be non-negative
```typescript
if (width.value < 0) return err("Width must be non-negative");
if (height.value < 0) return err("Height must be non-negative");
```

**Tests**: ~15-18 tests (basic, border-radius, negative validation, errors)

#### Phase 3: Generator (10 min)

**Files**:
- `src/generate/clip-path/xywh.ts` (new)
- `src/generate/clip-path/xywh.test.ts` (new)
- `src/generate/clip-path/index.ts` (add export)

**Pattern**: Always output all 4 values
```typescript
// Always: xywh(x y width height)
```

**Tests**: ~11 tests (basic, border-radius, round-trip)

---

### Shape 3: path() - SVG Path Data (45-60 min) 🔴 HARDEST - DO LAST

**Why last**: Most complex, string validation approach

**Syntax**: `path( [<fill-rule>,]? <string> )`

#### Phase 1: Type Definition (5 min)

**File**: `src/core/types/clip-path.ts`

```typescript
// Add after ClipPathXywh

/**
 * path() basic shape function.
 *
 * Defines a clipping region using SVG path data.
 * Optionally accepts a fill-rule to determine interior points.
 *
 * Syntax: path( [<fill-rule>,]? <string> )
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/path}
 *
 * @public
 */
export const clipPathPathSchema = z.object({
	kind: z.literal("clip-path-path"),
	fillRule: z.enum(["nonzero", "evenodd"]).optional(),
	pathData: z.string(),
});

export type ClipPathPath = z.infer<typeof clipPathPathSchema>;

// Update ClipPathValue union
export type ClipPathValue =
	| Url
	| ClipPathNone
	| ClipPathGeometryBox
	| ClipPathInset
	| ClipPathCircle
	| ClipPathEllipse
	| ClipPathPolygon
	| ClipPathRect
	| ClipPathXywh
	| ClipPathPath; // ADD THIS
```

#### Phase 2: Parser (20-25 min)

**Files**:
- `src/parse/clip-path/path.ts` (new)
- `src/parse/clip-path/path.test.ts` (new)
- `src/parse/clip-path/index.ts` (add export)

**Strategy**: String validation approach (NOT full SVG parsing)

**Key logic**:
```typescript
// 1. Parse optional fill-rule keyword first
// 2. Parse string node (path data)
// 3. Validate path data contains valid SVG commands
// 4. Store as string (don't parse commands)
```

**Validation regex**:
```typescript
const pathCommandRegex = /[MmLlHhVvCcSsQqTtAaZz]/;
// Just check that valid commands exist
// Don't parse the entire path syntax
```

**Tests**: ~19 tests (basic, fill-rule, validation, errors)

#### Phase 3: Generator (15-20 min)

**Files**:
- `src/generate/clip-path/path.ts` (new)
- `src/generate/clip-path/path.test.ts` (new)
- `src/generate/clip-path/index.ts` (add export)

**Pattern**: Simple string output
```typescript
if (ir.fillRule) {
  return `path(${ir.fillRule}, '${ir.pathData}')`;
}
return `path('${ir.pathData}')`;
```

**Tests**: ~10 tests (basic, fill-rule, round-trip)

---

## 🚨 CRITICAL SUCCESS FACTORS

### 1. Do NOT Skip Verification Steps

After EVERY phase:
```bash
just check  # Must pass
just test   # All existing tests must still pass
```

If either fails, **STOP and fix** before continuing.

### 2. Follow Existing Patterns EXACTLY

✅ DO:
- Copy structure from similar shapes (inset, circle, polygon)
- Reuse utilities (ParseUtils.parseLengthPercentageNode, etc.)
- Match test structure from Level 1 shapes
- Use same error message style

❌ DON'T:
- Invent new patterns
- Add "improvements" to existing code
- Change test expectations for existing features
- Skip test cases

### 3. Test Coverage Requirements

**Minimum per shape**:
- Parser: 15+ tests (basic, options, edge cases, errors)
- Generator: 10+ tests (basic, options, round-trip)

**Required test categories**:
- Basic parsing/generation
- Optional parameters (border-radius, fill-rule)
- Edge cases (zero, negative, extreme values)
- Error handling (invalid input, missing args)
- Round-trip validation (parse → generate → parse)

### 4. Commit Strategy

**Commit after each shape completes**:
```bash
git add .
git commit -m "feat(clip-path): implement rect() basic shape"
```

This allows easy revert if something goes wrong.

### 5. Time Management

**If running over time**: STOP and document progress
- Better to have 1-2 shapes fully working than 3 half-broken
- Create HANDOVER.md with what's done and what's next
- Don't rush and break the baseline

---

## 📊 ESTIMATED TIMELINE

| Phase | Task | Time | Cumulative |
|-------|------|------|------------|
| 0 | Prerequisites + baseline | 5 min | 5 min |
| 1 | rect() - all phases | 25-30 min | 30-35 min |
| 2 | xywh() - all phases | 25-30 min | 55-65 min |
| 3 | path() - all phases | 45-60 min | 100-125 min |
| 4 | Final verification | 5 min | 105-130 min |
| 5 | Documentation | 10 min | 115-140 min |

**Total**: 1h 55m - 2h 20m (realistic)

**Buffer**: Add 20-30% for debugging = 2h 20m - 3h total

---

## ✅ DEFINITION OF DONE

### Code Complete When:
- ✅ All 3 shapes have types defined
- ✅ All 3 shapes have parsers with tests
- ✅ All 3 shapes have generators with tests
- ✅ All shapes exported from index files
- ✅ ClipPathValue union updated

### Quality Gates Pass:
- ✅ `just check` - ALL PASSING
- ✅ `just test` - ALL PASSING (expect ~2320-2330 total tests)
- ✅ No TypeScript errors
- ✅ No linting warnings
- ✅ No test failures

### Documentation Complete:
- ✅ HANDOVER.md created with summary
- ✅ CONTINUE.md updated with completion status
- ✅ Commit messages clear and descriptive

---

## 🎓 LESSONS FROM PREVIOUS ATTEMPT

### What Went Wrong

1. **Rabbit hole**: Fixed test expectations instead of addressing root issues
2. **Scope creep**: Changed core generator behavior globally
3. **Lost focus**: Ignored linting warnings (the actual requirement)
4. **No plan**: Started coding without clear analysis

### What To Do Differently

1. **Analysis first**: This document! Understand before implementing
2. **One thing at a time**: Type → Parser → Generator, shape by shape
3. **Verify constantly**: Run checks after each phase
4. **Stop if lost**: Create HANDOVER and ask for help
5. **Follow the plan**: Resist urge to "improve" things

---

## 🎯 READY TO BEGIN?

**Current Status**: ✅ CLEAN BASELINE, READY TO START

**Next Action**: Fix geometry-box export (1 minute)

**Then**: Create session directory and start with rect()

**Questions Before Starting**:
1. Is the 2-3 hour timeline acceptable?
2. Should we do all 3 shapes or just rect() + xywh() first?
3. Any other concerns about the approach?

---

## 📎 APPENDIX: Geometry-Box Fix

### The One-Line Fix

**File**: `src/core/keywords/index.ts`

**Location**: After line 27 (after `export * from "./font-weight-keywords";`)

**Add**:
```typescript
export * from "./geometry-box";
```

**Why it's safe**:
- File already exists and works
- Only makes it accessible through index
- No behavior change
- Tests already pass

**Verification**:
```bash
just check  # Should still pass
```

That's it! One line, 30 seconds.
