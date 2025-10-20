# Memory Cleanup + Protocol Fix - Execution Plan

**Started**: 2025-10-20T11:50
**Approach**: Methodical, thorough, no rush
**Goal**: Fix memory system root causes + prepare for DRY refactoring

---

## 🎯 Execution Order

### Part 1: Memory Infrastructure (45 min)
1. Slim CONTINUE.md (150-200 lines target)
2. Create archive INDEX.md (feature map)
3. Clean root directory (move policy docs)
4. Delete redundant files (18 INDEX_ARCHIVED.md)

### Part 2: Protocol Fix (30 min)
5. Update AGENTS.md with staleness detection
6. Create verification helper script
7. Test new protocol
8. Document changes

### Part 3: Verification (15 min)
9. Run quality gates
10. Create handover documentation
11. Update CONTINUE.md with DRY refactoring as next task
12. Verify everything ready for Session 1

---

## Part 1: Memory Infrastructure

### Step 1: Slim CONTINUE.md (20 min)

**Target structure** (150-200 lines):
- Current Status (20 lines) - What's the state RIGHT NOW
- Quick Actions (30 lines) - What to do NEXT
- Quick Reference (50 lines) - Commands, patterns
- Recent Work (30 lines) - Last 3-5 sessions ONLY
- Deep Dive (20 lines) - Links to full docs
- Core Principles (30 lines) - DRY, KISS, quality gates

**Remove**:
- Lines 63-267: Obsolete "Next Priority: Clip-Path Level 2" (ALREADY DONE!)
- Lines 372-668: 17 session summaries → Keep 5 max
- Duplicate "Quick Status" sections
- Implementation details (belongs in archives)
- Meta/WIP tracking

**Add**:
- Current actual next task: DRY refactoring Session 1
- Link to clip-path-evaluation MASTER_PLAN
- Staleness warning system

### Step 2: Create Archive INDEX.md (20 min)

**Structure**:
```markdown
# Archive Index - Feature Map

## 🎯 Active Work
- **Clip-Path DRY Refactoring** → 2025-10-20-clip-path-evaluation/

## ✅ Completed Features

### Clip-Path (10 shapes, 307 tests)
- Level 1 Implementation: 2025-10-19-clip-path-shapes/
- Level 2 Implementation: 2025-10-20-clip-path-level-2/
- Evaluation & DRY Plan: 2025-10-20-clip-path-evaluation/

### Comma Parsing (3 utilities)
- Research: 2025-10-20-comma-separated-deep-research/
- Implementation: 2025-10-20-comma-utilities-implementation/

### Colors (12 formats)
- color() function: 2025-10-19-color-function/

### Animation & Transition
- World-class API: 2025-10-19-animation-world-class/

[... etc for all major features]

## 📅 By Date
- 2025-10-20: [list]
- 2025-10-19: [list]
- 2025-01-18: [list]

## 🔍 Quick Find
- "Where is X implemented?" → Search this file
- "What sessions worked on Y?" → Feature map above
```

### Step 3: Clean Root Directory (15 min)

**Move these files**:
```bash
# Policy docs → docs.internal/
.memory/PARSER_GENERATOR_POLICY.md → docs.internal/coding-standards.md

# Verification artifacts → archive
.memory/VERIFICATION_PLAN.md → .memory/archive/2025-01-18-verification/
.memory/VERIFICATION_RESULTS.md → .memory/archive/2025-01-18-verification/

# Dogfooding notes → archive or delete
.memory/DOGFOOD_SUMMARY.md → .memory/archive/2025-10-19-dogfooding/ OR DELETE
```

**Merge small files**:
```bash
# Merge RECENT_ACTIVITY_POLICY into PROTOCOL_FIRST
cat .memory/RECENT_ACTIVITY_POLICY.md >> .memory/PROTOCOL_FIRST.md
rm .memory/RECENT_ACTIVITY_POLICY.md
```

**Final root state**:
- CONTINUE.md (slimmed)
- START_HERE.md
- PROTOCOL_FIRST.md (enhanced)
- vocabulary.md
- decisions/ (ADRs)

### Step 4: Delete Redundant Files (10 min)

```bash
# Find and delete 18 INDEX_ARCHIVED.md files
find .memory/archive -name "INDEX_ARCHIVED.md" -delete

# Consolidate duplicate session directories if needed
# (Review naming inconsistencies first)
```

---

## Part 2: Protocol Fix

### Step 5: Update AGENTS.md (15 min)

**New auto-protocol**:
```markdown
## Auto-Execute Protocol (DO THIS IMMEDIATELY)

⚠️ **BEFORE responding to the user's first message**, you MUST execute this protocol:

```bash
# 1. Verify baseline (MUST PASS before any work)
just check && just test

# 2. Check recent git activity (staleness detection)
echo "=== Recent commits ==="
git log --oneline -5
echo -e "\n=== Uncommitted changes ==="
git status --short

# 3. Read continuation context
cat .memory/CONTINUE.md

# 4. Cross-check for staleness
# If latest commit is < 1 hour old:
echo -e "\n=== Checking for recent session archives ==="
find .memory/archive -type f \( -name "HANDOVER.md" -o -name "START_HERE.md" -o -name "MASTER_PLAN.md" \) -mtime -1 -exec echo "Found: {}" \;

# 5. Report status to user:
# ✅ Baseline: [pass/fail - test count]
# ⚠️ Staleness: [fresh/stale - check git vs CONTINUE.md]
# 📁 Recent work: [list any archives modified <24h]
# 🎯 Next task: [from CONTINUE.md or recent archive]
```

**Only AFTER completing these steps** should you greet the user or respond to their request.
```

### Step 6: Create Verification Script (10 min)

**File**: `.memory/scripts/verify-context.sh`

```bash
#!/bin/bash
# Context verification for agent onboarding

echo "🔍 Verifying project context..."
echo ""

# 1. Test baseline
echo "=== Baseline Tests ==="
just test > /dev/null 2>&1
if [ $? -eq 0 ]; then
  TEST_COUNT=$(just test 2>&1 | grep -o '[0-9]* passed' | head -1)
  echo "✅ All tests passing ($TEST_COUNT)"
else
  echo "❌ Tests failing - fix before continuing"
  exit 1
fi

# 2. Recent git activity
echo ""
echo "=== Recent Git Activity ==="
LATEST_COMMIT_TIME=$(git log -1 --format=%cr)
echo "Latest commit: $LATEST_COMMIT_TIME"
git log --oneline -3

# 3. CONTINUE.md freshness
echo ""
echo "=== CONTINUE.md Status ==="
CONTINUE_UPDATED=$(grep "LAST UPDATED" .memory/CONTINUE.md | cut -d: -f2- | xargs)
echo "Last updated: $CONTINUE_UPDATED"

# 4. Recent archives
echo ""
echo "=== Recent Session Archives ==="
find .memory/archive -type f \( -name "HANDOVER.md" -o -name "START_HERE.md" -o -name "MASTER_PLAN.md" \) -mtime -1 2>/dev/null | while read file; do
  DIR=$(dirname "$file")
  echo "  📁 $(basename "$DIR") - $(basename "$file")"
done

# 5. Recommendation
echo ""
echo "=== Recommendation ==="
if [ -n "$(find .memory/archive -name "MASTER_PLAN.md" -mtime -1 2>/dev/null)" ]; then
  PLAN=$(find .memory/archive -name "MASTER_PLAN.md" -mtime -1 2>/dev/null | head -1)
  echo "⚠️  Recent MASTER_PLAN found: $PLAN"
  echo "    Read this before CONTINUE.md!"
else
  echo "✅ Follow CONTINUE.md for next steps"
fi

echo ""
echo "✅ Context verification complete"
```

### Step 7: Test New Protocol (5 min)

Run through new protocol manually to verify it works.

### Step 8: Document Changes (5 min)

Update PROTOCOL_FIRST.md with new verification steps.

---

## Part 3: Verification

### Step 9: Quality Gates (5 min)

```bash
just check  # Format, lint, typecheck
just test   # All 2318 tests
```

### Step 10: Create Handover (5 min)

Document what was done, metrics, next steps.

### Step 11: Update CONTINUE.md (5 min)

Set correct next task:
- Remove all obsolete sections
- Add: Next task is DRY refactoring Session 1
- Link to clip-path-evaluation/MASTER_PLAN.md
- Update timestamp

### Step 12: Verify Ready for Session 1 (5 min)

- [ ] CONTINUE.md accurate and <200 lines
- [ ] Archive INDEX.md exists
- [ ] Root directory clean (5 files)
- [ ] AGENTS.md has staleness detection
- [ ] All tests passing
- [ ] Ready to start Session 1 of DRY refactoring

---

## Success Criteria

**Memory System**:
- ✅ CONTINUE.md < 200 lines
- ✅ Root has ≤5 files
- ✅ Archive has INDEX.md
- ✅ No INDEX_ARCHIVED duplicates

**Protocol**:
- ✅ AGENTS.md has staleness detection
- ✅ Verification script works
- ✅ Documentation updated

**Quality**:
- ✅ All tests passing
- ✅ No breaking changes
- ✅ Clear next steps

**Next Task Ready**:
- ✅ CONTINUE.md points to DRY refactoring
- ✅ MASTER_PLAN.md accessible
- ✅ Session 1 ready to start

---

## Time Estimate

- Part 1: 45 min (memory infrastructure)
- Part 2: 30 min (protocol fix)
- Part 3: 15 min (verification)
- **Total**: 90 min

---

## Let's Begin! 🚀

Starting with Part 1, Step 1: Slim CONTINUE.md...
