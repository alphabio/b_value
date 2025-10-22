#!/usr/bin/env bash
# Count actual CSS properties implemented in b_value
# Single source of truth for property count

set -euo pipefail

cd "$(dirname "$0")/../.."

echo "=== b_value Property Count ==="
echo ""

# Count parsers from PROPERTY_PARSERS registry
PARSERS=$(awk '/^const PROPERTY_PARSERS:/,/^};$/' src/universal.ts | \
  grep -E '^\s+"?[a-z-]+"?:' | \
  wc -l | \
  tr -d ' ')

# Count generators from PROPERTY_GENERATORS registry
GENERATORS=$(awk '/^const PROPERTY_GENERATORS:/,/^};$/' src/universal.ts | \
  grep -E '^\s+"?[a-z-]+"?:' | \
  wc -l | \
  tr -d ' ')

# Count test files
PARSE_TESTS=$(find src/parse -name "*.test.ts" 2>/dev/null | wc -l | tr -d ' ')
GEN_TESTS=$(find src/generate -name "*.test.ts" 2>/dev/null | wc -l | tr -d ' ')

echo "Parsers registered:    $PARSERS"
echo "Generators registered: $GENERATORS"
echo "Parse test files:      $PARSE_TESTS"
echo "Generate test files:   $GEN_TESTS"
echo ""
echo "✅ Property Count: $PARSERS CSS properties"
echo ""
echo "Last updated: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
