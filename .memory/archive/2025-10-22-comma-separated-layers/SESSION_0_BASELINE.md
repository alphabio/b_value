# Session 0: Fix Baseline & Prerequisites

**Duration**: 30 minutes  
**Goal**: Clean TypeScript, all tests passing, verify utilities exist  
**Status**: READY TO START

---

## Prerequisites Checklist

Before starting:
- [x] MASTER_PLAN.md reviewed
- [x] AUDIT_REPORT.md reviewed
- [ ] Current branch: `develop` (or create feature branch)
- [ ] No uncommitted changes
- [ ] Baseline tests run

---

## Tasks

### Task 0.1: Fix TypeScript Error (10 min)

**Location**: `src/universal.ts:633`

**Current Error**:
```
error TS2322: Type '{ ok: boolean; value: Record<string, CSSValue>; issues: Issue[]; }' 
is not assignable to type 'ParseResult<Record<string, CSSValue>>'.
  Types of property 'ok' are incompatible.
    Type 'boolean' is not assignable to type 'true'.
```

**Root Cause**: `allOk` is `boolean`, but `ParseResult<T>` expects `ok: true` when successful.

**Solution**: Use conditional return or explicit type assertion.

#### Step-by-step Fix

1. **View the code**:
```bash
code src/universal.ts +620
```

2. **Identify the issue**:
```typescript
// Line 615-633 (current)
let allOk = true;
// ... loop modifies allOk
return {
  ok: allOk,  // ❌ Type 'boolean' not assignable to 'true'
  value,
  issues,
};
```

3. **Apply fix** (Option A - Conditional Return):
```typescript
// If all OK, return success result
if (allOk) {
  return {
    ok: true,
    value,
    issues,
  };
}

// Otherwise return failure result
return {
  ok: false,
  value,
  issues,
};
```

4. **Alternative fix** (Option B - Type Assertion):
```typescript
return {
  ok: allOk,
  value,
  issues,
} as ParseResult<Record<string, CSSValue>>;
```

**Recommended**: Option A (explicit conditional return) - more type-safe.

5. **Verify fix**:
```bash
pnpm run typecheck
# Should show 0 errors
```

---

### Task 0.2: Verify Baseline Tests (5 min)

```bash
just check
# Expected: Clean format, lint, typecheck

just test
# Expected: 2640 tests passing (or current count)
```

**Success criteria**:
- ✅ No TypeScript errors
- ✅ No lint warnings
- ✅ All tests passing
- ✅ No format changes needed

---

### Task 0.3: Verify Comma-Separated Utility (10 min)

**Goal**: Confirm `parseCommaSeparatedSingle` exists and works.

#### Check Implementation

```bash
# View utility
cat src/utils/parse/comma-separated.ts | head -50

# Check for key function
grep -n "parseCommaSeparatedSingle" src/utils/parse/comma-separated.ts
```

**Expected**:
```typescript
export function parseCommaSeparatedSingle<T>(
  value: string,
  itemParser: (item: string) => Result<T, string>,
  propertyName: string
): Result<T[], string>
```

#### Check Tests

```bash
# Run utility tests
pnpm test src/utils/parse/comma-separated.test.ts

# View test file
code src/utils/parse/comma-separated.test.ts
```

**Expected**:
- ✅ 19+ tests passing
- ✅ Tests cover: single value, multiple values, errors, edge cases

#### Check Usage Examples

```bash
# Find existing usage
grep -r "parseCommaSeparatedSingle" src/parse --include="*.ts" | head -10
```

**Expected**: Should see some transition/animation properties using it.

---

### Task 0.4: Create Feature Branch (5 min)

```bash
# Ensure clean state
git status

# Create feature branch
git checkout -b feature/comma-separated-layers

# Or continue on develop if preferred
```

---

### Task 0.5: Commit Baseline (5 min)

```bash
# Add TypeScript fix
git add src/universal.ts

# Commit
git commit -m "fix(universal): resolve TypeScript error in parseAll return type

- Use conditional return for proper ParseResult type inference
- Ensures ok: true when allOk === true, ok: false otherwise
- Prep for comma-separated layer support"

# Verify
git log -1 --oneline
```

---

## Verification Steps

### 1. TypeScript Clean
```bash
pnpm run typecheck
# Expected output: "Found 0 errors"
```

### 2. All Tests Passing
```bash
pnpm test --run
# Expected: All green, no failures
```

### 3. Utility Exists
```bash
test -f src/utils/parse/comma-separated.ts && echo "✅ Utility exists" || echo "❌ Utility missing"
```

### 4. Baseline Committed
```bash
git log -1 --oneline | grep -q "fix(universal)" && echo "✅ Committed" || echo "❌ Not committed"
```

---

## Success Criteria

- [x] TypeScript error fixed
- [ ] `pnpm run typecheck` → 0 errors
- [ ] `pnpm test --run` → all passing
- [ ] `parseCommaSeparatedSingle` utility verified
- [ ] Changes committed to git
- [ ] Ready to start Session 1

---

## Troubleshooting

### If TypeScript errors persist

1. Check for other errors:
```bash
pnpm run typecheck 2>&1 | grep "error TS"
```

2. Clear build cache:
```bash
rm -rf dist/
pnpm build
```

3. Restart TypeScript server (in VS Code):
   - Cmd+Shift+P → "TypeScript: Restart TS Server"

### If tests fail

1. Check which tests:
```bash
pnpm test --run 2>&1 | grep "FAIL"
```

2. Run specific failing test:
```bash
pnpm test path/to/failing.test.ts
```

3. Don't fix unrelated failures - note them for later

### If utility missing

Check older branches/commits:
```bash
git log --all --oneline -- src/utils/parse/comma-separated.ts
```

If truly missing, reference implementation in:
`.memory/archive/2025-10-20-comma-separated-deep-research/RESEARCH.md`

---

## Time Tracking

| Task | Estimated | Actual | Notes |
|------|-----------|--------|-------|
| 0.1 Fix TS error | 10 min | | |
| 0.2 Verify tests | 5 min | | |
| 0.3 Check utility | 10 min | | |
| 0.4 Create branch | 5 min | | |
| 0.5 Commit | 5 min | | |
| **Total** | **35 min** | | |

---

## Output Artifacts

1. ✅ Clean TypeScript compilation
2. ✅ All tests passing baseline
3. ✅ Git commit with baseline fix
4. ✅ Utility verified and documented
5. ✅ Ready for Session 1

---

## Next Steps

After completing Session 0:

1. Review Session 1 plan: `SESSION_1_BACKGROUND_IMAGE.md`
2. Verify prerequisites met
3. Start implementation

**Status**: Ready to begin  
**Blocker**: TypeScript error at line 633  
**Next**: Task 0.1 - Fix TypeScript error
