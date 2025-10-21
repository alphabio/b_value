#!/bin/bash
# b_path:: .memory/archive/2025-10-20-code-review/duplication-analysis.sh
# Analyze code duplication across the codebase

echo "=== DUPLICATION ANALYSIS ==="
echo ""

# Check for similar patterns in parsers
echo "1. Parser Pattern Analysis"
echo "   Counting parsers with similar structure..."
find src/parse -name "*.ts" -not -name "*.test.ts" -not -name "index.ts" | wc -l

echo ""
echo "2. Generator Pattern Analysis"
find src/generate -name "*.ts" -not -name "*.test.ts" -not -name "index.ts" | wc -l

echo ""
echo "3. Common Imports (DRY check)"
echo "   Top imported modules:"
grep -h "^import.*from" src/**/*.ts 2>/dev/null | grep -v test | sort | uniq -c | sort -rn | head -10

echo ""
echo "4. Repeated Code Patterns"
echo "   Files with 'err(' calls (error handling):"
grep -r "return err(" src --include="*.ts" --exclude="*.test.ts" | wc -l

echo ""
echo "   Files with 'ok(' calls (success):"
grep -r "return ok(" src --include="*.ts" --exclude="*.test.ts" | wc -l
