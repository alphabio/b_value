# Session: Test Generator v2.0 - Ready to Scale

**Status**: ✅ **APPROVED** - Exact error assertions implemented

**Tests**: 3,641 passing (365 test files)  
**Branch**: coverage/90-percent  
**Latest Commit**: bcf2554

---

## ✅ Discussion Complete

### User Feedback: Exact Error Assertions

**Issue**: Generator was using `toContain("Expected")` - too weak!

**Solution**: ✅ Implemented exact error message assertions:
```typescript
// Before
expect(result.error).toContain("Expected");  // ❌ Weak

// After  
expect(result.error).toBe("animation-duration: Expected time dimension or 'auto', got: Number");  // ✅ Strong
```

**Benefits**:
1. ✅ Enforces consistent `"property-name: details"` schema
2. ✅ Catches error message regressions
3. ✅ Self-documenting (shows exact user-facing errors)
4. ✅ No false positives from partial matching

**Changes Made**:
- Added `expectedError?: string` to TestCase interface
- Updated generator to use `.toBe()` for exact matching
- Added exact error messages to duration config
- Regenerated duration tests (24/24 passing)
- Updated README with rationale and workflow

**Commit**: bcf2554 - All 3,641 tests passing

---

## 🎯 Next Task: Apply to timing-function

Generator is now **production-ready** with exact error assertions!

### Step 1: Create timing-function config

```bash
# Create config file
cat > scripts/test-generator/configs/timing-function.ts << 'EOTS'
export const config: PropertyConfig = {
  propertyName: "timing-function",
  sourceFile: "src/parse/animation/timing-function.ts",
  importPath: "../src/parse/animation/timing-function.js",
  outputPath: "src/parse/animation/timing-function.test.ts",
  cases: [
    // Keywords
    { input: "ease", category: "valid-keyword", expectValid: true },
    { input: "linear", category: "valid-keyword", expectValid: true },
    { input: "ease-in", category: "valid-keyword", expectValid: true },
    { input: "ease-out", category: "valid-keyword", expectValid: true },
    { input: "ease-in-out", category: "valid-keyword", expectValid: true },
    { input: "step-start", category: "valid-keyword", expectValid: true },
    { input: "step-end", category: "valid-keyword", expectValid: true },
    
    // cubic-bezier()
    { input: "cubic-bezier(0, 0, 1, 1)", category: "valid-bezier", expectValid: true },
    { input: "cubic-bezier(0.42, 0, 0.58, 1)", category: "valid-bezier", expectValid: true },
    { input: "cubic-bezier(0, -2, 1, 3)", category: "valid-bezier", expectValid: true },  // Y can be any value
    
    // steps()
    { input: "steps(1)", category: "valid-steps", expectValid: true },
    { input: "steps(4, jump-start)", category: "valid-steps", expectValid: true },
    { input: "steps(10, jump-end)", category: "valid-steps", expectValid: true },
    { input: "steps(5, jump-none)", category: "valid-steps", expectValid: true },
    { input: "steps(3, jump-both)", category: "valid-steps", expectValid: true },
    
    // Invalid
    { input: "cubic-bezier(-1, 0, 1, 1)", category: "invalid-bezier", expectValid: false },  // X must be 0-1
    { input: "cubic-bezier(0, 0, 2, 1)", category: "invalid-bezier", expectValid: false },   // X must be 0-1
    { input: "steps(0)", category: "invalid-steps", expectValid: false },  // n must be > 0
    { input: "invalid", category: "invalid-keyword", expectValid: false },
  ],
};
EOTS

# Run generator (first pass - see actual errors)
tsx scripts/generate-tests.ts timing-function

# Copy error messages from output, add to config as expectedError
# Then regenerate
```

### Step 2: Iterate on error messages

1. First run shows actual parser errors
2. Copy exact errors into config
3. Regenerate with exact assertions
4. Verify all tests pass

### Step 3: Review & refine

- Check edge cases (e.g., X range constraints for cubic-bezier)
- Verify error messages are consistent
- Add more test cases if needed

---

## 📚 References

- **Generator docs**: `scripts/test-generator/README.md`
- **Duration example**: `scripts/test-generator/configs/duration.ts`
- **Exact error rationale**: `.memory/EXACT_ERROR_ASSERTIONS.md`
- **Source parser**: `src/parse/animation/timing-function.ts`

---

## 🔧 Quick Commands

```bash
# Check current spec
view src/parse/animation/timing-function.ts

# Create config
vim scripts/test-generator/configs/timing-function.ts

# Generate tests (first pass)
tsx scripts/generate-tests.ts timing-function

# Run tests
pnpm test src/parse/animation/timing-function

# Commit
git add -A && git commit -m "test(animation): Add timing-function tests via generator"
```

---

**Next Agent**: Create timing-function config and apply the proven generator workflow!
