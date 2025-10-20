# AGENTS.md Protocol Fix

**Issue**: Agent missed recent work because CONTINUE.md was stale
**Root Cause**: Auto-protocol doesn't verify git state vs CONTINUE.md claims
**Impact**: Wasted 15 minutes onboarding to wrong context

---

## Current Auto-Protocol (BROKEN)

```bash
# 1. Verify baseline (MUST PASS before any work)
just check && just test

# 2. Read continuation context
cat .memory/CONTINUE.md
cat .memory/archive/2025-10-19-intro-session/HANDOVER.md

# 3. Report status to user
```

**Problem**: Assumes CONTINUE.md is up-to-date. It wasn't!

---

## Fixed Auto-Protocol (TRUSTWORTHY)

```bash
# 1. Verify baseline (MUST PASS before any work)
just check && just test

# 2. Verify git state (detect staleness)
git log --oneline -5
git status

# 3. Read continuation context
cat .memory/CONTINUE.md

# 4. Cross-check: Does CONTINUE.md match git log?
# - If git shows recent commits NOT mentioned in CONTINUE.md → WARN USER
# - If git shows commits from <1 hour ago → CHECK session archive
# - If CONTINUE.md references completed work as "NEXT" → STALE

# 5. If recent archive exists, read it
# Look for .memory/archive/*/ with timestamps <1 day old
# Read their HANDOVER.md or START_HERE.md

# 6. Report status to user
# - Baseline status (pass/fail)
# - CONTINUE.md status (fresh/stale)
# - Recent session found (yes/no + path)
# - Recommended starting point
```

---

## Proposed AGENTS.md Update

Replace lines 3-17 with:

```markdown
⚠️ **BEFORE responding to the user's first message**, you MUST execute this protocol:

```bash
# 1. Verify baseline (MUST PASS before any work)
just check && just test

# 2. Check recent git activity
git log --oneline --since="24 hours ago"
git status

# 3. Read CONTINUE.md
cat .memory/CONTINUE.md

# 4. Cross-check for staleness
# If git log shows commits from <1 hour ago:
# - Find related session archive (by timestamp/topic)
# - Read its HANDOVER.md or START_HERE.md
# - Compare with CONTINUE.md status

# 5. Report to user:
# ✅ Baseline: [pass/fail]
# ✅ CONTINUE.md: [fresh/stale]
# ✅ Recent session: [none / path + status]
# ✅ Recommended next: [from CONTINUE or from session archive]
```

**Only AFTER completing these steps** should you greet the user or respond to their request.
```

---

## Implementation: Smart Staleness Detection

```bash
# Enhanced protocol script idea
#!/bin/bash

# 1. Get CONTINUE.md last update
CONTINUE_TIMESTAMP=$(grep "LAST UPDATED" .memory/CONTINUE.md | cut -d: -f2-)

# 2. Get latest commit timestamp
LATEST_COMMIT=$(git log -1 --format=%cd --date=iso)

# 3. Find recent archives
RECENT_ARCHIVES=$(find .memory/archive -name "HANDOVER.md" -mtime -1)

# 4. Decision tree
if [ recent commit < 1 hour ago ] && [ recent archive exists ]; then
  echo "⚠️ STALE CONTINUE.md detected!"
  echo "Recent work: $(git log -1 --oneline)"
  echo "Archive: $RECENT_ARCHIVES"
  echo "Recommendation: Read archive HANDOVER.md first"
else
  echo "✅ CONTINUE.md appears current"
fi
```

---

## Why This Matters

**Without git cross-check**:
- Agent trusts CONTINUE.md blindly
- Misses recent session planning/evaluation
- Starts wrong task
- Wastes 15+ minutes

**With git cross-check**:
- Agent detects recent activity
- Reads latest session archive
- Starts correct task
- Saves time, builds momentum

---

## Action Items

1. Update AGENTS.md with enhanced protocol
2. Create `.memory/verify-context.sh` helper script
3. Update CONTINUE.md to mark itself as stale if >24h old
4. Add timestamp checks to `just offboard` command

---

## For This Session

**Correct next task**: 
```bash
# Start DRY refactoring Session 1
cat .memory/archive/2025-10-20-clip-path-evaluation/SESSION_1.md
mkdir -p .memory/archive/$(date +%Y-%m-%d)-clip-path-dry-session-1/
# Follow SESSION_1.md step-by-step
```

NOT "choose next CSS property" as CONTINUE.md claimed.
