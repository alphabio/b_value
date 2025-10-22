## Auto-Execute Protocol (DO THIS IMMEDIATELY)

⚠️ **BEFORE responding to the user's first message**, you MUST execute this protocol:

```bash
# 1. Verify baseline (MUST PASS before any work)
just check && just test

# 2. Check recent git activity (staleness detection)
echo "=== Recent commits (last 24h) ==="
git log --oneline --since="24 hours ago"
echo ""
echo "=== Uncommitted changes ==="
git status --short

# 3. Find recent session work (if any)
echo ""
echo "=== Recent session archives (<24h) ==="
find .memory/archive -type f \( -name "HANDOVER.md" -o -name "START_HERE.md" -o -name "MASTER_PLAN.md" \) -mtime -1 2>/dev/null | head -5

# 4. Read current status
cat .memory/STATUS.md

# 5. Get accurate property count
.memory/scripts/count-properties.sh

# 6. Report status to user:
# ✅ Baseline: [pass/fail - test count]
# 📊 Properties: [count from script]
# 📁 Recent work: [list archives found in step 3]
# 🎯 Next task: [from STATUS.md "What's Next"]
```

**Only AFTER completing these steps** should you greet the user or respond to their request.

**If recent archives found**: Read them to understand the latest completed work.

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
