# b_value: Action Plan

**Goal**: Extract CSS value parsing/generation from b_gee into a focused, reusable library that provides bidirectional CSS ⇄ IR transformation.

## What We're Extracting from b_gee

**From `/src/core`** (~5,855 lines, 71 files):
- ✅ **Types**: Zod schemas + TypeScript types for CSS values (gradients, positions, lengths, angles, colors)
- ✅ **Units**: All CSS unit schemas (length, angle, percentage, time, frequency)
- ✅ **Keywords**: ~4,300 lines of CSS keyword schemas (colors, positions, blend modes, etc.)
- ✅ **Result**: Rust-style Result<T,E> type for error handling

**From `/src/ast`**:
- ✅ **Parse**: CSSTree-based parsers that convert CSS strings → IR (positions, gradients, colors, transforms, etc.)
- ✅ **Generate**: Functions that convert IR → CSS strings (bidirectional!)

## Architecture Vision

```
b_value/
├── core/           # Extracted from b_gee/src/core
│   ├── types/      # Zod schemas for CSS values
│   ├── units/      # Unit schemas (px, deg, %, etc.)
│   ├── keywords/   # CSS keyword schemas
│   └── result.ts   # Result<T,E> type
├── parse/          # Extracted from b_gee/src/ast/parse
│   ├── gradient/   # Gradient parsers
│   ├── position/   # Position parsers
│   ├── color/      # Color parsers
│   └── ...
├── generate/       # Extracted from b_gee/src/ast/generate
│   ├── gradient/   # Gradient stringifiers
│   ├── position/   # Position stringifiers
│   └── ...
└── index.ts        # Main exports
```

## Iterative Implementation Plan

### Phase 1: Foundation (Session 1)
**Goal**: Establish core infrastructure with one complete example

1. ✅ Create session directory
2. Copy `core/` wholesale from b_gee
   - `core/types/`
   - `core/units/`
   - `core/keywords/`
   - `core/result.ts`
3. Update imports (remove `@/` aliases, adjust paths)
4. Add `css-tree` dependency
5. Copy ONE complete value system as proof-of-concept:
   - `parse/gradient/radial.ts`
   - `generate/gradient/radial.ts`
   - Dependencies (color-stop, position parsers/generators)
6. Create simple API entry point
7. Write integration test (CSS → IR → CSS round-trip)
8. `just check && just test` (must pass)
9. Commit: "feat: foundation with radial-gradient support"

**Success Metric**: Can parse and generate radial-gradient values end-to-end

---

### Phase 2: Complete Gradients (Session 2)
**Goal**: Full gradient support (linear, radial, conic)

1. Copy remaining gradient parsers:
   - `parse/gradient/linear.ts`
   - `parse/gradient/conic.ts`
   - `parse/gradient/direction.ts`
2. Copy remaining gradient generators
3. Add comprehensive tests for all gradient types
4. Update README with gradient examples
5. `just check && just test`
6. Commit: "feat: complete gradient support"

**Success Metric**: All gradient types parse/generate correctly

---

### Phase 3: Positions & Transforms (Session 3)
**Goal**: Position-based values (transform-origin, perspective-origin, object-position)

1. Copy position parsers
2. Copy position generators
3. Add transform parsers/generators
4. Tests + documentation
5. `just check && just test`
6. Commit: "feat: position and transform support"

**Success Metric**: Can handle all position-based CSS values

---

### Phase 4: Colors & Backgrounds (Session 4)
**Goal**: Color parsing and background properties

1. Copy color parsers/generators
2. Copy background parsers/generators
3. Tests + documentation
4. `just check && just test`
5. Commit: "feat: color and background support"

**Success Metric**: Complete background property handling

---

### Phase 5: Borders & Box Model (Session 5)
**Goal**: Border, margin, padding values

1. Copy border parsers/generators
2. Copy box-model parsers/generators
3. Tests + documentation
4. `just check && just test`
5. Commit: "feat: border and box-model support"

**Success Metric**: Full box model value support

---

### Phase 6: Layout (Flexbox, Grid) (Session 6)
**Goal**: Layout system values

1. Copy flexbox parsers/generators
2. Copy grid parsers/generators
3. Tests + documentation
4. `just check && just test`
5. Commit: "feat: layout system support"

**Success Metric**: Flexbox and Grid value handling

---

### Phase 7: Text & Fonts (Session 7)
**Goal**: Typography-related values

1. Copy text parsers/generators
2. Copy font parsers/generators
3. Copy text-decoration parsers/generators
4. Tests + documentation
5. `just check && just test`
6. Commit: "feat: typography support"

**Success Metric**: Complete text/font value support

---

### Phase 8: Polish & Documentation (Session 8)
**Goal**: Production-ready release

1. Write comprehensive README
   - What is b_value?
   - Why bidirectional parsing?
   - API documentation
   - Usage examples
   - Comparison to alternatives
2. Add JSDoc to all public APIs
3. Create examples directory
4. Performance benchmarks
5. Update package.json metadata
6. `just check && just test && just bench`
7. Commit: "docs: comprehensive documentation"

**Success Metric**: Professional, usable library

---

### Phase 9: Release (Session 9)
**Goal**: Publish v0.1.0

1. Final audit
2. Verify all tests pass
3. Build package
4. Publish to npm
5. Update START_HERE.md
6. Commit: "chore: release v0.1.0"

**Success Metric**: Published on npm, ready for use

---

## Quality Gates (Every Session)

```bash
just check   # Format, typecheck, lint (must pass)
just test    # All tests (must pass)
git status   # Clean working tree
```

## Success Criteria

- ✅ All code extracted from b_gee
- ✅ 100% test coverage maintained
- ✅ Bidirectional parsing works (CSS ⇄ IR)
- ✅ Zero external dependencies (except css-tree + zod)
- ✅ Fully typed with comprehensive JSDoc
- ✅ Published to npm
- ✅ b_gee updated to use b_value as dependency

## Next Steps

**START WITH PHASE 1** - Let's build the foundation with radial-gradient as our proof-of-concept. This will validate the architecture and establish patterns for all subsequent phases.

Ready to begin Phase 1?
