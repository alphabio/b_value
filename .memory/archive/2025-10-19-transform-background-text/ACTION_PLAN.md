# Action Plan: Transform-origin, Background, Text-decoration Properties

**Session**: 2025-10-19-transform-background-text  
**Goal**: Implement 3 property domains (transform-origin + perspective-origin, background properties, text-decoration properties)  
**Estimated**: 5-7 hours total

---

## Phase 1: Transform-origin & Perspective-origin (1-2h) ⭐ QUICK WIN

### Properties
1. `transform-origin` - Parse/generate 2D and 3D positions
2. `perspective-origin` - Parse/generate 2D positions

### Implementation
- **Reuse**: Existing position parsing from `src/parse/position/position.ts`
- **Parser**: `src/parse/transform/origin.ts` + tests
- **Generator**: `src/generate/transform/origin.ts` + tests
- **Exports**: Add to parse/generate transform index

### Tests
- 2D positions (keywords, lengths, percentages)
- 3D positions (for transform-origin)
- Round-trip validation

---

## Phase 2: Background Properties (3-4h)

### Properties
1. `background-size` - Parse/generate size keywords + lengths
2. `background-repeat` - Parse/generate repeat keywords
3. `background-attachment` - Parse/generate attachment keywords
4. `background-clip` - Parse/generate clip keywords
5. `background-origin` - Parse/generate origin keywords

### Implementation
- **Types**: Add to `src/core/types/` if needed
- **Keywords**: Use/extend `src/core/keywords/`
- **Parser**: `src/parse/background/` domain
- **Generator**: `src/generate/background/` domain
- **Exports**: Add to parse/generate index

### Tests
- All keyword combinations
- Size values (contain, cover, lengths, percentages)
- Lists (comma-separated for multi-backgrounds)
- Round-trip validation

---

## Phase 3: Text Decoration Properties (2-3h)

### Properties
1. `text-decoration-color` - Parse/generate colors
2. `text-decoration-style` - Parse/generate style keywords
3. `text-decoration-thickness` - Parse/generate length/percentage/auto
4. `text-decoration-line` - Parse/generate line keywords

### Implementation
- **Reuse**: Color parsing, similar patterns to border/outline
- **Parser**: `src/parse/text/` domain
- **Generator**: `src/generate/text/` domain
- **Exports**: Add to parse/generate index

### Tests
- All style keywords
- Color values (reuse color tests patterns)
- Thickness values
- Line keywords (underline, overline, line-through, none)
- Round-trip validation

---

## Execution Strategy

1. **Transform-origin first** (fastest ROI)
2. **Test immediately** after each property
3. **Background properties** (leverage gradient work)
4. **Text decoration** (reuse border/outline patterns)
5. **Final validation** (all tests, check, commit)

---

## Quality Gates

```bash
just check   # After each domain
just test    # After each property set
```

Target: 1456 → 1600+ tests

---

## Expected Outcomes

- ✅ Transform-origin + perspective-origin complete
- ✅ 5 background properties complete
- ✅ 4 text-decoration properties complete
- ✅ ~150+ new tests
- ✅ Round-trip validation for all
- ✅ Clean commit history (one per domain)
