## ⚡ Auto-Execute Protocol (OPTIMIZED - 30 seconds)

⚠️ **BEFORE responding to the user**, run this ONE command:

```bash
cd /Users/alphab/Dev/LLM/DEV/b_value && \
just test 2>&1 | tail -3 && \
echo "" && echo "📁 Branch: $(git branch --show-current)" && \
echo "" && echo "🎯 NEXT TASK:" && \
cat .memory/SESSION_NEXT.md
```

**Report to user**:
- ✅ Tests: [count] passing
<!-- - 📊 Coverage: [XX.XX]% -->
- 🎯 Next: [from SESSION_NEXT.md first line]

**Then immediately start working** on the task in SESSION_NEXT.md.

**DO NOT**:
- ❌ Check git history (not needed)
- ❌ Search for archives (not needed)
- ❌ Run coverage more than once at start

**📚 First Session or Need Context?**:
- Read `.memory/README.md` - directory structure, protocols, ADRs
- Read `.memory/STATUS.md` - current state, recent work
- Read `.memory/ROADMAP.md` - long-term property plan
- Otherwise: **SESSION_NEXT.md has everything you need**

**💡 Git Commits**:
- `.memory/` files are ignored by biome → always use `git commit --no-verify` for documentation changes
- Or just commit source code separately from `.memory/` changes
- **ALWAYS run `just check` before committing** - runs format, lint, and typecheck
  - Catches type errors, formatting issues, and lint problems
  - Should be run after any code changes (not needed for `.memory/` docs only)

---

## 📝 Session End Protocol

**When finishing a session**, create a HANDOVER in the archive:

```bash
# 1. Create archive directory
SESSION_DIR=".memory/archive/$(date +%Y-%m-%d)-[topic]"
mkdir -p "$SESSION_DIR"

# 2. Create HANDOVER.md
cat > "$SESSION_DIR/HANDOVER.md" << 'EOF'
# Session Summary: [Topic]

**Date**: $(date +%Y-%m-%d)
**Duration**: [X hours]

## 📊 Metrics
- **Coverage**: [start%] → [end%] (+[diff%])
- **Tests**: +[count] tests across [N] files
- **Commits**: [count] commits
- **Test Suites**: [passing/total]

## ✅ Work Completed
1. **[Category 1]** ([N] files, [M] tests)
   - file1.test.ts, file2.test.ts

2. **[Category 2]** ([N] files, [M] tests)
   - file3.test.ts, file4.test.ts

## 🎯 Next Session Setup
- ✅ SESSION_NEXT.md updated with specific task
- ✅ All tests passing
- ✅ All checks passing
- ✅ Branch: [name]
- ✅ Commits: Clean and ready

## 🔧 Patterns/Learnings
- [Any useful patterns discovered]
- [Any gotchas or tips]

EOF
```

**Update SESSION_NEXT.md** with clear task for next agent:
- Current coverage percentage
- Specific next goal (e.g., "reach 75% with clip-path tests")
- List of candidate files to test
- Commands to find more work
- Example test patterns if needed
- Keep file to **less than 300 lines** (critical to avoid CLI issues)

**Archive organization**:

```
.memory/archive/2025-10-23-coverage-boost/
├── HANDOVER.md          ← Your session summary
├── [any-scripts].sh     ← Session-specific tools
├── [any-data].json      ← Session-specific data
└── [notes].md           ← Additional notes
```

---

## 📚 Key References

- **`.memory/SESSION_NEXT.md`** - Current task (auto-loaded) - **START HERE**
- **`.memory/README.md`** - Directory structure, session protocols, ADR process
- **`.memory/STATUS.md`** - Current state, recent work, next priorities
- **`.memory/ROADMAP.md`** - Module-based property breakdown (94 implemented, 352 remaining)
- **`.memory/scripts/count-properties.sh`** - Automated property counter (source of truth)

---

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
