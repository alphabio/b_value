# Issues Found: transition/duration (Generate)

**Date**: 2025-10-27

Found 11 mismatches between expected and actual generator behavior.

These need to be reviewed:
- If generator is wrong: Fix generator, then regenerate tests
- If expectation is wrong: Update config, then regenerate tests
- If behavior is intentional: Document as known limitation

---

❌ single time value in seconds - ROUNDTRIP FAILED
   Original: {"kind":"transition-duration","durations":[{"type":"time","value":1,"unit":"s"}]}
   Roundtrip: {"kind":"transition-duration","durations":[{"value":1,"unit":"s"}]}

❌ single time value in milliseconds - ROUNDTRIP FAILED
   Original: {"kind":"transition-duration","durations":[{"type":"time","value":500,"unit":"ms"}]}
   Roundtrip: {"kind":"transition-duration","durations":[{"value":500,"unit":"ms"}]}

❌ undefined
   Expected: VALID
   Actual: ERROR - durations[0].value: Invalid input: expected number, received undefined

❌ zero duration - ROUNDTRIP FAILED
   Original: {"kind":"transition-duration","durations":[{"type":"time","value":0,"unit":"s"}]}
   Roundtrip: {"kind":"transition-duration","durations":[{"value":0,"unit":"s"}]}

❌ zero duration in ms - ROUNDTRIP FAILED
   Original: {"kind":"transition-duration","durations":[{"type":"time","value":0,"unit":"ms"}]}
   Roundtrip: {"kind":"transition-duration","durations":[{"value":0,"unit":"ms"}]}

❌ decimal values - ROUNDTRIP FAILED
   Original: {"kind":"transition-duration","durations":[{"type":"time","value":0.5,"unit":"s"}]}
   Roundtrip: {"kind":"transition-duration","durations":[{"value":0.5,"unit":"s"}]}

❌ decimal seconds - ROUNDTRIP FAILED
   Original: {"kind":"transition-duration","durations":[{"type":"time","value":2.5,"unit":"s"}]}
   Roundtrip: {"kind":"transition-duration","durations":[{"value":2.5,"unit":"s"}]}

❌ decimal milliseconds - ROUNDTRIP FAILED
   Original: {"kind":"transition-duration","durations":[{"type":"time","value":100.5,"unit":"ms"}]}
   Roundtrip: {"kind":"transition-duration","durations":[{"value":100.5,"unit":"ms"}]}

❌ large values - ROUNDTRIP FAILED
   Original: {"kind":"transition-duration","durations":[{"type":"time","value":3600,"unit":"s"}]}
   Roundtrip: {"kind":"transition-duration","durations":[{"value":3600,"unit":"s"}]}

❌ multiple durations
   Expected: VALID
   Actual: ERROR - durations[1].value: Invalid input: expected number, received undefined

❌ multiple time values - ROUNDTRIP FAILED
   Original: {"kind":"transition-duration","durations":[{"type":"time","value":1,"unit":"s"},{"type":"time","value":2,"unit":"s"},{"type":"time","value":3,"unit":"s"},{"type":"time","value":4,"unit":"s"}]}
   Roundtrip: {"kind":"transition-duration","durations":[{"value":1,"unit":"s"},{"value":2,"unit":"s"},{"value":3,"unit":"s"},{"value":4,"unit":"s"}]}
