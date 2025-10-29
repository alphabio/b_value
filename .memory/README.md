# .memory/ Directory

**Purpose**: Persistent context for LLM agents working on b_value.

**For Agents**: See `AGENTS.md` (repo root) for protocols and workflows.

---

## 📁 Structure

```
.memory/
├── HANDOVER.md             # Current session + outstanding work
├── ROADMAP.md              # Scratch pad for future ideas
├── README.md               # This guide
├── decisions/              # Architecture Decision Records (ADRs)
│   ├── README.md
│   └── ADR-*.md
├── archive/                # Historical sessions
│   └── YYYY-MM-DD-HHMM-topic/
│       └── HANDOVER.md
└── scripts/                # Automation tools
    └── count-properties.sh
```

## 🗂️ Related Directories

```
docs.internal/
├── design/                 # Long-lived design documents & audits
│   ├── border-audit.md
│   ├── border-design-philosophy.md
│   ├── enum-test-notes.md
│   └── layout-module-audit.md
└── plans/                  # Expansion plans & strategies
    └── dual-test-expansion-plan.md
```

---

## 🔍 Quick Reference

| What | Where |
|------|-------|
| Current task & status | `HANDOVER.md` |
| Future ideas (scratch pad) | `ROADMAP.md` |
| Historical sessions | `archive/YYYY-MM-DD-HHMM-topic/` |
| Architecture decisions | `decisions/ADR-*.md` |
| Design documents | `docs.internal/design/` |
| Expansion plans | `docs.internal/plans/` |
| Property counter | `scripts/count-properties.sh` |

---

## 🎓 Key Principles

**Never archive**:
- `decisions/` - ADRs are permanent
- `scripts/` - Automation tools
- Core files: HANDOVER.md, ROADMAP.md, README.md

**Long-lived docs** → `docs.internal/design/` or `docs.internal/plans/`

**Session artifacts** → `archive/YYYY-MM-DD-HHMM-topic/`

---

**Last Updated**: 2025-10-29
**See Also**: `AGENTS.md` for protocols and workflows
