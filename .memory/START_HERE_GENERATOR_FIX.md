# 🚀 START HERE: Generator Fix Mission

**Mission**: Fix 128 generators to return `GenerateResult` with validation  
**Status**: 🔴 READY TO EXECUTE  
**Time Estimate**: 6-8 hours focused work

---

## ⚡ NEW: Definitive Plan Available

**STOP. Read this first**: `.memory/DEFINITIVE_GENERATOR_FIX_PLAN.md`

This is a **fool-proof, step-by-step plan** with:
- ✅ Copy-paste templates (3 patterns)
- ✅ Exact execution order (module-by-module)
- ✅ Clear validation rules (no ambiguity)
- ✅ Binary success criteria
- ✅ No hacks, no noise, clean API

**Execution checklist**: `.memory/EXECUTION_CHECKLIST.md`

---

## Quick Context

**Problem**: 128 generators (92%) don't validate input or return Result types. They throw exceptions instead of returning errors gracefully.

**Why this matters**: Users can construct IR manually (JavaScript has no runtime type safety). Generation MUST validate just like parsing does. This is architectural bedrock.

**Full rationale**: Read `.memory/ARCHITECTURE_PARSE_GENERATE_SYMMETRY.md`

---

## What You Need To Read (In Order)

1. **`.memory/DEFINITIVE_GENERATOR_FIX_PLAN.md`** (10 min) ⭐ **READ THIS FIRST**
   - Fool-proof execution plan
   - Copy-paste templates
   - Exact module order
   - Zero ambiguity

2. **`.memory/EXECUTION_CHECKLIST.md`** (5 min)
   - Track your progress
   - Check off completed files
   - Time estimates per module

3. **`.memory/ARCHITECTURE_PARSE_GENERATE_SYMMETRY.md`** (5 min)
   - WHY we're doing this
   - The failure modes
   - Never repeat this conversation

4. **`.memory/GENERATOR_COMPLETE_AUDIT.txt`** (reference)
   - Full audit of all 138 generators
   - Pattern analysis

---

## The Plan (High Level)

### Phase 1: Prepare (30 min)
- Create validation utility
- Identify all callsites
- Set up tracking

### Phase 2: Fix Generators (4-5 hours)
Work in batches (one module at a time):
1. Animation (8 files)
2. Background (7 files)
3. Border (4 files)
4. Clip-Path (10 files)
5. Color (12 files)
6. Filter (11 files)
7. Flexbox (11 files)
8. Gradient (4 files)
9. Interaction (2 files)
10. Layout (34 files)
11. Outline (4 files)
12. Shadow (2 files)
13. Text (4 files)
14. Transform (1 file)
15. Transition (4 files)
16. Typography (11 files)
17. Visual (2 files)

**Total: 128 files to fix**

### Phase 3: Update Callsites (1-2 hours)
- Fix 11 dispatcher generators
- Fix test files
- Verify no remaining `.toCss(` calls

### Phase 4: Update Tests (1-2 hours)
- Update 53 test files
- Add validation tests
- Verify all pass

### Phase 5: Verify (30 min)
- Run full test suite
- Run linter
- Run typecheck
- Commit

---

## The Pattern

### Before (BROKEN):
```typescript
export function toCss(width: Width): string {
if (typeof width.value === "string") {
return width.value;
}
return GenUtils.lengthPercentageToCss(width.value);
}
```

### After (CORRECT):
```typescript
import { type GenerateResult, generateErr, generateOk } from "@/core/result";

export function generate(width: Width): GenerateResult {
// Validate IR structure
if (!width || typeof width !== "object") {
return generateErr("invalid-ir", "Width IR must be an object");
}

if (!("kind" in width)) {
return generateErr("missing-required-field", "Missing 'kind' field");
}

if (!("value" in width)) {
return generateErr("missing-required-field", "Missing 'value' field");
}

// Generate CSS
let css: string;
if (typeof width.value === "string") {
css = width.value;
} else {
css = GenUtils.lengthPercentageToCss(width.value);
}

return generateOk(css);
}
```

---

## Execution Checklist

**Before you start**:
- [ ] Read ARCHITECTURE_PARSE_GENERATE_SYMMETRY.md
- [ ] Read MASTER_PLAN_GENERATOR_FIX.md
- [ ] Verify baseline: `just check && just test`
- [ ] Create branch (optional): `git checkout -b refactor/generator-validation`

**During execution**:
- [ ] Work in small batches (one module at a time)
- [ ] Update GENERATOR_FIX_TRACKER.md after each file
- [ ] Run tests frequently (`just test`)
- [ ] Track time spent
- [ ] Note any blockers or issues

**After completion**:
- [ ] Verify baseline: `just check && just test`
- [ ] All 2938+ tests passing
- [ ] No lint errors
- [ ] No type errors
- [ ] Update STATUS.md
- [ ] Commit with proper message (see master plan)

---

## Critical Success Factors

✅ **Understand WHY** - Read the architecture doc first  
✅ **Work in batches** - One module at a time  
✅ **Test frequently** - Don't let errors accumulate  
✅ **Track progress** - Update the tracker  
✅ **Stay consistent** - Use the same pattern everywhere  
✅ **Don't skip validation** - That's the whole point  

---

## If You Get Stuck

1. **Read the reference implementations**:
   - `src/generate/color/color.ts` (good dispatcher)
   - `src/generate/gradient/gradient.ts` (another good example)

2. **Check the master plan** for detailed guidance

3. **Look at the audit** to understand current state

4. **Create a handover** if you need to stop:
   - Update GENERATOR_FIX_TRACKER.md with progress
   - Note any blockers in STATUS.md
   - Archive this session

---

## Quick Commands

```bash
# Find all .toCss( callsites
grep -r "\.toCss(" src/ --include="*.ts" | wc -l

# Count remaining files to fix
find src/generate -name "*.ts" -type f ! -name "*.test.ts" -exec grep -L "GenerateResult" {} \; | wc -l

# Run tests for specific module
pnpm test src/generate/layout

# Run full test suite
just test

# Lint and format
just check
```

---

## Ready?

You have:
- ✅ Complete master plan
- ✅ Progress tracker
- ✅ Architecture rationale
- ✅ Reference implementations
- ✅ Execution checklist
- ✅ Clean baseline (2938 tests passing)

**Time to execute! 🚀**

Open `.memory/MASTER_PLAN_GENERATOR_FIX.md` and start with Phase 1.
