# Phase 1: Tier 1 CRITICAL Properties

**Session**: 2025-10-22  
**Goal**: Implement 16 highest-usage CSS properties (90%+ website usage)  
**Target**: v1.0.0 with 110 properties (25% coverage)

---

## Properties to Implement

### Typography (6 properties) - PRIORITY 1
- [ ] `font-style` - italic, oblique, normal
- [ ] `letter-spacing` - normal, length
- [ ] `text-transform` - uppercase, lowercase, capitalize, none
- [ ] `vertical-align` - baseline, sub, super, top, middle, bottom, length, %
- [ ] `word-break` - normal, break-all, keep-all, break-word
- [ ] `overflow-wrap` - normal, break-word, anywhere

### Interaction (3 properties) - PRIORITY 2
- [ ] `pointer-events` - auto, none, visiblePainted, etc.
- [ ] `user-select` - auto, none, text, all, contain
- [ ] `content` - normal, none, string, url(), counter()

### Layout (3 properties) - PRIORITY 3
- [ ] `overflow` - visible, hidden, scroll, auto (maps to overflow-x/y)
- [ ] `float` - none, left, right, inline-start, inline-end
- [ ] `clear` - none, left, right, both, inline-start, inline-end

### Visual (2 properties) - PRIORITY 4
- [ ] `background-blend-mode` - normal, multiply, screen, overlay, etc.
- [ ] `mix-blend-mode` - same values as background-blend-mode

### Background (2 properties) - PRIORITY 5
- [ ] `background-position-x` - left, center, right, length, %
- [ ] `background-position-y` - top, center, bottom, length, %

---

## Implementation Strategy

### Order of Execution
1. **Typography (6)** - Most impact, straightforward enums/lengths
2. **Interaction (3)** - Simple enums, high usage
3. **Layout (3)** - Existing patterns (overflow-x/y done)
4. **Visual (2)** - Blend modes (shared logic)
5. **Background (2)** - Position axis split

### Per-Property Checklist
- [ ] Create parse file with MDM spec reference
- [ ] Implement parser with full value support
- [ ] Create parse tests (edge cases + MDM examples)
- [ ] Create generate file
- [ ] Implement generator
- [ ] Create generate tests
- [ ] Register in universal API
- [ ] Verify with `just check && just test`

### Batch Points
- After Typography: Run full test suite
- After Interaction: Run full test suite
- After Layout: Run full test suite
- Final: Full verification + property count

---

## Estimated Effort

| Group | Properties | Time per prop | Total |
|-------|-----------|---------------|-------|
| Typography | 6 | 45-60min | 4.5-6h |
| Interaction | 3 | 30-45min | 1.5-2.25h |
| Layout | 3 | 30-45min | 1.5-2.25h |
| Visual | 2 | 45-60min | 1.5-2h |
| Background | 2 | 30-45min | 1-1.5h |
| **Total** | **16** | | **10-14h** |

---

## Success Criteria

- ✅ All 16 properties implemented
- ✅ Parse + Generate + Tests for each
- ✅ Registered in universal API
- ✅ All tests passing (2697+ tests)
- ✅ Property count: 110
- ✅ Coverage: 25%
- ✅ Ready for v1.0.0 release

---

## Notes

- Focus on longhand properties only
- Follow existing module patterns
- Use MDM spec as source of truth
- Keep tests comprehensive but concise
