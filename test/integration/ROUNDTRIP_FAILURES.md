# Round-Trip Test Failures

**Purpose**: Document any failures discovered during Phase 1 round-trip testing.

**Status**: ✅ All 21 tests passing (as of 2025-10-27)

---

## Current Status

All round-trip tests are passing! This is excellent news and indicates:
1. Parse → Generate → Parse stability is working correctly
2. No obvious normalization issues
3. IR structures are consistent

---

## Test Coverage

### Properties Tested (21 tests)
1. **color** (5 tests)
   - Named colors (red)
   - Hex colors (#ff0000)
   - RGB (rgb(255, 0, 0))
   - RGBA with alpha (rgba(255, 0, 0, 0.5))
   - HSL (hsl(0, 100%, 50%))

2. **width** (4 tests)
   - Pixels (100px)
   - Percentage (50%)
   - Em units (2.5em)
   - Viewport width (80vw)

3. **height** (1 test)
   - Keyword (auto)

4. **border-color** (2 tests)
   - Named color (blue)
   - Transparent keyword

5. **border-width** (2 tests)
   - Length (2px)
   - Keyword (thin)

6. **transform** (4 tests)
   - Translate (translate(10px, 20px))
   - Rotate (rotate(45deg))
   - Scale (scale(1.5))
   - Multiple transforms (translate + rotate)

7. **linear-gradient** (3 tests)
   - Simple (linear-gradient(red, blue))
   - With angle (linear-gradient(45deg, red, blue))
   - With color stops (linear-gradient(red 0%, blue 100%))

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
