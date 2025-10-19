# Onboarding & Transfer Improvements Analysis

**Date**: 2025-10-19  
**Session**: intro-session  
**Purpose**: Evaluate and improve agent onboarding/transfer process

---

## Current State Assessment

### What Works ✅

1. **Protocol enforcement is strong**
   - PROTOCOL_FIRST.md is clear and unmissable
   - AGENTS.md forces protocol execution at top
   - Session archiving pattern is consistent
   - All recent sessions (12+) followed protocol correctly

2. **Documentation is comprehensive**
   - START_HERE.md: 180 lines of timeless instructions
   - PROTOCOL_FIRST.md: 54 lines of session setup
   - AGENTS.md: 54 lines of quick reference
   - INDEX.md: Current state + archive trail
   - Total: ~288 lines of core docs

3. **Archive pattern works**
   - 37 session archives with clear outcomes
   - HANDOVER.md files provide continuity
   - INDEX.md provides entry point
   - Archive trail shows progression

4. **Quality gates are effective**
   - `just check && just test` catches issues early
   - Consistent baseline verification
   - All sessions pass quality gates before commit

5. **HANDOVER.md format is excellent**
   - Clear status, test counts, duration
   - "What Was Done" section is comprehensive
   - Breaking changes documented
   - Files changed tracked
   - Benefits/trade-offs explicit

### What's Not Working ❌

1. **Information overload on entry**
   - Agent must read 3 docs before starting (PROTOCOL_FIRST → START_HERE → last HANDOVER)
   - Takes ~5 minutes to get oriented
   - Critical info scattered across files

2. **INDEX.md maintenance burden**
   - Agents must manually update Archive Trail
   - User must archive INDEX.md at session start
   - Creates unnecessary friction
   - Sometimes gets forgotten/out-of-sync

3. **Redundancy between docs**
   - AGENTS.md repeats protocol from PROTOCOL_FIRST.md
   - START_HERE.md repeats session pattern
   - 3 different files say "create session directory first"

4. **No quick reference card**
   - Common commands scattered in START_HERE.md
   - No single place for "what do I run?"
   - Pattern examples buried in prose

5. **Context search is manual**
   - No automated way to find relevant past work
   - Agent must grep or manually browse archives
   - Similar problems solved multiple times

---

## Proposed Improvements

### Priority 1: Eliminate Information Overload 🎯

**Problem**: 3 docs + 288 lines before starting work

**Solution**: Create single-page "Agent Dashboard"

```markdown
.memory/DASHBOARD.md (replacing PROTOCOL_FIRST + partial START_HERE)
```

**Structure** (target: 80 lines max):
```
1. Immediate Actions (10 lines)
   - 3 commands to run NOW
   - "Then read rest of this file"

2. Quick Reference (20 lines)
   - just check / just test
   - pnpm test -- [filter]
   - Common patterns (one-liners)

3. Project Context (20 lines)
   - What is b_value (3 lines)
   - Core principles: DRY, KISS, import from core (5 lines)
   - Where things are (10 lines)

4. Session Protocol (20 lines)
   - Archive pattern
   - Quality gates
   - Commit frequency

5. Where to Learn More (10 lines)
   - Last session: link
   - Full docs: START_HERE.md
   - Examples: grep pattern
```

**Benefits**:
- Agent productive in 2 minutes instead of 5
- Single source of truth for "getting started"
- Keep START_HERE.md for deep reference only

---

### Priority 2: Automate INDEX.md Maintenance 🤖

**Problem**: Manual archive trail updates = friction + errors

**Solution**: Script-driven archive management

**Create**: `scripts/session.sh`

```bash
#!/usr/bin/env bash
# Automated session management

case "$1" in
  start)
    TOPIC="${2:-work}"
    SESSION_DIR=".memory/archive/$(date +%Y-%m-%d)-${TOPIC}"
    
    # Create session dir
    mkdir -p "$SESSION_DIR"
    
    # Auto-archive INDEX.md
    cp .memory/archive/INDEX.md "$SESSION_DIR/INDEX_ARCHIVED.md"
    
    # Generate stub HANDOVER.md
    cat > "$SESSION_DIR/HANDOVER.md" <<EOF
# Session: $(date +%Y-%m-%d)-${TOPIC}

**Status**: 🚧 IN PROGRESS
**Started**: $(date -Iseconds)

## What Was Done

(Fill this in as you work)

## Changes Made

(List files modified)

## Quality Gates

- [ ] just check
- [ ] just test

## Next Steps

(What's left for next agent)
EOF
    
    echo "✅ Session started: $SESSION_DIR"
    echo "📝 Edit: $SESSION_DIR/HANDOVER.md as you work"
    ;;
    
  end)
    # Find most recent session dir
    LATEST=$(ls -t .memory/archive/ | grep -E '^202' | head -1)
    
    if [ -z "$LATEST" ]; then
      echo "❌ No active session found"
      exit 1
    fi
    
    HANDOVER=".memory/archive/$LATEST/HANDOVER.md"
    
    # Verify HANDOVER.md is complete
    if grep -q "IN PROGRESS" "$HANDOVER"; then
      echo "⚠️  HANDOVER.md still shows IN PROGRESS"
      echo "Please complete it before ending session"
      exit 1
    fi
    
    # Auto-extract summary for INDEX.md
    # (Parse HANDOVER.md and update INDEX.md Archive Trail)
    
    echo "✅ Session ended: $LATEST"
    echo "📝 Review generated INDEX.md entry"
    ;;
    
  *)
    echo "Usage: scripts/session.sh {start|end} [topic]"
    exit 1
    ;;
esac
```

**Usage**:
```bash
# Agent starts
just session-start my-feature  # Creates dir, archives INDEX, stubs HANDOVER

# Agent works
# ... edit HANDOVER.md as you go ...

# Agent ends
just session-end              # Validates HANDOVER, updates INDEX
```

**Benefits**:
- Zero manual INDEX.md editing
- HANDOVER.md template provided
- Validation before session end
- Consistent format automatically

---

### Priority 3: Consolidate Documentation 📚

**Problem**: Redundancy across AGENTS.md, PROTOCOL_FIRST.md, START_HERE.md

**Solution**: Single responsibility per file

**New structure**:
```
AGENTS.md           → "Execute DASHBOARD.md NOW" (10 lines)
.memory/DASHBOARD.md → Quick start + reference (80 lines)
.memory/START_HERE.md → Deep reference (keep as-is, 180 lines)
.memory/PROTOCOL_FIRST.md → DELETE (merged into DASHBOARD)
.memory/archive/INDEX.md → Auto-generated by scripts/session.sh
```

**AGENTS.md becomes**:
```markdown
# For AI Agents

⚠️ **STOP AND READ THIS FIRST** ⚠️

1. Read `.memory/DASHBOARD.md` (takes 2 min)
2. Execute the 3 commands at top
3. Start working

That's it. No other prerequisites.

---

For detailed reference, see `.memory/START_HERE.md` after orientation.
```

**Benefits**:
- Clear file hierarchy (quick → reference → archive)
- No redundancy
- Faster onboarding
- Easier to maintain

---

### Priority 4: Create Quick Reference Card 📋

**Problem**: Common patterns scattered, agent must search

**Solution**: Consolidate in DASHBOARD.md

**Quick Reference Section**:
```markdown
## Quick Reference

### Commands
```bash
just check          # Format + typecheck + lint
just test           # All tests
pnpm test -- rgb    # Filter tests
git log --oneline -10  # Recent work
```

### File Structure
```
src/core/           # Import types/units/keywords here
src/parse/[domain]/ # CSS → IR parsers
src/generate/[domain]/ # IR → CSS generators
src/utils/          # Shared utilities
```

### Code Patterns
```typescript
// Import from core (NEVER hardcode)
import { ABSOLUTE_LENGTH_UNITS } from "@/core/units";

// Export pattern (pure KISS)
export * as Hex from "./hex";

// Tests co-located
src/parse/color/rgb.ts
src/parse/color/rgb.test.ts
```

### Common Tasks
- **Add parser**: Follow `src/parse/color/rgb.ts`, add to domain index
- **Extract duplication**: `grep -r "function"` → `src/utils/`
- **Find examples**: `grep -r "similar-pattern" .memory/archive/*/`
```

**Benefits**:
- Zero navigation time
- Copy-paste ready commands
- Pattern examples at fingertips

---

### Priority 5: Add Context Search Helper 🔍

**Problem**: Finding relevant past work is manual

**Solution**: Add `just find-context` command

**Add to justfile**:
```just
# Find relevant past work
find-context TERM:
    @echo "=== Searching session archives for: {{TERM}} ==="
    @grep -r "{{TERM}}" .memory/archive/*/HANDOVER.md .memory/archive/*/ACTION_PLAN.md 2>/dev/null | \
      sed 's|.memory/archive/||' | \
      sed 's|/HANDOVER.md:|: |' | \
      sed 's|/ACTION_PLAN.md:|: |' | \
      head -20
    @echo ""
    @echo "=== Searching code for: {{TERM}} ==="
    @rg "{{TERM}}" src/ --type ts -C 1 | head -40
```

**Usage**:
```bash
just find-context "parseAlpha"
# Shows:
# - Which sessions dealt with alpha parsing
# - Current code using parseAlpha
# - Related utilities

just find-context "gradient"
# Shows all gradient work across sessions
```

**Benefits**:
- Instant context discovery
- Learn from past sessions
- Avoid reinventing solutions

---

## Implementation Plan

### Phase 1: Immediate (5 min) ⚡
- [ ] Create DASHBOARD.md (combine PROTOCOL_FIRST + quick ref from START_HERE)
- [ ] Update AGENTS.md to just point to DASHBOARD
- [ ] Add "Quick Reference" section to DASHBOARD

**Impact**: Reduces onboarding from 5 min → 2 min

### Phase 2: Automation (15 min) 🤖
- [ ] Create `scripts/session.sh start|end`
- [ ] Add `just session-start` and `just session-end` to justfile
- [ ] Test with dummy session

**Impact**: Eliminates INDEX.md maintenance burden

### Phase 3: Refinement (10 min) ✨
- [ ] Delete PROTOCOL_FIRST.md (content in DASHBOARD)
- [ ] Add `just find-context` to justfile
- [ ] Update START_HERE.md to reference DASHBOARD for quick start

**Impact**: Cleaner docs, faster context discovery

### Phase 4: Validation (5 min) ✅
- [ ] Test full cycle: start session → work → end session
- [ ] Verify generated INDEX.md entry
- [ ] Check HANDOVER.md stub is useful

**Total time**: ~35 minutes

---

## Expected Outcomes

### Before
- 📖 Read 3 docs (288 lines)
- ⏱️ 5 minutes to orientation
- ✍️ Manual INDEX.md updates
- 🔍 Grep archives manually
- 🤔 Pattern examples scattered

### After
- 📖 Read 1 doc (80 lines)
- ⏱️ 2 minutes to orientation
- 🤖 Automated session management
- 🔍 `just find-context` for discovery
- 📋 Quick reference card

### Metrics
- **Onboarding time**: 5 min → 2 min (60% reduction)
- **Documentation reading**: 288 lines → 80 lines (72% reduction)
- **Manual steps**: 6 → 2 (67% reduction)
- **Context discovery**: manual → instant

---

## Risks & Mitigations

### Risk 1: Scripts Break
**Mitigation**: Keep manual process in DASHBOARD as fallback

### Risk 2: Agents Skip DASHBOARD
**Mitigation**: AGENTS.md hard-requires it first thing

### Risk 3: INDEX.md Auto-generation Wrong Format
**Mitigation**: Test with multiple sessions, validate against existing entries

### Risk 4: Too Much Automation = Hidden Process
**Mitigation**: Scripts are simple bash, fully transparent, can run commands manually

---

## Decision Points

**For User**:
1. Approve overall approach? (DASHBOARD + scripts + consolidation)
2. Priority order correct? (onboarding speed → automation → refinement)
3. Any concerns about auto-generated INDEX.md?
4. Want to see DASHBOARD.md draft before implementing?

---

## Next Steps

Awaiting user feedback on:
- [ ] Is this analysis useful?
- [ ] Should we implement Phase 1 now?
- [ ] Any changes to priorities?
- [ ] Draft DASHBOARD.md or start with scripts?
