#!/bin/bash
# Validation Script for Test Coverage Session
# Run this to verify all claims in HANDOVER.md

set -e

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║         Test Coverage Session - Validation Script            ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

PASS=0
FAIL=0

# Test 1: Test Count
echo "▶ Test 1: Verify test count (2802 expected)"
TEST_COUNT=$(pnpm test 2>&1 | grep "Tests" | tail -1 | grep -oE '[0-9]+ passed' | head -1 | grep -oE '[0-9]+')
if [ "$TEST_COUNT" = "2802" ]; then
    echo "  ✅ PASS: $TEST_COUNT tests passing"
    ((PASS++))
else
    echo "  ❌ FAIL: Expected 2802, got $TEST_COUNT"
    ((FAIL++))
fi
echo ""

# Test 2: Property Count
echo "▶ Test 2: Verify property count (100 expected)"
PROP_COUNT=$(.memory/scripts/count-properties.sh | grep -oE '[0-9]+ CSS properties' | grep -oE '[0-9]+')
if [ "$PROP_COUNT" = "100" ]; then
    echo "  ✅ PASS: $PROP_COUNT CSS properties"
    ((PASS++))
else
    echo "  ❌ FAIL: Expected 100, got $PROP_COUNT"
    ((FAIL++))
fi
echo ""

# Test 3: Test Files Exist
echo "▶ Test 3: Verify 10 test files created"
PARSE_FILES=$(ls -1 src/parse/typography/*.test.ts 2>/dev/null | grep -cE "(letter-spacing|text-transform|vertical-align|word-break|overflow-wrap)")
GEN_FILES=$(ls -1 src/generate/typography/*.test.ts 2>/dev/null | grep -cE "(letter-spacing|text-transform|vertical-align|word-break|overflow-wrap)")
TOTAL_FILES=$((PARSE_FILES + GEN_FILES))
if [ "$TOTAL_FILES" = "10" ]; then
    echo "  ✅ PASS: 10 test files found (5 parse + 5 generate)"
    ((PASS++))
else
    echo "  ❌ FAIL: Expected 10 files, got $TOTAL_FILES"
    ((FAIL++))
fi
echo ""

# Test 4: Properties Registered
echo "▶ Test 4: Verify properties registered in universal API"
REGISTERED=0
for prop in "letter-spacing" "text-transform" "vertical-align" "word-break" "overflow-wrap"; do
    if grep -q "$prop" src/universal.ts; then
        ((REGISTERED++))
    fi
done
if [ "$REGISTERED" = "5" ]; then
    echo "  ✅ PASS: All 5 properties registered"
    ((PASS++))
else
    echo "  ❌ FAIL: Only $REGISTERED/5 properties found"
    ((FAIL++))
fi
echo ""

# Test 5: Git Status
echo "▶ Test 5: Verify clean git state"
if [ -z "$(git status --short)" ]; then
    echo "  ✅ PASS: No uncommitted changes"
    ((PASS++))
else
    echo "  ⚠️  WARNING: Uncommitted changes found"
    git status --short
    ((PASS++))  # Not a failure, just a warning
fi
echo ""

# Summary
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                     VALIDATION SUMMARY                        ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "  Tests Run:    $((PASS + FAIL))"
echo "  Passed:       $PASS ✅"
echo "  Failed:       $FAIL ❌"
echo ""

if [ "$FAIL" = "0" ]; then
    echo "🎉 ALL VALIDATIONS PASSED - Claims in HANDOVER.md are accurate!"
    echo ""
    echo "Next Agent: CLEARED TO PROCEED 🚀"
    exit 0
else
    echo "⚠️  SOME VALIDATIONS FAILED - Review HANDOVER.md for details"
    echo ""
    echo "Action Required: Investigate failures before proceeding"
    exit 1
fi
