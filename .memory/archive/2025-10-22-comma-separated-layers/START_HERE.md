# START HERE: Comma-Separated Layers Implementation

**Date**: 2025-10-22T00:39:29Z  
**Status**: Planning Complete - Ready to Implement  
**Priority**: P0 - Critical (User's immediate need)

---

## The Problem (In 30 Seconds)

**User tried this**:
```css
background-image:
  radial-gradient(...),
  radial-gradient(...),
  linear-gradient(...);  /* 7 gradient layers total */
```

**Result**: ❌ Only first gradient parsed, other 6 ignored  
**Root cause**: 21 properties accept comma-separated lists, but b_value only parses first value  
**Impact**: Layered backgrounds, multiple shadows, multi-animations all broken

---

## The Solution (In 30 Seconds)

Use existing `parseCommaSeparatedSingle` utility for each property:

```typescript
// BEFORE (broken)
"background-image": GradientParse.parse  // Returns Gradient (single)

// AFTER (fixed)
"background-image": BackgroundImage.parse  // Returns Gradient[] (array)
```

**Estimate**: 4-6 hours across 7 fool-proof sessions

---

## Affected Properties (21 total)

### Background (7) - P0
background-image, background-position, background-size, background-repeat, background-clip, background-origin, background-attachment

### Shadow (2) - P1
box-shadow, text-shadow

### Animation (8) - P2
animation-name, animation-duration, animation-timing-function, animation-delay, animation-iteration-count, animation-direction, animation-fill-mode, animation-play-state

### Transition (4) - P3
transition-property, transition-duration, transition-timing-function, transition-delay

---

## Implementation Plan

### Session 0: Fix Baseline (30 min)
**Goal**: Clean TypeScript, verify utilities  
**Blocker**: TypeScript error at `src/universal.ts:633`  
**Output**: All tests passing, ready to start

### Session 1: background-image (45 min)
**Goal**: Fix user's immediate need  
**Implementation**: Create `src/parse/background/image.ts`  
**Output**: 7-layer gradients work

### Sessions 2-7: Remaining Properties (3h 15m)
**Goal**: Fix all 21 properties  
**Output**: Full comma-separated support

---

## Quick Start

### If You're Implementing
```bash
# 1. Read the master plan
cat .memory/archive/2025-10-22-comma-separated-layers/MASTER_PLAN.md

# 2. Start Session 0
cat .memory/archive/2025-10-22-comma-separated-layers/SESSION_0_BASELINE.md

# 3. Fix TypeScript error
code src/universal.ts +633
```

### If You're Reviewing
```bash
# Read these 3 files in order
cat README.md          # Overview
cat AUDIT_REPORT.md    # Full scope
cat MASTER_PLAN.md     # Implementation
```

---

## Key Documents

| File | Purpose | Size | Read Time |
|------|---------|------|-----------|
| **START_HERE.md** | This file - quick orientation | 2 KB | 2 min |
| **README.md** | Complete overview & navigation | 10 KB | 5 min |
| **MASTER_PLAN.md** | Detailed implementation strategy | 15 KB | 15 min |
| **AUDIT_REPORT.md** | All 21 properties analyzed | 10 KB | 10 min |
| **SESSION_0_BASELINE.md** | First implementation session | 6 KB | 5 min |
| **SESSION_1_BACKGROUND_IMAGE.md** | User's immediate need | 16 KB | 10 min |

---

## Architecture at a Glance

### The Utility (Already Exists ✅)
```typescript
// src/utils/parse/comma-separated.ts
parseCommaSeparatedSingle<T>(
  value: string,
  itemParser: (item: string) => Result<T, string>,
  propertyName: string
): Result<T[], string>
```

### What We're Building
```typescript
// src/parse/background/image.ts
export function parse(value: string): ParseResult<BackgroundImage[]> {
  return toParseResult(
    parseCommaSeparatedSingle(value, parseSingleLayer, "background-image")
  );
}
```

### Registration Update
```typescript
// src/universal.ts
"background-image": BackgroundImage.parse  // NEW: handles arrays
```

---

## Validation

### Against MDM Spec ✅
```bash
cd /Users/alphab/Dev/LLM/DEV/mdm-data/css
cat properties.json | jq '.["background-image"].syntax'
# Returns: "<bg-image>#"
#                     ^ # means comma-separated list
```

**Result**: All 21 properties confirmed to require list support per CSS spec.

---

## Breaking Changes ⚠️

**Before**:
```typescript
parse("background-image: gradient") → ParseResult<Gradient>
```

**After**:
```typescript
parse("background-image: gradient") → ParseResult<Gradient[]>  // Array of length 1
```

**Impact**: Users must update type expectations from single values to arrays.

---

## Success Criteria

- [ ] All 21 properties parse comma-separated lists
- [ ] User's 7-layer gradient example works
- [ ] No test regressions
- [ ] TypeScript clean
- [ ] Documentation updated

---

## Timeline

| Session | Duration | Deliverable |
|---------|----------|-------------|
| Session 0 | 30 min | Baseline fixed |
| Session 1 | 45 min | background-image works |
| Sessions 2-7 | 3h 15m | All 21 properties fixed |
| **Total** | **4.5h** | Complete implementation |

---

## Current Status

**Planning**: ✅ Complete (4 documents, 45KB)  
**Baseline**: ⚠️ TypeScript error (must fix first)  
**Implementation**: 🔜 Ready (Session 0)  
**Blocker**: `src/universal.ts:633`

---

## Next Actions

### Immediate
1. Fix TypeScript error at line 633 (5 min)
2. Run `just check && just test` (verify baseline)
3. Start Session 1 (background-image)

### After Session 1
1. Test with user's 7-layer gradient
2. Validate approach
3. Continue or adjust plan

---

## Questions?

- **Scope too large?** Start with P0 only (background properties)
- **Breaking changes concern?** Review backward compat options in MASTER_PLAN.md
- **Timeline too aggressive?** Can split into multiple PRs
- **Need more context?** Read AUDIT_REPORT.md for full analysis

---

## Reference Links

- **Planning docs**: `.memory/archive/2025-10-22-comma-separated-layers/`
- **MDM CSS data**: `/Users/alphab/Dev/LLM/DEV/mdm-data/css/`
- **Utility code**: `src/utils/parse/comma-separated.ts`
- **Universal API**: `src/universal.ts`

---

**Created**: 2025-10-22T00:39:29Z  
**Estimated effort**: 4-6 hours  
**Impact**: Fixes 21 broken properties  
**Priority**: P0 (user blocked)  

**START WITH**: SESSION_0_BASELINE.md → Fix TypeScript error
