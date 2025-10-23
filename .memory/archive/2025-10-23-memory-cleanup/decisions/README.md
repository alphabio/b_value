# Architectural Decisions Record (ADR)

**DATE**: 2025-10-19
**STATUS**: Active
**VERSION**: 1.1.0

---

## Purpose

This document records all major architectural decisions made for b_value to ensure consistency and provide context for future development.

---

## Executive Summary

b_value is a CSS value parser/generator library extracted from b_gee. These ADRs document key design decisions as we build a standalone, reusable foundation that will eventually replace b_gee's internal parsing logic.

### Key Decisions

1. **Progressive Disclosure API** - Provide both simple auto-detecting functions and expert-level granular control

---

## Quick Reference

| ADR | Title | Status | Category | Priority | Date |
|-----|-------|--------|----------|----------|------|
| [ADR-001](./ADR-001-convenience-api.md) | Convenience API Layer | ✅ Approved | API Design | High | 2025-10-19 |

---

## Status Legend

- ✅ **Approved** - Active decision, implemented or ready to implement
- 📋 **Proposed** - Under review, ready for implementation approval
- 🔮 **Deferred** - Acknowledged but not currently needed
- ⚠️ **Superseded** - Replaced by a newer decision

---

## Context: b_value Extraction Journey

### The Origin Story

b_value was **extracted FROM b_gee**, not the other way around:

```
1. ✅ b_gee built FIRST (production, 1585 tests)
2. 🔄 b_value being EXTRACTED (in progress)
3. ⏭️ b_gee will be GUTTED to use b_value (future)
```

### The Ecosystem

```
b_short (shorthand expansion)
    ↓
b_value (value parsing) ← WE ARE HERE
    ↓
b_gee (stylesheet IR)
    ↓
Studio (visual editor)
```

This context is crucial for understanding why certain decisions are made. b_value must be:
- **Feature complete** - Match everything b_gee needs
- **Migration friendly** - Make b_gee's transition smooth
- **Production ready** - Same quality standards as b_gee
- **Standalone useful** - Support independent users too

---

## Contributing

When adding a new ADR:

1. Create a new file: `ADR-{next-number}.md`
2. Follow the existing template structure
3. Update this README with a new entry in Quick Reference table
4. Link from relevant documentation
5. Consider the b_gee migration impact

### ADR Template

```markdown
# ADR-XXX: [Title]

**Status**: [✅ Approved | 📋 Proposed | 🔮 Deferred | ⚠️ Superseded]
**Date**: YYYY-MM-DD
**Deciders**: [Who made the decision]
**Category**: [API Design | Architecture | Testing | Performance]
**Priority**: [High | Medium | Low]

## Context and Problem Statement
[Describe the context and problem]

## Decision Drivers
[Key factors influencing the decision]

## Considered Options
[List all options considered]

## Decision
[The actual decision made]

## Consequences
[What are the positive and negative outcomes]

## References
[Links to related documents]
```

---
