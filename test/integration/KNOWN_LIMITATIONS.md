# Known Limitations & Missing Functionality

This document tracks incomplete implementations, missing functionality, and known limitations discovered through round-trip testing.

**Purpose**: When round-trip tests reveal missing features or bugs, document them here for future implementation.

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

**Total Known Limitations**: 1  
**Fixed This Session**: 1 (inset generator)  
**High Priority**: 0  
**Medium Priority**: 1 (background-size)  
**Low Priority**: 0  

**Last Updated**: 2025-10-27
