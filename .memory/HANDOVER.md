# Handover: Result<T, string> → ParseResult Migration

**Date**: 2025-10-22T08:35:00Z  
**From**: Agent (background-position-x/y completed)  
**To**: Next Agent

## Session Summary

✅ **Completed**:
1. Comprehensive audit of `Result<T, string>` usage across codebase
2. Documented migration strategy and priorities
3. All changes committed

## Critical Finding: Result Migration Priority

**The user explicitly stated**: "Let's complete this final issue and pivot to Result<T, string> <-- this is key"

This means **Result migration is now TOP PRIORITY** over completing the `content` property.

## Current State

### Migration Status
- **133 files** still using old `Result<T, string>` format
- **17 files** already migrated to `ParseResult<T>`
- **All properties work** due to `wrapParser()` safety mechanism

### Safety Net
The `wrapParser()` function in `src/universal.ts` automatically converts old `Result<T, string>` to `ParseResult<T>`, so everything works today. Migration is for code quality.

## Recommended Next Steps

### Step 1: Migrate Background Module (6 files) ⭐ START HERE
This is the **perfect starting point**:
- Small scope (6 files)
- High priority
- Will establish pattern for other modules

**Files to migrate**:
1. `src/parse/background/attachment.ts`
2. `src/parse/background/clip.ts`
3. `src/parse/background/origin.ts`
4. `src/parse/background/repeat.ts`
5. `src/parse/background/size.ts`
6. `src/parse/background/image.ts` (already partially migrated)

### Migration Pattern

**Before** (old Result<T, string>):
```typescript
import { err, ok, type Result } from "@/core/result";

export function parse(css: string): Result<SomeType, string> {
  const trimmed = css.trim();
  const result = schema.safeParse(trimmed);
  
  if (!result.success) {
    return err(`Invalid value: "${css}"`);
  }
  
  return ok(result.data);
}
```

**After** (new ParseResult<T>):
```typescript
import { createIssue, type ParseResult } from "@/core/result";

export function parse(css: string): ParseResult<SomeType> {
  const trimmed = css.trim();
  const result = schema.safeParse(trimmed);
  
  if (!result.success) {
    return {
      ok: false,
      issues: [
        createIssue({
          code: "invalid_value",
          message: `Invalid value: "${css}"`,
          severity: "error",
        }),
      ],
    };
  }
  
  return {
    ok: true,
    value: result.data,
    issues: [],
  };
}
```

### Step 2: Update Tests
Each migrated file needs test updates to expect `ParseResult` format:
- Old: `expect(result.ok).toBe(true)` → `expect(result.value)`
- New: `expect(result.ok).toBe(true)` → `expect(result.issues).toEqual([])`

### Step 3: After Background Module
Continue with these high-priority modules:
1. **Border** (4 files) - common, similar pattern
2. **Typography** (11 files) - high-impact
3. **Flexbox** (11 files) - common
4. **Layout** (30 files) - largest, save for when pattern is solid

## Key Files

- **Audit Report**: `.memory/archive/result-migration-audit.md`
- **Migration Helper**: `src/core/result.ts` (has `createIssue`, `toParseResult`)
- **Reference Implementation**: `src/parse/background/position-x.ts` (already migrated)
- **Wrapper**: `src/universal.ts` (`wrapParser` function)

## Commands

```bash
# Run tests
just test

# Check baseline
just check

# Property count
.memory/scripts/count-properties.sh
```

## Important Notes

1. **Don't rush** - Quality over speed
2. **Test thoroughly** - Each migration should pass all tests
3. **Use reference** - Look at `position-x.ts` for the pattern
4. **Update incrementally** - Commit after each file or small batch
5. **Keep wrapParser()** - Don't remove until ALL files migrated

## Current Metrics

- **Properties**: 109/446 (24.4%)
- **Phase 1**: 15/16 (94% complete)
- **Tests**: 3032/3032 passing (100%)
- **Build**: ✅ Clean

## User Preference

User wants to **pivot to Result migration** rather than complete the `content` property. This is a **strategic decision** to improve code quality foundation before adding more properties.

---

**Next agent**: Start with `attachment.ts` migration, run tests, commit, then continue with the remaining 5 Background files. Good luck! 🚀
