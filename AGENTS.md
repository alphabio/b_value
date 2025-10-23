## ⚡ Auto-Execute Protocol (OPTIMIZED - 30 seconds)

⚠️ **BEFORE responding to the user**, run this ONE command:

```bash
cd /Users/alphab/Dev/LLM/DEV/b_value && \
just test 2>&1 | tail -3 && \
echo "" && echo "📊 Coverage:" && \
pnpm test:coverage 2>&1 | grep "Coverage for" && \
echo "" && echo "📁 Branch: $(git branch --show-current)" && \
echo "" && echo "🎯 NEXT TASK:" && \
cat .memory/SESSION_NEXT.md
```

**Report to user**:
- ✅ Tests: [count] passing
- 📊 Coverage: [XX.XX]%
- 🎯 Next: [from SESSION_NEXT.md first line]

**Then immediately start working** on the task in SESSION_NEXT.md.

**DO NOT**:
- ❌ Read STATUS.md (too long, use SESSION_NEXT.md)
- ❌ Check git history (not needed)
- ❌ Search for archives (not needed)
- ❌ Run coverage more than once at start

---

**Read**: `.memory/STATUS.md` for current status and `.memory/ROADMAP.md` for long-term plan.

---

---

## Key References

- **`.memory/STATUS.md`** - Current state, recent work, next priorities
- **`.memory/ROADMAP.md`** - Module-based property breakdown (94 implemented, 352 remaining)
- **`.memory/scripts/count-properties.sh`** - Automated property counter (source of truth)

---

## For New Agents (Old Protocol - Backup)

<details>
<summary>Click if CONTINUE.md doesn't work</summary>

If you did not execute `.memory/PROTOCOL_FIRST.md` yet, STOP and do it now.

**Session Protocol (from PROTOCOL_FIRST.md):**

```bash
# 1. Create session directory FIRST
mkdir -p .memory/archive/$(date +%Y-%m-%d)-[topic]/

# 2. Archive INDEX.md
cp .memory/archive/INDEX.md .memory/archive/$(date +%Y-%m-%d)-[topic]/INDEX_ARCHIVED.md

# 3. Verify baseline
just check && just test
```

Put ALL session artifacts in this directory from the start. This includes:
- Proposals and planning documents
- Implementation notes
- Scripts and utilities
- Data files
- Session-specific documentation

**Working process:**
- Run `just check` after changes (format + typecheck + lint)
- Run `just test` regularly to verify correctness
- Commit work frequently with clear messages
- Everything must be green before final commit
- Create HANDOVER.md at session end with outcomes

**Quality gates:**

```bash
just check   # Format, typecheck, lint (must pass)
just test    # All tests (must pass)
```

</details>
