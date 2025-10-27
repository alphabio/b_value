## ⚡ Auto-Execute Protocol (OPTIMIZED - 30 seconds)

⚠️ **BEFORE responding to the user**, run this ONE command:

```bash
cd /Users/alphab/Dev/LLM/DEV/b_value && \
just test 2>&1 | tail -3 && \
# echo "" && echo "📊 Coverage:" && \
# pnpm test:coverage 2>&1 | grep "Coverage for" && \
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
- ❌ Read STATUS.md (too long, use SESSION_NEXT.md)
- ❌ Check git history (not needed)
- ❌ Search for archives (not needed)
- ❌ Run coverage more than once at start

**📚 First Session or Need Structure Info?**:
- 📖 Read `.memory/README.md` - explains directory structure, session protocols, ADRs, and archive rules
- Essential for understanding where things live and how to properly archive work

**💡 Git Commits**:
- `.memory/` files are ignored by biome → always use `git commit --no-verify` for documentation changes
- Or just commit source code separately from `.memory/` changes

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

**Read**: `.memory/STATUS.md` for current status and `.memory/ROADMAP.md` for long-term plan.

---

## Key References

- **`.memory/README.md`** - Directory structure, session protocols, ADR process (READ THIS FIRST!)
- **`.memory/SESSION_NEXT.md`** - Current task (auto-loaded by protocol)
- **`.memory/STATUS.md`** - Current state, recent work, next priorities
- **`.memory/ROADMAP.md`** - Module-based property breakdown (94 implemented, 352 remaining)
- **`.memory/scripts/count-properties.sh`** - Automated property counter (source of truth)

---
