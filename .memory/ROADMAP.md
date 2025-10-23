# Property Implementation Roadmap

**Last Updated**: 2025-10-22T08:30:00Z
**Implemented**: 109 properties
**Total MDM Longhands**: 446 properties
**Coverage**: 24.4%

> Property count verified by `.memory/scripts/count-properties.sh`

---

## Overview

This roadmap organizes CSS properties by module. Properties marked [x] are implemented with full parse + generate + tests.

**Priority System**:
- 🔥 **CRITICAL** - Used by 90%+ of websites (Tier 1)
- ⭐ **COMMON** - Used by 60-90% of websites (Tier 2)
- 📦 **STANDARD** - Regular usage (Tier 3)
- 🔬 **SPECIALIZED** - Niche usage (Tier 4+)

---

## Modules

### Animation (8/8) ✅ COMPLETE

- [x] animation-delay
- [x] animation-direction
- [x] animation-duration
- [x] animation-fill-mode
- [x] animation-iteration-count
- [x] animation-name
- [x] animation-play-state
- [x] animation-timing-function

**Note**: 9 files in module (1 dispatcher + 8 properties)

### Background (9/9) ✅ COMPLETE

- [x] background-attachment
- [x] background-clip
- [x] background-color
- [x] background-image (includes gradients)
- [x] background-origin
- [x] background-position-x ⭐
- [x] background-position-y ⭐
- [x] background-repeat
- [x] background-size

**Note**: background-position is handled as a compound value (x/y together)

### Border (17/25) 🔄 IN PROGRESS

**Implemented** (17):
- [x] border-top-width 🔥
- [x] border-right-width 🔥
- [x] border-bottom-width 🔥
- [x] border-left-width 🔥
- [x] border-top-color 🔥
- [x] border-right-color 🔥
- [x] border-bottom-color 🔥
- [x] border-left-color 🔥
- [x] border-top-style 🔥
- [x] border-right-style 🔥
- [x] border-bottom-style 🔥
- [x] border-left-style 🔥
- [x] border-top-left-radius ⭐
- [x] border-top-right-radius ⭐
- [x] border-bottom-right-radius ⭐
- [x] border-bottom-left-radius ⭐
- [x] border-collapse 📦

**TODO** (8):
- [ ] border-spacing 📦 (table borders)
- [ ] border-image-source 📦
- [ ] border-image-slice 📦
- [ ] border-image-width 📦
- [ ] border-image-outset 📦
- [ ] border-image-repeat 📦
- [ ] border-start-*/ border-end-* (logical properties) 🔬
- [ ] border-block-*/ border-inline-* (logical properties) 🔬

**Note**: border-radius is a shorthand (handled separately)

### Box Model (25/25) ✅ COMPLETE

**Layout**:
- [x] width 🔥
- [x] height 🔥
- [x] min-width 🔥
- [x] max-width 🔥
- [x] min-height 🔥
- [x] max-height 🔥

**Spacing**:
- [x] margin-top 🔥
- [x] margin-right 🔥
- [x] margin-bottom 🔥
- [x] margin-left 🔥
- [x] padding-top 🔥
- [x] padding-right 🔥
- [x] padding-bottom 🔥
- [x] padding-left 🔥

**Position**:
- [x] position 🔥
- [x] top 🔥
- [x] left 🔥
- [x] right 🔥
- [x] bottom 🔥
- [x] z-index 🔥

**Display**:
- [x] display 🔥
- [x] visibility ⭐
- [x] opacity 🔥
- [x] overflow-x ⭐
- [x] overflow-y ⭐
- [x] box-sizing 🔥

### Clip-Path (10/10) ✅ COMPLETE

All basic shapes + geometry-box:
- [x] circle() ⭐
- [x] ellipse() ⭐
- [x] inset() ⭐
- [x] polygon() ⭐
- [x] path() 📦
- [x] rect() 📦
- [x] xywh() 📦
- [x] url() 📦
- [x] none ⭐
- [x] geometry-box (border-box, etc.) 📦

**Note**: 11 files in module (1 dispatcher + 10 shapes/values)

### Color (Core Value Type) ✅ COMPLETE

All color formats supported:
- [x] Named colors (140 keywords)
- [x] Hex (#rgb, #rrggbb, #rrggbbaa)
- [x] rgb() / rgba() 🔥
- [x] hsl() / hsla() ⭐
- [x] hwb() 📦
- [x] lab() / lch() 📦
- [x] oklab() / oklch() 📦
- [x] System colors 📦
- [x] currentColor / transparent 🔥

**Note**: Color is a value type, not a property. Used by: color, background-color, border-*-color, outline-color, text-decoration-color, etc.

### Flexbox (11/11) ✅ COMPLETE

- [x] align-content ⭐
- [x] align-items 🔥
- [x] align-self ⭐
- [x] flex-basis ⭐
- [x] flex-direction 🔥
- [x] flex-grow ⭐
- [x] flex-shrink ⭐
- [x] flex-wrap ⭐
- [x] gap ⭐
- [x] justify-content 🔥
- [x] order ⭐

### Grid (0/25) 🔬 NOT STARTED

**Priority**: Tier 3 (40% usage, high complexity)

**TODO**:
- [ ] grid-template-columns 📦
- [ ] grid-template-rows 📦
- [ ] grid-column / grid-row 📦
- [ ] grid-gap 📦
- [ ] ... (21 more grid properties)

### Filter (12/12) ✅ COMPLETE

All filter functions:
- [x] blur() ⭐
- [x] brightness() ⭐
- [x] contrast() ⭐
- [x] drop-shadow() ⭐
- [x] grayscale() 📦
- [x] hue-rotate() 📦
- [x] invert() 📦
- [x] opacity() ⭐
- [x] saturate() 📦
- [x] sepia() 📦
- [x] url() 📦
- [x] none ⭐

### Gradient (Core Value Type) ✅ COMPLETE

All gradient types:
- [x] linear-gradient() 🔥
- [x] radial-gradient() ⭐
- [x] conic-gradient() 📦
- [x] repeating-linear-gradient() 📦
- [x] repeating-radial-gradient() 📦

**Note**: Gradients are value types used in background-image, border-image, etc.

### Outline (4/4) ✅ COMPLETE

- [x] outline-color ⭐
- [x] outline-offset ⭐
- [x] outline-style ⭐
- [x] outline-width ⭐

### Shadow (2/2) ✅ COMPLETE

- [x] box-shadow 🔥
- [x] text-shadow ⭐

### Text & Typography (17/35) 🔄 IN PROGRESS

**Implemented** (17):
- [x] color 🔥
- [x] font-family 🔥
- [x] font-size 🔥
- [x] font-style 🔥 ← NEW (2025-10-22)
- [x] font-weight 🔥
- [x] letter-spacing 🔥 ← NEW (2025-10-22)
- [x] line-height 🔥
- [x] overflow-wrap 🔥 ← NEW (2025-10-22)
- [x] text-align 🔥
- [x] text-decoration-color ⭐
- [x] text-decoration-line ⭐
- [x] text-decoration-style ⭐
- [x] text-decoration-thickness ⭐
- [x] text-shadow ⭐
- [x] text-transform 🔥 ← NEW (2025-10-22)
- [x] vertical-align 🔥 ← NEW (2025-10-22)
- [x] word-break 🔥 ← NEW (2025-10-22)

**TODO - Tier 2 COMMON** (10):
- [ ] text-indent ⭐
- [ ] word-spacing ⭐
- [ ] white-space ⭐
- [ ] text-overflow ⭐
- [ ] direction ⭐
- [ ] unicode-bidi ⭐
- [ ] writing-mode ⭐
- [ ] text-orientation ⭐
- [ ] font-variant ⭐
- [ ] text-rendering ⭐

**TODO - Tier 3 STANDARD** (8+):
- [ ] hyphens 📦
- [ ] text-align-last 📦
- [ ] text-decoration-skip 📦
- [ ] text-underline-position 📦
- [ ] text-underline-offset 📦
- [ ] font-feature-settings 📦
- [ ] font-variation-settings 📦
- [ ] ... (more OpenType properties)

### Transform (2/12) 🔄 IN PROGRESS

**Implemented** (2):
- [x] transform ⭐ (all functions: translate, rotate, scale, skew, matrix)
- [x] transform-origin ⭐

**TODO** (10):
- [ ] perspective ⭐
- [ ] perspective-origin ⭐
- [ ] transform-style 📦
- [ ] transform-box 📦
- [ ] backface-visibility 📦
- [ ] rotate 📦 (individual transform properties)
- [ ] scale 📦
- [ ] translate 📦
- [ ] skew 🔬
- [ ] offset-* 🔬 (motion path properties, 8 total)

### Transition (4/4) ✅ COMPLETE

- [x] transition-delay
- [x] transition-duration
- [x] transition-property
- [x] transition-timing-function

### Visual Effects & Interaction (3/20) 🔄 IN PROGRESS

**Implemented** (3):
- [x] clip-path ⭐ (all shapes)
- [x] filter ⭐ (all functions)
- [x] cursor ⭐

**TODO - High Priority** (5):
- [ ] backdrop-filter ⭐ (same as filter, applies to backdrop)
- [ ] mix-blend-mode ⭐
- [ ] isolation 📦
- [ ] pointer-events 🔥
- [ ] user-select 🔥

**TODO - Standard** (12):
- [ ] mask-image 📦
- [ ] mask-mode 📦
- [ ] mask-position 📦
- [ ] mask-size 📦
- [ ] mask-repeat 📦
- [ ] mask-origin 📦
- [ ] mask-clip 📦
- [ ] mask-composite 📦
- [ ] object-fit 📦
- [ ] object-position 📦
- [ ] image-rendering 📦
- [ ] will-change 📦

---

## Summary by Status

| Status | Count | Notes |
|--------|-------|-------|
| ✅ **Complete** | 10 modules | Animation, Clip-Path, Color (type), Filter, Flexbox, Gradient (type), Layout/Box Model, Outline, Shadow, Transition |
| 🔄 **In Progress** | 5 modules | Background (7/8), Border (17/25), Text/Typography (11/35), Transform (2/12), Visual Effects (3/20) |
| 🔬 **Not Started** | 15+ modules | Grid (0/25), Table (0/10), Lists (0/8), Columns (0/10), Counters (0/5), Scroll (0/8), Contain (0/6), etc. |

**Completion Rate**: 94/446 properties (21.1%)

---

## Next Priorities

### Phase 1: Complete Tier 1 CRITICAL (16 properties)
**Goal**: 100% of most-used properties (90%+ usage)

**Typography** (6):
- [ ] font-style 🔥
- [ ] letter-spacing 🔥
- [ ] text-transform 🔥
- [ ] vertical-align 🔥
- [ ] word-break 🔥
- [ ] overflow-wrap 🔥

**Interaction** (3):
- [ ] pointer-events 🔥
- [ ] user-select 🔥
- [ ] content 🔥 (::before/::after)

**Layout** (3):
- [ ] overflow 🔥 (unified, maps to overflow-x/y)
- [ ] float 🔥
- [ ] clear 🔥

**Visual** (2):
- [ ] background-blend-mode 🔥
- [ ] mix-blend-mode 🔥

**Background** (2):
- [ ] background-position-x ⭐
- [ ] background-position-y ⭐

**Effort**: 12-16 hours
**Target**: v1.0.0 with 110 properties (25% coverage)

### Phase 2: Complete Tier 2 COMMON (30-40 properties)
**Goal**: 60-90% usage properties

**Typography** (10):
- text-indent, word-spacing, white-space, text-overflow
- direction, unicode-bidi, writing-mode, text-orientation
- font-variant, text-rendering

**Transform** (4):
- perspective, perspective-origin, transform-style, backface-visibility

**Visual Effects** (5):
- backdrop-filter, isolation, object-fit, object-position, image-rendering

**Layout** (8):
- aspect-ratio, resize, scroll-behavior, scroll-margin-*
- contain, content-visibility

**Lists** (5):
- list-style-type, list-style-position, list-style-image, marker-offset

**Effort**: 25-35 hours
**Target**: v1.5.0 with 140-150 properties (32% coverage)

### Phase 3: Grid Layout (25 properties)
**Goal**: Modern layout system (40% usage, high complexity)

**Container** (11):
- grid-template-columns, grid-template-rows, grid-template-areas
- grid-auto-columns, grid-auto-rows, grid-auto-flow
- column-gap, row-gap (also used by flexbox)
- justify-items, align-items

**Item** (8):
- grid-column-start, grid-column-end
- grid-row-start, grid-row-end
- justify-self, align-self
- grid-area

**Sizing** (6):
- minmax(), fit-content(), repeat() functions
- fr unit support
- auto-fill, auto-fit keywords

**Effort**: 40-60 hours (requires new value parsers)
**Target**: v2.0.0 with 175 properties (39% coverage)

---

## Coverage Goals & Timeline

| Version | Properties | Coverage | Milestone | Effort |
|---------|-----------|----------|-----------|--------|
| **v0.1.0** | 94 | 21% | ✅ Initial release | Done |
| **v0.2.0** | 100 | 22% | 🎉 **100 property milestone** | ✅ Done |
| **v1.0.0** | 110 | 25% | 🎯 Tier 1 CRITICAL complete | 6-8h remaining |
| **v1.5.0** | 145 | 33% | Tier 2 COMMON complete | +30h |
| **v2.0.0** | 175 | 39% | Grid Layout support | +50h |
| **v2.5.0** | 225 | 50% | Halfway milestone | +60h |
| **v3.0.0** | 300 | 67% | Comprehensive coverage | +100h |
| **v4.0.0** | 446 | 100% | Complete MDM spec | +200h+ |

---

## Notes

- Property count updated automatically by `.memory/scripts/count-properties.sh`
- Priority tiers based on HTTP Archive usage data (8M+ websites)
- Focus on longhand properties only (shorthands in separate `b_short` project)
- Update this file when completing modules or adjusting priorities
