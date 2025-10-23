# FOOLPROOF 90% COVERAGE PLAN

## Current State
- **Coverage**: 69.22%
- **Tests**: 2122 passing
- **Gap**: Need +20.78% to hit 90%

## Strategy: Test What's Missing

This is simple - we already have a pattern that works. Just keep doing it.

### Phase 1: Quick Wins (Estimated +5-7%)
**Target**: Get to 75% coverage
**Time**: 2-3 hours

Test the obvious untested files:
1. **All `index.ts` files** (currently 0% - just re-exports)
2. **Simple generators** without tests yet
3. **Simple parsers** without tests yet

**How to find them**:
```bash
# Find untested generator files
find src/generate -name "*.ts" ! -name "*.test.ts" ! -name "index.ts" -exec grep -L "test.ts" {} \;

# Find untested parser files  
find src/parse -name "*.ts" ! -name "*.test.ts" ! -name "index.ts" -exec grep -L "test.ts" {} \;
```

**Test pattern** (copy from existing tests):
```typescript
describe('propertyName', () => {
  it('generates valid values', () => {
    const result = generate({ property: 'value' });
    expect(result.ok).toBe(true);
    expect(result.value).toMatchSnapshot();
  });
  
  it('handles edge cases', () => {
    // Test boundaries, special values, etc.
  });
});
```

---

### Phase 2: Medium Impact Files (Estimated +8-10%)
**Target**: Get to 83% coverage
**Time**: 4-6 hours

Focus on files with 50-80% coverage - they're partially tested but missing branches:

1. **Animation generators** (currently ~70%)
2. **Background generators** (currently ~65%)  
3. **Transform generators** (currently ~75%)
4. **Typography generators** (currently ~78%)

**How to find them**:
```bash
just coverage 2>&1 | grep -E "^\s+[a-z].*\|.*[5-7][0-9]\.[0-9]+" | head -20
```

**Test pattern** (add missing branches):
- Test error cases (invalid input)
- Test edge values (0, negative, huge numbers)
- Test all enum values
- Test combined properties

---

### Phase 3: Hard Stuff (Estimated +7-10%)  
**Target**: Hit 90%+
**Time**: 6-8 hours

The complex files with lots of logic:

1. **`src/parse/comma.ts`** - Complex parsing logic
2. **`src/parse/color-components.ts`** - Multiple color formats
3. **`src/generate/transform/transform.ts`** - Transform matrix logic
4. **`src/utils/ast/functions.ts`** - AST manipulation

**Approach**:
- Read the code carefully
- Identify all code paths
- Write one test per path
- Use coverage report to verify you hit everything

---

## Execution Rules

### 1. **TDD Mode - Always**
```bash
# Start with failing test
vitest --watch path/to/file.test.ts

# Write test that fails
# Make it pass
# Move to next test
```

### 2. **Verify Progress**
After each batch (every ~10 files):
```bash
just coverage
# Check that % went up
# Commit if it did
```

### 3. **One File at a Time**
Don't write 50 test files at once. Write one, verify it works, commit, move on.

### 4. **Copy Working Patterns**
Look at existing tests that are similar. Copy the structure. Don't reinvent.

### 5. **Snapshots are OK**
For generators, snapshots are often the right answer:
```typescript
expect(result.value).toMatchSnapshot();
```

Just verify the snapshot looks reasonable.

---

## Timeline

| Phase | Target | Time | Cumulative |
|-------|--------|------|------------|
| 1. Quick Wins | 75% | 2-3h | 2-3h |
| 2. Medium Impact | 83% | 4-6h | 6-9h |
| 3. Hard Stuff | 90%+ | 6-8h | 12-17h |

**Total: 2-3 days of focused work**

---

## Success Criteria

✅ Coverage ≥ 90%
✅ All tests passing
✅ No skipped/commented tests
✅ Commit after each file or small batch
✅ Run `just check && just test` before each commit

---

## What NOT to Do

❌ Don't skip writing tests and just fix the code to hit 90%
❌ Don't write tests that test mocks
❌ Don't use `// @ts-ignore` or `any` to skip type checking
❌ Don't write tests that always pass
❌ Don't batch 100 tests at once without verifying

---

## Getting Started

```bash
# 1. Start fresh
git checkout develop
git pull
git checkout -b coverage/90-percent

# 2. Find first file to test
find src/generate -name "*.ts" ! -name "*.test.ts" ! -name "index.ts" | head -1

# 3. Create test file next to it
# (follow existing test patterns)

# 4. Run in watch mode
pnpm vitest --watch

# 5. Write tests until file is fully covered

# 6. Commit
git add .
git commit -m "test(generate): add tests for XXX - coverage +X%"

# 7. Repeat
```

---

## THAT'S IT

This is not complex. It's just systematic work. The library is easy to test because:
- Functions are pure
- Inputs/outputs are clear
- No side effects
- Existing tests show the pattern

Just. Do. The. Work.

