# Round-Trip Test Failures

**Purpose**: Document any failures discovered during Phase 1 round-trip testing.

**Status**: ✅ All 21 tests passing (as of 2025-10-27)

**Test Location**: `test/integration/roundtrip/` (organized by property category)

---

## Current Status

All round-trip tests are passing! This is excellent news and indicates:
1. Parse → Generate → Parse stability is working correctly
2. No obvious normalization issues
3. IR structures are consistent

---

## Test Coverage

### Test Files (5 files, 21 tests)
1. **color.test.ts** (5 tests) - Named colors, hex, RGB, RGBA, HSL
2. **layout.test.ts** (5 tests) - width/height with various units and keywords
3. **border.test.ts** (4 tests) - border-color, border-width
4. **transform.test.ts** (4 tests) - Individual and multiple transform functions
5. **gradient.test.ts** (3 tests) - Linear gradients with angles and stops

See `test/integration/roundtrip/README.md` for detailed breakdown.

---

## Future Test Additions

**Next batch** (Week 1 continuation):
- [ ] More complex gradients (radial, conic)
- [ ] Shadow properties (box-shadow, text-shadow)
- [ ] Filter functions
- [ ] Clip-path shapes
- [ ] Animation timing functions
- [ ] Transition properties
- [ ] Flex properties
- [ ] Grid properties

---

## Notes

### Normalization Observations
- Hex colors: Need to verify if #ff0000 → #f00 normalization occurs
- RGB: Need to check comma vs space separator normalization
- HSL: Need to verify angle unit handling (deg vs no unit)

All observations so far show consistent behavior with no failures.

---

## Failure Documentation Template

When failures are discovered, document them here:

```markdown
## [Property Name]: [Test Description]

**Date Discovered**: YYYY-MM-DD
**Test Input**: `[original CSS value]`
**Expected Output**: `[what we expect]`
**Actual Output**: `[what we got]`

### Root Cause Analysis
- [ ] Parse bug
- [ ] Generate bug
- [ ] Normalization issue (acceptable)
- [ ] IR structure mismatch
- [ ] Other: [describe]

### Investigation
[Details of investigation]

### Resolution
- [ ] Fixed in commit [hash]
- [ ] Marked as known issue (normalization)
- [ ] Pending investigation
- [ ] Test expectation corrected

### References
- Related issue: #[number]
- Spec reference: [URL]
- Commit: [hash]
```

---

**Last Updated**: 2025-10-27
**Tests Passing**: 21/21 (100%)
**Status**: ✅ Phase 1 foundation solid
