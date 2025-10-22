# Comma-Separated Layers: Master Plan & Implementation

**Created**: 2025-10-22T00:39:29Z  
**Status**: Planning Complete - Ready for Implementation  
**Goal**: Add full support for CSS properties with `#` multiplier (comma-separated lists)

---

## Quick Start

### If You're Implementing This

1. **Read FIRST**: `MASTER_PLAN.md` (complete strategy)
2. **Understand scope**: `AUDIT_REPORT.md` (21 affected properties)
3. **Start here**: `SESSION_0_BASELINE.md` (fix TypeScript error)
4. **Then**: `SESSION_1_BACKGROUND_IMAGE.md` (user's immediate need)

### If You're Reviewing This

- **Problem**: 21 properties accept comma-separated lists, but only parse first value
- **Impact**: Layered backgrounds, multiple shadows, multi-animations all broken
- **Solution**: Use existing `parseCommaSeparatedSingle` utility for each property
- **Timeline**: 4-6 hours across 7 fool-proof sessions

---

## The Problem in One Example

**User's CSS** (from real-world use case):
```css
background-image:
  radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.15) 30%),
  radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.1) 11%),
  radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 17%),
  radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 11%),
  radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 11%),
  radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.1) 11%),
  linear-gradient(45deg, #343702 0%, #184500 20%, #187546 30%);
```

**Current behavior**: ❌ Parses only the FIRST gradient, ignores other 6  
**Expected behavior**: ✅ Parses all 7 gradients into an array

---

## Document Index

### Planning Documents

| File | Purpose | Read Time |
|------|---------|-----------|
| **MASTER_PLAN.md** | Complete implementation strategy | 15 min |
| **AUDIT_REPORT.md** | All 21 affected properties analyzed | 10 min |
| **README.md** | This file - overview & navigation | 5 min |

### Implementation Guides

| File | Session | Duration | Focus |
|------|---------|----------|-------|
| **SESSION_0_BASELINE.md** | Session 0 | 30 min | Fix TypeScript, verify baseline |
| **SESSION_1_BACKGROUND_IMAGE.md** | Session 1 | 45 min | background-image list support |
| (More sessions TBD) | Sessions 2-7 | 3h 15m | Remaining 20 properties |

---

## Affected Properties (21 total)

### P0 - Critical (7 properties)
Background properties (layered backgrounds):
- background-image, background-position, background-size
- background-repeat, background-clip, background-origin, background-attachment

### P1 - High (2 properties)
Shadow properties (multiple shadows):
- box-shadow, text-shadow

### P2 - Medium (8 properties)
Animation properties (multiple animations):
- animation-name, animation-duration, animation-timing-function, animation-delay
- animation-iteration-count, animation-direction, animation-fill-mode, animation-play-state

### P3 - Medium (4 properties)
Transition properties (multiple transitions):
- transition-property, transition-duration, transition-timing-function, transition-delay

---

## Architecture Overview

### Current (Broken)
```
parse("background-image: grad1, grad2, grad3")
   ↓
universal.ts: GradientParse.parse
   ↓
Gradient parser (single value)
   ↓
Returns: Gradient (only grad1) ❌
```

### Target (Fixed)
```
parse("background-image: grad1, grad2, grad3")
   ↓
universal.ts: BackgroundImage.parse
   ↓
parseCommaSeparatedSingle utility
   ↓ (splits on commas)
GradientParse.parse (grad1)
GradientParse.parse (grad2)
GradientParse.parse (grad3)
   ↓
Returns: Gradient[] (all 3) ✅
```

### The Key Utility (Already Exists)

```typescript
// src/utils/parse/comma-separated.ts
export function parseCommaSeparatedSingle<T>(
  value: string,
  itemParser: (item: string) => Result<T, string>,
  propertyName: string
): Result<T[], string>
```

**Features**:
- ✅ AST-based comma splitting (handles nested commas correctly)
- ✅ Parses each segment individually
- ✅ Returns array of results
- ✅ Tested with 19+ tests

---

## Implementation Strategy

### Fool-Proof Sessions

Each session is self-contained with:
- Clear prerequisites
- Step-by-step instructions
- Verification checkpoints
- Time tracking
- Troubleshooting guide
- Commit message template

### Session Breakdown

1. **Session 0** (30 min): Fix baseline, verify utilities
2. **Session 1** (45 min): background-image (user's need)
3. **Session 2** (30 min): background-position & background-size
4. **Session 3** (30 min): Remaining background properties
5. **Session 4** (30 min): Shadow properties
6. **Session 5** (45 min): Animation properties
7. **Session 6** (30 min): Transition properties
8. **Session 7** (30 min): Documentation & polish

**Total**: ~4.5 hours

---

## Success Criteria

### Must Have ✅
- [ ] All 21 properties parse comma-separated lists correctly
- [ ] User's 7-layer gradient example works
- [ ] No regressions in existing tests
- [ ] Type safety maintained (ParseResult<T[]> instead of ParseResult<T>)
- [ ] Documentation updated

### Should Have
- [ ] Performance within 10% of single-value parsing
- [ ] Examples for each property category
- [ ] Migration guide if breaking changes

### Nice to Have
- [ ] Benchmark comparisons
- [ ] Visual examples in docs
- [ ] Generator support for arrays

---

## Breaking Changes

### Type Changes

**Before**:
```typescript
parse("background-image: gradient")
  → ParseResult<Gradient>  // Single value
```

**After**:
```typescript
parse("background-image: gradient")
  → ParseResult<Gradient[]>  // Array (length 1)
```

### Impact

- **Parsing**: Now returns arrays (breaking change)
- **Generating**: Should accept both single values and arrays (backward compat)
- **Migration**: Users must update type expectations

---

## Validation Against MDM Spec

All affected properties validated against:
- **Source**: `/Users/alphab/Dev/LLM/DEV/mdm-data/css/properties.json`
- **Method**: Check for `#` multiplier in syntax
- **Result**: 21/51 properties in b_value require list support

### Example Validation

```bash
cd /Users/alphab/Dev/LLM/DEV/mdm-data/css
cat properties.json | jq '.["background-image"]'
# Returns: { "syntax": "<bg-image>#", ... }
#                               ^ # means comma-separated list
```

---

## Risk Mitigation

### Risk 1: Breaking Existing Code
**Mitigation**: 
- Document breaking changes
- Provide migration guide
- Consider backward compat helpers

### Risk 2: Complex Gradients
**Example**: `radial-gradient(rgba(255,0,0,0.5), blue)`  
**Problem**: Has commas inside, not separators  
**Solution**: Utility uses AST-based splitting ✅

### Risk 3: Performance
**Mitigation**:
- Benchmark before/after
- Lazy parsing (only split if commas detected)
- Profile hot paths

---

## Testing Strategy

### Unit Tests (Per Property)
- Single value
- Multiple values (2, 3, 5+ items)
- Edge cases (none, empty)
- Complex values (nested commas)
- Error cases

### Integration Tests
- parseAll() with layered backgrounds
- Round-trip: parse → generate → parse
- User's exact example

### Performance Tests
- Benchmark single vs array
- Memory profiling for large lists

---

## Timeline

| Week | Focus | Deliverables |
|------|-------|--------------|
| Week 1 | Background properties | 7 properties fixed |
| Week 1 | Shadow properties | 2 properties fixed |
| Week 2 | Animation/Transition | 12 properties fixed |
| Week 2 | Documentation | README, examples, migration guide |

**Or**: Complete in single focused session (4-6 hours)

---

## References

### Internal Documents
- `.memory/archive/2025-10-20-comma-separated-deep-research/RESEARCH.md` - Utility research
- `.memory/archive/2025-10-21-phase0.7-*/` - Batch API context
- `src/utils/parse/comma-separated.ts` - The utility

### External References
- MDM CSS Data: `/Users/alphab/Dev/LLM/DEV/mdm-data/css/`
- W3C CSS Specs: [CSS Backgrounds](https://www.w3.org/TR/css-backgrounds-3/)

---

## Questions & Decisions

### Answered
- ✅ Utility exists and works
- ✅ Scope defined (21 properties)
- ✅ Priority order established
- ✅ Session breakdown complete

### Pending
- ⚠️ Breaking change acceptable?
- ⚠️ Backward compat needed?
- ⚠️ Generator array support?
- ⚠️ All properties at once or phased?

---

## How to Proceed

### Option A: Start Immediately
1. Begin Session 0 (fix baseline)
2. Complete Session 1 (background-image)
3. Validate approach with user's example
4. Continue if successful

### Option B: Review First
1. Read all planning docs
2. Discuss breaking changes
3. Confirm priority order
4. Schedule implementation time

### Option C: Phased Approach
1. Week 1: P0 only (background properties)
2. Validate in production
3. Week 2: P1-P3 (shadows, animation, transition)
4. Release incrementally

---

## Current Status

**Planning**: ✅ Complete  
**Baseline**: ⚠️ TypeScript error at line 633  
**Implementation**: 🔜 Ready to start  
**Blocker**: Must fix baseline first

---

## Next Actions

### For Implementation
1. Fix TypeScript error (Session 0)
2. Implement background-image (Session 1)
3. Test with user's example
4. Continue or adjust plan

### For Review
1. Read MASTER_PLAN.md
2. Review AUDIT_REPORT.md
3. Provide feedback on approach
4. Approve or request changes

---

**Created by**: Planning session 2025-10-22  
**Estimated completion**: 4-6 hours of focused work  
**Impact**: Fixes 21 broken properties, enables layered backgrounds  
**Priority**: P0 (user's immediate need)
