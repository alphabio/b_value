# v1.0 Roadmap - Usage-Based Priority

**Target**: 90% coverage of **CRITICAL + COMMON** properties (Tier 1 + Tier 2)  
**Date**: 2025-10-22  
**Source**: HTTP Archive usage data (8M+ websites)

---

## Goal Definition

**v1.0 Success Criteria**:
- ✅ 100% of Tier 1 (CRITICAL) - Used by 90%+ of websites
- ✅ 80%+ of Tier 2 (COMMON) - Used by 60-90% of websites
- ✅ All tests passing, production ready
- ✅ Can build real-world websites

**NOT INCLUDED in v1.0**:
- ❌ Grid layout (Tier 3) - Move to v1.1
- ❌ Specialized properties (Tier 4) - Move to v2.0
- ❌ Experimental features (Tier 5) - Future

---

## Current Status

| Tier | Total | Done | Missing | Coverage | Target |
|------|-------|------|---------|----------|--------|
| 🔥 Tier 1 (CRITICAL) | 32 | 16 | **16** | 50% | **100%** |
| ⭐ Tier 2 (COMMON) | 61 | 50 | 11 | 82% | **80%** ✅ |
| **Combined T1+T2** | **93** | **66** | **27** | **71%** | **90%** |

**v1.0 Target**: 84 properties (90% of Tier 1+2)  
**Current**: 73 properties  
**Gap**: **11 properties**

---

## Phase Plan to v1.0

### Phase 1: Complete Tier 1 CRITICAL (16 properties)

**Priority**: 🔥 HIGHEST - These are non-negotiable for v1.0

**Missing Tier 1 properties**:

1. **Layout Core** (8 properties):
   - [ ] `width` - Element sizing
   - [ ] `height` - Element sizing
   - [ ] `display` - Layout type
   - [ ] `position` - Positioning scheme
   - [ ] `top` - Position offset
   - [ ] `left` - Position offset
   - [ ] `right` - Position offset
   - [ ] `bottom` - Position offset

2. **Typography Core** (5 properties):
   - [ ] `font-size` - Text size
   - [ ] `font-family` - Font selection
   - [ ] `font-weight` - Text boldness
   - [ ] `line-height` - Line spacing
   - [ ] `text-align` - Text alignment

3. **Visual Core** (3 properties):
   - [ ] `color` - Text color
   - [ ] `opacity` - Transparency
   - [ ] `box-sizing` - Box model behavior

**Effort**: ~12 hours  
**Result**: 73 → 89 properties (96% of Tier 1+2 ✅)

---

### Phase 2: Critical Tier 2 Gaps (5 properties - Optional for v1.0)

**Priority**: ⭐ HIGH - Nice to have, but v1.0 can ship without these

Pick the most impactful from missing Tier 2:

1. [ ] `visibility` - Show/hide elements
2. [ ] `cursor` - Mouse pointer style  
3. [ ] `transform` - CSS transforms
4. [ ] `transform-origin` - Transform pivot point
5. [ ] `white-space` - Text wrapping

**Effort**: ~5 hours  
**Result**: 89 → 94 properties (101% of target ✅ SHIP!)

---

## Implementation Details

### Phase 1.1: Layout Core (8 properties, ~4 hours)

**Properties**: `width`, `height`, `display`, `position`, `top`, `left`, `right`, `bottom`

**Implementation**:

```typescript
// width, height - Reuse existing Length/Percentage types
type Width = {
  kind: "width";
  value: Length | Percentage | Keyword<"auto" | "max-content" | "min-content">;
};

// display - Keyword-based
type Display = {
  kind: "display";
  value: "block" | "inline" | "inline-block" | "flex" | "grid" | "none" | ...;
};

// position - Keyword-based
type Position = {
  kind: "position";
  value: "static" | "relative" | "absolute" | "fixed" | "sticky";
};

// top, left, right, bottom - Length/Percentage/auto
type Top = {
  kind: "top";
  value: Length | Percentage | Keyword<"auto">;
};
```

**Modules to create**:
- `src/parse/layout/width.ts`
- `src/parse/layout/height.ts`
- `src/parse/layout/display.ts`
- `src/parse/layout/position.ts` (already exists? check)
- `src/parse/position/top.ts` (already exists? check)
- `src/parse/position/left.ts`
- `src/parse/position/right.ts`
- `src/parse/position/bottom.ts` (already exists? check)

**Tests**: 20+ tests total

**Register in**: `src/universal.ts`

---

### Phase 1.2: Typography Core (5 properties, ~6 hours)

**Properties**: `font-size`, `font-family`, `font-weight`, `line-height`, `text-align`

**Implementation**:

```typescript
// font-size - Length/Percentage/Keywords
type FontSize = {
  kind: "font-size";
  value: Length | Percentage | Keyword<
    "xx-small" | "x-small" | "small" | "medium" | "large" | "x-large" | "xx-large" |
    "larger" | "smaller"
  >;
};

// font-family - Complex! Comma-separated list
type FontFamily = {
  kind: "font-family";
  families: Array<{
    type: "name" | "generic";
    value: string;
  }>;
};

// font-weight - Number or keywords
type FontWeight = {
  kind: "font-weight";
  value: number | Keyword<"normal" | "bold" | "lighter" | "bolder">;
};

// line-height - Number, Length, Percentage, or "normal"
type LineHeight = {
  kind: "line-height";
  value: number | Length | Percentage | Keyword<"normal">;
};

// text-align - Keywords
type TextAlign = {
  kind: "text-align";
  value: "left" | "right" | "center" | "justify" | "start" | "end";
};
```

**Modules to create**:
- `src/parse/text/font-size.ts`
- `src/parse/text/font-family.ts` (⚠️ Complex - quoted strings!)
- `src/parse/text/font-weight.ts`
- `src/parse/text/line-height.ts`
- `src/parse/text/text-align.ts`

**Challenges**:
- `font-family`: Must handle quoted strings: `"Times New Roman", Arial, sans-serif`
- `line-height`: Unitless numbers are valid: `line-height: 1.5`

**Tests**: 25+ tests (font-family needs extensive testing)

---

### Phase 1.3: Visual Core (3 properties, ~2 hours)

**Properties**: `color`, `opacity`, `box-sizing`

**Implementation**:

```typescript
// color - Reuse existing Color type!
type Color = {
  kind: "color";
  value: RGBColor | HSLColor | NamedColor | HexColor;
};

// opacity - Number 0-1
type Opacity = {
  kind: "opacity";
  value: number; // 0.0 to 1.0
};

// box-sizing - Keywords
type BoxSizing = {
  kind: "box-sizing";
  value: "content-box" | "border-box";
};
```

**Modules to create**:
- `src/parse/color/color.ts` (might already exist - check!)
- `src/parse/visual/opacity.ts`
- `src/parse/layout/box-sizing.ts`

**Tests**: 15+ tests

---

## Timeline Estimate

| Phase | Properties | Hours | Cumulative | Coverage |
|-------|-----------|-------|------------|----------|
| Current | 73 | - | - | 71% T1+2 |
| Phase 1.1 | +8 | 4h | 4h | 81 props |
| Phase 1.2 | +5 | 6h | 10h | 86 props |
| Phase 1.3 | +3 | 2h | 12h | **89 props** ✅ |
| Phase 2 (opt) | +5 | 5h | 17h | **94 props** 🎉 |

**Minimum for v1.0**: 12 hours (Phase 1 only → 89 properties)  
**Recommended**: 17 hours (Phase 1+2 → 94 properties)

---

## v1.0 Release Checklist

### Must Have (Phase 1)
- [ ] All 16 Tier 1 properties implemented
- [ ] 89+ total properties
- [ ] All tests passing (2800+ tests)
- [ ] Zero type errors
- [ ] Documentation updated
- [ ] Examples demonstrate real-world usage

### Nice to Have (Phase 2)
- [ ] 5 additional Tier 2 properties
- [ ] 94+ total properties
- [ ] Coverage report generated
- [ ] Performance benchmarks run

### Release Process
- [ ] Update CHANGELOG.md
- [ ] Update package.json version to 1.0.0
- [ ] Tag release in git
- [ ] Publish to npm
- [ ] Announce release

---

## Post-v1.0 Roadmap

### v1.1 - Modern Layouts (3-4 weeks)
**Target**: Add Tier 3 (MODERN) properties
- Grid layout (14 properties)
- Advanced visual effects (8 properties)
- **Result**: 94 → 115+ properties (25% total coverage)

### v1.2 - Specialized Features (2-3 months)
**Target**: Add Tier 4 (SPECIALIZED) properties
- Lists & Tables (13 properties)
- Multi-column (7 properties)
- Scroll behavior (6 properties)
- **Result**: 115 → 140+ properties (31% total coverage)

### v2.0 - Comprehensive Coverage (6-12 months)
**Target**: 200+ properties (45% coverage)
- Complete Tier 5 (EXPERIMENTAL)
- High-value uncategorized properties
- Industry-leading coverage

---

## Priority Matrix

| Property | Tier | Usage % | Complexity | Effort | v1.0? |
|----------|------|---------|------------|--------|-------|
| width | 1 | 95% | Low | 30m | ✅ |
| height | 1 | 95% | Low | 30m | ✅ |
| display | 1 | 98% | Low | 1h | ✅ |
| position | 1 | 92% | Low | 1h | ✅ |
| font-size | 1 | 98% | Medium | 1.5h | ✅ |
| font-family | 1 | 98% | **High** | 3h | ✅ |
| color | 1 | 99% | Low | 30m | ✅ |
| opacity | 1 | 88% | Low | 30m | ✅ |
| box-sizing | 1 | 92% | Low | 30m | ✅ |
| transform | 2 | 75% | High | 2h | 🤔 |
| grid-* | 3 | 45% | **Very High** | 12h+ | ❌ v1.1 |

---

**Last Updated**: 2025-10-22  
**Status**: Phase 1 planning complete, ready to implement  
**Next Action**: Begin Phase 1.1 (Layout Core)
