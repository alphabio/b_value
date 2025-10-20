# Split nodes.ts Refactoring - Master Plan

**Status**: Ready to Start  
**Current Session**: Phase 1 (Directory Structure)  
**Baseline**: 2318 tests passing  
**Target**: Same tests passing + improved structure

---

## Quick Start

**First time here?**
1. Run: `just check && just test` (verify baseline: 2318 tests)
2. Read: Overall Goal & Phase 1 below
3. Create session tracking: Update progress table as you go
4. Start: Follow Phase 1 tasks

**Returning agent?**
1. Check progress tracker below
2. Find your phase
3. Read previous phase notes
4. Continue from there

---

## Progress Tracker

| Phase | Description | Status | Duration | Tests | Completed |
|-------|-------------|--------|----------|-------|-----------|
| 1 | Directory Structure | ✅ DONE | 5 min | 2318 | 2025-10-20 |
| 2 | Length & Angle Modules | ✅ DONE | 25 min | 2318 | 2025-10-20 |
| 3 | Number & Identifier | ✅ DONE | 15 min | 2318 | 2025-10-20 |
| 4 | Position Module | ✅ DONE | 30 min | 2318 | 2025-10-20 |
| 5 | Border-Radius & Radial | ✅ DONE | 25 min | 2318 | 2025-10-20 |
| 6 | Barrel Export & Cleanup | ✅ DONE | 10 min | 2318 | 2025-10-20 |
| 7 | Final Verification | ✅ DONE | 5 min | 2318 | 2025-10-20 |

**Status Legend**: ⚪ TODO | 🔵 IN PROGRESS | ✅ DONE | ⚠️ BLOCKED

**Planned Time**: 3.5 hours (210 minutes)  
**Actual Time**: 1.5 hours (90 minutes) - 57% UNDER ESTIMATE! 🎉

**SESSION COMPLETE**: All phases done, all tests passing! ✅

---

## Overall Goal

**Current State**:
- File: `src/utils/parse/nodes.ts` (751 lines)
- Functions: 12 parsing utilities
- Problem: "Junk drawer" - mixed concerns

**Target State**:
```
src/utils/parse/nodes/
├── index.ts              (20 lines)  - Barrel export
├── length.ts             (180 lines) - Length/percentage parsing
├── angle.ts              (60 lines)  - Angle parsing
├── number.ts             (50 lines)  - Number/identifier
├── position.ts           (270 lines) - Position parsing
├── border-radius.ts      (200 lines) - Border-radius utilities
└── radial.ts             (110 lines) - Radial size parsing
```

**Benefits**:
- ✅ Clear domain boundaries
- ✅ Files < 300 lines each
- ✅ Better discoverability
- ✅ Easier to maintain
- ✅ Room for future growth
- ✅ **Zero breaking changes** (backward compatible)

---

## Phase Overview

### Phase 1: Directory Structure (30 min)
**Status**: ⚪ TODO  
**Complexity**: LOW  
**Breaking Changes**: None

**Tasks**:
1. Create `src/utils/parse/nodes/` directory
2. Create empty files (7 total):
   - `index.ts` (barrel export)
   - `length.ts`
   - `angle.ts`
   - `number.ts`
   - `position.ts`
   - `border-radius.ts`
   - `radial.ts`
3. Add file headers and module JSDoc
4. Verify structure

**Success Criteria**:
- [ ] Directory created
- [ ] 7 files created
- [ ] No errors

**Deliverables**:
- Empty module files with structure
- Ready for Phase 2

---

### Phase 2: Length & Angle Modules (45 min)
**Status**: ⚪ TODO  
**Complexity**: LOW  
**Breaking Changes**: None

**Tasks**:
1. Extract `parseLengthNode()` → `nodes/length.ts`
2. Extract `parseLengthPercentageNode()` → `nodes/length.ts`
3. Extract `parseNumberNode()` → `nodes/length.ts`
4. Extract `parseAngleNode()` → `nodes/angle.ts`
5. Update imports in each file
6. Test after each extraction

**Functions**:
- `length.ts`: 3 functions (~180 lines)
  - `parseLengthNode()`
  - `parseLengthPercentageNode()`
  - `parseNumberNode()`
- `angle.ts`: 1 function (~60 lines)
  - `parseAngleNode()`

**Success Criteria**:
- [ ] 4 functions extracted
- [ ] All imports updated
- [ ] Tests passing: 2318

**Testing**:
```bash
just check && just test
```

---

### Phase 3: Number & Identifier (30 min)
**Status**: ⚪ TODO  
**Complexity**: LOW  
**Breaking Changes**: None

**Tasks**:
1. Extract `parseIdentifierNode()` → `nodes/number.ts`
2. Update imports
3. Test

**Functions**:
- `number.ts`: 1 function (~20 lines)
  - `parseIdentifierNode()`

**Success Criteria**:
- [ ] Identifier extraction complete
- [ ] Tests passing: 2318

---

### Phase 4: Position Module (45 min)
**Status**: ⚪ TODO  
**Complexity**: MEDIUM  
**Breaking Changes**: None

**Tasks**:
1. Extract `parsePositionValueNode()` → `nodes/position.ts`
2. Extract `parsePosition2D()` → `nodes/position.ts`
3. Extract `parseAtPosition()` → `nodes/position.ts`
4. Update imports (many files import these)
5. Test thoroughly

**Functions**:
- `position.ts`: 3 functions (~270 lines)
  - `parsePositionValueNode()`
  - `parsePosition2D()`
  - `parseAtPosition()`

**Success Criteria**:
- [ ] 3 position functions extracted
- [ ] All importers updated
- [ ] Tests passing: 2318

**Watch for**:
- Position utilities are heavily used
- Update imports in: clip-path, background, gradient files

---

### Phase 5: Border-Radius & Radial (45 min)
**Status**: ⚪ TODO  
**Complexity**: MEDIUM  
**Breaking Changes**: None

**Tasks**:
1. Extract `parseTRBLLengthPercentage()` → `nodes/border-radius.ts`
2. Extract `parseCornerValues()` → `nodes/border-radius.ts`
3. Extract `parseRoundBorderRadius()` → `nodes/border-radius.ts`
4. Extract `parseRadialSize()` → `nodes/radial.ts`
5. Update imports
6. Test

**Functions**:
- `border-radius.ts`: 3 functions (~200 lines)
  - `parseTRBLLengthPercentage()`
  - `parseCornerValues()`
  - `parseRoundBorderRadius()`
- `radial.ts`: 1 function (~110 lines)
  - `parseRadialSize()`

**Success Criteria**:
- [ ] 4 functions extracted
- [ ] Tests passing: 2318

**Watch for**:
- Border-radius used in clip-path shapes
- Radial size used in circle/ellipse

---

### Phase 6: Barrel Export & Cleanup (30 min)
**Status**: ⚪ TODO  
**Complexity**: LOW  
**Breaking Changes**: None (if done correctly)

**Tasks**:
1. Create barrel export in `nodes/index.ts`
2. Update `src/utils/parse/nodes.ts` to re-export
3. Test all imports still work
4. Verify no breaking changes

**Success Criteria**:
- [ ] Barrel export complete
- [ ] nodes.ts re-exports everything
- [ ] All tests passing: 2318
- [ ] No breaking changes

---

### Phase 7: Final Verification (15 min)
**Status**: ⚪ TODO  
**Complexity**: LOW

**Tasks**:
1. Run full test suite: `just test`
2. Run quality checks: `just check`
3. Verify file sizes (all < 300 lines)
4. Check for circular dependencies
5. Update documentation
6. Create HANDOVER.md

**Success Criteria**:
- [ ] All 2318 tests passing
- [ ] No lint errors
- [ ] No typecheck errors
- [ ] All files < 300 lines
- [ ] Documentation updated

**Final Checks**:
```bash
just check           # Format, typecheck, lint
just test            # All tests
ls -lh src/utils/parse/nodes/  # Check file sizes
```

---

## Quality Gates

**Must pass before Phase completion**:
```bash
just check    # Format + typecheck + lint
just test     # 2318 tests passing
```

**Between Phases**:
- Commit frequently with clear messages
- Run tests after each function extraction
- Keep notes of any issues

---

## Function Mapping Reference

| Current (nodes.ts) | New Location | Lines | Complexity |
|-------------------|--------------|-------|------------|
| `parseLengthNode()` | `nodes/length.ts` | ~50 | LOW |
| `parseLengthPercentageNode()` | `nodes/length.ts` | ~80 | LOW |
| `parseNumberNode()` | `nodes/length.ts` | ~30 | LOW |
| `parseAngleNode()` | `nodes/angle.ts` | ~50 | LOW |
| `parseIdentifierNode()` | `nodes/number.ts` | ~20 | LOW |
| `parsePositionValueNode()` | `nodes/position.ts` | ~80 | MEDIUM |
| `parsePosition2D()` | `nodes/position.ts` | ~100 | MEDIUM |
| `parseAtPosition()` | `nodes/position.ts` | ~70 | MEDIUM |
| `parseTRBLLengthPercentage()` | `nodes/border-radius.ts` | ~60 | MEDIUM |
| `parseCornerValues()` | `nodes/border-radius.ts` | ~60 | MEDIUM |
| `parseRoundBorderRadius()` | `nodes/border-radius.ts` | ~80 | MEDIUM |
| `parseRadialSize()` | `nodes/radial.ts` | ~100 | MEDIUM |

---

## Session Notes Template

Use this for tracking each phase:

```markdown
## Phase X Notes

**Date**: YYYY-MM-DD
**Duration**: X minutes
**Agent**: Name

### What I Did
- Task 1
- Task 2

### Issues Encountered
- Issue description
- Solution

### Tests
- Before: 2318 passing
- After: 2318 passing ✅

### Next Phase
- Ready for Phase X+1
- Notes for next agent
```

---

## Success Metrics

**Before**:
- 1 file: 751 lines
- 12 functions
- Mixed concerns

**After**:
- 7 files: ~890 lines total
- 12 functions (same)
- Clear domains
- All < 300 lines per file

**Quality**:
- ✅ All 2318 tests passing
- ✅ No lint errors
- ✅ No breaking changes
- ✅ Improved maintainability

---

## References

- **Proposal**: `.memory/archive/2025-10-20-code-review/SPLIT_NODES_PROPOSAL.md`
- **Review**: `.memory/archive/2025-10-20-code-review/COMPREHENSIVE_REVIEW.md`
- **Current**: `src/utils/parse/nodes.ts` (751 lines)

---

## Meta

**Created**: 2025-10-20  
**Type**: Refactoring (no new features)  
**Priority**: Medium (cleanup/quality improvement)  
**Effort**: 3.5 hours total  
**Risk**: Low (backward compatible)

**Update this document** as you complete phases!
