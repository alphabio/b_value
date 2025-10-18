# Phase 4: Color Implementation - Master Plan

**Status**: Session 3 Complete ✅ - Ready for Session 4
**Current Session**: Session 4 (HWB Colors)
**Tests**: 410 current (258 baseline + 60 s1 + 50 s2 + 42 s3) → 648 target

---

## Quick Start

**First time here?**
1. Run: `just check && just test` (verify baseline)
2. Read: Session 1 plan below
3. Create: `mkdir -p .memory/archive/$(date +%Y-%m-%d)-session-1/`
4. Start: Follow Session 1 tasks

**Returning agent?**
1. Check progress table below
2. Read previous session's HANDOVER.md
3. Read your session plan
4. Continue from there

---

## Progress Tracker

| Session | Status | Tests | Date | Agent | Handover |
|---------|--------|-------|------|-------|----------|
| 1. Hex & Named | ✅ DONE | 60/40 | 2025-01-18 | Claude | [HANDOVER.md](../../2025-01-18-session-1/HANDOVER.md) |
| 2. RGB | ✅ DONE | 50/50 | 2025-01-18 | Claude | [HANDOVER.md](../../2025-01-18-session-2/HANDOVER.md) |
| 3. HSL | ✅ DONE | 42/40 | 2025-01-18 | Claude | [HANDOVER.md](../../2025-01-18-session-3/HANDOVER.md) |
| 4. HWB | ⚪ TODO | 0/30 | - | - | - |
| 5. LAB & LCH | ⚪ TODO | 0/80 | - | - | - |
| 6. OKLab & OKLCH | ⚪ TODO | 0/80 | - | - | - |
| 7. System Colors | ⚪ TODO | 0/30 | - | - | - |
| 8. Master Parser | ⚪ TODO | 0/40 | - | - | - |

**Status Legend**: ⚪ TODO | 🔵 IN PROGRESS | ✅ DONE | ⚠️ BLOCKED

---

## Session Overview

### Session 1: Hex & Named Colors
**Time**: 60-90 min | **Tests**: +40 | **Complexity**: LOW
**File**: [session-1.md](./session-1.md)

Create base color infrastructure and implement simplest formats.

**Deliverables**:
- `src/core/types/color.ts` - Base types
- `src/parse/color/hex.ts` - Hex parser
- `src/parse/color/named.ts` - Named parser
- `src/generate/color/hex.ts` - Hex generator
- `src/generate/color/named.ts` - Named generator
- 40+ tests with 100% round-trip

---

### Session 2: RGB Colors
**Time**: 60-90 min | **Tests**: +50 | **Complexity**: MEDIUM
**File**: [session-2.md](./session-2.md)

Implement RGB with all syntax variations and alpha channel.

**Deliverables**:
- `src/parse/color/rgb.ts` - RGB parser (comma, space, alpha)
- `src/generate/color/rgb.ts` - RGB generator
- 50+ tests covering all variations

---

### Session 3: HSL Colors
**Time**: 60-90 min | **Tests**: +40 | **Complexity**: MEDIUM
**File**: [session-3.md](./session-3.md)

Implement HSL with angle units and alpha.

**Deliverables**:
- `src/parse/color/hsl.ts` - HSL parser
- `src/generate/color/hsl.ts` - HSL generator
- 40+ tests with angle variations

---

### Session 4: HWB Colors
**Time**: 45-60 min | **Tests**: +30 | **Complexity**: LOW-MEDIUM
**File**: [session-4.md](./session-4.md)

Implement HWB color format.

**Deliverables**:
- `src/parse/color/hwb.ts` - HWB parser
- `src/generate/color/hwb.ts` - HWB generator
- 30+ tests

---

### Session 5: LAB & LCH Colors
**Time**: 90-120 min | **Tests**: +80 | **Complexity**: HIGH
**File**: [session-5.md](./session-5.md)

Implement LAB and LCH color spaces.

**Deliverables**:
- `src/parse/color/lab.ts` - LAB parser
- `src/parse/color/lch.ts` - LCH parser
- Generators for both
- 80+ tests with value range validation

---

### Session 6: OKLab & OKLCH Colors
**Time**: 90-120 min | **Tests**: +80 | **Complexity**: HIGH
**File**: [session-6.md](./session-6.md)

Implement OKLab and OKLCH color spaces.

**Deliverables**:
- `src/parse/color/oklab.ts` - OKLab parser
- `src/parse/color/oklch.ts` - OKLCH parser
- Generators for both
- 80+ tests with different value ranges

---

### Session 7: System & Special Colors
**Time**: 60-90 min | **Tests**: +30 | **Complexity**: LOW
**File**: [session-7.md](./session-7.md)

Implement system colors, transparent, currentcolor.

**Deliverables**:
- `src/parse/color/system.ts` - System color parser
- `src/parse/color/special.ts` - Special keywords
- Generators
- 30+ tests

---

### Session 8: Master Parser & Integration
**Time**: 90-120 min | **Tests**: +40 | **Complexity**: HIGH
**File**: [session-8.md](./session-8.md)

Create unified color parser and integrate with gradients.

**Deliverables**:
- `src/parse/color/index.ts` - Master parser with dispatch
- `src/generate/color/index.ts` - Master generator
- Update gradient integration
- 40+ integration tests

---

## Handover Template

After each session, create `HANDOVER.md` in your session archive:

```markdown
# Session N Handover

**Status**: ✅ DONE / ⚠️ PARTIAL / ❌ BLOCKED
**Tests**: X passing (Y new)
**Duration**: X minutes

## Completed
- [x] Task 1
- [x] Task 2

## Next Session
Agent should start with: [brief description]

## Blockers
[None / List any issues]

## Notes
[Key decisions or tricky parts]
```

---

## Quality Gates (Every Session)

**Before handover, all must pass**:

```bash
just check  # Format, lint, types
just test   # All tests passing
```

**Commit message format**:

```
feat(colors): Session N - [topic]

- [what you did]
- X new tests
```

---

## Rules

1. **One session at a time** - Don't jump ahead
2. **All tests must pass** - No exceptions
3. **Update progress table** - Mark your session ✅
4. **Create handover doc** - Next agent needs it
5. **Stay in scope** - Resist feature creep

---

## Need Help?

- Check existing gradient parsers for patterns
- Look at test files for examples
- Previous session's HANDOVER.md has context
- When stuck, ask - don't guess

---

**Ready?** Start with [Session 1](./session-1.md)
