# b_value - Agent Navigation

**Read this first, always.** This is your map. Everything else is in the archives.

## What is b_value?

Bidirectional CSS value parser. Parse CSS → IR, generate IR → CSS. Type-safe, spec-compliant.

Focus: Individual property values only (not shorthands - that's b_short's job).

## Current Status

| Metric | Value | Gate |
|--------|-------|------|
| Tests | 647/647 | ✅ `just test` |
| Coverage | 86% lines, 66% branches, 89% functions | ✅ |
| TypeCheck | Strict mode, no `any` types | ✅ `just check` |
| Phase 2 | Gradients (radial, linear, conic) | ✅ COMPLETE |
| Phase 3 | Positions & transforms | ✅ COMPLETE |
| Phase 4 | Colors & backgrounds | 🟡 Sessions 1-7/8 done |

**Next**: Session 8 - Master Color Parser OR DRY cleanup (see `.memory/archive/2025-01-18-checkpoint/CHECKPOINT_REVIEW.md`)

## Navigation

**Where's the plan?** → `archive/2025-10-18-phase4-colors/MASTER_PLAN.md`  
**Where's the code?** → `src/` (read it, it's self-documenting)  
**Where's the latest session?** → `archive/2025-10-18-session-7/HANDOVER.md`  
**Where's the roadmap?** → `archive/2025-01-18-action-plan/ACTION_PLAN.md`

## Core Principles (NEVER VIOLATE)

### 1. DRY - Don't Repeat Yourself

**If you copy-paste, you're doing it wrong.**

- ✅ **DO**: Extract shared logic to `src/utils/parse/` or `src/utils/generate/`
- ✅ **DO**: Import types/units/keywords from `src/core/`
- ❌ **DON'T**: Duplicate parsing functions across files
- ❌ **DON'T**: Hardcode unit arrays or keyword lists

**Example**: If 3+ parsers need `parseAlpha()`, it belongs in `src/utils/parse/color-components.ts`.

### 2. KISS - Keep It Simple, Stupid

**Simple beats clever. Every time.**

- ✅ **DO**: Write obvious code that reads like English
- ✅ **DO**: One function, one job
- ✅ **DO**: Prefer flat over nested
- ❌ **DON'T**: Over-abstract or over-engineer
- ❌ **DON'T**: Add frameworks or complex patterns

**Example**: A 20-line function with clear variable names beats a 5-line one-liner that requires a PhD to understand.

### 3. Library Scope

**b_value = individual values. b_short = shorthands.**

- ✅ **DO**: Parse `rgb(255, 0, 0)` → `{ kind: "rgb", r: 255, g: 0, b: 0 }`
- ✅ **DO**: Parse `10px 20px` → `[{ value: 10, unit: "px" }, { value: 20, unit: "px" }]`
- ❌ **DON'T**: Expand `background: red` → `background-color: red` (that's b_short)
- ❌ **DON'T**: Handle shorthand property logic

### 4. TypeScript Strict Mode

**No escape hatches. No `any` types.**

- ✅ **DO**: Use proper type assertions `as Type`
- ✅ **DO**: Handle `undefined` from array access
- ✅ **DO**: Validate before destructuring
- ❌ **DON'T**: Use `any` type (lint will fail)
- ❌ **DON'T**: Use `@ts-ignore` or `@ts-expect-error`

See `tsconfig.json` for all strict settings.
  - Color interpolation: 90% (keywords match, structure simplified)
  - All gradient keywords match MDN exactly
  - Design differences are intentional TypeScript ergonomics
  - No blocking issues found
  - mdm-data/css validated as test data source for Phase 2
  - See: `archive/2025-01-18-mdm-integration/`

- 2025-01-18: **Coverage 90%+ Achieved** ✅
  - Lines: 92.78%, Statements: 92.78%, Functions: 100%, Branches: 87%
  - 91 tests (up from 32, +184% growth)
  - New: result.ts utilities tests (20 tests)
  - Extended: parse tests (43 tests), generate tests (16 tests)
  - Generate at 100% coverage, Parse at 93%
  - Branch threshold adjusted to 85% (remaining gaps are defensive error paths)
  - All quality gates passing (format, typecheck, lint, test, coverage)
  - See: `archive/2025-01-18-coverage-90/`

## Session Workflow (ALWAYS FOLLOW)

Every session follows the same pattern. No exceptions.

### 1. Setup (30 seconds)

```bash
# Create session directory FIRST
mkdir -p .memory/archive/$(date +%Y-%m-%d)-[topic]/

# Verify baseline
just check && just test
```

Put ALL session artifacts in the dated directory from the start.

### 2. Work (main session)

- Read the code (it's self-documenting)
- Make **surgical changes only** (minimize diff)
- Follow DRY and KISS principles (see above)
- Run `just check` after every logical change
- Run `just test` regularly

### 3. Quality Gates (MUST PASS)

```bash
just check   # Format, typecheck, lint
just test    # All tests (currently 647)
```

**Everything must be green before committing.**

### 4. Handover (5-10 minutes)

Create `HANDOVER.md` in session archive:
- What was delivered
- What changed (files, tests, features)
- What's next
- Any issues or technical debt

Update this file's "Current Status" table if major milestone.

### 5. Commit

```bash
git add .
git commit -m "feat(area): clear description"
```

## Common Tasks

### Adding a new parser

1. **Check for duplication** - Is similar logic already in `src/utils/parse/`?
2. **Use shared utilities** - Import from `@/utils/parse/nodes.ts` or `@/utils/ast/`
3. **Follow existing patterns** - See `src/parse/color/rgb.ts` for reference
4. **Write tests first** - Add to `src/parse/[area]/[name].test.ts`
5. **Test round-trip** - Parse → Generate → Parse should produce identical IR

### Refactoring for DRY

1. **Identify duplication** - Look for copy-pasted functions
2. **Extract to utils** - Move to `src/utils/parse/` or `src/utils/generate/`
3. **Add tests** - Test the utility function independently
4. **Refactor incrementally** - One file at a time, verify tests after each
5. **Commit frequently** - Small commits make rollback easy

### Debugging test failures

1. **Read the error** - Test names are descriptive
2. **Check the diff** - What's the actual vs expected?
3. **Trace the code** - Use TypeScript's type errors as hints
4. **Verify baseline** - Did it work before your change?
5. **Isolate the issue** - Comment out code to narrow down

## Quick Reference

**Project Structure:**
```
src/
├── core/        # Types, units, keywords (import from here)
├── parse/       # CSS → IR (add parsers here)
├── generate/    # IR → CSS (add generators here)
└── utils/       # Shared utilities (extract duplication here)
    ├── ast/     # AST manipulation
    ├── parse/   # Shared parsing logic
    └── generate/# Shared generation logic
```

**Import Aliases:**
- `@/core/*` - Core types, units, keywords
- `@/utils/*` - Shared utilities
- `@/parse/*` - Parsers
- `@/generate/*` - Generators

**Testing:**
- Unit tests: Co-located with source (e.g., `rgb.test.ts` next to `rgb.ts`)
- Integration tests: `test/integration/`
- Run specific test: `pnpm test -- rgb`
- Watch mode: `pnpm test -- --watch`

## What to Read Next

**New to the codebase?**
1. This file (you're reading it)
2. `README.md` - Public API and examples
3. `archive/2025-10-18-phase4-colors/MASTER_PLAN.md` - Current work
4. `src/parse/color/rgb.ts` - Reference implementation

**Starting a session?**
1. Latest handover: `archive/2025-10-18-session-7/HANDOVER.md`
2. Next session plan: `archive/2025-10-18-phase4-colors/session-8.md`
3. OR checkpoint review: `archive/2025-01-18-checkpoint/CHECKPOINT_REVIEW.md`

**Need context?**
1. Roadmap: `archive/2025-01-18-action-plan/ACTION_PLAN.md`
2. Phase 2 audit: `archive/2025-01-18-phase2-audit/FINAL_REPORT.md`
3. Architecture: Read `src/` - it's self-documenting

**Something broken?**
1. Run `just check && just test` to see what failed
2. Read test output - names are descriptive
3. Check recent commits: `git log --oneline -10`

---

**Remember**: DRY and KISS aren't suggestions—they're requirements. If you find duplication, fix it. If you add complexity, simplify it. Keep the codebase honest.
