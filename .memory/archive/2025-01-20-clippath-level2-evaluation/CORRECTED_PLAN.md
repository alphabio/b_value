# Clip-Path Level 2: Corrected Implementation Plan

**Status**: ✅ REVIEWED & VALIDATED against MDN schema  
**Sessions**: 3 shapes + 1 cleanup (4 total)  
**Estimated Time**: 2.5-3 hours total  
**Tests Target**: +100 tests (30 + 30 + 40 + cleanup)

---

## Progress Tracker

| Session | Shape | Status | Time | Tests | Agent | Date | Handover |
|---------|-------|--------|------|-------|-------|------|----------|
| 1 | rect() | ⚪ TODO | 30-40m | 0/30 | - | - | - |
| 2 | xywh() | ⚪ TODO | 30-40m | 0/30 | - | - | - |
| 3 | path() | ⚪ TODO | 40-60m | 0/40 | - | - | - |
| 4 | Cleanup | ⚪ TODO | 25m | 0/30 | - | - | - |

**Legend**: ⚪ TODO | 🔵 IN PROGRESS | ✅ DONE | ⚠️ BLOCKED

---

## Session 1: rect() - TRBL Rectangle

**Time**: 30-40 minutes  
**Tests**: ~30  
**Complexity**: MEDIUM

### Official MDN Syntax

```
rect( [ <length-percentage> | auto ]{4} [ round <'border-radius'> ]? )
```

**Source**: mdm-data/css/functions.json

### Key Points

✅ **ALWAYS 4 values** (top, right, bottom, left) - NO expansion  
✅ Each value: `<length-percentage>` OR `auto`  
✅ Optional `round <border-radius>` (reuse from inset)  
✅ Simpler than margin (no 1/2/3 value shortcuts)

### Valid Examples

```css
/* Basic */
rect(10px 20px 30px 40px)

/* With auto */
rect(auto auto 50% 0)
rect(10px auto 20px auto)

/* With border-radius */
rect(10px 20px 30px 40px round 5px)
rect(0 0 100% 100% round 10px 20px)

/* Mixed units */
rect(1em 2rem 50% 10px)
```

### Invalid Examples

```css
rect(10px)                    /* ❌ needs 4 values */
rect(10px 20px)               /* ❌ needs 4 values */
rect(10px 20px 30px)          /* ❌ needs 4 values */
rect(10px, 20px, 30px, 40px)  /* ❌ no commas */
```

### Implementation Steps

#### Phase 1: IR Type (5 min)

**File**: `src/core/types/clip-path.ts`

```typescript
/**
 * rect() basic shape function.
 *
 * Defines a rectangle by specifying insets from each edge.
 * Each value can be a length-percentage or 'auto'.
 *
 * Syntax: rect( [ <length-percentage> | auto ]{4} [ round <border-radius> ]? )
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
```

Update `ClipPathValue` union:
```typescript
export type ClipPathValue =
  | Url
  | ClipPathNone
  | ClipPathGeometryBox
  | ClipPathInset
  | ClipPathCircle
  | ClipPathEllipse
  | ClipPathPolygon
  | ClipPathRect;  // ADD THIS
```

#### Phase 2: Parser (10-15 min)

**File**: `src/parse/clip-path/rect.ts`

```typescript
import { parseFunction } from "@/utils/ast";
import { parseLengthPercentage } from "@/parse/length-percentage";
import { parseBorderRadius } from "./border-radius"; // Reuse from inset
import type { ClipPathRect } from "@/core/types/clip-path";

export function parseClipPathRect(css: string): Result<ClipPathRect> {
  const fnResult = parseFunction(css, "rect");
  if (!fnResult.ok) return fnResult;

  const args = fnResult.value.args;
  
  // Find 'round' keyword to split args
  const roundIndex = args.findIndex(node => 
    node.type === "Word" && node.value === "round"
  );
  
  const valueNodes = roundIndex === -1 ? args : args.slice(0, roundIndex);
  const radiusNodes = roundIndex === -1 ? [] : args.slice(roundIndex + 1);
  
  // Must have exactly 4 values (no expansion)
  if (valueNodes.length !== 4) {
    return err("rect() requires exactly 4 values (top right bottom left)");
  }
  
  // Parse each value (can be length-percentage or 'auto')
  const values = [];
  for (const node of valueNodes) {
    if (node.type === "Word" && node.value === "auto") {
      values.push("auto");
    } else {
      const lpResult = parseLengthPercentage(node);
      if (!lpResult.ok) return lpResult;
      values.push(lpResult.value);
    }
  }
  
  const [top, right, bottom, left] = values;
  
  // Parse optional border-radius
  let borderRadius = undefined;
  if (radiusNodes.length > 0) {
    const radiusResult = parseBorderRadius(radiusNodes);
    if (!radiusResult.ok) return radiusResult;
    borderRadius = radiusResult.value;
  }
  
  return ok({
    kind: "clip-path-rect",
    top,
    right,
    bottom,
    left,
    borderRadius,
  });
}
```

#### Phase 3: Generator (5-10 min)

**File**: `src/generate/clip-path/rect.ts`

```typescript
import { generateLengthPercentage } from "@/generate/length-percentage";
import { generateBorderRadius } from "./border-radius"; // Reuse from inset
import type { ClipPathRect } from "@/core/types/clip-path";

export function generateClipPathRect(value: ClipPathRect): string {
  const parts: string[] = [];
  
  // Generate each value
  const top = value.top === "auto" ? "auto" : generateLengthPercentage(value.top);
  const right = value.right === "auto" ? "auto" : generateLengthPercentage(value.right);
  const bottom = value.bottom === "auto" ? "auto" : generateLengthPercentage(value.bottom);
  const left = value.left === "auto" ? "auto" : generateLengthPercentage(value.left);
  
  parts.push(`rect(${top} ${right} ${bottom} ${left}`);
  
  // Add optional border-radius
  if (value.borderRadius) {
    const radius = generateBorderRadius(value.borderRadius);
    parts.push(` round ${radius}`);
  }
  
  parts.push(")");
  
  return parts.join("");
}
```

#### Phase 4: Tests (10-15 min)

**File**: `src/parse/clip-path/rect.test.ts` + `src/generate/clip-path/rect.test.ts`

Test categories:
- ✅ Basic 4 values (5 tests)
- ✅ Auto keyword (5 tests)
- ✅ Border-radius variants (8 tests)
- ✅ Mixed units (4 tests)
- ✅ Edge cases (4 tests)
- ✅ Error cases (4 tests)

**Total**: ~30 tests

#### Phase 5: Integration (5 min)

Update `src/parse/clip-path/index.ts`:
```typescript
import { parseClipPathRect } from "./rect";

// In main parser dispatch
if (css.startsWith("rect(")) {
  return parseClipPathRect(css);
}
```

Update `src/generate/clip-path/index.ts`:
```typescript
import { generateClipPathRect } from "./rect";

// In main generator dispatch
case "clip-path-rect":
  return generateClipPathRect(value);
```

### Validation

```bash
just check  # Format, types, lint
just test   # All tests passing
```

### Handover Template

Create `.memory/archive/YYYY-MM-DD-rect-session/HANDOVER.md`:

```markdown
# Session 1: rect() - HANDOVER

**Status**: ✅ DONE  
**Tests**: 30 passing (30 new)  
**Duration**: X minutes

## Completed
- [x] IR type (ClipPathRect)
- [x] Parser (parseClipPathRect)
- [x] Generator (generateClipPathRect)
- [x] 30 tests (parse + generate + integration)
- [x] Integration with main clip-path parser/generator

## Key Decisions
- Reused border-radius parsing from inset()
- No value expansion (always 4 values)
- Auto keyword handled per-value

## Next Session
Agent should start with **xywh()** - similar pattern but position-based.

## Blockers
None

## Notes
- rect() is simpler than expected (no expansion)
- Border-radius reuse worked perfectly
- Tests cover all MDN examples
```

---

## Session 2: xywh() - Position-Based Rectangle

**Time**: 30-40 minutes  
**Tests**: ~30  
**Complexity**: MEDIUM

### Official MDN Syntax

```
xywh( <length-percentage>{2} <length-percentage [0,∞]>{2} [ round <'border-radius'> ]? )
```

**Source**: mdm-data/css/functions.json

### Key Points

✅ First 2 values: X, Y position (any value, can be negative)  
✅ Last 2 values: Width, Height (MUST be non-negative)  
✅ Optional `round <border-radius>`  
⚠️ Width/height validation: `>= 0`

### Valid Examples

```css
/* Basic */
xywh(10px 20px 100px 50px)

/* Negative position (OK) */
xywh(-10px -20px 50px 80px)

/* Zero position */
xywh(0 0 100% 100%)

/* With border-radius */
xywh(10% 20% 50px 80px round 5px)

/* Mixed units */
xywh(1em 2rem 50% 100px)
```

### Invalid Examples

```css
xywh(10px 20px -50px 80px)   /* ❌ negative width */
xywh(10px 20px 50px -80px)   /* ❌ negative height */
xywh(10px 20px 50px)         /* ❌ needs 4 values */
```

### Implementation Steps

#### Phase 1: IR Type (5 min)

**File**: `src/core/types/clip-path.ts`

```typescript
/**
 * xywh() basic shape function.
 *
 * Defines a rectangle using position (x, y) and size (width, height).
 * Width and height must be non-negative.
 *
 * Syntax: xywh( <length-percentage>{2} <length-percentage [0,∞]>{2} [ round <border-radius> ]? )
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/xywh}
 *
 * @public
 */
export const clipPathXywhSchema = z.object({
  kind: z.literal("clip-path-xywh"),
  x: lengthPercentageSchema,
  y: lengthPercentageSchema,
  width: lengthPercentageSchema.refine(
    (v) => {
      // Validate non-negative
      if (v.kind === "length") return v.value >= 0;
      if (v.kind === "percentage") return v.value >= 0;
      return true;
    },
    { message: "width must be non-negative" }
  ),
  height: lengthPercentageSchema.refine(
    (v) => {
      // Validate non-negative
      if (v.kind === "length") return v.value >= 0;
      if (v.kind === "percentage") return v.value >= 0;
      return true;
    },
    { message: "height must be non-negative" }
  ),
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
```

Update `ClipPathValue` union:
```typescript
export type ClipPathValue =
  | Url
  | ClipPathNone
  | ClipPathGeometryBox
  | ClipPathInset
  | ClipPathCircle
  | ClipPathEllipse
  | ClipPathPolygon
  | ClipPathRect
  | ClipPathXywh;  // ADD THIS
```

#### Phase 2: Parser (10-15 min)

Similar to rect(), but:
- No auto keyword
- Validate width/height >= 0
- Better error messages (position vs size)

#### Phase 3: Generator (5-10 min)

Similar to rect(), simpler (no auto handling)

#### Phase 4: Tests (10-15 min)

Test categories:
- ✅ Basic position + size (5 tests)
- ✅ Negative position (OK) (4 tests)
- ✅ Zero values (3 tests)
- ✅ Border-radius (8 tests)
- ✅ Mixed units (4 tests)
- ✅ Error: negative width/height (6 tests)

**Total**: ~30 tests

### Validation

```bash
just check
just test
```

---

## Session 3: path() - SVG Path Data

**Time**: 40-60 minutes  
**Tests**: ~40  
**Complexity**: HIGH (reduced to MEDIUM with Option A)

### Official MDN Syntax

```
path( <'fill-rule'>? , <string> )
```

**CRITICAL**: Note the **COMMA** between fill-rule and string!

**Source**: mdm-data/css/functions.json

### Key Points

✅ Optional fill-rule: `nonzero` | `evenodd`  
✅ **COMMA SEPARATOR** if fill-rule present  
✅ String contains SVG path data  
✅ Path commands: M, L, H, V, C, S, Q, T, A, Z (uppercase + lowercase)  
⚠️ **DECISION**: Store as validated string (Option A - RECOMMENDED)

### Valid Examples

```css
/* No fill-rule */
path("M 10,10 L 90,10 L 50,90 Z")

/* With fill-rule (NOTE THE COMMA) */
path(evenodd, "M 10,10 L 90,10 L 50,90 Z")
path(nonzero, "M10 10 L90 10 L50 90z")

/* Compact syntax */
path("M10 10L90 10L50 90z")

/* Various commands */
path("M0 0 L100 0 L100 100 L0 100 Z")
path("M50 50 C50 0, 100 0, 100 50")
path("M0 0 Q50 50, 100 0")
```

### Invalid Examples

```css
path(evenodd "M 10,10 Z")    /* ❌ missing comma */
path("invalid data")         /* ❌ invalid path commands */
path("")                     /* ❌ empty string */
```

### Implementation Strategy: Option A (RECOMMENDED)

**Store as validated string** - simpler, faster, guarantees round-trip

#### Phase 1: Extract fill-rule Type (5 min)

**File**: `src/core/types/clip-path.ts`

```typescript
/**
 * fill-rule keyword.
 *
 * Determines which points are inside a shape for filling/clipping.
 * - nonzero: Non-zero winding rule (default)
 * - evenodd: Even-odd rule
 *
 * @public
 */
export const fillRuleSchema = z.enum(["nonzero", "evenodd"]);
export type FillRule = z.infer<typeof fillRuleSchema>;
```

Update polygon to use shared type:
```typescript
export const clipPathPolygonSchema = z.object({
  kind: z.literal("clip-path-polygon"),
  fillRule: fillRuleSchema.optional(),  // Use shared type
  points: z.array(/* ... */),
});
```

#### Phase 2: IR Type (5-10 min)

```typescript
/**
 * path() basic shape function.
 *
 * Defines a clipping region using SVG path data.
 * Path data string should contain valid SVG path commands.
 *
 * Syntax: path( <fill-rule>? , <string> )
 *
 * Note: fill-rule and path data are comma-separated.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/path}
 * @see {@link https://www.w3.org/TR/SVG/paths.html}
 *
 * @public
 */
export const clipPathPathSchema = z.object({
  kind: z.literal("clip-path-path"),
  fillRule: fillRuleSchema.optional(),
  pathData: z.string().refine(
    (s) => s.length > 0 && isValidSVGPathBasic(s),
    { message: "invalid SVG path data" }
  ),
});

export type ClipPathPath = z.infer<typeof clipPathPathSchema>;

/**
 * Basic SVG path validation.
 *
 * Checks for:
 * - Non-empty string
 * - Valid path commands (M, L, H, V, C, S, Q, T, A, Z + lowercase)
 * - Basic structure (commands followed by numbers)
 *
 * Note: This is NOT a full SVG path parser.
 * It provides basic validation to catch obvious errors.
 */
function isValidSVGPathBasic(pathData: string): boolean {
  // Must be non-empty
  if (!pathData.trim()) return false;
  
  // Must contain at least one valid command
  const validCommands = /[MmLlHhVvCcSsQqTtAaZz]/;
  if (!validCommands.test(pathData)) return false;
  
  // Basic structure check: commands and numbers
  // Allow: letters (commands), digits, whitespace, comma, period, minus, plus
  const validChars = /^[MmLlHhVvCcSsQqTtAaZz0-9\s,.\-+]+$/;
  if (!validChars.test(pathData)) return false;
  
  // Should start with M or m (moveTo)
  const startsWithMove = /^\s*[Mm]/.test(pathData);
  if (!startsWithMove) return false;
  
  return true;
}
```

#### Phase 3: Parser (15-20 min)

**File**: `src/parse/clip-path/path.ts`

```typescript
import { parseFunction } from "@/utils/ast";
import { splitNodesByComma } from "@/utils/ast";
import type { ClipPathPath } from "@/core/types/clip-path";

export function parseClipPathPath(css: string): Result<ClipPathPath> {
  const fnResult = parseFunction(css, "path");
  if (!fnResult.ok) return fnResult;

  const args = fnResult.value.args;
  
  // Split by comma (fill-rule , path-data)
  const parts = splitNodesByComma(args);
  
  if (parts.length === 0) {
    return err("path() requires at least a path data string");
  }
  
  if (parts.length > 2) {
    return err("path() accepts at most 2 arguments: fill-rule and path data");
  }
  
  let fillRule: "nonzero" | "evenodd" | undefined;
  let pathData: string;
  
  if (parts.length === 1) {
    // Only path data
    const stringResult = parseString(parts[0]);
    if (!stringResult.ok) {
      return err("path() requires a string for path data");
    }
    pathData = stringResult.value;
  } else {
    // fill-rule , path-data
    const [fillRuleNodes, pathDataNodes] = parts;
    
    // Parse fill-rule
    if (fillRuleNodes.length !== 1 || fillRuleNodes[0].type !== "Word") {
      return err("path() fill-rule must be 'nonzero' or 'evenodd'");
    }
    
    const fillRuleValue = fillRuleNodes[0].value;
    if (fillRuleValue !== "nonzero" && fillRuleValue !== "evenodd") {
      return err(`Invalid fill-rule: ${fillRuleValue}`);
    }
    
    fillRule = fillRuleValue;
    
    // Parse path data string
    const stringResult = parseString(pathDataNodes);
    if (!stringResult.ok) {
      return err("path() requires a string for path data");
    }
    pathData = stringResult.value;
  }
  
  // Validate path data (basic)
  if (!isValidSVGPathBasic(pathData)) {
    return err("Invalid SVG path data");
  }
  
  return ok({
    kind: "clip-path-path",
    fillRule,
    pathData,
  });
}

function parseString(nodes: CssNode[]): Result<string> {
  if (nodes.length !== 1) {
    return err("Expected a single string");
  }
  
  const node = nodes[0];
  if (node.type !== "String") {
    return err("Expected a string");
  }
  
  return ok(node.value);
}
```

#### Phase 4: Generator (5-10 min)

```typescript
import type { ClipPathPath } from "@/core/types/clip-path";

export function generateClipPathPath(value: ClipPathPath): string {
  const parts: string[] = ["path("];
  
  if (value.fillRule) {
    parts.push(value.fillRule, ", ");
  }
  
  // Quote the path data
  parts.push(`"${value.pathData}"`);
  
  parts.push(")");
  
  return parts.join("");
}
```

#### Phase 5: Tests (15-20 min)

Test categories:
- ✅ Basic path (no fill-rule) (5 tests)
- ✅ With fill-rule (5 tests)
- ✅ Various path commands (8 tests)
  - M, L (basic)
  - H, V (lines)
  - C, S (cubic)
  - Q, T (quadratic)
  - A (arc)
  - Z (close)
- ✅ Compact vs spaced syntax (4 tests)
- ✅ Uppercase vs lowercase (4 tests)
- ✅ Error cases (8 tests)
  - Missing comma
  - Empty string
  - Invalid commands
  - Missing path data

**Total**: ~40 tests

### Validation

```bash
just check
just test
```

---

## Session 4: Cleanup & Completeness

**Time**: 25 minutes  
**Tests**: ~30  
**Complexity**: LOW

### Task 1: Add SVG Geometry Boxes (15 min)

**File**: `src/core/keywords/geometry-box.ts`

```typescript
/**
 * Geometry box keywords for clip-path.
 *
 * Defines the reference box for clipping:
 * - Visual boxes (CSS): content-box, padding-box, border-box
 * - Shape box (CSS): margin-box
 * - SVG boxes: fill-box, stroke-box, view-box
 *
 * @public
 */
export type GeometryBoxKeyword =
  | "content-box"
  | "padding-box"
  | "border-box"
  | "margin-box"
  | "fill-box"      // SVG: content area
  | "stroke-box"    // SVG: stroke bounding box
  | "view-box";     // SVG: viewport coordinate system
```

**Tests**: ~10 (parse + generate for new keywords)

### Task 2: Add Radial Extent Keywords (10 min)

**Files**: `src/core/types/clip-path.ts`, `src/parse/clip-path/circle.ts`, `src/parse/clip-path/ellipse.ts`

```typescript
// Update circle schema
export const clipPathCircleSchema = z.object({
  kind: z.literal("clip-path-circle"),
  radius: z.union([
    lengthPercentageSchema,
    z.enum([
      "closest-side",
      "farthest-side",
      "closest-corner",   // ADD
      "farthest-corner"   // ADD
    ])
  ]).optional(),
  position: position2DSchema.optional(),
});

// Same for ellipse radiusX and radiusY
```

**Tests**: ~20 (parse + generate for circle/ellipse with new keywords)

### Validation

```bash
just check
just test  # All 2234 + 100 new = 2334 tests passing
```

---

## Quality Checklist

### Before Starting Any Session

- [ ] Read MDN schema for that function (mdm-data/css/functions.json)
- [ ] Verify syntax matches EXACTLY
- [ ] Check for comma vs space separators
- [ ] Identify value constraints (e.g., non-negative)
- [ ] Look for optional vs required arguments
- [ ] Check related types (fill-rule, geometry-box, etc.)
- [ ] Run `just check && just test` (verify baseline)

### During Implementation

- [ ] IR type matches MDN syntax EXACTLY
- [ ] Parser handles all MDN examples
- [ ] Generator produces valid CSS per MDN
- [ ] Tests cover all syntax variations
- [ ] Round-trip validation (parse → generate → parse)
- [ ] Error messages are clear and helpful

### After Implementation

- [ ] `just check` passes (format, types, lint)
- [ ] `just test` passes (all 2234+ tests)
- [ ] Update progress table in CONTINUE.md
- [ ] Create HANDOVER.md in session archive
- [ ] Commit with proper message format

### Commit Message Format

```
feat(clip-path): Session N - [shape name]

- Added [shape] IR type
- Implemented parse/generate
- X new tests (all passing)
- Round-trip validated
```

---

## Rules (Non-Negotiable)

1. **One session at a time** - Don't jump ahead, finish completely
2. **All tests must pass** - No exceptions, ever
3. **Update progress table** - Mark your session status
4. **Create handover doc** - Next agent needs context
5. **Stay in scope** - Resist feature creep, stick to plan
6. **Validate against MDN** - Don't trust assumptions, check schema
7. **When stuck, ask** - Don't guess, clarify first

---

## Session Order Recommendation

### Sequential (Single Agent)
1. rect() → 2. xywh() → 3. path() → 4. cleanup

**Pros**: Smooth progression, learn from each  
**Cons**: Sequential, ~2.5-3 hours total

### Parallel (Two Agents)

**Agent A**: rect() + path()  
**Agent B**: xywh() + cleanup

**Pros**: Faster (parallel), ~1.5-2 hours per agent  
**Cons**: Needs coordination, merge complexity

**Recommendation**: Sequential for first time, parallel if experienced

---

## Success Criteria

At the end of all 4 sessions:

✅ All 3 Level 2 shapes implemented (rect, xywh, path)  
✅ SVG geometry boxes added (fill-box, stroke-box, view-box)  
✅ Radial extent keywords complete (closest/farthest corner)  
✅ ~100 new tests passing  
✅ All 2334 tests passing (2234 baseline + 100 new)  
✅ 100% MDN alignment  
✅ Complete clip-path implementation (Level 1 + Level 2)

---

## References

- **MDN Schema**: `/Users/alphab/Dev/LLM/DEV/mdm-data/css/`
  - functions.json (syntax definitions)
  - syntaxes.json (type definitions)
  - properties.json (property syntax)
- **MDN Docs**:
  - [clip-path](https://developer.mozilla.org/docs/Web/CSS/clip-path)
  - [basic-shape](https://developer.mozilla.org/docs/Web/CSS/basic-shape)
  - [rect()](https://developer.mozilla.org/docs/Web/CSS/basic-shape/rect)
  - [xywh()](https://developer.mozilla.org/docs/Web/CSS/basic-shape/xywh)
  - [path()](https://developer.mozilla.org/docs/Web/CSS/basic-shape/path)
- **SVG Path Spec**: https://www.w3.org/TR/SVG/paths.html
- **Current Implementation**: `src/core/types/clip-path.ts`

---

**Plan Validated** ✅  
**Ready to start Session 1** 🚀
