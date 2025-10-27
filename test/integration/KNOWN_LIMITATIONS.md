# Known Limitations & Missing Functionality

This document tracks incomplete implementations, missing functionality, and known limitations discovered through round-trip testing.

**Purpose**: When round-trip tests reveal missing features or bugs, document them here for future implementation.

---

## Animation Properties

### animation-delay negative values
**Status**: ✅ Fixed  
**Issue**: Time schema didn't allow negative values, but animation-delay should  
**Root Cause**: `timeSchema` used `.nonnegative()` but animation-delay must support negative values per CSS spec

**Fixed In**: 2025-10-27  
**Commit**: (current session)  
**Files Modified**:
- `src/core/types/time.ts` - Created `delayTimeSchema` that allows negative values
- `src/core/types/animation.ts` - Updated animationDelaySchema to use delayTimeSchema
- `scripts/generate-test-generator/configs/delay.ts` - Updated to mark negative values as valid
- `test/integration/roundtrip/animation.test.ts` - Un-skipped negative delay test

**Tests**:
- ✅ Integration test passes: `test/integration/roundtrip/animation.test.ts` (negative delay: -500ms)
- ✅ Generate tests pass: `src/generate/animation/delay.test.ts` (negative delay cases)

**Reference**: https://www.w3.org/TR/css-animations-1/#animation-delay

---

## Background Properties

### background-size
**Status**: ⚠️ Incomplete  
**Issue**: Parser only supports single-value syntax  
**Current Support**: `100px`, `cover`, `contain`, `auto`  
**Missing**: Two-value syntax `100px 200px`

**Impact**: Cannot parse backgrounds with explicit width and height  
**Example**:
```css
/* ✅ Supported */
background-size: cover;
background-size: 100px;

/* ❌ Not supported */
background-size: 100px 200px;
background-size: 50% auto;
```

**Files**:
- Parser: `src/parse/background/size.ts` (line 48-78)
- Generator: `src/generate/background/size.ts`

**Fix Required**:
1. Update parser to handle two-value syntax
2. Update IR type to support optional second dimension
3. Update generator to output two values when present
4. Add tests for two-value cases

**Discovered**: 2025-10-27 (Round-trip testing session)  
**Priority**: Medium (common use case)

---

## Clip-Path Properties

### inset() generator
**Status**: ✅ Fixed  
**Issue**: Generator had type mismatch causing `[object Object]` output  
**Root Cause**: `generateTRBL()` returned `GenerateResult` instead of `string`

**Fixed In**: 2025-10-27  
**Commit**: (current session)  
**Files Modified**:
- `src/generate/clip-path/inset.ts` (lines 58-87)

**Tests Added**:
- ✅ Created `src/generate/clip-path/inset.test.ts` (10 tests)
- ✅ Round-trip test passes: `test/integration/roundtrip/clip-path.test.ts`

---

## Typography Properties

### word-spacing
**Status**: ❌ Not Implemented  
**Issue**: Property not implemented in parser or generator  
**Current Support**: None  
**Missing**: All word-spacing functionality

**Impact**: Cannot parse or generate word-spacing values  
**Example**:
```css
/* ❌ Not supported */
word-spacing: 4px;
word-spacing: 0.5em;
word-spacing: normal;
```

**Files**:
- Parser: `src/parse/typography/word-spacing.ts` (does not exist)
- Generator: `src/generate/typography/word-spacing.ts` (does not exist)

**Fix Required**:
1. Create parser for word-spacing (similar to letter-spacing)
2. Create generator for word-spacing
3. Add IR type definition
4. Add unit tests
5. Add round-trip tests

**Discovered**: 2025-10-27 (Round-trip testing session)  
**Priority**: Low (less common property)

---

## Document Purpose & Guidelines

### When to Add Entries
Add an entry when you discover:
1. **Missing functionality**: Feature exists in CSS spec but not implemented
2. **Incomplete implementations**: Feature partially works but missing cases
3. **Known bugs**: Reproducible issues that need fixing
4. **Intentional limitations**: Design decisions that limit functionality

### Entry Format
```markdown
### property-name or feature-name
**Status**: [⚠️ Incomplete | ❌ Not Implemented | ✅ Fixed | 🚧 In Progress]
**Issue**: Brief description
**Current Support**: What works
**Missing**: What doesn't work

**Impact**: User impact description
**Example**: Code examples showing supported vs unsupported cases

**Files**: Relevant source files
**Fix Required**: Steps to implement
**Discovered**: Date discovered
**Priority**: [High | Medium | Low]
```

### When to Move to Archive
Move entries to `KNOWN_LIMITATIONS_ARCHIVE.md` when:
- ✅ Issue is fixed and tests added
- ✅ All tests passing for 2+ sessions
- ✅ Fix is committed to main branch

---

## Statistics

**Total Known Limitations**: 2  
**Fixed This Session**: 2 (inset generator, animation-delay negatives)  
**High Priority**: 0  
**Medium Priority**: 1 (background-size)  
**Low Priority**: 1 (word-spacing)  

**Last Updated**: 2025-10-27
