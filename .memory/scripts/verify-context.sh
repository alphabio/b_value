#!/bin/bash
# b_path:: .memory/scripts/verify-context.sh
# Context verification for agent onboarding
# Detects stale CONTINUE.md and guides to recent work

set -e

echo "🔍 b_value Context Verification"
echo "================================"
echo ""

# 1. Test baseline
echo "📊 Baseline Tests"
echo "-----------------"
if just test > /tmp/test_output.txt 2>&1; then
  TEST_COUNT=$(grep -o '[0-9]* passed' /tmp/test_output.txt | head -1 | cut -d' ' -f1)
  echo "✅ All tests passing ($TEST_COUNT tests)"
else
  echo "❌ Tests failing - fix before continuing!"
  cat /tmp/test_output.txt
  exit 1
fi
echo ""

# 2. Recent git activity
echo "📝 Recent Git Activity"
echo "----------------------"
LATEST_COMMIT_TIME=$(git log -1 --format=%cr 2>/dev/null || echo "unknown")
LATEST_COMMIT_DATE=$(git log -1 --format=%cd --date=iso 2>/dev/null || echo "unknown")
echo "Latest commit: $LATEST_COMMIT_TIME"
echo ""
git log --oneline -3 2>/dev/null || echo "No git history"
echo ""

# 3. CONTINUE.md freshness
echo "📄 CONTINUE.md Status"
echo "---------------------"
if [ -f .memory/CONTINUE.md ]; then
  CONTINUE_UPDATED=$(grep "LAST UPDATED" .memory/CONTINUE.md | cut -d: -f2- | xargs 2>/dev/null || echo "unknown")
  echo "Last updated: $CONTINUE_UPDATED"
  
  # Simple staleness check: if updated today, likely fresh
  TODAY=$(date +%Y-%m-%d)
  if echo "$CONTINUE_UPDATED" | grep -q "$TODAY"; then
    echo "Status: ✅ Updated today (likely fresh)"
  else
    echo "Status: ⚠️  NOT updated today (may be stale)"
  fi
else
  echo "❌ CONTINUE.md not found!"
fi
echo ""

# 4. Recent archives (last 24 hours)
echo "📁 Recent Session Archives"
echo "--------------------------"
RECENT_PLANS=$(find .memory/archive -name "MASTER_PLAN.md" -mtime -1 2>/dev/null)
RECENT_HANDOVERS=$(find .memory/archive -name "HANDOVER.md" -mtime -1 2>/dev/null)
RECENT_STARTS=$(find .memory/archive -name "START_HERE.md" -mtime -1 2>/dev/null)

if [ -n "$RECENT_PLANS" ] || [ -n "$RECENT_HANDOVERS" ] || [ -n "$RECENT_STARTS" ]; then
  echo "Recent work found (<24 hours old):"
  echo ""
  
  if [ -n "$RECENT_PLANS" ]; then
    echo "  📋 Master Plans:"
    echo "$RECENT_PLANS" | while read file; do
      DIR=$(dirname "$file" | xargs basename)
      echo "     • $DIR/MASTER_PLAN.md"
    done
  fi
  
  if [ -n "$RECENT_HANDOVERS" ]; then
    echo "  ✅ Handovers:"
    echo "$RECENT_HANDOVERS" | while read file; do
      DIR=$(dirname "$file" | xargs basename)
      echo "     • $DIR/HANDOVER.md"
    done
  fi
  
  if [ -n "$RECENT_STARTS" ]; then
    echo "  🚀 Start Guides:"
    echo "$RECENT_STARTS" | while read file; do
      DIR=$(dirname "$file" | xargs basename)
      echo "     • $DIR/START_HERE.md"
    done
  fi
else
  echo "No recent archives (<24h old)"
fi
echo ""

# 5. Recommendation
echo "🎯 Recommendation"
echo "-----------------"
if [ -n "$RECENT_PLANS" ]; then
  PLAN_FILE=$(echo "$RECENT_PLANS" | head -1)
  PLAN_DIR=$(dirname "$PLAN_FILE" | xargs basename)
  echo "⚠️  Recent MASTER_PLAN found: $PLAN_DIR"
  echo "   📖 Read: $PLAN_FILE"
  echo "   Then check if CONTINUE.md mentions this work."
  echo ""
  echo "   If CONTINUE.md is silent about this → It's STALE!"
  echo "   Trust the recent archive over CONTINUE.md."
elif [ -n "$RECENT_HANDOVERS" ]; then
  HANDOVER_FILE=$(echo "$RECENT_HANDOVERS" | head -1)
  HANDOVER_DIR=$(dirname "$HANDOVER_FILE" | xargs basename)
  echo "✅ Recent session completed: $HANDOVER_DIR"
  echo "   📖 Read: $HANDOVER_FILE"
  echo "   Then follow CONTINUE.md for next steps."
else
  echo "✅ No recent archives - CONTINUE.md should be current"
  echo "   📖 Read: .memory/CONTINUE.md"
  echo "   Follow next task instructions there."
fi
echo ""

# 6. Summary
echo "================================"
echo "✅ Verification Complete"
echo ""
echo "Next Steps:"
echo "1. Review output above"
echo "2. Read recommended documents"
echo "3. Verify CONTINUE.md matches recent work"
echo "4. Start coding!"
echo ""

exit 0
