#!/bin/bash

echo "=== PHASE 0.5 AUDIT SCRIPT ==="
echo ""

echo "## 1. CORE TYPES AUDIT"
echo "Checking ParseResult and GenerateResult definitions..."
echo ""
echo "### ParseResult<T>:"
grep -A 10 "export type ParseResult" src/core/types.ts
echo ""
echo "### GenerateResult:"
grep -A 5 "export type GenerateResult" src/core/types.ts
echo ""

echo "## 2. MODULE INVENTORY"
echo "Checking which modules have parse() and generate() functions..."
echo ""

for module in color clip-path gradient filter position transform shadow transition outline border animation text background layout; do
  echo "### Module: $module"
  
  # Check for parse() function
  if [ -f "src/parse/$module/$module.ts" ]; then
    if grep -q "export function parse(" "src/parse/$module/$module.ts" 2>/dev/null; then
      echo "  ✅ parse() - found"
    else
      echo "  ❌ parse() - not found"
    fi
  else
    echo "  ⚠️  parse file doesn't exist"
  fi
  
  # Check for generate() function
  if [ -f "src/generate/$module/$module.ts" ]; then
    if grep -q "export function generate(" "src/generate/$module/$module.ts" 2>/dev/null; then
      echo "  ✅ generate() - found"
    else
      echo "  ❌ generate() - not found"
    fi
  elif [ -f "src/generate/$module/generate.ts" ]; then
    if grep -q "export function generate(" "src/generate/$module/generate.ts" 2>/dev/null; then
      echo "  ✅ generate() - found (in generate.ts)"
    else
      echo "  ❌ generate() - not found"
    fi
  else
    echo "  ⚠️  generate file doesn't exist"
  fi
  
  echo ""
done

echo "## 3. TEST COVERAGE AUDIT"
echo "Checking test files for parse() and generate()..."
echo ""

for module in color clip-path gradient filter position transform shadow transition outline border animation; do
  echo "### $module tests:"
  
  # Parse tests
  if [ -f "src/parse/$module/$module.test.ts" ]; then
    parse_tests=$(grep -c "describe.*parse()" "src/parse/$module/$module.test.ts" 2>/dev/null || echo "0")
    echo "  Parse tests: $parse_tests test suites"
  fi
  
  # Generate tests  
  gen_file=""
  if [ -f "src/generate/$module/$module.test.ts" ]; then
    gen_file="src/generate/$module/$module.test.ts"
  elif [ -f "src/generate/$module/generate.test.ts" ]; then
    gen_file="src/generate/$module/generate.test.ts"
  fi
  
  if [ -n "$gen_file" ]; then
    gen_tests=$(grep -c "describe.*generate()" "$gen_file" 2>/dev/null || echo "0")
    echo "  Generate tests: $gen_tests test suites"
  fi
  
  echo ""
done

echo "## 4. RETURN TYPE AUDIT"
echo "Verifying functions return ParseResult<T> and GenerateResult..."
echo ""

for module in color clip-path gradient filter shadow transition outline border animation; do
  echo "### $module return types:"
  
  # Check parse() return type
  if [ -f "src/parse/$module/$module.ts" ]; then
    grep "export function parse(" "src/parse/$module/$module.ts" | head -1
  fi
  
  # Check generate() return type
  if [ -f "src/generate/$module/$module.ts" ]; then
    grep "export function generate(" "src/generate/$module/$module.ts" | head -1
  elif [ -f "src/generate/$module/generate.ts" ]; then
    grep "export function generate(" "src/generate/$module/generate.ts" | head -1
  fi
  
  echo ""
done

echo "## 5. ERROR HANDLING PATTERNS"
echo "Checking for consistent error handling..."
echo ""

echo "### Parse error patterns (should return ParseResult with error):"
for module in color clip-path gradient filter shadow transition outline border animation; do
  if [ -f "src/parse/$module/$module.ts" ]; then
    errors=$(grep -c "return { success: false" "src/parse/$module/$module.ts" 2>/dev/null || echo "0")
    echo "  $module: $errors error returns"
  fi
done

echo ""
echo "### Generate error patterns (should return GenerateResult with error):"
for module in color clip-path gradient filter shadow transition outline border animation; do
  gen_file=""
  if [ -f "src/generate/$module/$module.ts" ]; then
    gen_file="src/generate/$module/$module.ts"
  elif [ -f "src/generate/$module/generate.ts" ]; then
    gen_file="src/generate/$module/generate.ts"
  fi
  
  if [ -n "$gen_file" ]; then
    errors=$(grep -c "return { success: false" "$gen_file" 2>/dev/null || echo "0")
    echo "  $module: $errors error returns"
  fi
done

echo ""
echo "=== AUDIT COMPLETE ==="
