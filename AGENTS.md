## ⚡ Auto-Execute Protocol (Session Start)

⚠️ **BEFORE responding to the user**, run these commands:

```bash
# 1. Run tests and read current HANDOVER
cd /Users/alphab/Dev/LLM/DEV/b_value && \
just test 2>&1 | tail -3 && \
echo "" && echo "📁 Branch: $(git branch --show-current)" && \
echo "" && cat .memory/HANDOVER.md
```

```bash
# 2. Archive current HANDOVER and create new one
SESSION_DIR=".memory/archive/$(date +%Y-%m-%d-%H%M)-[topic]"
mkdir -p "$SESSION_DIR"
mv .memory/HANDOVER.md "$SESSION_DIR/HANDOVER.md"

# 3. Create new HANDOVER with link back
cat > .memory/HANDOVER.md << EOF
# Session Handover: [Topic]

**Date**: $(date +%Y-%m-%d)
**Time**: $(date +%H:%M)
**Agent**: [your-name]
**Previous**: \`$SESSION_DIR/HANDOVER.md\`

---

## 📊 Project Status (Snapshot at Start)
- **Coverage**: [check current]
- **Branch**: $(git branch --show-current)
- **Tests**: [count] passing / [count] total
- **Properties**: [implemented] / 446 total

---

## 🎯 Goal
[What you're working on - copy from previous if continuing]

## ✅ Completed This Session
[Update as you work]

## 🚧 In Progress
[Track incomplete work]

## 🔧 Patterns & Learnings
[Document gotchas, tips, useful patterns]

## 🎯 Next Agent: Pick Up Here
[Clear handoff instructions]

## 📚 Related Documents
- See \`docs.internal/design/\` for design docs
- See \`docs.internal/plans/\` for expansion plans
- See \`.memory/ROADMAP.md\` for long-term strategy
EOF
```

**Report to user**:
- ✅ Tests: [count] passing
- 🎯 Continuing: [topic from previous HANDOVER]
- 📁 Archived: [session directory]

**Then immediately start working** on the task from HANDOVER.md.

**DO NOT**:
- ❌ Check git history (not needed)
- ❌ Search for archives (not needed)
- ❌ Run coverage more than once at start

**📚 First Session or Need Context?**:
- Read `.memory/HANDOVER.md` - **START HERE** - current task, status, next steps
- Read `.memory/ROADMAP.md` - long-term strategy (living document, not historical)
- Read `docs.internal/design/` - design documents and audits
- Read `docs.internal/plans/` - expansion plans
- Read `.memory/README.md` - directory structure, protocols, ADRs

**💡 Git Commits**:
- `.memory/` files are ignored by biome → always use `git commit --no-verify` for documentation changes
- Or just commit source code separately from `.memory/` changes
- **ALWAYS run `just check` before committing** - runs format, lint, and typecheck
  - Catches type errors, formatting issues, and lint problems
  - Should be run after any code changes (not needed for `.memory/` docs only)

---

## 📝 Session End Protocol

**When finishing a session**, update the current `.memory/HANDOVER.md`:

### Update HANDOVER.md

Fill in all sections (HANDOVER is immutable once archived, can be >300 lines):

```markdown
## 📊 Project Status (Snapshot at Start)
- **Coverage**: 72.5% → 74.2% (+1.7%)  ← Update with deltas
- **Branch**: develop
- **Tests**: 847 passing / 847 total ✅
- **Properties**: 94 implemented / 446 total (21%)
- **Last Commit**: abc123f "Add blend-mode enum tests"

## ✅ Completed This Session
- List everything accomplished
- Be specific: files changed, tests added, patterns established

## 🚧 In Progress
- Document incomplete work clearly
- Next agent should be able to pick up immediately

## 🔧 Patterns & Learnings
- Document gotchas, tips, useful patterns
- This is CRITICAL - saves next agent time

## 🎯 Next Agent: Pick Up Here
- Clear, actionable next steps
- Commands to run
- Files to check
- Estimated time for tasks

## 📚 Related Documents
- Link to relevant docs.internal/ files
- Link to ROADMAP.md if priorities changed
```

### Two Command Types

#### `HANDOVER` - Archive & Document (Always Safe)
Use when ending ANY session (complete or incomplete):

```bash
# Just update .memory/HANDOVER.md with latest status
# Next agent will archive it when they start
# No need to run checks or commit
```

#### `CLEAN` - Prepare for Commit (Optional)
Only when task is **complete** and ready to commit:

```bash
# 1. Run all checks
just check  # format, lint, typecheck

# 2. Verify tests
just test

# 3. Check git state
git status

# 4. Commit code (separate from .memory/ docs)
git add src/ test/
git commit -m "feat: add blend-mode enum tests"

# 5. Commit documentation (use --no-verify)
git add .memory/ docs.internal/
git commit --no-verify -m "docs: update handover and design docs"
```

### Archive Organization

```
.memory/archive/2025-10-29-1702-enums/
├── HANDOVER.md          ← Your session (archived by next agent)
├── [scripts].sh         ← Session-specific tools (optional)
└── [data].json          ← Session-specific data (optional)
```

---

## 📚 Document Organization

### Session Management
- **`.memory/HANDOVER.md`** - Current session status, task, next steps - **START HERE**
- **`.memory/archive/`** - Historical handovers (one per session)
- **`.memory/README.md`** - Directory structure, session protocols, ADR process

### Strategy & Planning
- **`.memory/ROADMAP.md`** - Living document, scratch pad for future work (not historical)
- **`docs.internal/design/`** - Long-lived design documents and audits
  - `border-audit.md`, `border-design-philosophy.md`
  - `enum-test-notes.md`, `layout-module-audit.md`
- **`docs.internal/plans/`** - Expansion plans and strategies
  - `dual-test-expansion-plan.md`
- **`.memory/decisions/`** - ADRs (Architecture Decision Records)

### Tools
- **`.memory/scripts/count-properties.sh`** - Automated property counter (source of truth)

---

### ROADMAP.md Format

**Purpose**: Living document, not historical. Scratch pad for future work.

```markdown
# Roadmap: Property Implementation

**Last Updated**: 2025-10-29
**Current Coverage**: 74.2%

---

## 🚀 Active Track: [Current Focus]

### Next Up (This Week)
- [ ] Specific tasks with estimates
- [ ] Clear deliverables

### Blockers/Notes
- Document dependencies or blockers
- Link to relevant design docs

---

## 📦 Upcoming Modules (Priority Order)

1. **Module Name** (est. X sessions)
   - Brief scope, link to design doc if exists

2. **Next Module** (est. X sessions)
   - Brief scope

---

## 🔍 Long-term

- High-level future work
- Cross-project coordination needs

---

**See Also:**
- `docs.internal/design/` - Design docs & audits
- `docs.internal/plans/` - Expansion plans
- `.memory/archive/` - Historical sessions
```

**Update ROADMAP when**:
- Completing a major module
- Shifting priorities
- Adding new modules to the plan

**Do NOT**:
- ❌ Record historical progress (use HANDOVER for that)
- ❌ Track daily tasks (use HANDOVER for that)
- ❌ Bloat with completed work (archive that)

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
