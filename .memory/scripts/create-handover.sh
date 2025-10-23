#!/bin/bash
# Helper script to create session handover documentation
# Usage: .memory/scripts/create-handover.sh [topic] [start-coverage] [end-coverage]

set -e

TOPIC="${1:-session}"
START_COV="${2:-0.00}"
END_COV="${3:-0.00}"
DATE=$(date +%Y-%m-%d)
SESSION_DIR=".memory/archive/${DATE}-${TOPIC}"

# Create archive directory
mkdir -p "$SESSION_DIR"

echo "📁 Creating handover in: $SESSION_DIR"

# Calculate diff
DIFF=$(echo "$END_COV - $START_COV" | bc)

# Create HANDOVER.md template
cat > "$SESSION_DIR/HANDOVER.md" << EOF
# Session Summary: ${TOPIC}

**Date**: ${DATE}
**Duration**: [X hours]

## 📊 Metrics
- **Coverage**: ${START_COV}% → ${END_COV}% (+${DIFF}%)
- **Tests**: +[count] tests across [N] files
- **Commits**: [count] commits
- **Test Suites**: [passing/total]

## ✅ Work Completed

1. **[Category 1]** ([N] files, [M] tests)
   - \`file1.test.ts\`
   - \`file2.test.ts\`
   
2. **[Category 2]** ([N] files, [M] tests)
   - \`file3.test.ts\`
   - \`file4.test.ts\`

## 🔧 Quality Checks

\`\`\`bash
just check    # ✅ Passed
just test     # ✅ Passed
\`\`\`

## 🎯 Next Session Setup

- ✅ \`SESSION_NEXT.md\` updated with specific task
- ✅ All tests passing ([count] tests)
- ✅ All checks passing
- ✅ Branch: \`$(git branch --show-current)\`
- ✅ Commits: Clean and ready

## 🔧 Patterns/Learnings

- [Any useful patterns discovered]
- [Any gotchas or tips for next agent]

## 📝 Files Added This Session

\`\`\`bash
# Find test files added in this session
git log --name-only --pretty=format: --since="24 hours ago" | grep ".test.ts$" | sort -u
\`\`\`

EOF

echo "✅ Created: $SESSION_DIR/HANDOVER.md"
echo ""
echo "📝 Next steps:"
echo "   1. Edit HANDOVER.md with details"
echo "   2. Update .memory/SESSION_NEXT.md"
echo "   3. Commit everything"
echo ""
echo "💡 Tip: Open in editor:"
echo "   code $SESSION_DIR/HANDOVER.md"
