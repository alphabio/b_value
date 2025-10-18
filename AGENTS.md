
Start here: ./.memory/START_HERE.md (20 secs read)

Then read the code - it's self-documenting.

## For New Agents

**Every session starts the same way** (even for proposals/planning):

```bash
mkdir -p .memory/archive/$(date +%Y-%m-%d)-[topic]/
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
- Update START_HERE.md at session end with outcomes and next steps

**Quality gates:**

```bash
just check   # Format, typecheck, lint (must pass)
just test    # All tests (must pass)
```
