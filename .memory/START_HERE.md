# b_typescript_template

```yaml
version: 0.1.0
date: 2025-10-18
tests: 61 passing (100%)
coverage: High
status: production-ready
```

## Recent Activity

- 2025-10-18: Comprehensive audit completed (Score: 8.5/10)

## Context

TypeScript library template with modern tooling (tsup, Biome, Vitest, pnpm).
Code is self-documenting with comprehensive JSDoc comments.

Recent sessions:
- `archive/2025-10-18-audit/` - Full template audit

## For New Agents

**Every session starts the same way** (even for proposals/planning):

```bash
mkdir -p ./.memory/archive/$(date +%Y-%m-%d)-[topic]/
```

Put ALL session artifacts in this directory from the start. This includes:
- Proposals and planning documents
- Implementation notes
- **Debug/transformation/adhoc scripts** - execute you scripts from the archive dir
- Data files and test artifacts
- Session-specific documentation

**Important**: Do NOT cleanup debug/adhoc scripts. Leave them for posterity and learning.

**Working process:**
- Run `just check` after changes (format + typecheck + lint)
- Run `just test` regularly to verify correctness
- Commit work frequently with clear messages
- Everything must be green before final commit
- Update START_HERE.md at session end with outcomes and next steps

**Quality gates:**

```bash
just check   # Format, typecheck, lint (must pass)
just test    # 1672 tests (must all pass)
```
