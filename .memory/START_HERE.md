# START HERE - New Agent Onboarding

Welcome to b_value! This guide gets you oriented in 5 minutes.

---

## What is b_value?

**Bidirectional CSS longhand property parser and generator**

```typescript
// Parse CSS → TypeScript
parse("color: #ff0080")
// → { property: "color", value: { kind: "hex", r: 255, g: 0, b: 128 } }

// Generate TypeScript → CSS
generate({ property: "color", value: { kind: "hex", value: "#ff0080" } })
// → "color: #ff0080"
```

**Key Features**:
- Handles **longhand properties only** (not shorthands)
- Type-safe (Zod schemas + TypeScript)
- Universal API: `parse()` and `generate()` auto-route
- Spec-compliant (built on css-tree)

---

## Project Status

**Current**: v0.1.0  
**Coverage**: 51/131 CSS longhand properties (39%)  
**Goal**: 90%+ coverage before v1.0  
**Health**: 92/100 (Excellent)

---

## First Steps

### 1. Verify Baseline
```bash
just check    # Format, lint, typecheck
just test     # Run all tests (should see 2654 passing)
```

### 2. Read Key Documents
- **CONTINUE.md** - Current work context (start here!)
- **MASTER_PROPERTY_PLAN.md** - Roadmap to 90% coverage
- **PROJECT_HEALTH_AUDIT.md** - Latest health assessment

### 3. Understand Architecture
```
src/
├── parse/              # Property parsers (CSS → IR)
│   ├── animation/      # Animation properties
│   ├── color/          # Color properties
│   ├── gradient/       # Gradient properties
│   └── ...
├── generate/           # Property generators (IR → CSS)
│   ├── animation/
│   ├── color/
│   └── ...
├── core/               # Shared types, utilities
├── universal.ts        # Universal parse() API
└── universal-batch.ts  # Batch parseAll() API
```

### 4. Check Current Branch
```bash
git branch --show-current  # Should be: develop
git log --oneline -5       # See recent work
```

---

## Work Pattern

### Starting a Session
1. Check `CONTINUE.md` for latest context
2. Run baseline: `just check && just test`
3. Pick a task from MASTER_PROPERTY_PLAN.md
4. Work, commit frequently

### During Work
- Keep all tests passing
- Follow existing patterns (look at similar properties)
- Update types in `src/core/ir.ts`
- Add tests in `test/`

### Ending a Session
1. Run baseline: `just check && just test`
2. Commit all changes
3. Create handover in `.memory/archive/YYYY-MM-DD-topic/`
4. Update CONTINUE.md with progress
5. Update SESSION_LOG.md

---

## Key Rules

1. **Tests must pass** - All 2654 tests, always
2. **Longhand only** - No shorthand property support
3. **Follow patterns** - Look at existing similar properties
4. **Type everything** - Zod schemas + TypeScript types
5. **Archive sessions** - Document work in `.memory/archive/`

---

## Common Tasks

### Adding a New Property

1. **Parser**: Create `src/parse/[module]/[property].ts`
2. **Generator**: Create `src/generate/[module]/[property].ts`
3. **Types**: Add IR type to `src/core/ir.ts`
4. **Tests**: Add tests in `test/`
5. **Register**: Add to `src/universal.ts` mappings
6. **Export**: Update module barrel exports

### Running Tests
```bash
pnpm test                    # All tests
pnpm test width              # Specific property
pnpm test:coverage           # With coverage report
pnpm test:watch              # Watch mode
```

### Debugging
```bash
# View a property's structure
node -e "console.log(require('./dist/index.js').parse('width: 100px'))"

# Check IR types
code src/core/ir.ts
```

---

## Getting Help

- **MASTER_PROPERTY_PLAN.md** - Roadmap and phase details
- **decisions/** - Architecture Decision Records (ADRs)
- **vocabulary.md** - Project terminology
- **archive/** - Past sessions, solutions to problems

---

## Current Focus

**Phase 1: Box Model (next)**
- Add: width, height, margin-*, padding-*
- Effort: ~4 hours
- Result: 39% → 48% coverage

See CONTINUE.md for latest status and next steps.
