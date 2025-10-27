# Issues Found: transition/delay (Generate)

**Date**: 2025-10-27

Found 2 mismatches between expected and actual generator behavior.

These need to be reviewed:
- If generator is wrong: Fix generator, then regenerate tests
- If expectation is wrong: Update config, then regenerate tests
- If behavior is intentional: Document as known limitation

---

❌ negative delay
   Expected: VALID
   Actual: ERROR - delays[0].value: Time value must be non-negative

❌ negative delay in milliseconds
   Expected: VALID
   Actual: ERROR - delays[0].value: Time value must be non-negative
