# Session 9: Filter Functions Implementation

## Goal
Implement CSS filter function parsers and generators following the color implementation pattern.

## Filter Functions to Support

### Core Filters (11 functions)
1. `blur()` - blur radius (length)
2. `brightness()` - percentage/number
3. `contrast()` - percentage/number
4. `grayscale()` - percentage/number
5. `hue-rotate()` - angle
6. `invert()` - percentage/number
7. `opacity()` - percentage/number
8. `saturate()` - percentage/number
9. `sepia()` - percentage/number
10. `drop-shadow()` - complex (offsets, blur, color)
11. `url()` - reference to SVG filter

### Syntax Patterns
- Simple numeric: `brightness(1.5)`, `opacity(0.5)`
- Percentage: `brightness(150%)`, `opacity(50%)`
- Angle: `hue-rotate(90deg)`, `hue-rotate(0.25turn)`
- Complex: `drop-shadow(2px 2px 4px rgba(0,0,0,0.5))`
- Reference: `url(#filter-id)`

## Implementation Plan

### Phase 1: Type Definitions
Create `src/core/types/filter.ts` with all filter types

### Phase 2: Simple Numeric Filters (7 filters)
- brightness, contrast, grayscale, invert, opacity, saturate, sepia
- All follow same pattern: number or percentage
- Parse & generate together

### Phase 3: Specialized Filters
- blur (length value)
- hue-rotate (angle value)
- url (string reference)

### Phase 4: Complex Filter
- drop-shadow (offsets, blur, spread, color)

### Phase 5: Master Parser/Generator
- parse/filter/index.ts - auto-detect by function name
- generate/filter/index.ts - dispatch by kind

### Phase 6: Integration Tests
- Round-trip tests for all filters
- Edge cases and validation

## Success Criteria
- All 11 filters parse/generate correctly
- Round-trip accuracy: parse → generate → parse = identical
- ~80-100 new tests
- All quality gates pass (just check && just test)

## Estimated Duration
~1-2 hours
