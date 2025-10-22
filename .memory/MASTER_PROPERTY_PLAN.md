# Master CSS Property Plan - b_value
**Date**: 2025-10-22T01:34:00Z  
**Current**: v0.1.0 (51 properties)  
**Goal**: v2.0.0 (131+ properties - 100% longhand coverage)

---

## Quick Status

| Phase | Properties | Effort | Status | Target |
|-------|------------|--------|--------|--------|
| 0 - Fix Registration | 32 | 2h | ⏳ Pending | v1.0 |
| 1 - Box Model | 12 | 4h | ⏳ Pending | v1.0 |
| 2 - Flexbox | 11 | 6h | ⏳ Pending | v1.1 |
| 3 - Typography | 9 | 5h | ⏳ Pending | v1.1 |
| 4 - Grid | 8 | 8h | ⏳ Pending | v1.2 |
| 5 - Advanced | 8+ | 12h | ⏳ Pending | v2.0 |
| **TOTAL** | **80+** | **37h** | | |

**Current Coverage**: 51/131 properties (39%)  
**After Phase 0**: 51/131 (39%) - Registration fixed  
**After Phase 1**: 63/131 (48%) - Box model added  
**After Phase 2**: 74/131 (56%) - Flexbox added  
**After Phase 3**: 83/131 (63%) - Typography complete  
**After Phase 4**: 91/131 (69%) - Grid added  
**After Phase 5**: 99+/131 (75%+) - Advanced features

---

## Phase 0: Fix Registration (v1.0 - CRITICAL) ⚠️

**Effort**: 2 hours  
**Priority**: CRITICAL - Must fix before v1.0  
**Impact**: Makes 32 existing generators accessible via universal API

### The Problem

We have **32 working generators** that aren't registered in `universal.ts`:

```typescript
// These generators EXIST and WORK:
src/generate/animation/delay.ts        ✅
src/generate/animation/duration.ts     ✅
src/generate/animation/timing-function.ts ✅
// ... (32 total)

// But they're NOT in universal.ts:
const PROPERTY_GENERATORS = {
  "animation-name": AnimationGenerate.generate,  // ✅ Only this one!
  // ❌ Missing: animation-delay, duration, timing-function, etc.
}
```

### Properties to Register

**Animation** (7 properties):
- [ ] animation-delay
- [ ] animation-direction
- [ ] animation-duration
- [ ] animation-fill-mode
- [ ] animation-iteration-count
- [ ] animation-play-state
- [ ] animation-timing-function

**Transition** (3 properties):
- [ ] transition-delay
- [ ] transition-duration
- [ ] transition-timing-function

**Border** (12 properties):
- [ ] border-top-style
- [ ] border-right-style
- [ ] border-bottom-style
- [ ] border-left-style
- [ ] border-top-width
- [ ] border-right-width
- [ ] border-bottom-width
- [ ] border-left-width
- [ ] border-top-left-radius
- [ ] border-top-right-radius
- [ ] border-bottom-left-radius
- [ ] border-bottom-right-radius

**Background** (5 properties):
- [ ] background-attachment
- [ ] background-clip
- [ ] background-origin
- [ ] background-repeat
- [ ] background-size

**Outline** (1 property):
- [ ] outline-offset

**Text** (4 properties):
- [ ] text-decoration-color
- [ ] text-decoration-line
- [ ] text-decoration-style
- [ ] text-decoration-thickness

### Implementation

```typescript
// In src/universal.ts - Add to PROPERTY_GENERATORS:

// Animation properties
"animation-delay": AnimationGenerate.generate,
"animation-direction": AnimationGenerate.generate,
"animation-duration": AnimationGenerate.generate,
"animation-fill-mode": AnimationGenerate.generate,
"animation-iteration-count": AnimationGenerate.generate,
"animation-play-state": AnimationGenerate.generate,
"animation-timing-function": AnimationGenerate.generate,

// Transition properties
"transition-delay": TransitionGenerate.generate,
"transition-duration": TransitionGenerate.generate,
"transition-timing-function": TransitionGenerate.generate,

// Border properties
"border-top-style": BorderGenerate.generate,
"border-right-style": BorderGenerate.generate,
"border-bottom-style": BorderGenerate.generate,
"border-left-style": BorderGenerate.generate,
"border-top-width": BorderGenerate.generate,
"border-right-width": BorderGenerate.generate,
"border-bottom-width": BorderGenerate.generate,
"border-left-width": BorderGenerate.generate,
"border-top-left-radius": wrapGenerator(BorderRadius.toCss),
"border-top-right-radius": wrapGenerator(BorderRadius.toCss),
"border-bottom-left-radius": wrapGenerator(BorderRadius.toCss),
"border-bottom-right-radius": wrapGenerator(BorderRadius.toCss),

// Background properties
"background-attachment": wrapGenerator(BackgroundAttachment.toCss),
"background-clip": wrapGenerator(BackgroundClip.toCss),
"background-origin": wrapGenerator(BackgroundOrigin.toCss),
"background-repeat": wrapGenerator(BackgroundRepeat.toCss),
"background-size": wrapGenerator(BackgroundSize.toCss),

// Outline
"outline-offset": OutlineGenerate.generate,

// Text decoration
"text-decoration-color": ColorGenerate.generate,
"text-decoration-line": wrapGenerator(TextLine.toCss),
"text-decoration-style": wrapGenerator(TextStyle.toCss),
"text-decoration-thickness": wrapGenerator(TextThickness.toCss),
```

### Testing

```typescript
// Test each property via universal API:
const result = generate({
  property: "animation-delay",
  value: { kind: "animation-delay", delays: [{ value: 1, unit: "s" }] }
});
expect(result.ok).toBe(true);
expect(result.value).toBe("1s");
```

### Validation

```bash
# 1. Run tests
just test

# 2. Manual test all 32 properties
pnpm test src/universal.test.ts

# 3. Test via generateAll()
const css = generateAll({
  "animation-delay": IR,
  "border-top-width": IR,
  // ... all 32 properties
});
```

---

## Phase 1: Box Model (v1.0 - STRONGLY RECOMMENDED) 📦

**Effort**: 4 hours  
**Priority**: HIGH - Essential for ANY layout work  
**Impact**: Users can actually build layouts

### Why Box Model First?

**Every website needs**:
- `width` / `height` - Size elements
- `margin` - Space between elements
- `padding` - Space inside elements
- `max-width` / `min-height` - Responsive design

**Without these**: b_value is only useful for colors/effects, not layouts

### Properties to Add (12)

**Size** (4 properties):
- [ ] width
- [ ] height
- [ ] max-width
- [ ] max-height
- [ ] min-width
- [ ] min-height

**Margin** (4 properties):
- [ ] margin-top
- [ ] margin-right
- [ ] margin-bottom
- [ ] margin-left

**Padding** (4 properties):
- [ ] padding-top
- [ ] padding-right
- [ ] padding-bottom
- [ ] padding-left

### IR Design

```typescript
// Reuse existing Length type
type BoxDimension = Length | Percentage | Keyword<"auto">;

type Width = {
  kind: "width";
  value: BoxDimension;
};

type MarginTop = {
  kind: "margin-top";
  value: BoxDimension;
};

// Similar for all 12 properties
```

### Implementation Plan

**1. Create Module** (1h):
```bash
src/parse/box-model/
  ├── index.ts
  ├── width.ts
  ├── height.ts
  ├── max-width.ts
  ├── max-height.ts
  ├── min-width.ts
  ├── min-height.ts
  ├── margin-top.ts
  ├── margin-right.ts
  ├── margin-bottom.ts
  ├── margin-left.ts
  ├── padding-top.ts
  ├── padding-right.ts
  ├── padding-bottom.ts
  └── padding-left.ts
```

**2. Write Parsers** (1.5h):
```typescript
// Simple length parser
export function parse(value: string): Result<Width, string> {
  // Try "auto"
  if (value === "auto") {
    return ok({ kind: "width", value: { type: "keyword", value: "auto" } });
  }
  
  // Try length
  const length = Length.parse(value);
  if (length.ok) {
    return ok({ kind: "width", value: length.value });
  }
  
  // Try percentage
  const pct = Percentage.parse(value);
  if (pct.ok) {
    return ok({ kind: "width", value: pct.value });
  }
  
  return err("Invalid width value");
}
```

**3. Write Generators** (1h):
```typescript
export function toCss(ir: Width): string {
  if (ir.value.type === "keyword") {
    return ir.value.value; // "auto"
  }
  if (ir.value.type === "length") {
    return `${ir.value.value}${ir.value.unit}`; // "10px"
  }
  if (ir.value.type === "percentage") {
    return `${ir.value.value}%`; // "50%"
  }
}
```

**4. Tests** (30min):
```typescript
// width.test.ts
test("parse width", () => {
  expect(parse("10px")).toMatchObject({ ok: true, value: { value: 10, unit: "px" } });
  expect(parse("auto")).toMatchObject({ ok: true, value: { type: "keyword", value: "auto" } });
  expect(parse("50%")).toMatchObject({ ok: true, value: { value: 50 } });
});

// width.generate.test.ts
test("generate width", () => {
  expect(toCss({ kind: "width", value: { type: "length", value: 10, unit: "px" } })).toBe("10px");
  expect(toCss({ kind: "width", value: { type: "keyword", value: "auto" } })).toBe("auto");
});
```

**5. Register** (30min):
```typescript
// In universal.ts
import * as BoxModel from "./parse/box-model";

const PROPERTY_PARSERS = {
  // ... existing
  width: BoxModel.Width.parse,
  height: BoxModel.Height.parse,
  // ... (12 total)
};

const PROPERTY_GENERATORS = {
  // ... existing
  width: wrapGenerator(BoxModel.Width.toCss),
  height: wrapGenerator(BoxModel.Height.toCss),
  // ... (12 total)
};
```

### Value Delivered

After Phase 1, users can do:
```typescript
parseAll(`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;  /* Wait - this is shorthand! Use margin-left/right */
  margin-left: auto;
  margin-right: auto;
  padding-top: 20px;
`);
```

**Coverage**: 51 → 63 properties (48%)

---

## Phase 2: Flexbox (v1.1) 🧩

**Effort**: 6 hours  
**Priority**: HIGH - Modern layouts require flexbox  
**Impact**: Enable modern responsive layouts

### Why Flexbox?

- Used by **90%+ of modern websites**
- Essential for responsive design
- Simpler than Grid for 1D layouts
- High user demand

### Properties to Add (11)

**Container** (6 properties):
- [ ] flex-direction
- [ ] flex-wrap
- [ ] justify-content
- [ ] align-items
- [ ] align-content
- [ ] flex-flow (SHORTHAND - reject with error pointing to b_short)

**Items** (5 properties):
- [ ] flex-grow
- [ ] flex-shrink
- [ ] flex-basis
- [ ] align-self
- [ ] order

### IR Design

```typescript
type FlexDirection = {
  kind: "flex-direction";
  value: "row" | "row-reverse" | "column" | "column-reverse";
};

type JustifyContent = {
  kind: "justify-content";
  value: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
};

type FlexGrow = {
  kind: "flex-grow";
  value: number;
};

type FlexBasis = {
  kind: "flex-basis";
  value: Length | Percentage | Keyword<"auto" | "content">;
};
```

### Implementation

Similar to Box Model:
1. Create `src/parse/flex/` module
2. Write parsers (keyword-based, simple)
3. Write generators
4. Tests
5. Register in universal.ts

**Coverage**: 63 → 74 properties (56%)

---

## Phase 3: Typography (v1.1) 📝

**Effort**: 5 hours  
**Priority**: HIGH - Every website has text  
**Impact**: Complete text styling capabilities

### Why Typography?

- **Every website** uses text
- Currently only 5/14 text properties supported
- High user demand (font-size, font-family, etc.)

### Properties to Add (9)

**Font** (6 properties):
- [ ] font-family
- [ ] font-size
- [ ] font-weight
- [ ] font-style
- [ ] line-height
- [ ] font-variant

**Spacing** (3 properties):
- [ ] letter-spacing
- [ ] word-spacing
- [ ] white-space

### IR Design

```typescript
type FontFamily = {
  kind: "font-family";
  families: Array<{ type: "name" | "generic", value: string }>;
};

type FontSize = {
  kind: "font-size";
  value: Length | Percentage | Keyword<"small" | "medium" | "large" | ...>;
};

type FontWeight = {
  kind: "font-weight";
  value: number | Keyword<"normal" | "bold" | "lighter" | "bolder">;
};
```

### Challenges

**font-family** is complex:
```css
font-family: "Helvetica Neue", Arial, sans-serif;
font-family: 'Times New Roman', serif;
```

Need to:
- Parse quoted strings
- Handle comma-separated lists
- Distinguish named fonts vs generic families

**Effort breakdown**:
- font-family: 2h (complex parsing)
- Others: 3h (simpler)

**Coverage**: 74 → 83 properties (63%)

---

## Phase 4: Grid (v1.2) 🎯

**Effort**: 8 hours  
**Priority**: MEDIUM - Advanced layouts  
**Impact**: Enable modern grid layouts

### Why Grid Later?

- Less common than Flexbox (60% vs 90% usage)
- More complex spec
- More edge cases
- Can ship without Grid initially

### Properties to Add (8)

**Template** (2 properties):
- [ ] grid-template-columns
- [ ] grid-template-rows

**Placement** (4 properties):
- [ ] grid-column-start
- [ ] grid-column-end
- [ ] grid-row-start
- [ ] grid-row-end

**Gap** (2 properties):
- [ ] grid-column-gap
- [ ] grid-row-gap

### IR Design

```typescript
type GridTemplateColumns = {
  kind: "grid-template-columns";
  tracks: Array<GridTrack>;
};

type GridTrack = 
  | { type: "length", value: number, unit: string }
  | { type: "fr", value: number }
  | { type: "minmax", min: GridTrack, max: GridTrack }
  | { type: "repeat", count: number | "auto-fill" | "auto-fit", track: GridTrack };
```

### Challenges

Grid syntax is **extremely complex**:
```css
grid-template-columns: 100px 1fr 2fr;
grid-template-columns: repeat(3, 1fr);
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
grid-template-columns: [header-start] 1fr [header-end content-start] 2fr [content-end];
```

**Needs**:
- Track parsing (px, fr, %, auto)
- `repeat()` function
- `minmax()` function
- Named grid lines
- `auto-fill` / `auto-fit`

**Effort**: High complexity, worth 8h

**Coverage**: 83 → 91 properties (69%)

---

## Phase 5: Advanced Properties (v2.0+) 🚀

**Effort**: 12+ hours  
**Priority**: LOW - Nice-to-have  
**Impact**: Complete spec coverage

### Categories

**SVG** (4+ properties):
- [ ] fill
- [ ] stroke
- [ ] stroke-width
- [ ] stroke-dasharray

**Scroll** (3 properties):
- [ ] scroll-behavior
- [ ] scroll-margin-top
- [ ] scroll-padding-top

**Container Queries** (2+ properties):
- [ ] container-type
- [ ] container-name

**Custom Properties** (special):
- [ ] --* (custom property support)

**Other**:
- [ ] aspect-ratio
- [ ] gap
- [ ] place-items
- [ ] place-content

**Coverage**: 91+ → 99+ properties (75%+)

---

## Implementation Strategy

### Sprint Planning

**Sprint 1 (v1.0)**: Registration + Box Model
- Week 1: Fix registration gap (2h)
- Week 1: Add box model (4h)
- Week 1: Test, document, release v1.0
- **Deliverable**: 63 properties (48% coverage)

**Sprint 2 (v1.1)**: Flexbox + Typography
- Week 2: Add flexbox (6h)
- Week 3: Add typography (5h)
- Week 3: Test, document, release v1.1
- **Deliverable**: 83 properties (63% coverage)

**Sprint 3 (v1.2)**: Grid
- Week 4-5: Add grid (8h)
- Week 5: Test, document, release v1.2
- **Deliverable**: 91 properties (69% coverage)

**Sprint 4 (v2.0)**: Advanced
- Week 6-8: Add advanced properties (12h+)
- Week 8: Test, document, release v2.0
- **Deliverable**: 99+ properties (75%+ coverage)

### Prioritization Matrix

| Property | User Value | Complexity | ROI | Phase |
|----------|------------|------------|-----|-------|
| Box Model | ⭐⭐⭐⭐⭐ | ⭐ | 🔥 HIGHEST | v1.0 |
| Flexbox | ⭐⭐⭐⭐⭐ | ⭐⭐ | 🔥 HIGH | v1.1 |
| Typography | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 🔥 HIGH | v1.1 |
| Grid | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐ MEDIUM | v1.2 |
| SVG | ⭐⭐ | ⭐⭐ | ⭐ LOW | v2.0 |
| Custom | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ LOW | v2.0 |

### Success Metrics

**v1.0** (48% coverage):
- ✅ Universal API works for all properties
- ✅ Box model supported
- ✅ Can build basic layouts

**v1.1** (63% coverage):
- ✅ Flexbox supported
- ✅ Typography complete
- ✅ Can build modern responsive websites

**v1.2** (69% coverage):
- ✅ Grid supported
- ✅ Can build complex layouts
- ✅ 70% of CSS properties covered

**v2.0** (75%+ coverage):
- ✅ Advanced features
- ✅ Near-complete CSS support
- ✅ Industry-leading coverage

---

## Contributing

Want to help? Pick a property from the list!

### Easy Properties (Good First Issues) ⭐

These are simple keyword-based properties:
- `flex-direction` (4 keywords)
- `flex-wrap` (3 keywords)
- `font-style` (3 keywords)
- `white-space` (6 keywords)

**Effort**: 30min - 1h each

### Medium Properties ⭐⭐

These need length/percentage parsing:
- `width` / `height`
- `margin-*` / `padding-*`
- `font-size`
- `letter-spacing`

**Effort**: 1-2h each

### Hard Properties ⭐⭐⭐

Complex syntax:
- `font-family` (quoted strings, comma lists)
- `grid-template-columns` (repeat, minmax, fr units)

**Effort**: 2-4h each

### Contribution Process

```bash
# 1. Pick a property
# 2. Create parser in src/parse/MODULE/property.ts
# 3. Create generator in src/generate/MODULE/property.ts
# 4. Write tests (both .test.ts and .generate.test.ts)
# 5. Register in src/universal.ts
# 6. Update this document (check off property)
# 7. Submit PR
```

---

## Appendix: Full Property List (131 MDN Properties)

### Animation (8) - ✅ 100% Coverage

- [x] animation-delay
- [x] animation-direction
- [x] animation-duration
- [x] animation-fill-mode
- [x] animation-iteration-count
- [x] animation-name
- [x] animation-play-state
- [x] animation-timing-function

### Background (8) - 🟡 75% Coverage

- [x] background-attachment
- [x] background-clip
- [x] background-color
- [x] background-image
- [x] background-origin
- [x] background-position
- [x] background-repeat
- [x] background-size

### Border (15) - ✅ 100% Coverage

- [x] border-top-color
- [x] border-right-color
- [x] border-bottom-color
- [x] border-left-color
- [x] border-top-style
- [x] border-right-style
- [x] border-bottom-style
- [x] border-left-style
- [x] border-top-width
- [x] border-right-width
- [x] border-bottom-width
- [x] border-left-width
- [x] border-top-left-radius
- [x] border-top-right-radius
- [x] border-bottom-left-radius
- [x] border-bottom-right-radius

### Box Model (12) - ❌ 0% Coverage - PHASE 1

- [ ] width
- [ ] height
- [ ] max-width
- [ ] max-height
- [ ] min-width
- [ ] min-height
- [ ] margin-top
- [ ] margin-right
- [ ] margin-bottom
- [ ] margin-left
- [ ] padding-top
- [ ] padding-right
- [ ] padding-bottom
- [ ] padding-left

### Display & Layout (13) - ✅ 108% Coverage (we have extras!)

- [x] display
- [x] position
- [x] top
- [x] right
- [x] bottom
- [x] left
- [x] z-index
- [ ] float
- [ ] clear
- [ ] overflow (we have overflow-x, overflow-y)
- [x] overflow-x
- [x] overflow-y
- [x] visibility

### Flexbox (11) - ❌ 0% Coverage - PHASE 2

- [ ] flex-grow
- [ ] flex-shrink
- [ ] flex-basis
- [ ] flex-direction
- [ ] flex-wrap
- [ ] justify-content
- [ ] align-items
- [ ] align-content
- [ ] align-self
- [ ] order
- [ ] ~~flex~~ (SHORTHAND - will reject)

### Grid (8) - ❌ 0% Coverage - PHASE 4

- [ ] grid-template-columns
- [ ] grid-template-rows
- [ ] grid-column-start
- [ ] grid-column-end
- [ ] grid-row-start
- [ ] grid-row-end
- [ ] grid-column-gap
- [ ] grid-row-gap

### Outline (4) - ✅ 100% Coverage

- [x] outline-color
- [x] outline-offset
- [x] outline-style
- [x] outline-width

### Text (14) - 🔴 36% Coverage - PHASE 3

- [x] color
- [ ] font-family
- [ ] font-size
- [ ] font-weight
- [ ] font-style
- [ ] line-height
- [ ] text-align
- [x] text-decoration-color
- [x] text-decoration-line
- [x] text-decoration-style
- [x] text-decoration-thickness
- [ ] text-transform
- [ ] letter-spacing
- [ ] word-spacing
- [ ] white-space

### Transform (2) - ✅ 100% Coverage

- [x] transform
- [x] transform-origin

### Transition (4) - ✅ 100% Coverage

- [x] transition-delay
- [x] transition-duration
- [x] transition-property
- [x] transition-timing-function

### Visual Effects (7) - ✅ 100% Coverage

- [x] opacity
- [x] clip-path
- [x] filter
- [x] box-shadow
- [x] text-shadow
- [x] cursor
- [x] visibility

### Other Common Properties

- [ ] aspect-ratio
- [ ] gap
- [ ] place-items
- [ ] place-content
- [ ] object-fit
- [ ] object-position

---

**Total**: 51/131 current → 131/131 target  
**Timeline**: v1.0 (48%) → v1.1 (63%) → v1.2 (69%) → v2.0 (75%+)  
**Effort**: 37+ hours over 4 releases
