# Issues Found: position/position

**Date**: 2025-10-28

Found 8 mismatches between expected and actual parser behavior.

These need to be reviewed:
- If parser is wrong: Fix parser, then regenerate tests
- If expectation is wrong: Update config, then regenerate tests
- If behavior is intentional: Document as known limitation

---

❌ "static" - static keyword
   Expected: VALID (ok: true)
   Actual: ERROR - undefined

❌ "relative" - relative keyword
   Expected: VALID (ok: true)
   Actual: ERROR - undefined

❌ "absolute" - absolute keyword
   Expected: VALID (ok: true)
   Actual: ERROR - undefined

❌ "fixed" - fixed keyword
   Expected: VALID (ok: true)
   Actual: ERROR - undefined

❌ "sticky" - sticky keyword
   Expected: VALID (ok: true)
   Actual: ERROR - undefined

❌ "RELATIVE" - uppercase relative
   Expected: VALID (ok: true)
   Actual: ERROR - undefined

❌ "Absolute" - mixed case absolute
   Expected: VALID (ok: true)
   Actual: ERROR - undefined

❌ "0" - number value
   Expected: ERROR (ok: false)
   Actual: VALID - {"horizontal":{"value":0,"unit":"px"},"vertical":"center"}
