# Clip-Path Implementation - Master Plan

**Status**: Session 1 Starting (URL + none)
**Current Session**: Session 1 (URL & Keywords)
**Tests**: 1891 baseline → ~2100 target (+200 tests estimated)

---

## Quick Start

**First time here?**
1. Run: `just check && just test` (verify baseline: 1891 tests)
2. Read: Session 1 plan below
3. Start: Follow Session 1 tasks

**Returning agent?**
1. Check progress table below
2. Read previous session's HANDOVER.md
3. Read your session plan
4. Continue from there

---

## Clip-Path Syntax Overview

```
clip-path: <clip-source> | [ <basic-shape> || <geometry-box> ] | none

<clip-source> = <url>
<basic-shape> = <inset()> | <circle()> | <ellipse()> | <polygon()> | <path()> | <rect()> | <xywh()>
<geometry-box> = <shape-box> | fill-box | stroke-box | view-box
<shape-box> = <visual-box> | margin-box
<visual-box> = content-box | padding-box | border-box
```

**Complexity**: HIGH - This is a complex property with 7 shape functions + URL + geometry boxes

---

## Progress Tracker

| Session | Status | Tests | Time Est. | Date | Handover |
|---------|--------|-------|-----------|------|----------|
| 1. URL & none | 🔵 NOW | 0/15 | 30-45 min | 2025-10-19 | - |
| 2. Geometry Box Keywords | ⚪ TODO | 0/20 | 30-45 min | - | - |
| 3. Inset Shape | ⚪ TODO | 0/30 | 60-90 min | - | - |
| 4. Circle & Ellipse | ⚪ TODO | 0/40 | 90-120 min | - | - |
| 5. Polygon Shape | ⚪ TODO | 0/30 | 60-90 min | - | - |
| 6. Path Shape | ⚪ TODO | 0/25 | 60-90 min | - | - |
| 7. Rect & XYWH Shapes | ⚪ TODO | 0/20 | 45-60 min | - | - |
| 8. Combined Syntax | ⚪ TODO | 0/20 | 45-60 min | - | - |
| 9. Master Parser & Generate | ⚪ TODO | 0/30 | 60-90 min | - | - |

**Status Legend**: ⚪ TODO | 🔵 IN PROGRESS | ✅ DONE | ⚠️ BLOCKED

---

## Session 1: URL & none Keyword ⭐ START HERE

**Time**: 30-45 min | **Tests**: +15 | **Complexity**: LOW

**Goal**: Implement simplest clip-path values to establish infrastructure.

### Syntax
```
clip-path: url(#clip-id) | none
<clip-source> = <url>
```

### Deliverables
- [ ] `src/core/types/clip-path.ts` - Base IR types
- [ ] `src/parse/clip-path/url.ts` - URL parser (reuse from filter/url.ts pattern)
- [ ] `src/parse/clip-path/none.ts` - none keyword parser
- [ ] `src/generate/clip-path/url.ts` - URL generator
- [ ] `src/generate/clip-path/none.ts` - none generator
- [ ] 15+ tests with round-trip validation

### Tasks
1. **Create base types** (`src/core/types/clip-path.ts`)
   ```typescript
   export type ClipPathValue = 
     | ClipPathUrl
     | ClipPathNone
     // Add more as we implement them

   export type ClipPathUrl = {
     kind: "clip-path-url";
     url: string;
   };

   export type ClipPathNone = {
     kind: "clip-path-none";
   };
   ```

2. **Implement URL parser** (reuse `src/parse/filter/url.ts` pattern)
   - Parse `url(#id)` and `url('path.svg#id')`
   - Handle quoted/unquoted URLs
   - Extract URL value

3. **Implement none parser** (simple keyword)

4. **Implement generators** (URL + none)

5. **Write tests**
   - URL variations: fragment ID, file paths, quoted/unquoted
   - none keyword
   - Round-trip all cases

### Examples to Support
```css
clip-path: none;
clip-path: url(#clip-shape);
clip-path: url('#clip-shape');
clip-path: url('shapes.svg#clip-id');
clip-path: url("shapes.svg#clip-id");
```

### Quality Gates
```bash
just check  # Must pass
just test   # 1891 → 1906 tests (+15)
```

---

## Session 2: Geometry Box Keywords

**Time**: 30-45 min | **Tests**: +20 | **Complexity**: LOW-MEDIUM

**Goal**: Implement all geometry-box keywords for standalone use.

### Syntax
```
<geometry-box> = <shape-box> | fill-box | stroke-box | view-box
<shape-box> = <visual-box> | margin-box
<visual-box> = content-box | padding-box | border-box
```

**Total Keywords**: 7 (content-box, padding-box, border-box, margin-box, fill-box, stroke-box, view-box)

### Deliverables
- [ ] `src/core/keywords/geometry-box.ts` - Keyword definitions
- [ ] `src/parse/clip-path/geometry-box.ts` - Keyword parser
- [ ] `src/generate/clip-path/geometry-box.ts` - Keyword generator
- [ ] 20+ tests for all keyword variations

### Tasks
1. Add geometry-box keywords to core
2. Implement parser (simple keyword matching)
3. Implement generator
4. Test all 7 keywords + invalid cases

---

## Session 3: Inset Shape Function

**Time**: 60-90 min | **Tests**: +30 | **Complexity**: MEDIUM-HIGH

**Goal**: Implement inset() shape function.

### Syntax
```
inset( <length-percentage>{1,4} [ round <'border-radius'> ]? )
```

### Complexity Notes
- 1-4 length-percentage values (like margin/padding TRBL)
- Optional `round` keyword with border-radius syntax
- Border-radius can be complex (1-8 values with slashes)

### Deliverables
- [ ] `src/parse/clip-path/shapes/inset.ts`
- [ ] `src/generate/clip-path/shapes/inset.ts`
- [ ] 30+ tests with various inset + round combinations

### Dependencies
- Length-percentage parser (exists: `src/utils/parse/length-percentage.ts`)
- Border-radius parser (may need to extract/reuse)

---

## Session 4: Circle & Ellipse Shapes

**Time**: 90-120 min | **Tests**: +40 | **Complexity**: HIGH

**Goal**: Implement circle() and ellipse() shape functions.

### Syntax
```
circle( <radial-size>? [ at <position> ]? )
ellipse( <radial-size>? [ at <position> ]? )

<radial-size> = <radial-extent> | <length [0,∞]> | <length-percentage [0,∞]>{2}
<radial-extent> = closest-corner | closest-side | farthest-corner | farthest-side
```

### Complexity Notes
- Optional radius/radii (default: closest-side)
- Optional position (default: center)
- Circle: single radius, Ellipse: two radii
- radial-extent keywords
- Position parser (exists: `src/parse/position/position.ts`)

### Deliverables
- [ ] `src/parse/clip-path/shapes/circle.ts`
- [ ] `src/parse/clip-path/shapes/ellipse.ts`
- [ ] `src/generate/clip-path/shapes/circle.ts`
- [ ] `src/generate/clip-path/shapes/ellipse.ts`
- [ ] 40+ tests (20 each shape)

---

## Session 5: Polygon Shape

**Time**: 60-90 min | **Tests**: +30 | **Complexity**: MEDIUM-HIGH

**Goal**: Implement polygon() shape function.

### Syntax
```
polygon( <'fill-rule'>? , [ <length-percentage> <length-percentage> ]# )

<fill-rule> = nonzero | evenodd
```

### Complexity Notes
- Optional fill-rule (default: nonzero)
- Variable number of coordinate pairs (minimum 3 for triangle)
- Comma-separated list syntax

### Deliverables
- [ ] `src/parse/clip-path/shapes/polygon.ts`
- [ ] `src/generate/clip-path/shapes/polygon.ts`
- [ ] 30+ tests with various polygon shapes

### Examples
```css
polygon(50% 0%, 100% 100%, 0% 100%)  /* Triangle */
polygon(nonzero, 0 0, 100% 0, 100% 100%, 0 100%)  /* Rectangle */
```

---

## Session 6: Path Shape

**Time**: 60-90 min | **Tests**: +25 | **Complexity**: HIGH

**Goal**: Implement path() shape function (SVG path data).

### Syntax
```
path( <'fill-rule'>? , <string> )
```

### Complexity Notes
- Optional fill-rule
- SVG path data string (validate basic syntax, don't parse commands)
- Path string can be complex (M, L, C, Q, A commands)

### Deliverables
- [ ] `src/parse/clip-path/shapes/path.ts`
- [ ] `src/generate/clip-path/shapes/path.ts`
- [ ] 25+ tests with various SVG paths

### Examples
```css
path("M 10 10 L 90 10 L 50 90 Z")
path(evenodd, "M 10,10 h 80 v 80 h -80 Z")
```

---

## Session 7: Rect & XYWH Shapes (CSS Shapes Level 2)

**Time**: 45-60 min | **Tests**: +20 | **Complexity**: MEDIUM

**Goal**: Implement rect() and xywh() shape functions (newer CSS).

### Syntax
```
rect( <top> <right> <bottom> <left> [ round <'border-radius'> ]? )
xywh( <x> <y> <width> <height> [ round <'border-radius'> ]? )
```

### Complexity Notes
- Both accept length-percentage values
- Optional border-radius
- Different coordinate systems

### Deliverables
- [ ] `src/parse/clip-path/shapes/rect.ts`
- [ ] `src/parse/clip-path/shapes/xywh.ts`
- [ ] `src/generate/clip-path/shapes/rect.ts`
- [ ] `src/generate/clip-path/shapes/xywh.ts`
- [ ] 20+ tests

---

## Session 8: Combined Syntax (Shape + Geometry Box)

**Time**: 45-60 min | **Tests**: +20 | **Complexity**: MEDIUM

**Goal**: Support `<basic-shape> || <geometry-box>` combined syntax.

### Syntax
```
clip-path: circle() border-box
clip-path: border-box circle()  /* Order doesn't matter */
```

### Complexity Notes
- Both orders valid: shape + box OR box + shape
- Need to handle whitespace separation
- Update all shape parsers to accept optional geometry-box

### Deliverables
- [ ] Update IR types to include optional geometry-box
- [ ] Update parsers to handle combined syntax
- [ ] Update generators
- [ ] 20+ tests with all combinations

---

## Session 9: Master Parser & Generate

**Time**: 60-90 min | **Tests**: +30 | **Complexity**: MEDIUM-HIGH

**Goal**: Unified clip-path parser/generator with dispatch logic.

### Deliverables
- [ ] `src/parse/clip-path/index.ts` - Master parser with dispatch
- [ ] `src/generate/clip-path/index.ts` - Master generator with dispatch
- [ ] Integration with main Parse/Generate exports
- [ ] 30+ integration tests
- [ ] Documentation updates

### Tasks
1. Create dispatcher that tries parsers in order
2. Handle all variants (URL, none, shapes, geometry-box, combined)
3. Comprehensive error messages
4. Export everything from main index

---

## Handover Template

After each session, create `HANDOVER.md` in `.memory/archive/2025-10-19-clip-path-shapes/`:

```markdown
# Session N Handover

**Status**: ✅ DONE / ⚠️ PARTIAL / ❌ BLOCKED
**Tests**: X passing (Y new, baseline was Z)
**Duration**: X minutes

## Completed
- [x] Task 1
- [x] Task 2

## What Works
[Brief description of what was implemented]

## Next Session
Agent should start with: [session N+1 brief description]

## Blockers / Issues
[None / List any issues]

## Key Decisions
[Important design choices or tricky parts]
```

---

## Quality Gates (Every Session)

**Before handover, all must pass**:

```bash
just check  # Format, lint, types - MUST PASS
just test   # All tests passing - MUST PASS
```

**Commit message format**:

```
feat(clip-path): Session N - [topic]

- [what you did]
- X new tests
- Tests: baseline → new count
```

---

## Dependencies & Reuse

**Existing parsers we can leverage**:
- ✅ `src/parse/filter/url.ts` - URL parsing pattern
- ✅ `src/parse/position/position.ts` - Position for circle/ellipse
- ✅ `src/utils/parse/length-percentage.ts` - Length-percentage parsing
- ⚠️ Border-radius - may need to extract from border parser

**Existing IR types**:
- ✅ Position IR (`src/core/types/position.ts`)
- ✅ Length/Percentage IR (`src/core/types/length.ts`)

---

## Architecture Decisions

### Type Structure
```typescript
// src/core/types/clip-path.ts
export type ClipPathValue =
  | ClipPathUrl
  | ClipPathNone
  | ClipPathGeometryBox
  | ClipPathShape
  | ClipPathCombined;  // shape + geometry-box

export type ClipPathShape =
  | InsetShape
  | CircleShape
  | EllipseShape
  | PolygonShape
  | PathShape
  | RectShape
  | XywhShape;
```

### Parser Structure
```
src/parse/clip-path/
├── index.ts              # Master parser (Session 9)
├── url.ts                # Session 1
├── none.ts               # Session 1
├── geometry-box.ts       # Session 2
└── shapes/
    ├── inset.ts          # Session 3
    ├── circle.ts         # Session 4
    ├── ellipse.ts        # Session 4
    ├── polygon.ts        # Session 5
    ├── path.ts           # Session 6
    ├── rect.ts           # Session 7
    └── xywh.ts           # Session 7
```

### Generator Structure
```
src/generate/clip-path/
├── index.ts              # Master generator (Session 9)
├── url.ts
├── none.ts
├── geometry-box.ts
└── shapes/
    ├── inset.ts
    ├── circle.ts
    ├── ellipse.ts
    ├── polygon.ts
    ├── path.ts
    ├── rect.ts
    └── xywh.ts
```

---

## Rules

1. **One session at a time** - Don't jump ahead (dependencies matter!)
2. **All tests must pass** - Quality gates are mandatory
3. **Update progress table** - Mark your session ✅ in this file
4. **Create handover doc** - Document in session subfolder
5. **Stay in scope** - Each session is focused, resist feature creep
6. **Reuse existing code** - Don't reinvent length-percentage, position, etc.

---

## Need Help?

- Check `src/parse/filter/url.ts` for URL parsing pattern
- Check `src/parse/position/position.ts` for position parsing
- Check `src/parse/gradient/` for complex function parsing examples
- Check existing test files for round-trip patterns
- Previous session's HANDOVER.md has context
- When stuck, ask - don't guess

---

## Expected Timeline

**Full implementation**: 7-10 hours across 9 sessions
**Complexity peaks**: Sessions 4 (circle/ellipse) and 9 (integration)
**Quick wins**: Sessions 1-2 (URL + keywords) ~1.5 hours

---

**Ready?** Start with **Session 1: URL & none** ⭐
