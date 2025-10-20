# Clip-Path DRY Refactoring - Master Plan

**Goal**: Gold Standard - Eliminate duplication, achieve elegant DRY code  
**Status**: Planning Phase  
**Current**: 33% duplication (200 lines) → Target: <10% duplication  
**Tests**: 307 passing (must remain 307 passing)  
**Timeline**: 3-4 hours total (3 sessions)

---

## 🎯 Vision: Gold Standard Clip-Path

**What we're building**:
- ✨ Beautiful, elegant parsers with zero duplication
- 🔧 Reusable utilities that make future shapes trivial
- 📚 Educational code that demonstrates best practices
- 🚀 Foundation for mask, shape-outside, offset-path properties

**Principles**:
1. **DRY**: Single source of truth for every pattern
2. **Elegant**: Code reads like prose, obvious what it does
3. **Testable**: 100% test coverage maintained
4. **Spec-compliant**: Perfect MDN alignment
5. **Extensible**: Easy to add new shapes

---

## 📊 Current State Analysis

### Implementation Status: ✅ 100% Complete

| Shape | Parser | Generator | Tests | Lines |
|-------|--------|-----------|-------|-------|
| `none` | ✅ | ✅ | 6 | 35 |
| `url()` | ✅ | ✅ | 13 | 34 |
| `geometry-box` | ✅ | ✅ | 22 | 44 |
| `inset()` | ✅ | ✅ | 55 | 101 |
| `circle()` | ✅ | ✅ | 42 | 101 |
| `ellipse()` | ✅ | ✅ | 48 | 128 |
| `polygon()` | ✅ | ✅ | 37 | 108 |
| `rect()` | ✅ | ✅ | 28 | 143 |
| `xywh()` | ✅ | ✅ | 26 | 131 |
| `path()` | ✅ | ✅ | 30 | 140 |
| **TOTAL** | **10/10** | **10/10** | **307** | **965** |

**All shapes implemented, all tests passing** ✅

### Duplication Analysis: ⚠️ 33% Needs Work

```
┌──────────────────────────────────────────────────────┐
│ DUPLICATION HEAT MAP                                 │
├──────────────────────────────────────────────────────┤
│ Pattern 1: Parse Boilerplate        🔴 CRITICAL     │
│   • Files: ALL 7 shape parsers                       │
│   • Lines: ~150-200 duplicated                       │
│   • Impact: try/catch + AST + findFunction           │
├──────────────────────────────────────────────────────┤
│ Pattern 2: Border-Radius 'round'    🟡 HIGH         │
│   • Files: inset, rect, xywh                         │
│   • Lines: ~45 duplicated                            │
│   • Impact: roundIndex + parse + validate            │
├──────────────────────────────────────────────────────┤
│ Pattern 3: Position 'at'            🟢 MEDIUM       │
│   • Files: circle, ellipse                           │
│   • Lines: ~36 duplicated                            │
│   • Impact: 'at' check + parsePosition2D             │
├──────────────────────────────────────────────────────┤
│ Pattern 4: Radial Size Keywords     🟢 MEDIUM       │
│   • Files: circle (1x), ellipse (2x)                 │
│   • Lines: ~48 duplicated                            │
│   • Impact: closest-side/farthest-side parsing       │
└──────────────────────────────────────────────────────┘

TOTAL: ~280-330 lines of 965 = 33% duplication
```

---

## 🗺️ Session Breakdown

### Session 1: Core Infrastructure & Parse Wrapper
**Time**: 60-90 min | **Impact**: 🔴 CRITICAL | **Lines Saved**: ~105

**The Big Win**: Eliminate all parse boilerplate duplication

**What we're building**:
- `src/parse/clip-path/utils.ts` - Shape function wrapper utilities
- `parseShapeFunction()` - For functions using parsed arguments
- `parseShapeFunctionRaw()` - For functions needing raw AST children

**Why it matters**: Every shape parser has identical boilerplate. This removes it ALL.

**Files to refactor**:
1. ✅ `path.ts` (simplest - just wrapper)
2. ✅ `xywh.ts` (wrapper + border-radius)
3. ✅ `rect.ts` (wrapper + border-radius + TRBL)
4. ✅ `inset.ts` (wrapper + border-radius + TRBL)
5. ✅ `circle.ts` (raw wrapper + radial + position)
6. ✅ `ellipse.ts` (raw wrapper + radial×2 + position)
7. ✅ `polygon.ts` (raw wrapper + comma handling)

**Success Criteria**:
- [ ] `parseShapeFunction` handles all error cases
- [ ] `parseShapeFunctionRaw` preserves comma behavior
- [ ] All 307 tests still pass
- [ ] Each parser reduced by ~15 lines
- [ ] Code reads cleaner and more focused

**Deliverables**:
```typescript
// src/parse/clip-path/utils.ts
export function parseShapeFunction<T>(...)
export function parseShapeFunctionRaw<T>(...)

// Updated parsers (all 7 files)
export function parse(css: string) {
  return parseShapeFunction(css, "rect", parseRectArgs);
}
```

---

### Session 2: Border-Radius & TRBL Utilities
**Time**: 45-60 min | **Impact**: 🟡 HIGH | **Lines Saved**: ~45

**The Focus**: Clean up shared shape argument patterns

**What we're building**:
- `src/utils/parse/nodes.ts` - Add `parseRoundBorderRadius()`
- `src/utils/parse/nodes.ts` - Add `parseAtPosition()`

**Why it matters**: 3 shapes use border-radius, 2 shapes use position 'at'. DRY them up.

**Files to enhance**:
1. ✅ `nodes.ts` - Add `parseRoundBorderRadius()` helper
2. ✅ `nodes.ts` - Add `parseAtPosition()` helper

**Files to refactor**:
1. ✅ `inset.ts` - Use `parseRoundBorderRadius()`
2. ✅ `rect.ts` - Use `parseRoundBorderRadius()`
3. ✅ `xywh.ts` - Use `parseRoundBorderRadius()`
4. ✅ `circle.ts` - Use `parseAtPosition()`
5. ✅ `ellipse.ts` - Use `parseAtPosition()`

**Success Criteria**:
- [ ] `parseRoundBorderRadius` handles all edge cases
- [ ] `parseAtPosition` returns proper indices
- [ ] All 307 tests still pass
- [ ] Border-radius code DRY in 3 files
- [ ] Position 'at' code DRY in 2 files

**Deliverables**:
```typescript
// src/utils/parse/nodes.ts
export function parseRoundBorderRadius(args): Result<...>
export function parseAtPosition(children, idx): Result<...>

// Simplified in inset/rect/xywh
const { roundIndex, borderRadius } = parseRoundBorderRadius(args);

// Simplified in circle/ellipse
const { position, nextIdx } = parseAtPosition(children, idx);
```

---

### Session 3: Radial Utilities & Final Polish
**Time**: 45-60 min | **Impact**: 🟢 MEDIUM | **Lines Saved**: ~40

**The Polish**: Complete the DRY refactoring and optimize generators

**What we're building**:
- `src/utils/parse/nodes.ts` - Add `parseRadialSize()` helper
- Generator optimizations (remove duplication there too)
- Documentation and examples

**Files to enhance**:
1. ✅ `nodes.ts` - Add `parseRadialSize()` helper

**Files to refactor**:
1. ✅ `circle.ts` - Use `parseRadialSize()` for radius
2. ✅ `ellipse.ts` - Use `parseRadialSize()` for radiusX and radiusY

**Generator review**:
- Check for duplication patterns in `src/generate/clip-path/`
- Apply same DRY principles if needed
- Ensure round-trip tests all pass

**Success Criteria**:
- [ ] `parseRadialSize` handles keywords + lengths
- [ ] All 307 tests still pass
- [ ] Radial parsing DRY in 2 files
- [ ] Generators reviewed and optimized
- [ ] Documentation updated with examples

**Deliverables**:
```typescript
// src/utils/parse/nodes.ts
export function parseRadialSize(node, name): Result<...>

// Simplified in circle/ellipse
const radiusResult = parseRadialSize(node, "radius");
const radiusXResult = parseRadialSize(node, "radiusX");
```

---

## 📈 Impact Summary

### Before → After

| Metric | Before | Session 1 | Session 2 | Session 3 | Total Gain |
|--------|--------|-----------|-----------|-----------|------------|
| **Total Lines** | 965 | 860 | 815 | 775 | **-190 lines** |
| **Duplication** | 33% | 18% | 12% | 8% | **-25%** |
| **Parse Utils** | 3 | 5 | 7 | 8 | **+5 helpers** |
| **DRY Score** | 67% | 82% | 88% | 92% | **+25%** |

### Lines Saved per Session

```
Session 1: 🔴 ~105 lines (parse boilerplate)
Session 2: 🟡 ~45 lines  (border-radius + position)
Session 3: 🟢 ~40 lines  (radial size + polish)
──────────────────────────────────────────────
   TOTAL:     ~190 lines (20% reduction)
```

---

## 🎯 Success Criteria (All Sessions)

### Code Quality
- [ ] Duplication: 33% → <10% ✨
- [ ] Lines removed: ~190 lines
- [ ] Parse utilities: 3 → 8 helpers
- [ ] No code smell patterns remain

### Functionality
- [ ] All 307 tests passing ✅
- [ ] No behavioral changes
- [ ] Round-trip validation intact
- [ ] Error messages preserved

### Engineering Excellence
- [ ] Zero magic numbers or constants
- [ ] Clear, descriptive function names
- [ ] Comprehensive JSDoc comments
- [ ] Educational code examples

### Maintainability
- [ ] Future shapes trivial to add
- [ ] Patterns obvious and consistent
- [ ] Easy to understand at a glance
- [ ] Self-documenting code

---

## 🚀 Quick Start Guide

### For New Agent Starting Session 1

```bash
# 1. Verify baseline
just check && just test
# ✅ Should see: 2318 tests passing

# 2. Read this MASTER_PLAN.md (you're here!)

# 3. Read Session 1 detailed plan
cat .memory/archive/2025-10-20-clip-path-evaluation/SESSION_1.md

# 4. Create session directory
mkdir -p .memory/archive/$(date +%Y-%m-%d)-clip-path-dry-session-1/

# 5. Start working!
# Follow SESSION_1.md step-by-step
```

### For Agent Continuing from Previous Session

```bash
# 1. Check status
cat .memory/archive/2025-10-20-clip-path-evaluation/PROGRESS.md

# 2. Read previous handover
cat .memory/archive/[previous-session]/HANDOVER.md

# 3. Read your session plan
cat .memory/archive/2025-10-20-clip-path-evaluation/SESSION_N.md

# 4. Create your session directory
mkdir -p .memory/archive/$(date +%Y-%m-%d)-clip-path-dry-session-N/

# 5. Continue from handover notes
```

---

## 📋 Progress Tracker

| Session | Status | Tests | Lines Saved | Agent | Handover |
|---------|--------|-------|-------------|-------|----------|
| 1. Core Infrastructure | ⚪ TODO | 307/307 | ~105 | - | - |
| 2. Border & Position | ⚪ TODO | 307/307 | ~45 | - | - |
| 3. Radial & Polish | ⚪ TODO | 307/307 | ~40 | - | - |

**Status Legend**: ⚪ TODO | 🔵 IN PROGRESS | ✅ DONE | ⚠️ BLOCKED

---

## 🎓 Learning Outcomes

### What This Teaches

**Software Engineering**:
- ✅ Identifying code smells and duplication
- ✅ Extracting reusable abstractions
- ✅ Balancing DRY vs readability
- ✅ Refactoring without breaking tests

**Best Practices**:
- ✅ Test-driven refactoring (tests validate correctness)
- ✅ Incremental changes (one file at a time)
- ✅ Clear commit messages (document decisions)
- ✅ API design (making helpers ergonomic)

**CSS Mastery**:
- ✅ Deep understanding of CSS clip-path shapes
- ✅ Parsing strategy patterns
- ✅ Error handling for invalid syntax
- ✅ Round-trip transformation guarantees

---

## 🔗 Related Resources

### In This Archive
- `EVALUATION.md` - Detailed duplication analysis
- `REFACTORING_PROPOSAL.md` - Original refactoring plan
- `SUMMARY.md` - Quick reference
- `SESSION_1.md` - Detailed Session 1 plan
- `SESSION_2.md` - Detailed Session 2 plan
- `SESSION_3.md` - Detailed Session 3 plan

### External References
- MDN: CSS Shapes Module Level 1 & 2
- CSS-Tree: AST node types
- `/Users/alphab/Dev/LLM/DEV/mdm-data/css` - Reference data

### Code References
- `src/parse/color/` - Example of good parser structure
- `src/parse/gradient/` - Similar patterns to clip-path
- `src/utils/parse/nodes.ts` - Existing utilities

---

## 🛡️ Safety & Quality Gates

### Before Every Commit

```bash
# 1. Format check
just check
# Must pass: format, lint, typecheck

# 2. Test verification
just test
# Must pass: all 2318 tests (307 clip-path)

# 3. Targeted test
just test src/parse/clip-path
# Quick verification of clip-path tests only
```

### After Each File Migration

```bash
# 1. Test the specific file
just test src/parse/clip-path/rect.test.ts

# 2. Full clip-path suite
just test src/parse/clip-path

# 3. Commit immediately if passing
git add src/parse/clip-path/rect.ts
git commit -m "refactor(clip-path): DRY up rect() parser"
```

### After Each Session

```bash
# 1. Full verification
just check && just test

# 2. Review changes
git diff HEAD~5..HEAD

# 3. Create handover
cat > HANDOVER.md << EOF
[handover content]
EOF

# 4. Update progress
# Edit PROGRESS.md with session status
```

---

## 🚨 Common Pitfalls & Solutions

### Pitfall 1: Breaking Tests
**Problem**: Refactoring changes behavior  
**Solution**: Run tests after EVERY file change  
**Prevention**: Keep refactorings small and focused

### Pitfall 2: Over-Abstraction
**Problem**: Helper too complex or generic  
**Solution**: Only extract patterns used 2+ times  
**Prevention**: Start simple, enhance if needed

### Pitfall 3: Error Message Changes
**Problem**: Tests fail due to different error text  
**Solution**: Preserve exact error messages  
**Prevention**: Copy error strings, don't rewrite

### Pitfall 4: Lost Context
**Problem**: Don't understand why code is structured a way  
**Solution**: Read original implementation first  
**Prevention**: Add comments explaining "why"

### Pitfall 5: Scope Creep
**Problem**: Want to fix unrelated issues  
**Solution**: Stay focused on DRY refactoring only  
**Prevention**: Note improvements for later

---

## 📝 Handover Template

After each session, create `HANDOVER.md` in your session archive:

```markdown
# Session N Handover - Clip-Path DRY Refactoring

**Date**: YYYY-MM-DD  
**Duration**: X minutes  
**Status**: ✅ DONE / 🔵 IN PROGRESS / ⚠️ PARTIAL / ❌ BLOCKED

---

## Completed Tasks
- [x] Created parseShapeFunction wrapper
- [x] Migrated path.ts parser
- [x] Migrated rect.ts parser
- [x] All tests passing (307/307)

## Metrics
- Lines removed: ~XX
- Files migrated: X/7
- Tests: 307 passing (no regression)
- Duplication: XX% → YY%

## Next Session Should Start With
[Clear description of what's next]

## Blockers
[None / List any issues encountered]

## Key Decisions Made
- Chose parseShapeFunction over inline abstraction because...
- Kept error messages identical to preserve tests...

## Tricky Parts / Gotchas
- polygon.ts needs raw children due to comma handling
- Error messages must match exactly for tests to pass

## Code Quality Notes
- Added JSDoc comments to all new helpers
- Kept backward compatibility with existing code
- No breaking changes to public API
```

---

## 🏆 Definition of Done

### For Each Session
- [ ] All planned files migrated/created
- [ ] All 307 tests passing
- [ ] `just check` passes (no lint/format issues)
- [ ] HANDOVER.md created with complete notes
- [ ] PROGRESS.md updated with session status
- [ ] All changes committed with clear messages

### For Overall Gold Standard
- [ ] All 3 sessions complete
- [ ] <10% code duplication remaining
- [ ] ~190 lines removed
- [ ] 8 parse utilities created
- [ ] All tests passing (307/307)
- [ ] Code is self-documenting and elegant
- [ ] Future shapes trivial to add
- [ ] Documentation updated with examples

---

## 🎯 North Star: The Gold Standard

**What does "Gold Standard" look like?**

### Beautiful Parser Example (After Refactoring)
```typescript
// src/parse/clip-path/rect.ts (AFTER)
import { parseShapeFunction } from "./utils";
import { parseRoundBorderRadius } from "@/utils/parse";

export function parse(css: string): Result<ClipPathRect, string> {
  return parseShapeFunction(css, "rect", parseRectArgs);
}

function parseRectArgs(args: CssNode[]): Result<ClipPathRect, string> {
  // 1. Parse border-radius (if present)
  const roundResult = parseRoundBorderRadius(args);
  if (!roundResult.ok) return roundResult;
  const { roundIndex, borderRadius } = roundResult.value;

  // 2. Parse TRBL values (before 'round')
  const trblNodes = roundIndex !== -1 ? args.slice(0, roundIndex) : args;
  const trblResult = parseTRBLLengthPercentageOrAuto(trblNodes);
  if (!trblResult.ok) return trblResult;

  // 3. Build result
  return ok({
    kind: "clip-path-rect",
    ...trblResult.value,
    borderRadius,
  });
}
```

**Notice**:
- ✨ No boilerplate (wrapper handles it)
- 🎯 Focused on rect-specific logic only
- 📚 Reads like a recipe: parse radius, parse edges, combine
- 🔧 Reusable helper for border-radius
- ✅ Clean, obvious, elegant

**Compare to BEFORE**: 143 lines → 85 lines (40% reduction!)

---

## 🚀 Let's Ship Gold Standard Code!

**Ready?** Start with → [SESSION_1.md](./SESSION_1.md)

**Questions?** Review [EVALUATION.md](./EVALUATION.md) for detailed analysis

**Stuck?** Check [REFACTORING_PROPOSAL.md](./REFACTORING_PROPOSAL.md) for examples

---

**Remember**: 
- 🎯 One session at a time
- ✅ Tests must always pass
- 🧹 Leave code cleaner than you found it
- 🎓 Learn and document as you go
- 🚀 Ship elegant, maintainable code

**Let's do this!** 💪
