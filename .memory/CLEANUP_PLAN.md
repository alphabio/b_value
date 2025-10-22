# Memory System Cleanup Plan

**Date**: 2025-10-22T05:08:30Z  
**Issue**: Documentation sprawl causing confusion  
**Root Cause**: Too many overlapping status files with stale data

---

## The Problem

**Symptom**: Agent confusion about what properties are implemented
- V1_ROADMAP.md says: "73 properties, need 11 more"
- CONTINUE.md says: "79 properties"
- MASTER_PROPERTY_PLAN.md says: "71 properties"
- **REALITY**: **94 properties** ✅

**Root Causes**:
1. ❌ 10 files in .memory/ with overlapping purposes
2. ❌ Manual property counting (error-prone)
3. ❌ Multiple "roadmap" files (V1_ROADMAP + MASTER_PROPERTY_PLAN)
4. ❌ Multiple "handover" files (3 Phase 1 files!)
5. ❌ No script to get ground truth
6. ❌ Files updated independently → stale data everywhere

---

## Current File Inventory

### Core Files (KEEP)
1. ✅ **START_HERE.md** - Onboarding (timeless, rarely changes)
2. ✅ **README.md** - Directory guide (good, keep updated)
3. ✅ **vocabulary.md** - Project terminology

### Status Files (CONSOLIDATE)
4. ❌ **CONTINUE.md** - Current status (stale: says 79, actually 94)
5. ❌ **HANDOVER_2025-10-22.md** - Session handover (redundant)
6. ❌ **HANDOVER_PHASE1.md** - Phase 1 complete (redundant)
7. ❌ **SESSION_PHASE1_COMPLETE.md** - Same as #6 (redundant)
8. ❌ **SESSION_LOG.md** - Daily log (unused)

### Planning Files (CONSOLIDATE)
9. ❌ **MASTER_PROPERTY_PLAN.md** - Full 446-property roadmap (stale)
10. ❌ **V1_ROADMAP.md** - v1.0 plan (stale, overlaps with #9)
11. ❌ **PROJECT_HEALTH_AUDIT.md** - Health check (stale)

---

## The Solution: DRY + KISS

### Principle 1: Single Source of Truth
- **ONE** status file: `STATUS.md` (replaces CONTINUE.md)
- **ONE** roadmap file: `ROADMAP.md` (replaces MASTER_PROPERTY_PLAN + V1_ROADMAP)
- **ONE** script: `.memory/scripts/count-properties.sh` (no manual counts!)

### Principle 2: Automate Truth
```bash
# Property count = source of truth
.memory/scripts/count-properties.sh  # → 94 properties

# Use this in STATUS.md automatically
```

### Principle 3: Archive Aggressively
- Session complete? → Archive to `.memory/archive/YYYY-MM-DD-topic/`
- Keep `.memory/` minimal (3-5 files max)
- Handovers go to archive, NOT root

---

## New Structure (KISS)

```
.memory/
├── START_HERE.md           # New agent onboarding (timeless)
├── STATUS.md               # Current work context (updated after each session)
├── ROADMAP.md              # Property implementation plan (updated quarterly)
├── README.md               # Directory guide
├── vocabulary.md           # Terminology
├── scripts/
│   └── count-properties.sh # Source of truth for counts
├── decisions/              # ADRs (permanent)
│   └── ADR-*.md
└── archive/                # All sessions, handovers, old plans
    └── YYYY-MM-DD-topic/
        └── HANDOVER.md
```

**Total root files**: 5 (was 10)

---

## Migration Plan

### Step 1: Create Automated Property Counter ✅
- [x] `.memory/scripts/count-properties.sh`
- [x] Parses `src/universal.ts` PROPERTY_PARSERS registry
- [x] Returns: 94 properties (TRUTH)

### Step 2: Archive Redundant Files
Move to `.memory/archive/2025-10-22-cleanup/`:
- [x] HANDOVER_2025-10-22.md
- [x] HANDOVER_PHASE1.md
- [x] SESSION_PHASE1_COMPLETE.md
- [x] SESSION_LOG.md
- [x] PROJECT_HEALTH_AUDIT.md
- [x] V1_ROADMAP.md (stale)
- [x] MASTER_PROPERTY_PLAN.md (stale)

### Step 3: Create New Clean Files
- [ ] **STATUS.md** - Current work context
  - Auto-include property count from script
  - Recent commits (last 3)
  - Current focus
  - Next 3 priorities
  - Updated after each session
  
- [ ] **ROADMAP.md** - Property implementation plan
  - Organized by module (not arbitrary tiers)
  - Shows what's done vs todo
  - Updated when completing modules
  - Simple checklist format

### Step 4: Update CONTINUE.md → STATUS.md
- [ ] Rename CONTINUE.md → STATUS.md
- [ ] Simplify to 1-page format
- [ ] Add script call for accurate counts
- [ ] Remove stale Phase 1 narrative

### Step 5: Update Automation
- [ ] Add `just status` command → runs count script + shows STATUS.md
- [ ] Add property count to `just check`
- [ ] Add reminder in AGENTS.md to use script

---

## New STATUS.md Template

```markdown
# Project Status

**Last Updated**: [AUTO: date]  
**Property Count**: [AUTO: from script] CSS properties  
**Test Status**: [AUTO: from just test]  
**Branch**: [AUTO: git branch]

## Recent Work
[AUTO: last 3 commits with --oneline]

## Current Focus
[MANUAL: 1-2 sentences]

## Next Priorities
1. [MANUAL: next task]
2. [MANUAL: next task]
3. [MANUAL: next task]

## Blockers
[MANUAL: any blockers, or "None"]
```

---

## New ROADMAP.md Template

```markdown
# Property Implementation Roadmap

**Total**: [AUTO: 94] properties implemented  
**Source**: MDM CSS Properties (446 longhand properties)  
**Coverage**: [AUTO: 94/446 = 21%]

## Modules

### Animation (8/8) ✅
- [x] animation-name
- [x] animation-duration
... 

### Layout (25/50) 🔄
- [x] width
- [x] height
- [ ] gap
- [ ] grid-*
...

### Typography (5/15) 🔄
- [x] font-size
- [ ] font-style
...
```

---

## Expected Outcomes

### Before
- ❌ 10 files in .memory/
- ❌ 3 conflicting property counts (71, 73, 79 - all wrong!)
- ❌ Manual counting → always stale
- ❌ Agent confusion: "Wait, these properties exist!"
- ❌ Redundant Phase 1 files
- ❌ Overlapping roadmaps

### After
- ✅ 5 core files in .memory/
- ✅ 1 property count source of truth (94 - accurate!)
- ✅ Automated counting → always current
- ✅ Clear status file → no confusion
- ✅ Aggressive archiving → clean workspace
- ✅ Single roadmap → clear direction

### Benefits
1. **Faster onboarding** - New agents read 1 file, not 10
2. **No confusion** - One source of truth per topic
3. **Always accurate** - Automated counts
4. **Less maintenance** - Fewer files to update
5. **Better focus** - Clear current status

---

## Implementation Checklist

- [x] Create `.memory/scripts/count-properties.sh`
- [x] Verify script accuracy (94 properties ✅)
- [ ] Create `.memory/archive/2025-10-22-cleanup/`
- [ ] Move redundant files to archive
- [ ] Create new STATUS.md
- [ ] Create new ROADMAP.md (module-based)
- [ ] Update AGENTS.md auto-execute protocol
- [ ] Update README.md with new structure
- [ ] Test full workflow
- [ ] Commit cleanup

---

## Lessons Learned

1. **DRY principle applies to docs** - Don't duplicate information
2. **Automate truth** - Scripts > manual counts
3. **Archive aggressively** - Keep working dir clean
4. **KISS for status** - 1-page current state
5. **Separate timeless from temporal** - START_HERE (timeless) vs STATUS (temporal)

---

## Next Agent Instructions

1. Run `.memory/scripts/count-properties.sh` to get accurate count
2. Read `STATUS.md` for current work (not CONTINUE.md)
3. Check `ROADMAP.md` for long-term plan
4. After session: Update STATUS.md + create archive handover
5. Keep .memory/ clean - archive everything else
