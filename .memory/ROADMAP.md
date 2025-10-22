# Property Implementation Roadmap

**Last Updated**: 2025-10-22T05:10:00Z  
**Implemented**: 94 properties  
**Total MDM Longhands**: 446 properties  
**Coverage**: 21.1%

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

### Background (9/9) ✅ COMPLETE

- [x] background-attachment
- [x] background-clip
- [x] background-color
- [x] background-image (includes gradients)
- [x] background-origin
- [x] background-position
- [x] background-repeat
- [x] background-size

### Border (17/20) 🔄 IN PROGRESS

**Implemented**:
- [x] border-bottom-color
- [x] border-bottom-left-radius
- [x] border-bottom-right-radius
- [x] border-bottom-style
- [x] border-bottom-width
- [x] border-left-color
- [x] border-left-style
- [x] border-left-width
- [x] border-radius
- [x] border-right-color
- [x] border-right-style
- [x] border-right-width
- [x] border-top-color
- [x] border-top-left-radius
- [x] border-top-right-radius
- [x] border-top-style
- [x] border-top-width

**TODO**:
- [ ] border-image-* (5 properties) - 📦

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

### Color (8/8) ✅ COMPLETE

- [x] color 🔥
- [x] background-color 🔥
- [x] border-*-color (4 sides) 🔥
- [x] outline-color ⭐
- [x] text-decoration-color ⭐

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

### Outline (4/4) ✅ COMPLETE

- [x] outline-color
- [x] outline-offset
- [x] outline-style
- [x] outline-width

### Shadow (2/2) ✅ COMPLETE

- [x] box-shadow 🔥
- [x] text-shadow ⭐

### Text & Typography (10/30) 🔄 IN PROGRESS

**Implemented**:
- [x] color 🔥
- [x] font-family 🔥
- [x] font-size 🔥
- [x] font-weight 🔥
- [x] line-height 🔥
- [x] text-align 🔥
- [x] text-decoration-color ⭐
- [x] text-decoration-line ⭐
- [x] text-decoration-style ⭐
- [x] text-decoration-thickness ⭐

**TODO - High Priority**:
- [ ] font-style 🔥 (italic, oblique)
- [ ] letter-spacing ⭐
- [ ] text-transform ⭐ (uppercase, lowercase)
- [ ] text-indent ⭐
- [ ] word-spacing ⭐
- [ ] white-space ⭐

**TODO - Standard**:
- [ ] font-variant 📦
- [ ] text-overflow 📦
- [ ] word-break 📦
- [ ] ... (14 more text properties)

### Transform (1/10) 🔄 IN PROGRESS

**Implemented**:
- [x] transform ⭐

**TODO**:
- [ ] transform-origin ⭐
- [ ] transform-style 📦
- [ ] perspective 📦
- [ ] perspective-origin 📦
- [ ] ... (6 more transform properties)

### Transition (4/4) ✅ COMPLETE

- [x] transition-delay
- [x] transition-duration
- [x] transition-property
- [x] transition-timing-function

### Visual Effects (3/15) 🔄 IN PROGRESS

**Implemented**:
- [x] clip-path ⭐
- [x] filter ⭐
- [x] cursor ⭐

**TODO**:
- [ ] backdrop-filter 📦
- [ ] mask-* 🔬 (8 properties)
- [ ] mix-blend-mode 📦
- [ ] ... (4 more visual properties)

---

## Summary by Status

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ Complete Modules | 7 modules | Animation, Background, Box Model, Color, Flexbox, Outline, Shadow, Transition |
| 🔄 In Progress | 4 modules | Border, Text, Transform, Visual |
| 🔬 Not Started | 10+ modules | Grid, Table, Lists, Columns, etc. |

---

## Next Priorities

### Phase 1: Complete Tier 1 CRITICAL (10-15 properties)
**Goal**: 100% of most-used properties

- [ ] font-style (italic, oblique)
- [ ] text-transform (uppercase, lowercase, capitalize)
- [ ] letter-spacing
- [ ] vertical-align
- [ ] pointer-events
- [ ] user-select
- [ ] content (::before/::after)
- [ ] overflow (unified property)
- [ ] ... (determine from usage data)

**Effort**: 8-12 hours  
**Result**: ~104-109 properties → Core web development complete

### Phase 2: Complete Tier 2 COMMON (20-30 properties)
**Goal**: 90%+ coverage of common use cases

Focus on completing:
- Text/Typography module (20 more properties)
- Transform module (9 more properties)
- Visual effects (10 more properties)

**Effort**: 20-30 hours  
**Result**: ~130-140 properties → Professional web development complete

### Phase 3: Grid Layout (25 properties)
**Goal**: Modern layout support

- Grid container properties (10)
- Grid item properties (10)
- Grid placement (5)

**Effort**: 40-50 hours (high complexity)  
**Result**: ~155-165 properties → Modern CSS complete

---

## Coverage Goals

- **v0.1.0** (Current): 94 properties (21% coverage) ✅
- **v1.0.0** (Target): 110 properties (25% coverage) - Tier 1 complete
- **v1.5.0**: 140 properties (31% coverage) - Tier 2 complete
- **v2.0.0**: 170 properties (38% coverage) - Grid + common modules
- **v3.0.0**: 250 properties (56% coverage) - Comprehensive
- **v4.0.0**: 446 properties (100% coverage) - Full spec

---

## Notes

- Property count updated automatically by `.memory/scripts/count-properties.sh`
- Priority tiers based on HTTP Archive usage data (8M+ websites)
- Focus on longhand properties only (shorthands in separate `b_short` project)
- Update this file when completing modules or adjusting priorities
