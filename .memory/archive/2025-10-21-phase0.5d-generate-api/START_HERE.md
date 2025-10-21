# START HERE: Phase 0.5d Generate API - Quick Reference

**Last Updated**: 2025-10-21T05:32:00Z  
**Status**: 6/14 modules complete (43%) → 7 modules remaining  
**Next**: Session 1 - shadow module

---

## 🎯 MISSION

Add unified `generate()` function to 7 remaining modules, returning `GenerateResult`.

**Why**: Match parse API symmetry, provide consistent error handling across all modules.

---

## 📊 QUICK STATUS

```
✅ DONE (6):  color, clip-path, gradient, filter, position, transform
🎯 TODO (7):  shadow, transition, outline, border, text, background, animation
⚪ SKIP (1):  layout (no unified IR type)
```

---

## 🚀 QUICK START (Next Agent)

```bash
# 1. Verify baseline
just check && just test  # Should show 2469 tests passing

# 2. Read the master plan
cat .memory/archive/2025-10-21-phase0.5d-generate-api/MASTER_PLAN.md

# 3. Start Session 1: shadow module
# Follow detailed guide in MASTER_PLAN.md → Session 1
```

---

## 📋 SESSION CHECKLIST (Copy for each session)

**Module**: ____________  
**Session**: ___/7  
**Est. time**: 20-40 min

- [ ] Baseline verified (`just check && just test`)
- [ ] Created `src/generate/{module}/{module}.ts`
- [ ] Implemented `generate()` with switch/case
- [ ] Updated `index.ts` exports
- [ ] Added tests (`~8-16 tests`)
- [ ] Validation passes (`just check && just test`)
- [ ] Committed with message: `feat({module}): add unified generate() returning GenerateResult`
- [ ] Updated CONTINUE.md with progress
- [ ] Created handover doc (if ending session)

---

## 🏗️ PATTERN TEMPLATE (Copy-paste)

```typescript
// src/generate/{module}/{module}.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type * as Type from "@/core/types/{module}";
import * as SubType1 from "./{subtype1}";
import * as SubType2 from "./{subtype2}";

export function generate(ir: Type.ModuleUnion): GenerateResult {
  if (!ir || typeof ir !== "object" || !("kind" in ir)) {
    return generateErr("Invalid {module} IR: missing 'kind' field", {
      suggestion: "Ensure IR was parsed correctly",
    });
  }

  switch (ir.kind) {
    case "type1":
      return generateOk(SubType1.toCss(ir));
    case "type2":
      return generateOk(SubType2.toCss(ir));
    default:
      return generateErr(`Unknown {module} kind: ${(ir as any).kind}`, {
        suggestion: "Check that IR is valid",
      });
  }
}
```

**Update index.ts**:
```typescript
export { generate } from "./{module}";
```

---

## 📈 PROGRESS TRACKER

| Session | Module | Tests Added | Total Tests | Status |
|---------|--------|-------------|-------------|--------|
| Baseline | — | — | 2469 | ✅ |
| 1 | shadow | ~10 | ~2479 | 🎯 NEXT |
| 2 | transition | ~16 | ~2495 | ⏳ |
| 3 | outline | ~16 | ~2511 | ⏳ |
| 4 | border | ~16 | ~2527 | ⏳ |
| 5 | text | ~16 | ~2543 | ⏳ |
| 6 | background | ~20 | ~2563 | ⏳ |
| 7 | animation | ~32 | ~2595 | ⏳ |

---

## 🎯 PRIORITY ORDER

1. **shadow** ← START HERE (simplest, 2 types)
2. transition (4 props, similar to animation)
3. outline (4 props, similar to border)
4. border (4 props, similar to outline)
5. text (4 props)
6. background (5 props)
7. animation (8 props, most complex)

---

## 📚 KEY FILES

**Master plan**: `.memory/archive/2025-10-21-phase0.5d-generate-api/MASTER_PLAN.md`  
**Audit report**: `.memory/archive/2025-10-21-phase0.5d-generate-api/AUDIT_REPORT.md` (see commit)  
**Continue doc**: `.memory/CONTINUE.md`

**Examples**:
- Pattern A: `src/generate/color/color.ts`
- Pattern B: `src/generate/position/position-generate.ts`

---

## ⚠️ CRITICAL RULES

1. ✅ **Always verify baseline** before starting (`just check && just test`)
2. ✅ **One module per commit** - don't batch
3. ✅ **Follow pattern exactly** - use templates
4. ✅ **Mirror parse logic** - check `src/parse/{module}/{module}.ts` for IR type checking order
5. ✅ **Test thoroughly** - minimum 8 tests per module
6. ✅ **Update CONTINUE.md** after each module
7. ❌ **Skip layout** - it has no unified IR type

---

## 🔄 WHEN SESSION ENDS

**If completing a module**:
```bash
# Commit
git add src/generate/{module}/
git commit -m "feat({module}): add unified generate() returning GenerateResult"

# Update CONTINUE.md
code .memory/CONTINUE.md
# Update: Progress (X/14 complete), next module

# If ending session, create handover
code .memory/archive/2025-10-21-phase0.5d-generate-api/SESSION_X_HANDOVER.md
```

**If mid-module**:
- Note exactly where you stopped in handover
- Save any WIP code
- Document next steps

---

**Ready to execute Session 1!** 🚀
