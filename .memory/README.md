# .memory/ Directory

**Purpose**: Persistent context for LLM agents working on b_value.

## 🎯 For Agents

**Primary workflow** (automated via `AGENTS.md`):
1. Auto-load `SESSION_NEXT.md` - what to do NOW
2. Reference `STATUS.md` - current state snapshot
3. Reference `ROADMAP.md` - long-term property plan
4. Check `archive/` - historical context when needed

## 📁 Structure

```
.memory/
├── SESSION_NEXT.md        # Current task (auto-loaded by AGENTS.md)
├── STATUS.md              # Current state snapshot
├── ROADMAP.md             # Long-term property implementation plan
├── README.md              # This guide
├── decisions/             # Architecture Decision Records (ADRs)
│   ├── README.md          # ADR guide & template
│   └── ADR-*.md           # Individual decisions
├── archive/               # Historical sessions & completed work
│   ├── README.md          # Archive guide
│   ├── INDEX.md           # Archive catalog
│   └── YYYY-MM-DD-topic/  # Session folders with HANDOVER.md
└── scripts/               # Automation tools
    └── count-properties.sh
```

## 📝 Session End Protocol

See `AGENTS.md` for full protocol. TL;DR:
1. Create `archive/YYYY-MM-DD-topic/HANDOVER.md`
2. Update `SESSION_NEXT.md` for next agent
3. Done - root stays clean

## 🔍 Finding Information

- **What to do now**: `SESSION_NEXT.md` (auto-loaded)
- **Current state**: `STATUS.md`
- **Long-term plan**: `ROADMAP.md`
- **Past work**: `archive/INDEX.md` or `archive/YYYY-MM-DD-topic/HANDOVER.md`
- **Architecture decisions**: `decisions/` (ADRs - permanent, never archive)
- **Property count**: `scripts/count-properties.sh`
- **New Test Generation Instruction**: `scripts/parse-test-generator/README.md` (slightly out of date - leaving here as a reminder to self and to agent -- we need to regroup before adding any new tests)

## 🎓 Key Principles

**Keep root minimal** - Archive session work, preserve permanent docs.

**Never archive**:
- `decisions/` - ADRs are permanent architectural records
- `scripts/` - Automation tools
- Core files: SESSION_NEXT.md, STATUS.md, ROADMAP.md, README.md

**Always archive** (after session):
- Session-specific plans and docs → `archive/YYYY-MM-DD-topic/`
- Completed work summaries → `archive/YYYY-MM-DD-topic/HANDOVER.md`

## 📝 Architecture Decision Records (ADRs)

When making **architectural decisions** (API design, major patterns, breaking changes):

1. Create `decisions/ADR-{next-number}-{topic}.md`
2. Follow template in `decisions/README.md`
3. Update `decisions/README.md` quick reference table
4. ADRs are **permanent** - never archive them
5. Superseded ADRs stay but marked with ⚠️ status

**Current ADRs**: 4 (see `decisions/README.md`)

---

**Last Updated**: 2025-10-27
**See Also**: `AGENTS.md` (in repo root) for agent instructions
