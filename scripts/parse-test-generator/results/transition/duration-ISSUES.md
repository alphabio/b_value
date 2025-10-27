# Issues Found: transition/duration

**Date**: 2025-10-27

Found 4 mismatches between expected and actual parser behavior.

These need to be reviewed:
- If parser is wrong: Fix parser, then regenerate tests
- If expectation is wrong: Update config, then regenerate tests
- If behavior is intentional: Document as known limitation

---

❌ "auto" - auto keyword
   Expected: VALID (ok: true)
   Actual: ERROR - transition-duration: Expected time dimension, got: Identifier

❌ "AUTO" - case insensitive auto
   Expected: VALID (ok: true)
   Actual: ERROR - transition-duration: Expected time dimension, got: Identifier

❌ "1s, auto, 500ms" - multiple durations
   Expected: VALID (ok: true)
   Actual: ERROR - transition-duration: Expected time dimension, got: Identifier

❌ "1s , auto , 2s" - durations with whitespace
   Expected: VALID (ok: true)
   Actual: ERROR - transition-duration: Expected time dimension, got: Identifier
