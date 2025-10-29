## ⚡ Auto-Execute Protocol (Session Start)

⚠️ **BEFORE responding to the user**, run this command:

```bash
# Run tests and read current HANDOVER (READ ONLY - no archiving)
cd /Users/alphab/Dev/LLM/DEV/b_value && \
just check 2>&1 | tail -3 && \
just test 2>&1 | tail -3 && \
echo "" && echo "📁 Branch: $(git branch --show-current)" && \
echo "" && cat .memory/HANDOVER.md
```

**Report to user**:
- ✅ Tests: [count] passing
- 🎯 Current task: [from HANDOVER Goal section]
- 📊 Status: [from Project Status section]

**Then start working** on the task from HANDOVER.md.

**DO NOT**:
- ❌ Archive HANDOVER automatically (user command only)
- ❌ Check git history (not needed)
- ❌ Search for archives (not needed)
- ❌ Run coverage more than once at start

**📚 First Session or Need Context?**:
- Read `.memory/HANDOVER.md` - **START HERE** - current task, status, outstanding work
- Read `.memory/README.md` - directory structure, protocols, ADRs
- FOR REFERENCE IF YOU NEED:
  - Read `.memory/ROADMAP.md` - scratch pad for future ideas (not historical)
  - Read `docs.internal/design/` - design documents and audits
  - Read `docs.internal/plans/` - expansion plans

**💡 Git Commits**:
- `.memory/` files are ignored by biome → always use `git commit --no-verify` for documentation changes
- Or just commit source code separately from `.memory/` changes
- **ALWAYS run `just check` before committing** - runs format, lint, and typecheck
  - Catches type errors, formatting issues, and lint problems
  - Should be run after any code changes (not needed for `.memory/` docs only)

---

## 📝 User Commands (Agent Never Auto-Executes)

### HANDOVER - Archive & Create New Session

**When**: User says "Let's handover" or "Ready to handover"

**What**: Archive current HANDOVER and create new one with link back

```bash
# 1. Read current HANDOVER to extract "Outstanding Work" section
cat .memory/HANDOVER.md

# 2. Archive current HANDOVER
TOPIC="[brief-topic-name]"  # e.g., "enum-cleanup" or "protocol-redesign"
SESSION_DIR=".memory/archive/$(date +%Y-%m-%d-%H%M)-${TOPIC}"
mkdir -p "$SESSION_DIR"
mv .memory/HANDOVER.md "$SESSION_DIR/HANDOVER.md"
echo "📁 Archived to: $SESSION_DIR"

# 3. Create new HANDOVER (fill in real values)
cat > .memory/HANDOVER.md << 'EOF'
# Session Handover: [Topic Name]

**Date**: YYYY-MM-DD
**Time**: HH:MM
**Agent**: [your-name]
**Previous**: `[SESSION_DIR from step 2]/HANDOVER.md`

---

## 📊 Project Status (Snapshot at Start)
- **Coverage**: [%] (check with: just test-coverage)
- **Branch**: [git branch]
- **Tests**: [count] passing / [total] total
- **Properties**: [count] / 446 total ([%]%)

---

## 🎯 Goal
[What you're working on]

## ✅ Completed This Session
[Update as you work - be specific]

## 🚧 In Progress
[Track incomplete work]

## 📋 Outstanding Work (Carry Forward)

**CRITICAL**: Copy "Outstanding Work" section from previous HANDOVER and update.

### 🔥 Active Tasks
[Current priorities]

### 🎯 High Priority
[High priority backlog]

### 📦 Module Candidates
[Future modules to consider]

---

## 🎯 Next Agent: Pick Up Here
[Clear, actionable instructions]
[Commands to run]
[Estimated time]

---

## 🔧 Patterns & Learnings
[Document gotchas, tips, useful patterns - saves next agent time]

---

## 📚 Related Documents
- `docs.internal/design/` - Design docs
- `docs.internal/plans/` - Expansion plans
- `.memory/ROADMAP.md` - Scratch pad for ideas

---

## 🐛 Known Issues
[Any blockers or problems]

---

**Ready for Next Session**: [Status summary]
EOF

cat .memory/HANDOVER.md
```

**Template Instructions**:
- Fill in real values (dates, counts, branch name)
- Copy "Outstanding Work" from archived HANDOVER
- Update sections as you work throughout the session
- HANDOVER can be >300 lines (it's immutable once archived)

---

### CLEAN - Organize Documentation

**When**: User says "Let's clean" or "Clean up docs"

**What**: Move orphaned docs from `.memory/` to proper homes

```bash
# 1. List potential orphans in .memory/
ls -la .memory/*.md | grep -v "HANDOVER\|ROADMAP\|README"

# 2. Review each file and categorize:

# Design docs (long-lived) → docs.internal/design/
mv .memory/SOME_DESIGN_DOC.md docs.internal/design/
echo "Moved to docs.internal/design/"

# Plans (long-lived) → docs.internal/plans/
mv .memory/SOME_PLAN.md docs.internal/plans/
echo "Moved to docs.internal/plans/"

# Session artifacts → archive with current HANDOVER
# (Use most recent archive dir)
LATEST_ARCHIVE=$(ls -t .memory/archive/ | head -1)
mv .memory/session-script.sh .memory/archive/$LATEST_ARCHIVE/
echo "Moved to archive: $LATEST_ARCHIVE"

# Obsolete docs → delete or archive
mv .memory/OLD_DOC.md .memory/archive/$LATEST_ARCHIVE/
echo "Archived obsolete doc"

# 3. Verify cleanup
ls -la .memory/*.md
echo "✅ Documentation organized"
```

**Note**: CLEAN is optional. Only run when docs need organizing. Git commits are your responsibility.

---

## 📝 Session End Protocol

**When finishing a session**, update current `.memory/HANDOVER.md`:

### Fill In All Sections

HANDOVER is immutable once archived, so make it comprehensive (>300 lines OK):

```markdown
## 📊 Project Status (Snapshot at Start)
- **Coverage**: 72.5% → 74.2% (+1.7%)  ← Show deltas
- **Branch**: develop
- **Tests**: 847 passing / 847 total ✅
- **Properties**: 94 implemented / 446 total (21%)
- **Last Commit**: abc123f "Add blend-mode enum tests"

## ✅ Completed This Session
- List everything accomplished
- Be specific: files changed, tests added, patterns established
- Include metrics (coverage change, test count, commits)

## 🚧 In Progress
- Document incomplete work clearly
- Next agent should be able to pick up immediately

## 📋 Outstanding Work (Carry Forward)
- Update this section for next session
- Remove completed items
- Add new priorities discovered during work

## 🔧 Patterns & Learnings
- Document gotchas, tips, useful patterns
- This is CRITICAL - saves next agent time
- Include code snippets if helpful

## 🎯 Next Agent: Pick Up Here
- Clear, actionable next steps
- Commands to run
- Files to check
- Estimated time for tasks
```

---

## 📚 Document Organization

### Session Management
- **`.memory/HANDOVER.md`** - Current session: status, task, outstanding work - **START HERE**
- **`.memory/archive/`** - Historical handovers (one per session)
- **`.memory/README.md`** - Directory structure, session protocols, ADR process

### Strategy & Planning
- **`.memory/ROADMAP.md`** - Living scratch pad for future work (not historical)
- **`docs.internal/design/`** - Long-lived design documents and audits
  - `border-audit.md`, `border-design-philosophy.md`
  - `enum-test-notes.md`, `layout-module-audit.md`
- **`docs.internal/plans/`** - Expansion plans and strategies
  - `dual-test-expansion-plan.md`
- **`.memory/decisions/`** - ADRs (Architecture Decision Records)

### Tools
- **`.memory/scripts/count-properties.sh`** - Automated property counter (source of truth)

---

## 🗺️ ROADMAP.md Guidelines

**Purpose**: Lightweight scratch pad for future ideas and deferred decisions.

**Not for**: Status tracking, historical records, or comprehensive property lists.

### What to Add
- 💡 Future ideas spotted during work
- 🔖 Deferred decisions ("revisit this pattern later")
- 🎯 Module candidates without full detail
- 📝 Quick notes from sessions

### When to Update
- Add notes during sessions as ideas emerge
- Clean up every 5-10 sessions (archive stale notes)
- Keep it lightweight and living

### Format

```markdown
## 💡 Future Ideas & Deferred Decisions
- Quick notes on refactoring opportunities
- DX improvements to consider

## 🔖 Session Notes (Scratch Pad)
- (YYYY-MM-DD) Pattern discovered
- (YYYY-MM-DD) Idea for future work

## 🎯 Module Ideas
- Just capturing possibilities (no priority order)
```

---

## 🚫 Shorthand Properties - Out of Scope

**CRITICAL**: This project (`b_value`) handles **LONGHAND properties ONLY**.

**Shorthand properties are handled by a separate project**: [`b_short`](https://github.com/alphabio/b_short)

**Examples**:
- ✅ `border-left-width` (longhand) → supported in b_value
- ✅ `border-top-color` (longhand) → supported in b_value
- ✅ `border-bottom-left-radius` (longhand) → supported in b_value
- ❌ `border` (shorthand) → NOT in b_value, use b_short
- ❌ `margin` (shorthand) → NOT in b_value, use b_short
- ❌ `transition` (shorthand) → NOT in b_value, use b_short

**Why the separation?**
- Shorthand expansion is complex (different rules per property)
- b_short focuses on shorthand → longhand expansion
- b_value focuses on value parsing/normalization for longhands
- Clean separation of concerns

**When planning modules**: Skip shorthand properties in test plans and roadmaps.
