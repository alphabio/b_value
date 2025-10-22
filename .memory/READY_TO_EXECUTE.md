# ✅ READY TO EXECUTE - Generator Fix

**Status**: All planning complete. Clean baseline verified. Ready for execution.

---

## 📚 Documentation Complete

Three precision documents created:

1. **DEFINITIVE_GENERATOR_FIX_PLAN.md** (15KB)
   - Fool-proof step-by-step plan
   - Copy-paste templates for 3 patterns
   - Module-by-module execution order
   - Clear validation rules (type only)
   - Binary success criteria

2. **EXECUTION_CHECKLIST.md** (9KB)
   - Progress tracking
   - 194 files to modify
   - Time estimates per module
   - Checkboxes for each file

3. **ARCHITECTURE_PARSE_GENERATE_SYMMETRY.md** (existing)
   - Rationale for this refactor
   - Why both parse() and generate() need validation

---

## 🎯 The Clean API

**Before (Broken)**:
```typescript
export function toCss(width: Width): string {
  return `${width.value}${width.unit}`;
}
```

**After (Clean)**:
```typescript
import { type GenerateResult, generateErr, generateOk } from "@/core/result";

export function generate(width: Width): GenerateResult {
  if (!width || typeof width !== "object") {
    return generateErr("invalid-ir", "Width must be an object");
  }
  if (!("value" in width) || !("unit" in width)) {
    return generateErr("missing-required-field", "Missing required fields");
  }
  return generateOk(`${width.value}${width.unit}`);
}
```

**No exceptions. No shortcuts. No variations.**

---

## 📊 Scope

- **128 leaf generators** → Add validation, return GenerateResult
- **11 dispatcher generators** → Change `.toCss()` → `.generate()`
- **53 generator test files** → Update assertions
- **Parse test files** → Update round-trip tests
- **Total**: ~194 files to modify

---

## ✅ Baseline Verified

```
✅ Tests: 2938/2938 passing (100%)
✅ Lint: Clean
✅ Typecheck: Clean
✅ Git: Clean working directory
```

---

## 🚀 How to Start

```bash
# 1. Read the definitive plan
cat .memory/DEFINITIVE_GENERATOR_FIX_PLAN.md

# 2. Open the execution checklist
cat .memory/EXECUTION_CHECKLIST.md

# 3. Start with Module 1: Color (12 files, 30 min)
# Use Template 1 from the definitive plan

# 4. Track progress in EXECUTION_CHECKLIST.md
# Check off each file as completed

# 5. Test frequently
pnpm test src/generate/color  # After each module

# 6. Final verification
just test  # All 2938+ tests must pass
```

---

## 🎯 Success Criteria (Binary)

- [ ] Zero `.toCss(` calls in src/ (excluding tests)
- [ ] All 128 leaf generators return `GenerateResult`
- [ ] All 11 dispatchers call `.generate()`
- [ ] All 2938+ tests passing
- [ ] No lint errors
- [ ] No type errors

**If ALL checked**: ✅ SUCCESS  
**If ANY unchecked**: ❌ INCOMPLETE

---

## 🔒 Key Decisions (No Ambiguity)

1. **Validation scope**: Type validation only (not semantics)
2. **Validation level**: Check null/undefined, check typeof, check required fields
3. **Test pattern**: Update all assertions + add ONE validation test per generator
4. **Dispatcher pattern**: Just forward results (no wrapping)
5. **Commit strategy**: All-or-nothing (don't commit until 100% complete)

---

## ⚠️ Critical Rules

1. **Work bottom-up**: Fix leaf generators BEFORE dispatchers
2. **Test frequently**: Run tests after each module
3. **No shortcuts**: Use the exact templates from the plan
4. **No variations**: Every generator follows the same pattern
5. **Binary success**: Either 100% complete or not done

---

## 📝 Time Estimate

- Phase 1 (Leaf generators): 4-5 hours
- Phase 2 (Dispatchers): 30 min
- Phase 3 (Test files): 1-2 hours
- Phase 4 (Parse tests): 30 min
- Phase 5 (Verification): 30 min

**Total**: 6-8 hours focused work

---

## 🎉 Ready?

You have everything needed:
- ✅ Fool-proof plan
- ✅ Copy-paste templates
- ✅ Execution checklist
- ✅ Clean baseline
- ✅ Clear success criteria

**LET'S GO! 🚀**

Open `.memory/DEFINITIVE_GENERATOR_FIX_PLAN.md` and start with Phase 1, Module 1: Color.
