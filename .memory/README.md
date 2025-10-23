# .memory/ Directory

Project memory and documentation for b_value.

## Structure (UPDATED 2025-10-22)

```
.memory/
├── STATUS.md                       # ⭐ START HERE - current work context
├── ROADMAP.md                      # Property implementation plan
├── START_HERE.md                   # New agent onboarding guide
├── README.md                       # This file
├── vocabulary.md                   # Project terminology
├── scripts/
│   └── count-properties.sh         # Automated property counter (source of truth)
├── archive/                        # Historical sessions & old files
│   ├── YYYY-MM-DD-topic/           # Organized by date + topic
│   │   ├── HANDOVER.md             # Session summary
│   │   └── ...                     # Supporting docs
│   └── INDEX.md                    # Archive catalog (optional)
└── decisions/                      # Architecture Decision Records
    ├── ADR-001-convenience-api.md
    └── ...
```

**Total**: 5 root files (was 10) - DRY + KISS applied

## Quick Links

**Start Here**:
- [STATUS.md](./STATUS.md) - Current work, recent commits, next priorities
- [ROADMAP.md](./ROADMAP.md) - Module-based property plan (94 implemented)

**Onboarding**:
- [START_HERE.md](./START_HERE.md) - New agent guide
- [vocabulary.md](./vocabulary.md) - Terms and concepts

**Tools**:
- [scripts/count-properties.sh](./scripts/count-properties.sh) - Accurate property count

**History**:
- [archive/](./archive/) - Past sessions and archived files
- [decisions/](./decisions/) - ADRs

## File Guidelines

### STATUS.md (NEW - replaces CONTINUE.md)
- **Purpose**: Current work context - what's happening NOW
- **Update**: After every session (keep it 1 page)
- **Contains**: Property count (auto), recent commits, current focus, next 3 priorities
- **Format**: Single page, scannable

### ROADMAP.md (NEW - replaces MASTER_PROPERTY_PLAN + V1_ROADMAP)
- **Purpose**: Long-term property implementation plan
- **Update**: When completing modules or adjusting priorities
- **Contains**: 94 properties organized by module, completion status, next phases
- **Format**: Module-based with checkboxes

### START_HERE.md
- **Purpose**: Timeless onboarding for new agents
- **Update**: Only when architecture/patterns change
- **Keep**: Project overview, common tasks, rules

### scripts/count-properties.sh (NEW)
- **Purpose**: Single source of truth for property count
- **Usage**: `.memory/scripts/count-properties.sh` → "94 CSS properties"
- **Impact**: No more manual counting → always accurate

### Archive Organization
- Create folder: `.memory/archive/YYYY-MM-DD-topic/`
- Main file: `HANDOVER.md` (comprehensive session notes)
- Move: Session artifacts, old status files, completed plans
- Keep: .memory/ root minimal (5-6 files ideal)

## Maintenance Rules

**Keep Clean** (DRY + KISS):
- ✅ ONE status file: STATUS.md
- ✅ ONE roadmap file: ROADMAP.md
- ✅ Archive session work immediately
- ✅ Use scripts for counts (don't manually count)
- ✅ Keep .memory/ root under 6 files

**Update After Each Session**:
1. Update STATUS.md (current focus, next priorities)
2. Update ROADMAP.md (if module completed)
3. Create archive handover: `.memory/archive/YYYY-MM-DD-topic/HANDOVER.md`
4. Archive any temporary files

**Archive When**:
- Session completes
- Major milestone reached
- File becomes stale or redundant
- Switching focus areas

**NEVER Archive**:
- STATUS.md (always keep current version)
- ROADMAP.md (keep current plan)
- START_HERE.md (timeless onboarding)
- vocabulary.md (living glossary)
- scripts/ (permanent tools)
- decisions/ (permanent ADRs)

## Cleanup (2025-10-22)

**Problem**: 10 overlapping files with conflicting data
**Solution**: Consolidated to 5 focused files + automated counting
**Result**: 40% fewer files, 100% accuracy, zero confusion

See: [archive/2025-10-22-cleanup/HANDOVER.md](./archive/2025-10-22-cleanup/HANDOVER.md)
