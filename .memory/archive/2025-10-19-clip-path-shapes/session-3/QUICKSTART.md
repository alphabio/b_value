# Session 3 Quick Start

**Goal**: Implement `inset()` basic shape function  
**Time**: 45-60 minutes  
**Tests**: +30-40 new tests

---

## TL;DR

Implement CSS `inset()` function for clip-path with TRBL syntax and optional border-radius.

**Syntax**: `inset( <length-percentage>{1,4} [ round <'border-radius'> ]? )`

---

## Start Here

```bash
# 1. Read the plan
cat .memory/archive/2025-10-19-clip-path-shapes/session-3/PLAN.md

# 2. Start Phase 1: TRBL utility
# Edit: src/utils/parse/nodes.ts
# Add: parseTRBLLengthPercentage function

# 3. Follow phases in order
# Phase 1: TRBL utility (~15 min)
# Phase 2: Border-radius utility (~10 min)  
# Phase 3: IR types (~5 min)
# Phase 4: Parser (~15 min)
# Phase 5: Generator (~10 min)

# 4. Run quality gates
just check && just test
```

---

## Key Files

### Read First
- `PLAN.md` - Detailed implementation guide
- `DRY_ANALYSIS.md` - Utility inventory and patterns

### Create
- `src/utils/parse/nodes.test.ts` - Utility tests
- `src/parse/clip-path/inset.ts` - Parser
- `src/parse/clip-path/inset.test.ts` - Parser tests
- `src/generate/clip-path/inset.ts` - Generator
- `src/generate/clip-path/inset.test.ts` - Generator tests

### Modify
- `src/utils/parse/nodes.ts` - Add utilities
- `src/core/types/clip-path.ts` - Add IR types
- `src/parse/clip-path/index.ts` - Export parser
- `src/generate/clip-path/index.ts` - Export generator

---

## Existing Utilities to Use

✅ **Parse Utils** (`src/utils/parse/nodes.ts`):
- `parseLengthPercentageNode(node)` - Parse individual values

✅ **AST Utils** (`src/utils/ast/functions.ts`):
- `findFunctionNode(ast, "inset")` - Find function
- `parseFunctionArguments(fn)` - Extract args

✅ **Generate Utils** (`src/utils/generate/values.ts`):
- `lengthPercentageToCss(value)` - Generate CSS

---

## CSS 4-Value Syntax Rules

```
1 value:  inset(10px)           → all sides 10px
2 values: inset(10px 20px)      → vertical 10px, horizontal 20px
3 values: inset(10px 20px 30px) → top 10px, h 20px, bottom 30px
4 values: inset(10px 20px 30px 40px) → TRBL (clockwise from top)
```

Border-radius uses same expansion (clockwise from top-left).

---

## Test Coverage

### Utilities (~18 tests)
- TRBL: 1-4 values, mixed units, unitless zero, errors
- Border-radius: 1-4 values, non-negative, errors

### Parser (~20 tests)
- Basic TRBL variations
- Border-radius variations
- Edge cases and errors

### Generator (~14 tests)
- TRBL optimization
- Border-radius optimization
- Round-trip validation

**Total**: ~52 tests (likely ~30-40 after deduplication)

---

## Success Criteria

- [ ] ~30-40 new tests passing
- [ ] All utilities in `utils/` (not duplicated)
- [ ] Round-trip validation working
- [ ] `just check` passing
- [ ] `just test` passing (1932 → ~1970)

---

## Quick Commands

```bash
# Run tests for specific file
pnpm test -- inset

# Run all tests
just test

# Format + typecheck + lint
just check

# Watch mode (optional)
pnpm test -- --watch inset
```

---

## Need Help?

1. Check `PLAN.md` for detailed phase instructions
2. Check `DRY_ANALYSIS.md` for utility patterns
3. Reference existing parsers:
   - `src/parse/layout/top.ts` - TRBL pattern
   - `src/parse/border/radius.ts` - Radius pattern
4. Reference existing generators:
   - `src/generate/layout/top.ts` - Simple generation
   - `src/generate/border/radius.ts` - Value generation

---

**Ready? Start with Phase 1 in PLAN.md!** 🚀
