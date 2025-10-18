# b_value

```yaml
version: 0.1.0
date: 2025-01-18
tests: 77 passing (100%)
coverage: High
status: Phase 1 complete - Foundation established
```

## Recent Activity

- 2025-01-18: **Phase 1 Complete** - Foundation with radial-gradient support
  - Core infrastructure extracted from b_gee (71 files, ~5,855 lines)
  - Radial gradient parse/generate fully working
  - 16 new gradient tests (all passing)
  - Bidirectional CSS ⇄ IR transformation validated
  - See: `archive/2025-01-18-action-plan/PHASE_1_SUMMARY.md`

## Context

**b_value** - Bidirectional CSS value parser. The "Rosetta Stone" for CSS values.

Parse CSS values to structured IR and generate CSS from IR. Built on css-tree and Zod for type-safe, spec-compliant CSS value handling.

### What We Have Now (Phase 1)

```typescript
import { Parse, Generate } from "b_value";

// Parse CSS → IR
const result = Parse.Gradient.Radial.parse(
  "radial-gradient(circle at center, red 0%, blue 100%)"
);

// Generate IR → CSS
const css = Generate.Gradient.Radial.toCss(result.value);
```

### Architecture

```
b_value/
├── core/           # Types, units, keywords from b_gee
│   ├── types/      # Zod schemas (gradients, positions, colors, etc.)
│   ├── units/      # Length, angle, percentage units
│   ├── keywords/   # 4,300+ lines of CSS keywords
│   └── result.ts   # Result<T,E> error handling
├── parse/          # CSS → IR parsers
│   └── gradient/   # ✅ Radial gradient (complete)
└── generate/       # IR → CSS generators
    └── gradient/   # ✅ Radial gradient (complete)
```

## Roadmap

**9-Phase Plan** (see `archive/2025-01-18-action-plan/ACTION_PLAN.md`)

- ✅ **Phase 1**: Foundation + radial-gradient (DONE)
- ⏳ **Phase 2**: Complete gradients (linear, conic, direction)
- 🔜 **Phase 3**: Positions & transforms
- 🔜 **Phase 4**: Colors & backgrounds
- 🔜 **Phase 5**: Borders & box model
- 🔜 **Phase 6**: Layout (flexbox, grid)
- 🔜 **Phase 7**: Typography
- 🔜 **Phase 8**: Polish & documentation
- 🔜 **Phase 9**: Release v0.1.0

## For New Agents

**Every session starts the same way**:

```bash
mkdir -p ./.memory/archive/$(date +%Y-%m-%d)-[topic]/
```

Put ALL session artifacts in this directory from the start.

**Working process:**
- Run `just check` after changes (format + typecheck + lint)
- Run `just test` regularly to verify correctness
- Commit work frequently with clear messages
- Everything must be green before final commit
- Update START_HERE.md at session end with outcomes

**Quality gates:**

```bash
just check   # Format, typecheck, lint (must pass)
just test    # 77 tests (must all pass)
```

## Next Steps

**Phase 2**: Complete gradient support
- Linear gradients
- Conic gradients
- Gradient direction parsing
- Comprehensive tests for all types
- Update README with examples

**Ready to continue!**

