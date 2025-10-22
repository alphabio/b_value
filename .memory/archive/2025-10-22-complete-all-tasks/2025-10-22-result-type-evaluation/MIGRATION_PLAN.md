# ParseResult Migration - Foolproof Implementation Plan

**Goal**: Migrate all 133 `Result<T, string>` parsers to `ParseResult<T>`  
**Timeline**: Gradual, module-by-module  
**Risk**: Low (wrapParser provides safety net)

---

## ✅ Pre-Migration Checklist

- [x] Baseline verified (all tests passing)
- [x] Analysis complete (ANALYSIS.md)
- [ ] User approval on approach
- [ ] Migration script created
- [ ] First module identified (Layout recommended)

---

## 📋 Module Migration Order

### Batch 1: HIGH PRIORITY (52 files) - Weeks 1-4
1. **Layout** - 30 files (most common, biggest impact)
2. **Typography** - 11 files (high usage)
3. **Flexbox** - 11 files (growing usage)

### Batch 2: MEDIUM PRIORITY (23 files) - Weeks 5-7
4. **Color** - 13 files (complex but important)
5. **Border** - 4 files (common)
6. **Background** - 6 files (mostly done, finish it)

### Batch 3: LOWER PRIORITY (58 files) - Weeks 8-10
7. **Clip-path** - 12 files
8. **Filter** - 12 files
9. **Gradient** - 5 files
10. **Animation** - 8 files
11. **Transition** - 4 files
12. **Outline** - 4 files
13. **Text** - 4 files
14. **Transform** - 2 files
15. **Shadow** - 2 files
16. **Interaction** - 2 files
17. **Visual** - 2 files

---

## 🔧 Per-File Migration Protocol

### Step 1: Prepare (1 min)
```bash
# Open file and test file side-by-side
code src/parse/layout/width.ts
code src/parse/layout/width.test.ts
```

### Step 2: Update Imports (30 sec)
```typescript
// BEFORE
import { err, ok, type Result } from "@/core/result";

// AFTER
import { parseErr, parseOk, type ParseResult } from "@/core/result";
```

### Step 3: Update Return Type (30 sec)
```typescript
// BEFORE
export function parse(css: string): Result<WidthValue, string>

// AFTER
export function parse(css: string): ParseResult<WidthValue>
```

### Step 4: Replace Success Calls (1 min)
```typescript
// BEFORE
return ok(value);

// AFTER
return parseOk(value);
```

**Search/Replace**: `return ok(` → `return parseOk(`

### Step 5: Replace Error Calls (2-3 min)
```typescript
// BEFORE
return err("Invalid width value");

// AFTER
return parseErr("invalid-value", "Invalid width value");
```

**Error Code Selection Guide**:
- `"invalid-value"` - Most common, use for bad values
- `"invalid-syntax"` - Parsing/structure errors
- `"missing-value"` - Required value not provided
- `"unknown-property"` - Unrecognized property name

**Optional**: Add suggestions
```typescript
return parseErr("invalid-value", "Invalid width value", {
  suggestion: "Use a length (e.g., '100px') or 'auto'"
});
```

### Step 6: Update Tests (2-3 min)
```typescript
// BEFORE
expect(result.error).toBe("Invalid width value");

// AFTER
expect(result.issues[0].message).toBe("Invalid width value");
expect(result.issues[0].code).toBe("invalid-value");
```

**Common patterns**:
- `result.error` → `result.issues[0].message`
- Add: `expect(result.issues[0].code).toBe("invalid-value")`
- `result.ok` stays the same ✅
- `result.value` stays the same ✅

### Step 7: Verify (1 min)
```bash
# Run just this test file
pnpm test src/parse/layout/width.test.ts

# Should pass ✅
```

### Step 8: Commit (30 sec)
```bash
git add src/parse/layout/width.ts src/parse/layout/width.test.ts
git commit -m "refactor(layout): migrate width parser to ParseResult"
```

**Total time per file: ~8-10 minutes**

---

## 🤖 Semi-Automated Script

Create `.memory/scripts/migrate-parser.sh`:

```bash
#!/bin/bash
set -e

FILE="$1"
TEST_FILE="${FILE%.ts}.test.ts"

if [[ ! -f "$FILE" ]]; then
  echo "❌ File not found: $FILE"
  exit 1
fi

echo "🔧 Migrating: $FILE"

# Backup
cp "$FILE" "$FILE.bak"
cp "$TEST_FILE" "$TEST_FILE.bak" 2>/dev/null || true

# 1. Update imports
sed -i '' 's/err, ok, type Result/parseErr, parseOk, type ParseResult/' "$FILE"
sed -i '' 's/ok, type Result/parseOk, type ParseResult/' "$FILE"
sed -i '' 's/err, type Result/parseErr, type ParseResult/' "$FILE"

# 2. Update return type
sed -i '' 's/Result<\(.*\), string>/ParseResult<\1>/' "$FILE"

# 3. Replace ok() calls
sed -i '' 's/return ok(/return parseOk(/g' "$FILE"

echo "✅ Automated changes complete"
echo ""
echo "⚠️  MANUAL STEPS REQUIRED:"
echo "1. Replace all err() calls with parseErr() and add error codes"
echo "2. Update tests to check result.issues[0] instead of result.error"
echo "3. Run: pnpm test $TEST_FILE"
echo "4. If tests pass, commit. If not, restore from .bak files"
echo ""
echo "Backup saved: $FILE.bak"
```

**Usage**:
```bash
chmod +x .memory/scripts/migrate-parser.sh
.memory/scripts/migrate-parser.sh src/parse/layout/width.ts
```

---

## 📊 Module Migration Workflow

### Example: Layout Module (30 files)

#### Day 1 - Setup & First Batch (10 files)
```bash
# Create session directory
mkdir -p .memory/archive/2025-10-22-layout-parseresult-migration

# Files (simple keyword-based, ~1 hour total):
- position.ts          (5 values, easy)
- display.ts           (many values, medium)
- visibility.ts        (3 values, easy)
- float.ts             (4 values, easy)
- clear.ts             (4 values, easy)
- overflow-x.ts        (6 values, easy)
- overflow-y.ts        (6 values, easy)
- box-sizing.ts        (2 values, easy)
- cursor.ts            (30+ values, medium)
- opacity.ts           (number value, easy)

# After each file
pnpm test src/parse/layout/[file].test.ts
git add . && git commit -m "refactor(layout): migrate [property] to ParseResult"

# End of day
pnpm test  # Full test suite
git push
```

#### Day 2 - Second Batch (10 files)
```bash
# Files (dimension-based, ~1.5 hours total):
- width.ts
- height.ts
- min-width.ts
- max-width.ts
- min-height.ts
- max-height.ts
- top.ts
- right.ts
- bottom.ts
- left.ts

# Same process
```

#### Day 3 - Final Batch (10 files)
```bash
# Files (margin/padding + z-index, ~1.5 hours total):
- margin-top.ts
- margin-right.ts
- margin-bottom.ts
- margin-left.ts
- padding-top.ts
- padding-right.ts
- padding-bottom.ts
- padding-left.ts
- z-index.ts
- overflow.ts (if exists)

# Final verification
pnpm test
just check

# Document completion
cat > .memory/archive/2025-10-22-layout-parseresult-migration/HANDOVER.md
git commit -m "docs(layout): complete ParseResult migration - 30 files"
```

---

## 🎯 Verification Checklist (Per Module)

After completing each module:

- [ ] All files in module migrated
- [ ] All tests passing (`pnpm test`)
- [ ] TypeScript clean (`pnpm typecheck`)
- [ ] Lint clean (`just check`)
- [ ] Error codes appropriate (reviewed)
- [ ] Suggestions added where helpful
- [ ] Commits pushed
- [ ] HANDOVER.md created

---

## 🚨 Troubleshooting

### Problem: Tests failing after migration
**Solution**: Check these common issues:
1. Import statement incomplete (missing parseErr or parseOk)
2. Test still using `result.error` instead of `result.issues[0].message`
3. Error code mismatch in test expectations
4. Forgot to add `.issues` array check

### Problem: TypeScript errors
**Solution**:
1. Make sure return type is `ParseResult<T>` not `Result<T, string>`
2. Check that `parseOk()` and `parseErr()` are imported
3. Verify error code is a valid `IssueCode` type

### Problem: Wrong error code chosen
**Solution**: Review error code guide:
- User provided bad value → `"invalid-value"`
- Parser can't understand syntax → `"invalid-syntax"`  
- Required field missing → `"missing-value"`
- Property name wrong → `"unknown-property"`

### Problem: Migration too slow
**Solution**:
1. Use the automated script for mechanical changes
2. Do multiple files in parallel (different modules)
3. Skip adding suggestions initially, add later
4. Batch similar files together

---

## 📝 Example Session Log

```markdown
# Layout Module ParseResult Migration

**Date**: 2025-10-22
**Files**: 30
**Status**: Complete ✅

## Summary
- Migrated all 30 Layout module parsers to ParseResult
- Updated 30 test files
- Added error codes and suggestions
- All tests passing (3032/3032)

## Files Migrated
✅ position.ts
✅ display.ts
✅ visibility.ts
... (27 more)

## Commits
- refactor(layout): migrate position to ParseResult
- refactor(layout): migrate display to ParseResult
... (30 total commits)

## Time Taken
- Day 1: 1 hour (10 files)
- Day 2: 1.5 hours (10 files)
- Day 3: 1.5 hours (10 files)
- Total: 4 hours

## Next Module
Typography (11 files, estimated 1.5 hours)
```

---

## 🎬 Getting Started

### Immediate Next Steps

1. **Get User Approval**
   - Confirm approach (ParseResult not Result<T, Issue>)
   - Confirm gradual migration
   - Confirm starting with Layout module

2. **Create Migration Script**
   ```bash
   touch .memory/scripts/migrate-parser.sh
   chmod +x .memory/scripts/migrate-parser.sh
   # (Add script content from above)
   ```

3. **Start First File**
   ```bash
   # Test the process manually first
   code src/parse/layout/position.ts
   
   # Follow the 8-step protocol above
   # Verify it works
   # Then decide: manual or script?
   ```

4. **Scale Up**
   - If manual works well: continue
   - If tedious: use script
   - Likely: hybrid (script + manual error codes)

---

## 🏁 Completion Criteria

Migration is complete when:

- [ ] All 133 files migrated to ParseResult
- [ ] All tests passing (3032+ tests)
- [ ] All error codes reviewed and appropriate
- [ ] Helpful suggestions added where beneficial
- [ ] `wrapParser()` function removed from universal.ts
- [ ] `toParseResult()` marked as deprecated or removed
- [ ] Documentation updated
- [ ] CHANGELOG entry added
- [ ] Clean commit history

**Estimated Total Time**: 15-20 hours (spread over 2-3 weeks)

---

## ✅ Success Metrics

- **Code Quality**: All errors have proper codes and context
- **User Experience**: Better error messages with suggestions
- **Consistency**: Internal API matches public API
- **Type Safety**: Full TypeScript support for error handling
- **Maintainability**: Easier to understand and extend
- **Zero Regressions**: All existing functionality preserved
