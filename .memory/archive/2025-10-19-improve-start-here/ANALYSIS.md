# START_HERE.md Improvement Analysis

## Issues Identified

### 1. Accuracy Issues

**Date format inconsistency**:
- Archive examples reference "2025-01-18" dates
- Actual archives use "2025-10-18" and "2025-10-19" dates
- Command uses `date +%Y-%m-%d` which would give "2025-10-19" format
- **Fix**: Update example paths to match actual date format or use placeholders

**Archive path references**:
- Line 106: `archive/2025-01-18-action-plan/ACTION_PLAN.md`
- Line 108: `archive/2025-01-18-checkpoint/FINAL_HANDOVER.md`
- Line 110: `archive/2025-01-18-checkpoint/CHECKPOINT_REVIEW.md`
- These paths may become stale
- **Fix**: Make references relative to .memory/archive/

**Just check command**:
- Line 38-39 says: `just check   # Format, typecheck, lint`
- Actual justfile: `check: format fix typecheck`
- Missing that `fix` runs `biome check --write .` (auto-fix)
- **Fix**: Update to `just check   # Format, fix, typecheck`

### 2. Fragile Commands

**Archive INDEX.md command** (line 16):
```bash
cp .memory/archive/INDEX.md .memory/archive/$(ls -t .memory/archive/ | grep -E '^[0-9]' | head -1)/INDEX_ARCHIVED.md
```
- Relies on ls -t ordering and grep pattern
- Fails if no dated dirs exist or new session not created yet
- Creates chicken-egg problem: needs session dir to exist first
- **Fix**: Reverse order - create session dir FIRST, then archive to it

**DRY check command** (line 50):
```bash
grep -r "function functionName" src/
```
- Will match comments, strings, JSDoc
- Better: `grep -r "^function functionName\|^export function functionName" src/`
- **Fix**: Update with more precise regex

### 3. Clarity Issues

**Session workflow order** (lines 14-31):
- Step 1: Archive INDEX.md (needs target dir)
- Step 2: Create session archive (creates target dir)
- Creates circular dependency
- **Fix**: Reorder to create dir first

**Testing patterns** (lines 161-165):
- Shows `pnpm test -- rgb` but doesn't explain what "rgb" matches
- Missing that it searches test file names and test descriptions
- **Fix**: Add clarification

**Navigation section** (lines 99-110):
- Says "Start here: .memory/archive/INDEX.md"
- But INDEX.md is at .memory/archive/INDEX.md, not in a subdirectory
- Example paths are outdated
- **Fix**: Simplify to stable patterns

### 4. Contradiction with AGENTS.md

**AGENTS.md line 26**:
> Update START_HERE.md at session end with outcomes and next steps

**START_HERE.md lines 143-149**:
> **NEVER update for**:
> - ❌ Status updates
> - ❌ Recent activity

These contradict each other!
- **Fix**: Remove the line from AGENTS.md, keep START_HERE.md prohibition

### 5. Missing Information

**Import aliases** (lines 154-157):
- Lists aliases but doesn't mention where they're defined
- **Fix**: Add "Defined in tsconfig.json"

**Round-trip verification** (line 118):
- Says "Verify round-trip: Parse → Generate → Parse"
- Doesn't explain what to verify or where tests go
- **Fix**: Add "Result should equal input, test in integration/"

## Proposed Changes

### Priority 1 (Accuracy/Correctness):
1. Fix session workflow order (create dir before archiving)
2. Correct `just check` description
3. Fix date format in examples or use placeholders
4. Make archive path references generic/relative

### Priority 2 (Clarity):
5. Improve DRY check command precision
6. Clarify testing pattern matching
7. Add import alias source reference
8. Explain round-trip verification better

### Priority 3 (Consistency):
9. Update AGENTS.md to remove contradictory line
10. Simplify navigation section with stable patterns
