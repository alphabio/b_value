## 🚧 WIP: Testing new continuation workflow

⚠️ **BEFORE READING ANYTHING ELSE** ⚠️

**Read**: `.memory/CONTINUE.md` (takes 2 min)

Then execute the 3 commands at the top.

That's it. Everything you need is in CONTINUE.md.

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
