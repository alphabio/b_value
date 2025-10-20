# Session 6 Plan: polygon() Basic Shape Function

**Date**: 2025-10-20  
**Estimated Time**: 30-40 minutes  
**Expected Tests**: +40-50 tests  

---

## Goal

Implement `polygon()` basic shape function for clip-path with:
- Optional fill-rule: `nonzero` | `evenodd`
- Variable-length list of points (x,y coordinate pairs)
- Comma-separated point list syntax
- Full parse and generate support
- Comprehensive test coverage

---

## Syntax

```css
polygon( <fill-rule>? , <shape-arg># )

where:
  <fill-rule> = nonzero | evenodd
  <shape-arg> = <length-percentage> <length-percentage>
```

**Examples**:
```css
polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)
polygon(nonzero, 50% 0%, 100% 50%, 50% 100%, 0% 50%)
polygon(evenodd, 0px 0px, 100px 0px, 100px 100px, 0px 100px)
polygon(10px 10px, 90px 10px, 50px 90px)
```

---

## Implementation Phases

### Phase 1: IR Types
**File**: `src/core/types/clip-path.ts`

```typescript
export const ClipPathPolygon = z.object({
  kind: z.literal("clip-path-polygon"),
  fillRule: z.enum(["nonzero", "evenodd"]).optional(),
  points: z.array(
    z.object({
      x: LengthPercentage,
      y: LengthPercentage,
    })
  ),
});

export type ClipPathPolygon = z.infer<typeof ClipPathPolygon>;
```

Update `ClipPathValue` union to include polygon.

### Phase 2: Parser
**File**: `src/parse/clip-path/polygon.ts`

**Algorithm**:
1. Validate function name is "polygon"
2. Check for optional fill-rule keyword (first identifier if present)
3. Parse comma-separated list of point pairs
4. Each point is two consecutive length-percentage values
5. Validate at least 3 points (minimum for polygon)
6. Return IR with fillRule and points array

**Key Challenges**:
- Comma-separated list parsing
- Detecting fill-rule vs first coordinate
- Ensuring even number of values (pairs)
- Minimum 3 points validation

**Test File**: `src/parse/clip-path/polygon.test.ts`
- Basic parsing: 3-point, 4-point, 5-point polygons
- Fill-rule: nonzero, evenodd, default (undefined)
- Mixed units: px, %, mixed in same polygon
- Edge cases: unitless zero, minimum points
- Error handling: too few points, odd number of values, invalid fill-rule
- Whitespace handling

### Phase 3: Generator
**File**: `src/generate/clip-path/polygon.ts`

**Algorithm**:
1. Start with "polygon("
2. Add fill-rule if present: "nonzero, " or "evenodd, "
3. Iterate points, format each as "x y"
4. Join points with ", "
5. Close with ")"

**Key Challenges**:
- Comma placement (after fill-rule, between points)
- Proper spacing
- Using lengthPercentageToCss utility for each coordinate

**Test File**: `src/generate/clip-path/polygon.test.ts`
- Basic generation: 3-point, 4-point, 5-point polygons
- Fill-rule: with nonzero, with evenodd, without fill-rule
- Mixed units: px, %, mixed
- Round-trip: parse → generate → parse validation

---

## Key Decisions

### Fill-Rule Default
- If omitted, fillRule is `undefined` in IR
- CSS default is "nonzero" per spec
- Generator omits fill-rule when undefined (minimal CSS)

### Minimum Points
- Spec requires at least 3 points for valid polygon
- Parser validates this and returns error if < 3 points
- Generator assumes valid IR (3+ points)

### Comma Handling
- After fill-rule (if present): "nonzero, "
- Between points: ", " separator
- Clean, consistent comma usage

### Point Structure
- Each point is object with x and y properties
- Both x and y are LengthPercentage types
- Array of points in IR

---

## Test Coverage Goals

### Parser Tests (~25 tests)
- Basic: 3-point, 4-point, 5-point triangles/squares (5)
- Fill-rule: nonzero, evenodd, omitted (3)
- Units: px, %, mixed, unitless zero (4)
- Edge cases: minimum points (3), many points (6+) (2)
- Error handling: too few points, odd values, invalid fill-rule, wrong function (5)
- Whitespace: extra spaces, no spaces (2)
- Complex shapes: star, hexagon (2)

### Generator Tests (~25 tests)
- Basic: 3-point, 4-point, 5-point (5)
- Fill-rule: with nonzero, with evenodd, without (3)
- Units: px, %, mixed (3)
- Edge cases: zero values, many points (2)
- Round-trip: all major combinations (10)
- Complex shapes: star, hexagon (2)

---

## Pattern Reuse

- `parseLengthPercentageNode` from utils (for x,y coordinates)
- `lengthPercentageToCss` from utils (for generation)
- IR structure follows circle/ellipse pattern
- Test structure follows existing clip-path tests

---

## Time Breakdown

- Phase 1 (IR types): 5 minutes
- Phase 2 (Parser): 15 minutes (more complex due to list parsing)
- Phase 3 (Generator): 10 minutes
- Testing & validation: 5 minutes
- Documentation: 5 minutes

**Total**: ~40 minutes

---

## Success Criteria

- [ ] ClipPathPolygon type defined and validated
- [ ] Parser handles all polygon syntax variants
- [ ] Parser validates minimum 3 points
- [ ] Parser handles fill-rule correctly
- [ ] Generator produces minimal, valid CSS
- [ ] Round-trip validation passing
- [ ] 40-50 new tests passing
- [ ] All quality gates passing (check + test)
- [ ] No regressions in existing 2139 tests

---

## Next Session After This

**Option 1**: path() shape function (~45-60 min)
- Most complex shape
- Full SVG path data syntax or string validation

**Option 2**: rect() shape function (~25-30 min)
- Rectangular shape
- x, y, width, height + optional border-radius

**Option 3**: xywh() shape function (~25-30 min)
- CSS3 rect() alternative
- Similar to rect() but different syntax
