# Continuation Workflow Analysis

**Date**: 2025-10-19  
**Focus**: Agent continuation workflow (99% use case)

---

## The Real Workflow

```
Agent A starts session
    ↓
Agent A does work, commits
    ↓
Agent A runs out of gas
    ↓
Agent A offboards: updates state for next agent, commits
    ↓
Agent B continues (← THIS IS WHAT WE OPTIMIZE)
    ↓
Agent B does work, commits
    ↓
Agent B runs out of gas
    ↓
... cycle repeats
```

**Critical insight**: Agent B needs to know what Agent A did and what's left to do. Fast.

---

## Current Continuation Flow

### What Agent B Must Do Now

1. **Execute protocol** (`.memory/PROTOCOL_FIRST.md`)
   - Create session dir: `mkdir -p .memory/archive/$(date +%Y-%m-%d)-[topic]/`
   - Archive INDEX: `cp .memory/archive/INDEX.md .memory/archive/$(date +%Y-%m-%d)-[topic]/`
   - Baseline: `just check && just test`

2. **Find context** (manual navigation)
   - Read `.memory/archive/INDEX.md` to find last session
   - Open that session's directory
   - Read `HANDOVER.md` to understand what was done
   - Check for partial work (TODOs, in-progress files)

3. **Orient to codebase** (if needed)
   - Read `.memory/START_HERE.md` for patterns
   - Grep for similar code
   - Check git log for recent changes

4. **Start working**

**Time**: 3-5 minutes if everything goes smoothly

### Pain Points

❌ **Two separate session dirs** - Agent A's work is in their dir, Agent B creates new dir  
❌ **Context scattered** - Must read INDEX.md → navigate to last session → read HANDOVER  
❌ **No "continue here" marker** - Agent B must infer what's next  
❌ **Unclear if session is complete** - HANDOVER might say "DONE" but have "Next Steps"  
❌ **No quick status** - Must read full HANDOVER to know if work is mid-task

---

## What Agent A Should Leave Behind

### Critical Information (in priority order)

1. **Status**: Complete? Partial? Blocked?
2. **What was done**: Concrete list of changes
3. **What's next**: Specific actionable items
4. **Context**: Why certain decisions were made
5. **Gotchas**: Things that tripped them up

### Current State (HANDOVER.md format)

```markdown
# Session: date-topic

**Status**: ✅ COMPLETE / ⚠️ PARTIAL / 🚫 BLOCKED
**Tests**: X passing (+Y new)
**Duration**: ~X minutes

## What Was Done
- Implemented X
- Fixed Y
- Refactored Z

## Changes Made
- src/file1.ts
- src/file2.ts

## Quality Gates
- [x] just check
- [x] just test

## Next Steps
- Continue with A
- Then do B
```

**This format is excellent** - it has everything Agent B needs.

**The problem**: Agent B must navigate to find it.

---

## Proposed Solution: Continuation-First Design

### Core Idea

**Make continuation effortless by bringing context to Agent B instead of making Agent B hunt for it.**

### Design Principles

1. **Single point of entry** - One file tells Agent B everything
2. **Last session always visible** - No navigation required
3. **Continuation status explicit** - "Ready to continue" vs "Complete"
4. **Quick reference inline** - Common commands right there
5. **Session continuity** - Continue in same dir OR clear handoff

---

## Option A: Continuation File at Root

### Add: `.memory/CONTINUE.md` (auto-generated)

**Auto-updated by Agent A at session end**

```markdown
# Continue From Here

**Last Session**: 2025-10-19-phase5-filters  
**Agent**: Claude  
**Status**: ⚠️ PARTIAL - In Progress  
**Last Update**: 2025-10-19T08:30:00Z

---

## Quick Status

Working on: Session 4 of Phase 5 (URL filter + master Filter API)  
Completed: 3/4 sessions (10/11 filters done)  
Tests: 994 passing  
Next: Implement url filter parser + master Filter.parse()

---

## What Was Done Last

Session 3 (2025-10-19-session-12):
- ✅ Implemented url filter (basic cases)
- ✅ Added 18 tests
- ⚠️ Edge cases TODO (data URIs, special chars)

---

## Continue Work

**Option 1: Continue in same session dir**
```bash
cd .memory/archive/2025-10-19-phase5-filters/
# Work here, update HANDOVER.md as you go
```

**Option 2: Start new session for new feature**
```bash
just session-start [topic]  # Creates new session
```

---

## Quick Commands

```bash
just check           # Format + typecheck + lint
just test            # All tests  
pnpm test -- url     # Filter tests for current work
git log -10 --oneline  # Recent commits
```

---

## Full Context

See: `.memory/archive/2025-10-19-phase5-filters/HANDOVER.md`

For project patterns: `.memory/START_HERE.md`
```

### How It Works

**Agent A offboarding**:
```bash
# At end of session
just offboard

# This script:
# 1. Validates HANDOVER.md is updated
# 2. Generates .memory/CONTINUE.md from HANDOVER
# 3. Updates INDEX.md archive trail
# 4. Git commit with summary
```

**Agent B onboarding**:
```bash
# Agent B reads AGENTS.md: "Read .memory/CONTINUE.md first"
cat .memory/CONTINUE.md

# Immediately knows:
# - What's in progress
# - Where last agent stopped
# - What to do next
# - How to run commands

# Then:
just check && just test  # Verify baseline
# Start working in existing session OR create new one
```

### Benefits

✅ **Zero navigation** - Context is at root  
✅ **Instant status** - See "PARTIAL" or "COMPLETE" immediately  
✅ **Clear continuation** - "Continue in same dir" vs "Start new"  
✅ **Quick reference** - Commands right there  
✅ **Auto-generated** - No manual maintenance  

### Trade-offs

⚠️ **Another file** - But it's THE file for continuation  
⚠️ **Automation dependency** - Need `just offboard` to work  
⚠️ **Duplication risk** - Must stay in sync with HANDOVER.md  

---

## Option B: Enhanced INDEX.md at Root

### Modify: `.memory/archive/INDEX.md`

**Move it to root** as `.memory/CONTINUE.md` and enhance:

```markdown
# Continue From Here

**Last Session**: 2025-10-19-session-12  
**Status**: ⚠️ PARTIAL  
**Recommendation**: Continue URL filter + master API

---

## Immediate Actions

1. Verify baseline: `just check && just test`
2. Read context: `.memory/archive/2025-10-19-session-12/HANDOVER.md`
3. Continue work OR start new session

---

## Quick Status

**Active Phase**: Phase 5 - Filter Functions (Session 4/4)  
**Progress**: 10/11 filters complete  
**Tests**: 994 passing  
**Last Work**: URL filter basics done, edge cases pending

---

## Quick Reference

```bash
# Quality gates
just check           # Format + typecheck + lint
just test            # All tests

# Testing
pnpm test -- url     # Filter by pattern

# Context
git log -10 --oneline              # Recent work
just find-context "parseAlpha"     # Search archives
```

---

## Recent Sessions (Archive Trail)

### 2025-10-19 Session 12: URL Filter Basics ⚠️ PARTIAL
- **Progress**: Implemented url filter parser (18 tests)
- **Pending**: Edge cases (data URIs, special chars, emoji)
- **Next**: Complete edge cases + master Filter API
- **Details**: `.memory/archive/2025-10-19-session-12/HANDOVER.md`

### 2025-10-19 Session 11: Drop-Shadow Filter ✅ COMPLETE
- **Progress**: Implemented drop-shadow filter (39 tests)
- **Outcome**: 10/11 filters done
- **Details**: `.memory/archive/2025-10-19-session-11/HANDOVER.md`

(More sessions below...)

---

## For Deep Reference

- **Project patterns**: `.memory/START_HERE.md`
- **Session protocol**: `.memory/PROTOCOL.md`
- **Full archive**: `.memory/archive/`
```

### How It Works

**Same offboarding**:
```bash
just offboard  # Generates enhanced INDEX/CONTINUE hybrid
```

**Agent B onboarding**:
```bash
cat .memory/CONTINUE.md  # Everything in one file
just check && just test  # Baseline
# Start working
```

### Benefits

✅ **Single file** - Not INDEX.md + CONTINUE.md  
✅ **Zero navigation** - All info at root  
✅ **Quick reference built-in** - Commands + patterns  
✅ **Archive trail visible** - Context without clicking  

### Trade-offs

⚠️ **Longer file** - But structured with headers  
⚠️ **More to maintain** - Auto-generation more complex  

---

## Option C: Minimal - Just Fix INDEX.md Location

### Simple change: Move INDEX.md to root

**Current**: `.memory/archive/INDEX.md` (hidden in subdirectory)  
**Proposed**: `.memory/INDEX.md` (visible at top level)

**Agent B flow**:
```bash
# AGENTS.md says: "Read .memory/INDEX.md"
cat .memory/INDEX.md

# INDEX.md top section:
**Last Session**: 2025-10-19-session-12
**Status**: ⚠️ PARTIAL
**Next**: Complete URL filter edge cases

Read: .memory/archive/2025-10-19-session-12/HANDOVER.md

# Agent goes directly to HANDOVER
```

### Benefits

✅ **Minimal change** - Just move one file  
✅ **Existing format** - Keep current INDEX.md structure  
✅ **Clear path** - INDEX → HANDOVER, two clicks  

### Trade-offs

⚠️ **Still navigation** - Must open second file  
⚠️ **No quick reference** - Commands not inline  
⚠️ **Less scannable** - Archive trail is list, not summary  

---

## Recommendation

### Implement Option B: Enhanced CONTINUE.md

**Why:**
1. **Optimizes continuation** (the 99% case)
2. **Single file** - No hunting
3. **Quick reference inline** - Commands ready to copy
4. **Auto-generated** - Via `just offboard`
5. **Clear status** - PARTIAL vs COMPLETE upfront

**Structure:**
```
.memory/
├── CONTINUE.md          ← Agent B starts HERE (replaces INDEX.md)
├── START_HERE.md        ← Deep reference (unchanged)
├── PROTOCOL.md          ← Session protocol (simplified)
└── archive/
    └── YYYY-MM-DD-topic/
        └── HANDOVER.md  ← Full session details
```

**Implementation:**
```bash
# scripts/offboard.sh
# 1. Validate HANDOVER.md complete
# 2. Extract summary from HANDOVER
# 3. Generate CONTINUE.md with:
#    - Last session status
#    - Quick summary
#    - Quick reference commands
#    - Recent sessions (top 5)
# 4. Archive old CONTINUE.md to session dir
# 5. Git commit
```

---

## Implementation Plan

### Phase 1: Script (10 min)
- [ ] Create `scripts/offboard.sh`
- [ ] Parse HANDOVER.md → extract summary
- [ ] Generate CONTINUE.md template
- [ ] Add `just offboard` to justfile

### Phase 2: Templates (5 min)
- [ ] Create CONTINUE.md template
- [ ] Add quick reference section
- [ ] Add archive trail format

### Phase 3: Migration (5 min)
- [ ] Generate CONTINUE.md from current INDEX.md
- [ ] Update AGENTS.md to point to CONTINUE.md
- [ ] Test with current state

### Phase 4: Validation (5 min)
- [ ] Manually trigger offboard
- [ ] Verify CONTINUE.md generated correctly
- [ ] Check quick reference works

**Total: 25 minutes**

---

## Expected Impact

### Before (Current)
```
Agent B arrives
↓ Read AGENTS.md "execute PROTOCOL_FIRST"
↓ Read PROTOCOL_FIRST.md (54 lines)
↓ Run 3 commands
↓ Read START_HERE.md "check INDEX for last session"
↓ Open .memory/archive/INDEX.md
↓ Find last session name
↓ Open .memory/archive/2025-10-19-session-12/HANDOVER.md
↓ Read HANDOVER to understand status
↓ Start working
Total: 4-5 minutes, 5 files
```

### After (Option B)
```
Agent B arrives
↓ Read AGENTS.md "read CONTINUE.md"
↓ Read .memory/CONTINUE.md
  - See status: PARTIAL
  - See what's done
  - See what's next
  - See commands to run
↓ Run: just check && just test
↓ Start working
Total: 2 minutes, 2 files
```

**Time saved**: 60% (5 min → 2 min)  
**Files reduced**: 60% (5 files → 2 files)  
**Context clarity**: Immediate vs hunt-and-find

---

## Decision Points

1. **Approve Option B** (Enhanced CONTINUE.md)?
2. **Start with manual CONTINUE.md** before scripting?
3. **Keep INDEX.md** in archive as backup?
4. **Quick reference content** - what commands are essential?

---

## Next Steps

Awaiting approval to:
- [ ] Create CONTINUE.md from current INDEX.md
- [ ] Add quick reference section
- [ ] Update AGENTS.md to use CONTINUE.md
- [ ] (Later) Script the auto-generation
