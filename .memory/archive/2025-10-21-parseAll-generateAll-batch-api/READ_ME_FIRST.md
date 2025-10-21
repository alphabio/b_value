# NEXT AGENT: Read This First! 🚨

**Critical**: There's a **BREAKING CHANGE** that must be fixed before Phase 0.7 can proceed.

---

## ⚠️ Current Status

### What's Ready ✅
- ✅ Complete master plan for parseAll/generateAll (MASTER_PLAN.md)
- ✅ API design finalized (API_REFERENCE.md)
- ✅ Schema definitions complete (SCHEMA.md)
- ✅ **Strong type system implemented** (in source code!)

### What's Broken ❌
- ❌ **~45 TypeScript errors** due to breaking changes
- ❌ Tests cannot run until migration complete
- ❌ Build will fail

---

## 🎯 Your Task: Migration FIRST, Then Phase 0.7

### Step 1: Understand the Change (15 min)
Read these in order:
1. **MIGRATION.md** - What changed and how to fix it
2. **SCHEMA.md** - New type system
3. **SESSION_SUMMARY.md** - Context

### Step 2: Run TypeScript to See Errors (5 min)
```bash
pnpm run typecheck 2>&1 | less
```

You'll see ~45 errors like:
- `Argument of type 'string' is not assignable to parameter of type 'IssueCode'`
- `Expected 2-3 arguments, but got 1`

### Step 3: Migrate the Codebase (2-3 hours)
Update all `parseErr()` and `generateErr()` calls:

**Find & replace patterns**:
```bash
# Find all broken parseErr calls
rg 'parseErr\("(?!invalid|unknown|shorthand)' src/

# Find all broken generateErr calls  
rg 'generateErr\("(?!invalid|missing|unsupported)' src/
```

**Example fixes**:
```typescript
// Before
parseErr("Empty value")

// After
parseErr("invalid-syntax", "Empty value")

// Before
generateErr("Invalid IR: missing 'kind' field")

// After
generateErr("missing-required-field", "Invalid IR: missing 'kind' field")
```

**Or use Issues helpers** (recommended):
```typescript
// Instead of
parseErr("invalid-value", `Invalid value '${val}' for '${prop}'`, { property: prop })

// Use
Issues.invalidValue(prop, val)
```

### Step 4: Verify Migration (10 min)
```bash
# Must all pass
just check
just test

# Should show 2610 tests passing (same as before)
```

### Step 5: Commit Migration (5 min)
```bash
git add -A
git commit -m "chore: migrate to strict Issue type system

- Update all parseErr() calls with IssueCode first parameter
- Update all generateErr() calls with IssueCode first parameter
- Use Issues helpers where appropriate

Fixes TypeScript errors from breaking change in 1da2dfb"
```

---

## 🚀 After Migration: Start Phase 0.7

Once baseline is green, implement parseAll/generateAll:

### Phase 0: Type Setup (1-1.5h)
Follow **MASTER_PLAN.md** Phase 0:
1. Create `src/core/types/css-value.ts` with CSSValue union
2. Add type guards
3. Update exports
4. Verify: `just check && just test`

### Phase 1: parseAll() (3-4h)
Follow **MASTER_PLAN.md** Phase 1:
- Declaration splitting
- Duplicate detection
- Edge case handling
- Tests

### Phase 2: generateAll() (2-3h)
Follow **MASTER_PLAN.md** Phase 2:
- String passthrough
- IR generation
- Formatting options
- Tests

### Phase 3: Documentation (1-2h)
Follow **MASTER_PLAN.md** Phase 3

---

## 📋 Quick Reference

### Issue Codes
**Parse errors**: `invalid-value`, `unknown-property`, `shorthand-not-supported`, `invalid-syntax`, `missing-value`

**Parse warnings**: `duplicate-property`, `deprecated-syntax`, `legacy-syntax`

**Generate errors**: `invalid-ir`, `missing-required-field`, `unsupported-kind`

### Issues Helpers
```typescript
Issues.duplicateProperty(property, count)
Issues.invalidValue(property, value)
Issues.shorthandNotSupported(property, longhands)
Issues.unknownProperty(property)
Issues.invalidSyntax(message, location?)
Issues.deprecatedSyntax(property, message, suggestion?)
Issues.legacySyntax(property, message, suggestion?)
```

---

## 📁 Files to Read

**Priority 1** (Must read before starting):
1. `MIGRATION.md` - How to fix broken code
2. `MASTER_PLAN.md` - Implementation guide

**Priority 2** (Read while migrating):
3. `SCHEMA.md` - Type definitions
4. `SESSION_SUMMARY.md` - Why we did this

**Priority 3** (Reference):
5. `API_REFERENCE.md` - Final API

---

## ⏱️ Time Estimate

**Migration**: 2-3 hours  
**Phase 0 (Types)**: 1-1.5 hours  
**Phase 1 (parseAll)**: 3-4 hours  
**Phase 2 (generateAll)**: 2-3 hours  
**Phase 3 (Docs)**: 1-2 hours  

**Total**: 10-15 hours across 2-3 sessions

---

## 🎯 Success Criteria

**Migration complete when**:
- ✅ `just check` passes (no TypeScript errors)
- ✅ `just test` passes (2610 tests passing)
- ✅ All parseErr/generateErr calls use IssueCode

**Phase 0.7 complete when**:
- ✅ parseAll() returns single ParseResult with flat object
- ✅ generateAll() returns plain CSS string
- ✅ All edge cases handled (see MASTER_PLAN.md)
- ✅ ~35 new tests passing (2645 total)
- ✅ Documentation updated

---

## 💡 Pro Tips

1. **Migrate incrementally** - Do module by module, not all at once
2. **Use Issues helpers** - Cleaner code, less typing
3. **Let TypeScript guide you** - Follow the error messages
4. **Test frequently** - `just check` after each module
5. **Commit often** - Easy to rollback if needed

---

## 🚨 Don't Skip Migration!

**DO NOT** try to implement parseAll/generateAll with broken types. The migration must happen first because:
- TypeScript won't compile
- Tests won't run
- You'll waste time fixing the same errors twice

---

## 📞 Need Help?

Check these documents:
- **Stuck on migration?** → MIGRATION.md
- **Don't understand types?** → SCHEMA.md
- **Lost context?** → SESSION_SUMMARY.md
- **Ready to implement?** → MASTER_PLAN.md

---

**Good luck!** The hard design work is done. Now it's just execution. 🚀

---

**Updated**: 2025-10-21T16:10:00Z  
**Status**: Migration pending, Phase 0.7 ready to start after migration
