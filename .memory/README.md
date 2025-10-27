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
- **Architecture decisions**: Check archives for ADRs
- **Property count**: `scripts/count-properties.sh`

## 🎓 Key Principle

**Keep root minimal** (3 files + 2 dirs). Archive everything else.

---

**Last Updated**: 2025-10-27
**See Also**: `AGENTS.md` (in repo root) for agent instructions
