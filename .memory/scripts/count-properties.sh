#!/usr/bin/env bash
# b_path:: .memory/scripts/count-properties.sh
# Count actual CSS properties implemented in b_value
# Single source of truth for property count (with fallback)

set -euo pipefail

cd "$(dirname "$0")/../.."

echo "=== b_value Property Count ==="
echo ""

COUNT_SOURCE=""
COUNT=""

if [[ -f src/universal.ts ]]; then
  # Legacy registry-based count
  PARSERS=$(awk '/^const PROPERTY_PARSERS:/,/^};$/' src/universal.ts | \
    grep -E '^\s+"?[a-z-]+"?:' | \
    wc -l | \
    tr -d ' ')
  GENERATORS=$(awk '/^const PROPERTY_GENERATORS:/,/^};$/' src/universal.ts | \
    grep -E '^\s+"?[a-z-]+"?:' | \
    wc -l | \
    tr -d ' ')
  COUNT="$PARSERS"
  COUNT_SOURCE="src/universal.ts registries"
else
  # Fallback: read from curated registry in .memory
  if [[ -f .memory/PROPERTY_REGISTRY.txt ]]; then
    COUNT=$(sed -n '1p' .memory/PROPERTY_REGISTRY.txt | sed -E 's/[^0-9]*([0-9]+).*/\1/')
    COUNT_SOURCE=".memory/PROPERTY_REGISTRY.txt"
  else
    COUNT="unknown"
    COUNT_SOURCE="(no registry found)"
  fi
  PARSERS="-"
  GENERATORS="-"
fi

# Count test files (always useful)
PARSE_TESTS=$(find src/parse -name "*.test.ts" 2>/dev/null | wc -l | tr -d ' ')
GEN_TESTS=$(find src/generate -name "*.test.ts" 2>/dev/null | wc -l | tr -d ' ')

printf "Parsers registered:    %s\n" "$PARSERS"
printf "Generators registered: %s\n" "$GENERATORS"
printf "Parse test files:      %s\n" "$PARSE_TESTS"
printf "Generate test files:   %s\n" "$GEN_TESTS"
echo ""
echo "✅ Property Count: $COUNT CSS properties"
echo "Source: $COUNT_SOURCE"
echo ""
echo "Last updated: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
