# .memory/ Directory

Project memory and documentation for b_value.

## Structure

```
.memory/
├── CONTINUE.md                     # ⭐ Start here - current work context
├── START_HERE.md                   # New agent onboarding guide
├── MASTER_PROPERTY_PLAN.md         # Roadmap to 90% coverage
├── PROJECT_HEALTH_AUDIT.md         # Latest health assessment
├── SESSION_LOG.md                  # Daily work tracking
├── vocabulary.md                   # Project terminology
├── archive/                        # Historical sessions
│   ├── YYYY-MM-DD-topic/           # Organized by date + topic
│   │   ├── HANDOVER.md             # Session summary
│   │   └── ...                     # Supporting docs
│   └── INDEX.md                    # Archive catalog
└── decisions/                      # Architecture Decision Records
    ├── ADR-001-convenience-api.md
    └── ...
```

## Quick Links

**Current Work**:
- [CONTINUE.md](./CONTINUE.md) - What's happening now
- [SESSION_LOG.md](./SESSION_LOG.md) - Today's work log

**Planning**:
- [MASTER_PROPERTY_PLAN.md](./MASTER_PROPERTY_PLAN.md) - Phases 1-5 roadmap
- [PROJECT_HEALTH_AUDIT.md](./PROJECT_HEALTH_AUDIT.md) - Health metrics

**Onboarding**:
- [START_HERE.md](./START_HERE.md) - New agent guide
- [vocabulary.md](./vocabulary.md) - Terms and concepts

**History**:
- [archive/](./archive/) - Past sessions
- [decisions/](./decisions/) - ADRs

## File Guidelines

### CONTINUE.md
- **Purpose**: Current work context for picking up where we left off
- **Update**: After every session
- **Keep**: Recent commits, next steps, current status

### START_HERE.md
- **Purpose**: Timeless onboarding for new agents
- **Update**: Only when architecture/patterns change
- **Keep**: Project overview, common tasks, rules

### SESSION_LOG.md
- **Purpose**: Quick daily work journal
- **Update**: End of each session
- **Keep**: Brief bullet points, commits, archives created

### MASTER_PROPERTY_PLAN.md
- **Purpose**: Long-term roadmap to 90% coverage
- **Update**: When completing phases or adjusting plan
- **Keep**: Phase details, property lists, effort estimates

### Archive Organization
- Create folder: `.memory/archive/YYYY-MM-DD-topic/`
- Main file: `HANDOVER.md` (comprehensive session notes)
- Supporting: Additional files as needed
- Update: `archive/INDEX.md` catalog

## Maintenance

**Keep Clean**:
- Archive completed work promptly
- Update CONTINUE.md after each session
- Keep START_HERE.md timeless (no dates/status)
- Log daily work in SESSION_LOG.md

**Archive When**:
- Session completes
- Major milestone reached
- Switching focus areas
- Documentation becomes stale

**Don't Archive**:
- Current roadmap (MASTER_PROPERTY_PLAN.md)
- Health audit (if still relevant)
- ADRs (keep in decisions/)
- Vocabulary (keep at root)
