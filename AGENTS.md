# Agent Protocol v2.0

**Multi-agent session management with immutable knowledge transfer**

---

## ⚡ Session Start Protocol (Auto-Execute)

**BEFORE responding to user**, execute these 4 steps:

### Step 1: Run Tests & Read HANDOVER

```bash
cd /Users/alphab/Dev/LLM/DEV/b_value && \
just check 2>&1 | tail -3 && \
just test 2>&1 | tail -3 && \
echo "" && echo "📁 Branch: $(git branch --show-current)" && \
echo "" && cat .memory/HANDOVER.md
```

### Step 2: Archive Current HANDOVER
**HANDOVERs are immutable** - archive at session start:

```bash
TOPIC="session"  # Or extract from "# Session Handover: [Topic]"
SESSION_DIR=".memory/archive/$(date +%Y-%m-%d-%H%M)-${TOPIC}"
mkdir -p "$SESSION_DIR"
mv .memory/HANDOVER.md "$SESSION_DIR/HANDOVER.md"
echo "📁 Archived to: $SESSION_DIR"
```

### Step 3: Create New HANDOVER

```bash
cat > .memory/HANDOVER.md << 'HANDOVER_EOF'
# Session Handover: [Topic Name]

**Date**: 2025-10-29
**Time**: 20:14
**Agent**: Claude
**Previous**: `[SESSION_DIR from step 2]/HANDOVER.md`

---

## 📊 Project Status (Snapshot at Start)
- **Coverage**: [%]
- **Branch**: develop
- **Tests**: [count] passing / [total] total
- **Properties**: 94 / 446 total (21%)

---

## 🎯 Goal
[Extract from previous HANDOVER "Next Agent" section]

## ✅ Completed This Session
[Update as you work]

## 🚧 In Progress
[Track incomplete work]

## 📋 Outstanding Work (Carry Forward)
**Copy from archived HANDOVER and update**

### 🔥 Active Tasks
### 🎯 High Priority
### 📦 Module Candidates

---

## 🎯 Next Agent: Pick Up Here
[Clear, actionable instructions]

## 🔧 Patterns & Learnings
[Critical knowledge transfer - saves next agent time]

## 📚 Related Documents
- `docs.internal/design/` - Design docs
- `docs.internal/plans/` - Expansion plans
- `.memory/ROADMAP.md` - Scratch pad

## 🐛 Known Issues
[Any blockers]

---

**Ready for Next Session**: [Status]
HANDOVER_EOF
```

**Fill in**: Real dates, counts, branch. Copy "Outstanding Work" from archived HANDOVER.

### Step 4: Report to User
- ✅ Tests: [count] passing
- 🎯 Current task: [from archived HANDOVER]
- 📊 Status: [from Project Status]
- 📁 Archived: [SESSION_DIR]

**Then start working on the task.**

---

## 📝 User Commands

### `HANDOVER` - Knowledge Transfer Preparation

**When**: User says "Let's handover" (context running low)

**Purpose**: Update current HANDOVER.md with comprehensive knowledge transfer for next agent

**What to update**:
1. **✅ Completed This Session**
   - Files changed, tests added, patterns established
   - Include metrics (coverage Δ, test count, commits)

2. **📋 Outstanding Work**
   - Remove completed items
   - Add newly discovered tasks
   - Reorder by priority

3. **🔧 Patterns & Learnings** ← CRITICAL
   - Document gotchas and solutions
   - Include code snippets
   - Explain "why" decisions were made
   - Save next agent debugging time

4. **🎯 Next Agent: Pick Up Here**
   - Specific, actionable steps
   - Commands to run
   - Files to check
   - Time estimates

5. **🐛 Known Issues**
   - Document blockers/problems

**Note**:
- Does NOT archive (happens automatically at next session start)
- Update `.memory/HANDOVER.md` in place
- Make it comprehensive (>300 lines OK - it becomes immutable when archived)
- Think: detailed briefing document

---

### `CLEAN` - Organize Documentation

**When**: User says "Let's clean"

**What**: Move orphaned docs from `.memory/` to proper homes

```bash
# List orphans
ls -la .memory/*.md | grep -v "HANDOVER\|ROADMAP\|README"

# Categorize and move:
mv .memory/design-doc.md docs.internal/design/      # Long-lived design docs
mv .memory/plan-doc.md docs.internal/plans/         # Long-lived plans
mv .memory/session-file.sh .memory/archive/latest/ # Session artifacts
mv .memory/old-doc.md .memory/archive/latest/       # Obsolete docs
```

---

## 📚 Document Organization

### Session Management
- **`.memory/HANDOVER.md`** - Current session (fresh each session, archived at next start)
- **`.memory/archive/`** - Immutable historical handovers (one per session)
- **`.memory/README.md`** - Directory structure, protocols, ADRs

### Strategy & Planning
- **`.memory/ROADMAP.md`** - Living scratch pad (not historical)
- **`docs.internal/design/`** - Design docs & audits
- **`docs.internal/plans/`** - Expansion plans
- **`.memory/decisions/`** - ADRs

### Tools
- **`.memory/scripts/count-properties.sh`** - Property counter (source of truth)

---

## 🗺️ ROADMAP.md Guidelines

**Purpose**: Lightweight scratch pad for future ideas

**Add**:
- 💡 Future ideas spotted during work
- 🔖 Deferred decisions
- 🎯 Module candidates (no detail)
- 📝 Quick session notes

**Update**: Add notes as ideas emerge. Clean up every 5-10 sessions.

---

## 💡 Git Commits

- `.memory/` files ignored by biome → use `git commit --no-verify` for docs
- Or commit source code separately from `.memory/` changes
- **ALWAYS run `just check` before committing code** (format, lint, typecheck)

---

## 🚫 Project Scope

**CRITICAL**: This project (`b_value`) handles **LONGHAND properties ONLY**

**Shorthand properties** → separate project: [`b_short`](https://github.com/alphabio/b_short)

**Examples**:
- ✅ `border-left-width`, `border-top-color` (longhand) → b_value
- ❌ `border`, `margin`, `transition` (shorthand) → b_short

**Why separated?**
- Shorthand expansion is complex (different rules per property)
- b_short: shorthand → longhand expansion
- b_value: value parsing/normalization for longhands
- Clean separation of concerns

**When planning**: Skip shorthand properties in test plans and roadmaps.

---

## 📖 First Session / Need Context?

1. **Read `.memory/HANDOVER.md`** - START HERE (current task, status, outstanding work)
2. **Read `.memory/README.md`** - Directory structure, protocols, ADRs

**For reference if needed**:
- `.memory/ROADMAP.md` - Future ideas scratch pad
- `docs.internal/design/` - Design documents and audits
- `docs.internal/plans/` - Expansion plans

---

**Protocol Version**: 2.0 (2025-10-29)
