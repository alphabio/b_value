# Clip-Path Level 2 Evaluation

**Date**: 2025-01-20  
**Evaluator**: Claude  
**Reference**: Phase 4 Colors MASTER_PLAN.md + MDN CSS Schema

---

## Executive Summary

**Status**: ⚠️ **CONTINUE.md plan needs significant corrections**

**Key Issues Found**:
1. ❌ **CRITICAL**: `rect()` syntax is WRONG - uses 4 values, not 2-4
2. ❌ **CRITICAL**: `path()` syntax is WRONG - uses comma separator, not space
3. ⚠️ **Missing**: fill-rule type definition (used by path and polygon)
4. ⚠️ **Missing**: SVG-specific geometry boxes (fill-box, stroke-box, view-box)
5. ⚠️ **Incomplete**: radial-size for circle/ellipse (missing extent keywords)

**Recommendation**: ⚠️ **DO NOT PROCEED** with current plan - fix specification errors first.

---

## MDN Schema Analysis

### Official Syntax (from mdm-data/css)

```javascript
// clip-path property
{
  "syntax": "<clip-source> | [ <basic-shape> || <geometry-box> ] | none"
}

// basic-shape (from syntaxes.json)
{
  "syntax": "<inset()> | <xywh()> | <rect()> | <circle()> | <ellipse()> | <polygon()> | <path()>"
}

// Level 2 functions (from functions.json)
{
  "rect()": "rect( [ <length-percentage> | auto ]{4} [ round <'border-radius'> ]? )",
  "xywh()": "xywh( <length-percentage>{2} <length-percentage [0,∞]>{2} [ round <'border-radius'> ]? )",
  "path()": "path( <'fill-rule'>? , <string> )"
}

// geometry-box (from syntaxes.json)
{
  "syntax": "<shape-box> | fill-box | stroke-box | view-box"
}

// radial-size (from syntaxes.json)
{
  "syntax": "<radial-extent> | <length [0,∞]> | <length-percentage [0,∞]>{2}"
}
```

---

## Issue #1: rect() Syntax - CRITICAL ERROR ❌

### CONTINUE.md Claims
```
rect( [<length-percentage> | auto]{2,4} [round <border-radius>]? )
```

**Verdict**: ❌ **WRONG**

### MDN Schema Says
```javascript
"rect()": "rect( [ <length-percentage> | auto ]{4} [ round <'border-radius'> ]? )"
```

### The Truth
- **ALWAYS 4 values** (top, right, bottom, left) - no shortcuts
- **NOT 2-4 values** - that would be margin-like expansion
- Each value can be `<length-percentage>` OR `auto`
- Optional `round <border-radius>` at end

### Correct Examples
```css
rect(10px 20px 30px 40px)              /* 4 values REQUIRED */
rect(auto auto 50% 0)                  /* auto allowed per value */
rect(10px 20px 30px 40px round 5px)    /* with border-radius */
```

### What CONTINUE.md Got Wrong
- Claimed "2-4 value syntax (like margin)" ❌
- Suggested "TRBL expansion logic" ❌
- This is NOT like margin/padding syntax

### Impact
- **HIGH**: Completely changes parser logic
- **HIGH**: Changes test expectations
- **HIGH**: IR type definition may be fine (already has 4 fields)

---

## Issue #2: path() Syntax - CRITICAL ERROR ❌

### CONTINUE.md Claims
```
path( <fill-rule>? <string> )
```

**Verdict**: ❌ **WRONG**

### MDN Schema Says
```javascript
"path()": "path( <'fill-rule'>? , <string> )"
```

### The Truth
- **COMMA-SEPARATED** arguments, not space-separated
- fill-rule is optional but uses comma separator
- String contains the SVG path data

### Correct Examples
```css
path("M 10,10 L 90,10 L 50,90 Z")          /* no fill-rule */
path(evenodd, "M 10,10 L 90,10 L 50,90 Z") /* WITH COMMA */
path(nonzero, "M10 10 L90 10 L50 90z")     /* WITH COMMA */
```

### What CONTINUE.md Got Wrong
- Missing comma separator between arguments ❌
- Parser would fail on valid MDN examples ❌

### Impact
- **MEDIUM**: Changes parser slightly (expect comma)
- **LOW**: IR type is probably fine
- **MEDIUM**: Test expectations need comma

---

## Issue #3: Missing fill-rule Type Definition ⚠️

### Current State
```typescript
// In clip-path.ts - polygon has it
fillRule: z.enum(["nonzero", "evenodd"]).optional(),
```

### Problem
- `path()` also needs fill-rule (per MDN schema)
- Should be extracted as shared type
- Currently only defined inline for polygon

### Solution
```typescript
// Extract to shared type
export const fillRuleSchema = z.enum(["nonzero", "evenodd"]);
export type FillRule = z.infer<typeof fillRuleSchema>;

// Use in both polygon and path
export const clipPathPolygonSchema = z.object({
  kind: z.literal("clip-path-polygon"),
  fillRule: fillRuleSchema.optional(),
  // ...
});

export const clipPathPathSchema = z.object({
  kind: z.literal("clip-path-path"),
  fillRule: fillRuleSchema.optional(),
  pathData: z.string(), // SVG path string
});
```

### Impact
- **LOW**: Easy to add
- **BEST PRACTICE**: Reuse instead of duplicate

---

## Issue #4: Missing SVG Geometry Boxes ⚠️

### Current Implementation
```typescript
// src/core/keywords/geometry-box.ts probably only has:
// "content-box" | "padding-box" | "border-box" | "margin-box"
```

### MDN Schema Says
```javascript
"geometry-box": "<shape-box> | fill-box | stroke-box | view-box"
```

Where `<shape-box>` = `<visual-box> | margin-box`  
And `<visual-box>` = `content-box | padding-box | border-box`

### Missing Keywords
- `fill-box` - SVG: content area
- `stroke-box` - SVG: stroke bounding box  
- `view-box` - SVG: viewport coordinate system

### Solution
```typescript
export type GeometryBoxKeyword =
  // Visual boxes (CSS)
  | "content-box"
  | "padding-box" 
  | "border-box"
  | "margin-box"
  // SVG boxes
  | "fill-box"
  | "stroke-box"
  | "view-box";
```

### Impact
- **LOW**: Easy addition to keywords
- **COMPLETENESS**: Needed for full spec compliance

---

## Issue #5: Incomplete radial-size for circle/ellipse ⚠️

### Current Implementation
```typescript
radius: z.union([
  lengthPercentageSchema,
  z.enum(["closest-side", "farthest-side"])
]).optional(),
```

### MDN Schema Says
```javascript
"radial-size": "<radial-extent> | <length [0,∞]> | <length-percentage [0,∞]>{2}"
```

Where `<radial-extent>` includes:
- `closest-side`
- `farthest-side`
- `closest-corner` ⚠️ MISSING
- `farthest-corner` ⚠️ MISSING

### Problem
- Missing `closest-corner` and `farthest-corner` keywords
- These are valid for circle/ellipse radii per MDN

### Solution
```typescript
radius: z.union([
  lengthPercentageSchema,
  z.enum([
    "closest-side",
    "farthest-side",
    "closest-corner",
    "farthest-corner"
  ])
]).optional(),
```

### Impact
- **LOW**: Easy addition
- **SPEC COMPLIANCE**: Needed for full MDN alignment

---

## Comparison: MASTER_PLAN.md vs Current Plan

### What MASTER_PLAN Got Right

#### Structure
- ✅ Clear session breakdown
- ✅ Time estimates per session
- ✅ Test count targets
- ✅ Progress tracking table
- ✅ Handover template
- ✅ Quality gates enforcement
- ✅ One session at a time rule

#### Process
- ✅ Archive session artifacts immediately
- ✅ Update progress table after each session
- ✅ Create HANDOVER.md for continuity
- ✅ "Stay in scope" rule (resist feature creep)
- ✅ "When stuck, ask - don't guess" wisdom

#### Educational Value
- ✅ Complexity ratings explained upfront
- ✅ Example values in plan
- ✅ Key challenges listed
- ✅ Resources provided

### What CONTINUE.md Lacks

❌ **No progress tracking table** - can't see at a glance what's done  
❌ **No handover template** - inconsistent session endings  
❌ **No "stay in scope" rule** - risk of feature creep  
❌ **No quality gates reminder** - agents might skip checks  
❌ **No commit message format** - inconsistent git history  

### What CONTINUE.md Has That MASTER_PLAN Doesn't

✅ **Inline at root** - faster access (no navigation)  
✅ **Quick commands** - just check, just test examples  
✅ **Pattern references** - splitValue, splitLayer, etc.  
✅ **Recent sessions visible** - context without clicking  

---

## Corrected Level 2 Plan

### Session 1: rect() - TRBL Rectangle (30-40 min)

**Syntax (CORRECTED)**: `rect( [ <length-percentage> | auto ]{4} [ round <'border-radius'> ]? )`

**Key Points**:
- ✅ ALWAYS 4 values (top, right, bottom, left) - NO expansion
- ✅ Each value: `<length-percentage>` OR `auto`
- ✅ Optional `round <border-radius>` (reuse from inset)
- ✅ Similar to inset() but different semantics

**Examples**:
```css
rect(10px 20px 30px 40px)              /* basic */
rect(auto auto 50% 0)                  /* with auto */
rect(10px 20px 30px 40px round 5px)    /* rounded */
rect(0 0 100% 100%)                    /* full element */
```

**Implementation**:
1. IR Type:
```typescript
export const clipPathRectSchema = z.object({
  kind: z.literal("clip-path-rect"),
  top: z.union([lengthPercentageSchema, z.literal("auto")]),
  right: z.union([lengthPercentageSchema, z.literal("auto")]),
  bottom: z.union([lengthPercentageSchema, z.literal("auto")]),
  left: z.union([lengthPercentageSchema, z.literal("auto")]),
  borderRadius: z.object({ /* same as inset */ }).optional(),
});
```

2. Parser: NO expansion logic, expect exactly 4 values
3. Tests: ~25-30 (basic, auto, border-radius, mixed)

**Complexity**: MEDIUM (no expansion = simpler than claimed)

---

### Session 2: xywh() - Position-Based Rectangle (30-40 min)

**Syntax**: `xywh( <length-percentage>{2} <length-percentage [0,∞]>{2} [ round <'border-radius'> ]? )`

**Key Points**:
- ✅ X, Y position (any value, can be negative)
- ✅ Width, Height (NON-NEGATIVE only)
- ✅ Optional `round <border-radius>`
- ✅ Position-based vs inset-based semantics

**Examples**:
```css
xywh(10px 20px 100px 50px)              /* x y width height */
xywh(0 0 100% 100%)                      /* full element */
xywh(-10px -10px 50px 80px)             /* negative position OK */
xywh(10% 20% 50px 80px round 5px)       /* with border-radius */
```

**Implementation**:
1. IR Type:
```typescript
export const clipPathXywhSchema = z.object({
  kind: z.literal("clip-path-xywh"),
  x: lengthPercentageSchema,
  y: lengthPercentageSchema,
  width: lengthPercentageSchema.refine(v => /* >= 0 */),
  height: lengthPercentageSchema.refine(v => /* >= 0 */),
  borderRadius: z.object({ /* same as inset */ }).optional(),
});
```

2. Parser: Validate width/height >= 0
3. Tests: ~25-30 (basic, negative pos, border-radius, edge cases)

**Complexity**: MEDIUM

---

### Session 3: path() - SVG Path Data (60-90 min) 🔥

**Syntax (CORRECTED)**: `path( <'fill-rule'>? , <string> )`

**Key Points**:
- ✅ Optional fill-rule: `nonzero` | `evenodd`
- ✅ **COMMA SEPARATOR** between fill-rule and string
- ✅ String contains SVG path data
- ✅ Path commands: M, L, H, V, C, S, Q, T, A, Z (+ lowercase)
- ⚠️ DECISION: Store as validated string OR parse deeply?

**Examples**:
```css
path("M 10,10 L 90,10 L 50,90 Z")          /* no fill-rule */
path(evenodd, "M 10,10 L 90,10 L 50,90 Z") /* WITH COMMA */
path(nonzero, "M10 10 L90 10 L50 90z")     /* compact */
```

**Implementation Strategy**:

**Option A: Store as Validated String (RECOMMENDED)** ✅
```typescript
export const clipPathPathSchema = z.object({
  kind: z.literal("clip-path-path"),
  fillRule: fillRuleSchema.optional(),
  pathData: z.string().refine(isValidSVGPath), // Basic validation
});
```

- ✅ Simpler implementation (30-40 min)
- ✅ Preserves original path string
- ✅ Sufficient for most use cases
- ✅ Round-trip guaranteed
- ❌ No structural validation

**Option B: Parse SVG Path Deeply** ⚠️
```typescript
export const clipPathPathSchema = z.object({
  kind: z.literal("clip-path-path"),
  fillRule: fillRuleSchema.optional(),
  commands: z.array(/* parsed path commands */),
});
```

- ❌ Much more complex (60-90 min)
- ❌ Risk of bugs in path parsing
- ❌ Harder to round-trip
- ✅ Structural validation
- ✅ Enables transformations

**Recommendation**: **Option A for MVP**, Option B for future enhancement

**Tests**: ~30-40 (fill-rule variants, various commands, validation errors)

**Complexity**: HIGH (but Option A reduces to MEDIUM)

---

## Recommended Session Order

### Option 1: Easy → Hard (Build Confidence)
1. **rect()** (30-40 min) - Similar to inset, no expansion
2. **xywh()** (30-40 min) - Position-based, validation
3. **path()** (40-60 min) - Most complex, Option A

**Total**: 100-140 min (1.7-2.3 hours)

### Option 2: Parallel Value (2 agents)
Agent A:
1. **rect()** (30-40 min)
2. **path()** Option A (40-60 min)

Agent B:
1. **xywh()** (30-40 min)
2. Merge & integration tests

**Total**: ~70-100 min per agent (parallel)

---

## Additional Tasks (Cleanup)

### 1. Extract fill-rule Type (5 min)
```typescript
// In src/core/types/clip-path.ts
export const fillRuleSchema = z.enum(["nonzero", "evenodd"]);
export type FillRule = z.infer<typeof fillRuleSchema>;
```

Update polygon to use shared type.

### 2. Add SVG Geometry Boxes (10 min)
```typescript
// In src/core/keywords/geometry-box.ts
export type GeometryBoxKeyword =
  | "content-box"
  | "padding-box"
  | "border-box"
  | "margin-box"
  | "fill-box"      // SVG
  | "stroke-box"    // SVG
  | "view-box";     // SVG
```

Add parse/generate support + tests (~20 tests).

### 3. Add Radial Extent Keywords (10 min)
```typescript
// In circle/ellipse schemas
radius: z.union([
  lengthPercentageSchema,
  z.enum([
    "closest-side",
    "farthest-side", 
    "closest-corner",   // ADD
    "farthest-corner"   // ADD
  ])
]).optional(),
```

Add tests for new keywords (~10 tests).

---

## Revised Time Estimates

### With Corrections
- **rect()**: 30-40 min (simpler than claimed - no expansion)
- **xywh()**: 30-40 min (as estimated)
- **path()** Option A: 40-60 min (reduced from 60-90)
- **Cleanup tasks**: 25 min (fill-rule, geometry-box, radial-extent)

**Total**: 125-165 min (2.1-2.75 hours)

### Without Corrections (Original Plan)
- Would have failed: rect() parser wrong, path() parser wrong
- Would have wasted time debugging spec mismatches
- Would have needed rework

---

## Quality Checklist

Before starting any session:

- [ ] Read MDN schema for that function (mdm-data/css/functions.json)
- [ ] Verify syntax matches EXACTLY
- [ ] Check for comma vs space separators
- [ ] Identify value constraints (e.g., non-negative)
- [ ] Look for optional vs required arguments
- [ ] Check related types (fill-rule, geometry-box, etc.)

During implementation:

- [ ] IR type matches MDN syntax EXACTLY
- [ ] Parser handles all MDN examples
- [ ] Generator produces valid CSS per MDN
- [ ] Tests cover all syntax variations
- [ ] Round-trip validation (parse → generate → parse)

After implementation:

- [ ] `just check` passes
- [ ] `just test` passes (all 2234 + new)
- [ ] Update CONTINUE.md with session status
- [ ] Create HANDOVER.md in session archive
- [ ] Commit with proper message format

---

## Verdict

### CONTINUE.md Status: ⚠️ NEEDS CORRECTIONS

**Critical Issues**: 2 (rect syntax, path syntax)  
**Medium Issues**: 3 (fill-rule, geometry-box, radial-extent)

### Recommendation

1. ❌ **DO NOT** start implementation with current CONTINUE.md
2. ✅ **DO** fix specification errors first
3. ✅ **DO** validate against MDN schema before coding
4. ✅ **DO** use MASTER_PLAN.md process (progress table, handovers)
5. ✅ **DO** consider Option A (string storage) for path()

### Next Steps

1. Update CONTINUE.md with corrected syntax
2. Add progress tracking table (like MASTER_PLAN)
3. Add quality checklist to workflow
4. Create session-1.md with rect() corrected plan
5. Then proceed with implementation

---

## Lessons from MASTER_PLAN.md

### What to Adopt

1. **Progress Tracking Table** - Visual status at a glance
2. **Handover Template** - Consistency across sessions
3. **Stay in Scope Rule** - Prevent feature creep
4. **Quality Gates Reminder** - Never skip checks
5. **Commit Message Format** - Consistent git history
6. **"Ask, don't guess"** - Clarify before coding

### What CONTINUE.md Already Has (Keep)

1. **Inline at root** - Fast access
2. **Quick commands** - Immediate actions
3. **Pattern references** - Reusable utilities
4. **Recent sessions** - Context without navigation

### Synthesis (Best of Both)

```markdown
## 🎯 NEXT: Clip-Path Level 2

**Status**: 🔵 Session 1 (rect) in progress  
**Progress**: 0/3 shapes complete

| Session | Shape | Status | Tests | Agent | Handover |
|---------|-------|--------|-------|-------|----------|
| 1 | rect() | 🔵 IN PROGRESS | 0/30 | - | - |
| 2 | xywh() | ⚪ TODO | 0/30 | - | - |
| 3 | path() | ⚪ TODO | 0/40 | - | - |

**Current Session**: [rect() - TRBL Rectangle](archive/2025-01-20-rect/session-1.md)

### Before Starting
- [ ] Verify MDN schema (mdm-data/css/functions.json)
- [ ] Read previous HANDOVER.md (if continuing)
- [ ] Run `just check && just test` (baseline)

### After Completing
- [ ] All tests passing (`just test`)
- [ ] Update progress table above
- [ ] Create HANDOVER.md in session archive
- [ ] Commit: `feat(clip-path): Session N - [shape]`

### Quality Gates (Non-Negotiable)
```bash
just check  # Must pass before commit
just test   # All 2234+ tests must pass
```

**Rules**:
- One session at a time
- Stay in scope (resist feature creep)
- When stuck, ask - don't guess
- Update CONTINUE.md after each session
```

---

## References

- MDN CSS Schema: `/Users/alphab/Dev/LLM/DEV/mdm-data/css/`
- Phase 4 Colors Master Plan: `.memory/archive/2025-10-18-phase4-colors/MASTER_PLAN.md`
- Current Clip-Path Types: `src/core/types/clip-path.ts`
- MDN clip-path: https://developer.mozilla.org/docs/Web/CSS/clip-path
- MDN basic-shape: https://developer.mozilla.org/docs/Web/CSS/basic-shape

---

**Evaluation Complete** ✅

**Action Required**: Update CONTINUE.md with corrected syntax before proceeding.
